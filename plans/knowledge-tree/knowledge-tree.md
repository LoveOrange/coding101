# Coding 101 知识树（第二版）

本文是知识树的规划总表，按 **领域 → Topic → 文章** 三层组织，覆盖后端（Java、Go、Python）、前端（含 Node.js）、AI 应用与 Agent、大数据、运维与云原生七类岗位。站点“知识树”页面的已发布部分由 [`src/data/knowledgeTree.ts`](../../src/data/knowledgeTree.ts) 维护，两者的领域和 Topic 保持同名同序；本文额外保留待写文章、优先级和关联关系。

第一版按方向拆成多份分纲（[README](./README.md)），其中的停止条件、面经频率和 M1 知识点清单继续有效；本文取代它们的**领域与 Topic 划分**。

## 0. 读法与标记

**层级含义**

- **领域**：一类岗位共同复习的大块知识，例如“数据库”“系统设计”“Go”。
- **Topic**：领域内一组相互支撑、通常放在一起复习的文章，例如“索引”“事务与锁”。Topic 至少规划两篇文章；只有一个概念时并入相邻 Topic。
- **文章**：一个可以独立命名的概念，对应一篇 5—10 分钟的复习正文。

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

优先级默认面向 Topic 所标岗位；同一文章对不同岗位的优先级差异写在第 20 节的岗位路径中。

**取舍原则**

1. 面试基本不问、也不影响理解后续内容的知识不进入知识树，例如编译原理、汇编、具体云厂商控制台操作。
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
- ✅ ★ 哈希表 ↔ HashMap、Go map、Python dict
- ⬜ 单调栈与单调队列（下一个更大元素、滑动窗口最值）
- ⬜ ☆ 跳表 ↔ Redis 底层编码
- ⬜ ☆ 位图与布隆过滤器 ↔ 缓存穿透

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
- ⬜ ☆ 分治

---

## 2. 操作系统

〔后端 运维 Node〕程序运行时的资源模型。Linux 命令与排查归第 19 节“运维与云原生”。

### 2.1 进程与线程

- ✅ ★ 进程与线程 ↔ Java 线程、goroutine
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
- ⬜ 页缓存与文件系统（inode、硬链接、fsync） ↔ redo log、Kafka 存储
- ⬜ ☆ Reactor 与 Proactor ↔ Netty、Node.js 事件循环

---

## 3. 计算机网络

〔通用〕前端更偏 HTTP、缓存与安全，后端与运维更偏 TCP 和排查。

### 3.1 网络模型与 IP

- ✅ ★ 网络模型（OSI、TCP/IP）
- ✅ IP（地址、子网、路由）
- ⬜ ARP 与 NAT ↔ Kubernetes 网络
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
- ⬜ HTTP/2 与 HTTP/3（多路复用、QUIC）
- ⬜ ★ Cookie 与 Session ↔ Session、JWT、OAuth 2.0 与 OIDC
- ⬜ WebSocket 与 SSE ↔ 流式输出、即时消息系统

### 3.4 HTTPS 与 DNS

- ✅ ★ TLS（握手、证书链、前向保密） ↔ 对称与非对称加密
- ✅ ★ DNS ↔ 服务发现
- ⬜ CDN ↔ HTTP 缓存、前端部署

### 3.5 RPC

- ✅ RPC（序列化、Netty 事件循环）
- ⬜ gRPC 与 Protocol Buffers ↔ Go 微服务
- ⬜ ☆ 序列化协议（JSON、Protobuf、Hessian 的取舍） ↔ Java 序列化

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

- ✅ 数据约束
- ⬜ 范式与反范式 ↔ 维度建模
- ⬜ ☆ 字段类型选择（主键、时间、金额、字符集） ↔ BigDecimal

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

- ⬜ InnoDB 架构与 Buffer Pool
- ⬜ ★ redo log 与 undo log ↔ 页缓存与文件系统
- ⬜ ★ binlog 与两阶段提交 ↔ Transactional Outbox 与 CDC
- ⬜ ☆ 崩溃恢复
- ⬜ ☆ LSM 树 ↔ HBase、Elasticsearch

