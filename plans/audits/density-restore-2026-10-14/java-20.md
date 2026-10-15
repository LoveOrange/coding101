# java-20 信息密度恢复审计

本批处理 Spring 目录中的六篇文章。历史对照均取自 `git show 0a50ae1:<路径>`，六个文件在该提交中均存在。逐节核对定义、机制、原因、影响、示例和边界，同时保留任务开始时工作区中的有效补充。

文风依据为根目录 `AGENTS.md`、`docs/ai/llm/llm-basics.mdx` 和 `plans/content-density-restore-2026-10-14.md`。以下“原文 → 改写”对比本次编辑前的工作区正文与最终正文。

## 1. DispatcherServlet

文件：`docs/basic-knowledge/java/spring/dispatcherservlet-handler-mapping.mdx`。

### 逐节知识点核对

| 历史章节 | 知识点与本次处理 |
| --- | --- |
| 开篇、面试核心 | 保留前端控制器的协调职责。补全处理器的含义，以及注解方法和静态资源处理器的差异。核心中的 HTTP 状态码恢复具体含义。 |
| HandlerMapping | 保留依次查询映射器、处理器与拦截器组成执行链。恢复启动时扫描注解并登记映射的时机，解释 `HandlerMethod` 的含义。 |
| 映射条件 | 恢复 `params`、`headers` 的具体名称，以及 `Content-Type`、`Accept` 与 `consumes`、`produces` 的关系。保留当前版本对启动冲突、运行时歧义的区分，以及 HEAD、OPTIONS 的补充。 |
| HandlerAdapter | 恢复绑定与模型上下文、参数解析器、目标方法、返回值处理器四个环节。恢复两个扩展接口的名称，以及自定义参数解析规则可复用的用途。 |
| Interceptor 回调 | 保留放行、同步结果处理和清理的职责概述。短路、完成回调和异步线程清理引用相邻文章。 |
| 异常解析 | 恢复参数解析、Controller 调用、返回值处理的异常入口。保留三个默认解析器的职责和 Filter 异常边界。 |
| HTTP 状态诊断 | 表格保持原样。恢复启动映射与请求匹配的诊断日志用途，保留静态资源处理器也会返回 404 的补充。 |
| 常见问题、面试题 | 保留适配器隔离调用方式、多 DispatcherServlet 与独立上下文。保留父子上下文可见性、异常解析返回值的新题。参考回答补上执行关系与原因。 |
| 当前新增章节 | 保留 null、空 `ModelAndView`、带视图结果的区别，以及全部未处理时向容器传播的行为。补充“响应提交”的具体含义。 |

恢复重点是映射条件的具体对象、适配器执行步骤、自定义参数扩展与映射日志。原有表格和执行链示例保持不变。

### 有意不恢复

- 历史核心将 `@ExceptionHandler` 说成解析器的一种实现，概念不准确。保留当前版本的修正：它标记方法，由 `ExceptionHandlerExceptionResolver` 调用。
- 历史文把映射歧义笼统放在启动或运行阶段。保留当前版本的区分：相同映射注册冲突发生在启动阶段，重叠映射的最优匹配并列发生在请求阶段。
- 拦截器的 `preHandle` 短路、`postHandle`、`afterCompletion` 和异步回调不重复展开。正文保留职责概述，并链接到《Spring 拦截机制》的“拦截器回调顺序”。

### 改动较大的段落

原文：

> 注解方法由 `RequestMappingHandlerAdapter` 执行。它准备绑定上下文、解析参数，再调用方法。随后，返回值处理器处理响应或视图。

改写：

> 注解方法由 `RequestMappingHandlerAdapter` 执行，依次完成**参数准备、方法调用与返回值处理**：
>
> 1. 创建数据绑定和模型上下文，用来转换输入并保存视图数据。
> 2. 调用 `HandlerMethodArgumentResolver`，从请求中解析方法参数。
> 3. 使用解析好的参数调用 Controller 方法。
> 4. 调用 `HandlerMethodReturnValueHandler`，将返回值交给响应写出或视图处理。

## 2. Spring Boot 外部化配置

文件：`docs/basic-knowledge/java/spring/external-config-precedence.mdx`。

