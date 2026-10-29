# Claude 校验 · 第 5 批（2026-10-29）

范围：Java 并发栏目的后 10 篇，从 ReentrantLock 到锁竞争。前 12 篇见第 4 批（PR #31，已合并）。校验后直接修改，Lin 的审阅异步进行。

校验项：

1. 技术事实与版本基线（Java 17 / 21，实现细节以 OpenJDK 21 为准）。
2. 代码示例与实现细节：在 Eclipse Temurin 21.0.12 上运行了 92 项断言，涵盖锁、同步器、取消、线程池、CompletableFuture、虚拟线程、死锁检测、ThreadLocal 和 JFR。JFR 阈值读取自 JDK 21 自带的 `default.jfc` 和 `profile.jfc`。容器里 `jcmd` 连不上目标进程，线程转储改为在进程内调用相同的诊断命令（DiagnosticCommand MBean 的 `threadPrint -l`、`HotSpotDiagnosticMXBean.dumpThreads`）。
3. 与相邻文章是否矛盾，站内锚点是否存在：跨文章和文内锚点都存在。
4. 参考资料：34 个外部链接中有 2 个跳转到 JDK 首页，已换成 JDK 21 文档里的对应页面。

## 结论

| 文章 | 结论 | 修改 |
| --- | --- | --- |
| [ReentrantLock](../../docs/basic-knowledge/java/concurrency/reentrantlock-fairness-condition.mdx) | ✅ 通过 | — |
| [读写锁](../../docs/basic-knowledge/java/concurrency/readwritelock-stampedlock.mdx) | ✅ 通过 | — |
| [Java 并发同步器](../../docs/basic-knowledge/java/concurrency/latch-barrier-semaphore.mdx) | ✅ 已修改 | `reset()` 的效果写成了「打断」等待线程 |
| [任务取消](../../docs/basic-knowledge/java/concurrency/interruption-timeout-cancellation.mdx) | ✅ 已修改 | `nanoTime` 截止时间溢出的说法不准 |
| [Java 线程池](../../docs/basic-knowledge/java/concurrency/threadpoolexecutor-execution-path.mdx) | ✅ 通过 | — |
| [CompletableFuture](../../docs/basic-knowledge/java/concurrency/future-completablefuture-errors.mdx) | ✅ 通过 | — |
| [虚拟线程](../../docs/basic-knowledge/java/concurrency/virtual-threads-boundaries.mdx) | ✅ 通过 | — |
| [并发活跃性](../../docs/basic-knowledge/java/concurrency/liveness-deadlock-livelock-starvation.mdx) | ✅ 通过 | — |
| [ThreadLocal](../../docs/basic-knowledge/java/concurrency/threadlocal-leaks-context.mdx) | ✅ 通过 | — |
| [锁竞争](../../docs/basic-knowledge/java/concurrency/lock-contention-context-switch-benchmark.mdx) | ✅ 已修改 | 2 个参考链接失效 |

另外修了 JVM 栏目 [CPU 飙高排查](../../docs/basic-knowledge/java/jvm/cpu-high-diagnosis.mdx) 里同一个失效链接。这篇还没轮到 Claude 校验，台账状态不变。

## 修改内容

### Java 并发同步器（3.1「屏障的破坏与恢复」）

原文写「`reset()` 会打断当前正在等待的线程」。「打断」容易被理解成中断。实测：一个线程在 `await()` 中等待时调用 `reset()`，它收到 `BrokenBarrierException`，中断标志为 `false`；重置后 `isBroken()` 为 `false`。

已改为：`reset()` 让屏障回到初始状态，还在等待的线程收到 `BrokenBarrierException`，但不会被中断。

### 任务取消（第 2 节「截止时间与剩余预算」）

原文写「预算换算成纳秒时要限制在 `long` 能表示的合理范围内，否则超大的时长会溢出成负数」。实测结果和这句话不符：

- `TimeUnit.DAYS.toNanos(Long.MAX_VALUE)` 封顶为 `Long.MAX_VALUE`，换算本身不会变成负数。
- 溢出发生在 `System.nanoTime() + budget` 这一步，`deadline` 变成负数。
- 示例用的 `deadline - System.nanoTime()` 仍然得到正数，按差值判断不受溢出影响。
- 直接比较 `System.nanoTime() > deadline` 会返回 `true`，把还没用完的预算判成已过期。

这和 `System.nanoTime` Javadoc 的要求一致：比较两次读数要用差值。已改为说明溢出发生在哪一步，并说明为什么示例的差值写法是对的、直接比较是错的。

### 锁竞争（参考资料）

- 「Oracle：Java Flight Recorder」指向 `jfapi/flight-recorder-api-programming-guide.pdf`，跳到了 JDK 首页。实际 PDF 名是 `flight-recorder-api-programmers-guide.pdf`，但它只讲 JFR API。本文讲的是录制和分析等待事件，所以换成 JDK 21 故障排查指南的 Flight Recorder 一节（`troubleshoot/diagnostic-tools.html`），标题改为「Oracle：Flight Recorder（故障排查指南）」。
- 「Troubleshoot Process Hangs and Loops」的文件名多了 `-and`，正确地址是 `troubleshoot/troubleshoot-process-hangs-loops.html`。

## 已验证的断言

ReentrantLock 与读写锁：

