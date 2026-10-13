# 文章格式审计：batch-1b

日期：2026-10-13。分支：`content/article-format-2026-10-13`。

本批完成指定 8 篇文章的表达优化，新增 9 道本站原理自测；索引设计、聚簇索引、B+ 树只调整分工、重复正文与链接。未提交 git。

## 表达与标识

- 完整阅读根目录 AGENTS.md，按确定结论、具体适用条件改写；删除兜底限定和连续否定，将普通二、三级标题改为概念或机制名称，面试题保留完整问句。
- 面试核心使用可复述的技术结论；参考回答首句直接回答，涉及提交刷盘、回滚范围、分页、延迟加载和 TCP 复用时写出参数与取值。
- 8 篇文章的本站自测注释统一为 `<!-- 本题为本站原理自测，尚未核验对应公司面经，不作公司归属。 -->`，参考资料整理为连续列表。
- 与 HEAD 逐文件比较：11 篇改动文章的 knowledge.id、全部已有显式锚点和卡片 ID 均保留；没有删除或合并卡片，没有新增公司归属。
- 指定 8 篇的所有二、三级标题都有显式锚点，编号连续。新增正文锚点使用中文标题文字；新增卡片 ID 使用英文。

## 每篇改动与依据

### 1. 数据库事务

文件：[index.mdx](../../../docs/basic-knowledge/database/transaction/index.mdx)。

负责 ACID、隔离级别、事务边界和持久性，MVCC 与锁机制改为结论加相邻文章链接。补入默认 RR 的 statement binlog 历史背景及并发重放示例；解释“双 1”、组提交、0/2 刷盘策略和提交断线结果确认。

新增题：`rr-binlog-history`、`double-one-durability`。

