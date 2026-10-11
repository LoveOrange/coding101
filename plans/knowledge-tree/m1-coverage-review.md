# M1 知识点覆盖检查

当前已有 Java、通用基础、系统设计、AI 应用与 Agent 的知识分纲，以及 Java 岗位路线和校招研究映射；主要缺口是知识点粒度、部分核心能力的显式入口，以及正文质量。M1 先按 Java 后端校招整理，完整候选清单见[M1 Java 校招知识点清单](./m1-knowledge-points.md)。本文是范围审核结果，文章补写、卡片答案和运行时模型尚未实施。

## 1. 检查口径

检查对象包括四份知识分纲、Java 路线全部 42 个主题、核心阅读映射、20 条 JD、20 组面经主题，以及仓库正文的标题、章节与相关段落。扫描到 320 个 Markdown/MDX 文档，其中 35 个带有 `knowledge` 元数据；数量包含导航、草稿和求职资料，不能当作合格文章数。路线、知识元数据和题目索引尚未组成统一的原子知识点模型。

正文做了全库标题与关键词检索，并定向阅读高风险或疑似缺失内容，包括 Redis 数据结构、TCP、数据库事务、MyBatis、条件等待、Git、JDBC 关联文章及 HashMap 样例。没有逐篇逐段完成所有技术事实审校，也未重新核验全部招聘与面经原帖。

招聘要求和面经采用[来源台账](../audits/java-campus/research-sources.json)保存的研究结果。台账包含一条未核验面经 I06；本次不将其作为支持结论的样本。资料的时间与可访问性限制沿用[研究说明](../java-campus-weekend-plan.md)。优先级是针对岗位的编辑取舍，不是市场频率统计。另有[103 篇面经的逐考点统计](../audits/java-campus/frequency/README.md)，为全部 287 项补充样本出现率；它与旧台账分开维护，不将两批分母混合。

“覆盖完整”在本阶段表示：M1 岗位所需方向有显式知识点、原主题有去向、来源暴露的能力有承接或明确排除。它不表示覆盖全部计算机知识、所有校招公司题目或全部深度追问。

## 2. 候选范围

共 287 个候选知识点：129 个必会、120 个常考、38 个按岗选学。每项都有稳定 ID、检验问题、停止条件、岗位优先级、回答深度和正文候选或缺口。首轮最小范围以必会项为起点，审核时仍可合并或降级，不能把全部候选项自动变成首轮任务。

