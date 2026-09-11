# Java 复习知识树与文档目录

Java 分支讲语言语义、标准库、运行时和 Java 框架。算法、SQL、网络、通用测试和系统设计通过共享节点进入 Java 后端路线。

> 本文是[总纲](../interview-roadmap-outline-proposal.md)的分纲。优先级默认面向 Java 后端求职。每个 J01—J12 分组拟提供一个 index 导读入口，显著标明本轮考点、关键结论、指定阅读与完成标准。J05 已有本地样例，其他入口的改造与范围仍待建设、Review。

## 1. 知识树与停止条件

每行是一个复习 Topic 分组，index 说明本轮重点和概念关系。“核心节点”和“深入节点”描述整个分组的范围，第一轮再从中选择必要考点与阅读位置；不要求读完一个分组的所有核心文章才进入下一组。

| 分组 | 核心节点 | 深入或按岗节点 | 默认优先级／深度 | 前置与停止条件 |
| --- | --- | --- | --- | --- |
| J01 类型与对象 | Java 值传递、面向对象编程（Object-Oriented Programming）、对象相等性 | 不可变对象、Java API 设计 | 必会／原理解释 | 前置：基本语法。能根据变量、对象和实际类型解释参数修改、多态、相等性与集合键行为 |
| J02 常用类型与异常 | String、包装类型、BigDecimal、Java 异常 | Optional、java.time、枚举 | 必会／基础回答；异常与相等性追到原理 | 前置：J01。能处理精度、空值、字符串构造和异常传播，并说明资源关闭发生在哪里 |
| J03 泛型与元数据 | Java 泛型、Java 注解、Java 反射 | Java 注解处理器 | 常考／原理解释 | 前置：J01。能判断泛型赋值与通配符读写，区分类型检查、擦除、运行时反射和编译期生成 |
| J04 函数式编程 | Lambda 表达式、Stream | Collector、并行流 | 常考／原理解释 | 前置：J03。能解释惰性求值、终止操作、副作用和异常；能写出无共享可变状态的数据处理 |
| J05 集合 | Java 集合框架、ArrayList、HashMap、HashSet、集合迭代器、LinkedList | ArrayDeque、PriorityQueue、LinkedHashMap、TreeMap 与 TreeSet、ConcurrentHashMap、CopyOnWrite 容器、BlockingQueue、ConcurrentLinkedQueue、迭代一致性 | 必会／原理解释；并发集合随 J07/J08 进入 | 前置：数组、链表、哈希表、树、复杂度。能从顺序、查找、更新和并发约束选择容器，解释扩容与复合操作边界 |
| J06 I/O | Java 流式 I/O、Java NIO | Java 序列化、Netty；共享的零拷贝 | 常考／原理解释；Netty 按岗选学 | 前置：文件描述符、阻塞与非阻塞、I/O 多路复用。能画出读取和资源关闭路径，解释 Buffer、Channel、Selector 的职责 |
| J07 并发语义与同步 | Java 线程、线程安全、Java 内存模型、volatile、synchronized、ReentrantLock | 安全发布、CAS、Java 原子类、AQS、读写锁、锁竞争、锁与无锁、并发活跃性、消息传递 | 必会／原理解释；AQS 等按追问深入 | 前置：进程、线程、同步、内存。能从共享状态和 happens-before 推导结果，说明可见性与原子性，识别锁与发布边界 |
| J08 任务执行与上下文 | Java 线程池、任务取消、ThreadLocal、CompletableFuture | Java 并发同步器、虚拟线程、并发集合的吞吐与一致性取舍 | 线程池必会，其余常考／原理解释；虚拟线程按目标 JDK | 前置：J07。能说明提交、排队、拒绝、执行和关闭链路，解释超时、取消、上下文清理与任务积压 |
| J09 JVM | Java 字节码、JVM 运行时数据区域、类加载、双亲委派模型、GC Roots、分代回收、JVM 诊断 | 对象布局、直接内存、具体收集器、JIT、内联、逃逸分析、启动优化与性能实验 | 运行时与回收必会／原理解释；具体实现常考或选学 | 前置：J01、内存与线程。能连接对象分配、可达性、回收和故障证据；知道哪些结论依赖 JDK、收集器和运行参数 |
| J10 Spring | IoC 容器、依赖注入、Bean 生命周期、Spring AOP、Spring MVC 请求生命周期、Spring Boot 自动配置、Spring 事务 | BeanDefinition、代理、循环依赖、DispatcherServlet、配置与启动、Starter、Spring Security | 必会／原理解释；安全框架按岗选学 | 前置：J03、HTTP、SQL 事务。能从容器启动和一次请求解释对象协作、代理生效范围与事务边界 |
| J11 数据访问 | JDBC、数据库连接池、MyBatis | JPA、N+1 查询、批处理与分页 | JDBC/连接池必会，ORM 按目标项目／原理解释 | 前置：SQL、索引、事务、J10。能解释连接借还、参数绑定、事务参与与查询次数；项目用 MyBatis 或 JPA 时选一条深入 |
| J12 Java 工程实践 | JUnit、Java API 设计、不可变对象；共享 Maven 与测试分层 | Record、密封类、模式匹配、具体 JDK 升级差异 | 测试与构建常考／基础回答；语言扩展按岗选学 | 前置：J01/J03。能写可验证的边界案例，解释依赖冲突和可变状态；新特性只讨论目标版本内的行为 |

