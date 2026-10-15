# java-08 信息密度与文风审计

本批处理 6 个页面：5 篇技术文章和 1 篇栏目首页。文风参照《大语言模型基础》，逐节核对 `0a50ae1`。连接池与 MyBatis 另按恢复方案核对 `c373ce6`。六个文件在历史版本中均存在。

修改从本轮开始时的工作区版本继续进行，保留此前有效改动。下表中的“保留”表示知识点原已存在，本轮只展开解释或调整句子；“恢复”表示补回历史版本中被省略的具体内容。各节列出了核对范围，改写示例的“原文”均取本轮开始时的工作区。

## 1. 数据库连接池

文件：`docs/basic-knowledge/java/data-access/connection-pool-capacity-timeout-leaks.mdx`。

### 逐节核对与恢复

| 对照章节 | 核对的知识点与处理 |
| --- | --- |
| 开头、面试核心 | 保留物理连接复用、代理归还、容量、超时、轮换与泄漏检测。核心改为可直接复述的完整句子，开头说明讲解顺序。 |
| 代理连接与资源归还 | 保留 try-with-resources、异常路径释放、框架事务绑定与连接池的长生命周期。恢复归还可复用连接时保留底层 TCP 的解释。 |
| 连接池容量 | 保留 maximumPoolSize 包含空闲和使用中连接、满池等待及 connectionTimeout。保留数据库能力、单实例负载、实例数量三项约束，以及 20×100=2000 的示例。明确连接数与吞吐的区别。 |
| 容量验证指标 | 保留 active、idle、pending、获取等待、超时数、SQL 与事务时间、数据库资源和扩缩容总量。解释三个池指标的含义，串起数据库有余量时扩池、饱和时优化或限流的判断。 |
| 超时预算 | 保留获取、查询、事务、请求四个范围，以及回滚、释放、多 SQL 累积与重试预算。恢复仅把配置数字递减仍无法保证请求按时结束的边界。 |
| 连接生命周期 | 保留 maxLifetime 略短于基础设施寿命、使用中连接归还后淘汰、空闲保活与 isValid。保留 keepaliveTime 小于 maxLifetime，以及 minimumIdle 默认等于 maximumPoolSize。 |
| 泄漏检测 | 保留异常漏关、事务内远程调用或文件处理与计算、流式结果集、线程切换和数据库阻塞。恢复检测只告警、不强制回收的明确说明，并解释慢事务也会触发阈值。 |
| 耗尽排查 | 保留从应用指标到持有栈、SQL、数据库锁等待，再判断原因并重新压测的完整顺序。 |
| 容量估算与多连接占用 | 保留每秒 400 次、每次 50ms、平均占用 20 条连接的估算。保留峰值、长尾、等待目标和数据库饱和点。恢复单实例配置未变时扩容仍会放大总连接数，以及嵌套借用在数据库无锁冲突时也会卡住。 |
| 超时取消与轮换 | 保留驱动取消、网络返回、数据库终止工作和事务超时传递。保留 1s、300ms、剩余 700ms，恢复每条 SQL 再给 900ms 的反例。恢复短 maxLifetime 无法保护无限长事务的解释。 |
| HikariCP 内部机制 | 保留 ConcurrentBag 的线程本地缓存、共享集合、跨线程交接与 CAS；保留热点字节码、JIT 内联和 FastList 的检查与尾部查找。增加术语解释，保留同驱动、容量、负载下比较性能的前提。 |
| 面试题 | 保留全部 5 题与独立考点。回答先给结论，再解释容量判断、取消与归还；恢复降低 maxLifetime 或扩池无法补上缺失 close 的边界。 |

### 有意不恢复

- 不恢复 Java 25、26 的 JDBC 参考链接，改用 Java 21 官方 API。原因：超出本站 Java 17/21 版本基线；正文中的 JDBC 机制全部保留。
- `c373ce6` 将慢事务等情况统称“连接泄漏的常见原因”，未恢复这个分类。原因：长时间借用不一定是泄漏；改为“占用原因”，保留全部具体场景。

### 改动较大的段落

