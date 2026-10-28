import {readFile, mkdir, writeFile, rename} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {createSign} from 'node:crypto';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {configPath, dataDir, dailyReport, gaRows, shiftDay, windowFor} from './core.mjs';
import {accountQuery, learningQuery} from './queries.mjs';

const requireWorker = createRequire(new URL('../worker/package.json', import.meta.url));
const endpoint = 'https://oauth2.googleapis.com/token';
export async function readConfig() {
  let file = {};
  try {file = JSON.parse(await readFile(configPath, 'utf8'));}
  catch (err) {if (err.code !== 'ENOENT') throw new Error('运营配置文件无法解析，请在本机检查 JSON。');}
  return {
    sku: file.sku || 'coding101.pro', graceDays: file.graceDays ?? 3,
    accountDatabaseUrl: process.env.OPS_ACCOUNT_DATABASE_URL || file.accountDatabaseUrl,
    learningDatabaseUrl: process.env.OPS_LEARNING_DATABASE_URL || file.learningDatabaseUrl,
    gaPropertyId: process.env.GA4_PROPERTY_ID || file.gaPropertyId,
    googleServiceAccountFile: process.env.OPS_GOOGLE_SERVICE_ACCOUNT_FILE || file.googleServiceAccountFile,
  };
}

async function query(connectionString, sql, args, kind) {
  const target = new URL(connectionString);
  if (!['postgres:', 'postgresql:'].includes(target.protocol)) throw new Error('只接受 PostgreSQL 连接串。');
  if (!['localhost', '127.0.0.1', '[::1]'].includes(target.hostname) && target.searchParams.get('sslmode') !== 'verify-full') {
    throw new Error('只接受使用 sslmode=verify-full 的远程数据库连接，以验证 TLS 证书。');
  }
  const {Client} = requireWorker('pg');
  const client = new Client({connectionString, connectionTimeoutMillis: 10000, query_timeout: 20000,
    application_name: 'coding101-operations'});
  try {
    await client.connect();
    await client.query('BEGIN ISOLATION LEVEL REPEATABLE READ READ ONLY');
    await client.query("SET LOCAL statement_timeout = '15s'");
    await client.query("SET LOCAL TIME ZONE 'UTC'");
    const role = (await client.query(`SELECT rolsuper OR rolcreaterole OR rolcreatedb OR rolbypassrls AS elevated
      FROM pg_roles WHERE rolname = current_user`)).rows[0];
    const writable = (await client.query(`SELECT EXISTS (
      SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
      WHERE n.nspname = 'public' AND c.relkind IN ('r','p') AND
      (has_table_privilege(c.oid, 'INSERT,UPDATE,DELETE,TRUNCATE')
       OR has_any_column_privilege(c.oid, 'INSERT,UPDATE'))
    ) AS allowed`)).rows[0];
    // Reject owner/application credentials even though this transaction is read-only.
    if (role?.elevated || writable.allowed) throw new Error('只接受独立只读数据库角色，拒绝使用管理员或应用写入凭证。');
    if (kind === 'account') {
      const privateAccess = (await client.query(`SELECT
        has_column_privilege('users', 'email', 'SELECT') OR
        has_table_privilege('sessions', 'SELECT') OR has_table_privilege('accounts', 'SELECT') OR
        has_table_privilege('verifications', 'SELECT') OR has_table_privilege('jwks', 'SELECT') AS allowed`)).rows[0];
      if (privateAccess.allowed) throw new Error('运营角色仍可读取邮箱或认证表，请按最小列权限重新授权。');
    }
    const result = await client.query(sql, args);
    await client.query('COMMIT');
    return result.rows[0].data;
  } finally {await client.end().catch(() => {});}
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {...options, signal: AbortSignal.timeout(20000)});
  if (!response.ok) throw new Error(`数据服务返回 HTTP ${response.status}，请检查只读授权与配置。`);
  return response.json();
}
async function googleToken(file) {
  const key = JSON.parse(await readFile(file, 'utf8'));
  const now = Math.floor(Date.now() / 1000);
  const encode = value => Buffer.from(JSON.stringify(value)).toString('base64url');
  const unsigned = `${encode({alg: 'RS256', typ: 'JWT'})}.${encode({iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/analytics.readonly', aud: endpoint, iat: now, exp: now + 3600})}`;
  const signature = createSign('RSA-SHA256').update(unsigned).sign(key.private_key, 'base64url');
  const token = await fetchJson(endpoint, {method: 'POST', body: new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${unsigned}.${signature}`,
  })});
  if (!token.access_token) throw new Error('Google 没有返回访问令牌。');
  return token.access_token;
}
async function analytics(config, window) {
  if (!/^\d+$/.test(config.gaPropertyId)) throw new Error('GA4 Property ID 应为数字，不能使用 G- 开头的 Measurement ID。');
  const token = await googleToken(config.googleServiceAccountFile);
  const metadata = [];
  async function report(dimensions, metrics, start = window.start, limit = 100, orderMetric, promotionEnd) {
    const hostFilter = {filter: {fieldName: 'hostName', stringFilter: {matchType: 'EXACT', value: 'coding101.linsama.com'}}};
    // A named manual campaign distinguishes promotion from ordinary direct/search traffic.
    const campaignFilter = {notExpression: {filter: {fieldName: 'sessionManualCampaignName',
      inListFilter: {values: ['', '(not set)', '(direct)', '(organic)', '(referral)', '(none)', '(other)'], caseSensitive: false}}}};
    const result = await fetchJson(`https://analyticsdata.googleapis.com/v1beta/properties/${config.gaPropertyId}:runReport`, {
      method: 'POST', headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
      body: JSON.stringify({dateRanges: [{startDate: start, endDate: promotionEnd || window.end}],
        dimensions: dimensions.map(name => ({name})), metrics: metrics.map(name => ({name})),
        dimensionFilter: promotionEnd ? {andGroup: {expressions: [hostFilter, campaignFilter]}} : hostFilter,
        limit, ...(orderMetric ? {orderBys: [{metric: {metricName: orderMetric}, desc: true}]} : {}),
      }),
    });
    if (result.metadata?.timeZone !== window.timezone) throw new Error('GA4 属性时区与 Asia/Shanghai 不一致或缺失，请先核验，暂不混合统计。');
    metadata.push(result.metadata);
    const rows = gaRows(result);
    return promotionEnd ? {rows, rowCount: result.rowCount ?? rows.length, limit, metadata: result.metadata} : rows;
  }
  const metrics = ['totalUsers', 'newUsers', 'sessions', 'screenPageViews', 'engagementRate'];
  const daily = await report(['date'], metrics);
  const weekly = await report([], metrics, shiftDay(window.end, -6));
  const monthly = await report([], metrics);
  const pages = await report(['pagePath'], ['screenPageViews'], window.start, 10, 'screenPageViews');
  const channels = await report(['sessionDefaultChannelGroup'], ['sessions'], window.start, 10, 'sessions');
  const promotion = {};
  const views = {
    sources: ['sessionManualSource', 'sessionManualMedium'],
    campaigns: ['sessionManualCampaignName'],
    contents: ['sessionManualSource', 'sessionManualMedium', 'sessionManualCampaignName', 'sessionManualAdContent'],
  };
  for (const [period, start, end] of [
    ['yesterday', window.end, window.end],
    ['previousWeek', shiftDay(window.end, -7), shiftDay(window.end, -7)],
    ['monthly', window.start, window.end],
  ]) {
    const results = await Promise.all(Object.entries(views).map(async ([name, dimensions]) => [name,
      await source(true, '', () => report(dimensions,
        ['sessions', 'totalUsers', 'screenPageViews', 'engagementRate'], start, 20, 'sessions', end))]));
    promotion[period] = {start, end, views: Object.fromEntries(results)};
  }
  return {daily: daily.sort((a, b) => a.date.localeCompare(b.date)), weekly: weekly[0] ?? null,
    monthly: monthly[0] ?? null, pages, channels, promotion, metadata};
}

