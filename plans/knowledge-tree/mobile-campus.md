# 移动端校招内容大纲

移动端校招准备分为 Android、iOS 和跨平台三条路径。每条路径都要能说明页面如何响应操作、任务如何执行、数据如何保存，以及出现卡顿、崩溃或状态丢失时怎样定位。读者按目标岗位选择一条主路径，不要求先学完另外两条。

本文已经过 100 篇候选人校招／实习复盘校准：Android 68 篇、iOS 31 篇、Flutter 10 篇、React Native 1 篇；分层有重叠，总样本只计 100 篇。**本轮新增正文、存量学习范围及路线的源码、本地浏览器验收已接受，完整站点构建已通过，正式发布尚未执行。** 当前状态和详细研究材料存放安排见[四方向扩展进度与研究口径](./campus-expansion-progress.md)。下列“必会”同时考虑平台前置与样本，“常考”表示本轮第二轮复习建议，不是市场命中概率。RN 和较新的平台 API 证据不足时明确使用平台前置依据，不借用其他分层的频率。

## 1. 路线边界与建设顺序

| 路线 | 第一轮目标 | 技术范围 | 按岗扩展 |
| --- | --- | --- | --- |
| Android | 能用 Java 或 Kotlin 完成列表与详情应用，解释页面重建、主线程、异步请求、缓存与错误恢复 | Java 的相关基础、Kotlin、Activity/Fragment、View、消息机制、网络与本地存储、基本测试与诊断 | Compose、跨进程通信、复杂后台任务、原生代码、音视频；其中 Compose 在明确使用它的岗位或项目中进入必会 |
| iOS | 能用 Swift 或 Objective-C 完成列表与详情应用，解释对象生命周期、界面更新、异步请求与本地状态 | 主修语言、ARC、Objective-C 对象与消息基础、应用与页面生命周期、UIKit、并发、网络与存储、基本测试与诊断 | C/C++ 前置按实际语言题补齐；SwiftUI、复杂后台任务、音视频与 runtime 深入按目标 JD 与已有项目调整 |
| Flutter | 能用 Dart 实现相同业务，解释状态变化、布局、异步和原生能力调用 | Dart、Widget/Element/RenderObject、状态与导航、布局渲染、平台通信、测试 | 自定义绘制、复杂原生插件、混合工程；不要求同时掌握 React Native |
| React Native | 能用 JavaScript/TypeScript 与 React 实现相同业务，解释状态、原生 UI 与跨语言调用 | 复用前端语言和 React 基础，增加原生组件、线程与架构、原生模块、平台适配及测试 | 原生模块开发、复杂动画、混合工程；不把浏览器 DOM 与 CSS 机制直接套用到原生应用 |

Android 与 iOS 分别提供语言基础、平台机制和实践的连续路径。跨平台作为移动端的子方向，其中 Flutter 与 React Native 分开采样、分开统计。HarmonyOS、Kotlin Multiplatform 以及游戏、音视频、智能硬件客户端先保留为后续岗位触发项，不借用本轮 Android 样本宣称已经覆盖。

建设顺序为：核定大纲 → 审核 100 篇面经并提取问题 → 校准考点、优先级与版本 → 完成前置和核心正文 → 完成经样本或 JD 支持的深入正文 → 路线接入与验收。大纲中的按岗候选项仍保留在缺口清单中，是否纳入本轮文章清单须有样本、JD 或必要前置依据。

## 2. 已有正文的复用范围