原文：

> 例如外层事务挂起，但仍占有连接。内层 `REQUIRES_NEW` 又申请新连接。当池中连接都被这类外层事务占用时，内层事务只能等待。这就形成了池内资源等待。

改写：

> 例如外层事务挂起，但仍占有连接。内层 `REQUIRES_NEW` 又申请新连接。当池中连接都被这类外层事务占用时，内层事务只能等待。即使数据库没有锁冲突，请求也会卡在这里。因此，应优先减少嵌套持有，再评估最坏情况下同时需要多少连接。池大小仍要服从数据库容量。

## 2. Java 数据访问首页

文件：`docs/basic-knowledge/java/data-access/index.mdx`。

### 核对与润色

- 历史正文包含 MyBatis、JPA、连接池、查询规模、性能验证，以及框架行为对应数据库操作的定位，全部保留。
- 五个文章链接及标题保持一致。
- 原文没有丢失独立技术知识。本轮只展开栏目定位、适用读者和阅读顺序，说明先选项目框架，再复习查询数量、连接占用、批处理和分页。
- 保持栏目首页结构，没有增加面试核心、技术机制或题目，也没有向读者介绍内部内容模型。

### 有意不恢复

无。

### 改动较大的段落

原文：

> Java 数据访问覆盖 MyBatis、JPA、连接池、查询规模和性能验证，重点是框架行为最终如何映射为数据库操作。

改写：

> Java 数据访问介绍持久层框架如何执行 SQL，以及怎样控制数据库访问的开销。本栏目适合准备 Java 后端面试的读者，覆盖 MyBatis、JPA、连接池和查询优化。

后续另用一段交代阅读顺序与各阶段的复习目标。

## 3. JPA

文件：`docs/basic-knowledge/java/data-access/jpa-entity-states-dirty-checking-lazy-loading.mdx`。

### 逐节核对与恢复

| 对照章节 | 核对的知识点与处理 |
| --- | --- |
| 开头、面试核心 | 恢复实体自动更新、身份与上下文之间的解释。补足 JPA 定义，按身份、状态、脏检查、加载、事务与关联写入说明范围。保留当前新增的 FlushMode 核心。 |
| 持久化上下文 | 恢复“实体类型与主键”共同确定身份、减少重复加载并支持关联管理的原因。保留重复 find 的同一引用示例、上下文结束后脱管，以及 EntityManager 单线程使用要求。 |
| 四种实体状态 | 保留 new、managed、detached、removed 定义，以及 persist、find、查询、detach、clear、关闭与 remove 的转换。改成完整句子解释修改何时被跟踪。 |
| merge | 保留状态复制、原对象仍脱管、目标已有或新建、传入 managed 返回原对象。恢复事务内修改受管实体时无需每次 save 的结论，并与 merge 一起说明。 |
| 脏检查与 flush | 保留 rename 示例、快照与字节码增强、flush 与 commit 的区别。展开快照比较与记录变化的做法，保留主键生成、FlushMode 和查询类型对 SQL 时机的影响。 |
| 事务与上下文 | 恢复在明确事务内读取、校验、修改的要求，以及把实体放入 HTTP Session、缓存或消息后跨请求、线程的具体后果。保留 OSIV 关闭时的事务范围、扩展上下文与回滚后字段不自动恢复。 |
| 懒加载 | 保留代理或持久化集合、size 触发查询、关闭 Session 后的异常与已加载字段可访问。恢复序列化触发额外 SQL、双向关系递归、全部 EAGER 增加固定成本与次级查询。补足成立条件，保留事务内抓取与 DTO 映射。 |
| OSIV | 恢复响应阶段额外查询对事务一致性、错误处理与查询计数的影响。保留上下文延长而原业务事务结束、按应用类型选择与序列化测试。 |
| 乐观锁 | 保留 @Version、旧版本条件、递增与异常，以及脏检查和并发冲突的分工。恢复提示冲突、重新合并或重试的处理选择，以及只重发最后一条 update 会沿用过期判断。 |
| 关联所有权、级联与抓取 | 保留 owning side、mappedBy、双向维护、cascade 与 fetch 的独立作用。保留四种关联的默认抓取方式和 LAZY/EAGER 的 SQL 边界，恢复共享对象随父级联 REMOVE 会影响其他引用者的后果。 |
| 批量修改与同步 | 保留 JPQL bulk update/delete 绕过对象和版本校验、flush 后执行再 clear/refresh、提前 clear 丢变化。恢复版本冲突检查的责任，以及不能只按 setter 或 Repository 返回判断成功。 |
| FlushMode | 此节是当前版本的有效补充，完整保留 AUTO 查询可见性、COMMIT 未指定的查询效果、提前 flush 和显式同步示例。修正为“上下文已加入事务”的条件表达。 |
| 面试题 | 保留全部 5 题。补全原因与后果，回答第一句直接给出状态复制、批量同步和查询前 flush 的结论。 |