## 2. 第一轮复习集合

路线默认呈现第一轮的有序复习任务。每项任务说明考点、对应文章或章节、完成标准；index 提供概览和关键结论，已有基础的读者可以先自测，通过后继续。需要补充解释时直接进入指定正文。J03 的泛型可以在阅读集合 API 时同步补充。

J01—J12 是内容分组，不等于十二项大小相同的复习任务，也不同于线上路线现有的 40 个 Topic。JVM、Spring 可以按考点分几次复习，按岗选学内容由目标岗位决定是否进入本轮。第一轮规模在逐项确认必要阅读后计算。

### 2.1 复习顺序

1. **类型与常用值**：值传递、对象相等性、面向对象、String、异常、数值精度。
2. **集合与编码**：ArrayList、HashMap、集合选择；同时读共享复杂度、数组、链表和哈希表，完成代表性编码练习。
3. **并发与运行时**：线程安全、JMM、锁、线程池；运行时内存、类加载、可达性与回收。
4. **框架与数据**：IoC、Bean 生命周期、AOP、MVC、自动配置、事务；配合共享 SQL、索引、数据库事务、缓存与消息。
5. **应用检查**：能够解释一个接口从接收请求、执行业务、读写数据库到处理失败的全过程，并给出对应测试。

**停止条件**：能脱离文章推导最小代码的行为，解释关键失败路径，并指出下一步应查哪类证据。不会复述某个收集器的实现常量、完整框架启动源码，不妨碍完成这一轮。

深入阅读按触发条件进入：目标 JDK 涉及虚拟线程时读虚拟线程；项目使用 JPA 时读实体状态和加载；岗位强调中间件或网络时读 Netty；面试要求性能诊断时读 JFR、转储与 JMH。

### 2.2 Topic 导读

**读者进入 index 后，应能立即确定本轮看什么、学到哪里，以及下一步打开哪里。** 第一屏优先显示当前考点与阅读入口；简短的关键结论帮助回忆，完整解释由概念文章承接。篇幅按能否快速开始阅读判断，不为每个分组统一规定一篇独立精简教材。

