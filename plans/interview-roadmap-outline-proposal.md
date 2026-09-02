# Coding101 面试路线 Outline 审批稿（v1）

> 状态：仅供内容结构审批，不参与 Docusaurus 渲染。
>
> 更新时间：2026-08-18

## 1. 目标与口径

这套路线服务技术岗位求职准备，不追求堆出一份无限长的“八股题库”。读者先完成目标岗位的最小复习集合，再根据 JD、项目经历和面试反馈逐层深入。

- **覆盖目标**：覆盖目标岗位约 90% 的常见技术面试考点。“90%”是内容设计目标，不冒充严格统计结论；验收口径是抽样面经中的问题至少 90% 能归入现有 Topic，剩余问题多为公司业务、特定工具或研究前沿。
- **回答深度**：基础回答侧重定义、用途和直接差异；原理解释侧重关键执行链路；场景分析侧重约束、故障和方案取舍。回答深度不是候选人职级。
- **复习优先级**：必会、常考、按岗选学三级。必会构成第一轮最小集合；按岗选学只在 JD、项目经历或目标面试明确涉及时进入。
- **组织方式**：共享基础只维护一份，岗位路线通过 Topic 引用进行组合；岗位页只保留该岗位独有的语言、框架、平台和场景。
- **内容单元**：每个 Topic 包含核心结论、停止条件、自测问题，以及区分核心与深入的文章入口。

## 2. 总清单：22 条 Outline

### A. 共享基础（8 条）

| ID | Outline | 主要服务岗位 |
| --- | --- | --- |
| F01 | 数据结构、算法与现场编码 | 全部研发、测开、数据、AI 岗位 |
| F02 | 计算机基础综合：体系结构、操作系统、Linux、网络、编译原理 | 全部技术岗位 |
| F03 | 数据库、缓存、搜索与存储系统 | 后端、大数据、测开、SRE、AI 应用 |
| F04 | 软件工程、测试、Git、构建与交付 | 全部工程岗位 |
| F05 | 系统设计与分布式系统 | Middle/Senior 工程岗位 |
| F06 | 安全、隐私与供应链安全 | 前后端、移动端、SRE、测试、AI/Agent |
| F07 | 简历、项目深挖、行为面与面试表达 | 全部岗位 |
| F08 | 数学、机器学习与深度学习基础 | 大模型、RAG、Agent、大数据的 AI 分支 |

### B. 岗位路线（14 条）

| ID | Outline | 说明 |
| --- | --- | --- |
| R01 | Java 后端开发 | 扩充当前 Java v1，而非推倒重做 |
| R02 | Go 后端与云原生开发 | Go runtime、并发、服务端与云原生 |
| R03 | Python 后端与 AI 服务开发 | Django/FastAPI、异步、任务系统、AI 服务 |
| R04 | C++ 系统与基础设施开发 | 现代 C++、Linux、网络与性能工程 |
| R05 | Web 前端开发 | HTML/CSS/JS/TS、React/Vue、浏览器与前端架构 |
| R06 | 移动端通用与跨平台开发 | 移动约束、离线同步、发布、Flutter/RN/KMP |
| R07 | Android 开发 | Kotlin、Compose/Views、Jetpack、Framework |
| R08 | iOS 开发 | Swift、SwiftUI/UIKit、并发、Runtime 与 Instruments |
| R09 | 大数据与数据工程 | 数仓、Spark/Flink/Kafka、湖仓与治理 |
| R10 | 软件测试与测试开发（QA/SDET） | 测试设计、自动化、性能、安全与测试平台 |
| R11 | 运维、DevOps、SRE 与平台工程 | Linux、Kubernetes、可观测性、可靠性与平台化 |
| R12 | 大模型算法、训练与推理 | Transformer、数据、后训练、评测、推理部署 |
| R13 | 大模型应用与 RAG 工程 | Prompt、检索、评测、线上服务和企业级治理 |
| R14 | AI Agent 工程 | 工具、MCP、工作流、记忆、评测、安全与运行时 |

全栈开发不单独复制一套内容，推荐由 R05 前端 + R01/R02/R03 任一后端组合；AI 全栈由 R05 + R03 + R13/R14 组合。

## 3. 共享基础详细 Outline

### F01. 数据结构、算法与现场编码

**定位**：所有技术岗位的共同必修；同一题目同时训练复杂度、沟通、正确性和可测试性。

1. **Junior 01｜复杂度与编码基本功**：Big-O/Ω/Θ；时间与空间权衡；递归复杂度；输入约束；边界条件；溢出、空值和异常；手写测试用例；代码可读性。
2. **Junior 02｜线性结构与哈希**：数组、字符串、链表、栈、队列、双端队列、哈希表、集合；冲突与扩容；LRU/LFU；位图与布隆过滤器入门。
3. **Junior 03｜树、堆与图基础**：二叉树、BST、平衡树概念、Trie、堆、并查集、图的表示；DFS/BFS；拓扑排序；最短路与最小生成树入门。
4. **Middle 01｜高频解题模式**：双指针、滑动窗口、前缀和/差分、二分、排序、分治、回溯、贪心、动态规划、单调栈/队列、区间问题。
5. **Middle 02｜算法正确性与工程约束**：循环不变量；归纳证明；摊还分析；随机化；流式/外存算法；并发场景的数据结构选择；内存局部性。
6. **Senior 01｜高级结构与场景设计**：跳表、B/B+ 树、LSM Tree、倒排索引、一致性哈希、近似统计、Count-Min Sketch、向量检索结构概念；从业务约束选择结构。
7. **Senior 02｜面试现场能力**：澄清需求；先暴力后优化；口述复杂度；主动构造反例；增量提交；调试错误代码；把算法题连接到真实系统设计。

### F02. 计算机基础综合

**定位**：把数据库之外的 CS 基础放入一个循序渐进的总路线；数据库因内容量和存量文档较多独立为 F03。

