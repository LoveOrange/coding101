// Checks knowledge-tree articles against the article rules in AGENTS.md.
//
// Usage:
//   node scripts/check-article-format.mjs                  report structural problems, exit 0
//   node scripts/check-article-format.mjs --strict         exit 1 when structural problems remain
//   node scripts/check-article-format.mjs --list           also print style warnings
//   node scripts/check-article-format.mjs --style-strict   exit 1 when style warnings remain
//   node scripts/check-article-format.mjs -- file.mdx ...  only check the given files
//
// Structural problems: missing "面试核心", references or card fields, no
// [卡] link in the core section, unnumbered long articles.
// Style warnings: templates and wording ruled out by AGENTS.md, long
// sentences, meta-commentary about sources, hedge and
// negation density, statement-style headings, non-standard self-test
// comments and reference lists split by blank lines.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DOCS = path.join(ROOT, 'docs');
const argv = process.argv.slice(2);
const flags = new Set(argv.filter((a) => a.startsWith('--')));
const only = argv.includes('--') ? argv.slice(argv.indexOf('--') + 1).map((f) => path.resolve(f)) : null;

const SELF_TEST_COMMENT = '<!-- 本题为本站原理自测，尚未核验对应公司面经，不作公司归属。 -->';
const HEADING_TEMPLATES = /不是.*而是|不能.*只能|真正的|本质|看似|不只是|不仅是|不等于/;
const BODY_WORDS = /不是[^。；\n]{0,30}而是|真正的|底层逻辑|闭环|看似/;
const HEDGES = /通常|可能|一般/g;
const NEGATIONS = /不能|不代表|不等于|不表示/g;
// A heading reads as a statement when a verb links a subject to a predicate.
const STATEMENT_VERBS = /(是|会(?!话)|让|把|使|要|需要|决定|锁住|阻止|保护|描述|形成|负责|提供|限制|服务于|指向|保存|携带|只能|必须|应|可以|仍)/;
const META_COMMENTARY = /(根据|依据|按照)[^。；]{0,20}(说明|资料|文档|历史)[^。；]{0,8}(解释|推断|理解)的|(官方|文档|资料)[^。；]{0,6}(并未|没有)将|这是[^。；]{2,24}的(背景|解释|推断|说法)[。；]/;
const SENTENCE_LIMIT = 80; // characters, code and link text collapsed
const HEDGE_LIMIT = 2.5; // per 1000 characters of prose
const NEGATION_LIMIT = 1.5;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.mdx?$/.test(entry.name)) out.push(full);
  }
  return out;
}

