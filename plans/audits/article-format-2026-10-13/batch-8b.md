# 文章格式审计：batch-8b

日期：2026-10-13。分支：`content/ai-batch-13`。

本批完成指定 12 篇 JVM 文章的表达优化。新增 15 道本站原理自测。另同步更新一处复习资源锚点。未切换分支，未提交 git。

## 表达与标识

- 完整阅读 AGENTS.md、batch-1b 及两篇指定样例。
- 开头明确文章范围，并链接相邻主题。普通二、三级标题改为名词性名称。面试题保留完整问题。
- 面试核心改为可复述的技术结论。参考回答首句直接回答问题。诊断题保留必要步骤。
- 拆分长句，删除兜底限定与重复否定。完成后逐段通读，再运行严格格式检查。
- 12 个 knowledge.id、全部旧显式锚点均保留。原有 24 道卡片保留，未删除或合并。
- 新增题均使用英文 ID 和统一自测注释。没有新增公司归属。原有公司字段及来源注释保持不变。
- 所有二、三级标题均有显式锚点。新章节锚点采用标题文字，不带编号。

## 每篇改动与依据

### 1. 堆转储

文件：[heap-dumps-memory-leaks.mdx](../../../docs/basic-knowledge/java/jvm/heap-dumps-memory-leaks.mdx)。

负责转储采集、持有关系和泄漏验证。补充默认转储与 `-all` 的差异。解释支配关系、共享对象与保留大小。GC Roots 类型和堆外诊断改为相邻文章链接。

新增题：`heap-dump-all`。

