# 批次 v2：Java 版本回调

本批仅回调指定 30 篇文章的版本内容。基线为 Java 17、21。未切换分支，未提交 Git。

## 逐篇变更

下表路径均位于 `docs/basic-knowledge/java/`。

| 文章 | 修改前 → 修改后 |
| --- | --- |
| [functional/parallel-stream-model-pitfalls.mdx](../../../docs/basic-knowledge/java/functional/parallel-stream-model-pitfalls.mdx) | OpenJDK 26 公共池说明 → OpenJDK 21。API 与 ForkJoinTask 源码引用由 26 → 21。 |
| [io/byte-character-buffered-streams.mdx](../../../docs/basic-knowledge/java/io/byte-character-buffered-streams.mdx) | JDK 18 起默认 UTF-8 → 明确 Java 17 依赖环境，Java 21 默认 UTF-8。API 26 → 21；字符集 JEP 引用 → 17/21 Charset API。 |
| [io/file-mapping-zero-copy-direct-memory.mdx](../../../docs/basic-knowledge/java/io/file-mapping-zero-copy-direct-memory.mdx) | Java 22 Arena 映射 → Java 17/21 MappedByteBuffer 与分段映射。删除 Arena 示例与引用。API、Bits、FileChannelImpl、IOUtil 26 → 21。 |
| [io/java-serialization-compatibility-security.mdx](../../../docs/basic-knowledge/java/io/java-serialization-compatibility-security.mdx) | 序列化规范、API、过滤指南 26 → 21。删除过滤机制的 JEP 引用；正文规则适用于目标版本。 |
| [jvm/aot-cds-native-image.mdx](../../../docs/basic-knowledge/java/jvm/aot-cds-native-image.mdx) | JDK 24—26 AOT Cache → Java 17/21 CDS 归档兼容性与 JIT。删除新缓存命令和 JEP。GraalVM latest → jdk21；反射配置由 reflection/type → 数组/name。 |
| [jvm/classloaders-spi-isolation.mdx](../../../docs/basic-knowledge/java/jvm/classloaders-spi-isolation.mdx) | API、类卸载规范 26 → 21。隐藏类 JEP 引用 → Java 21 Lookup API。 |
| [jvm/compressed-pointers-alignment.mdx](../../../docs/basic-knowledge/java/jvm/compressed-pointers-alignment.mdx) | JDK 25—27 紧凑头与类指针变化 → Java 17/21 对象头布局。普通头按类指针压缩状态为 12/16 字节。参考资料 25/26 → 21；删除新版发布说明。 |
| [jvm/diagnostic-tools-evidence.mdx](../../../docs/basic-knowledge/java/jvm/diagnostic-tools-evidence.mdx) | JDK 26 堆转储行为与命令影响 → JDK 21。诊断命令与工具文档 26 → 21。 |
| [jvm/direct-native-memory.mdx](../../../docs/basic-knowledge/java/jvm/direct-native-memory.mdx) | JDK 22 FFM/Arena → Java 17/21 直接缓冲区生命周期。映射示例改用 MappedByteBuffer。直接内存限制与重试 26 → 21。删除 FFM API 引用。 |
| [jvm/escape-analysis-scalar-replacement.mdx](../../../docs/basic-knowledge/java/jvm/escape-analysis-scalar-replacement.mdx) | C2 流不敏感分析与标量替换基线 26 → 21。官方性能指南 26 → 21。 |
| [jvm/g1-regions-rset-collection-set.mdx](../../../docs/basic-knowledge/java/jvm/g1-regions-rset-collection-set.mdx) | G1 Humongous 阈值与自适应 IHOP 基线 26 → 21。GC 指南与判定源码 26 → 21；阈值仍为严格大于半个 Region。 |
| [jvm/gc-logs-jfr-pauses.mdx](../../../docs/basic-knowledge/java/jvm/gc-logs-jfr-pauses.mdx) | GC、JFR、统一日志文档与事件源码 26 → 21。正文机制保持不变。 |
| [jvm/gc-roots-reachability.mdx](../../../docs/basic-knowledge/java/jvm/gc-roots-reachability.mdx) | JDK 18/JEP 的 finalization 表述 → Java 17 已弃用，Java 21 待移除。引用改为 17/21 Object API，其余 API 与规范 26 → 21。 |
| [jvm/generational-barriers-safepoints.mdx](../../../docs/basic-knowledge/java/jvm/generational-barriers-safepoints.mdx) | GC 指南、安全点和 G1 屏障源码 26 → 21。handshake JEP 引用 → OpenJDK 21 handshake 源码。 |
| [jvm/heap-dumps-memory-leaks.mdx](../../../docs/basic-knowledge/java/jvm/heap-dumps-memory-leaks.mdx) | GC.heap_dump 与 -all 的基线 26 → 21。内存诊断指南和 jcmd 文档 26 → 21。 |
| [jvm/inlining-deoptimization.mdx](../../../docs/basic-knowledge/java/jvm/inlining-deoptimization.mdx) | java 命令、去优化和 C2 内联源码 26 → 21。正文机制保持不变。 |
| [jvm/interpreter-tiered-compilation.mdx](../../../docs/basic-knowledge/java/jvm/interpreter-tiered-compilation.mdx) | C1/C2 层级基线 26 → 21。编译策略、Code Cache 源码与命令文档 26 → 21。 |
| [jvm/object-creation-layout.mdx](../../../docs/basic-knowledge/java/jvm/object-creation-layout.mdx) | Java 25 构造器前置语句 → Java 17/21 首条构造器调用规则。紧凑对象头 → 标记字与类指针。规范和分配源码 26 → 21；替换紧凑头资料。 |
| [jvm/oom-stack-overflow.mdx](../../../docs/basic-knowledge/java/jvm/oom-stack-overflow.mdx) | JDK 8 Parallel 98%/2% 示例 → Java 17/21 Parallel。内存诊断与 OOM 源码 26 → 21。Parallel 引用改为 21 的有效页面。 |
| [jvm/parent-delegation.mdx](../../../docs/basic-knowledge/java/jvm/parent-delegation.mdx) | defineClass 包保护基线 26 → 21。ClassLoader API、实现与 JVM 规范 26 → 21。 |
| [jvm/runtime-data-areas.mdx](../../../docs/basic-knowledge/java/jvm/runtime-data-areas.mdx) | 运行时区域规范与 Class 镜像源码 26 → 21。永久代 JEP 引用 → Java 21 元空间资料。保留常考的 JDK 8 永久代差异。 |
| [jvm/serial-parallel-cms.mdx](../../../docs/basic-knowledge/java/jvm/serial-parallel-cms.mdx) | 收集器与 Parallel 指南 26 → 21，修正 Parallel 页面路径。删除 CMS 移除的 JEP 引用。保留 JDK 8 CMS 面试机制及退出版本说明。 |
| [jvm/source-to-bytecode.mdx](../../../docs/basic-knowledge/java/jvm/source-to-bytecode.mdx) | JVMS、javac、javap 26 → 21。字符串拼接 JEP 引用 → Java 21 StringConcatFactory。保留 --release 8 的跨版本兼容考点。 |
| [jvm/thread-dumps-deadlocks-contention.mdx](../../../docs/basic-knowledge/java/jvm/thread-dumps-deadlocks-contention.mdx) | 线程诊断基线 26 → 21。Java 24 解除 pinning → Java 21 synchronized 内阻塞仍会 pinning。按 21 写转储覆盖范围；移除新版 JEP。 |
| [jvm/zgc-shenandoah-low-latency.mdx](../../../docs/basic-knowledge/java/jvm/zgc-shenandoah-low-latency.mdx) | JDK 23/24 分代默认与移除说明 → Java 17 非分代、21 显式启用分代。Shenandoah 新版分代参数 → 17/21 非分代 satb。新版 JEP 与指南 → OpenJDK 21 固定源码。 |
| [language/reflection-method-handles.mdx](../../../docs/basic-knowledge/java/language/reflection-method-handles.mdx) | JDK 18 起方法句柄实现 → 分别说明 Java 17 与 21 实现。API 26 → 21；反射 JEP 引用 → OpenJDK 17/21 ReflectionFactory。 |
| [language/runtime-scanning-compile-time-generation.mdx](../../../docs/basic-knowledge/java/language/runtime-scanning-compile-time-generation.mdx) | JDK 23 显式启用规则 → Java 17/21 默认搜索规则。RELEASE_26 → RELEASE_17。API、javac 文档 26 → 21；删除 23 发布说明。 |
| [language/string-immutability-pool.mdx](../../../docs/basic-knowledge/java/language/string-immutability-pool.mdx) | String API 与语言规范 26 → 21。Compact Strings、拼接 JEP 引用 → OpenJDK 21 String 与 StringConcatFactory。 |
| [quality/api-design-from-invariants.mdx](../../../docs/basic-knowledge/java/quality/api-design-from-invariants.mdx) | 语言与 API 示例基线 Java 26 → Java 17/21。Objects、record、Optional、List 和 JLS 引用 26 → 21。 |
| [quality/immutable-objects-defensive-copying.mdx](../../../docs/basic-knowledge/java/quality/immutable-objects-defensive-copying.mdx) | 语言与 API 基线 Java 26 → Java 17/21。final、record、List 与 JLS 引用 26 → 21。 |

