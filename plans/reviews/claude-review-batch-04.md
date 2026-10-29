# Claude 校验 · 第 4 批（2026-10-29）

范围：Java 并发栏目的前 12 篇，包括栏目首页，从线程安全到 AQS。栏目的后 10 篇（ReentrantLock 到锁竞争）放在第 5 批。校验后直接修改，Lin 的审阅异步进行。

校验项：

1. 技术事实与版本基线（Java 17 / 21，实现细节以 OpenJDK 21 为准）。
2. 代码示例与实现细节：在 Eclipse Temurin 21.0.12 上运行了 41 项断言，偏向锁默认值另在 Temurin 17.0.20.1 上确认。LongAdder 的清零方法、`Striped64.Cell` 的填充、AQS 获取后恢复中断标志，对照了 `jdk-21-ga` 源码。
3. 与相邻文章是否矛盾，站内锚点是否存在：跨文章和文内锚点都存在；首页指向面试页的 `#java-concurrency` 由组件生成，构建产物里存在。
4. 参考资料：39 个外部链接都返回对应标题的页面或 PDF；有 1 个锚点指错了章节，已修正。

## 结论

| 文章 | 结论 | 修改 |
| --- | --- | --- |
| [Java 并发编程（栏目首页）](../../docs/basic-knowledge/java/concurrency/index.mdx) | ✅ 通过 | — |
| [线程安全](../../docs/basic-knowledge/java/concurrency/thread-safety-race-conditions.mdx) | ✅ 通过 | 参考资料标题「JLS 17」改为「JLS 第 17 章」，避免和 Java 17 混淆 |
| [Java 线程](../../docs/basic-knowledge/java/concurrency/thread-lifecycle-interruption.mdx) | ✅ 通过 | — |
| [Java 内存模型](../../docs/basic-knowledge/java/concurrency/jmm-happens-before.mdx) | ✅ 通过 | — |
| [安全发布](../../docs/basic-knowledge/java/concurrency/safe-publication-escape-final.mdx) | ✅ 通过 | — |
| [消息传递](../../docs/basic-knowledge/java/concurrency/shared-state-message-passing.mdx) | ✅ 通过 | — |
| [synchronized](../../docs/basic-knowledge/java/concurrency/synchronized-monitor-optimizations.mdx) | ✅ 已修改 | 偏向锁参考链接的锚点指向了错误章节 |
| [volatile](../../docs/basic-knowledge/java/concurrency/volatile-barriers-visibility.mdx) | ✅ 通过 | — |
| [CAS](../../docs/basic-knowledge/java/concurrency/cas-aba-versioning.mdx) | ✅ 通过 | — |
| [Java 原子类](../../docs/basic-knowledge/java/concurrency/atomic-longadder-contention.mdx) | ✅ 已修改 | 补上 `sumThenReset()` 与 `reset()` 在会不会丢计数上的区别 |
| [锁与无锁](../../docs/basic-knowledge/java/concurrency/locks-vs-lock-free-cost.mdx) | ✅ 通过 | — |
| [AQS](../../docs/basic-knowledge/java/concurrency/aqs-state-wait-queue.mdx) | ✅ 通过 | — |

## 修改内容

### Java 原子类（第 7 节「统计窗口与清零」、面试核心、9.2 参考回答）

原文的结论是「`sumThenReset()` 只适合在没有并发更新时读取并清零」，和 `reset()` 放在一起讲。窗口边界说不清这一点没错，但读者自然会追问「那会不会丢计数」，而这两个方法在这一点上并不一样。

源码依据（OpenJDK 21 `LongAdder`）：

- `sumThenReset()` 用 `getAndSetBase(0L)` 和每个 Cell 的 `getAndSet(0L)` 取值并清零，每次并发递增要么算进返回值，要么留在分量里给下一个窗口。
- `reset()` 直接写 `base = 0L` 并对 Cell 调用 `reset()`，在它之前刚加上、还没被读走的增量会被覆盖。

