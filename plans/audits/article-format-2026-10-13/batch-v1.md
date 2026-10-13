# 批次 v1：版本回调

本批只修改指定的 31 篇文章与本记录。Java 参考资料统一采用 Java 21。
Java 17 与 21 存在相关差异时，正文分别说明。
数据访问采用 MySQL 8.0、Hibernate 5.6/6.2。

## 逐篇对照

全部文章的 Java 参考资料均已回调。
源码链接由 `jdk-26-ga`、`jdk-26%2B35` 改为 `jdk-21-ga`。
API 链接由 `javase/26` 改为 `javase/21`。
JLS/JVMS 链接由 `se26` 改为 `se21`。
原有 Java 21 正式特性与 JDK 7/8 面试对比保留。

| 序号 | 文章 | 版本表述前后对照 |
| --- | --- | --- |
| 1 | [arraylist-growth-memory-locality.mdx](../../../docs/basic-knowledge/java/collections/arraylist-growth-memory-locality.mdx) | 扩容、removeIf、SubList 和首次分配：OpenJDK 26 → 21。 |
| 2 | [blockingqueue-producer-consumer.mdx](../../../docs/basic-knowledge/java/collections/blockingqueue-producer-consumer.mdx) | 数组队列共用锁、链式队列双锁：OpenJDK 26 → 21。 |
| 3 | [collection-interface-selection.mdx](../../../docs/basic-knowledge/java/collections/collection-interface-selection.mdx) | 接口契约、PriorityQueue：Java 26 → 21；保留 Java 21 的 SequencedCollection。 |
| 4 | [concurrent-collection-iteration-consistency.mdx](../../../docs/basic-knowledge/java/collections/concurrent-collection-iteration-consistency.mdx) | 迭代一致性基线：Java 26 API → Java 21 API。 |
| 5 | [concurrenthashmap-atomic-compound-operations.mdx](../../../docs/basic-knowledge/java/collections/concurrenthashmap-atomic-compound-operations.mdx) | 桶级同步、concurrencyLevel、协作扩容：OpenJDK 26 → 21；保留 JDK 7/8 对比。 |
| 6 | [concurrentlinkedqueue-lock-free-path.mdx](../../../docs/basic-knowledge/java/collections/concurrentlinkedqueue-lock-free-path.mdx) | CAS 队列与 size 遍历：OpenJDK 26 → 21。 |
| 7 | [copy-on-write-cost-model.mdx](../../../docs/basic-knowledge/java/collections/copy-on-write-cost-model.mdx) | 数组发布、相同引用 set：OpenJDK 26 → 21。 |
| 8 | [hashmap-structure-lookup-path.mdx](../../../docs/basic-knowledge/java/collections/hashmap-structure-lookup-path.mdx) | 树化、初始容量：OpenJDK 26 → 21。容量工厂的“Java 19 起”改为 Java 21 用法；补充 Java 17 的容量预估。 |
| 9 | [iterator-fail-fast-immutable.mdx](../../../docs/basic-knowledge/java/collections/iterator-fail-fast-immutable.mdx) | 迭代协议、fail-fast、只读集合基线：Java 26 → 21。 |
| 10 | [linkedhashmap-lru.mdx](../../../docs/basic-knowledge/java/collections/linkedhashmap-lru.mdx) | 插入顺序、访问顺序与 LRU 基线：Java 26 → 21。 |
| 11 | [linkedlist-semantics-cost.mdx](../../../docs/basic-knowledge/java/collections/linkedlist-semantics-cost.mdx) | 链表定位、游标编辑与节点成本：OpenJDK 26 → 21。 |
| 12 | [treemap-treeset-ordered-query.mdx](../../../docs/basic-knowledge/java/collections/treemap-treeset-ordered-query.mdx) | 比较与导航契约、红黑树实现：Java/OpenJDK 26 → 21。 |
| 13 | [atomic-longadder-contention.mdx](../../../docs/basic-knowledge/java/concurrency/atomic-longadder-contention.mdx) | base 与 Cell 实现：OpenJDK 26 → 21。 |
| 14 | [cas-aba-versioning.mdx](../../../docs/basic-knowledge/java/concurrency/cas-aba-versioning.mdx) | 正文无需回调；原子类与 VarHandle 参考版本：Java 26 → 21。 |
| 15 | [future-completablefuture-errors.mdx](../../../docs/basic-knowledge/java/concurrency/future-completablefuture-errors.mdx) | 默认异步执行器：Java 26 → Java 17/21；补回公共池并行度不足 2 时的新建线程分支。 |
| 16 | [interruption-timeout-cancellation.mdx](../../../docs/basic-knowledge/java/concurrency/interruption-timeout-cancellation.mdx) | 正文无需回调；Future、FutureTask 等参考版本：Java 26 → 21。 |
| 17 | [jmm-happens-before.mdx](../../../docs/basic-knowledge/java/concurrency/jmm-happens-before.mdx) | 正文无需回调；JLS 与 JUC、Thread 参考版本：Java 26 → 21。 |
| 18 | [latch-barrier-semaphore.mdx](../../../docs/basic-knowledge/java/concurrency/latch-barrier-semaphore.mdx) | 正文无需回调；同步器 API 参考版本：Java 26 → 21。 |
| 19 | [liveness-deadlock-livelock-starvation.mdx](../../../docs/basic-knowledge/java/concurrency/liveness-deadlock-livelock-starvation.mdx) | ThreadMXBean 的虚拟线程覆盖边界：Java 26 → 21。 |
| 20 | [lock-contention-context-switch-benchmark.mdx](../../../docs/basic-knowledge/java/concurrency/lock-contention-context-switch-benchmark.mdx) | JFR 三类锁事件与诊断工具基线：Java/OpenJDK 26 → 21。 |
| 21 | [locks-vs-lock-free-cost.mdx](../../../docs/basic-knowledge/java/concurrency/locks-vs-lock-free-cost.mdx) | Striped64.Cell 的 @Contended：OpenJDK 26 → 21。 |
| 22 | [safe-publication-escape-final.mdx](../../../docs/basic-knowledge/java/concurrency/safe-publication-escape-final.mdx) | 正文无需回调；JLS、只读视图与复制 API：Java 26 → 21。 |
| 23 | [synchronized-monitor-optimizations.mdx](../../../docs/basic-knowledge/java/concurrency/synchronized-monitor-optimizations.mdx) | 偏向锁的 JDK 15 起禁用表述 → Java 17/21 默认不使用。JDK 24 的 pinning 改进 → Java 21 持锁阻塞会 pinning。删除 JEP 引用，改用 Java 17 选项文档。 |
| 24 | [thread-lifecycle-interruption.mdx](../../../docs/basic-knowledge/java/concurrency/thread-lifecycle-interruption.mdx) | Thread.stop 的 Java 26 表述 → Java 17 强制终止、Java 21 抛异常。补充 Java 17 API。 |
| 25 | [thread-safety-race-conditions.mdx](../../../docs/basic-knowledge/java/concurrency/thread-safety-race-conditions.mdx) | 正文无需回调；JLS、JUC 与 ConcurrentMap 参考版本：Java 26 → 21。 |
| 26 | [threadlocal-leaks-context.mdx](../../../docs/basic-knowledge/java/concurrency/threadlocal-leaks-context.mdx) | ThreadLocalMap：OpenJDK 26 → 21。JDK 25 ScopedValue 与结构化传播段落 → Java 21 的显式传播、清理与恢复。删除 ScopedValue 和 JEP 资料。 |
| 27 | [threadpoolexecutor-execution-path.mdx](../../../docs/basic-knowledge/java/concurrency/threadpoolexecutor-execution-path.mdx) | 线程池五种状态：OpenJDK 26 → 21。 |
| 28 | [virtual-threads-boundaries.mdx](../../../docs/basic-knowledge/java/concurrency/virtual-threads-boundaries.mdx) | 运行模型明确为 Java 21。JDK 24 卸载改进 → 持锁阻塞会 pinning；诊断参数移除说明 → Java 21 参数与 JFR 阈值。删除 ScopedValue、FFM 及 JEP 资料；ThreadMXBean 基线 26 → 21。 |
| 29 | [volatile-barriers-visibility.mdx](../../../docs/basic-knowledge/java/concurrency/volatile-barriers-visibility.mdx) | 正文无需回调；JLS、VarHandle、AtomicIntegerArray 参考版本：Java 26 → 21。 |
| 30 | [batching-pagination-data-access-tests.mdx](../../../docs/basic-knowledge/java/data-access/batching-pagination-data-access-tests.mdx) | MySQL 8.4 → 8.0；Hibernate 7.1 → 5.6/6.2。分页与合批结论保留，参考手册同步回调。 |
| 31 | [collectors-grouping-reduction.mdx](../../../docs/basic-knowledge/java/functional/collectors-grouping-reduction.mdx) | toMap 与 groupingBy 的 null 约束：OpenJDK 26 → 21。 |

