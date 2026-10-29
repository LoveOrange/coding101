# Claude 校验 · 第 14 批（2026-10-29）

范围：数据库栏目首页、索引（6 篇）和数据建模（2 篇），共 9 篇。SQL 与事务（9 篇）放在第 15 批。校验后直接修改，Lin 的审阅异步进行。

校验项：

1. 技术事实与版本基线（文中注明的 MySQL 8.0 InnoDB）。
2. 执行计划与约束行为：在 MySQL 8.4.11 容器里建表实测，表的规模为 10 万到 30 万行。InnoDB 的这部分行为在 8.0 与 8.4 之间没有变化，有差异的地方会单独注明。
3. 与相邻文章是否矛盾，站内锚点是否存在：116 个站内链接都存在。
4. 参考资料：22 个外部链接都是 MySQL 8.0 参考手册，`dev.mysql.com` 对脚本请求返回 403，逐个用浏览器方式取回标题，都对应正确的页面；1 个链接标题与页面不符，已修正。

## 结论

| 文章 | 结论 | 修改 |
| --- | --- | --- |
| [关系型数据库（栏目首页）](../../docs/basic-knowledge/database/index.mdx) | ✅ 通过 | — |
| [数据库索引](../../docs/basic-knowledge/database/indices/index.mdx) | ✅ 已修改 | 执行计划表的第三列会被读成正确结论；面试核心条目格式 |
| [B+ 树](../../docs/basic-knowledge/database/indices/b_plus_tree/index.mdx) | ✅ 已修改 | 面试核心条目格式；1 个参考链接标题 |
| [聚簇索引](../../docs/basic-knowledge/database/indices/clustered_index/index.mdx) | ✅ 已修改 | 面试核心条目格式 |
| [联合索引与覆盖索引](../../docs/basic-knowledge/database/indices/composite-covering-back-table.mdx) | ✅ 通过 | — |
| [执行计划](../../docs/basic-knowledge/database/indices/execution-plan.mdx) | ✅ 已修改 | 补上直方图对有索引的列不起作用 |
| [索引设计](../../docs/basic-knowledge/database/indices/index-review.mdx) | ✅ 已修改 | 补上低选择性条件下优化器因估算偏差选错路径的实测 |
| [数据建模（栏目首页）](../../docs/basic-knowledge/database/modeling/index.mdx) | ✅ 通过 | — |
| [数据约束](../../docs/basic-knowledge/database/modeling/constraints.mdx) | ✅ 通过 | — |

## 修改内容

### 数据库索引（第 10 节「执行计划的判断层次」）

原表三列是「证据 | 能说明什么 | 解读边界」，第三列内容是「一定使用这些索引」「命中索引就很快」「等于实际行数」「所有并发情况下绝不访问聚簇记录」「已经覆盖全部返回列」「一定落盘排序」。这些本意是常见误读，但列名「解读边界」没有说明它们是错的，读者很容易把它们当成正确结论记下来。

已把列名改为「不能据此推出」，并把个别条目写完整。例如 `Using index` 一行补上「MVCC 判断可见性时仍可能回到聚簇记录」，`key 与 type` 一行写明「`type = index` 其实是全索引扫描」。

### 面试核心条目格式（数据库索引、B+ 树、聚簇索引）

这三篇的面试核心每条都以「**B+ 树访问。**」「**页结构。**」这类加粗小标题开头，不符合文风约定（核心条目在句中加粗最需要记住的结论，不加小标题）。已改为句中加粗，内容不变。

另外说明一点：这三篇正文多为「它……。它……。」式的短句，读起来比其他栏目生硬。这次只核对事实、修正上述格式，没有重写正文，建议 Lin 审阅时考虑是否交给 Codex 做一次文风修订。

### 索引设计（6.3 节「数据分布与选择性」）

原文说 `status=1` 占 90% 时，优化器「很可能选择全表扫描」。在 MySQL 8.4 上用 20 万行（`status=1` 18 万行）实测，结果正好相反：

- `EXPLAIN` 估计 `status=1` 有 99,646 行，选了 `idx_status`。
- `EXPLAIN ANALYZE` 显示实际读了 18 万行，耗时 87 ms；用 `IGNORE INDEX` 强制全表扫描，耗时 29 ms。
- 执行 `ANALYZE TABLE ... UPDATE HISTOGRAM ON status` 之后，估算不变。

原因是成本按估算的行数计算，而列上有索引时，优化器用索引下探的结果，不用直方图。已在原段落后补上这次实测，提醒读者低选择性条件要看实际行数，必要时对比两条路径。

### 执行计划（第 5 节）

原文写「直方图可以补充单列的值分布」。MySQL 8.0 参考手册「Optimizer Statistics」一节写明，直方图主要用于没有索引的列，有索引时 index dive 的估算优先。上面的实测也印证了这一点。已补上这层限制。

### B+ 树（参考资料）

「MySQL 8.0：Reclaiming Disk Space」实际指向「Reclaiming Disk Space with TRUNCATE TABLE」，标题已改为页面原名。

## 已验证的断言

MySQL 8.4.11 实测：

- `index_demo(tenant_id, created_at, status)`：`tenant_id = 10 AND created_at > ... AND status = 'PAID'` 取 `payload` 时为 `range` + `Using index condition`；改为只取 `id, created_at, status` 时为 `Using index`。
- `orders(tenant_id, status, created_at, id)`：固定前两列后 `ORDER BY created_at DESC, id DESC LIMIT 20` 为 `Backward index scan; Using index`，无 filesort；去掉 `status` 条件后出现 `Using filesort`。
- `orders_plan(user_id, created_at)`：`WHERE user_id = 7 ORDER BY created_at LIMIT 20` 为 `ref` + `Using index`，无 filesort。
- 函数条件 `YEAR(created_at) = 2026` 为全表扫描，改写成范围后走 `idx_created`；建函数索引 `((YEAR(created_at)))` 后同一条件走 `ref`。
- `varchar` 列与数字比较时全表扫描，与字符串比较时走 `ref`。
- 唯一前缀索引 `email(10)` 拒绝前 10 个字符相同的不同邮箱；不可见的唯一索引仍拒绝重复值，优化器不选它。
- 约束：
  - `CHECK (balance >= 0)` 拒绝负数，`balance` 为 NULL 时通过。
  - 联合唯一键 `(a, b)` 允许两行 `(1, NULL)`。
  - `NOT NULL DEFAULT 5` 的列显式写 NULL 时报错。
  - 先插子行报外键错误；删除仍被引用的父行被拒绝。
  - 外键列没有索引时，InnoDB 自动创建。
  - `utf8mb4_0900_ai_ci` 下 `Alice@example.com` 与 `alice@example.com` 冲突。

参考手册（8.0）：

- 唯一索引允许多个 NULL；CHECK 自 8.0.16 起执行，UNKNOWN 通过。
- InnoDB 中 `NO ACTION` 等同 `RESTRICT`，外键立即检查。
- `MERGE_THRESHOLD` 默认 50；函数索引自 8.0.13 起支持。

下一批：数据库 SQL（4 篇）与事务（5 篇）。
