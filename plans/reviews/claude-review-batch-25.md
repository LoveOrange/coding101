# Claude 校验 · 第 25 批（2026-10-30）

范围：系统设计方法与案例（7 篇，含栏目首页与题目首页）、面向对象程序设计（2 篇）和 MIT 6.824（3 篇），共 12 篇。至此系统设计栏目全部完成。校验后直接修改，Lin 的审阅异步进行。

校验项：

1. 技术事实：对照 Google SRE、AWS Well-Architected、RFC 9309 / 9110 / 9111、PostgreSQL、Spanner 与 DynamoDB 文档、MapReduce 论文和 MIT 6.5840 2026 年课程页面。
2. 推演示例：逐一推算。
   - 日请求 8640 万次对应 1000 QPS。
   - 1000 请求 × 100 KB 约为 100 MB/s，约 800 Mb/s。
   - Little's Law：5000 QPS × 100 ms = 500 个在途请求。
   - 单区故障：每区 4 台、每台 1000 QPS，剩余 8000 QPS。
   - 爬虫：每周 10⁹ 页约 1653 页/秒、约 6.61 Gb/s；三年约 78 PB；每 30 天 1000 亿次查询约 38580 QPS。
   - 回源：命中率 99% 时缓存故障，回源量放大 100 倍。
   - MapReduce 平均值示例：`[1, 3]` 与 `[10]` 的整体均值是 14/3。
3. 与相邻文章是否矛盾，站内锚点是否存在：99 个站内链接都存在。
4. 参考资料：37 个外部链接中，36 个返回对应页面。Little 的论文 DOI（10.1287/opre.9.3.383）对脚本返回 403（出版方的访问限制），编号与 *Operations Research* 9(3) 一致，链接保留。

## 结论

| 文章 | 结论 | 修改 |
| --- | --- | --- |
| [系统设计（栏目首页）](../../docs/system-design/system-design/index.mdx) | ✅ 通过 | — |
| [系统设计面试](../../docs/system-design/system-design/interview-process.mdx) | ✅ 通过 | — |
| [系统架构](../../docs/system-design/system-design/universe_architecture.mdx) | ✅ 通过 | — |
| [容量规划](../../docs/system-design/system-design/capacity-slo-failure-model.mdx) | ✅ 通过 | — |
| [数据拆分](../../docs/system-design/system-design/read-write-paths-hotspots-sharding.mdx) | ✅ 通过 | — |
| [系统设计题](../../docs/system-design/system-design/system-design-problems/index.mdx) | ✅ 已修改 | 面试核心条目格式；frontmatter；侧边栏位置 |
| [设计网页爬虫](../../docs/system-design/system-design/system-design-problems/web_crawler/index.mdx) | ✅ 已修改 | 面试核心条目格式；frontmatter |
| [面向对象程序设计](../../docs/system-design/ood/index.mdx) | ✅ 已修改 | 正文重写 |
| [SOLID 面向对象设计原则](../../docs/system-design/ood/solid.mdx) | ✅ 通过 | — |
| [MIT 6.824](../../docs/system-design/mit6.824/index.mdx) | ✅ 已修改 | 正文重写 |
| [Lec 1: MapReduce](../../docs/system-design/mit6.824/1.%20MapReduce/lec1_mapreduce.mdx) | ✅ 通过 | — |
| [实验 1: MapReduce](../../docs/system-design/mit6.824/1.%20MapReduce/lab1_mapreduce.mdx) | ✅ 通过 | — |

## 修改内容

### 系统设计题、设计网页爬虫

面试核心以「**设计约束。**」「**URL 去重。**」这类加粗小标题开头，已改为句中加粗，内容不变。

两篇的 frontmatter 都写成 `position`，已改为 `sidebar_position`。

「系统设计题」分类原本 `position: 1`，在侧边栏中排在「系统设计面试」（2）之前，而栏目首页把它列在最后。已改为 6，让侧边栏顺序与首页列表一致。

两篇正文都是很短的断句，例如「规则用于表达抓取偏好，不构成访问授权。」，读起来像要点列表，与站内其他文章差别较大。这次只核对了事实、修正了格式，没有重写正文，建议 Lin 审阅时考虑交给 Codex 做一次文风修订。

### 面向对象程序设计（栏目首页）

原文有几处没有来源的频率和公司判断：

- 「这类面试不像……那样常见」。
- 「比如亚马逊就经常进行这种面试」。
- 对比表中的「公司例子：互联网巨头……如亚马逊」。

文风约定不允许这类说法。原文标题带「[WIP]」，开头也是「你可能会遇到……」式的铺垫。

已重写：

- 先定义面向对象设计，再用图书馆和共享出行两个例子说明考什么。
- 对比表去掉公司一列，补上「主要产出」。
- 考察重点改为可以自查的四个问题，并链接到 SOLID 一文。
- 结尾说明栏目仍在整理。

### MIT 6.824（栏目首页）

原文结尾写「本课程质量极高，可以说学习完本课程后，足以应对大多数面试中的分布式系统问题」，这是没有依据的判断；正文也没有提到课程已改编号。

课程官网现在显示「6.5840: Distributed Systems, Spring 2026」，两篇笔记里已经写了「旧名 6.824，现名 6.5840」，首页却没有。

已重写：

- 写明现编号 6.5840。
- 按 2026 年课程页面列出实验的顺序：MapReduce、键值服务、Raft。
- 补上本目录两篇笔记的链接。
- 提醒读者，实验要求以所选学期的页面为准。

## 已验证的断言

- RFC 9309：
  - robots.txt 返回 4xx 时可以抓取。
  - 网络错误或返回 5xx 时，按完全禁止处理。
  - `Crawl-delay` 不在标准范围内。
- HTTP：
  - 302 是临时重定向。
  - 撤销要求严格时，可以使用 `Cache-Control: no-store`。
  - 两种验证字段同时出现时，以 ETag 条件为准。
- MapReduce 论文：
  - Map 的中间结果存在 Worker 本地，所以已完成的 Map 在节点故障后也要重做。
  - Reduce 先写临时文件，再原子重命名。
  - Master 是单点。
- MIT 6.5840 2026 年实验 1：
  - 在 `src` 目录运行 `make mr`。
  - 10 秒后重派任务。
  - 中间文件建议命名为 `mr-X-Y`，分区用 `ihash(key)`。
  - Go 1.17 起可以用 `os.CreateTemp` 创建临时文件。
- SOLID 中关于里氏替换的说法（前置条件只能放宽、后置条件只能加强）与 Liskov–Wing 论文一致。

下一批：面试准备、工具（Git）、AI 与站点首页。
