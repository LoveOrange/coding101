# Claude 校验 · 第 17 批（2026-10-29）

范围：消息与中间件栏目 6 篇（含栏目首页）。校验后直接修改，Lin 的审阅异步进行。

校验项：

1. 技术事实与版本基线。文中注明了 Kafka 4.1 的普通消费者组、RabbitMQ 4.1、自管 Elasticsearch 8.19，以及 Kubernetes CronJob/Job。
2. 实现细节：这些系统没有在本地部署，逐条对照官方文档。本地 Docker 引擎这次也没有响应。
3. 与相邻文章是否矛盾，站内锚点是否存在：49 个站内链接都存在。
4. 参考资料：34 个外部链接都返回对应页面。其中 1 个是 MySQL 参考手册，第 15 批已经确认过。

## 结论

6 篇全部通过，没有修改。

| 文章 | 结论 |
| --- | --- |
| [消息与中间件（栏目首页）](../../docs/basic-knowledge/middleware/index.mdx) | ✅ 通过 |
| [消息队列](../../docs/basic-knowledge/middleware/kafka-rabbitmq-queue-semantics.mdx) | ✅ 通过 |
| [消息可靠性](../../docs/basic-knowledge/middleware/message-ack-retry-dead-letter.mdx) | ✅ 通过 |
| [消息幂等性](../../docs/basic-knowledge/middleware/idempotent-consumption-order-duplicates.mdx) | ✅ 通过 |
| [Elasticsearch](../../docs/basic-knowledge/middleware/elasticsearch-inverted-index-refresh-visibility.mdx) | ✅ 通过 |
| [分布式任务调度](../../docs/basic-knowledge/middleware/scheduled-tasks-sharding-recovery.mdx) | ✅ 通过 |

## 已验证的断言（依据官方文档）

Kafka：

- 普通消费者组内一个分区同时只分配给一个消费者；Share Groups 是另一套共享投递机制。
- `acks=all` 等待 ISR 中全部副本，ISR 少于 `min.insync.replicas` 时写入报副本不足。
- 幂等生产者要求 `acks=all`、`retries` 大于 0、`max.in.flight.requests.per.connection<=5`。
- 事务用 `sendOffsetsToTransaction` 把输出和 offset 一起提交；`read_committed` 读不到失败事务的输出。
- compact 保留原 offset，值为 null 的 tombstone 有自己的保留期限。

RabbitMQ：

- 不可路由的消息也会得到 publisher confirm；`mandatory=true` 时先返回 `basic.return`。
- `multiple=true` 一次确认该 tag 及之前的全部投递。
- 默认死信转发是至多一次；quorum queue 的至少一次死信转发需要 `dead-letter-strategy=at-least-once`、`overflow=reject-publish`，并启用 `stream_queue` feature flag。

Elasticsearch 8.19：

- 默认 refresh 周期 1 秒，只针对最近 30 秒内被搜索过的索引；Serverless 为 5 秒。
- 默认 `index.translog.durability=request`；改为 `async` 后按 `sync_interval` 刷盘，默认 5 秒。
- `index.max_result_window` 默认 10000；PIT 搜索隐含 `_shard_doc` 作为并列排序字段。
- `keyword` 默认有 doc values，`text` 没有。

Kubernetes：

- `concurrencyPolicy` 的 `Allow/Forbid/Replace` 只协调同一 CronJob。
- `startingDeadlineSeconds`、`activeDeadlineSeconds`、`backoffLimit` 的含义与文中一致；`activeDeadlineSeconds` 优先于剩余重试次数。
- `.spec.timeZone` 可指定时区。

下一批：计算机网络（10 篇）。
