# 批次 v3：版本回调

本批核对 41 篇文章，修改 39 篇。Transformer 与 Pods 保持原样。
按当前分支直接修改，未切换分支，未提交 Git。
所有 knowledge.id、卡片 ID 和显式锚点保持不变。没有新增或删除卡片。

## 逐篇前后对照

| 序号 | 文件 | 版本表述前后对照 |
| --- | --- | --- |
| 1 | [docs/ai/development/agent-frameworks.mdx](../../../docs/ai/development/agent-frameworks.mdx) | “版本相关内容核对于 2026-10-13”→删除；Google ADK 的框架项、回答句与引用→删除。OpenAI、Anthropic SDK 与通用框架内容保留。 |
| 2 | [docs/ai/evaluation/agent-evaluation.mdx](../../../docs/ai/evaluation/agent-evaluation.mdx) | “下文方法核对日期为 2026-10-13”→删除。 |
| 3 | [docs/ai/evaluation/rag-evaluation.mdx](../../../docs/ai/evaluation/rag-evaluation.mdx) | Ragas 指标实现的“核对日期”→删除。 |
| 4 | [docs/ai/llm/llm-basics.mdx](../../../docs/ai/llm/llm-basics.mdx) | Responses API 字段的“核对日期”→删除。Token、采样和预算机制保留。 |
| 5 | [docs/ai/llm/transformer.mdx](../../../docs/ai/llm/transformer.mdx) | 无需修改。Llama 仅作为模型结构示例，论文和缓存机制保留。 |
| 6 | [docs/ai/prompting/context-compaction.mdx](../../../docs/ai/prompting/context-compaction.mdx) | LangChain 消息裁剪的“核对日期”→删除。 |
| 7 | [docs/ai/prompting/context-management.mdx](../../../docs/ai/prompting/context-management.mdx) | 缓存行为的“核对日期”→删除。 |
| 8 | [docs/ai/prompting/prompt-engineering.mdx](../../../docs/ai/prompting/prompt-engineering.mdx) | API 行为的“核对日期”→删除。 |
| 9 | [docs/ai/rag/chunking.mdx](../../../docs/ai/rag/chunking.mdx) | 切分组件行为的“核对日期”→删除。 |
| 10 | [docs/ai/rag/rag.mdx](../../../docs/ai/rag/rag.mdx) | OpenAI Retrieval 删除行为的“核对日期”句→删除，最终一致性说明保留。 |
| 11 | [docs/ai/tools/mcp.mdx](../../../docs/ai/tools/mcp.mdx) | “核对日期”→删除；2025-11-25 是协议版本，保留。 |
| 12 | [docs/basic-knowledge/database/indices/b_plus_tree/index.mdx](../../../docs/basic-knowledge/database/indices/b_plus_tree/index.mdx) | MySQL 8.4→8.0，包括开头、MERGE_THRESHOLD 默认值和回答；参考资料同步改为 8.0。 |
| 13 | [docs/basic-knowledge/database/indices/clustered_index/index.mdx](../../../docs/basic-knowledge/database/indices/clustered_index/index.mdx) | MySQL 8.4 聚簇键说明→8.0；五项参考资料同步回调。 |
| 14 | [docs/basic-knowledge/database/indices/composite-covering-back-table.mdx](../../../docs/basic-knowledge/database/indices/composite-covering-back-table.mdx) | MySQL 8.4 的联合索引、ICP、排序范围→8.0；参考资料同步回调。 |
| 15 | [docs/basic-knowledge/database/indices/execution-plan.mdx](../../../docs/basic-knowledge/database/indices/execution-plan.mdx) | MySQL 8.4→8.0；补明 EXPLAIN ANALYZE 自 8.0.18 支持。显式 FORMAT=TREE 自 8.0.21 支持；引用同步回调。 |
| 16 | [docs/basic-knowledge/database/indices/index-review.mdx](../../../docs/basic-knowledge/database/indices/index-review.mdx) | MySQL 8.4 设计范围、不可见索引说明→8.0；参考资料同步回调。 |
| 17 | [docs/basic-knowledge/database/indices/index.mdx](../../../docs/basic-knowledge/database/indices/index.mdx) | MySQL 8.4 索引分类、唯一索引 NULL 说明→8.0；参考资料同步回调。 |
| 18 | [docs/basic-knowledge/database/modeling/constraints.mdx](../../../docs/basic-knowledge/database/modeling/constraints.mdx) | MySQL 8.4→8.0；NOT ENFORCED 明确从 8.0.16 支持，与 CHECK 边界一致；引用同步回调。 |
| 19 | [docs/basic-knowledge/database/sql/aggregation.mdx](../../../docs/basic-knowledge/database/sql/aggregation.mdx) | MySQL 8.4 的 ONLY_FULL_GROUP_BY、函数依赖→8.0；参考资料同步回调。 |
| 20 | [docs/basic-knowledge/database/sql/joins.mdx](../../../docs/basic-knowledge/database/sql/joins.mdx) | MySQL 8.4→8.0；Hash Join 明确从 8.0.18 支持；算法回答与引用同步回调。 |
| 21 | [docs/basic-knowledge/database/sql/query.mdx](../../../docs/basic-knowledge/database/sql/query.mdx) | MySQL 8.4 查询范围→8.0；六项 SQL 官方引用同步回调。 |
| 22 | [docs/basic-knowledge/database/transaction/deadlock-detection-timeout-retry.mdx](../../../docs/basic-knowledge/database/transaction/deadlock-detection-timeout-retry.mdx) | MySQL 8.4 死锁检测、超时回滚默认值→8.0；参考资料同步回调。 |
| 23 | [docs/basic-knowledge/database/transaction/index.mdx](../../../docs/basic-knowledge/database/transaction/index.mdx) | MySQL 8.4 事务基线、默认 ROW/RR 说明→8.0；官方引用同步回调。用于解释历史的 MySQL 5.7 资料保留。 |
| 24 | [docs/basic-knowledge/database/transaction/innodb-locking-ranges.mdx](../../../docs/basic-knowledge/database/transaction/innodb-locking-ranges.mdx) | MySQL 8.4→8.0；“已在 8.4.11 验证”→“适用于 MySQL 8.0 及以上”。锁实验 SQL 和区间结论保留；引用同步回调。 |
| 25 | [docs/basic-knowledge/database/transaction/long-transactions-hot-updates-boundaries.mdx](../../../docs/basic-knowledge/database/transaction/long-transactions-hot-updates-boundaries.mdx) | MySQL 8.4 长事务与热点更新范围→8.0；参考资料同步回调。 |
| 26 | [docs/basic-knowledge/database/transaction/mvcc-read-view-consistent-read.mdx](../../../docs/basic-knowledge/database/transaction/mvcc-read-view-consistent-read.mdx) | MySQL 8.4 的 RC/RR 与一致快照说明→8.0；ReadView 源码引用从 8.4.0→8.0.43。 |
| 27 | [docs/basic-knowledge/middleware/idempotent-consumption-order-duplicates.mdx](../../../docs/basic-knowledge/middleware/idempotent-consumption-order-duplicates.mdx) | MySQL 错误处理引用从 8.4→8.0。Kafka 未指定新的版本基线，既有内容保留。 |
| 28 | [docs/basic-knowledge/network/tcp_handshake.mdx](../../../docs/basic-knowledge/network/tcp_handshake.mdx) | Linux 6.6 默认值说明→通用 TIME_WAIT 复用条件；删除 tcp_tw_reuse_delay 参数。tcp_tw_recycle 的移除版本说明→旧机制与 NAT 冲突；删除两项 6.6 专用引用。 |
| 29 | [docs/basic-knowledge/nosql/redis/cache-patterns-consistency.mdx](../../../docs/basic-knowledge/nosql/redis/cache-patterns-consistency.mdx) | MySQL 一致性读引用从 8.4→8.0。Redis 6.0 客户端跟踪说明保留。 |
| 30 | [docs/basic-knowledge/nosql/redis/cache-penetration-stampede-avalanche-hotkeys.mdx](../../../docs/basic-knowledge/nosql/redis/cache-penetration-stampede-avalanche-hotkeys.mdx) | Redis 7.2 的 RedisBloom 模块说明→Redis 6、7。UNLINK 的历史支持边界保留。 |
| 31 | [docs/basic-knowledge/nosql/redis/data_structure.mdx](../../../docs/basic-knowledge/nosql/redis/data_structure.mdx) | Redis 7.2 基线→6、7。先讲 Redis 6 的 QuickList/ZipList，再说明 7.0 的 Listpack 替换。Hash、ZSet 同步按此顺序；Set 先讲 intset/hashtable，再说明 7.2 的 Listpack。补明 BLMOVE、XAUTOCLAIM 的 6.2 边界；源码主要回调到 6.2/7.0。 |
| 32 | [docs/basic-knowledge/nosql/redis/distributed-lock-conditions-boundaries.mdx](../../../docs/basic-knowledge/nosql/redis/distributed-lock-conditions-boundaries.mdx) | Redis 7.2 基线→6、7；所有者、租约和故障边界保留。 |
| 33 | [docs/basic-knowledge/nosql/redis/eviction.mdx](../../../docs/basic-knowledge/nosql/redis/eviction.mdx) | Redis 7.2 基线、八种策略和采样默认值→6、7；配置引用改为 6.2 与 7.0。 |
| 34 | [docs/basic-knowledge/nosql/redis/expiration.mdx](../../../docs/basic-knowledge/nosql/redis/expiration.mdx) | Redis 7.2 基线→6、7；既有 KEEPTTL 6.0、EXPIRE 条件 7.0 边界保留。 |
| 35 | [docs/basic-knowledge/nosql/redis/index.mdx](../../../docs/basic-knowledge/nosql/redis/index.mdx) | Redis 7.2 基线、串行执行与事务错误说明→6、7；配置引用改为 6.2 与 7.0。 |
| 36 | [docs/basic-knowledge/nosql/redis/persistence.mdx](../../../docs/basic-knowledge/nosql/redis/persistence.mdx) | Redis 7.2 基线→6、7。AOF 先讲 Redis 6 的重写增量，再说明 7.0 多文件机制。混合格式默认值按 6、7 写；补入目标版本配置与源码。WAITAOF 保留 7.2 的明确支持边界。 |
| 37 | [docs/devops/kubernetes/pods.mdx](../../../docs/devops/kubernetes/pods.mdx) | 无需修改。已有内容讲 Pod、探针、调度和终止机制，没有指定新版本的弃用说明。 |
| 38 | [docs/devops/kubernetes/workloads-networking.mdx](../../../docs/devops/kubernetes/workloads-networking.mdx) | 删除 ingress-nginx 退役说明及其引用；删除 IPVS 1.35 弃用说明。代理实现改为常见 iptables/IPVS 机制，回答同步调整。 |
| 39 | [docs/devops/linux/network-troubleshooting.mdx](../../../docs/devops/linux/network-troubleshooting.mdx) | Nginx 1.29.7 默认值变化→显式 HTTP/1.1 与 keepalive 配置；删除 IPVS 1.35 弃用说明，保留 DNAT 机制。 |
| 40 | [docs/system-design/production/jvm-thread-sql-network-joint-diagnosis.mdx](../../../docs/system-design/production/jvm-thread-sql-network-joint-diagnosis.mdx) | JDK 24 消除 pinning/JEP 491→JDK 21 的 pinning 与 JFR 定位。JDK 25 JFR 引用→21，删除 JDK 24 发布说明。MySQL 8.4→8.0。 |
| 41 | [docs/system-design/reliability/idempotency-keys-safe-retries.mdx](../../../docs/system-design/reliability/idempotency-keys-safe-retries.mdx) | MySQL 8.4 RC/RR 示例→8.0；一致性读和锁引用同步回调。 |

