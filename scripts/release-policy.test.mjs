import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync, writeFileSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {git, requireClean, requireAncestor, currentDeployment, sourceCommit, requireSameDeployment,
  acquireLock, releaseLock, remoteRef} from './release-policy.mjs';

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'coding101-release-test-'));
  t.after(() => rmSync(root, {recursive: true, force: true}));
  git(root, ['init', '-q', '--initial-branch=main']);
  git(root, ['config', 'user.name', 'Release Test']);
  git(root, ['config', 'user.email', 'test@example.invalid']);
  const commit = value => {
    writeFileSync(join(root, 'file.txt'), value);
    git(root, ['add', 'file.txt']); git(root, ['commit', '-qm', value]);
    return git(root, ['rev-parse', 'HEAD']);
  };
  const first = commit('before UTM');
  const fixed = commit('UTM fix');
  return {root, first, fixed, commit};
}

test('old or divergent snapshots cannot replace a deployed fix; descendants can', t => {
  const {root, first, fixed, commit} = fixture(t);
  assert.throws(() => requireAncestor(root, fixed, first), /没有包含基线/);
  git(root, ['checkout', '-qb', 'stale-feature', first]);
  const divergent = commit('unrelated feature');
  assert.throws(() => requireAncestor(root, fixed, divergent), /没有包含基线/);
  git(root, ['merge', '-s', 'ours', '--no-edit', 'main']);
  assert.doesNotThrow(() => requireAncestor(root, fixed, git(root, ['rev-parse', 'HEAD'])));
  assert.throws(() => requireAncestor(root, 'invalid', fixed), /提交号无效/);
});

test('dirty tracked, staged, untracked files and changed HEAD stop a release', t => {
  const {root, first, fixed} = fixture(t);
  assert.equal(requireClean(root), fixed);
  assert.throws(() => requireClean(root, first), /HEAD 已改变/);
  writeFileSync(join(root, 'file.txt'), 'unfinished');
  assert.throws(() => requireClean(root), /未提交/);
  git(root, ['add', 'file.txt']);
  assert.throws(() => requireClean(root), /未提交/);
  git(root, ['reset', '--hard', fixed]);
  writeFileSync(join(root, 'new.txt'), 'unfinished');
  assert.throws(() => requireClean(root), /未跟踪/);
});

test('latest deployment is selected regardless of API order; split traffic fails closed', () => {
  const a = {id: 'a', created_on: '2026-10-21T00:00:00Z', versions: [{version_id: 'old', percentage: 100}]};
  const b = {id: 'b', created_on: '2026-10-22T00:00:00Z', versions: [{version_id: 'new', percentage: 100}]};
  assert.deepEqual(currentDeployment([b, a]), {deployment: 'b', version: 'new'});
  assert.throws(() => currentDeployment([]), /为空/);
  assert.throws(() => currentDeployment([{...b, versions: [{version_id: 'new', percentage: 50}]}]), /分流/);
  assert.throws(() => requireSameDeployment(currentDeployment([a]), currentDeployment([b])), /线上版本发生变化/);
  assert.throws(() => requireSameDeployment({deployment: 'a', version: 'same'}, {deployment: 'b', version: 'same'}), /线上版本发生变化/);
});

test('unmarked deployments are rejected; bootstrap applies only to the exact verified version', () => {
  const commit = 'a'.repeat(40), bootstrap = {version: 'legacy', commit};
  assert.equal(sourceCommit({id: 'legacy'}, bootstrap), commit);
  assert.throws(() => sourceCommit({id: 'unknown'}, bootstrap), /缺少受认可/);
  assert.equal(sourceCommit({id: 'new', annotations: {'workers/message': `coding101-release:${commit}:11111111-1111-1111-1111-111111111111`}}, bootstrap), commit);
  assert.throws(() => sourceCommit({id: 'new', annotations: {'workers/message': 'some older build'}}, bootstrap), /缺少受认可/);
});

test('remote lock is atomic across clones and only its current owner can remove it', t => {
  const {root, fixed} = fixture(t);
  const remote = join(root, 'remote.git');
  git(root, ['init', '-q', '--bare', remote]);
  const other = join(root, 'other');
  git(root, ['clone', '-q', root, other]);
  const ref = 'refs/heads/release-lock/coding101';
  const one = acquireLock(root, remote, ref, fixed);
  assert.equal(remoteRef(other, remote, ref), one);
  assert.throws(() => acquireLock(other, remote, ref, fixed), /未取得远端发布锁/);
  assert.throws(() => releaseLock(other, remote, ref, fixed));
  assert.equal(remoteRef(root, remote, ref), one);
  releaseLock(root, remote, ref, one);
  const two = acquireLock(other, remote, ref, fixed);
  assert.notEqual(two, one);
  assert.throws(() => releaseLock(root, remote, ref, one));
  assert.equal(remoteRef(root, remote, ref), two);
  releaseLock(other, remote, ref, two);
  assert.equal(remoteRef(root, remote, ref), '');
});
