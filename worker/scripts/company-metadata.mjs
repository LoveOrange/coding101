import {readFile, stat, open} from 'node:fs/promises';
import {createHash} from 'node:crypto';

export const digest = value => createHash('sha256').update(value).digest('hex');
const fail = message => { throw Object.assign(new Error(message), {publicMessage: message}); };
const content = row => JSON.stringify([row.companies, row.sources]);
export const rowDigest = rows => digest(JSON.stringify([...rows]
  .sort((a, b) => a.card_id.localeCompare(b.card_id))
  .map(row => [row.card_id, row.companies, row.sources])));
export const countsOf = rows => Object.fromEntries(rows.filter(row => row.companies.length)
  .map(row => [row.card_id, row.companies.length]));

export function validateMetadata(entries, cards) {
  if (!Array.isArray(entries) || !cards || !Object.keys(cards).length) fail('元信息或构建卡片索引为空、格式不正确。');
  const seen = new Set();
  for (const entry of entries) {
    if (!entry || typeof entry.cardId !== 'string' || seen.has(entry.cardId)) fail('元信息存在无效或重复的卡片 ID。');
    seen.add(entry.cardId);
    if (!cards[entry.cardId] || cards[entry.cardId].id !== entry.cardId) fail('元信息包含本次构建中不存在的卡片。');
    if (cards[entry.cardId].selfTest) fail('本站自测题不能登记公司或来源元信息。');
    if (!Array.isArray(entry.companies) || entry.companies.some(name => typeof name !== 'string' || !name.trim())
      || new Set(entry.companies).size !== entry.companies.length) fail('公司名称数组无效或重复。');
    if (typeof entry.sources !== 'string' || !/https?:\/\/\S+/.test(entry.sources)) fail('有来源的卡片必须保留可核验的原始链接。');
  }
  if (Object.entries(cards).some(([id, card]) => !card.selfTest && !seen.has(id))) fail('有来源的卡片缺少私有元信息，停止发布。');
  return entries.map(entry => ({card_id: entry.cardId, companies: entry.companies, sources: entry.sources}));
}

export function planMetadata(rows, desired, cards) {
  if (rows.some(row => cards[row.card_id]?.selfTest)) fail('生产元信息与本站自测标记冲突；请先核对并单独处理，发布不会自动删记录。');
  const before = new Map(rows.map(row => [row.card_id, row]));
  const ids = new Set(desired.map(row => row.card_id));
  const inserted = desired.filter(row => !before.has(row.card_id)).length;
  const updated = desired.filter(row => before.has(row.card_id) && content(row) !== content(before.get(row.card_id))).length;
  return {inserted, updated, unchanged: desired.length - inserted - updated,
    retained: rows.filter(row => !ids.has(row.card_id)).length, deleted: 0};
}

export async function readConnection(file, target) {
  try {
    if ((await stat(file)).mode & 0o077) fail('生产连接配置须仅当前用户可读写（chmod 600）。');
    const text = await readFile(file, 'utf8');
    const matches = [...text.matchAll(/^\s*DIRECT_DATABASE_URL\s*=\s*(.*?)\s*$/gm)];
    if (matches.length !== 1) fail('连接文件必须且只能配置一个 DIRECT_DATABASE_URL。');
    let value = matches[0][1];
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    if (!value) fail('DIRECT_DATABASE_URL 为空；请填入现有生产写入连接后重新检查。');
    const url = new URL(value);
    if (!['postgres:', 'postgresql:'].includes(url.protocol) || !url.password || url.hash
      || url.hostname.replace('-pooler.', '.') !== target.host || url.pathname !== `/${target.database}`) {
      fail('数据库连接与正式发布目标不符，停止发布。');
    }
    // Keep certificate verification explicit, independent of future pg defaults.
    url.searchParams.set('sslmode', 'verify-full');
    return url.toString();
  } catch (error) {
    if (error.publicMessage) throw error;
    fail('无法读取有效的生产数据库连接；请检查受限配置文件，不要在日志中打印连接串。');
  }
}

export async function savePrivateJson(file, value) {
  const handle = await open(file, 'wx', 0o600);
  try { await handle.writeFile(JSON.stringify(value, null, 2) + '\n'); await handle.sync(); }
  finally { await handle.close(); }
}