### 有意不恢复

- 不恢复 Jakarta Persistence 3.2 与 Hibernate 7.1 的版本定位和链接。原因：超出本批采用的 Spring Boot 2.7/3.x 主流基线；改为 Hibernate 5.6/6.x，规范参照 Jakarta Persistence 3.1。对应通用机制全部保留。
- 其余历史机制均已保留或恢复。当前版本新增的“已加载字段仍可访问”、EntityManager 线程限制和 FlushMode 章节也全部保留。

### 改动较大的段落

原文：

> 回滚后的 Java 字段没有自动恢复保证。重试需开启新事务，重新读取并执行业务判断。长期保存脱管实体，会让版本与关联加载难以管理。

改写：

> 服务方法应在明确的事务内完成读取、校验和修改。事务回滚后，Java 字段没有自动恢复到数据库旧值的保证。所以重试时应开启新事务、重新读取实体，再执行完整业务判断。
>
> 把实体长期保存到 HTTP Session、缓存或消息中，会让脱管对象进入其他请求或线程。这时，对象中的版本和关联状态都来自之前的上下文，版本冲突与关联加载就更难判断。

## 4. MyBatis

文件：`docs/basic-knowledge/java/data-access/mybatis-mapping-executor-plugins.mdx`。

### 逐节核对与恢复

| 对照章节 | 核对的知识点与处理 |
| --- | --- |
| 开头、面试核心 | 保留 MyBatis 3、MyBatis-Spring 范围和完整执行链路。将正文里的压缩类名改成职责说明，核心保留缓存、参数、批处理与插件结论。 |
| 映射配置与代理 | 保留 XML/注解、动态 SQL、参数、ResultMap、缓存进入 Configuration，以及 namespace+id 定位 MappedStatement。解释接口名、方法名与查询示例的关系。 |
| 查询链路 | 保留未命中缓存与 PreparedStatement 的前提、职责图和四类组件。恢复图按职责排列、并非每个箭头都是直接调用的边界，展开 BoundSql、TypeHandler 和 ResultMap 的含义。保留 SQL、参数、结果三类排查入口。 |
| Executor 与批处理 | 保留 SIMPLE、REUSE、BATCH，批处理占位返回、flushStatements、BatchResult 和 commit。恢复 flush 或提交时暴露错误、驱动批处理能力的核对要求，保留查询刷新、生成键、错误定位和事务大小。 |
| 参数绑定 | 保留值占位符、文本替换、SQL 注入与固定白名单示例。恢复普通值占位符不能表达表名、列名、排序方向的明确边界，以及 @Param 对编译器参数名的独立性。 |
| 两级缓存 | 保留 SESSION 与 STATEMENT 范围、清理时机、缓存对象引用与修改可见性。保留 namespace 显式声明、cacheEnabled、useCache、默认写入刷新及事务发布。恢复查询返回时尚未跨会话发布的解释。保留跨 namespace/外部更新和两级缓存开关各自作用。 |
| 插件 | 保留四类接口、最小扩展点、参数映射、缓存键、方言、嵌套查询与插件顺序。展开只改 SQL 会造成绑定错位或缓存误命中的因果。 |
| PageHelper | 保留 6.1.1、Executor.query 两种重载、startPage(2,10)、count、LIMIT 与 offset=10/pageSize=10。保留 BoundSql、附加参数、CacheKey、RowBounds.DEFAULT、finally 清理和跳过查询后的 clearPage。 |
| Spring 事务 | 保留 DataSource 一致、同工厂同事务绑定 Session、手建 Session 脱离范围。保留 DefaultSqlSession 的线程限制、SqlSessionTemplate 的线程安全与事务外会话生命周期。保留 Mapper 返回与外层提交的区别。 |
| 动态 SQL 与映射 | 保留 if/where/foreach、空集合/空串/null 和防止全表操作。保留 resultType/resultMap、构造器、association/collection、一对多身份与 @Param。恢复必须按实际 SQL 日志判断查询数的要求。 |
| 延迟加载 | 保留 3.5.19、JAVASSIST、ResultLoader/ResultLoaderMap、association 示例和属性回填。完整保留全局默认值、关联覆盖、aggressiveLazyLoading 与四个触发方法，以及 Executor 关闭/换线程后的新执行器和事务范围。 |
| 常见问题、面试题 | 保留缓存新鲜度与脏读、插件边界和全部 7 题。常见问题标题改成读者问法，保留原锚点；回答第一句先给结论。 |

