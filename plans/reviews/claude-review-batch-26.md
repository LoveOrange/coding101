# Claude 校验 · 第 26 批（2026-10-30）

范围：站点简介、面试准备栏目 9 篇、AI 应用与 Agent 栏目首页和 ChatGPT 辅助复习，共 12 篇。校验后直接修改，Lin 的审阅异步进行。

校验项：

1. 事实与数字：逐条核对站内数据、面经样本表和练习题的预期结果。
2. 站内路由：文中引用的路由都存在。
   - `/interview-roadmaps/`、`/java-interview-roadmap/` 来自 `src/pages`。
   - `/questions` 由 `plugins/learning-content` 生成。
   - `/docs/tags/interview-preparation` 由标签生成。
3. 站内链接：123 个都能解析。其中 19 个指向 `questions.mdx` 的锚点，由 `TopicQuestionIndex` 组件按 `topic.id` 渲染，所以源文件里搜不到，构建后都存在。
4. 参考资料：36 个外部链接都返回对应页面，包括牛客与力扣的面经原帖。

## 结论

12 篇全部通过，没有修改。

| 文章 | 结论 |
| --- | --- |
| [Coding 101](../../docs/intro.md) | ✅ 通过 |
| [面试准备](../../docs/interview/index.mdx) | ✅ 通过 |
| [Java 校招复习范围](../../docs/interview/java-campus-review.mdx) | ✅ 通过 |
| [简历准备](../../docs/interview/resume.mdx) | ✅ 通过 |
| [项目准备](../../docs/interview/project-preparation.mdx) | ✅ 通过 |
| [研发类面试流程](../../docs/interview/interview-process.mdx) | ✅ 通过 |
| [代表题与练习](../../docs/interview/questions.mdx) | ✅ 通过 |
| [编码与 SQL 练习](../../docs/interview/coding-practice.mdx) | ✅ 通过 |
| [研发类面试复习指南](../../docs/interview/develop-roadmap.mdx) | ✅ 通过 |
| [面经考点与来源](../../docs/interview/interview-research.mdx) | ✅ 通过 |
| [AI 应用与 Agent](../../docs/ai/index.mdx) | ✅ 通过 |
| [ChatGPT 辅助面试复习](../../docs/chatgpt-guide/index.md) | ✅ 通过 |

## 已验证的断言

面经考点与来源：

- 表中共 40 个流程。编号从 I01 到 I41，缺 I06。
- 覆盖 17 家公司，逐一数过公司名称。
- 按时间分类：
  - 近 18 个月 7 个（I05、I22、I35–I39）。
  - 历史材料 17 个。
  - 年份不明 16 个。
  - 三类合计 40。
- 以采集日期 2026-09-11 为准，I22（2025-04-17）落在 18 个月内，I11（2024-11-07）属于历史材料。
- 考点表共 20 组，与「代表题与练习」中写的数量一致。

编码与 SQL 练习的预期结果：

- `abba` 中最长的无重复片段长度为 2。
- `[2,-1,3,0]` 在半开区间 `[1,4)` 上的和为 2。
- 区间合并的结果是 `[1,4]、[6,8]`。
- `[1,2,3]` 有 8 个子集，`[1,1,2]` 有 6 个不重复子集。
- 到第 4 级台阶有 5 种走法；第 2 级不能落脚时只剩 1 种（0→1→3→4）。
- SQL：
  - 每位客户的已支付统计为 `(1,2,130)、(2,1,30)、(3,0,0)`。
  - `HAVING SUM(amount) >= 100` 的结果为 `(1,130)`。

AI 首页：「2025-07 至 2026-09 公开的 167 篇候选人复盘」与 `plans/audits/agentic-development/frequency/README.md` 的主统计口径一致。

下一批：Git 与刷题栏目。
