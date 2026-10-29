/**
 * Article status ledger: one row per public doc, one column per stage
 * (Codex generation, Claude review, Lin review) and per translation language.
 *
 * plans/content-status.json is the source of truth; plans/content-status.md is
 * rendered from it. Every status records the hash of the article when it was
 * set, so a later edit turns a review or translation "stale" on its own.
 *
 *   node scripts/content-status.mjs                 add new docs, drop removed ones, re-render
 *   node scripts/content-status.mjs --check         fail if the ledger is out of date
 *   node scripts/content-status.mjs mark <column> <status> <selector...> [--note "..."]
 *
 * A selector is an article key, a docs path, a path prefix ending in "/", or "*" for every article.
 */
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import {DEFAULT_PARSE_FRONT_MATTER, parseMarkdownFile} from '@docusaurus/utils';

const LEDGER = 'plans/content-status.json';
const REPORT = 'plans/content-status.md';
const STAGES = [
  {id: 'codex', label: 'Codex 生成'},
  {id: 'claude', label: 'Claude 校验'},
  {id: 'lin', label: 'Lin 校验'},
];
const LANGUAGE_LABELS = {en: 'English', ja: '日本語'};
const STATUSES = ['todo', 'reviewing', 'done', 'changes', 'skip'];
const CELL = {todo: '·', reviewing: '👀', done: '✅', stale: '🔁', changes: '⚠️', skip: '—'};

const today = () => new Date().toLocaleDateString('sv-SE', {timeZone: 'Asia/Shanghai'});
const hashOf = (text) => crypto.createHash('sha256').update(text).digest('hex').slice(0, 12);

async function filesIn(directory) {
  const entries = await fs.readdir(directory, {withFileTypes: true});
  return (await Promise.all(entries.map((entry) => entry.isDirectory()
    ? filesIn(path.join(directory, entry.name)) : [path.join(directory, entry.name)]))).flat();
}

async function scanDocs() {
  const docs = [];
  for (const filePath of (await filesIn('docs')).filter((file) => /\.mdx?$/.test(file)).sort()) {
    const source = await fs.readFile(filePath, 'utf8');
    const {frontMatter, contentTitle} = await parseMarkdownFile({filePath, fileContent: source, parseFrontMatter: DEFAULT_PARSE_FRONT_MATTER});
    if (frontMatter.draft || frontMatter.unlisted) continue;
    const relative = path.relative('docs', filePath).split(path.sep).join('/');
    docs.push({
      key: frontMatter.knowledge?.id ?? relative.replace(/\.mdx?$/, ''),
      path: relative,
      title: frontMatter.title ?? contentTitle ?? path.basename(relative).replace(/\.mdx?$/, ''),
      hash: hashOf(source),
    });
  }
  return docs;
}

