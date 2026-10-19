# Claude 校验 · 第 1 批（2026-10-19）

范围：Java 后端路线中最先复习的两个「必会」主题（类型系统与对象模型、字符串、数值与异常）的 7 篇核心文章。

校验项：

1. 技术事实与版本基线（Java 17 / 21）。
2. 代码示例的编译与运行结果：用 Eclipse Temurin 21.0.12 实际运行了 30 项输出断言，全部与文中一致。
3. 与相邻文章是否矛盾。
4. 参考资料能否打开到对应页面。

结构检查已由 `check-article-format --strict` 覆盖，7 篇都没有结构问题。

## 结论

| 文章 | 结论 | 需要修改 |
| --- | --- | --- |
| [Java 值传递](../../docs/basic-knowledge/java/language/types-references-value-passing.mdx) | ✅ 通过 | — |
| [面向对象编程](../../docs/basic-knowledge/java/language/encapsulation-inheritance-polymorphism.mdx) | ⚠️ 待修改 | JLS 链接失效 ×3；术语不统一 |
| [对象相等性](../../docs/basic-knowledge/java/language/equals-hashcode-object-identity.mdx) | ⚠️ 待修改 | JLS 链接失效 ×1；「身份字段」与「对象身份」混用 |
| [String](../../docs/basic-knowledge/java/language/string-immutability-pool.mdx) | ⚠️ 待修改 | `invokedynamic` 段落放错章节 |
| [Java 异常](../../docs/basic-knowledge/java/language/exceptions-error-boundaries.mdx) | ⚠️ 待修改 | catch 顺序的表述有误；段落放错章节；漏讲 `System.exit`；JLS 链接失效 ×2 |
| [BigDecimal](../../docs/basic-knowledge/java/language/bigdecimal-money.mdx) | ⚠️ 待修改 | JLS 链接失效 ×1 |
| [包装类型](../../docs/basic-knowledge/java/language/wrappers-boxing-cache.mdx) | ⚠️ 待修改 | JLS 链接失效 ×4；缺少其他包装类的缓存范围 |

## 共性问题：JLS 链接失效

`https://docs.oracle.com/en/java/javase/21/docs/specs/jls/jls-*.html` 这一路径已失效。它会跳转到 JDK 26 文档首页，标题为「JDK 26 Documentation - Home」，HTTP 状态仍然是 200，所以链接检查发现不了。

全站共 12 处，分布在 6 个文件中；其中 11 处在本批文章里，另一处在 `annotations-retention-processing.mdx`。改为 `https://docs.oracle.com/javase/specs/jls/se21/html/jls-<章>.html#<锚点>`，章节和锚点保持不变，例如：

- `…/en/java/javase/21/docs/specs/jls/jls-15.html#jls-15.12` → `https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.12`

`specs/man`（java、javac、javap 命令）和 API 文档链接都正常，不需要修改。

## 逐篇问题

### 面向对象编程

1. **参考资料**：第 276–278 行的 3 个 JLS 链接按上面的规则替换。
2. **术语**：7.4 的标题和参考回答用了「覆写」，正文其余部分都用「重写」，统一为「重写」。

### 对象相等性

1. **参考资料**：第 211 行的 JLS 链接按规则替换。
2. **术语冲突**：第 60 行「身份字段未变化时」和第 100 行「构造后不再修改身份字段」用「身份字段」指参与相等判断的字段。第 2 节已经把「对象身份」定义为两个引用指向同一个对象，读者容易把两者混为一谈。改为「参与相等判断的字段」。第 63 行「这里的身份字段指……」的解释句随之删除或改写。

### String

1. **章节归属**：第 178 行讲 `javac` 用 `invokedynamic` 编译字符串拼接，这段属于第 5 节「字符串拼接的选择」，却放在第 6 节「字符串存储与字符计数」末尾。第 141 行还专门写了「具体的编译机制见字符串存储与字符计数」。把这段移到第 5 节第 139 行之后，删除第 141 行的跳转句。
2. **可选补充**：第 3.1 节可以加一句，把 `prefix` 声明为 `final` 后，它成为常量变量，`prefix + " 101"` 也会在编译期折叠，与 `literal` 共享对象（已在 JDK 21 上验证）。面试中常这样追问。

### Java 异常

