# 存量文章更新候选队列

检查日期：2026-10-13。依据当前工作区静态结构，按知识树领域归类。按 2026-10-13 用户补充，题量不再作为缺陷或拆分依据。以下是人工复核候选，不是逐篇质量不合格判定。系统设计、算法、教程可以采用各自结构；没有“面试核心”时，应先判断是否需要该模块。未列出的文章仍需抽查技术事实和展示效果。

## 系统设计

| 文章 | 待处理事项 |
| --- | --- |
| [事故复盘](../../../docs/system-design/leadership/incident-review-failed-designs-organizational-learning.mdx) | 检查开头重点；按文体补摘要 |
| [架构迁移](../../../docs/system-design/leadership/compatibility-migration-canary-exit-criteria.mdx) | 检查开头重点；按文体补摘要 |
| [架构决策记录（ADR）](../../../docs/system-design/leadership/constraints-architecture-decision-records.mdx) | 检查开头重点；按文体补摘要 |
| [设计评审](../../../docs/system-design/leadership/cross-team-design-review-disagreement.mdx) | 检查开头重点；按文体补摘要 |
| [技术债](../../../docs/system-design/leadership/technical-debt-priority-business-value.mdx) | 检查开头重点；按文体补摘要 |
| [Saga](../../../docs/system-design/distributed-data/saga-compensation-intermediate-state.mdx) | 检查开头重点；按文体补摘要 |
| [分布式一致性](../../../docs/system-design/distributed-data/invariants-to-consistency-strategy.mdx) | 检查开头重点；按文体补摘要 |
| [2PC 与 TCC](../../../docs/system-design/distributed-data/2pc-tcc-coordination-cost.mdx) | 检查开头重点；按文体补摘要 |
| [分布式流程恢复](../../../docs/system-design/distributed-data/idempotency-reconciliation-manual-repair.mdx) | 检查开头重点；按文体补摘要 |
| [Transactional Outbox 与 CDC](../../../docs/system-design/distributed-data/outbox-cdc-reliable-events.mdx) | 检查开头重点；按文体补摘要 |
| [系统设计面试](../../../docs/system-design/system-design/interview-process.mdx) | 检查开头重点；按文体补摘要 |
| [系统架构](../../../docs/system-design/system-design/universe_architecture.mdx) | 检查开头重点；按文体补摘要 |
| [数据拆分](../../../docs/system-design/system-design/read-write-paths-hotspots-sharding.mdx) | 检查开头重点；按文体补摘要 |
| [容量规划](../../../docs/system-design/system-design/capacity-slo-failure-model.mdx) | 检查开头重点；按文体补摘要 |
| [Raft](../../../docs/system-design/distributed-system/raft-election-log-replication.mdx) | 检查开头重点；按文体补摘要 |
| [一致性模型](../../../docs/system-design/distributed-system/consistency-models-quorum-linearizability.mdx) | 检查开头重点；按文体补摘要 |
| [跨地域复制](../../../docs/system-design/distributed-system/cross-region-replication-latency-conflicts.mdx) | 检查开头重点；按文体补摘要 |
| [CAP 理论](../../../docs/system-design/distributed-system/cap-theorem.mdx) | 检查开头重点；按文体补摘要 |
| [主备复制](../../../docs/system-design/distributed-system/primary_backup_replication.mdx) | 检查开头重点；按文体补摘要 |
| [配置中心](../../../docs/system-design/microservices/config-center-version-refresh.mdx) | 检查开头重点；按文体补摘要 |
| [控制平面与数据平面](../../../docs/system-design/microservices/control-plane-data-plane-failures.mdx) | 检查开头重点；按文体补摘要 |
| [API 网关](../../../docs/system-design/microservices/api-gateway-routing.mdx) | 检查开头重点；按文体补摘要 |
| [服务发现](../../../docs/system-design/microservices/service-discovery-health-checks.mdx) | 检查开头重点；按文体补摘要 |
| [灰度发布](../../../docs/system-design/microservices/canary-traffic-tagging-rollback.mdx) | 检查开头重点；按文体补摘要 |
| [绞杀者模式](../../../docs/system-design/architecture/strangler-migration-compatibility-rollback.mdx) | 检查开头重点；按文体补摘要 |
| [系统设计题](../../../docs/system-design/system-design/system-design-problems/index.mdx) | 检查开头重点；按文体补摘要 |
| [设计网页爬虫](../../../docs/system-design/system-design/system-design-problems/web_crawler/index.mdx) | 检查开头重点；按文体补摘要；检查自测缺口 |
| [聚合](../../../docs/system-design/architecture/aggregate-invariants-transaction-boundaries.mdx) | 检查开头重点；按文体补摘要 |
| [模块化单体](../../../docs/system-design/architecture/modular-monolith-dependency-constraints.mdx) | 检查开头重点；按文体补摘要 |
| [微服务架构](../../../docs/system-design/architecture/microservice-splitting-benefits-costs.mdx) | 检查开头重点；按文体补摘要 |
| [限界上下文](../../../docs/system-design/architecture/domain-bounded-context-ubiquitous-language.mdx) | 检查开头重点；按文体补摘要 |
| [重试](../../../docs/system-design/reliability/retry-backoff-jitter-storms.mdx) | 检查开头重点；按文体补摘要 |
| [服务容错](../../../docs/system-design/reliability/circuit-breaker-degradation-bulkhead.mdx) | 检查开头重点；按文体补摘要 |
| [限流](../../../docs/system-design/reliability/rate-limiting-capacity-protection.mdx) | 检查开头重点；按文体补摘要 |
| [幂等键](../../../docs/system-design/reliability/idempotency-keys-safe-retries.mdx) | 检查开头重点；按文体补摘要 |
| [超时](../../../docs/system-design/reliability/timeout-budget-cancellation.mdx) | 检查开头重点；按文体补摘要 |
| [服务等级目标（SLO）](../../../docs/system-design/availability/sli-slo-error-budget-capacity-headroom.mdx) | 检查开头重点；按文体补摘要 |
| [成本归因](../../../docs/system-design/availability/performance-reliability-cost-attribution.mdx) | 检查开头重点；按文体补摘要 |
| [多租户](../../../docs/system-design/availability/multi-tenant-isolation-quotas-data-boundaries.mdx) | 检查开头重点；按文体补摘要 |
| [故障转移](../../../docs/system-design/availability/failover-drills-recovery-validation.mdx) | 检查开头重点；按文体补摘要 |
| [灾难恢复](../../../docs/system-design/availability/high-availability-backup-rto-rpo.mdx) | 检查开头重点；按文体补摘要 |