### 逐节知识点核对

| 历史章节 | 知识点与本次处理 |
| --- | --- |
| 开篇、面试核心 | 恢复同一份代码适应不同环境的目的。保留来源优先级，并把环境变量转换和集合覆盖写成完整结论。 |
| Environment 与 PropertySource | 解释统一读取入口与配置来源。三种读取示例合入一个代码块，行为不变。恢复结构化配置的维护价值、配置元数据及编辑器提示，并补明生成元数据需要配置处理器。 |
| 配置来源优先级 | 保留从默认属性到测试属性的层级，以及 `SPRING_APPLICATION_JSON`。保留命令行 `--server.port=9000`，说明最终端口和覆盖条件。 |
| 配置文件加载 | 保留 JAR 内外、默认与 profile 文件的顺序，以及多 profile、多个 import 的后者优先。恢复 `application-prod.yaml` 示例和统一文件格式的原因。保留 location、additional-location、optional 的补充。 |
| 环境变量绑定 | 保留点、连字符、大小写转换及 `PAYMENT_RETRY_MAXATTEMPTS`。恢复 `SERVER_PORT` 对应 `server.port` 的例子。保留列表下标、kebab-case 占位符与复杂集合的配置选择。 |
| 配置与密钥 | 恢复私钥、仓库提交边界，以及进程诊断、部署清单、错误报告等暴露途径。保留 Secret、外部服务、配置树和脱敏，并解释配置树怎样读取文件。 |
| 启动校验 | 保留 record 校验代码，恢复启动失败比请求时空值报错更容易诊断的原因。恢复容量、业务开关、组合关系与安全默认值。保留 `500ms`、`2s`、默认毫秒和 `@DurationUnit`。 |
| 来源诊断、面试题 | 保留规范属性名、profile、搜索位置、部署覆盖项和敏感值检查。区分 `env` 的来源信息与 `configprops` 的绑定结果，答案补充测试覆盖与实际诊断方式。 |
| 当前新增章节 | 保留 List 整体替换、Map 按键合并的 YAML、数值和自测题。保留创建 Bean 时绑定、文件变化不自动刷新以及组件重建边界。 |

恢复重点是配置元数据、具体命名示例、敏感配置暴露途径和启动校验的原因。三种读取方式放在一起比较，后面的校验示例单独说明校验机制。

### 有意不恢复

无知识点因超出范围而删除。历史文中“操作系统不允许点”的笼统表达改为命名规则受操作系统和启动工具限制，具体转换规则保持不变。历史内容已保留，或按当前版本更精确的规则补全。

### 改动较大的段落

原文：

> 示例拒绝缺失地址、缺失超时和非正超时。项目需注册属性类，并提供 Bean Validation 实现。

改写：

> 示例中的 `@NotNull` 拒绝缺失的地址和超时，构造器拒绝零或负数超时。项目需注册属性类，并提供 Bean Validation 实现，也就是实际执行校验注解的组件。
>
> 除了单个字段是否存在，还要检查容量与业务开关的取值范围，以及配置之间的组合关系。生产关键参数的默认值应当安全、含义稳定，并适用于所有未显式配置的环境。这样，遗漏配置时才不会悄悄启用错误行为。

## 3. Spring 拦截机制

文件：`docs/basic-knowledge/java/spring/filter-interceptor-aspect-boundaries.mdx`。

### 逐节知识点核对

