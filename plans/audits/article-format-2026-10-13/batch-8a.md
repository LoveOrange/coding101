# 文章格式审计：batch-8a

日期：2026-10-13。

本批优化指定的 13 篇 JVM 文章。保留原有 26 道题，新增 18 道本站原理自测。未提交 git。

实际工作区为 `coding101-ai`，分支为 `content/ai-batch-13`。任务指定分支已由 `coding101` worktree 使用。开始时，两者均指向 `c3188bc`，当前工作区干净。本批保留当前分支，未修改另一个 worktree。

## 表达与标识

- 完整阅读 AGENTS.md、batch-1b.md 和两篇指定样例。
- 每篇开头明确范围，相邻机制改用结论与链接。
- 面试核心改为可复述结论，参考回答先回答问题。诊断题保留必要的排查顺序。
- 普通二、三级标题使用概念或机制名，面试题保留完整题目。
- 保留全部 knowledge.id、已有显式锚点和卡片 ID。未删除或合并卡片。
- 补齐标题锚点，同步文内引用名称。标题编号连续，无重复显式 ID。
- 新题采用统一自测注释，未新增公司归属。原题公司字段和来源注释逐项与 HEAD 比较，保持不变。
- 逐段通读后修正长句、指代与术语。参考资料均为连续列表。

## 每篇改动与依据

### 1. Java 启动优化

文件：[aot-cds-native-image.mdx](../../../docs/basic-knowledge/java/jvm/aot-cds-native-image.mdx)。

区分 CDS、HotSpot AOT Cache 与 Native Image。补充动态 CDS 命令、AOT 功能版本表和构建期初始化控制。内联与运行期编译引用相邻文章。

新增题：`native-initialization`。