### 有意不恢复

- N+1 的完整抓取方案不在 MyBatis 中重复展开。保留“嵌套 select 逐项查询、延迟加载只是推迟触发、按 SQL 日志验证”的结论，并链接《N+1 查询》。原因：相邻文章负责 join、批量加载与分页的具体选择。
- 没有删去其他有效机制、配置、数值或示例。`0a50ae1` 中后补的 PageHelper 与延迟加载内容全部保留。

### 改动较大的段落

原文：

> 动态 SQL 在运行时根据参数生成 BoundSql。`<if>` 决定片段是否存在。`<where>` 处理 WHERE 及开头连接词。`<foreach>` 生成列表参数。

改写：

> 查询条件随输入变化时，动态 SQL 会根据参数生成本次执行的 BoundSql。常见的**动态 SQL 标签**各有作用：
>
> - `<if>` 根据条件决定是否加入一段 SQL。
> - `<where>` 在需要时加入 WHERE，并处理开头多余的 AND 或 OR。
> - `<foreach>` 展开集合，生成 IN 条件等需要的列表参数。

## 5. N+1 查询

文件：`docs/basic-knowledge/java/data-access/n-plus-one-fetch-strategies.mdx`。

### 逐节核对与恢复

| 对照章节 | 核对的知识点与处理 |
| --- | --- |
| 开头、列表访问 | 恢复 1+N 次往返定义、页面增大和网络延迟放大成本的因果。保留同客户复用、缓存与批量抓取改变实际次数的边界，以及 Mapper、RPC、缓存循环的相同结构。 |
| SQL 与指标 | 保留 SQL 总量、重复模板、耗时、扫描/返回行数、连接占用/等待和页面规模变化。恢复生产低开销监控与避免长期记录敏感完整参数的要求。 |
| Join Fetch | 保留订单客户示例、to-one 与 to-many 的差别、可空关系 left join、多集合行数放大。恢复估算关联数量和列宽的要求，说明 SQL 行去重与父对象去重不同，子行仍需传输和物化。 |
| EntityGraph | 保留 NamedEntityGraph 与动态图，恢复不同接口使用不同加载视图且不改默认映射的用途，以及查询计划验证。保留当前新增 fetchgraph/loadgraph 的差别。 |
| 关联批量抓取 | 保留收集关联键、IN 查询、批大小/缓存/访问次序。恢复无法预知是否访问全部关联时的用途，以及 IN 参数上限、执行计划和结果大小的压测。保留手工外键收集与分组回填。 |
| DTO 投影 | 保留订单号、客户名、金额和 JPQL 示例。恢复省去完整实体图构造的原因，保留标量 DTO 序列化不触发关联查询、修改不参与实体脏检查的边界。 |
| 集合分页 | 保留父行重复、截断集合、错误页大小和内存分页。恢复两阶段不保证恰好两条 SQL，以及接受新值、事务快照和版本校验三种一致性选择。保留稳定排序、空页返回和恢复 ID 顺序。 |
| 抓取范围与基数 | 保留 20 个订单共享一客户、10 个商品×8 个标签=80 行。恢复分别查询时由乘积降为各集合规模之和的解释；补足 bag 含义，保留实现限制。 |
| 回归验证 | 保留 SQL 上限、真实页大小、循环查询与实体序列化评审、连接池等待/数据库 CPU/行数指标，以及新增关联后的复查。 |
| 读取与写入合批 | 完整保留当前补充的 BatchSize(size=16)、default_batch_fetch_size=16、实体与集合目标、候选不足/缓存/锁模式边界。保留 jdbc.batch_size 控制写入的分工及相邻文章链接。 |
| 面试题 | 保留全部 5 题，恢复抓取策略选择、真实负载验证、行宽与内存代价，以及仅看去重后 List 长度不足以证明分页正确的边界。 |

