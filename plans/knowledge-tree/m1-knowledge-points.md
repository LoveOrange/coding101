# M1 Java 校招知识点清单

本清单是 M1.1 的知识范围评审稿，面向 Java 后端校招，先检查知识点覆盖，再安排文章整理与闪卡制作。共 **287 个候选知识点**，分为 19 个阅读分组：必会 129 个、常考 120 个、按岗选学 38 个。数量表示范围清单，不表示已发布卡片数，也不表示所有项目都要一次学完。

这是一份可编辑的知识点清单，尚未接入站点运行时。术语见[内容模型](../content-model.md)，覆盖结论、证据边界和补缺顺序见[覆盖检查](./m1-coverage-review.md)。大领域内可以继续按子主题导航；这里的阅读分组不新增内容类型。

浏览“方向 → 主题 → 文章 → 候选闪卡”请打开[文章与闪卡知识树](./article-flashcard-tree.md)。本表维护检验目标、停止条件与证据；导图维护文章优先的浏览结构，卡片并未因此完成发布验收。

## 使用说明

- 每行提出一个主要检验问题，并给出停止条件；问题是拟用于卡片设计的表述，**不是声称逐字出自面经的真题**。稳定 ID 不随排序变化。
- 优先级与深度均针对 Java 后端校招，是编辑建议；常考不代表样本统计得出的市场频率。基础编码、SQL 查询、Linux 操作仍需实际练习，能回答卡片不能替代实现。
- 样本出现率按公开面经逐篇映射，同篇同考点只计一次；0 表示未观察到明确相关提问，不表示不考。分母、逐题依据和抽样限制见[面经统计说明](../audits/java-campus/frequency/README.md)。命中表示主要机制或任务相关，不保证完整考察本行所有停止条件。
- 每组的 JD 与面经编号指向[来源台账](../audits/java-campus/research-sources.json)及[主题映射](../../src/data/reviewPlans/interviewResearchThemes.json)，支持选题方向，不代表所列公司问过组内全部问题。未知年份及未核验来源不升级为近期证据。
- 正文状态“待核验”表示找到相关正文候选，**未完成逐点章节定位、充分性与技术事实复核**；“补充”表示现有文字尚需补足此停止条件；“缺失”表示未找到可直接承接的主题正文；“纠错”表示已发现需要修正的表述。当前状态计数：待核验 247、补充 24、缺失 12、纠错 4。
- 候选文章可以多选；下一步逐条确定回答依据、补充前置和深入阅读，并定位章节。没有独立同名文章不自动判为缺失，栏目占位页不能当作解释依据。
- 问题清单与原有 J/F/S 分纲分别负责考点粒度与分支导航。Go、Node.js、Python、前端、移动端和 AI 专岗不在本清单内，边界见覆盖检查。

<a id="java.types"></a>

## 1. Java 类型与对象

分纲：J01、J02。岗位依据：JD05、JD17、JD20；对象与相等性面经组。

前置与练习边界：Java 基本语法；不会写基本控制流者先补编程入门。

