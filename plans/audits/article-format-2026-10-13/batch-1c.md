# 文章可读性审计：batch-1c

日期：2026-10-13。分支：`content/article-format-2026-10-13`。

本批仅修改指定 8 篇文章的表达。已逐段通读面试核心、正文、常见问题和参考回答。技术内容与结论保持不变，未提交 Git。

## 每篇改写对照

### 1. 数据库事务

文件：[index.mdx](../../../docs/basic-knowledge/database/transaction/index.mdx)。

拆开隔离级别、提交与失败边界的长句。历史原因改用通俗表述。

**改写前**

> 这是根据官方格式历史与锁机制说明解释的兼容性背景；官方资料并未将它列为选择默认 RR 的唯一原因。

**改写后**

> 官方文档没有说明默认选择 RR 的原因。上面是常见的解释。

**改写前**

> “双 1”指 `innodb_flush_log_at_trx_commit=1` 和 `sync_binlog=1`：前者要求提交时写出并刷盘 redo，后者要求每组 binlog 提交在提交事务前同步到磁盘。

**改写后**

> “双 1”指 `innodb_flush_log_at_trx_commit=1` 和 `sync_binlog=1`。前者要求提交时写出并刷盘 redo。后者要求每组 binlog 提交在提交事务前同步到磁盘。

### 2. MVCC

文件：[mvcc-read-view-consistent-read.mdx](../../../docs/basic-knowledge/database/transaction/mvcc-read-view-consistent-read.mdx)。

按事务信息、快照和自身写入拆句。保留可见性条件与双会话步骤。

**改写前**

> InnoDB 会为聚簇索引记录维护创建或最后修改该版本的事务信息，并通过回滚指针关联 undo log 中的旧版本。

**改写后**

> InnoDB 为聚簇索引记录保存事务信息。它记录创建或最后修改该版本的事务。回滚指针则关联 undo log 中的旧版本。

**改写前**

> 同一事务自己的写入仍然可见，所以事务中混合“读取旧快照”和“修改最新状态”时，结果会同时包含自己的新版本和其他行的旧版本，具体例子见“混合读写与新行可见性”。

**改写后**

> 同一事务自己的写入仍然可见。事务可以既读取旧快照，又修改最新状态。这时，结果会包含自己的新版本和其他行的旧版本。具体例子见“混合读写与新行可见性”。

### 3. InnoDB 锁

文件：[innodb-locking-ranges.mdx](../../../docs/basic-knowledge/database/transaction/innodb-locking-ranges.mdx)。

拆开扫描条件、锁范围与阻塞结果。实验步骤补足主语。

**改写前**

> 间隙锁作用于相邻索引记录之间的开区间，阻止其他事务在该区间插入新索引记录。

**改写后**

> 间隙锁作用于相邻索引记录之间的开区间。它阻止其他事务在该区间插入新索引记录。

**改写前**

> 若 `k=10` 有多条记录，锁范围应按 `(k,id)` 的完整顺序推导：所有匹配项的记录、组内间隙和两侧扫描到的间隙都需要计入。

**改写后**

> 若 `k=10` 有多条记录，锁范围应按 `(k,id)` 的完整顺序推导。范围包括所有匹配记录和组内间隙。两侧扫描到的间隙也需要计入。

### 4. 数据库索引

文件：[index.mdx](../../../docs/basic-knowledge/database/indices/index.mdx)。

分别说明候选路径、成本估算与实测。拆开 B+ 树成本的参考回答。

**改写前**

> 创建索引只提供一条候选路径，MySQL 会根据统计信息估算读取页数、结果行数、回表与排序成本。

**改写后**

> 创建索引只提供一条候选路径。MySQL 会根据统计信息估算读取页数和结果行数。它还会估算回表与排序成本。

**改写前**

> 数据库以页读写，B+ 树内部页集中保存导航项，较高扇出有利于减少定位需要访问的层数；叶子有序，定位后可以继续范围扫描。

**改写后**

> 数据库以页读写，B+ 树内部页集中保存导航项。较高扇出有利于减少定位时访问的层数。叶子有序，定位后可以继续范围扫描。

### 5. 联合索引与覆盖索引

文件：[composite-covering-back-table.mdx](../../../docs/basic-knowledge/database/indices/composite-covering-back-table.mdx)。

拆开覆盖查询的版本检查条件。分别说明索引宽度的收益与成本。

**改写前**

> MVCC 可见性检查仍有聚簇索引访问路径：二级索引记录有删除标记，或所在页由对当前视图而言较新的事务修改时，InnoDB 会访问聚簇记录，必要时通过 undo 重建可见版本。

**改写后**

