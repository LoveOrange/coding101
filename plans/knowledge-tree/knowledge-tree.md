# Coding 101 知识树（第二版）

本文是知识树的规划总表，按 **领域 → Topic → 文章** 三层组织，覆盖后端（Java、Go、Python）、前端（含 Node.js）、AI 应用与 Agent、大数据、运维与云原生，并通过下列分纲扩展移动端与测试开发。站点“知识树”页面由 [`src/data/knowledgeTree.ts`](../../src/data/knowledgeTree.ts) 编排，本文额外保留规划文章、优先级和关联关系。本地接入与线上发布分别验收，不能仅凭规划标记判断发布状态。

校招扩展分纲：[前端](./frontend-campus.md)、[移动端](./mobile-campus.md)、[测试开发](./testing-campus.md)、[Go 后端](./go-campus.md)。四份分纲保留文章标准标题、规划路径、前置与停止条件；本次细化范围以分纲为准，旧列表中的括号仅表示讲解范围，不直接作为新文章标题。本轮新文与四条路线的源码、本地浏览器验收已接受，存量范围与缺口工作尚未全部完成；完整站点构建已通过，正式发布尚未执行。状态及研究材料存放安排见[四方向扩展进度与研究口径](./campus-expansion-progress.md)。

第一版按方向拆成多份分纲（[README](./README.md)），其中的停止条件、面经频率和 M1 知识点清单继续有效；本文取代它们的**领域与 Topic 划分**。

## 0. 读法与标记

**层级含义**

- **领域**：一类岗位共同复习的大块知识，例如“数据库”“系统设计”“Go”。
- **Topic**：领域内一组相互支撑、通常放在一起复习的文章，例如“索引”“事务与锁”。Topic 的边界由知识归属和复习关系决定，不按文章数量拆分或凑数。
- **文章**：一个可以独立命名的概念；篇幅由面试所需的机制、示例、追问和边界决定。

**标记**

| 标记 | 含义 |
| --- | --- |
| ✅ | 已有正文（含合篇待拆的文章） |
| ⬜ | 待写 |
| ★ | 必会：目标岗位第一轮复习的最小集合 |
| （无） | 常考：核心掌握后补充 |
| ☆ | 按岗选学：JD、项目或面试方向明确涉及时再读 |
| `↔ 文章` | 关联文章，正文中用双向链接互相引用；只标最需要跳转的 1—3 个 |
| `← 文章` | 前置：不先读它，本文的关键结论难以理解 |
| 〔…〕 | Topic 适用岗位：后端、Java、Go、Py、前端、Node、AI、大数据、运维；“通用”指所有技术岗 |

优先级默认面向 Topic 所标岗位；同一文章对不同岗位的优先级差异写在第 21 节的岗位路径中。

**取舍原则**

1. 面试基本不问、也不影响理解后续内容的知识不进入知识树，例如与岗位无关的编译器优化细节、指令集大全、具体云厂商控制台操作。编译链接和指令执行只保留已确认岗位所需的基础。
2. 面试不常直接问、但后续内容依赖它的基础知识保留，标为前置。例如“CPU 缓存”很少单独考，但它是 `volatile`、伪共享和 Go/Java 内存模型的前置。
3. 每个概念只在一个 Topic 下维护正文，其他位置通过 `↔` 引用。例如“零拷贝”归操作系统，Kafka、Java NIO 和 Netty 只引用。

---

## 1. 数据结构与算法

〔通用〕编码面试的基础。语言实现差异写在各语言领域，这里只讲结构、不变量和模式。

### 1.1 复杂度与正确性

- ✅ ★ 算法复杂度
- ✅ ★ 算法正确性（反例、边界、对拍）
- ✅ ★ 递归 ↔ 回溯、二叉树

### 1.2 线性结构与哈希

- ✅ ★ 数组 ↔ ArrayList、Go 切片
- ✅ ★ 链表 ↔ LinkedList
- ✅ ★ 栈
- ✅ ★ 队列
- ✅ [并发队列](../../docs/basic-knowledge/data-structures/concurrent-queues.mdx) ↔ 原子操作、线性化与槽位复用
- ✅ ★ 哈希表 ↔ HashMap、Go map、Python dict
- ⬜ 单调栈与单调队列（下一个更大元素、滑动窗口最值）
- ⬜ ☆ 跳表 ↔ Redis 底层编码
- ⬜ ☆ 位图
- ✅ ☆ 布隆过滤器 ↔ 缓存穿透、LSM 树

### 1.3 树与图

- ✅ ★ 二叉树
- ✅ ★ 二叉搜索树
- ✅ ★ 堆（Top K、合并 K 路） ↔ PriorityQueue
- ✅ ★ 图
- ⬜ 平衡树与红黑树（只讲性质和用途） ↔ TreeMap、HashMap 树化
- ⬜ 字典树（Trie） ↔ 搜索建议系统
- ⬜ 并查集
- ⬜ ☆ 拓扑排序与最短路径 ↔ 前端构建依赖图、任务调度 DAG
- ⬜ ☆ LRU 与 LFU 缓存实现 ↔ LinkedHashMap、Redis 内存淘汰

### 1.4 算法模式

- ✅ ★ 二分查找
- ✅ ★ 双指针
- ✅ ★ 滑动窗口
- ✅ ★ 前缀和（含差分）
- ✅ ★ 排序（快排、归并、堆排序、稳定性）
- ✅ ★ 树与图搜索（DFS、BFS）
- ✅ ★ 回溯
- ✅ ★ 贪心
- ✅ ★ 动态规划
- ⬜ 区间问题（合并、调度、扫描线）
- ⬜ ☆ 位运算
- ✅ ☆ [分治算法](../../docs/basic-knowledge/algorithms/divide-and-conquer.mdx)
- ✅ ☆ [整数运算](../../docs/basic-knowledge/algorithms/integer-arithmetic.mdx)
- ✅ ☆ [随机算法](../../docs/basic-knowledge/algorithms/randomized-algorithms.mdx)
- ✅ ☆ [流式统计](../../docs/basic-knowledge/algorithms/streaming-statistics.mdx)

---

## 2. 操作系统

〔后端 运维 Node〕程序运行时的资源模型。Linux 命令与排查归第 19 节“运维与云原生”。

### 2.1 进程与线程

- ✅ ★ 进程与线程 ↔ Java 线程、goroutine
- ✅ [系统调用](../../docs/basic-knowledge/operating-system/system-calls.mdx)
- ✅ [线程池](../../docs/basic-knowledge/operating-system/thread-pools.mdx)
- ⬜ ★ 进程调度与上下文切换 ↔ 锁竞争、GMP 调度
- ⬜ 进程间通信（管道、信号、共享内存、Socket）
- ⬜ 协程 ↔ goroutine、虚拟线程、asyncio
- ⬜ ☆ 僵尸进程与孤儿进程 ↔ Linux 进程管理

### 2.2 同步与死锁

- ✅ ★ 线程同步（互斥锁、条件变量、信号量） ↔ synchronized、Go sync 包
- ✅ ★ 死锁 ↔ 数据库死锁、并发活跃性
- ⬜ 自旋锁与无锁 ↔ CAS、锁与无锁

### 2.3 内存管理

- ✅ ★ 虚拟内存（分页、缺页、TLB）
- ⬜ 页面置换算法 ↔ LRU 与 LFU 缓存实现
- ⬜ 进程内存布局与内存分配（栈、堆、mmap） ↔ JVM 运行时数据区域、Go 内存分配
- ⬜ CPU 缓存与伪共享（前置） ↔ volatile、Java 内存模型

### 2.4 文件与 I/O

- ✅ ★ 文件描述符
- ✅ ★ I/O 模型（阻塞、非阻塞、同步、异步）
- ✅ ★ I/O 多路复用（select、poll、epoll） ↔ Java NIO、Node.js 事件循环、Redis 线程模型
- ✅ 零拷贝（mmap、sendfile） ↔ Kafka 高性能、Java NIO
- ✅ [磁盘调度](../../docs/basic-knowledge/operating-system/disk-scheduling.mdx)
- ⬜ 页缓存与文件系统（inode、硬链接、fsync） ↔ redo log、Kafka 存储
- ⬜ ☆ Reactor 与 Proactor ↔ Netty、Node.js 事件循环

---

## 3. 计算机网络

〔通用〕前端更偏 HTTP、缓存与安全，后端与运维更偏 TCP 和排查。

### 3.1 网络模型与 IP

- ✅ ★ 网络模型（OSI、TCP/IP）
- ✅ IP（地址、子网、路由）
- ✅ [ARP](../../docs/basic-knowledge/network/arp.mdx) ↔ Kubernetes 网络
- ✅ [DHCP](../../docs/basic-knowledge/network/dhcp.mdx)
- ⬜ NAT ↔ Kubernetes 网络
- ⬜ ★ 从输入 URL 到页面展示（串联 DNS、TCP、TLS、HTTP、渲染） ↔ 浏览器渲染流程

### 3.2 TCP 与 UDP

- ✅ ★ TCP 与 UDP
- ✅ ★ TCP 连接（三次握手、四次挥手、TIME_WAIT）
- ⬜ ★ TCP 可靠传输（序号、确认、重传）
- ⬜ TCP 流量控制与拥塞控制
- ⬜ TCP 粘包与半包（消息边界） ↔ RPC
- ⬜ ☆ TCP 连接排查（半连接队列、CLOSE_WAIT 堆积） ↔ Linux 网络排查

### 3.3 HTTP

- ✅ ★ HTTP（方法、状态码、版本与连接复用）
- ✅ ★ HTTP 缓存 ↔ CDN、浏览器存储
- ✅ [文件上传](../../docs/basic-knowledge/network/file-upload.mdx) ↔ 对象存储、幂等键
- ⬜ HTTP/2 与 HTTP/3（多路复用、QUIC）
- ⬜ ★ Cookie 与 Session ↔ Session、JWT、OAuth 2.0 与 OIDC
- ✅ [WebSocket](../../docs/basic-knowledge/network/websocket.mdx) ↔ 即时消息系统
- ✅ [Server-Sent Events](../../docs/basic-knowledge/network/server-sent-events.mdx) ↔ 流式输出、即时消息系统

### 3.4 HTTPS 与 DNS

- ✅ ★ TLS（握手、证书链、前向保密） ↔ 对称与非对称加密
- ✅ ★ DNS ↔ 服务发现
- ✅ [CDN](../../docs/basic-knowledge/network/cdn.mdx) ↔ HTTP 缓存、前端部署

### 3.5 RPC

- ✅ RPC（序列化、Netty 事件循环）
- ✅ [gRPC](../../docs/basic-knowledge/network/grpc.mdx) ↔ Go 微服务
- ⬜ ☆ 序列化协议（JSON、Protobuf、Hessian 的取舍） ↔ Java 序列化