### 有意不恢复

- 不恢复 Hibernate 7.1 与 Jakarta Persistence 3.2 的版本定位。原因：超出本站版本基线。改以 Hibernate 5.6/6.x 与 Persistence 3.1 解释相同机制，并核验原有配置在基线版本可用。
- 父实体自动去重限定为 Hibernate 6.x，补充 Hibernate 5.6 使用 JPQL distinct 的差别。没有把 6.x 的行为扩大到全部基线版本。
- 写入批处理的详细机制继续由《批处理与分页》负责，本篇保留配置分工与链接。

### 改动较大的段落

原文：

> 两阶段限定父对象范围，关联仍可分批加载。IN 查询结果需恢复第一阶段的顺序，空 ID 页直接返回。两次读取的一致性取决于事务隔离与版本协议。

改写：

> 两阶段限定的是父对象范围，关联仍可分批加载，所以最终 SQL 数量可以超过两条。IN 查询不会自动保留第一阶段顺序，需要组装时恢复；空 ID 页则直接返回。
>
> 两次读取之间若发生并发修改，还要明确接口的一致性要求。可以接受第二次查询的最新数据，也可以依靠事务隔离维持快照，或使用版本校验发现变化。

## 6. Collector

文件：`docs/basic-knowledge/java/functional/collectors-grouping-reduction.mdx`。

### 逐节核对与恢复

| 对照章节 | 核对的知识点与处理 |
| --- | --- |
| 开头、可变归约 | 恢复 collect 与 Collector 的分工，以及容器创建、加入、合并和结果转换的完整定义。保留活跃用户示例和三步累积，补足返回值与可修改性说明。 |
| collect 与 reduce | 保留整数求和与错误共享列表示例。展开共享 identity 被修改后，单位元失效并使累积/合并互相干扰的原因。补足空流返回 0 的结果说明。 |
| Collector 组成 | 保留 T/A/R、五个组成部分与表格全部内容。合并 StringJoiner 定义和使用示例，说明中间类型、分隔结果与并行 merge。保留串行不调用 combiner 也必须正确实现的要求。 |
| List 与 Set | 保留全部代码、容器实现/可修改性/线程安全/序列化契约。将同类示例放在一个代码块，集中说明去重、首次遇到顺序、工厂与不可修改列表的差别。 |
| toMap | 保留两参数重复键异常、更新时间合并、右值选择、LinkedHashMap 工厂。恢复合并规则必须有业务依据的完整推导，说明 Function.identity 与时间相同保留右值的实际结果。 |
| groupingBy | 保留按部门列表、计数、flatMapping 角色去重与五类下游操作。合并同类示例，解释每个结果的值类型。明确 filtering 保留的是已经出现的分类键对应的空组。 |
| partitioningBy | 保留 true/false 两类与多键分组区别，补足某类为空仍保留键的结果说明。 |
| 结合律 | 保留整数加法/减法、顺序减法代码、浮点舍入和四项 Collector 契约。补出 -15 的实际结果与 5/9 的括号分组对比。 |
| 单位元与并发收集 | 保留当前新增的 0/1 初值差别、三参数兼容、独立容器、CONCURRENT/UNORDERED/IDENTITY_FINISH。展开“兼容”的具体含义，完整保留列表表格中的数据、版本与 null 规则。 |
| 常见问题 | 保留外层键序与组内顺序、LinkedHashMap/TreeMap、并发分组热点竞争、复合统计与 null 边界。恢复合并成本、具名结果类型优于难读嵌套 Map 的原因。保留 teeing 自 Java 12 提供、在 17/21 可用的版本信息。 |
| 面试题 | 保留全部 3 题。恢复姓名转 Map 的具体调用形式、两参数异常、按更新时间选择和第四参数工厂；展开普通并行 collect 与共享容器并发收集的区别。 |