### 4.6 复制与扩展

- ⬜ ★ 主从复制与读写分离 ↔ 主备复制
- ⬜ ★ 分库分表（分片键、跨分片查询、扩容） ↔ 数据拆分、分布式 ID
- ⬜ ☆ 备份与恢复 ↔ 灾难恢复
- ⬜ ☆ PostgreSQL 与 MySQL 的差异（Python 和 Go 岗位较常见）
- ⬜ ☆ MongoDB（文档模型、适用场景）

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

- ✅ ★ Redis 持久化、复制与集群（合篇，待拆为下面三篇）
- ⬜ ★ RDB 与 AOF
- ⬜ 主从复制与哨兵 ↔ 故障转移
- ⬜ Redis Cluster（哈希槽、重定向） ↔ 一致性哈希

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
- ⬜ ☆ ZooKeeper 与 etcd（协调服务、Watch、租约） ↔ Raft、服务发现
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
- ⬜ 一致性哈希 ↔ Redis Cluster
- ⬜ ★ 分布式 ID（号段、雪花算法、时钟回拨） ↔ 分库分表
- ⬜ 读写放大与扇出（推拉模型） ↔ 设计社交时间线
- ⬜ ☆ CQRS 与事件溯源

### 7.3 分布式理论

- ✅ ★ CAP 理论（含 BASE）
- ✅ 一致性模型（线性一致、最终一致、Quorum）
- ✅ 主备复制 ↔ 主从复制与读写分离
- ✅ Raft ↔ etcd
- ✅ ☆ 跨地域复制
- ⬜ ☆ 分布式时钟与租约（物理时钟、逻辑时钟、Fencing Token） ↔ 分布式锁
- ⬜ ☆ Paxos 与 ZAB（只比较与 Raft 的差异）

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
- ⬜ ☆ 服务网格（Sidecar、Istio） ↔ Kubernetes 网络
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
- ⬜ ★ 设计短链接系统 ↔ 分布式 ID、缓存
- ⬜ ★ 设计秒杀系统（库存扣减、削峰、防超卖） ↔ 限流、消息队列、Redis Lua
- ⬜ ★ 设计订单支付系统 ↔ Saga、幂等键
- ⬜ 设计排行榜 ↔ 排行榜与计数
- ⬜ 设计社交时间线（Feed 流） ↔ 读写放大与扇出
- ⬜ 设计即时消息系统 ↔ WebSocket 与 SSE
- ⬜ 设计通知系统
- ⬜ 设计限流服务 ↔ 限流
- ⬜ ☆ 设计任务调度系统 ↔ 分布式任务调度
- ⬜ ☆ 设计文件存储系统（分块上传、对象存储）
- ⬜ ☆ 设计搜索建议系统 ↔ 字典树（Trie）
- ⬜ ☆ 设计知识库问答系统 ↔ RAG（AI 岗必会）
- ⬜ ☆ 设计客服 Agent ↔ Agent 执行循环（AI 岗必会）

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
- ⬜ ★ XSS ↔ 内容安全策略
- ⬜ ★ CSRF ↔ Cookie 与 Session
- ⬜ ★ 跨域与 CORS ↔ 同源策略
- ⬜ SQL 注入与参数化查询 ↔ MyBatis

### 8.3 密码学与密钥

- ⬜ ★ 对称加密、非对称加密与数字签名（前置） ↔ TLS、JWT
- ⬜ 密码存储（哈希、加盐、bcrypt）
- ✅ ☆ 密钥、证书、审计与供应链安全

---

## 9. 软件工程

〔通用〕与语言无关的工程能力。语言专属的测试和构建工具放在各语言领域。

### 9.1 Git