### 3.6 邮件协议

- ✅ [邮件协议](../../docs/basic-knowledge/network/email-protocols.mdx) ↔ DNS、TLS、重试与幂等性

### 3.7 API 设计

- ✅ [GraphQL](../../docs/basic-knowledge/network/graphql.mdx)

---

## 4. 数据库

〔后端 大数据〕以 MySQL InnoDB 为默认实现，其他数据库的差异单独成篇。

### 4.1 SQL

- ✅ ★ SQL 查询
- ✅ ★ SQL 连接
- ✅ ★ SQL 聚合
- ⬜ 子查询与 CTE
- ⬜ ★ 窗口函数 ↔ Hive SQL 与数据倾斜（大数据岗必会）
- ⬜ NULL 的三值逻辑

### 4.2 数据建模

- ✅ ★ [数据建模](../../docs/basic-knowledge/database/modeling/index.mdx)
- ✅ 数据约束
- ⬜ 范式与反范式 ↔ 维度建模
- ✅ ☆ MySQL 数据类型 ↔ BigDecimal

### 4.3 索引

- ✅ ★ 数据库索引
- ✅ ★ B+ 树 ← 二叉搜索树
- ✅ ★ 聚簇索引
- ✅ ★ 联合索引与覆盖索引（最左前缀、回表、索引下推）
- ✅ 索引设计（合篇，与“数据库索引”待归并）
- ✅ ★ 执行计划（EXPLAIN）
- ⬜ ★ 索引失效
- ⬜ 慢查询优化（深分页、排序、COUNT） ↔ 批处理与分页

### 4.4 事务与锁

- ✅ ★ 数据库事务（ACID）
- ⬜ ★ 事务隔离级别（脏读、不可重复读、幻读）
- ✅ ★ MVCC
- ✅ ★ InnoDB 锁（记录锁、间隙锁、临键锁）
- ✅ 数据库死锁 ↔ 死锁
- ✅ 长事务
- ⬜ 乐观锁与悲观锁 ↔ CAS、幂等键

### 4.5 存储引擎与日志

- ✅ InnoDB
- ✅ ★ MySQL 事务日志 ↔ 页缓存与文件系统、Transactional Outbox 与 CDC
- ✅ ☆ LSM 树 ↔ HBase、Elasticsearch

### 4.6 复制与扩展

- ✅ ★ [MySQL 复制](../../docs/basic-knowledge/database/replication.mdx) ↔ 主备复制
- ✅ ☆ [MySQL 分区](../../docs/basic-knowledge/database/partitioning.mdx)
- ⬜ ★ 分库分表（分片键、跨分片查询、扩容） ↔ 数据拆分、分布式 ID
- ⬜ ☆ 备份与恢复 ↔ 灾难恢复
- ⬜ ☆ PostgreSQL 与 MySQL 的差异（Python 和 Go 岗位较常见）
- ⬜ ☆ MongoDB（文档模型、适用场景）

### 4.7 SQLite

- ✅ [SQLite](../../docs/basic-knowledge/database/sqlite.mdx)

---

## 5. 缓存与 Redis

〔后端〕Redis 本身的机制与“缓存怎么用”分开：前者答原理，后者答场景。

### 5.1 Redis 基础

- ✅ ★ Redis（定位、适用场景）
- ✅ ★ Redis 数据结构
- ⬜ 底层编码（SDS、listpack、跳表、哈希表渐进式 rehash） ↔ 跳表、哈希表
- ⬜ ★ Redis 线程模型（单线程、I/O 线程） ↔ I/O 多路复用
- ⬜ ☆ Lua 脚本、事务与 Pipeline

### 5.2 过期与内存

- ✅ ★ Redis 过期
- ✅ ★ Redis 内存淘汰 ↔ LRU 与 LFU 缓存实现
- ⬜ 大 Key 与热 Key

### 5.3 持久化与高可用

- ✅ ★ [Redis 持久化](../../docs/basic-knowledge/nosql/redis/persistence.mdx)
- ✅ [Redis 高可用](../../docs/basic-knowledge/nosql/redis/high-availability.mdx)

### 5.4 缓存设计

- ✅ ★ 缓存一致性（Cache Aside、延迟双删） ↔ binlog 与两阶段提交
- ✅ ★ 缓存穿透、击穿、雪崩与热点 Key ↔ 位图与布隆过滤器
- ⬜ 多级缓存与本地缓存（Caffeine、进程内缓存的失效） ↔ CDN

### 5.5 Redis 应用

- ✅ ★ 分布式锁 ↔ Raft、ZooKeeper 与 etcd
- ⬜ 排行榜与计数（ZSet、HyperLogLog）
- ⬜ ☆ 延迟队列与 Stream ↔ 延迟消息
- 限流的 Redis 实现写在“限流”中，不另起一篇 ↔ 限流

---

## 6. 消息队列与中间件

〔后端 大数据〕先讲所有消息队列共有的语义，再讲具体产品。

### 6.1 消息队列基础

- ✅ ★ 消息队列（作用、Kafka 与 RabbitMQ 的语义差异）
- ✅ ★ 消息可靠性（确认、重试、死信）
- ✅ ★ 消息幂等性 ↔ 幂等键
- ⬜ ★ 顺序消息
- ⬜ ★ 消息积压
- ⬜ 延迟消息

### 6.2 Kafka

- ⬜ ★ Kafka 架构（Topic、分区、副本、ISR）
- ⬜ ★ 消费者组与 Rebalance
- ⬜ Kafka 高性能（顺序写、页缓存、批量） ↔ 零拷贝、页缓存与文件系统
- ⬜ ☆ Kafka 事务与 Exactly-Once ↔ Flink 检查点与 Exactly-Once

### 6.3 其他消息队列

- ⬜ ☆ RabbitMQ（交换机、确认与持久化）
- ⬜ ☆ RocketMQ（事务消息、延迟消息） ↔ Transactional Outbox 与 CDC

### 6.4 搜索与协调

- ✅ Elasticsearch（倒排索引、刷新与可见性）
- ⬜ Elasticsearch 写入与分片（段合并、深分页） ↔ LSM 树
- ✅ ☆ [etcd](../../docs/basic-knowledge/middleware/etcd.mdx) ↔ Raft、服务发现
- ✅ ☆ [ZooKeeper](../../docs/basic-knowledge/middleware/zookeeper.mdx)
- ✅ 分布式任务调度（分片、补偿） ↔ 设计任务调度系统

---

## 7. 系统设计

〔后端 运维 AI〕把需求转换为可解释的方案。原“分布式系统”“微服务治理”“可靠性与过载保护”“分布式数据一致性”“可用性”“领域与架构演进”“架构决策”等独立领域都归为本领域的 Topic。

### 7.1 设计方法

- ✅ ★ 系统设计面试（澄清需求、主链路、深入、复查）
- ✅ ★ 系统设计题（题目选择与答题结构）
- ✅ ★ 容量规划（QPS、存储、带宽估算）
- ✅ 系统架构（分层组件与请求链路）
- ⬜ ★ API 设计（资源、分页、版本、幂等） ↔ API 错误契约、幂等键
- ⬜ 数据建模（实体、访问模式、存储选择） ↔ 范式与反范式

### 7.2 扩展与分片

- ✅ ★ 数据拆分（读写路径、热点、分片）
- ⬜ ★ 负载均衡（L4/L7、算法、健康检查） ↔ Nginx
- ✅ 一致性哈希 ↔ Redis Cluster
- ✅ ★ [分布式 ID](../../docs/system-design/distributed-data/distributed-identifiers.mdx)（号段、雪花算法、时钟回拨） ↔ 分库分表
- ⬜ 读写放大与扇出（推拉模型） ↔ 设计社交时间线
- ⬜ ☆ CQRS 与事件溯源

### 7.3 分布式理论

- ✅ ★ CAP 理论（含 BASE）
- ✅ 一致性模型（线性一致、最终一致、Quorum）
- ✅ 主备复制 ↔ 主从复制与读写分离
- ✅ Raft ↔ etcd
- ✅ ☆ 跨地域复制
- ⬜ ☆ 分布式时钟与租约（物理时钟、逻辑时钟、Fencing Token） ↔ 分布式锁
- ✅ ☆ [Paxos](../../docs/system-design/distributed-system/paxos.mdx) ↔ Raft
- ⬜ ☆ ZAB（ZooKeeper 内部协议，与 Raft 的差异）

### 7.4 分布式事务

- ✅ ★ 分布式一致性（按业务约束选策略）
- ✅ ★ 2PC 与 TCC（合篇，待拆）
- ✅ ★ Saga
- ✅ Transactional Outbox 与 CDC ↔ binlog 与两阶段提交、RocketMQ
- ✅ 分布式流程恢复（对账、人工修复）

### 7.5 服务可靠性

- ✅ ★ 超时 ↔ Go context、任务取消
- ✅ ★ 重试（退避、抖动、重试风暴）
- ✅ ★ 幂等键 ↔ 消息幂等性
- ✅ ★ 限流（令牌桶、漏桶、滑动窗口，含 Redis 实现）
- ✅ ★ 服务容错（熔断、降级、隔离；合篇，待拆）

### 7.6 可用性与容灾

- ✅ 服务等级目标（SLO） ↔ 监控与告警（运维岗必会）
- ✅ 灾难恢复（RTO、RPO、备份）
- ✅ 故障转移
- ✅ ☆ 多租户
- ✅ ☆ 成本归因

### 7.7 微服务治理

- ✅ ★ 微服务架构（拆分收益与代价）
- ✅ ★ 服务发现 ↔ DNS、Kubernetes Service
- ✅ API 网关
- ✅ 配置中心
- ✅ 灰度发布 ↔ 发布策略
- ✅ ☆ 控制平面与数据平面
- ✅ ☆ [服务网格](../../docs/system-design/microservices/service-mesh.mdx) ↔ Kubernetes 网络
- 链路追踪写在运维“可观测性”中 ↔ 分布式追踪

### 7.8 架构演进

本 Topic 面向社招与资深岗位的项目追问，校招默认选学。

- ✅ ☆ 模块化单体
- ✅ ☆ 限界上下文
- ✅ ☆ 聚合
- ✅ ☆ 绞杀者模式
- ✅ ☆ 架构迁移
- ✅ ☆ 架构决策记录（ADR）
- ✅ ☆ 设计评审
- ✅ ☆ 事故复盘 ↔ 故障响应
- ✅ ☆ 技术债

### 7.9 设计题

每道题只展开最有区分度的 2—3 个深入点，原理链接到上面的 Topic。