1. **事实偏差**（第 168 行）：原文写「子类异常要放在父类异常前，否则会被前面的分支覆盖」。实际上，父类 `catch` 写在子类 `catch` 之前是**编译错误**（JLS 11.2.3）。JDK 21 的报错为 `exception IllegalArgumentException has already been caught`，受检异常和非受检异常都是如此。改为说明这是编译错误，以及编译器为什么拒绝它：后面的分支永远不会被执行。
2. **章节归属**：第 168 行讲的是多个 `catch` 的匹配顺序和多重捕获 `catch (A | B e)`，却放在第 6 节「finally 与返回值」中。把它移到第 3 节「抛出、声明与捕获」。
3. **面试要点缺失**（8.1「`finally` 一定会执行吗？」）：只写了「进程被强制终止、JVM 崩溃或机器断电」，漏了面试最常追问的情形——`try` 或 `catch` 中调用 `System.exit()`（或 `Runtime.halt()`）时，`finally` 不会执行。另外可以补上：守护线程在 JVM 退出时被直接终止，其中的 `finally` 也不会执行。
4. **参考资料**：第 298、300 行的 JLS 链接按规则替换。

### BigDecimal

1. **参考资料**：第 338 行的 JLS 链接按规则替换。

其余内容已逐项验证，包括 `new BigDecimal(0.1)` 的展开值、`MathContext` 的结果 838.1、`-1.25` 的四种舍入、`TreeSet`/`HashSet` 判重和 `stripTrailingZeros` 得到 `1E+3`，全部正确。

### 包装类型

1. **参考资料**：第 301、302、305、306 行的 4 个 JLS 链接按规则替换。
2. **面试要点缺失**：第 4 节只讲了 `Integer` 的缓存。面试常追问其他包装类，建议在第 4 节补一段：
   - `Byte`、`Short`、`Long` 的 `valueOf` 同样缓存 -128 到 127。
   - `Character` 缓存 0 到 127。
   - `Boolean` 的 `valueOf` 只返回 `TRUE`、`FALSE` 两个常量。
   - `Float` 和 `Double` 不缓存，`Double.valueOf(1.0) == Double.valueOf(1.0)` 为 `false`。
   - 只有 `Integer` 的缓存上限可以通过 `-XX:AutoBoxCacheMax` 调整。

   以上结论已在 JDK 21 上验证，`Long`、`Short`、`Character` 的同值比较为 `true`，`Double` 为 `false`。请以各类 `valueOf` 的 Javadoc 为准，并按需加入参考资料。

## 可选：全站清理

- **面试题标题下的空行**：全站 227 个文件中，共有 401 道面试题的标题下方留有 3 个空行，像是批量删除公司注释时留下的。Markdown 渲染时会合并，读者看不到，可以批量清理成一个空行。
- **题目标题的问号**：部分题目标题有问号，部分没有，例如「Java 是值传递还是引用传递」和「final 引用和数组 clone 能否隔离对象修改？」。可以统一。修改标题时保留 `{#id}` 不变。
- **dev.java 链接**：dev.java 改过路径，旧链接通过 JS 跳转到新地址，读者仍能打开。可以顺手换成新地址，例如 `/learn/exceptions/catching-handling/` 改为 `/learn/language/annotations-exceptions/exceptions/catching-handling/`。

## 复核（2026-10-19，PR #20）

6 篇文章的问题已全部修复，Claude 校验列标为 ✅：

- 全站 12 处 JLS 链接改到 `/javase/specs/jls/se21/html/`，新增的锚点 `jls-11.2.3`、`jls-4.12.4`、`jls-14.20`、`jls-15.29` 都能定位到对应章节。
- 异常篇：catch 顺序改为编译错误，并移到第 3 节；8.1 补了 `System.exit`、`Runtime.halt` 和守护线程。
- 包装类篇：补了其他包装类缓存范围的对照表，以及 `AutoBoxCacheMax` 的说明。用 JDK 21 加上 `-XX:AutoBoxCacheMax=1000` 实测：`Integer` 1000 共享对象，`Long` 1000 不共享，下限仍为 -128。
- String 篇：`invokedynamic` 段落移回第 5 节，并补了 `final` 常量变量的折叠规则。
- 对象相等性篇：「身份字段」统一改为「参与相等判断的字段」；面向对象篇统一为「重写」。