## 题目与参考回答调整

两道题修改了题目文字，显式 ID 保持不变：

- `persistence.mdx#aof-rewrite`：“Redis 7.x 的 AOF 重写期间如何接收新写入，混合格式是什么？”→“Redis 的 AOF 重写期间如何接收新写入，混合格式是什么？”。回答先讲 Redis 6，再讲 Redis 7.0。
- `jvm-thread-sql-network-joint-diagnosis.mdx#jvm-diagnostic-evidence`：“怎样采集 JVM 等待证据，虚拟线程 pinning 有何版本差异？”→“怎样采集 JVM 等待证据，JDK 21 的虚拟线程 pinning 如何定位？”。回答改为 JDK 21 的同步阻塞与 JFR 事件。

以下题目文字不变，仅调整参考回答或考察重点：

| 文件与卡片 ID | 调整 |
| --- | --- |
| `agent-frameworks.mdx#framework-landscape` | 删除 Google ADK 句。 |
| `b_plus_tree/index.mdx#page-merge` | MERGE_THRESHOLD 默认值的基线由 MySQL 8.4 改为 8.0。 |
| `aggregation.mdx#group-functional-dependency` | 函数依赖按 MySQL 8.0 表述。 |
| `joins.mdx#join-algorithms` | 连接算法选择按 MySQL 8.0 表述。 |
| `transaction/index.mdx#rr-binlog-history` | 默认 RR 的当前基线由 8.4 改为 8.0。 |
| `innodb-locking-ranges.mdx#secondary-range-locks` | 实验版本改为适用于 MySQL 8.0 及以上。 |
| `tcp_handshake.mdx#time-wait-reuse` | 删除内核默认值及移除版本，保留复用条件和 NAT 问题。 |
| `data_structure.mdx#compact-encoding` | 7.2 小列表转换→Redis 6 QuickList/ZipList 与 7.0 Listpack。 |
| `data_structure.mdx#sorted-set-index` | 小集合先讲 Redis 6 ZipList，再说明 7.0 Listpack。 |
| `eviction.mdx#eviction-policies` | 八种策略按 Redis 6、7 表述。 |
| `redis/index.mdx#why-redis-fast` | 串行执行路径按 Redis 6、7 表述。 |
| `workloads-networking.mdx#service-ingress` | 删除 ingress-nginx 退役说明。 |
| `workloads-networking.mdx#pod-networking` | 删除 IPVS 弃用说明。 |
| `network-troubleshooting.mdx#time-wait-close-wait` | 默认版本核对→显式 HTTP/1.1 配置。 |
| `network-troubleshooting.mdx#iptables` | 删除 IPVS 弃用说明，保留常见代理机制。 |

