# 文章格式审计：batch-7

日期：2026-10-13。分支：`content/article-format-2026-10-13`。

本批完成指定 21 篇 Java 并发文章。保留 23 道原有卡片，新增 34 道本站原理自测。未提交 git。

## 表达与标识

- 完整阅读根目录 AGENTS.md 和 batch-1b 记录。随后阅读 InnoDB 锁与 TCP 连接两篇样例。
- 每篇开头说明范围，并链接相邻文章。普通二、三级标题使用概念名；面试题保留完整问句。
- 面试核心改为可复述的结论。参考回答首句直接回答，再给推导和适用条件。
- 正文逐段通读，并修正长句、模糊限定和连续否定。代码附近注明关键前提、结果和版本。
- 与 HEAD 比较，knowledge.id、已有显式锚点全部保留。原有卡片未删除、未合并；公司归属及来源注释保持不变。
- 全部二、三级标题都有显式锚点。新增普通锚点取标题文字，新增卡片 ID 使用英文。
- 新增题目均使用统一的本站自测注释。参考资料保持连续列表。

## 每篇改动与依据

### 1. AQS

文件：[aqs-state-wait-queue.mdx](../../../docs/basic-knowledge/java/concurrency/aqs-state-wait-queue.mdx)。

明确 state 的 volatile/CAS 语义和队列分工。补充共享获取返回值、单许可与虚假唤醒。Condition 的使用方法链接至 ReentrantLock。

新增题：`shared-acquire-result`、`park-unpark-permit`。

依据：[Java API：`AbstractQueuedSynchronizer`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/locks/AbstractQueuedSynchronizer.html)、[Java API：`LockSupport`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/locks/LockSupport.html)。以上资料已加入或保留于文章参考资料。

修正与边界：修正 Condition 等待步骤的顺序。节点先入条件队列，再完全释放同步状态。补充 FIFO 排队与公平获取的区别。

人工确认：无额外事项；运行验证边界见下文。

### 2. Java 原子类

文件：[atomic-longadder-contention.mdx](../../../docs/basic-knowledge/java/concurrency/atomic-longadder-contention.mdx)。

区分原子读改写、分散累加与静止期精确求和。补充原子切换统计窗口和不可变状态读取。

新增题：`adder-reset-boundary`。