| 知识点 ID | 检验问题与停止条件 | 优先级／深度 | 候选正文 | 正文状态 | 样本出现率 |
| --- | --- | --- | --- | --- | --- |
| `java.types.value-copy` | Java 传入对象后，修改字段与重新赋值参数有什么区别？<br/>停止：用引用值的复制解释两种结果。 | 必会／原理解释 | [Java 值传递](../../docs/basic-knowledge/java/language/types-references-value-passing.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.types.value-copy) |
| `java.types.polymorphism` | 重载与重写分别怎样决定实际调用的方法？<br/>停止：区分编译期签名选择与运行期动态分派。 | 必会／原理解释 | [面向对象编程（Object-Oriented Programming）](../../docs/basic-knowledge/java/language/encapsulation-inheritance-polymorphism.mdx) | 待核验 | [3/103（2.9%）](../audits/java-campus/frequency/point-frequency.md#java.types.polymorphism) |
| `java.types.interface` | 接口与抽象类分别能表达哪些对象约束？<br/>停止：根据契约、多继承接口和共享实现说明选择。 | 必会／基础回答 | [面向对象编程（Object-Oriented Programming）](../../docs/basic-knowledge/java/language/encapsulation-inheritance-polymorphism.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#java.types.interface) |
| `java.types.composition` | 什么时候应使用组合来替代继承？<br/>停止：用一个可替换性或变化点例子说明取舍。 | 常考／场景分析 | [面向对象编程（Object-Oriented Programming）](../../docs/basic-knowledge/java/language/encapsulation-inheritance-polymorphism.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.types.composition) |
| `java.types.equality` | 重写 equals 为什么需要同时处理 hashCode？<br/>停止：解释相等对象与哈希值的单向约束，不把碰撞当成相等。 | 必会／原理解释 | [对象相等性](../../docs/basic-knowledge/java/language/equals-hashcode-object-identity.mdx) | 待核验 | [4/103（3.9%）](../audits/java-campus/frequency/point-frequency.md#java.types.equality) |
| `java.types.immutable` | final 引用能保证对象不可变吗？<br/>停止：区分引用不可重赋值与可达对象状态，说明防御性复制。 | 常考／原理解释 | [不可变对象](../../docs/basic-knowledge/java/quality/immutable-objects-defensive-copying.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.types.immutable) |
| `java.types.string` | String 的不可变性如何影响字符串拼接？<br/>停止：区分新对象与原对象，说明循环拼接的成本。 | 必会／原理解释 | [String](../../docs/basic-knowledge/java/language/string-immutability-pool.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.types.string) |
| `java.types.string-pool` | 字符串常量池与 intern 如何影响引用比较？<br/>停止：在明确表达式和版本条件下区分引用相同与内容相等。 | 常考／原理解释 | [String](../../docs/basic-knowledge/java/language/string-immutability-pool.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#java.types.string-pool) |
| `java.types.unboxing` | 包装类型的比较和自动拆箱有哪些边界？<br/>停止：解释缓存不能代替值比较，以及 null 拆箱的结果。 | 必会／基础回答 | [包装类型](../../docs/basic-knowledge/java/language/wrappers-boxing-cache.mdx) | 待核验 | [2/103（1.9%）](../audits/java-campus/frequency/point-frequency.md#java.types.unboxing) |
| `java.types.money` | BigDecimal 的构造方式为什么会影响金额结果？<br/>停止：区分十进制文本和浮点输入，明确舍入规则。 | 必会／基础回答 | [BigDecimal](../../docs/basic-knowledge/java/language/bigdecimal-money.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.types.money) |
| `java.types.exception-flow` | try、catch、finally 和 return 怎样共同决定结果？<br/>停止：根据一个最小执行路径判断返回值或异常，指出 finally 覆盖风险。 | 必会／原理解释 | [Java 异常](../../docs/basic-knowledge/java/language/exceptions-error-boundaries.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#java.types.exception-flow) |
| `java.types.exception-types` | 受检异常与运行时异常在调用方有什么差异？<br/>停止：说明编译期处理要求与异常传播，不把分类当作严重程度。 | 必会／基础回答 | [Java 异常](../../docs/basic-knowledge/java/language/exceptions-error-boundaries.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.types.exception-types) |
| `java.types.resource-close` | try-with-resources 如何处理关闭顺序和关闭异常？<br/>停止：指出逆序关闭及主异常与 suppressed 异常的关系。 | 必会／原理解释 | [Java 异常](../../docs/basic-knowledge/java/language/exceptions-error-boundaries.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.types.resource-close) |
| `java.types.optional` | Optional 适合表达什么，orElseGet 有什么作用？<br/>停止：用可缺失返回值说明惰性默认值，避免把 Optional 当万能字段包装。 | 常考／基础回答 | [Optional](../../docs/basic-knowledge/java/language/optional-boundaries.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#java.types.optional) |

<a id="java.metadata"></a>

## 2. Java 泛型与函数式编程

分纲：J03、J04。岗位依据：JD20 的语言要求；I18、I32、I38 的相关问题。

前置与练习边界：Java 类型与对象；集合 API 可以与泛型同步阅读。

| 知识点 ID | 检验问题与停止条件 | 优先级／深度 | 候选正文 | 正文状态 | 样本出现率 |
| --- | --- | --- | --- | --- | --- |
| `java.metadata.generic-invariance` | 为什么 List<Integer> 不能赋值给 List<Number>？<br/>停止：用类型安全的写入反例解释泛型不变性。 | 必会／原理解释 | [Java 泛型](../../docs/basic-knowledge/java/language/generics.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.metadata.generic-invariance) |
| `java.metadata.wildcard` | extends 与 super 通配符分别允许怎样读写？<br/>停止：根据未知具体类型判断安全读取与写入边界。 | 常考／原理解释 | [Java 泛型](../../docs/basic-knowledge/java/language/generics.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.metadata.wildcard) |
| `java.metadata.erasure` | 类型擦除后哪些泛型信息不能直接在运行时使用？<br/>停止：区分编译期检查、运行期类型与保留在签名中的元数据。 | 常考／原理解释 | [Java 泛型](../../docs/basic-knowledge/java/language/generics.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.metadata.erasure) |
| `java.metadata.annotation` | 注解的保留策略如何决定谁能读取它？<br/>停止：区分源码、类文件和运行时可见范围。 | 常考／基础回答 | [Java 注解](../../docs/basic-knowledge/java/language/annotations-retention-processing.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.metadata.annotation) |
| `java.metadata.reflection` | 反射如何查找和调用方法，有哪些访问边界？<br/>停止：说明元数据查找、参数类型与访问控制，不依赖具体性能常数。 | 常考／原理解释 | [Java 反射](../../docs/basic-knowledge/java/language/reflection-method-handles.mdx) | 待核验 | [2/103（1.9%）](../audits/java-campus/frequency/point-frequency.md#java.metadata.reflection) |
| `java.metadata.lambda` | Lambda 为什么只能捕获 final 或 effectively final 的局部变量？<br/>停止：区分捕获变量与引用对象内部状态。 | 常考／原理解释 | [Lambda 表达式](../../docs/basic-knowledge/java/functional/lambda-functional-interfaces-capture.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.metadata.lambda) |
| `java.metadata.stream-lazy` | Stream 中间操作什么时候执行？<br/>停止：用终止操作和短路行为解释惰性求值。 | 常考／原理解释 | [Stream](../../docs/basic-knowledge/java/functional/stream-pipeline-lazy-evaluation.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.metadata.stream-lazy) |
| `java.metadata.collector` | Collectors.toMap 遇到重复 key 时如何处理？<br/>停止：说明合并规则及其业务含义。 | 常考／原理解释 | [Collector](../../docs/basic-knowledge/java/functional/collectors-grouping-reduction.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.metadata.collector) |
| `java.metadata.parallel` | 并行流在什么条件下可能更慢或产生错误？<br/>停止：结合拆分成本、线程池和共享状态判断。 | 按岗选学／场景分析 | [并行流](../../docs/basic-knowledge/java/functional/parallel-stream-model-pitfalls.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#java.metadata.parallel) |
| `java.metadata.time-zone` | LocalDateTime 能否唯一表示一个时间点？<br/>停止：说明时区、Instant 与夏令时歧义。 | 按岗选学／基础回答 | [java.time](../../docs/basic-knowledge/java/functional/java-time-time-zone-boundaries.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.metadata.time-zone) |
| `java.metadata.processor` | 注解处理器与运行时扫描分别在哪个阶段工作？<br/>停止：区分编译期代码生成与运行时元数据处理。 | 按岗选学／基础回答 | [Java 注解处理器](../../docs/basic-knowledge/java/language/runtime-scanning-compile-time-generation.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.metadata.processor) |

<a id="java.collections"></a>

## 3. Java 集合

分纲：J05。岗位依据：JD20；集合选择、HashMap、并发集合面经组。

前置与练习边界：数据结构中的数组、链表、哈希表、树和复杂度；Java 相等性与泛型。

| 知识点 ID | 检验问题与停止条件 | 优先级／深度 | 候选正文 | 正文状态 | 样本出现率 |
| --- | --- | --- | --- | --- | --- |
| `java.collections.interfaces` | List、Set、Map 如何按数据约束选择？<br/>停止：根据顺序、重复与键值查找作选择。 | 必会／基础回答 | [Java 集合框架](../../docs/basic-knowledge/java/collections/collection-interface-selection.mdx) | 待核验 | [2/103（1.9%）](../audits/java-campus/frequency/point-frequency.md#java.collections.interfaces) |
| `java.collections.arraylist-cost` | ArrayList 中间插入与尾部追加的成本有什么区别？<br/>停止：区分元素移动、单次扩容和摊销成本。 | 必会／原理解释 | [ArrayList](../../docs/basic-knowledge/java/collections/arraylist-growth-memory-locality.mdx) | 待核验 | [6/103（5.8%）](../audits/java-campus/frequency/point-frequency.md#java.collections.arraylist-cost) |
| `java.collections.arraylist-view` | subList 与原列表之间是什么关系？<br/>停止：区分视图与副本，解释结构修改的边界。 | 常考／原理解释 | [ArrayList](../../docs/basic-knowledge/java/collections/arraylist-growth-memory-locality.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.collections.arraylist-view) |
| `java.collections.linkedlist-cost` | 已知位置时 LinkedList 插入快，为什么实际选择仍需谨慎？<br/>停止：同时考虑定位成本、节点内存与局部性。 | 常考／原理解释 | [LinkedList](../../docs/basic-knowledge/java/collections/linkedlist-semantics-cost.mdx) | 待核验 | [4/103（3.9%）](../audits/java-campus/frequency/point-frequency.md#java.collections.linkedlist-cost) |
| `java.collections.map-lookup` | HashMap 查找 key 时经过哪些步骤？<br/>停止：解释哈希定位、碰撞后的比较及不存在的结果。 | 必会／原理解释 | [HashMap](../../docs/basic-knowledge/java/collections/hashmap-structure-lookup-path.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#java.collections.map-lookup) |
| `java.collections.map-key` | 自定义对象作为 HashMap 的 key 需要满足哪些约束？<br/>停止：说明相等性契约和入表后相关状态的稳定性。 | 必会／原理解释 | [HashMap](../../docs/basic-knowledge/java/collections/hashmap-structure-lookup-path.mdx)；[对象相等性](../../docs/basic-knowledge/java/language/equals-hashcode-object-identity.mdx)；[不可变对象](../../docs/basic-knowledge/java/quality/immutable-objects-defensive-copying.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#java.collections.map-key) |
| `java.collections.map-resize` | HashMap 为什么需要扩容，扩容会改变什么？<br/>停止：解释负载、桶分布和迁移成本，不要求背实现常量。 | 必会／原理解释 | [HashMap](../../docs/basic-knowledge/java/collections/hashmap-structure-lookup-path.mdx) | 待核验 | [8/103（7.8%）](../audits/java-campus/frequency/point-frequency.md#java.collections.map-resize) |
| `java.collections.map-collision` | HashMap 在什么情况下会把桶转为树结构？<br/>停止：限定 JDK 实现，说明碰撞成本与容量条件。 | 常考／原理解释 | [HashMap](../../docs/basic-knowledge/java/collections/hashmap-structure-lookup-path.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#java.collections.map-collision) |
| `java.collections.map-concurrent` | 多个线程修改不同 key，HashMap 是否安全？<br/>停止：指出共享结构与发布问题，不把 key 不同当作隔离。 | 必会／原理解释 | [HashMap](../../docs/basic-knowledge/java/collections/hashmap-structure-lookup-path.mdx) | 待核验 | [8/103（7.8%）](../audits/java-campus/frequency/point-frequency.md#java.collections.map-concurrent) |
| `java.collections.set-equality` | HashSet 如何判断元素是否重复？<br/>停止：将哈希定位与 equals 契约连接起来。 | 必会／原理解释 | [Java 集合框架](../../docs/basic-knowledge/java/collections/collection-interface-selection.mdx)；[对象相等性](../../docs/basic-knowledge/java/language/equals-hashcode-object-identity.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.collections.set-equality) |
| `java.collections.lru` | LinkedHashMap 怎样支持 LRU 淘汰？<br/>停止：解释访问顺序与淘汰时机，并说明并发边界。 | 常考／原理解释 | [LinkedHashMap](../../docs/basic-knowledge/java/collections/linkedhashmap-lru.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#java.collections.lru) |
| `java.collections.sorted-map` | TreeMap 如何定义键的顺序与重复？<br/>停止：说明比较器关系、范围查询和与 equals 的一致性问题。 | 常考／原理解释 | [TreeMap 与 TreeSet](../../docs/basic-knowledge/java/collections/treemap-treeset-ordered-query.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.collections.sorted-map) |
| `java.collections.iterator` | fail-fast 能否作为线程安全保证？<br/>停止：解释尽力检测结构修改与正确同步的区别。 | 常考／原理解释 | [集合迭代器](../../docs/basic-knowledge/java/collections/iterator-fail-fast-immutable.mdx) | 待核验 | [2/103（1.9%）](../audits/java-campus/frequency/point-frequency.md#java.collections.iterator) |
| `java.collections.queue-choice` | Deque 与 PriorityQueue 的取出顺序有什么区别？<br/>停止：根据双端操作与优先级选择，区分迭代顺序和出队顺序。 | 常考／基础回答 | [Java 集合框架](../../docs/basic-knowledge/java/collections/collection-interface-selection.mdx)；[堆](../../docs/basic-knowledge/data-structures/heap.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.collections.queue-choice) |
| `java.collections.chm-atomic` | ConcurrentHashMap 的 get 后 put 为什么仍可能有竞态？<br/>停止：指出复合操作边界并选择原子更新 API。 | 常考／原理解释 | [ConcurrentHashMap](../../docs/basic-knowledge/java/collections/concurrenthashmap-atomic-compound-operations.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.collections.chm-atomic) |
| `java.collections.chm-update` | ConcurrentHashMap 如何让不同位置的更新并行？<br/>停止：限定 JDK，解释更新协调与扩容协助的核心思路。 | 常考／原理解释 | [ConcurrentHashMap](../../docs/basic-knowledge/java/collections/concurrenthashmap-atomic-compound-operations.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#java.collections.chm-update) |
| `java.collections.copy-on-write` | CopyOnWrite 容器适合哪些读写比例？<br/>停止：解释复制、快照和旧数据可见性的代价。 | 常考／场景分析 | [CopyOnWrite 容器](../../docs/basic-knowledge/java/collections/copy-on-write-cost-model.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.collections.copy-on-write) |
| `java.collections.blocking-queue` | 有界 BlockingQueue 如何协调生产者和消费者？<br/>停止：说明满、空、阻塞、超时与背压。 | 常考／原理解释 | [BlockingQueue](../../docs/basic-knowledge/java/collections/blockingqueue-producer-consumer.mdx) | 待核验 | [2/103（1.9%）](../audits/java-campus/frequency/point-frequency.md#java.collections.blocking-queue) |
| `java.collections.weak-iteration` | 并发容器迭代时能否得到一个完整时刻的快照？<br/>停止：区分弱一致迭代与快照，限定具体容器。 | 按岗选学／原理解释 | [迭代一致性](../../docs/basic-knowledge/java/collections/concurrent-collection-iteration-consistency.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.collections.weak-iteration) |
| `java.collections.lock-free-queue` | 无锁队列是否保证每个线程都很快完成？<br/>停止：区分系统整体进展与单个线程等待，说明重试成本。 | 按岗选学／原理解释 | [ConcurrentLinkedQueue](../../docs/basic-knowledge/java/collections/concurrentlinkedqueue-lock-free-path.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.collections.lock-free-queue) |

<a id="java.concurrent"></a>

## 4. Java 并发与任务执行

分纲：J07、J08。岗位依据：JD18、JD20；线程与同步、线程池、并发排查面经组。

前置与练习边界：操作系统线程与同步；Java 对象、异常与资源生命周期。

| 知识点 ID | 检验问题与停止条件 | 优先级／深度 | 候选正文 | 正文状态 | 样本出现率 |
| --- | --- | --- | --- | --- | --- |
| `java.concurrent.race` | 检查条件后再修改共享状态为什么可能出错？<br/>停止：给出两个线程的交错执行并指出原子边界。 | 必会／原理解释 | [线程安全](../../docs/basic-knowledge/java/concurrency/thread-safety-race-conditions.mdx) | 待核验 | [4/103（3.9%）](../audits/java-campus/frequency/point-frequency.md#java.concurrent.race) |
| `java.concurrent.thread-state` | BLOCKED、WAITING 与 TIMED_WAITING 分别表示什么？<br/>停止：由等待对象和唤醒方式判断线程状态。 | 必会／基础回答 | [Java 线程](../../docs/basic-knowledge/java/concurrency/thread-lifecycle-interruption.mdx) | 待核验 | [2/103（1.9%）](../audits/java-campus/frequency/point-frequency.md#java.concurrent.thread-state) |
| `java.concurrent.happens-before` | happens-before 能帮助判断哪些跨线程结果？<br/>停止：用锁、volatile 或线程启动关系说明可见性和有序性。 | 必会／原理解释 | [Java 内存模型](../../docs/basic-knowledge/java/concurrency/jmm-happens-before.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.concurrent.happens-before) |
| `java.concurrent.volatile` | volatile 能否让 i++ 成为原子操作？<br/>停止：区分可见性与读改写整体原子性。 | 必会／原理解释 | [volatile](../../docs/basic-knowledge/java/concurrency/volatile-barriers-visibility.mdx) | 待核验 | [8/103（7.8%）](../audits/java-campus/frequency/point-frequency.md#java.concurrent.volatile) |
| `java.concurrent.monitor` | synchronized 保护的是哪个对象的监视器？<br/>停止：判断实例锁、类锁和不同实例之间是否互斥。 | 必会／原理解释 | [synchronized](../../docs/basic-knowledge/java/concurrency/synchronized-monitor-optimizations.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#java.concurrent.monitor) |
| `java.concurrent.wait-notify` | wait 为什么要在循环中检查条件？<br/>停止：说明释放监视器、重新竞争锁、条件变化与虚假唤醒。 | 必会／原理解释 | [Java 线程](../../docs/basic-knowledge/java/concurrency/thread-lifecycle-interruption.mdx)；[synchronized](../../docs/basic-knowledge/java/concurrency/synchronized-monitor-optimizations.mdx)；[线程同步](../../docs/basic-knowledge/operating-system/synchronization.mdx) | 待核验 | [2/103（1.9%）](../audits/java-campus/frequency/point-frequency.md#java.concurrent.wait-notify) |
| `java.concurrent.sleep-wait` | sleep 和 wait 对持有的锁有什么影响？<br/>停止：区分让出执行时间与释放对象监视器。 | 常考／基础回答 | [Java 线程](../../docs/basic-knowledge/java/concurrency/thread-lifecycle-interruption.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#java.concurrent.sleep-wait) |
| `java.concurrent.publication` | 对象构造完成前逸出可能导致什么问题？<br/>停止：区分引用可见与初始化状态可见，说明安全发布方式。 | 常考／原理解释 | [安全发布](../../docs/basic-knowledge/java/concurrency/safe-publication-escape-final.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.concurrent.publication) |
| `java.concurrent.cas` | CAS 如何实现条件更新，为什么可能重试？<br/>停止：说明比较交换、竞争与 ABA 风险。 | 常考／原理解释 | [CAS](../../docs/basic-knowledge/java/concurrency/cas-aba-versioning.mdx) | 待核验 | [6/103（5.8%）](../audits/java-campus/frequency/point-frequency.md#java.concurrent.cas) |
| `java.concurrent.atomic-counter` | AtomicLong 与 LongAdder 如何选择？<br/>停止：区分精确原子更新、并发计数吞吐和读取语义。 | 常考／场景分析 | [Java 原子类](../../docs/basic-knowledge/java/concurrency/atomic-longadder-contention.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.concurrent.atomic-counter) |
| `java.concurrent.lock` | ReentrantLock 相比 synchronized 提供哪些控制能力？<br/>停止：说明可中断、限时获取、Condition 与释放责任。 | 常考／原理解释 | [ReentrantLock](../../docs/basic-knowledge/java/concurrency/reentrantlock-fairness-condition.mdx) | 待核验 | [6/103（5.8%）](../audits/java-campus/frequency/point-frequency.md#java.concurrent.lock) |
| `java.concurrent.aqs` | AQS 中同步状态和等待队列分别负责什么？<br/>停止：解释获取失败、入队、阻塞与唤醒的链路。 | 常考／原理解释 | [AQS](../../docs/basic-knowledge/java/concurrency/aqs-state-wait-queue.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#java.concurrent.aqs) |
| `java.concurrent.condition` | 多个线程交替执行时，怎样避免丢失条件或错误唤醒？<br/>停止：用共享条件、循环等待和正确通知目标解释协议。 | 常考／原理解释 | [ReentrantLock](../../docs/basic-knowledge/java/concurrency/reentrantlock-fairness-condition.mdx)；[编码与 SQL 练习](../../docs/interview/coding-practice.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#java.concurrent.condition) |
| `java.concurrent.latch` | CountDownLatch 与 CyclicBarrier 的等待目标有什么区别？<br/>停止：说明一次性完成计数与可复用的汇合点。 | 常考／基础回答 | [Java 并发同步器](../../docs/basic-knowledge/java/concurrency/latch-barrier-semaphore.mdx) | 待核验 | [4/103（3.9%）](../audits/java-campus/frequency/point-frequency.md#java.concurrent.latch) |
| `java.concurrent.semaphore` | Semaphore 如何限制资源访问并发？<br/>停止：说明许可获得与释放，区分并发上限与速率限制。 | 常考／基础回答 | [Java 并发同步器](../../docs/basic-knowledge/java/concurrency/latch-barrier-semaphore.mdx) | 待核验 | [2/103（1.9%）](../audits/java-campus/frequency/point-frequency.md#java.concurrent.semaphore) |
| `java.concurrent.pool-path` | ThreadPoolExecutor 收到任务后如何决定执行、排队或拒绝？<br/>停止：沿核心线程、队列、最大线程和拒绝条件说明路径。 | 必会／原理解释 | [Java 线程池](../../docs/basic-knowledge/java/concurrency/threadpoolexecutor-execution-path.mdx) | 待核验 | [15/103（14.6%）](../audits/java-campus/frequency/point-frequency.md#java.concurrent.pool-path) |
| `java.concurrent.pool-capacity` | 为什么线程池队列和线程数需要一起配置？<br/>停止：结合任务耗时、下游容量、积压与内存给出判断。 | 必会／场景分析 | [Java 线程池](../../docs/basic-knowledge/java/concurrency/threadpoolexecutor-execution-path.mdx) | 待核验 | [7/103（6.8%）](../audits/java-campus/frequency/point-frequency.md#java.concurrent.pool-capacity) |
| `java.concurrent.pool-rejection` | 线程池饱和时如何选择拒绝策略？<br/>停止：说明丢失任务、调用方阻塞与请求失败的业务影响。 | 必会／场景分析 | [Java 线程池](../../docs/basic-knowledge/java/concurrency/threadpoolexecutor-execution-path.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#java.concurrent.pool-rejection) |
| `java.concurrent.cancellation` | 超时返回是否意味着后台任务已经停止？<br/>停止：说明协作中断、资源关闭与剩余任务的处理。 | 必会／原理解释 | [任务取消](../../docs/basic-knowledge/java/concurrency/interruption-timeout-cancellation.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#java.concurrent.cancellation) |
| `java.concurrent.future-errors` | CompletableFuture 多任务组合怎样处理失败？<br/>停止：区分等待、异常传播与取消，不把任一失败等同于全部停止。 | 常考／原理解释 | [CompletableFuture](../../docs/basic-knowledge/java/concurrency/future-completablefuture-errors.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.concurrent.future-errors) |
| `java.concurrent.threadlocal-cleanup` | 线程池使用 ThreadLocal 为什么需要清理？<br/>停止：解释线程复用、残留上下文及引用生命周期。 | 常考／原理解释 | [ThreadLocal](../../docs/basic-knowledge/java/concurrency/threadlocal-leaks-context.mdx) | 待核验 | [3/103（2.9%）](../audits/java-campus/frequency/point-frequency.md#java.concurrent.threadlocal-cleanup) |
| `java.concurrent.threadlocal-propagation` | 异步任务切换线程后怎样传递请求上下文？<br/>停止：说明显式传递、复制与清理，区分线程局部与任务局部。 | 常考／场景分析 | [ThreadLocal](../../docs/basic-knowledge/java/concurrency/threadlocal-leaks-context.mdx)；[Spring 拦截机制](../../docs/basic-knowledge/java/spring/filter-interceptor-aspect-boundaries.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.concurrent.threadlocal-propagation) |
| `java.concurrent.deadlock-diagnosis` | 如何从线程转储中识别死锁或锁竞争？<br/>停止：连接等待对象与持有者，不把所有 WAITING 都判为死锁。 | 常考／场景分析 | [线程转储](../../docs/basic-knowledge/java/jvm/thread-dumps-deadlocks-contention.mdx) | 待核验 | [2/103（1.9%）](../audits/java-campus/frequency/point-frequency.md#java.concurrent.deadlock-diagnosis) |
| `java.concurrent.virtual-thread` | 虚拟线程降低了什么成本，哪些资源仍需限流？<br/>停止：限定目标 JDK，说明阻塞任务与下游资源容量。 | 按岗选学／场景分析 | [虚拟线程](../../docs/basic-knowledge/java/concurrency/virtual-threads-boundaries.mdx) | 待核验 | [2/103（1.9%）](../audits/java-campus/frequency/point-frequency.md#java.concurrent.virtual-thread) |
| `java.concurrent.readwrite-lock` | 读写锁在什么条件下有收益？<br/>停止：考虑读写比例、临界区时长与升级风险。 | 按岗选学／场景分析 | [读写锁](../../docs/basic-knowledge/java/concurrency/readwritelock-stampedlock.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.concurrent.readwrite-lock) |

<a id="java.jvm"></a>

## 5. JVM 与运行诊断

分纲：J09。岗位依据：JVM 与内存、垃圾回收面经组；I11、I34、I35。

前置与练习边界：Java 对象与线程；操作系统虚拟内存。

| 知识点 ID | 检验问题与停止条件 | 优先级／深度 | 候选正文 | 正文状态 | 样本出现率 |
| --- | --- | --- | --- | --- | --- |
| `java.jvm.bytecode` | Java 源码、字节码与机器码是什么关系？<br/>停止：区分编译、解释执行与即时编译的阶段。 | 常考／基础回答 | [Java 字节码](../../docs/basic-knowledge/java/jvm/source-to-bytecode.mdx) | 待核验 | [2/103（1.9%）](../audits/java-campus/frequency/point-frequency.md#java.jvm.bytecode) |
| `java.jvm.loading` | 类加载、链接和初始化各做什么？<br/>停止：区分验证、准备、解析与静态初始化。 | 常考／原理解释 | [类加载](../../docs/basic-knowledge/java/jvm/class-loading-stages.mdx) | 待核验 | [13/103（12.6%）](../audits/java-campus/frequency/point-frequency.md#java.jvm.loading) |
| `java.jvm.delegation` | 双亲委派主要解决什么问题？<br/>停止：解释类身份与委派查找，指出 SPI 等场景的边界。 | 常考／原理解释 | [双亲委派模型](../../docs/basic-knowledge/java/jvm/parent-delegation.mdx)；[类加载器](../../docs/basic-knowledge/java/jvm/classloaders-spi-isolation.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#java.jvm.delegation) |
| `java.jvm.memory-regions` | 堆、线程栈与元空间分别存放什么？<br/>停止：区分共享与线程私有区域，不把规范区域等同固定实现布局。 | 必会／基础回答 | [JVM 运行时数据区域](../../docs/basic-knowledge/java/jvm/runtime-data-areas.mdx) | 待核验 | [16/103（15.5%）](../audits/java-campus/frequency/point-frequency.md#java.jvm.memory-regions) |
| `java.jvm.oom` | OOM 与 StackOverflowError 应怎样区分排查？<br/>停止：根据错误类别定位内存区域或调用深度并选择证据。 | 必会／场景分析 | [OutOfMemoryError 与 StackOverflowError](../../docs/basic-knowledge/java/jvm/oom-stack-overflow.mdx) | 待核验 | [9/103（8.7%）](../audits/java-campus/frequency/point-frequency.md#java.jvm.oom) |
| `java.jvm.reachability` | 循环引用的对象能否被 GC 回收？<br/>停止：从 GC Roots 可达性判断，区别于引用计数。 | 必会／原理解释 | [GC Roots](../../docs/basic-knowledge/java/jvm/gc-roots-reachability.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#java.jvm.reachability) |
| `java.jvm.reference-types` | 弱引用如何影响对象回收判断？<br/>停止：区分引用类型与对象可达性，不把弱引用等同立即回收。 | 常考／原理解释 | [GC Roots](../../docs/basic-knowledge/java/jvm/gc-roots-reachability.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#java.jvm.reference-types) |
| `java.jvm.gc-algorithm` | 标记清除、复制与整理各有什么成本？<br/>停止：比较存活对象搬迁、空间和碎片问题。 | 必会／原理解释 | [分代回收](../../docs/basic-knowledge/java/jvm/generational-barriers-safepoints.mdx)；[Serial、Parallel 与 CMS](../../docs/basic-knowledge/java/jvm/serial-parallel-cms.mdx) | 补充 | [12/103（11.7%）](../audits/java-campus/frequency/point-frequency.md#java.jvm.gc-algorithm) |
| `java.jvm.generational` | 分代回收为什么需要记录跨代引用？<br/>停止：说明代际假设与只扫描部分堆时的信息需求。 | 必会／原理解释 | [分代回收](../../docs/basic-knowledge/java/jvm/generational-barriers-safepoints.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#java.jvm.generational) |
| `java.jvm.collector` | 选择收集器时如何权衡吞吐、停顿和内存？<br/>停止：限定 JDK 与工作负载，用可测目标比较。 | 常考／场景分析 | [G1](../../docs/basic-knowledge/java/jvm/g1-regions-rset-collection-set.mdx)；[低延迟垃圾收集器](../../docs/basic-knowledge/java/jvm/zgc-shenandoah-low-latency.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#java.jvm.collector) |
| `java.jvm.leak` | 如何判断堆增长是正常缓存还是内存泄漏？<br/>停止：结合时间趋势、存活对象与引用链，不凭一次快照下结论。 | 常考／场景分析 | [堆转储](../../docs/basic-knowledge/java/jvm/heap-dumps-memory-leaks.mdx) | 待核验 | [4/103（3.9%）](../audits/java-campus/frequency/point-frequency.md#java.jvm.leak) |
| `java.jvm.cpu` | Java 进程 CPU 高时如何定位到执行代码？<br/>停止：将热点线程与线程栈、采样证据关联。 | 常考／场景分析 | [CPU 使用率](../../docs/basic-knowledge/java/jvm/cpu-high-diagnosis.mdx) | 待核验 | [3/103（2.9%）](../audits/java-campus/frequency/point-frequency.md#java.jvm.cpu) |
| `java.jvm.gc-pause` | 频繁 GC 或长停顿应先收集什么信息？<br/>停止：说明分配率、存活量、GC 日志及时间相关性。 | 常考／场景分析 | [GC 停顿分析](../../docs/basic-knowledge/java/jvm/gc-logs-jfr-pauses.mdx) | 待核验 | [2/103（1.9%）](../audits/java-campus/frequency/point-frequency.md#java.jvm.gc-pause) |
| `java.jvm.direct-memory` | Java 堆正常时为何仍可能出现内存压力？<br/>停止：区分直接内存、线程栈和进程总内存。 | 按岗选学／场景分析 | [Java 直接内存](../../docs/basic-knowledge/java/jvm/direct-native-memory.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.jvm.direct-memory) |
| `java.jvm.jit` | JIT 如何优化热点代码，为什么可能去优化？<br/>停止：说明运行时剖析、假设和回退。 | 按岗选学／原理解释 | [分层编译](../../docs/basic-knowledge/java/jvm/interpreter-tiered-compilation.mdx)；[方法内联与去优化](../../docs/basic-knowledge/java/jvm/inlining-deoptimization.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.jvm.jit) |
| `java.jvm.escape` | 逃逸分析是否意味着所有未逃逸对象都在栈上分配？<br/>停止：区分分析、分配消除和实现条件。 | 按岗选学／原理解释 | [逃逸分析与标量替换](../../docs/basic-knowledge/java/jvm/escape-analysis-scalar-replacement.mdx) | 待核验 | [2/103（1.9%）](../audits/java-campus/frequency/point-frequency.md#java.jvm.escape) |
| `java.jvm.benchmark` | 怎样避免 JVM 微基准得到误导结果？<br/>停止：识别预热、死代码消除、常量折叠和测量开销。 | 按岗选学／场景分析 | [JMH](../../docs/basic-knowledge/java/jvm/jmh-correct-benchmarks.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.jvm.benchmark) |

<a id="java.io"></a>

## 6. Java I/O

分纲：J06。岗位依据：JD20；I14、I17；进程与 I/O 面经组。

前置与练习边界：操作系统文件描述符与 I/O 模型；异常资源关闭。

| 知识点 ID | 检验问题与停止条件 | 优先级／深度 | 候选正文 | 正文状态 | 样本出现率 |
| --- | --- | --- | --- | --- | --- |
| `java.io.charset` | 字节流与字符流如何通过字符编码连接？<br/>停止：说明编码与解码，并解释跨缓冲区多字节字符问题。 | 常考／基础回答 | [Java 流式 I/O](../../docs/basic-knowledge/java/io/byte-character-buffered-streams.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.io.charset) |
| `java.io.buffer` | NIO Buffer 的 position、limit 与 flip 如何配合？<br/>停止：从写入切换到读取推导有效范围。 | 常考／原理解释 | [Java NIO](../../docs/basic-knowledge/java/io/buffer-channel-selector.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.io.buffer) |
| `java.io.selector` | Channel 与 Selector 如何支持多连接 I/O？<br/>停止：区分就绪通知和真正完成读写。 | 常考／原理解释 | [Java NIO](../../docs/basic-knowledge/java/io/buffer-channel-selector.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.io.selector) |
| `java.io.zero-copy` | 零拷贝减少了哪些数据复制和切换？<br/>停止：限定具体机制，说明仍存在的传输与资源成本。 | 常考／原理解释 | [零拷贝](../../docs/basic-knowledge/java/io/file-mapping-zero-copy-direct-memory.mdx) | 待核验 | [2/103（1.9%）](../audits/java-campus/frequency/point-frequency.md#java.io.zero-copy) |
| `java.io.serialization` | Java 原生反序列化有哪些兼容性与安全风险？<br/>停止：说明版本约束与不可信类型构造风险。 | 按岗选学／场景分析 | [Java 序列化](../../docs/basic-knowledge/java/io/java-serialization-compatibility-security.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.io.serialization) |

<a id="spring"></a>

## 7. Spring 框架

分纲：J10。岗位依据：JD17、JD20；Spring 容器、请求与数据访问面经组。

前置与练习边界：Java 反射与对象；HTTP；SQL 事务与 JDBC。

| 知识点 ID | 检验问题与停止条件 | 优先级／深度 | 候选正文 | 正文状态 | 样本出现率 |
| --- | --- | --- | --- | --- | --- |
| `spring.ioc` | IoC 容器如何改变对象之间的依赖管理？<br/>停止：说明创建、组装与生命周期职责。 | 必会／基础回答 | [IoC 容器](../../docs/basic-knowledge/java/spring/ioc-container-purpose.mdx) | 待核验 | [12/103（11.7%）](../audits/java-campus/frequency/point-frequency.md#spring.ioc) |
| `spring.injection` | 构造器注入如何表达必需依赖？<br/>停止：说明可测试性与初始化完整性，处理多个候选。 | 必会／基础回答 | [依赖注入](../../docs/basic-knowledge/java/spring/dependency-injection-selection.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#spring.injection) |
| `spring.bean-lifecycle` | Bean 从实例化到可用会经过哪些阶段？<br/>停止：串起注入、初始化与后处理，区别对象创建和代理发布。 | 必会／原理解释 | [Bean 生命周期](../../docs/basic-knowledge/java/spring/bean-creation-lifecycle.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#spring.bean-lifecycle) |
| `spring.bean-scope` | 单例 Bean 是否天然线程安全？<br/>停止：区分容器作用域与对象共享可变状态。 | 常考／原理解释 | [Spring 循环依赖](../../docs/basic-knowledge/java/spring/circular-dependencies-scopes-early-exposure.mdx)；[线程安全](../../docs/basic-knowledge/java/concurrency/thread-safety-race-conditions.mdx) | 待核验 | [2/103（1.9%）](../audits/java-campus/frequency/point-frequency.md#spring.bean-scope) |
| `spring.circular` | Spring 在哪些条件下能够处理循环依赖？<br/>停止：区分构造器与属性注入，并限定 Framework 与 Boot 配置。 | 常考／原理解释 | [Spring 循环依赖](../../docs/basic-knowledge/java/spring/circular-dependencies-scopes-early-exposure.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#spring.circular) |
| `spring.aop` | Spring AOP 如何让增强逻辑围绕目标方法执行？<br/>停止：解释代理、匹配与拦截器链的调用。 | 必会／原理解释 | [Spring AOP](../../docs/basic-knowledge/java/spring/aop-pointcut-interceptor-chain.mdx) | 待核验 | [11/103（10.7%）](../audits/java-campus/frequency/point-frequency.md#spring.aop) |
| `spring.proxy-type` | JDK 动态代理与 CGLIB 的代理边界有什么区别？<br/>停止：比较接口与子类方式，说明 final、private 和自调用限制。 | 常考／原理解释 | [JDK 动态代理与 CGLIB](../../docs/basic-knowledge/java/spring/jdk-proxy-cglib.mdx) | 待核验 | [6/103（5.8%）](../audits/java-campus/frequency/point-frequency.md#spring.proxy-type) |
| `spring.tx-self-call` | 同类内部调用事务方法为什么可能不生效？<br/>停止：判断调用是否经过代理入口，不靠注解存在下结论。 | 必会／原理解释 | [Spring 事务](../../docs/basic-knowledge/java/spring/declarative-transaction-execution.mdx)；[JDK 动态代理与 CGLIB](../../docs/basic-knowledge/java/spring/jdk-proxy-cglib.mdx) | 待核验 | [3/103（2.9%）](../audits/java-campus/frequency/point-frequency.md#spring.tx-self-call) |
| `spring.tx-rollback` | 方法抛出异常后 Spring 事务一定回滚吗？<br/>停止：依据异常传播和回滚规则判断，覆盖捕获异常情形。 | 必会／原理解释 | [Spring 事务](../../docs/basic-knowledge/java/spring/declarative-transaction-execution.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#spring.tx-rollback) |
| `spring.tx-propagation` | REQUIRED 与 REQUIRES_NEW 如何影响提交边界？<br/>停止：区分逻辑作用域、物理事务和连接占用。 | 常考／原理解释 | [Spring 事务](../../docs/basic-knowledge/java/spring/declarative-transaction-execution.mdx) | 待核验 | [2/103（1.9%）](../audits/java-campus/frequency/point-frequency.md#spring.tx-propagation) |
| `spring.tx-async` | 异步任务会继承调用线程的 JDBC 事务吗？<br/>停止：说明线程上下文与新事务边界。 | 常考／原理解释 | [Spring AOP](../../docs/basic-knowledge/java/spring/aop-pointcut-interceptor-chain.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#spring.tx-async) |
| `spring.mvc-path` | 一次 HTTP 请求怎样到达 Controller 并返回响应？<br/>停止：串起容器、Filter、DispatcherServlet、处理器与转换。 | 必会／原理解释 | [Spring MVC 请求生命周期](../../docs/basic-knowledge/java/spring/http-request-to-controller.mdx) | 待核验 | [4/103（3.9%）](../audits/java-campus/frequency/point-frequency.md#spring.mvc-path) |
| `spring.interception` | Filter、Interceptor 与 AOP 的拦截范围有什么区别？<br/>停止：按请求链和方法调用边界放置逻辑。 | 常考／基础回答 | [Spring 拦截机制](../../docs/basic-knowledge/java/spring/filter-interceptor-aspect-boundaries.mdx) | 待核验 | [3/103（2.9%）](../audits/java-campus/frequency/point-frequency.md#spring.interception) |
| `spring.validation` | 请求参数绑定和 Bean Validation 分别负责什么？<br/>停止：区分转换失败、约束失败与业务校验。 | 常考／原理解释 | [Spring MVC 参数解析](../../docs/basic-knowledge/java/spring/binding-validation-content-negotiation.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#spring.validation) |
| `spring.errors` | 接口失败时如何向客户端表达可处理的错误？<br/>停止：说明状态码、业务错误码和敏感信息边界。 | 必会／场景分析 | [API 错误契约](../../docs/basic-knowledge/java/spring/api-error-contract.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#spring.errors) |
| `spring.auto-config` | Spring Boot 自动配置为什么会生效或退让？<br/>停止：连接候选配置、条件判断与用户自定义 Bean。 | 必会／原理解释 | [Spring Boot 自动配置](../../docs/basic-knowledge/java/spring/auto-configuration-conditions.mdx) | 待核验 | [4/103（3.9%）](../audits/java-campus/frequency/point-frequency.md#spring.auto-config) |
| `spring.config` | 相同配置出现在多个来源时怎样判断最终值？<br/>停止：限定 Boot 版本，查优先级和实际环境。 | 常考／场景分析 | [Spring Boot 外部化配置](../../docs/basic-knowledge/java/spring/external-config-precedence.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#spring.config) |
| `spring.startup` | Spring Boot 启动成功与服务可接流量有什么区别？<br/>停止：区分容器刷新、Runner 和就绪探针。 | 常考／原理解释 | [Spring Boot 启动](../../docs/basic-knowledge/java/spring/spring-boot-startup.mdx)；[Spring Boot Actuator](../../docs/basic-knowledge/java/spring/actuator-health-startup-diagnostics.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#spring.startup) |

<a id="java.data-access"></a>

## 8. Java 数据访问

分纲：J11。岗位依据：JD17、JD20；请求与数据访问面经组；I37。

前置与练习边界：SQL 查询与事务；Java 资源管理。JDBC 原理先于框架整合，Spring 事务随后引用。

| 知识点 ID | 检验问题与停止条件 | 优先级／深度 | 候选正文 | 正文状态 | 样本出现率 |
| --- | --- | --- | --- | --- | --- |
| `java.data-access.jdbc-flow` | JDBC 查询从取得连接到释放资源经过哪些步骤？<br/>停止：解释 Connection、PreparedStatement、ResultSet 的生命周期。 | 必会／原理解释 | [MyBatis](../../docs/basic-knowledge/java/data-access/mybatis-mapping-executor-plugins.mdx)；[批处理与分页](../../docs/basic-knowledge/java/data-access/batching-pagination-data-access-tests.mdx) | 补充 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.data-access.jdbc-flow) |
| `java.data-access.jdbc-transaction` | JDBC 如何控制一组语句的提交与回滚？<br/>停止：说明 autoCommit、同一连接和异常后的释放。 | 必会／原理解释 | [Spring 事务](../../docs/basic-knowledge/java/spring/declarative-transaction-execution.mdx) | 补充 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#java.data-access.jdbc-transaction) |
| `java.data-access.mybatis-path` | MyBatis Mapper 接口怎样执行 SQL 并映射结果？<br/>停止：解释代理到 SQL、参数绑定和结果映射的路径。 | 必会／原理解释 | [MyBatis](../../docs/basic-knowledge/java/data-access/mybatis-mapping-executor-plugins.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#java.data-access.mybatis-path) |
| `java.data-access.mybatis-binding` | MyBatis 的参数绑定与字符串替换有什么区别？<br/>停止：说明值参数与标识符，识别注入风险。 | 必会／原理解释 | [MyBatis](../../docs/basic-knowledge/java/data-access/mybatis-mapping-executor-plugins.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#java.data-access.mybatis-binding) |
| `java.data-access.mybatis-cache` | MyBatis 一级与二级缓存的范围和失效有什么差异？<br/>停止：限定会话、命名空间和事务边界。 | 常考／原理解释 | [MyBatis](../../docs/basic-knowledge/java/data-access/mybatis-mapping-executor-plugins.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.data-access.mybatis-cache) |
| `java.data-access.connection-pool` | 连接池耗尽时为什么不应只增加最大连接数？<br/>停止：检查泄漏、事务时长、排队和数据库容量。 | 必会／场景分析 | [数据库连接池](../../docs/basic-knowledge/java/data-access/connection-pool-capacity-timeout-leaks.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.data-access.connection-pool) |
| `java.data-access.jpa` | JPA 脏检查何时把实体变更同步到数据库？<br/>停止：区分实体状态、flush 与事务提交。 | 按岗选学／原理解释 | [JPA](../../docs/basic-knowledge/java/data-access/jpa-entity-states-dirty-checking-lazy-loading.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.data-access.jpa) |
| `java.data-access.n-plus-one` | 怎样发现并修复 N+1 查询？<br/>停止：用实际 SQL 次数验证加载策略，说明关联抓取代价。 | 按岗选学／场景分析 | [N+1 查询](../../docs/basic-knowledge/java/data-access/n-plus-one-fetch-strategies.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.data-access.n-plus-one) |
| `java.data-access.batching` | 批量写入为什么需要限制每批大小？<br/>停止：考虑往返、内存、事务和失败重试。 | 常考／场景分析 | [批处理与分页](../../docs/basic-knowledge/java/data-access/batching-pagination-data-access-tests.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#java.data-access.batching) |

<a id="algorithms"></a>

## 9. 数据结构与算法

分纲：F01—F04。岗位依据：JD01、JD05、JD07、JD18；算法编码面经组。

前置与练习边界：一门语言的数组、循环、函数与基本递归语法。卡片自测之后仍需现场实现。

| 知识点 ID | 检验问题与停止条件 | 优先级／深度 | 候选正文 | 正文状态 | 样本出现率 |
| --- | --- | --- | --- | --- | --- |
| `algorithms.complexity` | 怎样从输入规模和操作次数推导复杂度？<br/>停止：区分最坏、平均和摊销，计入额外空间。 | 必会／原理解释 | [算法复杂度](../../docs/basic-knowledge/java/algorithms/complexity-constraints-java-cost.mdx) | 待核验 | [4/103（3.9%）](../audits/java-campus/frequency/point-frequency.md#algorithms.complexity) |
| `algorithms.array` | 数组随机访问与中间插删的成本由什么决定？<br/>停止：解释连续槽位、索引计算与移动。 | 必会／原理解释 | [数组](../../docs/basic-knowledge/data-structures/array.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#algorithms.array) |
| `algorithms.linked-list` | 反转单链表为什么要先保存后继节点？<br/>停止：说明循环不变量，并处理空表与单节点。 | 必会／原理解释 | [链表](../../docs/basic-knowledge/data-structures/linked-list.mdx) | 待核验 | [8/103（7.8%）](../audits/java-campus/frequency/point-frequency.md#algorithms.linked-list) |
| `algorithms.stack` | 栈如何保存尚未完成的处理状态？<br/>停止：以括号匹配或调用栈说明后进先出。 | 必会／原理解释 | [栈](../../docs/basic-knowledge/data-structures/stack.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#algorithms.stack) |
| `algorithms.queue` | 循环数组怎样表示队列的空和满？<br/>停止：说明首尾指针与容量约定，处理环绕边界。 | 必会／原理解释 | [队列](../../docs/basic-knowledge/data-structures/queue.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#algorithms.queue) |
| `algorithms.hash` | 哈希表查询的平均 O(1) 依赖什么条件？<br/>停止：说明分布、负载和碰撞，区分平均与最坏情况。 | 必会／原理解释 | [哈希表](../../docs/basic-knowledge/data-structures/hash-table.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#algorithms.hash) |
| `algorithms.tree-traversal` | 二叉树遍历的时间和空间成本如何计算？<br/>停止：说明访问次数、树高与递归栈。 | 必会／原理解释 | [二叉树](../../docs/basic-knowledge/data-structures/binary-tree.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#algorithms.tree-traversal) |
| `algorithms.bst` | 怎样验证一棵树满足二叉搜索树约束？<br/>停止：说明祖先传递的上下界，不能只比较直接孩子。 | 必会／原理解释 | [二叉搜索树](../../docs/basic-knowledge/data-structures/binary-search-tree.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#algorithms.bst) |
| `algorithms.heap-topk` | 求最大的 k 个元素为什么可以维护最小堆？<br/>停止：说明堆顶含义、替换条件和复杂度。 | 必会／原理解释 | [堆](../../docs/basic-knowledge/data-structures/heap.mdx) | 待核验 | [3/103（2.9%）](../audits/java-campus/frequency/point-frequency.md#algorithms.heap-topk) |
| `algorithms.graph-model` | 邻接表与邻接矩阵如何选择？<br/>停止：比较边密度、存储量与邻接查询成本。 | 必会／基础回答 | [图](../../docs/basic-knowledge/data-structures/graph.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#algorithms.graph-model) |
| `algorithms.bfs` | BFS 为什么能求无权图最短路径？<br/>停止：说明按层扩展、入队标记和边权条件。 | 必会／原理解释 | [树与图搜索](../../docs/basic-knowledge/java/algorithms/trees-graphs-search.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#algorithms.bfs) |
| `algorithms.dfs` | DFS 搜索时什么时候需要撤销访问状态？<br/>停止：区分全局访问与当前路径状态。 | 必会／原理解释 | [树与图搜索](../../docs/basic-knowledge/java/algorithms/trees-graphs-search.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#algorithms.dfs) |
| `algorithms.binary-search` | 二分查找如何保持区间不变量？<br/>停止：根据闭区间或半开区间推导更新与终止。 | 必会／原理解释 | [二分查找](../../docs/basic-knowledge/algorithms/binary-search.mdx) | 待核验 | [4/103（3.9%）](../audits/java-campus/frequency/point-frequency.md#algorithms.binary-search) |
| `algorithms.two-pointers` | 双指针移动时为什么不会漏掉答案？<br/>停止：说明可排除区间的条件，处理重复值。 | 必会／原理解释 | [双指针](../../docs/basic-knowledge/algorithms/two-pointers.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#algorithms.two-pointers) |
| `algorithms.sliding-window` | 滑动窗口适用条件是什么？<br/>停止：定义窗口状态和移动后的单调性，识别不适用情况。 | 必会／原理解释 | [滑动窗口](../../docs/basic-knowledge/java/algorithms/arrays-strings-sliding-window.mdx) | 待核验 | [4/103（3.9%）](../audits/java-campus/frequency/point-frequency.md#algorithms.sliding-window) |
| `algorithms.prefix-sum` | 前缀和如何处理含负数的子数组求和问题？<br/>停止：由前缀差推导查询，说明频次和初始化。 | 必会／原理解释 | [前缀和](../../docs/basic-knowledge/algorithms/prefix-sum.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#algorithms.prefix-sum) |
| `algorithms.sorting` | 快速排序与归并排序如何按约束选择？<br/>停止：比较最坏复杂度、稳定性和额外空间。 | 必会／原理解释 | [排序](../../docs/basic-knowledge/algorithms/sorting.mdx) | 待核验 | [7/103（6.8%）](../audits/java-campus/frequency/point-frequency.md#algorithms.sorting) |
| `algorithms.recursion` | 递归有终止条件为什么仍可能栈溢出？<br/>停止：证明子问题缩小并估计最大深度。 | 必会／原理解释 | [递归](../../docs/basic-knowledge/algorithms/recursion.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#algorithms.recursion) |
| `algorithms.backtracking` | 回溯中为什么需要恢复状态并保存结果副本？<br/>停止：区分搜索路径与结果，解释剪枝条件。 | 必会／原理解释 | [回溯](../../docs/basic-knowledge/algorithms/backtracking.mdx) | 待核验 | [2/103（1.9%）](../audits/java-campus/frequency/point-frequency.md#algorithms.backtracking) |
| `algorithms.dp` | 如何判断动态规划状态是否包含足够信息？<br/>停止：从未来决策依赖推导状态、转移、初值与计算顺序。 | 必会／原理解释 | [动态规划](../../docs/basic-knowledge/java/algorithms/dynamic-programming-state-design.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#algorithms.dp) |
| `algorithms.greedy` | 怎样证明一个局部最优选择可以得到全局最优？<br/>停止：给出交换论证或反例，不仅凭样例通过。 | 常考／原理解释 | [贪心](../../docs/basic-knowledge/algorithms/greedy.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#algorithms.greedy) |
| `algorithms.monotonic-stack` | 单调栈如何找到下一个更大元素？<br/>停止：说明被弹出元素何时确定答案及摊销复杂度。 | 常考／原理解释 | 待补正文 | 缺失 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#algorithms.monotonic-stack) |
| `algorithms.intervals` | 区间合并为什么先排序，再维护当前右边界？<br/>停止：明确重叠与相接条件，覆盖包含区间。 | 常考／原理解释 | 待补正文 | 缺失 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#algorithms.intervals) |
| `algorithms.bit-power` | 快速幂如何把线性乘法次数降为对数级？<br/>停止：按指数二进制拆分，处理溢出与取模条件。 | 按岗选学／原理解释 | 待补正文 | 缺失 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#algorithms.bit-power) |
| `algorithms.topological` | 拓扑排序怎样判断有向依赖能否全部完成？<br/>停止：说明入度与环，区别普通遍历。 | 按岗选学／原理解释 | [树与图搜索](../../docs/basic-knowledge/java/algorithms/trees-graphs-search.mdx) | 补充 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#algorithms.topological) |
| `algorithms.union-find` | 并查集怎样维护动态连通性？<br/>停止：解释合并、查找与适用边界，不承诺处理任意删除。 | 按岗选学／原理解释 | 待补正文 | 缺失 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#algorithms.union-find) |
| `algorithms.trie` | Trie 在前缀查询中有什么收益和空间代价？<br/>停止：说明按字符共享前缀，比较哈希查找。 | 按岗选学／原理解释 | 待补正文 | 缺失 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#algorithms.trie) |
| `algorithms.test-boundaries` | 现场编码怎样构造能暴露错误的边界用例？<br/>停止：从空值、重复、极值和结构边界覆盖反例。 | 必会／场景分析 | [算法正确性](../../docs/basic-knowledge/java/algorithms/live-coding-counterexamples-tests.mdx) | 待核验 | [2/103（1.9%）](../audits/java-campus/frequency/point-frequency.md#algorithms.test-boundaries) |

<a id="os"></a>

## 10. 操作系统

分纲：F05、F06。岗位依据：JD01、JD07、JD09；进程与 I/O 面经组。

前置与练习边界：程序执行、地址与函数调用的基本概念。

| 知识点 ID | 检验问题与停止条件 | 优先级／深度 | 候选正文 | 正文状态 | 样本出现率 |
| --- | --- | --- | --- | --- | --- |
| `os.process-thread` | 进程与线程分别隔离或共享哪些资源？<br/>停止：区分地址空间、堆、文件描述符、寄存器和栈。 | 必会／基础回答 | [进程与线程](../../docs/basic-knowledge/operating-system/processes-threads.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#os.process-thread) |
| `os.scheduling` | 线程在什么情况下发生上下文切换？<br/>停止：区分抢占、阻塞和唤醒，说明调度成本。 | 必会／原理解释 | [进程与线程](../../docs/basic-knowledge/operating-system/processes-threads.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#os.scheduling) |
| `os.syscall` | 系统调用是否必然切换到另一个线程？<br/>停止：区分权限级别变化与调度切换。 | 必会／原理解释 | [进程与线程](../../docs/basic-knowledge/operating-system/processes-threads.mdx) | 待核验 | [2/103（1.9%）](../audits/java-campus/frequency/point-frequency.md#os.syscall) |
| `os.ipc` | 管道、共享内存和 socket 如何用于进程间通信？<br/>停止：按数据交换、隔离与同步责任选择。 | 必会／基础回答 | [进程与线程](../../docs/basic-knowledge/operating-system/processes-threads.mdx)；[文件描述符](../../docs/basic-knowledge/operating-system/file-descriptors.mdx) | 补充 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#os.ipc) |
| `os.mutex` | 互斥锁与条件变量如何共同实现等待条件？<br/>停止：区分保护共享状态与等待状态变化。 | 必会／原理解释 | [线程同步](../../docs/basic-knowledge/operating-system/synchronization.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#os.mutex) |
| `os.deadlock` | 死锁成立需要什么条件，如何破坏它？<br/>停止：用资源等待关系推导预防方式。 | 必会／原理解释 | [死锁](../../docs/basic-knowledge/operating-system/deadlock.mdx) | 待核验 | [7/103（6.8%）](../audits/java-campus/frequency/point-frequency.md#os.deadlock) |
| `os.virtual-memory` | 虚拟地址怎样映射到物理内存？<br/>停止：解释页表与 TLB 的职责。 | 必会／原理解释 | [虚拟内存](../../docs/basic-knowledge/operating-system/virtual-memory.mdx) | 待核验 | [2/103（1.9%）](../audits/java-campus/frequency/point-frequency.md#os.virtual-memory) |
| `os.page-fault` | 发生缺页异常是否一定需要读取磁盘？<br/>停止：区分未映射、首次分配和换入等情况。 | 必会／原理解释 | [虚拟内存](../../docs/basic-knowledge/operating-system/virtual-memory.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#os.page-fault) |
| `os.fd` | 两个文件描述符为什么可能共享读取位置？<br/>停止：区分描述符编号与打开文件描述及关闭责任。 | 常考／原理解释 | [文件描述符](../../docs/basic-knowledge/operating-system/file-descriptors.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#os.fd) |
| `os.io-model` | 阻塞、非阻塞和异步 I/O 的区别是什么？<br/>停止：说明等待就绪与完成数据传输分别由谁承担。 | 必会／原理解释 | [I/O 模型](../../docs/basic-knowledge/operating-system/io-models.mdx) | 待核验 | [3/103（2.9%）](../audits/java-campus/frequency/point-frequency.md#os.io-model) |
| `os.multiplexing` | epoll 如何减少多连接等待的检查成本？<br/>停止：区分关注集合、就绪事件与实际读写。 | 常考／原理解释 | [I/O 多路复用](../../docs/basic-knowledge/operating-system/io-multiplexing.mdx) | 待核验 | [4/103（3.9%）](../audits/java-campus/frequency/point-frequency.md#os.multiplexing) |
| `os.et-lt` | 边缘触发为什么通常要读到 EAGAIN？<br/>停止：说明就绪变化通知和未读数据之间的关系。 | 常考／原理解释 | [I/O 多路复用](../../docs/basic-knowledge/operating-system/io-multiplexing.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#os.et-lt) |
| `os.page-cache` | 页缓存如何影响文件读取与写入持久性？<br/>停止：区分内存缓存、写回与持久化确认。 | 常考／原理解释 | [零拷贝](../../docs/basic-knowledge/java/io/file-mapping-zero-copy-direct-memory.mdx) | 补充 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#os.page-cache) |
| `os.reactor` | Reactor 如何组织事件分发与业务处理？<br/>停止：说明事件循环不能长期阻塞及线程分工。 | 按岗选学／原理解释 | [RPC](../../docs/basic-knowledge/network/rpc-serialization-netty-event-loop.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#os.reactor) |

<a id="network"></a>

## 11. 计算机网络与 HTTP

分纲：F07、F08。岗位依据：JD07、JD08、JD15；网络请求面经组。

前置与练习边界：操作系统 I/O；进程和端口的基本概念。

| 知识点 ID | 检验问题与停止条件 | 优先级／深度 | 候选正文 | 正文状态 | 样本出现率 |
| --- | --- | --- | --- | --- | --- |
| `network.layers` | IP、端口与域名分别负责定位什么？<br/>停止：把名称解析、主机寻址和进程通信连接起来。 | 必会／基础回答 | [网络模型](../../docs/basic-knowledge/network/network-models.mdx)；[IP](../../docs/basic-knowledge/network/ip.mdx) | 待核验 | [6/103（5.8%）](../audits/java-campus/frequency/point-frequency.md#network.layers) |
| `network.dns` | DNS 缓存和递归查询如何影响一次域名解析？<br/>停止：说明递归解析器、权威服务器和 TTL。 | 必会／原理解释 | [DNS](../../docs/basic-knowledge/network/dns.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#network.dns) |
| `network.transport` | TCP 与 UDP 应按哪些传输语义选择？<br/>停止：比较可靠性、顺序、消息边界与应用责任。 | 必会／基础回答 | [TCP 与 UDP](../../docs/basic-knowledge/network/tcp_udp.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#network.transport) |
| `network.handshake` | TCP 为什么需要三次握手？<br/>停止：说明双方初始序列号与收发状态的确认。 | 必会／原理解释 | [TCP 连接](../../docs/basic-knowledge/network/tcp_handshake.mdx) | 待核验 | [8/103（7.8%）](../audits/java-campus/frequency/point-frequency.md#network.handshake) |
| `network.close` | TCP 关闭连接为什么可能需要四次交互？<br/>停止：说明两个方向独立关闭与剩余数据处理。 | 必会／原理解释 | [TCP 连接](../../docs/basic-knowledge/network/tcp_handshake.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#network.close) |
| `network.time-wait` | TIME_WAIT 与 CLOSE_WAIT 分别提示什么？<br/>停止：结合关闭角色与应用资源释放判断。 | 常考／原理解释 | [TCP 连接](../../docs/basic-knowledge/network/tcp_handshake.mdx) | 待核验 | [4/103（3.9%）](../audits/java-campus/frequency/point-frequency.md#network.time-wait) |
| `network.retransmission` | 序列号、确认和重传怎样共同提供可靠字节流？<br/>停止：按字节范围解释累计确认、超时和重复数据处理。 | 必会／原理解释 | [TCP 与 UDP](../../docs/basic-knowledge/network/tcp_udp.mdx) | 纠错 | [6/103（5.8%）](../audits/java-campus/frequency/point-frequency.md#network.retransmission) |
| `network.flow-congestion` | 流量控制与拥塞控制分别保护什么？<br/>停止：区分接收方容量和网络拥塞，并说明发送窗口受双重限制。 | 常考／原理解释 | [TCP 与 UDP](../../docs/basic-knowledge/network/tcp_udp.mdx) | 补充 | [4/103（3.9%）](../audits/java-campus/frequency/point-frequency.md#network.flow-congestion) |
| `network.framing` | TCP 一次 send 为什么不对应一次 read？<br/>停止：说明应用消息长度、分隔符或协议头的定界责任。 | 常考／原理解释 | [TCP 与 UDP](../../docs/basic-knowledge/network/tcp_udp.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#network.framing) |
| `network.http-method` | HTTP 方法的安全性与幂等性有什么区别？<br/>停止：按协议语义判断重复请求，区分业务实现。 | 必会／基础回答 | [HTTP](../../docs/basic-knowledge/network/http-versions-connection-reuse-timeouts.mdx) | 补充 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#network.http-method) |
| `network.http-status` | HTTP 状态码如何区分客户端错误和服务端失败？<br/>停止：解释常用成功、重定向、认证、权限和服务失败结果。 | 必会／基础回答 | [API 错误契约](../../docs/basic-knowledge/java/spring/api-error-contract.mdx) | 补充 | [2/103（1.9%）](../audits/java-campus/frequency/point-frequency.md#network.http-status) |
| `network.http-cache` | 强缓存与条件请求如何决定复用响应？<br/>停止：区分新鲜度、验证器、304、no-cache 与 no-store。 | 常考／原理解释 | [HTTP 缓存](../../docs/basic-knowledge/network/http-cache.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#network.http-cache) |
| `network.tls` | TLS 如何验证服务器身份并保护传输？<br/>停止：说明证书验证、密钥协商与对称加密的分工。 | 必会／原理解释 | [TLS](../../docs/basic-knowledge/network/tls.mdx) | 待核验 | [6/103（5.8%）](../audits/java-campus/frequency/point-frequency.md#network.tls) |
| `network.http-versions` | HTTP/2 与 HTTP/3 如何改变连接中的并发传输？<br/>停止：说明流复用及不同层的队头阻塞边界。 | 常考／原理解释 | [HTTP](../../docs/basic-knowledge/network/http-versions-connection-reuse-timeouts.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#network.http-versions) |
| `network.request-path` | 一次 HTTPS 请求如何经过 DNS、连接、TLS 和 HTTP？<br/>停止：能串起主要阶段并定位各阶段失败。 | 必会／原理解释 | [DNS](../../docs/basic-knowledge/network/dns.mdx)；[TLS](../../docs/basic-knowledge/network/tls.mdx)；[HTTP](../../docs/basic-knowledge/network/http-versions-connection-reuse-timeouts.mdx) | 待核验 | [6/103（5.8%）](../audits/java-campus/frequency/point-frequency.md#network.request-path) |
| `network.timeout` | 连接超时与读取超时为什么需要分别设置？<br/>停止：按请求阶段和总时间预算说明等待边界。 | 常考／场景分析 | [超时](../../docs/system-design/reliability/timeout-budget-cancellation.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#network.timeout) |
| `network.rpc` | RPC 为一次远程调用增加了哪些本地调用没有的问题？<br/>停止：说明序列化、网络、超时和结果未知。 | 常考／原理解释 | [RPC](../../docs/basic-knowledge/network/rpc-serialization-netty-event-loop.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#network.rpc) |
| `network.websocket-sse` | WebSocket 与 SSE 如何按通信方向选择？<br/>停止：比较双向通信、服务端推送与重连责任。 | 按岗选学／场景分析 | 待补正文 | 缺失 | [3/103（2.9%）](../audits/java-campus/frequency/point-frequency.md#network.websocket-sse) |

<a id="database.sql"></a>

## 12. 关系模型与 SQL

分纲：F09。岗位依据：JD07、JD09、JD17、JD20；SQL 面经组；I07、I12、I38。

前置与练习边界：集合、逻辑条件；基础表结构。实际写 SQL 单独验收。

| 知识点 ID | 检验问题与停止条件 | 优先级／深度 | 候选正文 | 正文状态 | 样本出现率 |
| --- | --- | --- | --- | --- | --- |
| `database.sql.keys` | 主键、唯一约束和外键分别保证什么？<br/>停止：区分身份、去重与引用完整性，限定 NULL 语义。 | 必会／基础回答 | [数据约束](../../docs/basic-knowledge/database/modeling/constraints.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#database.sql.keys) |
| `database.sql.modeling` | 多对多关系怎样设计表与约束？<br/>停止：说明关联表、组合唯一性和必要索引。 | 常考／场景分析 | [数据约束](../../docs/basic-knowledge/database/modeling/constraints.mdx) | 补充 | [3/103（2.9%）](../audits/java-campus/frequency/point-frequency.md#database.sql.modeling) |
| `database.sql.null` | SQL 中 NULL 为什么不能使用等号判断？<br/>停止：用三值逻辑解释过滤与聚合影响。 | 必会／原理解释 | [SQL 查询](../../docs/basic-knowledge/database/sql/query.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#database.sql.null) |
| `database.sql.join` | LEFT JOIN 后在 WHERE 过滤右表会发生什么？<br/>停止：区分 ON 匹配与补空后的过滤。 | 必会／原理解释 | [SQL 连接](../../docs/basic-knowledge/database/sql/joins.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#database.sql.join) |
| `database.sql.aggregate` | COUNT(*) 与 COUNT(column) 如何处理 NULL？<br/>停止：根据连接结果正确计算计数。 | 必会／原理解释 | [SQL 聚合](../../docs/basic-knowledge/database/sql/aggregation.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#database.sql.aggregate) |
| `database.sql.having` | WHERE 与 HAVING 分别在什么阶段过滤？<br/>停止：区分行条件与分组条件并写出查询。 | 必会／基础回答 | [SQL 聚合](../../docs/basic-knowledge/database/sql/aggregation.mdx) | 待核验 | [4/103（3.9%）](../audits/java-campus/frequency/point-frequency.md#database.sql.having) |
| `database.sql.subquery` | EXISTS 与 IN 子查询如何表达存在性条件？<br/>停止：说明关联条件、重复和 NULL 边界。 | 常考／原理解释 | [SQL 连接](../../docs/basic-knowledge/database/sql/joins.mdx) | 补充 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#database.sql.subquery) |
| `database.sql.window` | ROW_NUMBER、RANK 与 DENSE_RANK 如何处理并列？<br/>停止：说明分区、排序和排名语义，完成每组 Top N。 | 常考／原理解释 | 待补正文 | 缺失 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#database.sql.window) |
| `database.sql.stable-page` | 分页查询为什么需要稳定且唯一的排序？<br/>停止：解释重复或遗漏及并发修改的影响。 | 必会／原理解释 | [SQL 查询](../../docs/basic-knowledge/database/sql/query.mdx)；[批处理与分页](../../docs/basic-knowledge/java/data-access/batching-pagination-data-access-tests.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#database.sql.stable-page) |
| `database.sql.schema-normalization` | 什么时候需要规范化，什么时候可以冗余？<br/>停止：用更新异常与查询成本说明取舍。 | 常考／场景分析 | 待补正文 | 缺失 | [3/103（2.9%）](../audits/java-campus/frequency/point-frequency.md#database.sql.schema-normalization) |

<a id="database.engine"></a>

## 13. MySQL 索引与事务

分纲：F10—F12。岗位依据：JD07、JD17、JD20；索引与查询、事务与锁面经组；I27 的日志问题。

前置与练习边界：SQL、树与哈希；操作系统缓存与持久化；并发时序。

| 知识点 ID | 检验问题与停止条件 | 优先级／深度 | 候选正文 | 正文状态 | 样本出现率 |
| --- | --- | --- | --- | --- | --- |
| `database.engine.bplus` | B+ 树为什么适合数据库索引？<br/>停止：结合页访问、扇出和范围扫描说明成本。 | 必会／原理解释 | [B+ 树](../../docs/basic-knowledge/database/indices/b_plus_tree/index.mdx) | 待核验 | [22/103（21.4%）](../audits/java-campus/frequency/point-frequency.md#database.engine.bplus) |
| `database.engine.clustered` | InnoDB 聚簇索引与二级索引分别保存什么？<br/>停止：由查询所需列判断是否回表。 | 必会／原理解释 | [聚簇索引](../../docs/basic-knowledge/database/indices/clustered_index/index.mdx)；[联合索引与覆盖索引](../../docs/basic-knowledge/database/indices/composite-covering-back-table.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#database.engine.clustered) |
| `database.engine.composite` | 联合索引的列顺序如何影响可定位的范围？<br/>停止：从有序键解释等值、范围和最左前缀。 | 必会／原理解释 | [联合索引与覆盖索引](../../docs/basic-knowledge/database/indices/composite-covering-back-table.mdx) | 待核验 | [14/103（13.6%）](../audits/java-campus/frequency/point-frequency.md#database.engine.composite) |
| `database.engine.covering` | 覆盖索引怎样减少查询成本？<br/>停止：区分减少回表与减少扫描行数，不把二者混同。 | 必会／原理解释 | [联合索引与覆盖索引](../../docs/basic-knowledge/database/indices/composite-covering-back-table.mdx) | 待核验 | [3/103（2.9%）](../audits/java-campus/frequency/point-frequency.md#database.engine.covering) |
| `database.engine.index-use` | 为什么创建了索引，查询仍可能不使用它？<br/>停止：检查选择性、类型转换、表达式和优化器成本判断。 | 必会／场景分析 | [索引设计](../../docs/basic-knowledge/database/indices/index-review.mdx) | 待核验 | [14/103（13.6%）](../audits/java-campus/frequency/point-frequency.md#database.engine.index-use) |
| `database.engine.explain` | 如何用 EXPLAIN 验证查询优化判断？<br/>停止：区分估计与实际行数，观察访问方式和排序。 | 必会／场景分析 | [执行计划](../../docs/basic-knowledge/database/indices/execution-plan.mdx) | 待核验 | [4/103（3.9%）](../audits/java-campus/frequency/point-frequency.md#database.engine.explain) |
| `database.engine.index-write` | 索引越多为什么可能降低写入性能？<br/>停止：说明维护、空间、缓存和选择性代价。 | 常考／场景分析 | [数据库索引](../../docs/basic-knowledge/database/indices/index.mdx) | 待核验 | [2/103（1.9%）](../audits/java-campus/frequency/point-frequency.md#database.engine.index-write) |
| `database.engine.acid` | ACID 分别约束事务的哪些行为？<br/>停止：用本地业务更新说明保证与应用责任。 | 必会／基础回答 | [数据库事务](../../docs/basic-knowledge/database/transaction/index.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#database.engine.acid) |
| `database.engine.anomalies` | 脏读、不可重复读与幻读如何用时序区分？<br/>停止：明确读写语句和提交位置，不只背定义。 | 必会／原理解释 | [数据库事务](../../docs/basic-knowledge/database/transaction/index.mdx) | 待核验 | [6/103（5.8%）](../audits/java-campus/frequency/point-frequency.md#database.engine.anomalies) |
| `database.engine.isolation` | RC 与 RR 下的一致性读何时建立可见性视图？<br/>停止：限定 InnoDB 和查询类型，解释两次查询的差异。 | 必会／原理解释 | [MVCC](../../docs/basic-knowledge/database/transaction/mvcc-read-view-consistent-read.mdx) | 待核验 | [17/103（16.5%）](../audits/java-campus/frequency/point-frequency.md#database.engine.isolation) |
| `database.engine.mvcc` | MVCC 如何找到当前事务可见的记录版本？<br/>停止：解释版本链与 Read View 的判断职责。 | 必会／原理解释 | [MVCC](../../docs/basic-knowledge/database/transaction/mvcc-read-view-consistent-read.mdx) | 待核验 | [4/103（3.9%）](../audits/java-campus/frequency/point-frequency.md#database.engine.mvcc) |
| `database.engine.current-read` | 普通 SELECT 与锁定读的可见性和加锁有什么区别？<br/>停止：根据语句类型分析当前版本与快照版本。 | 必会／原理解释 | [InnoDB 锁](../../docs/basic-knowledge/database/transaction/innodb-locking-ranges.mdx)；[MVCC](../../docs/basic-knowledge/database/transaction/mvcc-read-view-consistent-read.mdx) | 待核验 | [3/103（2.9%）](../audits/java-campus/frequency/point-frequency.md#database.engine.current-read) |
| `database.engine.lock-range` | InnoDB 的加锁范围为什么与索引和条件有关？<br/>停止：区分记录锁、间隙锁和 next-key lock。 | 必会／原理解释 | [InnoDB 锁](../../docs/basic-knowledge/database/transaction/innodb-locking-ranges.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#database.engine.lock-range) |
| `database.engine.deadlock` | 数据库死锁与普通锁等待如何处理？<br/>停止：说明检测、回滚、有界重试与锁顺序。 | 必会／场景分析 | [数据库死锁](../../docs/basic-knowledge/database/transaction/deadlock-detection-timeout-retry.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#database.engine.deadlock) |
| `database.engine.lost-update` | 怎样防止基于旧值写回导致的丢失更新？<br/>停止：比较条件更新、版本号与锁定读。 | 必会／场景分析 | [数据库事务](../../docs/basic-knowledge/database/transaction/index.mdx)；[长事务](../../docs/basic-knowledge/database/transaction/long-transactions-hot-updates-boundaries.mdx) | 待核验 | [7/103（6.8%）](../audits/java-campus/frequency/point-frequency.md#database.engine.lost-update) |
| `database.engine.long-tx` | 长事务为什么影响连接、锁和旧版本回收？<br/>停止：说明资源占用与缩短事务的边界。 | 常考／场景分析 | [长事务](../../docs/basic-knowledge/database/transaction/long-transactions-hot-updates-boundaries.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#database.engine.long-tx) |
| `database.engine.undo-redo` | undo log 与 redo log 分别支撑什么能力？<br/>停止：区分回滚与版本、持久化与恢复。 | 常考／原理解释 | [数据库事务](../../docs/basic-knowledge/database/transaction/index.mdx) | 补充 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#database.engine.undo-redo) |
| `database.engine.binlog` | binlog 与 redo log 为什么不能互相替代？<br/>停止：说明服务层变更日志和引擎恢复日志的职责。 | 常考／原理解释 | [数据库事务](../../docs/basic-knowledge/database/transaction/index.mdx) | 补充 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#database.engine.binlog) |
| `database.engine.buffer-pool` | Buffer Pool 中的脏页为什么不必在每次提交时全部落盘？<br/>停止：说明内存页、日志先行与后台刷页的关系。 | 常考／原理解释 | [索引设计](../../docs/basic-knowledge/database/indices/index-review.mdx) | 补充 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#database.engine.buffer-pool) |
| `database.engine.replica-lag` | 主从复制延迟会怎样影响读后写一致性？<br/>停止：说明读写路由、复制位点与可接受窗口。 | 常考／场景分析 | [主备复制](../../docs/system-design/distributed-system/primary_backup_replication.mdx) | 补充 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#database.engine.replica-lag) |
| `database.engine.deep-page` | 深分页为什么可能扫描大量无用数据？<br/>停止：比较 OFFSET 和基于游标的分页约束。 | 常考／场景分析 | [批处理与分页](../../docs/basic-knowledge/java/data-access/batching-pagination-data-access-tests.mdx) | 待核验 | [3/103（2.9%）](../audits/java-campus/frequency/point-frequency.md#database.engine.deep-page) |

<a id="cache"></a>

## 14. 缓存与 Redis

分纲：F13。岗位依据：JD03、JD17、JD20；缓存一致性面经组；I02、I04、I15、I24。

前置与练习边界：哈希、集合、并发；数据库事务与失败模型。

| 知识点 ID | 检验问题与停止条件 | 优先级／深度 | 候选正文 | 正文状态 | 样本出现率 |
| --- | --- | --- | --- | --- | --- |
| `cache.types` | String、Hash、List、Set、ZSet 分别适合什么数据访问？<br/>停止：按操作语义选择，不把逻辑类型直接等同某种内部编码。 | 必会／基础回答 | [Redis](../../docs/basic-knowledge/nosql/redis/index.mdx)；[Redis 数据结构](../../docs/basic-knowledge/nosql/redis/data_structure.mdx) | 纠错 | [21/103（20.4%）](../audits/java-campus/frequency/point-frequency.md#cache.types) |
| `cache.encoding` | Redis 数据类型与内部编码是什么关系？<br/>停止：说明同一类型可能随版本、大小和配置采用不同编码。 | 常考／原理解释 | [Redis 数据结构](../../docs/basic-knowledge/nosql/redis/data_structure.mdx) | 纠错 | [9/103（8.7%）](../audits/java-campus/frequency/point-frequency.md#cache.encoding) |
| `cache.skiplist` | 跳表怎样通过多层索引改善查找？<br/>停止：说明概率结构和期望复杂度，区分与最坏情况。 | 常考／原理解释 | [Redis 数据结构](../../docs/basic-knowledge/nosql/redis/data_structure.mdx) | 纠错 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#cache.skiplist) |
| `cache.execution` | Redis 的单线程执行为什么不意味着所有工作只有一个线程？<br/>停止：区分命令执行、网络 I/O 和后台任务并限定版本。 | 必会／原理解释 | [Redis](../../docs/basic-knowledge/nosql/redis/index.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#cache.execution) |
| `cache.atomicity` | Redis 单条命令原子是否意味着多个命令组成的业务原子？<br/>停止：识别读后写竞态，说明 Lua 或事务的边界。 | 必会／原理解释 | [Redis](../../docs/basic-knowledge/nosql/redis/index.mdx) | 待核验 | [3/103（2.9%）](../audits/java-campus/frequency/point-frequency.md#cache.atomicity) |
| `cache.pipeline` | Pipeline 与 Lua 分别减少什么成本或提供什么保证？<br/>停止：区分网络批量发送与服务端原子执行。 | 常考／原理解释 | [Redis](../../docs/basic-knowledge/nosql/redis/index.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#cache.pipeline) |
| `cache.expiry` | Redis 如何清理过期键，TTL 能否当精确定时器？<br/>停止：区分逻辑过期与实际清理。 | 必会／原理解释 | [Redis 过期](../../docs/basic-knowledge/nosql/redis/expiration.mdx) | 待核验 | [3/103（2.9%）](../audits/java-campus/frequency/point-frequency.md#cache.expiry) |
| `cache.eviction` | 内存淘汰与过期有什么区别？<br/>停止：说明触发条件、候选范围和 LRU/LFU 选择。 | 必会／原理解释 | [Redis 内存淘汰](../../docs/basic-knowledge/nosql/redis/eviction.mdx) | 待核验 | [3/103（2.9%）](../audits/java-campus/frequency/point-frequency.md#cache.eviction) |
| `cache.cache-aside` | Cache-aside 如何处理一次读和更新？<br/>停止：串起命中、回源、数据库更新与缓存失效。 | 必会／原理解释 | [缓存一致性](../../docs/basic-knowledge/nosql/redis/cache-patterns-consistency.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#cache.cache-aside) |
| `cache.stale-write` | 先更新数据库再删除缓存为什么仍有不一致窗口？<br/>停止：给出并发时序或删除失败，并说明修复边界。 | 必会／场景分析 | [缓存一致性](../../docs/basic-knowledge/nosql/redis/cache-patterns-consistency.mdx) | 待核验 | [13/103（12.6%）](../audits/java-campus/frequency/point-frequency.md#cache.stale-write) |
| `cache.penetration` | 缓存穿透为什么持续压向数据库？<br/>停止：区分不存在的数据与正常未命中，说明防护及误判代价。 | 必会／场景分析 | [缓存穿透、击穿、雪崩与热点 Key](../../docs/basic-knowledge/nosql/redis/cache-penetration-stampede-avalanche-hotkeys.mdx) | 待核验 | [18/103（17.5%）](../audits/java-campus/frequency/point-frequency.md#cache.penetration) |
| `cache.stampede` | 单个热点键失效时怎样避免大量请求同时回源？<br/>停止：比较互斥重建与允许旧值，说明等待和可用性。 | 必会／场景分析 | [缓存穿透、击穿、雪崩与热点 Key](../../docs/basic-knowledge/nosql/redis/cache-penetration-stampede-avalanche-hotkeys.mdx) | 待核验 | [19/103（18.4%）](../audits/java-campus/frequency/point-frequency.md#cache.stampede) |
| `cache.avalanche` | 大量缓存同时失效时怎样保护数据库？<br/>停止：说明过期分散、限流与降级。 | 必会／场景分析 | [缓存穿透、击穿、雪崩与热点 Key](../../docs/basic-knowledge/nosql/redis/cache-penetration-stampede-avalanche-hotkeys.mdx) | 待核验 | [16/103（15.5%）](../audits/java-campus/frequency/point-frequency.md#cache.avalanche) |
| `cache.hot-big-key` | 热点 key 与大 key 的性能风险有什么区别？<br/>停止：分别定位请求集中与单次操作体积。 | 常考／场景分析 | [缓存穿透、击穿、雪崩与热点 Key](../../docs/basic-knowledge/nosql/redis/cache-penetration-stampede-avalanche-hotkeys.mdx) | 待核验 | [4/103（3.9%）](../audits/java-campus/frequency/point-frequency.md#cache.hot-big-key) |
| `cache.persistence` | RDB 与 AOF 的恢复窗口和运行成本有什么区别？<br/>停止：区分快照、追加日志、刷盘与重写。 | 常考／原理解释 | [Redis 持久化、复制与集群](../../docs/basic-knowledge/nosql/redis/persistence.mdx) | 待核验 | [11/103（10.7%）](../audits/java-campus/frequency/point-frequency.md#cache.persistence) |
| `cache.failover` | Redis 主从故障转移为什么可能丢失已确认写入？<br/>停止：说明异步复制和确认范围。 | 常考／原理解释 | [Redis 持久化、复制与集群](../../docs/basic-knowledge/nosql/redis/persistence.mdx) | 待核验 | [4/103（3.9%）](../audits/java-campus/frequency/point-frequency.md#cache.failover) |
| `cache.cluster` | Sentinel 与 Cluster 分别解决什么问题？<br/>停止：区分非分片故障转移与槽位分片，说明跨槽操作边界。 | 按岗选学／原理解释 | [Redis 持久化、复制与集群](../../docs/basic-knowledge/nosql/redis/persistence.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#cache.cluster) |
| `cache.lease-lock` | Redis 锁为什么需要所有者 token 与过期时间？<br/>停止：说明原子获取、比较释放与租约过期后的并发风险。 | 常考／原理解释 | [分布式锁](../../docs/basic-knowledge/nosql/redis/distributed-lock-conditions-boundaries.mdx) | 待核验 | [11/103（10.7%）](../audits/java-campus/frequency/point-frequency.md#cache.lease-lock) |
| `cache.bloom` | 布隆过滤器的误判如何影响缓存穿透防护？<br/>停止：区分可能存在与确定不存在，说明删除和容量边界。 | 常考／原理解释 | [缓存穿透、击穿、雪崩与热点 Key](../../docs/basic-knowledge/nosql/redis/cache-penetration-stampede-avalanche-hotkeys.mdx) | 补充 | [9/103（8.7%）](../audits/java-campus/frequency/point-frequency.md#cache.bloom) |
| `cache.local-cache` | 多实例本地缓存如何处理失效与版本差异？<br/>停止：说明通知失败、过期和权威数据源。 | 按岗选学／场景分析 | [缓存一致性](../../docs/basic-knowledge/nosql/redis/cache-patterns-consistency.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#cache.local-cache) |

<a id="middleware"></a>

## 15. 消息与搜索

分纲：F14、F15。岗位依据：JD03、JD17、JD20；消息与失败处理面经组。

前置与练习边界：本地事务；超时、重试和幂等；基础索引。

| 知识点 ID | 检验问题与停止条件 | 优先级／深度 | 候选正文 | 正文状态 | 样本出现率 |
| --- | --- | --- | --- | --- | --- |
| `middleware.queue-purpose` | 引入消息队列后，异步和削峰带来哪些代价？<br/>停止：说明排队延迟、故障和积压，不只列优点。 | 常考／场景分析 | [消息队列](../../docs/basic-knowledge/middleware/kafka-rabbitmq-queue-semantics.mdx) | 待核验 | [12/103（11.7%）](../audits/java-campus/frequency/point-frequency.md#middleware.queue-purpose) |
| `middleware.producer-ack` | 生产者收到发送确认后，还需要检查什么可靠性边界？<br/>停止：区分写入确认、持久化和副本承诺。 | 常考／原理解释 | [消息可靠性](../../docs/basic-knowledge/middleware/message-ack-retry-dead-letter.mdx) | 待核验 | [2/103（1.9%）](../audits/java-campus/frequency/point-frequency.md#middleware.producer-ack) |
| `middleware.consumer-ack` | 消费确认放在业务提交前后分别有什么风险？<br/>停止：画出丢失或重复的失败窗口。 | 常考／原理解释 | [消息可靠性](../../docs/basic-knowledge/middleware/message-ack-retry-dead-letter.mdx) | 待核验 | [3/103（2.9%）](../audits/java-campus/frequency/point-frequency.md#middleware.consumer-ack) |
| `middleware.idempotent-consumer` | 消息重复消费时怎样避免重复业务效果？<br/>停止：将去重标识与业务提交放入正确原子边界。 | 常考／原理解释 | [消息幂等性](../../docs/basic-knowledge/middleware/idempotent-consumption-order-duplicates.mdx) | 待核验 | [4/103（3.9%）](../audits/java-campus/frequency/point-frequency.md#middleware.idempotent-consumer) |
| `middleware.ordering` | 消息顺序保证为什么需要限定范围？<br/>停止：说明分区、并发消费和重试对顺序的影响。 | 常考／原理解释 | [消息幂等性](../../docs/basic-knowledge/middleware/idempotent-consumption-order-duplicates.mdx) | 待核验 | [6/103（5.8%）](../audits/java-campus/frequency/point-frequency.md#middleware.ordering) |
| `middleware.backlog` | 消费者持续积压时如何定位并处理？<br/>停止：区分生产速率、消费耗时、失败重试和扩容边界。 | 常考／场景分析 | [消息可靠性](../../docs/basic-knowledge/middleware/message-ack-retry-dead-letter.mdx) | 待核验 | [2/103（1.9%）](../audits/java-campus/frequency/point-frequency.md#middleware.backlog) |
| `middleware.kafka-rabbit` | Kafka 与 RabbitMQ 怎样按消费模型选择？<br/>停止：比较日志分区与队列投递语义，不给无条件性能排名。 | 按岗选学／场景分析 | [消息队列](../../docs/basic-knowledge/middleware/kafka-rabbitmq-queue-semantics.mdx) | 待核验 | [4/103（3.9%）](../audits/java-campus/frequency/point-frequency.md#middleware.kafka-rabbit) |
| `middleware.search-refresh` | Elasticsearch 写入成功后为什么可能暂时搜不到？<br/>停止：区分确认、refresh 与索引可见性。 | 按岗选学／原理解释 | [Elasticsearch](../../docs/basic-knowledge/middleware/elasticsearch-inverted-index-refresh-visibility.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#middleware.search-refresh) |
| `middleware.job-retry` | 定时任务怎样处理重复调度与失败重跑？<br/>停止：说明任务实例标识、幂等、检查点和重叠策略。 | 按岗选学／原理解释 | [分布式任务调度](../../docs/basic-knowledge/middleware/scheduled-tasks-sharding-recovery.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#middleware.job-retry) |

<a id="distributed"></a>

## 16. 分布式一致性与可靠性

分纲：S02—S07、S09。岗位依据：JD03、JD07；I02、I15、I16、I35；岗位相关工程前置。

前置与练习边界：网络失败；数据库事务、缓存和消息。高级协议按项目或 JD 触发。

| 知识点 ID | 检验问题与停止条件 | 优先级／深度 | 候选正文 | 正文状态 | 样本出现率 |
| --- | --- | --- | --- | --- | --- |
| `distributed.unknown-result` | 远程调用超时后为什么不能直接认定操作失败？<br/>停止：列出未执行、执行中和已执行但响应丢失的情况。 | 必会／原理解释 | [超时](../../docs/system-design/reliability/timeout-budget-cancellation.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#distributed.unknown-result) |
| `distributed.retry` | 什么情况下可以重试，怎样避免重试放大故障？<br/>停止：检查操作幂等性、总预算、退避与抖动。 | 常考／场景分析 | [重试](../../docs/system-design/reliability/retry-backoff-jitter-storms.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#distributed.retry) |
| `distributed.idempotency-key` | 幂等键怎样防止请求重试产生重复效果？<br/>停止：说明键范围、参数校验、并发处理和结果保存。 | 常考／原理解释 | [幂等键](../../docs/system-design/reliability/idempotency-keys-safe-retries.mdx) | 待核验 | [11/103（10.7%）](../audits/java-campus/frequency/point-frequency.md#distributed.idempotency-key) |
| `distributed.rate-limit` | 限流与限制并发数分别控制什么？<br/>停止：区分速率、突发、在途任务和排队。 | 常考／场景分析 | [限流](../../docs/system-design/reliability/rate-limiting-capacity-protection.mdx) | 待核验 | [10/103（9.7%）](../audits/java-campus/frequency/point-frequency.md#distributed.rate-limit) |
| `distributed.circuit-breaker` | 熔断、降级和隔离如何处理依赖故障？<br/>停止：说明各自触发条件和对调用方的可见结果。 | 常考／场景分析 | [服务容错](../../docs/system-design/reliability/circuit-breaker-degradation-bulkhead.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#distributed.circuit-breaker) |
| `distributed.cap` | CAP 中网络分区发生时需要在什么保证之间取舍？<br/>停止：限定一致性和可用性的定义，不按组件标签直接选型。 | 常考／原理解释 | [CAP 理论](../../docs/system-design/distributed-system/cap-theorem.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#distributed.cap) |
| `distributed.replication` | 同步与异步复制如何影响写入延迟和故障恢复？<br/>停止：明确确认范围及可能丢失的写入。 | 常考／原理解释 | [主备复制](../../docs/system-design/distributed-system/primary_backup_replication.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#distributed.replication) |
| `distributed.consistency` | 最终一致性和线性一致性对客户端观察有什么差异？<br/>停止：给出读写历史，区分收敛与实时顺序。 | 常考／原理解释 | [一致性模型](../../docs/system-design/distributed-system/consistency-models-quorum-linearizability.mdx) | 待核验 | [3/103（2.9%）](../audits/java-campus/frequency/point-frequency.md#distributed.consistency) |
| `distributed.outbox` | 本地事务提交与发送消息之间的失败窗口怎样处理？<br/>停止：解释事务发件箱、投递重试与消费幂等。 | 常考／原理解释 | [Transactional Outbox 与 CDC](../../docs/system-design/distributed-data/outbox-cdc-reliable-events.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#distributed.outbox) |
| `distributed.saga` | Saga 补偿为什么不等于数据库回滚？<br/>停止：说明已发生的外部效果、中间状态和补偿失败。 | 按岗选学／场景分析 | [Saga](../../docs/system-design/distributed-data/saga-compensation-intermediate-state.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#distributed.saga) |
| `distributed.two-phase` | 2PC 与 TCC 分别依赖参与者提供什么能力？<br/>停止：区分资源协调与业务预留，说明阻塞及恢复代价。 | 按岗选学／原理解释 | [2PC 与 TCC](../../docs/system-design/distributed-data/2pc-tcc-coordination-cost.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#distributed.two-phase) |
| `distributed.raft` | Raft 怎样防止节点恢复后破坏已提交日志？<br/>停止：解释任期、多数派和日志匹配的关键约束。 | 按岗选学／原理解释 | [Raft](../../docs/system-design/distributed-system/raft-election-log-replication.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#distributed.raft) |
| `distributed.service-discovery` | 服务注册成功是否代表实例可以接流量？<br/>停止：区分注册、健康检查、就绪和摘流。 | 按岗选学／原理解释 | [服务发现](../../docs/system-design/microservices/service-discovery-health-checks.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#distributed.service-discovery) |
| `distributed.load-balance` | 负载均衡怎样避免把流量持续发送到故障实例？<br/>停止：结合选址策略、健康状态和连接复用说明。 | 常考／场景分析 | [服务发现](../../docs/system-design/microservices/service-discovery-health-checks.mdx)；[API 网关](../../docs/system-design/microservices/api-gateway-routing.mdx) | 补充 | [3/103（2.9%）](../audits/java-campus/frequency/point-frequency.md#distributed.load-balance) |
| `distributed.unique-id` | 分布式 ID 需要满足哪些约束？<br/>停止：区分唯一性、有序性、节点冲突和时钟回拨。 | 常考／场景分析 | 待补正文 | 缺失 | [4/103（3.9%）](../audits/java-campus/frequency/point-frequency.md#distributed.unique-id) |

<a id="engineering"></a>

## 17. 工程基础与验证

分纲：J12、F16。岗位依据：JD01、JD04、JD07、JD09、JD20；I20、I31、I37；项目与验证面经组。

前置与练习边界：一个可以运行和测试的小程序；基本操作系统与网络。

| 知识点 ID | 检验问题与停止条件 | 优先级／深度 | 候选正文 | 正文状态 | 样本出现率 |
| --- | --- | --- | --- | --- | --- |
| `engineering.git-areas` | Git 的工作区、暂存区与提交分别保存什么？<br/>停止：用一次部分暂存说明下一次提交的内容。 | 必会／基础回答 | [Git](../../docs/tools-and-frameworks/git/index.md)；[使用 Git 进行第一次提交](../../docs/tools-and-frameworks/git/basic-usages/first-commit.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#engineering.git-areas) |
| `engineering.git-merge` | merge 与 rebase 为什么会得到不同提交历史？<br/>停止：说明父提交、重放和共享历史边界。 | 必会／原理解释 | [Git](../../docs/tools-and-frameworks/git/index.md) | 待核验 | [3/103（2.9%）](../audits/java-campus/frequency/point-frequency.md#engineering.git-merge) |
| `engineering.git-undo` | 撤销工作区修改与撤销已共享提交应怎样选择命令？<br/>停止：区分 restore、reset 与 revert 的目标和影响。 | 必会／场景分析 | [Git](../../docs/tools-and-frameworks/git/index.md) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#engineering.git-undo) |
| `engineering.git-cherry-pick` | cherry-pick 怎样把某次提交引入另一条开发线？<br/>停止：说明新提交身份、依赖提交和冲突验证。 | 常考／原理解释 | [Git](../../docs/tools-and-frameworks/git/index.md) | 补充 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#engineering.git-cherry-pick) |
| `engineering.maven` | Maven 的生命周期、依赖作用域与传递依赖如何影响构建？<br/>停止：能定位依赖版本冲突和运行时缺包。 | 必会／基础回答 | [Maven](../../docs/system-design/production/maven-lifecycle-dependency-convergence.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#engineering.maven) |
| `engineering.unit-test` | 如何为一个业务方法设计有意义的单元测试？<br/>停止：验证输出、异常与边界，不仅检查调用次数。 | 必会／场景分析 | [JUnit](../../docs/basic-knowledge/java/quality/junit-assertions-parameterized-tests.mdx) | 待核验 | [2/103（1.9%）](../audits/java-campus/frequency/point-frequency.md#engineering.unit-test) |
| `engineering.test-scope` | 单元测试与集成测试分别能证明什么？<br/>停止：说明真实依赖边界与各自不能覆盖的风险。 | 必会／基础回答 | [测试金字塔](../../docs/basic-knowledge/java/quality/test-pyramid-contract-regression.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#engineering.test-scope) |
| `engineering.mock` | 什么时候应使用 Stub 或 Mock，什么时候需要真实依赖？<br/>停止：区分可控条件、外部效果与集成语义。 | 常考／场景分析 | [测试替身](../../docs/basic-knowledge/java/quality/test-doubles-mock-stub-boundaries.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#engineering.mock) |
| `engineering.linux-process` | Linux 服务异常时怎样确认进程、端口与资源占用？<br/>停止：能选择 ps、top、ss 等工具并解释结果限制。 | 必会／场景分析 | [生产故障诊断](../../docs/system-design/production/jvm-thread-sql-network-joint-diagnosis.mdx) | 补充 | [4/103（3.9%）](../audits/java-campus/frequency/point-frequency.md#engineering.linux-process) |
| `engineering.linux-log` | 怎样从日志中筛选一次请求的相关记录？<br/>停止：根据时间和关联 ID 使用过滤与上下文，处理轮转和多实例。 | 必会／场景分析 | [可观测性](../../docs/system-design/production/logs-metrics-traces-correlation.mdx) | 补充 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#engineering.linux-log) |
| `engineering.observability` | 指标、日志和追踪分别适合回答什么问题？<br/>停止：连接总体趋势、事件细节与调用链。 | 常考／基础回答 | [可观测性](../../docs/system-design/production/logs-metrics-traces-correlation.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#engineering.observability) |
| `engineering.latency` | P99 升高但 CPU 不高时怎样定位等待？<br/>停止：分解线程、连接池、数据库和远程调用。 | 常考／场景分析 | [生产故障诊断](../../docs/system-design/production/jvm-thread-sql-network-joint-diagnosis.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#engineering.latency) |
| `engineering.delivery` | 怎样让构建产物可复现并能够回滚？<br/>停止：说明版本、依赖、配置与数据库兼容性。 | 常考／场景分析 | [可重复交付](../../docs/system-design/production/docker-ci-cd-reproducible-delivery.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#engineering.delivery) |
| `engineering.load-test` | 压测如何区分吞吐瓶颈和不可持续积压？<br/>停止：观察延迟分位数、错误、资源和饱和点。 | 常考／场景分析 | [成本归因](../../docs/system-design/availability/performance-reliability-cost-attribution.mdx) | 补充 | [4/103（3.9%）](../audits/java-campus/frequency/point-frequency.md#engineering.load-test) |
| `engineering.ai-validation` | 使用 AI 生成代码后怎样验证输出？<br/>停止：说明需求核对、边界测试、依赖与安全审查，并给出纠错例子。 | 必会／场景分析 | [项目准备](../../docs/interview/project-preparation.mdx)；[算法正确性](../../docs/basic-knowledge/java/algorithms/live-coding-counterexamples-tests.mdx)；[JUnit](../../docs/basic-knowledge/java/quality/junit-assertions-parameterized-tests.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#engineering.ai-validation) |

<a id="security"></a>

## 18. 认证与应用安全

分纲：F17。岗位依据：JD06、JD07、JD20；HTTP 与数据库应用的必要边界。

前置与练习边界：HTTP、SQL、会话状态与输入处理。

| 知识点 ID | 检验问题与停止条件 | 优先级／深度 | 候选正文 | 正文状态 | 样本出现率 |
| --- | --- | --- | --- | --- | --- |
| `security.authn-authz` | 认证成功为什么不代表可以访问任意资源？<br/>停止：区分身份验证、操作权限和资源归属。 | 必会／基础回答 | [认证与授权](../../docs/system-design/security/authentication-authorization-trust-boundaries.mdx) | 待核验 | [4/103（3.9%）](../audits/java-campus/frequency/point-frequency.md#security.authn-authz) |
| `security.session-jwt` | Session 与 JWT 的状态保存和失效有什么差异？<br/>停止：说明签名不是加密、过期、撤销与服务端状态。 | 常考／原理解释 | [Session、JWT、OAuth 2.0 与 OIDC](../../docs/system-design/security/session-jwt-oauth-oidc.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#security.session-jwt) |
| `security.sql-injection` | 参数化查询为什么能防止值参数的 SQL 注入？<br/>停止：区分 SQL 结构与数据，说明动态标识符白名单。 | 必会／原理解释 | [Web 应用安全](../../docs/system-design/security/injection-authorization-ssrf-deserialization.mdx)；[MyBatis](../../docs/basic-knowledge/java/data-access/mybatis-mapping-executor-plugins.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#security.sql-injection) |
| `security.xss` | XSS 如何发生，输出编码为什么需要区分上下文？<br/>停止：区分不可信文本与可执行内容，说明模板和浏览器边界。 | 常考／原理解释 | [Web 应用安全](../../docs/system-design/security/injection-authorization-ssrf-deserialization.mdx) | 补充 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#security.xss) |
| `security.csrf` | CSRF 为什么与浏览器自动携带身份凭据有关？<br/>停止：说明跨站请求、Token 和 SameSite 的作用。 | 常考／原理解释 | [Session、JWT、OAuth 2.0 与 OIDC](../../docs/system-design/security/session-jwt-oauth-oidc.mdx) | 补充 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#security.csrf) |
| `security.cors` | CORS 是否能替代服务端权限检查？<br/>停止：区分浏览器跨源读取限制和接口授权。 | 常考／基础回答 | 待补正文 | 缺失 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#security.cors) |
| `security.ssrf` | 服务端访问用户提供的 URL 时有哪些风险？<br/>停止：说明内网访问、重定向与地址解析校验。 | 按岗选学／场景分析 | [Web 应用安全](../../docs/system-design/security/injection-authorization-ssrf-deserialization.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#security.ssrf) |
| `security.oauth` | OAuth 2.0 与 OIDC 分别解决什么问题？<br/>停止：区分授权委托与身份层，不把访问令牌当通用登录凭据。 | 按岗选学／基础回答 | [Session、JWT、OAuth 2.0 与 OIDC](../../docs/system-design/security/session-jwt-oauth-oidc.mdx) | 待核验 | [1/103（1.0%）](../audits/java-campus/frequency/point-frequency.md#security.oauth) |

<a id="design"></a>

## 19. 设计能力与岗位选学

分纲：S01、S04、S08、S10—S12。岗位依据：JD05、JD07、JD08、JD20；项目追问；按明确 JD 或项目触发。

前置与练习边界：已有一个真实项目，掌握请求、数据、失败与验证链路。

| 知识点 ID | 检验问题与停止条件 | 优先级／深度 | 候选正文 | 正文状态 | 样本出现率 |
| --- | --- | --- | --- | --- | --- |
| `design.pattern-strategy` | 策略模式怎样组织可替换的业务规则？<br/>停止：指出变化点、接口和引入间接层的成本。 | 常考／场景分析 | 待补正文 | 缺失 | [2/103（1.9%）](../audits/java-campus/frequency/point-frequency.md#design.pattern-strategy) |
| `design.pattern-factory` | 工厂如何把对象创建与使用解耦？<br/>停止：区分创建选择和业务行为，不混同 Spring BeanFactory 的全部职责。 | 常考／场景分析 | 待补正文 | 缺失 | [3/103（2.9%）](../audits/java-campus/frequency/point-frequency.md#design.pattern-factory) |
| `design.singleton` | 单例的唯一性与线程安全为什么是不同问题？<br/>停止：说明发布、类加载器范围与共享状态。 | 常考／原理解释 | [安全发布](../../docs/basic-knowledge/java/concurrency/safe-publication-escape-final.mdx) | 补充 | [11/103（10.7%）](../audits/java-campus/frequency/point-frequency.md#design.singleton) |
| `design.requirements` | 系统设计题开始时怎样界定最小需求？<br/>停止：明确使用者、读写操作、约束和不做的功能。 | 按岗选学／场景分析 | [系统设计面试](../../docs/system-design/system-design/interview-process.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#design.requirements) |
| `design.capacity` | 容量估算怎样影响架构选择？<br/>停止：从请求量、大小、峰值与保留期推导资源。 | 按岗选学／场景分析 | [容量规划](../../docs/system-design/system-design/capacity-slo-failure-model.mdx) | 待核验 | [3/103（2.9%）](../audits/java-campus/frequency/point-frequency.md#design.capacity) |
| `design.sharding` | 分片键为什么可能造成热点或跨分片查询？<br/>停止：结合访问模式和扩容代价说明选择。 | 按岗选学／场景分析 | [数据拆分](../../docs/system-design/system-design/read-write-paths-hotspots-sharding.mdx) | 待核验 | [6/103（5.8%）](../audits/java-campus/frequency/point-frequency.md#design.sharding) |
| `design.service-boundary` | 什么时候值得把单体中的模块拆成服务？<br/>停止：比较独立演进收益与调用、事务和运维成本。 | 按岗选学／场景分析 | [模块化单体](../../docs/system-design/architecture/modular-monolith-dependency-constraints.mdx)；[微服务架构](../../docs/system-design/architecture/microservice-splitting-benefits-costs.mdx) | 待核验 | [2/103（1.9%）](../audits/java-campus/frequency/point-frequency.md#design.service-boundary) |
| `design.rto-rpo` | 备份与高可用副本怎样服务不同恢复目标？<br/>停止：区分 RTO、RPO、故障转移与误删恢复。 | 按岗选学／基础回答 | [灾难恢复](../../docs/system-design/availability/high-availability-backup-rto-rpo.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#design.rto-rpo) |
| `design.architecture-decision` | 怎样解释项目中的技术选择？<br/>停止：给出约束、备选方案、代价和验证依据。 | 按岗选学／场景分析 | [架构决策记录（ADR）](../../docs/system-design/leadership/constraints-architecture-decision-records.mdx)；[项目准备](../../docs/interview/project-preparation.mdx) | 待核验 | [5/103（4.9%）](../audits/java-campus/frequency/point-frequency.md#design.architecture-decision) |
| `design.incident` | 怎样基于证据解释一次项目故障？<br/>停止：说明时间线、原因、影响、修复与验证，不编造指标。 | 按岗选学／场景分析 | [事故复盘](../../docs/system-design/leadership/incident-review-failed-designs-organizational-learning.mdx)；[项目准备](../../docs/interview/project-preparation.mdx) | 待核验 | [0/103（0.0%）](../audits/java-campus/frequency/point-frequency.md#design.incident) |
