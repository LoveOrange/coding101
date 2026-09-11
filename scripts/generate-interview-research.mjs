import fs from 'node:fs';
import assert from 'node:assert/strict';

const research = JSON.parse(fs.readFileSync('plans/audits/java-campus/research-sources.json', 'utf8'));
const themes = JSON.parse(fs.readFileSync('src/data/reviewPlans/interviewResearchThemes.json', 'utf8'));
const records = research.interviews.filter((record) => record.verified);
const byId = new Map(records.map((record) => [record.id, record]));
assert.equal(byId.size, records.length, '面经 ID 重复');
const direct = records.filter((record) => record.evidenceStatus === 'original_body_read');
const indexed = records.filter((record) => record.evidenceStatus === 'indexed_original_body_read');
assert.equal(direct.length + indexed.length, records.length, '存在未知来源核验状态');
const counts = Object.fromEntries(['recent','historical','unknown_year'].map((kind) => [kind,records.filter((record) => record.timeClass === kind).length]));
assert.equal(Object.values(counts).reduce((a,b) => a+b,0),records.length);
const companies = new Set(records.map((record) => record.company)).size;
const cell = (value) => String(value).replaceAll('|','／').replaceAll('\n',' ');
let text = `---
sidebar_position: 7
tags: [interview-preparation]
---

# 面经考点与来源

本页从牛客、力扣的候选人公开复盘中归纳 Java 后端准备时值得练习的问题，帮助你从考点回到原理、编码与项目材料。采集日期：${research.collectedAt}。

## 1. 样本范围

共整理 **${records.length} 个公司面试流程，覆盖 ${companies} 家公司**。同一候选人在同一公司的多轮合并；一篇个人长帖明确记录多家公司时，分别记录对应流程，因此不等于 ${records.length} 位候选人或 ${records.length} 篇独立文章。

其中 ${direct.length} 个流程直接读到原帖正文，${indexed.length} 个历史流程的正文来自搜索服务返回的原帖内容，直接页面暂未返回正文，详见下表标记。另有 ${research.interviews.length-records.length} 条材料尚未核验，不计入以上数量。企业题库、付费汇编和招聘宣传不作为独立面经。

| 时间范围 | 流程数 | 使用边界 |
| --- | --- | --- |
| 面试或发布日期在最近 18 个月 | ${counts.recent} | 区分面试日期和发布日期，后者不能证明实际面试时间 |
| 历史材料 | ${counts.historical} | 补充题型，不能代表当前校招季要求 |
| 年份尚未确认 | ${counts.unknown_year} | 保留考点线索，不参与近期趋势判断 |

这些是人工选择的公开样本，包含校招与实习，部分类型不明；不能据此估计全市场题目频率、录用标准或面试命中率。目前近期材料占比较低，**不将此表称为 2027 校招高频排名**。目标岗位的实际要求优先看[2027 校招岗位与投递](./campus-2027/index.mdx)。

## 2. 考点与复习入口

以下问题按相近概念和推理过程归纳，并非逐字摘录。每行来源支持该组中的部分考点，不意味着每家公司都问过整组问题。进入题目后先独立作答，再展开参考回答；需要补原理时使用题目下的“相关内容”。

| 考点 | 代表问题与练习方向 | 回查资料 | 样本出处 |
| --- | --- | --- | --- |
`;
for (const theme of themes) {
  const sources = theme.sources.map((id) => {assert(byId.has(id),`未核验样本：${id}`);return `[${id}](${byId.get(id).url})`;}).join('、');
  const link = theme.topicId ? `[题目与原理](./questions.mdx#${theme.topicId})` : '[项目准备](./project-preparation.mdx)';
  text += `| ${cell(theme.title)} | ${cell(theme.question)} | ${link} | ${sources} |\n`;
}
text += `
编码和 SQL 需要实际完成，使用[编码与 SQL 练习](./coding-practice.mdx)的输入、边界与自检条件。只有两周时，先按[Java 校招复习范围](./java-campus-review.mdx)选核心主题；更多时间再补机制与迁移练习。分布式一致性、AI、服务治理等方向由具体 JD 和项目触发。

## 3. 原始材料

“近期”依据表中注明的日期判断；未写出的年份和招聘类型不自行补全。表内公司归属和面试经历来自作者自述，本站没有独立验证其任职或录用结果。面经中的技术回答可能有误，本站参考回答须依据规范、官方文档或可验证示例理解。

<details>
<summary>查看 ${records.length} 个流程的来源、日期与类型</summary>

| 编号 | 公司与原帖 | 招聘类型 | 日期依据 | 材料范围 |
| --- | --- | --- | --- | --- |
`;
for (const record of records) {
  const date = record.interviewDate ? `面试：${record.interviewDate}` : record.publishedDate ? `发布：${record.publishedDate}` : '具体年份未确认';
  const range = {recent:'近 18 个月日期',historical:'历史材料',unknown_year:'年份不明'}[record.timeClass];
  const note = record.evidenceStatus === 'indexed_original_body_read' ? '；仅检索返回的原帖正文' : '';
  text += `| ${record.id} | ${cell(record.company)} · [${cell(record.title)}](${record.url}) | ${cell(record.type || '未明确')} | ${date} | ${range}${note} |\n`;
}
text += '\n</details>\n\n用这些材料了解追问方向即可。整理自己的回答时，应能解释条件、机制与边界，并通过代码、SQL、时序或项目证据核对。\n';
text = text.replace(/(?:^\|.*\n)+/gm, (table) => '<div className="campus-resource-table" tabIndex={0} role="region" aria-label="面经资料表格，可横向滚动">\n\n'+table+'\n</div>\n');
const output = 'docs/interview/interview-research.mdx';
if (process.argv.includes('--check')) assert.equal(fs.readFileSync(output,'utf8'),text,`运行 node scripts/generate-interview-research.mjs 更新 ${output}`);
else fs.writeFileSync(output,text);
console.log(`面经页面${process.argv.includes('--check')?'检查通过':'已生成'}：${records.length} 个流程，${companies} 家公司，${themes.length} 组考点。`);