1. **Junior 01｜数据表示与计算机体系结构**：二进制、补码、浮点数；CPU/指令/寄存器；调用栈；内存层次；缓存局部性；中断、系统调用和用户态/内核态。
2. **Junior 02｜进程、线程与并发**：进程/线程/协程；调度与上下文切换；临界区；互斥、信号量、条件变量；死锁；原子性、可见性、有序性。
3. **Junior 03｜内存与文件系统**：虚拟内存、分页、TLB、缺页、堆/栈、内存映射；文件描述符、inode、目录、缓存、日志文件系统；磁盘/SSD 基础。
4. **Junior 04｜网络分层与端到端请求**：OSI/TCP-IP；以太网、ARP、IP、路由、NAT；DNS；TCP/UDP；三次握手/四次挥手；拥塞与流控；从 URL 到页面/响应。
5. **Middle 01｜HTTP、TLS 与现代网络**：HTTP/1.1、HTTP/2、HTTP/3/QUIC；长连接、连接池、缓存、Cookie/Session；HTTPS、证书和 TLS 握手；代理、网关、负载均衡、CDN、WebSocket。
6. **Middle 02｜Linux I/O 与系统诊断**：阻塞/非阻塞、同步/异步；select/poll/epoll/kqueue 概念；零拷贝；socket；常用 Linux 命令；CPU、内存、磁盘、网络与进程排障。
7. **Middle 03｜编程语言与编译原理**：词法/语法分析；AST；符号表和类型检查；IR；解释、AOT、JIT；链接与装载；GC；闭包、协程和异常的运行时实现。
8. **Senior 01｜内存模型与性能**：缓存一致性、伪共享、内存屏障、语言内存模型、NUMA、锁竞争、无锁基础；profile/trace/flame graph；性能实验设计。
9. **Senior 02｜系统综合题**：高并发网络服务；资源隔离；进程崩溃与恢复；网络抖动/丢包/半开连接；内存泄漏/碎片；把 OS、网络、编译和运行时证据串成排障链路。

### F03. 数据库、缓存、搜索与存储系统

**定位**：复用并扩充现有 `docs/basic-knowledge/database` 与 Redis 内容。

1. **Junior 01｜关系模型与 SQL**：表、键、约束；范式与反范式；DDL/DML；连接、聚合、子查询、窗口函数、CTE；NULL 语义；SQL 手写题。
2. **Junior 02｜索引与执行计划**：B/B+ 树；聚簇/非聚簇；主键/二级/联合/覆盖索引；最左匹配；选择性；回表；EXPLAIN；索引失效与慢查询定位。
3. **Middle 01｜事务与并发控制**：ACID；隔离级别；脏读/不可重复读/幻读；锁与间隙锁；MVCC；快照读/当前读；死锁检测；乐观/悲观并发控制。
4. **Middle 02｜存储引擎与查询优化**：页、Buffer Pool、WAL/redo/undo；Checkpoint；优化器、统计信息、Join 算法；分区表；连接池；批处理；冷热数据。
5. **Middle 03｜缓存与 Redis**：数据类型和编码；过期/淘汰；RDB/AOF；主从、哨兵、Cluster；缓存穿透/击穿/雪崩；热点 Key/大 Key；缓存与数据库一致性；分布式锁边界。
6. **Middle 04｜NoSQL、搜索与向量存储**：KV、文档、宽列、时序、图数据库；Elasticsearch/Lucene 倒排索引；分词、相关性与聚合；向量索引、过滤和混合检索基础。
7. **Senior 01｜复制、分片与高可用**：同步/异步复制；主从切换；读写分离；分库分表；一致性哈希；全局 ID；跨分片事务；备份恢复；RPO/RTO；数据校验。
8. **Senior 02｜存储系统设计**：B+ Tree 与 LSM Tree 权衡；写放大/读放大/空间放大；一致性与可用性；容量规划；多租户隔离；数据生命周期、合规与成本。

### F04. 软件工程、测试、Git、构建与交付

1. **Junior 01｜代码与协作基本功**：Git 工作区/暂存区/提交；branch/rebase/merge；冲突处理；代码评审；命名、错误处理、日志、配置和文档。
2. **Junior 02｜设计原则与重构**：模块化、抽象边界、耦合/内聚、SOLID、组合优于继承、常用设计模式；识别重复、长函数、隐式依赖和过度设计。
3. **Junior 03｜测试基础**：单元/集成/E2E；测试金字塔；mock/stub/fake；fixtures；参数化；覆盖率的价值与局限；可测试性设计；TDD 的适用边界。
4. **Middle 01｜依赖、构建与制品**：包管理、语义化版本、锁文件、依赖冲突；编译/打包；制品库；可复现构建；SBOM；多模块/monorepo 基础。
5. **Middle 02｜CI/CD 与发布**：流水线、质量门禁、环境管理、数据库迁移；滚动/蓝绿/金丝雀发布；feature flag；回滚；GitOps；发布审计。
6. **Middle 03｜可观测性与故障定位**：结构化日志、指标、追踪、事件；correlation ID；错误预算入门；告警质量；从症状到证据；故障复盘。
7. **Senior 01｜工程效能与质量体系**：研发度量的误区；测试策略；架构守护；依赖治理；平台化与 paved road；技术债；渐进式迁移；开发者体验。
8. **Senior 02｜交付决策**：风险分级；变更管理；跨团队接口；build vs buy；升级/弃用策略；生产事故责任边界；用数据评估工程改进。

### F05. 系统设计与分布式系统

