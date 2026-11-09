import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, writeFile, readFile, chmod, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createRequire} from 'node:module';
import {randomUUID} from 'node:crypto';
import {git} from './release-policy.mjs';
import {snapshotCompanyMetadata, requireSameMetadataSource} from './release-company-metadata.mjs';
import {validateMetadata, readConnection, savePrivateJson, checkMetadata, syncMetadata, verifyCounts}
  from '../worker/scripts/company-metadata.mjs';

const entry = (cardId, companies = ['Example'], sources = 'https://example.test/interview') => ({cardId, companies, sources});
const cards = {a: {id: 'a'}, b: {id: 'b'}, c: {id: 'c'}, self: {id: 'self', selfTest: true}};
const entries = [entry('a', ['Updated']), entry('b'), entry('c', [])];
async function directory(t) {
  const dir = await mkdtemp(join(tmpdir(), 'coding101-metadata-test-'));
  t.after(() => rm(dir, {recursive: true, force: true}));
  return dir;
}

test('metadata must cover every sourced card exactly, including undisclosed companies', () => {
  assert.equal(validateMetadata(entries, cards).length, 3);
  for (const input of [entries.slice(1), [...entries, entry('a')], [...entries, entry('unknown')],
    [...entries, entry('self')], [entry('a', ['Duplicate', 'Duplicate']), ...entries.slice(1)],
    [entry('a', [], 'unverified'), ...entries.slice(1)]]) {
    assert.throws(() => validateMetadata(input, cards));
  }
});

test('connection files are restricted, pinned to the production target, and errors hide secrets', async t => {
  const file = join(await directory(t), '.env');
  const target = {host: 'example.invalid', database: 'coding101'};
  await writeFile(file, 'DIRECT_DATABASE_URL="postgresql://owner:private-password@example.invalid/coding101?sslmode=require"\n', {mode: 0o600});
  assert.equal(new URL(await readConnection(file, target)).searchParams.get('sslmode'), 'verify-full');
  await assert.rejects(readConnection(file, {...target, database: 'other'}), /目标不符/);
  await chmod(file, 0o644);
  await assert.rejects(readConnection(file, target), /chmod 600/);
  await chmod(file, 0o600);
  await writeFile(file, 'DIRECT_DATABASE_URL=private-password-not-a-url\n');
  await assert.rejects(readConnection(file, target), error => !error.message.includes('private-password') && /无法读取/.test(error.message));
  await writeFile(file, 'DIRECT_DATABASE_URL=\n');
  await assert.rejects(readConnection(file, target), /为空/);
});

test('release snapshots committed private main, ignores dirty worktrees, and detects source changes', async t => {
  const dir = await directory(t), repo = join(dir, 'private'), reports = join(dir, 'reports');
  await mkdir(repo); await mkdir(reports);
  git(repo, ['init', '-q', '--initial-branch=main']);
  git(repo, ['config', 'user.name', 'Metadata Test']);
  git(repo, ['config', 'user.email', 'test@example.invalid']);
  const file = join(repo, 'companies.json');
  const largeEntries = [entry('a', ['Example'], 'https://example.test/' + 'x'.repeat(1_100_000)), ...entries.slice(1)];
  await writeFile(file, JSON.stringify(largeEntries));
  git(repo, ['add', '.']); git(repo, ['commit', '-qm', 'initial']);
  const committed = git(repo, ['rev-parse', 'HEAD']);
  await writeFile(file, 'unfinished private edits');
  const config = {repository: repo, branch: 'main', path: 'companies.json'};
  const snapshot = await snapshotCompanyMetadata(reports, config);
  assert.equal(snapshot.commit, committed);
  assert.deepEqual(JSON.parse(await readFile(snapshot.metadataFile, 'utf8')), largeEntries);
  await writeFile(file, JSON.stringify([...entries, entry('new')]));
  git(repo, ['add', '.']); git(repo, ['commit', '-qm', 'advance']);
  assert.throws(() => requireSameMetadataSource(config, snapshot), /发生变化/);
});

test('online verification rejects omissions, stale counts and private fields', () => {
  verifyCounts({counts: {b: 2, a: 1}}, {a: 1, b: 2});
  for (const payload of [{counts: {a: 1}}, {counts: {a: 1, b: 3}},
    {counts: {a: 1, b: 2}, sources: 'private'}, {counts: {a: '1', b: 2}}]) {
    assert.throws(() => verifyCounts(payload, {a: 1, b: 2}));
  }
});