| 内容 | 写到什么程度 |
| --- | --- |
| 适用范围 | 说明当前建议面向的岗位、轮次与必要前置；缺少基础时给出具体补充入口 |
| 本轮重点 | 列出 3—5 个具体考点及完成标准，例如“解释 HashMap 查找时怎样确定键相等” |
| 关键结论 | 按考点保留结论、成立条件和简短原因；只解释本组必要的概念关系 |
| 本轮阅读 | 每个考点链接到标准文章及指定章节；给出顺序与“开始本轮阅读”入口，阅读中标明停止位置 |
| 自测与继续 | 选择 1—3 道代表问题，链接标准文章中的题目和收起的参考回答；允许先自测或标记待巩固 |
| 后续学习 | 说明第二轮补什么、哪些内容由岗位决定，再提供完整目录；无需逐层展开才能找到核心正文 |

index 中的关键结论帮助已有基础的读者回忆；完成自测需要的机制、例子和边界都必须包含在本轮阅读中。第一轮可以进入文章的原理章节，第二轮也可以回到同一概念继续追问。禁止只因文章排在列表前面就把它标为核心阅读。

index 是分组概览的唯一正文，技术结论关联标准概念文章，版本或结论变化时同步检查。岗位路线只维护选择、顺序和目标；“继续复习”直接进入下一段阅读，不强制经过 index。正式面试题沿用公司来源、考察重点、相关内容和收起回答的规范，入口引用已有题目，不重复维护答案。

### 2.3 J01—J12 的导读入口

以下路径相对于 `docs/basic-knowledge/java/`。沿用仓库现有的 `index.mdx` 命名，承担本次提出的 `index.md` 导读职责；同一目录只保留一个 index 文档。文件名与分组编号分开，页面标题使用下表名称。

| 分组 | 页面标题 | 目标文件 | 当前状态 |
| --- | --- | --- | --- |
| J01 | Java 类型与对象 | `language/objects/index.mdx` | 拟新增；引用语言目录的现有概念文章 |
| J02 | Java 常用类型与异常 | `language/values/index.mdx` | 拟新增；同时引用 java.time 等标准库文章 |
| J03 | Java 泛型与元数据 | `language/metadata/index.mdx` | 拟新增；泛型、注解、反射的核心关系 |
| J04 | Java 函数式编程 | `functional/index.mdx` | 已有导航页，拟补重点导读 |
| J05 | Java 集合 | `collections/index.mdx` | 已接入本地导读、三篇核心阅读与自测，待试读 |
| J06 | Java I/O | `io/index.mdx` | 已有导航页，拟补重点导读 |
| J07 | Java 并发语义与同步 | `concurrency/synchronization/index.mdx` | 拟新增；共享状态、可见性、原子性与同步 |
| J08 | Java 任务执行与上下文 | `concurrency/tasks/index.mdx` | 拟新增；任务执行、取消、异步结果和上下文 |
| J09 | JVM | `jvm/index.mdx` | 已有导航页，拟补重点导读 |
| J10 | Spring 框架 | `spring/index.mdx` | 已有导航页，拟补重点导读 |
| J11 | Java 数据访问 | `data-access/index.mdx` | 已有导航页，拟补重点导读；缺少的 JDBC 主文同步补齐 |
| J12 | Java API 与测试 | `quality/index.mdx` | 已有导航页，拟补重点导读；引用共享构建与测试内容 |

共 12 个入口：J05 已改造，6 个现有导航页待改造，5 个拟新增。`language/index.mdx` 和 `concurrency/index.mdx` 继续作为上层目录，分别链接三个和两个导读入口；标准概念文章保留现有位置。Java 总入口提供完整分组目录，岗位路线默认只呈现本轮任务，可以直达导读或指定阅读。

J12 的导读重点限定在 API、不可变对象、测试与构建基本功，Record、密封类和模式匹配继续按岗选学，不因已有目录位置进入本轮重点。

### 2.4 Java 集合的第一轮示例

J05 已在本地接入以下阅读范围，面向已有 Java 基础、准备后端面试的读者。本轮指定阅读为 **3 篇文章中的核心章节**；导读显示重点、完成标准和下一篇，文章提供范围提示、核心阅读结束位置、原文自测题入口与继续导航。关键结论帮助回忆，阅读范围仍需试读校准。

