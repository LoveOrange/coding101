import {spawn} from 'node:child_process';
import {createWriteStream} from 'node:fs';
import {readFile, writeFile, mkdtemp, readdir} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash, randomUUID} from 'node:crypto';
import {setTimeout as delay} from 'node:timers/promises';
import {git, requireClean, requireAncestor, currentDeployment, sourceCommit,
  requireSameDeployment, remoteRef, acquireLock, releaseLock} from './release-policy.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = process.argv.slice(2);
if (args.length > 1 || (args.length === 1 && args[0] !== '--check')) {
  console.error('用法：npm run release:check（只检查）或 npm run release:production（正式发布）。不接受跳过检查或覆盖目标参数。');
  process.exit(1);
}
const checkOnly = args[0] === '--check';
const config = JSON.parse(await readFile(join(root, 'release/production.json'), 'utf8'));
let source;
try { source = requireClean(root); }
catch (error) { console.error(`[release] STOP: ${error.message}`); process.exit(1); }
const reportDir = await mkdtemp(join(tmpdir(), 'coding101-release-'));
const workspace = join(reportDir, 'workspace');
const releaseId = randomUUID();
const report = {source, releaseId, checkOnly, startedAt: new Date().toISOString(), success: false, steps: []};
let lock, container, activeChild, interrupted = false;
let deployStarted = false, deploymentConfirmed = false;
const safeEnv = Object.fromEntries(['PATH', 'HOME', 'TMPDIR', 'TEMP', 'SystemRoot', 'DOCKER_HOST', 'DOCKER_CONTEXT',
  'SSH_AUTH_SOCK'].filter(k => process.env[k]).map(k => [k, process.env[k]]));
safeEnv.CI = 'true';
safeEnv.GIT_TERMINAL_PROMPT = '0';
const signal = () => { interrupted = true; activeChild?.kill('SIGTERM'); };
process.on('SIGINT', signal);
process.on('SIGTERM', signal);

async function run(name, command, argv, cwd = workspace, env = safeEnv, cleanup = false) {
  if (interrupted && !cleanup) throw new Error('发布已中断。');
  console.log(`[release] ${name}`);
  const stream = createWriteStream(join(reportDir, `${name}.log`));
  let output = '';
  const code = await new Promise((accept, reject) => {
    const child = spawn(command, argv, {cwd, env, stdio: ['ignore', 'pipe', 'pipe']});
    activeChild = child;
    child.stdout.on('data', data => { stream.write(data); output += data; });
    child.stderr.on('data', data => stream.write(data));
    child.on('error', reject);
    child.on('close', status => accept(status ?? 1));
  }).finally(() => { activeChild = undefined; stream.end(); });
  report.steps.push({name, code});
  if (code !== 0) throw new Error(`${name} 失败（${code}），日志：${join(reportDir, `${name}.log`)}`);
  return output.trim();
}
const wrangler = (name, argv) => run(name, process.execPath,
  [join(workspace, 'worker/node_modules/wrangler/bin/wrangler.js'), ...argv], join(workspace, 'worker'),
  {...process.env, CI: 'true', WRANGLER_SEND_METRICS: 'false', CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV: 'false'});
