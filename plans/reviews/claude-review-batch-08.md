# Claude 校验 · 第 8 批（2026-10-29）

范围：Java 栏目首页，以及函数式编程（6 篇，含栏目首页）和 I/O（5 篇，含栏目首页）两个栏目。校验后直接修改，Lin 的审阅异步进行。

校验项：

1. 技术事实与版本基线（Java 17 / 21，实现细节以 OpenJDK 21 为准）。
2. 代码示例与实现细节：在 Eclipse Temurin 21.0.12 上运行了 90 多项断言，默认字符集另在 Temurin 17.0.20.1 上对照。
3. 与相邻文章是否矛盾，站内锚点是否存在：107 个站内链接都存在；Java 首页的 `/java-interview-roadmap/` 在构建产物里存在。
4. 参考资料：58 个外部链接都返回对应页面（其中 1 个首次请求超时，重试正常）。

## 结论

12 篇全部通过，没有修改。

| 文章 | 结论 |
| --- | --- |
| [Java（栏目首页）](../../docs/basic-knowledge/java/index.mdx) | ✅ 通过 |
| [Java 函数式编程（栏目首页）](../../docs/basic-knowledge/java/functional/index.mdx) | ✅ 通过 |
| [Lambda 表达式](../../docs/basic-knowledge/java/functional/lambda-functional-interfaces-capture.mdx) | ✅ 通过 |
| [Stream](../../docs/basic-knowledge/java/functional/stream-pipeline-lazy-evaluation.mdx) | ✅ 通过 |
| [Collector](../../docs/basic-knowledge/java/functional/collectors-grouping-reduction.mdx) | ✅ 通过 |
| [并行流](../../docs/basic-knowledge/java/functional/parallel-stream-model-pitfalls.mdx) | ✅ 通过 |
| [java.time](../../docs/basic-knowledge/java/functional/java-time-time-zone-boundaries.mdx) | ✅ 通过 |
| [Java I/O（栏目首页）](../../docs/basic-knowledge/java/io/index.mdx) | ✅ 通过 |
| [Java 流式 I/O](../../docs/basic-knowledge/java/io/byte-character-buffered-streams.mdx) | ✅ 通过 |
| [Java NIO](../../docs/basic-knowledge/java/io/buffer-channel-selector.mdx) | ✅ 通过 |
| [零拷贝](../../docs/basic-knowledge/java/io/file-mapping-zero-copy-direct-memory.mdx) | ✅ 通过 |
| [Java 序列化](../../docs/basic-knowledge/java/io/java-serialization-compatibility-security.mdx) | ✅ 通过 |

## 已验证的断言

Lambda：

- 匿名类的 `getClass().getSimpleName()` 为空字符串。
- `Consumer<String> add = names::add;` 之后再给 `names` 赋值仍能编译，`add` 写入的是创建时的列表。
- 接收者为 `null` 时，`text::length` 在创建时抛 `NullPointerException`，`() -> text.length()` 创建成功；接收者字段换成新对象后，绑定方法引用调用旧对象，Lambda 调用新对象。
- `Predicate.and` 在第一个条件为 `false` 时不执行第二个。

Stream：

- `Stream.of(1, 2, 3).peek(...).count()` 返回 3，`peek` 一次都没有执行。
- 空流：`allMatch` 为 `true`，`anyMatch` 为 `false`，`noneMatch` 为 `true`。
- `Stream.iterate(1, v -> v * 2).limit(10)` 得到 1 到 512；无限流先 `sorted()` 再 `limit(10)`，3 秒内不结束；先 `limit` 再排序正常返回。
- 两个内容相同的 `int[]` 经过 `distinct()` 仍是 2 个元素。
- 已消费的流再调用 `toList()`，抛 `IllegalStateException: stream has already been operated upon or closed`。
- `Stream.toList()` 不可修改、允许 `null`；`toUnmodifiableList()` 遇到 `null` 抛 `NullPointerException`。

Collector：