1. **Junior 01｜面试方法**：需求澄清；功能/非功能需求；规模估算；API/数据模型；画核心链路；识别瓶颈；总结权衡。
2. **Middle 01｜通用组件**：反向代理、负载均衡、缓存、数据库、对象存储、搜索、消息队列、任务调度、限流器、ID 生成、配置/注册中心。
3. **Middle 02｜数据与异步**：同步/异步；事件驱动；投递语义；幂等；去重；顺序；重试与退避；DLQ；Saga/Outbox；批处理与流处理。
4. **Middle 03｜扩展性与可靠性**：水平扩展；无状态化；分片；复制；超时、熔断、隔离、降级、背压；过载保护；单点与故障域。
5. **Senior 01｜一致性与共识**：CAP/PACELC；线性一致性/最终一致性；quorum；租约；逻辑时钟；主备复制；Raft/Paxos 概念；分布式事务取舍。
6. **Senior 02｜容量、性能和成本**：QPS、带宽、存储、峰值；P50/P95/P99；排队；热点；多区域；容灾；RPO/RTO；容量余量；单位经济性。
7. **Senior 03｜经典设计题**：短链、Feed、聊天、通知、搜索、秒杀、支付、网盘、监控、日志、爬虫、任务调度、推荐/特征平台、RAG/Agent 平台。
8. **架构岗位选学｜架构演进面试**：演进路线；兼容与迁移；多租户；安全与合规；可运维性；架构决策记录；失败方案复盘。只使用候选人真实经历。

### F06. 安全、隐私与供应链安全

1. **Junior 01｜Web 与 API 安全**：认证/授权；Session/JWT/OAuth/OIDC 概念；XSS、CSRF、SQL 注入、SSRF、文件上传、越权、重放；CORS 与 CSP。
2. **Junior 02｜密码学常识**：加密/哈希/MAC/签名；随机数、盐和 KDF；TLS；密钥轮换；不要自创密码协议。
3. **Middle 01｜安全开发生命周期**：威胁建模；输入验证与输出编码；最小权限；secret 管理；审计日志；依赖漏洞；SAST/DAST/IAST；安全测试。
4. **Middle 02｜主机、容器与云安全**：IAM/RBAC；网络策略；镜像与运行时；沙箱；供应链、SBOM、签名和 provenance；CI/CD 权限边界。
5. **Middle 03｜数据安全与隐私**：数据分类；传输/静态加密；脱敏；租户隔离；保留与删除；备份；隐私最小化；合规意识。
6. **Senior 01｜架构与事件响应**：零信任；纵深防御；安全边界；攻击面；滥用检测；安全降级；漏洞处置；取证与复盘；风险接受。
7. **Senior 02｜AI/Agent 专项**：Prompt Injection、数据投毒、模型/工具越权、敏感信息泄露、沙箱逃逸；工具白名单；人类审批；结果校验与可追责。

### F07. 简历、项目深挖、行为面与面试表达

1. **Junior 01｜简历与自我介绍**：岗位匹配；成果量化；技术栈可信度；项目背景/目标/个人贡献；一分钟和三分钟版本。
2. **Junior 02｜项目深挖**：架构图、核心链路、数据模型、技术选型、难点、故障、测试、上线、指标；准备“为什么不用另一种方案”。
3. **Middle 01｜问题解决与复盘**：模糊需求澄清；调试路径；线上事故；性能优化；冲突协作；失败项目；从证据到结论。
4. **有经验岗位｜技术沟通**：向不同受众解释复杂问题；设计评审；代码评审分歧；依赖协调；书面决策与风险同步。只使用候选人真实经历。
5. **有经验岗位｜业务与技术决策**：从用户、成本和风险解释技术选择；build vs buy；速度与质量；短期交付与长期架构平衡。
6. **通用｜面试过程**：现场编码沟通；系统设计表达；反问；薪酬、动机与离职原因；面后记录与知识缺口回填。

### F08. 数学、机器学习与深度学习基础

1. **Junior 01｜数学与概率**：向量/矩阵、导数/梯度、链式法则、常见分布、条件概率、Bayes、期望/方差、最大似然、信息熵/KL。
2. **Junior 02｜机器学习基本范式**：监督/无监督；分类/回归/聚类/降维；特征工程；训练/验证/测试；偏差-方差；过拟合；正则化。
3. **Junior 03｜评估与实验**：Precision/Recall/F1/AUC；回归和排序指标；不平衡数据；交叉验证；数据泄漏；置信区间；A/B 测试基础。
4. **Middle 01｜经典模型**：线性/逻辑回归、树模型、GBDT、SVM、聚类、PCA；损失函数、优化方法和模型选择。
5. **Middle 02｜深度学习**：MLP、CNN、RNN、Attention；反向传播；初始化、归一化、Dropout；SGD/Adam；学习率；混合精度。
6. **Middle 03｜工程框架与数据**：PyTorch/JAX 概念；Dataset/DataLoader；GPU/显存；checkpoint；实验跟踪；数据版本；可复现性。
7. **Senior 01｜MLOps 与生产系统**：训练/特征/模型流水线；离线在线一致性；模型服务；漂移；监控；回滚；成本与容量；Responsible AI。

## 4. 岗位路线详细 Outline

### R01. Java 后端开发（Java v2）

**依赖**：F01–F07。**调整**：保留当前 16 个 Topic 和已有链接，扩为约 8 个阶段、36–44 个 Topic。

1. **Junior 01｜Java 语言与对象模型**：类型、运算、流程；OOP；接口/抽象类；重载/重写；equals/hashCode；String；异常；泛型；注解；反射。
2. **Junior 02｜标准库与集合**：List/Set/Map/Queue；HashMap/ConcurrentHashMap；迭代器；Stream/Lambda；日期时间；I/O/NIO；序列化边界。
3. **Middle 01｜JVM 与运行时**：字节码；类加载/双亲委派；对象布局；运行时内存；GC Roots；垃圾回收算法与收集器；JIT；逃逸分析；OOM。
4. **Middle 02｜并发与 JMM**：线程生命周期；synchronized/volatile/CAS；happens-before；Lock/AQS；线程池；CompletableFuture；并发容器；死锁和性能诊断。
5. **Junior→Middle｜Spring 与数据访问**：IoC/DI、AOP/代理、Bean 生命周期、循环依赖；Spring MVC 请求链；Spring Boot 自动配置/启动；事务失效；MyBatis/JPA；连接池；测试。
6. **Middle 02｜服务端生态**：REST/RPC、Netty 概念；MySQL/Redis；Kafka/RabbitMQ；缓存一致性；消息可靠性；定时任务；搜索；文件/对象存储。
7. **Middle→Senior｜微服务与生产治理**：注册/发现、配置、网关、限流、熔断、重试、幂等、分布式事务；认证授权；日志/指标/追踪；JVM/SQL/线程/GC 联合排障。
8. **架构岗位选学｜系统设计与演进**：DDD 边界、模块化单体与微服务、容量与高可用、数据拆分、异步化、容灾、多租户、性能与成本；只在目标岗位明确考察时进入。

