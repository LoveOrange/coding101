# 文章格式审计：batch-9

日期：2026-10-13。分支：`content/article-format-2026-10-13`。

本批完成指定 18 篇 Spring 文章的表达优化。新增 23 道本站原理自测，保留原有 20 道卡片。修改范围为本批文章和本记录。未提交 git。

## 表达与标识

- 完整阅读 AGENTS.md、batch-1b 及两篇指定样例。
- 开头明确文章范围，相邻机制改为结论加链接。
- 普通二、三级标题使用概念或机制名称。面试题保留完整问句。
- 已有显式锚点保持不变，缺失锚点按新标题补齐。
- 面试核心改为可直接复述的结论。参考回答首句直接回答，参数使用具体名称和取值。
- 逐段通读后再次修改长句、歧义和不完整主语。
- 23 道新增题均为本站自测，使用统一注释。
- 与 HEAD 比较，18 个 knowledge.id 均未改变。已有显式锚点和卡片 ID 全部保留。
- 原有公司字段与来源注释保留，没有新增公司归属。
- 所有参考资料均为连续列表。以下资料已加入或保留于对应文章。

## 每篇改动与依据

### 1. Spring Boot Actuator

文件：[actuator-health-startup-diagnostics.mdx](../../../docs/basic-knowledge/java/spring/actuator-health-startup-diagnostics.mdx)。

明确 Boot 3.5 的访问权限、HTTP 暴露与请求鉴权。补充主端口探针、默认健康组及 HTTP 503 映射。保留启动记录器配置，启动事件引用专文。

新增题：`probe-main-port`。

