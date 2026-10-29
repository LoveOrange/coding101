# Claude 校验 · 第 12 批（2026-10-29）

范围：Spring 栏目的后 10 篇，从 MVC 请求生命周期到 Actuator。前 9 篇见第 11 批（PR #38）。校验后直接修改，Lin 的审阅异步进行。

校验项：

1. 技术事实与版本基线（文中注明的 Spring Framework 6.2、Spring Boot 3.5）。
2. 实现细节：对照对应版本的官方参考文档。MVC 的异步派发、拦截器回调、异常解析链和方法校验，对照 Spring Framework 6.2 文档；Boot 的启动事件顺序、Runner 排序、配置优先级、Actuator 访问控制和探针路径，对照 Boot 3.5 文档。条件注解对照 Boot v3.5.6 源码（`ConditionalOnBooleanProperty`）。
3. 与相邻文章是否矛盾，站内锚点是否存在：74 个站内链接都存在。
4. 参考资料：51 个外部链接都返回对应页面。

## 结论

| 文章 | 结论 | 修改 |
| --- | --- | --- |
| [Spring MVC 请求生命周期](../../docs/basic-knowledge/java/spring/http-request-to-controller.mdx) | ✅ 通过 | — |
| [DispatcherServlet](../../docs/basic-knowledge/java/spring/dispatcherservlet-handler-mapping.mdx) | ✅ 通过 | — |
| [Spring 拦截机制](../../docs/basic-knowledge/java/spring/filter-interceptor-aspect-boundaries.mdx) | ✅ 通过 | — |
| [Spring MVC 参数解析](../../docs/basic-knowledge/java/spring/binding-validation-content-negotiation.mdx) | ✅ 通过 | — |
| [API 错误契约](../../docs/basic-knowledge/java/spring/api-error-contract.mdx) | ✅ 通过 | — |
| [Spring Boot 启动](../../docs/basic-knowledge/java/spring/spring-boot-startup.mdx) | ✅ 通过 | — |
| [Spring Boot 自动配置](../../docs/basic-knowledge/java/spring/auto-configuration-conditions.mdx) | ✅ 已修改 | 补上 Boot 3.5 新增的 `@ConditionalOnBooleanProperty` |
| [Spring Boot 外部化配置](../../docs/basic-knowledge/java/spring/external-config-precedence.mdx) | ✅ 通过 | — |
| [Spring Boot Starter](../../docs/basic-knowledge/java/spring/custom-starter-boundaries.mdx) | ✅ 通过 | — |
| [Spring Boot Actuator](../../docs/basic-knowledge/java/spring/actuator-health-startup-diagnostics.mdx) | ✅ 通过 | — |

## 修改内容

### Spring Boot 自动配置（面试核心、第 5 节）

原文以 Boot 3.5 为准，讲布尔开关时只给了 `@ConditionalOnProperty(havingValue = "true")` 这一种写法。Boot 3.5.0 新增了 `@ConditionalOnBooleanProperty`（源码 `@since 3.5.0`），`havingValue` 默认 `true`，`matchIfMissing` 默认 `false`，专门用来写布尔开关；Boot 3.5.6 自己的 `AopAutoConfiguration` 已经改用它。

已在核心条目和第 5 节补上：Boot 3.5 起可以用 `@ConditionalOnBooleanProperty(prefix = "payment.retry", name = "enabled")`，它和原文示例等价。原有的写法和对省略 `havingValue` 的说明保留，因为 3.4 及更早版本仍需要它。

## 已验证的断言

MVC（Framework 6.2 文档）：

- `Callable`、`DeferredResult` 的结果通过 ASYNC 派发写回，Controller 方法不会再执行；初始线程调用 `afterConcurrentHandlingStarted`，不调用 `postHandle`、`afterCompletion`。
- `preHandle` 返回 false 时，只有此前返回 true 的拦截器收到 `afterCompletion`；`@ResponseBody` 正文在 `postHandle` 之前写出。
- `OncePerRequestFilter` 默认跳过 ASYNC 和 ERROR 派发。
- 异常解析器返回 null 表示未处理，返回空 `ModelAndView` 表示已处理且不渲染视图。
- 6.1 起内置方法校验，Controller 类上有 `@Validated` 时改走 AOP；方法参数校验失败返回 400，返回值校验失败返回 500。
- `@ExceptionHandler` 先匹配顶层异常再看 cause，5.3 起支持任意深度；高优先级 Advice 的 cause 匹配优先于低优先级 Advice 的顶层匹配。

Boot（3.5 文档与源码）：

- 启动事件顺序：`ApplicationStartingEvent`、`EnvironmentPrepared`、`ContextInitialized`、`Prepared`、refresh、`ApplicationStartedEvent`、`LivenessState.CORRECT`、Runner、`ApplicationReadyEvent`、`ReadinessState.ACCEPTING_TRAFFIC`。
- `ApplicationRunner` 与 `CommandLineRunner` 按 `@Order` 统一排序。
- 配置优先级：配置数据低于环境变量，环境变量低于 Java 系统属性，再往上是 `SPRING_APPLICATION_JSON` 和命令行参数。同一位置的 properties 优先于 YAML。环境变量列表下标写成 `MY_SERVICE_0_OTHER`。
- `@ConditionalOnProperty` 省略 `havingValue` 时，属性存在且不为 `false` 即匹配。
- Actuator 默认只通过 HTTP 暴露 `health`；`management.endpoint.<id>.access` 取值为 `none`、`read-only`、`unrestricted`；`add-additional-paths=true` 在主端口提供 `/livez`、`/readyz`；`DOWN` 与 `OUT_OF_SERVICE` 默认映射为 503。

至此 Java 栏目全部完成。下一批：数据结构（10 篇）与算法（8 篇）。
