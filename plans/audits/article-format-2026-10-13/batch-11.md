# 文章格式审计：batch-11

日期：2026-10-13。分支：`content/ai-batch-13`。

本批完成指定 19 篇文章，新增 20 道本站自测。修改范围为本批文章与本记录。未切换分支，未提交 git。

## 表达与标识

- 完整阅读 AGENTS.md、batch-1b 与两篇指定样例。
- 开头补充负责范围，并连接相邻文章。资深岗位的协作内容限定为面试准备。
- 面试核心改为可直接复述的结论。参考回答先回答问题，再解释依据。
- 逐段通读正文、标题与段首。拆分长句，补齐主语，减少兜底限定与连续否定。
- 普通二、三级标题使用概念名。面试题保留完整问句。
- 所有二、三级标题都有显式锚点。新增章节锚点按标题生成，卡片 ID 使用英文。
- 与 HEAD 比较：19 个 knowledge.id 均未改变。
- 188 个已有显式锚点全部保留，含 19 张原卡片。
- 没有删除、合并原卡片，也未增加公司归属。
- 新增题全部使用统一本站自测注释。原有公司与来源注释保持不变。

## 每篇改动与依据

### 1. 架构迁移

文件：[compatibility-migration-canary-exit-criteria.mdx](../../../docs/system-design/leadership/compatibility-migration-canary-exit-criteria.mdx)。

负责兼容清单、批次状态与退出条件。灰度分桶改为相邻文章链接。新增回填与在线写入竞争的例子。补充日志位置、追平、版本判断和业务字段对账。

新增题：`backfill-concurrent-writes`。

