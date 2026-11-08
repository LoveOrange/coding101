# Go 后端校招大纲

本大纲面向使用 Go 应聘后端开发的校招生，细化[知识树总表](./knowledge-tree.md)第 11 节。Go 语言、并发和运行时在本分支解释；算法、操作系统、网络、数据库、缓存和系统设计沿用已有正文。

已核验 101 篇主样本的正文与附件，本轮 Go 专题、共享新文与路线的源码、本地浏览器验收已接受。原大纲的 34 篇全部保留，新增项见第 3 节。共享依赖的 87 项范围复核及已确认的 125 条必补原问关联已处理完成，本轮修改等待用户复核；个人项目条件与题设、来源不完整项仍保留原有边界。当前状态、研究口径与详细证据的存放安排见[四方向扩展进度与研究口径](./campus-expansion-progress.md)；完整站点构建、发现性与类型检查已通过，正式发布尚未执行。表中的“必会／常考／按岗选学”由前置关系和岗位任务决定，不等于样本出现率。

## 1. 范围与版本

- 语言基础按 Go 1.22 及以后已稳定的语义组织，运行时示例注明所核验版本；不要求考生追逐最新发布版，也不把某个版本的内部结构当语言规范。
- 循环变量按 Go 1.22 的语义讲解，同时解释旧面经代码为何得到不同结果。`go.mod` 的语言版本及变量是声明还是赋值均需交代。
- map 先讲规范保证的行为。旧面经中的桶和渐进扩容明确限定 Go 1.23 及以前的实现；Go 1.24 改用 Swiss Tables，另说明查找和增长路径，不能把两套结构拼在一起。
- 后端校招主线覆盖标准库 HTTP、数据访问、取消与测试。Gin、GORM、gRPC-Go 根据项目和 JD 选用；不要求同时掌握 Kratos、go-zero 等多个框架。
- 云原生岗位可加容器与 Kubernetes；普通 Go 后端路线不把平台运维全量内容设为前置。

## 2. Topic、优先级与停止条件

优先级和回答深度独立维护；某 Topic 下的按岗文章不会自动变成必会。

| Topic | 核心内容 | 初始优先级／深度 | 前置 | 停止条件 |
| --- | --- | --- | --- | --- |
| 语言与值 | 类型、零值、指针、赋值与传参、结构体、方法集 | 必会／原理解释 | 一门语言的变量和函数 | 能判断复制的是哪个值、哪些操作共享底层对象，解释值接收者与指针接收者的方法集 |
| 集合与文本 | 数组、切片、map、字符串、rune | 必会／原理解释 | 数组、哈希表、语言与值 | 能推导切片别名及 append 后的变化，正确处理 nil map、遍历和 UTF-8；区分规范与版本实现 |
| 接口与控制流 | 接口、nil、defer、错误链、panic/recover | 必会／原理解释 | 方法、调用栈、语言与值 | 能解释带类型 nil 接口、defer 求值和返回顺序，正确保留错误链及恢复边界 |
| 泛型与反射 | 类型参数、约束、反射、结构体标签 | 常考／基础回答；反射深入按岗 | 接口与方法集 | 能写一个受约束的泛型函数，说明反射适用场景，不以 unsafe 内存布局替代类型规则 |
| goroutine 与 channel | goroutine、缓冲、阻塞、关闭、select | 必会／原理解释 | 进程线程、同步、语言基础 | 能判断收发/关闭行为与死锁，明确发送方和接收方责任，写出可退出的并发程序 |
| 同步与内存模型 | Mutex、RWMutex、WaitGroup、Once、Cond、atomic、happens-before | 必会／原理解释；Cond 和复杂原子算法按岗 | 线程同步、goroutine | 能给共享变量建立同步关系，区分数据竞争与业务竞态，说明锁和 channel 的选择 |
| 取消与并发任务 | context、任务汇聚、限并发、泄漏、race detector | 必会／场景分析 | channel、同步 | 能让失败、超时和下游阻塞后的任务退出，正确等待和回收资源；知道 race detector 的证据边界 |
| 调度与内存 | G/M/P、调度、栈、逃逸、分配、GC | 调度/逃逸/GC 常考／原理解释；分配器深入按岗 | OS 线程、虚拟内存、并发 | 能串起可运行、等待和唤醒，说明分配与回收代价，避免把 goroutine 等同线程或把逃逸等同错误 |
| HTTP 与数据访问 | Handler、中间件、连接复用、超时、database/sql、事务 | 必会／场景分析；框架按项目 | HTTP、SQL、事务、context | 能实现有超时和错误处理的最小接口，解释响应体、连接池及事务的生命周期 |
| 工程与诊断 | Modules、测试、基准测试、pprof、trace | 测试/模块必会，诊断常考／原理解释到场景分析 | 一个可运行 Go 服务 | 能复现依赖、验证边界输入，依据 profile 区分 CPU、分配和阻塞问题，不凭工具输出猜原因 |
| 项目与现场编码 | 集合、并发任务、SQL、服务故障与项目表达 | 必会／实际实现与场景分析 | 上述核心 | 能写可运行代码并说明复杂度、取消和失败路径；能以实际项目证据解释设计取舍 |

