# Claude 校验 · 第 2 批（2026-10-29）

范围：

- Java 语言主题剩余的 6 篇（Optional、泛型、注解、反射、注解处理器和栏目首页），覆盖 Java 后端路线中「类型系统与对象模型」之后的语言基础。
- 复查 3 篇校验后又修改过的文章。

校验项：

1. 技术事实与版本基线（Java 17 / 21）。
2. 代码示例的编译与运行结果：在 Eclipse Temurin 21.0.12 上实际运行了 40 项输出断言和 5 个预期的编译错误，并用一个最小注解处理器验证了多轮处理和处理器发现。除下文两处问题外，全部与文中一致。
3. 与相邻文章是否矛盾，站内锚点是否存在。
4. 参考资料能否打开到对应页面：33 个外部链接全部返回对应标题的页面，带锚点的 5 个链接锚点都存在。

## 结论

| 文章 | 结论 | 需要修改 |
| --- | --- | --- |
| [Optional](../../docs/basic-knowledge/java/language/optional-boundaries.mdx) | ✅ 通过 | — |
| [Java 泛型](../../docs/basic-knowledge/java/language/generics.mdx) | ✅ 通过 | — |
| [Java 注解](../../docs/basic-knowledge/java/language/annotations-retention-processing.mdx) | ⚠️ 待修改 | 未声明 `@Target` 时的适用位置写错 |
| [Java 反射](../../docs/basic-knowledge/java/language/reflection-method-handles.mdx) | ✅ 通过 | — |
| [Java 注解处理器](../../docs/basic-knowledge/java/language/runtime-scanning-compile-time-generation.mdx) | ⚠️ 待修改 | `FilerException` 的成因写错；可选补充两处 |
| [Java 语言（栏目首页）](../../docs/basic-knowledge/java/language/index.mdx) | ✅ 通过 | — |

复查的 3 篇都通过：

| 文章 | 审阅后的改动 | 结论 |
| --- | --- | --- |
| [RAG 评估](../../docs/ai/evaluation/rag-evaluation.mdx) | 「方案对比」拆成单独一节，后续编号顺延 | ✅ 通过 |
| [提示词工程](../../docs/ai/prompting/prompt-engineering.mdx) | 补充工具调用 `strict` 的默认行为 | ✅ 通过，已对照 OpenAI function calling 指南：Responses 省略 `strict` 时尽量规范化为严格模式，不兼容时退回非严格；Chat Completions 默认非严格 |
| [包装类型](../../docs/basic-knowledge/java/language/wrappers-boxing-cache.mdx) | 改写开头一句 | ✅ 通过 |

## 逐篇问题

### Java 注解

1. **事实错误**（第 75 行）：原文写「未声明 `@Target` 时，可用于类型参数之外的声明位置」。这是 Java 8 的规则。从 Java 14 起，JLS 9.6.4.1 改为：未声明 `@Target` 的注解适用于**所有声明上下文**，不适用于任何类型上下文。类型参数声明（`TYPE_PARAMETER`）属于声明上下文，Java 17 和 21 的 JLS 都是这样写的。

   在 JDK 21 上验证：没有 `@Target` 的注解写在 `class TypeParamUse<@NoTarget T>` 上可以编译；写在 `List<@NoTarget String>` 上报错 `annotation @NoTarget not applicable in this type context`。

   建议改为：「未声明 `@Target` 时，注解可以用在所有声明位置，包括类型参数声明，但不能用在类型使用位置；后者需要显式声明 `TYPE_USE`。」后半句「明确写出目标，编译器才能尽早拦住误用」保留。

其余内容已逐项验证：

- 重复注解：`getAnnotationsByType` 返回 2，`getAnnotation(Role.class)` 返回 `null`，`getAnnotation(Roles.class)` 非空。
- 继承：`@Inherited` 让子类查到父类的类注解，`getDeclaredAnnotation` 查不到，实现类查不到接口注解。
- 默认保留策略：省略 `@Retention` 时，注解写入 `RuntimeInvisibleAnnotations`，反射读不到。
- 元素默认值：写成 `null` 会编译失败。

### Java 注解处理器