| 本轮阅读 | 指定范围 | 完成标准 |
| --- | --- | --- |
| [Java 集合框架](../../docs/basic-knowledge/java/collections/collection-interface-selection.mdx) | 第 1—6 节的接口语义与基本选型 | 根据顺序、去重、键值查找和取出规则选择容器，能说明依据 |
| [ArrayList](../../docs/basic-knowledge/java/collections/arraylist-growth-memory-locality.mdx) | 第 1—5 节的存储与操作成本，第 7 节的线程边界 | 解释随机访问、追加、扩容和中间插入的成本，区分单次操作与摊销复杂度 |
| [HashMap](../../docs/basic-knowledge/java/collections/hashmap-structure-lookup-path.mdx) | 第 1—5 节的查找、键相等、冲突、扩容与使用边界；具体树化阈值和位运算推导留到后续 | 沿 put/get 解释定位与比较，说明键的相等性、扩容原因和共享修改限制 |

主入口为“开始本轮阅读”，同时允许“先自测”。读者首次进入时从《Java 集合框架》开始，继续复习时直达尚未完成的阅读位置。数组、哈希表、复杂度和对象相等性是必要前置；只在读者不熟悉时补充对应内容。

当前自测复用原文中的容器选型、ArrayList 扩容和 HashMap 查找问题。试读时检查题目能否覆盖完成标准，必要时调整选题或补齐解释。能脱离正文说明机制及适用边界即可继续下一项；只能记住结论、无法解释时标记待巩固，并定位回相应段落。

后续学习入口直接说明范围：

- **第二轮：常考与追问**。补充 LinkedList 的操作前提、TreeMap 与 TreeSet 的有序查询、集合迭代器和不可变集合，以及 HashMap 的容量与树化追问；不会因为第一轮已读过 HashMap 就把整篇标为全部掌握。
- **按场景补充**。项目涉及 LRU 时进入 LinkedHashMap；并发任务进入 J07/J08 后，再按共享访问方式学习并发集合。第一轮已保留线程安全边界，具体并发机制在相应任务中展开。
- **查看集合全部内容**。提供完整目录，便于按具体问题查阅。

先试读这一个分组及其路线入口，观察新读者能否直接找到起点、说出本轮考点、在遇到疑问时定位解释，以及自测后确定下一步。完成核心阅读不应依赖反复翻查完整目录；已有基础的读者应能通过自测跳过已会部分。确认范围、篇幅和导航后，再扩展其余入口。阅读与练习耗时需要试读，暂不据文章数量承诺完成时间。

## 3. 拟新增与需要调整的目录

保留现有 `docs/basic-knowledge/java/` 下的语言、集合、并发、JVM、Spring 和数据访问目录。下表路径均相对于该目录，标为“新增”的文件目前不存在。

| 标准标题 | 建议文件 | 状态与范围 | 阅读安排 |
| --- | --- | --- | --- |
| 枚举 | `language/enums.mdx` | 新增；类型语义、常量行为、switch 与状态表达 | 常考，基础回答 |
| Record | `language/records.mdx` | 新增；数据载体、生成成员、浅不可变与构造校验 | 按岗选学，基础回答 |
| 密封类 | `language/sealed-classes.mdx` | 新增；受限继承与类型建模 | 按岗选学，基础回答 |
| 模式匹配 | `language/pattern-matching.mdx` | 新增；类型判断与分支覆盖，限定实际 JDK 版本 | 按岗选学，原理解释 |
| JDBC | `data-access/jdbc.mdx` | 新增；连接、预编译语句、结果集和本地事务 | 必会，原理解释 |
| HashSet | `collections/hashset.mdx` | 新增；去重、相等性与底层集合约束，引用共享哈希表 | 常考，原理解释 |
| ArrayDeque | `collections/arraydeque.mdx` | 新增；栈、队列与双端操作，引用共享线性结构 | 常考，基础回答 |
| PriorityQueue | `collections/priority-queue.mdx` | 新增；堆的 Java API、比较器与取出顺序 | 常考，原理解释 |
| Netty | `io/netty.mdx` | 从现有 RPC 的混合讲解中提炼；EventLoop、Channel、Pipeline 与阻塞边界 | 按岗选学，原理解释 |
| Spring Security | `spring/spring-security-filter-chain.mdx` | 由系统设计安全目录调整归属；保留现有正文基础 | 按岗选学，原理解释 |