## 3. 拟写文章与归属

下表保留文章规划路径、标准标题与边界；当前验收状态见[扩展进度](./campus-expansion-progress.md#交付状态)，不以“拟写”判断文件是否存在。研究发现新考点时先调整归属与边界，再补正文；基础篇和深入篇是否拆开由阅读关系决定。

| Topic | 文章标准标题 | 拟写路径 | 范围与边界 |
| --- | --- | --- | --- |
| 语言与值 | Go 类型与值传递 | `docs/basic-knowledge/go/language/types-value-passing.mdx` | 零值、值复制、指针、new/make；不称 Go 存在按引用传参 |
| 语言与值 | Go 结构体与方法集 | `docs/basic-knowledge/go/language/structs-method-sets.mdx` | 接收者、嵌入、方法集与接口实现 |
| 集合与文本 | Go 切片 | `docs/basic-knowledge/go/collections/slices.mdx` | len/cap、共享、append、copy、截断及引用保留 |
| 集合与文本 | Go map | `docs/basic-knowledge/go/collections/maps.mdx` | 键约束、零值、迭代、并发访问；分版本解释实现 |
| 集合与文本 | Go 字符串与 rune | `docs/basic-knowledge/go/language/strings-runes.mdx` | 字节与码点、UTF-8、range、不可变字符串与拼接 |
| 接口与控制流 | Go 接口 | `docs/basic-knowledge/go/language/interfaces.mdx` | 隐式实现、动态类型和值、类型断言、带类型 nil |
| 接口与控制流 | defer | `docs/basic-knowledge/go/language/defer.mdx` | 参数求值、后进先出、闭包、具名返回值和资源释放 |
| 接口与控制流 | Go 错误处理 | `docs/basic-knowledge/go/language/errors.mdx` | error、包装、Is/As、panic/recover 的作用与边界 |
| 泛型与反射 | Go 泛型 | `docs/basic-knowledge/go/language/generics.mdx` | 类型参数、约束、类型集与接口的职责 |
| 泛型与反射 | Go 反射 | `docs/basic-knowledge/go/language/reflection.mdx` | Type/Value、可设置性、结构体标签；unsafe 按岗 |
| goroutine 与 channel | goroutine | `docs/basic-knowledge/go/concurrency/goroutines.mdx` | 创建、生命周期、变量捕获和退出责任；调度内部另篇 |
| goroutine 与 channel | channel | `docs/basic-knowledge/go/concurrency/channels.mdx` | 缓冲、阻塞、关闭和 nil channel；收发队列、交付与唤醒；关闭责任、同步边界和生产者消费者 |
| goroutine 与 channel | select | `docs/basic-knowledge/go/concurrency/select.mdx` | 就绪选择、表达式求值、default、超时预算、关闭后的循环与取消竞态 |
| 同步与内存模型 | Go 互斥锁 | `docs/basic-knowledge/go/concurrency/mutexes.mdx` | Mutex/RWMutex、完整临界区、复制锁、重入与升级、TryLock、取消边界及竞争代价 |
| 同步与内存模型 | Go 同步原语 | `docs/basic-knowledge/go/concurrency/synchronization.mdx` | WaitGroup、Once、Cond 的等待和通知契约 |
| 同步与内存模型 | Go 内存模型 | `docs/basic-knowledge/go/concurrency/memory-model.mdx` | happens-before、数据竞争、锁、channel 与原子同步 |
| 同步与内存模型 | sync.Map | `docs/basic-knowledge/go/concurrency/sync-map.mdx` | 并发映射、原子复合操作的边界与版本实现 |
| 同步与内存模型 | sync.Pool | `docs/basic-knowledge/go/concurrency/sync-pool.mdx` | 临时对象复用、回收不保证与对象重置责任 |
| 取消与并发任务 | context | `docs/basic-knowledge/go/concurrency/context.mdx` | 取消传播、deadline、资源释放与请求作用域值 |
| 取消与并发任务 | Go 并发任务管理 | `docs/basic-knowledge/go/concurrency/task-coordination.mdx` | 有界并发、汇聚、errgroup、失败传播与背压 |
| 取消与并发任务 | Go 并发诊断 | `docs/basic-knowledge/go/concurrency/leaks-races.mdx` | 阻塞退出、共享读写、race detector 与最小复现；区分两个故障类别 |
| 调度与内存 | Go 调度器 | `docs/basic-knowledge/go/runtime/scheduler.mdx` | G/M/P、工作窃取、阻塞、抢占；具体实现标版本 |
| 调度与内存 | Go 逃逸分析 | `docs/basic-knowledge/go/runtime/escape-analysis.mdx` | 生命周期、编译器判断、报告与分配验证 |
| 调度与内存 | Go 内存分配 | `docs/basic-knowledge/go/runtime/memory-allocation.mdx` | 栈与堆、尺寸类别、分配器层次、栈增长 |
| 调度与内存 | Go 垃圾回收 | `docs/basic-knowledge/go/runtime/garbage-collection.mdx` | 可达性、并发标记与写屏障、暂停、GOGC/GOMEMLIMIT |
| HTTP 与数据访问 | Go HTTP 服务 | `docs/basic-knowledge/go/web/http-server.mdx` | Handler、请求生命周期、中间件、超时与优雅关闭 |
| HTTP 与数据访问 | Go HTTP 客户端 | `docs/basic-knowledge/go/web/http-client.mdx` | Transport、连接复用、响应体关闭、请求取消 |
| HTTP 与数据访问 | database/sql | `docs/basic-knowledge/go/database/database-sql.mdx` | DB 连接池、Rows、Tx、占用和释放；SQL 原理引用共享正文 |
| HTTP 与数据访问 | Gin | `docs/basic-knowledge/go/web/gin.mdx` | 路由、中间件、绑定验证、错误处理；按项目选学 |
| HTTP 与数据访问 | GORM | `docs/basic-knowledge/go/database/gorm.mdx` | ORM 到 SQL、事务、更新与 N+1；按项目选学 |
| HTTP 与数据访问 | gRPC-Go | `docs/basic-knowledge/go/web/grpc-go.mdx` | deadline、拦截器、错误码、流与资源管理；协议原理共用 |
| 工程与诊断 | Go Modules | `docs/basic-knowledge/go/engineering/modules.mdx` | module/package、go.mod/go.sum、版本选择、replace/vendor |
| 工程与诊断 | Go 测试与基准测试 | `docs/basic-knowledge/go/engineering/testing.mdx` | 表驱动、子测试、httptest、基准与 fuzz；测试分层引用共享正文 |
| 工程与诊断 | Go 性能分析 | `docs/basic-knowledge/go/engineering/profiling.mdx` | CPU/heap/goroutine profile 与 trace；证据驱动定位 |

面经归纳后增加以下 12 篇，单独处理语言前置、并发工具和明确的平台问题。本表不规定题数和篇数上限；单篇正文与例子仍逐项核验。

| 文章标准标题 | 拟写路径 | 前置 | 优先级／深度 | 范围与停止条件 |
| --- | --- | --- | --- | --- |
| Go 语言 | `docs/basic-knowledge/go/language/index.mdx` | 一门语言的基本编程 | 必会／基础回答 | 类型、编译交付、GC与并发职责；按任务与代价解释语言选择，不作普遍性能排序 |
| Go 函数 | `docs/basic-knowledge/go/language/functions.mdx` | Go 类型与值传递 | 必会／原理解释 | 函数值、多返回值、可变参数、闭包与变量捕获 |
| Go 包初始化 | `docs/basic-knowledge/go/language/packages-initialization.mdx` | Go 函数、Go 类型与值传递 | 必会／原理解释 | 包依赖、变量初始化与 init 顺序；与 Modules 的版本管理分工 |
| Go 运行时 | `docs/basic-knowledge/go/runtime/index.mdx` | goroutine、进程与线程 | 常考／基础回答 | 调度、栈、分配、GC与网络轮询的职责联系；宽泛问法不冒充全部细节命中 |
| Go 网络轮询 | `docs/basic-knowledge/go/runtime/network-poller.mdx` | Go 调度器、I/O 多路复用 | 按岗选学／原理解释 | 网络就绪、挂起、唤醒和超时；区分普通文件与网络描述符 |
| singleflight | `docs/basic-knowledge/go/concurrency/singleflight.mdx` | context、Go 并发任务管理 | 常考／场景分析 | 同键合并、共享结果、失败和取消等待；不当作缓存或分布式锁 |
| Go 原子操作 | `docs/basic-knowledge/go/concurrency/atomics.mdx` | Go 内存模型、Go 互斥锁 | 常考／原理解释 | atomic、CAS、内存次序和复合不变量；无锁结构另引共享正文 |
| Go 构建 | `docs/basic-knowledge/go/engineering/build.mdx` | Go 包初始化、Go Modules | 必会／场景分析 | 构建、目标平台、CGO与交叉编译；区分语言版本与工具链 |
| client-go | `docs/basic-knowledge/go/cloud-native/client-go.mdx` | Go 并发任务管理、Kubernetes、幂等性 | 按岗选学／场景分析 | List/Watch、Informer、工作队列、调谐与缓存滞后 |
| go-zero | `docs/basic-knowledge/go/web/go-zero.mdx` | Go HTTP 服务、context | 按岗选学／原理解释 | 路由、中间件、httpx、logx、生成与运行时职责；项目 context 不冒充标准库 |
| go-zero sqlx | `docs/basic-knowledge/go/database/sqlx.mdx` | database/sql、Go 反射 | 按岗选学／原理解释 | Session、扫描、事务与错误边界；区分同名 jmoiron/sqlx。原问未给包路径，依 go-zero 上下文组织 |
| go-zero sqlc | `docs/basic-knowledge/go/database/sqlc.mdx` | database/sql、缓存一致性、go-zero sqlx | 按岗选学／原理解释 | CachedConn、缓存回源、空值与写后失效；事务提交与缓存失效边界；区别 sqlc-dev 生成器，不推定原问的包归属 |

## 4. 共享正文与待补前置

| 学习目标 | 已有正文 | 使用边界 |
| --- | --- | --- |
| 算法与编码 | [算法](../../docs/basic-knowledge/algorithms/index.mdx)、[数据结构](../../docs/basic-knowledge/data-structures/index.mdx)、[编码与 SQL 练习](../../docs/interview/coding-practice.mdx) | 原理共用，Go 最小实现和语言边界留在相关 Go 文章；不复制整套题解 |
| 进程、同步与内存 | [进程与线程](../../docs/basic-knowledge/operating-system/processes-threads.mdx)、[线程同步](../../docs/basic-knowledge/operating-system/synchronization.mdx)、[虚拟内存](../../docs/basic-knowledge/operating-system/virtual-memory.mdx) | 作为 goroutine、内存模型和调度前置；不把 Java 内存模型代替 Go 规范 |
| 网络与 I/O | [I/O 多路复用](../../docs/basic-knowledge/operating-system/io-multiplexing.mdx)、[HTTP](../../docs/basic-knowledge/network/http-versions-connection-reuse-timeouts.mdx)、[TCP 连接](../../docs/basic-knowledge/network/tcp_handshake.mdx) | Go netpoll 与标准库行为只展开语言实现差异 |
| SQL 与持久化 | [SQL 查询](../../docs/basic-knowledge/database/sql/query.mdx)、[数据库事务](../../docs/basic-knowledge/database/transaction/index.mdx)、[联合索引与覆盖索引](../../docs/basic-knowledge/database/indices/composite-covering-back-table.mdx) | 共享 SQL 和事务机制；连接池与 API 资源责任由 database/sql 解释 |
| 缓存、消息与可靠性 | [Redis](../../docs/basic-knowledge/nosql/redis/index.mdx)、[消息与中间件](../../docs/basic-knowledge/middleware/index.mdx)、[系统设计简介](../../docs/system-design/index.mdx) | 核心缓存、幂等、重试和超时按项目选章节，不整套加入第一轮 |
| 测试 | [测试金字塔](../../docs/basic-knowledge/java/quality/test-pyramid-contract-regression.mdx)、[测试替身](../../docs/basic-knowledge/java/quality/test-doubles-mock-stub-boundaries.mdx) | 现有文件在 Java 下但通用机制共用；Go 测试只展开语言工具差异 |
| 部署与定位 | [Docker 镜像与 Dockerfile](../../docs/devops/containers/docker-images.mdx)、[Linux 性能排查](../../docs/devops/linux/performance-troubleshooting.mdx) | 语言 profile 与系统指标相互验证；Kubernetes 按云原生岗位加入 |
| 项目表达 | [项目准备](../../docs/interview/project-preparation.mdx)、[简历准备](../../docs/interview/resume.mdx) | 用真实项目讲链路、证据和取舍，不生成虚构经历 |

共享 [gRPC](../../docs/basic-knowledge/network/grpc.mdx) 已完成本地单篇核验，解释服务契约、HTTP/2 传输、调用类型、截止时间与取消；Go API 与任务退出仍由 Go 实现专题负责。Java 的 RPC/Netty 实现不作为 Go 的整篇前置。

## 5. 样本校准与验收

1. 收集至少 100 篇去重且能核验正文的 Go 校招／实习候选人复盘，记录招聘类别；仅“后端”且没有 Go 方向依据的帖子不充数。未注明类别和社招材料可作补充，不进入校招／实习主分母。
2. 一篇多轮仍计一篇，同一考点每篇只计一次；保留公开作者×公司分组对照，记录重复、转载和排除理由。
3. 从实际提问归纳知识点和问法；只出现“map”不同时推断扩容、并发和版本实现都被问过。补充新考点后回看原样本。
4. 根据样本证据、前置和实现价值校准上表；零命中不自动删除必需基础，频率也不自动变成“必会”。
5. 每篇有规范／官方实现依据、可验证示例、面试核心与折叠回答；有面经来源的卡登记私有 `companies.json`。完成逐篇文风通读、结构校验、状态更新和最终构建后，才计为完成。

## 6. 技术核验入口

- [Go 语言规范](https://go.dev/ref/spec)
- [Go 内存模型](https://go.dev/ref/mem)
- [Go 1.22 发布说明](https://go.dev/doc/go1.22)
- [Go 1.24 发布说明](https://go.dev/doc/go1.24)
- [Go GC 指南](https://go.dev/doc/gc-guide)
- [Go 标准库](https://pkg.go.dev/std)

这些资料用于核验机制，不用于证明面试出现率。引用具体运行时结论时，补充对应版本的源代码位置。