下列原理保留当前唯一正文。复用只包含所列学习目标，不把整篇文章的深入实现都加入移动端必会范围。移动端学习目标与平台边界复核已接受，范围快照及详细记录的存放说明见[扩展进度](./campus-expansion-progress.md#范围复核快照)；这不代表全部存量代码都在移动设备上运行过。

| 主题 | 已有文章 | 移动端需要达到的程度 | 不直接迁移的部分 |
| --- | --- | --- | --- |
| 数据结构与现场编码 | [数组](../../docs/basic-knowledge/data-structures/array.mdx)、[链表](../../docs/basic-knowledge/data-structures/linked-list.mdx)、[哈希表](../../docs/basic-knowledge/data-structures/hash-table.mdx)、[二叉树](../../docs/basic-knowledge/data-structures/binary-tree.mdx)、[堆](../../docs/basic-knowledge/data-structures/heap.mdx)、[二分查找](../../docs/basic-knowledge/algorithms/binary-search.mdx)、[排序](../../docs/basic-knowledge/algorithms/sorting.mdx) | 必会／原理解释与实际实现；按输入约束选择结构，写出边界用例并解释复杂度 | 不新增单题题解；代码练习使用主修语言，Java 实现不是 iOS 或 Flutter 的语言前置 |
| 进程、线程与内存 | [进程与线程](../../docs/basic-knowledge/operating-system/processes-threads.mdx)、[线程同步](../../docs/basic-knowledge/operating-system/synchronization.mdx)、[死锁](../../docs/basic-knowledge/operating-system/deadlock.mdx)、[虚拟内存](../../docs/basic-knowledge/operating-system/virtual-memory.mdx) | 必会／原理解释；区分并发、并行、阻塞、资源所有权与数据竞争，能分析一个等待环 | Linux 命令、服务器内存配置和具体回收策略不直接当作 iOS 或 Android 的行为保证 |
| 网络请求 | [DNS](../../docs/basic-knowledge/network/dns.mdx)、[TCP 与 UDP](../../docs/basic-knowledge/network/tcp_udp.mdx)、[TCP 连接](../../docs/basic-knowledge/network/tcp_handshake.mdx)、[HTTP](../../docs/basic-knowledge/network/http-versions-connection-reuse-timeouts.mdx)、[TLS](../../docs/basic-knowledge/network/tls.mdx)、[HTTP 缓存](../../docs/basic-knowledge/network/http-cache.mdx) | 必会／原理解释；串起 HTTPS 请求、超时、连接复用与缓存验证，区分网络失败和业务失败 | OkHttp、URLSession 的实现和配置另写；不能把某个客户端默认行为当作 HTTP 通用规则 |
| Java 语言与容器 | [Java 值传递](../../docs/basic-knowledge/java/language/types-references-value-passing.mdx)、[对象相等性](../../docs/basic-knowledge/java/language/equals-hashcode-object-identity.mdx)、[Java 泛型](../../docs/basic-knowledge/java/language/generics.mdx)、[String](../../docs/basic-knowledge/java/language/string-immutability-pool.mdx)、[Java 集合框架](../../docs/basic-knowledge/java/collections/collection-interface-selection.mdx)、[ArrayList](../../docs/basic-knowledge/java/collections/arraylist-growth-memory-locality.mdx)、[HashMap](../../docs/basic-knowledge/java/collections/hashmap-structure-lookup-path.mdx) | Android 必会／原理解释；能解释引用、相等性、泛型约束与容器选择；Kotlin 路线补互操作边界 | 先复用语言/API 契约；涉及 Android 类库实现、API 可用性、脱糖和版本差异时另核验，不照搬 Java 17/21 的全部环境假设 |
| Java 并发 | [线程安全](../../docs/basic-knowledge/java/concurrency/thread-safety-race-conditions.mdx)、[Java 内存模型](../../docs/basic-knowledge/java/concurrency/jmm-happens-before.mdx)、[synchronized](../../docs/basic-knowledge/java/concurrency/synchronized-monitor-optimizations.mdx)、[volatile](../../docs/basic-knowledge/java/concurrency/volatile-barriers-visibility.mdx)、[Java 线程池](../../docs/basic-knowledge/java/concurrency/threadpoolexecutor-execution-path.mdx) | Android 必会／原理解释；解释共享状态、可见性、原子性与任务排队 | HotSpot 的锁优化、JVM 内存参数和 Java 虚拟线程不作为 ART 的默认机制；协程不借用线程池章节替代说明 |
| SQL 与数据约束 | [SQL 查询](../../docs/basic-knowledge/database/sql/query.mdx)、[SQL 连接](../../docs/basic-knowledge/database/sql/joins.mdx)、[数据约束](../../docs/basic-knowledge/database/modeling/constraints.mdx) | 核心查询必会／基础回答与实际查询；按本地记录模型写筛选、排序、关联和唯一约束 | SQL 方言须在 SQLite 验证；InnoDB 锁、MVCC 与日志不当作 SQLite 实现 |
| 失败处理 | [超时](../../docs/system-design/reliability/timeout-budget-cancellation.mdx)、[重试](../../docs/system-design/reliability/retry-backoff-jitter-storms.mdx)、[幂等键](../../docs/system-design/reliability/idempotency-keys-safe-retries.mdx) | 必会／原理解释；能说明取消、重试、重复点击与请求重复的不同边界 | 服务端幂等保障不能由“客户端禁用按钮”替代；离线写入与冲突处理补移动端正文 |
| 安全与测试 | [认证与授权](../../docs/system-design/security/authentication-authorization-trust-boundaries.mdx)、[测试金字塔](../../docs/basic-knowledge/java/quality/test-pyramid-contract-regression.mdx)、[测试替身](../../docs/basic-knowledge/java/quality/test-doubles-mock-stub-boundaries.mdx) | 必会／基础回答到场景分析；说明客户端与服务端的信任边界，选择能发现错误的测试层级 | 移动端令牌存储、平台权限、设备环境与 UI 同步另写；不要求学习服务端测试容器才能测试移动端 |
| 协作与面试表达 | [Git](../../docs/tools-and-frameworks/git/index.md)、[使用 Git 进行第一次提交](../../docs/tools-and-frameworks/git/basic-usages/first-commit.mdx)、[项目准备](../../docs/interview/project-preparation.mdx)、[简历准备](../../docs/interview/resume.mdx) | 必会／实际操作与场景分析；提交可运行项目，用真实测量和复现步骤解释改动 | Git 正文已覆盖分支、合并与撤销的基本边界；项目和简历复用个人贡献、取舍与证据结构，Java 后端示例不作为移动端技术清单 |

## 3. 移动端共享主题

以下主题讨论多个平台共享的问题。平台 API 和工具差异在对应平台文章解释，避免共享文章变成四套教程。编号只用于本大纲的依赖引用，不是发布后的知识 ID。

| Topic | 拟新增文章与建议路径 | 优先级／深度 | 前置与停止条件 |
| --- | --- | --- | --- |
| M01 本地持久化 | 《SQLite》：`docs/basic-knowledge/database/sqlite.mdx` | 基本查询、事务与迁移必会／原理解释；WAL 并发细节按岗选学 | 前置：SQL、文件与线程基础。能解释一次本地更新的事务边界、schema 升级失败与并发读写，验证方言与实际数据库版本；Room、Core Data 不能替代 SQLite 原理，也不能假定 Core Data 只是一层 SQLite API |
| M02 离线数据 | 《客户端数据同步》：`docs/mobile/common/data-synchronization.mdx` | 本地/远端数据责任必会／原理解释；离线写入与冲突按岗选学／场景分析 | 前置：HTTP 缓存、超时、重试、幂等性、M01。能画出先读缓存再更新、断网重试、重复提交与冲突路径，区分缓存刷新和持久化业务状态 |
| M03 图片与列表资源 | 《移动端图片加载》：`docs/mobile/common/image-loading.mdx` | 常考／原理解释到场景分析 | 前置：网络、内存、平台列表复用。能从请求、解码、缩放、缓存到显示解释图片成本，并用取消与身份校验避免复用单元显示旧结果；平台库源码按岗扩展 |
| M04 性能测量 | 《移动端性能指标》：`docs/mobile/common/performance-metrics.mdx` | 必会／基础回答；测量与定位／场景分析 | 前置：线程、内存、平台渲染与生命周期。能定义启动、卡顿、内存、耗电与网络的测量条件，区分单次观察和可比较结果；平台诊断文章负责采样方法和证据解释 |

## 4. Android 知识分支

本分支先建立 Java/Kotlin 与 Android 执行环境，再进入页面、数据和故障分析。Java 基础按第 2 节复用，Kotlin 的语言知识归语言目录，不放在 Android 下复制维护。

| Topic | 拟新增文章与建议路径 | 优先级／深度 | 前置与停止条件 |
| --- | --- | --- | --- |
| A01 Kotlin 类型与对象 | 《Kotlin 类型系统》：`docs/basic-knowledge/kotlin/type-system.mdx`；《Kotlin 空安全》：`docs/basic-knowledge/kotlin/null-safety.mdx`；《Kotlin 类与接口》：`docs/basic-knowledge/kotlin/classes-interfaces.mdx` | Kotlin 路线必会／原理解释；Java 路线按岗选学 | 前置：基本变量与函数。能解释可空类型、智能转换、平台类型、数据类的生成行为与相等性，识别 `val` 与对象不可变的区别；通过最小程序验证与 Java 的互操作 |
| A02 Kotlin 函数与泛型 | 《Kotlin 函数》：`docs/basic-knowledge/kotlin/functions.mdx`；《Kotlin 泛型》：`docs/basic-knowledge/kotlin/generics.mdx` | 函数类型、Lambda、扩展函数必会／原理解释；泛型投影、内联与具体化类型参数常考／原理解释 | 前置：A01、Java 泛型的相关概念。能推导闭包捕获、扩展函数解析、`in`/`out` 的读写限制，解释内联改变什么、不能解决什么 |
| A03 Kotlin 异步 | 《Kotlin 协程》：`docs/basic-knowledge/kotlin/coroutines.mdx`；《Kotlin Flow》：`docs/basic-knowledge/kotlin/flow.mdx` | Kotlin 路线协程必会／原理解释；Flow 常考，使用相关架构的项目中必会 | 前置：A01/A02、线程与取消。能区分挂起和阻塞，解释调度、父子任务、取消与异常传播；能比较冷流、StateFlow、SharedFlow 的消费与状态语义，不把 `suspend` 当作自动切换后台线程 |
| A04 组件与生命周期 | 《Android 应用组件》：`docs/mobile/android/app-components.mdx`；《Activity 生命周期》：`docs/mobile/android/activity-lifecycle.mdx`；《Fragment 生命周期》：`docs/mobile/android/fragment-lifecycle.mdx`；《Android 任务栈》：`docs/mobile/android/task-back-stack.mdx` | 组件职责、Activity 与状态恢复必会／原理解释；Fragment、任务栈常考，项目使用时必会 | 前置：对象生命周期、进程线程。能区分组件回调、配置变化、进程终止与重新创建；解释 Context 的使用范围、Intent、导航返回与 Fragment 视图生命周期，说明状态保存位置，不能依赖终止前一定执行清理回调 |
| A05 主线程与进程通信 | 《Android 消息机制》：`docs/mobile/android/handler-looper.mdx`；《Binder》：`docs/mobile/android/binder.mdx`；《ART》：`docs/mobile/android/art.mdx` | Handler/Looper/MessageQueue 必会／原理解释；Binder 常考／基础回答到原理解释；ART 深入按岗选学 | 前置：线程、队列、同步、Java 内存模型。能沿消息入队到回调解释执行线程，定位长任务和引用持有；能区分进程内调用与 Binder 调用；ART 只按经核验的 Android 环境讲编译与回收，不套用 HotSpot 细节 |
| A06 View 与输入 | 《Android View》：`docs/mobile/android/view-layout-drawing.mdx`；《Android 触摸事件》：`docs/mobile/android/touch-events.mdx`；《RecyclerView》：`docs/mobile/android/recyclerview.mdx` | View 测量、布局、绘制与列表复用必会／原理解释；事件冲突常考／场景分析 | 前置：A04/A05、树与坐标。能推演尺寸约束、一次刷新与触摸分发，解释列表复用、身份和增量更新；用实际案例分析滑动冲突和错位，避免只背方法顺序 |
| A07 声明式界面 | 《Jetpack Compose》：`docs/mobile/android/jetpack-compose.mdx` | 按岗选学／原理解释；Compose 项目状态、重组和副作用必会 | 前置：A01—A04、A06 的布局基础。能解释状态读取到重组、状态提升、身份与副作用生命周期，区分 UI 状态保留、配置变化恢复和进程终止后的恢复；不要求背全部 API |
| A08 状态与持久化 | 《Android ViewModel》：`docs/mobile/android/viewmodel.mdx`；《Room》：`docs/mobile/android/room.mdx`；《Android DataStore》：`docs/mobile/android/datastore.mdx` | ViewModel 与状态恢复必会／原理解释；Room/DataStore 常考，项目使用时必会 | 前置：A03/A04、M01/M02。能划分 UI、状态持有者和数据来源，解释请求生命周期；说明 ViewModel、保存状态和磁盘数据的不同保证；能测试 Room 迁移与持久化失败 |
| A09 网络与混合页面 | 《OkHttp》：`docs/mobile/android/okhttp.mdx`；《Android WebView》：`docs/mobile/android/webview.mdx` | 请求执行、取消与拦截器常考／原理解释；WebView 按岗选学／场景分析 | 前置：HTTP/TLS/缓存、A03/A04。能沿调用、连接、拦截器与响应消费解释链路，区分应用重试和客户端内部重试；使用 WebView 时解释导航、JS 通信与不可信页面边界 |
| A10 权限与后台工作 | 《Android 应用沙箱与权限》：`docs/mobile/android/sandbox-permissions.mdx`；《Android 后台任务》：`docs/mobile/android/background-work.mdx` | 沙箱与运行时授权必会／基础回答；后台任务常考／原理解释 | 前置：A04/A05、文件、鉴权。能区别系统权限与业务授权，解释拒绝授权后的业务路径；区分线程、Service、前台服务与 WorkManager 的职责，按任务存续要求选择；版本相关限制在文内就近注明 |
| A11 内存与稳定性 | 《Android 内存泄漏》：`docs/mobile/android/memory-leaks.mdx`；《ANR》：`docs/mobile/android/anr.mdx`；《Android 性能诊断》：`docs/mobile/android/performance-diagnostics.mdx` | 必会／原理解释到场景分析 | 前置：A04—A06、M03/M04。能根据引用链说明泄漏，用线程栈区分耗时计算、锁等待和 I/O；使用 trace 与采样解释启动或掉帧的具体阶段，给出修复前后同条件证据；不把所有卡顿都归为 ANR |
| A12 构建与测试 | 《Android 构建》：`docs/mobile/android/build.mdx`；《Android 测试》：`docs/mobile/android/testing.mdx` | 构建产物、依赖、基本测试必会／基础回答与实际操作；R8、签名、变体和兼容性常考／原理解释 | 前置：Git、测试金字塔、A04/A08。能解释源码到安装包的关键步骤和混淆映射用途，设计本地单元测试、设备测试及 UI 测试；复现旋转、进程重建、弱网和权限拒绝，不用单元测试通过代替真实设备行为 |

Kotlin 委托、Kotlin/Java 反射与代码生成、JNI、NDK、热修复与插件化列为 A02/A05/A12 的按岗追加考点。只有实际样本或项目需要时再核定独立文章，不能为追逐历史面试术语把所有读者引入平台源码细节。

## 5. iOS 知识分支

Swift 语言与 Apple 平台机制分别归属。已有 Java 引用与线程文章可帮助作者比较，但不作为 Swift 值语义、ARC 或调度保证的证据。

| Topic | 拟新增文章与建议路径 | 优先级／深度 | 前置与停止条件 |
| --- | --- | --- | --- |
| I01 Swift 类型与抽象 | 《Swift 类型系统》：`docs/basic-knowledge/swift/type-system.mdx`；《Swift Optional》：`docs/basic-knowledge/swift/optional.mdx`；《Swift 协议与泛型》：`docs/basic-knowledge/swift/protocols-generics.mdx` | Swift 路线必会／原理解释 | 前置：变量、函数与对象基础。能比较值类型和引用类型、复制与共享，解释可选值解包和错误处理；给出协议约束、泛型与类型擦除的使用边界，后者深度按岗校准 |
| I02 闭包与内存 | 《Swift 闭包》：`docs/basic-knowledge/swift/closures.mdx`；《Swift ARC》：`docs/basic-knowledge/swift/arc.mdx` | 必会／原理解释 | 前置：I01。能画出闭包捕获与对象的引用关系，解释强引用环、`weak` 与 `unowned` 的生命周期条件；区分 ARC、垃圾回收与线程安全，不机械给每个闭包加弱引用 |
| I03 Objective-C | 《Objective-C 对象模型》：`docs/basic-knowledge/objective-c/object-model.mdx`；《Objective-C Runtime》：`docs/basic-knowledge/objective-c/runtime.mdx`；《Objective-C Block》：`docs/basic-knowledge/objective-c/block.mdx`；《Objective-C 内存管理》：`docs/basic-knowledge/objective-c/memory-management.mdx` | 对象、消息与引用计数基础必会／原理解释；OC 路线 Block 必会，完整消息转发与 runtime 源码按岗选学 | 前置：对象、指针基础。样本中 OC 内存 10/31、Runtime 8/31、对象 7/31、Block 6/31，故不能把整个 OC 分支只留给少数项目。能解释属性、强弱引用、自动释放池、消息派发、分类、关联对象、KVC/KVO；与 Swift ARC 分开讲语言规则 |
| I04 应用与页面 | 《iOS 应用生命周期》：`docs/mobile/ios/app-lifecycle.mdx`；《UIViewController》：`docs/mobile/ios/view-controller.mdx` | 必会／原理解释 | 前置：I01/I02、进程线程。能区分 App、Scene 和页面生命周期，解释前后台、导航、状态恢复与资源释放；不把页面消失等同于对象销毁，也不假定进程退出前必有回调 |
| I05 UIKit 布局与事件 | 《UIKit 布局》：`docs/mobile/ios/uikit-layout.mdx`；《iOS 事件响应链》：`docs/mobile/ios/responder-chain.mdx`；《iOS 列表视图》：`docs/mobile/ios/list-views.mdx` | 布局、列表与事件目标必会／原理解释；约束冲突、手势协调常考／场景分析 | 前置：I04、树与坐标。能解释视图层级、Auto Layout 约束与布局时机，沿命中测试到响应说明事件目标；分析复用单元的身份、图片错位与滚动性能 |
| I06 SwiftUI | 《SwiftUI 状态管理》：`docs/mobile/ios/swiftui-state.mdx` | 按岗选学／原理解释；SwiftUI 项目状态来源、依赖与身份必会 | 前置：I01/I02/I04。能解释状态变化与 View 更新、数据所有权、身份与副作用；区分所选部署版本适用的观察方案，不按最新 API 给所有岗位重写基础 |
| I07 运行循环与并发 | 《RunLoop》：`docs/mobile/ios/run-loop.mdx`；《Grand Central Dispatch》：`docs/mobile/ios/gcd.mdx`；《Swift 并发》：`docs/basic-knowledge/swift/concurrency.mdx` | 主线程与队列必会／原理解释；RunLoop 常考／原理解释；Swift 并发在相关项目中必会 | 前置：线程、同步、死锁、I01/I02。能区分队列和线程、同步和串行，解释主队列等待死锁；理解事件源与运行模式；能解释 Task、取消、actor 隔离、重入与 MainActor 的边界 |
| I08 网络与存储 | 《URLSession》：`docs/mobile/ios/url-session.mdx`；《iOS 数据持久化》：`docs/mobile/ios/persistence.mdx`；《WKWebView》：`docs/mobile/ios/wkwebview.mdx` | 请求、取消、缓存和本地数据必会／原理解释；Core Data、SwiftData、WKWebView 按岗选学 | 前置：HTTP/TLS/缓存、I04/I07、M01/M02。能解释任务结果与界面生命周期、离线和失败路径；区分文件、偏好、Keychain 与对象持久化的责任；平台封装不重写 SQLite 正文 |
| I09 隐私与后台任务 | 《iOS 应用沙箱与权限》：`docs/mobile/ios/sandbox-permissions.mdx`；《iOS 后台任务》：`docs/mobile/ios/background-tasks.mdx` | 沙箱、授权与敏感信息存储必会／基础回答；后台任务按岗选学／原理解释 | 前置：I04/I08、鉴权。能解释授权拒绝、文件访问和凭据保护的边界，区别系统调度的后台任务与无限运行；具体 API 和执行条件注明适用系统版本 |
| I10 性能与崩溃 | 《iOS 性能诊断》：`docs/mobile/ios/performance-diagnostics.mdx`；《iOS 崩溃诊断》：`docs/mobile/ios/crash-diagnostics.mdx` | 必会／场景分析 | 前置：I02/I04/I05/I07、M03/M04。能用 Instruments、调用栈、分配和引用证据检查卡顿与内存，说明符号化所需的构建产物；区分异常、内存访问错误、系统终止与未释放对象 |
| I11 构建与测试 | 《iOS 构建》：`docs/mobile/ios/build.mdx`；《iOS 测试》：`docs/mobile/ios/testing.mdx` | 基本构建与测试必会／实际操作；签名、配置、依赖和发布产物常考／基础回答 | 前置：Git、测试金字塔、I04/I08。能解释编译链接到应用包的步骤，保留可定位问题的符号；完成异步逻辑、网络替身、UI 与真机检查，说明模拟器不能覆盖的设备行为 |

## 6. 跨平台知识分支

跨平台工程仍然需要选定至少一个目标操作系统验证。共享业务代码不能代替平台生命周期、权限和设备测试。Flutter 与 React Native 的前置不同，路线分别呈现。

| Topic | 拟新增或引用的文章与建议路径 | 优先级／深度 | 前置与停止条件 |
| --- | --- | --- | --- |
| C01 Dart 语言 | 《Dart 类型系统》：`docs/basic-knowledge/dart/type-system.mdx`；《Dart 并发》：`docs/basic-knowledge/dart/concurrency.mdx` | Flutter 路线必会／原理解释 | 前置：函数、类型、事件队列与线程基础。能解释空安全、泛型、Future、Stream、异步错误与 Isolate 通信；推导同一事件循环中任务的执行，不把 `await` 当作并行计算 |
| C02 Flutter 对象树 | 《Flutter Widget、Element 与 RenderObject》：`docs/mobile/flutter/widget-element-render-object.mdx`；《Flutter 状态管理》：`docs/mobile/flutter/state-management.mdx` | Flutter 路线必会／原理解释 | 前置：C01。能分别说明配置、树中实例与布局绘制对象的责任，解释状态更新、身份、Key 与生命周期；状态库按项目选一种，不复制同一状态规则到每个库 |
| C03 Flutter 布局与帧 | 《Flutter 布局与渲染》：`docs/mobile/flutter/layout-rendering.mdx`；《Flutter 手势》：`docs/mobile/flutter/gestures.mdx`；《Flutter 导航》：`docs/mobile/flutter/navigation.mdx` | Flutter 路线必会／原理解释；自定义绘制与手势竞争常考／场景分析 | 前置：C02、树与坐标。能沿约束、布局、绘制解释一个界面，分析溢出、列表与重建成本；解释点击、返回、深链及异步完成时页面已销毁的处理 |
| C04 Flutter 平台与交付 | 《Flutter 平台通信》：`docs/mobile/flutter/platform-channels.mdx`；《Flutter 测试》：`docs/mobile/flutter/testing.mdx`；《Flutter 性能诊断》：`docs/mobile/flutter/performance-diagnostics.mdx` | 平台调用基本边界、测试与调试必会／基础回答到场景分析；插件与混合工程按岗选学 | 前置：C01—C03、至少一个平台的生命周期、权限与构建。能解释调用、序列化、线程、错误返回与资源释放，验证插件的原生部分；区分单元、Widget、集成测试及调试/性能分析/发布构建的测量条件 |
| C05 React Native 前置 | 复用由前端统一维护的 JavaScript/TypeScript/React 文章，路径见下表 | React Native 路线必会／原理解释；Web 专属部分不进入必会 | 能解释闭包、Promise、组件、状态、Effect 与列表身份；React Native 的执行环境另读 C06，不以浏览器任务队列或 DOM 布局作为原生实现证据 |
| C06 React Native 运行机制 | 《React Native 渲染》：`docs/mobile/react-native/rendering.mdx`；《React Native 原生模块》：`docs/mobile/react-native/native-modules.mdx` | React Native 路线基本渲染与调用边界必会／原理解释；架构内部按岗选学 | 前置：C05、原生 UI 与线程基础。能说明 JS 逻辑、原生 UI 和渲染工作的责任及调度；把 Legacy Bridge 与 New Architecture 分开解释，依据面经和项目版本核验 JSI、Fabric、TurboModules，不把所有版本概括为同一种桥接机制 |
| C07 React Native 工程 | 《React Native 平台适配》：`docs/mobile/react-native/platform-adaptation.mdx`；《React Native 测试》：`docs/mobile/react-native/testing.mdx`；《React Native 性能诊断》：`docs/mobile/react-native/performance-diagnostics.mdx` | 导航、权限、构建和基本测试必会／实际操作；复杂动画、混合工程常考或按岗选学 | 前置：C06、M02—M04、至少一个原生平台的生命周期与构建。能验证列表、键盘、返回、权限和网络故障，区分 JS 计算、原生工作与 UI 更新成本；对比发布构建并用真机检查平台差异 |

React Native 语言与 React 前置由[前端大纲](./frontend-campus.md)统一维护。下列共享正文已落盘，不创建重复内容；逐篇核验状态以前端写作清单为准，最终接入仍由主任务统一审核。

| 前置内容 | 共享正文路径 |
| --- | --- |
| JavaScript 类型转换、闭包、`this`、原型与对象复制 | `docs/basic-knowledge/javascript/types-conversion.mdx`、`scope-closures.mdx`、`this-binding.mdx`、`prototypes.mdx`、`copying.mdx`，后四项与第一项同目录 |
| Promise、async/await 与模块 | `docs/basic-knowledge/javascript/promise.mdx`、`async-await.mdx`、`modules.mdx`，后两项与第一项同目录 |
| TypeScript 类型、泛型与接口 | `docs/basic-knowledge/typescript/type-system.mdx`、`generics-utility-types.mdx`、`type-interface.mdx`，后两项与第一项同目录 |
| React 组件、Hooks、协调与状态 | `docs/tools-and-frameworks/react/components.mdx`、`hooks.mdx`、`reconciliation.mdx`、`state-management.mdx`，后三项与第一项同目录 |

## 7. 编码、项目与停止条件

文章内自测只能证明读者能否解释机制，不能代替实际运行、调试和项目表达。下列练习是贯穿路线的验收材料，不另建一套知识正文。

| 任务 | 输入与约束 | 可验证的完成条件 |
| --- | --- | --- |
| 现场编码 | 使用主修语言，覆盖数组/字符串、哈希、链表、树、搜索、排序与基本动态规划；进阶题按面经样本补充 | 实现可运行，说明复杂度，检查空输入、重复、越界和大输入；Swift/Dart/Kotlin 的容器与字符串语义不能照搬 Java 实现 |
| 列表与详情项目 | 请求接口、分页、图片加载、详情返回、刷新；允许弱网与失败 | 处理加载/空/成功/失败状态；取消或忽略过期结果；复用单元不串内容；可复现一次失败并通过回归检查 |
| 状态与离线练习 | 旋转或配置变化、前后台切换、进程重建、断网重连、重复提交 | 标出 UI 状态、内存状态与持久化数据的所有者，解释各自存续边界；按平台重现而非只模拟函数调用 |
| 性能诊断练习 | 为启动、滚动或内存选择一个可稳定复现的问题，固定设备、构建类型和数据量 | 保存修复前后的同条件测量与 trace，说明瓶颈证据、修改原因和副作用；不使用无来源的“提升百分比” |
| 测试与交付练习 | 逻辑测试、接口替身、最小 UI 流程、至少一个设备环境 | 用故障触发条件验证测试确实能发现问题；形成可安装产物，说明版本、依赖与调试符号；跨平台项目至少验证实际声明支持的平台 |
| 项目口述 | 选择本人完成的模块，按真实职责准备 | 说清目标、数据流、关键约束、方案与证据，区分个人贡献和团队成果；完整方法引用《项目准备》 |

## 8. 面经样本与考点校准

本任务的目标是 **100 篇审核通过、去重后的移动端面经**，不是 Android、iOS、跨平台各 100 篇。以能够回到原始文章、核验候选人自述及明确的校招或实习场景为计数条件。纳入与否不依赖题目多少：符合范围但未披露具体问题的复盘仍进入分母，问题命中为空；搜索摘要、题库合集、培训广告和缺少面试经历的知识总结不计入这 100 篇。

- 每篇记录原始 URL、标题、作者或发布标识、发布/面试时间、公司、校招或实习场景、子方向、阅读状态和问题提取结果。无法确认的信息保留未知，不推断。
- 先对 Android、iOS、Flutter、React Native 分别检索，再按实际可核验材料记录组成。每个子方向都要有有效样本；不足时继续补搜并明确缺口，不能用 Android 总量掩盖其他方向缺样本。
- 多平台或跨轮次文章只计一篇，保留全部子方向和轮次标签；转载、同作者重复发布及同一原文镜像合并。分平台分母可重叠，报告须说明口径。
- 原始问题先忠实提取，再归一到知识点。保留“是否要求现场编码”“给定条件”“版本”“追问”与证据位置；相似问法可合并，独立考点不能因词面相近被合并。
- 频率按“含该考点的有效文章数／该子方向有效文章数”计算，同一篇重复出现只计一次。额外给出公司、年份、招聘场景分布；这些结果只能说明本次样本中的出现率，不能推断全市场命中率。
- 社招、岗位不明或无法读到正文的材料单列，不借它们凑校招核心分母；可用于发现候选考点，但必须标明证据边界。优先检索 2024—2026 年，较早材料符合其他条件时可以纳入，注明年代与版本，不冒充当前招聘季。
- 采样完成后将每个 Topic 标为“样本支持”“JD/平台前置支持”“待补证据”或“暂不纳入本轮”，再核定文章清单。平台必需基础不因面经没有逐字提到而被删除；它的依据要写明。

### 8.1 分层结果与优先级依据

| 子方向 | 本批直接披露较多的平台主题 | 本轮建设决定 |
| --- | --- | --- |
| Android（68） | 组件与生命周期 38；View 29；消息机制 27；触摸 24；泄漏和图片各 23；网络库 22；性能 21 | 生命周期、消息、View、内存与请求链路作为核心；网络库拆清 OkHttp、Retrofit 与 RxJava 的不同职责。Java 基础与网络、OS 继续引用既有文章 |
| iOS（31） | C/C++ 基础 15；引用计数 10；UIKit 与性能各 9；Runtime 与 GCD 各 8；RunLoop 7 | OC 内存和消息基础进入核心复习；补共享 C/C++ 前置。Swift、SwiftUI 的较少命中不能证明平台不再使用它们，主修语言与项目仍决定学习范围 |
| Flutter（10） | 渲染对象树 6；Dart 异步 4；状态与平台通信各 2；列表性能 1 | 先 Dart 与三棵树，再状态、布局、平台调用和验证。样本少且常与 Android 合并面试，不对状态库作市场排名 |
| React Native（1） | 架构与原生调用 1 | 仅能证明该具体复盘涉及 RN；完整路线以必要前置支持，继续保留证据缺口，不宣称 RN 全市场频率 |

篇级分层会保留跨平台复盘中其他平台的问题。例如同时标记 Android/Flutter 的文章可能含 Java 题；比例不等于 Flutter 独有题的概率。来源中较早年代占多数，现代 API 的编写要重新核验官方材料。逐题位置、作者×公司合并统计和附件记录的存放安排见[研究口径与材料存放说明](./campus-expansion-progress.md#研究材料与迁移状态)。

### 8.2 样本新增的内容责任

以下是原表之外已纳入本轮的文章；不是可随意跳过的待办候选。详细到单篇的依赖、来源和停止条件以写作清单为准。

| Topic | 新增标准文章与路径 | 优先级、前置与停止条件 |
| --- | --- | --- |
| S01 C/C++ 类型与内存 | 《C++ 类型系统》`docs/basic-knowledge/cpp/type-system.mdx`；《C++ 指针与引用》`docs/basic-knowledge/cpp/pointers-references.mdx`；《C++ 对象生命周期》`docs/basic-knowledge/cpp/object-lifetime.mdx` | C/C++ 语言题与 JNI 项目必会／原理解释；先类型再对象存续，解释 const、sizeof、数组衰变、指针悬空、构造析构、new/delete 与 malloc/free、RAII，不扩展为完整系统开发路线 |
| S02 C++ 对象与容器 | 《C++ 多态》`docs/basic-knowledge/cpp/polymorphism.mdx`；《C++ 智能指针》`docs/basic-knowledge/cpp/smart-pointers.mdx`；《C++ 容器》`docs/basic-knowledge/cpp/containers.mdx`；《C++ 复制与移动》`docs/basic-knowledge/cpp/copy-move.mdx` | C++ 路线必会／原理解释；前置 S01。能分析虚析构、切片、共享计数环、迭代器失效和移动后状态；不要求背 ABI 布局或完整模板元编程 |
| S03 编译与机器执行 | 《C++ 编译与链接》`docs/basic-knowledge/cpp/compilation-linking.mdx`；《系统调用》`docs/basic-knowledge/operating-system/system-calls.mdx`；《指令执行》`docs/basic-knowledge/computer-architecture/instruction-execution.mdx`；《二进制数据表示》`docs/basic-knowledge/computer-architecture/data-representation.mdx` | 语言编译常考、硬件细节按岗／基础回答到原理解释；能串起预处理、目标文件、链接、加载与受控内核入口，区分特权切换和调度；解释数值表示与字节序，不声称 ARM 必定比 x86 更省电 |
| S04 网络库与异步流 | 《Retrofit》`docs/mobile/android/retrofit.mdx`；《RxJava》`docs/tools-and-frameworks/rxjava.mdx` | Android 第二轮常考／原理解释；项目使用时必会。前置 Java 泛型、反射、线程及 OkHttp；解释声明接口、转换与调用适配，区分 subscribeOn/observeOn、map/flatMap 与取消 |
| S05 Android 数据交换 | 《Android 偏好存储》`docs/mobile/android/preferences.mdx`；《Android Parcelable》`docs/mobile/android/parcelable.mdx` | 常考／原理解释；前置进程、I/O 与生命周期。解释 SharedPreferences、DataStore、MMKV 的数据边界和实现差异；Parcel 服务 IPC，不能当长期稳定的序列化格式 |
| S06 原生与动态加载 | 《JNI》`docs/mobile/android/jni.mdx`；《Android 动态加载》`docs/mobile/android/dynamic-loading.mdx` | 按岗选学／原理解释；前置 S01—S03、ART 与构建。解释线程关联、局部/全局引用、数组字符串访问和异常边界；动态加载说明类加载、资源和版本约束，不把历史热修复方案作为无条件现代实践 |
| S07 iOS 路由 | 《iOS 深层链接》`docs/mobile/ios/deep-links.mdx` | 常考／原理解释到场景分析；前置 App/Scene、URL 与信任边界。比较 URL Schemes 和 Universal Links，解释域名关联、参数验证、登录态和落地页面恢复 |
| S08 媒体与图形 | 《媒体播放》`docs/mobile/common/media-playback.mdx`；《图形渲染管线》`docs/mobile/common/rendering-pipeline.mdx` | 按岗选学／原理解释；前置线程、网络、内存与平台 UI。串起采集或读取、解封装、解码、缓冲、时钟与输出；区分 CPU 提交、GPU 渲染、合成和显示，不扩展音视频算法或图形学全课程 |

## 9. 文章编写与验收

正文遵循仓库 [AGENTS.md](../../AGENTS.md) 和 `lin-writing-style`。文章按技术对象归属：语言、SQLite、网络和测试原理各保留一份；平台文章负责平台行为，岗位路线只安排优先级、顺序和停止条件。语言特性和框架行为必须明确适用版本，先核验再落笔，不在大纲阶段臆定所有公司的技术栈版本。

每篇文章需具备核心结论、必要前置、可验证示例、边界与自测。题目数量随独立考点决定，不设固定上限。知识正文引用官方规范或可重复实验；面经仅用于证明问过该问题，不直接充当参考答案依据。

有可核验面经依据的题目在私有仓库 `linsama-account/content/coding101/companies.json` 登记 `{ cardId, companies, sources }`，保留原始来源和条件。公开正文不写公司归属和来源注释；没有对应面经依据的题目保留本站原理自测注释。每篇声明稳定 `knowledge.id`，卡片使用稳定英文 ID，正文中文章节使用不带编号的中文显式锚点。

文章验收要求逐篇运行 `node scripts/check-article-format.mjs --strict --list -- <文件...>`，人工复核技术解释与文风；代码用对应语言和平台验证，设备相关结论需要对应环境证据。接入知识树后检查引用和构建，按仓库流程更新 `content-status`。本文保留计划与停止条件，当前验收状态统一见[扩展进度](./campus-expansion-progress.md#交付状态)，不以规划措辞代替实际记录。

## 10. 技术范围的官方核验入口

下列资料用于核验概念与平台边界，不证明校招频率。正式写作需进一步链接到相应版本的具体章节；官方文档当前默认版本不自动成为岗位版本基线。

- [Android：Guide to app architecture](https://developer.android.com/topic/architecture)
- [Android：The activity lifecycle](https://developer.android.com/guide/components/activities/activity-lifecycle)
- [Kotlin：Coroutines](https://kotlinlang.org/docs/coroutines-overview.html)
- [Swift：The Swift Programming Language](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/)
- [Apple：Managing your app’s life cycle](https://developer.apple.com/documentation/uikit/managing-your-app-s-life-cycle)
- [Dart：Concurrency in Dart](https://dart.dev/language/concurrency)
- [Flutter：Architectural overview](https://docs.flutter.dev/resources/architectural-overview)
- [React Native：About the New Architecture](https://reactnative.dev/architecture/landing-page)
