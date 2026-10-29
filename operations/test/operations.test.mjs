import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, readFile, writeFile, rm} from 'node:fs/promises';
import {generateKeyPairSync} from 'node:crypto';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {request} from 'node:http';
import {execFileSync} from 'node:child_process';
import {change, windowFor, dailyReport, promotionReport} from '../core.mjs';
import {collect, save} from '../collect.mjs';
import {dashboardServer} from '../serve.mjs';
import {accountQuery, learningQuery} from '../queries.mjs';

test('report window follows Shanghai midnight across month and year boundaries', () => {
  assert.deepEqual(windowFor(new Date('2026-12-31T16:01:00Z')), {start: '2026-12-04', end: '2026-12-31', timezone: 'Asia/Shanghai'});
  assert.equal(windowFor(new Date('2026-10-19T15:59:59Z')).end, '2026-10-18');
});
test('missing data and zero denominators are not invented percentages', () => {
  assert.equal(change(null, 2), '不可比较');
  assert.match(change(5, 0), /基期为 0/);
  assert.equal(change(15, 10), '+5（+50.0%）');
});
test('unconfigured sources remain null and a new snapshot replaces stale results', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'coding101-ops-'));
  try {
    const result = await collect({graceDays: 3}, new Date('2026-10-20T02:00:00Z'));
    assert(Object.values(result.sources).every(s => s.status === 'unconfigured' && s.data === null));
    await save(result, directory);
    assert.equal(JSON.parse(await readFile(join(directory, 'report.json'), 'utf8')).window.end, '2026-10-19');
    assert.match(dailyReport(result), /未接入账户库/);
    assert.doesNotMatch(dailyReport(result), /现存账户 0/);
  } finally {await rm(directory, {recursive: true, force: true});}
});
test('provider failures redact credentials and cannot leave a successful status', async () => {
  const result = await collect({graceDays: 3, gaPropertyId: '12345', googleServiceAccountFile: '/missing/VERY_SECRET_KEY.json'});
  assert.equal(result.sources.ga.status, 'error');
  assert.equal(result.sources.ga.data, null);
  assert(!JSON.stringify(result).includes('VERY_SECRET'));
});
test('GA4 uses separate period deduplication, keeps report restrictions and rejects timezone mismatch', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'coding101-ops-ga-'));
  const keyFile = join(directory, 'key.json');
  const {privateKey} = generateKeyPairSync('rsa', {modulusLength: 2048});
  await writeFile(keyFile, JSON.stringify({client_email: 'fixture@example.invalid', private_key: privateKey.export({type: 'pkcs8', format: 'pem'})}));
  const originalFetch = globalThis.fetch;
  const requests = [];
  let timeZone = 'Asia/Shanghai';
  let failPromotion = false;
  globalThis.fetch = async (url, options) => {
    if (url.includes('oauth2')) return {ok: true, json: async () => ({access_token: 'TEST_TOKEN'})};
    const request = JSON.parse(options.body); requests.push(request);
    if (failPromotion && request.dimensions.some(d => d.name === 'sessionManualAdContent')) return {ok: false, status: 403};
    return {ok: true, json: async () => ({
      dimensionHeaders: request.dimensions, metricHeaders: request.metrics,
      rowCount: 25,
      metadata: {timeZone, subjectToThresholding: true},
      rows: [{dimensionValues: request.dimensions.map(d => ({value: d.name === 'date' ? '20261019' : 'fixture'})),
        metricValues: request.metrics.map(() => ({value: request.dimensions.length ? '1' : '5'}))}],
    })};
  };
  try {
    const config = {graceDays: 3, gaPropertyId: '12345', googleServiceAccountFile: keyFile};
    const now = new Date('2026-10-20T02:00:00Z');
    const result = await collect(config, now);
    assert.equal(result.sources.ga.status, 'ok');
    assert.equal(result.sources.ga.data.daily[0].totalUsers, 1);
    assert.equal(result.sources.ga.data.weekly.totalUsers, 5);
    assert.equal(result.sources.ga.data.monthly.totalUsers, 5);
    assert.equal(requests[1].dateRanges[0].startDate, '2026-10-13');
    assert.equal(requests[0].dimensionFilter.filter.stringFilter.value, 'coding101.linsama.com');
    assert(result.notes.some(n => n.includes('报告限制')));
    assert(!JSON.stringify(result).includes('TEST_TOKEN'));
    const promotion = result.sources.ga.data.promotion;
    assert.equal(promotion.yesterday.start, '2026-10-19');
    assert.equal(promotion.previousWeek.end, '2026-10-12');
    assert.equal(promotion.monthly.start, '2026-09-22');
    assert.equal(promotion.monthly.views.sources.data.rows[0].totalUsers, 1);
    assert.equal(promotion.monthly.views.contents.data.rowCount, 25);
    const promotionRequests = requests.filter(r => r.dimensionFilter.andGroup);
    assert.equal(promotionRequests.length, 9);
    assert(promotionRequests.every(r => r.dimensionFilter.andGroup.expressions[0].filter.stringFilter.value === 'coding101.linsama.com'));
    assert(promotionRequests.every(r => r.dimensionFilter.andGroup.expressions[1].notExpression.filter.inListFilter.values.includes('(not set)')));
    assert(promotionRequests.some(r => r.dimensions.length === 4 && r.dateRanges[0].startDate === '2026-10-12' && r.dateRanges[0].endDate === '2026-10-12'));
    failPromotion = true;
    const partial = await collect(config, now);
    assert.equal(partial.sources.ga.status, 'ok');
    assert.equal(partial.sources.ga.data.promotion.yesterday.views.contents.status, 'error');
    assert.equal(partial.sources.ga.data.promotion.yesterday.views.contents.data, null);
    assert.equal(partial.sources.ga.data.promotion.yesterday.views.sources.status, 'ok');
    assert(partial.notes.some(n => n.includes('推广统计采集失败')));
    timeZone = 'America/New_York';
    assert.equal((await collect(config, now)).sources.ga.status, 'error');
  } finally {globalThis.fetch = originalFetch; await rm(directory, {recursive: true, force: true});}
});
test('promotion reporting keeps group identity, missing baselines and truncation visible', () => {
  const row = {sessionManualSource: 'zhihu', sessionManualMedium: 'social', sessionManualCampaignName: 'c101_202610_java_trial',
    sessionManualAdContent: '<script>|post\n', sessions: 4, totalUsers: 3, screenPageViews: 8};
  const ok = rows => ({status: 'ok', data: {rows, rowCount: 30, limit: 20, metadata: {subjectToThresholding: true}}});
  const empty = {status: 'ok', data: {rows: [], rowCount: 0, limit: 20}};
  const failed = {status: 'error', message: '数据服务返回 HTTP 403', data: null};
  const report = {
    yesterday: {start: '2026-10-21', end: '2026-10-21', views: {sources: ok([row]), campaigns: empty, contents: ok([row])}},
    previousWeek: {start: '2026-10-14', end: '2026-10-14', views: {
      sources: ok([{...row, sessions: 1}]), contents: ok([{...row, sessionManualSource: 'juejin', sessions: 10}]), campaigns: failed}},
    monthly: {start: '2026-09-24', end: '2026-10-21', views: {sources: failed, campaigns: empty, contents: empty}},
  };
  const md = promotionReport(report).join('\n');
  assert.match(md, /\| zhihu \/ social \| 4 \| 3 \| 8 \| \+3 \|/);
  assert.match(md, /不可比较（基期失败或未返回该组）/);
  assert.match(md, /&lt;script&gt;&#124;post/);
  assert.doesNotMatch(md, /<script>/);
  assert.match(md, /共 30 组/);
  assert.match(md, /HTTP 403/);
  assert.match(md, /本期未返回可识别活动/);
  assert.match(md, /抽样限制/);
  assert.match(promotionReport(null).join(''), /尚未采集/);
});
test('remote database transport fails closed without certificate verification', async () => {
  const result = await collect({graceDays: 3, accountDatabaseUrl: 'postgres://readonly:SECRET@invalid.example/db?sslmode=disable'});
  assert.equal(result.sources.account.status, 'error');
  assert.match(result.sources.account.message, /verify-full/);
  assert(!JSON.stringify(result).includes('SECRET'));
});
test('dashboard serves only approved files and local hosts, without a mutation endpoint', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'coding101-ops-http-'));
  const server = dashboardServer(directory);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const get = (path, host = `127.0.0.1:${port}`, method = 'GET') => new Promise((resolve, reject) => {
    const req = request({hostname: '127.0.0.1', port, path, method, headers: {Host: host}}, res => {
      let body = ''; res.on('data', c => body += c); res.on('end', () => resolve({status: res.statusCode, body, headers: res.headers}));
    }); req.on('error', reject); req.end();
  });
  try {
    const page = await get('/');
    assert.equal(page.status, 200); assert.match(page.body, /运营看板/);
    assert.match(page.headers['content-security-policy'], /frame-ancestors 'none'/);
    assert.equal((await get('/', 'attacker.example')).status, 403);
    assert.equal((await get('/report.json', undefined, 'POST')).status, 403);
    assert.equal((await get('/../config.json')).status, 404);
    assert.equal((await get('/report.json')).status, 404);
  } finally {await new Promise(resolve => server.close(resolve)); await rm(directory, {recursive: true, force: true});}
});