async function inspectDatabase(client, database) {
  const identity = (await client.query(`SELECT current_database() AS database,
    current_setting('default_transaction_read_only') AS read_only,
    has_table_privilege(current_user, 'public.card_companies', 'SELECT') AS can_select,
    has_table_privilege(current_user, 'public.card_companies', 'INSERT') AS can_insert,
    has_table_privilege(current_user, 'public.card_companies', 'UPDATE') AS can_update`)).rows[0];
  if (identity.database !== database || identity.read_only !== 'off'
    || !identity.can_select || !identity.can_insert || !identity.can_update) fail('生产库目标或元信息读写权限不符合发布要求。');
  const triggers = (await client.query("SELECT tgname FROM pg_trigger WHERE tgrelid = 'public.card_companies'::regclass AND NOT tgisinternal")).rows;
  if (triggers.length) fail('公司元信息表存在额外触发器，须先核对写入影响。');
  return (await client.query('SELECT card_id, companies, sources, updated_at FROM public.card_companies ORDER BY card_id')).rows;
}

export async function checkMetadata(client, {entries, cards, database}) {
  const desired = validateMetadata(entries, cards);
  await client.query('BEGIN READ ONLY');
  try {
    const rows = await inspectDatabase(client, database);
    const plan = planMetadata(rows, desired, cards);
    await client.query('COMMIT');
    return {...plan, databaseDigest: rowDigest(rows), total: desired.length,
      withCompanies: desired.filter(row => row.companies.length).length};
  } catch (error) { await client.query('ROLLBACK').catch(() => {}); throw error; }
}

// The callback persists the backup before any DML. Both release modes use the
// same validation; only the formal release calls this transactional write path.
export async function syncMetadata(client, {entries, cards, database, expectedDigest, backup, receipt}) {
  const desired = validateMetadata(entries, cards);
  receipt.commitState = 'not-committed';
  await client.query('BEGIN');
  try {
    await client.query("SET LOCAL lock_timeout = '10s'");
    await client.query("SET LOCAL statement_timeout = '25s'");
    await client.query('LOCK TABLE public.card_companies IN SHARE ROW EXCLUSIVE MODE');
    const before = await inspectDatabase(client, database);
    if (rowDigest(before) !== expectedDigest) fail('生产公司元信息在检查后发生变化，停止同步并重新检查。');
    const plan = planMetadata(before, desired, cards);
    await backup(before);
    const result = await client.query(`INSERT INTO public.card_companies AS existing (card_id, companies, sources)
      SELECT card_id, companies, sources FROM jsonb_to_recordset($1::jsonb)
        AS incoming(card_id text, companies text[], sources text)
      ON CONFLICT (card_id) DO UPDATE SET companies = EXCLUDED.companies,
        sources = EXCLUDED.sources, updated_at = now()
      WHERE (existing.companies, existing.sources) IS DISTINCT FROM (EXCLUDED.companies, EXCLUDED.sources)`, [JSON.stringify(desired)]);
    if (result.rowCount !== plan.inserted + plan.updated) fail('元信息实际写入数量与预检不符。');
    const expected = new Map(before.map(row => [row.card_id, row]));
    for (const row of desired) expected.set(row.card_id, row);
    const expectedHash = rowDigest([...expected.values()]);
    const readback = await inspectDatabase(client, database);
    if (rowDigest(readback) !== expectedHash) fail('事务内公司元信息回读不一致。');
    Object.assign(receipt, plan, {databaseDigest: expectedHash, expectedCounts: countsOf(readback)});
    // If the COMMIT response is lost, never report a rollback as proof that it
    // did not commit. The persisted receipt and backup support explicit recovery.
    receipt.commitState = 'unknown';
    await client.query('COMMIT');
    receipt.commitState = 'committed';
    const persisted = (await client.query('SELECT card_id, companies, sources FROM public.card_companies ORDER BY card_id')).rows;
    if (rowDigest(persisted) !== expectedHash) fail('提交后公司元信息回读不一致，请按结果记录核对生产库。');
    receipt.fullReadback = true;
    return receipt;
  } catch (error) { await client.query('ROLLBACK').catch(() => {}); throw error; }
}

export function verifyCounts(payload, expected) {
  if (!payload || Object.keys(payload).length !== 1 || !payload.counts || typeof payload.counts !== 'object'
    || Object.values(payload.counts).some(n => !Number.isInteger(n) || n <= 0)
    || JSON.stringify(Object.entries(payload.counts).sort()) !== JSON.stringify(Object.entries(expected).sort())) {
    fail('线上公司数量接口与已同步的数据库不一致。');
  }
}
