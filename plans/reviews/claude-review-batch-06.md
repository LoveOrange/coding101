# Claude 校验 · 第 6 批（2026-10-29）

范围：JVM 栏目的前 13 篇，包括栏目首页，从字节码到分代回收。后 13 篇（Serial/Parallel/CMS 到 GC 停顿分析）放在第 7 批。校验后直接修改，Lin 的审阅异步进行。

校验项：

1. 技术事实与版本基线（Java 17 / 21，实现细节以 HotSpot 21 为准）。
2. 代码示例与实现细节：在 Eclipse Temurin 21.0.12 上运行了 70 多项断言，类初始化、对象大小、压缩指针、直接内存的结论另在 Temurin 17.0.20.1 上确认。对象大小用 `Instrumentation.getObjectSize` 和 `Unsafe.objectFieldOffset` 测量；线程创建失败用 `docker --pids-limit` 复现。
3. 与相邻文章是否矛盾，站内锚点是否存在：155 个站内链接都存在；首页指向面试页的 `#jvm-memory` 由组件生成，构建产物里存在。
4. 参考资料：64 个外部链接中，1 个锚点失效，1 个页面已不存在，都已替换。

## 结论

| 文章 | 结论 | 修改 |
| --- | --- | --- |
| [JVM（栏目首页）](../../docs/basic-knowledge/java/jvm/index.mdx) | ✅ 通过 | — |
| [Java 字节码](../../docs/basic-knowledge/java/jvm/source-to-bytecode.mdx) | ✅ 通过 | — |
| [类加载](../../docs/basic-knowledge/java/jvm/class-loading-stages.mdx) | ✅ 通过 | — |
| [双亲委派模型](../../docs/basic-knowledge/java/jvm/parent-delegation.mdx) | ✅ 已修改 | `findLoadedClass` 能否返回委派取得的类，缺少前提条件 |
| [类加载器](../../docs/basic-knowledge/java/jvm/classloaders-spi-isolation.mdx) | ✅ 通过 | — |
| [类加载故障](../../docs/basic-knowledge/java/jvm/class-initialization-conflicts.mdx) | ✅ 已修改 | 后续 `NoClassDefFoundError` 的原因链说法过时；补上类初始化死锁在线程转储里的样子 |
| [JVM 运行时数据区域](../../docs/basic-knowledge/java/jvm/runtime-data-areas.mdx) | ✅ 通过 | — |
| [Java 对象布局](../../docs/basic-knowledge/java/jvm/object-creation-layout.mdx) | ✅ 通过 | — |
| [压缩指针与对象对齐](../../docs/basic-knowledge/java/jvm/compressed-pointers-alignment.mdx) | ✅ 已修改 | 示例命令里的 `rg` 改为 `grep -E` |
| [Java 直接内存](../../docs/basic-knowledge/java/jvm/direct-native-memory.mdx) | ✅ 已修改 | BufferPool `used` 的含义不准；NMT 参考链接锚点失效 |
| [OutOfMemoryError 与 StackOverflowError](../../docs/basic-knowledge/java/jvm/oom-stack-overflow.mdx) | ✅ 已修改 | 直接缓冲区 OOM 的消息写成了旧版本格式；补上不产生堆转储的情况 |
| [GC Roots](../../docs/basic-knowledge/java/jvm/gc-roots-reachability.mdx) | ✅ 通过 | — |
| [分代回收](../../docs/basic-knowledge/java/jvm/generational-barriers-safepoints.mdx) | ✅ 已修改 | OpenJDK Wiki 的 Safepoints 页面已不存在 |

## 修改内容

### 类加载故障（第 3、4 节，10.1 参考回答）

原文写后续的 `NoClassDefFoundError`「不能单独解释最初为什么失败」，只保留它时「需要复现第一次初始化」。实测 Temurin 21.0.12 和 17.0.20.1：第二次使用失败的类时，`NoClassDefFoundError` 带一个 `ExceptionInInitializerError` 作为 cause，消息为 `Exception java.lang.IllegalStateException: missing endpoint [in thread "main"]`，栈顶是首次抛错的方法。首次抛出的是 `Error` 时也一样。

已改为：说明 JDK 21 和较新的 JDK 17 更新版本会带上这条 cause，并给出示例；较早的 JDK 才需要回到首次失败的日志或复现。