依据：[Boot 3.5 Endpoints](https://docs.spring.io/spring-boot/3.5/reference/actuator/endpoints.html)、[Application Startup Tracking](https://docs.spring.io/spring-boot/reference/features/spring-application.html#features.spring-application.startup-tracking)。

修正：默认 readiness 组并未自动加入数据库。补明存活检查读取可用性状态，无法自动发现死锁。独立管理端口成功也无法验证业务端口。

人工确认：无。

### 2. Spring AOP

文件：[aop-pointcut-interceptor-chain.mdx](../../../docs/basic-knowledge/java/spring/aop-pointcut-interceptor-chain.mdx)。

负责切点、通知、拦截链和自调用。补充常用切点表达式、排序数值及重试事务范围。代理类型、回滚规则和资源绑定引用专文。

新增题：`advice-order`。

依据：[Declaring Advice](https://docs.spring.io/spring-framework/reference/core/aop/ataspectj/advice.html)、[Declaring a Pointcut](https://docs.spring.io/spring-framework/reference/core/aop/ataspectj/pointcuts.html)、[Using Transactional](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html)。

修正：自调用绕过内部注解，仍可沿用外层事务。明确 Order 数值越小，进入越早、退出越晚。共享事务的失败是否留下回滚标记，取决于实际失败路径。

人工确认：无。

### 3. API 错误契约

文件：[api-error-contract.mdx](../../../docs/basic-knowledge/java/spring/api-error-contract.mdx)。

补充局部处理器、Advice 顺序与 cause 匹配。明确 ProblemDetail 媒体类型、状态和扩展字段。区分 MVC 异步结果与独立后台任务。

新增题：`exception-handler-selection`。

依据：[Controller Exceptions](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-exceptionhandler.html)、[Error Responses](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-ann-rest-exceptions.html)、[Asynchronous Requests](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-ann-async.html)、[RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html#section-15)、[RFC 6585](https://www.rfc-editor.org/rfc/rfc6585.html#section-4)、[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html)。

修正：MVC 异步异常仍可进入 ExceptionHandler。处理器的源码书写顺序不决定优先级。403 无需以“身份已知”为前提。502、503、504 按协议角色分别说明。

人工确认：无。

### 4. Spring Boot 自动配置

文件：[auto-configuration-conditions.mdx](../../../docs/basic-knowledge/java/spring/auto-configuration-conditions.mdx)。

明确 Boot 3.5 的候选导入、定义退让和属性条件。补充条件默认值、多属性匹配及排除配置。说明定义顺序与实例创建顺序的区别。

新增题：`property-condition-defaults`。

依据：[Boot 3.5 Auto-configuration](https://docs.spring.io/spring-boot/3.5/reference/features/developing-auto-configuration.html)、[ConditionalOnProperty](https://docs.spring.io/spring-boot/3.5/api/java/org/springframework/boot/autoconfigure/condition/ConditionalOnProperty.html)、[Boot 3.0 Migration Guide](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Migration-Guide#auto-configuration-files)。

修正：将模糊的“当前版本”改为具体版本。Boot 2.7 引入 imports，Boot 3.0 移除旧候选登记。默认属性条件会接受非 false 的其他字符串。

人工确认：无。

### 5. Bean 生命周期

文件：[bean-creation-lifecycle.mdx](../../../docs/basic-knowledge/java/spring/bean-creation-lifecycle.mdx)。

细化 Aware、初始化前后处理器及销毁的顺序。补充 SmartInitializingSingleton 与 SmartLifecycle。说明 phase、依赖顺序和异步停止回调。

新增题：`smart-lifecycle-phase`。

依据：[Customizing the Nature of a Bean](https://docs.spring.io/spring-framework/reference/core/beans/factory-nature.html)、[SmartInitializingSingleton](https://docs.spring.io/spring-framework/docs/6.2.x/javadoc-api/org/springframework/beans/factory/SmartInitializingSingleton.html)、[AbstractAutowireCapableBeanFactory 6.2.12](https://github.com/spring-projects/spring-framework/blob/v6.2.12/spring-beans/src/main/java/org/springframework/beans/factory/support/AbstractAutowireCapableBeanFactory.java)。

修正：PostConstruct 在初始化前处理器中执行。ApplicationContextAware 也由处理器回调。代理还存在早期引用路径，必要资源可在就绪前初始化。

人工确认：无。

### 6. BeanDefinition

文件：[beandefinition-container-startup.mdx](../../../docs/basic-knowledge/java/spring/beandefinition-container-startup.mdx)。

补充注册表后处理器、FactoryBean 产品和配置类增强。说明 lazy Bean 被直接依赖时的创建时机。用参数注入示例解释 proxyBeanMethods=false。

新增题：`registry-postprocessor`、`factorybean-product`、`configuration-bean-methods`。

依据：[Container Extension Points](https://docs.spring.io/spring-framework/reference/core/beans/factory-extension.html)、[BeanDefinitionRegistryPostProcessor](https://docs.spring.io/spring-framework/docs/6.2.x/javadoc-api/org/springframework/beans/factory/support/BeanDefinitionRegistryPostProcessor.html)、[FactoryBean](https://docs.spring.io/spring-framework/docs/6.2.x/javadoc-api/org/springframework/beans/factory/FactoryBean.html)、[Bean and Configuration](https://docs.spring.io/spring-framework/reference/core/beans/java/basic-concepts.html)。

修正：定义集合可在注册表后处理阶段继续扩展。元数据存在不意味着实例已创建。明确工厂作用域、产品共享与产品销毁的不同责任。

人工确认：无。

### 7. Spring MVC 参数解析

文件：[binding-validation-content-negotiation.mdx](../../../docs/basic-knowledge/java/spring/binding-validation-content-negotiation.mdx)。

补充 ModelAttribute、BindingResult 和方法校验。说明 MVC 6.1 起的两种校验异常与类级 Validated。列出 400、415、406 的具体触发条件。

新增题：`body-media-errors`、`mvc-method-validation`。

依据：[Controller Validation](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-validation.html)、[DefaultHandlerExceptionResolver 6.2](https://docs.spring.io/spring-framework/docs/6.2.x/javadoc-api/org/springframework/web/servlet/mvc/support/DefaultHandlerExceptionResolver.html)、[ModelAttribute](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/modelattrib-method-args.html)。

修正：读取失败并非一律返回 415。JSON 语法、值类型错误及必需请求体缺失默认返回 400。返回值约束失败则属于服务端 500。

人工确认：无。

### 8. Spring 循环依赖

文件：[circular-dependencies-scopes-early-exposure.mdx](../../../docs/basic-knowledge/java/spring/circular-dependencies-scopes-early-exposure.mdx)。

按 Spring 6.2.12 核对三级缓存与早期代理复用。补充 Provider 获取 prototype 的示例。集中承接相邻文章的跨作用域说明。

新增题：`prototype-in-singleton`。

依据：[Bean Scopes](https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html)、[Boot 2.6 Release Notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.6-Release-Notes#circular-references-prohibited-by-default)、[DefaultSingletonBeanRegistry 6.2.12](https://github.com/spring-projects/spring-framework/blob/v6.2.12/spring-beans/src/main/java/org/springframework/beans/factory/support/DefaultSingletonBeanRegistry.java)、[AbstractAutoProxyCreator 6.2.12](https://github.com/spring-projects/spring-framework/blob/v6.2.12/spring-aop/src/main/java/org/springframework/aop/framework/autoproxy/AbstractAutoProxyCreator.java)。

修正：原流程图把 B 初始化放在注入 A 之前，现已调整。早期代理一致性依赖后处理器遵守协议。打开循环开关也仅允许尝试解决部分场景。

人工确认：无。

### 9. Spring Boot Starter

文件：[custom-starter-boundaries.mdx](../../../docs/basic-knowledge/java/spring/custom-starter-boundaries.mdx)。

负责模块依赖、配置元数据、可选类型隔离和测试。补充嵌套条件配置类与 ApplicationContextRunner 示例。条件执行规则引用自动配置专文。

新增题：`optional-class-isolation`。

依据：[Boot 3.5 Class Conditions and Testing](https://docs.spring.io/spring-boot/3.5/reference/features/developing-auto-configuration.html)、[Generating Configuration Metadata](https://docs.spring.io/spring-boot/3.5/specification/configuration-metadata/annotation-processor.html)。

修正：未发现原文独立事实错误。补明方法返回类型会在条件判断前触发类加载。配置元数据只提供描述，不负责运行时绑定。

人工确认：无。

### 10. Spring 事务

文件：[declarative-transaction-execution.mdx](../../../docs/basic-knowledge/java/spring/declarative-transaction-execution.mdx)。

以 Spring 6.2 JDBC 本地事务为主线。补充 rollback-only、连接获取、严格参与校验和提交后事件。说明全局回滚默认值、只读执行和保存点限制。

新增题：`unexpected-rollback`、`after-commit-write`。

依据：[Transaction Propagation](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/tx-propagation.html)、[Rolling Back](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/rolling-back.html)、[DataSourceTransactionManager 6.2](https://docs.spring.io/spring-framework/docs/6.2.x/javadoc-api/org/springframework/jdbc/datasource/DataSourceTransactionManager.html)、[DataSourceUtils 6.2](https://docs.spring.io/spring-framework/docs/6.2.x/javadoc-api/org/springframework/jdbc/datasource/DataSourceUtils.html)、[TransactionalEventListener 6.2](https://docs.spring.io/spring-framework/docs/6.2.x/javadoc-api/org/springframework/transaction/event/TransactionalEventListener.html)。

修正：响应式事务使用 Reactor Context，区别于 JDBC 线程绑定。加入已有事务的内层返回并未完成物理提交。提交后继续使用原资源也不会再次提交新增写入。

人工确认：无。

### 11. 依赖注入

文件：[dependency-injection-selection.mdx](../../../docs/basic-knowledge/java/spring/dependency-injection-selection.mdx)。

补充类型筛选、Qualifier、Primary 与 Resource 名称解析。说明参数名回退的编译条件与集合注入。区分 Provider 的缺失处理和非唯一处理。

新增题：`autowired-resource-selection`、`optional-provider-ambiguity`。

依据：[Using Autowired](https://docs.spring.io/spring-framework/reference/core/beans/annotation-config/autowired.html)、[Qualifiers](https://docs.spring.io/spring-framework/reference/core/beans/annotation-config/autowired-qualifiers.html)、[Resource](https://docs.spring.io/spring-framework/reference/core/beans/annotation-config/resource.html)、[ObjectProvider 6.2](https://docs.spring.io/spring-framework/docs/6.2.x/javadoc-api/org/springframework/beans/factory/ObjectProvider.html)。

修正：未发现原文独立事实错误。用具体解析规则替换原来的泛化建议。单构造器省略 Autowired 的版本写明为 Spring 4.3 起。

人工确认：无。

### 12. DispatcherServlet

文件：[dispatcherservlet-handler-mapping.mdx](../../../docs/basic-knowledge/java/spring/dispatcherservlet-handler-mapping.mdx)。

补充映射冲突、HEAD/OPTIONS 和默认 resolver 分工。说明 null、空 ModelAndView 与错误视图的区别。参数与拦截器回调引用对应专文。

新增题：`resolver-result`。

依据：[Exceptions](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-servlet/exceptionhandlers.html)、[Mapping Requests](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-requestmapping.html)、[Context Hierarchy](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-servlet/context-hierarchy.html)。

修正：ExceptionHandler 是由 resolver 调用的注解。静态资源处理器也可返回 404。区分完全相同映射的启动冲突与运行时匹配歧义。

人工确认：无。

### 13. Spring Boot 外部化配置

文件：[external-config-precedence.mdx](../../../docs/basic-knowledge/java/spring/external-config-precedence.mdx)。

明确 Boot 3.5 的常见来源与文件优先级。补充属性类注册、Duration 单位、配置树与搜索位置。用 profile 示例解释 List 替换和 Map 合并。

新增题：`list-map-merge`。

依据：[Boot 3.5 Externalized Configuration](https://docs.spring.io/spring-boot/3.5/reference/features/external-config.html)。

修正：将环境变量与系统属性拆成两个优先级。明确高优先级来源决定结果，避免等同于加入时间。补明普通 Boot 不会因文件修改自动刷新已有 Bean。

人工确认：无。

### 14. Spring 拦截机制

文件：[filter-interceptor-aspect-boundaries.mdx](../../../docs/basic-knowledge/java/spring/filter-interceptor-aspect-boundaries.mdx)。

补充正序进入、逆序退出、短路与异常回调。明确 OncePerRequestFilter 的默认派发策略。说明 ResponseBody 写出早于 postHandle。

新增题：`interceptor-callback-order`。

依据：[HandlerInterceptor 6.2](https://docs.spring.io/spring-framework/docs/6.2.x/javadoc-api/org/springframework/web/servlet/HandlerInterceptor.html)、[OncePerRequestFilter 6.2](https://docs.spring.io/spring-framework/docs/6.2.x/javadoc-api/org/springframework/web/filter/OncePerRequestFilter.html)、[AsyncHandlerInterceptor 6.2](https://docs.spring.io/spring-framework/docs/6.2.x/javadoc-api/org/springframework/web/servlet/AsyncHandlerInterceptor.html)。

修正：响应头应在提交前写入。过滤链返回后的 finally 适合清理，无法保证还能改响应头。短路拦截器本身不会收到 afterCompletion。

人工确认：无。

### 15. Spring MVC 请求生命周期

文件：[http-request-to-controller.mdx](../../../docs/basic-knowledge/java/spring/http-request-to-controller.mdx)。

聚焦完整请求顺序、返回值解释与异步续接。补充 Callable、DeferredResult、超时和执行器容量。详细映射和绑定机制引用专文。

新增题：`async-redispatch`。

依据：[Processing Sequence](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-servlet/sequence.html)、[Asynchronous Requests](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-ann-async.html)、[Return Values](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/return-types.html)。

修正：Filter 只覆盖其注册范围。ViewResolver 负责解析，View 负责渲染。异步续接使用已有结果，Controller 方法无需重新执行。

人工确认：无。

### 16. IoC 容器

文件：[ioc-container-purpose.mdx](../../../docs/basic-knowledge/java/spring/ioc-container-purpose.mdx)。

保留外部装配、测试替换与服务定位的核心解释。定义处理改为专文链接。补充 singleton 共享范围与线程安全。

新增题：`singleton-thread-safety`。

依据：[IoC Container and Beans](https://docs.spring.io/spring-framework/reference/core/beans/introduction.html)、[Bean Scopes](https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html)、[Thread Safety and Visibility](https://docs.spring.io/spring-framework/reference/core/beans/factory-nature.html#beans-factory-thread-safety)。

修正：未发现原文独立事实错误。补明安全发布与运行时业务状态同步的区别。

人工确认：无。

### 17. JDK 动态代理与 CGLIB

文件：[jdk-proxy-cglib.mdx](../../../docs/basic-knowledge/java/spring/jdk-proxy-cglib.mdx)。

明确 Spring 6.2、Boot 3.5 的类型选择。补充 final 实现方法、Objenesis 与事务方法可见性。JDK 示例拆出 InvocationTargetException 的 cause。

新增题：`final-interface-method`。

依据：[Proxying Mechanisms](https://docs.spring.io/spring-framework/reference/core/aop/proxying.html)、[Boot 3.5 AOP](https://docs.spring.io/spring-boot/3.5/reference/features/aop.html)、[AopAutoConfiguration 3.5.6](https://github.com/spring-projects/spring-boot/blob/v3.5.6/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/aop/AopAutoConfiguration.java)、[Using Transactional](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html)、[Java Proxy API](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Proxy.html)。

修正：proxy-target-class=false 仍需目标有接口。final 的覆盖限制属于子类代理，JDK 接口转发仍可增强。移除未经本批实测的性能量级比较。

人工确认：无。

### 18. Spring Boot 启动

文件：[spring-boot-startup.mdx](../../../docs/basic-knowledge/java/spring/spring-boot-startup.mdx)。

按 Boot 3.5 重写环境、refresh、Runner 与事件顺序。补充应用类型选择、两类 Runner 参数和统一排序。启动诊断与探针配置引用 Actuator 专文。

新增题：`runner-ready-order`。

依据：[Boot 3.5 SpringApplication](https://docs.spring.io/spring-boot/3.5/reference/features/spring-application.html)、[SpringApplication 3.5.6 源码](https://github.com/spring-projects/spring-boot/blob/v3.5.6/spring-boot-project/spring-boot/src/main/java/org/springframework/boot/SpringApplication.java)。

修正：两类 Runner 按同一排序规则执行，接口类型没有固定先后。完整配置解析发生在 refresh 内。Ready 同步监听器返回后，才更新 readiness。

人工确认：无。

## 相邻文章分工

- IoC 负责外部装配与管理范围。BeanDefinition 负责定义，生命周期文章负责实例回调。
- 依赖注入负责候选选择。循环依赖文章集中说明跨作用域获取。
- AOP 负责拦截链与自调用。代理类型和事务执行分别由对应文章负责。
- MVC 生命周期负责完整顺序。DispatcherServlet 负责映射、适配与 resolver。
- 拦截机制负责回调与线程清理。参数解析负责绑定、校验及媒体类型。
- API 错误契约负责错误字段和异常处理器选择。
- Boot 启动负责阶段和事件。自动配置负责条件，Starter 负责接入契约。
- 外部化配置负责属性来源。Actuator 负责探针与诊断端点。

## 验证

对本批 18 篇逐段通读，并运行以下检查：

```sh
node scripts/check-article-format.mjs --style-strict -- \
  docs/basic-knowledge/java/spring/actuator-health-startup-diagnostics.mdx \
  docs/basic-knowledge/java/spring/aop-pointcut-interceptor-chain.mdx \
  docs/basic-knowledge/java/spring/api-error-contract.mdx \
  docs/basic-knowledge/java/spring/auto-configuration-conditions.mdx \
  docs/basic-knowledge/java/spring/bean-creation-lifecycle.mdx \
  docs/basic-knowledge/java/spring/beandefinition-container-startup.mdx \
  docs/basic-knowledge/java/spring/binding-validation-content-negotiation.mdx \
  docs/basic-knowledge/java/spring/circular-dependencies-scopes-early-exposure.mdx \
  docs/basic-knowledge/java/spring/custom-starter-boundaries.mdx \
  docs/basic-knowledge/java/spring/declarative-transaction-execution.mdx \
  docs/basic-knowledge/java/spring/dependency-injection-selection.mdx \
  docs/basic-knowledge/java/spring/dispatcherservlet-handler-mapping.mdx \
  docs/basic-knowledge/java/spring/external-config-precedence.mdx \
  docs/basic-knowledge/java/spring/filter-interceptor-aspect-boundaries.mdx \
  docs/basic-knowledge/java/spring/http-request-to-controller.mdx \
  docs/basic-knowledge/java/spring/ioc-container-purpose.mdx \
  docs/basic-knowledge/java/spring/jdk-proxy-cglib.mdx \
  docs/basic-knowledge/java/spring/spring-boot-startup.mdx
npm run build
git diff --check
```

- 严格格式检查通过：18 篇，结构问题和文风提示均为 0。
- 全站构建通过，文档链接、复习资源和岗位数据检查通过。
- 标识检查通过：20 道旧卡片保留，新增 23 道，总计 43 道。
- 所有二、三级标题均有显式锚点，编号连续，无重复 ID。
- 全站非阻断检查仍有 6 篇结构问题、79 篇文风提示。
- 构建仍有已有博客作者、摘要、localStorage 和更新检查提示。
- 上述全站提示位于本批范围之外，未扩大修改范围。

## 未完成与人工确认

无阻塞事项。技术机制通过官方文档、API 与源码核对。本批未搭建 Java 实验工程，也未运行 Docker 容器。本文中的代码为机制示例，未声明已完成 Java 集成测试。