其他缺口优先通过现有文章补充。例如，重载、重写、接口和抽象类已由面向对象文章承接；资源关闭由《Java 异常》的对应章节承接；HashMap 扩容与线程池饱和已有正文和旧地址跳转，不重复新增同义文章。

### 3.1 共享内容调整

| 当前内容 | 目标归属 | Java 保留的入口 |
| --- | --- | --- |
| `java/algorithms/` 的算法复杂度、滑动窗口、树与图搜索、动态规划、算法正确性 | `basic-knowledge/algorithms/` | 算法阶段引用共享文章，Java 代码保留为示例 |
| 零拷贝 | `basic-knowledge/operating-system/zero-copy.mdx` | I/O 的深入阅读 |
| 测试替身、测试金字塔 | `tools-and-frameworks/testing/` | JUnit 与数据访问测试引用共享原则 |
| Maven | `tools-and-frameworks/build/` | Java 构建入口 |
| 通用认证、授权、可观测性和诊断 | `tools-and-frameworks/` | 通过 Java 项目和请求链路引用 |

## 4. 存量文章目录

以下标题直接取自现有文档；“核心／深入”是整个分支的建议阅读层次，内容仍需技术与文风验收。第一轮以第 2 节的考点与指定阅读为准，以下目录不直接充当第一轮待办。完整文件状态和归属调整见[存量文档目录](./document-inventory.md)。

### 4.1 Java 语言

目录：`docs/basic-knowledge/java/language/`。

| 阅读层次 | 文章 |
| --- | --- |
| 核心阅读 | [Java 值传递](../../docs/basic-knowledge/java/language/types-references-value-passing.mdx)；[面向对象编程（Object-Oriented Programming）](../../docs/basic-knowledge/java/language/encapsulation-inheritance-polymorphism.mdx)；[对象相等性](../../docs/basic-knowledge/java/language/equals-hashcode-object-identity.mdx)；[String](../../docs/basic-knowledge/java/language/string-immutability-pool.mdx)；[包装类型](../../docs/basic-knowledge/java/language/wrappers-boxing-cache.mdx)；[BigDecimal](../../docs/basic-knowledge/java/language/bigdecimal-money.mdx)；[Java 异常](../../docs/basic-knowledge/java/language/exceptions-error-boundaries.mdx)；[Java 泛型](../../docs/basic-knowledge/java/language/generics.mdx)；[Java 注解](../../docs/basic-knowledge/java/language/annotations-retention-processing.mdx)；[Java 反射](../../docs/basic-knowledge/java/language/reflection-method-handles.mdx) |
| 深入阅读 | [Optional](../../docs/basic-knowledge/java/language/optional-boundaries.mdx)；[Java 注解处理器](../../docs/basic-knowledge/java/language/runtime-scanning-compile-time-generation.mdx) |

### 4.2 Java 函数式编程

目录：`docs/basic-knowledge/java/functional/`。

| 阅读层次 | 文章 |
| --- | --- |
| 核心阅读 | [Lambda 表达式](../../docs/basic-knowledge/java/functional/lambda-functional-interfaces-capture.mdx)；[Stream](../../docs/basic-knowledge/java/functional/stream-pipeline-lazy-evaluation.mdx) |
| 深入阅读 | [Collector](../../docs/basic-knowledge/java/functional/collectors-grouping-reduction.mdx)；[并行流](../../docs/basic-knowledge/java/functional/parallel-stream-model-pitfalls.mdx)；[java.time](../../docs/basic-knowledge/java/functional/java-time-time-zone-boundaries.mdx) |