> MVCC 可见性检查仍有访问聚簇索引的路径。二级索引记录有删除标记时，InnoDB 会访问聚簇记录。若修改该页的事务对当前视图而言较新，也会如此。必要时，InnoDB 通过 undo 重建可见版本。

**改写前**

> 可以通过调整联合索引列顺序和少量加入高频返回列减少回表，但索引越宽，空间、缓存和写入成本越高，所以应结合真实执行计划与查询频率决定。

**改写后**

> 调整联合索引列顺序，或少量加入高频返回列，可以减少回表。但索引越宽，空间、缓存和写入成本越高。因此，应结合真实执行计划与查询频率决定。

### 6. TCP 连接

文件：[tcp_handshake.mdx](../../../docs/basic-knowledge/network/tcp_handshake.mdx)。

拆开状态转换、等待条件和资源处理。保留内核版本与参数取值。

**改写前**

> 常规单方主动关闭过程中，主动关闭者在自己的 FIN 已被确认、又收到对端 FIN 并回复 ACK 后进入 `TIME-WAIT`，等待 `2MSL`。

**改写后**

> 常规单方主动关闭时，主动关闭者需等待自己的 FIN 被确认。它还需收到对端 FIN 并回复 ACK。随后，它进入 `TIME-WAIT`，等待 `2MSL`。

**改写前**

> Linux 监听 socket 有两个阶段的排队：SYN 半连接队列保存尚未完成握手的请求，accept 全连接队列保存已完成握手、等待应用 `accept()` 取走的连接。

**改写后**

> Linux 监听 socket 有两个阶段的排队。SYN 半连接队列保存尚未完成握手的请求。accept 全连接队列保存已完成握手的连接。这些连接等待应用通过 `accept()` 取走。

### 7. MyBatis

文件：[mybatis-mapping-executor-plugins.mdx](../../../docs/basic-knowledge/java/data-access/mybatis-mapping-executor-plugins.mdx)。

按组件职责拆开查询链路。分页与延迟加载分别说明动作和触发条件。

**改写前**

> 调用 Mapper 接口时，动态代理根据接口与方法定位 statement，交给 SqlSession 和 Executor；Executor 在未命中相应缓存后调用 StatementHandler，后者通过 ParameterHandler 绑定 PreparedStatement 参数，执行后由 ResultSetHandler 映射结果。

**改写后**

> 调用 Mapper 接口时，动态代理根据接口与方法定位 statement。代理再将其交给 SqlSession 和 Executor。Executor 未命中相应缓存后，调用 StatementHandler。后者通过 ParameterHandler 绑定 PreparedStatement 参数。执行后，ResultSetHandler 映射结果。

**改写前**

> `association` 或 `collection` 的嵌套 select 对应一个 `ResultLoader`，加载器保存在 `ResultLoaderMap` 中；触发属性读取时，代理执行关联查询并写回该属性。

**改写后**

> `association` 或 `collection` 的嵌套 select 对应一个 `ResultLoader`。这个加载器保存在 `ResultLoaderMap` 中。触发属性读取时，代理执行关联查询并写回该属性。

### 8. 数据库连接池

文件：[connection-pool-capacity-timeout-leaks.mdx](../../../docs/basic-knowledge/java/data-access/connection-pool-capacity-timeout-leaks.mdx)。

拆开容量、超时与资源归还的长句。FastList 改为动作和原因的短句。

**改写前**

> **FastList**：针对连接代理跟踪 Statement 的场景省去已由内部逻辑保证的范围检查，删除时从尾部查找，适配后创建的 Statement 先关闭的访问顺序。

**改写后**

> **FastList**：连接代理用它记录打开的 Statement。内部逻辑已保证下标有效，因此它去掉了下标范围检查。删除时，它从尾部开始查找。后创建的 Statement 通常先关闭，这样更容易找到目标。

**改写前**

> JDBC `Statement.setQueryTimeout` 约束语句执行，但驱动如何取消、网络异常多久返回，以及数据库是否终止工作，需要按驱动与数据库验证；

**改写后**

> JDBC `Statement.setQueryTimeout` 约束语句执行。驱动如何取消、网络异常多久返回，需要按驱动与数据库验证。还要验证数据库是否终止工作。

## 验证

- 指定 8 篇的 `--style-strict` 检查通过。结构问题和文风提示均为零。
- `npm run build` 通过，退出码为 0。链接与复习资源检查通过，静态文件生成成功。
- 与 HEAD 比对，8 篇的 front matter、显式锚点和完整链接均保持不变。代码块与来源注释也保持不变。
- 另行检查了标题、表格单元格和“相关内容”中的句长。
- `git diff --check` 通过。

全站检查仍报告本批之外的存量问题。其中 6 篇有结构问题，260 篇有文风提示。构建另有博客作者、摘要、localStorage 和更新检查提示。这些提示未阻断构建，本批未处理。