依据：[JDK 26 jcmd](https://docs.oracle.com/en/java/javase/26/docs/specs/man/jcmd.html)、[Oracle Memory Leaks](https://docs.oracle.com/en/java/javase/26/troubleshoot/troubleshooting-memory-leaks.html)、[MAT Dominator Tree](https://help.eclipse.org/latest/topic/org.eclipse.mat.ui.help/concepts/dominatortree.html)、[MAT Shallow and Retained Heap](https://help.eclipse.org/latest/topic/org.eclipse.mat.ui.help/concepts/shallowretainedheap.html)。

修正与澄清：直方图输出小仍有堆遍历成本。转储文件大小不固定等于堆大小。`-all` 省去主动请求 Full GC，仍有采集成本。支配树父子关系与直接引用关系不同。

人工确认：无。

### 2. 方法内联与去优化

文件：[inlining-deoptimization.mdx](../../../docs/basic-knowledge/java/jvm/inlining-deoptimization.mdx)。

负责内联条件、类型守卫和去优化恢复。补充逻辑栈帧与被消除对象的重建。分层编译和标量替换机制改为链接。

新增题：`deopt-state-reconstruction`。

依据：[OpenJDK 26 Deoptimization](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/hotspot/share/runtime/deoptimization.cpp)、[C2 内联策略](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/hotspot/share/opto/bytecodeInfo.cpp)、[java 命令](https://docs.oracle.com/en/java/javase/26/docs/specs/man/java.html)。

修正与澄清：新类型调用可走已有通用回退路径。新类加载只影响依赖失效的编译代码。HotSpot 去优化的恢复目标写明为解释器帧。后续重新编译另行说明。

人工确认：无。

### 3. 分层编译

文件：[interpreter-tiered-compilation.mdx](../../../docs/basic-knowledge/java/jvm/interpreter-tiered-compilation.mdx)。

补全 0—4 级与画像差异。解释 `0 → 3 → 4`、2 级过渡与 1 级简单方法。区分 OSR 与普通方法入口。补充 `not entrant` 的版本替换含义。

新增题：`tier-levels`。

依据：[OpenJDK 26 CompilationPolicy](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/hotspot/share/compiler/compilationPolicy.hpp)、[CompileBroker](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/hotspot/share/compiler/compileBroker.cpp)、[JDK 26 jcmd](https://docs.oracle.com/en/java/javase/26/docs/specs/man/jcmd.html)。

修正与澄清：分层编译无需逐级经过所有层级。Code Cache 满后能否恢复取决于清理策略。正文写明 `-XX:+UseCodeCacheFlushing` 条件。

人工确认：无。

### 4. JMH

文件：[jmh-correct-benchmarks.mdx](../../../docs/basic-knowledge/java/jvm/jmh-correct-benchmarks.mdx)。

重写最小结果消费与 State 示例。补充排序输入被修改后的测量偏差。说明复制成本、Invocation 计时与缓存干扰。补充 Group 共享和线程数配置。

新增题：`mutable-benchmark-input`。

依据：[JMH PerInvokeSetup](https://github.com/openjdk/jmh/blob/master/jmh-samples/src/main/java/org/openjdk/jmh/samples/JMHSample_38_PerInvokeSetup.java)、[Level](https://github.com/openjdk/jmh/blob/master/jmh-core/src/main/java/org/openjdk/jmh/annotations/Level.java)、[DeadCode](https://github.com/openjdk/jmh/blob/master/jmh-samples/src/main/java/org/openjdk/jmh/samples/JMHSample_08_DeadCode.java)、[ConstantFold](https://github.com/openjdk/jmh/blob/master/jmh-samples/src/main/java/org/openjdk/jmh/samples/JMHSample_10_ConstantFold.java)。

修正与澄清：SingleShotTime 不包含 JVM 启动。Iteration setup 同时作用于预热与测量。共享容器也可使用 Group。OperationsPerInvocation 只归一化结果，不撤销循环优化。

人工确认：无。本批未运行 JMH 性能实验。

### 5. Java 对象布局

文件：[object-creation-layout.mdx](../../../docs/basic-knowledge/java/jvm/object-creation-layout.mdx)。

负责分配、构造与布局组成。补充 TLAB 失败路径和构造期动态分派。增加父类构造器调用子类方法的最小例子。具体字节数引用压缩指针文章。

新增题：`tlab-allocation`、`constructor-virtual-dispatch`。

依据：[JLS 26 §12.5](https://docs.oracle.com/javase/specs/jls/se26/html/jls-12.html#jls-12.5)、[JLS final 字段语义](https://docs.oracle.com/javase/specs/jls/se26/html/jls-17.html#jls-17.5)、[OpenJDK 26 MemAllocator](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/hotspot/share/gc/shared/memAllocator.cpp)、[JDK 25 Compact Object Headers](https://docs.oracle.com/en/java/javase/25/gctuning/other-considerations.html)。

修正与澄清：Java 25 的正式语法允许构造器前置语句。构造顺序须计入 `super(...)` 前的受限代码。TLAB 失败本身不决定对象进入老年代。紧凑对象头默认关闭的说明限定为 JDK 25。

人工确认：无。构造示例结果依据 JLS 推导，未本地运行。

### 6. OutOfMemoryError 与 StackOverflowError

文件：[oom-stack-overflow.mdx](../../../docs/basic-knowledge/java/jvm/oom-stack-overflow.mdx)。

负责错误分类、证据与恢复边界。补充数组长度上限、GC overhead 条件和 OOM Kill。堆内引用分析与堆外工具改为相邻文章链接。

新增题：`oom-kill-vs-java`。

依据：[Oracle Memory Leaks](https://docs.oracle.com/en/java/javase/26/troubleshoot/troubleshooting-memory-leaks.html)、[JDK 8 Parallel Collector](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/parallel.html)、[report_java_out_of_memory](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/hotspot/share/utilities/debug.cpp)、[Linux cgroup v2](https://docs.kernel.org/admin-guide/cgroup-v2.html#memory)、[signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)。

修正与澄清：自动堆转储只覆盖相应 HotSpot OOM 路径。操作系统杀进程时无法保证转储。137 也可来自其他 SIGKILL，需核对 OOM 事件。98%/2% 规则限定为 JDK 8 Parallel 背景。

人工确认：无。本批未触发 OOM 或修改容器限额。

### 7. 双亲委派模型

文件：[parent-delegation.mdx](../../../docs/basic-knowledge/java/jvm/parent-delegation.mdx)。

负责默认查找协议与运行时类型身份。补充发起加载器、定义加载器和委派后的已加载记录。SPI 与插件隔离引用相邻文章。

新增题：`initiating-defining-loader`。

依据：[JDK 26 ClassLoader API](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/ClassLoader.html)、[JVMS §5.3](https://docs.oracle.com/javase/specs/jvms/se26/html/jvms-5.html#jvms-5.3)、[ClassLoader 源码](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/java.base/share/classes/java/lang/ClassLoader.java)。

修正与澄清：findLoadedClass 查询发起加载记录。原来的“已有定义”表述过窄。默认委派与 java.* 定义保护分别解释。模块场景也存在跨层委派。

人工确认：无。

### 8. JVM 运行时数据区域

文件：[runtime-data-areas.mdx](../../../docs/basic-knowledge/java/jvm/runtime-data-areas.mdx)。

负责区域职责、共享范围和栈帧。补充 long/double 双槽位、this、max_locals 与 max_stack。明确静态字段值与类元数据的存储分工。

新增题：`frame-slots`。

依据：[JVMS 数据区域](https://docs.oracle.com/javase/specs/jvms/se26/html/jvms-2.html#jvms-2.5)、[JVMS Frames](https://docs.oracle.com/javase/specs/jvms/se26/html/jvms-2.html#jvms-2.6)、[Code 属性](https://docs.oracle.com/javase/specs/jvms/se26/html/jvms-4.html#jvms-4.7.3)、[OpenJDK 26 javaClasses.cpp](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/hotspot/share/classfile/javaClasses.cpp)。

修正与澄清：线程栈属于规范列出的运行时区域。原文将其笼统归入“规范以外”不准确。静态字段值位于 HotSpot 堆中的 Class 镜像。槽位容量与实际机器字节数分别解释。

人工确认：无。

### 9. Serial、Parallel 与 CMS

文件：[serial-parallel-cms.mdx](../../../docs/basic-knowledge/java/jvm/serial-parallel-cms.mdx)。

补充 CMS 四个主要阶段及暂停位置。区分浮动垃圾和空间碎片。补充 Parallel 的吞吐目标与参数。CMS 机制限定在 JDK 8 背景。

新增题：`cms-phases`。

依据：[JDK 8 CMS](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/cms.html)、[Parallel Collector](https://docs.oracle.com/en/java/javase/26/gctuning/parallel-collector1.html)、[Available Collectors](https://docs.oracle.com/en/java/javase/26/gctuning/available-collectors.html)、[JEP 363](https://openjdk.org/jeps/363)。

修正与澄清：concurrent mode failure 也涉及空闲块不足。失败处理写明应用暂停和完成回收。未继续将所有失败概括为固定单线程路径。GCTimeRatio 与 MaxGCPauseMillis 是目标值。

人工确认：无。本批未运行旧版 CMS 实验。

### 10. Java 字节码

文件：[source-to-bytecode.mdx](../../../docs/basic-knowledge/java/jvm/source-to-bytecode.mdx)。

负责 Class、描述符和目标版本。补充魔数、Code 属性、五类调用指令。增加 major 版本和 `--release 8` 的兼容说明。运行期细节引用类加载与分层编译文章。

新增题：`release-compatibility`、`bytecode-invocations`。

依据：[JVMS Class 格式](https://docs.oracle.com/javase/specs/jvms/se26/html/jvms-4.html)、[JVMS 指令集](https://docs.oracle.com/javase/specs/jvms/se26/html/jvms-6.html#jvms-6.5)、[javac](https://docs.oracle.com/en/java/javase/26/docs/specs/man/javac.html)、[javap](https://docs.oracle.com/en/java/javase/26/docs/specs/man/javap.html)、[JEP 280](https://openjdk.org/jeps/280)。

修正与澄清：解析可以延迟，初始化按使用条件触发。源码到运行不再写成所有阶段一次性完成。平台无关仍有 Class 版本和 API 兼容要求。

人工确认：无。字节码示例按规范核对，未本地编译。

### 11. 线程转储

文件：[thread-dumps-deadlocks-contention.mdx](../../../docs/basic-knowledge/java/jvm/thread-dumps-deadlocks-contention.mdx)。

负责锁图、竞争、线程池饥饿与采集边界。补充 ReentrantLock 等待状态和虚拟线程覆盖范围。明确 ThreadMXBean 的平台线程检测范围。

新增题：`virtual-thread-dump`。

依据：[JDK 26 jcmd](https://docs.oracle.com/en/java/javase/26/docs/specs/man/jcmd.html)、[ThreadMXBean](https://docs.oracle.com/en/java/javase/26/docs/api/java.management/java/lang/management/ThreadMXBean.html)、[Virtual Threads](https://docs.oracle.com/en/java/javase/26/core/virtual-threads.html)、[JEP 491](https://openjdk.org/jeps/491)、[Thread.State](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Thread.State.html)。

修正与澄清：自动检测无法覆盖所有业务等待环。Thread.dump_to_file 不是一致快照，也不自动检测死锁。JDK 26 Thread.print 只包含已挂载虚拟线程。JDK 24 起 synchronized 的旧 pinning 限制已解除。

人工确认：无。本批未制造死锁或采集实际业务进程。

### 12. 低延迟垃圾收集器

文件：[zgc-shenandoah-low-latency.mdx](../../../docs/basic-knowledge/java/jvm/zgc-shenandoah-low-latency.mdx)。

补充分代 ZGC 的加载与存储屏障。列明 ZGC 与 Shenandoah 的版本配置。增加软堆上限和最大堆的例子。分别解释 allocation stall 与退化回收。

新增题：`generational-zgc-barriers`、`soft-max-heap`。

依据：[JEP 439](https://openjdk.org/jeps/439)、[JEP 474](https://openjdk.org/jeps/474)、[JEP 490](https://openjdk.org/jeps/490)、[JEP 404](https://openjdk.org/jeps/404)、[JEP 521](https://openjdk.org/jeps/521)、[OpenJDK 26 Shenandoah 参数](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/hotspot/share/gc/shenandoah/shenandoah_globals.hpp)、[Shenandoah Wiki](https://wiki.openjdk.org/display/shenandoah/Main)、[JDK 26 GC Guide 第 9 章](https://docs.oracle.com/en/java/javase/26/gctuning/hotspot-virtual-machine-garbage-collection-tuning-guide.pdf)。

修正与澄清：分代 Shenandoah 在 JDK 24 已实验交付。JDK 25 是产品化，默认仍为单代。分代 ZGC 同时使用 load/store barrier。原文对 ZGC 与 Shenandoah 的退化路径混写，现已分开。SoftMaxHeapSize 是软目标。

人工确认：无。本批未声称任何收集器的性能排名。

## 引用联动

[src/data/reviewPlans/javaReadingResources.json](../../../src/data/reviewPlans/javaReadingResources.json) 仅修改 OOM 文章的一处 coreHref。旧自动锚点 `#2-java-heap-space` 改为 `#java-heap-space`。其他路径数据与 contentMoves 未修改。

## 验证

执行命令：

```sh
node scripts/check-article-format.mjs --style-strict -- \
  docs/basic-knowledge/java/jvm/heap-dumps-memory-leaks.mdx \
  docs/basic-knowledge/java/jvm/inlining-deoptimization.mdx \
  docs/basic-knowledge/java/jvm/interpreter-tiered-compilation.mdx \
  docs/basic-knowledge/java/jvm/jmh-correct-benchmarks.mdx \
  docs/basic-knowledge/java/jvm/object-creation-layout.mdx \
  docs/basic-knowledge/java/jvm/oom-stack-overflow.mdx \
  docs/basic-knowledge/java/jvm/parent-delegation.mdx \
  docs/basic-knowledge/java/jvm/runtime-data-areas.mdx \
  docs/basic-knowledge/java/jvm/serial-parallel-cms.mdx \
  docs/basic-knowledge/java/jvm/source-to-bytecode.mdx \
  docs/basic-knowledge/java/jvm/thread-dumps-deadlocks-contention.mdx \
  docs/basic-knowledge/java/jvm/zgc-shenandoah-low-latency.mdx
npm run build
git diff --check
```

- 本批严格格式检查通过：12 篇，0 结构问题，0 文风提示。
- 构建通过：链接、复习资源、岗位与面经数据检查成功。Docusaurus 成功生成静态文件。
- 与 HEAD 比较稳定标识、卡片与公司注释。原有标识及归属信息均保留。
- 全站格式报告仍有本批外 6 篇结构问题。另有 106 篇文风提示，均不阻断构建。
- 构建仍有博客作者、摘要与 localStorage 提示。缓存写入 EPERM 和更新检查提示未阻断构建。未修改这些任务范围外的配置。

## 未完成与人工确认

无阻塞事项。技术结论按官方文档、规范和源码核对。

本地 Java 启动失败，报 `Bad CPU type in executable`。Docker 已有镜像中没有 JDK，因此未执行 Java 实验。没有拉取新镜像，也没有启动测试容器。文中示例输出属于规范推导，性能选型没有实测承诺。
