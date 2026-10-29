# Claude 校验 · 第 13 批（2026-10-29）

范围：基础知识的数据结构（10 篇，含栏目首页）和算法（8 篇，含栏目首页）两个栏目。校验后直接修改，Lin 的审阅异步进行。

校验项：

1. 技术事实与复杂度推导，包括摊销分析、建堆 O(n)、比较排序下界、环入口推导和交换论证。
2. 代码示例：文中所有 Java 片段，以及按文字描述实现的单调栈、环入口、同层去重子集，都在 Eclipse Temurin 21.0.12 上运行，核对文中给出的输入和结果。
3. 与相邻文章是否矛盾，站内锚点是否存在：124 个站内链接都存在，包括指向 Java 算法栏目和力扣题解的链接。
4. 参考资料：35 个外部链接中 34 个返回对应页面（其中 1 个首次请求超时，重试正常）。MIT Press 的《Introduction to Algorithms》页面对脚本和抓取工具都返回 403，ISBN 9780262046305 对应该书第 4 版，判断为站点的反爬限制，链接保留。

## 结论

18 篇全部通过，没有修改。

| 栏目 | 文章 |
| --- | --- |
| 数据结构 | [栏目首页](../../docs/basic-knowledge/data-structures/index.mdx)、[数组](../../docs/basic-knowledge/data-structures/array.mdx)、[链表](../../docs/basic-knowledge/data-structures/linked-list.mdx)、[栈](../../docs/basic-knowledge/data-structures/stack.mdx)、[队列](../../docs/basic-knowledge/data-structures/queue.mdx)、[哈希表](../../docs/basic-knowledge/data-structures/hash-table.mdx)、[二叉树](../../docs/basic-knowledge/data-structures/binary-tree.mdx)、[二叉搜索树](../../docs/basic-knowledge/data-structures/binary-search-tree.mdx)、[堆](../../docs/basic-knowledge/data-structures/heap.mdx)、[图](../../docs/basic-knowledge/data-structures/graph.mdx) |
| 算法 | [栏目首页](../../docs/basic-knowledge/algorithms/index.mdx)、[二分查找](../../docs/basic-knowledge/algorithms/binary-search.mdx)、[双指针](../../docs/basic-knowledge/algorithms/two-pointers.mdx)、[前缀和](../../docs/basic-knowledge/algorithms/prefix-sum.mdx)、[排序](../../docs/basic-knowledge/algorithms/sorting.mdx)、[递归](../../docs/basic-knowledge/algorithms/recursion.mdx)、[回溯](../../docs/basic-knowledge/algorithms/backtracking.mdx)、[贪心](../../docs/basic-knowledge/algorithms/greedy.mdx) |

## 已验证的断言

数据结构：

- 链表 `reverse`：1→2→3 得 3→2→1，空表返回 `null`，原头节点的 `next` 变为 `null`。
- 快慢指针：0→1→2→3→4→2 的链表，相遇后一个指针回到头部、两者同步前进，在值为 2 的入口相遇。
- 圆括号 `balanced`：`(a())` 为 true，`)(` 与 `(()` 为 false。
- `ArrayDeque` 作为队列：`offer(10)`、`offer(20)` 后 `poll()` 得 10、`peek()` 得 20；空队列 `poll`、`peek` 返回 null，`remove`、`element` 抛 `NoSuchElementException`；`offer(null)` 抛 `NullPointerException`。
- 单调栈求右侧第一个严格更大值：`[2,2,3]` 得 `[3,3,-1]`，两个 2 都由 3 回答。
- `kthLargest([3,1,5,5,2], 2)` 返回 5；`PriorityQueue` 的迭代顺序不是排序结果（`[1,2,4,5,3]`）。
- 二叉树示例的前序 `4,2,3,7`、中序 `2,3,4,7`、后序 `3,2,7,4`、层序 `4,2,7,3`，与文中一致。

算法：

- `lowerBound([1,3,3,7], 3)` 为 1，查 8 为 4，空数组为 0；upper bound 查 3 为 3，出现次数为 2。
- `twoSumSorted([1,2,4,7], 9)` 返回 `[1,3]`；`unique([1,1,2])` 返回 2，有效前缀 `[1,2]`。
- `prefix([2,-1,4])` 为 `[0,2,1,5]`，区间 `[1,3)` 和为 3；`[0,0]` 中和为 0 的子数组有 3 个。
- `gcd(18,12)` 为 6，`gcd(0,0)` 为 0。
- `subsets([1,2])` 按「不选、选」顺序得到 `[[],[2],[1],[1,2]]`；同层去重的 `[1,1,2]` 子集保留了 `[1,1]`，共 6 个，无重复。
- `maxIntervals([[1,3],[2,4],[3,5]])` 返回 2；面额 {1,3,4} 凑 6，贪心取 3 枚，最优为 2 枚。

下一批：数据库（索引、建模、SQL、事务，约 18 篇），用本地 MySQL 8.4 容器验证。