### R02. Go 后端与云原生开发

**依赖**：F01–F07，重点复用 F02/F05。

1. **Junior 01｜Go 语言基础**：类型、零值、数组/slice/map/string、函数、方法、接口、组合、泛型、错误、panic/recover、defer、包与 module。
2. **Middle 01｜数据结构与 runtime**：slice 扩容；map 实现与并发限制；interface 表示；逃逸分析；内存分配；GC；栈增长；编译、链接和跨平台构建。
3. **Middle 02｜并发模型**：goroutine、channel、select、关闭语义；sync/atomic；context；竞态/死锁/泄漏；worker pool；GMP 调度；Go 内存模型。
4. **Junior→Middle｜网络与服务开发**：net/http；middleware；REST；gRPC/Protobuf；连接池；超时/取消；流式通信；WebSocket；常用 Web 框架的边界。
5. **Middle 03｜数据与微服务**：database/sql、事务、ORM 取舍；Redis、MQ；配置/发现；幂等、重试、熔断、限流；服务优雅启动/停止。
6. **Middle→Senior｜工程与诊断**：testing/benchmark/fuzz；race detector；pprof/trace；日志/指标/追踪；依赖与代码生成；容器、Kubernetes 和 CI/CD。
7. **Senior｜高性能与云原生架构**：高并发网络服务、内存/GC/调度调优、控制器与 Operator 思想、平台 API、多租户、可靠性、容量、成本和系统设计。

### R03. Python 后端与 AI 服务开发

**依赖**：F01–F07；AI 服务方向再依赖 F08/R13。

1. **Junior 01｜Python 语言与数据模型**：内置类型、可变性、作用域、函数、类、协议、dunder、异常、模块、类型注解、dataclass/Pydantic 概念。
2. **Middle 01｜高级特性与 CPython**：迭代器/生成器、装饰器、闭包、上下文管理器、描述符、MRO/元类概念；引用计数、GC、内存管理、GIL 与 free-threaded 取舍。
3. **Middle 02｜并发与异步**：thread/process/asyncio；event loop；coroutine/task/future；取消、超时、背压；CPU/I/O workload 选择；任务队列。
4. **Junior→Middle｜Web 与 API**：HTTP；WSGI/ASGI；Django/DRF、FastAPI/Flask；middleware/DI；认证授权；ORM/迁移；WebSocket；OpenAPI；输入校验。
5. **Middle 03｜数据、测试与后台任务**：PostgreSQL/MySQL、Redis、Kafka/RabbitMQ；Celery 等任务模型；pytest/fixtures/mock；数据一致性、幂等和重试。
6. **Middle→Senior｜性能与交付**：profiling；async 陷阱；序列化；worker 模型；依赖/虚拟环境/打包；容器；可观测性；安全；容量和成本。
7. **Senior｜服务架构与 AI 集成**：模块化/微服务、API gateway、多租户、长任务/流式响应、GPU 服务编排、模型路由、RAG/Agent 后端、可靠性与系统设计。

### R04. C++ 系统与基础设施开发

**依赖**：F01–F07，F02 为核心。

1. **Junior 01｜C++ 语言与对象模型**：指针/引用/const；函数与类；继承/多态/虚函数；拷贝/移动；模板入门；编译单元、头文件、链接。
2. **Junior→Middle｜生命周期与内存**：stack/heap；RAII；new/delete 与 malloc/free；智能指针；对象布局；对齐；UB；内存泄漏、悬空指针、越界；sanitizer。
3. **Middle 01｜STL 与泛型编程**：容器、迭代器、算法、allocator；复杂度和迭代器失效；模板推导、特化、SFINAE/concepts；optional/variant/string_view/span。
4. **Middle 02｜现代 C++ 与构建**：右值/移动/完美转发；lambda；constexpr；modules/coroutine 概念；CMake；ABI；静态/动态库；编译和链接诊断。
5. **Middle 03｜并发与内存模型**：thread、mutex、condition_variable、future；atomic；memory order；线程池；lock-free 基础；伪共享和缓存局部性。
6. **Middle→Senior｜Linux、网络与性能**：process/thread、IPC、socket、epoll、零拷贝；网络服务模型；gdb/perf/flame graph；内存池；延迟/吞吐优化。
7. **Senior｜系统设计**：高性能服务器、存储引擎、消息/交易系统、资源管理、容错、并发安全 API、跨平台/ABI 演进、容量与技术取舍。

### R05. Web 前端开发

**依赖**：F01、F02 网络部分、F04–F07。

1. **Junior 01｜Web 基础与 CSS**：语义化 HTML、表单、可访问性；CSS 选择器/层叠/盒模型；Flex/Grid；定位；响应式；动画；兼容性。
2. **Junior 02｜JavaScript 核心**：类型与隐式转换；作用域/闭包/this/原型；模块；迭代器；Promise/async；事件循环；错误处理；常用手写题。
3. **Middle 01｜TypeScript**：结构化类型、联合/交叉、泛型、条件/映射类型、类型收窄、声明文件、类型体操边界、编译配置与工程迁移。
4. **Middle 02｜浏览器、网络与安全**：DOM/BOM、事件、渲染流水线、回流/重绘、存储、跨域、HTTP 缓存、Service Worker；XSS/CSRF/CSP；URL 到页面。
5. **Junior→Middle｜React/Vue 双主线**：组件、状态、生命周期/Hooks/Composition API、响应式、VDOM、调度与更新、路由、表单、状态管理；原理与源码边界。
6. **Middle 03｜工程化与测试**：Node.js 与前端工具链；npm/pnpm、Vite/Webpack/Rollup、Babel/SWC、ESLint、CSS 方案、monorepo；unit/component/E2E、Playwright/Cypress、视觉回归。
7. **Middle→Senior｜性能与渲染架构**：Core Web Vitals；资源/图片/字体；懒加载/分包/预取；缓存；CSR/SSR/SSG/ISR/hydration；SEO；Next/Nuxt；性能监控。
8. **Senior｜前端系统设计**：组件/API 设计、数据流、design system、微前端、BFF、实时协作、大列表/可视化、离线应用、国际化、灰度、可访问性治理与团队规范。