| 分组 | 必会 | 常考 | 按岗选学 | 清单入口 |
| --- | ---: | ---: | ---: | --- |
| Java 类型与对象 | 10 | 4 | 0 | [查看知识点](./m1-knowledge-points.md#java.types) |
| Java 泛型与函数式编程 | 1 | 7 | 3 | [查看知识点](./m1-knowledge-points.md#java.metadata) |
| Java 集合 | 7 | 11 | 2 | [查看知识点](./m1-knowledge-points.md#java.collections) |
| Java 并发与任务执行 | 10 | 13 | 2 | [查看知识点](./m1-knowledge-points.md#java.concurrent) |
| JVM 与运行诊断 | 5 | 8 | 4 | [查看知识点](./m1-knowledge-points.md#java.jvm) |
| Java I/O | 0 | 4 | 1 | [查看知识点](./m1-knowledge-points.md#java.io) |
| Spring 框架 | 9 | 9 | 0 | [查看知识点](./m1-knowledge-points.md#spring) |
| Java 数据访问 | 5 | 2 | 2 | [查看知识点](./m1-knowledge-points.md#java.data-access) |
| 数据结构与算法 | 21 | 3 | 4 | [查看知识点](./m1-knowledge-points.md#algorithms) |
| 操作系统 | 9 | 4 | 1 | [查看知识点](./m1-knowledge-points.md#os) |
| 计算机网络与 HTTP | 10 | 7 | 1 | [查看知识点](./m1-knowledge-points.md#network) |
| 关系模型与 SQL | 6 | 4 | 0 | [查看知识点](./m1-knowledge-points.md#database.sql) |
| MySQL 索引与事务 | 14 | 7 | 0 | [查看知识点](./m1-knowledge-points.md#database.engine) |
| 缓存与 Redis | 10 | 8 | 2 | [查看知识点](./m1-knowledge-points.md#cache) |
| 消息与搜索 | 0 | 6 | 3 | [查看知识点](./m1-knowledge-points.md#middleware) |
| 分布式一致性与可靠性 | 1 | 10 | 4 | [查看知识点](./m1-knowledge-points.md#distributed) |
| 工程基础与验证 | 9 | 6 | 0 | [查看知识点](./m1-knowledge-points.md#engineering) |
| 认证与应用安全 | 2 | 4 | 2 | [查看知识点](./m1-knowledge-points.md#security) |
| 设计能力与岗位选学 | 0 | 3 | 7 | [查看知识点](./m1-knowledge-points.md#design) |

这份清单中的正文状态为：247 项找到候选解释但待逐点核验，24 项需要补充，12 项暂缺直接承接的主题正文，4 项涉及已发现的纠错问题。同一篇文章可能承接多个缺口，所以这些数量不能转换为需要新写的文章篇数。

## 3. 结构和范围调整

| 检查发现 | 本次范围处理 | 下一步处理 |
| --- | --- | --- |
| 现有叶子常是线程池、事务、泛型等文章级概念 | 按独立可判定问题拆出知识点，并给出停止条件 | 核定后接入稳定 ID 与卡片模型 |
| HashMap 在必会集合和常考专题重复出现 | 查找、键约束、扩容和并发安全列为基础重点；树化与 LRU 单列追问 | 两个路线入口引用相同知识点，不复制题库 |
| 基础测试在 F16 分纲列为必会，在线 `java-quality` 却整体按岗选学 | 单元测试、测试范围及基本构建单独列为必会；进阶 API 设计按需 | 在知识点级别设置岗位要求，不整体提升所有质量文章 |
| java.time 时区边界没有近期主样本命中，补充来源只明确问 API 认知 | `java.metadata.time-zone` 列为按岗选学，保留正文与知识点 | 时间处理、跨时区项目或 JD 明确涉及再深入 |
| 泛型整个主题为常考，但集合 API 需要基本类型关系 | 泛型不变性列为前置必会；擦除与反射等保留常考 | 集合路线能直接补充必要前置 |
| JDBC 在 J11 分纲出现，却缺少完整基础阅读入口 | 拆出 JDBC 查询生命周期与事务控制；归 Java 数据访问 | 使用最小 JDBC 示例补齐，避免让初学者从 MyBatis 反推基础 |
| Git、Linux、AI 输出验证在 JD 中明确出现，但技术树叶子不充分 | 明确基本 Git、进程与日志操作、AI 代码验证考点 | 保留实际操作要求，避免只做名词记忆卡 |
| SQL 排名、日志恢复、进程通信等已见于分纲或样本，正文深度不足 | 显式列为补充或缺失，限定优先级 | 按停止条件补最小解释，不扩成完整运维课程 |
| 分布式与架构内容较多，容易扩大校招必会范围 | 基础失败认知进入必会；具体协议和完整设计保留常考或选学 | 由 JD 和个人项目决定选学项，不强制完成所有架构主题 |

## 4. 内容缺口与处理顺序

### 4.1 先修正会影响答案的已有内容

| 内容 | 具体问题 | 处理边界 |
| --- | --- | --- |
| [Redis 数据结构](../../docs/basic-knowledge/nosql/redis/data_structure.mdx) | 将字符串内部结构概括为 HashTable；列表编码说明只围绕 ZipList；将有序集合无条件等同跳表；将 O(log n) 与 O(n) 的比较写反 | 核对类型与编码层次，限定目标 Redis 版本，删去未经验证的实现常量；不要照搬进闪卡 |
| [TCP 与 UDP](../../docs/basic-knowledge/network/tcp_udp.mdx) | 将 Sequence Number 描述为收到的数据包序号，将确认号描述为下一数据包序号 | 按字节序号、累计确认与重传解释，再补充流量控制和拥塞控制的区别 |

Redis 官方说明同一种类型可有多种编码，字符串包括 raw、int、embstr，列表和有序集合还受版本及规模影响，不能把类型直接等同唯一结构。[Redis OBJECT ENCODING](https://redis.io/docs/latest/commands/object-encoding/)

TCP 的序列号按数据字节编号，确认号指出期望接收的下一个序号；SYN/FIN 也占用序号空间。[RFC 9293 第 3.1 与 3.4 节](https://www.rfc-editor.org/rfc/rfc9293.html#section-3.4)

本次只登记问题和验收要求，不修改技术正文；文章阶段先处理这两篇，再制作对应卡片。

### 4.2 补齐必会能力所需的解释

| 知识点 | 现有材料与差距 | 建议处理 |
| --- | --- | --- |
| `java.data-access.jdbc-flow`、`java.data-access.jdbc-transaction` | MyBatis、批处理和 Spring 事务中已有 JDBC 片段，缺少基础对象和完整生命周期 | 补 JDBC 基础文章，覆盖查询、参数绑定、提交回滚与关闭；连接池引用此基础 |
| `os.ipc` | 进程线程说明共享与隔离，未充分比较主要 IPC 方式 | 先补进程通信的最小对比与同步责任，按篇幅决定是否拆文 |
| `network.http-method`、`network.http-status` | HTTP 主文重心是版本与连接；错误契约只承接部分响应语义 | 补方法语义、常见状态码与请求响应结构，作为版本比较的前置 |
| `engineering.linux-process`、`engineering.linux-log` | 已有排障思路与可观测性，缺少可执行的基础操作练习 | 补进程、端口、日志筛选的小任务与输出解释，不建设 Linux 管理大全 |

Java 官方 JDBC 基础教程按连接、语句、结果集、参数化查询和事务组织，支持把 JDBC 作为框架前置的编辑安排；教程本身面向 JDK 8，示例实现时再按项目目标版本核验。[JDBC Basics](https://docs.oracle.com/javase/tutorial/jdbc/basics/index.html)

### 4.3 常考补充和选学缺口

| 方向 | 已显式列入的缺口 | 处理方式 |
| --- | --- | --- |
| JVM | 标记清除、复制、整理的基础比较 | 从现有收集器文章抽取共同原理，避免要求先学完整收集器 |
| SQL 与模型 | 子查询、窗口排名、规范化与多对多约束 | 补查询数据集、结果与边界；优先窗口排名和存在性查询 |
| MySQL | undo/redo/binlog 职责、Buffer Pool 与刷盘、MySQL 复制延迟 | 原有事务文章只覆盖部分职责；按独立概念补解释，避免合成超长引擎文章 |
| 算法 | 单调栈、区间合并；快速幂、并查集和 Trie 按岗 | 新建算法主题或补已有主题；现有单题题解可作练习，不代替主题组织 |
| 网络与操作系统 | 接收窗口与拥塞窗口、页缓存；WebSocket/SSE 按岗 | 先补可推导的基本边界，按协议和访问模型拆分 |
| 安全 | XSS、CSRF、CORS 的攻击或浏览器边界 | 从身份和输入处理材料扩展，不把 CORS 等同鉴权 |
| 工程与设计 | cherry-pick、压测、策略模式、工厂、单例边界 | 按 JD 与项目说明使用条件，保持最小操作或设计示例 |
| 缓存与分布式 | 布隆过滤器、负载均衡、分布式 ID | 明确误判、失败和时钟约束；避免只背方案名称 |

MySQL 官方手册分别组织内存结构、日志、事务锁和复制，支持将这些知识点分开建设。[MySQL 8.4 InnoDB](https://dev.mysql.com/doc/refman/8.4/en/innodb-storage-engine.html)

### 4.4 已有正文可以复用的内容

- Git 的三个区域、merge/rebase、冲突和撤销已有正文，缺少独立操作文章不等于没有相关知识。
- `wait` 的条件重查可结合操作系统同步和 Java 线程、锁文章解释；先定位章节，不因缺少同名文章新增一篇。
- MyBatis 一级与二级缓存已有简述，进入候选复核，不能直接宣称完全缺失。
- Redis 热点与大 key 已在缓存异常文章中出现；持久化、复制、Sentinel、Cluster 同样已有合篇，后续决定是否拆分。
- HTTP 缓存、IP、不可变对象、SQL 约束等正文已经存在，应补入知识点关系，不重复生产。

## 5. 一个知识点的完整评审样例

| 字段 | 内容 |
| --- | --- |
| ID | `java.collections.map-key` |
| 领域与主题 | Java → 集合 → HashMap 键约束 |
| 学习目标 | 能判断自定义对象是否适合作为 HashMap 的 key，并解释影响相等性或哈希的状态改变带来的问题 |
| 检验问题 | 自定义对象作为 HashMap 的 key，需要满足哪些约束？ |
| 岗位要求 | Java 后端校招：必会，原理解释 |
| 前置知识点 | `java.types.equality`、`algorithms.hash` |
| 停止条件 | 解释相等对象哈希相同、碰撞不代表相等，以及相关字段入表后应保持稳定；能推导一个状态修改后的查询例子 |
| 回答边界 | 不要求回答扩容、树化阈值或线程安全；不可变对象是设计建议，不能把“整个对象绝对不可变”说成所有 key 的强制条件 |
| 岗位证据 | 台账 I08 明确记录自定义键约束；沿用已存研究，不将同组所有公司关联到此题 |
| 当前状态 | 三篇文章已定位相关章节；卡片、示例验证和单题来源最终复核待实施 |

| 文章 | 关联目的与具体章节 |
| --- | --- |
| [HashMap](../../docs/basic-knowledge/java/collections/hashmap-structure-lookup-path.mdx#2-equals-与-hashcode) | 回答依据：键比较与哈希；需要查找背景时读第 1 节 |
| [对象相等性](../../docs/basic-knowledge/java/language/equals-hashcode-object-identity.mdx) | 补充前置：相等性契约与 hashCode 约束 |
| [不可变对象](../../docs/basic-knowledge/java/quality/immutable-objects-defensive-copying.mdx#4-不可变类的设计条件) | 深入阅读：保持对象状态稳定和防御性复制 |

Java Map API 明确提示，可变键在映射期间改变影响 equals 比较的状态会使映射行为失去约定保证；这一点支持上述回答边界。[Java 21 Map API](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Map.html)

## 6. 现有路线主题的去向

下表逐项连接现有 42 个主题。映射表示主要考点有承接，不表示原主题中的全部高级文章都进入 M1 必交清单。原有文章和路线数据本次不修改。

| 现有主题 ID | 现有主题 | 知识点分组 |
| --- | --- | --- |
| `java-oop` | 类型系统与对象模型 | [Java 类型与对象](./m1-knowledge-points.md#java.types) |
| `java-values-errors` | 字符串、数值与异常 | [Java 类型与对象](./m1-knowledge-points.md#java.types) |
| `java-generics-reflection` | 泛型、注解与反射 | [Java 泛型与函数式编程](./m1-knowledge-points.md#java.metadata) |
| `java-io` | I/O、NIO 与资源管理 | [Java I/O](./m1-knowledge-points.md#java.io) |
| `java-functional` | Lambda、Stream 与日期时间 | [Java 泛型与函数式编程](./m1-knowledge-points.md#java.metadata) |
| `java-collections` | Java 集合 | [Java 集合](./m1-knowledge-points.md#java.collections) |
| `hashmap` | HashMap 与 LinkedHashMap | [Java 集合](./m1-knowledge-points.md#java.collections) |
| `concurrent-collections` | 并发集合 | [Java 集合](./m1-knowledge-points.md#java.collections) |
| `java-algorithms` | 算法实现与复杂度 | [数据结构与算法](./m1-knowledge-points.md#algorithms) |
| `java-quality` | API 设计、测试与代码质量 | [工程基础与验证](./m1-knowledge-points.md#engineering) |
| `operating-system-foundations` | 进程、内存与 I/O | [操作系统](./m1-knowledge-points.md#os) |
| `sql-foundations` | SQL 与数据约束 | [关系模型与 SQL](./m1-knowledge-points.md#database.sql) |
| `jvm-class-loading` | 字节码与类加载 | [JVM 与运行诊断](./m1-knowledge-points.md#java.jvm) |
| `jvm-memory` | 运行时内存与对象布局 | [JVM 与运行诊断](./m1-knowledge-points.md#java.jvm) |
| `jvm-gc` | 垃圾回收与收集器 | [JVM 与运行诊断](./m1-knowledge-points.md#java.jvm) |
| `jvm-jit` | JIT 与运行时优化 | [JVM 与运行诊断](./m1-knowledge-points.md#java.jvm) |
| `jvm-diagnostics` | JVM 性能诊断 | [JVM 与运行诊断](./m1-knowledge-points.md#java.jvm) |
| `java-concurrency` | 线程、竞态与 JMM | [Java 并发与任务执行](./m1-knowledge-points.md#java.concurrent) |
| `synchronization` | 同步与原子性 | [Java 并发与任务执行](./m1-knowledge-points.md#java.concurrent) |
| `aqs` | Lock、AQS 与并发工具 | [Java 并发与任务执行](./m1-knowledge-points.md#java.concurrent) |
| `thread-pool` | 线程池与异步编排 | [Java 并发与任务执行](./m1-knowledge-points.md#java.concurrent) |
| `concurrency-diagnostics` | 并发故障与性能诊断 | [Java 并发与任务执行](./m1-knowledge-points.md#java.concurrent) |
| `spring-ioc` | Spring IoC 与 Bean 生命周期 | [Spring 框架](./m1-knowledge-points.md#spring) |
| `spring-aop` | AOP、代理与声明式事务 | [Spring 框架](./m1-knowledge-points.md#spring) |
| `spring-request` | Spring MVC 与 Web 请求链 | [Spring 框架](./m1-knowledge-points.md#spring) |
| `spring-boot` | Spring Boot 自动配置与启动 | [Spring 框架](./m1-knowledge-points.md#spring) |
| `data-access` | MyBatis 与数据库连接池 | [Java 数据访问](./m1-knowledge-points.md#java.data-access) |
| `network` | TCP、HTTP 与 RPC | [计算机网络与 HTTP](./m1-knowledge-points.md#network) |
| `database-index` | MySQL 索引与查询优化 | [MySQL 索引与事务](./m1-knowledge-points.md#database.engine) |
| `database-transaction` | 事务、锁与 MVCC | [MySQL 索引与事务](./m1-knowledge-points.md#database.engine) |
| `cache-mq` | Redis 与缓存一致性 | [缓存与 Redis](./m1-knowledge-points.md#cache) |
| `messaging-search` | 消息、搜索与后台任务 | [消息与搜索](./m1-knowledge-points.md#middleware) |
| `service-governance` | 注册、配置、网关与流量治理 | [分布式一致性与可靠性](./m1-knowledge-points.md#distributed) |
| `resilience` | 超时、重试、限流与熔断 | [分布式一致性与可靠性](./m1-knowledge-points.md#distributed) |
| `distributed-transaction` | 分布式事务与数据一致性 | [分布式一致性与可靠性](./m1-knowledge-points.md#distributed) |
| `security` | 认证、授权与应用安全 | [认证与应用安全](./m1-knowledge-points.md#security) |
| `delivery` | 可观测性、交付与联合排障 | [工程基础与验证](./m1-knowledge-points.md#engineering) |
| `system-design` | 系统设计方法与容量 | [设计能力与岗位选学](./m1-knowledge-points.md#design) |
| `distributed-system` | 复制、一致性与共识 | [分布式一致性与可靠性](./m1-knowledge-points.md#distributed) |
| `domain-architecture` | DDD、模块化单体与微服务 | [设计能力与岗位选学](./m1-knowledge-points.md#design) |
| `availability-cost` | 高可用、容灾、多租户与成本 | [设计能力与岗位选学](./m1-knowledge-points.md#design) |
| `architecture-evolution` | 架构演进与技术决策 | [设计能力与岗位选学](./m1-knowledge-points.md#design) |

## 7. 面经归纳主题的承接

下表使用现有主题映射，逐项确认选题方向有去向。来源编号仅支持组内实际记载的部分问题，不能整体继承为每张卡片的公司来源。

| 面经主题 | 台账编号 | 知识点分组 |
| --- | --- | --- |
| 对象与相等性 | I16、I17、I37 | [Java 类型与对象](./m1-knowledge-points.md#java.types) |
| 集合选择 | I12、I17、I36 | [Java 集合](./m1-knowledge-points.md#java.collections)；[数据结构与算法](./m1-knowledge-points.md#algorithms) |
| HashMap | I01、I08、I13、I27 | [Java 集合](./m1-knowledge-points.md#java.collections) |
| 并发集合 | I20、I32、I40 | [Java 集合](./m1-knowledge-points.md#java.collections) |
| 线程与同步 | I02、I08、I36、I37 | [Java 并发与任务执行](./m1-knowledge-points.md#java.concurrent) |
| 线程池 | I01、I03、I04、I11 | [Java 并发与任务执行](./m1-knowledge-points.md#java.concurrent) |
| 并发问题排查 | I19、I21、I38 | [Java 并发与任务执行](./m1-knowledge-points.md#java.concurrent)；[JVM 与运行诊断](./m1-knowledge-points.md#java.jvm) |
| JVM 与内存 | I03、I19、I35 | [JVM 与运行诊断](./m1-knowledge-points.md#java.jvm) |
| 垃圾回收 | I01、I34 | [JVM 与运行诊断](./m1-knowledge-points.md#java.jvm) |
| 进程与 I/O | I05、I13、I14、I41 | [操作系统](./m1-knowledge-points.md#os)；[Java I/O](./m1-knowledge-points.md#java.io) |
| Spring 容器 | I08、I10、I33 | [Spring 框架](./m1-knowledge-points.md#spring) |
| 请求与数据访问 | I22、I37 | [Spring 框架](./m1-knowledge-points.md#spring)；[Java 数据访问](./m1-knowledge-points.md#java.data-access) |
| SQL | I12、I37、I38 | [关系模型与 SQL](./m1-knowledge-points.md#database.sql) |
| 索引与查询 | I04、I10、I11、I21 | [MySQL 索引与事务](./m1-knowledge-points.md#database.engine) |
| 事务与锁 | I01、I02、I14、I19 | [MySQL 索引与事务](./m1-knowledge-points.md#database.engine) |
| 缓存一致性 | I09、I19、I26、I39 | [缓存与 Redis](./m1-knowledge-points.md#cache) |
| 消息与失败处理 | I04、I18、I31、I39 | [消息与搜索](./m1-knowledge-points.md#middleware)；[分布式一致性与可靠性](./m1-knowledge-points.md#distributed) |
| 网络请求 | I05、I13、I15、I22 | [计算机网络与 HTTP](./m1-knowledge-points.md#network) |
| 算法编码 | I01、I11、I14、I21、I30 | [数据结构与算法](./m1-knowledge-points.md#algorithms) |
| 项目与验证 | I03、I04、I05、I39 | [工程基础与验证](./m1-knowledge-points.md#engineering)；[设计能力与岗位选学](./m1-knowledge-points.md#design) |

## 8. 边界与后续审核

| 范围 | 处理方式与理由 |
| --- | --- |
| 其他语言和岗位 | Go、Node.js、Python、前端、移动端等保留领域规划，缺少相应岗位清单前不宣称已覆盖 |
| AI 应用与 Agent 专岗 | JD10—JD14 含明确专项要求，保留在 Agent 分纲；本次仅将 AI 辅助编码验证纳入通用工程核心 |
| 分布式与系统设计深入内容 | 跨地域复制、多租户、CQRS、事件溯源、控制平面、完整系统设计案例保留按岗规划，不要求普通校招全部完成 |
| Java 版本与底层专项 | Record、密封类、AOT、JDK 升级细节、完整源码和性能常数由目标环境触发，不当作 Java 通用必会 |
| 算法专项 | 加权最短路径、复杂图算法、差分、位图和数论等按编码范围细化；已有一般图与数组知识不能宣称覆盖这些专项 |
| 数学、编译与硬件专项 | 保留相关岗位分支；本清单只取支撑 Java 执行、内存和基本复杂度判断的前置 |
| 简历、项目与行为面 | 保留独立求职材料和口述练习；技术决策与验证可关联知识点，个人经历不伪造统一标准答案 |

20 组面经主题中的技术组均可连接到上述分组，“项目与验证”由工程验证、设计表达和已有项目指南承接。具体题目和公司仍需卡片制作时逐条关联原始来源，不能从主题关联自动派生“某公司问过本题”。

下一步先审核必会范围与原子粒度，确定首批内容清单；随后逐项定位章节、复核停止条件和技术依据，再开始补文与制作卡片。优先处理 Redis/TCP 纠错与 JDBC、HTTP、Linux、IPC 的基础缺口。完整卡片数据结构和功能开发仍属于 M1.2 之后的工作。