async function readLedger() {
  try {
    return JSON.parse(await fs.readFile(LEDGER, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    return {languages: Object.keys(LANGUAGE_LABELS), articles: {}};
  }
}

const columnsOf = (ledger) => [
  ...STAGES,
  ...ledger.languages.map((id) => ({id, label: LANGUAGE_LABELS[id] ?? id})),
];

/** Bring the ledger in line with docs/: new docs get a todo row, removed docs are dropped. */
function sync(ledger, docs) {
  const byPath = new Map(Object.entries(ledger.articles).map(([key, row]) => [row.path, key]));
  const articles = {};
  const added = [];
  for (const doc of docs) {
    // A doc keeps its row when it moves (same key) or gains a knowledge id (same path).
    const previous = ledger.articles[doc.key] ?? ledger.articles[byPath.get(doc.path)];
    if (!previous) added.push(doc.path);
    const row = {path: doc.path, title: doc.title, status: {}};
    for (const column of columnsOf(ledger)) row.status[column.id] = previous?.status?.[column.id] ?? {state: 'todo'};
    articles[doc.key] = row;
  }
  const kept = new Set(Object.keys(articles));
  const removed = Object.entries(ledger.articles).filter(([key, row]) => !kept.has(key) && !docs.some((doc) => doc.path === row.path)).map(([, row]) => row.path);
  return {ledger: {...ledger, articles}, added, removed};
}

/** Reviews and translations go stale when the article changes; generation does not. */
function effective(columnId, entry, hash) {
  if (entry.state === 'done' && columnId !== 'codex' && entry.hash !== hash) return 'stale';
  return entry.state;
}

function render(ledger, docs) {
  const hashes = new Map(docs.map((doc) => [doc.key, doc.hash]));
  const columns = columnsOf(ledger);
  const rows = Object.entries(ledger.articles);
  const lines = [
    '# 文章状态',
    '',
    `由 \`scripts/content-status.mjs\` 根据 \`${LEDGER}\` 生成，不要手工编辑。共 ${rows.length} 篇公开文章。`,
    '',
    `图例：${CELL.done} 完成 · ${CELL.stale} 文章已改动，需要重新校验或翻译 · ${CELL.changes} 校验发现问题，待修改 · ${CELL.reviewing} 审阅中 · ${CELL.todo} 未开始 · ${CELL.skip} 不适用`,
    '',
    '## 汇总',
    '',
    '| 状态 | ' + columns.map((column) => column.label).join(' | ') + ' |',
    '| --- | ' + columns.map(() => '---:').join(' | ') + ' |',
  ];
  for (const state of ['done', 'stale', 'reviewing', 'changes', 'todo', 'skip']) {
    const counts = columns.map((column) => rows.filter(([key, row]) => effective(column.id, row.status[column.id], hashes.get(key)) === state).length);
    lines.push(`| ${CELL[state]} | ${counts.join(' | ')} |`);
  }
  const sections = new Map();
  for (const entry of rows) {
    const section = entry[1].path.includes('/') ? entry[1].path.split('/')[0] : '(根目录)';
    if (!sections.has(section)) sections.set(section, []);
    sections.get(section).push(entry);
  }
  for (const [section, entries] of sections) {
    lines.push('', `## ${section}`, '', '| 文章 | ' + columns.map((column) => column.label).join(' | ') + ' |', '| --- | ' + columns.map(() => ':---:').join(' | ') + ' |');
    for (const [key, row] of entries) {
      const cells = columns.map((column) => CELL[effective(column.id, row.status[column.id], hashes.get(key))]);
      lines.push(`| [${row.title.replaceAll('|', '\\|')}](../docs/${encodeURI(row.path)}) | ${cells.join(' | ')} |`);
    }
  }
  return lines.join('\n') + '\n';
}

// One line per article keeps the file short and each status change a one-line diff.
const serialize = (ledger) => [
  '{',
  `  "languages": ${JSON.stringify(ledger.languages)},`,
  '  "articles": {',
  Object.entries(ledger.articles).map(([key, row]) => `    ${JSON.stringify(key)}: ${JSON.stringify(row)}`).join(',\n'),
  '  }',
  '}',
].join('\n') + '\n';

async function mark(ledger, docs, args) {
  const noteAt = args.indexOf('--note');
  const note = noteAt >= 0 ? args[noteAt + 1] : undefined;
  const [columnId, state, ...selectors] = noteAt >= 0 ? args.slice(0, noteAt) : args;
  const columns = columnsOf(ledger).map((column) => column.id);
  if (!columns.includes(columnId)) throw new Error(`unknown column "${columnId}"; use one of: ${columns.join(', ')}`);
  if (!STATUSES.includes(state)) throw new Error(`unknown status "${state}"; use one of: ${STATUSES.join(', ')}`);
  if (!selectors.length) throw new Error('give at least one article key, docs path, path prefix ending in "/", or "*"');
  const hashes = new Map(docs.map((doc) => [doc.key, doc.hash]));
  const matched = Object.entries(ledger.articles).filter(([key, row]) => selectors.some((selector) => {
    const target = selector.replace(/^docs\//, '');
    return target === '*' || key === target || row.path === target || (target.endsWith('/') && row.path.startsWith(target));
  }));
  if (!matched.length) throw new Error(`no article matches ${selectors.join(', ')}`);
  for (const [key, row] of matched) {
    row.status[columnId] = state === 'todo' ? {state} : {state, hash: hashes.get(key), date: today(), ...(note ? {note} : {})};
  }
  return matched.length;
}

const [command, ...rest] = process.argv.slice(2);
const docs = await scanDocs();
const {ledger, added, removed} = sync(await readLedger(), docs);

if (command === '--check') {
  const [ledgerText, reportText] = await Promise.all([LEDGER, REPORT].map((file) => fs.readFile(file, 'utf8').catch(() => '')));
  const problems = [];
  if (added.length) problems.push(`not in the ledger: ${added.join(', ')}`);
  if (removed.length) problems.push(`no longer in docs/: ${removed.join(', ')}`);
  if (ledgerText !== serialize(ledger) || reportText !== render(ledger, docs)) problems.push(`${LEDGER} or ${REPORT} is out of date`);
  if (problems.length) {
    console.error(`content-status: ${problems.join('\n  ')}\nRun npm run content-status to update.`);
    process.exit(1);
  }
  console.log(`content-status: ${docs.length} articles up to date`);
} else {
  if (command === 'mark') console.log(`content-status: marked ${await mark(ledger, docs, rest)} article(s)`);
  else if (command) throw new Error(`unknown command "${command}"`);
  await fs.writeFile(LEDGER, serialize(ledger));
  await fs.writeFile(REPORT, render(ledger, docs));
  if (added.length) console.log(`content-status: added ${added.length}: ${added.join(', ')}`);
  if (removed.length) console.log(`content-status: removed ${removed.length}: ${removed.join(', ')}`);
  console.log(`content-status: ${docs.length} articles → ${REPORT}`);
}