## AI 应用与 Agent

| 文章 | 待处理事项 |
| --- | --- |
| [Embedding 与向量检索](../../../docs/ai/rag/embedding-vector-search.mdx) | 6 条核心：压缩至 3—5 条 |

## 运维与云原生

| 文章 | 待处理事项 |
| --- | --- |
| [可重复交付](../../../docs/system-design/production/docker-ci-cd-reproducible-delivery.mdx) | 检查开头重点；按文体补摘要 |
| [生产故障诊断](../../../docs/system-design/production/jvm-thread-sql-network-joint-diagnosis.mdx) | 检查开头重点；按文体补摘要 |
| [可观测性](../../../docs/system-design/production/logs-metrics-traces-correlation.mdx) | 检查开头重点；按文体补摘要 |

## 安全

| 文章 | 待处理事项 |
| --- | --- |
| [认证与授权](../../../docs/system-design/security/authentication-authorization-trust-boundaries.mdx) | 检查开头重点；按文体补摘要 |
| [Session、JWT、OAuth 2.0 与 OIDC](../../../docs/system-design/security/session-jwt-oauth-oidc.mdx) | 检查开头重点；按文体补摘要 |
| [密钥、证书、审计与供应链安全](../../../docs/system-design/security/secrets-certificates-audit-supply-chain.mdx) | 检查开头重点；按文体补摘要 |
| [Web 应用安全](../../../docs/system-design/security/injection-authorization-ssrf-deserialization.mdx) | 检查开头重点；按文体补摘要 |

## Java

