# Claude 校验 · 第 10 批（2026-10-29）

范围：Java 算法栏目 6 篇（含栏目首页）。校验后直接修改，Lin 的审阅异步进行。

校验项：

1. 技术事实与复杂度推导。
2. 代码示例：文中所有可运行的 Java 片段，以及按文字描述实现的最小覆盖子串、窗口最大值、编辑距离、LCS、背包，都在 Eclipse Temurin 21.0.12 上运行，核对文中给出的输入和结果。
3. 与相邻文章是否矛盾，站内锚点是否存在：66 个站内链接都存在。
4. 参考资料：24 个外部链接都返回对应页面。

## 结论

| 文章 | 结论 | 修改 |
| --- | --- | --- |
| [Java 算法（栏目首页）](../../docs/basic-knowledge/java/algorithms/index.mdx) | ✅ 通过 | — |
| [算法复杂度](../../docs/basic-knowledge/java/algorithms/complexity-constraints-java-cost.mdx) | ✅ 通过 | — |
| [滑动窗口](../../docs/basic-knowledge/java/algorithms/arrays-strings-sliding-window.mdx) | ✅ 通过 | — |
| [树与图搜索](../../docs/basic-knowledge/java/algorithms/trees-graphs-search.mdx) | ✅ 通过 | — |
| [动态规划](../../docs/basic-knowledge/java/algorithms/dynamic-programming-state-design.mdx) | ✅ 通过 | — |
| [算法正确性](../../docs/basic-knowledge/java/algorithms/live-coding-counterexamples-tests.mdx) | ✅ 已修改 | JUnit 版本与测试栏目统一 |

## 修改内容

### 算法正确性（8.1 节、参考资料）

文中写「JUnit 5.13.1 的参数化测试」，参考资料也链接到 5.13.1 的用户指南。Java API 与测试栏目（第 9 批）统一用 5.13.4，两处已改为 5.13.4，参数化测试的用法在这两个版本间没有变化。

## 已验证的断言

算法复杂度：

- `50_000 * 50_000` 按 `int` 计算得 -1794967296，`(long) width * height` 得 2500000000。
- 比较器写成 `a - b` 时，`Integer.MAX_VALUE` 与 -1 比较返回负数，`Integer.compare` 返回 1。

滑动窗口：

- `maxWindowSum([-5,-2,-3], 2)` 返回 -5。
- `longestUniqueSubstring`：`abba` 返回 2，`A😀B😀` 返回 3，`ABA` 返回 2（与第 7 节手动执行表一致）。
- `"A😀B".length()` 为 4，码点数为 3。
- 单调队列：`[1,3,3,2]`、`k=2` 得到 `[3,3,3]`。
- 按频次计数的最小覆盖子串：`ADOBECODEBANC`/`ABC` 得 `BANC`；窗口 `AB` 不覆盖 `AAB`。

树与图搜索：

- 根 1、左 2、右 3 的树：递归和显式栈前序遍历都是 `[1,2,3]`，右视图为 `[1,3]`，空树返回空列表。
- `ArrayDeque.push(null)` 抛 `NullPointerException`。

动态规划与正确性：

- `maxProfit([3,1,4])` 返回 3，空数组返回 0。
- `cat` 到 `cut` 的编辑距离为 1；`abc` 与 `ac` 的 LCS 为 2。
- 重量 2、收益 3 的物品、容量 4：0/1 背包倒序更新得 3，正序更新得 6。
- `Long.MIN_VALUE - 5` 溢出为 9223372036854775803。
- 按长度比较的 `TreeSet` 加入 `ab`、`cd` 后只保留 `ab`。

下一批：Spring 栏目（19 篇），分两次 PR。
