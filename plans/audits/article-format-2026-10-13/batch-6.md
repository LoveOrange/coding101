# 文章格式审计：batch-6

日期：2026-10-13。分支：`content/article-format-2026-10-13`。

本批完成指定 20 篇文章的表达优化与面试覆盖补充。原有 46 道题全部保留，新增 24 道本站原理自测，共 70 道题。仅修改本批文章与本记录，未提交 git。

## 表达与标识

- 完整阅读 AGENTS.md、batch-1b 记录与 InnoDB 锁、TCP 连接两篇样例。开头说明本篇范围，相邻机制改为简短结论加链接。
- 普通二、三级标题改为概念或机制名称，保留所有已有显式锚点。补齐缺失锚点与连续编号。面试题保留完整问句，新增卡片使用英文 ID。
- 面试核心改为可直接复述的结论。参考回答先回答问题，再解释机制、条件和代价。涉及版本与参数时写出具体名称。
- 逐段通读并拆分长句，删除重复表述、兜底限定和资料可信度元叙述。参考资料整理为连续列表。
- 与 HEAD 逐文件比较：knowledge.id、已有显式锚点和卡片 ID 全部保留。没有删除或合并卡片，原有复习组件保留。
- 所有新增题使用统一本站自测注释，没有新增公司归属。原有公司与面经来源保留，本批未重新核验全部旧面经。
- Java 集合实现固定核对 OpenJDK `jdk-26-ga` 源码和 Java 26 API。JPA 使用 Jakarta Persistence 3.2、Hibernate 7.1；测试示例标明 JUnit 5.13.4、Mockito 5.20.0、Testcontainers 1.21.3。

## 每篇改动与依据

### 1. ArrayList

文件：[arraylist-growth-memory-locality.mdx](../../../docs/basic-knowledge/java/collections/arraylist-growth-memory-locality.mdx)。

负责数组布局、增长、移动成本与容量管理。补充默认构造与显式零容量的首次增长差异。新增 subList 的根数组保留及独立复制示例；集合工厂细节改为相邻文章链接。

新增题：`sublist-retention`。