| 文章 | 待处理事项 |
| --- | --- |
| [Spring Security](../../../docs/system-design/security/spring-security-filter-chain.mdx) | 检查开头重点；按文体补摘要 |
| [Maven](../../../docs/system-design/production/maven-lifecycle-dependency-convergence.mdx) | 检查开头重点；按文体补摘要 |
| [数据库连接池](../../../docs/basic-knowledge/java/data-access/connection-pool-capacity-timeout-leaks.mdx) | 第 1 批已完成：摘要、面试覆盖、事实与来源、页面验收 |
| [N+1 查询](../../../docs/basic-knowledge/java/data-access/n-plus-one-fetch-strategies.mdx) | 检查开头重点；按文体补摘要 |
| [批处理与分页](../../../docs/basic-knowledge/java/data-access/batching-pagination-data-access-tests.mdx) | 检查开头重点；按文体补摘要 |
| [JPA](../../../docs/basic-knowledge/java/data-access/jpa-entity-states-dirty-checking-lazy-loading.mdx) | 检查开头重点；按文体补摘要 |
| [MyBatis](../../../docs/basic-knowledge/java/data-access/mybatis-mapping-executor-plugins.mdx) | 第 1 批已完成：摘要、面试覆盖、事实与来源、页面验收 |
| [并行流](../../../docs/basic-knowledge/java/functional/parallel-stream-model-pitfalls.mdx) | 检查开头重点；按文体补摘要 |

## 软件工程

| 文章 | 待处理事项 |
| --- | --- |
| [SOLID 面向对象设计原则](../../../docs/system-design/ood/solid.mdx) | 检查开头重点；按文体补摘要；检查自测缺口；代码围栏已在第 0 批修复 |

## 计算机网络

| 文章 | 待处理事项 |
| --- | --- |
| [IP](../../../docs/basic-knowledge/network/ip.mdx) | 补已有核心结论的卡片链接 |
| [TCP 连接](../../../docs/basic-knowledge/network/tcp_handshake.mdx) | 第 1 批已完成：摘要、面试覆盖、事实与来源、页面验收 |
| [TCP 与 UDP](../../../docs/basic-knowledge/network/tcp_udp.mdx) | 检查开头重点；按文体补摘要 |
| [RPC](../../../docs/basic-knowledge/network/rpc-serialization-netty-event-loop.mdx) | 检查开头重点；按文体补摘要 |
| [网络模型](../../../docs/basic-knowledge/network/network-models.mdx) | 检查开头重点；按文体补摘要 |
| [HTTP](../../../docs/basic-knowledge/network/http-versions-connection-reuse-timeouts.mdx) | 检查开头重点；按文体补摘要 |
| [HTTP 缓存](../../../docs/basic-knowledge/network/http-cache.mdx) | 补已有核心结论的卡片链接 |
| [DNS](../../../docs/basic-knowledge/network/dns.mdx) | 补已有核心结论的卡片链接 |
| [TLS](../../../docs/basic-knowledge/network/tls.mdx) | 补已有核心结论的卡片链接 |

## 操作系统

| 文章 | 待处理事项 |
| --- | --- |
| [文件描述符](../../../docs/basic-knowledge/operating-system/file-descriptors.mdx) | 补已有核心结论的卡片链接 |
| [死锁](../../../docs/basic-knowledge/operating-system/deadlock.mdx) | 补已有核心结论的卡片链接 |
| [虚拟内存](../../../docs/basic-knowledge/operating-system/virtual-memory.mdx) | 补已有核心结论的卡片链接 |
| [线程同步](../../../docs/basic-knowledge/operating-system/synchronization.mdx) | 补已有核心结论的卡片链接 |
| [进程与线程](../../../docs/basic-knowledge/operating-system/processes-threads.mdx) | 补已有核心结论的卡片链接 |
| [I/O 多路复用](../../../docs/basic-knowledge/operating-system/io-multiplexing.mdx) | 补已有核心结论的卡片链接 |
| [I/O 模型](../../../docs/basic-knowledge/operating-system/io-models.mdx) | 补已有核心结论的卡片链接 |

## 数据结构与算法