依据：[MySQL 5.7 Replication Formats](https://dev.mysql.com/doc/mysql-replication-excerpt/5.7/en/replication-formats.html)、[MySQL 8.4 Setting The Binary Log Format](https://dev.mysql.com/doc/refman/8.4/en/binary-log-setting.html)、[Locks Set by Different SQL Statements](https://dev.mysql.com/doc/refman/8.4/en/innodb-locks-set.html)、[innodb_flush_log_at_trx_commit](https://dev.mysql.com/doc/refman/8.4/en/innodb-parameters.html#sysvar_innodb_flush_log_at_trx_commit)、[sync_binlog](https://dev.mysql.com/doc/refman/8.4/en/replication-options-binary-log.html#sysvar_sync_binlog)。已加入或保留于文章参考资料。

历史原因按官方格式历史与锁机制解释为兼容性背景，明确区分该解释与“唯一历史原因”；MySQL 8.4 默认 ROW 的事实单独说明。

### 2. MVCC

文件：[mvcc-read-view-consistent-read.mdx](../../../docs/basic-knowledge/database/transaction/mvcc-read-view-consistent-read.mdx)。

负责 undo 版本链、Read View、快照时机和混合读写可见性；范围锁机制引用锁文章。补充 A 建立空快照、B 插入并提交、A 更新该新行、普通 SELECT 读到自身新版本的双会话步骤，明确 Read View 保持不变。

新增题：`rr-update-new-row`。

依据：[MySQL 8.4 Consistent Nonlocking Reads](https://dev.mysql.com/doc/refman/8.4/en/innodb-consistent-read.html)、[InnoDB Multi-Versioning](https://dev.mysql.com/doc/refman/8.4/en/innodb-multi-versioning.html)、[ReadView 源码](https://github.com/mysql/mysql-server/blob/mysql-8.4.0/storage/innobase/include/read0types.h)。这些来源已在原参考资料中保留。

### 3. InnoDB 锁

文件：[innodb-locking-ranges.mdx](../../../docs/basic-knowledge/database/transaction/innodb-locking-ranges.mdx)。

负责锁类型、锁范围和验证方法；快照与失败边界链接至对应文章。新增数据为 5、10、15、20 的唯一二级索引、非唯一二级索引和主键对照，解释等值扫描末端间隙、范围扫描上界记录及 `(索引列,主键)` 的顺序。给出 data_locks SQL、锁模式解释和双会话阻塞验证步骤。

新增题：`secondary-range-locks`。

依据：[MySQL 8.4 InnoDB Locking](https://dev.mysql.com/doc/refman/8.4/en/innodb-locking.html)、[Locks Set by Different SQL Statements](https://dev.mysql.com/doc/refman/8.4/en/innodb-locks-set.html)、[data_locks](https://dev.mysql.com/doc/refman/8.4/en/performance-schema-data-locks-table.html)。这些来源已在原参考资料中保留。具体区间同时经过 MySQL 8.4.11 实验。

### 4. 数据库索引

文件：[index.mdx](../../../docs/basic-knowledge/database/indices/index.mdx)。

保留索引分类、维护成本、优化器路径选择与执行证据；B+ 树结构、聚簇键选择、回表、联合索引推演和索引设计流程缩为结论加链接。原有卡片全部保留，参考回答改为先给结论。

新增题：无。

依据沿用：[Optimization and Indexes](https://dev.mysql.com/doc/refman/8.4/en/optimization-indexes.html)、[Clustered and Secondary Indexes](https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html)、[EXPLAIN Output Format](https://dev.mysql.com/doc/refman/8.4/en/explain-output.html)。

### 5. 联合索引与覆盖索引

文件：[composite-covering-back-table.mdx](../../../docs/basic-knowledge/database/indices/composite-covering-back-table.mdx)。

保留有序前缀、回表、覆盖、ICP 和排序的查询推演；聚簇键维护与索引审查流程改为引用。将范围后的列如何参与过滤、覆盖查询的 MVCC 条件和 LIMIT 扫描量写成具体结论。

新增题：无。

依据沿用：[Multiple-Column Indexes](https://dev.mysql.com/doc/refman/8.4/en/multiple-column-indexes.html)、[Range Optimization](https://dev.mysql.com/doc/refman/8.4/en/range-optimization.html)、[Index Condition Pushdown](https://dev.mysql.com/doc/refman/8.4/en/index-condition-pushdown-optimization.html)、[ORDER BY Optimization](https://dev.mysql.com/doc/refman/8.4/en/order-by-optimization.html)、[InnoDB Multi-Versioning](https://dev.mysql.com/doc/refman/8.4/en/innodb-multi-versioning.html)。

### 6. TCP 连接

文件：[tcp_handshake.mdx](../../../docs/basic-knowledge/network/tcp_handshake.mdx)。

补充 SYN 队列、accept 队列、listen backlog 与 somaxconn 的关系；解释连接复用优先、TIME_WAIT 的实际资源压力、Linux 6.6 tcp_tw_reuse 取值与时间戳条件、新内核 tcp_tw_reuse_delay 边界及 tcp_tw_recycle 在 4.12 移除。保留握手与挥手图。

新增题：`listen-queues-backlog`、`time-wait-reuse`。

新增依据：[listen(2)](https://man7.org/linux/man-pages/man2/listen.2.html)、[IP Sysctl](https://docs.kernel.org/networking/ip-sysctl.html)、[Linux 6.6 IP Sysctl](https://www.kernel.org/doc/html/v6.6/networking/ip-sysctl.html)、[Linux 6.6 tcp_twsk_unique 源码](https://github.com/torvalds/linux/blob/v6.6/net/ipv4/tcp_ipv4.c)、[tcp(7)](https://man7.org/linux/man-pages/man7/tcp.7.html)、[SNMP counters](https://docs.kernel.org/networking/snmp_counter.html)。均加入文章参考资料。

### 7. MyBatis

文件：[mybatis-mapping-executor-plugins.mdx](../../../docs/basic-knowledge/java/data-access/mybatis-mapping-executor-plugins.mdx)。

补充 PageHelper 6.1.1 对 Executor.query 的拦截、count/方言分页 SQL、BoundSql 参数与 CacheKey、ThreadLocal 清理；补充 MyBatis 3.5.19 的 Javassist 结果代理、ResultLoader、按属性与整体触发、日志/序列化触发和离开原 Executor 后的查询边界。批处理、缓存和 Spring Session 的回答改为直接结论。

新增题：`pagehelper-rewrite`、`lazy-loading-triggers`。

依据：[MyBatis Configuration](https://mybatis.org/mybatis-3/configuration.html)、[PageInterceptor](https://github.com/pagehelper/Mybatis-PageHelper/blob/v6.1.1/src/main/java/com/github/pagehelper/PageInterceptor.java)、[ExecutorUtil](https://github.com/pagehelper/Mybatis-PageHelper/blob/v6.1.1/src/main/java/com/github/pagehelper/util/ExecutorUtil.java)、[MySqlDialect](https://github.com/pagehelper/Mybatis-PageHelper/blob/v6.1.1/src/main/java/com/github/pagehelper/dialect/helper/MySqlDialect.java)、[PageHelper 使用方法](https://github.com/pagehelper/Mybatis-PageHelper/blob/v6.1.1/wikis/zh/HowToUse.md)、[JavassistProxyFactory](https://github.com/mybatis/mybatis-3/blob/mybatis-3.5.19/src/main/java/org/apache/ibatis/executor/loader/javassist/JavassistProxyFactory.java)、[ResultLoader](https://github.com/mybatis/mybatis-3/blob/mybatis-3.5.19/src/main/java/org/apache/ibatis/executor/loader/ResultLoader.java)。已加入或保留于文章参考资料，并读取源码核对调用位置。

### 8. 数据库连接池

文件：[connection-pool-capacity-timeout-leaks.mdx](../../../docs/basic-knowledge/java/data-access/connection-pool-capacity-timeout-leaks.mdx)。

明确容量、获取超时、查询超时、生命周期和泄漏检测的作用；补充 ConcurrentBag 的 ThreadLocal/CAS/直接交接、热点字节码与 JIT 内联、FastList 的 Statement 跟踪优化。将性能结论限定在池自身开销。

新增题：`hikaricp-performance`。

新增依据：[HikariCP Down the Rabbit Hole](https://github.com/brettwooldridge/HikariCP/wiki/Down-the-Rabbit-Hole)、[HikariCP 5.1.0 ConcurrentBag](https://github.com/brettwooldridge/HikariCP/blob/HikariCP-5.1.0/src/main/java/com/zaxxer/hikari/util/ConcurrentBag.java)。均加入参考资料；没有新增性能倍数或未经实测的吞吐承诺。

## 相邻文章去重

- [索引设计](../../../docs/basic-knowledge/database/indices/index-review.mdx)：保留 users 示例及后续设计、计划验证流程；删除重复的存储结构、B+ 树和最左前缀展开，链接到负责文章。
- [聚簇索引](../../../docs/basic-knowledge/database/indices/clustered_index/index.mdx)：保留行组织、聚簇键选择和维护成本；回表、覆盖与 MVCC 检查正文改为结论加链接。
- [B+ 树](../../../docs/basic-knowledge/database/indices/b_plus_tree/index.mdx)：保留结构、导航与再平衡；叶子存储分工和 SQL 成本判断改为相邻文章引用。

三篇均保留已有章节、显式 ID、兼容 span 和卡片；未进行额外文风清理。

## 验证

使用本地已有官方 `mysql:8.4` 镜像运行临时容器，实际版本 **8.4.11**；无主机端口、无外部网络，数据在 tmpfs，测试后停止并自动移除。

| RR 查询 | data_locks 中关键锁 | 另一个会话插入 12 | 同索引锁定 15 |
| --- | --- | --- | --- |
| 非唯一 `k=10` | nk：`X / 10,10`、`X,GAP / 15,15`；PRIMARY：`X,REC_NOT_GAP / 10` | 超时 1205 | 成功 |
| 唯一二级索引 `u>5 AND u<15` | uk：`X / 10,10`、`X / 15,15`；PRIMARY：`X,REC_NOT_GAP / 10` | 超时 1205 | 超时 1205 |
| 非唯一二级索引 `k>5 AND k<15` | nk：`X / 10,10`、`X / 15,15`；PRIMARY：`X,REC_NOT_GAP / 10` | 超时 1205 | 超时 1205 |
| 主键 `id>5 AND id<15` | PRIMARY：`X / 10`、`X,GAP / 15` | 超时 1205 | 成功 |

所有查询另有表级 IX。各轮固定索引并单独回滚，锁等待超时设为 1 秒。

MVCC 实验断言通过：A 首次与 B 插入后的普通查询均为空；A 的 UPDATE 影响 1 行；后续 SELECT 返回 `(2,201)`；A 回滚后 B 查询仍为 `(2,200)`。

要求的检查均通过：

```sh
node scripts/check-article-format.mjs --style-strict -- \
  docs/basic-knowledge/database/transaction/index.mdx \
  docs/basic-knowledge/database/transaction/mvcc-read-view-consistent-read.mdx \
  docs/basic-knowledge/database/transaction/innodb-locking-ranges.mdx \
  docs/basic-knowledge/database/indices/index.mdx \
  docs/basic-knowledge/database/indices/composite-covering-back-table.mdx \
  docs/basic-knowledge/network/tcp_handshake.mdx \
  docs/basic-knowledge/java/data-access/mybatis-mapping-executor-plugins.mdx \
  docs/basic-knowledge/java/data-access/connection-pool-capacity-timeout-leaks.mdx
npm run build
git diff --check
```

- 严格格式检查：8 篇，0 篇结构问题，0 篇文风提示。
- 构建：文档链接、复习资源、岗位与面经数据检查通过，Docusaurus 生成静态文件成功。
- 全仓库非阻断格式检查仍有本批之外 6 篇结构问题、195 篇文风提示；另有已有博客作者、摘要、Node localStorage 与 Docusaurus 更新检查提示，未扩大任务范围处理。

## 未完成与人工确认

无阻塞事项。锁区间与 MVCC 新例已实测；MyBatis、PageHelper、HikariCP 和 Linux 新增机制经过官方文档与源码核对，本批未建立 Java 集成测试、连接池基准测试或修改主机网络参数。RR 历史背景的证据边界已在正文说明，未把推导写成官方对唯一设计动机的断言。