## 题目与参考回答

仅 `processor-discovery-rounds` 改写题目。其余条目只调整参考回答或考察重点。

| 文章与卡片 ID | 修改说明 |
| --- | --- |
| `file-mapping-zero-copy-direct-memory` / `mapping-lifetime` | 保留题目。Arena 释放回答 → MappedByteBuffer、分段映射与 GC 释放。 |
| `aot-cds-native-image` / `jit-vs-aot` | 保留题目。AOT Cache 回答 → CDS 类信息归档、JIT 与 Native Image。 |
| `compressed-pointers-alignment` / `oop-klass-independence` | 保留题目。删除 JDK 27 始终压缩类指针的回答。 |
| `direct-native-memory` / `direct-limit-scope` | 保留题目。默认上限按 JDK 21；删除 FFM 预算项。 |
| `escape-analysis-scalar-replacement` / `conditional-escape` | 保留题目。C2 分支合并结论由 JDK 26 → 21。 |
| `heap-dumps-memory-leaks` / `heap-dump-all` | 保留题目。-all 行为基线由 JDK 26 → 21。 |
| `object-creation-layout` / `object-creation` | 保留题目。Java 25 前置语句 → 17/21 父类构造与子类初始化顺序。 |
| `object-creation-layout` / `constructor-virtual-dispatch` | 保留题目。删除 Java 25 提前赋值说明。 |
| `thread-dumps-deadlocks-contention` / `virtual-thread-dump` | 保留题目。按 Java 21 说明 Thread.print 的覆盖边界。 |
| `reflection-method-handles` / `reflection-cost` | 保留题目。JDK 18 起的笼统描述 → Java 17/21 实现差异。 |
| `runtime-scanning-compile-time-generation` / `processor-discovery-rounds` | 等价考点改写。新题目为“Java 17、21 如何发现处理器，process 返回值表示什么？”。回答改为默认搜索、显式指定与认领语义。 |

全部 96 张卡片保留。所有 knowledge.id、卡片 ID 和显式锚点保持不变。

## 资料核验

Java API 与规范改为目标版本文档。实现细节引用固定的 OpenJDK 21 源码。反射实现差异同时引用 OpenJDK 17。

Parallel 的旧路径会跳转至新版主页，已改为 21 的有效路径。Oracle 21 的 ZGC 页面混入新版模式说明。该篇改引 OpenJDK 21 的参数默认值和屏障源码。

## 验证

- 严格格式检查：本批 30 篇，结构问题 0，文风提示 0。
- `npm run build`：通过。
- ID 与卡片数量对照：通过。
- `git diff --check`：通过。

构建存在已有的博客作者与截断标记警告。缓存和更新检查受本地权限限制，未影响构建成功。
