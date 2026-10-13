# 文章格式审计：batch-5

日期：2026-10-13。分支：`content/article-format-2026-10-13`。

本批完成指定 21 篇文章。保留原有 44 道卡片，新增 23 道本站自测。只修改本批文章和本记录，未提交 git。

## 表达与标识

- 完整阅读 AGENTS.md、batch-1b.md 和两篇指定样例。
- 开头明确分工，面试核心改为直接结论。参考回答先回答问题，再解释机制。
- 普通二、三级标题改为名词性标题。面试题保留完整问句。缺失锚点已补齐，标题编号连续。
- 与修改前逐文件比较，knowledge.id 和全部已有显式锚点均保留。44 道原卡片的 ID、公司字段和来源注释均保留。
- 新卡片统一使用英文 ID 与本站自测注释。没有新增公司归属，没有删除或合并卡片。
- 已逐段检查长句、限定词和段落衔接。严格检查结果为 0 结构问题、0 文风提示。
- 技术依据以 Java SE 26 规范、API 和 OpenJDK 26 源码为主。跨版本差异在对应正文标明。

## 每篇改动与依据

### 1. Java 注解

文件：[annotations-retention-processing.mdx](../../../docs/basic-knowledge/java/language/annotations-retention-processing.mdx)。

注解定义、保留策略和读取规则分工明确。补充容器注解的反射读取示例。

新增题：`repeatable-runtime`。