第 3 节原文写类初始化死锁「常规的 Java monitor 死锁检测不一定会直接报告它」。实测 17、21 都报告不了：两个线程状态为 `RUNNABLE`，`findDeadlockedThreads()` 和 `findMonitorDeadlockedThreads()` 都返回 `null`，线程转储没有死锁提示，栈里 `<clinit>` 帧下面有 `waiting on the Class initialization monitor for Y`。已把这些具体现象写进正文，方便读者照着线程转储认出来。

### 双亲委派模型（3.1 节、9.3 参考回答）

原文写「`findLoadedClass` 查询 JVM 记录的发起加载关系，所以也能返回经委派取得的类」，没有说明什么时候才有这条记录。实测：

- Java 代码直接调用 `child.loadClass("api.Service")`，父加载器完成定义后，`child.findLoadedClass("api.Service")` 返回 `null`。
- 子加载器定义的类引用 `api.User`，JVM 解析这个引用后，`child.findLoadedClass("api.User")` 返回该类。

这和 `findLoadedClass` 的 Javadoc 一致（「has been recorded by the Java virtual machine as an initiating loader」）。已补上前提：只有 JVM 自己经这个加载器发起的加载才会留下记录。

### Java 直接内存（2.1 节、10.3 参考回答、参考资料）

原文写 `used` 是「对底层实际占用的估计」，「受对齐和分配器的影响」。按 OpenJDK 21 `DirectByteBuffer` 和 `Bits.reserveMemory`，`used` 记的是 `max(1, cap + (页对齐 ? 页大小 : 0))`，和分配器无关。实测：1000 字节缓冲区 `used=1000`；再加一个容量为 0 的缓冲区 `used=1001`；`-Dsun.nio.PageAlignDirectMemory=true` 时 1000 字节缓冲区 `used=5096`。已改为说明默认按容量记账、开启页对齐时多记一页。

「Oracle：Native Memory Tracking」指向故障排查指南的锚点 `GUID-70507484-…` 不存在，已改为该页 Native Memory Tracking 一节的 `GUID-1F53A50E-…`，标题加上「（故障排查指南）」，和同页另一条同名参考区分。

### OutOfMemoryError 与 StackOverflowError（第 5、8 节，10.1 参考回答）

- 原文把直接缓冲区 OOM 的消息写成 `Direct buffer memory`。实测 17、21 的消息是 `Cannot reserve 1048576 bytes of direct buffer memory (allocated: 67108864, limit: 67108864)`，按原文的大小写搜日志会找不到。已改为实际格式，表格和参考回答同步。
- 原文写「应用手动抛出的 OOM、线程创建失败等情况不保证自动产出堆转储」。实测 `-XX:+HeapDumpOnOutOfMemoryError`：堆和元空间 OOM 都生成了转储；直接缓冲区 OOM 和 `unable to create native thread` 都没有生成。直接缓冲区 OOM 是 JDK 在 Java 代码里抛出的，不经过 HotSpot 的转储路径，这一点读者容易漏掉，已写明。

### 压缩指针与对象对齐（第 2 节）

查看选项的命令用了 `rg`，服务器和 JDK 容器镜像里一般没有，已改为 `grep -E`。

### 分代回收（参考资料）

`wiki.openjdk.org/display/HotSpot/Safepoints` 返回 404（同站其他页面正常），已改为 HotSpot Glossary 的 safepoint 词条。

## 已验证的断言

字节码：

- `Price.total` 的字节码为 `iload_0`、`iload_1`、`imul`、`ireturn`；`find(long)` 的描述符为 `(J)Ljava/util/List;`，Signature 属性保留 `List<String>`。
- 字符串拼接编译为 `invokedynamic makeConcatWithConstants`；`abstract`、`native` 方法没有 Code 属性。
- JDK 21 默认 major 65；`--release 8` 为 52，`--release 17` 为 61。
- 调用 `List.of` 的代码：`-source 8 -target 8` 只给出警告、编译成功；`--release 8` 报 `cannot find symbol`。

类加载与初始化（17、21 结果相同）：