| 历史章节 | 知识点与本次处理 |
| --- | --- |
| 开篇、面试核心 | 保留 Servlet、MVC、Bean 方法三个层级，恢复按可见信息和覆盖范围选择机制的说明。保留当前同步回调、短路和 OncePerRequestFilter 核心结论。 |
| Filter | 恢复原始请求响应包装、CORS、编码、安全、请求日志、响应头和压缩。恢复覆盖其他 Servlet 与静态资源，以及在映射之前建立请求 ID。解释 URL 和派发类型的作用。 |
| HandlerInterceptor | 保留读取 `HandlerMethod` 注解的代码。恢复未进入 MVC 或未匹配 handler 时的覆盖边界，以及手写补充规则需测试的原因。保留安全过滤链与 Method Security 的分工。 |
| AOP | 恢复 HTTP、消息消费、定时任务入口，以及事务、授权、重试和监控场景。恢复代理调用限制、Servlet 链控制边界和向 service 引入 request/response 的耦合代价。 |
| 分层协作 | 恢复请求 ID 上下文、路径模板、handler 名称与 service 子调用记录。解释 MDC，保留每线程 finally 清理，并恢复避免重复请求日志的分工依据。 |
| 异常处理范围 | 恢复 preHandle 异常进入 MVC 解析器、Filter 自身异常的处理位置，以及响应提交边界。保留 Controller 切面观察不到之后 JSON 序列化失败的原因。 |
| 异步与 ThreadLocal | 恢复 `@Async` 的线程切换、框架上下文传播和线程复用造成串数据的后果。保留 ASYNC、ERROR 钩子、注册类型、异步支持与请求完成回调。 |
| 常见问题、面试题 | 恢复 Filter 额外查询映射器会耦合层级、重复匹配的原因。保留入口安全与方法授权的选择，参考回答说明各层能看到什么。 |
| 当前新增章节 | 保留正常与拒绝请求的完整回调顺序、异常参数为 null 的条件、ResponseBodyAdvice 和异步初始回调。原代码和顺序图保持不变。 |

恢复重点是各机制的使用场景与覆盖边界，以及线程上下文为何需要传递和清理。AOP 链内部执行机制继续引用《Spring AOP》。

### 有意不恢复

- 历史文把“Filter 的 finally 清理上下文并写响应头”作为统一做法。响应已提交时再写响应头无效，因此保留当前版本的修正：响应头在提交前写入，finally 用来清理。
- 历史核心把所有 Filter 异常都概括为不进入 ControllerAdvice，范围过宽。正文明确限定为 Filter 自身在进入 DispatcherServlet 前抛出的异常。
- 历史引用中的 Servlet 6.1 改为 Servlet 6.0 官方 Filter 文档，与本站 Boot 3.x 的版本基线保持一致；正文未引入 6.1 新机制。

### 改动较大的段落

原文：

> Servlet 异步处理会释放初始线程，再通过 ASYNC 派发继续执行。ThreadLocal 按线程保存，后续线程需重新建立上下文。

改写：

> 异步请求会更换执行线程，所以请求上下文需要显式传递。Servlet 异步处理释放初始线程后，可通过 ASYNC 派发继续执行；`@Async` 也会把任务交给其他线程。
>
> `ThreadLocal` 将数据保存在当前线程中，后续线程需要重新建立请求 ID 等上下文。可以使用框架提供的上下文传播机制，并在每个线程的退出路径中清理。这样，线程被下一个请求复用时，才不会带上前一个请求的数据。

## 4. Spring MVC 请求生命周期

文件：`docs/basic-knowledge/java/spring/http-request-to-controller.mdx`。

### 逐节知识点核对

| 历史章节 | 知识点与本次处理 |
| --- | --- |
| 开篇、面试核心 | 保留服务器、过滤链、分派器、参数准备和响应写出的主线。恢复核心中的 HandlerMapping、HandlerAdapter 与媒体类型协商。 |
| Servlet 容器 | 恢复请求行、头、请求体读取入口与 request/response 构造。保留 TCP/HTTP 与 MVC 的分工，恢复 keep-alive，并解释连接数、accept 队列、请求线程和应用连接池的区别。 |
| Filter 链 | 恢复 Spring Security 的过滤链接入，以及 `chain.doFilter()` 才继续调用的结论。包装、覆盖范围和返回后清理链接到《Spring 拦截机制》。 |
| DispatcherServlet | 恢复数据绑定和消息转换器参与参数准备。保留当前版本对适配器选择者、同步回调和视图渲染顺序的明确说明。异常入口表述限定在映射、参数解析、Controller 调用等阶段。 |
| 返回值处理 | 保留当前 `@RestController` 代码。恢复按协商媒体类型选择 `HttpMessageConverter` 并序列化 JSON 的说明。保留 String、ResponseEntity、ViewResolver 与 View 的区别。 |
| 异步请求 | 保留 Callable、DeferredResult、ASYNC 续接、已有结果复用和 Controller 不再执行的机制。保留初始线程与最终派发的回调区别，以及独立 `@Async` 失败的处理边界。 |
| 请求日志与指标 | 恢复响应大小、请求 ID、方法、模板路径、状态和完整耗时。解释高基数的具体含义和代价，恢复数据库等待、连接等待、序列化等阶段的独立观察。 |
| 常见问题、面试题 | 恢复 FORWARD 派发与 OncePerRequestFilter 钩子。保留 Controller 与 Servlet 的关系，答案按容器、映射、适配、响应写出的因果顺序展开。 |
| 当前异步容量章节 | 保留线程与连接占用、执行器容量和拒绝策略、超时后的取消与收尾、MVC 阻塞写出。恢复 WebFlux 不经过本调用链，以及虚拟线程选择要考虑阻塞、框架和下游容量。 |

