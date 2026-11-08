# 测试开发校招大纲

测试开发校招准备要同时覆盖测试判断和编码实现：能从需求推导风险与用例，能编写可重复运行的检查，还能用请求、数据和日志解释失败。只会列用例或操作工具，都不足以完成这条路线。

本文细化[知识树总表](./knowledge-tree.md)中的“软件工程 → 软件测试”，并引用 Python、Java、数据库、网络、运维和安全分支。本轮新文、存量范围复核与路线的源码、本地浏览器验收已接受；测试开发路线提供 Java、Python 两种选择，完整站点构建已通过，正式发布尚未执行。优先级结合本批证据、前置关系与岗位职责确定，不能解释为市场真实概率。本文保留文章归属和停止条件；样本、交付及范围复核的快照和详细研究材料存放安排见[四方向扩展进度与研究口径](./campus-expansion-progress.md)。

## 1. 范围与阅读要求

- 目标是软件测试开发、自动化测试及质量工程相关校招。功能测试基础是共同前置；编码、自动化框架、问题定位和工程实践必须进入主线。
- 语言以 **Java 或 Python 任选一门作为主线**。已有 Java 基础的读者直接复用 Java 正文；本轮 13 篇 Python 正文提供另一种选择，发布状态由主任务统一登记。不能把会写 Python 脚本当作无需掌握数据结构和程序设计。
- Web 服务和浏览器是共同实践对象。移动端、音视频、游戏、硬件、嵌入式和 AI 系统测试按目标 JD 分支选择；它们的领域原理分别引用相应知识分支，不在测试栏目复制。
- 工具用于验证能力。pytest、JUnit、HTTP 客户端、Playwright、Selenium 和 JMeter 的取舍按岗位要求与样本校准，读者不必先掌握所有工具。工具文章写机制和可验证示例，不整理成参数大全。
- 每个主题先展示停止条件，再列“核心阅读”和“深入阅读”。优先级、回答深度和是否需要动手是不同要求；“基础回答”不能替代编码或用例设计练习。
- 旧规划中的固定阅读时长、每篇题目上限和公开公司来源注释不用于本轮。文章结构、来源维护和状态更新以仓库 `AGENTS.md` 为准。

## 2. 主题顺序与停止条件

下列 `T01`—`T14` 只用于本分纲讨论，不作为发布后的知识点 ID。它们是路线复习分组；正文仍按“软件测试、语言、数据库”等技术归属维护。

| 分组及主要 Topic 归属 | 前置 | 建议优先级／回答深度 | 停止条件 |
| --- | --- | --- | --- |
| T01 测试分析与设计 → 软件测试 | 能读懂一个带输入、状态和结果的需求 | 必会／原理解释、场景分析 | 给出正常、异常、边界与状态转换用例；说明每条用例依据什么规则判断结果、覆盖什么风险，以及哪些组合仍未验证 |
| T02 测试分层与缺陷 → 软件测试 | T01；一个程序的调用关系 | 必会／原理解释、场景分析 | 区分单元、集成、契约、端到端、确认测试和回归测试；提交可复现缺陷，区分严重程度与修复优先级；能说明覆盖率和自动化通过率不能证明什么 |
| T03 语言与现场编码 → Java 或 Python、数据结构与算法 | 一门语言基本语法 | 必会／原理解释并实际编码 | 独立实现字符串、集合、文件与日志处理；解释复杂度、空输入、重复值与异常；为自己的实现构造反例和有依据的断言 |
| T04 网络与接口 → 网络、应用安全 | T03 的函数、异常和数据表示 | 必会／原理解释 | 从 DNS、连接、TLS 到 HTTP 说明一次请求；区分状态码、响应体、会话与权限；解释超时、重试和重复请求可能造成的副作用 |
| T05 数据验证 → SQL、事务与锁 | 集合与逻辑条件；T04 | 查询必会／实际查询；事务与索引常考／原理解释 | 写出连接、聚合、去重与数据核对 SQL；解释 NULL 和一对多连接对结果的影响；能用两条并发请求设计事务与一致性验证 |
| T06 单元测试与测试替身 → 软件测试、语言测试工具 | T02、T03 | 必会／原理解释、场景分析 | 选择真实依赖、Stub、Mock 或 Fake 并解释其盲区；实现参数化断言与独立数据准备；测试顺序变化仍正确，清理逻辑在失败后仍执行 |
| T07 接口自动化 → 软件测试 | T04—T06 | 必会／场景分析并实际实现 | 完成鉴权、参数化、关联数据、响应与持久化结果断言、数据清理和报告；能让错误响应与业务错误都导致失败，而不是只断言 HTTP 200 |
| T08 UI 自动化 → 软件测试、前端工程化 | T04、T06；DOM 与浏览器异步基础 | 常考／原理解释、场景分析；Web UI 岗必会 | 编写一条用户可见的完整流程；解释定位、条件等待和状态隔离；页面慢或数据变化时能定位失败来源，并说明哪些检查应移到接口或组件层 |
| T09 测试环境与持续集成 → 软件测试、运维与云原生 | T06、T07；Git 与进程基础 | 必会／原理解释；容器细节常考 | 在干净环境运行同一套测试，明确代码、依赖、配置与数据版本；说明并行冲突、失败产物、退出码、重试与发布门禁的关系 |
| T10 性能与稳定性 → 软件测试、可观测性、服务可靠性 | T04、T05、T09 | 常考／原理解释、场景分析；性能岗必会 | 根据业务流量设定负载和验收指标；同时观察吞吐、延迟分布、错误和资源；识别压测机瓶颈，提出可验证的系统瓶颈假设 |
| T11 故障定位 → Linux、可观测性 | T04、T05；进程与线程 | 必会／场景分析 | 对接口超时、数据错误或自动化偶发失败，按证据缩小范围；保留请求标识、日志、环境与复现步骤，不把重跑通过当成修复 |
| T12 安全与兼容性验证 → 安全、软件测试 | T01、T04、T07 | 权限与数据边界必会／场景分析；其他按岗选学 | 用不同身份和资源构造越权检查，解释输入边界；按真实支持范围选择浏览器、系统、设备和接口版本组合，而非只列测试工具 |
| T13 测试工具与平台 → 软件测试、系统设计 | T03、T07、T09、T11 | 按岗选学／场景分析；有平台项目者必会 | 设计用例执行、任务排队、执行器隔离、结果存储与失败回查；处理取消、超时、重复调度和凭据保护，不必实现大型通用平台 |
| T14 项目与综合练习 → 面试准备、综合练习 | T01—T11 的相应核心 | 必会／场景分析并实际演示 | 从需求风险到用例、实现、失败定位和修复回归展示一条证据链；说明本人贡献、未覆盖风险与方案代价，区分真实成果与演示项目 |

