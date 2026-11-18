import {mkdir, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {git, remoteRef} from './release-policy.mjs';
import {digest, validateMetadata} from '../worker/scripts/company-metadata.mjs';

const verificationRef = 'refs/heads/release-state/coding101-companies';
// Increment when a change in how rows are stored requires rechecking existing data.
const companyInputsVersion = 1;

// validateMetadata ensures every sourced card has exactly one entry and only self-tests have none.
export function companyInputsHash(entries, cards, target) {
  const rows = new Map(validateMetadata(entries, cards).map(row => [row.card_id, row]));
  const inputs = Object.keys(cards).sort().map(id => {
    const row = rows.get(id);
    return row ? [id, row.companies, row.sources] : [id];
  });
  return digest(JSON.stringify([companyInputsVersion, target.host, target.database, inputs]));
}

// A fresh deployment (including a rollback to an old version) needs its own verification.
export function companyVerification(deployment, inputsHash) {
  return JSON.stringify({deployment: deployment.deployment, version: deployment.version, source: deployment.commit, inputsHash});
}

export function readCompanyVerification(root, repository) {
  const head = remoteRef(root, repository, verificationRef);
  if (!head) return {head, record: ''};
  git(root, ['fetch', '--no-tags', '--no-write-fetch-head', repository, verificationRef]);
  return {head, record: git(root, ['show', '-s', '--format=%B', head])};
}

export function recordCompanyVerification(root, repository, previous, record) {
  const tree = git(root, ['mktree'], {input: ''});
  const parents = previous.head ? ['-p', previous.head] : [];
  const commit = git(root, ['-c', 'user.name=Coding101 Release', '-c', 'user.email=release@coding101.invalid',
    'commit-tree', tree, ...parents], {input: record + '\n'});
  try {
    git(root, ['push', '--porcelain', `--force-with-lease=${verificationRef}:${previous.head}`, repository, `${commit}:${verificationRef}`]);
  } catch (error) {
    if (remoteRef(root, repository, verificationRef) !== commit) {
      throw new Error('公司元信息验收记录写入失败，请检查远端状态后重新发布。', {cause: error});
    }
  }
  return commit;
}

// Private sources stay outside the public checkout, build and uploaded assets.
// Fetch the remote commit directly; never trust a local private worktree's files.
export async function snapshotCompanyMetadata(reportDir, config) {
  const dir = join(reportDir, 'company-metadata');
  await mkdir(dir, {mode: 0o700});
  const repositoryDir = join(dir, 'repository.git');
  git(reportDir, ['init', '--bare', '-q', repositoryDir]);
  git(repositoryDir, ['fetch', '--no-tags', config.repository, `refs/heads/${config.branch}`]);
  const commit = git(repositoryDir, ['rev-parse', 'FETCH_HEAD']);
  let contents;
  try {
    // The current corpus is already close to execFileSync's 1 MiB default.
    contents = git(repositoryDir, ['show', `${commit}:${config.path}`], {maxBuffer: 64 * 1024 * 1024}) + '\n';
  } catch {
    throw new Error('无法读取私有元信息快照；检查已提交的数据路径和文件大小。');
  }
  const metadataFile = join(dir, 'companies.json');
  await writeFile(metadataFile, contents, {mode: 0o600});
  const snapshot = {commit, sourceHash: digest(contents), dir, metadataFile, repositoryDir};
  requireSameMetadataSource(config, snapshot);
  return snapshot;
}

export function requireSameMetadataSource(config, snapshot) {
  if (remoteRef(snapshot.repositoryDir, config.repository, `refs/heads/${config.branch}`) !== snapshot.commit) {
    throw new Error('私有元信息仓库 main 在检查后发生变化；请重新运行发布入口。');
  }
}