test('PostgreSQL aggregates honor subscription, trial, date and sync boundaries', {skip: !process.env.OPS_TEST_POSTGRES_CONTAINER}, () => {
  const sql = `BEGIN;
    CREATE TEMP TABLE users (id text, "createdAt" timestamp, "emailVerified" boolean);
    CREATE TEMP TABLE subscriptions ("userId" text, sku text, status text, "cancelAtPeriodEnd" boolean, "currentPeriodEnd" timestamp);
    CREATE TEMP TABLE access_grants ("userId" text, sku text, source text, "startsAt" timestamp, "endsAt" timestamp);
    CREATE TEMP TABLE redemption_batches (id text, sku text);
    CREATE TEMP TABLE redemption_codes ("batchId" text, status text, "redeemedAt" timestamp);
    CREATE TEMP TABLE learner_docs (updated_at timestamptz);
    INSERT INTO users VALUES ('a','2026-10-18 16:00',true), ('b','2026-10-19 15:59:59',true), ('c','2026-10-19 16:00',false);
    INSERT INTO subscriptions VALUES
      ('a','coding101.pro','active',false,null),
      ('a','coding101.pro','active',false,'2026-11-01'),
      ('b','coding101.pro','canceled',true,'2026-11-01'),
      ('c','coding101.pro','past_due',false,'2026-10-18'),
      ('d','coding101.pro','past_due',false,'2026-10-17 02:00'),
      ('e','coding101.pro','expired',false,'2026-11-01'),
      ('f','other','active',false,null),
      ('g','coding101.pro','active',false,'2026-10-20 02:00');
    INSERT INTO access_grants VALUES
      ('a','coding101.pro','trial','2026-10-01','2026-11-01'),
      ('h','coding101.pro','trial','2026-10-01','2026-11-01'),
      ('i','coding101.pro','redemption','2026-10-01','2026-11-01'),
      ('j','coding101.pro','order','2026-10-21','2026-11-01');
    INSERT INTO redemption_batches VALUES ('x','coding101.pro'),('y','other');
    INSERT INTO redemption_codes VALUES ('x','redeemed','2026-10-18 16:00'),('x','redeemed','2026-10-19 16:00'),('y','redeemed','2026-10-19');
    INSERT INTO learner_docs VALUES ('2026-10-18 16:00Z'),('2026-10-19 16:00Z');
    PREPARE ops_account(text,timestamp,int,date,date) AS ${accountQuery};
    EXECUTE ops_account('coding101.pro','2026-10-20 02:00',3,'2026-09-22','2026-10-19');
    PREPARE ops_learning(timestamptz,timestamptz) AS ${learningQuery};
    EXECUTE ops_learning('2026-10-19T00:00:00+08:00','2026-10-20T00:00:00+08:00');
    ROLLBACK;`;
  const output = execFileSync('docker', ['exec', '-i', process.env.OPS_TEST_POSTGRES_CONTAINER, 'psql', '-U', 'postgres', '-Atq', '-v', 'ON_ERROR_STOP=1'], {input: sql, encoding: 'utf8'});
  const [account, learning] = output.trim().split('\n').map(JSON.parse);
  assert.equal(account.snapshot.subscriptionUsers, 3);
  assert.equal(account.snapshot.subscriptionContracts, 4);
  assert.equal(account.snapshot.proUsers, 4);
  assert.equal(account.snapshot.trialUsers, 1);
  assert.equal(account.snapshot.pastDueUsers, 1);
  assert.equal(account.snapshot.unknownEndSubscriptions, 1);
  assert.equal(account.daily.at(-1).registrations, 2);
  assert.equal(account.daily.at(-1).redemptions, 1);
  assert.deepEqual(learning, {storedLearners: 2, syncedYesterday: 1});
});
