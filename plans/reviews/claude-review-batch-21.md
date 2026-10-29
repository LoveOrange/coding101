# Claude 校验 · 第 21 批（2026-10-30）

范围：系统设计首页、分布式系统（6 篇，含栏目首页）和分布式数据（6 篇，含栏目首页），共 13 篇。校验后直接修改，Lin 的审阅异步进行。

校验项：

1. 技术事实：对照 Gilbert–Lynch 的 CAP 证明、Raft 论文、Herlihy–Wing、PostgreSQL 18 文档、etcd 3.6、Seata、Debezium 和 Kafka 文档。
2. 推演示例：逐一推算。
   - CAP 分区下的写后读。
   - W=2、R=2、N=3 部分写入造成的读回退。
   - 五副本 3/1/1 与 2/2/1 分布的票数。
   - 版本向量 (2,1)/(1,2)。
   - Saga 并发补偿：10 → 8 → 5，只释放 A 的 2 件，结果为 7。
3. 与相邻文章是否矛盾，站内锚点是否存在：96 个站内链接都存在。
4. 参考资料：33 个外部链接中 30 个返回对应页面，3 个已修正，见下文。

## 结论

| 文章 | 结论 | 修改 |
| --- | --- | --- |
| [系统设计简介](../../docs/system-design/index.mdx) | ✅ 已修改 | 正文重写 |
| [分布式系统（栏目首页）](../../docs/system-design/distributed-system/index.mdx) | ✅ 通过 | — |
| [CAP 理论](../../docs/system-design/distributed-system/cap-theorem.mdx) | ✅ 通过 | — |
| [主备复制](../../docs/system-design/distributed-system/primary_backup_replication.mdx) | ✅ 已修改 | frontmatter 字段名；1 个参考链接 |
| [一致性模型](../../docs/system-design/distributed-system/consistency-models-quorum-linearizability.mdx) | ✅ 通过 | — |
| [Raft](../../docs/system-design/distributed-system/raft-election-log-replication.mdx) | ✅ 通过 | — |
| [跨地域复制](../../docs/system-design/distributed-system/cross-region-replication-latency-conflicts.mdx) | ✅ 通过 | — |
| [分布式数据（栏目首页）](../../docs/system-design/distributed-data/index.mdx) | ✅ 通过 | — |
| [分布式一致性](../../docs/system-design/distributed-data/invariants-to-consistency-strategy.mdx) | ✅ 通过 | — |
| [2PC 与 TCC](../../docs/system-design/distributed-data/2pc-tcc-coordination-cost.mdx) | ✅ 通过 | — |
| [Saga](../../docs/system-design/distributed-data/saga-compensation-intermediate-state.mdx) | ✅ 已修改 | 1 个参考链接失效 |
| [Transactional Outbox 与 CDC](../../docs/system-design/distributed-data/outbox-cdc-reliable-events.mdx) | ✅ 通过 | — |
| [分布式流程恢复](../../docs/system-design/distributed-data/idempotency-reconciliation-manual-repair.mdx) | ✅ 已修改 | 1 个参考链接失效 |

## 修改内容

### 系统设计简介

原文是早期写法，有三个问题：

- 「非常重要的环节」「对综合能力要求较高」这类泛泛的说法。
- 「是很多大厂、尤其是外企的面试重点」是没有来源的频率判断，文风约定不允许这样写。
- 作为栏目首页，没有列出下面的任何子栏目。

已重写为三部分：

- 先定义系统设计，再说明面试考察的是从需求推出约束、解释方案和代价。
- 一句话说明栏目的组织方式。
- 按侧边栏顺序列出 12 个子栏目，每个附一句范围说明。

frontmatter 未改。

### 主备复制

- frontmatter 写的是 `position: 4`，Docusaurus 文档不认这个字段。已改为 `sidebar_position: 4`，侧边栏顺序与栏目首页的列表一致（CAP 之后、一致性模型之前）。
- 另外三个栏目首页（Redis 首页、system-design-problems 首页与其中两篇）也用了 `position`。它们是分类链接页，不影响排序，留到对应批次一并处理。
- 参考资料「Viewstamped Replication Revisited」原链接 `pmg.csail.mit.edu` 对请求返回 403，已改为 MIT DSpace 的正式记录（MIT-CSAIL-TR-2012-021）。

### Saga、分布式流程恢复（参考资料）

Temporal 文档改版后，`docs.temporal.io/encyclopedia/saga` 和 `docs.temporal.io/workflow-execution/failure-detection` 都返回 404：

- Saga 一篇改为 Temporal 官方博客「Saga Pattern Made Easy」。
- 流程恢复一篇改为文档中的「Failures and error handling」。

## 已验证的断言

- PostgreSQL 18：
  - `synchronous_commit=remote_write` 只能应对备库进程崩溃，挡不住操作系统崩溃；`on` 等远端 WAL 刷盘，`remote_apply` 等回放完成。
  - 长时间停在 prepared 状态的事务会持锁，并阻碍 `VACUUM`。
- Raft：
  - `currentTerm`、`votedFor` 和日志要在回复 RPC 前持久化。
  - 日志新旧先比最后条目的任期。
  - 只直接提交当前任期的条目。
  - ReadIndex 类线性读需要确认领导权，并等待 `lastApplied`。
  - etcd 3.6 支持 learner。
- `W+R>N` 只保证读写集合相交；`W>N/2` 保证写集合相交。
- TCC 分支状态表（无记录、TRIED、CONFIRMED、CANCELLED）覆盖空回滚与悬挂，与 Seata TCC Fence 的设计一致。

下一批：系统设计中的微服务治理、可靠性。