- ✅ 设计 Pastebin（草稿，待发布）
- ✅ 设计网页爬虫 ↔ 树与图搜索、分布式任务调度
- ✅ ★ [短链接设计](../../docs/system-design/cases/short-links.mdx) ↔ 分布式 ID、缓存
- ✅ [分布式缓存设计](../../docs/system-design/cases/distributed-cache.mdx) ↔ 缓存一致性、热点 Key、缓存故障
- ✅ ★ [秒杀系统设计](../../docs/system-design/cases/flash-sale.mdx) ↔ 限流、消息队列、Redis Lua
- ⬜ ★ 设计订单支付系统 ↔ Saga、幂等键
- ⬜ 设计排行榜 ↔ 排行榜与计数
- ✅ [Feed 流设计](../../docs/system-design/cases/feed.mdx) ↔ 读写放大与扇出
- ⬜ 设计即时消息系统 ↔ WebSocket 与 SSE
- ⬜ 设计通知系统
- ⬜ 设计限流服务 ↔ 限流
- ⬜ ☆ 设计任务调度系统 ↔ 分布式任务调度
- ⬜ ☆ 设计文件存储系统（分块上传、对象存储）
- ⬜ ☆ 设计搜索建议系统 ↔ 字典树（Trie）
- ⬜ ☆ 设计知识库问答系统 ↔ RAG（AI 岗必会）
- ⬜ ☆ 设计客服 Agent ↔ Agent 执行循环（AI 岗必会）

### 7.10 并发控制

- ✅ [乐观并发控制](../../docs/system-design/distributed-data/optimistic-concurrency-control.mdx)

---

## 8. 安全

〔后端 前端 AI〕认证授权是前后端共同考点；AI 专属风险放在第 17 节。

### 8.1 认证与授权

- ✅ ★ 认证与授权（信任边界、RBAC）
- ✅ ★ Session、JWT、OAuth 2.0 与 OIDC（合篇，待拆）
- ⬜ 单点登录（SSO） ↔ OAuth 2.0 与 OIDC
- ⬜ ☆ 权限模型（RBAC、ABAC、数据权限）

### 8.2 Web 安全

- ✅ ★ Web 应用安全（注入、越权、SSRF、反序列化）
- ✅ ★ [XSS](../../docs/system-design/security/xss.mdx) ↔ 内容安全策略
- ✅ ★ [CSRF](../../docs/system-design/security/csrf.mdx) ↔ Cookie 与 Session
- ✅ ★ [跨域与 CORS](../../docs/system-design/security/cors.mdx) ↔ 同源策略
- ⬜ SQL 注入与参数化查询 ↔ MyBatis

### 8.3 密码学与密钥

- ✅ ★ [密码学基础](../../docs/system-design/security/cryptography.mdx) ↔ TLS、JWT
- ⬜ 密码存储（哈希、加盐、bcrypt）
- ✅ ☆ 密钥、证书、审计与供应链安全

---

## 9. 软件工程

〔通用〕与语言无关的工程能力。语言专属的测试和构建工具放在各语言领域。

### 9.1 Git

- ✅ ★ [Git](../../docs/tools-and-frameworks/git/index.md)（对象、分支、合并、变基、撤销与首次推送）
- ⬜ 分支策略与代码评审（Git Flow、主干开发、PR） ↔ CI/CD 流水线

现有 Git 安装与首次提交教程保留在“工具”栏目，不进入知识树。

### 9.2 软件测试

- ✅ ★ 测试金字塔（单元、集成、契约、回归）
- ✅ 测试替身（Mock、Stub、Fake）
- ⬜ ☆ 测试驱动开发（TDD）
- ⬜ ☆ 性能测试与压测 ↔ 容量规划

### 9.3 设计原则与设计模式

- ✅ ★ SOLID 面向对象设计原则
- ✅ ★ [单例模式](../../docs/basic-knowledge/design-patterns/singleton.mdx) ↔ volatile、安全发布
- ⬜ ★ 工厂模式
- ⬜ ★ 策略模式
- ⬜ ★ 代理模式 ↔ JDK 动态代理与 CGLIB
- ✅ [观察者模式](../../docs/basic-knowledge/design-patterns/observer.mdx) ↔ Spring 事件、Vue 响应式
- ⬜ 装饰器模式 ↔ Java 流式 I/O、Python 装饰器
- ⬜ 模板方法模式 ↔ AQS
- ⬜ 责任链模式 ↔ Spring 拦截机制、中间件模型（Koa、Gin）
- ⬜ ☆ 适配器模式
- ✅ ☆ 设计一个奶茶店（面向对象设计题，草稿）

### 9.4 命令行接口

- ✅ ☆ [命令行接口](../../docs/tools-and-frameworks/command-line-interface.mdx)

---

## 10. Java

〔Java〕语言语义、标准库、运行时和 Java 生态框架。算法、SQL、网络和系统设计引用共享领域。

### 10.1 语言基础

- ✅ ★ Java 值传递
- ✅ ★ 面向对象编程（Object-Oriented Programming）
- ✅ ★ 对象相等性 ↔ HashMap
- ✅ ★ String
- ✅ ★ 包装类型
- ✅ BigDecimal
- ✅ ★ Java 异常
- ✅ Optional
- ✅ 不可变对象 ↔ String、安全发布
- ✅ ☆ Java API 设计
- ⬜ ☆ Record、密封类与模式匹配

### 10.2 泛型、注解与反射

- ✅ ★ Java 泛型
- ✅ Java 注解
- ✅ ★ Java 反射 ↔ JDK 动态代理与 CGLIB
- ✅ ☆ Java 注解处理器

### 10.3 函数式与常用 API

- ✅ ★ Lambda 表达式
- ✅ ★ Stream
- ✅ Collector
- ✅ 并行流 ↔ ForkJoinPool
- ✅ java.time

### 10.4 集合

- ✅ ★ Java 集合框架
- ✅ ★ ArrayList ← 数组
- ✅ LinkedList ← 链表
- ✅ ★ HashMap ← 哈希表、对象相等性
- ✅ LinkedHashMap ↔ LRU 与 LFU 缓存实现
- ✅ TreeMap 与 TreeSet ↔ 平衡树与红黑树
- ✅ ★ 集合迭代器（fail-fast）
- ✅ ★ ConcurrentHashMap ← HashMap、CAS
- ✅ CopyOnWrite 容器
- ✅ BlockingQueue ↔ Java 线程池
- ✅ ☆ ConcurrentLinkedQueue
- ✅ ☆ 迭代一致性

### 10.5 I/O

- ✅ Java 流式 I/O ↔ 装饰器模式
- ✅ Java NIO ← I/O 多路复用
- ✅ Java 序列化
- ⬜ ☆ Netty（线程模型、ByteBuf、粘包处理） ← Reactor 与 Proactor

### 10.6 并发基础与锁

- ✅ ★ Java 线程（状态、中断） ← 进程与线程
- ✅ ★ 线程安全
- ✅ ★ Java 内存模型 ← CPU 缓存与伪共享
- ✅ ★ volatile
- ✅ ★ synchronized（锁升级）
- ✅ ★ ReentrantLock
- ✅ ★ CAS ↔ 乐观锁与悲观锁
- ✅ ★ AQS ↔ 模板方法模式
- ✅ Java 原子类（LongAdder）
- ✅ 读写锁（StampedLock）
- ✅ 安全发布
- ✅ 并发活跃性 ↔ 死锁
- ✅ ☆ 锁竞争
- ✅ ☆ 锁与无锁

### 10.7 线程池与异步

- ✅ ★ Java 线程池
- ✅ ★ ThreadLocal
- ✅ CompletableFuture
- ✅ Java 并发同步器（CountDownLatch、CyclicBarrier、Semaphore）
- ✅ 任务取消 ↔ 超时
- ✅ 虚拟线程 ↔ 协程、goroutine
- ✅ ☆ 消息传递
- ⬜ ☆ ForkJoinPool

### 10.8 JVM 内存与类加载

- ✅ ★ JVM 运行时数据区域 ↔ 进程内存布局与内存分配
- ✅ Java 字节码
- ✅ ★ Java 对象布局（对象头、对象创建）
- ✅ ☆ 压缩指针与对象对齐
- ✅ Java 直接内存 ↔ 零拷贝
- ✅ ★ 类加载
- ✅ 类加载器
- ✅ ★ 双亲委派模型
- ✅ ☆ 类加载故障

### 10.9 垃圾回收

- ✅ ★ GC Roots（可达性、引用类型）
- ✅ ★ 分代回收（回收算法、写屏障、安全点）
- ✅ Serial、Parallel 与 CMS
- ✅ ★ G1
- ✅ 低延迟垃圾收集器（ZGC、Shenandoah）

### 10.10 JIT 与性能

- ✅ 分层编译
- ✅ ☆ 方法内联与去优化
- ✅ 逃逸分析与标量替换
- ✅ ☆ JMH
- ✅ ☆ Java 启动优化（AOT、CDS、Native Image）

### 10.11 JVM 诊断

- ✅ ★ OutOfMemoryError 与 StackOverflowError
- ✅ JVM 诊断（命令与证据）
- ✅ CPU 使用率（线上 CPU 飙高排查） ↔ Linux 性能排查
- ✅ 线程转储
- ✅ 堆转储（内存泄漏）
- ✅ GC 停顿分析

### 10.12 Spring 核心

- ✅ ★ IoC 容器
- ✅ ★ 依赖注入
- ✅ BeanDefinition
- ✅ ★ Bean 生命周期
- ✅ ★ Spring 循环依赖（三级缓存）
- ✅ ★ Spring AOP ↔ 代理模式
- ✅ ★ JDK 动态代理与 CGLIB
- ✅ ★ Spring 事务（传播行为、失效场景） ← 数据库事务

### 10.13 Spring MVC

- ✅ ★ Spring MVC 请求生命周期
- ✅ DispatcherServlet
- ✅ Spring MVC 参数解析
- ✅ Spring 拦截机制（Filter、Interceptor、Aspect） ↔ 责任链模式
- ✅ API 错误契约 ↔ API 设计

### 10.14 Spring Boot 与生态

- ✅ ★ Spring Boot 启动
- ✅ ★ Spring Boot 自动配置
- ✅ Spring Boot Starter
- ✅ Spring Boot 外部化配置
- ✅ ☆ Spring Boot Actuator ↔ 可观测性
- ✅ ☆ Spring Security ↔ 认证与授权
- ⬜ ☆ Spring Cloud 组件（注册、配置、网关、负载均衡） ↔ 服务发现、API 网关

### 10.15 数据访问