恢复重点是服务器与应用的分工、Spring Security 入口、媒体类型转换和可观测性字段。当前异步表格、返回值代码与新增题目均保留。

### 有意不恢复

- 历史 Filter 示例只有 `chain.doFilter(request, response)`，这项行为在正文中直接说明。请求包装、注册范围和清理由《Spring 拦截机制》统一解释，正文已链接，不重复放置同一机制的代码。
- 历史核心称 Filter“能处理所有请求”，缺少注册条件。保留当前对 URL、派发类型和过滤器策略的限制。
- 历史引用中的 Servlet 6.1 改为 Servlet 6.0 规范入口，正文只保留基线内的通用机制。

### 改动较大的段落

原文：

> 请求日志记录 ID、方法、路径模板、状态与完整耗时。指标使用模板路径，避免用户 ID 形成高基数标签。

改写：

> 请求日志需要说明哪个请求耗时、在哪里耗时。入口日志至少保留以下信息：
>
> - 请求 ID，用于关联同一请求的多条日志。
> - HTTP 方法和路径模板，用于确定接口。
> - 响应状态码，用于区分成功与失败。
> - 完整耗时与响应大小，用于判断处理和写出成本。
>
> 指标应使用 `/users/{id}` 这样的路径模板。若直接把每个用户 ID 放进标签，就会产生大量不同标签值，这称为高基数，会增加指标存储与查询成本。

## 5. Spring 框架栏目首页

文件：`docs/basic-knowledge/java/spring/index.mdx`。

### 逐节知识点核对

| 历史部分 | 知识点与本次处理 |
| --- | --- |
| 阅读顺序 | 保留先容器与依赖，再沿请求、代理、事务、数据库调用阅读的顺序。保留启动全流程、扩展点和 Starter 按需补充。 |
| 复习入口 | 保留校招复习范围与代表题链接，将前置、核心阅读和掌握要求写成读者能理解的表达。 |
| 栏目范围 | 保留 IoC、AOP、事务、MVC、Boot 五个方向，以及机制、配置、边界与常见故障的内容分工。开篇先说明栏目主题和适用读者。 |
| 内容目录 | 十八个文章名称、链接和排列顺序保持不变。 |

历史首页与任务开始时的正文相同，没有知识点缺失。本次只调整定位、阅读顺序与链接段落，未增加技术文章结构。

### 有意不恢复

无。全部原有范围、顺序与入口均已保留。

### 改动较大的段落

原文：

> 先理解依赖与容器，再沿请求、代理、事务和数据库调用阅读。完整启动流程、扩展点和自定义 Starter 按项目需要补充。

改写：

> 复习时，先理解容器怎样创建对象和装配依赖，再沿请求、代理、事务和数据库调用阅读。掌握这些过程后，再按项目与面试要求补充完整启动流程、扩展点和自定义 Starter。

## 6. IoC 容器

文件：`docs/basic-knowledge/java/spring/ioc-container-purpose.mdx`。

### 逐节知识点核对