### R06. 移动端通用与跨平台开发

**依赖**：F01、F02、F04–F07；Android/iOS 候选人先学本路线，再进入 R07/R08。

1. **Junior 01｜移动平台约束**：应用/页面生命周期；前后台；进程被杀；屏幕和输入；权限；资源、电量、网络和存储限制；多尺寸与可访问性。
2. **Junior 02｜UI、状态与导航**：声明式/命令式 UI；布局、列表、动画、手势；状态保存；路由/深链；组件化；设计规范。
3. **Middle 01｜数据与连接**：HTTP/WebSocket；序列化；本地数据库/Key-Value/文件；缓存；离线优先；同步、冲突解决；弱网、重试和幂等。
4. **Middle 02｜并发与系统能力**：主线程规则；异步任务；后台执行；推送；定位、相机、媒体、蓝牙等能力；隐私权限与数据安全。
5. **Middle 03｜质量与性能**：单元/UI/集成测试；设备矩阵；启动、卡顿、内存、耗电、包体和网络优化；崩溃/ANR/hang 诊断；端侧可观测性。
6. **Middle→Senior｜交付与架构**：签名、渠道、商店审核、灰度、热修复边界；模块化；feature flag；兼容策略；移动端系统设计。
7. **扩展｜跨平台**：Flutter/Dart、React Native/JSI、Kotlin Multiplatform、Compose Multiplatform；渲染/桥接模型；原生互操作；选型和迁移成本。

### R07. Android 开发

**依赖**：R06 + F01/F02/F04–F07。

1. **Junior 01｜Kotlin/JVM**：空安全、data/sealed class、扩展、委托、高阶函数、泛型、协程语法；Java 互操作；集合与 JVM 基础。
2. **Junior 02｜Android 组件与生命周期**：Activity/Service/BroadcastReceiver/ContentProvider；Intent；启动模式；Fragment；进程与任务栈；配置变化和状态恢复。
3. **Junior→Middle｜UI：Views 与 Compose**：View 绘制/布局/事件分发；RecyclerView；Compose state/recomposition/layout；导航、动画、自定义 UI、适配与无障碍。
4. **Middle 01｜架构与 Jetpack**：UI/Data/Domain 分层、UDF、ViewModel、Lifecycle、Navigation、Room、WorkManager、DataStore、DI；MVVM/MVI；模块边界。
5. **Middle 02｜并发、网络与数据**：Coroutine/Flow；线程切换和取消；Retrofit/OkHttp；缓存、离线同步；数据库；后台限制、推送与深链。
6. **Middle→Senior｜系统原理**：Handler/Looper/MessageQueue；Binder/IPC；Zygote；AMS/WMS/PMS；Window；ClassLoader；ART/GC；应用启动和包安装链路。
7. **Middle→Senior｜性能、测试与构建**：启动、渲染、内存、ANR、耗电、包体；Profiler/Perfetto/LeakCanary；unit/instrumentation/Compose test；Gradle、R8、Baseline Profile。
8. **Senior｜大型应用架构**：组件化/插件化边界、多进程、动态化边界、车机/折叠屏/大屏、稳定性平台、灰度发布、团队 API 与迁移策略。

### R08. iOS 开发

**依赖**：R06 + F01/F02/F04–F07。

1. **Junior 01｜Swift 与 Objective-C 互操作**：value/reference、protocol/extension、generic、error、closure、optional、访问控制；Runtime 基础；桥接与混编。
2. **Junior 02｜内存与对象生命周期**：ARC、strong/weak/unowned、循环引用、autorelease pool、copy-on-write、struct/class 取舍、内存布局概念。
3. **Junior→Middle｜UIKit 与 SwiftUI**：App/Scene/ViewController 生命周期；Auto Layout；Table/Collection View；SwiftUI state/data flow、navigation、layout、animation；互操作。
4. **Middle 01｜并发与事件系统**：GCD、OperationQueue、RunLoop；async/await、TaskGroup、Actor、MainActor、Sendable；取消、优先级和数据竞争。
5. **Middle 02｜网络、数据与系统能力**：URLSession；缓存/弱网；Codable；Core Data/SQLite/文件；通知、后台任务、推送、深链、权限和 Keychain。
6. **Middle→Senior｜系统与渲染原理**：Responder Chain、消息派发、KVC/KVO、Runtime、Core Animation、渲染循环、dyld、启动链路。
7. **Middle→Senior｜质量、性能与交付**：XCTest/UI test；Instruments；启动、hang/hitch、内存、耗电、包体；签名、证书、TestFlight、商店审核、隐私清单。
8. **Senior｜大型应用架构**：MVC/MVVM/TCA/VIPER 取舍；模块化；依赖管理；Swift/SwiftUI 渐进迁移；多平台；稳定性与可观测性；团队规范。

### R09. 大数据与数据工程

**依赖**：F01–F07；需要 Java/Scala/Python 中至少一条语言子路线。

