# Claude 校验 · 第 16 批（2026-10-29）

范围：NoSQL 首页和 Redis 栏目 8 篇，共 9 篇。校验后直接修改，Lin 的审阅异步进行。

校验项：

1. 技术事实与版本基线（文中注明的 Redis 6、7）。
2. 实现细节：逐条对照 Redis 官方文档和 6.2/7.0 的 `redis.conf`。本来准备在本地 Redis 7 容器里实测，但这次 Docker 引擎没有响应（`docker ps` 卡住）。重启 OrbStack 会影响机器上的其他容器，所以没有重启，这一批没有实测。下面列出的断言都依据文档和配置文件。
3. 与相邻文章是否矛盾，站内锚点是否存在：95 个站内链接都存在。
4. 参考资料：52 个外部链接都返回对应页面。其中 1 个是 MySQL 参考手册，第 15 批已经确认过。

## 结论

| 文章 | 结论 | 修改 |
| --- | --- | --- |
| [NoSQL 数据库](../../docs/basic-knowledge/nosql/index.mdx) | ✅ 通过 | — |
| [Redis](../../docs/basic-knowledge/nosql/redis/index.mdx) | ✅ 已修改 | 面试核心条目格式 |
| [Redis 数据结构](../../docs/basic-knowledge/nosql/redis/data_structure.mdx) | ✅ 通过 | — |
| [Redis 过期](../../docs/basic-knowledge/nosql/redis/expiration.mdx) | ✅ 通过 | — |
| [Redis 内存淘汰](../../docs/basic-knowledge/nosql/redis/eviction.mdx) | ✅ 通过 | — |
| [Redis 持久化、复制与集群](../../docs/basic-knowledge/nosql/redis/persistence.mdx) | ✅ 通过 | — |
| [缓存一致性](../../docs/basic-knowledge/nosql/redis/cache-patterns-consistency.mdx) | ✅ 通过 | — |
| [缓存穿透、击穿、雪崩与热点 Key](../../docs/basic-knowledge/nosql/redis/cache-penetration-stampede-avalanche-hotkeys.mdx) | ✅ 通过 | — |
| [分布式锁](../../docs/basic-knowledge/nosql/redis/distributed-lock-conditions-boundaries.mdx) | ✅ 通过 | — |

## 修改内容

### Redis（面试核心）

五条核心以「**低延迟机制。**」这类加粗小标题开头，已改为句中加粗。第二条的原文是「I/O 线程可分担网络工作」，改为「命令仍由主线程串行执行，I/O 线程只分担网络读写」，意思不变，但更直接地回答「Redis 是不是单线程」这个常见追问。

和数据库索引那几篇一样，Redis 首页的正文也是短句堆叠，读起来比其他 Redis 文章生硬。这次没有重写，建议 Lin 审阅时一并考虑做文风修订。

## 已验证的断言（依据官方文档与配置文件）

- 事务：入队阶段出错（如参数个数错误）时，EXEC 返回 `EXECABORT`，整队不执行；执行阶段出错只影响该命令。Redis 6.0.9 起，被监视的键过期或被淘汰都会让 EXEC 放弃事务。
- 版本特性：
  - `SET ... KEEPTTL` 自 6.0 起提供，`EXPIRE` 的 `NX/XX/GT/LT` 自 7.0 起提供，`GT/LT` 把没有期限的键视为无限远。
  - `BLMOVE`、`XAUTOCLAIM` 自 6.2 起提供，`WAITAOF` 自 7.2 起提供，`UNLINK` 自 4.0 起提供。
  - 服务端辅助的客户端缓存自 6.0 起提供。
- 编码：List 的 QuickList 块从 ZipList（Redis 6）改为 Listpack（7.0）；Hash、ZSet 的紧凑编码同样在 7.0 换成 Listpack；Set 在 7.2 增加 listpack 编码；Hash 字段级 TTL 不在 6/7.0 的范围内。
- 默认值：`maxmemory-samples` 为 5，`aof-use-rdb-preamble` 为 yes，八种淘汰策略与文中列表一致。
- Redis 7.0 起 AOF 由基础文件、增量文件和 manifest 组成。
- Cluster 共 16384 个槽，`MOVED` 与 `ASK` 的含义与文中一致。
- HyperLogLog 标准误差约 0.81%；`BF.*` 命令来自 RedisBloom 模块。

下一批：中间件（6 篇）。
