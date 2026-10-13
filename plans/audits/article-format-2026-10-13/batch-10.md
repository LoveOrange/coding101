# 文章格式审计：batch-10

日期：2026-10-13。分支：`content/article-format-2026-10-13`。

本批完成指定 20 篇文章。新增 26 道本站原理自测。未切换分支，未提交 git。

## 表达与标识

- 完整阅读 AGENTS.md、batch-1b 记录及两篇指定样例。
- 开头明确本篇范围，相邻机制改为结论与链接。
- 普通二、三级标题改为名词性名称。补齐中文显式锚点，保留全部已有显式锚点。
- 面试核心改为可复述结论。参考回答首句直接回答，删除流程式套话。
- 拆分长句，通读段落与例子。严格检查中的结构问题和文风提示均清零。
- 对照 HEAD 核对 knowledge.id 与全部原卡片。没有删除、合并或改名原卡片。
- 原公司字段和来源注释保留。新增题统一使用本站自测注释。
- 15 道既有设计或项目综合题补齐题型字段。
- 参考资料保持连续列表。新事实加入官方文档或原始论文依据。

## 每篇改动与依据

### 1. 聚合

文件：[aggregate-invariants-transaction-boundaries.mdx](../../../docs/system-design/architecture/aggregate-invariants-transaction-boundaries.mdx)。

明确聚合、事务和并发控制的分工。补充冲突后重新执行命令的示例。新增实体、值对象与聚合根的区别。

新增题：`aggregate-concurrent-update`、`entity-value-object`。