1. **Junior 01｜SQL 与数据建模**：复杂 SQL、窗口函数；OLTP/OLAP；范式；维度建模、星型/雪花；事实/维度；数仓分层；指标口径和数据血缘。
2. **Junior→Middle｜Hadoop 生态**：HDFS 架构、读写、复制、HA、小文件；MapReduce/shuffle；YARN；Hive 分区/分桶/文件格式/执行与优化；HBase 读写与 Region；ZooKeeper 协调基础。
3. **Middle 01｜Spark**：RDD/DataFrame/Dataset；DAG/stage/task；Catalyst/Tungsten；shuffle；join；缓存；数据倾斜；内存与资源调优；Structured Streaming。
4. **Middle 02｜Flink**：DataStream/Table/SQL；event/process time；watermark/window；state/timer；checkpoint/savepoint；exactly-once；backpressure；状态与作业调优。
5. **Middle 03｜Kafka 与数据集成**：partition/replica/ISR；producer/consumer；offset；顺序、幂等、事务；rebalance；积压；schema；CDC；ETL/ELT 和 connector。
6. **Middle→Senior｜湖仓与批流一体**：Parquet/ORC；Iceberg/Hudi/Delta 概念；metadata、partition evolution、compaction；对象存储；batch/stream 统一语义。
7. **Senior 01｜数据质量、治理与平台**：调度、依赖、SLA；质量规则；回溯/重跑；血缘、catalog、权限、脱敏；多租户；成本；可观测性和事故处理。
8. **Senior 02｜数据系统设计**：实时数仓、用户画像、日志/埋点、CDC、推荐特征、流式聚合；容量、延迟、一致性、正确性、容灾和演进。

### R10. 软件测试与测试开发（QA/SDET）

**依赖**：F01–F07；测试开发需选择 Java/Python/Go 之一。

1. **Junior 01｜测试基础与 SDLC**：质量模型；验证/确认；测试级别/类型；静态/动态测试；敏捷/DevOps 中的测试；shift-left/right；风险驱动测试。
2. **Junior 02｜用例与缺陷**：等价类、边界值、判定表、状态迁移、因果图、pairwise、探索式；需求评审；测试计划；缺陷生命周期、报告和复现。
3. **Junior→Middle｜Web/API/移动/数据库测试**：HTTP、抓包、接口断言、契约、鉴权、幂等；浏览器/设备兼容、弱网；SQL 校验；日志定位；常见场景题。
4. **Middle 01｜编程与自动化基础**：Python/Java；数据结构与算法；pytest/JUnit；fixture/parametrize/mock；Selenium/Playwright/Cypress/Appium；Page Object；等待与隔离。
5. **Middle 02｜自动化框架设计**：分层、驱动模型、数据/环境/账号管理、并发执行、失败重试边界、报告、截图/日志/trace、flaky test 治理、覆盖率和 ROI。
6. **Middle 03｜非功能测试**：性能场景、负载模型、TPS/RPS/延迟/错误率、JMeter/k6/Locust；瓶颈分析；安全测试；可靠性/容灾/混沌；可访问性测试。
7. **Middle→Senior｜CI/CD 与质量门禁**：测试金字塔/奖杯；契约测试；测试数据与环境；容器/K8s；流水线；发布验证；线上监控、流量回放与 canary。
8. **Senior｜测试平台与质量架构**：用例/执行/压测平台；精准测试与影响分析；覆盖模型；服务虚拟化；质量度量；AI 辅助测试；组织级质量策略和效能权衡。

### R11. 运维、DevOps、SRE 与平台工程

**依赖**：F02–F07；自动化开发建议选择 Go/Python。

1. **Junior 01｜Linux、Shell 与网络**：进程/线程、systemd、权限、文件系统、包、日志、cron；Bash/Python；DNS/TCP/HTTP/TLS；常用排障命令。
2. **Junior 02｜主机、存储、云与服务运维**：CPU/内存/磁盘/网络指标；文件描述符；RAID/LVM；虚拟化；VPC/负载均衡/对象存储/IAM 基础；备份恢复；Nginx；数据库/缓存/MQ 基础运维；基线和变更。
3. **Middle 01｜自动化与 IaC**：配置管理、Ansible；Terraform/Pulumi 概念；镜像；不可变基础设施；secret；环境漂移；资产/配置/权限管理。
4. **Middle 02｜容器与 Kubernetes**：namespace/cgroup/union FS；镜像和网络；Pod/Deployment/StatefulSet/Service/Ingress；调度；CNI/CSI/CRI；RBAC；Operator/CRD。
5. **Middle 03｜CI/CD、发布与 GitOps**：流水线、制品、环境、滚动/蓝绿/金丝雀、回滚、数据库变更、feature flag、Argo/Flux 概念、供应链安全。
6. **Middle→Senior｜可观测性与 SRE 原则**：metrics/logs/traces；Prometheus/Grafana/OpenTelemetry；SLI/SLO/SLA；错误预算；告警设计；toil；容量和性能。
7. **Senior 01｜事件与可靠性工程**：on-call、分级响应、故障指挥、排障、postmortem；过载/级联故障；容灾演练；RPO/RTO；混沌和可靠性测试。
8. **Senior 02｜平台工程**：内部开发者平台、自助服务、paved road、策略即代码、多集群/多云、租户隔离、成本治理、平台 API、体验与采用率。

### R12. 大模型算法、训练与推理

**依赖**：F01、F02 性能部分、F04–F08。

1. **Junior 01｜NLP 与 Transformer 基础**：tokenization/embedding；attention；multi-head；FFN；residual/normalization；位置编码；encoder/decoder；训练目标和生成。
2. **Middle 01｜模型架构细节**：RoPE、ALiBi、MHA/MQA/GQA、RMSNorm、SwiGLU、MoE、长上下文；decoder-only；多模态和 reasoning 模型概念。
3. **Middle 02｜数据与预训练**：采集、清洗、去重、质量、混合和采样；tokenizer；数据泄漏；scaling law；优化器/LR；checkpoint；稳定性；合成数据。
4. **Middle 03｜分布式训练**：data/tensor/pipeline/expert parallel；ZeRO/FSDP；通信与集合操作；显存估算；混合精度；gradient checkpointing；故障恢复和利用率。
5. **Middle 04｜后训练与对齐**：SFT；LoRA/QLoRA/PEFT；preference data；DPO/PPO/RLHF/RLAIF 概念；reward model；reasoning/post-training；灾难性遗忘。
6. **Middle→Senior｜评测与安全**：任务/能力/偏好/事实性/鲁棒性；污染；LLM-as-judge 与人评；偏差；红队；安全对齐；评测集和回归。
7. **Senior 01｜推理与服务**：prefill/decode、KV cache、continuous batching、quantization、speculative decoding、并行推理、吞吐/首 token/逐 token 延迟、调度和弹性。
8. **Senior 02｜研究与系统设计**：训练失败诊断、loss/gradient/数据问题；模型/数据/算力权衡；复现实验；阅读论文；训练/评测/推理平台设计；成本和容量。

