# java-21 信息密度与文风审计

本批处理以下三篇文章。历史对照版本均为 `0a50ae1`，三个文件在该版本中都存在。

- `docs/basic-knowledge/java/spring/jdk-proxy-cglib.mdx`
- `docs/basic-knowledge/java/spring/spring-boot-startup.mdx`
- `docs/basic-knowledge/java/index.mdx`

已全文阅读根目录 `AGENTS.md`、《大语言模型基础》和密度恢复计划。逐节对照历史版本，保留当前版本后来补充的有效内容。下文“原文 → 改写”使用本轮修改前的工作区正文作对照。开始时三篇已有 SEO 字段改动，本轮完整保留。

## 1. JDK 动态代理与 CGLIB

文件：`docs/basic-knowledge/java/spring/jdk-proxy-cglib.mdx`。

### 逐节知识点核对

| 章节 | 知识点与处理 |
| --- | --- |
| 开篇、面试核心 | 保留接口代理与子类代理的定义。恢复按暴露类型和可拦截方法选择代理的主线。将默认选择、接口转发、`final` 和事务可见性写成完整结论。 |
| JDK 动态代理 | 保留运行时接口实现、`InvocationHandler` 和反射转发。恢复接口与目标实现类没有继承关系的原因，以及按实现类查找或注入 Bean 的类型问题。保留接口未声明的方法不对调用方暴露。 |
| 当前异常示例 | 保留拆出 `InvocationTargetException` 原因的代码。说明处理器重新抛出的是目标异常，同时补明未声明受检异常仍会被 JDK 代理包装。代码逐字不变。 |
| CGLIB | 保留子类生成、方法覆盖、无业务接口场景，以及 `final`、`private`、`static`、跨包可见性边界。恢复 `spring-core` 已包含 CGLIB、无需额外依赖的结论。解释模块访问限制怎样影响生成。 |
| 构造与 Kotlin | 保留当前版本的 Objenesis、构造器绕过与回退说明，明确回退成功才会额外执行构造器。恢复历史版本的 Kotlin 默认 `final` 限制，并说明 `open` 与 `kotlin-spring` 的用途。 |
| Spring 的默认选择 | 保留 Framework 6.2 的接口优先规则、`proxyTargetClass=true`、Boot 3.5 的类代理默认值和 `spring.aop.proxy-target-class=false`。保留无接口时仍使用类代理的边界。补明 Boot 2.7 的相同默认策略，解释三个 `AopUtils` 判断方法的返回意义。 |
| 自调用 | 保留目标对象的 `this` 自调用绕过两种代理的结论。示例、拆分 Bean、上层事务边界、自注入与当前代理的代价交给相邻文章，见下文。 |
| 代理类型与注解匹配 | 恢复接口方法、目标实现方法、代理生成类和桥接方法之间的区别。解释自定义反射为何会漏注解。保留 Spring 6.0 起类代理事务支持 `protected`、包可见方法，以及 JDK 事务入口和 `publicMethodsOnly=true` 的边界。 |
| 性能 | 恢复代理开销与数据库、网络 I/O、业务计算的相对关系。保留方法分派、切点判断、真实拦截链三类开销。恢复按实际 JDK、Spring、CGLIB 版本做 JMH 和性能剖析的做法，以及高频短方法这一适用场景。 |
| final 实现方法与接口代理 | 保留当前版本新增的完整示例。解释 JDK 代理为何无需继承目标类，以及 CGLIB 对 `final` 类、仅方法为 `final` 的两种结果。 |
| 常见问题、面试题 | 保留非公开方法的覆盖与识别两项要求。保留代理与目标的不同引用、`TargetSource` 和容器交付代理引用的行为。两道面试题的答案先直接作答，再解释原因。 |
| 参考资料 | Java API 从 26 改为 21，Spring Framework 文档固定到 6.2，Boot 使用 2.7 和 3.5。补充 Kotlin 官方说明，保留 AOP 自动配置源码。 |

恢复重点是接口类型约束、反射查注解的对象区别、CGLIB 依赖与 Kotlin 限制，以及性能测量的适用条件。当前表格、三个代码块和两道面试题均保留。

### 有意不恢复

