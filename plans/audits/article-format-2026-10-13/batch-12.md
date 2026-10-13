# 文章格式审计：batch-12

日期：2026-10-13。分支：`content/ai-batch-13`。

本批完成指定 14 篇文章。新增 34 道本站原理自测，保留原有 10 道卡片。仅修改本批文章与本记录，未切换分支，未提交 git。

## 表达与标识

- 完整阅读 AGENTS.md、batch-1b 与两篇指定样例。
- 开头明确文章范围，面试核心改为直接结论。
- 正文与参考回答按短句重写，并逐篇通读。
- 普通二、三级标题采用概念名称，面试题保留完整问题。
- 已有 knowledge.id、80 个显式锚点和卡片 ID 全部保留。
- 原有卡片未删除或合并，未新增公司归属。
- 新增自测采用统一注释，参考回答默认收起。
- 14 篇的二、三级标题均有显式锚点，编号连续。
- 新正文锚点采用标题文字，卡片 ID 使用英文。
- 参考资料整理为连续列表，并优先采用一手资料。

## 每篇改动与依据

### 1. 认证与授权

文件：[authentication-authorization-trust-boundaries.mdx](../../../docs/system-design/security/authentication-authorization-trust-boundaries.mdx)。

明确认证、授权和信任边界。补入 ReBAC、权限缓存失效和故障拒绝策略。多租户查询增加可信 tenant 条件。令牌撤销和日志机制改为相邻文章链接。

新增题：`relationship-authorization`、`authorization-revocation`。

依据：[OWASP：Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)、[OWASP API Security：Broken Object Level Authorization](https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/)、[NIST SP 800-207：Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final)。

修正与准确性：原文“网关只能做粗粒度检查”过于绝对。改为按资源信息与业务状态划分职责。

人工确认：无。关系继承和缓存策略按业务示例呈现。

### 2. Web 应用安全

文件：[injection-authorization-ssrf-deserialization.mdx](../../../docs/system-design/security/injection-authorization-ssrf-deserialization.mdx)。

补入 XSS、CSRF、CORS 与 HttpOnly 的边界。细化 DNS 重解析、重定向和实际连接校验。补充 Java 17 ObjectInputFilter 与动态类型限制。

新增题：`xss-csrf-cors`、`ssrf-dns-redirect`、`deserialization-type-limits`。