- 把 `lockInterruptibly()` 写进 `try`、等锁时被中断，`finally` 里的 `unlock()` 抛出 `IllegalMonitorStateException`，盖掉了中断异常。
- 不持锁调用 `Condition.signal()`、`await()` 抛 `IllegalMonitorStateException`；`awaitNanos(200ms)` 无人通知时返回值 ≤ 0。
- `ReentrantReadWriteLock` 持有读锁时 `writeLock().tryLock(500ms)` 返回 `false`（不支持升级）；先拿读锁再释放写锁后，其他写线程拿不到写锁；`readLock().newCondition()` 抛 `UnsupportedOperationException`。
- `StampedLock`：写锁被持有时 `tryOptimisticRead()` 返回 0；同一线程再次 `tryWriteLock` 返回 0（不可重入）；中间有写入时 `validate` 为 `false`；唯一读者可以转换为写锁；两个读者时转换返回 0，读锁计数仍为 2；读锁可以由另一个线程释放；空闲时乐观读 stamp 可以转换。

同步器与取消：

- `CyclicBarrier`：等待者被中断时它收到 `InterruptedException`、其他人收到 `BrokenBarrierException`；超时与 barrier action 抛错同理。
- `Semaphore(2)` 多 `release()` 一次后有 3 个许可。公平信号量中，先到的 `acquire(3)` 在等待时，后到的 `acquire(2)` 拿不到已经可用的 2 个许可；`tryAcquire()` 却能直接插队拿走。
- 归零后的 `CountDownLatch.await()` 立即返回。
- 运行中的 `FutureTask` 执行 `cancel(false)` 返回 `true`，`isDone`、`isCancelled` 都为 `true`，任务照常跑完，`get()` 抛 `CancellationException`；`cancel(true)` 中断了执行线程；已完成的任务 `cancel` 返回 `false`。

线程池：

- 8/16/200 的池第 217 个任务被拒绝，此时 16 个线程、200 个排队任务；`shutdownNow()` 返回 200 个排队任务。
- 无界队列的池（核心 2、上限 50）收到 100 个阻塞任务后只有 2 个线程；`SynchronousQueue` 的池收到 10 个阻塞任务后有 10 个线程。
- `execute` 的任务抛异常：未捕获异常处理器被调用一次，下一个任务由新的 Worker 执行，`afterExecute` 拿到异常；`submit` 的任务抛异常：处理器没被调用，`afterExecute` 的参数为 `null`，`get()` 抛 `ExecutionException`。
- `keepAliveTime` 为 0 时 `allowCoreThreadTimeOut(true)` 抛 `IllegalArgumentException`。
- `DiscardPolicy` 丢弃的 `submit` 任务，`get(300ms)` 超时且 `isDone()` 为 `false`。
- `CallerRunsPolicy` 在提交线程执行任务；池关闭后同一策略直接丢弃任务。
- 新建的池线程数为 0，`prestartAllCoreThreads()` 后为 4。
- 2 个线程的固定池里，两个父任务各自同步等待同池的子任务，1 秒内都没有完成。

CompletableFuture：

- 公共池并行度为 7（8 核容器）时 `supplyAsync` 在 `ForkJoinPool.commonPool-worker` 上运行；并行度设为 1 时改为新建线程（`Thread-0`）。
- 对已完成的 Future 注册 `thenApply`，回调在注册线程（`main`）上执行。
- 原阶段成功、`whenComplete` 回调抛错：`join()` 的 cause 是回调的异常；原阶段失败、回调也抛错：保留原阶段的 `IOException`。
- `exceptionally` 返回 42 后变为成功；`get()` 包装为 `ExecutionException`，`join()` 包装为 `CompletionException`。
- `cancel(true)` 后 `join()`、`get()` 都抛 `CancellationException`，执行任务的线程没有被中断，任务照常跑完。
- `allOf` 在一个输入立即失败时仍等慢的输入结束；`anyOf` 随最先完成的失败输入而失败；`allOf()` 空参数立即完成，`anyOf()` 空参数一直未完成。
- `orTimeout` 以 `TimeoutException` 完成；`completeOnTimeout` 返回同一个实例并以默认值完成；`thenApply` 返回 Future 时结果是嵌套的 `CompletableFuture`。

虚拟线程、死锁检测与诊断：

- `-Djdk.tracePinnedThreads=full`：虚拟线程在 `synchronized` 内 `sleep` 时打印 pinning 栈（`reason:MONITOR`）；虚拟线程等待进入 monitor 时不打印。
- JDK 21 `default.jfc` 中 `jdk.VirtualThreadPinned` 默认启用，阈值 20 ms；锁等待事件的阈值 `default` 为 20 ms、`profile` 为 10 ms。
- 1000 个等待中的虚拟线程只让 `ThreadMXBean.getThreadCount()` 从 10 增加到 18（增加的是载体线程）；虚拟线程 `isDaemon()` 为 `true`，`setDaemon(false)` 抛 `IllegalArgumentException`。
- `findDeadlockedThreads()` 同时找到 `ReentrantLock` 锁环（两个线程 `WAITING`）和 monitor 锁环（两个线程 `BLOCKED`）。
- `Thread.print -l` 在持有者下列出 `Locked ownable synchronizers` 里的 `ReentrantLock$NonfairSync`，不包含虚拟线程；JSON 格式的线程转储包含虚拟线程。
- 录制 `profile` 配置的 JFR：争用 `synchronized` 产生 `jdk.JavaMonitorEnter` 事件，争用 `ReentrantLock` 的线程产生 `jdk.ThreadPark` 事件。

ThreadLocal：

- `withInitial` 的 ThreadLocal：`remove()` 后 `get()` 重新得到初始值，`set(null)` 后 `get()` 返回 `null`。
- `InheritableThreadLocal` 的子线程拿到的是父线程值的同一个对象；父线程之后换成 B，已有的线程池 Worker 仍然读到 A。

下一批：JVM 栏目（26 篇），同样分两次 PR。