| 文章 | 待处理事项 |
| --- | --- |
| [二叉树](../../../docs/basic-knowledge/data-structures/binary-tree.mdx) | 补已有核心结论的卡片链接 |
| [数组](../../../docs/basic-knowledge/data-structures/array.mdx) | 补已有核心结论的卡片链接 |
| [队列](../../../docs/basic-knowledge/data-structures/queue.mdx) | 补已有核心结论的卡片链接 |
| [图](../../../docs/basic-knowledge/data-structures/graph.mdx) | 补已有核心结论的卡片链接 |
| [哈希表](../../../docs/basic-knowledge/data-structures/hash-table.mdx) | 检查开头重点；按文体补摘要 |
| [栈](../../../docs/basic-knowledge/data-structures/stack.mdx) | 补已有核心结论的卡片链接 |
| [堆](../../../docs/basic-knowledge/data-structures/heap.mdx) | 补已有核心结论的卡片链接 |
| [二叉搜索树](../../../docs/basic-knowledge/data-structures/binary-search-tree.mdx) | 补已有核心结论的卡片链接 |
| [链表](../../../docs/basic-knowledge/data-structures/linked-list.mdx) | 补已有核心结论的卡片链接 |
| [双指针](../../../docs/basic-knowledge/algorithms/two-pointers.mdx) | 补已有核心结论的卡片链接 |
| [贪心](../../../docs/basic-knowledge/algorithms/greedy.mdx) | 补已有核心结论的卡片链接 |
| [递归](../../../docs/basic-knowledge/algorithms/recursion.mdx) | 补已有核心结论的卡片链接 |
| [回溯](../../../docs/basic-knowledge/algorithms/backtracking.mdx) | 补已有核心结论的卡片链接 |
| [前缀和](../../../docs/basic-knowledge/algorithms/prefix-sum.mdx) | 补已有核心结论的卡片链接 |
| [排序](../../../docs/basic-knowledge/algorithms/sorting.mdx) | 补已有核心结论的卡片链接 |
| [二分查找](../../../docs/basic-knowledge/algorithms/binary-search.mdx) | 补已有核心结论的卡片链接 |
| [树与图搜索](../../../docs/basic-knowledge/java/algorithms/trees-graphs-search.mdx) | 检查开头重点；按文体补摘要 |
| [算法复杂度](../../../docs/basic-knowledge/java/algorithms/complexity-constraints-java-cost.mdx) | 检查开头重点；按文体补摘要 |
| [动态规划](../../../docs/basic-knowledge/java/algorithms/dynamic-programming-state-design.mdx) | 检查开头重点；按文体补摘要 |
| [算法正确性](../../../docs/basic-knowledge/java/algorithms/live-coding-counterexamples-tests.mdx) | 检查开头重点；按文体补摘要 |
| [滑动窗口](../../../docs/basic-knowledge/java/algorithms/arrays-strings-sliding-window.mdx) | 检查开头重点；按文体补摘要 |

## 消息队列与中间件

| 文章 | 待处理事项 |
| --- | --- |
| [消息幂等性](../../../docs/basic-knowledge/middleware/idempotent-consumption-order-duplicates.mdx) | 检查开头重点；按文体补摘要 |
| [消息队列](../../../docs/basic-knowledge/middleware/kafka-rabbitmq-queue-semantics.mdx) | 检查开头重点；按文体补摘要 |
| [分布式任务调度](../../../docs/basic-knowledge/middleware/scheduled-tasks-sharding-recovery.mdx) | 检查开头重点；按文体补摘要 |
| [Elasticsearch](../../../docs/basic-knowledge/middleware/elasticsearch-inverted-index-refresh-visibility.mdx) | 检查开头重点；按文体补摘要 |
| [消息可靠性](../../../docs/basic-knowledge/middleware/message-ack-retry-dead-letter.mdx) | 检查开头重点；按文体补摘要 |

## 数据库