- 两参数 `toMap` 遇到重复键抛 `IllegalStateException: Duplicate key a …`；值为 `null` 时抛 `NullPointerException`；`groupingBy` 分类键为 `null` 时抛 `element cannot be mapped to a null key`。
- 四参数 `toMap` 配合 `LinkedHashMap` 与「保留右值」：键按首次出现排序，值为后出现的元素。
- `filtering` 会保留没有元素通过的分组（`{0=[], 1=[3]}`）；`partitioningBy` 在一类为空时仍保留空列表。
- 减法归约串行结果为 -15；用 1 作为求和初值，1 到 8 串行得 37，并行得 44。
- 并行 `reduce` 共享一个 `ArrayList` 作为初值：64 个元素时 20 次中有 14 次结果长度错误；1000 个元素时合并阶段 `addAll` 把列表反复叠加，直至 `OutOfMemoryError`。

并行流：

- `parallel()` 之后再 `sequential()`，`map` 只在 `main` 线程执行。
- 8 核容器里公共池并行度为 7。
- 在自建 `ForkJoinPool(3)` 中 `submit` 并行流，`map` 只在 `ForkJoinPool-1-worker-*` 线程执行。
- 并行流 `toList()` 仍按遇到顺序返回。

java.time（`Europe/Paris`，2026 年）：

- 3 月 29 日 02:30 解析为 `03:30+02:00`；10 月 25 日 02:30 默认 `+02:00`，`withLaterOffsetAtOverlap()` 为 `+01:00`。
- `getValidOffsets`：间隙返回空列表，重叠返回两个偏移。
- 跨 3 月切换日，`plusDays(1)` 实际经过 23 小时，`plus(Duration.ofHours(24))` 得到 13:00；跨 10 月切换日经过 25 小时。
- `LocalDate.of(2026, 1, 31).plusMonths(1)` 为 2 月 28 日。
- STRICT 模式下 `uuuu-MM-dd` 拒绝 2 月 30 日；`yyyy-MM-dd` 连合法日期也解析失败（缺少纪元）；`YYYY` 把 2026-12-28 格式化为 2027。
- `2026-08-30T09:30:00+08:00` 对应 `01:30Z`；带纳秒的 `Instant` 经 epoch 毫秒往返后不再相等。

I/O：

- 「欢」的 UTF-8 编码为 `E6 AC A2`；只用前两个字节构造字符串得到 U+FFFD；分块读取时 `InputStreamReader` 仍能还原。
- 新建的 `CharsetDecoder` 默认 `REPORT`；`REPORT` 下读到损坏输入抛 `MalformedInputException`，它是 `IOException` 的子类。
- 非 gzip 数据传给 `GZIPInputStream` 构造器，抛 `ZipException: Not in GZIP format`。
- 默认字符集：Java 21 在 `LANG=C` 下仍为 UTF-8，加 `-Dfile.encoding=COMPAT` 后为 US-ASCII；Java 17 在 `LANG=C` 下为 US-ASCII，`C.UTF-8` 下为 UTF-8。
- `readLine()` 把 `\r`、`\r\n`、`\n` 都当作行终止符；`read()` 读到 `0xFF` 返回 255。

NIO 与零拷贝：

- 写入 4 字节后 `flip()` 读出 `Java`；不 `flip()` 则读出 1020 个零字节。
- `slice()` 示例：`source.get(1)` 为 99，`source.position()` 为 1，`view.position()` 为 0。
- `compact()` 后剩余数据移到开头、`position` 为剩余长度；`clear()` 不擦除旧字节；`flip()` 丢弃标记。
- 关闭 `FileChannel` 后映射仍可读；BufferPool 里 `mapped` 和 `direct` 分开统计；映射超过 `Integer.MAX_VALUE` 字节抛 `IllegalArgumentException`。
- `FileChannel` 不是 `SelectableChannel`；新建的 `SocketChannel` 默认阻塞。

序列化：

- 恢复 `Item extends NonSer implements Serializable` 时，只执行 `NonSer()`，不执行 `Item()`；字段初始化 `count = 10` 不执行，`count` 取流中的 5；`transient int retries = 3` 恢复为 0。
- record 反序列化时执行规范构造器；record 和枚举的 `serialVersionUID` 都是 0。
- 同一输出流两次写入同一列表，读到同一个只含 `A` 的对象；`reset()` 后第三次读到新的 `[A, B]`。
- 写出不可序列化对象抛 `NotSerializableException`；过滤器 `java.util.ArrayList;!*` 拒绝其中的 `Integer` 元素，报 `filter status: REJECTED`。

下一批：Java 栏目其余部分（数据访问、代码质量、算法，各 6 篇）。