依据：[Java API：`AtomicLong`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/atomic/AtomicLong.html)、[Java API：`LongAdder`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/atomic/LongAdder.html)、[OpenJDK 26：Striped64](https://github.com/openjdk/jdk/blob/jdk-26%2B35/src/java.base/share/classes/java/util/concurrent/atomic/Striped64.java)、[Java 26 API：AtomicReference](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/atomic/AtomicReference.html)。以上资料已加入或保留于文章参考资料。

修正与边界：修正“AtomicLong 用一次 CAS 完成读改写”。API 保证原子性，具体指令取决于实现。明确并发 sum 的快照边界，保留静止期的精确性。

人工确认：无额外事项；运行验证边界见下文。

### 3. CAS

文件：[cas-aba-versioning.mdx](../../../docs/basic-knowledge/java/concurrency/cas-aba-versioning.mdx)。

补充弱 CAS 的虚假失败和内存模式。区分纯计算重试与外部动作的提交边界。ABA 增加节点历史、版本回绕和引用身份说明。

新增题：`weak-cas-semantics`、`cas-retry-effects`。

依据：[Java API：`java.util.concurrent.atomic`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/atomic/package-summary.html)、[Java API：`AtomicStampedReference`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/atomic/AtomicStampedReference.html)、[Java API：`VarHandle.compareAndSet`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/invoke/VarHandle.html#compareAndSet(java.lang.Object...))、[Java 26 API：AtomicInteger](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/atomic/AtomicInteger.html)、[Java 26 API：AtomicReference](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/atomic/AtomicReference.html)。以上资料已加入或保留于文章参考资料。

修正与边界：纠正“调用 CAS 就没有锁等待”的推断。进度保证由完整算法决定。旧 weakCompareAndSet 的 plain 语义写明版本。

人工确认：无额外事项；运行验证边界见下文。

### 4. CompletableFuture

文件：[future-completablefuture-errors.mdx](../../../docs/basic-knowledge/java/concurrency/future-completablefuture-errors.mdx)。

补充 whenComplete 回调异常、allOf/anyOf 完成条件。明确空输入、剩余任务和取消的责任。Java 26 默认执行器单独注明版本。

新增题：`completion-observer-failure`、`allof-anyof-failure`。

依据：[Java API：`Future`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/Future.html)、[Java API：`CompletableFuture`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/CompletableFuture.html)。以上资料已加入或保留于文章参考资料。

修正与边界：修正 whenComplete 只观察且不改变结果的绝对表述。原成功阶段仍成功，新阶段可因回调抛错而失败。handle/exceptionally 也需正常返回才完成恢复。

人工确认：无额外事项；运行验证边界见下文。

### 5. 任务取消

文件：[interruption-timeout-cancellation.mdx](../../../docs/basic-knowledge/java/concurrency/interruption-timeout-cancellation.mdx)。

补充 cancel(false)、isDone 与实际退出的区别。保留截止时间、资源清理和副作用确认。中断 API 细节改为相邻文章引用。

新增题：`cancel-false-running`。

依据：[Java API：`Future`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/Future.html)、[Java API：`InterruptedException`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/InterruptedException.html)、[Java API：`System.nanoTime`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/System.html#nanoTime())、[Java 26 API：FutureTask](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/FutureTask.html)。以上资料已加入或保留于文章参考资料。

修正与边界：补齐截止时间代码声明的 ExecutionException。把 FutureTask 的中断取消与 CompletableFuture 分开。取消状态和业务副作用分别确认。

人工确认：无额外事项；运行验证边界见下文。

### 6. Java 内存模型

文件：[jmm-happens-before.mdx](../../../docs/basic-knowledge/java/concurrency/jmm-happens-before.mdx)。

补充 sleep/yield、超时 join 和终止检测边界。保留 volatile 发布链和 JUC 交接方向。增加中断检测与默认初始化规则。

新增题：`sleep-no-publication`。

依据：[JLS 17.4.5：Happens-before Order](https://docs.oracle.com/javase/specs/jls/se26/html/jls-17.html#jls-17.4.5)、[Java API：JUC Memory Consistency Properties](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/package-summary.html#MemoryVisibility)、[Java 26 API：Thread](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Thread.html)。以上资料已加入或保留于文章参考资料。

修正与边界：修正“只有无数据竞争的程序才能顺序一致”。正确同步是顺序一致性的保证条件。缩小 JUC 交接保证，避免覆盖交接后的任意修改。

人工确认：无额外事项；运行验证边界见下文。

### 7. Java 并发同步器

文件：[latch-barrier-semaphore.mdx](../../../docs/basic-knowledge/java/concurrency/latch-barrier-semaphore.mdx)。

补充 barrier action、broken 状态和 reset 协调。说明任务拒绝时 latch 信号的处理。保留许可所有权与公平 tryAcquire 的区别。

新增题：`barrier-broken-boundary`。

依据：[Java API：`CountDownLatch`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/CountDownLatch.html)、[Java API：`CyclicBarrier`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/CyclicBarrier.html)、[Java API：`Semaphore`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/Semaphore.html)、[Java 26 API：Phaser](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/Phaser.html)。以上资料已加入或保留于文章参考资料。

修正与边界：修正业务失败会自动破坏 barrier 的泛化。进入 await 前失败，barrier 无法自动感知。许可初值也不是 release 的硬上限。

人工确认：无额外事项；运行验证边界见下文。

### 8. 并发活跃性

文件：[liveness-deadlock-livelock-starvation.mdx](../../../docs/basic-knowledge/java/concurrency/liveness-deadlock-livelock-starvation.mdx)。

补充同池父子任务的资源等待环。增加 ThreadMXBean 的检测范围和转储命令。CPU 与线程状态改作诊断辅助证据。

新增题：`executor-starvation-cycle`、`deadlock-detection-scope`。

依据：[JLS 17.2：Wait Sets and Notification](https://docs.oracle.com/javase/specs/jls/se26/html/jls-17.html#jls-17.2)、[Java API：`ThreadMXBean.findDeadlockedThreads`](https://docs.oracle.com/en/java/javase/26/docs/api/java.management/java/lang/management/ThreadMXBean.html#findDeadlockedThreads())、[Java 26：jcmd](https://docs.oracle.com/en/java/javase/26/docs/specs/man/jcmd.html)、[Java 26 API：ThreadPoolExecutor](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ThreadPoolExecutor.html)。以上资料已加入或保留于文章参考资料。

修正与边界：去掉用 CPU 高低定义死锁或活锁的绝对结论。Java 26 的 ThreadMXBean 只覆盖平台线程。检测返回 null 无法排除业务资源等待环。

人工确认：无额外事项；运行验证边界见下文。

### 9. 锁竞争

文件：[lock-contention-context-switch-benchmark.mdx](../../../docs/basic-knowledge/java/concurrency/lock-contention-context-switch-benchmark.mdx)。

补充三个 JFR 事件的分工、阈值与采集命令。保留连续转储、同负载复测和基准要素。虚拟线程转储引用对应文章。

新增题：`jfr-threshold-evidence`。

依据：[Oracle：Java Flight Recorder](https://docs.oracle.com/en/java/javase/26/jfapi/flight-recorder-api-programming-guide.pdf)、[Oracle：Troubleshoot Process Hangs and Loops](https://docs.oracle.com/en/java/javase/26/troubleshoot/troubleshoot-process-hangs-and-loops.html)、[OpenJDK：JMH](https://github.com/openjdk/jmh)、[async-profiler](https://github.com/async-profiler/async-profiler)、[OpenJDK 26：JFR 事件元数据](https://github.com/openjdk/jdk/blob/jdk-26%2B35/src/hotspot/share/jfr/metadata/metadata.xml)、[Java 26：jcmd](https://docs.oracle.com/en/java/javase/26/docs/specs/man/jcmd.html)、[Java 26：jfr](https://docs.oracle.com/en/java/javase/26/docs/specs/man/jfr.html)。以上资料已加入或保留于文章参考资料。

修正与边界：修正“JFR 量化总等待时间”的范围。只能累计已启用且满足阈值的记录。monitor 获取等待也不等于完整持锁时间。

人工确认：无额外事项；运行验证边界见下文。

### 10. 锁与无锁

文件：[locks-vs-lock-free-cost.mdx](../../../docs/basic-knowledge/java/concurrency/locks-vs-lock-free-cost.mdx)。

补充三类进度保证及伪共享。结合 Striped64.Cell 和 JMH 示例解释填充代价。CAS 原语与 ABA 引用对应文章。

新增题：`progress-guarantees`、`false-sharing-cost`。

依据：[Java API：`java.util.concurrent.locks`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/locks/package-summary.html)、[Java API：`java.util.concurrent.atomic`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/atomic/package-summary.html)、[OpenJDK：JMH](https://github.com/openjdk/jmh)、[OpenJDK 26：Striped64](https://github.com/openjdk/jdk/blob/jdk-26%2B35/src/java.base/share/classes/java/util/concurrent/atomic/Striped64.java)、[OpenJDK JMH：FalseSharing](https://github.com/openjdk/jmh/blob/master/jmh-samples/src/main/java/org/openjdk/jmh/samples/JMHSample_22_FalseSharing.java)、[Herlihy：Wait-Free Synchronization](https://cs.brown.edu/~mph/Herlihy91/p124-herlihy.pdf)、[Herlihy、Luchangco、Moir：Obstruction-Free Synchronization](https://perso.telecom-paristech.fr/kuznetso/INF346-2015/papers/of.pdf)。以上资料已加入或保留于文章参考资料。

修正与边界：明确 lock-free 允许局部饥饿。wait-free 约束单个操作的自身步数。伪共享表述为缓存竞争，避免混同 JMM 数据竞争。

人工确认：无额外事项；运行验证边界见下文。

### 11. 读写锁

文件：[readwritelock-stampedlock.mdx](../../../docs/basic-knowledge/java/concurrency/readwritelock-stampedlock.mdx)。

补充连续持锁降级示例和 StampedLock 转换。说明旧 stamp 保留、失败后的重新检查。补入公平性及写锁 Condition。

新增题：`read-write-downgrade`、`stamped-conversion`。

依据：[Java API：`ReentrantReadWriteLock`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/locks/ReentrantReadWriteLock.html)、[Java API：`StampedLock`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/locks/StampedLock.html)。以上资料已加入或保留于文章参考资料。

修正与边界：修正面试核心中 [卡] 指向正文锚点的问题。现在指向已有卡片 optimistic-read。写明 validate 只覆盖此前读取的区间。

人工确认：无额外事项；运行验证边界见下文。

### 12. ReentrantLock

文件：[reentrantlock-fairness-condition.mdx](../../../docs/basic-knowledge/java/concurrency/reentrantlock-fairness-condition.mdx)。

补充 tryLock(0, unit)、重入次数恢复和其他锁保留。增加双消费者重查示例及 awaitNanos 预算。AQS 内部节点结构改为相邻引用。

新增题：`condition-recheck`、`condition-time-budget`。

依据：[Java API：`ReentrantLock`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/locks/ReentrantLock.html)、[Java API：`Condition`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/locks/Condition.html)。以上资料已加入或保留于文章参考资料。

修正与边界：公平性只约束锁获取，仍受线程调度影响。Condition 的持锁约束限定为 ReentrantLock 实现。超时循环使用剩余预算，避免重启计时。

人工确认：无额外事项；运行验证边界见下文。

### 13. 安全发布

文件：[safe-publication-escape-final.mdx](../../../docs/basic-knowledge/java/concurrency/safe-publication-escape-final.mdx)。

补充静态持有者与类加载器范围。明确 final 初始化保证和后续修改的分工。区分不可修改视图与浅复制快照。

新增题：`dcl-volatile-holder`。

依据：[JLS 17.5：Final Field Semantics](https://docs.oracle.com/javase/specs/jls/se26/html/jls-17.html#jls-17.5)、[JLS 12.4.2：类初始化过程](https://docs.oracle.com/javase/specs/jls/se26/html/jls-12.html#jls-12.4.2)、[Java 26 API：Collections.unmodifiableList](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collections.html#unmodifiableList(java.util.List))、[Java 26 API：List.copyOf](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#copyOf(java.util.Collection))。以上资料已加入或保留于文章参考资料。

修正与边界：修复工厂示例调用不存在的无参构造器。补入匹配的私有构造器并说明替换关系。final 的保证不再泛化为全部字段的安全发布。

人工确认：无额外事项；运行验证边界见下文。

### 14. 消息传递

文件：[shared-state-message-passing.mdx](../../../docs/basic-knowledge/java/concurrency/shared-state-message-passing.mdx)。

补充消费者异常、结果回复与毒丸关闭协议。明确并发发送顺序与业务顺序的区别。保留单一所有者及过载选择。

新增题：`mailbox-shutdown-failure`。

依据：[Java API：`BlockingQueue`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/BlockingQueue.html)、[Java API：JUC Memory Consistency Properties](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/package-summary.html#MemoryVisibility)。以上资料已加入或保留于文章参考资料。

修正与边界：修复 CancelOrder 缺少 Command.apply 的示例。结果消息仅声明字段，移除空的接口实现。移除 OrderBook 的不完整返回方法占位。

人工确认：无额外事项；运行验证边界见下文。

### 15. synchronized

文件：[synchronized-monitor-optimizations.mdx](../../../docs/basic-knowledge/java/concurrency/synchronized-monitor-optimizations.mdx)。

补充 wait/notify/notifyAll、重入恢复及条件循环。保留字节码、锁消除与锁粗化分工。虚拟线程 pinning 引用版本文章。

新增题：`monitor-wait-notify`。

依据：[JLS 17.1：Synchronization](https://docs.oracle.com/javase/specs/jls/se26/html/jls-17.html#jls-17.1)、[JVMS 3.14：Compiling Synchronization](https://docs.oracle.com/javase/specs/jvms/se26/html/jvms-3.html#jvms-3.14)、[OpenJDK JEP 374：Disable and Deprecate Biased Locking](https://openjdk.org/jeps/374)、[JLS 17.2：Wait Sets and Notification](https://docs.oracle.com/javase/specs/jls/se26/html/jls-17.html#jls-17.2)、[HotSpot：Performance Enhancements](https://docs.oracle.com/en/java/javase/26/vm/java-hotspot-virtual-machine-performance-enhancements.html)、[OpenJDK 26：C2 LockNode 锁粗化实现](https://github.com/openjdk/jdk/blob/jdk-26%2B35/src/hotspot/share/opto/callnode.cpp)。以上资料已加入或保留于文章参考资料。

修正与边界：区分 monitor 获取不可中断与 wait 可响应中断。保留 JDK 15 默认禁用偏向锁的版本限定。同步方法与同步块的字节码表达分别说明。

人工确认：无额外事项；运行验证边界见下文。

### 16. Java 线程

文件：[thread-lifecycle-interruption.mdx](../../../docs/basic-knowledge/java/concurrency/thread-lifecycle-interruption.mdx)。

补充中断标志输出示例和 park 空转。列出六种状态并说明 JVM 与系统状态的区别。线程池关闭引用线程池文章。

新增题：`interrupt-status-methods`、`park-interrupt-spin`。

依据：[Java API：`Thread`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Thread.html)、[Java API：`Thread.State`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Thread.State.html)、[Java API：`ExecutorService`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ExecutorService.html)、[Java 26 API：LockSupport](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/locks/LockSupport.html)、[Java 26 API：InterruptibleChannel](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/InterruptibleChannel.html)。以上资料已加入或保留于文章参考资料。

修正与边界：修正“直接 run 总是在当前线程执行”的泛化。Java 21 起的虚拟线程直接 run 无效果。明确 Thread.stop 在 Java 26 的异常行为。

人工确认：无额外事项；运行验证边界见下文。

### 17. 线程安全

文件：[thread-safety-race-conditions.mdx](../../../docs/basic-knowledge/java/concurrency/thread-safety-race-conditions.mdx)。

补充并发 Map 的复合操作与 putIfAbsent。区分数据竞争和业务竞态。保留局部引用、可达对象和不变量检查。

新增题：`compound-thread-safe-operations`。

依据：[JLS 17：Threads and Locks](https://docs.oracle.com/javase/specs/jls/se26/html/jls-17.html)、[Java API：`java.util.concurrent` 的内存一致性说明](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/package-summary.html#MemoryVisibility)、[Java 26 API：ConcurrentMap](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ConcurrentMap.html)。以上资料已加入或保留于文章参考资料。

修正与边界：收紧“使用线程安全工具即可安全”的推断范围。单次操作安全仍需完整业务状态转换。未发现其他需撤下的原卡片。

人工确认：无额外事项；运行验证边界见下文。

### 18. ThreadLocal

文件：[threadlocal-leaks-context.mdx](../../../docs/basic-knowledge/java/concurrency/threadlocal-leaks-context.mdx)。

补充继承时机、共享引用和嵌套作用域恢复。区分 remove 与 set(null)。注明 ScopedValue 在 JDK 25 正式定版。

新增题：`inheritable-pool-context`、`threadlocal-nested-restore`。

依据：[Java API：`ThreadLocal`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/ThreadLocal.html)、[OpenJDK：`ThreadLocal` 源码](https://github.com/openjdk/jdk/blob/jdk-26%2B35/src/java.base/share/classes/java/lang/ThreadLocal.java)、[Java API：`ScopedValue`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/ScopedValue.html)、[Java 26 API：InheritableThreadLocal](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/InheritableThreadLocal.html)、[OpenJDK JEP 506：Scoped Values](https://openjdk.org/jeps/506)。以上资料已加入或保留于文章参考资料。

修正与边界：修正弱 key 被回收后 value 永久保留的绝对表述。后续 map 清理或线程结束可释放值。源码链接从不存在的 26+36 改为 26+35。

人工确认：无额外事项；运行验证边界见下文。

### 19. Java 线程池

文件：[threadpoolexecutor-execution-path.mdx](../../../docs/basic-knowledge/java/concurrency/threadpoolexecutor-execution-path.mdx)。

补充队列类型、五种状态和关闭协议。新增静默拒绝导致悬空 Future 的推演。补充 afterExecute、核心超时和默认工厂。

新增题：`queue-expansion-policy`、`pool-shutdown-states`、`discarded-future`。

依据：[Java API：ThreadPoolExecutor](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ThreadPoolExecutor.html)、[OpenJDK：ThreadPoolExecutor 源码](https://github.com/openjdk/jdk/blob/jdk-26%2B35/src/java.base/share/classes/java/util/concurrent/ThreadPoolExecutor.java)、[Java API：RejectedExecutionHandler](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/RejectedExecutionHandler.html)、[Java API：BlockingQueue](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/BlockingQueue.html)、[Java 26 API：ExecutorService](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ExecutorService.html)、[Java 26 API：Executors](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/Executors.html)、[Java 26 API：FutureTask](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/FutureTask.html)。以上资料已加入或保留于文章参考资料。

修正与边界：修正 CallerRunsPolicy 总会执行任务的泛化。关闭后它会丢弃任务。说明 shutdownNow 返回任务需另行处理。源码链接从 26+36 改为 26+35。

人工确认：无额外事项；运行验证边界见下文。

### 20. 虚拟线程

文件：[virtual-threads-boundaries.mdx](../../../docs/basic-knowledge/java/concurrency/virtual-threads-boundaries.mdx)。

补充 JDK 21、24、25 的能力边界。增加 pinning 诊断、专门转储和守护线程退出。ThreadLocal 机制引用相邻文章。

新增题：`pinning-version-boundary`、`virtual-thread-observation`。

依据：[Oracle：Virtual Threads](https://docs.oracle.com/en/java/javase/26/core/virtual-threads.html)、[OpenJDK JEP 444：Virtual Threads](https://openjdk.org/jeps/444)、[OpenJDK JEP 491：Synchronize Virtual Threads without Pinning](https://openjdk.org/jeps/491)、[Java API：`Executors.newVirtualThreadPerTaskExecutor`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/Executors.html#newVirtualThreadPerTaskExecutor())、[Java 26：jcmd](https://docs.oracle.com/en/java/javase/26/docs/specs/man/jcmd.html)、[Java 26 API：ThreadMXBean](https://docs.oracle.com/en/java/javase/26/docs/api/java.management/java/lang/management/ThreadMXBean.html)、[Java 26 API：ExecutorService](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ExecutorService.html)、[OpenJDK JEP 506：Scoped Values](https://openjdk.org/jeps/506)。以上资料已加入或保留于文章参考资料。

修正与边界：缩小阻塞 I/O 一律卸载 carrier 的表述。区分网络、文件和 native 调用。注明 JDK 24 起 tracePinnedThreads 已被忽略。

人工确认：无额外事项；运行验证边界见下文。

### 21. volatile

文件：[volatile-barriers-visibility.mdx](../../../docs/basic-knowledge/java/concurrency/volatile-barriers-visibility.mdx)。

补充数组引用与元素、单次快照和 VarHandle 模式。保留复合更新与发布次序推演。普通 long/double 的撕裂边界单独说明。

新增题：`volatile-reference-elements`、`varhandle-access-modes`。

依据：[JLS 8.3.1.4：`volatile` Fields](https://docs.oracle.com/javase/specs/jls/se26/html/jls-8.html#jls-8.3.1.4)、[JLS 17.4.5：Happens-before Order](https://docs.oracle.com/javase/specs/jls/se26/html/jls-17.html#jls-17.4.5)、[Java API：`VarHandle`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/invoke/VarHandle.html)、[JLS 17.7：Non-Atomic Treatment of double and long](https://docs.oracle.com/javase/specs/jls/se26/html/jls-17.html#jls-17.7)、[Java 26 API：AtomicIntegerArray](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/atomic/AtomicIntegerArray.html)。以上资料已加入或保留于文章参考资料。

修正与边界：补上发布标志示例的一次性前提。一直为 true 的标志无法标识某次新发布。单次 volatile 读写的原子性与复合更新分开。

人工确认：无额外事项；运行验证边界见下文。

## 相邻文章分工

- JMM 负责同步关系，volatile 负责具体访问边界。安全发布负责构造、final 和引用交接。
- AQS 负责状态与队列，ReentrantLock 负责锁和条件变量用法。并发同步器负责 latch、barrier 和 semaphore 的协作语义。
- CAS 负责条件更新与 ABA，原子类负责计数语义。锁与无锁负责成本和进度保证，锁竞争负责观测证据。
- Java 线程负责状态与中断 API，任务取消负责预算和退出。线程池负责执行容量，CompletableFuture 负责结果依赖。
- ThreadLocal 负责上下文生命周期，虚拟线程负责运行模型与版本。跨篇链接在本批内完成，无需修改其他文章。

## 技术核验

依据 Java 26 API、JLS/JVMS 和 OpenJDK 源码核对。版本差异另查 JEP 374、444、491、506。进度保证查阅原始论文，伪共享参考 OpenJDK JMH 样例。

用远端标签清单核对了 OpenJDK 版本。`jdk-26+36` 不存在，GA 对应 `jdk-26+35`。已读取该标签下的 ThreadLocal、ThreadPoolExecutor、FutureTask、Striped64 源码。也核对了 JFR 事件元数据与 C2 锁粗化实现。

本轮未运行 Java 实验。本地 `java -version` 因可执行文件架构不兼容而失败，报告 `Bad CPU type in executable`。已有 Docker 镜像中没有 JDK，因此未拉取镜像、创建容器或映射端口。代码结果按规范与源码推导，未表述为实测。

## 验证

```sh
node scripts/check-article-format.mjs --style-strict -- \
  docs/basic-knowledge/java/concurrency/aqs-state-wait-queue.mdx \
  docs/basic-knowledge/java/concurrency/atomic-longadder-contention.mdx \
  docs/basic-knowledge/java/concurrency/cas-aba-versioning.mdx \
  docs/basic-knowledge/java/concurrency/future-completablefuture-errors.mdx \
  docs/basic-knowledge/java/concurrency/interruption-timeout-cancellation.mdx \
  docs/basic-knowledge/java/concurrency/jmm-happens-before.mdx \
  docs/basic-knowledge/java/concurrency/latch-barrier-semaphore.mdx \
  docs/basic-knowledge/java/concurrency/liveness-deadlock-livelock-starvation.mdx \
  docs/basic-knowledge/java/concurrency/lock-contention-context-switch-benchmark.mdx \
  docs/basic-knowledge/java/concurrency/locks-vs-lock-free-cost.mdx \
  docs/basic-knowledge/java/concurrency/readwritelock-stampedlock.mdx \
  docs/basic-knowledge/java/concurrency/reentrantlock-fairness-condition.mdx \
  docs/basic-knowledge/java/concurrency/safe-publication-escape-final.mdx \
  docs/basic-knowledge/java/concurrency/shared-state-message-passing.mdx \
  docs/basic-knowledge/java/concurrency/synchronized-monitor-optimizations.mdx \
  docs/basic-knowledge/java/concurrency/thread-lifecycle-interruption.mdx \
  docs/basic-knowledge/java/concurrency/thread-safety-race-conditions.mdx \
  docs/basic-knowledge/java/concurrency/threadlocal-leaks-context.mdx \
  docs/basic-knowledge/java/concurrency/threadpoolexecutor-execution-path.mdx \
  docs/basic-knowledge/java/concurrency/virtual-threads-boundaries.mdx \
  docs/basic-knowledge/java/concurrency/volatile-barriers-visibility.mdx
npm run build
git diff --check
```

- 严格格式检查：21 篇，0 篇结构问题，0 篇文风提示。
- 构建：文档链接、复习资源、岗位和面经数据检查通过。Docusaurus 成功生成静态文件。
- 标识核对：23 道原卡片全部保留，新增 34 道。57 道卡片均默认收起，全部 ID 唯一。
- 全站非阻断检查仍报告其他文章的问题。范围外有 6 篇结构问题、110 篇文风提示。
- 构建仍有既有博客作者、摘要、Node localStorage 提示。Docusaurus 更新检查也有权限提示，未修改全局配置。

## 未完成与人工确认

无阻塞事项，无需删除或合并原卡片。未增加或重新认定公司归属。性能收益只说明条件和验证方法，未给出未经实测的倍数。Java 运行实验的限制已在上文记录。