| 文章 | 待处理事项 |
| --- | --- |
| [SQL 聚合](../../../docs/basic-knowledge/database/sql/aggregation.mdx) | 补已有核心结论的卡片链接 |
| [SQL 查询](../../../docs/basic-knowledge/database/sql/query.mdx) | 补已有核心结论的卡片链接 |
| [SQL 连接](../../../docs/basic-knowledge/database/sql/joins.mdx) | 补已有核心结论的卡片链接 |
| [数据约束](../../../docs/basic-knowledge/database/modeling/constraints.mdx) | 补已有核心结论的卡片链接 |
| [联合索引与覆盖索引](../../../docs/basic-knowledge/database/indices/composite-covering-back-table.mdx) | 第 1 批已完成：摘要、面试覆盖、事实与来源、页面验收 |
| [长事务](../../../docs/basic-knowledge/database/transaction/long-transactions-hot-updates-boundaries.mdx) | 检查开头重点；按文体补摘要 |
| [索引设计](../../../docs/basic-knowledge/database/indices/index-review.mdx) | 第 0 批已统一标题、摘要与卡片入口；后续复核技术事实与来源 |
| [执行计划](../../../docs/basic-knowledge/database/indices/execution-plan.mdx) | 补已有核心结论的卡片链接 |
| [MVCC](../../../docs/basic-knowledge/database/transaction/mvcc-read-view-consistent-read.mdx) | 第 1 批已完成：摘要、面试覆盖、事实与来源、页面验收 |
| [数据库索引](../../../docs/basic-knowledge/database/indices/index.mdx) | 第 1 批已完成：摘要、面试覆盖、事实与来源、页面验收 |
| [数据库死锁](../../../docs/basic-knowledge/database/transaction/deadlock-detection-timeout-retry.mdx) | 检查开头重点；按文体补摘要 |
| [InnoDB 锁](../../../docs/basic-knowledge/database/transaction/innodb-locking-ranges.mdx) | 第 1 批已完成：摘要、面试覆盖、事实与来源、页面验收 |
| [数据库事务](../../../docs/basic-knowledge/database/transaction/index.mdx) | 第 1 批已完成：摘要、面试覆盖、事实与来源、页面验收 |
| [B+ 树](../../../docs/basic-knowledge/database/indices/b_plus_tree/index.mdx) | 检查开头重点；按文体补摘要 |
| [聚簇索引](../../../docs/basic-knowledge/database/indices/clustered_index/index.mdx) | 检查开头重点；按文体补摘要 |

## 缓存与 Redis

| 文章 | 待处理事项 |
| --- | --- |
| [Redis 持久化、复制与集群](../../../docs/basic-knowledge/nosql/redis/persistence.mdx) | 检查开头重点；按文体补摘要 |
| [Redis 数据结构](../../../docs/basic-knowledge/nosql/redis/data_structure.mdx) | 检查开头重点；按文体补摘要；检查自测缺口 |
| [Redis 过期](../../../docs/basic-knowledge/nosql/redis/expiration.mdx) | 补已有核心结论的卡片链接 |
| [Redis 内存淘汰](../../../docs/basic-knowledge/nosql/redis/eviction.mdx) | 补已有核心结论的卡片链接 |
| [Redis](../../../docs/basic-knowledge/nosql/redis/index.mdx) | 检查开头重点；按文体补摘要 |
| [缓存一致性](../../../docs/basic-knowledge/nosql/redis/cache-patterns-consistency.mdx) | 检查开头重点；按文体补摘要 |
| [缓存穿透、击穿、雪崩与热点 Key](../../../docs/basic-knowledge/nosql/redis/cache-penetration-stampede-avalanche-hotkeys.mdx) | 检查开头重点；按文体补摘要 |
| [分布式锁](../../../docs/basic-knowledge/nosql/redis/distributed-lock-conditions-boundaries.mdx) | 检查开头重点；按文体补摘要 |


## 大数据

两篇课程与实验文章原先因目录编号规范化漏计。按各自文体评估，不机械添加技术主题模板。

- [Lec 1: MapReduce](<../../../docs/system-design/mit6.824/1. MapReduce/lec1_mapreduce.mdx>)：检查课程要点与自测覆盖。
- [实验 1: MapReduce](<../../../docs/system-design/mit6.824/1. MapReduce/lab1_mapreduce.mdx>)：检查任务步骤、运行结果与自检条件。
