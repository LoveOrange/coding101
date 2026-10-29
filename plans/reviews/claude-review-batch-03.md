# Claude 校验 · 第 3 批（2026-10-29）

范围：Java 集合栏目的 13 篇文章，包括栏目首页。这一批开始，Claude 校验后直接修改发现的问题，Lin 的审阅与之异步进行。同时修改了第 2 批标记为待修改的 2 篇（`@Target` 默认适用位置、`FilerException` 成因），已复核。

校验项：

1. 技术事实与版本基线（Java 17 / 21，实现细节以 OpenJDK 21 为准）。
2. 代码示例与实现细节：在 Eclipse Temurin 21.0.12 上运行了 81 项断言。HashMap 的树化与退化、ArrayList 的容量、CopyOnWrite 的数组替换，都用反射读取内部字段实测（`--add-opens java.base/java.util`），并对照了 `jdk-21-ga` 源码。
3. 与相邻文章是否矛盾，站内锚点是否存在：8 个跨文章锚点都存在。
4. 参考资料：50 个外部链接全部返回对应标题的页面，带锚点的 Javadoc 链接锚点都存在。

## 结论

| 文章 | 结论 | 修改 |
| --- | --- | --- |
| [Java 集合框架](../../docs/basic-knowledge/java/collections/collection-interface-selection.mdx) | ✅ 通过 | — |
| [ArrayList](../../docs/basic-knowledge/java/collections/arraylist-growth-memory-locality.mdx) | ✅ 通过 | — |
| [LinkedList](../../docs/basic-knowledge/java/collections/linkedlist-semantics-cost.mdx) | ✅ 通过 | — |
| [TreeMap 与 TreeSet](../../docs/basic-knowledge/java/collections/treemap-treeset-ordered-query.mdx) | ✅ 通过 | — |
| [集合迭代器](../../docs/basic-knowledge/java/collections/iterator-fail-fast-immutable.mdx) | ✅ 通过 | — |
| [HashMap](../../docs/basic-knowledge/java/collections/hashmap-structure-lookup-path.mdx) | ✅ 已修改 | compute 系列的树化时机写具体；迭代器删除的退化规则写错 |
| [LinkedHashMap](../../docs/basic-knowledge/java/collections/linkedhashmap-lru.mdx) | ✅ 已修改 | `removeEldestEntry` 的触发方法写窄了 |
| [ConcurrentHashMap](../../docs/basic-knowledge/java/collections/concurrenthashmap-atomic-compound-operations.mdx) | ✅ 通过 | — |
| [CopyOnWrite 容器](../../docs/basic-knowledge/java/collections/copy-on-write-cost-model.mdx) | ✅ 通过 | — |
| [BlockingQueue](../../docs/basic-knowledge/java/collections/blockingqueue-producer-consumer.mdx) | ✅ 通过 | — |
| [ConcurrentLinkedQueue](../../docs/basic-knowledge/java/collections/concurrentlinkedqueue-lock-free-path.mdx) | ✅ 通过 | — |
| [迭代一致性](../../docs/basic-knowledge/java/collections/concurrent-collection-iteration-consistency.mdx) | ✅ 通过 | — |
| [Java 集合（栏目首页）](../../docs/basic-knowledge/java/collections/index.mdx) | ✅ 通过 | — |

## 修改内容

### HashMap（第 4 节「冲突与树化」的条件列表）

1. **compute 系列的树化时机**：原文写「`compute` 系列方法统计节点数的路径和普通 `put` 不同，触发时机要按具体调用分析」。描述里承诺「区分不同操作的树化条件」，正文却没给出结论。

   实测：容量 64、桶里已有 7 个冲突节点时，`computeIfAbsent`、`compute`、`merge` 加入第 8 个节点后，桶就变成了 `TreeNode`；普通 `put` 要到第 9 个才树化。

   源码依据：普通 `put` 的 `binCount` 在遍历时不计首节点；`computeIfAbsent`、`compute`、`merge` 的 `binCount` 统计的是已有节点数，三处的判断都是 `binCount >= TREEIFY_THRESHOLD - 1`。

   已改为：已有 7 个、再加入第 8 个时就请求树化，比普通 `put` 早一项。
2. **迭代器删除的退化规则**：原文写「普通 `remove` 根据树的形状判断是否退化，迭代器删除还有额外条件」。实际上，迭代器删除调用 `removeNode(..., movable = false)`，形状检查只在 `movable` 为 `true` 时进行，所以迭代器删除**不会**按形状退化。

   实测（12 个冲突键的树桶）：

   - 用 `map.remove` 逐个删除，删到剩 2 个节点时退回链表。
   - 用迭代器删除，删到只剩 1 个节点仍是 `TreeNode`。

   已改为：普通 `remove` 看根节点附近的形状，树小到一定程度就转回链表（JDK 21 源码注释：大约 2 到 6 个节点）；迭代器删除不做这项检查，树桶保留到下次扩容拆分。

其余内容已验证：