- ⬜ ★ Git 对象模型与分支（commit、HEAD、引用）
- ⬜ ★ merge 与 rebase
- ⬜ ★ 撤销修改（reset、revert、restore）
- ⬜ 分支策略与代码评审（Git Flow、主干开发、PR） ↔ CI/CD 流水线

现有 Git 安装与首次提交教程保留在“工具”栏目，不进入知识树。

### 9.2 软件测试

- ✅ ★ 测试金字塔（单元、集成、契约、回归）
- ✅ 测试替身（Mock、Stub、Fake）
- ⬜ ☆ 测试驱动开发（TDD）
- ⬜ ☆ 性能测试与压测 ↔ 容量规划

### 9.3 设计原则与设计模式

- ✅ ★ SOLID 面向对象设计原则
- ⬜ ★ 单例模式（双重检查锁、枚举、并发问题） ↔ volatile、安全发布
- ⬜ ★ 工厂模式
- ⬜ ★ 策略模式
- ⬜ ★ 代理模式 ↔ JDK 动态代理与 CGLIB
- ⬜ 观察者模式 ↔ Spring 事件、Vue 响应式
- ⬜ 装饰器模式 ↔ Java 流式 I/O、Python 装饰器
- ⬜ 模板方法模式 ↔ AQS
- ⬜ 责任链模式 ↔ Spring 拦截机制、中间件模型（Koa、Gin）
- ⬜ ☆ 适配器模式
- ✅ ☆ 设计一个奶茶店（面向对象设计题，草稿）

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

---

## 11. Go

〔Go〕Go 后端面试集中在切片与 map、接口、并发原语和 GMP 调度。网络、数据库和系统设计引用共享领域。

### 11.1 语言基础

- ⬜ ★ Go 值类型与引用语义（值传递、指针、new 与 make） ↔ Java 值传递
- ⬜ ★ Go 切片（底层数组、扩容、共享与截断） ← 数组
- ⬜ ★ Go map（哈希桶、扩容、无序遍历、并发读写） ← 哈希表
- ⬜ ★ Go 字符串与 rune（不可变、UTF-8、拼接成本）
- ⬜ 结构体、方法与嵌入（值接收者与指针接收者）
- ⬜ ★ Go 接口（隐式实现、iface 与 eface、nil 接口不等于 nil）
- ⬜ ★ Go 错误处理（error 包装、errors.Is/As、panic 与 recover）
- ⬜ ★ defer（执行顺序、参数求值、与返回值的交互）
- ⬜ Go 泛型（类型参数与约束）
- ⬜ ☆ Go 反射与结构体标签 ↔ Java 反射

### 11.2 并发编程

- ⬜ ★ goroutine ↔ 协程、虚拟线程
- ⬜ ★ channel（有缓冲与无缓冲、关闭语义、底层结构）
- ⬜ ★ select（多路选择、超时、随机性）
- ⬜ ★ sync 包（Mutex、RWMutex、WaitGroup、Once、Cond） ↔ 线程同步
- ⬜ sync.Pool 与 sync.Map
- ⬜ 原子操作（sync/atomic） ↔ CAS
- ⬜ ★ context（取消、超时、值传递） ↔ 超时
- ⬜ Go 内存模型（happens-before） ↔ Java 内存模型
- ⬜ 并发模式（Worker Pool、Fan-in/Fan-out、Pipeline、errgroup）
- ⬜ ★ goroutine 泄漏与数据竞争（-race） ↔ 并发活跃性

### 11.3 运行时

- ⬜ ★ GMP 调度模型（工作窃取、抢占、系统调用） ← 进程调度与上下文切换
- ⬜ ★ Go 垃圾回收（三色标记、写屏障、GC 调优） ↔ 分代回收
- ⬜ Go 内存分配（mcache、mcentral、mheap） ← 进程内存布局与内存分配
- ⬜ ★ Go 逃逸分析 ↔ 逃逸分析与标量替换
- ⬜ ☆ goroutine 栈（连续栈、扩缩容）

### 11.4 工程与生态

