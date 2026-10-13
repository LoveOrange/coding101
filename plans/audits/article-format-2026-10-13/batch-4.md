# 文章格式审计：batch-4

日期：2026-10-13。分支：`content/article-format-2026-10-13`。

本批完成指定 21 篇文章的表达优化与考点补充。新增 34 道本站原理自测，原有 26 道卡片全部保留，共 60 道。仅修改本批文章与本记录，未提交 git。

## 表达与标识

- 完整阅读 AGENTS.md、batch-1b.md 和指定两篇样例。
- 普通二、三级标题使用概念或机制名称，面试题保留完整问句。全部补齐显式锚点与连续编号。
- 与修改前逐篇比较，knowledge.id、已有显式锚点和卡片 ID 全部保留。没有删除或合并卡片。
- 每篇开头说明范围。基础结构与算法机制由主题文章负责，Java 篇保留实现、状态和边界；相邻重复内容改为结论加链接。
- 面试核心改为可直接复述的结论，参考回答首句给出答案。正文逐段复核，并通过 30 字长句与文风严格检查。
- 新题统一使用规定的本站自测注释，没有新增公司归属。原有公司来源注释保留，本轮未重新核验其面经正文。
- Java 相关依据固定到 Java SE 21；record 正式版本为 Java 16。JUnit 参数化测试引用固定到 5.13.1。

## 每篇改动与依据

### 1. 数组

文件：[array.mdx](../../../docs/basic-knowledge/data-structures/array.mdx)。

区分连续槽位模型与 Java 语言保证。重写有效长度、保序删除和倍增摊销。补充四分之一缩容阈值及反复迁移的原因。链表定位成本改为相邻主题引用。

新增题：`array-resize-amortized`。