| 历史章节 | 知识点与本次处理 |
| --- | --- |
| 开篇、面试核心 | 保留对象创建、依赖装配和生命周期管理。解释装配的含义，恢复构造器、工厂方法参数与 Setter/属性的注入方式。 |
| 内部创建与外部装配 | 保留两个 OrderService 实现，合入同一代码块并标明分别使用。恢复业务流程、客户端实现和地址由同一类决定的后果，以及测试替换和生产地址变化的成本。 |
| IoC 与 DI | 恢复 Java 配置、扫描、类型/名称/限定符、初始化/销毁与作用域等职责。恢复事务、异步和校验处理器用途，解释限定符和作用域。 |
| BeanDefinition 与实例 | 保留定义先注册、实例按作用域创建的结论。类型、工厂方法、依赖、生命周期字段及参数注入示例通过相邻文章说明。 |
| 替换与测试 | 保留桩代码。恢复单元测试无需启动 Spring、集成测试验证条件配置和真实资源的分工。恢复创建耗时、依赖关系、配置来源和多候选 Bean 的诊断信息。 |
| 管理范围 | 恢复 Service Locator 对测试和静态分析的影响。恢复 `Map<String, Strategy>`、`ObjectProvider<T>` 和工厂接口三种选择，以及插件/框架使用查询 API 的边界。 |
| 常见问题、面试题 | 保留直接 new 实体和值对象、受管组件使用容器的区别。恢复业务接口契约仍存在，以及替换实现必须保持业务语义的原因。 |
| 当前单例章节 | 保留按容器和定义共享、安全发布与可变状态同步、请求数据存放位置、并发工具和 prototype 被 singleton 持有的边界。解释 prototype 的获取语义，并保留自测题。 |

恢复重点是 DI 的具体入口、容器工作内容、测试与诊断成本，以及动态依赖选择。代码仅增加分组注释并合并代码围栏，原有语句和行为保持不变。

### 有意不恢复

- 历史 `PaymentConfiguration` 的 `@Bean` 工厂示例不重复放回。相邻《BeanDefinition》的“BeanDefinition 注册”和“配置类的 Bean 方法调用”已解释定义字段与方法参数注入。正文保留定义与实例的结论，并给出链接。
- 历史“容器还能统一记录 Bean 创建时间、依赖图和配置来源”容易读成默认完整记录。恢复这些诊断对象，同时明确需要启动记录和诊断工具，不承诺容器自动提供全部记录。

### 改动较大的段落

原文：

> 动态策略可通过集合或工厂接口注入。框架扩展与插件注册可使用容器查询 API。

改写：

> 需要动态选择实现时，可以注入**策略集合、ObjectProvider 或工厂接口**：
>
> - `Map<String, Strategy>` 提供多个策略，让业务按名称选择。
> - `ObjectProvider<T>` 按需获取依赖，适合延迟获取或可选依赖。
> - 明确的工厂接口把创建或选择规则封装起来。

## 7. 验证

- 六篇文章完成逐段通读，并逐节对照 `0a50ae1`。保留历史版本之后的有效内容。
- 指定的 `--style-strict` 检查通过：五篇知识树文章，零结构问题、零文风提示。栏目首页没有 `knowledge` 字段，脚本不将其计入技术文章；已单独核对首页表达、目录与链接。
- 对照任务开始时的内容，核验 front matter、显式锚点、面试题标题、公司字段、HTML 来源注释与表格逐字不变。忽略空白和新增分组注释后，代码内容不变。
- 本批 66 个内部链接检查通过。章节锚点按目标正文核对；首页的两个 `spring-ioc` 锚点由组件生成，已核对 `CampusReview` 的 `id={topic.id}` 与主题数据中的 `priority: 'must'`。
- 本次仅修改六篇指定文章和本审计文件，保留工作区其他已有改动。
- 按任务要求未运行 `npm run build` 或 `docusaurus build`，未提交 Git。

配置优先级与绑定规则核对了 [Spring Boot 3.5 外部化配置](https://docs.spring.io/spring-boot/3.5/reference/features/external-config.html)。异步续接与作用域边界分别核对了 [Spring Framework 6.2 异步请求](https://docs.spring.io/spring-framework/reference/6.2/web/webmvc/mvc-ann-async.html)和 [Bean 作用域](https://docs.spring.io/spring-framework/reference/6.2/core/beans/factory-scopes.html)。过滤器参考采用 [Jakarta Servlet 6.0 Filter](https://jakarta.ee/specifications/servlet/6.0/apidocs/jakarta.servlet/jakarta/servlet/Filter.html)。