## 题目与参考回答

仅一张卡片改写题面，ID 为 `pinning-version-boundary`。

- 原题：JDK 24 后还需要为虚拟线程批量替换 synchronized 吗？
- 新题：Java 21 中虚拟线程何时需要替换 synchronized？
- 原回答：JDK 24 已改进 monitor 阻塞时的卸载。
- 新回答：Java 21 中持锁阻塞会绑定 carrier。频繁持锁执行慢 I/O 时，可改用 ReentrantLock。短小的内存操作可保留 synchronized。
- 考察重点同步改为持锁阻塞、诊断与锁替换条件。

其余题面不变。以下卡片的答案或考察重点调整了版本：

| 文章 | 卡片 ID | 调整 |
| --- | --- | --- |
| ArrayList | `arraylist-growth`、`sublist-retention` | 实现基线由 OpenJDK 26 改为 21。 |
| BlockingQueue | `choose-blocking-queue` | 锁实现基线由 OpenJDK 26 改为 21。 |
| ConcurrentHashMap | `chm-thread-safety` | CAS 与桶级同步基线由 OpenJDK 26 改为 21。 |
| HashMap | `treeify` | 树化基线由 OpenJDK 26 改为 21。 |
| HashMap | `hashmap-expected-size` | 基线改为 21；补充 Java 17 的容量预估。 |
| CompletableFuture | `completablefuture-errors-executor` | 改为 Java 17/21，补充低并行度时新建线程。 |
| 并发活跃性 | `deadlock-detection-scope` | ThreadMXBean 基线由 Java 26 改为 21。 |
| 虚拟线程 | `virtual-thread-fit` | JDK 24 改进改为 Java 21 的 pinning 边界。 |
| 批处理与分页 | `flush-clear` | IDENTITY 插入合批基线由 Hibernate 7.1 改为 5.6/6.2。 |