依据：[Open Data Structures：ArrayStack](https://opendatastructures.org/ods-java/2_1_ArrayStack_Fast_Stack_O.html)、[Java SE 21 JLS：Arrays](https://docs.oracle.com/javase/specs/jls/se21/html/jls-10.html)。完整依据见文章参考资料。

修正与边界：收窄原文关于物理连续布局的笼统表达。JLS 规定数组下标与类型，不规定物理布局。

### 2. 二叉搜索树

文件：[binary-search-tree.mdx](../../../docs/basic-knowledge/data-structures/binary-search-tree.mdx)。

重写祖先上下界、顺序插入退化、三类删除。补充双孩子删除的后继推导，以及 lower bound 和范围查询。保留原查找章节显式锚点。

新增题：`bst-delete-successor`、`bst-lower-bound`。

依据：[Open Data Structures：BinarySearchTree](https://opendatastructures.org/ods-java/6_2_BinarySearchTree_Unbala.html)。完整依据见文章参考资料。

修正与边界：无已确认的技术错误；补全复杂度中的树高条件。

### 3. 二叉树

文件：[binary-tree.mdx](../../../docs/basic-knowledge/data-structures/binary-tree.mdx)。

区分节点数、树高与层宽。补入前序与中序重建、重复值与单孩子歧义。具体遍历代码引用树与图搜索。

新增题：`reconstruct-traversals`。

依据：[Open Data Structures：BinaryTree](https://opendatastructures.org/ods-java/6_1_BinaryTree_Basic_Binary.html)、[Cornell CS 2110：Discussion 8](https://www.cs.cornell.edu/courses/cs2110/2025fa/discussions/dis08/)。完整依据见文章参考资料。

修正与边界：无已确认的技术错误；明确高度按节点数计算。

### 4. 图

文件：[graph.mdx](../../../docs/basic-knowledge/data-structures/graph.mdx)。

按表示、连通性与边权分工。补入强弱连通差异，以及 BFS、0-1 BFS、Dijkstra、Bellman-Ford 的适用条件。

新增题：`directed-connectivity`、`shortest-path-weight`。

依据：[Open Data Structures：Graphs](https://opendatastructures.org/ods-java/12_Graphs.html)、[Princeton Algorithms：Directed Graphs](https://algs4.cs.princeton.edu/42digraph/)、[Princeton Algorithms：Shortest Paths](https://algs4.cs.princeton.edu/44sp/)。完整依据见文章参考资料。

修正与边界：原文在有向图例子后直接描述多次搜索统计连通分量，缺少无向图前提。已区分单向可达、弱连通和强连通。

### 5. 哈希表

文件：[hash-table.mdx](../../../docs/basic-knowledge/data-structures/hash-table.mdx)。

重写负载、键成本和键契约。补入线性探测删除示例、墓碑清理与可变键后果。平均与最坏成本写明模型。

新增题：`open-addressing-delete`、`mutable-hash-key`。

依据：[Open Data Structures：Hash Tables](https://opendatastructures.org/ods-java/5_Hash_Tables.html)、[Open Data Structures：LinearHashTable](https://opendatastructures.org/ods-java/5_2_LinearHashTable_Linear_.html)、[Java SE 21：HashMap](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html)、[Java SE 21：Object.hashCode](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Object.html#hashCode())。完整依据见文章参考资料。

修正与边界：删除 Java HashMap 树化可笼统限制全部冲突退化的暗示。树化效果还取决于键比较路径，通用文章不作无条件保证。

### 6. 堆

文件：[heap.mdx](../../../docs/basic-knowledge/data-structures/heap.mdx)。

保留 Top K 代码，写明重复值排名。补充按高度加权的线性建堆推导，并明确 PriorityQueue 迭代与修改优先级的边界。

新增题：`heapify-linear`。

依据：[Open Data Structures：BinaryHeap](https://opendatastructures.org/ods-java/10_1_BinaryHeap_Implicit_Bi.html)、[Java SE 21：PriorityQueue](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/PriorityQueue.html)。完整依据见文章参考资料。

修正与边界：无已确认的技术错误；时间表达统一为 O(n log(k+1))，覆盖 k=1。

### 7. 链表

文件：[linked-list.mdx](../../../docs/basic-knowledge/data-structures/linked-list.mdx)。

重写反转不变量与删除前驱条件。补入 Floyd 判环和入口公式，以及无环链表交点的引用身份与长度对齐。

新增题：`cycle-entry`、`list-intersection-identity`。

依据：[Open Data Structures：SLList](https://opendatastructures.org/ods-java/3_1_SLList_Singly_Linked_Li.html)、[CMU 15-122：Linked Lists](https://www.cs.cmu.edu/~15122-archive/n19/handouts/10-linkedlist.pdf)。完整依据见文章参考资料。

修正与边界：无已确认的技术错误；区分值相等和共享同一节点。

### 8. 队列

文件：[queue.mdx](../../../docs/basic-knowledge/data-structures/queue.mdx)。

补充循环队列两种判满协议、Java 21 空队列 API 和两栈 FIFO。解释单次倒栈与摊销成本。

新增题：`circular-queue-full`、`queue-two-stacks`。

依据：[Open Data Structures：ArrayQueue](https://opendatastructures.org/ods-java/2_3_ArrayQueue_Array_Based_.html)、[Java SE 21：ArrayDeque](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayDeque.html)、[Cornell CS312：Amortized Algorithms](https://www.cs.cornell.edu/courses/cs312/2007fa/lectures/lec20.html)。完整依据见文章参考资料。

修正与边界：无已确认的技术错误；收窄完成顺序说明，按序输出与串行执行分别陈述。

### 9. 栈

文件：[stack.mdx](../../../docs/basic-knowledge/data-structures/stack.mdx)。

保留括号示例。补充重复最小值的辅助栈，以及下一个更大值的单调栈。调用栈正文改为递归文章引用。

新增题：`min-stack-duplicates`、`monotonic-stack`。

依据：[Open Data Structures：Interfaces](https://opendatastructures.org/ods-java/1_2_Interfaces.html)、[Java：ArrayDeque](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayDeque.html)、[Antti Laaksonen：Competitive Programmer’s Handbook，第 8.2 节](https://cses.fi/book/book.pdf)。完整依据见文章参考资料。

修正与边界：无已确认的技术错误；明确单种括号计数还需检查前缀余额。

### 10. 回溯

文件：[backtracking.mdx](../../../docs/basic-knowledge/algorithms/backtracking.mdx)。

保留子集实现，补充浅复制边界。同层去重给出 i>start 条件与 [1,1,2] 示例。补充排列 used 的不同职责。

新增题：`same-level-dedup`。

依据：[Stanford CS106B：Recursive Backtracking](https://web.stanford.edu/class/archive/cs/cs106b/cs106b.1258/lectures/11-backtracking1/)、[Antti Laaksonen：Competitive Programmer’s Handbook](https://cses.fi/book/book.pdf)。完整依据见文章参考资料。

修正与边界：无已确认的技术错误；将笼统剪枝提醒改成数量上界与元素符号条件。

### 11. 二分查找

文件：[binary-search.mdx](../../../docs/basic-knowledge/algorithms/binary-search.mdx)。

重写半开不变量与返回 n 的协议。补充 upper bound、频次和 target+1 溢出。答案二分写明判定成本。

新增题：`lower-upper-bound`。

依据：[Princeton Algorithms：BinarySearch](https://algs4.cs.princeton.edu/11model/BinarySearch.java.html)、[Antti Laaksonen：Competitive Programmer’s Handbook](https://cses.fi/book/book.pdf)。完整依据见文章参考资料。

修正与边界：原中点防溢出表达补上非负下标条件。全有符号整数域还需提升差值类型。

### 12. 贪心

文件：[greedy.mdx](../../../docs/basic-knowledge/algorithms/greedy.mdx)。

保留区间选择代码，重写交换证明。补充收益 1、1、100 的加权反例和选择/放弃转移。

新增题：`weighted-interval-counterexample`。

依据：[MIT 6.046：Greedy Algorithms](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/resources/lecture-1-course-overview-interval-scheduling/)、[Antti Laaksonen：Competitive Programmer’s Handbook](https://cses.fi/book/book.pdf)。完整依据见文章参考资料。

修正与边界：无已确认的技术错误；明确区间数量与收益属于不同优化目标。

### 13. 前缀和

文件：[prefix-sum.mdx](../../../docs/basic-knowledge/algorithms/prefix-sum.mdx)。

重写前缀计数的初始化和先查后记。新增二维半开矩形容斥与差分区间增加。两项分别配题。

新增题：`prefix-2d-difference`、`difference-range-update`。

依据：[USACO Guide：Prefix Sums](https://usaco.guide/silver/prefix-sums)、[Antti Laaksonen：Competitive Programmer’s Handbook](https://cses.fi/book/book.pdf)。完整依据见文章参考资料。

修正与边界：原文笼统提示 int 数组累加会超出 long，已改为按输入类型说明。int 数组完整累加可由 long 容纳；二维总量及外部目标运算另核上界。

### 14. 递归

文件：[recursion.mdx](../../../docs/basic-knowledge/algorithms/recursion.mdx)。

重写终止证明、调用总量与活动深度。补入完整缓存键、合法零值与计算中循环依赖。

新增题：`memoization-state`。

依据：[Princeton Algorithms：Analysis of Algorithms](https://algs4.cs.princeton.edu/14analysis/)、[Java SE 21 JVMS：JVM Stacks](https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-2.html#jvms-2.5.2)、[Antti Laaksonen：Competitive Programmer’s Handbook](https://cses.fi/book/book.pdf)。完整依据见文章参考资料。

修正与边界：修正 gcd 段落将输入写为单个 n 的笔误。明确尾调用优化并非 JVM 规范承诺。

### 15. 排序

文件：[sorting.mdx](../../../docs/basic-knowledge/algorithms/sorting.mdx)。

重写快排最坏、归并空间与稳定性。补入多字段稳定排序、三路分区及短侧递归的栈边界。

新增题：`stable-sort`、`quicksort-three-way`。

依据：[Princeton Algorithms：Mergesort](https://algs4.cs.princeton.edu/22mergesort/)、[Princeton Algorithms：Quicksort](https://algs4.cs.princeton.edu/23quicksort/)、[Java SE 21：Arrays](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Arrays.html)、[Java SE 21：Comparator](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Comparator.html)。完整依据见文章参考资料。

修正与边界：无已确认的技术错误；将平均快排条件明确为随机化期望。原快排题的考察重点移回分区退化，稳定性另设自测。

### 16. 双指针

文件：[two-pointers.mdx](../../../docs/basic-knowledge/algorithms/two-pointers.mdx)。

保留有序两数和代码，补入可执行去重、有效前缀与固定间距。判环推导改为链表链接。

新增题：`read-write-prefix`、`fixed-gap-kth`。

依据：[Princeton Algorithms：ThreeSumFast](https://algs4.cs.princeton.edu/14analysis/ThreeSumFast.java.html)、[Antti Laaksonen：Competitive Programmer’s Handbook](https://cses.fi/book/book.pdf)。完整依据见文章参考资料。

修正与边界：无已确认的技术错误；明确去重尾部内容不属于结果。

### 17. 滑动窗口

文件：[arrays-strings-sliding-window.mdx](../../../docs/basic-knowledge/java/algorithms/arrays-strings-sliding-window.mdx)。

补齐固定窗口函数、最小覆盖频次和单调队列。统一 code point 与 UTF-16 偏移，其他线性方法改为链接。

新增题：`minimum-cover-counts`、`window-maximum-deque`。

依据：[Java SE 21：String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)、[Java SE 21：Character](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Character.html)、[Java SE 21：HashMap](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html)、[Antti Laaksonen：Competitive Programmer’s Handbook](https://cses.fi/book/book.pdf)、[OpenJDK 21：StringUTF16 源码](https://github.com/openjdk/jdk/blob/jdk-21-ga/src/java.base/share/classes/java/lang/StringUTF16.java)。完整依据见文章参考资料。

修正与边界：原文把单调收缩条件泛化到全部窗口。固定窗口仍可处理负数。原固定窗口片段未初始化 best、未约束 k；现用 Long.MIN_VALUE 并校验范围。

### 18. 算法复杂度

文件：[complexity-constraints-java-cost.mdx](../../../docs/basic-knowledge/java/algorithms/complexity-constraints-java-cost.mdx)。

重写独立规模、累计循环、峰值空间与 Java 成本。补入可核验的 int 乘法溢出结果。

新增题：`java-intermediate-overflow`。

依据：[OpenJDK：JMH](https://openjdk.org/projects/code-tools/jmh/)、[Java SE 21 JLS：Integer Operations](https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.2.2)、[Princeton Algorithms：Mergesort](https://algs4.cs.princeton.edu/22mergesort/)。完整依据见文章参考资料。

修正与边界：修正“嵌套循环相乘”的笼统核心。删除缺少测量依据的“数倍差距”；按真实调用次数和单步成本分析。

### 19. 动态规划

文件：[dynamic-programming-state-design.mdx](../../../docs/basic-knowledge/java/algorithms/dynamic-programming-state-design.mdx)。

在正文补齐编辑距离和 LCS 的定义、边界与复杂度。补充背包状态版本反例、可运行股票滚动实现和方案恢复条件。

新增题：`knapsack-state-version`。

依据：[Java SE 21：Math](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Math.html)、[Java SE 21：BigInteger](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/math/BigInteger.html)、[MIT 6.006：Edit Distance and Knapsack](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/resources/lecture-21-dp-iii-parenthesization-edit-distance-knapsack/)、[Princeton：Longest Common Subsequence](https://introcs.cs.princeton.edu/java/23recursion/)、[Antti Laaksonen：Competitive Programmer’s Handbook](https://cses.fi/book/book.pdf)。完整依据见文章参考资料。

修正与边界：Long.MIN_VALUE 加非负价格并不会下溢；改为负无穷哨兵参与减法的具体问题，并避免哨兵运算。无费用股票模型中使用新 cash 数值等价，原“必然错误”表达已修正。

### 20. 算法正确性

文件：[live-coding-counterexamples-tests.mdx](../../../docs/basic-knowledge/java/algorithms/live-coding-counterexamples-tests.mdx)。

重写契约、不变量与现场验证。补入副本隔离、种子保存、多解比较和结果性质。保留旧来源与卡片。

新增题：`differential-testing`。

依据：[Java SE 21：ArrayDeque](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayDeque.html)、[JUnit 5.13.1：User Guide](https://docs.junit.org/5.13.1/user-guide/index.html)、[Java SE 21：Comparator](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Comparator.html)、[Java SE 21：Random](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Random.html)。完整依据见文章参考资料。

修正与边界：不同对象的 Comparator 结果为 0 本身合法，已改为核对业务去重语义。原二分“目标始终在候选区间”不足以表达 lower bound 与无解；现引用完整不变量。

### 21. 树与图搜索

文件：[trees-graphs-search.mdx](../../../docs/basic-knowledge/java/algorithms/trees-graphs-search.mdx)。

提供空树安全的前序和右视图函数。补入前驱路径恢复、多源去重、三色判环、后序平衡判断和最近公共祖先。

新增题：`directed-cycle-topological`、`postorder-balance`、`bfs-path-recovery`、`tree-lca-presence`。

依据：[Java SE 21：ArrayDeque](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayDeque.html)、[Java SE 21：HashSet](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashSet.html)、[Princeton Algorithms：Directed Graphs](https://algs4.cs.princeton.edu/42digraph/)、[Princeton Algorithms：BreadthFirstPaths 源码](https://algs4.cs.princeton.edu/41graph/BreadthFirstPaths.java.html)、[Java SE 21：JLS Record Classes](https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.10)、[Antti Laaksonen：Competitive Programmer’s Handbook](https://cses.fi/book/book.pdf)。完整依据见文章参考资料。

修正与边界：原显式栈与 BFS 直接加入 root，空根会触发 ArrayDeque 的 null 异常。现入容器前检查。显式栈 O(h) 限于给出的二叉树实现，一般图需另计 O(V) 状态。

## 事实核验与算法实验

核验采用 ODS 作者教材、Princeton / MIT / Stanford / Cornell / CMU 课程、Java SE 21 规范与 API、OpenJDK 21 源码、JUnit 5.13.1 文档及作者发布的 Competitive Programmer’s Handbook。教材中的定义和不变量用于推导本站示例，未把自测题归属于公司。

使用固定种子 `20261013` 运行本地 Python 算法模型，完成 **64,376 项断言**。实验包括：

- 穷举长度 0—6、值域 −1 到 1 的数组，核对 lower/upper bound、两数和、去重、Top K、固定窗口和单调队列。
- 两栈队列与标准 deque 对照，辅助最小栈与直接求最小值对照。
- 穷举 `a`、`b`、`😀` 组成的短串，对比无重复窗口与子串枚举。
- 随机区间贪心与子集穷举对照，0/1 背包与子集穷举对照。
- 二维前缀和与直接矩形求和对照，差分增加与直接逐项修改对照。
- 对长度 1—49 的链表枚举每个环入口，核对 Floyd 入口公式。
- 穷举短价格序列，确认无费用股票模型中新旧 cash 两种更新的数值等价。
- 核对 32 位有符号乘法 `50000*50000` 的低位结果 −1794967296。

这些实验验证算法模型与示例结论，**不等于 Java 编译或运行验证**。本机已安装 JDK 均为 x86_64，当前环境为 arm64，运行报 `Bad CPU type in executable`。没有安装运行时、修改全局配置或启动 Docker 容器。

## 验证

以下要求的检查均通过：

```sh
node scripts/check-article-format.mjs --style-strict -- \
  docs/basic-knowledge/data-structures/array.mdx \
  docs/basic-knowledge/data-structures/binary-search-tree.mdx \
  docs/basic-knowledge/data-structures/binary-tree.mdx \
  docs/basic-knowledge/data-structures/graph.mdx \
  docs/basic-knowledge/data-structures/hash-table.mdx \
  docs/basic-knowledge/data-structures/heap.mdx \
  docs/basic-knowledge/data-structures/linked-list.mdx \
  docs/basic-knowledge/data-structures/queue.mdx \
  docs/basic-knowledge/data-structures/stack.mdx \
  docs/basic-knowledge/algorithms/backtracking.mdx \
  docs/basic-knowledge/algorithms/binary-search.mdx \
  docs/basic-knowledge/algorithms/greedy.mdx \
  docs/basic-knowledge/algorithms/prefix-sum.mdx \
  docs/basic-knowledge/algorithms/recursion.mdx \
  docs/basic-knowledge/algorithms/sorting.mdx \
  docs/basic-knowledge/algorithms/two-pointers.mdx \
  docs/basic-knowledge/java/algorithms/arrays-strings-sliding-window.mdx \
  docs/basic-knowledge/java/algorithms/complexity-constraints-java-cost.mdx \
  docs/basic-knowledge/java/algorithms/dynamic-programming-state-design.mdx \
  docs/basic-knowledge/java/algorithms/live-coding-counterexamples-tests.mdx \
  docs/basic-knowledge/java/algorithms/trees-graphs-search.mdx
npm run build
git diff --check
```

- 本批严格格式检查：21 篇，0 篇结构问题，0 篇文风提示。
- 全站构建：文档链接、复习资源、岗位与面经数据检查通过；Docusaurus 成功生成静态文件。
- 稳定标识核对：全部 knowledge.id、原显式锚点与 26 道旧卡片 ID 保留；新增 34 道题均有完整字段与默认收起的参考回答。
- 全站仍有本批之外的非阻断格式提示，以及已有博客作者、摘要、Node localStorage 和 Docusaurus 更新检查提示，未扩大范围处理。

## 未完成与人工确认

无内容或构建阻塞事项。Java 示例未在本机编译运行，原因见实验说明；后续如需运行级复核，应使用可运行的 Java 21。原公司归属沿用已有记录，本批没有新增或扩大归属。
