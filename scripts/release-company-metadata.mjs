import {mkdir, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {git, remoteRef} from './release-policy.mjs';
import {digest} from '../worker/scripts/company-metadata.mjs';

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
