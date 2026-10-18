// Checks knowledge-tree articles against the article rules in AGENTS.md.
//
// Usage:
//   node scripts/check-article-format.mjs                  report structural problems, exit 0
//   node scripts/check-article-format.mjs --strict         exit 1 when structural problems remain
//   node scripts/check-article-format.mjs --list           also print advisory style hints
//   node scripts/check-article-format.mjs --style-strict   deprecated alias for --strict --list
//   node scripts/check-article-format.mjs -- file.mdx ...  only check the given files
//
// Structural problems: missing "面试核心", references or card fields, no
// [卡] link in the core section, non-standard self-test attribution comments,
// unnumbered long articles.
// Advisory style hints: templates, wording, long sentences, meta-commentary
// about sources, statement-style headings and reference-list spacing.
// These heuristics need editorial judgment and never affect the exit code.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DOCS = path.join(ROOT, 'docs');
const argv = process.argv.slice(2);
const flags = new Set(argv.filter((a) => a.startsWith('--')));
const only = argv.includes('--') ? argv.slice(argv.indexOf('--') + 1).map((f) => path.resolve(f)) : null;
const legacyStyleStrict = flags.has('--style-strict');
const strict = flags.has('--strict') || legacyStyleStrict;
const showStyle = flags.has('--list') || legacyStyleStrict;

if (legacyStyleStrict) {
  console.warn('--style-strict 已弃用，现等同于 --strict --list；文风提示供通读判断，不影响退出码。');
}

const SELF_TEST_COMMENT = '<!-- 本题为本站原理自测，尚未核验对应公司面经，不作公司归属。 -->';
const HEADING_TEMPLATES = /不是.*而是|不能.*只能|真正的|本质|看似|不只是|不仅是|不等于/;
const BODY_WORDS = /不是[^。；\n]{0,30}而是|真正的|底层逻辑|闭环|看似/;
// A heading reads as a statement when a verb links a subject to a predicate.
const STATEMENT_VERBS = /(是|会(?!话)|让|把|使|要|需要|决定|锁住|阻止|保护|描述|形成|负责|提供|限制|服务于|指向|保存|携带|只能|必须|应|可以|仍)/;
const META_COMMENTARY = /(根据|依据|按照)[^。；]{0,20}(说明|资料|文档|历史)[^。；]{0,8}(解释|推断|理解)的|(官方|文档|资料)[^。；]{0,6}(并未|没有)将|这是[^。；]{2,24}的(背景|解释|推断|说法)[。；]/;
const SENTENCE_REVIEW_THRESHOLD = 50; // A prompt to review readability, not a length limit.

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.mdx?$/.test(entry.name)) out.push(full);
  }
  return out;
}

// Sentence length as AGENTS.md counts it: one per Chinese character, one per
// English word, number or inline code span, punctuation not counted.
function sentenceLength(sentence) {
  return sentence
    .replace(/`[^`]*`/g, 'X')
    .replace(/\*\*/g, '')
    .replace(/[A-Za-z0-9_.+\-/=#<>@:]+/g, 'W')
    .replace(/[\s，。；：、（）“”‘’！？()【】《》「」]/g, '').length;
}

function stripCode(text) {
  return text.replace(/^(```|~~~)[\s\S]*?^\1/gm, '');
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
      if (!/^\*\*考察重点\*\*/m.test(card)) missing.push('考察重点');
      if (!/^\*\*相关内容\*\*/m.test(card)) missing.push('相关内容');
      if (!/<summary>参考回答<\/summary>/.test(card)) missing.push('参考回答');
      if (missing.length) problems.push(`题目「${title.slice(0, 30)}」缺少${missing.join('、')}`);
      const selfTestComments = [...card.matchAll(/<!--[\s\S]*?-->/g)]
        .map(([comment]) => comment)
        .filter((comment) => comment.includes('自测'));
      if (selfTestComments.some((comment) => comment !== SELF_TEST_COMMENT)) {
        problems.push(`自测题缺少统一归属注释：${title.slice(0, 30)}`);
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
    const plain = line.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/^\s*([-*]|\d+\.)\s+/, '');
    for (const sentence of plain.split(/[。！？；]/)) {
      const n = sentenceLength(sentence);
      if (n > SENTENCE_REVIEW_THRESHOLD) warnings.push(`长句待复核（${n} 字）：${sentence.trim().slice(0, 40)}`);
      if (META_COMMENTARY.test(sentence + '。')) warnings.push(`元叙述：${sentence.trim().slice(0, 40)}`);
    }
  }

  return {file: path.relative(ROOT, file), problems, warnings};
}

const files = only ?? walk(DOCS);
const results = files.map(checkFile).filter(Boolean);
const failing = results.filter((r) => r.problems.length);
const warned = results.filter((r) => r.warnings.length);

console.log(`文章格式检查：${results.length} 篇知识树文章，${failing.length} 篇有结构问题，${warned.length} 篇有文风提示。`);
const shown = showStyle ? results.filter((r) => r.problems.length || r.warnings.length) : failing;
if (showStyle && warned.length) console.log('文风提示供通读复核，不要求清零；请按准确性、完整性和连贯性判断是否修改。');
for (const r of shown) {
  console.log(`- ${r.file}`);
  for (const p of r.problems) console.log(`    ✗ ${p}`);
  if (showStyle) for (const w of r.warnings) console.log(`    · ${w}`);
}

if (strict && failing.length) process.exit(1);