## 核验依据与边界

- [MySQL 8.0 EXPLAIN](https://dev.mysql.com/doc/refman/8.0/en/explain.html)确认 8.0.18 的 ANALYZE 支持边界。显式 FORMAT=TREE 从 8.0.21 支持。
- [MySQL 8.0 CHECK](https://dev.mysql.com/doc/refman/8.0/en/create-table-check-constraints.html)确认执行检查及 NOT ENFORCED 语义。
- [MySQL 8.0 Hash Join](https://dev.mysql.com/doc/refman/8.0/en/hash-joins.html)确认 8.0.18 的支持边界。
- 对比 [MySQL 8.0.43 row0sel.cc](https://github.com/mysql/mysql-server/blob/mysql-8.0.43/storage/innobase/row/row0sel.cc)与 8.4.0，`row_compare_row_to_range` 函数内容一致。本文锁实验的主键上界优化据此保留。本次未重跑 MySQL 双会话实验；旧实验来自 8.4.11，正文改为适用范围。
- [Redis 6.2 QuickList](https://github.com/redis/redis/blob/6.2.0/src/quicklist.c)使用 ZipList。[Redis 7.0 QuickList](https://github.com/redis/redis/blob/7.0.0/src/quicklist.c)改用 Listpack。
- [Redis 7.0 Set](https://github.com/redis/redis/blob/7.0.0/src/t_set.c)保留 intset 与 hashtable 两种编码。
- [JDK 21 Virtual Threads](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html)支持同步阻塞 pinning 与 JFR 定位说明。
- 新增或替换的 70 个外部引用进行了 HTTP 检查。14 个成功；56 个 MySQL 链接被站点返回 403。关键 MySQL 页面另经网页检索工具读取。403 结果未计为链接通过。

## 验证结果

- `node scripts/check-article-format.mjs --style-strict -- <本批全部 41 个文件>`：通过。0 篇结构问题，0 篇文风提示。
- `npm run build`：通过，退出码 0。文内链接、复习资源和全站 268 篇格式检查通过。
- 逐篇比较 HEAD 与工作区：knowledge.id 和全部显式锚点完全一致。
- 构建仍报告既有博客作者、摘要截断提示，以及运行环境提示。未修改这些批次外内容。

