# Claude 校验 · 第 9 批（2026-10-29）

范围：Java 数据访问（6 篇，含栏目首页）和 Java API 与测试（6 篇，含栏目首页）两个栏目。校验后直接修改，Lin 的审阅异步进行。

校验项：

1. 技术事实与版本基线。数据访问以文中注明的 HikariCP 5.1、MyBatis 3.5.19、PageHelper 6.1.1、Hibernate 5.6/6.x、Jakarta Persistence 3.1、MySQL 8.0 为准；测试以 JUnit 5.13.4、Mockito 5.20.0、Testcontainers 1.21.3 为准。
2. 实现细节：这两个栏目依赖第三方框架，没有在本地搭建应用运行。框架行为逐条对照对应版本的源码和官方文档：
   - HikariCP：README 的参数说明。
   - MyBatis 3.5.19：`Configuration`、`BatchExecutor`、`ResultLoader` 源码。
   - PageHelper 6.1.1：`PageInterceptor`、`ExecutorUtil`、`MySqlDialect` 源码。
   - Jakarta Persistence 3.1：规范原文。
   - JUnit、Mockito、JaCoCo、PIT：官方文档。
   
   分页相关的执行计划在 MySQL 8.4.11 容器里实测，用的是 30 万行的表。
3. 与相邻文章是否矛盾，站内锚点是否存在：141 个站内链接都存在。
4. 参考资料：57 个外部链接都返回对应页面。MySQL 文档对脚本返回 403，用浏览器方式取回标题正常。

## 结论

| 文章 | 结论 | 修改 |
| --- | --- | --- |
| [Java 数据访问（栏目首页）](../../docs/basic-knowledge/java/data-access/index.mdx) | ✅ 通过 | — |
| [数据库连接池](../../docs/basic-knowledge/java/data-access/connection-pool-capacity-timeout-leaks.mdx) | ✅ 通过 | — |
| [MyBatis](../../docs/basic-knowledge/java/data-access/mybatis-mapping-executor-plugins.mdx) | ✅ 通过 | — |
| [JPA](../../docs/basic-knowledge/java/data-access/jpa-entity-states-dirty-checking-lazy-loading.mdx) | ✅ 通过 | — |
| [N+1 查询](../../docs/basic-knowledge/java/data-access/n-plus-one-fetch-strategies.mdx) | ✅ 通过 | — |
| [批处理与分页](../../docs/basic-knowledge/java/data-access/batching-pagination-data-access-tests.mdx) | ✅ 已修改 | Keyset 主示例用了 MySQL 不走范围扫描的元组比较 |
| [Java API 与测试（栏目首页）](../../docs/basic-knowledge/java/quality/index.mdx) | ✅ 通过 | — |
| [Java API 设计](../../docs/basic-knowledge/java/quality/api-design-from-invariants.mdx) | ✅ 通过 | — |
| [不可变对象](../../docs/basic-knowledge/java/quality/immutable-objects-defensive-copying.mdx) | ✅ 通过 | — |
| [JUnit](../../docs/basic-knowledge/java/quality/junit-assertions-parameterized-tests.mdx) | ✅ 通过 | — |
| [测试替身](../../docs/basic-knowledge/java/quality/test-doubles-mock-stub-boundaries.mdx) | ✅ 通过 | — |
| [测试金字塔](../../docs/basic-knowledge/java/quality/test-pyramid-contract-regression.mdx) | ✅ 通过 | — |

## 修改内容

### 批处理与分页（第 8、9 节）

原文第 8 节的 Keyset 示例写成 `where (created_at, id) < (:lastCreatedAt, :lastId)`。第 9 节只提了一句「MySQL 8.0 能不能用好索引，要看执行计划」，并给出展开写法作对照。

在 MySQL 8.4.11 上实测。表 `orders` 有 30 万行，索引为 `(created_at, id)`，游标取在中间位置：

| 写法 | `EXPLAIN ANALYZE` 结果 |
| --- | --- |
| 元组比较 `(created_at, id) < (...)` | `Covering index scan … (reverse)` 加 `Filter`，读了 170,421 个索引项才返回 20 行，耗时 30.5 ms |
| 展开写法 `created_at < :t OR (created_at = :t AND id < :id)` | `Covering index range scan … over (...)`，读 20 行，耗时 1.4 ms |

MySQL 官方文档「Row Constructor Expression Optimization」一节也说明：行构造器形式可能用不全索引，建议改写成非构造器形式。读者照原文的主示例写，在 MySQL 上越往后翻页越慢，又回到深 Offset 的问题。

修改方式：

- 第 8 节的主示例改为展开写法。
- 第 9 节说明元组写法语义相同，但 MySQL 对它的优化有限，并写出实测结论。
- 第 9 节建议在 MySQL 上用展开写法，换数据库或升级版本时再看执行计划。

同一次实测还确认了文中关于 Offset 的说法：

- `limit 20 offset 200000` 走覆盖索引倒序扫描，读了 200,020 个索引项。
- 查询需要非索引列时，变成全表扫描加排序，耗时 128 ms。
- 先在子查询里用覆盖索引分页取 id，再关联取详情，耗时降到 29.6 ms，但仍要扫描 200,020 个索引项。

## 已验证的断言

数据库连接池（HikariCP README）：

- `maxLifetime`：使用中的连接不会被淘汰，归还后才移除；应比基础设施的连接时限短几秒。
- `keepaliveTime` 必须小于 `maxLifetime`，只对空闲连接执行；检查方式为 JDBC4 `isValid()` 或 `connectionTestQuery`。
- `minimumIdle` 默认等于 `maximumPoolSize`；`connectionTimeout` 最小 250 ms；`leakDetectionThreshold` 只记录日志。

MyBatis 3.5.19 与 PageHelper 6.1.1（源码）：

- 默认 `ExecutorType.SIMPLE`、`localCacheScope=SESSION`、`cacheEnabled=true`、`proxyFactory` 为 `JavassistProxyFactory`，`aggressiveLazyLoading` 默认 false。
- `BatchExecutor` 的更新返回 `BATCH_UPDATE_RETURN_VALUE`（`Integer.MIN_VALUE + 1002`），`doQuery` 和 `doQueryCursor` 先调用 `flushStatements()`。
- `ResultLoader` 在线程不同或原 `Executor` 已关闭时新建 `Executor`。
- `PageInterceptor` 拦截 `Executor.query` 的四参数和六参数重载；分页查询传 `RowBounds.DEFAULT`；`MySqlDialect` 第一页生成 `LIMIT ?`，之后生成 `LIMIT ?, ?`。

JPA、Hibernate 与测试框架（官方文档）：

- 对照规范：COMMIT 模式下提交前的查询可见性未作规定；`ManyToOne`、`OneToOne` 默认 EAGER；`orphanRemoval` 适用于 `OneToOne` 和 `OneToMany`；fetchgraph 与 loadgraph 对图外属性的处理不同。
- JUnit：`assertTimeout` 在调用线程执行，`assertTimeoutPreemptively` 在另一线程执行，文档提示它会让 Spring 测试事务失效；`PER_METHOD` 下本类的 `@MethodSource` 工厂方法必须是 `static`。
- Mockito：`any(Class)` 不匹配 `null`。
- JaCoCo：一行只要有一条指令执行就计为已执行；异常处理不计入分支。

下一批：Java 算法（6 篇），之后是 Spring（19 篇）。
