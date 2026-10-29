# Claude 校验 · 第 15 批（2026-10-29）

范围：数据库的 SQL（4 篇，含栏目首页）和事务（5 篇）。至此数据库栏目全部完成。校验后直接修改，Lin 的审阅异步进行。

校验项：

1. 技术事实与版本基线（文中注明的 MySQL 8.0 InnoDB）。
2. 实测：
   - SQL 三篇的所有示例查询都在 MySQL 8.4.11 容器里执行，逐条核对文中写的结果。
   - 事务部分用两个并发会话复现了 MVCC 可见性、唯一键与二级索引加锁、死锁、锁等待超时、重复键、元数据锁、NOWAIT/SKIP LOCKED 等实验，加锁情况用 `performance_schema.data_locks` 读取。
3. 与相邻文章是否矛盾，站内锚点是否存在：122 个站内链接都存在。
4. 参考资料：38 个外部链接中 35 个是 MySQL 参考手册。`dev.mysql.com` 对脚本请求返回 403，这 35 个逐个用浏览器方式取回标题，都对应正确的页面。

## 结论

| 文章 | 结论 | 修改 |
| --- | --- | --- |
| [SQL（栏目首页）](../../docs/basic-knowledge/database/sql/index.mdx) | ✅ 通过 | — |
| [SQL 查询](../../docs/basic-knowledge/database/sql/query.mdx) | ✅ 通过 | — |
| [SQL 连接](../../docs/basic-knowledge/database/sql/joins.mdx) | ✅ 通过 | — |
| [SQL 聚合](../../docs/basic-knowledge/database/sql/aggregation.mdx) | ✅ 通过 | — |
| [数据库事务](../../docs/basic-knowledge/database/transaction/index.mdx) | ✅ 已修改 | 面试核心条目格式 |
| [MVCC](../../docs/basic-knowledge/database/transaction/mvcc-read-view-consistent-read.mdx) | ✅ 通过 | — |
| [InnoDB 锁](../../docs/basic-knowledge/database/transaction/innodb-locking-ranges.mdx) | ✅ 已修改 | 二级索引范围查询在聚簇索引上还锁了主键 15 |
| [数据库死锁](../../docs/basic-knowledge/database/transaction/deadlock-detection-timeout-retry.mdx) | ✅ 通过 | — |
| [长事务](../../docs/basic-knowledge/database/transaction/long-transactions-hot-updates-boundaries.mdx) | ✅ 通过 | — |

## 修改内容

### InnoDB 锁（10.1 节表格与说明、14.5 参考回答）

原表写 `FORCE INDEX (uk) WHERE u>5 AND u<15 FOR UPDATE` 和 `FORCE INDEX (nk) WHERE k>5 AND k<15 FOR UPDATE` 在聚簇索引上只有「主键 10 的记录锁」，并说实验「适用于 MySQL 8.0 及以上」。在 MySQL 8.4.11 上用文中同样的表和数据实测，`data_locks` 显示：

| 查询 | 二级索引上的锁 | PRIMARY 上的锁 |
| --- | --- | --- |
| `nk` 等值 `k=10` | `X 10,10`、`X,GAP 15,15` | `X,REC_NOT_GAP 10` |
| `uk` 范围 | `X 10,10`、`X 15,15` | `X,REC_NOT_GAP 10`、`X,REC_NOT_GAP 15` |
| `nk` 范围 | `X 10,10`、`X 15,15` | `X,REC_NOT_GAP 10`、`X,REC_NOT_GAP 15` |
| `PRIMARY` 范围 | — | `X 10`、`X,GAP 15` |

第一行和第四行与原文一致，两个二级索引范围查询还对主键 15 加了记录锁。已修改：

- 表格改为「主键 10、15 的记录锁」。
- 说明里补上「连主键 15 这条聚簇记录也被锁住了」。
- 删掉「适用于 MySQL 8.0 及以上」，改为注明表中结果是 MySQL 8.4 的实测，版本变化时要重新观察。
- 14.5 参考回答同步修改。

8.0 上是否相同没有条件验证（本地只有 8.4 镜像）。改成以实测版本为准的写法，避免对 8.0 下没有验证过的结论。

### 数据库事务（面试核心）

五条核心以「**ACID 与业务约束。**」这类加粗小标题开头，已改为句中加粗，内容不变。

## 已验证的断言

SQL：

- 候选人表的过滤、`score = NULL` 查不到行、`3 NOT IN (1, NULL)` 为 NULL、`NULL <=> NULL` 为 1、`DISTINCT`、OFFSET 分页、游标分页、`UNION`/`UNION ALL`、分组取第一名，结果都和文中一致。
- `ROW_NUMBER`、`RANK`、`DENSE_RANK` 对 95、95、80 分别为 1/2/3、1/1/3、1/1/2。
- 连接：`LEFT JOIN` 的补空行；条件放 `ON` 与放 `WHERE` 的差异；`EXISTS` 不重复输出；`NOT EXISTS` 反连接；先聚合再连接得到 `(1,130)、(2,20)、(3,0)`。
- 聚合：
  - `COUNT(*)`、`COUNT(amount)`、`SUM`、`AVG` 对 NULL 的处理与文中一致（A 组 3、2、100、50）。
  - 按主键分组可以选出 `team`；按 `team` 分组选 `id` 被 `ONLY_FULL_GROUP_BY` 拒绝（错误 1055），该模式默认开启。
  - `WHERE` 与 `HAVING` 组合的结果、空输入有无 `GROUP BY` 的差异，与文中一致。
  - 条件计数里 `COUNT(... ELSE 0)` 会数出全部行。

事务（两个并发会话，RR）：

- MVCC：第 3 步读到 110，第 5 步仍为 110，`FOR UPDATE` 读到 120，之后普通读仍为 110，提交后为 120；改用 RC 时第 5 步为 120。
- 混合读写：快照看不到 B 新插入的行，`UPDATE` 影响 1 行，之后普通读返回 `(2,201)`；回滚后 B 的 `(2,200)` 保留。
- RC 下 `START TRANSACTION WITH CONSISTENT SNAPSHOT` 给出警告 138，子句被忽略。
- 唯一键未命中 `id=15 FOR UPDATE` 时，B 插入 15 等待超时；命中 `id=10` 时，B 插入 15 立即成功。
- 非唯一等值 `k=10` 时，B 插入 12 超时、锁定 `k=15` 成功；非唯一范围、唯一范围时，B 锁定 15 都超时。
- 死锁：B 收到 1213，它之前对 `id=2` 的修改被撤销，A 的更新继续完成。
- 锁等待超时：B 收到 1205，此前在同一事务里的修改仍在，事务仍处于活跃状态。
- 重复键错误 1062 只回滚当前语句，事务里之前插入的行仍在。
- 只执行过 `SELECT` 的未提交事务挡住了 `ALTER TABLE`，`lock_wait_timeout=1` 时报 1205。
- `FOR UPDATE NOWAIT` 报 3572，`SKIP LOCKED` 跳过被锁的行。
- 默认值：
  - `innodb_lock_wait_timeout=50`、`innodb_rollback_on_timeout=OFF`、`innodb_deadlock_detect=ON`。
  - `innodb_flush_log_at_trx_commit=1`、`sync_binlog=1`、`binlog_format=ROW`、`innodb_flush_log_at_timeout=1`。
  - 隔离级别默认为 `REPEATABLE-READ`。

下一批：Redis（9 篇）与中间件（6 篇）。
