import {execFileSync} from 'node:child_process';
import {randomUUID} from 'node:crypto';

export function git(root, args, options = {}) {
  return execFileSync('git', ['-C', root, ...args], {
    encoding: 'utf8', timeout: 120_000,
    env: {...process.env, GIT_TERMINAL_PROMPT: '0'}, ...options,
  }).trim();
}

export function requireClean(root, expected) {
  if (git(root, ['status', '--porcelain', '--untracked-files=all'])) {
    throw new Error('工作区有未提交或未跟踪文件。请提交本次改动，或在干净 checkout 中发布；不要清理其他任务的文件。');
  }
  const head = git(root, ['rev-parse', 'HEAD']);
  if (expected && head !== expected) throw new Error('检查期间 HEAD 已改变，请重新开始发布。');
  return head;
}

export function requireAncestor(root, base, candidate) {
  if (!/^[a-f0-9]{40}$/.test(base)) throw new Error('线上源码提交号无效，停止发布。');
  try { git(root, ['merge-base', '--is-ancestor', base, candidate]); }
  catch { throw new Error(`待发布提交没有包含基线 ${base}；请先同步并合并，禁止覆盖已上线修复。`); }
}

export function currentDeployment(deployments) {
  const current = [...deployments].sort((a, b) => b.created_on.localeCompare(a.created_on))[0];
  if (!current?.id || current.versions?.length !== 1 || current.versions[0].percentage !== 100) {
    throw new Error('线上部署为空或正在分流，无法安全确定发布基线。');
  }
  return {deployment: current.id, version: current.versions[0].version_id};
}

export function sourceCommit(version, bootstrap) {
  const message = version.annotations?.['workers/message'] ?? '';
  const match = /^coding101-release:([a-f0-9]{40}):[a-f0-9-]{36}$/.exec(message);
  if (match) return match[1];
  if (version.id === bootstrap.version) return bootstrap.commit;
  throw new Error(`线上版本 ${version.id} 缺少受认可的源码记录；先核对覆盖来源，不能自动将它认作旧基线。`);
}

export function requireSameDeployment(before, after) {
  if (before.deployment !== after.deployment || before.version !== after.version) {
    throw new Error('检查期间线上版本发生变化，停止发布；请基于新版本重新验证。');
  }
}

export function remoteRef(root, repository, ref) {
  return git(root, ['ls-remote', '--refs', repository, ref]).split(/\s/)[0];
}

// Git's expected-empty lease makes creation atomic across checkouts and machines.
export function acquireLock(root, repository, ref, source) {
  const tree = git(root, ['rev-parse', `${source}^{tree}`]);
  const lock = git(root, ['-c', 'user.name=Coding101 Release', '-c', 'user.email=release@coding101.invalid',
    'commit-tree', tree, '-p', source], {
    input: `Coding101 release lock\n${JSON.stringify({source, startedAt: new Date().toISOString(), nonce: randomUUID()})}\n`,
  });
  try { git(root, ['push', '--porcelain', `--force-with-lease=${ref}:`, repository, `${lock}:${ref}`]); }
  catch {
    // An uncertain push may already have acquired the lock. Never steal another owner's lock.
    if (remoteRef(root, repository, ref) !== lock) {
      throw new Error('未取得远端发布锁。其他任务可能正在发布；不要删锁或强行重试。');
    }
  }
  return lock;
}

export function releaseLock(root, repository, ref, lock) {
  git(root, ['push', '--porcelain', `--force-with-lease=${ref}:${lock}`, repository, `:${ref}`]);
}