- ⬜ Go Modules（版本选择、replace、vendor）
- ⬜ Go 测试与基准测试（表驱动、testing.B、fuzz）
- ⬜ ★ pprof 性能分析（CPU、内存、goroutine） ↔ 火焰图
- ⬜ net/http 与 Gin（Handler、中间件链） ↔ 责任链模式
- ⬜ ☆ GORM ↔ N+1 查询
- ⬜ ☆ gRPC-Go 与 Kratos/go-zero ↔ gRPC 与 Protocol Buffers

---

## 12. Python

〔Py AI 大数据〕Python 后端集中在对象模型、装饰器与生成器、GIL 与并发、Web 框架；AI 与数据岗位额外关注数据处理库。

### 12.1 语言基础

- ⬜ ★ Python 对象模型（一切皆对象、可变与不可变、is 与 ==）
- ⬜ ★ 深拷贝与浅拷贝 ↔ Java 值传递
- ⬜ ★ list、dict 与 set 的实现（动态数组、哈希表、有序 dict） ← 哈希表
- ⬜ ★ 函数参数与作用域（默认参数陷阱、*args/**kwargs、LEGB）
- ⬜ ★ 闭包与装饰器 ↔ 装饰器模式
- ⬜ ★ 迭代器与生成器（yield、惰性求值） ↔ Stream
- ⬜ 上下文管理器（with、contextlib）
- ⬜ Python 异常处理
- ⬜ ☆ 类型注解与 Pydantic ↔ 结构化输出

### 12.2 面向对象与元编程

- ⬜ ★ 类与实例（实例属性、类属性、@staticmethod 与 @classmethod）
- ⬜ ★ 魔法方法（__init__ 与 __new__、__eq__ 与 __hash__） ↔ 对象相等性
- ⬜ 多继承与 MRO（C3 线性化、super）
- ⬜ ☆ 描述符与 property
- ⬜ ☆ 元类

### 12.3 运行时与并发

- ⬜ ★ GIL（影响范围、I/O 与 CPU 任务的差异、3.13 自由线程）
- ⬜ ★ Python 内存管理（引用计数、循环垃圾回收）
- ⬜ ★ 多线程与多进程（threading、multiprocessing、concurrent.futures） ↔ 进程与线程
- ⬜ ★ asyncio（事件循环、协程、Task、与线程混用） ↔ 协程、Node.js 事件循环
- ⬜ ☆ CPython 执行过程（字节码、.pyc） ↔ Java 字节码

### 12.4 Web 框架

- ⬜ ★ WSGI 与 ASGI ↔ I/O 模型
- ⬜ ★ FastAPI（依赖注入、异步路由、数据校验） ↔ 依赖注入
- ⬜ Django（MTV、中间件、ORM 与 N+1、信号） ↔ N+1 查询
- ⬜ ☆ Flask（上下文、蓝图）
- ⬜ ☆ Celery 异步任务 ↔ 分布式任务调度

### 12.5 工程与数据处理

- ⬜ 包管理与虚拟环境（pip、venv、Poetry、uv）
- ⬜ pytest（fixture、参数化、Mock） ↔ 测试替身
- ⬜ ☆ Python 性能分析与优化（cProfile、向量化）
- ⬜ ☆ NumPy 与 Pandas（向量化、DataFrame 常用操作，数据与 AI 岗）

---

## 13. JavaScript 与 TypeScript

〔前端 Node〕前端与 Node.js 共同的语言基础。

### 13.1 语言基础

- ⬜ ★ 数据类型与类型转换（原始值与引用、typeof、== 与 ===）
- ⬜ ★ 作用域与闭包（词法作用域、var/let/const、暂时性死区）
- ⬜ ★ this 绑定（调用方式、箭头函数、call/apply/bind）
- ⬜ ★ 原型与原型链（继承、class 语法糖、instanceof）
- ⬜ ★ 深拷贝与浅拷贝（structuredClone、循环引用） ↔ 深拷贝与浅拷贝（Python）
- ⬜ ES6+ 常用特性（解构、展开、Symbol、Map/Set、Proxy 与 Reflect） ↔ Vue 响应式原理
- ⬜ ☆ 迭代器与生成器 ↔ 迭代器与生成器（Python）
- ⬜ ★ 手写题（防抖与节流、new、bind、Promise.all、柯里化）

### 13.2 异步与运行时

- ⬜ ★ 事件循环（宏任务、微任务、渲染时机） ↔ Node.js 事件循环
- ⬜ ★ Promise（状态、链式调用、错误传播）
- ⬜ ★ async/await ↔ asyncio
- ⬜ JavaScript 垃圾回收与内存泄漏（V8 分代、常见泄漏） ↔ 分代回收
- ⬜ ☆ V8 执行过程（解析、字节码、JIT） ↔ 分层编译

### 13.3 模块化

- ⬜ ★ ES Module 与 CommonJS（加载时机、循环依赖、互操作） ↔ Node.js 模块机制
- ⬜ ☆ Tree Shaking 的前提 ↔ Webpack 与 Vite

### 13.4 TypeScript

- ⬜ ★ TypeScript 类型系统（结构化类型、any/unknown/never、类型收窄）
- ⬜ ★ TypeScript 泛型与工具类型（Partial、Pick、Record、条件类型、infer） ↔ Java 泛型
- ⬜ interface 与 type
- ⬜ ☆ 声明文件与类型体操

---

## 14. 浏览器与前端基础

〔前端〕页面如何被加载、渲染和交互。

### 14.1 HTML 与 CSS

- ⬜ ★ 盒模型与 BFC
- ⬜ ★ CSS 布局（Flex、Grid、定位、居中方案）
- ⬜ 选择器优先级与层叠
- ⬜ 响应式布局与移动端适配（rem、vw、媒体查询、1px 问题）
- ⬜ ☆ 语义化与可访问性

### 14.2 浏览器原理

- ⬜ ★ 浏览器渲染流程（DOM、CSSOM、布局、绘制、合成） ↔ 从输入 URL 到页面展示
- ⬜ ★ 重排与重绘
- ⬜ ★ DOM 事件机制（捕获、冒泡、事件委托）
- ⬜ 浏览器进程模型（多进程架构、渲染进程、主线程）
- ⬜ ★ 浏览器存储（Cookie、localStorage、sessionStorage、IndexedDB） ↔ Cookie 与 Session
- ⬜ ★ 同源策略 ↔ 跨域与 CORS
- ⬜ ☆ Web Worker 与 Service Worker

### 14.3 前端性能

- ⬜ ★ 性能指标（LCP、INP、CLS）与测量
- ⬜ ★ 加载优化（资源压缩、懒加载、预加载、代码分割） ↔ HTTP 缓存、CDN
- ⬜ 渲染优化（长列表虚拟滚动、动画、防抖节流）
- ⬜ ☆ 前端监控与错误上报

---

## 15. 前端框架与工程化

〔前端〕面试通常主考 React 或 Vue 之一；另一个按岗选学。

### 15.1 React

- ⬜ ★ JSX 与组件（受控与非受控、props 与 state）
- ⬜ ★ Hooks 原理与规则（useState、useEffect、闭包陷阱）
- ⬜ ★ 虚拟 DOM 与 Diff ↔ Vue 渲染机制
- ⬜ ★ Fiber 与并发渲染（可中断渲染、优先级）
- ⬜ React 性能优化（memo、useMemo、useCallback）
- ⬜ React 状态管理（Context、Redux、Zustand）
- ⬜ ☆ React 18/19 新特性（Suspense、Transition、Server Components）

### 15.2 Vue

- ⬜ ★ Vue 响应式原理（Proxy、依赖收集、Vue 2 与 Vue 3 差异） ↔ 观察者模式
- ⬜ ★ Vue 渲染机制（模板编译、虚拟 DOM、Diff、静态提升） ↔ 虚拟 DOM 与 Diff
- ⬜ ★ 组件通信与生命周期
- ⬜ computed 与 watch、nextTick ↔ 事件循环
- ⬜ Composition API
- ⬜ ☆ Pinia 与 Vue Router

### 15.3 路由与渲染模式

- ⬜ 前端路由（Hash 与 History）
- ⬜ ★ CSR、SSR、SSG 与同构（首屏、SEO、水合） ↔ Next.js 与 Nuxt
- ⬜ ☆ Next.js 与 Nuxt
- ⬜ ☆ 微前端（qiankun、Module Federation、样式与 JS 隔离）

### 15.4 前端工程化

- ⬜ ★ Webpack 与 Vite（构建流程、Loader 与 Plugin、HMR、开发服务器差异）
- ⬜ 包管理器（npm、pnpm、依赖提升、lockfile）
- ⬜ Babel 与代码转换（AST、Polyfill）
- ⬜ 代码规范与提交检查（ESLint、Prettier、Husky） ↔ 分支策略与代码评审
- ⬜ 前端测试（Jest/Vitest、Testing Library、E2E） ↔ 测试金字塔
- ⬜ ☆ 前端部署与发布（静态资源版本、缓存失效、灰度） ↔ CDN、灰度发布

---

## 16. Node.js

〔Node 前端〕服务端 JavaScript：事件循环、流、进程模型与服务框架。

### 16.1 运行时

- ⬜ ★ Node.js 事件循环（libuv 阶段、process.nextTick、setImmediate） ↔ 事件循环、I/O 多路复用
- ⬜ ★ Node.js 模块机制（require 解析、缓存、ESM 互操作） ↔ ES Module 与 CommonJS
- ⬜ ★ Buffer 与 Stream（背压、pipe） ↔ 背压
- ⬜ ★ 进程与线程（child_process、cluster、worker_threads） ↔ 进程与线程
- ⬜ Node.js 内存与性能排查（堆快照、内存泄漏、CPU 分析） ↔ JavaScript 垃圾回收与内存泄漏

### 16.2 服务开发

- ⬜ ★ Koa 与 Express（洋葱模型、中间件） ↔ 责任链模式
- ⬜ NestJS（模块、依赖注入、装饰器） ↔ 依赖注入
- ⬜ BFF 与接口聚合 ↔ API 网关
- ⬜ ☆ Node.js 服务稳定性（异常捕获、优雅退出、PM2） ↔ 超时、可观测性
- ⬜ ☆ Node.js ORM（Prisma、TypeORM） ↔ N+1 查询

---

## 17. AI 应用与 Agent

〔AI〕面向模型接入、检索、工具执行和应用交付岗位。模型训练与推理优化只讲到能判断应用边界。详细停止条件见[第一版 Agent 分纲](./agent.md)和[Agent 辅助开发](./agentic-development-knowledge-points.md)。

### 17.1 大模型基础

- ⬜ ★ 大语言模型（LLM）（生成过程、能力边界）
- ⬜ ★ Token 与上下文窗口
- ⬜ ★ Transformer 与注意力机制（只讲到能解释上下文长度与 KV Cache） ↔ 推理部署与 KV Cache
- ⬜ ★ 模型幻觉 ↔ 引用与证据
- ⬜ 采样参数（temperature、top-p）
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

- ✅ ★ Agent 评估（成功标准、回归集、重复运行）
- ✅ RAG 评估（检索、引用、生成分层评估）
- ⬜ LLM 评审（要点暂并入《Agent 评估》；LLM-as-Judge）
- ⬜ Agent 可观测性（归因要点暂并入《Agent 评估》；轨迹、用量、失败分析） ↔ 分布式追踪

### 17.8 安全与服务化

- ✅ ★ 提示注入 ↔ Web 应用安全
- ✅ ★ 工具授权与执行沙箱 ↔ 认证与授权、容器原理
- ⬜ AI 数据安全（敏感数据、检索权限、记忆污染）
- ⬜ AI 应用服务化（并发、限流、取消、任务队列） ↔ 限流、超时
- ⬜ 成本与延迟优化（Token 预算、缓存、批处理）
- ⬜ ☆ 推理部署与 KV Cache（vLLM、量化、批处理）

### 17.9 框架与 AI 辅助开发

- ⬜ LangChain 与 LangGraph
- ⬜ ☆ Spring AI ↔ Spring Boot 自动配置
- ⬜ ☆ LlamaIndex
- ✅ AI 辅助开发（任务拆分、上下文、验证与代码评审） ↔ 测试金字塔、分支策略与代码评审
- ✅ AI 代码调试（复现、假设、根因与回归） ← AI 辅助开发
- ✅ 仓库指令（AGENTS.md 等规则文件的内容、维护与验证）
- ✅ ☆ 编码 Agent 评测

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

### 19.1 Linux

- ⬜ ★ Linux 常用命令（文本处理 grep/awk/sed、查找、压缩）
- ⬜ ★ 文件权限与用户（rwx、SUID、umask）
- ⬜ ★ Linux 进程管理（ps、kill 与信号、nohup、systemd） ↔ 僵尸进程与孤儿进程
- ⬜ ★ Linux 性能排查（top、vmstat、iostat、free、load average 的含义） ↔ CPU 使用率
- ⬜ ★ Linux 网络排查（ss、netstat、tcpdump、curl、dig） ↔ TCP 连接排查
- ⬜ Shell 脚本
- ⬜ ☆ 磁盘与文件系统管理（df/du、inode 耗尽、LVM） ↔ 页缓存与文件系统

### 19.2 容器

- ⬜ ★ 容器原理（Namespace、Cgroups、联合文件系统） ↔ 进程与线程
- ⬜ ★ Docker 镜像与 Dockerfile（分层、多阶段构建、镜像瘦身）
- ⬜ Docker 网络与存储（bridge、host、卷）
- ⬜ ☆ 容器运行时（containerd、OCI）

### 19.3 Kubernetes

- ⬜ ★ Kubernetes 架构（API Server、etcd、Scheduler、Controller、kubelet） ↔ ZooKeeper 与 etcd
- ⬜ ★ Pod（生命周期、探针、资源 requests 与 limits）
- ⬜ ★ 工作负载（Deployment、StatefulSet、DaemonSet、Job）
- ⬜ ★ Service 与 Ingress ↔ 服务发现、负载均衡
- ⬜ ConfigMap 与 Secret
- ⬜ 存储（PV、PVC、StorageClass）
- ⬜ Kubernetes 调度（亲和性、污点与容忍）
- ⬜ 弹性伸缩（HPA、VPA）
- ⬜ ☆ Kubernetes 网络（CNI、Pod 间通信） ↔ ARP 与 NAT
- ⬜ ☆ Helm 与 Operator

### 19.4 CI/CD 与发布

- ✅ ★ 可重复交付（Docker、CI/CD）
- ⬜ CI/CD 流水线（构建、测试、制品、环境晋级） ↔ 分支策略与代码评审
- ⬜ ★ 发布策略（滚动、蓝绿、金丝雀、回滚） ↔ 灰度发布
- ⬜ ☆ GitOps（Argo CD）

### 19.5 可观测性

- ✅ ★ 可观测性（日志、指标、追踪的关联）
- ⬜ ★ 监控与告警（Prometheus、指标类型、告警设计） ↔ 服务等级目标（SLO）
- ⬜ 日志系统（ELK、Loki、结构化日志）
- ⬜ 分布式追踪（OpenTelemetry、Trace 与 Span） ↔ Agent 可观测性
- ⬜ ☆ 火焰图与 eBPF

### 19.6 故障排查与响应

- ✅ ★ 生产故障诊断（JVM、线程、SQL、网络联合排查）
- ⬜ ★ 故障响应（定级、止血、沟通、复盘） ↔ 事故复盘
- ⬜ 常见线上故障（磁盘满、连接数耗尽、DNS 解析失败、证书过期）

### 19.7 流量与基础设施

- ⬜ ★ Nginx（反向代理、负载均衡、限流、配置） ↔ 负载均衡
- ⬜ ☆ 基础设施即代码（Terraform、Ansible）
- ⬜ ☆ 云网络与权限（VPC、安全组、IAM）

---

## 20. 岗位路径

岗位路径只决定**读哪些 Topic、按什么顺序、读到什么深度**，不复制正文。“必读”对应第一轮；“补充”在必读掌握后进入；没列出的领域按项目选学。

| 岗位 | 必读 | 补充 |
| --- | --- | --- |
| Java 后端 | 1 算法；2 操作系统；3 网络；4 数据库（4.1—4.4、4.6）；5 Redis；6.1 消息基础；10 Java（10.1—10.7、10.8—10.9 的 ★、10.12—10.15）；7.1、7.5 系统设计 | 4.5 日志；6.2 Kafka；7.2—7.4、7.7、7.9；8.1 认证；9.3 设计模式；10.10—10.11 JVM 诊断；19.1 Linux |
| Go 后端 | 1 算法；2 操作系统；3 网络；4 数据库；5 Redis；6.1；11 Go（11.1—11.3）；7.1、7.5 | 6.2 Kafka；7.2—7.4、7.7、7.9；11.4 工程；19.2—19.3 容器与 Kubernetes |
| Python 后端 | 1 算法；3 网络；4 数据库；5 Redis；12 Python（12.1—12.4）；7.1、7.5 | 2 操作系统；6.1；7.9；8.1；9.3；19.2 容器 |
| 前端 | 1 算法（1.1—1.4 的 ★）；3 网络（3.1、3.3、3.4）；13 JS/TS；14 浏览器；15 框架与工程化（React 或 Vue 主选一个）；8.2 Web 安全 | 8.1 认证；9.1 Git；9.3 设计模式；16 Node.js |
| Node.js / 全栈 | 13 JS/TS；16 Node.js；3 网络；4 数据库（4.1—4.4）；5 Redis（5.1、5.4）；14 浏览器 | 2 操作系统；6.1；7.1、7.5；15 框架 |
| AI 应用 / Agent | 17 AI（17.1—17.8 的 ★）；12 Python（12.1、12.3）或主语言；3.3 HTTP；4.1、4.3 数据库；1 算法 | 7.1、7.5、7.9 设计题（知识库问答、客服 Agent）；6.1；8.1；17.9 |
| 大数据开发 | 18 大数据；4.1—4.3 SQL 与索引；1 算法；Java 或 Python 语言基础（10.1、10.4 或 12.1）；6.1—6.2 消息与 Kafka；7.3 分布式理论 | 10.8—10.9 JVM；19.1 Linux；4.5 存储引擎与日志 |
| 运维 / SRE | 19 运维与云原生；2 操作系统；3 网络；7.5—7.6 可靠性与容灾 | 4.4、4.6 数据库；5.3 Redis 高可用；6.2 Kafka；11 Go 或 12 Python（脚本与工具开发）；7.7 微服务治理 |

---

## 21. 相对第一版的调整

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

## 22. 维护约定

- 新文章写完后，同时在本文把 ⬜ 改为 ✅，并在 `src/data/knowledgeTree.ts` 对应 Topic 中加入文档 ID；构建时会检查数据文件中的 ID 是否存在。
- 合篇拆分后，原文章保留为导航页或重定向，本文删除“合篇”说明。
- `↔` 关联在正文中写成文章内链接；关联是双向的，但只在其中一方的段落确实需要对方时才加。
- 新增 Topic 时先确认它在别的领域没有同类内容；领域和 Topic 的名称、顺序与 `knowledgeTree.ts` 保持一致。