### 4.3 Java 集合

目录：`docs/basic-knowledge/java/collections/`。

| 阅读层次 | 文章 |
| --- | --- |
| 核心阅读 | [Java 集合框架](../../docs/basic-knowledge/java/collections/collection-interface-selection.mdx)；[ArrayList](../../docs/basic-knowledge/java/collections/arraylist-growth-memory-locality.mdx)；[LinkedList](../../docs/basic-knowledge/java/collections/linkedlist-semantics-cost.mdx)；[集合迭代器](../../docs/basic-knowledge/java/collections/iterator-fail-fast-immutable.mdx)；[HashMap](../../docs/basic-knowledge/java/collections/hashmap-structure-lookup-path.mdx) |
| 深入阅读 | [TreeMap 与 TreeSet](../../docs/basic-knowledge/java/collections/treemap-treeset-ordered-query.mdx)；[LinkedHashMap](../../docs/basic-knowledge/java/collections/linkedhashmap-lru.mdx)；[ConcurrentHashMap](../../docs/basic-knowledge/java/collections/concurrenthashmap-atomic-compound-operations.mdx)；[CopyOnWrite 容器](../../docs/basic-knowledge/java/collections/copy-on-write-cost-model.mdx)；[BlockingQueue](../../docs/basic-knowledge/java/collections/blockingqueue-producer-consumer.mdx)；[ConcurrentLinkedQueue](../../docs/basic-knowledge/java/collections/concurrentlinkedqueue-lock-free-path.mdx)；[迭代一致性](../../docs/basic-knowledge/java/collections/concurrent-collection-iteration-consistency.mdx) |

### 4.4 Java I/O

目录：`docs/basic-knowledge/java/io/`。

| 阅读层次 | 文章 |
| --- | --- |
| 核心阅读 | [Java 流式 I/O](../../docs/basic-knowledge/java/io/byte-character-buffered-streams.mdx)；[Java NIO](../../docs/basic-knowledge/java/io/buffer-channel-selector.mdx) |
| 深入阅读 | [Java 序列化](../../docs/basic-knowledge/java/io/java-serialization-compatibility-security.mdx) |

### 4.5 Java 并发编程

目录：`docs/basic-knowledge/java/concurrency/`。

| 阅读层次 | 文章 |
| --- | --- |
| 核心阅读 | [线程安全](../../docs/basic-knowledge/java/concurrency/thread-safety-race-conditions.mdx)；[Java 线程](../../docs/basic-knowledge/java/concurrency/thread-lifecycle-interruption.mdx)；[Java 内存模型](../../docs/basic-knowledge/java/concurrency/jmm-happens-before.mdx)；[synchronized](../../docs/basic-knowledge/java/concurrency/synchronized-monitor-optimizations.mdx)；[volatile](../../docs/basic-knowledge/java/concurrency/volatile-barriers-visibility.mdx)；[ReentrantLock](../../docs/basic-knowledge/java/concurrency/reentrantlock-fairness-condition.mdx)；[任务取消](../../docs/basic-knowledge/java/concurrency/interruption-timeout-cancellation.mdx)；[Java 线程池](../../docs/basic-knowledge/java/concurrency/threadpoolexecutor-execution-path.mdx)；[CompletableFuture](../../docs/basic-knowledge/java/concurrency/future-completablefuture-errors.mdx)；[ThreadLocal](../../docs/basic-knowledge/java/concurrency/threadlocal-leaks-context.mdx) |
| 深入阅读 | [安全发布](../../docs/basic-knowledge/java/concurrency/safe-publication-escape-final.mdx)；[消息传递](../../docs/basic-knowledge/java/concurrency/shared-state-message-passing.mdx)；[CAS](../../docs/basic-knowledge/java/concurrency/cas-aba-versioning.mdx)；[Java 原子类](../../docs/basic-knowledge/java/concurrency/atomic-longadder-contention.mdx)；[锁与无锁](../../docs/basic-knowledge/java/concurrency/locks-vs-lock-free-cost.mdx)；[AQS](../../docs/basic-knowledge/java/concurrency/aqs-state-wait-queue.mdx)；[读写锁](../../docs/basic-knowledge/java/concurrency/readwritelock-stampedlock.mdx)；[Java 并发同步器](../../docs/basic-knowledge/java/concurrency/latch-barrier-semaphore.mdx)；[虚拟线程](../../docs/basic-knowledge/java/concurrency/virtual-threads-boundaries.mdx)；[并发活跃性](../../docs/basic-knowledge/java/concurrency/liveness-deadlock-livelock-starvation.mdx)；[锁竞争](../../docs/basic-knowledge/java/concurrency/lock-contention-context-switch-benchmark.mdx) |