### 有意不恢复

- 不恢复旧版“toMap 的值空值限制由 Map 实现决定”的笼统说法。原因：不够准确。保留当前 OpenJDK 21 值映射拒绝 null、键支持取决于目标 Map 的区分。
- 不恢复旧版把组内遇到顺序只写为串行流的限制。原因：有序流搭配 toList 下游也能在并行收集中保留组内顺序，继续采用当前更准确的说明。
- 不恢复 Java 26 参考资料，保留当前 Java 21 文档与源码。原因：版本基线。

### 改动较大的段落

原文：

> `reduce` 的 identity 和累积函数需要满足归约契约；把可变容器当成共享 identity 会破坏它。收集可变结果时使用 `collect`。

改写：

> 上面的初始列表只有一个，多个并行任务会拿到同一引用并修改它。列表一旦变化，就失去了空列表作为初始值的作用，累积与合并还会互相干扰。收集可变容器时，应使用 `collect` 的供应函数为各分区创建独立容器。

## 7. 核验与保护项

- 已逐篇通读正文、面试核心、考察重点和参考回答，并对照两个历史版本核对各节机制、示例、数值与边界。
- 本轮前后逐字对比 front matter、全部显式锚点、面试题标题、公司字段、HTML 注释和表格行，均保持不变。
- 对代码块内非空行按出现顺序对比，所有代码语句保持一致。Collector 仅合并同类示例的围栏与空行，代码行为不变。
- 保留全部 25 道面试题；没有新增或删除题目。常见问题标题改为问句时，保留原标题编号与显式锚点。
- 运行指定的 `node scripts/check-article-format.mjs --style-strict -- <本批六文件>`。检查器识别 5 篇知识树文章，栏目首页不套技术文章结构；结构问题与文风提示均为 0。
- 检查本批 82 个内部链接与显式锚点引用，目标均存在。指定文件的 `git diff --check` 通过。
- 只修改本批六个页面与本审计文件。未运行 Docusaurus 构建或 npm build，未提交 Git。

版本相关事实核验使用以下官方资料，页面参考资料也已按基线调整：

- [Spring Boot 2.7.18：依赖版本](https://docs.spring.io/spring-boot/docs/2.7.18/reference/html/dependency-versions.html)
- [Jakarta Persistence 3.1：规范](https://jakarta.ee/specifications/persistence/3.1/jakarta-persistence-spec-3.1.html)
- [Jakarta Persistence 3.1：EntityManager](https://jakarta.ee/specifications/persistence/3.1/apidocs/jakarta.persistence/jakarta/persistence/EntityManager.html)
- [Hibernate 5.6：Distinct](https://docs.hibernate.org/orm/5.6/userguide/html_single/Hibernate_User_Guide.html#hql-distinct)
- [Hibernate 6.6：查询语言](https://docs.hibernate.org/orm/6.6/querylanguage/html_single/)
- [Hibernate 6.6：用户指南](https://docs.hibernate.org/orm/6.6/userguide/html_single/Hibernate_User_Guide.html)
- [Spring Framework 6.1.14：OpenEntityManagerInViewFilter](https://docs.spring.io/spring-framework/docs/6.1.14/javadoc-api/org/springframework/orm/jpa/support/OpenEntityManagerInViewFilter.html)
- [Java 21：Collector](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Collector.html)