- ✅ ★ 数据库连接池 ↔ 超时
- ✅ ★ MyBatis（#{} 与 ${}、执行器、插件） ↔ SQL 注入与参数化查询
- ✅ ☆ JPA
- ✅ N+1 查询
- ✅ 批处理与分页 ↔ 慢查询优化
- ⬜ ☆ JDBC（Connection、PreparedStatement、事务）

### 10.16 测试与构建

- ✅ JUnit ↔ 测试金字塔
- ✅ Maven（生命周期、依赖冲突）

### 10.17 响应式编程

- ✅ [RxJava](../../docs/tools-and-frameworks/rxjava.mdx)

---

## 11. Go

〔Go〕本分支组织语言、集合、接口、并发和运行时；网络、数据库和系统设计引用共享领域。Go 专题与共享内容的计划范围见[Go 后端分纲](./go-campus.md)。本轮新文与路线的源码、本地浏览器验收已接受，共享依赖的范围复核与缺口处理仍在推进，当前状态见[扩展进度](./campus-expansion-progress.md#交付状态)。

### 11.1 语言基础

- ✅ [Go 语言](../../docs/basic-knowledge/go/language/index.mdx) ↔ 类型、运行时、语言比较与版本边界

以下已完成项表示本地单篇验收；Go 路线的源码与本地浏览器验收也已接受。完整站点构建已通过，正式发布尚未执行，不能把本地通过写成线上已经更新。

- ✅ ★ [Go 类型与值传递](../../docs/basic-knowledge/go/language/types-value-passing.mdx)
- ✅ ★ [Go 函数](../../docs/basic-knowledge/go/language/functions.mdx)
- ✅ ★ [Go 包初始化](../../docs/basic-knowledge/go/language/packages-initialization.mdx)
- ✅ [Go 结构体与方法集](../../docs/basic-knowledge/go/language/structs-method-sets.mdx)
- ✅ ★ [Go 切片](../../docs/basic-knowledge/go/collections/slices.mdx)
- ✅ ★ [Go map](../../docs/basic-knowledge/go/collections/maps.mdx)
- ✅ ★ [Go 字符串与 rune](../../docs/basic-knowledge/go/language/strings-runes.mdx)
- ✅ ★ [Go 接口](../../docs/basic-knowledge/go/language/interfaces.mdx)
- ✅ ★ [Go 错误处理](../../docs/basic-knowledge/go/language/errors.mdx)
- ✅ ★ [defer](../../docs/basic-knowledge/go/language/defer.mdx)
- ✅ [Go 泛型](../../docs/basic-knowledge/go/language/generics.mdx)
- ✅ ☆ [Go 反射](../../docs/basic-knowledge/go/language/reflection.mdx)

### 11.2 并发编程

- ✅ ★ [goroutine](../../docs/basic-knowledge/go/concurrency/goroutines.mdx) ↔ 协程、虚拟线程
- ✅ ★ [channel](../../docs/basic-knowledge/go/concurrency/channels.mdx)
- ✅ ★ [select](../../docs/basic-knowledge/go/concurrency/select.mdx)
- ✅ ★ [Go 互斥锁](../../docs/basic-knowledge/go/concurrency/mutexes.mdx) ↔ 线程同步
- ✅ ★ [Go 同步原语](../../docs/basic-knowledge/go/concurrency/synchronization.mdx)
- ✅ ★ [Go 内存模型](../../docs/basic-knowledge/go/concurrency/memory-model.mdx) ↔ Java 内存模型
- ✅ [Go 原子操作](../../docs/basic-knowledge/go/concurrency/atomics.mdx) ↔ CAS
- ✅ ★ [sync.Map](../../docs/basic-knowledge/go/concurrency/sync-map.mdx)
- ✅ ☆ [sync.Pool](../../docs/basic-knowledge/go/concurrency/sync-pool.mdx)
- ✅ ★ [context](../../docs/basic-knowledge/go/concurrency/context.mdx) ↔ 超时
- ✅ [Go 并发任务管理](../../docs/basic-knowledge/go/concurrency/task-coordination.mdx)
- ✅ ★ [Go 并发诊断](../../docs/basic-knowledge/go/concurrency/leaks-races.mdx) ↔ 并发活跃性
- ✅ [singleflight](../../docs/basic-knowledge/go/concurrency/singleflight.mdx) ↔ 缓存击穿

### 11.3 运行时

- ✅ [Go 运行时](../../docs/basic-knowledge/go/runtime/index.mdx)
- ✅ ★ [Go 调度器](../../docs/basic-knowledge/go/runtime/scheduler.mdx) ← 进程调度与上下文切换
- ✅ ★ [Go 垃圾回收](../../docs/basic-knowledge/go/runtime/garbage-collection.mdx) ↔ 分代回收
- ✅ [Go 内存分配](../../docs/basic-knowledge/go/runtime/memory-allocation.mdx) ← 进程内存布局与内存分配
- ✅ ★ [Go 逃逸分析](../../docs/basic-knowledge/go/runtime/escape-analysis.mdx) ↔ 逃逸分析与标量替换
- ✅ [Go 网络轮询](../../docs/basic-knowledge/go/runtime/network-poller.mdx) ← I/O 多路复用
- ⬜ ☆ goroutine 栈（连续栈、扩缩容）

### 11.4 工程与生态

- ✅ [Go Modules](../../docs/basic-knowledge/go/engineering/modules.mdx)
- ✅ [Go 构建](../../docs/basic-knowledge/go/engineering/build.mdx)
- ✅ [Go 测试与基准测试](../../docs/basic-knowledge/go/engineering/testing.mdx)
- ✅ ★ [Go 性能分析](../../docs/basic-knowledge/go/engineering/profiling.mdx) ↔ 火焰图
- ✅ [Go HTTP 服务](../../docs/basic-knowledge/go/web/http-server.mdx)
- ✅ [Go HTTP 客户端](../../docs/basic-knowledge/go/web/http-client.mdx)
- ✅ [database/sql](../../docs/basic-knowledge/go/database/database-sql.mdx)
- ✅ [Gin](../../docs/basic-knowledge/go/web/gin.mdx) ↔ 责任链模式
- ✅ ☆ [GORM](../../docs/basic-knowledge/go/database/gorm.mdx) ↔ N+1 查询
- ✅ ☆ [go-zero sqlx](../../docs/basic-knowledge/go/database/sqlx.mdx) ↔ Session、事务与结果映射
- ✅ ☆ [go-zero sqlc](../../docs/basic-knowledge/go/database/sqlc.mdx) ↔ 缓存回源、失效与事务边界
- ✅ ☆ [gRPC-Go](../../docs/basic-knowledge/go/web/grpc-go.mdx) ↔ gRPC 与 Protocol Buffers
- ✅ ☆ [go-zero](../../docs/basic-knowledge/go/web/go-zero.mdx) ↔ Go HTTP 服务与 context
- ✅ ☆ [client-go](../../docs/basic-knowledge/go/cloud-native/client-go.mdx) ↔ Kubernetes 架构、Informer 与工作队列

---

## 12. Python

〔Py 测试 AI 大数据〕已完成内容覆盖语言、集合、运行时、环境与测试。下面的待建清单保留原规划，不计入本轮已完成内容。

### 12.1 语言基础

- ✅ [Python 对象模型](../../docs/basic-knowledge/python/language/object-model.mdx)
- ✅ [Python 函数参数与作用域](../../docs/basic-knowledge/python/language/functions-scope.mdx)
- ✅ [Python 类与实例](../../docs/basic-knowledge/python/language/classes-instances.mdx)
- ✅ [Python 异常处理](../../docs/basic-knowledge/python/language/exceptions.mdx)
- ✅ [Python 上下文管理器](../../docs/basic-knowledge/python/language/context-managers.mdx)
- ✅ [Python 迭代器与生成器](../../docs/basic-knowledge/python/language/iterators-generators.mdx)
- ✅ [Python 闭包与装饰器](../../docs/basic-knowledge/python/language/closures-decorators.mdx)

### 12.2 集合

- ✅ [Python 集合](../../docs/basic-knowledge/python/collections/list-dict-set.mdx)

### 12.3 运行时与并发

- ✅ [Python 内存管理](../../docs/basic-knowledge/python/runtime/memory-management.mdx)
- ✅ [Python 并发](../../docs/basic-knowledge/python/concurrency/threads-processes-gil.mdx)
- ✅ [asyncio](../../docs/basic-knowledge/python/concurrency/asyncio.mdx)

### 12.4 环境与文件

- ✅ [Python 包管理与虚拟环境](../../docs/basic-knowledge/python/engineering/packages-environments.mdx)
- ✅ [Python 文件与文本处理](../../docs/basic-knowledge/python/engineering/files-text-processing.mdx)

### 12.5 Python 测试

- ✅ [pytest](../../docs/basic-knowledge/python/quality/pytest.mdx)

### 12.6 后续规划

- ⬜ 类型注解与 Pydantic
- ⬜ 魔法方法
- ⬜ 多继承与 MRO
- ⬜ 描述符与 property
- ⬜ 元类
- ⬜ CPython 执行过程
- ⬜ WSGI 与 ASGI
- ⬜ FastAPI
- ⬜ Django
- ⬜ Flask
- ⬜ Celery
- ⬜ Python 性能分析与优化
- ⬜ NumPy 与 Pandas

---

## 13. JavaScript 与 TypeScript

〔前端 Node〕前端与 Node.js 共同的语言基础。

### 13.1 语言基础

- ✅ ★ [JavaScript 数据类型与类型转换](../../docs/basic-knowledge/javascript/types-conversion.mdx)
- ✅ ★ [作用域与闭包](../../docs/basic-knowledge/javascript/scope-closures.mdx)
- ✅ ★ [this 绑定](../../docs/basic-knowledge/javascript/this-binding.mdx)
- ✅ ★ [原型与原型链](../../docs/basic-knowledge/javascript/prototypes.mdx)
- ✅ ★ [JavaScript 对象拷贝](../../docs/basic-knowledge/javascript/copying.mdx)
- ✅ [JavaScript 集合](../../docs/basic-knowledge/javascript/collections.mdx)
- ✅ [Proxy 与 Reflect](../../docs/basic-knowledge/javascript/proxy-reflect.mdx)
- ✅ ☆ [迭代器与生成器](../../docs/basic-knowledge/javascript/iterators-generators.mdx)
- ✅ [高阶函数与柯里化](../../docs/basic-knowledge/javascript/higher-order-functions.mdx)
- ✅ [JavaScript 对象属性](../../docs/basic-knowledge/javascript/object-properties.mdx)
- ✅ [正则表达式](../../docs/basic-knowledge/javascript/regular-expressions.mdx)

### 13.2 异步与运行时

- ✅ ★ [浏览器事件循环](../../docs/basic-knowledge/javascript/browser-event-loop.mdx)
- ✅ ★ [Promise](../../docs/basic-knowledge/javascript/promise.mdx)
- ✅ ★ [async 与 await](../../docs/basic-knowledge/javascript/async-await.mdx)
- ✅ [JavaScript 内存管理](../../docs/basic-knowledge/javascript/memory-management.mdx)
- ✅ ☆ [V8 执行过程](../../docs/basic-knowledge/javascript/v8-execution.mdx)

### 13.3 模块化

- ✅ ★ [ES Module 与 CommonJS](../../docs/basic-knowledge/javascript/modules.mdx)
- ✅ [Tree Shaking](../../docs/basic-knowledge/javascript/tree-shaking.mdx)

### 13.4 TypeScript

- ✅ ★ [TypeScript 类型系统](../../docs/basic-knowledge/typescript/type-system.mdx)
- ✅ [TypeScript 泛型与工具类型](../../docs/basic-knowledge/typescript/generics-utility-types.mdx)
- ✅ [interface 与 type](../../docs/basic-knowledge/typescript/type-interface.mdx)
- ✅ ☆ [TypeScript 声明文件](../../docs/basic-knowledge/typescript/declaration-files.mdx)

---

## 14. 浏览器与前端基础

〔前端〕页面如何被加载、渲染和交互。

### 14.1 HTML 与 CSS

- ✅ ★ [HTML 语义与可访问性](../../docs/frontend/html/semantics-accessibility.mdx)
- ✅ ★ [CSS 盒模型与格式化上下文](../../docs/frontend/css/box-model-formatting-contexts.mdx)
- ✅ ★ [CSS 布局](../../docs/frontend/css/layout.mdx)
- ✅ ★ [CSS 层叠](../../docs/frontend/css/cascade.mdx)
- ✅ [响应式布局](../../docs/frontend/css/responsive-layout.mdx)
- ✅ [层叠上下文](../../docs/frontend/css/stacking-context.mdx)
- ✅ ☆ [CSS 动画](../../docs/frontend/css/animations.mdx)
- ✅ [CSS 样式组织](../../docs/frontend/css/style-organization.mdx)
- ✅ ★ [HTML 表单](../../docs/frontend/html/forms.mdx)

### 14.2 浏览器原理

- ✅ ★ [浏览器渲染流程](../../docs/frontend/browser/rendering.mdx)
- ✅ ★ [DOM 事件](../../docs/frontend/browser/dom-events.mdx)
- ✅ [浏览器进程模型](../../docs/frontend/browser/process-model.mdx)
- ✅ ★ [浏览器存储](../../docs/frontend/browser/storage.mdx)
- ✅ ★ [同源策略](../../docs/frontend/browser/same-origin-policy.mdx)
- ✅ ★ [Fetch API](../../docs/frontend/browser/fetch.mdx)
- ✅ ☆ [Web Worker](../../docs/frontend/browser/web-worker.mdx)
- ✅ ☆ [Service Worker](../../docs/frontend/browser/service-worker.mdx)
- ✅ ★ [浏览器调试](../../docs/frontend/browser/debugging.mdx)
- ✅ [浏览器上下文通信](../../docs/frontend/browser/cross-context-messaging.mdx)
- ✅ ☆ [JSBridge](../../docs/frontend/browser/jsbridge.mdx)
- ✅ ☆ [浏览器媒体 API](../../docs/frontend/browser/media.mdx)
- ✅ ☆ [WebAssembly](../../docs/frontend/browser/webassembly.mdx)

### 14.3 前端性能

- ✅ ★ [Web 性能指标](../../docs/frontend/performance/metrics.mdx)
- ✅ ★ [Web 资源加载](../../docs/frontend/performance/resource-loading.mdx)
- ✅ [防抖与节流](../../docs/frontend/performance/debounce-throttle.mdx)
- ✅ [虚拟列表](../../docs/frontend/performance/virtual-list.mdx)
- ✅ ☆ [前端监控](../../docs/frontend/performance/observability.mdx)

### 14.4 浏览器图形

- ✅ ☆ [Canvas](../../docs/frontend/graphics/canvas.mdx)
- ✅ ☆ [WebGL](../../docs/frontend/graphics/webgl.mdx)
- ✅ ☆ [数据可视化](../../docs/frontend/graphics/data-visualization.mdx)

---

## 15. 前端框架与工程化

〔前端〕面试通常主考 React 或 Vue 之一；另一个按岗选学。

### 15.1 React

- ✅ ★ [React 组件](../../docs/tools-and-frameworks/react/components.mdx)
- ✅ ★ [React Hooks](../../docs/tools-and-frameworks/react/hooks.mdx)
- ✅ ★ [React 协调](../../docs/tools-and-frameworks/react/reconciliation.mdx)
- ✅ [React 并发渲染](../../docs/tools-and-frameworks/react/concurrent-rendering.mdx)
- ✅ [React 性能优化](../../docs/tools-and-frameworks/react/performance.mdx)
- ✅ [React 状态管理](../../docs/tools-and-frameworks/react/state-management.mdx)
- ✅ ☆ [React Server Components](../../docs/tools-and-frameworks/react/server-components.mdx)

### 15.2 Vue

- ✅ ★ [Vue 响应式](../../docs/tools-and-frameworks/vue/reactivity.mdx)
- ✅ ★ [Vue 渲染机制](../../docs/tools-and-frameworks/vue/rendering.mdx)
- ✅ ★ [Vue 组件](../../docs/tools-and-frameworks/vue/components.mdx)
- ✅ ★ [computed 与 watch](../../docs/tools-and-frameworks/vue/computed-watch.mdx)
- ✅ ☆ [Vue 状态管理](../../docs/tools-and-frameworks/vue/state-management.mdx)

### 15.3 路由与渲染模式

- ✅ [前端路由](../../docs/frontend/routing/client-routing.mdx)
- ✅ [Web 渲染模式](../../docs/frontend/rendering/rendering-modes.mdx)
- ✅ ☆ [Vue Router](../../docs/tools-and-frameworks/vue/router.mdx)
- ✅ ☆ [Next.js](../../docs/tools-and-frameworks/nextjs/index.mdx)
- ✅ ☆ [Nuxt](../../docs/tools-and-frameworks/nuxt/index.mdx)
- ✅ ☆ [微前端](../../docs/frontend/architecture/micro-frontends.mdx)
- ✅ ☆ [模板引擎](../../docs/frontend/rendering/template-engines.mdx)

### 15.4 前端工程化

- ✅ ★ [前端构建](../../docs/tools-and-frameworks/frontend-build/build-pipeline.mdx)
- ✅ ★ [JavaScript 包管理](../../docs/tools-and-frameworks/frontend-build/package-management.mdx)
- ✅ [JavaScript 代码转换](../../docs/tools-and-frameworks/frontend-build/transpilation.mdx)
- ✅ [前端代码检查](../../docs/tools-and-frameworks/frontend-build/code-checks.mdx)
- ✅ ★ [前端组件测试](../../docs/tools-and-frameworks/frontend-testing/component-testing.mdx)
- ✅ [前端资源发布](../../docs/tools-and-frameworks/frontend-build/asset-release.mdx)

### 15.5 前端交互

- ✅ ☆ [文本编辑器](../../docs/frontend/interaction/text-editors.mdx)
- ✅ ☆ [乐观更新](../../docs/frontend/interaction/optimistic-updates.mdx)
- ✅ [浏览器文件上传](../../docs/frontend/interaction/file-upload.mdx)

### 15.6 组件与视图架构

- ✅ [组件框架](../../docs/frontend/architecture/component-frameworks.mdx)
- ✅ ☆ [视图架构模式](../../docs/frontend/architecture/view-models.mdx)

### 15.7 跨平台前端

- ✅ ☆ [小程序](../../docs/frontend/platforms/mini-programs.mdx)

---

## 16. Node.js

〔Node 前端〕服务端 JavaScript：事件循环、流、进程模型与服务框架。

### 16.1 运行时

- ✅ ☆ [Node.js 事件循环](../../docs/basic-knowledge/nodejs/event-loop.mdx)
- ✅ ☆ [Node.js 模块机制](../../docs/basic-knowledge/nodejs/modules.mdx)
- ✅ ☆ [Buffer 与 Stream](../../docs/basic-knowledge/nodejs/buffer-stream.mdx)
- ✅ ☆ [Node.js 进程与线程](../../docs/basic-knowledge/nodejs/processes-workers.mdx)
- ✅ ☆ [Node.js 性能分析](../../docs/basic-knowledge/nodejs/profiling.mdx)

### 16.2 服务开发

- ✅ ☆ [Node.js 中间件](../../docs/tools-and-frameworks/nodejs/middleware.mdx)
- ✅ ☆ [BFF](../../docs/system-design/patterns/backend-for-frontend.mdx)
- ✅ ☆ [NestJS](../../docs/tools-and-frameworks/nodejs/nestjs.mdx)
- ✅ ☆ [Node.js 服务生命周期](../../docs/basic-knowledge/nodejs/service-lifecycle.mdx)
- ✅ ☆ [Node.js 数据访问](../../docs/tools-and-frameworks/nodejs/data-access.mdx)

---

## 17. AI 应用与 Agent

〔AI〕面向模型接入、检索、工具执行和应用交付岗位。模型训练与推理优化只讲到能判断应用边界。详细停止条件见[第一版 Agent 分纲](./agent.md)和[Agent 辅助开发](./agentic-development-knowledge-points.md)。

### 17.1 大模型基础

- ✅ ★ 大语言模型（LLM）（生成过程、能力边界）
- ✅ ★ Token 与上下文窗口（并入《大语言模型基础》）
- ✅ ★ Transformer 与注意力机制（只讲到能解释上下文长度与 KV Cache） ↔ 推理部署与 KV Cache
- ✅ ★ 模型幻觉 ↔ 引用与证据
- ✅ 采样参数（temperature、top-p；并入《大语言模型基础》）
- ⬜ ☆ 微调与 LoRA（与提示、检索的选择边界）

### 17.2 模型调用与提示

- ⬜ ★ LLM API（消息、角色、错误、用量）
- ⬜ ★ 结构化输出（基础用法暂并入《提示词工程》） ↔ 类型注解与 Pydantic
- ⬜ ★ 流式输出 ↔ WebSocket 与 SSE
- ✅ ★ 提示词工程（任务、约束、少样本、思维链）
- ✅ ★ 上下文管理（选择、组织、信任边界）
- ✅ 上下文压缩
- ⬜ ☆ 模型路由与响应缓存

### 17.3 RAG

- ✅ ★ 检索增强生成（RAG）
- ✅ ★ 文档解析与切分
- ✅ ★ Embedding 与向量检索（相似度、ANN、HNSW） ↔ 数据库索引
- ✅ ★ 混合检索与重排序 ↔ Elasticsearch
- ⬜ 查询改写
- ⬜ 引用与证据（无证据拒答）
- ⬜ 索引更新（要点暂并入《检索增强生成（RAG）》；增量、删除、权限过滤）
- ⬜ ☆ 向量数据库选型（Milvus、pgvector、Elasticsearch）
- ⬜ ☆ GraphRAG 与 Agentic RAG

### 17.4 工具调用与协议

- ✅ ★ Function Calling ↔ RPC
- ⬜ ★ 工具契约（设计原则暂并入《Function Calling》；参数、结果、错误、副作用） ↔ API 设计、幂等键
- ✅ ★ MCP（Host、Client、Server、传输）
- ✅ Agent Skills
- ⬜ ☆ A2A

### 17.5 Agent 架构

- ✅ ★ 工作流与 Agent（何时用固定步骤，何时用 Agent）
- ✅ ★ Agent 执行循环（行动、观测、停止条件、预算）
- ⬜ ★ ReAct（三个环节暂并入《Agent 执行循环》）
- ⬜ 规划与执行（与 ReAct 的对比暂并入《Agent 执行循环》；Plan-and-Execute、反思）
- ✅ 多 Agent 协作（委派、上下文隔离、结果汇总）
- ✅ Agent Harness（模型之外的上下文、工具、状态、权限）

### 17.6 状态与记忆

- ✅ ★ Agent 状态与持久化执行（检查点、恢复、重放） ↔ Saga、幂等键
- ✅ ★ Agent 记忆（短期、长期、写入与遗忘）
- ⬜ 人工介入（实现要点暂并入《Agent 状态与持久化执行》；审批、暂停与恢复）

### 17.7 评估与观测

- ✅ [模型评测](../../docs/ai/evaluation/model-evaluation.mdx)
- ✅ ★ Agent 评估（成功标准、回归集、重复运行）
- ✅ RAG 评估（检索、引用、生成分层评估）
- ⬜ LLM 评审（要点暂并入《Agent 评估》；LLM-as-Judge）
- ⬜ Agent 可观测性（归因要点暂并入《Agent 评估》；轨迹、用量、失败分析） ↔ 分布式追踪

### 17.8 安全与服务化

- ✅ ★ 提示注入 ↔ Web 应用安全
- ✅ ★ 工具授权与执行沙箱 ↔ 认证与授权、容器原理
- ⬜ AI 数据安全（敏感数据、检索权限、记忆污染）
- ✅ AI 应用服务化（并发、限流、取消、任务队列；并入《延迟、成本与服务扩展》） ↔ 限流、超时
- ✅ 成本与延迟优化（Token 预算、缓存、批处理；见《延迟、成本与服务扩展》）
- ⬜ ☆ 推理部署与 KV Cache（vLLM、量化、批处理）

### 17.9 框架与 AI 辅助开发

- ✅ LangChain 与 LangGraph（见《Agent 框架选型》）
- ⬜ ☆ Spring AI ↔ Spring Boot 自动配置
- ⬜ ☆ LlamaIndex
- ✅ AI 辅助开发（任务拆分、上下文、验证与代码评审） ↔ 测试金字塔、分支策略与代码评审
- ✅ AI 代码调试（复现、假设、根因与回归） ← AI 辅助开发
- ✅ 仓库指令（AGENTS.md 等规则文件的内容、维护与验证）
- ✅ ☆ 编码 Agent 评测

### 17.10 项目涉及的模型基础

- ✅ ☆ [卷积神经网络](../../docs/ai/models/convolutional-neural-networks.mdx)（项目涉及时选学；卷积、层间形状、参数共享与感受野）

---

## 18. 大数据

〔大数据〕数据开发岗的考点集中在 Hive/Spark SQL 与数据倾斜、Spark 执行原理、Flink 状态与一致性、数仓建模。分布式理论和消息队列引用共享领域。

### 18.1 分布式存储

- ⬜ ★ HDFS（NameNode、DataNode、副本、读写流程、小文件问题） ↔ 主备复制
- ⬜ ★ 列式存储与文件格式（Parquet、ORC、压缩）
- ⬜ ☆ HBase（RowKey 设计、Region、读写路径） ← LSM 树
- ⬜ ☆ 对象存储与存算分离

### 18.2 批处理计算

- ✅ ★ MapReduce（MIT 6.824 Lec 1 笔记）
- ✅ ☆ MapReduce 实验（MIT 6.824 Lab 1）
- ⬜ ★ Shuffle（MapReduce 与 Spark 的 Shuffle 对比）
- ⬜ ★ YARN（资源调度、ApplicationMaster） ↔ Kubernetes 调度
- ⬜ ★ Spark 核心（RDD、宽窄依赖、DAG、Stage 与 Task）
- ⬜ ★ Spark 内存与调优（缓存、广播、分区数、AQE）
- ⬜ Spark SQL（Catalyst、Join 策略） ↔ 执行计划

### 18.3 SQL 与数据倾斜

- ⬜ ★ Hive 架构（元数据、SQL 到执行计划、内外部表）
- ⬜ ★ 分区与分桶
- ⬜ ★ 数据倾斜（定位、加盐、两阶段聚合、Map Join） ↔ 热点 Key
- ⬜ ★ 大数据 SQL 题（连续登录、留存、Top N、行列转换） ← 窗口函数

### 18.4 流处理

- ⬜ ★ Flink 架构（JobManager、TaskManager、Slot、算子链）
- ⬜ ★ 时间语义与 Watermark（乱序、迟到数据）
- ⬜ ★ 窗口（滚动、滑动、会话）
- ⬜ ★ Flink 状态与检查点（State Backend、Barrier 对齐、Savepoint）
- ⬜ ★ Flink 检查点与 Exactly-Once（两阶段提交 Sink） ↔ Kafka 事务与 Exactly-Once、2PC 与 TCC
- ⬜ 反压 ↔ 背压
- ⬜ ☆ Flink CDC 与实时数仓 ↔ Transactional Outbox 与 CDC

### 18.5 数据仓库

- ⬜ ★ 数仓分层（ODS、DWD、DWS、ADS）
- ⬜ ★ 维度建模（事实表、维度表、星型与雪花模型） ↔ 范式与反范式
- ⬜ 缓慢变化维（SCD）与拉链表
- ⬜ 指标体系与口径管理
- ⬜ ☆ 数据湖与湖仓一体（Iceberg、Hudi、Delta Lake）

### 18.6 OLAP 与数据治理

- ⬜ OLAP 引擎（ClickHouse、Doris/StarRocks、预聚合与列存）
- ⬜ 任务调度与依赖（Airflow、DolphinScheduler、补数） ↔ 拓扑排序与最短路径
- ⬜ 数据质量（校验规则、监控、对账） ↔ 分布式流程恢复
- ⬜ ☆ 元数据与数据血缘

---

## 19. 运维与云原生

〔运维 后端〕面向 SRE、DevOps 和需要线上排查的后端岗位。SLO 与容灾正文在系统设计，本领域负责落地工具和排查。

2026-10-13 起，正文发布在 `docs/devops/`；岗位路线见站点的“运维与 SRE 面试路线”（`src/data/interviewRoadmaps/sre.ts`），未完成的主题在路线中标为建设中。题目来源为牛客网约 270 篇 SRE、运维开发、DevOps 公开面经。

### 19.1 Linux

- ✅ ★ Linux 常用命令（文本处理 grep/awk/sed、查找、压缩）
- ✅ ★ 文件权限与用户（rwx、SUID、umask；并入《Linux 常用命令与文件权限》）
- ✅ ★ Linux 进程管理（ps、kill 与信号、nohup、systemd） ↔ 僵尸进程与孤儿进程
- ✅ ★ Linux 性能排查（top、vmstat、iostat、free、load average 的含义） ↔ CPU 使用率
- ✅ ★ Linux 网络排查（ss、netstat、tcpdump、curl、dig） ↔ TCP 连接排查
- ⬜ Shell 脚本
- ✅ ☆ 磁盘与文件系统管理（df/du、inode 耗尽；LVM 未展开） ↔ 页缓存与文件系统

### 19.2 容器

- ✅ ★ 容器原理（Namespace、Cgroups、联合文件系统） ↔ 进程与线程
- ✅ ★ Docker 镜像与 Dockerfile（分层、多阶段构建、镜像瘦身）
- ⬜ Docker 网络与存储（bridge、host、卷）
- ⬜ ☆ 容器运行时（containerd、OCI）

### 19.3 Kubernetes

- ✅ ★ Kubernetes 架构（API Server、etcd、Scheduler、Controller、kubelet） ↔ ZooKeeper 与 etcd
- ✅ ★ Pod（生命周期、探针、资源 requests 与 limits）
- ✅ ★ 工作负载（Deployment、StatefulSet、DaemonSet、Job；与 Service、网络合为一篇）
- ✅ ★ Service 与 Ingress ↔ 服务发现、负载均衡
- ⬜ ConfigMap 与 Secret
- ⬜ 存储（PV、PVC、StorageClass）
- ✅ Kubernetes 调度（亲和性、污点与容忍；并入《Kubernetes 架构》与《Pod》）
- ✅ 弹性伸缩（HPA、VPA；并入《Pod》）
- ✅ ☆ Kubernetes 网络（CNI、Pod 间通信） ↔ ARP 与 NAT
- ⬜ ☆ Helm 与 Operator

### 19.4 CI/CD 与发布

- ✅ ★ 可重复交付（Docker、CI/CD）
- ⬜ CI/CD 流水线（构建、测试、制品、环境晋级） ↔ 分支策略与代码评审
- ⬜ ★ 发布策略（滚动、蓝绿、金丝雀、回滚） ↔ 灰度发布
- ⬜ ☆ GitOps（Argo CD）

### 19.5 可观测性

- ✅ ★ 可观测性（日志、指标、追踪的关联）
- ✅ ★ 监控与告警（Prometheus、指标类型、告警设计） ↔ 服务等级目标（SLO）
- ⬜ 日志系统（ELK、Loki、结构化日志）
- ⬜ 分布式追踪（OpenTelemetry、Trace 与 Span） ↔ Agent 可观测性
- ⬜ ☆ 火焰图与 eBPF

### 19.6 故障排查与响应

- ✅ ★ 生产故障诊断（JVM、线程、SQL、网络联合排查）
- ✅ ★ 故障响应（定级、止血、沟通、复盘） ↔ 事故复盘
- ✅ ★ SRE 的职责与工作方式（SLO、错误预算、琐事、混沌工程）
- ⬜ 常见线上故障（磁盘满、连接数耗尽、DNS 解析失败、证书过期）

### 19.7 流量与基础设施

- ✅ ★ Nginx（反向代理、负载均衡、LVS、502/504） ↔ 负载均衡
- ⬜ ☆ 基础设施即代码（Terraform、Ansible）
- ⬜ ☆ 云网络与权限（VPC、安全组、IAM）

### 19.8 云计算

- ✅ ☆ [云计算](../../docs/devops/cloud-computing.mdx)

---

## 20. 存储系统

〔后端 大数据 运维〕对象、块和文件服务的接口与保证。数据库存储引擎仍归第 4 节，上传会话与 HTTP 传输归计算机网络，不在这里复制正文。

### 20.1 对象存储

- ✅ [对象存储](../../docs/basic-knowledge/storage/object-storage.mdx) ↔ 文件上传、幂等性、认证与授权

### 20.2 分布式存储

- ✅ [Ceph](../../docs/basic-knowledge/storage/ceph.mdx)

---

## 21. 岗位路径

岗位路径只决定**读哪些 Topic、按什么顺序、读到什么深度**，不复制正文。“必读”对应第一轮；“补充”在必读掌握后进入；没列出的领域按项目选学。

| 岗位 | 必读 | 补充 |
| --- | --- | --- |
| Java 后端 | 1 算法；2 操作系统；3 网络；4 数据库（4.1—4.4、4.6）；5 Redis；6.1 消息基础；10 Java（10.1—10.7、10.8—10.9 的 ★、10.12—10.15）；7.1、7.5 系统设计 | 4.5 日志；6.2 Kafka；7.2—7.4、7.7、7.9；8.1 认证；9.3 设计模式；10.10—10.11 JVM 诊断；19.1 Linux |
| Go 后端 | 1 算法；2 操作系统；3 网络；4 数据库；5 Redis；6.1；11 Go（11.1—11.3）；7.1、7.5 | 6.2 Kafka；7.2—7.4、7.7、7.9；11.4 工程；19.2—19.3 容器与 Kubernetes |
| Python 后端 | 1 算法；3 网络；4 数据库；5 Redis；12 Python（12.1—12.4）；7.1、7.5 | 2 操作系统；6.1；7.9；8.1；9.3；19.2 容器 |
| 前端 | 1 算法（1.1—1.4 的 ★）；3 网络（3.1、3.3、3.4）；13 JS/TS；14 浏览器；15 框架与工程化（React 或 Vue 主选一个）；8.2 Web 安全 | 8.1 认证；9.1 Git；9.3 设计模式；16 Node.js |
| 移动端（规划） | 1 算法、2 操作系统、3 网络的相关核心；[移动端分纲](./mobile-campus.md)中的 Android、iOS、Flutter 或 React Native 主线 | 语言基础分别归 Java/Kotlin/Swift/Objective-C/Dart/JS/TS；平台深入、跨平台和性能专题按目标岗位 |
| 测试开发（规划） | 9.2 软件测试、3 网络、4.1 SQL、19.1 Linux；Java 或 Python；[测试开发分纲](./testing-campus.md)中的用例设计、自动化与定位 | UI、性能、兼容性与执行平台按目标岗位；移动端机制引用移动分纲 |
| Node.js / 全栈 | 13 JS/TS；16 Node.js；3 网络；4 数据库（4.1—4.4）；5 Redis（5.1、5.4）；14 浏览器 | 2 操作系统；6.1；7.1、7.5；15 框架 |
| AI 应用 / Agent | 17 AI（17.1—17.8 的 ★）；12 Python（12.1、12.3）或主语言；3.3 HTTP；4.1、4.3 数据库；1 算法 | 7.1、7.5、7.9 设计题（知识库问答、客服 Agent）；6.1；8.1；17.9 |
| 大数据开发 | 18 大数据；4.1—4.3 SQL 与索引；1 算法；Java 或 Python 语言基础（10.1、10.4 或 12.1）；6.1—6.2 消息与 Kafka；7.3 分布式理论 | 10.8—10.9 JVM；19.1 Linux；4.5 存储引擎与日志 |
| 运维 / SRE | 19 运维与云原生；2 操作系统；3 网络；7.5—7.6 可靠性与容灾 | 4.4、4.6 数据库；5.3 Redis 高可用；6.2 Kafka；11 Go 或 12 Python（脚本与工具开发）；7.7 微服务治理 |

---

## 22. 相对第一版的调整

**结构**

- 原 basic-knowledge 与 system-design 两个栏目下的二级目录直接作为“领域”，导致系统设计侧出现 12 个只有几篇文章的领域，且计算机网络、操作系统等领域的“Topic”就是单篇文章。现在系统设计合并为一个领域、9 个 Topic；网络、操作系统、数据库、Redis 等按复习单元重新分组，每个 Topic 包含多篇文章。
- Java 并发、JVM、Spring 原来分别是 22、25、18 篇的大 Topic，拆成“并发基础与锁 / 线程池与异步”“内存与类加载 / 垃圾回收 / JIT 与性能 / 诊断”“核心 / MVC / Boot 与生态”。
- 原 Java“算法方法”下的 5 篇（复杂度、正确性、滑动窗口、树与图搜索、动态规划）归入“数据结构与算法”；零拷贝归操作系统；测试金字塔、测试替身归软件工程；可重复交付、可观测性、生产故障诊断归运维；Spring Security 归 Java Spring；MIT 6.824 MapReduce 归大数据。文件位置不变，只改知识树归属。
- 设计模式从“系统设计 / 面向对象设计”移到“软件工程”，与 SOLID 放在一起；原第一版只列模式名，这里按面试频率标出单例、工厂、策略、代理为必会。

**补充的岗位与领域**：Go、Python、JavaScript 与 TypeScript、浏览器与前端基础、前端框架与工程化、Node.js、大数据、运维与云原生 8 个领域为新增；AI 应用与 Agent 从第一版分纲中整理为 9 个 Topic，并补充 Transformer、采样参数、混合检索、向量数据库、推理部署等应用岗常见追问。

**补充的共享知识点**（第一版遗漏或仅作为合篇段落）：

- 网络：从输入 URL 到页面展示、TCP 可靠传输与拥塞控制、粘包、Cookie 与 Session、HTTP/2 与 HTTP/3、CDN、gRPC。
- 数据库：事务隔离级别、索引失效、慢查询优化、乐观锁与悲观锁、redo/undo/binlog 与两阶段提交、主从复制、分库分表。
- Redis：线程模型、底层编码、大 Key、RDB 与 AOF、哨兵、Cluster、排行榜。
- 消息队列：顺序消息、消息积压、延迟消息、Kafka 架构与消费者组。
- 系统设计：负载均衡、一致性哈希、分布式 ID，以及秒杀、短链接、排行榜、订单支付等国内面试高频设计题。
- 安全：XSS、CSRF、CORS、对称与非对称加密、密码存储。
- 操作系统：进程调度、进程间通信、协程、CPU 缓存与伪共享（前置）、页面置换。

**降级为选学**：架构演进 Topic 全部（校招少问，社招项目追问才进入）、成本归因、多租户、控制平面与数据平面、跨地域复制、压缩指针、方法内联、JMH、ConcurrentLinkedQueue。

**不纳入**：编译原理、汇编与计算机组成的大部分内容、具体云厂商操作、模型预训练与 GPU 算子优化。

## 23. 维护约定

- 新文章写完后，同时在本文把 ⬜ 改为 ✅，并在 `src/data/knowledgeTree.ts` 对应 Topic 中加入文档 ID；构建时会检查数据文件中的 ID 是否存在。
- 合篇拆分后，原文章保留为导航页或重定向，本文删除“合篇”说明。
- `↔` 关联在正文中写成文章内链接；关联是双向的，但只在其中一方的段落确实需要对方时才加。
- 新增 Topic 时先确认它在别的领域没有同类内容；领域和 Topic 的名称、顺序与 `knowledgeTree.ts` 保持一致。

---

## 24. 计算机组成

### 24.1 指令与数据表示

- ✅ [二进制数据表示](../../docs/basic-knowledge/computer-architecture/data-representation.mdx)
- ✅ [指令执行](../../docs/basic-knowledge/computer-architecture/instruction-execution.mdx)


### 24.2 数据编码

- ✅ [Base64](../../docs/basic-knowledge/encoding/base64.mdx)

---

## 25. C++

〔移动端，按岗选学〕支撑 JNI、原生模块及已有 C++ 项目追问，不增加独立 C++ 岗位路线。

### 25.1 类型与对象

- ✅ [C++ 类型系统](../../docs/basic-knowledge/cpp/type-system.mdx)
- ✅ [C++ 指针与引用](../../docs/basic-knowledge/cpp/pointers-references.mdx)
- ✅ [C++ 对象生命周期](../../docs/basic-knowledge/cpp/object-lifetime.mdx)
- ✅ [C++ 复制与移动](../../docs/basic-knowledge/cpp/copy-move.mdx)

### 25.2 抽象与资源管理

- ✅ [C++ 多态](../../docs/basic-knowledge/cpp/polymorphism.mdx)
- ✅ [C++ 智能指针](../../docs/basic-knowledge/cpp/smart-pointers.mdx)
- ✅ [C++ 容器](../../docs/basic-knowledge/cpp/containers.mdx)

### 25.3 编译与链接

- ✅ [C++ 编译与链接](../../docs/basic-knowledge/cpp/compilation-linking.mdx)


---

## 26. Kotlin

### 26.1 语言基础

- ✅ [Kotlin 类型系统](../../docs/basic-knowledge/kotlin/type-system.mdx)
- ✅ [Kotlin 空安全](../../docs/basic-knowledge/kotlin/null-safety.mdx)
- ✅ [Kotlin 函数](../../docs/basic-knowledge/kotlin/functions.mdx)
- ✅ [Kotlin 类与接口](../../docs/basic-knowledge/kotlin/classes-interfaces.mdx)
- ✅ [Kotlin 泛型](../../docs/basic-knowledge/kotlin/generics.mdx)

### 26.2 协程与流

- ✅ [Kotlin 协程](../../docs/basic-knowledge/kotlin/coroutines.mdx)
- ✅ [Kotlin Flow](../../docs/basic-knowledge/kotlin/flow.mdx)


---

## 27. Swift

### 27.1 语言基础

- ✅ [Swift 类型系统](../../docs/basic-knowledge/swift/type-system.mdx)
- ✅ [Swift Optional](../../docs/basic-knowledge/swift/optional.mdx)
- ✅ [Swift 闭包](../../docs/basic-knowledge/swift/closures.mdx)
- ✅ [Swift 协议与泛型](../../docs/basic-knowledge/swift/protocols-generics.mdx)

### 27.2 内存与并发

- ✅ [Swift ARC](../../docs/basic-knowledge/swift/arc.mdx)
- ✅ [Swift 并发](../../docs/basic-knowledge/swift/concurrency.mdx)


---

## 28. Objective-C

### 28.1 对象与 Block

- ✅ [Objective-C 对象模型](../../docs/basic-knowledge/objective-c/object-model.mdx)
- ✅ [Objective-C Block](../../docs/basic-knowledge/objective-c/block.mdx)

### 28.2 运行时与内存

- ✅ [Objective-C Runtime](../../docs/basic-knowledge/objective-c/runtime.mdx)
- ✅ [Objective-C 内存管理](../../docs/basic-knowledge/objective-c/memory-management.mdx)


---

## 29. Dart

### 29.1 类型与并发

- ✅ [Dart 类型系统](../../docs/basic-knowledge/dart/type-system.mdx)
- ✅ [Dart 并发](../../docs/basic-knowledge/dart/concurrency.mdx)


---

## 30. 移动端开发

〔移动端〕按目标岗位选择 Android、iOS、Flutter 或 React Native 分支；不要求同时学习全部平台。本轮正文、知识树接入及路线的源码、本地浏览器验收已接受，完整站点构建已通过，正式发布尚未执行；范围复核口径见[扩展进度](./campus-expansion-progress.md#范围复核快照)。

### 30.1 客户端数据

- ✅ [客户端数据同步](../../docs/mobile/common/data-synchronization.mdx)
- ✅ [移动端图片加载](../../docs/mobile/common/image-loading.mdx)

### 30.2 移动端性能

- ✅ [移动端性能指标](../../docs/mobile/common/performance-metrics.mdx)

### 30.3 图形与媒体

- ✅ [图形渲染管线](../../docs/mobile/common/rendering-pipeline.mdx)
- ✅ [媒体播放](../../docs/mobile/common/media-playback.mdx)

### 30.4 Android 组件与生命周期

- ✅ [Android 应用组件](../../docs/mobile/android/app-components.mdx)
- ✅ [Activity 生命周期](../../docs/mobile/android/activity-lifecycle.mdx)
- ✅ [Fragment 生命周期](../../docs/mobile/android/fragment-lifecycle.mdx)
- ✅ [Android 任务栈](../../docs/mobile/android/task-back-stack.mdx)

### 30.5 Android 界面

- ✅ [Android View](../../docs/mobile/android/view-layout-drawing.mdx)
- ✅ [Android 触摸事件](../../docs/mobile/android/touch-events.mdx)
- ✅ [RecyclerView](../../docs/mobile/android/recyclerview.mdx)
- ✅ [Jetpack Compose](../../docs/mobile/android/jetpack-compose.mdx)

### 30.6 Android 运行机制

- ✅ [Android 消息机制](../../docs/mobile/android/handler-looper.mdx)
- ✅ [Binder](../../docs/mobile/android/binder.mdx)
- ✅ [ART](../../docs/mobile/android/art.mdx)
- ✅ [Parcelable](../../docs/mobile/android/parcelable.mdx)
- ✅ [JNI](../../docs/mobile/android/jni.mdx)
- ✅ [Android 动态加载](../../docs/mobile/android/dynamic-loading.mdx)

### 30.7 Android 数据与网络

- ✅ [Android ViewModel](../../docs/mobile/android/viewmodel.mdx)
- ✅ [Android 偏好存储](../../docs/mobile/android/preferences.mdx)
- ✅ [Android DataStore](../../docs/mobile/android/datastore.mdx)
- ✅ [Room](../../docs/mobile/android/room.mdx)
- ✅ [OkHttp](../../docs/mobile/android/okhttp.mdx)
- ✅ [Retrofit](../../docs/mobile/android/retrofit.mdx)

### 30.8 Android 平台能力

- ✅ [Android WebView](../../docs/mobile/android/webview.mdx)
- ✅ [Android 应用沙箱与权限](../../docs/mobile/android/sandbox-permissions.mdx)
- ✅ [Android 后台任务](../../docs/mobile/android/background-work.mdx)

### 30.9 Android 诊断与工程

- ✅ [Android 内存泄漏](../../docs/mobile/android/memory-leaks.mdx)
- ✅ [ANR](../../docs/mobile/android/anr.mdx)
- ✅ [Android 性能诊断](../../docs/mobile/android/performance-diagnostics.mdx)
- ✅ [Android 构建](../../docs/mobile/android/build.mdx)
- ✅ [Android 测试](../../docs/mobile/android/testing.mdx)

### 30.10 iOS 生命周期与界面

- ✅ [iOS 应用生命周期](../../docs/mobile/ios/app-lifecycle.mdx)
- ✅ [UIViewController](../../docs/mobile/ios/view-controller.mdx)
- ✅ [UIKit 布局](../../docs/mobile/ios/uikit-layout.mdx)
- ✅ [iOS 事件响应链](../../docs/mobile/ios/responder-chain.mdx)
- ✅ [iOS 列表视图](../../docs/mobile/ios/list-views.mdx)
- ✅ [SwiftUI 状态管理](../../docs/mobile/ios/swiftui-state.mdx)

### 30.11 iOS 运行机制

- ✅ [RunLoop](../../docs/mobile/ios/run-loop.mdx)
- ✅ [Grand Central Dispatch](../../docs/mobile/ios/gcd.mdx)

### 30.12 iOS 数据与网络

- ✅ [URLSession](../../docs/mobile/ios/url-session.mdx)
- ✅ [iOS 数据持久化](../../docs/mobile/ios/persistence.mdx)

### 30.13 iOS 平台能力

- ✅ [WKWebView](../../docs/mobile/ios/wkwebview.mdx)
- ✅ [iOS 应用沙箱与权限](../../docs/mobile/ios/sandbox-permissions.mdx)
- ✅ [iOS 后台任务](../../docs/mobile/ios/background-tasks.mdx)
- ✅ [iOS 深层链接](../../docs/mobile/ios/deep-links.mdx)

### 30.14 iOS 诊断与工程

- ✅ [iOS 性能诊断](../../docs/mobile/ios/performance-diagnostics.mdx)
- ✅ [iOS 崩溃诊断](../../docs/mobile/ios/crash-diagnostics.mdx)
- ✅ [iOS 构建](../../docs/mobile/ios/build.mdx)
- ✅ [iOS 测试](../../docs/mobile/ios/testing.mdx)

### 30.15 Flutter 组件与界面

- ✅ [Flutter Widget、Element 与 RenderObject](../../docs/mobile/flutter/widget-element-render-object.mdx)
- ✅ [Flutter 状态管理](../../docs/mobile/flutter/state-management.mdx)
- ✅ [Flutter 布局与渲染](../../docs/mobile/flutter/layout-rendering.mdx)
- ✅ [Flutter 手势](../../docs/mobile/flutter/gestures.mdx)
- ✅ [Flutter 导航](../../docs/mobile/flutter/navigation.mdx)

### 30.16 Flutter 平台与工程

- ✅ [Flutter 平台通信](../../docs/mobile/flutter/platform-channels.mdx)
- ✅ [Flutter 测试](../../docs/mobile/flutter/testing.mdx)
- ✅ [Flutter 性能诊断](../../docs/mobile/flutter/performance-diagnostics.mdx)

### 30.17 React Native 渲染与平台

- ✅ [React Native 渲染](../../docs/mobile/react-native/rendering.mdx)
- ✅ [React Native 原生模块](../../docs/mobile/react-native/native-modules.mdx)
- ✅ [React Native 平台适配](../../docs/mobile/react-native/platform-adaptation.mdx)

### 30.18 React Native 测试与性能

- ✅ [React Native 测试](../../docs/mobile/react-native/testing.mdx)
- ✅ [React Native 性能诊断](../../docs/mobile/react-native/performance-diagnostics.mdx)


---

## 31. 测试开发

〔测试开发〕先完成测试分析、设计、接口与证据，再按目标岗位选择自动化、性能或平台内容。本轮正文、知识树接入及路线的源码、本地浏览器验收已接受，完整站点构建已通过，正式发布尚未执行；范围复核口径见[扩展进度](./campus-expansion-progress.md#范围复核快照)。

### 31.1 测试分析与设计

- ✅ [测试分析](../../docs/tools-and-frameworks/testing/test-analysis.mdx)
- ✅ [等价类划分](../../docs/tools-and-frameworks/testing/equivalence-partitioning.mdx)
- ✅ [边界值分析](../../docs/tools-and-frameworks/testing/boundary-value-analysis.mdx)
- ✅ [判定表](../../docs/tools-and-frameworks/testing/decision-tables.mdx)
- ✅ [状态迁移测试](../../docs/tools-and-frameworks/testing/state-transition-testing.mdx)
- ✅ [组合测试](../../docs/tools-and-frameworks/testing/combinatorial-testing.mdx)
- ✅ [探索式测试](../../docs/tools-and-frameworks/testing/exploratory-testing.mdx)

### 31.2 缺陷与质量报告

- ✅ [缺陷管理](../../docs/tools-and-frameworks/testing/defect-management.mdx)
- ✅ [测试报告](../../docs/tools-and-frameworks/testing/test-reporting.mdx)

### 31.3 接口、数据与环境

- ✅ [接口测试](../../docs/tools-and-frameworks/testing/api-testing.mdx)
- ✅ [测试数据管理](../../docs/tools-and-frameworks/testing/test-data-management.mdx)
- ✅ [测试环境](../../docs/tools-and-frameworks/testing/test-environments.mdx)

### 31.4 自动化与开发流程

- ✅ [Web UI 自动化测试](../../docs/tools-and-frameworks/testing/ui-automation.mdx)
- ✅ [兼容性测试](../../docs/tools-and-frameworks/testing/compatibility-testing.mdx)
- ✅ [测试驱动开发](../../docs/tools-and-frameworks/testing/test-driven-development.mdx)

### 31.5 性能与可靠性

- ✅ [性能测试](../../docs/tools-and-frameworks/testing/performance-testing.mdx)
- ✅ [JMeter](../../docs/tools-and-frameworks/testing/jmeter.mdx)
- ✅ [故障注入测试](../../docs/tools-and-frameworks/testing/fault-injection-testing.mdx)

### 31.6 测试平台与辅助工具

- ✅ [测试执行平台](../../docs/tools-and-frameworks/testing/test-execution-platform.mdx)
- ✅ [模糊测试](../../docs/tools-and-frameworks/testing/fuzz-testing.mdx)
- ✅ [AI 辅助测试](../../docs/tools-and-frameworks/testing/ai-assisted-testing.mdx)