1. **因果关系不成立**（第 105 行，以及 10.3 参考回答第 310 行）：原文写「不遵守第一条，后面的轮次会再次为同一个元素创建同名文件，`Filer` 会抛出 `FilerException`」。实际上，`RoundEnvironment.getElementsAnnotatedWith` 只返回**本轮根元素**中带注解的元素，同一个元素不会在后续轮次再被返回。

   在 JDK 21 上，用文中的处理器结构（不做任何去重）验证了三轮的根元素：

   | 轮次 | 根元素 | 带注解的元素 |
   | --- | --- | --- |
   | 第 1 轮 | `GenerateMapper`、`UserMapper` | `UserMapper` |
   | 第 2 轮 | `UserMapperGenerated` | 无 |
   | 第 3 轮 | 无（`processingOver` 为 `true`） | — |

   整个过程没有重复生成，也没有抛出 `FilerException`。

   `FilerException` 确实会在同一次编译中第二次创建同名文件时抛出。常见原因有三种：

   - 处理器把元素保存到字段里，跨轮次延后处理，却没有记录哪些已经生成过。
   - 两个处理器生成了同名类型。
   - 为不同元素生成时，命名规则撞了名。

   建议把第 105 行改为：「每一轮只返回本轮新出现的元素，同一个元素不会被再次交给处理器。但处理器如果把元素留到后面的轮次再处理，或者多个处理器、多个元素生成了同一个类名，同一次编译中第二次创建同名文件时，`Filer` 会抛出 `FilerException`。」第 98–103 行列表的第一条「能认出已经处理过的元素，不重复生成」仍然成立，可以保留。

   第 310 行的「新类型会进入后续轮次，因此要记录已生成类型，避免重复创建同名文件引发 `FilerException`」同样把原因归到新类型进入后续轮次上，按上面的说法调整。
2. **可选补充**（第 8 节，第 211 行之后）：在 JDK 21 上，处理器只是放在普通 classpath 上、被隐式发现时，`javac` 会输出一条提示，说明未来版本可能不再默认启用注解处理，并建议用 `-processor`、`--processor-path` 或 `-proc:full` 显式启用。可以补一句：Java 21 起对隐式发现给出提示，构建中最好显式配置处理器路径。这条只描述 Java 21 的行为，不涉及更新版本的变化，符合版本基线。
3. **可选补充**（第 3 节示例）：`@SupportedSourceVersion(SourceVersion.RELEASE_17)` 在 JDK 21 上编译 `-source 21` 的代码时会产生警告 `Supported source version 'RELEASE_17' ... less than -source '21'`。可以在示例下方加一句：需要同时支持 17 和 21 时，常见做法是重写 `getSupportedSourceVersion()`，返回 `SourceVersion.latestSupported()`。

其余内容已验证：

- 显式指定 `--processor-path` 和 `-processor` 能运行处理器。
- 处理器放在普通 classpath 上时会被隐式发现。
- 加上 `-proc:none` 后不生成 `UserMapperGenerated`。
- 只生成资源文件不会触发新轮次，与 `Filer` Javadoc 一致。

### 通过的文章：已验证内容

- **Optional**：
  - `map(v -> null)` 打印 `Optional.empty`，`flatMap` 返回 `null` 抛 `NullPointerException`。
  - `orElse` 的默认值在有值时仍会计算，`orElseGet` 不会。
  - `Optional.of(null)` 抛 `NullPointerException`，空容器调用 `get()` 抛 `NoSuchElementException`。
  - `flatMap(Optional::stream)` 只保留有值的元素。
- **Java 泛型**：
  - 通过原始类型调用时，桥接方法 `accept(Object)` 抛出 `ClassCastException`；`javap` 显示该方法为 bridge 和 synthetic。
  - `values instanceof ArrayList<String>` 结果为 `true`；`Object instanceof List<String>` 编译失败。
  - 变长参数反例在读取时抛 `ClassCastException`；数组协变写入抛 `ArrayStoreException`。
  - 非 `final`、非私有的实例方法上加 `@SafeVarargs` 会编译失败。
  - `List<String>` 和 `List<Integer>` 两个重载因擦除后签名相同而编译失败。
- **Java 反射**：
  - `getReturnType` / `getGenericReturnType` 的输出与文中一致。
  - 被调用方法的异常包装为 `InvocationTargetException`；参数类型不对抛 `IllegalArgumentException`。
  - `getMethods` 不含私有方法，但包含继承的公开方法。
  - `trySetAccessible` 在同一模块内返回 `true`，对 `java.base` 的私有方法返回 `false`。
  - `forName(..., false, ...)` 和 `loadClass` 都不触发初始化。
  - 句柄类型为 `(GreetingService,String)String`；接收者或返回类型声明为 `Object` 时，`invokeExact` 抛 `WrongMethodTypeException`；`invoke` 把返回值装箱为 `Integer`；方法句柄直接抛出目标异常，不做包装。
  - Java 17 用本地调用和生成的访问器实现核心反射，Java 18 起改为基于方法句柄（Java 21 已是该实现），与文中所述一致。

## 下一批

Java 集合（13 篇），按 Java 后端路线的复习顺序继续。