依据：[JEP 483](https://openjdk.org/jeps/483)、[JEP 514](https://openjdk.org/jeps/514)、[JEP 515](https://openjdk.org/jeps/515)、[JEP 516](https://openjdk.org/jeps/516)、[JDK 17 CDS](https://docs.oracle.com/en/java/javase/17/vm/class-data-sharing.html)、[GraalVM Class Initialization](https://www.graalvm.org/latest/reference-manual/native-image/optimizations-and-performance/ClassInitialization/)、[Reachability Metadata](https://www.graalvm.org/latest/reference-manual/native-image/metadata/)。

修正：方法画像属于 JDK 25 的 JEP 515。原面试核心将其混入 JDK 24 功能。单步训练命令明确限定为 JDK 25—26。缓存与机器码编译的边界也按版本表述。

人工确认：无。未进行应用启动或 Native Image 性能实验。

### 2. 类加载故障

文件：[class-initialization-conflicts.mdx](../../../docs/basic-knowledge/java/jvm/class-initialization-conflicts.mdx)。

按查找、链接、初始化和等待区分故障。补充首次 Error 传播、错误状态与并发初始化等待环。方法冲突保留描述符、真实来源和依赖图的诊断顺序。

新增题：`initialization-failure-retry`、`initialization-deadlock`。

依据：[JLS 12.4.2](https://docs.oracle.com/javase/specs/jls/se26/html/jls-12.html#jls-12.4.2)、[JVMS 加载与链接](https://docs.oracle.com/javase/specs/jvms/se26/html/jvms-5.html)、[jcmd](https://docs.oracle.com/en/java/javase/26/docs/specs/man/jcmd.html)。

修正：首次初始化失败并非一律包装异常。原异常属于 Error 时直接传播。执行静态初始化代码前已释放初始化锁。跨线程死锁来自等待初始化完成的依赖环。

人工确认：无。并发死锁示例需要特定时序，正文已写明。

### 3. 类加载

文件：[class-loading-stages.mdx](../../../docs/basic-knowledge/java/jvm/class-loading-stages.mdx)。

保留加载、验证、准备、解析与初始化的前置关系。补充默认方法接口初始化与编译期常量。说明包装类型、方法赋值和旧调用方内联值。初始化失败的完整诊断引用相邻文章。

新增题：`default-method-initialization`、`constant-inlining`。

依据：[JVMS 5](https://docs.oracle.com/javase/specs/jvms/se26/html/jvms-5.html)、[ConstantValue](https://docs.oracle.com/javase/specs/jvms/se26/html/jvms-4.html#jvms-4.7.2)、[JLS 12](https://docs.oracle.com/javase/specs/jls/se26/html/jls-12.html)、[JLS 4.12.4](https://docs.oracle.com/javase/specs/jls/se26/html/jls-4.html#jls-4.12.4)。

修正：ConstantValue 的赋值属于初始化，在调用 `<clinit>` 前完成。原文将其放在准备阶段。格式、版本检查与字节码验证分别说明。补齐声明默认方法的父接口初始化条件。

人工确认：无。示例输出根据初始化规范推导，未声称实测。

### 4. 类加载器

文件：[classloaders-spi-isolation.mdx](../../../docs/basic-knowledge/java/jvm/classloaders-spi-isolation.mdx)。

保留 TCCL、插件隔离、模块层和资源查找。补充 SPI 懒发现、构造器规则、缓存与发现异常。说明显式模块的 provider 方法及隐藏类卸载例外。

新增题：`spi-lazy-failure`。

依据：[ServiceLoader](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ServiceLoader.html)、[ClassLoader](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/ClassLoader.html)、[JEP 371](https://openjdk.org/jeps/371)、[JLS 12.7](https://docs.oracle.com/javase/specs/jls/se26/html/jls-12.html#jls-12.7)。

修正：“类不能单独卸载”限定为普通类。弱关联隐藏类可早于加载器卸载。修正资源名示例末尾空格，并明确 close 与卸载的区别。

人工确认：无。

### 5. 压缩指针与对象对齐

文件：[compressed-pointers-alignment.mdx](../../../docs/basic-knowledge/java/jvm/compressed-pointers-alignment.mdx)。

补充 4/8 字节堆内引用与 32 GiB 编码推导。区分对象引用、类指针、可达图大小与保留大小。补充 JDK 25—27 对象头与类指针选项变化。

新增题：`oop-klass-independence`。

依据：[HotSpot Performance Enhancements](https://docs.oracle.com/en/java/javase/26/vm/java-hotspot-virtual-machine-performance-enhancements.html)、[JDK 25 java](https://docs.oracle.com/en/java/javase/25/docs/specs/man/java.html)、[JOL](https://openjdk.org/projects/code-tools/jol/)、[JEP 519](https://openjdk.org/jeps/519)、[JDK 27 Release Notes](https://www.oracle.com/java/technologies/javase/27-relnote-issues.html)。

修正：扩大堆导致对象引用变宽，不意味着类指针一起变宽。JDK 27 始终压缩类指针，并默认启用紧凑对象头。原文未说明这些版本边界。

人工确认：无。未执行 JOL 布局或吞吐基准。

保留大小另据 [Eclipse MAT](https://help.eclipse.org/latest/topic/org.eclipse.mat.ui.help/concepts/shallowretainedheap.html) 核对，已加入文章参考资料。

### 6. CPU 使用率

文件：[cpu-high-diagnosis.mdx](../../../docs/basic-knowledge/java/jvm/cpu-high-diagnosis.mdx)。

保留 TID/nid 映射与 profile 定位。补充 cgroup v2 配额周期和节流计数。强调同一 PID 命名空间与相近采集时间。GC 阶段分析引用相邻文章。

新增题：`cpu-quota-throttling`。

依据：[Linux cgroup v2](https://docs.kernel.org/admin-guide/cgroup-v2.html)、[async-profiler Profiling Modes](https://github.com/async-profiler/async-profiler/blob/master/docs/ProfilingModes.md)、[Oracle Hangs and Loops](https://docs.oracle.com/en/java/javase/26/troubleshoot/troubleshoot-process-hangs-and-loops.html)。

修正：持续同栈属于热点线索，并非稳定热点的必要条件。新增主机空闲与容器节流可同时发生的解释。

人工确认：无。未修改主机或容器 CPU 参数。

### 7. JVM 诊断

文件：[diagnostic-tools-evidence.mdx](../../../docs/basic-knowledge/java/jvm/diagnostic-tools-evidence.mdx)。

按症状整理证据范围。补充持续 JFR 的年龄、大小和导出命令。说明 Attach 条件、堆转储默认回收和 `-all` 语义。

新增题：`heap-dump-impact`。

依据：[jcmd](https://docs.oracle.com/en/java/javase/26/docs/specs/man/jcmd.html)、[JFR Guide](https://docs.oracle.com/en/java/javase/26/jfapi/index.html)、[async-profiler Profiling Modes](https://github.com/async-profiler/async-profiler/blob/master/docs/ProfilingModes.md)。

修正：移除将普通 histogram 视为固定低影响级别的排序。JDK 26 将 GC.class_histogram 与 GC.heap_dump 都标为 High impact。`-all` 省去默认 Full GC 请求，仍有堆遍历与写盘影响。

人工确认：无。未对实际业务进程执行采集命令。

### 8. Java 直接内存

文件：[direct-native-memory.mdx](../../../docs/basic-knowledge/java/jvm/direct-native-memory.mdx)。

补充直接内存容量上限、默认值和 BufferPool 统计。说明共享视图的生命周期。FFM 明确 JDK 22 边界，映射区分通道关闭与 Arena 关闭。

新增题：`direct-limit-scope`。

依据：[ByteBuffer](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/ByteBuffer.html)、[Arena](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/Arena.html)、[BufferPoolMXBean](https://docs.oracle.com/en/java/javase/26/docs/api/java.management/java/lang/management/BufferPoolMXBean.html)、[Bits 源码](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/java.base/share/classes/java/nio/Bits.java)、[VM 源码](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/java.base/share/classes/jdk/internal/misc/VM.java)、[FileChannel](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/FileChannel.html)、[NMT](https://docs.oracle.com/en/java/javase/26/vm/native-memory-tracking.html)。

修正：MaxDirectMemorySize 限制 NIO 容量计数，非全部堆外分配。分配超限需经过清理和重试。普通缓冲区释放与可达性清理相关，不等于包装对象已回收。堆转储可显示包装对象与持有链。NMT committed 与 RSS 也分别说明。

人工确认：无。未进行内存耗尽或映射实验。

### 9. 逃逸分析与标量替换

文件：[escape-analysis-scalar-replacement.mdx](../../../docs/basic-knowledge/java/jvm/escape-analysis-scalar-replacement.mdx)。

补充条件逃逸与 C2 流不敏感分析。保留标量替换、锁消除和栈上分配边界。给出独立 fork 中关闭逃逸分析的对照命令。

新增题：`conditional-escape`。

依据：[HotSpot Escape Analysis](https://docs.oracle.com/en/java/javase/26/vm/java-hotspot-virtual-machine-performance-enhancements.html)、[JMH Samples](https://github.com/openjdk/jmh/tree/master/jmh-samples/src/main/java/org/openjdk/jmh/samples)。

修正：未内联不是优化绝不发生的充分条件。结论改为具体分析边界。距离示例在减法前转 long，避免 int 溢出；补充 Point 定义。基准返回标量，避免返回对象改变逃逸条件。

人工确认：无。未执行 JMH，不承诺具体分配消除结果。

### 10. G1

文件：[g1-regions-rset-collection-set.mdx](../../../docs/basic-knowledge/java/jvm/g1-regions-rset-collection-set.mdx)。

补充 Humongous 连续分配、尾部浪费与提前回收。说明自适应 IHOP、初始 45% 与手动模式。通用屏障原理引用分代回收。

新增题：`adaptive-ihop`、`humongous-fragmentation`。

依据：[G1 Guide](https://docs.oracle.com/en/java/javase/26/gctuning/garbage-first-g1-garbage-collector1.html)、[G1 Tuning](https://docs.oracle.com/en/java/javase/26/gctuning/garbage-first-garbage-collector-tuning.html)、[G1CollectedHeap::is_humongous](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/hotspot/share/gc/g1/g1CollectedHeap.hpp)。

修正：JDK 26 源码用严格大于半个 Region 判定 Humongous。原文“超过或等于约一半”改为精确实现条件。Full GC 还可由显式调用或诊断命令触发。

人工确认：无。Oracle 26 指南使用“大于或等于”的概述。精确等号边界采用固定版本源码的 `>`，已核对实现注释。

### 11. GC 停顿分析

文件：[gc-logs-jfr-pauses.mdx](../../../docs/basic-knowledge/java/jvm/gc-logs-jfr-pauses.mdx)。

补充日志容量示意、User/Sys/Real 与 JFR 分配事件粒度。增加显式 GC、诊断回收与元数据阈值的分类。安全点机制引用分代回收。

新增题：`gc-log-capacity`、`allocation-event-count`。

依据：[G1 Tuning and Logging](https://docs.oracle.com/en/java/javase/26/gctuning/garbage-first-garbage-collector-tuning.html)、[java Logging](https://docs.oracle.com/en/java/javase/26/docs/specs/man/java.html)、[JFR Guide](https://docs.oracle.com/en/java/javase/26/jfapi/index.html)、[JFR 事件定义](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/hotspot/share/jfr/metadata/metadata.xml)。

修正：回收后占用需结合回收范围解释。Young GC 后老年代仍高不能直接证明泄漏。NewTLAB 事件不覆盖每次 TLAB 内分配。日志容量、最大堆与采样权重分别说明。

人工确认：无。文中日志明确标为格式示意，不是实测结果。

### 12. GC Roots

文件：[gc-roots-reachability.mdx](../../../docs/basic-knowledge/java/jvm/gc-roots-reachability.mdx)。

补充 WeakHashMap 的 value→key 强持有路径。说明 Cleaner 捕获 this 与显式关闭。类卸载规则引用类加载器文章。

新增题：`weak-map-value-cycle`、`cleaner-capture-owner`。

依据：[java.lang.ref](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/ref/package-summary.html)、[WeakReference](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/ref/WeakReference.html)、[PhantomReference](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/ref/PhantomReference.html)、[WeakHashMap](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/WeakHashMap.html)、[Cleaner](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/ref/Cleaner.html)、[JEP 421](https://openjdk.org/jeps/421)。

修正：弱引用以 GC 发现弱可达为清除条件，并非任意下一次 GC。虚引用入队不表示物理内存已经释放。保留对象的条件为根可达，而非存在任意强引用。静态字段也不使不可达加载器永久存活。

人工确认：无。

### 13. 分代回收

文件：[generational-barriers-safepoints.mdx](../../../docs/basic-knowledge/java/jvm/generational-barriers-safepoints.mdx)。

补充三色模型、SATB、增量更新与浮动垃圾。分别说明 G1 前置、后置写屏障的职责。补充 native/阻塞线程安全状态及线程握手。

新增题：`satb-floating-garbage`。

依据：[G1 Guide](https://docs.oracle.com/en/java/javase/26/gctuning/garbage-first-g1-garbage-collector1.html)、[JEP 312](https://openjdk.org/jeps/312)、[Safepoint 源码](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/hotspot/share/runtime/safepoint.cpp)。

修正：部分线程操作可由 handshake 完成，无需一律全局停顿。native 执行可处于可扫描状态，耗时长并非必然拖延安全点。SATB 与 RSet 的正确性职责分别说明。

人工确认：无。

## 相邻文章分工

G1 前置、后置屏障另据 [G1BarrierSet 源码](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/hotspot/share/gc/g1/g1BarrierSet.inline.hpp) 核对。前者将旧值入 SATB 队列，后者更新脏卡。该来源已加入分代回收参考资料。

类加载负责阶段与触发，故障文章负责异常与等待。类加载器负责服务发现与隔离。分代回收负责屏障和安全点，G1 负责具体回收集合。诊断文章负责工具证据，CPU 与 GC 文章负责各自分析。

本批仅修改这 13 篇文章及本记录。已有显式锚点保留，构建未要求修改外部引用文件。

## 验证

严格格式检查通过：13 篇，0 篇结构问题，0 篇文风提示。

与 HEAD 比较确认：26 个原卡片全部保留，新增 18 个英文卡片 ID。全部 knowledge.id、原显式锚点、公司字段和来源注释保留。二、三级标题均有显式锚点，编号连续。

要求的检查均通过：

```sh
node scripts/check-article-format.mjs --style-strict -- \
  docs/basic-knowledge/java/jvm/aot-cds-native-image.mdx \
  docs/basic-knowledge/java/jvm/class-initialization-conflicts.mdx \
  docs/basic-knowledge/java/jvm/class-loading-stages.mdx \
  docs/basic-knowledge/java/jvm/classloaders-spi-isolation.mdx \
  docs/basic-knowledge/java/jvm/compressed-pointers-alignment.mdx \
  docs/basic-knowledge/java/jvm/cpu-high-diagnosis.mdx \
  docs/basic-knowledge/java/jvm/diagnostic-tools-evidence.mdx \
  docs/basic-knowledge/java/jvm/direct-native-memory.mdx \
  docs/basic-knowledge/java/jvm/escape-analysis-scalar-replacement.mdx \
  docs/basic-knowledge/java/jvm/g1-regions-rset-collection-set.mdx \
  docs/basic-knowledge/java/jvm/gc-logs-jfr-pauses.mdx \
  docs/basic-knowledge/java/jvm/gc-roots-reachability.mdx \
  docs/basic-knowledge/java/jvm/generational-barriers-safepoints.mdx
npm run build
git diff --check
```

构建通过文档链接、复习资源、岗位和面经检查。Docusaurus 成功生成静态文件，退出码为 0。

全站检查仍报告本批之外的 6 篇结构问题、118 篇文风提示。另有既有博客作者、摘要、localStorage 和更新检查提示。webpack 缓存写入出现 EPERM，但未影响构建成功。未扩大范围处理这些问题。

## 未完成与人工确认

无内容阻塞项。技术事实通过规范、官方文档与固定版本源码核验。

本批未进行 Java 运行实验。现有 Docker 镜像无 JDK；本机默认 java 报 `Bad CPU type in executable`。未下载镜像、安装 JDK 或修改全局环境。代码输出和机制解释均未标作实测结论。

工作区与任务所述分支不同，见开头记录。改动保留在当前工作区，未迁移、提交或合并分支。