// Only the release-created local container is supplied here. Each test gets a
// separate database, so neither learning-service tests nor real data are touched.
const postgres = {skip: !process.env.METADATA_TEST_DATABASE_URL};
async function database(t) {
  const url = new URL(process.env.METADATA_TEST_DATABASE_URL);
  assert(['127.0.0.1', 'localhost'].includes(url.hostname));
  const require = createRequire(new URL('../worker/package.json', import.meta.url));
  const {Client} = require('pg');
  const admin = new Client({connectionString: url.toString()});
  await admin.connect();
  const name = `metadata_test_${randomUUID().replaceAll('-', '')}`;
  await admin.query(`CREATE DATABASE "${name}"`);
  url.pathname = `/${name}`;
  const client = new Client({connectionString: url.toString()});
  await client.connect();
  t.after(async () => { await client.end(); await admin.query(`DROP DATABASE "${name}"`); await admin.end(); });
  await client.query(await readFile(new URL('../worker/migrations/0001_init.sql', import.meta.url), 'utf8'));
  await client.query(`INSERT INTO learner_docs(user_id, data) VALUES ('test-user', '{"reading":{"article":true}}')`);
  for (const e of [entry('a', ['Old']), entry('b'), entry('retired')]) {
    await client.query('INSERT INTO card_companies(card_id, companies, sources) VALUES ($1,$2,$3)', [e.cardId, e.companies, e.sources]);
  }
  return {client, input: {entries, cards, database: name},
    rows: async () => (await client.query('SELECT * FROM card_companies ORDER BY card_id')).rows};
}

test('check is read-only; sync backs up, preserves retired rows and learning data, and is idempotent', postgres, async t => {
  const {client, input, rows} = await database(t);
  const before = await rows();
  const learner = (await client.query('SELECT * FROM learner_docs')).rows;
  const check = await checkMetadata(client, input);
  assert.deepEqual(await rows(), before);
  assert.deepEqual([check.inserted, check.updated, check.unchanged, check.retained], [1, 1, 1, 1]);
  const backupFile = join(await directory(t), 'before.json');
  const receipt = {};
  await syncMetadata(client, {...input, expectedDigest: check.databaseDigest, receipt,
    backup: async snapshot => { assert.deepEqual(await rows(), before); await savePrivateJson(backupFile, snapshot); }});
  assert.equal(JSON.parse(await readFile(backupFile, 'utf8')).length, 3);
  assert.equal(receipt.commitState, 'committed'); assert.equal(receipt.fullReadback, true);
  assert.deepEqual(receipt.expectedCounts, {a: 1, b: 1, retired: 1});
  const after = await rows();
  assert.equal(after.find(row => row.card_id === 'b').updated_at.getTime(), before.find(row => row.card_id === 'b').updated_at.getTime());
  assert.deepEqual((await client.query('SELECT * FROM learner_docs')).rows, learner);
  const secondCheck = await checkMetadata(client, input), second = {};
  await syncMetadata(client, {...input, expectedDigest: secondCheck.databaseDigest, receipt: second, backup: async () => {}});
  assert.deepEqual([second.inserted, second.updated, second.deleted], [0, 0, 0]);
  assert.deepEqual(await rows(), after);
});

test('concurrent database changes and failed backups stop before writes', postgres, async t => {
  const {client, input, rows} = await database(t);
  const check = await checkMetadata(client, input);
  await client.query("UPDATE card_companies SET sources = 'concurrent change' WHERE card_id = 'a'");
  const before = await rows();
  await assert.rejects(syncMetadata(client, {...input, expectedDigest: check.databaseDigest, receipt: {}, backup: async () => assert.fail('must not back up stale data')}), /发生变化/);
  assert.deepEqual(await rows(), before);
  const fresh = await checkMetadata(client, input);
  await assert.rejects(syncMetadata(client, {...input, expectedDigest: fresh.databaseDigest, receipt: {}, backup: async () => {throw new Error('disk full');}}), /disk full/);
  assert.deepEqual(await rows(), before);
});

test('constraint failures roll back the whole import; self-test conflicts are blocked', postgres, async t => {
  const {client, input, rows} = await database(t);
  const check = await checkMetadata(client, input), before = await rows(), receipt = {};
  await client.query("ALTER TABLE card_companies ADD CONSTRAINT reject_test_card CHECK (card_id <> 'c')");
  await assert.rejects(syncMetadata(client, {...input, expectedDigest: check.databaseDigest, receipt, backup: async () => {}}));
  assert.equal(receipt.commitState, 'not-committed');
  assert.deepEqual(await rows(), before);
  await client.query("INSERT INTO card_companies(card_id,companies) VALUES ('self', ARRAY['Example'])");
  await assert.rejects(checkMetadata(client, input), /自测标记冲突/);
});

test('lost COMMIT acknowledgement is recorded as unknown, never as rolled back', postgres, async t => {
  const {client, input, rows} = await database(t), receipt = {};
  const check = await checkMetadata(client, input);
  const interrupted = {query: async (sql, params) => {
    const result = await client.query(sql, params);
    if (sql === 'COMMIT') throw new Error('connection lost');
    return result;
  }};
  await assert.rejects(syncMetadata(interrupted, {...input, expectedDigest: check.databaseDigest, receipt, backup: async () => {}}));
  assert.equal(receipt.commitState, 'unknown');
  assert.equal((await rows()).length, 4);
});