实测：8 个线程各递增 200 万次，主线程同时反复收集。用 `sumThenReset()` 收集到的总数正好 1600 万；用 `sum()` 再 `reset()`，只收集到约 933 万。

已改为：并发更新时 `sumThenReset()` 不会丢计数，但没有统一的窗口分界点；`reset()` 会抹掉并发增量。精确切分单计数器的窗口仍用 `AtomicLong.getAndSet(0)`。

### synchronized（参考资料）

「Java 17：偏向锁选项」链接到 `java.html#advanced-runtime-options-for-java`，但 Java 17 手册里 `-XX:+UseBiasedLocking` 列在「Deprecated Java Options」一节，并写明默认关闭。锚点已改为 `#deprecated-java-options`。

## 已验证的断言

Java 线程：

- 平台线程直接调用 `run()` 会在调用线程里执行任务；虚拟线程直接调用 `run()` 不执行任务。
- 第二次 `start()` 抛 `IllegalThreadStateException`；Java 21 上 `Thread.stop()` 抛 `UnsupportedOperationException`。
- 中断后依次调用 `isInterrupted()`、`Thread.interrupted()`、`Thread.interrupted()`，输出 `true true false`。
- 已中断时 `park()` 立即返回，并保留中断标志；`sleep` 抛出 `InterruptedException` 后标志已清除。
- 等 `ReentrantLock` 的线程是 `WAITING`，被中断后仍然 `WAITING`，拿到锁后中断标志还在；等 `synchronized` 的线程是 `BLOCKED`，被中断后仍然 `BLOCKED`；`sleep` 中是 `TIMED_WAITING`。
- 阻塞在 `Pipe.SourceChannel.read` 上的线程被中断后抛 `ClosedByInterruptException`，标志保持设置，通道已关闭。

Java 内存模型与安全发布：

- 对未启动的线程调用 `join()` 立即返回；`join(100)` 超时返回时目标线程仍然存活。
- 静态持有者：调用外部类的其他静态方法只初始化外部类，第一次调用 `getInstance()` 才初始化 `Holder` 并构造实例。
- `Collections.unmodifiableList` 视图跟着源列表变化，`List.copyOf` 不变。

synchronized：

- `javap` 中同步块有 1 个 `monitorenter`、2 个 `monitorexit`（含异常路径）；同步方法只有 `ACC_SYNCHRONIZED` 标志。
- 不持有 monitor 调用 `wait()` 抛 `IllegalMonitorStateException`。
- Temurin 17：`UseBiasedLocking = false {default}`；Temurin 21：`-XX:+UseBiasedLocking` 报 `Unrecognized VM option`。

CAS 与原子类：

- 两个线程同时 `withdraw(80)`（余额 100）：一个成功一个失败，余额 20。
- `AtomicReference` 的 CAS 比较引用身份：内容相等的另一个 `String` 对象 CAS 失败。
- 8 个线程各执行 20 万次 `updateAndGet`，结果 160 万，更新函数被调用了约 434 万次，说明竞争时函数会重复执行。
- 引用经过 A → B → A 后，`AtomicReference` 的 CAS 成功；`AtomicStampedReference` 带旧版本号的 CAS 失败。
- `weakCompareAndSet` 编译时报 deprecation 警告，`weakCompareAndSetPlain`、`weakCompareAndSetVolatile` 没有警告。
- `Striped64.Cell` 带 `@jdk.internal.vm.annotation.Contended`。

AQS：

- 线程 `park()` 之前被 `unpark` 两次：第一次 `park` 立即返回，第二次 `parkNanos(300ms)` 等满 300 毫秒，许可没有累加。
- 重入 3 次后 `await()`，其他线程能拿到锁；`signal` 后在锁释放前等待者仍是 `WAITING`；返回后 `getHoldCount()` 恢复为 3。
- `ConcurrentHashMap.putIfAbsent` 第一次返回 `null`，第二次返回旧值并保留旧值。

下一批：Java 并发后 10 篇（ReentrantLock、读写锁、同步器、任务取消、线程池、CompletableFuture、虚拟线程、活跃性、ThreadLocal、锁竞争）。