function stripCode(text) {
  return text.replace(/^(```|~~~)[\s\S]*?^\1/gm, '');
}

function prose(body) {
  return body
    .split('\n')
    .filter((l) => !/^(#|\||<|\s*$|-\s*\[.*\]\(http)/.test(l))
    .join('\n');
}

function checkFile(file) {
  const text = fs.readFileSync(file, 'utf8');
  const front = /^---\n([\s\S]*?)\n---\n/.exec(text);
  if (!front || !/^knowledge:\s*\n\s+id:/m.test(front[1])) return null;
  if (/^draft:\s*true/m.test(front[1])) return null;

  const body = stripCode(text.slice(front[0].length));
  const h2 = [...body.matchAll(/^## (.+)$/gm)].map((m) => m[1]);
  const problems = [];
  const warnings = [];

  const coreMatch = /^## [\d. ]*面试核心.*\n([\s\S]*?)(?=^## )/m.exec(body);
  const hasCore = Boolean(coreMatch) || /^:::tip 面试核心/m.test(body);
  if (!hasCore) problems.push('缺少面试核心');

  const refsMatch = /^## [\d. ]*参考资料.*\n([\s\S]*?)(?=^## |$(?![\s\S]))/m.exec(body);
  const hasRefs = Boolean(refsMatch) || h2.some((h) => /参考文献/.test(h)) || /^:::\w+ 参考资料/m.test(body);
  if (!hasRefs) problems.push('缺少参考资料');
  if (refsMatch && /^- .*\n\s*\n- /m.test(refsMatch[1])) warnings.push('参考资料列表中间有空行');

  const questionSplit = body.split(/^## [\d. ]*面试题.*$/m);
  if (questionSplit.length < 2) {
    problems.push('缺少面试题');
  } else {
    const questions = questionSplit[1].split(/^## /m)[0];
    const cards = questions.split(/^### /m).slice(1);
    cards.forEach((card) => {
      const title = card.split('\n')[0];
      const missing = [];
      if (!/\{#[a-z0-9-]+\}\s*$/.test(title)) missing.push('显式 ID');
      if (!/^\*\*出现公司\*\*/m.test(card)) missing.push('出现公司');
      if (!/^\*\*考察重点\*\*/m.test(card)) missing.push('考察重点');
      if (!/^\*\*相关内容\*\*/m.test(card)) missing.push('相关内容');
      if (!/<summary>参考回答<\/summary>/.test(card)) missing.push('参考回答');
      if (missing.length) problems.push(`题目「${title.slice(0, 30)}」缺少${missing.join('、')}`);
      if (/本站自测/.test(card) && /<!--[^>]*自测/.test(card) && !card.includes(SELF_TEST_COMMENT)) {
        warnings.push(`自测注释不是统一写法：${title.slice(0, 30)}`);
      }
    });
    if (cards.length && coreMatch && !/\[卡\]\(#/.test(coreMatch[1])) problems.push('面试核心没有 [卡] 链接');
  }

  if (h2.length >= 3 && h2.some((h) => !/^\d+\. /.test(h))) problems.push('二级标题没有连续编号');

  let inQuestions = false;
  for (const [, level, raw] of body.matchAll(/^(#{2,3}) (.+)$/gm)) {
    if (level === '##') inQuestions = /面试题|常见问题/.test(raw);
    else if (inQuestions) continue;
    const title = raw.replace(/\s*\{#[^}]+\}\s*$/, '').replace(/^[\d.]+\s+/, '').replace(/`[^`]*`/g, 'X');
    if (HEADING_TEMPLATES.test(title)) warnings.push(`标题模板：${title}`);
    else if (title.length > 6 && STATEMENT_VERBS.test(title) && !/[？?]$/.test(title)) warnings.push(`标题像判断句：${title}`);
  }

  body.split('\n').forEach((line, i) => {
    if (!line.startsWith('#') && BODY_WORDS.test(line)) warnings.push(`正文用词（约第 ${i + 1} 行）：${line.slice(0, 40)}`);
  });

  for (const line of body.split('\n')) {
    if (/^(#|\||<|-->|\s*$|\*\*相关内容)/.test(line) || /https?:\/\//.test(line)) continue;
    const plain = line.replace(/`[^`]*`/g, 'X').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/^\s*([-*]|\d+\.)\s+/, '');
    for (const sentence of plain.split(/(?<=[。！？])/)) {
      const s = sentence.trim();
      if (s.length > SENTENCE_LIMIT) warnings.push(`长句（${s.length} 字）：${s.slice(0, 40)}…`);
      if (META_COMMENTARY.test(s)) warnings.push(`元叙述：${s.slice(0, 40)}`);
    }
  }

  const text1k = prose(body).replace(/\s/g, '').length / 1000 || 1;
  const hedgeRate = (prose(body).match(HEDGES) ?? []).length / text1k;
  const negationRate = (prose(body).match(NEGATIONS) ?? []).length / text1k;
  if (hedgeRate > HEDGE_LIMIT) warnings.push(`限定词偏多：每千字 ${hedgeRate.toFixed(1)} 个“通常/可能/一般”（上限 ${HEDGE_LIMIT}）`);
  if (negationRate > NEGATION_LIMIT) warnings.push(`否定句偏多：每千字 ${negationRate.toFixed(1)} 个“不能/不代表/不等于/不表示”（上限 ${NEGATION_LIMIT}）`);

  return {file: path.relative(ROOT, file), problems, warnings};
}

const files = only ?? walk(DOCS);
const results = files.map(checkFile).filter(Boolean);
const failing = results.filter((r) => r.problems.length);
const warned = results.filter((r) => r.warnings.length);

console.log(`文章格式检查：${results.length} 篇知识树文章，${failing.length} 篇有结构问题，${warned.length} 篇有文风提示。`);
const showStyle = flags.has('--list') || flags.has('--style-strict');
const shown = showStyle ? results.filter((r) => r.problems.length || r.warnings.length) : failing;
for (const r of shown) {
  console.log(`- ${r.file}`);
  for (const p of r.problems) console.log(`    ✗ ${p}`);
  if (showStyle) for (const w of r.warnings) console.log(`    · ${w}`);
}

if (flags.has('--strict') && failing.length) process.exit(1);
if (flags.has('--style-strict') && (failing.length || warned.length)) process.exit(1);
