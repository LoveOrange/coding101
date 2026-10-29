# Claude 校验 · 第 23 批（2026-10-30）

范围：认证与应用安全（6 篇，含栏目首页）和生产工程与可观测性（5 篇，含栏目首页），共 11 篇。校验后直接修改，Lin 的审阅异步进行。

校验项：

1. 技术事实：对照 RFC 9700 / 7519 / 8725 / 7636 / 9525、OpenID Connect Core、OWASP、Spring Security 6.5、Maven 3、Docker BuildKit、OpenTelemetry、Prometheus 与 JDK 21 文档。
2. 实测：原计划在 Temurin 21 容器里实测 `jcmd` 命令，但 Docker 引擎这次又没有响应，没有重启 OrbStack，改为对照 JDK 21 文档。
3. 与相邻文章是否矛盾，站内锚点是否存在：90 个站内链接都存在。
4. 参考资料：52 个外部链接都返回对应页面。

## 结论

11 篇全部通过，没有修改。

| 文章 | 结论 |
| --- | --- |
| [应用安全（栏目首页）](../../docs/system-design/security/index.mdx) | ✅ 通过 |
| [认证与授权](../../docs/system-design/security/authentication-authorization-trust-boundaries.mdx) | ✅ 通过 |
| [Session、JWT、OAuth 2.0 与 OIDC](../../docs/system-design/security/session-jwt-oauth-oidc.mdx) | ✅ 通过 |
| [Spring Security](../../docs/system-design/security/spring-security-filter-chain.mdx) | ✅ 通过 |
| [Web 应用安全](../../docs/system-design/security/injection-authorization-ssrf-deserialization.mdx) | ✅ 通过 |
| [密钥、证书、审计与供应链安全](../../docs/system-design/security/secrets-certificates-audit-supply-chain.mdx) | ✅ 通过 |
| [生产工程（栏目首页）](../../docs/system-design/production/index.mdx) | ✅ 通过 |
| [Maven](../../docs/system-design/production/maven-lifecycle-dependency-convergence.mdx) | ✅ 通过 |
| [可重复交付](../../docs/system-design/production/docker-ci-cd-reproducible-delivery.mdx) | ✅ 通过 |
| [可观测性](../../docs/system-design/production/logs-metrics-traces-correlation.mdx) | ✅ 通过 |
| [生产故障诊断](../../docs/system-design/production/jvm-thread-sql-network-joint-diagnosis.mdx) | ✅ 通过 |

## 已验证的断言

OAuth 与令牌：

- RFC 9700：
  - 公共客户端必须使用 PKCE，机密客户端推荐使用。
  - 禁止使用密码授权。
  - 重定向 URI 精确匹配，原生应用的 localhost 端口可以例外。
- OIDC：稳定用户标识是 `iss` + `sub`；请求携带 `nonce` 时，客户端必须核对 ID Token 中的值。
- 撤销 Refresh Token 只阻断后续刷新，已签发的 Access Token 不受影响。

Spring Security 6.5：

- `FilterChainProxy` 只选第一条匹配的链。
- 6.x 默认要求显式调用 `SecurityContextRepository.saveContext`，读取由 `SecurityContextHolderFilter` 负责。
- `ExceptionTranslationFilter` 对匿名主体启动认证入口，对已认证但权限不足的主体返回 403。
- 默认代理模式下，同类内部调用绕过方法安全。

其他安全条目：

- Java 17 的 `ObjectInputFilter` 需要主动配置才生效。
- CORS 不能替代 CSRF 防护；`HttpOnly` 挡不住已执行的 XSS 借浏览器发请求。

Maven 3：

- 冲突版本按最近路径、同深度先声明者优先。
- `dependencyManagement` 不会单独引入依赖。
- `-am` 和 `-amd` 方向相反。
- Failsafe 在 `integration-test` 阶段只记录失败，留到 `verify` 才判定构建结果。
- `provided` 和 `test` 范围不传递。

构建与观测：

- Docker BuildKit：secret 内容变化不会使缓存失效。
- shell 形式的入口多一层 `/bin/sh -c`。
- Prometheus：经典 histogram 可以先按 `le` 合并再计算分位数，Summary 的分位数不能跨实例合并。
- 尾部采样无法找回已经被前面环节丢弃的 span。

JDK 21：

- `Thread.dump_to_file -format=json` 可以导出虚拟线程，随 JEP 444 引入。
- NMT 需要在启动时打开。
- 虚拟线程在 `synchronized` 内阻塞会占住载体线程，对应 JFR 事件 `jdk.VirtualThreadPinned`。

下一批：系统设计中的领域与架构、架构决策、可用性。