### 4.6 JVM

目录：`docs/basic-knowledge/java/jvm/`。

| 阅读层次 | 文章 |
| --- | --- |
| 核心阅读 | [Java 字节码](../../docs/basic-knowledge/java/jvm/source-to-bytecode.mdx)；[类加载](../../docs/basic-knowledge/java/jvm/class-loading-stages.mdx)；[双亲委派模型](../../docs/basic-knowledge/java/jvm/parent-delegation.mdx)；[JVM 运行时数据区域](../../docs/basic-knowledge/java/jvm/runtime-data-areas.mdx)；[GC Roots](../../docs/basic-knowledge/java/jvm/gc-roots-reachability.mdx)；[分代回收](../../docs/basic-knowledge/java/jvm/generational-barriers-safepoints.mdx)；[JVM 诊断](../../docs/basic-knowledge/java/jvm/diagnostic-tools-evidence.mdx) |
| 深入阅读 | [类加载器](../../docs/basic-knowledge/java/jvm/classloaders-spi-isolation.mdx)；[类加载故障](../../docs/basic-knowledge/java/jvm/class-initialization-conflicts.mdx)；[Java 对象布局](../../docs/basic-knowledge/java/jvm/object-creation-layout.mdx)；[压缩指针与对象对齐](../../docs/basic-knowledge/java/jvm/compressed-pointers-alignment.mdx)；[Java 直接内存](../../docs/basic-knowledge/java/jvm/direct-native-memory.mdx)；[OutOfMemoryError 与 StackOverflowError](../../docs/basic-knowledge/java/jvm/oom-stack-overflow.mdx)；[Serial、Parallel 与 CMS](../../docs/basic-knowledge/java/jvm/serial-parallel-cms.mdx)；[G1](../../docs/basic-knowledge/java/jvm/g1-regions-rset-collection-set.mdx)；[低延迟垃圾收集器](../../docs/basic-knowledge/java/jvm/zgc-shenandoah-low-latency.mdx)；[分层编译](../../docs/basic-knowledge/java/jvm/interpreter-tiered-compilation.mdx)；[方法内联与去优化](../../docs/basic-knowledge/java/jvm/inlining-deoptimization.mdx)；[逃逸分析与标量替换](../../docs/basic-knowledge/java/jvm/escape-analysis-scalar-replacement.mdx)；[JMH](../../docs/basic-knowledge/java/jvm/jmh-correct-benchmarks.mdx)；[Java 启动优化](../../docs/basic-knowledge/java/jvm/aot-cds-native-image.mdx)；[CPU 使用率](../../docs/basic-knowledge/java/jvm/cpu-high-diagnosis.mdx)；[线程转储](../../docs/basic-knowledge/java/jvm/thread-dumps-deadlocks-contention.mdx)；[堆转储](../../docs/basic-knowledge/java/jvm/heap-dumps-memory-leaks.mdx)；[GC 停顿分析](../../docs/basic-knowledge/java/jvm/gc-logs-jfr-pauses.mdx) |