async function source(enabled, missing, collect) {
  if (!enabled) return {status: 'unconfigured', message: missing, data: null};
  try {return {status: 'ok', data: await collect(), collectedAt: new Date().toISOString()};}
  catch (err) {
    // Never serialize database/provider errors: they can contain URLs, SQL or credentials.
    const safe = /^(只接受|运营角色|GA4 |数据服务返回|Google 没有)/.test(err.message);
    return {status: 'error', data: null, message: safe ? err.message : '采集失败：请在本机检查连接、最小权限、证书、依赖和表结构。'};
  }
}
export async function collect(config, now = new Date()) {
  if (!Number.isInteger(config.graceDays) || config.graceDays < 0 || config.graceDays > 30) throw new Error('graceDays 必须为 0–30 的整数。');
  const window = windowFor(now);
  const account = await source(config.accountDatabaseUrl, '未接入账户库只读凭证', () => query(
    config.accountDatabaseUrl, accountQuery,
    [config.sku, now.toISOString().replace('Z', ''), config.graceDays, window.start, window.end], 'account'));
  const learning = await source(config.learningDatabaseUrl, '未接入学习库只读凭证', () => query(
    config.learningDatabaseUrl, learningQuery,
    [`${window.end}T00:00:00+08:00`, `${shiftDay(window.end, 1)}T00:00:00+08:00`], 'learning'));
  const ga = await source(config.gaPropertyId && config.googleServiceAccountFile, '未接入 GA4 Property ID 和服务账号授权', () => analytics(config, window));
  const notes = [
    '每日重新读取最近 28 天的 GA4 汇总，用于吸收迟到数据；前一天仍标记为暂定。',
    'GA4 访客与注册账户属于不同口径，不能相加，也不能直接相除后宣称注册转化率。',
    '同步人数只反映当前最后一次同步时间，历史回看会变化，不代表学习 DAU。',
  ];
  if (ga.data?.metadata.some(m => m.subjectToThresholding || m.dataLossFromOtherRow || m.samplingMetadatas?.length)) {
    notes.push('GA4 返回阈值、聚合或抽样提示，本次数据存在报告限制。');
  }
  if (Object.values(ga.data?.promotion || {}).some(p => Object.values(p.views).some(v => v.status !== 'ok'))) {
    notes.push('部分推广统计采集失败，已保留各报表状态；失败不代表零访问。');
  }
  return {version: 1, generatedAt: now.toISOString(), window, sources: {account, learning, ga}, notes};
}
export async function save(report, directory = dataDir) {
  await mkdir(join(directory, 'snapshots'), {recursive: true, mode: 0o700});
  const serialized = JSON.stringify(report, null, 2) + '\n';
  const snapshot = report.generatedAt.replaceAll(':', '-');
  await writeFile(join(directory, 'snapshots', `${snapshot}.json`), serialized, {mode: 0o600});
  for (const [name, body] of [['report.json', serialized], ['report.md', dailyReport(report)]]) {
    const temp = join(directory, `${name}.${process.pid}.tmp`);
    await writeFile(temp, body, {mode: 0o600});
    await rename(temp, join(directory, name));
  }
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const report = await collect(await readConfig());
    await save(report);
    console.log(dailyReport(report));
    console.log(`聚合文件：${join(dataDir, 'report.json')}`);
    if (Object.values(report.sources).some(s => s.status !== 'ok') || report.notes.some(n => n.includes('推广统计采集失败'))) process.exitCode = 2;
  } catch {console.error('采集未完成，请检查本机配置格式和输出目录权限。未输出任何凭证。'); process.exitCode = 1;}
}