T01 与 T03 可以交替推进：先用能理解的简单需求设计用例，再通过编码实现和验证。T07 的第一条接口回归通过后，再扩展 UI、性能和平台；不要求读完所有深入内容才能开始实践。

## 3. 软件测试分支的文章安排

路径均相对仓库根目录。表内“正文完成待集成”等字样保留编制时的阶段标记，当前验收状态见[扩展进度](./campus-expansion-progress.md#交付状态)；“本批覆盖复核完成”只指本批学习范围，不替代独立技术审核，也不表示所有原问都已完整覆盖。文章标题均是概念名称；本轮范围已按样本中实际披露的独立考点校准，原先没有叶子命中的设计方法仍保留其前置职责。

### 3.1 测试分析、用例与缺陷

| Topic → 文章 | 路径与状态 | 核心内容、优先级及停止条件 |
| --- | --- | --- |
| 软件测试 → 测试分析 | `docs/tools-and-frameworks/testing/test-analysis.mdx`，正文完成待集成 | 必会／场景分析。需求依据、风险、可观察结果、可测试性与验收条件；区分静态评审与运行程序的动态测试，能把模糊的“功能正常”改成可以证伪的检查。测试依据与预期结果的来源在这里解释，不把实现输出当作期望值 |
| 软件测试 → 等价类划分 | `docs/tools-and-frameworks/testing/equivalence-partitioning.mdx`，正文完成待集成 | 必会／原理解释。有效与无效输入划分、类内代表值和划分假设；能指出只测一个正常值遗漏了哪类输入 |
| 软件测试 → 边界值分析 | `docs/tools-and-frameworks/testing/boundary-value-analysis.mdx`，正文完成待集成 | 必会／原理解释。边界内外、离散与连续范围、空值与长度；从明确约束推导用例，不背固定取点数量 |
| 软件测试 → 判定表 | `docs/tools-and-frameworks/testing/decision-tables.mdx`，正文完成待集成 | 必会／场景分析。多条件规则、动作、无效组合和规则冲突；能把优惠或权限规则转为可核对的表，并说明精简依据 |
| 软件测试 → 状态迁移测试 | `docs/tools-and-frameworks/testing/state-transition-testing.mdx`，正文完成待集成 | 必会／场景分析。状态、事件、合法与非法转换、转换序列；能覆盖订单取消、支付回调与重复事件，不把状态覆盖等同路径覆盖 |
| 软件测试 → 组合测试 | `docs/tools-and-frameworks/testing/combinatorial-testing.mdx`，正文完成待集成 | 常考／原理解释。参数交互、成对覆盖、约束与遗漏的高阶组合；给出减少组合的理由，并保留关键业务组合 |
| 软件测试 → 探索式测试 | `docs/tools-and-frameworks/testing/exploratory-testing.mdx`，正文完成待集成 | 常考／基础回答、场景分析。测试目标、观察、反馈和记录；能将探索发现变为可复现问题与后续回归，而非随机点击 |
| 软件测试 → 缺陷管理 | `docs/tools-and-frameworks/testing/defect-management.mdx`，正文完成待集成 | 必会／场景分析。环境、步骤、预期与实际、证据、影响、严重程度和优先级；复测与回归的关系；不规定所有团队必须使用同一套状态名称 |

白盒测试的语句、分支与条件覆盖继续复用《测试金字塔》的覆盖率章节，复核已确认其中解释了覆盖准则与测试有效性的差异。本批只有 1 篇明确询问覆盖率，当前继续保留同一主要正文，不另写重复定义。

### 3.2 分层、自动化与执行

| Topic → 文章 | 路径与状态 | 核心内容、优先级及停止条件 |
| --- | --- | --- |
| 软件测试 → [测试金字塔](../../docs/basic-knowledge/java/quality/test-pyramid-contract-regression.mdx) | 本批覆盖复核完成；保留当前路径 | 必会／原理解释。复用测试范围、契约、回归、覆盖率和不稳定测试；结合已有题目练习按风险选择验证层，不重写相同定义 |
| 软件测试 → [测试替身](../../docs/basic-knowledge/java/quality/test-doubles-mock-stub-boundaries.mdx) | 本批覆盖复核完成；保留当前路径 | 必会／原理解释。复用 Dummy、Stub、Fake、Mock、Spy 及边界；测试服务故障时区分替身模拟与真实集成证据 |
| 软件测试 → 接口测试 | `docs/tools-and-frameworks/testing/api-testing.mdx`，正文完成待集成 | 必会／场景分析。输入与协议、鉴权、业务状态、持久化、幂等、并发、异步最终结果；以最小自动化实现说明准备、请求、断言、清理，HTTP 原理引用网络正文 |
| 软件测试 → 测试数据管理 | `docs/tools-and-frameworks/testing/test-data-management.mdx`，正文完成待集成 | 必会／场景分析。数据构造、依赖关系、唯一命名、清理、脱敏与并行隔离；讨论跨进程、跨服务数据，语言 fixture 的执行语义留给 JUnit 或 pytest |
| 软件测试 → Web UI 自动化测试 | `docs/tools-and-frameworks/testing/ui-automation.mdx`，正文完成待集成 | 常考／场景分析。DOM 定位、可见行为、条件等待、浏览器上下文、会话隔离、网络依赖和失败追踪；Playwright 或 Selenium 用于验证机制，不能把固定等待或无限重试作为稳定性方案 |
| 软件测试 → 测试环境 | `docs/tools-and-frameworks/testing/test-environments.mdx`，正文完成待集成 | 常考／原理解释、场景分析。配置、依赖版本、环境差异、临时环境、服务虚拟化和外部依赖；能说明测试结果适用的环境边界。容器原理与交付流水线引用已有正文 |
| 软件测试 → 兼容性测试 | `docs/tools-and-frameworks/testing/compatibility-testing.mdx`，正文完成待集成 | 常考／场景分析。浏览器、设备、系统、数据与协议版本矩阵；确定支持范围、选择代表组合和升级回退检查。移动端独有生命周期和权限机制引用移动端文章 |
| 软件测试 → 测试驱动开发 | `docs/tools-and-frameworks/testing/test-driven-development.mdx`，正文完成待集成 | 按岗选学／原理解释。失败测试、最小实现与重构；能解释先写测试提供什么反馈、不能替代哪些集成证据 |

前端组件测试归前端工程分支，拟写路径为 `docs/tools-and-frameworks/frontend-testing/component-testing.mdx`，标题《前端组件测试》。测试开发路线在需要检查组件事件、DOM 与异步状态时引用；Web 端到端自动化统一使用本表《Web UI 自动化测试》，不再在前端分支维护另一套正文。

### 3.3 性能、稳定性与平台

| Topic → 文章 | 路径与状态 | 核心内容、优先级及停止条件 |
| --- | --- | --- |
| 软件测试 → 性能测试 | `docs/tools-and-frameworks/testing/performance-testing.mdx`，正文完成待集成 | 常考／原理解释、场景分析。业务负载、并发、到达速率、吞吐、延迟分布、错误率、预热与稳态；负载、压力、长稳测试的目标；能解释指标为何必须一起看 |
| 软件测试 → JMeter | `docs/tools-and-frameworks/testing/jmeter.mdx`，正文完成待集成 | 按岗选学／实际实现。测试计划、线程组、采样、关联、断言、计时与结果；用非 GUI 执行和服务端观测验证方案，说明客户端资源可能使结果失真。通用指标与负载模型不重复写 |
| 软件测试 → 故障注入测试 | `docs/tools-and-frameworks/testing/fault-injection-testing.mdx`，正文完成待集成 | 按岗选学／场景分析。可控故障、恢复、超时、重复与数据一致性验证；区分模拟返回错误、进程故障和网络故障，明确停止条件与恢复检查。服务容错机制引用系统设计 |
| 软件测试 → 测试执行平台 | `docs/tools-and-frameworks/testing/test-execution-platform.mdx`，正文完成待集成 | 按岗选学／场景分析。提交、排队、调度、执行器、产物、状态与权限；以小型系统说明幂等、取消、超时回收和隔离。通用任务调度与分布式原理继续引用共享内容 |

### 3.4 样本补充的工程主题

| Topic → 文章 | 路径与状态 | 核心内容、优先级及停止条件 |
| --- | --- | --- |
| 软件测试 → 测试报告 | `docs/tools-and-frameworks/testing/test-reporting.mdx`，正文完成待集成 | 常考／场景分析。记录执行范围、版本、结果、证据与未验证风险；能从失败项回到请求、数据和日志，区分报告生成与质量结论 |
| 软件测试 → 模糊测试 | `docs/tools-and-frameworks/testing/fuzz-testing.mdx`，正文完成待集成 | 按岗选学／原理解释。输入生成、变异、反馈、崩溃判定与最小化；说明状态重置和回归语料的作用，不把随机输入等同有效覆盖 |
| 软件测试 → AI 辅助测试 | `docs/tools-and-frameworks/testing/ai-assisted-testing.mdx`，正文完成待集成 | 常考／场景分析。用需求与代码约束生成内容，人工审查预期结果并用失败样例验证；识别幻觉、重复与漏测，不让模型生成与自评形成唯一证据 |
| AI 评测 → 模型评测 | `docs/ai/evaluation/model-evaluation.mdx`，正文完成待集成共享节点 | 按岗选学／场景分析，AI 测开必会。测试集、标签、判定依据、指标、分层与随机性；区分模型效果与功能正确，Agent/RAG 专属评测引用已有正文 |

AI 辅助测试在本批出现于 11/102 篇，AI 系统测试出现于 10/102 篇；两个考点分别对应“使用 AI 完成测试”与“测试 AI 产品”。模型评测属于 AI 共享分支，测试栏目不再复制一套原理。

“压测后怎样定位”以《性能测试》中的结果分析串联已有 Linux、SQL 和可观测性文章，不再开一篇重复列命令的“性能优化大全”。平台设计需要综合多个知识点的题目标记“题型：综合题”；原子题仍归主要概念文章。

## 4. 语言分支的选择与缺口

### 4.1 Java 主线

优先复用已有 [Java API 与测试](../../docs/basic-knowledge/java/quality/index.mdx)中的 [JUnit](../../docs/basic-knowledge/java/quality/junit-assertions-parameterized-tests.mdx)，学习断言、参数化、生命周期、隔离与超时边界。Java 语言与集合按岗位要求引用已有节点；JUnit 示例中的通用测试原则仍回到软件测试主题。

Java 17、21 与 Spring Boot 2.7、3.x 遵循仓库版本基线。深入 JVM、Spring 内部机制仅在 JD、项目或面经追问明确需要时提高优先级，不能把完整 Java 后端路线作为测开必读前置。

### 4.2 Python 主线

下面的正文属于总表第 12 节 Python，后端、AI、数据和测试方向共同引用。本轮已完成下表 10 篇和第 4.3 节 3 篇的正文、本地验证与主任务集成。

| Topic → 拟写文章 | 建议路径 | 测试开发的核心范围及停止条件 |
| --- | --- | --- |
| 语言基础 → Python 对象模型 | `docs/basic-knowledge/python/language/object-model.mdx` | 必会／原理解释。对象、名称、可变性、相等与同一性；能解释修改共享对象为何影响另一用例 |
| 语言基础 → Python 集合 | `docs/basic-knowledge/python/collections/list-dict-set.mdx` | 必会／原理解释并编码。list、dict、set 的使用与成本；实现去重、分组和结果核对；底层通用结构引用数组与哈希表 |
| 语言基础 → Python 函数参数与作用域 | `docs/basic-knowledge/python/language/functions-scope.mdx` | 必会／原理解释。调用、参数、默认值和作用域；能解释可变默认参数导致的状态残留 |
| 语言基础 → Python 异常处理 | `docs/basic-knowledge/python/language/exceptions.mdx` | 必会／原理解释。异常传播、捕获范围、清理与失败信号；不会把测试失败吞掉后继续报告成功 |
| 语言基础 → Python 上下文管理器 | `docs/basic-knowledge/python/language/context-managers.mdx` | 常考／原理解释。资源获取和释放；能说明异常路径是否仍释放文件或连接 |
| 语言基础 → Python 迭代器与生成器 | `docs/basic-knowledge/python/language/iterators-generators.mdx` | 常考／原理解释。迭代协议、惰性求值与一次性消费；解释流式读取日志和 fixture 清理中的不同使用场景 |
| 语言基础 → Python 闭包与装饰器 | `docs/basic-knowledge/python/language/closures-decorators.mdx` | 常考／原理解释。函数包装、参数转发与闭包状态；能阅读 fixture 或日志包装代码，不要求构造复杂装饰器框架 |
| 面向对象与元编程 → Python 类与实例 | `docs/basic-knowledge/python/language/classes-instances.mdx` | 常考／原理解释。实例与类属性、方法绑定；能识别类变量共享导致的用例污染 |
| 工程与数据处理 → Python 包管理与虚拟环境 | `docs/basic-knowledge/python/engineering/packages-environments.mdx` | 必会／实际操作。模块导入、依赖与隔离、可重建环境；不同时要求掌握 pip、Poetry、uv 的全部命令 |
| 工程与数据处理 → pytest | `docs/basic-knowledge/python/quality/pytest.mdx` | 必会／原理解释并实现。测试发现、assert、fixture 作用域、参数化、清理、标记与报告；构造失败样例证明断言和退出码有效 |

这里采用 Python 3 的稳定基础机制作为选题范围；具体运行版本与工具版本在样本归纳和示例验证时固定。GIL、异步并发、性能分析、数据库与 HTTP 库按项目和样本扩展，不用最新特性填充校招主线。新正文动笔前须与其他方向的 Python 计划对齐文件名，避免同一概念出现两个待写任务。

### 4.3 Python 样本校准的补充

| Topic → 拟写文章 | 建议路径 | 优先级、前置与停止条件 |
| --- | --- | --- |
| 工程与数据处理 → Python 文件与文本处理 | `docs/basic-knowledge/python/engineering/files-text-processing.mdx` | 必会／编码与原理解释。前置：集合、异常、上下文管理器；实现逐行日志处理与结构化数据核对，解释编码、异常和资源释放 |
| 并发与运行时 → Python 并发 | `docs/basic-knowledge/python/concurrency/threads-processes-gil.mdx` | 常考／原理解释。前置：对象模型、进程线程与同步；选择线程或进程，解释 I/O 等待、共享状态与 GIL 边界，实现与配置条件就地说明 |
| 并发与运行时 → Python 内存管理 | `docs/basic-knowledge/python/runtime/memory-management.mdx` | 常考／原理解释。前置：对象模型、类与实例；解释 CPython 引用计数、循环引用与引用保留，区分对象释放和进程内存下降 |

这三篇分别补齐脚本实践、执行模型与对象生命周期，不塞进《Python 对象模型》一篇里。Java 使用者只需完成自己主语言的对应能力，不额外要求完整 Python 路线。

## 5. 共享正文复用表

这些链接均指向已有文件。后续只补充支持测试场景所必需的缺口；栏目入口、已有正文和已校验内容是不同状态。

| 分组 | 准确阅读入口 | 本路线读取范围 |
| --- | --- | --- |
| 数据结构与编码 | [数据结构](../../docs/basic-knowledge/data-structures/index.mdx)、[算法](../../docs/basic-knowledge/algorithms/index.mdx)、[编码与 SQL 练习](../../docs/interview/coding-practice.mdx) | 集合、查找、排序、字符串和代表编码模式；独立实现并构造反例，不以口述卡片替代编码 |
| SQL | [SQL 查询](../../docs/basic-knowledge/database/sql/query.mdx)、[SQL 连接](../../docs/basic-knowledge/database/sql/joins.mdx)、[SQL 聚合](../../docs/basic-knowledge/database/sql/aggregation.mdx) | 数据准备和结果核对，NULL、重复、连接放大与分组条件；窗口排名与连续日期分组已在《SQL 查询》补齐 |
| 数据库运行机制 | [数据库事务](../../docs/basic-knowledge/database/transaction/index.mdx)、[执行计划](../../docs/basic-knowledge/database/indices/execution-plan.mdx) | 事务边界、并发异常与 SQL 诊断；数据库内核细节按岗选学 |
| InnoDB 存储 | [InnoDB](../../docs/basic-knowledge/database/storage/innodb.mdx) | 数据库相关测开按岗选学；页与表空间、Buffer Pool 读写、刷写与淘汰、MyISAM 事务和锁边界。Go G058 共享新文，不计为测试样本的新增命中 |
| Redis 高可用 | [Redis 高可用](../../docs/basic-knowledge/nosql/redis/high-availability.mdx) | 按岗选学／原理解释；复制、哨兵、槽路由和迁移核对，异步确认与数据丢失边界。固定 Redis 7.4.9 隔离进程验证，不扩展测试命中 |
| 协调存储 | [etcd](../../docs/basic-knowledge/middleware/etcd.mdx) | 按项目选学；修订/条件事务/Watch/Lease与读取一致性，Go4/101不移入测试分母 |
| 远程调用契约 | [gRPC](../../docs/basic-knowledge/network/grpc.mdx) | 按接口栈选学；协议分层、四种调用、status/metadata和取消退出；Go2/101不移入测试命中 |
| 文件上传流程 | [文件上传](../../docs/basic-knowledge/network/file-upload.mdx) | 按项目选学；能按会话解释断点/重复块/校验/完成与跨系统恢复，并设计故障验证；Go2/101不移入测试命中 |
| 对象内容存储 | [对象存储](../../docs/basic-knowledge/storage/object-storage.mdx) | 按项目选学；对象键/元数据/版本/权限与多段API，区分服务契约和业务一致性；Go3/101不移入测试命中 |
| 设备请求调度 | [磁盘调度](../../docs/basic-knowledge/operating-system/disk-scheduling.mdx) | 按岗位OS范围选学；推演选择顺序，比较移动/等待/公平，区分机械盘与SSD；Go1/101不移入测试命中 |
| 邮件收发协议 | [邮件协议](../../docs/basic-knowledge/network/email-protocols.mdx) | 按岗选学；测试SMTP原问1/102，区分事务/收取/内容格式，解释失败与未知结果，不泛化为全部邮件叶子命中 |
| 主机自动配置 | [DHCP](../../docs/basic-knowledge/network/dhcp.mdx) | 按岗位网络要求选学；首次分配、租约续期、到期与中继，区分网关/DNS/服务器；不把Go样本归入测试命中 |
| 链路地址解析 | [ARP](../../docs/basic-knowledge/network/arp.mdx) | 按岗位网络要求选学；解释下一跳IP/MAC、请求应答、缓存与网关，不把Go样本归入测试命中 |
| 线程池机制 | [线程池](../../docs/basic-knowledge/operating-system/thread-pools.mdx) | 动态实现按岗选学；队列/工作线程/拒绝/结果/关闭，合作缩容和并发竞争；Java API仍复用《Java 线程池》，不移植Go原问为测试命中 |
| Python 异步执行 | [asyncio](../../docs/basic-knowledge/python/concurrency/asyncio.mdx) | 使用异步接口或平台框架时按岗选学；协程/任务/等待、取消与清理、阻塞迁移和资源限制。Go G072 单一整体机制来源，不扩展测试命中 |
| 数据类型 | [MySQL 数据类型](../../docs/basic-knowledge/database/modeling/data-types.mdx) | 随 SQL 与边界数据设计复习；字符/字节、整数/精度、时间/NULL 及索引影响。Go G055 两篇来源，不推导测试样本频率 |
| 分片映射 | [一致性哈希](../../docs/basic-knowledge/data-structures/consistent-hashing.mdx) | 缓存/存储相关测开按岗选学；环定位、节点增删、虚拟节点、权重和热点，区分实际迁移与副本/共识。Go G054 共享新文，不增加测试样本命中 |
| 近似成员查询 | [布隆过滤器](../../docs/basic-knowledge/data-structures/bloom-filter.mdx) | 缓存/存储相关测开按岗选学；位数组、多哈希、单侧误判、容量及删除边界，解释不能替代唯一约束。Go G052 共享新文，不从缓存穿透泛问推导测试命中 |
| LSM 存储 | [LSM 树](../../docs/basic-knowledge/database/storage/lsm-tree.mdx) | 存储引擎相关测开按岗选学；WAL、MemTable、SSTable、合并、快照与删除、读写和空间放大。Go G059 共享新文，不推作通用测开必会 |
| MySQL 日志、复制与分区 | [MySQL 事务日志](../../docs/basic-knowledge/database/storage/transaction-logs.mdx)、[MySQL 复制](../../docs/basic-knowledge/database/replication.mdx)、[MySQL 分区](../../docs/basic-knowledge/database/partitioning.mdx) | 数据库相关测开按岗选学；WAL、恢复与提交协调；日志传输与应用、延迟和确认边界；日期分区 SQL、裁剪及唯一键限制。作为原 35 篇外共享新文单列 |
| HTTP 与传输 | [HTTP](../../docs/basic-knowledge/network/http-versions-connection-reuse-timeouts.mdx)、[TCP 连接](../../docs/basic-knowledge/network/tcp_handshake.mdx)、[DNS](../../docs/basic-knowledge/network/dns.mdx)、[TLS](../../docs/basic-knowledge/network/tls.mdx) | 请求组成、连接、响应与失败边界；方法、状态码和报文已在 HTTP 唯一正文补齐 |
| 认证与权限 | [认证与授权](../../docs/system-design/security/authentication-authorization-trust-boundaries.mdx)、[Session、JWT、OAuth 2.0 与 OIDC](../../docs/system-design/security/session-jwt-oauth-oidc.mdx)、[Web 应用安全](../../docs/system-design/security/injection-authorization-ssrf-deserialization.mdx) | 身份、资源权限、会话过期、输入处理与越权；安全攻防专项不自动进入全部测开必会 |
| Linux | [Linux 常用命令与文件权限](../../docs/devops/linux/commands-permissions.mdx)、[进程管理与信号](../../docs/devops/linux/processes-signals.mdx)、[Linux 网络排查](../../docs/devops/linux/network-troubleshooting.mdx)、[Linux 性能排查](../../docs/devops/linux/performance-troubleshooting.mdx) | 查找日志、文件权限、进程端口、连接与资源证据；Shell 脚本缺口继续归 Linux 分支 |
| 构建与环境 | [Maven](../../docs/system-design/production/maven-lifecycle-dependency-convergence.mdx)、[Docker 镜像与 Dockerfile](../../docs/devops/containers/docker-images.mdx)、[可重复交付](../../docs/system-design/production/docker-ci-cd-reproducible-delivery.mdx) | Java 构建按所选语言学习；镜像、依赖、环境与制品版本；Git 的首推和 upstream 已在 Git 分支补齐 |
| 诊断与证据 | [可观测性](../../docs/system-design/production/logs-metrics-traces-correlation.mdx)、[生产故障诊断](../../docs/system-design/production/jvm-thread-sql-network-joint-diagnosis.mdx) | 请求标识、日志、指标、追踪和瓶颈假设；JVM 专属诊断只对相应被测系统深入 |
| 异常与一致性 | [超时](../../docs/system-design/reliability/timeout-budget-cancellation.mdx)、[重试](../../docs/system-design/reliability/retry-backoff-jitter-storms.mdx)、[幂等键](../../docs/system-design/reliability/idempotency-keys-safe-retries.mdx)、[服务容错](../../docs/system-design/reliability/circuit-breaker-degradation-bulkhead.mdx) | 设计超时、重试、重复请求与故障恢复测试；解释观察到的结果能证明哪一种保证 |
| 项目与表达 | [项目准备](../../docs/interview/project-preparation.mdx)、[简历准备](../../docs/interview/resume.mdx)、[研发类面试流程](../../docs/interview/interview-process.mdx) | 真实贡献、技术选择、失败案例和证据；不另写通用简历或行为面正文 |

## 6. 综合练习与文章边界

综合练习用于检查知识能否连接起来，不另建与概念正文并行的“测开八股”内容树。

| 练习任务 | 必须交付的可检查结果 | 主要关联 |
| --- | --- | --- |
| 分析登录或订单需求 | 风险与用例、状态或判定表、预期结果依据、未覆盖范围 | T01、T02、T04、T12 |
| 构建接口回归 | 可运行脚本、正常与失败样例、独立测试数据、明确断言、失败退出码与报告 | T03—T07、T09 |
| 复现一次数据错误 | 最小输入、SQL 核对、请求和日志证据、根因假设、修复回归 | T05、T07、T11 |
| 编写 Web UI 流程 | 稳定定位、条件等待、隔离环境、失败截图或追踪，以及与接口层的分工说明 | T06、T08、T09 |
| 进行一次受控性能实验 | 业务目标、负载模型、基线、延迟分布与错误、服务端观测、瓶颈验证和限制 | T10、T11 |
| 设计小型测试执行服务 | 任务与执行状态、取消和回收、隔离与权限、重复调度策略、可回查产物 | T09、T11、T13；按岗选学 |

练习可以沿用一个小型业务以减少搭建成本；概念文章中的最小示例按解释需要独立选择。既有项目不能伪造成实际实习成果。没有真实失败、前后对照和验证记录时，不填写效率提升或缺陷检出数字。

## 7. 面经校准结果

采样、证据和统计遵循[统一研究口径](./campus-expansion-progress.md#研究口径)。本批审阅 147 个来源，纳入 102 篇，34 篇补充、11 篇排除。主样本包含校招 37 篇、实习 64 篇、同时覆盖校招与实习 1 篇；5 篇未披露具体问题的个人复盘仍在分母。共记录 838 条实际提问短释义，249 个考点类别含零命中前置项，逐题保留正文或图片定位。

| 代表考点 | 全部主样本 | 校招 | 实习 | 校招及实习 |
| --- | --- | --- | --- | --- |
| 用例设计 | 67/102 | 26/37 | 40/64 | 1/1 |
| SQL 编写 | 30/102 | 6/37 | 23/64 | 1/1 |
| Linux 命令与日志处理 | 21/102 | 3/37 | 17/64 | 1/1 |
| 性能测试 | 20/102 | 6/37 | 14/64 | 0/1 |
| 测试自动化 | 19/102 | 11/37 | 8/64 | 0/1 |
| 接口测试 | 17/102 | 6/37 | 11/64 | 0/1 |
| 缺陷管理 | 16/102 | 6/37 | 9/64 | 1/1 |
| Web UI 自动化测试 | 12/102 | 4/37 | 8/64 | 0/1 |
| AI 辅助测试 | 11/102 | 3/37 | 8/64 | 0/1 |
| AI 系统测试 | 10/102 | 4/37 | 6/64 | 0/1 |

以上分子和分母的逐项回溯依赖详细研究记录，存放安排见[研究口径与材料存放说明](./campus-expansion-progress.md#研究材料与迁移状态)。样本以公开牛客复盘为主，检索和自述披露存在选择偏差；78 篇页面日期为 2024—2026 年，其余 24 篇标明较早年代。专项子样本很小，不能把某个嵌入式、机器人或游戏项目追问推广为全体测开必会。

全部纳入来源已读正文、核对第 2 版图片清单并实际查看含图内容。28 篇含图片，其中 imgMoment 附件共 17 张；携程图中问题按图与编号定位。规范化 URL、公开帖子 ID、正文指纹和作者×公司均已复查，当前没有重复主样本；其他方向继续取样后仍需由主任务再做统一跨方向检查。

本轮确定保留原 28 篇并新增 7 篇，共 35 篇正文；逐篇范围记录的存放安排见[研究口径与材料存放说明](./campus-expansion-progress.md#研究材料与迁移状态)。零叶子命中的判定表、状态迁移等方法不会因样本未点名而删除，也不借宽泛用例设计题给它们虚增次数。共享已有文章、前端/Go 前置与专项旁支缺口分别列明，按唯一正文维护。

正式文章的技术答案另用规范、官方文档和可运行示例核验。来源题的稳定卡片 ID、公司和原始链接先记录在本方向 `output/campus-expansion/testing/card-provenance.json`，由主任务统一合并到私有仓库；公开文章不写公司来源字段。未核验的本站自测保留统一注释。

## 8. 编写与验收

先在总表确认文章归属和重用关系，再建立正文与稳定的 `knowledge.id`。章节显式锚点按中文标题，卡片 ID 和 `core` 用英文；已有 ID 不改。文章按 `AGENTS.md` 与 `lin-writing-style` 编写，先解释概念和机制，再用示例与题目验证理解。

原 35 篇已完成正文、示例验证、strict 检查与主任务集成；18 篇存量修改也已完成主任务复核。另行交付的共享新文以各篇验收记录为准；110 个共享存量文件的本批考点覆盖已逐项复核，详细台账的存放安排见[研究口径与材料存放说明](./campus-expansion-progress.md#研究材料与迁移状态)。其中 MySQL 正文用 8.0 官方手册核对，初验运行环境为 8.4.11，根任务已对《MySQL 数据类型》《InnoDB》《MySQL 事务日志》追加 8.0.46 验证；《LSM 树》使用 RocksDB 9.10.0 官方源码与同版本实际引擎验证；《布隆过滤器》按原始论文与 Guava 33.4.8-jre 核对理论，CPython 3.14.7 只验证教学示例与反例；《一致性哈希》按原论文与 Envoy 1.31.0 资料核对，单进程验证节点变化和映射边界，不代表生产迁移实验。《asyncio》使用 CPython 3.12.13 固定资料和同版本运行时验证任务生命周期与清理；《Redis 高可用》用固定 Redis 7.4.9 验证复制、Sentinel 和 Cluster 的进程故障及路由；《线程池》用 CPython 3.12.13 的实际线程验证动态伸缩及关闭竞争；《ARP》用隔离Linux命名空间及真实以太网报文验证同链路/网关/缓存/失败过程；《DHCP》用dnsmasq2.90与ISC DHCP4.4.3-P1验证真实租约生命周期及跨网段中继；《邮件协议》用隔离SMTP/IMAP/POP3服务验证8组交互与Python MIME示例；《磁盘调度》用CPython3.12.13验证六算法表、2904组小范围边界及动态到达反例，不代表硬件性能；《对象存储》使用固定MinIO单实例与boto3/botocore1.40.0验证8组API行为，不替代AWS/R2云端契约；《HTML 语义与可访问性》和《前端组件测试》依赖均已补齐并接入。以上运行记录分别保留实际版本和实验范围，110 文件的范围复核不代表每篇全文和全部示例都已重新运行。

测试开发路线已注册到岗位入口与学习内容中。Java、Python 两种选择分别通过四轮主题筛选、深链接、语言切换、文章跳转、浏览器返回及 375 像素窄屏检查。路线中的引用不自动扩大原有文章的技术验收范围。完整站点构建已通过，发现性与类型检查的最终复验另行记录；正式发布尚未执行。

每篇文章完成后，通读核查条件、前置和答案；代码实际运行或编译，失败示例明确标注。面试题需有考察重点、相关内容和默认收起的参考回答；结构检查使用 `node scripts/check-article-format.mjs --strict --list -- <文章路径>`。随后由主任务统一登记知识树、路线和 `content-status`，检查内链、来源映射及站点构建。大纲存在和结构检查通过均不能替代正文的技术验收。

选题阶段参考以下一手文档，仅用于核对概念范围和工具职责，不作为面经频率证据；编写具体 API 示例时还需核对选定版本：

- [ISTQB CTFL：测试基础、设计、风险与缺陷管理范围](https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/)
- [pytest：fixture 的使用与清理](https://docs.pytest.org/en/stable/how-to/fixtures.html)
- [Playwright：可见行为、测试隔离与定位实践](https://playwright.dev/docs/best-practices)
- [Apache JMeter：测试计划的组成](https://jmeter.apache.org/usermanual/test_plan.html)
