# Claude 校验 · 第 11 批（2026-10-29）

范围：Spring 栏目的前 9 篇，包括栏目首页，从 IoC 容器到 Spring 事务。后 10 篇（MVC 与 Spring Boot）放在第 12 批。校验后直接修改，Lin 的审阅异步进行。

校验项：

1. 技术事实与版本基线（文中注明的 Spring Framework 6.2、Spring Boot 3.5；Boot 2.6 的循环引用默认值）。
2. 实现细节：Spring 行为没有搭建应用运行，逐条对照对应版本的源码和官方参考文档：
   - `DefaultSingletonBeanRegistry`（v6.2.12）：三个缓存的字段和 `getSingleton(beanName, allowEarlyReference)` 的查找顺序。
   - `AopAutoConfiguration`（Boot v3.5.6）：`spring.aop.proxy-target-class` 缺省为类代理。
   - `EnableTransactionManagement`（v6.2.12）：`rollbackOn` 自 6.2 起提供，默认 `RUNTIME_EXCEPTIONS`。
   - `TransactionalEventListener`（v6.2.12）：默认 `AFTER_COMMIT`，`fallbackExecution` 默认 false。
   
   JDK 动态代理部分在 Eclipse Temurin 21.0.12 上实测。
3. 与相邻文章是否矛盾，站内锚点是否存在：87 个站内链接都存在；首页指向面试页的 `#spring-ioc` 由组件生成，构建产物里存在。
4. 参考资料：48 个外部链接都返回对应页面（其中 1 个首次请求超时，重试正常）；Bean 生命周期文中引用的 `#beans-factory-thread-safety` 锚点存在。

## 结论

9 篇全部通过，没有修改。

| 文章 | 结论 |
| --- | --- |
| [Spring 框架（栏目首页）](../../docs/basic-knowledge/java/spring/index.mdx) | ✅ 通过 |
| [IoC 容器](../../docs/basic-knowledge/java/spring/ioc-container-purpose.mdx) | ✅ 通过 |
| [BeanDefinition](../../docs/basic-knowledge/java/spring/beandefinition-container-startup.mdx) | ✅ 通过 |
| [依赖注入](../../docs/basic-knowledge/java/spring/dependency-injection-selection.mdx) | ✅ 通过 |
| [Bean 生命周期](../../docs/basic-knowledge/java/spring/bean-creation-lifecycle.mdx) | ✅ 通过 |
| [Spring 循环依赖](../../docs/basic-knowledge/java/spring/circular-dependencies-scopes-early-exposure.mdx) | ✅ 通过 |
| [Spring AOP](../../docs/basic-knowledge/java/spring/aop-pointcut-interceptor-chain.mdx) | ✅ 通过 |
| [JDK 动态代理与 CGLIB](../../docs/basic-knowledge/java/spring/jdk-proxy-cglib.mdx) | ✅ 通过 |
| [Spring 事务](../../docs/basic-knowledge/java/spring/declarative-transaction-execution.mdx) | ✅ 通过 |

## 已验证的断言

JDK 动态代理（Temurin 21）：

- 代理把接口调用交给 `InvocationHandler`；目标实现类和方法都是 `final` 时，通过接口调用仍能进入处理器。
- 处理器解开 `InvocationTargetException` 后，接口声明的受检异常原样抛给调用方；处理器抛出接口未声明的受检异常时，调用方收到 `UndeclaredThrowableException`。
- 代理对象不是 `DefaultPaymentService` 的实例。

Spring 源码与文档：

- 单例注册表先查 `singletonObjects`，对象正在创建时再查 `earlySingletonObjects`，允许早期引用时才从 `singletonFactories` 取工厂生成引用，并把结果移入 `earlySingletonObjects`。
- Boot 3.5.6 在 `spring.aop.proxy-target-class` 缺省时使用 `@EnableAspectJAutoProxy(proxyTargetClass = true)`，设为 false 时改为接口代理。
- 初始化顺序 `@PostConstruct`、`afterPropertiesSet()`、`init-method`，销毁顺序 `@PreDestroy`、`destroy()`、`destroy-method`，与参考文档一致。
- `ObjectProvider` 的 `getIfAvailable()` 在多候选无法唯一选择时抛异常，`getIfUnique()` 返回 null，与 6.2 Javadoc 一致。
- Spring 6.1 起参数名回退依赖 `-parameters`；`@Resource` 省略名称时，默认名缺失才回退按类型查找。
- 提交后事件监听器执行时，原事务已提交，但资源仍可访问，此时的数据访问不会再提交，参考文档建议用 `REQUIRES_NEW` 开新事务。

下一批：Spring 栏目后 10 篇（MVC 请求处理到 Actuator）。