- `new HashMap<>(64)` 下第 9 次冲突 `put` 树化；容量 16 时第 9、10 次冲突 `put` 先扩容到 32、64，第 11 次才树化。
- `new HashMap<>(100)` 首次分配 128 个桶，第 97 个键触发扩容到 256。
- `HashMap.newHashMap(100)` 和 `new HashMap<>(134)` 都分配 256 个桶。

### LinkedHashMap（8.2「淘汰钩子的触发时机」）

原文写「`removeEldestEntry` 只在 `put` 或 `putAll` 新增条目后被调用」。这是照搬 Javadoc 的说法，但 OpenJDK 21 的 `computeIfAbsent`、`compute` 和 `merge` 新增条目后也会调用 `afterNodeInsertion(true)`。

实测：上限为 2 的 `LruCache` 已有 A、B 两个条目，再用下面五种方法分别新增 C，结果都淘汰了 A，留下 `[B, C]`：

- `put`
- `putIfAbsent`
- `computeIfAbsent`
- `compute`
- `merge`

用 `computeIfAbsent` 加载缓存很常见，读者需要知道这时也会按上限淘汰。已补充这一句，并保留「时间流逝本身不会触发它」的原意。

## 通过的文章：已验证内容

- **ArrayList**：
  - 容量：无参构造时容量为 0，第一次 `add` 后变成 10，之后按 15、22 增长；`new ArrayList<>(0)` 第一次 `add` 后容量为 1；容量 10 时 `addAll` 30 个元素，直接扩到最小所需的 31。
  - 方法行为：`remove(1)` 按下标删除；修改父列表的结构后，再用 `subList` 会抛 CME。
- **LinkedHashMap**（除上述修改）：
  - 插入顺序下重复 `put` 不改变位置；访问顺序下 `get` 把条目移到链尾。
  - `containsKey` 和遍历 `entrySet` 不改变顺序；遍历 `keySet` 时调用 `get` 会抛 CME。
  - 上限为 0 时新增的条目立即被淘汰。
- **TreeMap 与 TreeSet**：
  - `floorEntry`、`higherEntry`、`ceilingEntry` 的结果与文中一致；`subMap(...).clear()` 后只剩 30，`lowerKey(30)` 为 `null`。
  - 向视图写入范围外的键抛 `IllegalArgumentException`；对 `floorEntry` 的返回值调用 `setValue` 抛 `UnsupportedOperationException`；自然顺序下放入 null 键抛 NPE。
  - 忽略大小写的 TreeSet 保留先加入的 `Alice`；只按分数比较时，同分的两个对象只保留一个。
- **集合迭代器**：
  - 遍历时删掉倒数第二个元素，不抛 CME，最后一个元素被静默跳过。
  - 迭代器删除状态：第一次 `next` 之前调用 `remove`、或连续调用两次，都抛 `IllegalStateException`。
  - 结构修改的判定：`set` 不计为结构修改，`ensureCapacity` 计为结构修改。
  - 不可修改集合：只读视图跟随原列表变化，`List.copyOf` 固定内容；对已经是不可修改的列表再调 `List.copyOf`，返回同一个实例。
  - `Arrays.asList`：`set` 写回原数组；`Arrays.asList(int[])` 的长度为 1。
- **Java 集合框架**：`PriorityQueue` 依次放入 3、1、2 后，遍历结果为 `[1, 3, 2]`；`ArrayDeque` 拒绝 null。
- **LinkedList**：`listIterator(1).add("X")` 之后，`next` 返回 `B`，`previous` 返回 `X`。
- **ConcurrentHashMap**：
  - 拒绝 null 键和 null 值。
  - 回调结果：`computeIfAbsent` 返回 null 或抛异常时不建立映射；`compute`、`merge` 返回 null 时删除映射，`compute` 抛异常时保留原值。
  - `reduceValuesToLong` 的示例能编译，结果正确；`remove(key, 旧版本值)` 对新版本对象返回 `false`。
  - `computeIfAbsent` 在首节点命中时不加锁的快速路径，与 `jdk-21-ga` 源码一致。
- **CopyOnWrite 容器**：
  - 迭代器固定在创建时的快照上，其 `remove` 抛 `UnsupportedOperationException`；`addIfAbsent` 的返回值正确。
  - 数组替换：`set` 写入同一个引用时不替换数组；删除不存在的元素时不复制。
- **BlockingQueue 与 ConcurrentLinkedQueue**：
  - `SynchronousQueue` 没有消费者时，`offer` 返回 `false`；`LinkedBlockingQueue` 的默认剩余容量是 `Integer.MAX_VALUE`。
  - null 处理：`ArrayBlockingQueue` 和 `ConcurrentLinkedQueue` 都拒绝放入 null；队列为空时，`ConcurrentLinkedQueue` 的 `poll` 返回 null。
  - `take` 被中断后，中断标记已清除。

## 下一批

Java 并发（22 篇），按 Java 后端路线的复习顺序继续。