## 核验与结果

- `node scripts/check-article-format.mjs --style-strict -- <本批全部文件>` 通过。
- 格式检查覆盖全部 31 篇。结构问题 0，文风提示 0。
- `npm run build` 通过。链接、资源、文章格式检查及静态构建均成功。
- 对照修改前内容，31 个 knowledge.id 与全部显式锚点不变。
- 92 张卡片全部保留，没有新增或删除卡片。
- 本批文章不再含 Java 22 及以后版本、预览特性或 JEP 引用。
- 检查了 117 个目标版本引用。115 个直接请求成功。
- 两个 Hibernate 链接的直接请求返回 403。已通过网页工具读取对应官方手册。
- 未切换分支，未创建 git 提交。

构建出现 Node localStorage 与 Docusaurus 更新检查提示。
两者均未影响构建成功。

关键行为核验资料：

- [Java 21 虚拟线程](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html)
- [Java 21 CompletableFuture](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/CompletableFuture.html)
- [Java 17 Thread.stop](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Thread.html#stop())
- [Java 21 Thread.stop](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Thread.html#stop())
- [MySQL 8.0 元组比较优化](https://dev.mysql.com/doc/refman/8.0/en/row-constructor-optimization.html)
- [MySQL 8.0 LIMIT 优化](https://dev.mysql.com/doc/refman/8.0/en/limit-optimization.html)
- [Hibernate 5.6 批处理](https://docs.jboss.org/hibernate/orm/5.6/userguide/html_single/Hibernate_User_Guide.html#batch)
- [Hibernate 6.2 批处理](https://docs.hibernate.org/orm/6.2/userguide/html_single/Hibernate_User_Guide.html#batch)