依据：[Java Language Specification：Annotation Interfaces](https://docs.oracle.com/en/java/javase/26/docs/specs/jls/jls-9.html#jls-9.6)、[Java API：RetentionPolicy](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/RetentionPolicy.html)、[Java API：AnnotatedElement](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/AnnotatedElement.html)。

修正重复注解示例缺少 RUNTIME 的问题。补充 value 简写对其他元素默认值的要求。删除接口继承规则的推测性设计理由。

人工确认：无阻塞事项；Java 示例未在本机运行。

### 2. BigDecimal

文件：[bigdecimal-money.mdx](../../../docs/basic-knowledge/java/language/bigdecimal-money.mdx)。

区分精确值、有效数字和小数位。补充负数舍入、精确整数转换与集合判重。

新增题：`rounding-negative-exact`。

依据：[Java API：BigDecimal](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/math/BigDecimal.html)、[Java API：RoundingMode](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/math/RoundingMode.html)、[Java API：MathContext](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/math/MathContext.html)。

修正除法一律要求舍入的说法。运算返回结果不保证创建新对象。补充负 scale 的含义。

人工确认：无阻塞事项；Java 示例未在本机运行。

### 3. 面向对象编程（Object-Oriented Programming）

文件：[encapsulation-inheritance-polymorphism.mdx](../../../docs/basic-knowledge/java/language/encapsulation-inheritance-polymorphism.mdx)。

保留封装与接口选择。新增静态参数类型与动态分派的最小示例。补充默认方法的选择优先级。

新增题：`overload-dispatch`。

依据：[Java Language Specification：Classes](https://docs.oracle.com/en/java/javase/26/docs/specs/jls/jls-8.html)、[Java Language Specification：Interfaces](https://docs.oracle.com/en/java/javase/26/docs/specs/jls/jls-9.html)、[Java Language Specification：Method Invocation Expressions](https://docs.oracle.com/en/java/javase/26/docs/specs/jls/jls-15.html#jls-15.12)。

区分不可修改视图与防御性副本。视图只限制自身写入入口。

人工确认：无阻塞事项；Java 示例未在本机运行。

### 4. 对象相等性

文件：[equals-hashcode-object-identity.mdx](../../../docs/basic-knowledge/java/language/equals-hashcode-object-identity.mdx)。

重写可变键失效的因果链。补充数组内容比较、配套哈希和身份哈希。

新增题：`array-content-equality`。

依据：[Java API：Object](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html)、[Java API：System.identityHashCode](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/System.html#identityHashCode(java.lang.Object))、[Java API：Arrays](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Arrays.html)。

澄清引用身份与逻辑相等各有用途。移除三者语义必须相同的表述。

人工确认：无阻塞事项；Java 示例未在本机运行。

### 5. Java 异常

文件：[exceptions-error-boundaries.mdx](../../../docs/basic-knowledge/java/language/exceptions-error-boundaries.mdx)。

参考回答直接说明分类和处理边界。补充 finally 返回求值、多重 catch 和关闭失败顺序。

新增题：`finally-return`、`close-failure-order`。

依据：[Java Language Specification：Exceptions](https://docs.oracle.com/en/java/javase/26/docs/specs/jls/jls-11.html)、[Java Language Specification：try-with-resources](https://docs.oracle.com/en/java/javase/26/docs/specs/jls/jls-14.html#jls-14.20.3)。

明确 Error 也是非受检异常。其余受检异常类也包括 Throwable。替换失效的 dev.java 参考链接。

人工确认：无阻塞事项；Java 示例未在本机运行。

### 6. Java 泛型

文件：[generics.mdx](../../../docs/basic-knowledge/java/language/generics.mdx)。

补充桥接方法、可检查的参数化 instanceof。新增泛型变长参数的堆污染示例。说明 SafeVarargs 的作者声明性质。

新增题：`bridge-method`、`generic-varargs-pollution`。

依据：[Oracle：Bridge Methods](https://docs.oracle.com/javase/tutorial/java/generics/bridgeMethods.html)、[JLS：instanceof](https://docs.oracle.com/en/java/javase/26/docs/specs/jls/jls-15.html#jls-15.20.2)、[Java API：SafeVarargs](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/SafeVarargs.html)、[Oracle：Non-Reifiable Types](https://docs.oracle.com/javase/tutorial/java/generics/nonReifiableVarargsType.html)。

修正所有参数化 instanceof 都非法的表述。标明 Java 16 起的规则。补充 List<?> 可写入 null 的类型边界。

人工确认：无阻塞事项；Java 示例未在本机运行。

### 7. Optional

文件：[optional-boundaries.mdx](../../../docs/basic-knowledge/java/language/optional-boundaries.mdx)。

按返回值语义整理 API。补充 map 与 flatMap 的 null 差异。说明 Java 9 的 Optional.stream。

新增题：`optional-null-mapping`。

依据：[Java API：Optional](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html)、[Java API：Supplier](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Supplier.html)。

将“值类”改为“基于值的类”。避免与语言层面的值类型混淆。

人工确认：无阻塞事项；Java 示例未在本机运行。

### 8. Java 反射

文件：[reflection-method-handles.mdx](../../../docs/basic-knowledge/java/language/reflection-method-handles.mdx)。

区分成员发现、权限检查和调用。补充返回类型参与 invokeExact 检查的示例。说明句柄权限和异常传播。

新增题：`method-handle-exact-type`。

依据：[Java API：MethodHandle](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/invoke/MethodHandle.html)、[Java API：MethodHandles.Lookup](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/invoke/MethodHandles.Lookup.html)、[JEP 416：Reimplement Core Reflection with Method Handles](https://openjdk.org/jeps/416)。

invoke 的适配规则改为 asType。删除 MethodHandle 必然更易优化的绝对表述。

人工确认：无阻塞事项；Java 示例未在本机运行。

### 9. Java 注解处理器

文件：[runtime-scanning-compile-time-generation.mdx](../../../docs/basic-knowledge/java/language/runtime-scanning-compile-time-generation.mdx)。

补充处理器发现、注解认领和重复生成。示例增加结束轮次与空标记检查。注明 JDK 23 的显式处理配置。

新增题：`processor-discovery-rounds`。

依据：[Java API：Processor](https://docs.oracle.com/en/java/javase/26/docs/api/java.compiler/javax/annotation/processing/Processor.html)、[Java API：Filer](https://docs.oracle.com/en/java/javase/26/docs/api/java.compiler/javax/annotation/processing/Filer.html)、[javac：Annotation Processing Options](https://docs.oracle.com/en/java/javase/26/docs/specs/man/javac.html#annotation-processing)、[Oracle JDK 23 Release Notes：Annotation Processing](https://www.oracle.com/java/technologies/javase/23-relnote-issues.html)。

区分新类型与普通资源对轮次的影响。process 返回值表达认领，而非编译成功。

人工确认：无阻塞事项；Java 示例未在本机运行。

### 10. String

文件：[string-immutability-pool.mdx](../../../docs/basic-knowledge/java/language/string-immutability-pool.mdx)。

补充 Compact Strings、UTF-16 码点计数和 JDK 9 拼接机制。字符串传参引用相邻文章。

新增题：`string-unicode-length`。

依据：[Java API：String](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html)、[JEP 254：Compact Strings](https://openjdk.org/jeps/254)、[JEP 280：Indify String Concatenation](https://openjdk.org/jeps/280)。

修正 String 操作一律创建新字符串的说法。明确内容未变化时可以复用原对象。

人工确认：无阻塞事项；Java 示例未在本机运行。

### 11. Java 值传递

文件：[types-references-value-passing.mdx](../../../docs/basic-knowledge/java/language/types-references-value-passing.mdx)。

保留 rename、replace 与数组传参示例。新增 final 引用和引用数组浅拷贝。

新增题：`final-reference-copy`。

依据：[Java Language Specification：Types, Values, and Variables](https://docs.oracle.com/en/java/javase/26/docs/specs/jls/jls-4.html)、[Java Language Specification：Run-Time Evaluation of Method Invocation](https://docs.oracle.com/javase/specs/jls/se26/html/jls-15.html#jls-15.12.4)、[JLS：Arrays](https://docs.oracle.com/en/java/javase/26/docs/specs/jls/jls-10.html#jls-10.7)。

修正字符串操作必然创建对象的泛化表述。机制细节交由 String 文章说明。

人工确认：无阻塞事项；Java 示例未在本机运行。

### 12. 包装类型

文件：[wrappers-boxing-cache.mdx](../../../docs/basic-knowledge/java/language/wrappers-boxing-cache.mdx)。

补充三元表达式隐式拆箱。说明基本类型拓宽优先于装箱重载匹配。

新增题：`boxing-conditional-overload`。

依据：[Java Language Specification：Boxing Conversion](https://docs.oracle.com/en/java/javase/26/docs/specs/jls/jls-5.html#jls-5.1.7)、[Java API：Integer](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html)、[JLS：Conditional Operator](https://docs.oracle.com/en/java/javase/26/docs/specs/jls/jls-15.html#jls-15.25)、[JLS：Method Invocation](https://docs.oracle.com/en/java/javase/26/docs/specs/jls/jls-15.html#jls-15.12.2)。

把缓存保证范围内的结果改为确定的 true。区分常量装箱、valueOf 与显式构造。

人工确认：无阻塞事项；Java 示例未在本机运行。

### 13. Java NIO

文件：[buffer-channel-selector.mdx](../../../docs/basic-knowledge/java/io/buffer-channel-selector.mdx)。

补充视图共享、独立位置和 rewind。明确读取量、EOF、背压和取消清理。

新增题：`buffer-views`。

依据：[Java API：Buffer](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/Buffer.html)、[Java API：ByteBuffer](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/ByteBuffer.html)、[Java API：SelectionKey](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/SelectionKey.html)、[Java API：SocketChannel](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/SocketChannel.html)。

就绪事件也可对应 EOF、关闭或错误。回调之间重新检查键有效性。文件读取示例消费完成后 clear，避免残留状态空转。

人工确认：无阻塞事项；Java 示例未在本机运行。

### 14. Java 流式 I/O

文件：[byte-character-buffered-streams.mdx](../../../docs/basic-knowledge/java/io/byte-character-buffered-streams.mdx)。

补充 UTF-8 跨块解码与 REPORT。说明 readFully 和 JDK 18 默认字符集。字符计数引用 String。

新增题：`incremental-decoding`。

依据：[Java API：InputStreamReader](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/InputStreamReader.html)、[Java API：CharsetDecoder](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/charset/CharsetDecoder.html)、[Java API：DataInputStream](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataInputStream.html)、[JEP 400：UTF-8 by Default](https://openjdk.org/jeps/400)。

区分字符流抽象与字节字符转换层。用具体 BufferedWriter 说明关闭时刷新。

人工确认：无阻塞事项；Java 示例未在本机运行。

### 15. 零拷贝

文件：[file-mapping-zero-copy-direct-memory.mdx](../../../docs/basic-knowledge/java/io/file-mapping-zero-copy-direct-memory.mdx)。

区分传输、映射和直接缓冲的成本。补充映射大小、通道关闭与 Arena 生命周期。

新增题：`mapping-lifetime`。

依据：[Java API：FileChannel](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/FileChannel.html)、[Java API：Arena](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/Arena.html)、[OpenJDK 26：Bits](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/java.base/share/classes/java/nio/Bits.java)、[OpenJDK 26：FileChannelImpl](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/java.base/share/classes/sun/nio/ch/FileChannelImpl.java)、[OpenJDK 26：IOUtil](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/java.base/share/classes/sun/nio/ch/IOUtil.java)。

零进展改为显式失败，避免静默截断发送。传统映射示例限制到文件开头 1 MiB。MaxDirectMemorySize 不再泛指全部堆外内存。

人工确认：无阻塞事项；Java 示例未在本机运行。

### 16. Java 序列化

文件：[java-serialization-compatibility-security.mdx](../../../docs/basic-knowledge/java/io/java-serialization-compatibility-security.mdx)。

补充句柄复用与 reset 快照。区分普通类、Externalizable、record 和枚举。收紧过滤允许列表。

新增题：`serialization-handles`。

依据：[Java API：ObjectInputStream](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/ObjectInputStream.html)、[Java API：ObjectInputFilter](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/ObjectInputFilter.html)、[Serialization：ObjectOutputStream](https://docs.oracle.com/en/java/javase/26/docs/specs/serialization/output.html)、[Serialization：Records and Enums](https://docs.oracle.com/en/java/javase/26/docs/specs/serialization/serial-arch.html)。

修正全部反序列化都跳过自身构造器的表述。补充 record 的 UID 豁免。移除示例对整个 java.base 模块的放行。说明 maxbytes 只在回调时检查。

人工确认：无阻塞事项；Java 示例未在本机运行。

### 17. Collector

文件：[collectors-grouping-reduction.mdx](../../../docs/basic-knowledge/java/functional/collectors-grouping-reduction.mdx)。

补充单位元、并发收集条件和列表结果契约。列明 null、可修改性与相关版本。

新增题：`collector-identity-concurrency`。

依据：[Java API：Collector](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collector.html)、[Java API：Collectors](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html)、[Java API：Stream.reduce](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#reduce(T,java.util.function.BinaryOperator))、[OpenJDK 26：Collectors](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/java.base/share/classes/java/util/stream/Collectors.java)。

修正 toMap 空值完全由 Map 决定的说法。补充分组 null 键限制。明确并行有序流的组内顺序。groupingByConcurrent 确定返回 ConcurrentMap。

人工确认：无阻塞事项；Java 示例未在本机运行。

### 18. java.time

文件：[java-time-time-zone-boundaries.mdx](../../../docs/basic-knowledge/java/functional/java-time-time-zone-boundaries.mdx)。

补充巴黎 2026 年间隙与重叠示例。说明日历一天、24 小时和月末调整。补充 YYYY 的周年份含义。

新增题：`dst-resolution-arithmetic`。

依据：[Java API：ZonedDateTime](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html)、[Java API：DateTimeFormatter](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/format/DateTimeFormatter.html)、[Java API：LocalDate](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDate.html)、[Java API：SimpleDateFormat](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/text/SimpleDateFormat.html)。

明确 atZone 的默认解析规则。withZoneSameLocal 只尽量保留本地字段。遇到间隙仍会调整。已计算 UTC 瞬间仍表示固定时点。

人工确认：无阻塞事项；Java 示例未在本机运行。

### 19. Lambda 表达式

文件：[lambda-functional-interfaces-capture.mdx](../../../docs/basic-knowledge/java/functional/lambda-functional-interfaces-capture.mdx)。

补充绑定方法引用与 Lambda 的求值时机。说明同签名继承方法的契约归并。异常传播引用异常文章。

新增题：`method-reference-capture`。

依据：[Java Language Specification：Lambda Expressions](https://docs.oracle.com/en/java/javase/26/docs/specs/jls/jls-15.html#jls-15.27)、[Java Language Specification：Functional Interfaces](https://docs.oracle.com/en/java/javase/26/docs/specs/jls/jls-9.html#jls-9.8)、[Java API：LambdaMetafactory](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/invoke/LambdaMetafactory.html)、[JLS：Method Reference Expressions](https://docs.oracle.com/en/java/javase/26/docs/specs/jls/jls-15.html#jls-15.13)。

修正函数式接口只能有一条抽象声明的过度简化。补充非 sealed 条件。避免将 Lambda 等同于固定匿名类实现。

人工确认：无阻塞事项；Java 示例未在本机运行。

### 20. 并行流

文件：[parallel-stream-model-pitfalls.mdx](../../../docs/basic-knowledge/java/functional/parallel-stream-model-pitfalls.mdx)。

补充整条流水线的最终模式。区分计算顺序、结果顺序与终端动作顺序。归约机制引用 Collector。

新增题：`parallel-mode-order`。

依据：[Java API：Stream 的并行执行说明](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/package-summary.html#parallelism)、[Java API：ForkJoinPool](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ForkJoinPool.html)、[Java API：BaseStream.parallel](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/BaseStream.html#parallel())、[OpenJDK 26：ForkJoinTask](https://github.com/openjdk/jdk/blob/jdk-26-ga/src/java.base/share/classes/java/util/concurrent/ForkJoinTask.java)。

将公共池说法限定为 OpenJDK 26 的实现语境。补充调用线程与所在 ForkJoinPool。修正同步列表说明与 toList 示例衔接。

人工确认：无阻塞事项；Java 示例未在本机运行。

### 21. Stream

文件：[stream-pipeline-lazy-evaluation.mdx](../../../docs/basic-knowledge/java/functional/stream-pipeline-lazy-evaluation.mdx)。

补充空流匹配、count 跳过 peek 和无限流排序边界。Map 卡片保留，详细实现引用 Collector。

新增题：`stream-empty-infinite`。

依据：[Java API：Stream](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html)、[Java API：java.util.stream](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/package-summary.html)、[Java API：Files.lines](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#lines(java.nio.file.Path,java.nio.charset.Charset))。

终止操作改为触发求值，避免暗示必然遍历。姓名对应多人时使用 groupingBy。移除将 toMap 合并与列表聚合混为一谈的说法。

人工确认：无阻塞事项；Java 示例未在本机运行。

## 相邻文章分工

- 注解、处理器和反射分别负责元数据、编译生成和运行时调用。
- 值传递、相等性、String 和包装类型通过链接引用共享机制。
- 流式 I/O、NIO 和零拷贝分别负责编码、就绪模型和数据复制路径。
- Stream 负责执行链，Collector 负责归约，并行流负责调度与资源边界。
- 所有去重和引用调整都在本批 21 篇内完成。

## 技术核验与限制

- 已读取官方规范、API、JEP 和源码。重点核对保留策略、泛型检查、句柄类型、轮次、映射和序列化。
- 核对 OpenJDK 26 的 Bits、FileChannelImpl、IOUtil、Collectors 和 ForkJoinTask。实现结论按版本限定。
- 参考资料访问检查发现一条旧 dev.java 链接返回 404。已替换为当前异常处理页面。
- 本机 `java -version` 返回 `Bad CPU type in executable`。当前 Java 可执行文件与运行环境架构不匹配。
- Docker 已有镜像中没有 JDK 镜像。本批没有新拉镜像，也没有创建实验容器。
- 代码结果依据规范和源码推导；没有标记为本地实测。未做 JMH、I/O 性能测试或多版本 Java 集成测试。

## 验证

要求的检查均通过：

```sh
node scripts/check-article-format.mjs --style-strict -- \
  docs/basic-knowledge/java/language/annotations-retention-processing.mdx \
  docs/basic-knowledge/java/language/bigdecimal-money.mdx \
  docs/basic-knowledge/java/language/encapsulation-inheritance-polymorphism.mdx \
  docs/basic-knowledge/java/language/equals-hashcode-object-identity.mdx \
  docs/basic-knowledge/java/language/exceptions-error-boundaries.mdx \
  docs/basic-knowledge/java/language/generics.mdx \
  docs/basic-knowledge/java/language/optional-boundaries.mdx \
  docs/basic-knowledge/java/language/reflection-method-handles.mdx \
  docs/basic-knowledge/java/language/runtime-scanning-compile-time-generation.mdx \
  docs/basic-knowledge/java/language/string-immutability-pool.mdx \
  docs/basic-knowledge/java/language/types-references-value-passing.mdx \
  docs/basic-knowledge/java/language/wrappers-boxing-cache.mdx \
  docs/basic-knowledge/java/io/buffer-channel-selector.mdx \
  docs/basic-knowledge/java/io/byte-character-buffered-streams.mdx \
  docs/basic-knowledge/java/io/file-mapping-zero-copy-direct-memory.mdx \
  docs/basic-knowledge/java/io/java-serialization-compatibility-security.mdx \
  docs/basic-knowledge/java/functional/collectors-grouping-reduction.mdx \
  docs/basic-knowledge/java/functional/java-time-time-zone-boundaries.mdx \
  docs/basic-knowledge/java/functional/lambda-functional-interfaces-capture.mdx \
  docs/basic-knowledge/java/functional/parallel-stream-model-pitfalls.mdx \
  docs/basic-knowledge/java/functional/stream-pipeline-lazy-evaluation.mdx
npm run build
git diff --check
```

- 严格格式检查：21 篇，0 篇结构问题，0 篇文风提示。
- 构建：内部链接、复习资源、岗位和面经数据检查通过。Docusaurus 静态文件生成成功。
- 标识检查：全部 knowledge.id、已有显式锚点和原卡片均保留。卡片总数从 44 道增至 67 道。
- 全站检查仍报告本批外 6 篇结构问题、163 篇文风提示。它们不阻断构建，未扩大范围修改。
- 构建保留已有博客作者、摘要、Node localStorage 和更新检查提示。

## 未完成与人工确认

无阻塞事项。Java 执行环境限制已单独记录。后续需运行示例或做性能比较时，应使用目标版本的可运行 JDK。
