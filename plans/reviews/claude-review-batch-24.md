# Claude 校验 · 第 24 批（2026-10-30）

范围：领域与架构演进、架构决策与演进、可用性与多租户三个栏目，各 6 篇（均含栏目首页），共 18 篇。校验后直接修改，Lin 的审阅异步进行。

校验项：

1. 技术事实：对照 Spring Modulith、Microsoft Learn 的 DDD 与架构模式文档、Martin Fowler 相关文章、AWS Prescriptive Guidance 与 Well-Architected、MADR、Google SRE、PostgreSQL 18 和 FinOps Foundation。
2. 推演示例：逐一推算。
   - 乐观锁版本 7/8 冲突后，确认命令在重新加载后被拒绝。
   - 回填余额 100 覆盖在线更新 120。
   - 技术债两方案按 12 周比较：A 净收益 +4 人日，B 为 −0.8 人日；若只剩 4 周，两者都收不回投入。
   - 燃烧率 14.4 持续 1 小时，消耗 30 天预算的 14.4/720 = 2%。
   - 三可用区 6000 QPS、单实例 500 QPS 时，每区至少 6 个实例，共 18 个，负载约占安全容量的 66.7%。
   - 成本模型 F=1000、v=0.01 时，1 万单每单 0.11 元，2 万单每单 0.06 元；两期差额分解式代数展开后成立。
3. 与相邻文章是否矛盾，站内锚点是否存在：108 个站内链接都存在。
4. 参考资料：59 个外部链接都返回对应页面。

## 结论

18 篇全部通过，事实层面没有修改；只修了一处排版。

| 文章 | 结论 |
| --- | --- |
| [软件架构（栏目首页）](../../docs/system-design/architecture/index.mdx) | ✅ 通过 |
| [限界上下文](../../docs/system-design/architecture/domain-bounded-context-ubiquitous-language.mdx) | ✅ 通过 |
| [聚合](../../docs/system-design/architecture/aggregate-invariants-transaction-boundaries.mdx) | ✅ 通过 |
| [模块化单体](../../docs/system-design/architecture/modular-monolith-dependency-constraints.mdx) | ✅ 通过 |
| [微服务架构](../../docs/system-design/architecture/microservice-splitting-benefits-costs.mdx) | ✅ 通过 |
| [绞杀者模式](../../docs/system-design/architecture/strangler-migration-compatibility-rollback.mdx) | ✅ 通过 |
| [架构决策与演进（栏目首页）](../../docs/system-design/leadership/index.mdx) | ✅ 通过 |
| [架构决策记录（ADR）](../../docs/system-design/leadership/constraints-architecture-decision-records.mdx) | ✅ 通过 |
| [架构迁移](../../docs/system-design/leadership/compatibility-migration-canary-exit-criteria.mdx) | ✅ 通过 |
| [技术债](../../docs/system-design/leadership/technical-debt-priority-business-value.mdx) | ✅ 通过 |
| [设计评审](../../docs/system-design/leadership/cross-team-design-review-disagreement.mdx) | ✅ 通过 |
| [事故复盘](../../docs/system-design/leadership/incident-review-failed-designs-organizational-learning.mdx) | ✅ 通过 |
| [可用性工程（栏目首页）](../../docs/system-design/availability/index.mdx) | ✅ 通过 |
| [服务等级目标（SLO）](../../docs/system-design/availability/sli-slo-error-budget-capacity-headroom.mdx) | ✅ 已修改（排版） |
| [灾难恢复](../../docs/system-design/availability/high-availability-backup-rto-rpo.mdx) | ✅ 通过 |
| [故障转移](../../docs/system-design/availability/failover-drills-recovery-validation.mdx) | ✅ 通过 |
| [多租户](../../docs/system-design/availability/multi-tenant-isolation-quotas-data-boundaries.mdx) | ✅ 通过 |
| [成本归因](../../docs/system-design/availability/performance-reliability-cost-attribution.mdx) | ✅ 通过 |

## 修改内容

### 服务等级目标（排版）

10.2 参考回答的 `</details>` 后面紧跟着 10.3 的标题，中间没有空行，已补上。全站检查过，没有其他同样的情况。

## 已验证的断言

- Spring Modulith：
  - 文中以 2.1 为基准；Maven Central 上当前最新的是 2.2.0-RC1，2.1 已正式发布。
  - 默认把主包的直接子包识别为模块。
  - `verify()` 检查依赖环和对内部包的访问。
  - Event Publication Registry 在业务事务内登记发布记录，监听器完成后标记完成；重发可能导致重复，因此监听器需要幂等。
- Java 访问规则：`package-private` 不覆盖子包，`internal` 包中的 `public` 类型仍可被引用。
- Spring 默认同步分发应用事件。
- ADR 状态包括 Proposed、Accepted、Rejected、Deprecated、Superseded，与 MADR 和 AWS 指南一致。
- 扩展、迁移、收缩三个阶段对应 Martin Fowler 的 Parallel Change。
- PostgreSQL 18：
  - 启用 RLS 而没有适用策略时，默认拒绝访问。
  - 超级用户和 `BYPASSRLS` 角色绕过策略；表所有者默认也绕过，需要 `FORCE ROW LEVEL SECURITY` 才受约束。
  - `SET LOCAL` 的设置在事务结束后恢复为会话原值。
  - PITR 需要基础备份加连续的 WAL，`pg_dump` 导出不能作为 WAL 重放的基础。

下一批：系统设计的方法与案例、面向对象设计和 MIT 6.824。