依据：[Microsoft Learn：Aggregate pattern](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/microservice-domain-model#the-aggregate-pattern)、[Microsoft Learn：Handling Concurrency Conflicts](https://learn.microsoft.com/en-us/ef/core/saving/concurrency)。

修正与澄清：纠正普通只读查询必然争用聚合根的表述。区分内部领域事件与跨服务事件的发布时机。一个事务修改一个聚合改为设计取向。

人工确认：无阻塞事项。

### 2. 限界上下文

文件：[domain-bounded-context-ubiquitous-language.mdx](../../../docs/system-design/architecture/domain-bounded-context-ubiquitous-language.mdx)。

区分子域与模型边界，补充领域服务和应用服务。用支付授权示例解释防腐层的语义转换。

新增题：`anti-corruption-semantics`。

依据：[Microsoft Learn：Anti-Corruption Layer](https://learn.microsoft.com/en-us/azure/architecture/patterns/anti-corruption-layer)、[Microsoft Learn：Tactical Domain-Driven Design](https://learn.microsoft.com/en-us/azure/architecture/microservices/model/tactical-domain-driven-design)、[Microsoft Learn：Domain Analysis](https://learn.microsoft.com/en-us/azure/architecture/microservices/model/domain-analysis)。

修正与澄清：收紧同一事务与同一上下文之间的关系。一个上下文可以包含多个独立聚合。

人工确认：无阻塞事项。

### 3. 微服务架构

文件：[microservice-splitting-benefits-costs.mdx](../../../docs/system-design/architecture/microservice-splitting-benefits-costs.mdx)。

保留业务边界、部署收益和运行成本。迁移流程改为相邻文章链接。新增支付变慢占满上游线程的示例。

新增题：`service-fault-isolation`。

依据：[Microsoft Learn：识别微服务边界](https://learn.microsoft.com/en-us/azure/architecture/microservices/model/microservice-boundaries)、[Microsoft Learn：Bulkhead pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/bulkhead)。

修正与澄清：明确独立进程仍会通过同步依赖传播故障。隔离需要超时、并发限制和业务降级。

人工确认：无阻塞事项。

### 4. 模块化单体

文件：[modular-monolith-dependency-constraints.mdx](../../../docs/system-design/architecture/modular-monolith-dependency-constraints.mdx)。

明确模块 API、写入权和结构检查。补充事务监听器及持久事件登记。标明 Spring Modulith 2.1。

新增题：`module-event-durability`。

依据：[Spring Modulith：Fundamentals](https://docs.spring.io/spring-modulith/reference/fundamentals.html)、[Spring Modulith：验证模块结构](https://docs.spring.io/spring-modulith/reference/verification.html)、[Spring Modulith 2.1：Working with Application Events](https://docs.spring.io/spring-modulith/reference/events.html)。

修正与澄清：补充普通异步事件在提交后丢失的窗口。说明 internal 包名仍需结构测试约束。保留开放模块的验证例外。

人工确认：无阻塞事项。

### 5. 绞杀者模式

文件：[strangler-migration-compatibility-rollback.mdx](../../../docs/system-design/architecture/strangler-migration-compatibility-rollback.mdx)。

保留路由、契约演进、影子验证和退出条件。新增写入暂停、在途事务和增量位置的交接流程。

新增题：`migration-write-handoff`。

依据：[AWS Prescriptive Guidance：Strangler fig pattern](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/strangler-fig.html)、[AWS：Data Synchronization and Schema Changes](https://docs.aws.amazon.com/whitepapers/latest/blue-green-deployments/best-practices-for-managing-data-synchronization-and-schema-changes.html)。

修正与澄清：明确回退还需反向同步及旧格式兼容。影子请求的外部副作用需显式隔离。

人工确认：无阻塞事项。

### 6. 故障转移

文件：[failover-drills-recovery-validation.mdx](../../../docs/system-design/availability/failover-drills-recovery-validation.mdx)。

明确检测、裁决、切流与业务验证的责任。补充控制面失效下的预置资源与演练。

新增题：`failover-control-plane`。

依据：[Google SRE：Testing for Reliability](https://sre.google/sre-book/testing-reliability/)、[AWS：Disaster recovery options in the cloud](https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html)、[Google：The Chubby lock service](https://storage.googleapis.com/gweb-research2023-media/pubtools/4444.pdf)。

修正与澄清：区分多数仲裁和资源端 fencing。仅生成任期或 token 无法隔离外部写入。主失联后的旧延迟采样无法证明零丢失。

人工确认：无阻塞事项。

### 7. 灾难恢复

文件：[high-availability-backup-rto-rpo.mdx](../../../docs/system-design/availability/high-availability-backup-rto-rpo.mdx)。

明确备份、故障域与恢复目标。补充 PostgreSQL 18 PITR。用具体时间演示恢复点与恢复耗时。

新增题：`pitr-recovery-window`。

依据：[PostgreSQL 18：Continuous Archiving and PITR](https://www.postgresql.org/docs/18/continuous-archiving.html)、[AWS：Disaster recovery options in the cloud](https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html)。

修正与澄清：区分 RTO/RPO 目标与实测值。区分 pilot light、温备与完整接管容量。普通 pg_dump 不作为 WAL 回放基础备份。

人工确认：无阻塞事项。

### 8. 多租户

文件：[multi-tenant-isolation-quotas-data-boundaries.mdx](../../../docs/system-design/availability/multi-tenant-isolation-quotas-data-boundaries.mdx)。

重写身份传播、数据权限、配额和噪声邻居。补充 PostgreSQL 18 RLS 与连接复用边界。

新增题：`tenant-rls-boundaries`。

依据：[PostgreSQL 18：Row Security Policies](https://www.postgresql.org/docs/18/ddl-rowsecurity.html)、[PostgreSQL 18：SET LOCAL](https://www.postgresql.org/docs/18/sql-set.html)。

修正与澄清：唯一约束按租户内或全局业务语义设计。补充 RLS 的角色绕过规则。SET LOCAL 结束后恢复会话原值，默认值需无租户权限。

人工确认：无阻塞事项。

### 9. 成本归因

文件：[performance-reliability-cost-attribution.mdx](../../../docs/system-design/availability/performance-reliability-cost-attribution.mdx)。

保留单位成本、共享分摊和性能护栏。新增固定成本与变动成本模型，给出计算示例。

新增题：`unit-cost-fixed-variable`。

依据：[FinOps Foundation：Allocation](https://www.finops.org/framework/capabilities/allocation/)、[Google SRE：Service Level Objectives](https://sre.google/sre-book/service-level-objectives/)、[FinOps Foundation：Unit Economics](https://www.finops.org/framework/capabilities/unit-economics/)。

修正与澄清：移除不同量纲直接相加的成本变化公式。改用金额分解，并解释固定费用摊薄。可用性目标提高后的增量成本需按方案评估。

人工确认：无阻塞事项。

### 10. 服务等级目标（SLO）

文件：[sli-slo-error-budget-capacity-headroom.mdx](../../../docs/system-design/availability/sli-slo-error-budget-capacity-headroom.mdx)。

补充燃烧率公式、多窗口告警和低流量边界。新增三可用区的故障容量算例。

新增题：`burn-rate-calculation`、`zone-capacity-headroom`。

依据：[Google SRE：Service Level Objectives](https://sre.google/sre-book/service-level-objectives/)、[Google SRE Workbook：Alerting on SLOs](https://sre.google/workbook/alerting-on-slos/)。

修正与澄清：区分错误预算比例、允许失败数和剩余预算。明确时间占比换算的恒定流量假设。依赖可用性乘法限定在独立且必选的依赖。

人工确认：无阻塞事项。

### 11. 2PC 与 TCC

文件：[2pc-tcc-coordination-cost.mdx](../../../docs/system-design/distributed-data/2pc-tcc-coordination-cost.mdx)。

补充 TCC 分支状态表。解释空回滚、悬挂和幂等的原子转换。加入 PostgreSQL 18 prepared 事务诊断。

新增题：`tcc-empty-cancel`。

依据：[Apache Seata：TCC Mode](https://seata.apache.org/docs/user/mode/tcc/)、[PostgreSQL 18：PREPARE TRANSACTION](https://www.postgresql.org/docs/18/sql-prepare-transaction.html)、[Apache Seata：TCC Fence 的幂等、空回滚与悬挂](https://seata.apache.org/blog/seata-tcc-fence/)。

修正与澄清：预留超时改为触发全局决定核对。避免在 commit 后自行释放资源。明确 2PC 原子提交与跨库读取隔离的区别。

人工确认：无阻塞事项。

### 12. 分布式流程恢复

文件：[idempotency-reconciliation-manual-repair.mdx](../../../docs/system-design/distributed-data/idempotency-reconciliation-manual-repair.mdx)。

补充幂等键的范围、同键异参及保留期。保留增量对账、全量兜底和受控修复。

新增题：`idempotency-key-lifecycle`。

依据：[AWS Builders’ Library：Making retries safe with idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/)。

修正与澄清：结果未知时可查询或按对方幂等协议重试。修正必须先查询的绝对要求。取消订单的迟到支付结果进入核对或退款分支。

人工确认：无阻塞事项。

### 13. 分布式一致性

文件：[invariants-to-consistency-strategy.mdx](../../../docs/system-design/distributed-data/invariants-to-consistency-strategy.mdx)。

明确不变量、同步成功条件和方案取舍。新增单件库存的条件预留示例。协议细节改为相邻文章链接。

新增题：`inventory-reservation-invariant`。

依据：[Azure Architecture Center：Saga pattern](https://learn.microsoft.com/azure/architecture/reference-architectures/saga/saga)、[Debezium：Outbox Event Router](https://debezium.io/documentation/reference/stable/transformations/outbox-event-router.html)、[PostgreSQL 18：Transaction Isolation](https://www.postgresql.org/docs/18/transaction-iso.html)。

修正与澄清：本地事务还需约束或并发控制。Outbox 与 Saga 可组合，职责不同。最终一致的定义本身不保证传播时限。

人工确认：无阻塞事项。

### 14. Transactional Outbox 与 CDC

文件：[outbox-cdc-reliable-events.mdx](../../../docs/system-design/distributed-data/outbox-cdc-reliable-events.mdx)。

保留双写、轮询、CDC 和消费恢复。补充并行 relay 乱序与版本缺口。区分完整快照和增量事件。

新增题：`outbox-event-order`。

依据：[Debezium：Outbox Event Router](https://debezium.io/documentation/reference/stable/transformations/outbox-event-router.html)、[Apache Kafka 4.1：Design](https://kafka.apache.org/41/design/design/)。

修正与澄清：相同 key 只保证路由，未必保证业务发送顺序。增量事件不能直接丢弃旧版本。区分轮询发布标记和 CDC 插入式事件表。

人工确认：无阻塞事项。

### 15. Saga

文件：[saga-compensation-intermediate-state.mdx](../../../docs/system-design/distributed-data/saga-compensation-intermediate-state.mdx)。

明确补偿、可见中间状态和恢复方向。新增两个流程预留库存的并发补偿示例。

新增题：`saga-concurrent-compensation`。

依据：[Azure Architecture Center：Saga pattern](https://learn.microsoft.com/azure/architecture/reference-architectures/saga/saga)、[Microsoft Learn：Compensating Transaction](https://learn.microsoft.com/en-us/azure/architecture/patterns/compensating-transaction)。

修正与澄清：旧快照覆盖会抹去其他流程的合法变化。补偿失败是待恢复状态，不能当作业务已完成。明确 pivot 后的向前恢复要求。

人工确认：无阻塞事项。

### 16. CAP 理论

文件：[cap-theorem.mdx](../../../docs/system-design/distributed-system/cap-theorem.mdx)。

用两个不可区分的远端写入解释 CAP。补充多数侧可服务与全节点可用性的区别。保留 PACELC，并补充原论文。

新增题：`cap-availability-scope`。

依据：[Gilbert 与 Lynch：Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services](https://www.comp.nus.edu.sg/~gilbert/pubs/BrewersConjecture-SigAct.pdf)、[Daniel Abadi：Consistency Tradeoffs in Modern Distributed Database System Design](https://www.cs.umd.edu/~abadi/papers/abadi-pacelc.pdf)。

修正与澄清：修正可用性等于立即响应的说法。CAP 的 A 要求最终正常完成，无固定延迟上界。避免把多数侧可用等同于全系统 CAP 可用。

人工确认：无阻塞事项。

### 17. 一致性模型

文件：[consistency-models-quorum-linearizability.mdx](../../../docs/system-design/distributed-system/consistency-models-quorum-linearizability.mdx)。

补充可串行化与原子加一的区别。新增 N=3、W=2、R=2 的读回退示例。解释读回写与 sloppy quorum。

新增题：`linearizability-serializability`、`quorum-partial-write`。

依据：[Herlihy & Wing：Linearizability](https://cs.brown.edu/~mph/HerlihyW90/p463-herlihy.pdf)、[Amazon Dynamo paper](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf)、[Google Cloud：TrueTime and external consistency](https://docs.cloud.google.com/spanner/docs/true-time-external-consistency)、[Attiya、Bar-Noy 与 Dolev：Sharing Memory Robustly in Message-Passing Systems](https://groups.csail.mit.edu/tds/papers/Attiya/JACM95.pdf)。

修正与澄清：固定集合相交仍不足以证明线性一致。Leader 不是所有实现的必要条件。单纯等待历史提交位置也不足以提供本次线性读。

人工确认：无阻塞事项。

### 18. 跨地域复制

文件：[cross-region-replication-latency-conflicts.mdx](../../../docs/system-design/distributed-system/cross-region-replication-latency-conflicts.mdx)。

补充 3/1/1 与 2/2/1 投票分布。用版本向量示例识别并发，明确合并规则。

新增题：`regional-voter-placement`、`version-vector-conflicts`。

依据：[Amazon：Dynamo paper](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf)、[Ongaro 与 Ousterhout：Raft](https://raft.github.io/raft.pdf)、[Lamport：Time, Clocks, and the Ordering of Events](https://lamport.azurewebsites.net/pubs/time-clocks.pdf)。

修正与澄清：单主与同步方式是独立维度。地域数不等于多数票数。标量时钟大小不能反推因果。多主延迟收益限定为本地确认。

人工确认：无阻塞事项。

### 19. 主备复制

文件：[primary_backup_replication.mdx](../../../docs/system-design/distributed-system/primary_backup_replication.mdx)。

保留两张复制示意图。区分日志接收、持久化与回放。新增 PostgreSQL 18 同步确认参数对照。

新增题：`replication-ack-apply`。

依据：[Ongaro 与 Ousterhout：Raft](https://raft.github.io/raft.pdf)、[PostgreSQL 18：synchronous_commit](https://www.postgresql.org/docs/18/runtime-config-wal.html#GUC-SYNCHRONOUS-COMMIT)。

修正与澄清：主备角色名称本身不足以证明共识保证。同步确认成功也未必已在备库可见。remote_apply 的保证限定于所等待的同步备库。

人工确认：无阻塞事项。

### 20. Raft

文件：[raft-election-log-replication.mdx](../../../docs/system-design/distributed-system/raft-election-log-replication.mdx)。

补充持久状态、故障模型和当前任期提交。展开线性读屏障及 learner 的票数变化。

新增题：`raft-current-term-commit`、`raft-linearizable-read`、`raft-learner-quorum`。

依据：[Raft paper](https://raft.github.io/raft.pdf)、[etcd 3.6：Raft learner design](https://etcd.io/docs/v3.6/learning/design-learner/)。

修正与澄清：区分联合共识与单成员变更协议。快照可替代已压缩前缀。新 Leader 的安全证明依赖多项性质，不能只用交集。读取还需等待 lastApplied。

人工确认：无阻塞事项。

## 相邻文章分工

- 架构组分别负责模型边界、聚合、模块约束、拆分取舍和迁移。
- 可用性组分别负责目标、灾备、切换、租户隔离和成本。
- 分布式数据组分别负责方案、协调、补偿、事件和恢复。
- 分布式系统组分别负责 CAP、观察语义、地域拓扑、复制和 Raft。
- 本批之外的文章无需修改。页面主标题保持原名。

## 验证

```sh
node scripts/check-article-format.mjs --style-strict -- \
  docs/system-design/architecture/aggregate-invariants-transaction-boundaries.mdx \
  docs/system-design/architecture/domain-bounded-context-ubiquitous-language.mdx \
  docs/system-design/architecture/microservice-splitting-benefits-costs.mdx \
  docs/system-design/architecture/modular-monolith-dependency-constraints.mdx \
  docs/system-design/architecture/strangler-migration-compatibility-rollback.mdx \
  docs/system-design/availability/failover-drills-recovery-validation.mdx \
  docs/system-design/availability/high-availability-backup-rto-rpo.mdx \
  docs/system-design/availability/multi-tenant-isolation-quotas-data-boundaries.mdx \
  docs/system-design/availability/performance-reliability-cost-attribution.mdx \
  docs/system-design/availability/sli-slo-error-budget-capacity-headroom.mdx \
  docs/system-design/distributed-data/2pc-tcc-coordination-cost.mdx \
  docs/system-design/distributed-data/idempotency-reconciliation-manual-repair.mdx \
  docs/system-design/distributed-data/invariants-to-consistency-strategy.mdx \
  docs/system-design/distributed-data/outbox-cdc-reliable-events.mdx \
  docs/system-design/distributed-data/saga-compensation-intermediate-state.mdx \
  docs/system-design/distributed-system/cap-theorem.mdx \
  docs/system-design/distributed-system/consistency-models-quorum-linearizability.mdx \
  docs/system-design/distributed-system/cross-region-replication-latency-conflicts.mdx \
  docs/system-design/distributed-system/primary_backup_replication.mdx \
  docs/system-design/distributed-system/raft-election-log-replication.mdx
```

通过：20 篇文章，0 篇有结构问题，0 篇有文风提示。

```sh
npm run build
```

通过，退出码为 0。文档链接、复习资源、岗位与面经检查通过。Docusaurus 成功生成静态站点。

全站格式检查仍报告存量问题：268 篇文章中，6 篇有结构问题，28 篇有文风提示。这些提示未阻断构建，本批严格检查已清零。

构建还报告博客作者与截断标记、Node localStorage、Docusaurus 更新配置权限提示。它们未阻断构建；本批未修改全局配置。

```sh
git diff --check
```

通过，无空白格式错误。

与修改前版本逐项比对，20 篇文章的 knowledge.id、原有显式锚点和 20 道原有卡片均保留。原有公司字段与来源注释均保留。26 道新增题已逐项记入本记录，章节编号检查通过。

## 未完成与人工确认

无阻塞事项。既有公司归属未新增或重新推定。

新增 SQL 与数值示例经过逻辑推演和公式复核。本批未运行 Docker、数据库恢复或故障注入实验。参数与协议边界按所列官方文档及论文核对。具体系统的 RTO、容量和成本仍需现场测量。