async function live(name) {
  const current = currentDeployment(JSON.parse(await wrangler(`${name}-deployments`, ['deployments', 'list', '--json'])));
  const version = JSON.parse(await wrangler(`${name}-version`, ['versions', 'view', current.version, '--json']));
  return {...current, commit: sourceCommit(version, config.bootstrap), message: version.annotations?.['workers/message']};
}
function verifyMain() {
  const main = remoteRef(root, config.repository, `refs/heads/${config.branch}`);
  if (main !== source) throw new Error('远端 main 与待发布提交不一致；请先合并、推送并重新检查。');
}
function verifyLock() {
  if (remoteRef(root, config.repository, config.lockRef) !== lock) throw new Error('发布锁已改变，停止发布。');
}
const hash = data => createHash('sha256').update(data).digest('hex');
async function get(path) {
  const response = await fetch(`${config.origin}${path}`, {cache: 'no-store', signal: AbortSignal.timeout(20_000)});
  if (!response.ok) throw new Error(`线上验收 ${path} 返回 HTTP ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}

console.log(`[release] ${checkOnly ? 'CHECK' : 'DEPLOY'} ${source}\n[release] 日志：${reportDir}`);
try {
  // Fetch the actual remote main, not a possibly stale local tracking reference.
  git(root, ['fetch', '--no-tags', config.repository, `refs/heads/${config.branch}`]);
  requireAncestor(root, git(root, ['rev-parse', 'FETCH_HEAD']), source);
  if (!checkOnly) {
    verifyMain();
    lock = acquireLock(root, config.repository, config.lockRef, source);
    verifyMain();
  }
  await run('snapshot-clone', 'git', ['clone', '--no-local', '--no-checkout', root, workspace], reportDir);
  git(workspace, ['checkout', '--detach', source]);
  // Only committed files and freshly installed, lockfile-pinned dependencies enter the build.
  await run('install-site', 'npm', ['ci', '--include=dev', '--no-audit', '--no-fund']);
  await run('install-worker', 'npm', ['ci', '--include=dev', '--no-audit', '--no-fund'], join(workspace, 'worker'));
  const before = await live('before');
  report.before = before;
  requireAncestor(workspace, before.commit, source);
  // Exercise database tests against a fresh local container, never production credentials.
  container = `coding101-release-${releaseId}`;
  await run('postgres-start', 'docker', ['run', '-d', '--rm', '--name', container,
    '-e', 'POSTGRES_PASSWORD=release-test-only', '-p', '127.0.0.1::5432', 'postgres:17-alpine']);
  await run('postgres-ready', 'docker', ['exec', container, 'sh', '-c',
    'for n in $(seq 1 40); do pg_isready -U postgres >/dev/null && exit 0; sleep 1; done; exit 1']);
  const port = (await run('postgres-port', 'docker', ['port', container, '5432/tcp'])).match(/^127\.0\.0\.1:(\d+)$/)?.[1];
  if (!port) throw new Error('测试数据库没有绑定到本机随机端口。');
  await writeFile(join(workspace, 'worker/.env.test'), `TEST_DATABASE_URL=postgresql://postgres:release-test-only@127.0.0.1:${port}/postgres\n`, {mode: 0o600});
  await run('site-tests', 'node', ['--test', ...((await readdir(join(workspace, 'scripts')))
    .filter(f => f.endsWith('.test.mjs')).map(f => `scripts/${f}`))]);
  await run('operations-tests', 'npm', ['run', 'ops:test'], workspace, {...safeEnv, OPS_TEST_POSTGRES_CONTAINER: container});
  await run('worker-tests', 'npm', ['test'], join(workspace, 'worker'));
  await run('site-typecheck', 'npm', ['run', 'typecheck']);
  await run('worker-typecheck', 'npm', ['run', 'typecheck'], join(workspace, 'worker'));
  await run('production-build', 'npm', ['run', 'build:production']);
  await run('discovery', 'npm', ['run', 'check:discovery']);
  const assets = {};
  for (const name of await readdir(join(workspace, 'build/assets/js'))) {
    if (/^(main|runtime~main)\.[a-f0-9]+\.js$/.test(name)) {
      assets[`/assets/js/${name}`] = hash(await readFile(join(workspace, 'build/assets/js', name)));
    }
  }
  if (Object.keys(assets).length !== 2) throw new Error('构建缺少唯一的主包和运行时包。');
  const manifest = {schemaVersion: 1, sourceCommit: source, releaseId, builtAt: new Date().toISOString(), features: config.features, assets};
  await writeFile(join(workspace, 'build/release.json'), JSON.stringify(manifest, null, 2) + '\n');
  const headersPath = join(workspace, 'build/_headers');
  const headers = await readFile(headersPath, 'utf8').catch(e => { if (e.code === 'ENOENT') return ''; throw e; });
  await writeFile(headersPath, `${headers}\n/release.json\n  Cache-Control: no-store\n`);
  // Dry run verifies Worker packaging without creating a Cloudflare version.
  await wrangler('worker-dry-run', ['deploy', '--dry-run', '--keep-vars', '--strict']);
  requireClean(root, source);
  requireSameDeployment(before, await live('pre-deploy'));
  if (checkOnly) {
    // A new main commit during this check also invalidates the result.
    const freshMain = remoteRef(root, config.repository, `refs/heads/${config.branch}`);
    requireAncestor(root, freshMain, source);
    report.success = true;
  } else {
    verifyMain();
    verifyLock();
    const message = `coding101-release:${source}:${releaseId}`;
    deployStarted = true;
    await wrangler('deploy', ['deploy', '--keep-vars', '--strict', '--message', message]);
    const after = await live('after');
    report.after = after;
    if (after.commit !== source || after.message !== message) throw new Error('部署后线上版本与本次源码或发布批次不符。');
    deploymentConfirmed = true;
    let verified = false;
    for (let attempt = 0; attempt < 4; attempt++) {
      try {
        const online = JSON.parse((await get(`/release.json?release=${releaseId}`)).toString());
        if (JSON.stringify(online) !== JSON.stringify(manifest)) throw new Error('线上 release.json 尚未匹配本次构建。');
        for (const [path, expected] of Object.entries(assets)) {
          if (hash(await get(path)) !== expected) throw new Error(`线上资源不匹配：${path}`);
        }
        for (const path of ['/', '/topics/', '/account/']) {
          const html = (await get(path)).toString();
          for (const asset of Object.keys(assets)) if (!html.includes(asset)) throw new Error(`线上页面仍引用旧资源：${path}`);
        }
        verified = true; break;
      } catch (error) {
        if (attempt === 3) throw error;
        await delay(3000);
      }
    }
    requireSameDeployment(after, await live('verified'));
    report.success = verified;
  }
} catch (error) {
  report.error = error.message;
  console.error(`[release] STOP: ${error.message}`);
  process.exitCode = 1;
} finally {
  if (container) {
    try { await run('postgres-cleanup', 'docker', ['rm', '-f', container], reportDir, safeEnv, true); }
    catch (error) { report.cleanupError = error.message; report.success = false; process.exitCode = 1; }
  }
  if (lock && deployStarted && !deploymentConfirmed) {
    report.lockCleanupError = `上传结果尚未确认，保留发布锁 ${config.lockRef}（${lock}）。请先核对线上版本与日志，不能直接重试。`;
    report.success = false; process.exitCode = 1;
  } else if (lock) {
    try { releaseLock(root, config.repository, config.lockRef, lock); }
    catch { report.lockCleanupError = `远端锁未确认释放：${config.lockRef}，所有者 ${lock}。核对后再处理。`; report.success = false; process.exitCode = 1; }
  }
  report.finishedAt = new Date().toISOString();
  await writeFile(join(reportDir, 'result.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(`[release] ${report.success ? 'PASS' : 'FAIL'} ${source}\n[release] 结果：${join(reportDir, 'result.json')}`);
  if (report.lockCleanupError) console.error(report.lockCleanupError);
}