### 4.7 Spring 框架

目录：`docs/basic-knowledge/java/spring/`。

| 阅读层次 | 文章 |
| --- | --- |
| 核心阅读 | [IoC 容器](../../docs/basic-knowledge/java/spring/ioc-container-purpose.mdx)；[依赖注入](../../docs/basic-knowledge/java/spring/dependency-injection-selection.mdx)；[Bean 生命周期](../../docs/basic-knowledge/java/spring/bean-creation-lifecycle.mdx)；[Spring AOP](../../docs/basic-knowledge/java/spring/aop-pointcut-interceptor-chain.mdx)；[Spring 事务](../../docs/basic-knowledge/java/spring/declarative-transaction-execution.mdx)；[Spring MVC 请求生命周期](../../docs/basic-knowledge/java/spring/http-request-to-controller.mdx)；[Spring Boot 自动配置](../../docs/basic-knowledge/java/spring/auto-configuration-conditions.mdx) |
| 深入阅读 | [BeanDefinition](../../docs/basic-knowledge/java/spring/beandefinition-container-startup.mdx)；[Spring 循环依赖](../../docs/basic-knowledge/java/spring/circular-dependencies-scopes-early-exposure.mdx)；[JDK 动态代理与 CGLIB](../../docs/basic-knowledge/java/spring/jdk-proxy-cglib.mdx)；[DispatcherServlet](../../docs/basic-knowledge/java/spring/dispatcherservlet-handler-mapping.mdx)；[Spring 拦截机制](../../docs/basic-knowledge/java/spring/filter-interceptor-aspect-boundaries.mdx)；[Spring MVC 参数解析](../../docs/basic-knowledge/java/spring/binding-validation-content-negotiation.mdx)；[API 错误契约](../../docs/basic-knowledge/java/spring/api-error-contract.mdx)；[Spring Boot 启动](../../docs/basic-knowledge/java/spring/spring-boot-startup.mdx)；[Spring Boot 外部化配置](../../docs/basic-knowledge/java/spring/external-config-precedence.mdx)；[Spring Boot Starter](../../docs/basic-knowledge/java/spring/custom-starter-boundaries.mdx)；[Spring Boot Actuator](../../docs/basic-knowledge/java/spring/actuator-health-startup-diagnostics.mdx) |

### 4.8 Java 数据访问

目录：`docs/basic-knowledge/java/data-access/`。

| 阅读层次 | 文章 |
| --- | --- |
| 核心阅读 | [MyBatis](../../docs/basic-knowledge/java/data-access/mybatis-mapping-executor-plugins.mdx)；[数据库连接池](../../docs/basic-knowledge/java/data-access/connection-pool-capacity-timeout-leaks.mdx) |
| 深入阅读 | [JPA](../../docs/basic-knowledge/java/data-access/jpa-entity-states-dirty-checking-lazy-loading.mdx)；[N+1 查询](../../docs/basic-knowledge/java/data-access/n-plus-one-fetch-strategies.mdx)；[批处理与分页](../../docs/basic-knowledge/java/data-access/batching-pagination-data-access-tests.mdx) |

### 4.9 Java API 与测试

目录：`docs/basic-knowledge/java/quality/`。

| 阅读层次 | 文章 |
| --- | --- |
| 核心阅读 | [Java API 设计](../../docs/basic-knowledge/java/quality/api-design-from-invariants.mdx)；[不可变对象](../../docs/basic-knowledge/java/quality/immutable-objects-defensive-copying.mdx)；[JUnit](../../docs/basic-knowledge/java/quality/junit-assertions-parameterized-tests.mdx) |

### 4.10 跨分支引用

算法、零拷贝、测试替身与测试金字塔的原文件仍存在，拟按第 3.1 节归入共享分支。Spring Security 的原文仍在系统设计下，拟归 Java；详见[存量文档目录](./document-inventory.md)。
