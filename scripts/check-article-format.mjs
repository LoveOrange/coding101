// Checks knowledge-tree articles against the article structure in AGENTS.md.
//
// Usage:
//   node scripts/check-article-format.mjs            report problems, always exit 0
//   node scripts/check-article-format.mjs --strict   exit 1 when any structural problem remains
//   node scripts/check-article-format.mjs --list     also print every file with its problems
//
// Structural problems: missing "面试核心", missing references, card fields
// missing, no [卡] link in the core section, unnumbered long articles.
// Style warnings (never fatal): headings that use the templates AGENTS.md
// rules out, and wording such as "真正的" or "闭环" in body text.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DOCS = path.join(ROOT, 'docs');
const args = new Set(process.argv.slice(2));

const HEADING_TEMPLATES = /不是.*而是|不能.*只能|真正的|本质|看似|不只是|不仅是|不等于/;
const BODY_WORDS = /不是[^。；\n]{0,30}而是|真正的|底层逻辑|闭环|看似/;

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

  const hasRefs = h2.some((h) => /参考资料|参考文献/.test(h)) || /^:::\w+ 参考资料/m.test(body);
  if (!hasRefs) problems.push('缺少参考资料');

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
    });
    if (cards.length && coreMatch && !/\[卡\]\(#/.test(coreMatch[1])) problems.push('面试核心没有 [卡] 链接');
  }

  if (h2.length >= 3 && h2.some((h) => !/^\d+\. /.test(h))) problems.push('二级标题没有连续编号');

  const sectionHeadings = [...body.matchAll(/^(#{2,3}) (.+)$/gm)];
  let inQuestions = false;
  for (const [, level, title] of sectionHeadings) {
    if (level === '##') inQuestions = /面试题|常见问题/.test(title);
    else if (inQuestions) continue;
    if (HEADING_TEMPLATES.test(title)) warnings.push(`标题模板：${title}`);
  }
  body.split('\n').forEach((line, i) => {
    if (!line.startsWith('#') && BODY_WORDS.test(line)) warnings.push(`正文用词（约第 ${i + 1} 行）：${line.slice(0, 40)}`);
  });

  return {file: path.relative(ROOT, file), problems, warnings};
}

const results = walk(DOCS).map(checkFile).filter(Boolean);
const failing = results.filter((r) => r.problems.length);
const warned = results.filter((r) => r.warnings.length);

console.log(`文章格式检查：${results.length} 篇知识树文章，${failing.length} 篇有结构问题，${warned.length} 篇有文风提示。`);
const shown = args.has('--list') ? results.filter((r) => r.problems.length || r.warnings.length) : failing;
for (const r of shown) {
  console.log(`- ${r.file}`);
  for (const p of r.problems) console.log(`    ✗ ${p}`);
  if (args.has('--list')) for (const w of r.warnings) console.log(`    · ${w}`);
}

if (args.has('--strict') && failing.length) process.exit(1);
