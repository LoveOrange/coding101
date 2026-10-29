# Claude 校验 · 第 7 批（2026-10-29）

范围：JVM 栏目的后 13 篇，从 Serial/Parallel/CMS 到 GC 停顿分析。前 13 篇见第 6 批（PR #33，已合并）。校验后直接修改，Lin 的审阅异步进行。

校验项：

1. 技术事实与版本基线（Java 17 / 21，实现细节以 HotSpot 21 为准）。
2. 代码示例与实现细节：在 Eclipse Temurin 21.0.12 上运行了 30 多项断言，线程转储格式、移除的选项另在 Temurin 17.0.20.1 上确认。`GC.heap_dump` 不能通过 DiagnosticCommand MBean 调用，它的影响等级和默认 Full GC 行为对照了 `jdk-21-ga` 的 `diagnosticCommand.hpp/.cpp`。JMH、async-profiler、GraalVM 没有在本地运行，相关说法对照 JMH 官方示例和 GraalVM for JDK 21 文档。
3. 与相邻文章是否矛盾，站内锚点是否存在：116 个站内链接都存在。
4. 参考资料：49 个外部链接都返回对应页面；两个 OpenJDK Wiki 页面对脚本返回 403，用浏览器方式取回标题正常。

## 结论

| 文章 | 结论 | 修改 |
| --- | --- | --- |
| [Serial、Parallel 与 CMS](../../docs/basic-knowledge/java/jvm/serial-parallel-cms.mdx) | ✅ 已修改 | 补上旧参数在 Java 17、21 上会让 JVM 启动失败 |
| [G1](../../docs/basic-knowledge/java/jvm/g1-regions-rset-collection-set.mdx) | ✅ 通过 | — |
| [低延迟垃圾收集器](../../docs/basic-knowledge/java/jvm/zgc-shenandoah-low-latency.mdx) | ✅ 通过 | — |
| [分层编译](../../docs/basic-knowledge/java/jvm/interpreter-tiered-compilation.mdx) | ✅ 通过 | — |
| [方法内联与去优化](../../docs/basic-knowledge/java/jvm/inlining-deoptimization.mdx) | ✅ 通过 | — |
| [逃逸分析与标量替换](../../docs/basic-knowledge/java/jvm/escape-analysis-scalar-replacement.mdx) | ✅ 已修改 | 参考链接标题与页面不符 |
| [JMH](../../docs/basic-knowledge/java/jvm/jmh-correct-benchmarks.mdx) | ✅ 通过 | — |
| [Java 启动优化](../../docs/basic-knowledge/java/jvm/aot-cds-native-image.mdx) | ✅ 已修改 | 默认 CDS 归档不只 Oracle JDK 有；补上 `-Xshare:auto` 下归档失效时的实际表现 |
| [JVM 诊断](../../docs/basic-knowledge/java/jvm/diagnostic-tools-evidence.mdx) | ✅ 通过 | — |
| [CPU 使用率](../../docs/basic-knowledge/java/jvm/cpu-high-diagnosis.mdx) | ✅ 已修改 | Java 21 线程转储的 `nid` 是十进制，原文要求一律转十六进制 |
| [线程转储](../../docs/basic-knowledge/java/jvm/thread-dumps-deadlocks-contention.mdx) | ✅ 通过 | — |
| [堆转储](../../docs/basic-knowledge/java/jvm/heap-dumps-memory-leaks.mdx) | ✅ 通过 | — |
| [GC 停顿分析](../../docs/basic-knowledge/java/jvm/gc-logs-jfr-pauses.mdx) | ✅ 通过 | — |

## 修改内容

### CPU 使用率（面试核心、第 3 节、10.1 参考回答）

原文写「十进制 TID 转成十六进制，就对应线程转储里的 `nid`」，示例是找 `nid=0x3039`。在容器里让一个线程空转，再用 `/proc/self/task/*/comm` 找到它的 OS TID，和同一进程的线程转储对照：