依据：[Parallel Change](https://martinfowler.com/bliki/ParallelChange.html)、[Debezium MySQL snapshots](https://debezium.io/documentation/reference/stable/connectors/mysql.html#mysql-snapshots)、[AWS Transactional outbox](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html)。均已加入参考资料。

修正：补齐原回填流程遗漏的并发覆盖窗口。未声称影子比较能验证写入安全。

人工确认：无。回填例用于推演，未运行迁移实验。

### 2. 架构决策记录（ADR）

文件：[constraints-architecture-decision-records.mdx](../../../docs/system-design/leadership/constraints-architecture-decision-records.mdx)。

保留决策范围、约束、备选方案与状态。明确 Proposed、Accepted 与 Superseded 的关系。评审分歧改为相邻文章引用。选型示例保留可核验的双写与 Outbox 对照。

新增题：无。原卡片已覆盖该主题的核心追问。

依据：[AWS ADR process](https://docs.aws.amazon.com/prescriptive-guidance/latest/architectural-decision-records/adr-process.html)、[AWS Transactional outbox](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html)。后者新增到参考资料。

修正：明确已接受记录保留原结论。避免把 MySQL 与 Kafka 的跨资源事务写成现成能力。

人工确认：无。

### 3. 设计评审

文件：[cross-team-design-review-disagreement.mdx](../../../docs/system-design/leadership/cross-team-design-review-disagreement.mdx)。

按问题、证据、决策权与执行责任重写。区分阻塞意见和个人偏好。保留异议与升级条件，减少通用管理表述。ADR 与迁移细节改为引用。

新增题：无。原题已覆盖分歧判断与决策推进。

依据：[Google Review Standard](https://google.github.io/eng-practices/review/reviewer/standard.html)、[AWS ADR process](https://docs.aws.amazon.com/prescriptive-guidance/latest/architectural-decision-records/adr-process.html)。沿用文章参考资料。

修正：无新增技术错误。主要调整表达与内容分工。

人工确认：无。

### 4. 事故复盘

文件：[incident-review-failed-designs-organizational-learning.mdx](../../../docs/system-design/leadership/incident-review-failed-designs-organizational-learning.mdx)。

突出事件时间、发现时间和用户影响。区分触发动作与促成条件。保留无责分析、行动验收和跨事故复核。现场诊断改为相邻文章链接。

新增题：无。原题已覆盖完整复盘与行动验证。

依据：[Google SRE Postmortem Culture](https://sre.google/sre-book/postmortem-culture/)。沿用参考资料。

修正：分开文档完成与改进完成。复盘可在评审后发布，行动项继续跟踪。

人工确认：无。

### 5. 技术债

文件：[technical-debt-priority-business-value.mdx](../../../docs/system-design/leadership/technical-debt-priority-business-value.mdx)。

以本金、利息和业务结果组织表达。新增同周期工时比较与剩余投入判断。迁移实现细节交由架构迁移文章。

新增题：`debt-evaluation-horizon`。

依据：[Martin Fowler Technical Debt](https://martinfowler.com/bliki/TechnicalDebt.html)、[AWS Prioritize improvements](https://docs.aws.amazon.com/wellarchitected/latest/userguide/prioritize-improvements.html)。沿用参考资料；数字例为本文算术推演。

修正：原风险公式重复计入时间。现按同周期概率乘单次影响计算。多次事件使用预期次数，另行判断不可逆风险。

人工确认：无。工时收益例已注明忽略贴现。

### 6. API 网关

文件：[api-gateway-routing.mdx](../../../docs/system-design/microservices/api-gateway-routing.mdx)。

突出入口职责、过滤顺序和可信身份。新增 Envoy 首条匹配与路由遮蔽表。限流、重试与实例发现改为对应文章链接。

新增题：`route-order-shadowing`。

依据：[Envoy Route matching](https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_conn_man/route_matching)、[Envoy Life of a Request](https://www.envoyproxy.io/docs/envoy/latest/intro/life_of_a_request.html)。沿用参考资料。

修正：明确 `routes` 列表与 matcher 树的区别。精确路径不自动覆盖前置前缀规则。过滤器顺序也受路由元数据依赖影响。

人工确认：无。

### 7. 灰度发布

文件：[canary-traffic-tagging-rollback.mdx](../../../docs/system-design/microservices/canary-traffic-tagging-rollback.mdx)。

明确稳定分桶、负载可比性与停止条件。新增无数据、分析错误与 Inconclusive 的分工。数据库迁移和影子验证改为引用。

新增题：`canary-inconclusive`。

依据：[Argo Rollouts Analysis](https://argo-rollouts.readthedocs.io/en/stable/features/analysis/)。新增到参考资料；保留 Kubernetes 与 Istio 资料。

修正：路由标签需要独立约定，Trace context 本身不定义灰度路由。无数据和查询失败也不自动等价于 Inconclusive。

人工确认：无。放量阈值由具体业务设定。

### 8. 配置中心

文件：[config-center-version-refresh.mdx](../../../docs/system-design/microservices/config-center-version-refresh.mdx)。

区分配置接收与实际应用。完整快照表述限定为一种分发方案。新增 ConfigMap 环境变量、卷、subPath 与 API 对照。

新增题：`configmap-refresh-modes`。

依据：[Kubernetes ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/)。沿用参考资料。

修正：拉完整快照和全局单调版本并非所有系统的强制协议。环境变量需重建 Pod；文件更新后仍需应用重读。

人工确认：无。

### 9. 控制平面与数据平面

文件：[control-plane-data-plane-failures.mdx](../../../docs/system-design/microservices/control-plane-data-plane-failures.mdx)。

补清本地配置的有效期限和启动边界。新增 xDS v3 的 ACK、nonce、资源类型与发布顺序。用 X 到 Y 的集群切换说明依赖顺序。

新增题：`xds-ack-sequencing`。

依据：[Envoy xDS protocol](https://www.envoyproxy.io/docs/envoy/latest/api-docs/xds_protocol.html)。沿用参考资料。

修正：控制面断连并不保证已有调用完全不受影响。xDS ACK 也不保证跨资源类型原子生效。NACK 后需检查实际资源状态，版本不可随意作大小排序。

人工确认：无。

### 10. 服务发现

文件：[service-discovery-health-checks.mdx](../../../docs/system-design/microservices/service-discovery-health-checks.mdx)。

保留注册方式、健康检查与上下线。补充 preStop、终止宽限期和长连接边界。新增 list/watch 的 410 Gone 恢复过程。

新增题：`discovery-watch-relist`。

依据：[Kubernetes Probes](https://kubernetes.io/docs/concepts/workloads/pods/probes/)、[API Concepts](https://kubernetes.io/docs/reference/using-api/api-concepts/)、[Pod Lifecycle](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/)。后两项加入参考资料。

修正：liveness 按阈值与重启策略处理失败。readiness 讨论注明 Service 默认条件。`resourceVersion` 作为不透明标识使用。

人工确认：无。

### 11. 可重复交付

文件：[docker-ci-cd-reproducible-delivery.mdx](../../../docs/system-design/production/docker-ci-cd-reproducible-delivery.mdx)。

保留同 digest 晋升与多阶段构建。新增 BuildKit secret、缓存失效与入口信号传递。补充产物冒烟测试和部署端来源验证。

新增题：`build-secrets-cache`、`container-sigterm`。

依据：[Docker Build secrets](https://docs.docker.com/build/building/secrets/)、[Cache invalidation](https://docs.docker.com/build/cache/invalidation/)、[Dockerfile reference](https://docs.docker.com/reference/dockerfile/)、[SLSA v1.1](https://slsa.dev/spec/v1.1/)。Docker 三项新增到参考资料。

修正：Dockerfile 指令并非全部生成文件层。可变 tag 与 digest 锁定的效果不同。构建秘密变化也不会自动使缓存失效。

人工确认：无。未运行容器实验。

### 12. 生产故障诊断

文件：[jvm-thread-sql-network-joint-diagnosis.mdx](../../../docs/system-design/production/jvm-thread-sql-network-joint-diagnosis.mdx)。

按跨层证据组织等待型故障诊断。补充单核热点与容器配额。新增 JDK 21 线程栈、JFR、NMT 命令。明确虚拟线程诊断的版本条件。

新增题：`jvm-diagnostic-evidence`。

依据：[JDK 21 jcmd](https://docs.oracle.com/en/java/javase/21/docs/specs/man/jcmd.html)、[Virtual Threads](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html)、[NMT](https://docs.oracle.com/en/java/javase/21/vm/native-memory-tracking.html)、[JDK 24 Release Notes](https://www.oracle.com/java/technologies/javase/24-relnote-issues.html)。均加入参考资料。

修正：低 CPU 均值不能排除局部计算瓶颈。Trace 只展示已埋点阶段。JDK 24 已消除 synchronized 导致的 pinning。NMT 需启动时启用，统计范围也不覆盖全部 RSS。

人工确认：无。命令按文档核对，未连接生产进程。

### 13. 可观测性

文件：[logs-metrics-traces-correlation.mdx](../../../docs/system-design/production/logs-metrics-traces-correlation.mdx)。

明确三类信号、关联 ID 与上下文传播。新增经典 histogram 聚合的 PromQL。补充尾部采样的前置丢弃、汇聚和等待窗口。

新增题：`histogram-aggregate-quantile`、`tail-sampling-missing-spans`。

依据：[Prometheus Histograms and summaries](https://prometheus.io/docs/practices/histograms/)、[OpenTelemetry Sampling](https://opentelemetry.io/docs/concepts/sampling/)、[Tail sampling processor](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/tailsamplingprocessor/README.md)。首尾两项加入参考资料。

修正：尾部采样无法保证所有错误都被保留。已被前置丢弃的 span 无法恢复。跨实例 P99 需聚合分布后计算。

人工确认：无。PromQL 明确假定 bucket 边界一致。

### 14. Maven

文件：[maven-lifecycle-dependency-convergence.mdx](../../../docs/system-design/production/maven-lifecycle-dependency-convergence.mdx)。

限定 Maven 3 的生命周期与 reactor。补齐聚合、继承和模块选择命令。新增 Failsafe 测试、清理与结果检查阶段。

新增题：`reactor-parent-aggregation`、`failsafe-verify`。

依据：[Dependency Mechanism](https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html)、[Multiple Modules](https://maven.apache.org/guides/mini/guide-multiple-modules.html)、[Failsafe](https://maven.apache.org/surefire/maven-failsafe-plugin/)、[Dependency Convergence](https://maven.apache.org/enforcer/enforcer-rules/dependencyConvergence.html)。模块与 Failsafe 资料新增。

修正：受管依赖也能通过传递路径引入。最近路径规则受显式管理约束。phase 不会自动绑定缺少的插件。重复类检查也不是 convergence 的职责。

人工确认：无。未创建 Maven 实验工程。

### 15. 服务容错

文件：[circuit-breaker-degradation-bulkhead.mdx](../../../docs/system-design/reliability/circuit-breaker-degradation-bulkhead.mdx)。

保留状态机、降级语义和舱壁取舍。新增窗口、最小样本和并发额度对照。装饰器顺序按实际统计口径解释。

新增题：`breaker-window-permits`。

依据：[Resilience4j CircuitBreaker](https://resilience4j.readme.io/docs/circuitbreaker)、[Bulkhead](https://resilience4j.readme.io/docs/bulkhead)、[Envoy Circuit breaking](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/circuit_breaking)、[Outlier detection](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/outlier)。Bulkhead 与摘除资料新增。

修正：窗口容量与并发限制分开。Resilience4j 默认由到期后的请求触发半开。Envoy 资源上限与健康摘除也属于不同机制。

人工确认：无。参数表明确标为示例值。

### 16. 幂等键

文件：[idempotency-keys-safe-retries.mdx](../../../docs/system-design/reliability/idempotency-keys-safe-retries.mdx)。

区分同库事务与先提交 PROCESSING 的工作流。补充外部支付成功后的崩溃窗口。保留 TTL、参数摘要与结果重放契约。

新增题：`idempotency-crash-window`。

依据：[Stripe Idempotent requests](https://docs.stripe.com/api/idempotent_requests)、[AWS Idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/)、[MySQL 8.4 Consistent Reads](https://dev.mysql.com/doc/refman/8.4/en/innodb-consistent-read.html)、[Locks Set](https://dev.mysql.com/doc/refman/8.4/en/innodb-locks-set.html)。MySQL 两项加入参考资料。

修正：MySQL RC/RR 普通读看不到未提交的处理中记录。先提交 PROCESSING 与单事务模型需分开。条件状态更新也不能单独保证外部扣款去重。

人工确认：无。未新增支付实现或事务实验。

### 17. 限流

文件：[rate-limiting-capacity-protection.mdx](../../../docs/system-design/reliability/rate-limiting-capacity-protection.mdx)。

区分滑动日志、滑动计数与漏桶实现。补充平均在途量推演和 Redis 原子扣减。分布式额度明确区分严格预分配与异步纠偏。

新增题：`rate-concurrency-little-law`、`distributed-rate-atomicity`。

依据：[Redis Rate limiting algorithms](https://redis.io/tutorials/howtos/ratelimiting/)、[Redis Lua](https://redis.io/docs/latest/develop/programmability/eval-intro/)、[MIT Little’s Law](https://web.mit.edu/2.810/www/files/lectures/lec12-time-analysis-2019.pdf)、[RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html)。均加入参考资料。

修正：滑动窗口并非只有分格加权一种实现。严格预分配不必然超额。Little’s Law 使用同边界平均值，而非 P99。漏桶正文限定为排队整形式。

人工确认：无。MIT 原候选链接失效，已换为有效课程资料。

### 18. 重试

文件：[retry-backoff-jitter-storms.mdx](../../../docs/system-design/reliability/retry-backoff-jitter-storms.mdx)。

明确总尝试次数、指数起点与系统预算。新增 Retry-After 秒数、日期与剩余预算推演。幂等机制改为相邻文章链接。

新增题：`retry-after-budget`。

依据：[AWS Exponential Backoff and Jitter](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/)、[RFC 9110 Retry-After](https://www.rfc-editor.org/rfc/rfc9110.html#name-retry-after)、[gRPC Request Hedging](https://grpc.io/docs/guides/request-hedging/)。均加入参考资料。

修正：错误类别只构成重试候选，不能单独证明安全。明确“总尝试 3 次”包含首次调用。

人工确认：无。等待策略标为一种设计选择。

### 19. 超时

文件：[timeout-budget-cancellation.mdx](../../../docs/system-design/reliability/timeout-budget-cancellation.mdx)。

明确总 deadline 与本地阶段上限共同生效。新增串行与并行的 800 ms 算例。补充 Future 等待超时与取消的区别。

新增题：`serial-parallel-budget`。

依据：[gRPC Deadlines](https://grpc.io/docs/guides/deadlines/)、[Cancellation](https://grpc.io/docs/guides/cancellation/)、[Java 21 Future](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/Future.html)、[Thread.interrupt](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Thread.html#interrupt())。Java 两项加入参考资料。

修正：deadline 与较短的固定阶段超时可以共存。Future 等待超时本身不停止任务。取消保留协作语义，已提交事务仍需核对结果。

人工确认：无。预算数字是算例，不是生产推荐值。

## 相邻文章分工

- 架构迁移负责兼容、回填和退出。灰度发布负责分组与放量判断。
- 服务发现负责实例生命周期。控制面文章负责状态分发与断连边界。
- 配置中心负责应用参数刷新。xDS 的资源顺序留在控制面文章。
- Maven 负责构建与依赖。可重复交付负责产物晋升与容器运行。
- 可观测性负责信号采集与聚合。故障诊断负责跨层证据判断。
- 超时负责预算，重试负责追加尝试。幂等键负责副作用去重。
- 限流负责容量，服务容错负责健康状态与隔离。

## 验证

执行以下命令，文件列表为本批全部 19 篇：

```sh
node scripts/check-article-format.mjs --style-strict -- \
  docs/system-design/leadership/compatibility-migration-canary-exit-criteria.mdx \
  docs/system-design/leadership/constraints-architecture-decision-records.mdx \
  docs/system-design/leadership/cross-team-design-review-disagreement.mdx \
  docs/system-design/leadership/incident-review-failed-designs-organizational-learning.mdx \
  docs/system-design/leadership/technical-debt-priority-business-value.mdx \
  docs/system-design/microservices/api-gateway-routing.mdx \
  docs/system-design/microservices/canary-traffic-tagging-rollback.mdx \
  docs/system-design/microservices/config-center-version-refresh.mdx \
  docs/system-design/microservices/control-plane-data-plane-failures.mdx \
  docs/system-design/microservices/service-discovery-health-checks.mdx \
  docs/system-design/production/docker-ci-cd-reproducible-delivery.mdx \
  docs/system-design/production/jvm-thread-sql-network-joint-diagnosis.mdx \
  docs/system-design/production/logs-metrics-traces-correlation.mdx \
  docs/system-design/production/maven-lifecycle-dependency-convergence.mdx \
  docs/system-design/reliability/circuit-breaker-degradation-bulkhead.mdx \
  docs/system-design/reliability/idempotency-keys-safe-retries.mdx \
  docs/system-design/reliability/rate-limiting-capacity-protection.mdx \
  docs/system-design/reliability/retry-backoff-jitter-storms.mdx \
  docs/system-design/reliability/timeout-budget-cancellation.mdx
npm run build
git diff --check
```

- 严格检查通过：19 篇，0 篇结构问题，0 篇文风提示。
- 构建通过：文档链接、复习资源与岗位数据检查成功。
- Docusaurus 成功生成静态文件。
- 标识核对通过：19 个 knowledge.id、188 个旧锚点均保留。
- 原卡片 19 张均保留，新增 20 张本站自测。
- 本批之外仍有 6 篇结构问题、48 篇文风提示。全站检查按现有规则只报告，不阻断构建。
- 构建仍有已有博客作者、摘要与 localStorage 提示。另有 webpack 缓存写入及更新检查权限提示。它们未影响构建，未扩大范围调整权限。

## 未完成与人工确认

无阻塞事项，无需额外人工确认。技术机制已按一手资料核验。本文命令与配置为教学示例，未宣称完成生产演练。

本批未启动 Docker 容器，未映射主机端口。未读取凭据，也未改动主机配置。