- 历史版本中的 Spring Framework 7 按 Bean 指定代理类型超出本批版本基线，不恢复。
- 历史 `checkout()` 内调用 `this.reserve()` 的代码不重复加入。自调用的原因、拆分 Bean、上层入口承担事务、自注入和当前代理的约束，已由 [Spring AOP](../../../docs/basic-knowledge/java/spring/aop-pointcut-interceptor-chain.mdx#同类自调用)说明。本文保留一句结论和链接。
- 历史示例直接转发 `method.invoke` 的写法不覆盖当前代码。该写法会把反射包装异常继续传出，当前代码已改为重新抛出原始异常。补充的未声明受检异常边界依据 [Java 21 Proxy API](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/reflect/Proxy.html)。

### 改动较大的段落

原文：

> 代理可赋给已实现的接口，无法强转为目标实现类。接口未声明的目标方法也无法从该接口调用。

改写：

> 调用方应使用代理实现的接口类型接收它。这个代理与 `DefaultPaymentService` 都实现了接口，但彼此没有继承关系。因此，代理无法强制转换为目标实现类，接口未声明的方法也不会通过该接口暴露。
>
> 在 Spring 中，按目标实现类查找或注入这类代理 Bean，也会遇到类型不匹配。因此，应按代理实现的接口声明依赖。

## 2. Spring Boot 启动

文件：`docs/basic-knowledge/java/spring/spring-boot-startup.mdx`。

### 逐节知识点核对

| 章节 | 知识点与处理 |
| --- | --- |
| 开篇、面试核心 | 保留环境准备、容器刷新、启动任务和业务就绪的主线。恢复三个组合注解的完整名称。保留服务器、Runner、Ready 事件及可用性状态的先后关系。 |
| 启动类与注解 | 保留启动代码，说明启动类与命令行参数如何进入 `run()`。恢复三项注解职责，以及自动配置对类路径、属性和已有 Bean 的检查。恢复包位置过深遗漏组件、默认包扫描过广引入无关类型的原因。 |
| 运行环境准备 | 恢复应用类型、初始化器、监听器、配置读取、属性绑定和上下文创建的完整顺序。保留当前版本将类型推断放在构造阶段的修正。解释 `Environment` 和 `ApplicationContext`，保留 MVC 优先、显式类型配置及非 Web 容器行为。恢复 `@Bean` 监听器错过早期事件的原因，保留 `addListeners()`。 |
| 容器刷新 | 恢复启动类注册、用户配置与自动配置解析、定义集合、单例创建、初始化回调和刷新事件之间的关系。保留定义顺序与实例创建顺序的区别，逐项解释依赖、`@DependsOn` 和懒加载。两类后处理器及生命周期内部步骤继续引用相邻文章。 |
| 嵌入式 Web 服务器 | 恢复 Tomcat、Jetty、服务器工厂以及 Servlet、Filter、Web 监听器注册。把 Controller 请求映射与 Servlet 容器注册分别说明。恢复 WebServerFactory 缺失这一排查对象，并解释端口、连接器、证书和异常 cause 的检查用途。 |
| Runner 与就绪 | 保留当前版本两种参数接口及统一排序规则。恢复数据回填、无限重试、无超时远程调用拖慢就绪的具体原因。恢复后台执行器、独立迁移、显式运维操作等安排，保留必要任务应在接流量前完成及异常导致启动失败。 |
| 启动、存活与就绪 | 四种状态的表格逐字保留。恢复 liveness 对内部恢复能力的含义，以及平台用 liveness 决定重启、用 readiness 决定流量的区别。保留共享数据库故障触发多个实例反复重启的因果结论，探针细节引用相邻文章。 |
| 启动耗时分析 | 恢复先记录总时间，再按配置、定义、Bean、服务器和 Runner 分段的做法。恢复连接池、数据库迁移、远程调用的独立计时与超时。保留 `ApplicationStartup` 入口，工具实现交给 Actuator 文章。恢复先定位慢点、再选择少量 Bean 懒加载的判断，保留全局配置及延迟暴露错误的代价。 |
| 当前启动事件顺序 | 保留完整事件顺序代码块。解释 `ApplicationPreparedEvent` 只完成初始定义加载。保留 Ready 同步监听器延迟 readiness、启动失败事件、失败阶段与原始异常链。 |
| 常见问题 | 恢复早期配置可来自配置文件、环境变量、系统属性和命令行。恢复长期任务的取消、关闭、重试和运行状态要求，并解释为何默认同步监听器延迟就绪。 |
| 面试题、参考资料 | 两道题均先直接回答，再按前文推导。保留自动配置和单例初始化处于刷新阶段、全部 Runner 完成后才更新就绪的修正。参考资料固定到 Boot 3.5、Framework 6.2，补充代码组织与 Servlet 官方说明。 |

恢复重点是启动顺序中的具体对象、组件扫描与注册的影响、长期任务阻塞就绪的原因，以及分阶段测量方法。当前状态表、两个代码块和两道面试题均保留。

### 有意不恢复

- 历史“依次调用 ApplicationRunner 和 CommandLineRunner”容易被理解为接口类型决定先后，事实不准确。继续保留当前版本的统一排序规则；[Boot 3.5.6 的 `callRunners`](https://github.com/spring-projects/spring-boot/blob/v3.5.6/spring-boot-project/spring-boot/src/main/java/org/springframework/boot/SpringApplication.java#L722)先收集 Runner，再按同一个比较器排序。
- 历史参考回答把配置解析写在调用 `refresh()` 之前，顺序有误。当前正文和答案均明确：先注册启动配置来源，再在刷新中解析用户配置和自动配置。执行入口见 [Boot 3.5.6 的 `run`](https://github.com/spring-projects/spring-boot/blob/v3.5.6/spring-boot-project/spring-boot/src/main/java/org/springframework/boot/SpringApplication.java#L288)。
- BeanFactory 后处理器、BeanPostProcessor 和生命周期回调的内部步骤不再次展开。[BeanDefinition](../../../docs/basic-knowledge/java/spring/beandefinition-container-startup.mdx#beanpostprocessor)和[Bean 生命周期](../../../docs/basic-knowledge/java/spring/bean-creation-lifecycle.mdx)已分别负责这些机制。本文保留阶段结论与链接。
- `BufferingApplicationStartup` 对接 Actuator、`FlightRecorderApplicationStartup` 关联类加载、分配和 GC 的细节不重复写。[Spring Boot Actuator](../../../docs/basic-knowledge/java/spring/actuator-health-startup-diagnostics.mdx#启动阶段分析)已说明具体配置与 JFR 用途。本文保留 `ApplicationStartup` 的作用和工具入口。
- liveness/readiness 健康组与外部依赖选择的完整规则不重复展开。[Spring Boot Actuator](../../../docs/basic-knowledge/java/spring/actuator-health-startup-diagnostics.mdx#liveness-探针)已说明共享依赖导致重启风暴的机制。本文保留状态区别、平台动作和该故障后果。

### 改动较大的段落

原文：

> 服务器开始监听时，Runner 尚未执行完毕。端口可连接只说明接入路径已经打开。部署平台应等待 readiness 后再转发业务流量。

改写：

> 服务器开始监听时，Boot 还没有完成 Runner 这类启动任务。Runner 是在容器刷新后执行的应用初始化任务，readiness 则表示应用是否已就绪。因此，端口可连接只说明服务器能接收连接，部署平台仍应等待就绪后再转发业务流量。

## 3. Java 栏目首页

文件：`docs/basic-knowledge/java/index.mdx`。

### 逐节知识点核对

| 部分 | 知识点与处理 |
| --- | --- |
| 栏目定位 | 改为直接说明面向 Java 后端求职者、提供语言基础和常用技术的面试知识。十个主题入口覆盖原有范围。 |
| 阅读顺序 | 保留先确认“必会”主题与核心文章、再按岗位要求补充深入内容。解释 JD 的含义，把路线链接单独成段。 |
| 第一轮复习 | 保留脱离页面回答路线中该主题两个自测问题的完成标准。把 Topic 改为“主题”，把具体实现细节留到按岗深入阶段。 |
| 内容目录 | 十个栏目名称、顺序和链接逐字不变，首页继续使用原有结构。 |

### 有意不恢复

没有遗漏的技术知识点或目录入口。原文“保存路线引用的标准内容”属于内部内容组织表述，本轮按栏目首页规则改为读者用途说明。

### 改动较大的段落

原文：

> 本目录保存 Java 面试路线引用的标准内容，按照语言、集合、JVM、并发、Spring 和数据访问等主题组织。求职复习不需要按目录逐篇阅读，请先从 [Java 后端开发面试路线](/java-interview-roadmap/) 确认“必会”主题和核心文章，再按 JD 补充深入内容。

改写：

> 本栏目面向准备 Java 后端求职的读者，整理语言基础和常用技术的面试知识。下方目录提供各专题入口，方便按主题查找文章。
>
> 复习时先确定目标岗位要求，再选择要读的主题。第一轮优先完成“必会”主题的核心文章，之后按岗位描述（JD）补充深入内容。
>
> 阅读顺序和完成标准见 [Java 后端开发面试路线](/java-interview-roadmap/)。

## 4. 验证

- 已逐段通读三篇，并逐节对照 `0a50ae1`，确认历史知识点均保留或在上文登记去向。
- 指定 `--style-strict` 检查通过：两篇知识树文章，零结构问题、零文风提示。首页没有 `knowledge` 字段，脚本不计入技术文章，已单独核对表达和目录。
- 与本轮开始时的文件逐项比较：front matter、全部显式锚点、二级标题及编号、面试题标题、公司与来源注释、表格和代码块均保持一致。
- 常见问题标题改成读者会提出的问题，原有编号与显式锚点保留。四道面试题的标题、ID 和数量保持一致。
- 三篇共 32 个内部链接已检查。其中 31 个文档链接及锚点存在，`/java-interview-roadmap/` 已核对对应页面和路线数据。
- `git diff --check` 通过。正文只做文风与知识恢复，代码块逐字保留，未另外运行 Java 示例。
- 未运行 `docusaurus build` 或 `npm run build`，未提交 Git。本轮仅修改指定三篇文章和本审计记录。