- Temurin 21.0.12：TID 111，转储行为 `"burner" #20 [111] … nid=111 runnable`，十进制，线程编号后的方括号里也是 TID。
- Temurin 17.0.20.1：TID 59，转储行为 `"burner" #14 … nid=0x3b runnable`，十六进制。

按原文的做法在 Java 21 上会找不到线程。已改为分版本说明：Java 21 直接按十进制找，Java 17 才需要先转十六进制。核心条目和参考回答同步修改。

### Serial、Parallel 与 CMS（第 5 节）

原文只说 Java 17、21「无法用 `-XX:+UseConcMarkSweepGC` 选择它」。实测 17、21 都报 `Unrecognized VM option 'UseConcMarkSweepGC'`，JVM 无法启动。迁移时旧启动脚本会因此直接起不来，已补上这一句。

### Java 启动优化（第 2、3 节）

- 原文写「Oracle JDK 17、21 自带一份默认 CDS 归档」。Temurin 17、21 同样带有 `lib/server/classes.jsa`，`-Xlog:cds=info` 显示启动时打开了它。已改为「JDK 17、21 自带」，并注明常见构建的位置。
- 第 3 节补上实测现象：用 `ArchiveClassesAtExit` 生成动态归档后，换一个重新打包的 JAR 启动，`-Xshare:auto` 下只打印 `shared class paths mismatch` 警告并继续运行；`-Xshare:on` 下报 `Unable to use shared archive.`，退出码 1。

### 逃逸分析与标量替换（参考资料）

「OpenJDK：HotSpot Compiler」实际指向 HotSpot Glossary，标题已改为「OpenJDK：HotSpot Glossary」。

## 已验证的断言

收集器与参数（Temurin 21，另注 17）：

- 默认 `MaxGCPauseMillis=200`、`G1UseAdaptiveIHOP=true`、`InitiatingHeapOccupancyPercent=45`；Parallel 下 `GCTimeRatio=99`。
- `ZGenerational` 在 21 上默认 `false`，17 上不认识这个选项；Temurin 21 带 Shenandoah，`ShenandoahGCMode=satb`。
- G1 Region 为 1 MiB 时，总大小正好 512 KiB 的 `byte[]` 不是 Humongous 对象（`Humongous regions: 0->0`），多 1 个元素就是（20 个数组占 20 个 Region），即判定条件是严格大于半个 Region。
- 文中的 `-Xlog:gc*,safepoint:file=…:time,uptime,level,tags:filecount=10,filesize=100m` 能正常运行。

JIT：

- `PrintCompilation`：只返回字段的 `getV` 直接编译在 1 级；`main` 的循环产生带 `%` 的 OSR 编译；被更高层级替换的版本标为 `made not entrant`。
- 调用点从只见过 `Sq` 变为出现 `Ci` 后，4 级的 `Jit::sum` 被标为 `made not entrant` 并重新编译。
- 逃逸分析：`distance` 两个 `Point` 每次操作分配 0 字节，`-XX:-DoEscapeAnalysis` 下为 48 字节；`compute` 的发布分支从未执行时分配 0 字节，预热期间执行过时仍有分配。

诊断命令：

- `GC.class_histogram` 的影响等级为 High，带 `-all` 选项；`Thread.print` 为 Medium；`Compiler.perfmap` 在 17、21 都存在，为 Low。
- `GC.heap_dump` 在 JDK 21 源码中的影响说明为「High … Request a full GC unless the '-all' option is specified」，执行时 `-all` 为 false 才请求 GC。
- 两个线程以相反顺序进入嵌套 `synchronized` 后，`Thread.print -l` 输出 `Found one Java-level deadlock:` 和 `Found 1 deadlock.`。

CDS：

- `-XX:ArchiveClassesAtExit=app.jsa -cp app.jar` 生成动态归档（类路径是目录时报 `Cannot have non-empty directory in paths`，必须用 JAR）；用归档启动时 `Hum source: shared objects file (top)`。

下一批：Java 栏目其余部分（函数式、I/O、数据访问、代码质量、算法，各 5–6 篇），之后是 Spring（19 篇）。