依据：[Java API：ArrayList](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html)、[OpenJDK：ArrayList 源码](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/java.base/share/classes/java/util/ArrayList.java)、[Java API：List.subList](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#subList(int,int))。已加入或保留于文章参考资料。

修正与澄清：修正“只有旧 JDK 的 subList 才保留根列表”的表述。OpenJDK 26 的 SubList 仍持有 root/parent。修正数组与 ArrayList 边界检查的比较：Java 数组也检查越界。

人工确认：无新增阻塞事项。运行验证范围见文末。

### 2. BlockingQueue

文件：[blockingqueue-producer-consumer.mdx](../../../docs/basic-knowledge/java/collections/blockingqueue-producer-consumer.mdx)。

负责四组队列 API、容量、背压、中断与关闭协议。比较 ArrayBlockingQueue 的单锁和 LinkedBlockingQueue 的双锁。补充优先级、延迟到期与队列发布保证；新增元素可见性的自测。

新增题：`queue-publication`。

依据：[Java API：BlockingQueue](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/BlockingQueue.html)、[Java API：ArrayBlockingQueue](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ArrayBlockingQueue.html)、[Java API：LinkedBlockingQueue](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/LinkedBlockingQueue.html)、[Java API：SynchronousQueue](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/SynchronousQueue.html)、[Java API：DelayQueue](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/DelayQueue.html)、[Java 26：PriorityBlockingQueue](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/PriorityBlockingQueue.html)、[OpenJDK 26：LinkedBlockingQueue](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/java.base/share/classes/java/util/concurrent/LinkedBlockingQueue.java)。已加入或保留于文章参考资料。

修正与澄清：修正 SynchronousQueue 只由 put/take 配对的说法。offer/poll 也可完成交接。写明 LinkedBlockingQueue 默认容量为 Integer.MAX_VALUE；发布保证只覆盖入队前的动作。

人工确认：无新增阻塞事项。运行验证范围见文末。

### 3. Java 集合框架

文件：[collection-interface-selection.mdx](../../../docs/basic-knowledge/java/collections/collection-interface-selection.mdx)。

负责接口语义、顺序、重复、空值与选型。实现机制只保留结论和负责文章链接。补充 Java 21 的 SequencedCollection 层级、PriorityQueue 的堆顶语义与遍历顺序。

新增题：`priority-queue-order`。

依据：[Java API：Collection](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html)、[Java API：Queue](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Queue.html)、[Java 26：PriorityQueue](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/PriorityQueue.html)、[Java 26：SequencedCollection](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SequencedCollection.html)、[Java 26：HashSet](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashSet.html)。已加入或保留于文章参考资料。

修正与澄清：把原接口树标为简图，避免遗漏 SequencedCollection 后误读为完整继承图。明确 HashSet 基于 HashMap；PriorityQueue 的迭代顺序不等于排序输出。

人工确认：无新增阻塞事项。运行验证范围见文末。

### 4. 迭代一致性

文件：[concurrent-collection-iteration-consistency.mdx](../../../docs/basic-knowledge/java/collections/concurrent-collection-iteration-consistency.mdx)。

负责 fail-fast、弱一致和快照的差异。补充复制 ConcurrentHashMap 无法取得同一时刻快照。说明共享锁、不可变版本与乐观读取各自的前提。

新增题：`copy-map-snapshot`。

依据：[Java API：ConcurrentHashMap](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ConcurrentHashMap.html)、[Java API：CopyOnWriteArrayList](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/CopyOnWriteArrayList.html)、[Java API：ConcurrentLinkedQueue](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ConcurrentLinkedQueue.html)、[Java 26：StampedLock](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/locks/StampedLock.html)。已加入或保留于文章参考资料。

修正与澄清：修正条件删除被理解为按对象身份验证的问题。remove(key, value) 使用相等判断。相等的新值仍可能被删除，可变旧对象也无法充当版本。修正“复制或简单版本计数即可取得快照”的笼统建议。

人工确认：无新增阻塞事项。运行验证范围见文末。

### 5. ConcurrentHashMap

文件：[concurrenthashmap-atomic-compound-operations.mdx](../../../docs/basic-knowledge/java/collections/concurrenthashmap-atomic-compound-operations.mdx)。

负责查找、桶更新、扩容与单键原子操作。补充 compute 的 null、异常和删除语义。解释容器安全与可变 value 的关系，以及 LongAdder 的键删除边界。

新增题：`compute-null-and-values`。

依据：[Java API：ConcurrentHashMap](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ConcurrentHashMap.html)、[OpenJDK：ConcurrentHashMap 源码](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/java.base/share/classes/java/util/concurrent/ConcurrentHashMap.java)、[Java API：ConcurrentMap](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ConcurrentMap.html)。已加入或保留于文章参考资料。

修正与澄清：修正 compute 系列一律锁已有桶的描述，区分空桶占位等路径。把回调约束写为避免修改该 Map；读取其他 key 不属于相同禁令。区分扩容转发读取与更新协助。

人工确认：无新增阻塞事项。运行验证范围见文末。

### 6. ConcurrentLinkedQueue

文件：[concurrentlinkedqueue-lock-free-path.mdx](../../../docs/basic-knowledge/java/collections/concurrentlinkedqueue-lock-free-path.mdx)。

负责链式队列的 offer/poll 路径、CAS 线性化点与推进保证。补充入队前写入的可见性及入队后修改的同步责任。背压与阻塞关闭引用 BlockingQueue。

新增题：`clq-publication`。

依据：[Java API：ConcurrentLinkedQueue](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ConcurrentLinkedQueue.html)、[OpenJDK：ConcurrentLinkedQueue 源码](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/java.base/share/classes/java/util/concurrent/ConcurrentLinkedQueue.java)。已加入或保留于文章参考资料。

修正与澄清：把 lock-free 解释为系统整体的推进保证。单线程仍可反复重试，不能据此得到 wait-free 保证。明确 size 为遍历结果，无法充当准确的并发控制条件。

人工确认：无新增阻塞事项。运行验证范围见文末。

### 7. CopyOnWrite 容器

文件：[copy-on-write-cost-model.mdx](../../../docs/basic-knowledge/java/collections/copy-on-write-cost-model.mdx)。

负责数组发布、写入成本、快照迭代与旧版本保留。补充 addIfAbsent/addAllAbsent 的原子去重机制。保留元素浅复制边界，说明多个写者需遵守相同去重规则。

新增题：`cow-add-if-absent`。

依据：[Java API：CopyOnWriteArrayList](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/CopyOnWriteArrayList.html)、[OpenJDK：CopyOnWriteArrayList 源码](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/java.base/share/classes/java/util/concurrent/CopyOnWriteArrayList.java)、[Java API：CopyOnWriteArraySet](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/CopyOnWriteArraySet.html)。已加入或保留于文章参考资料。

修正与澄清：修正“每次写操作都会复制数组”的绝对说法。OpenJDK 26 的 set 传入相同引用可复用数组，删除未命中也可直接返回。

人工确认：无新增阻塞事项。运行验证范围见文末。

### 8. HashMap

文件：[hashmap-structure-lookup-path.mdx](../../../docs/basic-knowledge/java/collections/hashmap-structure-lookup-path.mdx)。

负责桶定位、冲突查找、树化与扩容拆分。补充初始容量与预计映射数量的区别。加入 Java 19 起的 newHashMap 与容量计算示例。

新增题：`hashmap-expected-size`。

依据：[Java API：HashMap](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashMap.html)、[Java API：Map](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html)、[OpenJDK：HashMap 源码](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/java.base/share/classes/java/util/HashMap.java)、[Java API：Object.hashCode](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#hashCode())。已加入或保留于文章参考资料。

修正与澄清：修正 putVal 的树化边界：链表新增第 9 个节点时请求树化，数组容量还需至少 64。阈值 6 用于扩容拆分；删除退化另有结构判断。同哈希且不可比较的树节点查找仍可接近线性。

人工确认：无新增阻塞事项。运行验证范围见文末。

### 9. 集合迭代器

文件：[iterator-fail-fast-immutable.mdx](../../../docs/basic-knowledge/java/collections/iterator-fail-fast-immutable.mdx)。

负责 Iterator 协议、fail-fast 和只读集合边界。新增 remove 的状态规则、synchronizedList 外部锁与原始类型数组的 asList 行为。并发一致性分类改为相邻文章链接。

新增题：`iterator-remove-state`、`synchronized-list-iteration`、`primitive-array-as-list`。

依据：[Java API：Iterator](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Iterator.html)、[Java API：ConcurrentModificationException](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ConcurrentModificationException.html)、[Java API：List.copyOf](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#copyOf(java.util.Collection))、[Java API：Collections.unmodifiableList](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collections.html#unmodifiableList(java.util.List))、[Java 26：Arrays.asList](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Arrays.html#asList(T...))、[Java 26：Stream.toList](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#toList())、[Java 26：Collections.synchronizedList](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collections.html#synchronizedList(java.util.List))。已加入或保留于文章参考资料。

修正与澄清：把 modCount 细节限定为 ArrayList 实现。明确 fail-fast 是尽力检测。区分 Arrays.asList 的定长视图、unmodifiableList 的共享视图和 copyOf 的结构隔离；补明工厂方法版本。

人工确认：无新增阻塞事项。运行验证范围见文末。

### 10. LinkedHashMap

文件：[linkedhashmap-lru.mdx](../../../docs/basic-knowledge/java/collections/linkedhashmap-lru.mdx)。

负责插入顺序、访问顺序与条目数 LRU。补充触发访问重排的方法表、命中尾节点的边界，以及淘汰钩子的触发时机。HashMap 桶机制改为引用。

新增题：`lru-access-methods`。

依据：[Java API：LinkedHashMap](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedHashMap.html)、[OpenJDK：LinkedHashMap 源码](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/java.base/share/classes/java/util/LinkedHashMap.java)、[Java API：removeEldestEntry](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedHashMap.html#removeEldestEntry(java.util.Map.Entry))。已加入或保留于文章参考资料。

修正与澄清：修正简单 LRU 缺少“按大小淘汰”的模糊说法：它已经按条目数淘汰，缺少的是权重等策略。明确 containsKey 和集合视图访问不会刷新访问顺序；淘汰钩子由插入触发。

人工确认：无新增阻塞事项。运行验证范围见文末。

### 11. LinkedList

文件：[linkedlist-semantics-cost.mdx](../../../docs/basic-knowledge/java/collections/linkedlist-semantics-cost.mdx)。

负责双向节点、定位成本、Deque 语义和 ListIterator 游标。补充迭代器插入后 next/previous 的位置。数组布局与集合工厂改为相邻文章链接。

新增题：`list-iterator-cursor`。

依据：[Java API：LinkedList](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html)、[OpenJDK：LinkedList 源码](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/java.base/share/classes/java/util/LinkedList.java)、[Java API：ArrayDeque](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayDeque.html)、[Java API：ListIterator](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ListIterator.html)。已加入或保留于文章参考资料。

修正与澄清：区分节点已定位的 O(1) 插入与按下标定位的总成本。去掉对 ArrayDeque 自动缩容的暗示，改为复用数组和按需扩容。

人工确认：无新增阻塞事项。运行验证范围见文末。

### 12. TreeMap 与 TreeSet

文件：[treemap-treeset-ordered-query.mdx](../../../docs/basic-knowledge/java/collections/treemap-treeset-ordered-query.mdx)。

负责比较器、红黑树、有序导航与范围查询。补充共享范围视图、越界插入和导航 Entry 的快照语义。新增 subMap.clear 的追问。

新增题：`ordered-range-view`。

依据：[Java API：TreeMap](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/TreeMap.html)、[Java API：TreeSet](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/TreeSet.html)、[Java API：NavigableMap](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableMap.html)、[Java API：Comparator](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html)。已加入或保留于文章参考资料。

修正与澄清：把比较器与 equals 一致性写为通用 Set/Map 契约的要求。明确范围视图会回写原表；floorEntry 等导航结果不支持 setValue。空键能力取决于比较器定义。

人工确认：无新增阻塞事项。运行验证范围见文末。

### 13. 批处理与分页

文件：[batching-pagination-data-access-tests.mdx](../../../docs/basic-knowledge/java/data-access/batching-pagination-data-access-tests.mdx)。

负责 JDBC/MyBatis/Hibernate 批处理、稳定分页与数据库测试。补充 batch_size、更新计数、批次与提交的边界。JPQL 批量更新和集合抓取分页分别引用 JPA 与 N+1 查询。

新增题：`batch-size-commit-boundary`。

依据：[MyBatis：Java API](https://mybatis.org/mybatis-3/java-api.html)、[Hibernate ORM User Guide：Batching](https://docs.hibernate.org/orm/7.1/userguide/html_single/Hibernate_User_Guide.html#batch)、[JDBC：BatchUpdateException](https://docs.oracle.com/en/java/javase/26/docs/api/java.sql/java/sql/BatchUpdateException.html)、[MySQL 8.4：Row Constructor Optimization](https://dev.mysql.com/doc/refman/8.4/en/row-constructor-optimization.html)、[JDBC 26：Statement.executeBatch](https://docs.oracle.com/en/java/javase/26/docs/api/java.sql/java/sql/Statement.html#executeBatch())、[MySQL 8.4：LIMIT Query Optimization](https://dev.mysql.com/doc/refman/8.4/en/limit-optimization.html)。已加入或保留于文章参考资料。

修正与澄清：补全 JDBC 的 SUCCESS_NO_INFO=-2、EXECUTE_FAILED=-3。区分 flush/clear 和 commit。写明 Hibernate 7.1 使用 IDENTITY 时关闭 JDBC 插入批处理；batch_size 无法决定事务锁持有时长。

人工确认：无新增阻塞事项。运行验证范围见文末。

### 14. JPA

文件：[jpa-entity-states-dirty-checking-lazy-loading.mdx](../../../docs/basic-knowledge/java/data-access/jpa-entity-states-dirty-checking-lazy-loading.mdx)。

负责实体状态、持久化上下文、脏检查和延迟加载。按 Jakarta Persistence 3.2 与 Hibernate 7.1 说明默认抓取、级联、merge 与批量操作。新增 AUTO/COMMIT 刷新模式的查询可见性。

新增题：`flush-mode-query`。

依据：[Jakarta Persistence 3.2 Specification](https://jakarta.ee/specifications/persistence/3.2/jakarta-persistence-spec-3.2.html)、[Jakarta Persistence：EntityManager](https://jakarta.ee/specifications/persistence/3.2/apidocs/jakarta.persistence/jakarta/persistence/entitymanager)、[Hibernate ORM：Persistence Contexts](https://docs.hibernate.org/orm/7.1/userguide/html_single/Hibernate_User_Guide.html#pc)、[Spring：OpenEntityManagerInViewFilter](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/orm/jpa/support/OpenEntityManagerInViewFilter.html)。已加入或保留于文章参考资料。

修正与澄清：区分 merge 参数和返回的受管对象。明确 LAZY 是提示、EAGER 是要求。限定 orphanRemoval 适用关联。区分 OSIV 上下文与事务，说明回滚没有恢复 Java 字段的保证。

人工确认：无新增阻塞事项。运行验证范围见文末。

### 15. N+1 查询

文件：[n-plus-one-fetch-strategies.mdx](../../../docs/basic-knowledge/java/data-access/n-plus-one-fetch-strategies.mdx)。

负责 N+1 触发条件、抓取策略、分页和查询数量验证。补充 fetchgraph/loadgraph 区别、Hibernate 6 起的根实体去重，以及批量抓取配置。新增读取批量与 JDBC 写入批次的对比题。

新增题：`batch-fetch-vs-jdbc-batch`。

依据：[Hibernate ORM：Association Fetching](https://docs.hibernate.org/orm/7.1/introduction/html_single/#association-fetching)、[Hibernate ORM User Guide：Dynamic Fetching](https://docs.hibernate.org/orm/7.1/userguide/html_single/Hibernate_User_Guide.html#fetching-strategies-dynamic-fetching)、[Jakarta Persistence：Entity Graphs](https://jakarta.ee/specifications/persistence/3.2/jakarta-persistence-spec-3.2.html#a2813)。已加入或保留于文章参考资料。

修正与澄清：区分内连接抓取与 left join fetch 对空关联父记录的影响。写明 fail_on_pagination_over_collection_fetch=true。避免把 EAGER 或关联抓取批量误当成固定一条查询。

人工确认：无新增阻塞事项。运行验证范围见文末。

### 16. Java API 设计

文件：[api-design-from-invariants.mdx](../../../docs/basic-knowledge/java/quality/api-design-from-invariants.mdx)。

负责不变量、领域类型、空值、失败模型与兼容性。补充 Optional 默认值的求值时机。加入源码、二进制与行为兼容的区分；可变状态保护引用不可变对象文章。

新增题：`optional-eager-default`。

依据：[Java API：Objects.requireNonNull](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Objects.html#requireNonNull(T,java.lang.String))、[Java API：Optional](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html)、[JLS 26：Binary Compatibility](https://docs.oracle.com/en/java/javase/26/docs/specs/jls/jls-13.html)、[JLS 26：Evaluation of Argument Lists](https://docs.oracle.com/en/java/javase/26/docs/specs/jls/jls-15.html#jls-15.12.4.2)。已加入或保留于文章参考资料。

修正与澄清：修正领域类型能阻止所有参数顺序错误的暗示。同为 AccountId 的 from/to 仍可传反。明确 orElse 的实参立即求值，orElseGet 的 Supplier 在空值时执行。

人工确认：无新增阻塞事项。运行验证范围见文末。

### 17. 不可变对象

文件：[immutable-objects-defensive-copying.mdx](../../../docs/basic-knowledge/java/quality/immutable-objects-defensive-copying.mdx)。

负责状态不变条件、防御性复制、record 与安全发布。补充数组字段输入/输出复制、数组相等性，以及先复制后校验的顺序。集合视图细节引用集合迭代器。

新增题：`copy-before-validation`。

依据：[Java Tutorials：A Strategy for Defining Immutable Objects](https://docs.oracle.com/javase/tutorial/essential/concurrency/imstrat.html)、[Java Language Specification：final Field Semantics](https://docs.oracle.com/en/java/javase/26/docs/specs/jls/jls-17.html#jls-17.5)、[Java Language Specification：Record Classes](https://docs.oracle.com/en/java/javase/26/docs/specs/jls/jls-8.html#jls-8.10)、[Java API：List.copyOf](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#copyOf(java.util.Collection))、[JLS 26：Record Members](https://docs.oracle.com/en/java/javase/26/docs/specs/jls/jls-8.html#jls-8.10.3)。已加入或保留于文章参考资料。

修正与澄清：final 或 sealed 本身不足以保证对象不可变。List.copyOf 可复用符合条件的实例，不能据此承诺新对象。区分 final 字段初始化保证与后续共享引用更新；复制操作也要求输入在复制时稳定。

人工确认：无新增阻塞事项。运行验证范围见文末。

### 18. JUnit

文件：[junit-assertions-parameterized-tests.mdx](../../../docs/basic-knowledge/java/quality/junit-assertions-parameterized-tests.mdx)。

负责 JUnit 5.13.4 的断言、参数化、生命周期与隔离。补充 assertThrowsExactly、MethodSource 生命周期条件，以及两类超时断言。新增抢占式超时与线程事务边界的自测。

新增题：`timeout-thread-boundary`。

依据：[JUnit User Guide：Writing Tests](https://docs.junit.org/5.13.4/user-guide/#writing-tests)、[JUnit User Guide：Assertions](https://docs.junit.org/5.13.4/user-guide/#writing-tests-assertions)、[JUnit User Guide：Parameterized Tests](https://docs.junit.org/5.13.4/user-guide/#writing-tests-parameterized-tests)、[JUnit User Guide：Test Instance Lifecycle](https://docs.junit.org/5.13.4/user-guide/#writing-tests-test-instance-lifecycle)。已加入或保留于文章参考资料。

修正与澄清：明确 assertThrows 接受异常子类。assertTimeout 不主动中止测试；assertTimeoutPreemptively 使用其他线程。基于 ThreadLocal 的事务上下文因此可能不覆盖被测代码。

人工确认：无新增阻塞事项。运行验证范围见文末。

### 19. 测试替身

文件：[test-doubles-mock-stub-boundaries.mdx](../../../docs/basic-knowledge/java/quality/test-doubles-mock-stub-boundaries.mdx)。

负责 Stub、Mock、Fake、Spy 与业务交互验证。按 Mockito 5.20.0 补充 Spy 配置时的真实调用、doReturn、参数匹配器与 ArgumentCaptor。真实数据库与契约验证引用负责文章。

新增题：`spy-stubbing`、`mock-argument-capture`。

依据：[Mockito 官方 API](https://javadoc.io/static/org.mockito/mockito-core/5.20.0/org.mockito/org/mockito/Mockito.html)、[Mockito：ArgumentMatchers](https://javadoc.io/static/org.mockito/mockito-core/5.20.0/org.mockito/org/mockito/ArgumentMatchers.html)、[JUnit User Guide](https://docs.junit.org/5.13.4/user-guide/)。已加入或保留于文章参考资料。

修正与澄清：明确时钟、随机源属于可替换协作者，并非进程外依赖。verify 发布端口无法证明真实提交后的发送时机。Fake 示例标为保存方法片段，避免误认为完整 Repository 实现。

人工确认：无新增阻塞事项。运行验证范围见文末。

### 20. 测试金字塔

文件：[test-pyramid-contract-regression.mdx](../../../docs/basic-knowledge/java/quality/test-pyramid-contract-regression.mdx)。

负责测试层级、风险、覆盖率与回归。新增 Pact 消费方契约到服务端验证的流程、provider state，以及 PIT 的存活与等价变异。Testcontainers 示例固定到 1.21.3 API。

新增题：`contract-provider-verification`、`mutation-survivors`。

依据：[JUnit User Guide](https://docs.junit.org/5.13.4/user-guide/)、[Pact：How Pact works](https://docs.pact.io/getting_started/how_pact_works)、[Pact：Provider states](https://docs.pact.io/getting_started/provider_states)、[JaCoCo：Coverage Counter](https://www.jacoco.org/jacoco/trunk/doc/counters.html)、[PIT：Basic concepts](https://pitest.org/quickstart/basic_concepts/)、[Testcontainers 1.21.3：PostgreSQLContainer 源码](https://github.com/testcontainers/testcontainers-java/blob/1.21.3/modules/postgresql/src/main/java/org/testcontainers/containers/PostgreSQLContainer.java)。已加入或保留于文章参考资料。

修正与澄清：去掉固定测试数量比例的暗示。明确 JaCoCo 行覆盖与分支覆盖的区别，异常处理不计入其分支计数。模拟服务测试通过仍需真实提供方验证；存活变异需排查等价情况。

人工确认：无新增阻塞事项。运行验证范围见文末。

## 验证

要求的检查均通过：

```sh
node scripts/check-article-format.mjs --style-strict -- \
  docs/basic-knowledge/java/collections/arraylist-growth-memory-locality.mdx \
  docs/basic-knowledge/java/collections/blockingqueue-producer-consumer.mdx \
  docs/basic-knowledge/java/collections/collection-interface-selection.mdx \
  docs/basic-knowledge/java/collections/concurrent-collection-iteration-consistency.mdx \
  docs/basic-knowledge/java/collections/concurrenthashmap-atomic-compound-operations.mdx \
  docs/basic-knowledge/java/collections/concurrentlinkedqueue-lock-free-path.mdx \
  docs/basic-knowledge/java/collections/copy-on-write-cost-model.mdx \
  docs/basic-knowledge/java/collections/hashmap-structure-lookup-path.mdx \
  docs/basic-knowledge/java/collections/iterator-fail-fast-immutable.mdx \
  docs/basic-knowledge/java/collections/linkedhashmap-lru.mdx \
  docs/basic-knowledge/java/collections/linkedlist-semantics-cost.mdx \
  docs/basic-knowledge/java/collections/treemap-treeset-ordered-query.mdx \
  docs/basic-knowledge/java/data-access/batching-pagination-data-access-tests.mdx \
  docs/basic-knowledge/java/data-access/jpa-entity-states-dirty-checking-lazy-loading.mdx \
  docs/basic-knowledge/java/data-access/n-plus-one-fetch-strategies.mdx \
  docs/basic-knowledge/java/quality/api-design-from-invariants.mdx \
  docs/basic-knowledge/java/quality/immutable-objects-defensive-copying.mdx \
  docs/basic-knowledge/java/quality/junit-assertions-parameterized-tests.mdx \
  docs/basic-knowledge/java/quality/test-doubles-mock-stub-boundaries.mdx \
  docs/basic-knowledge/java/quality/test-pyramid-contract-regression.mdx
npm run build
git diff --check
```

- 严格格式检查：20 篇，0 篇结构问题，0 篇文风提示。
- 稳定性核对：原有 46 张卡片、全部已有显式锚点和 knowledge.id 保留；新增 24 张卡片，未出现重复锚点。
- 构建：文档链接、复习资源及站点数据检查通过。Docusaurus 成功生成静态文件。
- 全仓库非阻断检查仍有本批之外 6 篇结构问题、131 篇文风提示。另有已有博客作者、摘要、Node localStorage 与 Docusaurus 更新检查提示；未扩大任务范围处理。

## 未完成与人工确认

无阻塞事项。技术事实以固定版本官方文档、规范和源码核对。当前本机 Java 无法执行，已有 Docker 镜像也不含 JDK。本批未新建容器、映射主机端口或安装运行环境。Java 片段、ORM 集成和性能行为未做运行实验，不将源码核对表述为实测结果。