- `new` 实现类时，间接父接口声明了默认方法就先初始化它；父接口没有默认方法时不初始化；初始化子接口不初始化父接口。
- `C.parentField` 只初始化 `P`；读取 `int`、`String` 常量不初始化声明类；读取 `Integer` 常量和方法赋值的 `final` 字段会初始化。
- `new Arr[3]`、`Arr.class`、`loadClass`、`forName(name, false, loader)` 都不初始化；`forName(name)` 初始化。
- 普通静态字段在初始化时得到源码里的值。
- 首次初始化抛 `IllegalStateException` 时得到 `ExceptionInInitializerError`；首次抛 `Error` 时直接传播；之后都得到 `NoClassDefFoundError: Could not initialize class …`。
- `A`、`B` 互相引用静态字段，单线程结果都是 `null`；两个线程分别初始化时死锁，见上文。
- `Class.forName` 找不到类时抛受检的 `ClassNotFoundException`。

双亲委派与类加载器：

- 同一份字节码由两个加载器定义，得到两个类型，`cast` 抛 `ClassCastException: Cannot cast api.User to api.User`。
- 自定义加载器 `defineClass("java.lang.Fake", …)` 抛 `SecurityException: Prohibited package name`。
- 应用加载器的父加载器是平台加载器，平台加载器的父加载器为 `null`；`String.class.getClassLoader()` 为 `null`。
- `ServiceLoader.load()` 成功；遍历时第三个提供者构造器抛错，前两个已登记，异常为 `ServiceConfigurationError`，cause 是构造器异常；`stream()` 能列出三个提供者的类型而不实例化。

对象布局与压缩指针（17、21 结果相同）：

- 默认配置：空对象 16 字节，一个 `int` 字段 16 字节，`int[0]` 16 字节，`Object[4]` 32 字节，`Integer[1000]` 4016 字节。
- 关闭压缩类指针后，对象头变为 16 字节（一个 `int` 的对象 24 字节）。
- 关闭压缩对象指针后，类指针仍然压缩，`Object[4]` 变为 48 字节，`Integer[1000]` 变为 8016 字节。
- `Entry(byte, long, Object)` 的偏移为 `state@12`、`timestamp@16`、`value@24`，`byte` 填进了对象头后的空隙。
- `-Xmx31g` 开启压缩对象指针，`-Xmx32g` 关闭；16 字节对齐时 `-Xmx63g` 仍开启，`-Xmx64g` 关闭；ZGC 下 `UseCompressedOops=false`。
- 父类构造器调用子类覆写方法，打印子类字段的默认值 0；`Counter(5)` 构造后 `step=1`、`value=5`。

直接内存与 OOM：

- 未设置 `MaxDirectMemorySize` 时，`-Xmx64m` 下最多分配 64 MiB 直接缓冲区，即 `Runtime.maxMemory()`。
- `slice()` 不增加缓冲区计数，与原缓冲区共享内容。
- 启动时未开 NMT，`VM.native_memory summary` 返回 `Native memory tracking is not enabled`。
- `new byte[Integer.MAX_VALUE]` 得到 `Requested array size exceeds VM limit`，`Integer.MAX_VALUE - 8` 得到 `Java heap space`。
- Parallel 下 `GCTimeLimit=98`、`GCHeapFreeLimit=2`、`UseGCOverheadLimit=true`。
- PID 上限 120 的容器里，创建第 100 个平台线程时得到 `unable to create native thread: possibly out of memory or process/resource limits reached`。

引用与安全点：

- 孤立的循环引用被回收；`WeakHashMap` 的 value 强引用 key 时条目留在 Map 里，不引用时被清除。
- `PhantomReference.get()` 为 `null`，目标不可达后入队，引用已被清除。
- 清理任务捕获 `this` 的 `Cleaner` 不执行，使用静态状态类的会执行。
- OOM 前所有软引用都已清除。
- 覆写 `finalize()`：Java 21 编译警告为 `[removal]`，Java 17 为 `[deprecation]`。
- 文中的 `-Xlog:gc*,safepoint:file=…:time,uptime,level,tags` 能运行，安全点日志分别给出到达安全点和停顿内的耗时。

下一批：JVM 栏目后 13 篇（Serial/Parallel/CMS、G1、低延迟收集器、分层编译、内联、逃逸分析、JMH、启动优化、JVM 诊断、CPU 使用率、线程转储、堆转储、GC 停顿分析）。