依据：[OWASP：Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Injection_Prevention_Cheat_Sheet.html)、[OWASP：SSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html)、[OWASP：Deserialization](https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html)、[OWASP：XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)、[OWASP：CSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)、[Java 17：Serialization Filtering](https://docs.oracle.com/en/java/javase/17/core/serialization-filtering1.html)、[OWASP API Security：Broken Object Level Authorization](https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/)。

修正与准确性：补正 JSON 格式与安全类型映射的区别。明确过滤器需配置，参数化仅处理值参数。凭据值从响应和日志中移除。

人工确认：无。未进行真实攻击测试。

### 3. 密钥、证书、审计与供应链安全

文件：[secrets-certificates-audit-supply-chain.mdx](../../../docs/system-design/security/secrets-certificates-audit-supply-chain.mdx)。

细化正常轮换、未知 kid 刷新和实际端点证书检查。补入泄漏后的紧急撤销与产物证明验证。保留审计隔离和依赖修复流程。

新增题：`compromised-key-response`、`artifact-provenance`。

依据：[OWASP：Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)、[OWASP：Logging](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)、[RFC 9525：Service Identity in TLS](https://www.rfc-editor.org/rfc/rfc9525.html)、[RFC 5280：Certificate and CRL Profile](https://www.rfc-editor.org/rfc/rfc5280.html)、[SLSA 1.1：Verifying artifacts](https://slsa.dev/spec/v1.1/verifying-artifacts)、[CISA：Software Bill of Materials](https://www.cisa.gov/sbom)、[Maven：Dependency Mechanism](https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html)。

修正与准确性：区分正常重叠窗口与泄漏后的立即撤销。限定双凭据轮换的适用条件。Maven 版本管理不再等同于锁定完整构建产物。

人工确认：无。未操作凭据、证书或外部部署。

### 4. Session、JWT、OAuth 2.0 与 OIDC

文件：[session-jwt-oauth-oidc.mdx](../../../docs/system-design/security/session-jwt-oauth-oidc.mdx)。

补入会话固定、空闲与绝对超时。展开 PKCE、state、nonce 的绑定对象。说明刷新并发与旧令牌重用。

新增题：`pkce-state-nonce`、`session-fixation`。

依据：[RFC 9700：OAuth 2.0 Security](https://www.rfc-editor.org/rfc/rfc9700.html)、[OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)、[RFC 7519：JSON Web Token](https://www.rfc-editor.org/rfc/rfc7519.html)、[RFC 8725：JWT Best Current Practices](https://www.rfc-editor.org/rfc/rfc8725.html)、[RFC 7636：PKCE](https://www.rfc-editor.org/rfc/rfc7636.html)、[OWASP：Session Management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)。

修正与准确性：JWT 可使用 JWS 或 JWE，三段结构限定为 JWS。刷新令牌撤销与既有访问令牌失效分别处理。auth_time 与 nonce 按 OIDC 请求条件说明。

人工确认：无。OAuth 安全要求以 RFC 9700 为准。

### 5. Spring Security

文件：[spring-security-filter-chain.mdx](../../../docs/system-design/security/spring-security-filter-chain.mdx)。

明确采用 Spring Security 6.5。补充显式保存、方法安全启用和代理自调用边界。区分 securityMatcher 与链内 requestMatchers。

新增题：`explicit-context-save`、`method-security-proxy`。

依据：[Spring Security 6.5：Servlet Architecture](https://docs.spring.io/spring-security/reference/6.5/servlet/architecture.html)、[Spring Security 6.5：Authentication Architecture](https://docs.spring.io/spring-security/reference/6.5/servlet/authentication/architecture.html)、[Spring Security 6.5：Session Management](https://docs.spring.io/spring-security/reference/6.5/servlet/authentication/session-management.html)、[Spring Security 6.5：Method Security](https://docs.spring.io/spring-security/reference/6.5/servlet/authorization/method-security.html)、[Spring Security 6.5：Java Configuration](https://docs.spring.io/spring-security/reference/6.5/servlet/configuration/java.html)、[Spring Framework：Proxying Mechanisms](https://docs.spring.io/spring-framework/reference/core/aop/proxying.html)。

修正与准确性：Spring Security 6 默认要求显式保存跨请求上下文。ExceptionTranslationFilter 仅捕获下游安全异常。认证入口也可重定向，响应并非固定为 401/403。

人工确认：无。未搭建 Spring 集成工程。

### 6. 容量规划

文件：[capacity-slo-failure-model.mdx](../../../docs/system-design/system-design/capacity-slo-failure-model.mdx)。

加入请求型错误预算、burn rate 和短长窗口告警。补入单区故障容量算例、RTO 与 RPO。明确资源单位、保留期与恢复验证。

新增题：`error-budget-burn-rate`、`failure-domain-capacity`、`rto-rpo`。

依据：[Google SRE：Service Level Objectives](https://sre.google/sre-book/service-level-objectives/)、[Google SRE Workbook：Implementing SLOs](https://sre.google/workbook/implementing-slos/)、[Google SRE Workbook：Alerting on SLOs](https://sre.google/workbook/alerting-on-slos/)、[Google SRE：Handling Overload](https://sre.google/sre-book/handling-overload/)、[AWS：Multi-Region recovery requirements](https://docs.aws.amazon.com/prescriptive-guidance/latest/aws-multi-region-fundamentals/fundamental-1.html)、[Little：A Proof for the Queuing Formula L = λW](https://doi.org/10.1287/opre.9.3.383)。

修正与准确性：Little's Law 使用同一边界内的平均值。删除固定峰值倍数的暗示。区分请求预算与时间预算，明确副本和备份容量。

人工确认：无。数字是公开假设的算例，并非生产压测结果。

### 7. 系统设计面试

文件：[interview-process.mdx](../../../docs/system-design/system-design/interview-process.mdx)。

按需求、接口、数据流和故障推演整理。补入操作级一致性与写入结果未知。容量公式转由容量规划负责。

新增题：`unknown-write-result`、`consistency-by-operation`。

依据：[Google SRE：Handling Overload](https://sre.google/sre-book/handling-overload/)、[AWS Well-Architected：Reliability Pillar](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html)、[AWS Builders' Library：Making retries safe with idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/)、[Spanner：Reads](https://cloud.google.com/spanner/docs/reads)。

修正与准确性：未发现需要单独更正的原有技术结论。补清超时后仍可已提交，以及外部副作用的幂等边界。

人工确认：无。订单示例属于方案推导。

### 8. 数据拆分

文件：[read-write-paths-hotspots-sharding.mdx](../../../docs/system-design/system-design/read-write-paths-hotspots-sharding.mdx)。

补入跨分片 Top K、全序游标与快照边界。迁移增加 epoch、旧写隔离和回滚前的数据追平。保留分片方式与热点的语义分工。

新增题：`cross-shard-pagination`、`shard-migration-fencing`。

依据：[Spanner：Schema design best practices](https://cloud.google.com/spanner/docs/schema-design)、[DynamoDB：Partition key design](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html)、[Elasticsearch：Paginate search results](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/paginate-search-results)、[Spanner：TrueTime and external consistency](https://cloud.google.com/spanner/docs/true-time-external-consistency)、[Google：The Chubby lock service，锁序列号与过期持有者](https://research.google/pubs/the-chubby-lock-service-for-loosely-coupled-distributed-systems/)、[AWS Prescriptive Guidance：Transactional outbox pattern](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html)。

修正与准确性：哈希均匀性明确依赖键分布。相同 OFFSET 无法直接形成全局分页。路由切换与写权威切换分别说明。

人工确认：无。epoch 是设计方案，未声称特定数据库内置支持。

### 9. 系统设计题

文件：[index.mdx](../../../docs/system-design/system-design/system-design-problems/index.mdx)。

补齐面试核心、编号与参考资料。保留选题和复盘定位，压缩重复设计流程。增加短链正文、301/302、缓存与到期检查。

新增题：`short-link-redirect-cache`。

依据：[RFC 9110：HTTP Semantics，301 与 302](https://www.rfc-editor.org/rfc/rfc9110.html)、[RFC 9111：HTTP Caching](https://www.rfc-editor.org/rfc/rfc9111.html)、[Google SRE：Handling Overload](https://sre.google/sre-book/handling-overload/)、[AWS Well-Architected：Reliability Pillar](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html)。

修正与准确性：补清随机短码仍需唯一约束。短链撤销同时受浏览器、CDN 和服务缓存影响。

人工确认：无。已有短链综合题保留原 ID 与来源注释。

### 10. 设计网页爬虫

文件：[index.mdx](../../../docs/system-design/system-design/system-design-problems/web_crawler/index.mdx)。

保留需求、规模、高层设计、核心组件和扩展。补入 robots、主机预算、URL 去重、租约与条件抓取。保留原图，增加任务状态和接口示例。

新增题：`crawler-dedup-leases`、`crawler-politeness`、`crawler-recrawl`。

依据：[RFC 9309：Robots Exclusion Protocol](https://www.rfc-editor.org/rfc/rfc9309.html)、[RFC 9110：HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html)、[RFC 3986：URI Generic Syntax](https://www.rfc-editor.org/rfc/rfc3986.html)、[Apache Nutch：项目文档](https://nutch.apache.org/documentation/)、[AWS：Transactional outbox pattern](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html)、[Redis：Bloom filter](https://redis.io/docs/latest/develop/data-types/probabilistic/bloom-filter/)。

修正与准确性：原 List 示例无法保证并发领取与待抓去重。原 Java 片段还含缺失返回值与未定义变量。改为明确的状态设计，移除伪可运行实现。统一十进制单位和 52 周/年口径。三年原始容量由 72 PB 修正为约 78 PB。

人工确认：无。完整版本保留是本例假设，压缩和副本另算。未实现或运行真实爬虫。

### 11. 系统架构

文件：[universe_architecture.mdx](../../../docs/system-design/system-design/universe_architecture.mdx)。

保留原有六张架构图。补齐核心、名词标题和连续参考资料。增加缓存故障回源预算、健康探针与自测。数据库迁移细节链接到数据拆分。

新增题：`cache-failure-isolation`、`readiness-liveness`。

依据：[Google SRE：Handling Overload](https://sre.google/sre-book/handling-overload/)、[Google SRE：Addressing Cascading Failures](https://sre.google/sre-book/addressing-cascading-failures/)、[Kubernetes：Liveness, Readiness and Startup Probes](https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/)、[AWS Well-Architected：Performance Efficiency](https://docs.aws.amazon.com/wellarchitected/latest/performance-efficiency-pillar/welcome.html)、[AWS Well-Architected：Reliability](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html)。

修正与准确性：未发现需要单独更正的原有技术结论。补清 readiness 与 liveness 的不同作用。明确 100 倍回源估算的负载假设。

人工确认：无。未执行基础设施故障演练。

### 12. SOLID 面向对象设计原则

文件：[solid.mdx](../../../docs/system-design/ood/solid.mdx)。

补齐面试核心、编号、面试题与参考资料。保留小型 Java 示例，补入 LSP 契约和 DIP/DI 区别。以变化原因解释职责边界。

新增题：`srp-change-reasons`、`lsp-contract`、`dip-versus-di`。

依据：[Robert C. Martin：The Single Responsibility Principle](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html)、[Robert C. Martin：SOLID Relevance](https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html)、[Liskov、Wing：A Behavioral Notion of Subtyping](https://www.cs.cmu.edu/~wing/publications/LiskovWing94.pdf)、[Martin Fowler：Inversion of Control Containers and Dependency Injection](https://martinfowler.com/articles/injection.html)。

修正与准确性：移除“实体只能放字段、校验必须外移”的泛化。修正“新增功能只能增加接口”的误导。类型可赋值不再被当作 LSP 的充分条件。

人工确认：无。Java 片段用于解释类型和职责，未建立编译工程。

### 13. 实验 1: MapReduce

文件：[lab1_mapreduce.mdx](<../../../docs/system-design/mit6.824/1. MapReduce/lab1_mapreduce.mdx>)。

保留课程实验笔记与交互图。明确当前课程名、版本和实验文件范围。新增 attempt、阶段屏障、重复报告与提交协议。

新增题：`mr-lab-stale-attempt`、`mr-lab-phase-barrier`、`mr-lab-atomic-output`。

依据：[MIT 6.824 / 6.5840：Lab 1 MapReduce](https://pdos.csail.mit.edu/6.824/labs/lab-mr.html)、[MIT 6.5840：2026 Schedule](https://pdos.csail.mit.edu/6.824/schedule.html)、[Dean、Ghemawat：MapReduce，OSDI 2004](https://pdos.csail.mit.edu/6.824/papers/mapreduce.pdf)、[Go：os.Rename](https://pkg.go.dev/os#Rename)、[Go：plugin](https://pkg.go.dev/plugin)、[Go：Data Race Detector](https://go.dev/doc/articles/race_detector)。

修正与准确性：超时从分配时刻计时，重派时刷新时间。10 秒超时无法证明旧 Worker 已停止。rename 的原子可见性与旧任务覆盖分别处理。移除一天完成实验的无依据时间承诺。

人工确认：无。attempt 提交方案标明为可选加强设计。仓库没有实验实现，未运行 test-mr.sh。

### 14. Lec 1: MapReduce

文件：[lec1_mapreduce.mdx](<../../../docs/system-design/mit6.824/1. MapReduce/lec1_mapreduce.mdx>)。

保留讲义文体、WordCount 与执行图。补充 Shuffle、确定性、Combiner、局部性与长尾。课程实现细节转由实验笔记负责。

新增题：`mr-shuffle-partition`、`mr-worker-reexecution`、`mr-combiner-average`、`mr-straggler-skew`。

依据：[Dean、Ghemawat：MapReduce，OSDI 2004](https://pdos.csail.mit.edu/6.824/papers/mapreduce.pdf)、[MIT 6.824 / 6.5840：Lecture 1](https://pdos.csail.mit.edu/6.824/notes/l01.txt)、[MIT 6.5840：2026 Schedule](https://pdos.csail.mit.edu/6.824/schedule.html)、[MIT 6.824 / 6.5840：Lab 1](https://pdos.csail.mit.edu/6.824/labs/lab-mr.html)、[Apache Hadoop：MapReduce Tutorial](https://hadoop.apache.org/docs/r3.3.6/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapReduceTutorial.html)。

修正与准确性：Map 输出修正为键值对序列。Reduce 输出允许零个或多个值。2004 年实现的 Master 故障会中止作业。检查点恢复不再写成既有能力。移除以作业等待推导 CAP/CP 的错误结论。补清 Map/Reduce 提交差异及均值聚合反例。

人工确认：无。论文实现与课程简化环境分别说明。

## 相邻文章分工

- 认证文章负责权限与信任边界，令牌文章负责会话和协议。
- Web 安全文章负责攻击入口，Spring 文章负责过滤器实现。
- 密钥文章负责轮换、证书、审计与供应链。
- 容量文章负责公式和故障目标，面试文章负责讨论顺序。
- 数据拆分负责分片机制，架构文章负责组件演进。
- 题目索引负责练习与短链，爬虫保留独立设计案例。
- MapReduce 讲义负责模型，实验笔记负责状态与提交实现。

## 验证

最终版本执行以下检查：

```sh
node scripts/check-article-format.mjs --style-strict -- \
  docs/system-design/security/authentication-authorization-trust-boundaries.mdx \
  docs/system-design/security/injection-authorization-ssrf-deserialization.mdx \
  docs/system-design/security/secrets-certificates-audit-supply-chain.mdx \
  docs/system-design/security/session-jwt-oauth-oidc.mdx \
  docs/system-design/security/spring-security-filter-chain.mdx \
  docs/system-design/system-design/capacity-slo-failure-model.mdx \
  docs/system-design/system-design/interview-process.mdx \
  docs/system-design/system-design/read-write-paths-hotspots-sharding.mdx \
  docs/system-design/system-design/system-design-problems/index.mdx \
  docs/system-design/system-design/system-design-problems/web_crawler/index.mdx \
  docs/system-design/system-design/universe_architecture.mdx \
  docs/system-design/ood/solid.mdx \
  'docs/system-design/mit6.824/1. MapReduce/lab1_mapreduce.mdx' \
  'docs/system-design/mit6.824/1. MapReduce/lec1_mapreduce.mdx'
npm run build
git diff --check
```

- 严格检查：14 篇，0 篇结构问题，0 篇文风提示。
- 构建：文档链接、复习资源、岗位与面经数据检查通过。
- Docusaurus 成功生成静态文件，构建退出码为 0。
- 另行核对标题编号、原有显式 ID 与卡片集合，全部通过。
- 算例核对包含爬虫容量、QPS、错误预算和故障剩余容量。
- 本批未运行 Docker，也未修改应用实现。

全站非阻断检查仍有本批之外 34 篇文风提示。构建另有既有博客作者、摘要与 Node localStorage 提示。Webpack 缓存写入和 Docusaurus 更新检查受权限限制。两者未影响静态文件生成，未修改环境权限。

## 未完成与人工确认

无阻塞事项，14 篇均完成。

新增技术事实以文末资料核对。Chubby 原文直连未能读取，序列号段落经一手来源检索核对。Bloom 原论文链接未能读取，改用 Redis 官方文档支撑。未将无法取得的资料写成已阅读全文。

原有公司归属和来源注释原样保留。本批没有新增归属，也未重新调查原有公司面经。

示例属于文档设计与推导。未执行 Spring 集成测试、真实爬取或 MIT 实验测试。课程页使用 2026 年版本，实验笔记已注明适用范围。