### R13. 大模型应用与 RAG 工程

**依赖**：R03 或其他后端路线 + F03–F08；理解 R12 的前两阶段。

1. **Junior 01｜模型 API 与 Prompt**：消息/角色、token/context、采样参数、structured output、function calling、streaming；zero/few-shot；模板、版本和基本安全。
2. **Junior→Middle｜RAG 数据入口**：解析、清洗、切块、metadata、embedding、向量库；索引更新、删除、权限和版本；文档/表格/图片的处理边界。
3. **Middle 01｜检索与排序**：dense/sparse/hybrid；BM25；ANN；filter；query rewrite/decomposition；multi-query；reranker；Top-K；召回率、MRR/NDCG 和延迟。
4. **Middle 02｜生成与对话**：上下文组装、引用、拒答、grounding；长上下文；history/memory；多轮指代；Prompt Injection；输出验证和业务规则。
5. **Middle 03｜评测体系**：golden set；检索/生成/端到端指标；事实性、引用正确性、拒答、格式；LLM judge、人评校准、A/B、bad case 分类和回归集。
6. **Middle→Senior｜生产工程**：模型选择/路由/fallback；cache；batch；限流；重试；成本、P95、token；可观测性；prompt/模型/索引版本；灰度和回滚。
7. **Senior｜企业级架构**：多租户与 ACL；数据新鲜度；增量索引；合规/隐私；模型网关；供应商切换；SLA；容量；RAG vs fine-tuning vs long context 的决策。

### R14. AI Agent 工程

**依赖**：R13 + F04–F08；编码型 Agent 还需对应岗位路线。

1. **Junior 01｜Agent 基本循环**：model → decide → tool → observe → repeat；workflow 与 autonomous agent 区别；状态、停止条件、失败边界和人类确认。
2. **Middle 01｜工作流模式**：prompt chaining、routing、parallelization、orchestrator-workers、evaluator-optimizer；何时用确定性流程，何时允许模型决策。
3. **Middle 02｜工具与协议**：tool schema/description；structured I/O；function calling；MCP 的 client/server/resource/tool/prompt 概念；认证；超时、重试、幂等、分页和错误语义。
4. **Middle 03｜上下文与记忆**：system/user/tool context；短期/长期记忆；RAG；文件和结构化 artifact；摘要/压缩；context budget；信息新鲜度和隔离。
5. **Middle 04｜计划与执行控制**：任务分解；动态 replanning；checkpoint；恢复；长任务；审批点；预算/步数限制；重复循环检测；补偿和回滚。
6. **Middle→Senior｜多 Agent**：角色和边界；共享状态/消息；manager/peer/debate；并行与汇总；冲突、重复劳动、通信成本、终止和可解释性。
7. **Senior 01｜评测与可观测性**：task/trial/trajectory/outcome；确定性 grader、模型 grader、人评；多次采样；工具选择/参数正确性；trace；回归、线上反馈和 A/B。
8. **Senior 02｜安全与可信**：最小权限；沙箱/VM/网络隔离；secret；Prompt Injection；不可信工具输出；越权和数据泄漏；审计；人类控制；红队与 containment。
9. **Senior 03｜Agent 运行时与架构**：durable execution、队列、事件、并发、租约、状态机、长任务恢复、多租户、模型/工具路由、成本、SLA、build vs buy 和故障复盘。

## 5. 覆盖矩阵与去重规则

### 5.1 各岗位必须引用的共享基础

| 岗位组 | 必修共享 Outline | 按岗位选修 |
| --- | --- | --- |
| Java/Go/Python 后端 | F01–F07 | Python AI 服务补 F08 |
| C++ 系统开发 | F01–F07，F02 深入 | 需要数据服务时补 F03/F05 |
| Web 前端 | F01、F02 网络、F04–F07 | Node/BFF 补后端与 F03 |
| Android/iOS/跨端 | F01、F02、F04–F07 | 强联网/数据产品补 F03/F05 |
| 大数据 | F01–F07 | AI 数据方向补 F08 |
| 测试开发 | F01–F07 | 测试平台选择一条后端路线 |
| SRE/平台工程 | F02–F07 | 自动化开发选择 Go/Python |
| LLM | F01、F02、F04–F08 | 服务化补 R03/R11 |
| RAG/Agent | F03–F08 + 一条后端路线 | UI 产品补 R05 |

### 5.2 内容只出现一次的规则

- SQL、索引、事务、Redis 原理统一归 F03；岗位页只描述“岗位需要掌握到什么深度”。
- TCP/HTTP/TLS、进程线程、内存和 I/O 统一归 F02；前端、移动、SRE 只增加岗位场景。
- CI/CD、Git、测试原则和可观测性基础归 F04；SRE/测开继续讲专业深度。
- 分布式一致性、可靠性和系统设计方法归 F05；Java/Go/大数据/Agent 只增加领域案例。
- 认证授权、Web 安全、供应链和隐私归 F06；Agent 额外覆盖 Prompt Injection、沙箱和工具权限。
- 算法题不在每个岗位重复列；岗位页只说明题型倾向，例如前端手写 Promise、C++ 并发结构、大数据 SQL、AI 数学推导。

### 5.3 面经抽样映射检查

