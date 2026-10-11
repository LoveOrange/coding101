# 面经样本与逐题依据

来源均为公开用户复盘，未经公司认证。显示日期可能是发布或编辑日期，不自动等于面试日期。以下只保留问题释义，不把候选人的回答当作技术事实。

未披露具体题目的复盘仍计入分母；命中为零表示无法映射本清单，不能推断没有考技术。未纳入页面及原因见[source-reviews.json](./source-reviews.json)。

<a id="f001"></a>

## F001 · 网易

[网易一面面经](https://www.nowcoder.com/discuss/810526179311542272) · 未注明 · 页面显示 2025-10-22

只记正文明确提问；JDK新特性不展开为全部新API，ThreadLocal原理未提清理不算清理考点。

- `os.process-thread`：进程线程区别。
- `os.ipc`：进程通信方式。
- `os.syscall`：用户态内核态转换。
- `java.collections.map-collision`：桶树化的理由。
- `java.collections.map-resize`：扩容和迁移问题。
- `java.collections.arraylist-cost`：数组列表扩容及删除移动。
- `java.collections.iterator`：迭代删除与并发修改异常。
- `java.collections.chm-update`：并发哈希表的协调机制。
- `java.concurrent.cas`：CAS与ABA。
- `java.types.optional`：Optional用途。
- `java.concurrent.virtual-thread`：虚拟线程。
- `java.concurrent.pool-capacity`：无界任务队列风险。
- `java.collections.blocking-queue`：阻塞队列和容量。
- `java.concurrent.pool-path`：线程首次创建及核心线程回收。
- `java.concurrent.lock`：两类锁对比。
- `java.jvm.gc-algorithm`：垃圾回收算法。
- `database.engine.isolation`：事务隔离级别。
- `database.engine.index-use`：索引失效。

<a id="f002"></a>

## F002 · 阿里国际

[阿里国际一面面经](https://www.nowcoder.com/discuss/754034283265658880) · 未注明 · 页面显示 2025-05-19

消息不丢失未指定生产/消费确认；只记宽泛问题，不同时命中两端确认考点。

- `java.collections.arraylist-cost`：两种List的存储与使用取舍。
- `java.collections.linkedlist-cost`：两种List的存储与使用取舍。
- `java.jvm.oom`：内存溢出场景。
- `java.types.equality`：重写相等方法与哈希方法。
- `cache.skiplist`：跳表及复杂度。
- `algorithms.complexity`：对数复杂度算法。
- `database.engine.composite`：最左前缀。
- `java.concurrent.latch`：完成计数器。
- `distributed.two-phase`：跨库转账与两阶段提交。
- `algorithms.heap-topk`：TopK。
- `algorithms.sorting`：有限内存外部排序。
- `engineering.linux-log`：按格式提取日志。
- `spring.circular`：循环依赖。
- `distributed.unique-id`：UUID和雪花算法。

<a id="f003"></a>

## F003 · 字节跳动

[字节一面面经](https://www.nowcoder.com/feed/main/detail/29e0e977d61047d1b61ea2e7bc47400d) · 未注明 · 页面显示 2025-03-05

JDBC语句对象对比不同于完整连接生命周期；不强行映射。分布式锁未指明Redis，未记Redis租约锁。

- `spring.interception`：过滤器和拦截器。
- `java.metadata.parallel`：并行流的代价。
- `database.engine.anomalies`：不可重复读与幻读。
- `java.jvm.loading`：静态字段初始化时机。
- `algorithms.backtracking`：括号生成。

<a id="f004"></a>

## F004 · 美团

[《美团》24校招Java后端开发一面面经](https://www.nowcoder.com/feed/main/detail/0e6ba4e8c0a048a8a46e317c1accdaa0) · 校招 · 页面显示 2024-01-11

相等方法的直接对比未问哈希契约；ThreadLocal仅用途；不计对应窄考点。

- `network.layers`：HTTP请求响应端口。
- `database.engine.isolation`：隔离原理。
- `database.engine.current-read`：快照读与当前读。
- `spring.mvc-path`：请求处理完整路径。
- `cache.persistence`：持久化方式对比。
- `java.types.interface`：接口与抽象类。
- `java.collections.map-resize`：HashMap扩容。
- `java.jvm.memory-regions`：堆中的对象。
- `java.jvm.gc-algorithm`：回收算法。
- `distributed.cap`：分区条件下保证。
- `algorithms.tree-traversal`：二叉树右视图。

<a id="f005"></a>

## F005 · 美团

[面试经历 – 美团校招 AI 面试](https://www.nowcoder.com/feed/main/detail/ab84f1dbed4642978fd0072cce042800) · 校招 · 页面显示 2024-08-11

招聘AI面试，作者自选Java；未把Linux系统时间操作记为java.time。泛问NIO不细分到Buffer/Selector。

- `cache.execution`：Redis线程与并发请求。
- `security.authn-authz`：用户隐私可见权限。

<a id="f006"></a>

## F006 · 美团

[美团一面面经](https://www.nowcoder.com/feed/main/detail/88bde59d89f849f4b03a0dde0f4f614f) · 未注明 · 页面显示 2024-04-09

常用Linux命令未说明进程或日志；JDK8新特性不推断java.time被问。

- `java.jvm.bytecode`：跨平台执行。
- `network.layers`：分层协议。
- `network.transport`：传输协议差异。
- `network.handshake`：连接建立。
- `network.flow-congestion`：拥塞控制。
- `design.pattern-strategy`：策略模式实现。
- `java.concurrent.threadlocal-cleanup`：局部变量内存泄漏及清理。

<a id="f007"></a>

## F007 · 美团

[美团Java后端 1面凉经 70分钟](https://www.nowcoder.com/feed/main/detail/b44414f112a344aaaa27804f0282fedd) · 校招 · 页面显示 2024-10-18

泛问集合/分布式锁不展开为所有叶子；重排链表不算反转单链表命中。

- `database.engine.index-use`：索引失效与命中。
- `design.sharding`：水平垂直分表。
- `middleware.queue-purpose`：消息队列用途。
- `spring.ioc`：依赖管理。
- `spring.circular`：循环依赖。
- `spring.aop`：切面。
- `spring.mvc-path`：请求链路。
- `database.engine.acid`：事务特性。
- `database.engine.lock-range`：行锁表锁及范围。
- `java.metadata.reflection`：反射用法。
- `java.jvm.loading`：加载过程。
- `os.io-model`：阻塞非阻塞异步I/O。
- `java.concurrent.aqs`：等待队列。
- `java.concurrent.pool-path`：核心线程达到上限后的执行。
- `cache.types`：Redis类型。
- `cache.penetration`：穿透。
- `cache.stampede`：击穿。
- `cache.avalanche`：雪崩。

<a id="f008"></a>

## F008 · 美团

[美团后端开发一面面经](https://www.nowcoder.com/feed/main/detail/5a32963bf67e440bb7cbdb544e8398aa) · 未注明 · 页面显示 2024-05-16

Redis要求任选类型讲内部实现，记编码关系；没有指明具体编码。线程池只列参数不算配置取舍。

- `middleware.queue-purpose`：为何引入Kafka。
- `java.types.unboxing`：基本与包装及拆装箱。
- `java.types.interface`：接口抽象类差异。
- `cache.types`：Redis类型。
- `cache.encoding`：任选类型解释内部实现。
- `database.engine.bplus`：索引用B+树的理由。
- `database.engine.clustered`：索引存储类别。
- `database.engine.composite`：多列索引选择。

<a id="f009"></a>

## F009 · 美团

[美团面经  秋招 校招](https://www.nowcoder.com/feed/main/detail/13d0b805aef043f29be377eed0647dc2) · 校招 · 页面显示 2024-04-21

包含C++追问，亦明确问Java哈希表；按通用后端Java候选人保留。

- `network.layers`：网络分层。
- `network.transport`：传输协议区别。
- `network.handshake`：握手次数。
- `network.retransmission`：可靠传输。
- `network.request-path`：网址请求全过程。
- `os.process-thread`：进程线程。
- `java.concurrent.condition`：三线程顺序。
- `os.syscall`：用户态内核态。
- `os.multiplexing`：多路复用及epoll。
- `database.engine.composite`：联合索引命中。
- `database.engine.covering`：覆盖索引。
- `database.engine.bplus`：索引结构选择。
- `database.engine.isolation`：隔离级别实现。
- `database.engine.anomalies`：读异常。
- `cache.types`：Redis类型。
- `cache.encoding`：动态字符串内部实现。
- `algorithms.stack`：最小栈。
- `os.ipc`：进程通信。
- `os.deadlock`：死锁条件。

<a id="f010"></a>

## F010 · 腾讯

[腾讯云 Java暑期实习 一面](https://www.nowcoder.com/feed/main/detail/92db1ec558ce4ef08d64bdcc0c5942ba) · 实习 · 页面显示 2024-03-22

对象创建过程未细分为类加载，泛问GC停顿未说明诊断。

- `java.jvm.gc-algorithm`：GC方法。
- `engineering.linux-process`：服务端口不可达排查。
- `network.time-wait`：大量TIME_WAIT。

<a id="f011"></a>

## F011 · 腾讯

[腾讯-后台开发-暑期实习面经](https://www.nowcoder.com/discuss/603209336625590272) · 实习 · 页面显示 2024-04-10

仅记录明确问题，不采纳作者括号内猜测。算法LRU未指名LinkedHashMap；不映射该窄考点。

- `cache.penetration`：穿透。
- `cache.avalanche`：雪崩。
- `cache.stampede`：击穿。
- `middleware.queue-purpose`：引入MQ理由。
- `java.concurrent.monitor`：同步锁实现。
- `engineering.linux-log`：查看文件前几行。
- `engineering.linux-process`：CPU满载排查。
- `os.process-thread`：进程线程协程。
- `os.ipc`：进程通信。
- `database.engine.bplus`：数据库索引结构。
- `cache.execution`：Redis单线程。
- `network.handshake`：三次握手。
- `network.close`：四次挥手。
- `network.time-wait`：2MSL等待。
- `os.multiplexing`：多路复用。
- `network.request-path`：网址到网页。
- `security.authn-authz`：RBAC权限。
- `security.session-jwt`：JWT认证。
- `java.jvm.memory-regions`：内存区域。
- `java.jvm.gc-algorithm`：回收算法。
- `java.jvm.bytecode`：源代码到执行。
- `java.jvm.loading`：类加载过程。
- `java.jvm.delegation`：双亲委派。
- `spring.ioc`：自行实现依赖容器。
- `spring.aop`：切面原理。
- `algorithms.dp`：最大连续子数组和。

<a id="f012"></a>

## F012 · 字节跳动

[字节跳动 后端面经](https://www.nowcoder.com/discuss/674372771643764736) · 未注明 · 页面显示 2024-10-11

只记录具体披露的问题；算法、Linux、Git泛称没有可映射叶子。

- `java.concurrent.pool-path`：线程池执行流程。
- `java.concurrent.thread-state`：线程状态。
- `network.tls`：HTTPS和HTTP差异。
- `java.collections.map-resize`：HashMap扩容。
- `java.concurrent.wait-notify`：notify与notifyAll。

<a id="f013"></a>

## F013 · 字节跳动

[字节懂车帝后端日常实习一面面经【详细】](https://www.nowcoder.com/discuss/594232739134476288) · 实习 · 页面显示 2024-03-04

通用后端，面试官说明团队主要Go；Java候选人仍有Java实现考察。文中补充答案不作提问证据。

- `database.engine.acid`：事务特性。
- `database.engine.bplus`：索引结构比较。
- `database.engine.clustered`：聚簇与二级索引。
- `database.engine.composite`：多列索引条件判断。
- `database.sql.having`：全部课程及格的分组过滤。
- `cache.types`：Redis类型。
- `cache.encoding`：Hash内部实现。
- `cache.stale-write`：缓存与数据库更新顺序。
- `engineering.git-merge`：rebase原理。
- `engineering.linux-log`：日志查看搜索。
- `network.http-status`：500等状态含义。
- `design.singleton`：手写单例。
- `network.request-path`：网址请求全过程。

<a id="f014"></a>

## F014 · 字节跳动

[字节后端实习面经](https://www.nowcoder.com/feed/main/detail/e1300908ef324934a242ba7d7f885bf0) · 实习 · 页面显示 2024-12-22

仅限问句，答案里的LRU和ThreadLocal清理不扩计；支付回调故障未明确重试协议，不映射。 仅有泛泛比较、问题或替代方案的提问，不推断具体机制。

- `java.collections.map-concurrent`：HashMap与并发容器区别。

<a id="f015"></a>

## F015 · 字节跳动

[字节日常实习面经](https://www.nowcoder.com/feed/main/detail/7c49c4fa32914525a14cf925bca5958f) · 实习 · 页面显示 2024-10-20

泛问事务、LRU及算法题不反推出未披露实现；SQL分组过滤可直接定位。

- `spring.bean-lifecycle`：Bean生命周期。
- `spring.circular`：循环依赖。
- `spring.proxy-type`：两种动态代理。
- `java.concurrent.pool-path`：任务执行与线程销毁。
- `distributed.rate-limit`：限流实现。
- `java.concurrent.cas`：AtomicLong原理。
- `java.concurrent.monitor`：同步锁实现。
- `java.concurrent.lock`：显式锁与同步锁取舍。
- `cache.execution`：Redis线程及网络。
- `cache.persistence`：AOF重写。
- `design.singleton`：双重检查单例。
- `database.sql.having`：所有科目超过阈值的分组查询。

<a id="f016"></a>

## F016 · 京东

[记录面试(京东一面，11.4)](https://www.nowcoder.com/feed/main/detail/7d261a63d28c425e99ec392e7d92c1bb) · 未注明 · 页面显示 2025-11-07

AI使用、注解、Maven仅泛问，不算验证输出/注解保留策略/依赖冲突。OAuth是面试官补充回答，未计提问。 仅有泛泛比较、问题或替代方案的提问，不推断具体机制。

- `security.session-jwt`：JWT鉴权流程。
- `security.authn-authz`：访问权限控制。
- `network.websocket-sse`：WebSocket选型。
- `middleware.job-retry`：多机定时回写一致性。
- `distributed.unique-id`：雪花算法失效及替代。
- `middleware.kafka-rabbit`：两类队列选择。
- `java.jvm.memory-regions`：运行时区域。
- `java.jvm.loading`：类加载。
- `java.collections.map-concurrent`：两种Map的并发差异。
- `java.concurrent.semaphore`：许可同步工具。
- `java.concurrent.latch`：计数等待与屏障。
- `database.engine.lock-range`：数据库锁机制。
- `database.engine.bplus`：索引结构选择。
- `cache.persistence`：持久化。
- `spring.auto-config`：自定义Starter。
- `java.data-access.mybatis-path`：Mapper到SQL执行。

<a id="f017"></a>

## F017 · 京东

[京东面经已oc（可内推）](https://www.nowcoder.com/feed/main/detail/444f5f467ef44baead420c3fd10ea7b0) · 校招 · 页面显示 2025-07-28

作者本人流程；题目披露少，保留为零命中样本。并发改表的场景未提供具体约束，不能推断是丢失更新。

没有足够明确、可映射至当前考点的问题。

<a id="f018"></a>

## F018 · 京东

[京东后端oc面经（含timeline）](https://www.nowcoder.com/feed/main/detail/8e28ab8ad4b944bd82ae653a094b5aa7) · 校招 · 页面显示 2025-09-17

明确追问映射；MQ不丢失泛问不推断ACK，重复与顺序单独计数。

- `database.engine.index-use`：索引失效。
- `cache.encoding`：有序集合内部实现。
- `java.concurrent.pool-capacity`：参数配置因素。
- `java.concurrent.latch`：等待多个子任务。
- `java.concurrent.aqs`：计数器同步器原理。
- `java.collections.map-key`：自定义键约束。
- `java.types.equality`：只重写哈希方法的结果。
- `java.jvm.collector`：按停顿目标选择GC。
- `spring.tx-self-call`：事务自调用失效。
- `spring.aop`：事务增强原理。
- `spring.proxy-type`：默认代理。
- `middleware.idempotent-consumer`：避免重复消息效果。
- `middleware.ordering`：乱序到达有序消费。
- `database.engine.bplus`：索引树选择。
- `database.engine.isolation`：隔离级别作用。
- `cache.hot-big-key`：热点和大键。
- `cache.avalanche`：雪崩。
- `cache.penetration`：穿透。
- `cache.stampede`：击穿。
- `java.collections.map-concurrent`：Map线程安全。
- `os.deadlock`：死锁出现条件。

<a id="f019"></a>

## F019 · 京东

[京东零售java开发面经](https://www.nowcoder.com/feed/main/detail/95885453eaf840e7b805dd9303e32ebf) · 未注明 · 页面显示 2025-10-12

只列三个问题的选择性复盘；仍保留，零披露不代表没考。负载均衡位置未问故障实例，未记对应窄点。

- `java.concurrent.deadlock-diagnosis`：无日志时线程池死锁排查。

<a id="f020"></a>

## F020 · 京东

[京东暑期实习面经：1-2面](https://www.nowcoder.com/feed/main/detail/5d5aadba298743d4bb6140dd9096d673) · 实习 · 页面显示 2025-06-20

慢SQL泛问不推断EXPLAIN；合并k链表未指明TopK；Linux文件统计不算日志检索。

- `middleware.ordering`：消息有序性。
- `cache.types`：延迟队列的数据类型选择。
- `cache.eviction`：内存满及淘汰。
- `design.singleton`：单例实现。
- `engineering.unit-test`：为LRU写单测。
- `design.sharding`：分表方案。

<a id="f021"></a>

## F021 · 京东

[京东物流暑期实习java全程面经(已oc)](https://www.nowcoder.com/feed/main/detail/e1ded9f2c7694f8f8ccd7b5cb9a8d851) · 实习 · 页面显示 2025-05-28

未把哨兵主从泛问计入确认写丢失或Sentinel/Cluster比较。

- `database.engine.index-use`：排序分组与索引失效。
- `cache.types`：Redis数据类型。
- `distributed.rate-limit`：流控方案。
- `distributed.circuit-breaker`：熔断降级。
- `cache.stampede`：热点失效处理。

<a id="f022"></a>

## F022 · 百度

[百度提前批一面](https://www.nowcoder.com/feed/main/detail/3761e6769b0342ed8116a6bf9793faa1) · 校招 · 页面显示 2025-07-19

保留问题，剔除作者自答的技术结论。MySQL两阶段提交不等同分布式2PC；另行未映射。

- `distributed.retry`：调用失败有界重试。
- `network.tls`：TLS握手及证书。
- `network.http-versions`：新版HTTP改进。
- `database.engine.buffer-pool`：数据库缓冲池。
- `java.jvm.memory-regions`：两类栈及区域。
- `java.jvm.oom`：内存溢出区域。
- `java.jvm.collector`：CMS与G1取舍。
- `cache.atomicity`：Redis事务及Lua原子边界。
- `cache.cluster`：哨兵集群与哈希槽。
- `cache.persistence`：写后读取丢失的持久化因素。
- `cache.eviction`：内存淘汰。
- `java.jvm.loading`：类加载。
- `java.jvm.delegation`：委派查找。
- `middleware.queue-purpose`：是否需要消息队列。
- `java.concurrent.deadlock-diagnosis`：死锁排查。
- `java.jvm.cpu`：CPU飙升定位。
- `database.sql.window`：每用户最高订单与窗口函数。
- `algorithms.dp`：最长回文动态规划。

<a id="f023"></a>

## F023 · 百度

[［26秋招］百度提前批Java研发工程师 - 二面面经](https://www.nowcoder.com/feed/main/detail/a89c833b0af14d1e9e42f78a0a109bec) · 校招 · 页面显示 2025-07-22

与a456同作者同流程二面，是不同正文篇；主指标为篇数，并提供流程聚合敏感性统计。宽泛系统设计未拆分成容量估算等叶子。

没有足够明确、可映射至当前考点的问题。

<a id="f024"></a>

## F024 · 百度

[【26秋招】百度提前批Java研发工程师-面经](https://www.nowcoder.com/feed/main/detail/a456e10260bf48a683946a857c5fa0aa) · 校招 · 页面显示 2025-07-15

有社招工作经历但申请校招岗位；类型按实际招聘。流水线泛谈不等于可复现回滚。

- `spring.tx-self-call`：同类事务调用。
- `spring.proxy-type`：无接口事务代理。
- `spring.auto-config`：自动配置。
- `design.service-boundary`：微服务拆分。
- `database.engine.isolation`：隔离机制。

<a id="f025"></a>

## F025 · 百度

[百度java开发一面面经](https://www.nowcoder.com/discuss/797072111939428352) · 未注明 · 页面显示 2025-09-15

面向对象三特性泛问不算重载重写。

- `java.collections.arraylist-cost`：两类列表取舍。
- `java.collections.linkedlist-cost`：两类列表取舍。
- `java.jvm.memory-regions`：堆的分区。
- `database.engine.clustered`：聚簇索引区别。
- `database.engine.isolation`：隔离等级。
- `database.engine.anomalies`：幻读例子。
- `cache.lease-lock`：Redis锁及业务超时。
- `cache.avalanche`：雪崩。
- `cache.stampede`：击穿。
- `cache.penetration`：穿透。
- `algorithms.sliding-window`：无重复最长子串。
- `algorithms.complexity`：手撕复杂度。
- `database.sql.having`：选课人数分组筛选。

<a id="f026"></a>

## F026 · 阿里巴巴

[阿里巴巴 - Java后端实习生 - 一面](https://www.nowcoder.com/feed/main/detail/7d9cf1e7569c442fb0abfcb7e1c99b19) · 实习 · 页面显示 2025-09-19



- `java.types.interface`：接口抽象类。
- `database.engine.bplus`：索引结构。
- `database.engine.composite`：最左匹配。
- `cache.expiry`：过期清理。
- `cache.persistence`：持久化对比。
- `spring.ioc`：容器机制。
- `spring.aop`：切面机制。
- `algorithms.two-pointers`：常数空间求链表交点。

<a id="f027"></a>

## F027 · 高德

[阿里高德java实习面经](https://www.nowcoder.com/feed/main/detail/80f4b9a7a0b346ca9d2a97ee39507d04) · 实习 · 页面显示 2025-01-20

仅记录提问；项目失败泛问不等同线上故障。

- `java.collections.interfaces`：集合约束区别。
- `java.concurrent.condition`：线程顺序执行。
- `java.collections.map-resize`：扩容。
- `java.types.exception-flow`：异常处理结构。
- `java.metadata.reflection`：反射原理及边界。
- `spring.ioc`：容器原理。
- `database.engine.isolation`：隔离及默认等级。
- `database.engine.lost-update`：乐观悲观更新与版本号。
- `middleware.queue-purpose`：队列使用场景。
- `engineering.linux-log`：grep过滤。
- `algorithms.linked-list`：翻转链表。

<a id="f028"></a>

## F028 · 阿里国际

[阿里国际后端Java开发凉经（含timeline）](https://www.nowcoder.com/feed/main/detail/2a994dc58aa444f3a6f9f5085224bc28) · 校招 · 页面显示 2025-10-13

项目架构泛问、高流量改造、code review未对应清单中更具体的叶子；保留零命中。

没有足够明确、可映射至当前考点的问题。

<a id="f029"></a>

## F029 · 高德

[阿里-高德-Java项目制实习-一面面经](https://www.nowcoder.com/feed/main/detail/f6698a10992b4437a49b291258101b50) · 实习 · 页面显示 2025-04-23

主从同步泛问不算故障确认丢失。

- `database.engine.index-use`：低选择性字段索引条件。
- `cache.persistence`：集群灾难后的数据恢复。
- `java.concurrent.pool-capacity`：参数设计。
- `java.concurrent.pool-path`：提交任务和空闲核心线程。
- `java.types.string-pool`：字符串对象与常量池。
- `java.jvm.memory-regions`：静态引用及对象位置。
- `spring.ioc`：依赖容器。
- `java.concurrent.condition`：双线程交替输出。

<a id="f030"></a>

## F030 · 阿里国际

[阿里国际 研发工程师Java面经](https://www.nowcoder.com/feed/main/detail/6c5ffeb25f0c40619b571b5c7617a6ce) · 实习 · 页面显示 2025-10-09

Java研发岗位大量AI应用问题；仍保留分母，未强行归入AI生成代码验证。

没有足够明确、可映射至当前考点的问题。

<a id="f031"></a>

## F031 · 快手

[【面经】快手商业化垂直业务 Java日常实习](https://www.nowcoder.com/discuss/726371483039133696) · 实习 · 页面显示 2025-03-04

候选人有明确个人流程；末尾推荐资料不单独作为排除条件。接雨水未指定解法，不猜单调栈。

- `java.jvm.oom`：OOM原因及解决。
- `design.sharding`：分片路由及跨片查询。
- `database.engine.bplus`：索引树扇出高度。
- `database.engine.index-use`：不宜建索引条件。
- `cache.types`：类型及场景。
- `cache.stampede`：缓存击穿。

<a id="f032"></a>

## F032 · 快手

[快手 Java工程师 三面面经（已挂）](https://www.nowcoder.com/feed/main/detail/9fc64cabdf2345418410c6cf172593c2) · 未注明 · 页面显示 2025-08-15

调度算法泛问不同于上下文切换触发。DFS泛问未提访问撤销。

- `os.ipc`：通信方式取舍。
- `network.flow-congestion`：拥塞控制。
- `network.handshake`：连接次数。
- `network.close`：关闭次数。

<a id="f033"></a>

## F033 · 小红书

[小红书HR面+第三论技术面](https://www.nowcoder.com/feed/main/detail/4a275bf01f8e40c0b9ecef1f2038fdc8) · 校招 · 页面显示 2025-10-15

同作者流程第三轮技术面，有技术问题但未指具体模式；保留零命中。

没有足够明确、可映射至当前考点的问题。

<a id="f034"></a>

## F034 · 小红书

[26Java后端开发秋招小红书完整时间线timeline](https://www.nowcoder.com/feed/main/detail/a75ba034aef84e7d9a60bb6e5cfc6694) · 校招 · 页面显示 2025-09-24

技术题披露少；提示词/论文超出现有287点，仍保留零命中。

没有足够明确、可映射至当前考点的问题。

<a id="f035"></a>

## F035 · 小红书

[小红书二面](https://www.nowcoder.com/feed/main/detail/ca90967a2ea5461383fb2474c6973e8a) · 校招 · 页面显示 2025-10-15

BST差值、AVL构造不同于验证BST约束。

- `engineering.load-test`：压测与性能采样。
- `distributed.rate-limit`：滑窗和令牌桶。
- `cache.skiplist`：跳表与红黑树。
- `distributed.cap`：CAP及注册中心取舍。

<a id="f036"></a>

## F036 · 携程

[拿到携程大住宿的秘诀，我决定发出来](https://www.nowcoder.com/discuss/887021077296062464) · 校招 · 页面显示 2026-05-21

作者自述入职前流程；题目与后续建议分离。明确点名LinkedHashMap实现LRU才计该点。

- `design.architecture-decision`：项目方案取舍。
- `design.capacity`：接口QPS估计。
- `engineering.load-test`：压测。
- `algorithms.complexity`：算法时间空间。
- `java.collections.lru`：LinkedHashMap实现LRU。
- `network.transport`：TCP与UDP。
- `java.jvm.loading`：类加载。
- `spring.ioc`：容器。
- `spring.aop`：切面。
- `cache.stampede`：击穿。
- `distributed.idempotency-key`：重复下单效果。
- `cache.penetration`：穿透。
- `cache.avalanche`：雪崩。
- `cache.stale-write`：实时价格缓存一致性。

<a id="f037"></a>

## F037 · 携程

[携程Java秋招一面面经](https://www.nowcoder.com/feed/main/detail/57976407d45847839ce6fc261fc2c450) · 校招 · 页面显示 2025-12-04

数组链表直接比较计数组访问成本；Java列表未点名。

- `algorithms.array`：数组链表操作效率。
- `algorithms.stack`：队列模拟栈。
- `java.concurrent.monitor`：类对象与实例锁。
- `java.concurrent.cas`：CAS和ABA。
- `java.collections.map-collision`：树化退化阈值。
- `design.architecture-decision`：订单系统技术栈取舍。

<a id="f038"></a>

## F038 · 携程

[携程秋招Java一面](https://www.nowcoder.com/feed/main/detail/59f90d1443ae4bb9afac3bef151f7701) · 校招 · 页面显示 2026-09-14



- `cache.lease-lock`：看门狗续租。
- `database.engine.index-use`：索引失效。
- `database.engine.bplus`：数据库索引结构。

<a id="f039"></a>

## F039 · 携程

[携程暑期实习Java后端面经](https://www.nowcoder.com/feed/main/detail/308bb22d95d7462db6ba9273c15e69f7) · 实习 · 页面显示 2026-04-11

事务失效未列具体场景，不自动计自调用和回滚两点。

- `java.jvm.oom`：OOM排查。
- `database.engine.index-use`：适用索引条件。
- `java.concurrent.pool-capacity`：IO与CPU任务配置。
- `java.types.equality`：相等与哈希契约。
- `cache.hot-big-key`：Redis单点访问压力。
- `java.concurrent.virtual-thread`：虚拟线程。
- `algorithms.dp`：爬楼梯。
- `middleware.queue-purpose`：队列与线程池取舍。
- `cache.types`：Redis类型场景。
- `cache.encoding`：ZSet内部实现。
- `java.concurrent.pool-path`：核心线程创建时机。

<a id="f040"></a>

## F040 · 未披露

[【面经】2025年校招一面（java）](https://www.nowcoder.com/feed/main/detail/a03778b03a0242f49aac7ceb0bc7f690) · 校招 · 页面显示 2024-08-01

文末拼多多内推不足以确认面试公司；SQL存储页等明确问题在清单外。

- `java.jvm.loading`：类加载隔离。
- `java.types.polymorphism`：多态重载调用。
- `spring.auto-config`：自动配置。
- `spring.interception`：两种请求拦截。
- `java.data-access.jdbc-transaction`：JDBC控制事务。
- `database.engine.lock-range`：引擎锁层次。
- `database.engine.bplus`：索引页结构。
- `cache.encoding`：不同内部编码。
- `java.io.zero-copy`：复制机制。
- `design.architecture-decision`：说服他人的方案证据。
- `design.singleton`：双检单例。
- `java.concurrent.volatile`：单例发布的volatile。

<a id="f041"></a>

## F041 · 拼多多

[05.20拼多多Java后端一面分享](https://www.nowcoder.com/feed/main/detail/dec14899d44641b8a79a9eec4c91de74) · 未注明 · 页面显示 2025-05-20

密码锁定不是java.time；HashMap冲突泛问未明确树化不计。

- `java.jvm.memory-regions`：JVM区域。
- `database.engine.isolation`：事务隔离。
- `os.deadlock`：死锁。
- `algorithms.dp`：删除并获得点数。
- `algorithms.two-pointers`：两组等重量配对。

<a id="f042"></a>

## F042 · 拼多多

[拼多多Java服务端开发面经](https://www.nowcoder.com/feed/main/detail/9c03231061b84e19956890f4b8551ed7) · 校招 · 页面显示 2025-11-11

HashMap手写未给具体操作不推断查找；TreeMap结构取舍不同于比较器契约。

- `database.engine.bplus`：InnoDB索引。
- `cache.persistence`：RDB和AOF选择。
- `cache.execution`：I/O线程。
- `cache.skiplist`：跳表选择。
- `spring.aop`：切面意义。
- `spring.ioc`：容器意义。
- `engineering.git-merge`：merge与rebase。
- `algorithms.sliding-window`：子数组求和题中披露滑窗方法。

<a id="f043"></a>

## F043 · 美团

[美团-Java-到家-面经](https://www.nowcoder.com/feed/main/detail/5d453cedb1c34c7e89f3cfa29fb07979) · 校招 · 页面显示 2024-10-21

SpringBoot启动流程没有就绪探针细节，不计启动就绪叶子。

- `java.types.unboxing`：包装拆装箱。
- `java.collections.arraylist-cost`：列表取舍。
- `java.collections.linkedlist-cost`：列表取舍。
- `java.concurrent.volatile`：volatile与同步。
- `java.concurrent.pool-path`：任务执行。
- `java.jvm.loading`：加载过程。
- `java.jvm.delegation`：委派查找。
- `java.jvm.memory-regions`：运行时区域。
- `spring.ioc`：依赖容器。
- `spring.aop`：切面。
- `spring.circular`：循环依赖。
- `database.engine.bplus`：索引树。
- `database.engine.isolation`：隔离级别。
- `database.engine.explain`：执行计划。
- `database.engine.deep-page`：深分页。
- `java.jvm.leak`：泄漏排查。

<a id="f044"></a>

## F044 · 美团

[美团 - Java后端开发实习生 - 一面](https://www.nowcoder.com/feed/main/detail/565d06d34df14235929f0710a3e2085a) · 实习 · 页面显示 2025-09-19

JVM内存模型未明确JMM/运行时区域，不猜。 仅有泛泛比较、问题或替代方案的提问，不推断具体机制。

- `java.collections.map-concurrent`：Map线程安全。
- `database.engine.index-use`：索引失效。
- `cache.eviction`：数据淘汰。
- `cache.penetration`：穿透。
- `cache.avalanche`：雪崩。
- `algorithms.sliding-window`：滑窗字符串题。

<a id="f045"></a>

## F045 · 美团

[美团Java日常实习面经](https://www.nowcoder.com/feed/main/detail/3f1df06789e5449da0dbf30fb528db48) · 实习 · 页面显示 2025-12-04

MQ仅多产品调研未明确Kafka/Rabbit模型，不计对比叶子；表设计未说明多对多，不计该点。

- `distributed.idempotency-key`：连续提交去重。
- `security.session-jwt`：JWT流程及替代。
- `security.oauth`：JWT与OAuth关系。
- `middleware.idempotent-consumer`：幂等消费。
- `java.jvm.loading`：加载初始化顺序。
- `java.jvm.memory-regions`：运行时区域。
- `java.jvm.collector`：G1对比CMS。
- `spring.injection`：注入方式。
- `spring.aop`：切面原理。

<a id="f046"></a>

## F046 · 美团

[ai后端开发一面-美团实习面经分享](https://www.nowcoder.com/feed/main/detail/d49ac794f2c4424182c8e94b95a30d9e) · 实习 · 页面显示 2026-04-08

与cc2a9同题序近全文重复，保留页面日期更早的这一篇；不声称能证明谁原创。

- `java.jvm.gc-algorithm`：回收算法。
- `java.jvm.gc-pause`：频繁FullGC排查。
- `database.engine.explain`：执行计划。
- `database.engine.deep-page`：深分页。
- `database.engine.bplus`：索引结构。
- `database.engine.anomalies`：幻读处理。
- `cache.lease-lock`：看门狗。
- `cache.stale-write`：缓存数据库一致性。

<a id="f047"></a>

## F047 · 美团

[美团后端暑期实习一面面经](https://www.nowcoder.com/feed/main/detail/b73ab1c5bf934f47a50bf276b9fa154f) · 实习 · 页面显示 2026-04-03

HTTP1.1新特性不算HTTP2/3；Redis容量按资源估算记，未扩计编码细节。

- `distributed.idempotency-key`：高并发防重。
- `os.multiplexing`：多路复用。
- `java.concurrent.sleep-wait`：睡眠等待。
- `java.concurrent.pool-path`：指定参数下执行。
- `java.concurrent.pool-capacity`：耗时与线程数。
- `java.concurrent.pool-rejection`：拒绝策略。
- `spring.injection`：注入注解。
- `spring.interception`：过滤拦截链。
- `spring.proxy-type`：不同代理实现。
- `database.engine.index-write`：主键有序性写入代价。
- `middleware.ordering`：跨分区顺序消费。
- `design.capacity`：缓存内存容量估计。
- `algorithms.linked-list`：递归迭代反转。

<a id="f048"></a>

## F048 · 美团

[美团 校招 面经/时间线](https://www.nowcoder.com/discuss/597547013965737984) · 校招 · 页面显示 2024-03-13

页面2024发布，流程月份为前一秋招可能；不把发布日期当面试年份。

- `network.transport`：传输协议选择。
- `network.handshake`：握手能否携带数据。
- `java.collections.map-collision`：树化条件。
- `java.concurrent.thread-state`：线程状态。
- `java.concurrent.cancellation`：线程终止。
- `java.jvm.memory-regions`：内存区域。
- `java.jvm.reachability`：可达性判断。
- `distributed.idempotency-key`：幂等场景。
- `os.virtual-memory`：段页式分配。
- `algorithms.stack`：双栈模拟队列。
- `algorithms.tree-traversal`：指定层节点计数。

<a id="f049"></a>

## F049 · 腾讯

[《腾讯》24校招Java后端一二面面经](https://www.nowcoder.com/feed/main/detail/8682e4ae96114b588995ecad345bf31c) · 校招 · 页面显示 2024-01-16

序列化/协议常识不扩展风险叶子。

- `network.tls`：TLS防重放边界。
- `java.collections.arraylist-cost`：删除后元素移动。
- `java.collections.map-resize`：初始容量与扩容。
- `algorithms.sorting`：排序性质。
- `os.io-model`：阻塞与非阻塞。
- `network.request-path`：网址链路。
- `spring.bean-scope`：Bean共享状态线程安全。
- `java.jvm.loading`：父子类初始化。
- `java.concurrent.condition`：三线程顺序。
- `network.retransmission`：TCP可靠性边界。
- `spring.ioc`：IoC。
- `spring.aop`：AOP。
- `database.engine.composite`：复合索引。
- `database.engine.clustered`：主键与二级索引。
- `java.jvm.reachability`：GC Roots。

<a id="f050"></a>

## F050 · 字节跳动

[字节后端实习 面经 Timeline](https://www.nowcoder.com/feed/main/detail/f868bc98e5e142888523d8454f8ba886) · 实习 · 页面显示 2024-04-24

事务消息不是发件箱实现，不扩计outbox；自动登录不直接等同JWT。

- `java.jvm.delegation`：热部署打破委派。
- `middleware.ordering`：有序消费。
- `spring.auto-config`：自动配置发现。
- `spring.proxy-type`：代理差异。
- `algorithms.linked-list`：反转链表。
- `algorithms.two-pointers`：环入口定位。
- `algorithms.greedy`：分配糖果。

<a id="f051"></a>

## F051 · 字节跳动

[字节后端实习面试](https://www.nowcoder.com/feed/main/detail/ef0731a68fb147228e688036a0807f69) · 实习 · 页面显示 2024-01-22

题解中作者猜的索引类型不作为已问证据。

- `database.sql.schema-normalization`：关系范式。
- `database.sql.modeling`：多对多表。
- `database.engine.lost-update`：并发更新及乐观悲观锁。
- `algorithms.complexity`：树查找及翻转复杂度。
- `network.flow-congestion`：滑动窗口。
- `java.concurrent.semaphore`：信号量。
- `algorithms.sorting`：内存受限排序。
- `algorithms.linked-list`：K组翻转链表。

<a id="f052"></a>

## F052 · 字节跳动

[字节data后端开发 日常实习面经（已oc）](https://www.nowcoder.com/feed/main/detail/7e42815121b6451f9e00f1be3628b184) · 实习 · 页面显示 2024-12-12

Redis快泛问不把作者自答IO模型展开命中。

- `design.singleton`：单例及双检。
- `algorithms.sorting`：快排归并及外排。
- `design.pattern-factory`：工厂模式。
- `algorithms.tree-traversal`：之字层序遍历。

<a id="f053"></a>

## F053 · 百度

[百度java实习面经](https://www.nowcoder.com/feed/main/detail/d9e9025b7bd142ac82de275199050072) · 实习 · 页面显示 2025-10-09



- `cache.hot-big-key`：大键。
- `cache.expiry`：过期策略。
- `cache.cluster`：节点定位。
- `cache.types`：有序集合场景。
- `cache.encoding`：String内部结构。
- `database.engine.isolation`：RR隔离。
- `database.engine.anomalies`：幻读处理。
- `database.engine.bplus`：树高与存储量。
- `database.engine.composite`：多列排序匹配。
- `spring.bean-lifecycle`：Bean初始化。
- `database.sql.having`：下单量分组。
- `algorithms.two-pointers`：三数之和。
- `algorithms.sorting`：并行数组排序。

<a id="f054"></a>

## F054 · 百度

[百度Java开发一面面经](https://www.nowcoder.com/feed/main/detail/c328fba5ccaa4e34ad823b0261d2c416) · 未注明 · 页面显示 2025-10-12



- `java.concurrent.threadlocal-cleanup`：键值引用与残留。
- `java.jvm.reference-types`：弱引用回收。
- `java.jvm.reachability`：GC Roots选择。
- `database.engine.isolation`：隔离等级。
- `database.engine.current-read`：并发条件更新读值。
- `network.layers`：网络分层。

<a id="f055"></a>

## F055 · 阿里控股

[【面经】阿里控股爱橙科技 Java暑期实习](https://www.nowcoder.com/discuss/730542760465276928) · 实习 · 页面显示 2025-03-15



- `java.jvm.oom`：OOM排查。
- `middleware.backlog`：消费缓慢。
- `engineering.unit-test`：加法方法用例设计。
- `distributed.circuit-breaker`：熔断。
- `distributed.rate-limit`：限流。
- `spring.injection`：实现自动注入。
- `engineering.git-merge`：合并重放。
- `cache.stampede`：击穿。

<a id="f056"></a>

## F056 · 快手

[【面经】快手商业化 Java日常实习](https://www.nowcoder.com/discuss/719242991700889600) · 实习 · 页面显示 2025-02-13



- `java.jvm.memory-regions`：JVM结构。
- `java.collections.map-resize`：扩容。
- `java.concurrent.aqs`：同步器。
- `java.concurrent.lock`：两类锁场景。
- `database.engine.index-use`：索引失效。

<a id="f057"></a>

## F057 · 快手

[快手Java日常实习一面](https://www.nowcoder.com/feed/main/detail/d74d31c882ca4f5691098d0ca8a0e24e) · 实习 · 页面显示 2025-02-07

原文写子进程而非子线程，未擅自改成ThreadLocal跨线程传播。 仅有泛泛比较、问题或替代方案的提问，不推断具体机制。

- `cache.penetration`：空值缓存及新增数据。
- `cache.avalanche`：雪崩。
- `cache.stampede`：击穿。
- `os.multiplexing`：Redis的epoll。
- `java.collections.map-resize`：扩容与负载。
- `java.collections.map-lookup`：哈希寻址。
- `java.jvm.memory-regions`：堆栈。
- `database.engine.bplus`：树高与索引。
- `algorithms.bfs`：迷宫最短路径。

<a id="f058"></a>

## F058 · 快手

[快手java日常实习 已oc](https://www.nowcoder.com/feed/main/detail/44f9220501fe4a268b5f4c748df0c3d1) · 实习 · 页面显示 2024-12-22



- `cache.penetration`：穿透。
- `cache.stampede`：击穿。
- `cache.avalanche`：雪崩。
- `cache.bloom`：误判。
- `cache.atomicity`：Lua原子性。
- `cache.types`：Redis类型。
- `cache.encoding`：有序集合内部结构。
- `cache.skiplist`：跳表复杂度。
- `java.concurrent.pool-path`：任务流程。
- `database.engine.covering`：覆盖索引。
- `database.engine.bplus`：索引树容量。
- `java.types.polymorphism`：多态底层。
- `os.process-thread`：进程线程。
- `distributed.cap`：CAP。

<a id="f059"></a>

## F059 · 快手

[快手日常实习一面-本地生活-一面凉经](https://www.nowcoder.com/feed/main/detail/1f39ebcc29924d2b9836ce8e974a05a6) · 实习 · 页面显示 2025-08-29

CompletableFuture原理/泄漏未问异常组合；不计对应叶子。

- `middleware.kafka-rabbit`：队列选型。
- `cache.types`：String与Hash用途。
- `cache.penetration`：穿透。
- `cache.stampede`：击穿。
- `cache.avalanche`：雪崩。
- `cache.stale-write`：缓存一致性。
- `java.concurrent.threadlocal-cleanup`：内存泄漏。
- `database.engine.undo-redo`：两类引擎日志。
- `java.jvm.oom`：大文件OOM。
- `algorithms.backtracking`：子集枚举。

<a id="f060"></a>

## F060 · 小红书

[26届小红书秋招 timeline - 商业技术](https://www.nowcoder.com/discuss/800477245994184704) · 校招 · 页面显示 2025-11-13



- `java.concurrent.condition`：交替打印。
- `java.concurrent.monitor`：同步锁机制。
- `java.concurrent.lock`：显式锁。
- `java.concurrent.aqs`：并发队列状态。
- `spring.bean-lifecycle`：Bean生命周期。
- `java.jvm.gc-pause`：内存不降且频繁GC。
- `java.jvm.leak`：持续高内存定位。
- `distributed.rate-limit`：上下游容量悬殊保护。

<a id="f061"></a>

## F061 · 携程

[携程暑期实习 Java 一面面经](https://www.nowcoder.com/feed/main/detail/6597cfe5031448f4af608081cba27b78) · 实习 · 页面显示 2025-03-05

仅记录作者没答好的问题，属于选择性披露。

- `cache.stampede`：已经击穿的应对。
- `java.jvm.loading`：静态变量赋值时机。
- `cache.lease-lock`：多机同时持锁风险。

<a id="f062"></a>

## F062 · 携程

[携程JAVA开发线下一二面面经](https://www.nowcoder.com/feed/main/detail/d339d53f5d734cd8acd9674661c4bc78) · 未注明 · 页面显示 2025-09-13



- `database.engine.bplus`：索引树代价。
- `cache.stale-write`：缓存一致性。
- `distributed.rate-limit`：限流。
- `engineering.load-test`：压测。
- `java.concurrent.volatile`：可见与有序。
- `design.singleton`：单例方式。
- `java.jvm.escape`：对象栈上分配。
- `java.jvm.cpu`：线上CPU排查。
- `database.engine.lost-update`：数据库防超卖。
- `distributed.idempotency-key`：重复效果。
- `design.sharding`：分片方式。
- `middleware.ordering`：消息顺序。

<a id="f063"></a>

## F063 · 携程

[携程线下一面挂+面经](https://www.nowcoder.com/feed/main/detail/41558fc7e5c9442a82cb5b97cd499cac) · 校招 · 页面显示 2025-09-12



- `cache.bloom`：布隆用途。
- `middleware.queue-purpose`：验证码异步。
- `java.jvm.cpu`：高CPU排查。
- `cache.lease-lock`：Redis锁。
- `cache.hot-big-key`：大键风险。
- `cache.types`：Bitmap用途。
- `java.jvm.gc-algorithm`：回收算法。
- `java.concurrent.volatile`：原子性边界。
- `java.jvm.oom`：OOM排查。

<a id="f064"></a>

## F064 · 携程

[携程面试](https://www.nowcoder.com/feed/main/detail/a0506a5ff96f49e8b60ca9ef0401893f) · 校招 · 页面显示 2025-03-14

短链哈希冲突不是HashMap树化；高可用泛问不猜具体复制丢失。

- `middleware.queue-purpose`：队列引入代价。
- `cache.types`：使用的数据类型。
- `algorithms.stack`：括号匹配。

<a id="f065"></a>

## F065 · 腾讯

[腾讯 二面 面经 回忆版](https://www.nowcoder.com/feed/main/detail/d52aab4bb17e4106a882acb71d9c19f1) · 实习 · 页面显示 2026-04-24



- `os.process-thread`：进程与线程选择。
- `java.jvm.oom`：多进程与OOM。
- `java.jvm.leak`：资源未释放定位。
- `java.jvm.escape`：栈上分配。
- `cache.stampede`：热点失效合并请求。

<a id="f066"></a>

## F066 · 得物

[26秋招——得物Java一面](https://www.nowcoder.com/discuss/796478340562423808) · 校招 · 页面显示 2025-09-13

ES 和宽泛调优问题未扩展为未明确出现的叶子。

- `cache.stale-write`：二级缓存一致性。
- `middleware.kafka-rabbit`：三种消息队列比较。
- `middleware.queue-purpose`：消息队列应用。
- `middleware.ordering`：顺序消费与失败处理。
- `java.concurrent.pool-path`：任务进入线程池的处理逻辑。
- `java.concurrent.pool-capacity`：线程池调优。
- `java.concurrent.aqs`：AQS 原理。
- `java.concurrent.cas`：乐观锁实现及问题。

<a id="f067"></a>

## F067 · 得物

[得物秋招一面（挂）](https://www.nowcoder.com/feed/main/detail/1b3dcb85964440b794301546ed5816ea) · 校招 · 页面显示 2025-09-06

error/Exception 未细分受检异常，未映射。

- `java.jvm.reachability`：哪些对象可作为 GC Roots。
- `java.jvm.gc-algorithm`：垃圾回收算法。
- `java.jvm.collector`：垃圾收集器比较。
- `database.engine.lost-update`：优惠券防超发的乐观锁。
- `cache.lease-lock`：锁超时与死锁。
- `middleware.consumer-ack`：消费失败后的重试处理。
- `cache.stale-write`：数据库和 Redis 一致性。
- `design.singleton`：双重检查单例。
- `java.concurrent.volatile`：单例中 volatile 的作用。

<a id="f068"></a>

## F068 · 得物

[得物一面面经](https://www.nowcoder.com/discuss/819218194144448512) · 未注明 · 页面显示 2025-11-15

线程池仅参数提问，不记任务执行路径。 仅有泛泛比较、问题或替代方案的提问，不推断具体机制。

- `design.singleton`：单例实现。
- `java.concurrent.volatile`：懒汉单例 volatile。
- `spring.ioc`：BeanFactory 与 FactoryBean。
- `os.io-model`：BIO NIO AIO 区别。
- `java.collections.interfaces`：Collection 子接口。
- `java.collections.chm-update`：ConcurrentHashMap 线程安全实现。
- `java.concurrent.pool-rejection`：拒绝策略。
- `java.jvm.delegation`：findClass 与 loadClass 的区别。

<a id="f069"></a>

## F069 · 得物

[#发面经攒人品#📍面试公司：得物（毒） 🕐面试时间：一面 💻面试岗_牛客网](https://www.nowcoder.com/feed/main/detail/d6f35ef1def14b419be137fbefa833e0) · 实习 · 页面显示 2025-09-10

泛泛 ThreadLocal 底层问题未推断泄漏；仅按明确问题映射。 仅有泛泛比较、问题或替代方案的提问，不推断具体机制。

- `java.jvm.memory-regions`：对象创建涉及内存区域。
- `algorithms.binary-search`：两个有序数组的对数时间中位数。
- `database.engine.mvcc`：MVCC 隐藏字段。
- `java.collections.map-collision`：HashMap 树化阈值。
- `java.io.zero-copy`：零拷贝及 Java 手段。
- `cache.persistence`：RDB AOF 比较。
- `distributed.idempotency-key`：接口幂等方案。
- `distributed.rate-limit`：秒杀限流。
- `cache.penetration`：缓存穿透解决。

<a id="f070"></a>

## F070 · 得物

[得物Java二面](https://www.nowcoder.com/feed/main/detail/de9d4ec7213b4db3973981d35465b726) · 校招 · 页面显示 2025-09-07

只披露字符统计手撕，保留低披露样本。

没有足够明确、可映射至当前考点的问题。

<a id="f071"></a>

## F071 · 滴滴

[滴滴-Java后端日常实习-一面](https://www.nowcoder.com/feed/main/detail/5c64e6304790489e8e1f5001f547b649) · 实习 · 页面显示 2025-09-30

MQ 不丢不重同时涉及投递与消费，按问题主题记录。

- `network.retransmission`：TCP 如何保证不丢不重。
- `distributed.unique-id`：Leaf 分布式 ID 原理。
- `database.engine.current-read`：MySQL 读取是否加锁。
- `database.engine.mvcc`：MVCC 和 Read View。
- `cache.expiry`：Redis 过期实现。
- `middleware.producer-ack`：MQ 防止丢消息。
- `middleware.idempotent-consumer`：MQ 防止重复。
- `algorithms.binary-search`：最接近元素二分。
- `algorithms.two-pointers`：二分后双指针。
- `algorithms.test-boundaries`：算法边界检查。

<a id="f072"></a>

## F072 · 滴滴

[滴滴后端日常实习面经](https://www.nowcoder.com/feed/main/detail/b4697c185e8a43619037ca6d82d16b1a) · 实习 · 页面显示 2025-02-24

一二面合并为一篇。

- `distributed.idempotency-key`：一人一单实现。
- `database.engine.lost-update`：防止超卖。
- `cache.lease-lock`：Redis 分布式锁与集群安全。
- `cache.persistence`：Redis 持久化。
- `database.engine.bplus`：索引结构。
- `database.engine.covering`：覆盖索引。
- `database.engine.composite`：最左匹配。
- `database.engine.acid`：事务特性。
- `algorithms.tree-traversal`：前中序建树再后序输出。
- `distributed.consistency`：项目数据一致性。

<a id="f073"></a>

## F073 · 滴滴

[滴滴一二三面春招凉经](https://www.nowcoder.com/discuss/757405391281020928) · 校招 · 页面显示 2025-05-29

春招三轮合并一篇；只记录明确提问的主题。

- `java.collections.map-concurrent`：HashMap 线程安全。
- `java.collections.chm-update`：ConcurrentHashMap 安全实现。
- `java.jvm.memory-regions`：对象内存分配。
- `spring.aop`：AOP 实现和用途。
- `spring.proxy-type`：动态代理类型及私有方法。
- `spring.tx-self-call`：事务注解失效。
- `spring.circular`：三级缓存解决循环依赖。
- `spring.mvc-path`：MVC 执行流程。
- `database.engine.lock-range`：间隙锁及加锁语句。
- `cache.types`：Redis 类型与场景。
- `cache.stale-write`：缓存一致性。
- `cache.penetration`：缓存穿透。
- `cache.stampede`：缓存击穿。
- `cache.avalanche`：缓存雪崩。
- `cache.lease-lock`：分布式锁失败与续锁。
- `distributed.cap`：Redis 和 ZK 的 CAP。
- `cache.failover`：节点故障处理。
- `java.jvm.leak`：内存高的排查。
- `database.engine.isolation`：隔离级别。
- `database.engine.index-use`：索引失效。
- `database.engine.composite`：联合索引查询。
- `database.engine.explain`：查看 SQL 是否走索引。
- `database.engine.index-write`：全部字段建索引的代价。

<a id="f074"></a>

## F074 · 滴滴

[滴滴实习一面](https://www.nowcoder.com/feed/main/detail/e443654020ee4ac393711dff51266893) · 实习 · 页面显示 2025-12-10

订单超时处理不强行映射重试任务。

- `middleware.kafka-rabbit`：RabbitMQ 和 Kafka 选型。
- `cache.lease-lock`：分布式锁实现。
- `java.collections.map-concurrent`：HashMap 并发和环链。
- `java.collections.map-resize`：扩容后位置变化。
- `java.concurrent.pool-path`：线程池工作流程。
- `java.concurrent.pool-rejection`：拒绝策略。
- `design.architecture-decision`：实习架构演进与性能选择。

<a id="f075"></a>

## F075 · 滴滴

[滴滴校招Java后端一面凉经 35min](https://www.nowcoder.com/feed/main/detail/cc61c8cd3fd44117bc83073459add0cb) · 校招 · 页面显示 2025-12-19

与 790995822635655168 去重；原文堆方向说法不作为技术事实。

- `java.concurrent.pool-path`：线程池运行。
- `java.concurrent.pool-capacity`：线程数设置。
- `java.concurrent.lock`：synchronized 与 Lock 异常处理。
- `java.jvm.memory-regions`：运行时数据区。
- `middleware.queue-purpose`：MQ 使用目的。
- `database.engine.isolation`：数据库隔离级别。
- `cache.penetration`：缓存穿透。
- `cache.bloom`：布隆过滤器原理。
- `algorithms.heap-topk`：十万数取最小十个。

<a id="f076"></a>

## F076 · 小米

[小米Java一面](https://www.nowcoder.com/feed/main/detail/b7fc01a7c946423bbc0287132d2dbf98) · 校招 · 页面显示 2026-09-09

LLM 安全问题尚无对应叶子；泛泛线程池及 LRU 不额外细分。

- `cache.lease-lock`：分布式锁及失效。
- `database.engine.lost-update`：SQL 实现乐观更新。
- `java.concurrent.cas`：ABA 及解决。
- `distributed.idempotency-key`：项目幂等。
- `cache.avalanche`：Redis 故障时防雪崩。

<a id="f077"></a>

## F077 · 小米

[小米暑期实习面经：1-2面](https://www.nowcoder.com/feed/main/detail/e0ccb8be2934497883ca1fda93403a82) · 实习 · 页面显示 2025-06-20

两轮合并；未明确的数组题不映射。

- `database.engine.explain`：慢 SQL 与 EXPLAIN。
- `distributed.idempotency-key`：幂等使用场景。
- `cache.bloom`：缓存与布隆过滤器。
- `distributed.load-balance`：一致性哈希和负载均衡。
- `distributed.rate-limit`：限流及算法。
- `algorithms.tree-traversal`：二叉树平均高度。
- `java.concurrent.race`：静态成员和局部变量线程安全。
- `distributed.circuit-breaker`：RPC 雪崩降级。
- `spring.ioc`：控制反转。
- `spring.injection`：依赖注入。
- `spring.bean-lifecycle`：Bean 生命周期。
- `algorithms.sliding-window`：最长无重复子串。
- `algorithms.dp`：打家劫舍及空间优化。

<a id="f078"></a>

## F078 · 小米

[小米秋招面经java方向软件开发一面](https://www.nowcoder.com/feed/main/detail/fd28d3a92d3c45c998b22cce8c76e9c3) · 校招 · 页面显示 2025-11-08

HashMap/CHM 区别没有展开并发机制，不计 chm-update。

- `network.websocket-sse`：WebSocket 通信与消息确认。
- `database.engine.bplus`：InnoDB 选择 B+树。
- `database.sql.schema-normalization`：第三范式。
- `spring.mvc-path`：Spring 请求流程。
- `spring.bean-lifecycle`：构造注入和初始化顺序。
- `java.jvm.loading`：静态代码与构造顺序。
- `distributed.load-balance`：一致性哈希。
- `java.concurrent.pool-path`：线程池工作及核心线程创建。
- `engineering.latency`：慢接口排查。
- `algorithms.stack`：有效括号。
- `design.singleton`：手写单例。

<a id="f079"></a>

## F079 · 小米

[小米秋招一面](https://www.nowcoder.com/feed/main/detail/1c0765abfc8f49719a9494dfb4869383) · 校招 · 页面显示 2025-09-05

只有名称的 HashMap、CHM、线程池参数未细分。

- `middleware.queue-purpose`：使用 MQ 原因。
- `java.collections.iterator`：foreach 删除异常。
- `database.engine.bplus`：B+树与 B树。
- `database.engine.composite`：联合索引。
- `design.sharding`：分库分表。
- `cache.types`：Redis 类型。
- `cache.stale-write`：Redis 数据一致性。
- `cache.persistence`：持久化。
- `java.concurrent.wait-notify`：线程间通信。
- `java.jvm.gc-algorithm`：垃圾回收算法。

<a id="f080"></a>

## F080 · 招银网络科技

[招银网络科技 一面](https://www.nowcoder.com/feed/main/detail/8d9d00ddfcef42fca92c8b528c756988) · 未注明 · 页面显示 2025-09-09

只有一般 Redis 用途不扩展全部缓存考点。

- `database.sql.modeling`：数据库表设计。
- `database.engine.acid`：事务 ACID。
- `database.engine.isolation`：隔离级别。
- `algorithms.binary-search`：搜索旋转排序数组。
- `algorithms.test-boundaries`：替换数据集运行测试。

<a id="f081"></a>

## F081 · 招银网络科技

[招银网络科技面经](https://www.nowcoder.com/feed/main/detail/cdca3a0ab06746fcacaa1af550ca7df1) · 校招 · 页面显示 2026-09-16

合并三轮；BigDecimal 仅用途没有构造精度，不计 money。

- `cache.bloom`：布隆过滤器优化。
- `distributed.rate-limit`：令牌桶与突发流量。
- `algorithms.binary-search`：查找数组峰值。

<a id="f082"></a>

## F082 · 招银网络科技

[招银网络一面面经](https://www.nowcoder.com/discuss/794905333473746944) · 未注明 · 页面显示 2025-09-09

行列存区别暂无对应叶子。

- `java.concurrent.pool-path`：线程池处理流程。
- `java.concurrent.pool-rejection`：拒绝策略。
- `cache.stampede`：击穿与穿透区别。
- `cache.penetration`：击穿与穿透区别。
- `middleware.producer-ack`：Kafka 生产不丢消息。
- `middleware.consumer-ack`：Kafka 消费不丢消息。

<a id="f083"></a>

## F083 · 招银网络科技

[招银科技_Java_面经](https://www.nowcoder.com/discuss/741956212241051648) · 校招 · 页面显示 2025-05-12

三轮合并；SQL #/$ 问题按参数绑定映射。

- `design.pattern-factory`：抽象工厂与普通工厂。
- `spring.aop`：AOP 场景与通知。
- `database.engine.composite`：最左前缀。
- `cache.avalanche`：Redis 集群宕机降级。
- `java.concurrent.race`：数据汇总线程安全。
- `database.sql.aggregate`：SQL 聚合。
- `security.authn-authz`：RBAC 权限与角色。
- `database.engine.long-tx`：长事务排查。
- `database.engine.deadlock`：避免数据库死锁。
- `spring.tx-propagation`：事务传播。
- `java.data-access.mybatis-binding`：SQL 参数占位差异。

<a id="f084"></a>

## F084 · 招银网络科技

[招银网络科技一面面经](https://www.nowcoder.com/feed/main/detail/958948924cc04a35841aaf00eef02a15) · 校招 · 页面显示 2025-09-12

判断节假日手撕未指定 java.time API 或时区，不记 time-zone。

- `network.layers`：五层网络模型。
- `spring.tx-propagation`：事务传播。
- `java.concurrent.race`：线程安全理解。
- `os.deadlock`：死锁预防。
- `middleware.backlog`：Kafka 堆积。
- `distributed.circuit-breaker`：Kafka 宕机降级。
- `design.architecture-decision`：DDD 选择依据。

<a id="f085"></a>

## F085 · 哔哩哔哩

[B站-8.18-java一面](https://www.nowcoder.com/feed/main/detail/a892644c98484e57855f281afd454b02) · 校招 · 页面显示 2026-08-21

项目泛问不扩展；明确有 AI 代码审查。

- `java.concurrent.race`：Java 线程安全。
- `java.collections.map-concurrent`：HashMap 非线程安全及解决。
- `engineering.ai-validation`：AI 代码审查与难点。

<a id="f086"></a>

## F086 · 哔哩哔哩

[B站 秋招面经](https://www.nowcoder.com/feed/main/detail/8debab3aa2194419afba93530df27336) · 校招 · 页面显示 2025-12-28

两轮合并；LinkedHashMap 只问原理，未推断 LRU。

- `java.types.interface`：抽象类与接口。
- `java.collections.arraylist-cost`：ArrayList 与 LinkedList。
- `java.collections.linkedlist-cost`：ArrayList 与 LinkedList。
- `java.collections.chm-update`：CHM 线程安全。
- `java.concurrent.latch`：等待两个并发任务完成。
- `java.jvm.loading`：类加载机制。
- `java.jvm.reachability`：判断对象可回收。
- `java.jvm.gc-algorithm`：常见 GC 算法。
- `network.request-path`：URL 到页面的过程。

<a id="f087"></a>

## F087 · 虾皮

[虾皮秋招面经](https://www.nowcoder.com/feed/main/detail/9845c8654d894d9bb98ec0b1216e46b1) · 校招 · 页面显示 2025-08-22

两轮合并；短链设计按明确追问映射，不替源文补足设计。

- `java.collections.map-collision`：HashMap 引入红黑树。
- `network.request-path`：URL 访问过程。
- `network.tls`：HTTPS 安全与密钥。
- `design.pattern-factory`：工厂模式。
- `os.deadlock`：死锁条件。
- `database.sql.schema-normalization`：数据库范式。
- `database.engine.acid`：事务特性及实现。
- `database.engine.isolation`：隔离级别。
- `design.service-boundary`：微服务及拆分原因。
- `distributed.cap`：CAP。
- `distributed.replication`：分片和副本差异。
- `network.http-status`：短链跳转状态码。
- `distributed.unique-id`：短链雪花 ID。
- `algorithms.linked-list`：重排链表。
- `java.jvm.memory-regions`：JVM 内存划分。
- `java.jvm.oom`：模拟内存及栈溢出。
- `java.jvm.gc-algorithm`：GC 算法优缺点。
- `java.jvm.collector`：GC 收集方法。

<a id="f088"></a>

## F088 · 虾皮

[虾皮 实习 一面](https://www.nowcoder.com/feed/main/detail/162139952d814d8382724ddb5de4d2ba) · 实习 · 页面显示 2026-05-29

手写 LRU 未指定 LinkedHashMap；慢查询泛问不推断 EXPLAIN。

- `database.sql.modeling`：建表注意事项。
- `database.engine.composite`：联合索引。
- `cache.types`：Redis 类型和场景。
- `network.tls`：HTTPS 加密。
- `network.http-method`：GET 与 POST。

<a id="f089"></a>

## F089 · 虾皮

[虾皮Shopee Java后端 二面面经](https://www.nowcoder.com/feed/main/detail/9e6f7f5086204ee68be748eaf7843fa5) · 校招 · 页面显示 2025-04-23

服务不通排查未具体到超时或延迟，未映射。

- `java.collections.blocking-queue`：阻塞队列生产消费者实现。

<a id="f090"></a>

## F090 · 虾皮

[虾皮Shopee后端一面面经（已过）](https://www.nowcoder.com/discuss/797557590015098880) · 未注明 · 页面显示 2025-09-16

后端经历未明确语言，问题与 Java 路径共享基础相关；标未注明招聘类别。 仅有泛泛比较、问题或替代方案的提问，不推断具体机制。

- `network.handshake`：三次握手。
- `network.close`：四次挥手。
- `network.retransmission`：挥手未收到确认。
- `engineering.linux-log`：awk 与 sed。

<a id="f091"></a>

## F091 · 虾皮

[虾皮Shopee一面凉经（已挂）](https://www.nowcoder.com/feed/main/detail/c1bfabf419dc4db9bda8ea067d5fc9e3) · 校招 · 页面显示 2025-10-21

JMM 与笼统 GC 未细分；数据库锁回忆不完整不计范围题。

- `cache.types`：Redis 类型及排行榜。
- `cache.cluster`：Redis 集群。
- `cache.failover`：哨兵选主。
- `cache.stale-write`：数据库缓存双写一致。
- `database.engine.lost-update`：乐观锁防超卖。
- `cache.bloom`：布隆过滤器原理及限制。
- `cache.penetration`：穿透场景。
- `java.concurrent.lock`：synchronized 与 ReentrantLock。
- `database.engine.isolation`：隔离级别。
- `database.engine.mvcc`：MVCC。
- `algorithms.linked-list`：K组反转链表。

<a id="f092"></a>

## F092 · 虾皮

[虾皮一面](https://www.nowcoder.com/feed/main/detail/9d5315121fff4a4382bc3fdb20817da2) · 校招 · 页面显示 2025-08-03

泛后端共享基础题，正文未明确语言；LRU 未指定 LinkedHashMap。

- `cache.types`：Redis 类型。
- `network.time-wait`：大量 TIME_WAIT。
- `engineering.linux-process`：CPU 高排查。
- `database.engine.bplus`：索引树与哈希比较。
- `database.engine.composite`：联合条件索引设计。
- `algorithms.heap-topk`：大文件前百大数。
- `distributed.load-balance`：负载均衡算法。
- `security.session-jwt`：Cookie 和 Session。
- `cache.bloom`：布隆过滤器场景。
- `network.retransmission`：TCP 可靠性。
- `os.deadlock`：死锁形成。
- `os.virtual-memory`：虚拟内存。
- `cache.stale-write`：缓存数据库一致性。
- `algorithms.graph-model`：矩阵岛屿连通块。

<a id="f093"></a>

## F093 · 顺丰

[顺丰Java后端开发三轮面试吐槽与面经](https://www.nowcoder.com/feed/main/detail/af95eb0d1f4e42d1ba3bf9e05f44f700) · 校招 · 页面显示 2025-10-15

三轮合并；Mongo迁移无专门叶子，不计 MySQL 复制延迟。

- `cache.local-cache`：多级缓存设计与同步。
- `distributed.consistency`：强一致需求。
- `design.sharding`：水平垂直分库。
- `network.tls`：HTTP HTTPS 区别。
- `cache.types`：Redis 数据结构。
- `java.concurrent.volatile`：volatile 作用。

<a id="f094"></a>

## F094 · 顺丰

[10.13 顺丰一面（铁KPI）](https://www.nowcoder.com/feed/main/detail/97ee6b56db9847a09c179250848bb7dc) · 校招 · 页面显示 2025-10-27

缓存三件套按明确惯用三类统计；项目压测明确。

- `engineering.load-test`：压测目标和复现。
- `engineering.observability`：压测时观察服务器性能。
- `design.capacity`：组件并发上限。
- `cache.failover`：哨兵场景。
- `cache.cluster`：集群场景。
- `cache.penetration`：缓存三类问题。
- `cache.stampede`：缓存三类问题。
- `cache.avalanche`：缓存三类问题。

<a id="f095"></a>

## F095 · 顺丰

[顺丰一面面经](https://www.nowcoder.com/discuss/808784185891545088) · 未注明 · 页面显示 2025-10-17

ES 数据同步不等同搜索刷新机制。

- `database.engine.index-use`：索引失效。
- `database.engine.composite`：联合索引。
- `java.types.interface`：接口抽象类。
- `java.types.polymorphism`：多态及使用。
- `java.types.equality`：hashCode 和 equals。
- `cache.stampede`：缓存击穿。
- `cache.penetration`：缓存穿透。
- `cache.avalanche`：缓存雪崩。

<a id="f096"></a>

## F096 · 去哪儿

[去哪儿Java一面挂](https://www.nowcoder.com/feed/main/detail/fa8868c838024a41bbd9858804869498) · 校招 · 页面显示 2025-09-25

个人面试经历但没有披露具体题目，保留为零命中样本。

没有足够明确、可映射至当前考点的问题。

<a id="f097"></a>

## F097 · 去哪儿

[去哪儿 AI应用开发（Java方向）一面面经~](https://www.nowcoder.com/feed/main/detail/549b162c98c2492f8fabc044cfea326d) · 未注明 · 页面显示 2026-09-16

Java 与 AI 应用混合岗位；宽泛八股没有具体题目，只有转账手撕可映射。

- `os.deadlock`：转账模块避免死锁。

<a id="f098"></a>

## F098 · 菲尼基科技

[菲尼基科技 java 一面面经（校招）base深圳](https://www.nowcoder.com/feed/main/detail/0402488306cf48a8b8e6d51f24d4311a) · 校招 · 页面显示 2025-05-15

保留基础题；位数和中断无对应叶子。

- `network.layers`：网络模型分层及 TCP HTTP。
- `algorithms.sorting`：常见排序算法。
- `java.jvm.gc-algorithm`：JVM 垃圾回收算法。
- `engineering.linux-process`：查询端口占用。

<a id="f099"></a>

## F099 · 度小满

[度小满Java一面](https://www.nowcoder.com/discuss/799245179839430656) · 校招 · 页面显示 2025-09-21

CHM 红黑树追问不转算 HashMap 树化题。 仅有泛泛比较、问题或替代方案的提问，不推断具体机制。

- `spring.startup`：Spring 启动。
- `spring.ioc`：Bean 扫描。
- `spring.bean-scope`：单例多例。
- `design.singleton`：两种单例实现。
- `java.concurrent.volatile`：volatile。
- `java.concurrent.monitor`：synchronized 可重入及升级。
- `java.concurrent.cas`：CAS。
- `java.collections.map-concurrent`：HashMap 线程安全。
- `java.collections.chm-update`：CHM 实现。
- `java.concurrent.pool-path`：提交任务流程。
- `java.concurrent.pool-rejection`：拒绝策略。
- `cache.types`：Redis 数据结构。
- `cache.stampede`：缓存击穿。
- `cache.penetration`：缓存穿透。
- `cache.avalanche`：缓存雪崩。
- `cache.bloom`：布隆过滤器。
- `cache.lease-lock`：分布式锁与看门狗。
- `network.handshake`：三次握手。
- `network.close`：四次挥手。
- `network.transport`：TCP UDP。
- `spring.injection`：注入方式与多 Bean 选择。
- `java.jvm.gc-algorithm`：GC 算法优缺点。
- `java.jvm.generational`：新老代收集算法。
- `algorithms.linked-list`：反转链表。

<a id="f100"></a>

## F100 · 度小满

[度小满一面](https://www.nowcoder.com/feed/main/detail/41baab8c631647568203ebfaf3898574) · 校招 · 页面显示 2026-09-19

AI 项目问题未映射到传统后端叶子；写时复制未指定 Java 集合，未计 COW集合。

- `cache.stale-write`：Redis MySQL 一致性。
- `distributed.idempotency-key`：支付幂等。
- `distributed.rate-limit`：限流与令牌桶漏桶。
- `distributed.circuit-breaker`：熔断降级。
- `database.engine.anomalies`：脏读不可重复读幻读。
- `database.engine.lock-range`：间隙锁。
- `database.engine.binlog`：MySQL 主从复制。
- `cache.persistence`：Redis 持久化。
- `network.handshake`：握手。
- `network.close`：挥手。
- `network.time-wait`：挥手后的等待。
- `network.retransmission`：序列号与 ACK。
- `network.flow-congestion`：滑动窗口。
- `network.framing`：粘包半包。
- `network.websocket-sse`：SSE 与 WebSocket。
- `os.ipc`：进程通信。
- `algorithms.linked-list`：重排链表。

<a id="f101"></a>

## F101 · 同花顺

[同花顺面经](https://www.nowcoder.com/feed/main/detail/4504b5f4a93b46c6a4b56383242c8c7e) · 实习 · 页面显示 2025-12-26

一二面合并；慢 SQL 泛问未推断 EXPLAIN。

- `cache.stale-write`：数据库缓存不一致。
- `cache.encoding`：Redis 底层数据结构。
- `cache.skiplist`：跳表。
- `cache.execution`：Redis 快的原因。
- `cache.penetration`：缓存三类问题。
- `cache.stampede`：缓存三类问题。
- `cache.avalanche`：缓存三类问题。
- `cache.bloom`：布隆过滤器。
- `database.engine.isolation`：事务隔离级别。
- `database.engine.mvcc`：可重复读保证。
- `database.engine.index-use`：索引失效。
- `algorithms.sorting`：快排和稳定性。

<a id="f102"></a>

## F102 · 同花顺

[7.15 同花顺实习一面](https://www.nowcoder.com/feed/main/detail/30efbf6cc48c416d90e40f09b6dbc810) · 实习 · 页面显示 2025-07-19

题目允许 AI 并要求解释，未声称考察代码验证；算法题未披露。

- `cache.types`：积分排行榜 ZSet。
- `cache.cluster`：集群部署。
- `cache.failover`：主从哨兵。
- `design.pattern-strategy`：策略模式。
- `design.singleton`：单例。

<a id="f103"></a>

## F103 · 穗彩科技

[穗彩科技 java 一面面经（校招）base深圳](https://www.nowcoder.com/feed/main/detail/0157b468b0cc41ba99556a7632f981a8) · 校招 · 页面显示 2025-05-09

请求去重场景明确包括重试与长期重复；不依据回答补充未问技术。

- `cache.atomicity`：Redis Lua 原子性。
- `middleware.queue-purpose`：MQ 与直接数据库比较。
- `middleware.consumer-ack`：消费失败重试与死信。
- `security.session-jwt`：JWT 校验及退出。
- `distributed.idempotency-key`：请求 ID 去重。
- `distributed.consistency`：最终一致性。
- `middleware.idempotent-consumer`：重复消费。
- `database.engine.bplus`：B+树。
- `database.engine.clustered`：聚簇与非聚簇。
- `database.engine.index-use`：低选择性索引及全表扫描。
- `database.engine.deep-page`：大分页优化。
- `distributed.unknown-result`：响应丢失后重试的结果判定。
