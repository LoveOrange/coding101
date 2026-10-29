# Claude 校验 · 第 22 批（2026-10-30）

范围：微服务治理（6 篇，含栏目首页）和可靠性与过载保护（6 篇，含栏目首页），共 12 篇。校验后直接修改，Lin 的审阅异步进行。

校验项：

1. 技术事实：对照 Envoy、Kubernetes、Argo Rollouts、gRPC、Resilience4j、Stripe、RFC 9110 / 6585 与 Amazon Builders' Library。
2. 推演示例：逐一推算。
   - 四层各尝试 3 次，最深下游最多调用 `3⁴=81` 次。
   - 退避上限 100/200/400 ms。
   - 令牌桶 `B + r × t`。
   - Little's Law：1000/s × 20 ms = 20，1000/s × 2 s = 2000。
   - 超时预算：800 − 100 − 50 = 650 ms，串行 B 剩 450 ms。
   - 固定窗口跨边界接近 200 次。
   - Saga 式库存旧快照覆盖。
3. 与相邻文章是否矛盾，站内锚点是否存在：78 个站内链接都存在。
4. 参考资料：43 个外部链接都返回对应页面。

## 结论

12 篇全部通过，没有修改。

| 文章 | 结论 |
| --- | --- |
| [微服务治理（栏目首页）](../../docs/system-design/microservices/index.mdx) | ✅ 通过 |
| [服务发现](../../docs/system-design/microservices/service-discovery-health-checks.mdx) | ✅ 通过 |
| [配置中心](../../docs/system-design/microservices/config-center-version-refresh.mdx) | ✅ 通过 |
| [API 网关](../../docs/system-design/microservices/api-gateway-routing.mdx) | ✅ 通过 |
| [灰度发布](../../docs/system-design/microservices/canary-traffic-tagging-rollback.mdx) | ✅ 通过 |
| [控制平面与数据平面](../../docs/system-design/microservices/control-plane-data-plane-failures.mdx) | ✅ 通过 |
| [服务可靠性（栏目首页）](../../docs/system-design/reliability/index.mdx) | ✅ 通过 |
| [超时](../../docs/system-design/reliability/timeout-budget-cancellation.mdx) | ✅ 通过 |
| [重试](../../docs/system-design/reliability/retry-backoff-jitter-storms.mdx) | ✅ 通过 |
| [限流](../../docs/system-design/reliability/rate-limiting-capacity-protection.mdx) | ✅ 通过 |
| [服务容错](../../docs/system-design/reliability/circuit-breaker-degradation-bulkhead.mdx) | ✅ 通过 |
| [幂等键](../../docs/system-design/reliability/idempotency-keys-safe-retries.mdx) | ✅ 通过 |

## 已验证的断言

- Envoy：
  - `routes` 列表按顺序取首个匹配项，精确路径不会自动优先。
  - circuit breaking 配置的是资源上限，按错误摘除实例属于 outlier detection。
  - xDS ACK 只确认资源校验通过。
- Kubernetes：
  - watch 历史过期返回 `410 Gone`，需要重新 list。
  - `resourceVersion` 是不透明标识。
  - 终止宽限期包含 `preStop`。
  - 环境变量引用的 ConfigMap 不随更新变化；`subPath` 挂载不接收更新。
- Argo Rollouts：分析结果为 `Inconclusive` 时暂停发布。
- gRPC：deadline 以剩余 timeout 的形式传播；Java 与 Go 实现默认传播。
- Java 21：`Future.get(timeout)` 超时只结束等待；`cancel(true)` 尝试中断执行线程。
- Resilience4j：
  - 达到 `minimumNumberOfCalls` 之后才计算失败率。
  - 默认由等待期后的新调用触发半开，开启自动转换后由监控线程触发。
  - Retry 包在 CircuitBreaker 外层时，每次尝试都计入统计。
- Stripe：只保存已进入执行的结果，包括 500；参数校验失败和并发冲突不保存。
- `Retry-After` 支持秒数和 HTTP 日期两种格式。

下一批：系统设计中的认证与应用安全、生产工程。