| 面经中的典型追问 | 归属 |
| --- | --- |
| JS 事件循环、浏览器缓存、回流重绘、XSS/CSRF、React/Vue 更新原理 | R05-02/04/05，F06 |
| Android 事件分发、内存泄漏、Handler/Binder、Jetpack、Compose 重组 | R07-03/04/06/07 |
| iOS ARC/循环引用、RunLoop、Swift Concurrency、MVVM、列表性能 | R08-02/03/04/06/07 |
| Spark shuffle/倾斜、小文件，Flink watermark/state/checkpoint/exactly-once，Kafka offset | R09-03/04/05 |
| 等价类/边界值、接口自动化、flaky test、性能压测、测试平台 | R10-02/03/05/06/08 |
| Linux 排障、Docker namespace/cgroup、K8s 调度/网络/存储、Prometheus、事故复盘 | R11-01/04/06/07 |
| Java HashMap/JUC/JVM/Spring、缓存一致性、消息可靠性、微服务治理 | R01-02/03/04/05/06/07，F03/F05 |
| Go slice/map/channel/GMP/GC/pprof、gRPC、优雅退出 | R02-02/03/04/06 |
| C++ RAII/智能指针/STL、memory order、epoll/零拷贝、性能分析 | R04-02/03/05/06 |
| Transformer、RoPE/GQA、训练/微调、评测、KV cache/量化/推理优化 | R12-01/02/03/05/06/07 |
| chunk/embedding/hybrid retrieval/rerank、引用/拒答、RAG 评测与线上成本 | R13-02/03/04/05/06 |
| function calling/MCP、工作流、多 Agent、记忆、trajectory eval、Prompt Injection/沙箱 | R14-02/03/04/06/07/08 |

## 6. 对当前 Java v1 的审阅结论

### 可以保留

- `InterviewRoadmap` 的 phase/topic/level/priority 展示模型清晰，可作为所有岗位路线的视觉模板。
- 当前四阶段从语言运行时到架构的顺序正确。
- Topic 弹窗、文章入口、计划中状态和已有数据库/网络/系统设计链接可以继续复用。

### 需要补齐

- 当前只有 16 个 Topic，无法独立支撑“约 90% Java 面试考点”的目标。
- Java 层缺少泛型、异常、反射/注解、Stream、I/O/NIO、字节码、GC/JIT 等。
- Spring 层缺少 AOP/代理细节、Boot 自动配置/启动、MyBatis/JPA、Web 容器与测试。
- 后端层缺少 RPC/Netty、微服务治理、搜索、认证授权、分布式事务和可靠消息。
- 生产层缺少可观测性、线程/GC/SQL 联合排障、容量、灰度、容灾和安全。
- Senior 能力不能只用“系统设计/分布式一致性”代表，还要覆盖演进、成本、跨团队决策和事故复盘。

### 渲染前建议调整的数据模型

本轮不改渲染代码。审批通过后建议把嵌套 Topic 改成“共享 Topic Catalog + 路线中的 Topic 引用”，否则 14 条岗位路线会复制数据库、网络和系统设计内容。建议新增：

- `levelRange` 或 `requiredDepth`：允许同一 Topic 在不同岗位要求不同深度。
- `prerequisites`：显式展示前置 Topic。
- `skills`/`interviewQuestions`/`practice`：区分知识点、典型追问和练习。
- `roleNotes`：保存岗位特定的掌握要求，不复制 Topic 正文。
- `sourceTags` 与 `lastReviewedAt`：支持面经来源和内容时效审计。

## 7. 调研依据（抽样）

面经用于识别高频问题，官方资料用于校正知识边界和现代工程实践。

- 前端：[MDN Front-end Curriculum](https://developer.mozilla.org/en-US/curriculum/about-curriculum/)、[2025 字节前端面经](https://www.nowcoder.com/discuss/745084418779287552)
- Android：[Android App Architecture](https://developer.android.com/topic/architecture)、[2025 Android 面经](https://www.nowcoder.com/discuss/797066691023736832)
- iOS：[Apple Swift Concurrency](https://developer.apple.com/documentation/swift/concurrency)、[SwiftUI Performance](https://developer.apple.com/documentation/xcode/understanding-and-improving-swiftui-performance)、[iOS 面经](https://www.nowcoder.com/discuss/353153993587236864)
- 大数据：[Spark Structured Streaming](https://spark.apache.org/docs/latest/streaming/index.html)、[Flink Checkpointing](https://nightlies.apache.org/flink/flink-docs-stable/docs/dev/datastream/fault-tolerance/checkpointing/)、[数据开发面经](https://www.nowcoder.com/creation/subject/32230ac1fb5249a99b47e1ea5647ea4f)
- 测试：[ISTQB CTFL v4](https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/)、[OWASP WSTG](https://owasp.org/www-project-web-security-testing-guide/)、[2025 测试面经整理](https://www.nowcoder.com/discuss/765573069506113536)
- SRE/运维：[Google SRE Book](https://sre.google/sre-book/table-of-contents/)、[Kubernetes Observability](https://kubernetes.io/docs/concepts/cluster-administration/observability/)、[运维开发面经](https://www.nowcoder.com/discuss/353156915016441856)
- Java/Go/C++/Python：[Java 2025 面试图谱](https://www.nowcoder.com/discuss/769886497045557248)、[Go 面经](https://www.nowcoder.com/discuss/795663630367727616)、[C++ 面经](https://www.nowcoder.com/feed/main/detail/51566a62649542f68e9b313ac4ba225a)、[Python 后端面试问题样本](https://www.reddit.com/r/technepal/comments/1nl5z6m)
- LLM/RAG/Agent：[Hugging Face LLM Course](https://huggingface.co/learn/llm-course/en/chapter1/1)、[大模型算法面经汇总](https://www.nowcoder.com/discuss/848942791164981248)、[RAG 项目面试关注点](https://ac.nowcoder.com/discuss/1649000)、[Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)、[Agent Evals](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

## 8. 审批项

进入渲染和数据文件编写前，需要确认以下四项：

1. 是否接受“8 条共享基础 + 14 条岗位路线”的两层结构。
2. 是否保留 Python 后端、C++ 系统开发，以及将 Android/iOS/移动通用拆开。
3. 是否接受把“大模型算法”“大模型应用/RAG”“Agent”拆成三条路线。
4. Java v2 是否按本稿补齐到约 8 个阶段、36–44 个 Topic，并作为其他路线的数据结构样板。
