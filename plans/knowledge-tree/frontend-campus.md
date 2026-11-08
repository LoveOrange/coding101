# Web 前端校招大纲

本文细化[知识树（第二版）](./knowledge-tree.md)第 13—16 节的校招范围、文章归属、前置与停止条件。领域和 Topic 沿用总表，不另建一套前端知识树。目标读者已经写过页面和简单交互，需要能够解释代码行为、实现组件、定位页面问题，并讲清自己的项目。

**状态：主样本核验、本轮新文验收、路线的源码与本地浏览器验收，以及 60 项存量范围复核均已接受。** 样本含 90 篇实习、11 篇校招；所有主样本正文及独立图片附件已核验。下文“必会／常考／按岗选学”结合前置关系、实现能力和本批材料安排复习，不代表市场真实考察概率。本文保留文章归属、前置、深度与停止条件；交付状态和详细研究材料的存放安排见[四方向扩展进度与研究口径](./campus-expansion-progress.md)。范围复核针对已确认的核心知识，不表示已覆盖全部面经变体；正式发布尚未执行。

## 1. 范围与阅读规则

- **共同核心**：HTML/CSS、JavaScript、浏览器运行与交互、HTTP、基础安全、现场编码与项目表达。
- **补充顺序**：先掌握定义、关键机制、常见边界和可迁移的实现方法。HTTP/1.0 连接对照、HTTP/2 Server Push 等细节留待后续；具体题目变体不自动成为所有读者的必修内容。
- **框架主线**：React 与 Vue 分别提供完整候选范围，读者按目标 JD 和已有项目选择一条。表中“必会（主线）”只对选中该框架的路线成立；另一套框架按岗选学。
- **工程能力**：能复现依赖安装和构建，用测试检查行为，用浏览器证据定位性能与功能问题。工具的命令全集、每个版本的新功能不进入主路径。
- **Node.js 范围**：前端构建所需的包、模块与运行环境进入工程化；Node.js 后端、BFF、SSR 服务的运行时与运维深度仅在 JD 或项目涉及后加入。它们仍归总表第 16 节。
- **回答深度**：基础回答要能说出用途和区别；原理解释要能推导执行链路；场景分析要能结合输入、状态、约束与证据作选择。任何一层都不能代替实际编码和调试。

语言和框架示例优先讲稳定机制。React 以函数组件、Hooks、状态与提交过程为主；Vue 以 Vue 3 为主，Vue 2 仅用于有明确条件的实现差异。涉及调度、编译器、打包器内部实现时，在文章旁标明被核验的版本，不把某一版本的工具组合写成永久规则。TypeScript 区分编译时检查与 JavaScript 运行时；浏览器事件循环与 Node.js 事件循环分别解释。

## 2. Topic、前置与停止条件

下表的节号对应总表。核心阅读由第 3 节每篇文章的优先级决定；常考与按岗内容保留入口，不默认混入第一轮。

| 总表 Topic | 前置 | 第一轮停止条件 | 后续深度与触发条件 |
| --- | --- | --- | --- |
| 13.1 语言基础 | 变量、分支、循环、函数的基本语法 | 能推导值比较、作用域、闭包、`this`、原型查找及对象共享的结果；能写最小反例说明规则边界 | 原理解释为主；集合、代理、迭代协议按框架和编码题需要深入 |
| 13.2 异步与运行时 | 13.1、14.2 的主线程与事件基础 | 能追踪 Promise 的值与错误传播，解释 `await` 前后的执行，区分 JavaScript 任务与宿主调度；能修复重复请求或资源未释放 | 内存泄漏进入场景分析；V8 字节码、JIT、回收器实现按岗选学 |
| 13.3 模块化 | 13.1、函数与作用域 | 能说明模块边界、导入导出和缓存；在明确运行环境下解释 ESM 与 CommonJS 的差异 | 循环依赖、互操作和 Tree Shaking 进入原理解释；不把构建后的表现等同于原生模块语义 |
| 13.4 TypeScript | 13.1 的值、对象、函数 | 能给函数和对象建模，使用联合类型与收窄处理缺失值，解释类型检查无法保证外部输入正确 | 泛型与常用工具类型进入原理解释；复杂条件类型、声明文件由库开发或 JD 触发 |
| 14.1 HTML 与 CSS | 浏览器能打开一个页面 | 能用语义元素和表单完成可键盘操作的页面；能解释盒尺寸、层叠、布局和响应式变化 | 原理解释；层叠上下文、复杂适配进入场景分析，不以背居中方案数量验收 |
| 14.2 浏览器原理 | 13.1、14.1、共享 HTTP/DNS/TLS | 能串起资源加载、解析、布局、绘制与交互；解释事件传播、同源边界及存储生命周期；能区分网络错误与脚本不可读响应 | 原理解释到场景分析；进程隔离、Worker、Service Worker 由性能、离线等场景触发 |
| 14.3 前端性能 | 14.2、共享 HTTP 缓存、15.4 构建产物 | 能为加载慢、交互卡顿、布局偏移分别选择观测证据，并说明一次优化的前后对照与副作用 | 场景分析；虚拟列表、错误采样、线上性能分布按项目深入 |
| 15.1 React | 13.1—13.4、14.2 的交互基础 | 选为主线时，能解释 props、state、渲染快照、列表身份与 Effect 清理；实现表单和异步列表，处理乱序响应 | 原理解释；Fiber、并发渲染、状态库、Server Components 按 JD 或项目深入 |
| 15.2 Vue | 13.1—13.4、14.2 的交互基础 | 选为主线时，能解释响应式追踪、组件通信与更新时机；正确选择 computed、watch 和组合式函数，实现同等交互 | 原理解释；模板优化、Vue 2 差异、全局状态与复杂路由按项目深入 |
| 15.3 路由与渲染模式 | 一条框架主线、共享 HTTP、浏览器导航 | 能解释 URL、客户端路由和服务端回退的分工；说明 CSR、SSR、SSG 和水合各自处理什么 | 基础回答到原理解释；SSR 故障、缓存、框架专属数据加载和微前端按岗选学 |
| 15.4 前端工程化 | 13.3、一条框架主线、Git | 能从源码讲到构建产物与发布；复现安装、区分类型检查和代码转换、完成组件测试与 E2E 验证 | 原理解释与场景分析；插件开发、包发布、灰度和复杂流水线按项目深入 |
| 16.1 Node.js 运行时 | 13.2—13.3、共享进程/线程与 I/O | 不作为所有前端读者的第一轮要求；目标涉及 Node.js 时，能解释模块加载、I/O 调度与流的背压 | 按岗选学／原理解释；任务阻塞、进程模型和内存诊断进入场景分析 |
| 16.2 Node.js 服务开发 | 16.1、共享 HTTP、鉴权与测试 | 目标涉及 BFF/SSR 服务时，能解释中间件执行顺序、下游超时和错误返回，完成最小聚合接口 | 按岗选学／场景分析；NestJS、ORM 和部署工具只随具体项目加入 |

建议的第一轮顺序是：HTML/CSS 与语言基础并行起步 → 异步、浏览器与网络 → TypeScript 和模块 → 一条框架主线 → 路由、工程化、测试与性能。算法和项目口述贯穿每一轮，不等到读完全部文章才练习。

## 3. 拟写文章与主要归属

以下路径保留编制时的文章规划，均相对仓库根目录；不以表中的规划措辞判断当前完成状态，当前状态见[扩展进度](./campus-expansion-progress.md#交付状态)。每篇文章只维护一份正文；标题中的“JavaScript”“React”等用于明确技术对象，不使用复习场景作为别名。相同概念的多个问法放在对应文章的题目中，不按问法再拆文章。

### 3.1 JavaScript 与 TypeScript

| Topic | 标准文章标题与建议路径 | 关键边界与自检对象 | 复习优先级／深度 |
| --- | --- | --- | --- |
| 13.1 | JavaScript 数据类型与类型转换 — `docs/basic-knowledge/javascript/types-conversion.mdx` | 原始值与对象、赋值和传参、`typeof`、显式转换、相等判断；能解释 `null`、`NaN` 与对象比较 | 必会／原理解释 |
| 13.1 | 作用域与闭包 — `docs/basic-knowledge/javascript/scope-closures.mdx` | 词法作用域、声明与初始化、暂时性死区、闭包捕获绑定；能解释循环回调与资源持有 | 必会／原理解释 |
| 13.1 | this 绑定 — `docs/basic-knowledge/javascript/this-binding.mdx` | 调用形式、箭头函数、`call`/`apply`/`bind`、构造调用；运行环境条件就近说明 | 必会／原理解释 |
| 13.1 | 原型与原型链 — `docs/basic-knowledge/javascript/prototypes.mdx` | 属性查找、构造函数、`class`、`new`、`instanceof`；区分原型对象与构造函数属性 | 必会／原理解释 |
| 13.1 | JavaScript 对象拷贝 — `docs/basic-knowledge/javascript/copying.mdx` | 浅拷贝、共享引用、循环引用、`structuredClone` 的适用类型；不能把 JSON 转换当通用深拷贝 | 必会／原理解释 |
| 13.1 | JavaScript 集合 — `docs/basic-knowledge/javascript/collections.mdx` | Array、Object、Map、Set、WeakMap 与 WeakSet 的使用差异；复用哈希表原理 | 常考／原理解释 |
| 13.1 | Proxy 与 Reflect — `docs/basic-knowledge/javascript/proxy-reflect.mdx` | 属性操作的拦截与转发、接收者、代理边界；作为 Vue 响应式的前置 | 常考；Vue 主线必会／原理解释 |
| 13.1 | 迭代器与生成器 — `docs/basic-knowledge/javascript/iterators-generators.mdx` | 迭代协议、`for...of`、`yield` 与惰性执行；与普通数组遍历区分 | 按岗选学／原理解释 |
| 13.1 | 高阶函数与柯里化 — `docs/basic-knowledge/javascript/higher-order-functions.mdx` | 函数作为参数或返回值、参数分步传递、组合与闭包；编码题说明约定的参数边界 | 常考／原理解释 |
| 13.2 | 浏览器事件循环 — `docs/basic-knowledge/javascript/browser-event-loop.mdx` | 执行栈、任务、微任务检查点、渲染机会与定时器；区分规范保证和简化示意 | 必会／原理解释 |
| 13.2 | Promise — `docs/basic-knowledge/javascript/promise.mdx` | 状态、兑现与拒绝、链式返回、错误传播、组合方法；组合实现题核验顺序与失败条件 | 必会／原理解释 |
| 13.2 | async 与 await — `docs/basic-knowledge/javascript/async-await.mdx` | 异步函数返回、暂停与恢复、异常处理、串行与并发、请求取消；不重讲 Promise 状态机 | 必会／原理解释 |
| 13.2 | JavaScript 内存管理 — `docs/basic-knowledge/javascript/memory-management.mdx` | 可达性、闭包、事件监听与定时器的资源生命周期；用堆快照验证泄漏，回收器细节按版本 | 常考／场景分析 |
| 13.2 | V8 执行过程 — `docs/basic-knowledge/javascript/v8-execution.mdx` | 解析、字节码、优化与去优化；只支撑性能追问，不要求背具体优化器名称 | 按岗选学／原理解释 |
| 13.3 | ES Module 与 CommonJS — `docs/basic-knowledge/javascript/modules.mdx` | 模块作用域、加载与求值、绑定与导出、缓存、循环依赖；Node 互操作细节链接 16.1 | 必会／原理解释 |
| 13.3 | Tree Shaking — `docs/basic-knowledge/javascript/tree-shaking.mdx` | 静态分析、副作用与产物验证；不等同于所有未调用代码必定被删除 | 常考／原理解释 |
| 13.4 | TypeScript 类型系统 — `docs/basic-knowledge/typescript/type-system.mdx` | 结构化类型、联合与交叉、`any`/`unknown`/`never`、类型收窄、空值检查与运行时校验边界 | 必会／原理解释 |
| 13.4 | TypeScript 泛型与工具类型 — `docs/basic-knowledge/typescript/generics-utility-types.mdx` | 类型参数、约束、`keyof`、索引访问、映射与条件类型；常用工具类型与深入 `infer` 分层阅读 | 常考；TS JD 的基础泛型必会／原理解释 |
| 13.4 | interface 与 type — `docs/basic-knowledge/typescript/type-interface.mdx` | 对象建模、扩展、联合与声明合并；能按类型关系解释选用理由 | 常考／基础回答 |
| 13.4 | TypeScript 声明文件 — `docs/basic-knowledge/typescript/declaration-files.mdx` | `.d.ts`、第三方类型、全局与模块声明、类型发布；不以复杂类型谜题作为核心 | 按岗选学／原理解释 |

总表的“ES6+ 常用特性”在本分纲中按对象归属落地：解构、展开写入值与对象相关文章，集合进入《JavaScript 集合》，代理进入《Proxy 与 Reflect》。总表的“手写题”不单独生成知识正文：`new`、`bind`、Promise 组合与柯里化分别回到对应概念；防抖与节流归 14.3。文章数量由概念边界与采样结果决定。

### 3.2 浏览器与前端基础

| Topic | 标准文章标题与建议路径 | 关键边界与自检对象 | 复习优先级／深度 |
| --- | --- | --- | --- |
| 14.1 | HTML 语义与可访问性 — `docs/frontend/html/semantics-accessibility.mdx` | 语义元素、表单、标签关联、焦点、键盘操作与可访问名称；原生能力先于额外 ARIA | 必会的页面能力／基础回答与实现 |
| 14.1 | CSS 盒模型与格式化上下文 — `docs/frontend/css/box-model-formatting-contexts.mdx` | 内容尺寸、`box-sizing`、正常流、BFC、外边距折叠；能从布局结果反推条件 | 必会／原理解释 |
| 14.1 | CSS 布局 — `docs/frontend/css/layout.mdx` | Flex、Grid、定位、尺寸与溢出；选择一个满足约束的实现并解释窄屏行为 | 必会／原理解释与实现 |
| 14.1 | CSS 层叠 — `docs/frontend/css/cascade.mdx` | 来源、重要性、层叠层、优先级与继承；区分选择器优先级和完整层叠顺序 | 必会／原理解释 |
| 14.1 | 响应式布局 — `docs/frontend/css/responsive-layout.mdx` | 视口、媒体查询、相对单位、图片与高像素密度；适配以内容约束验证 | 常考／场景分析 |
| 14.1 | 层叠上下文 — `docs/frontend/css/stacking-context.mdx` | 绘制次序、`z-index` 的作用范围与新上下文；用遮挡案例检验解释 | 常考／原理解释 |
| 14.2 | 浏览器渲染流程 — `docs/frontend/browser/rendering.mdx` | HTML/CSS 解析、DOM/CSSOM、布局、绘制与合成，脚本加载和阻塞；重排与重绘在本文连贯讲解 | 必会／原理解释 |
| 14.2 | DOM 事件 — `docs/frontend/browser/dom-events.mdx` | 捕获、目标、冒泡、默认行为、委托与监听器清理；区分 `target` 和 `currentTarget` | 必会／原理解释与实现 |
| 14.2 | 浏览器进程模型 — `docs/frontend/browser/process-model.mdx` | 页面、渲染进程、主线程、隔离与通信；区分具体浏览器实现和 Web 规范 | 常考／基础回答 |
| 14.2 | 浏览器存储 — `docs/frontend/browser/storage.mdx` | Cookie、Web Storage、IndexedDB 的生命周期、作用域、容量限制与安全边界；HTTP 缓存继续复用共享文 | 必会／原理解释 |
| 14.2 | 同源策略 — `docs/frontend/browser/same-origin-policy.mdx` | 源的定义、读取限制、跨源资源与窗口通信；CORS 协商正文归共享安全 | 必会／原理解释 |
| 14.2 | Fetch API — `docs/frontend/browser/fetch.mdx` | 请求与响应、HTTP 状态和网络失败、请求体、凭据、AbortController；支撑异步列表和上传场景 | 必会／原理解释与实现 |
| 14.2 | Web Worker — `docs/frontend/browser/web-worker.mdx` | 后台执行、消息、数据复制与转移、DOM 限制；用长计算判断收益与通信成本 | 按岗选学／场景分析 |
| 14.2 | Service Worker — `docs/frontend/browser/service-worker.mdx` | 注册与生命周期、请求拦截、离线缓存与更新；不与 Web Worker 混讲 | 按岗选学／原理解释 |
| 14.3 | Web 性能指标 — `docs/frontend/performance/metrics.mdx` | LCP、INP、CLS、实验室与实际用户数据；先定位现象再选择指标，阈值以官方定义核验 | 必会／原理解释 |
| 14.3 | Web 资源加载 — `docs/frontend/performance/resource-loading.mdx` | 关键资源、压缩、图片、懒加载、预加载、代码分割；解释优化如何影响请求和主线程 | 必会／场景分析 |
| 14.3 | 防抖与节流 — `docs/frontend/performance/debounce-throttle.mdx` | 事件频率、定时器、首尾触发、取消与清理；实现题明确时间边界和状态持有 | 常考／原理解释与实现 |
| 14.3 | 虚拟列表 — `docs/frontend/performance/virtual-list.mdx` | 可视窗口、占位高度、滚动定位、动态高度和可访问性代价；基础篇不复制框架实现 | 常考／场景分析 |
| 14.3 | 前端监控 — `docs/frontend/performance/observability.mdx` | 脚本错误、未处理拒绝、资源错误、Source Map、版本、采样与敏感信息；通用观测原则引用共享文章 | 按岗选学／场景分析 |

《浏览器渲染流程》承接总表中“渲染流程”“重排与重绘”的共同机制，并保留从 URL 到页面展示的综合题入口；DNS、TCP、TLS、HTTP 的细节引用共享正文。《HTML 语义与可访问性》进入基础实现要求是编辑判断，不宣称其频率高于其他主题。《Fetch API》和《层叠上下文》支撑网络交互与布局自检，后者即使本批零独立命中也保留。

### 3.3 前端框架与工程化

| Topic | 标准文章标题与建议路径 | 关键边界与自检对象 | 复习优先级／深度 |
| --- | --- | --- | --- |
| 15.1 | React 组件 — `docs/tools-and-frameworks/react/components.mdx` | JSX、props、state、事件、状态快照、受控表单、组合与状态提升 | 必会（主线）／原理解释 |
| 15.1 | React Hooks — `docs/tools-and-frameworks/react/hooks.mdx` | 调用规则、状态更新、ref、Effect 的依赖与清理；用订阅和异步任务检验闭包与生命周期 | 必会（主线）／原理解释 |
| 15.1 | React 协调 — `docs/tools-and-frameworks/react/reconciliation.mdx` | 元素、组件身份、key、状态保留、渲染与提交；不将内部 Diff 简化为无条件最优算法 | 必会（主线）／原理解释 |
| 15.1 | React 并发渲染 — `docs/tools-and-frameworks/react/concurrent-rendering.mdx` | Fiber 的职责、可中断工作、更新优先级、Transition 与 Suspense；内部实现按版本说明 | 常考（主线）／原理解释；调度细节按岗 |
| 15.1 | React 性能优化 — `docs/tools-and-frameworks/react/performance.mdx` | 重渲染证据、memo、useMemo、useCallback 与成本；不将缓存钩子作为默认优化 | 常考（主线）／场景分析 |
| 15.1 | React 状态管理 — `docs/tools-and-frameworks/react/state-management.mdx` | 本地、共享与服务端状态，Context 与 reducer；Redux/Zustand 仅按项目对照 | 常考（主线）／场景分析 |
| 15.1 | React Server Components — `docs/tools-and-frameworks/react/server-components.mdx` | 服务端与客户端组件边界、数据与交互、序列化；区分 RSC、SSR 和水合 | 按岗选学／原理解释 |
| 15.2 | Vue 响应式 — `docs/tools-and-frameworks/vue/reactivity.mdx` | ref、reactive、依赖追踪、触发更新、解构边界；Vue 2 差异注明适用实现 | 必会（主线）／原理解释 |
| 15.2 | Vue 渲染机制 — `docs/tools-and-frameworks/vue/rendering.mdx` | 模板、渲染函数、虚拟节点、更新、key、编译优化；只讲 Vue 实现差异 | 必会（主线）／原理解释 |
| 15.2 | Vue 组件 — `docs/tools-and-frameworks/vue/components.mdx` | props、事件、插槽、依赖注入、生命周期与组合式函数；单向数据流与清理 | 必会（主线）／原理解释 |
| 15.2 | computed 与 watch — `docs/tools-and-frameworks/vue/computed-watch.mdx` | 派生值、响应副作用、侦听来源、清理、刷新时机与 nextTick | 必会（主线）／原理解释 |
| 15.2 | Vue 状态管理 — `docs/tools-and-frameworks/vue/state-management.mdx` | Vuex 与 Pinia 的跨组件状态、store、修改路径、测试和生命周期；不重讲通用响应式机制 | 按岗选学／场景分析 |
| 15.3 | 前端路由 — `docs/frontend/routing/client-routing.mdx` | Hash、History、导航、URL 状态、服务端回退与权限显示；路由守卫不代替服务端授权 | 常考／原理解释 |
| 15.3 | Web 渲染模式 — `docs/frontend/rendering/rendering-modes.mdx` | CSR、SSR、SSG、水合、首屏与 SEO；用请求/页面生成时机解释差异 | 常考／原理解释 |
| 15.3 | Vue Router — `docs/tools-and-frameworks/vue/router.mdx` | 路由匹配、导航守卫、异步加载、参数变化；框架实现引用通用《前端路由》 | 按岗选学／场景分析 |
| 15.3 | Next.js — `docs/tools-and-frameworks/nextjs/index.mdx` | 仅目标项目使用时扩展路由、数据获取、缓存和服务端边界；明确所用路由模式与版本 | 按岗选学／场景分析 |
| 15.3 | Nuxt — `docs/tools-and-frameworks/nuxt/index.mdx` | 仅目标项目使用时扩展路由、数据获取和服务端渲染；不复制 Vue 与通用渲染模式 | 按岗选学／场景分析 |
| 15.3 | 微前端 — `docs/frontend/architecture/micro-frontends.mdx` | 独立交付、路由、样式与运行时隔离、通信及复杂度；不预设大型组织需求 | 按岗选学／场景分析 |
| 15.4 | 前端构建 — `docs/tools-and-frameworks/frontend-build/build-pipeline.mdx` | 模块图、转换、依赖分析、产物、分包、开发与生产差异、HMR；Webpack/Vite 是实现对照 | 必会／原理解释 |
| 15.4 | JavaScript 包管理 — `docs/tools-and-frameworks/frontend-build/package-management.mdx` | package.json、依赖类别、版本范围、lockfile、依赖解析和安装复现；npm/pnpm 作为实现 | 必会／原理解释 |
| 15.4 | JavaScript 代码转换 — `docs/tools-and-frameworks/frontend-build/transpilation.mdx` | AST、语法转换、目标环境、Polyfill、Source Map；区分转换、类型检查与运行时兼容 | 常考／原理解释 |
| 15.4 | 前端代码检查 — `docs/tools-and-frameworks/frontend-build/code-checks.mdx` | 类型、lint、格式化与提交检查的职责和 CI 验证；工具配置从最小必要范围展开 | 常考／基础回答与实现 |
| 15.4 | 前端组件测试 — `docs/tools-and-frameworks/frontend-testing/component-testing.mdx` | 从用户行为验证 DOM/组件、异步状态、网络替身；Jest/Vitest、Testing Library 作为实现 | 必会的基本行为验证／场景分析与实现 |
| 15.4 | 前端资源发布 — `docs/tools-and-frameworks/frontend-build/asset-release.mdx` | 内容哈希、HTML 与静态资源的版本关系、缓存、旧页面与回滚；引用通用交付策略 | 常考／场景分析 |

Vue 组合式 API 在响应式、组件及 computed/watch 中连续展开，不再复制成一篇只有相同概念列表的正文。Vue Router 的主要归属按其解决的问题放在 15.3，15.2 通过引用进入。React Native 可以复用 JavaScript、TypeScript、React 组件、Hooks 和状态管理；DOM、CSS、浏览器事件循环与 Web 渲染流程不能直接当成原生平台机制。

### 3.4 Node.js 按岗范围

下表承接总表第 16 节。全部为按岗选学，目标岗位需要 Node.js 后端时，再由对应路线核定其中的必会范围。

| Topic | 标准文章标题与建议路径 | 停止条件／深度 |
| --- | --- | --- |
| 16.1 | Node.js 事件循环 — `docs/basic-knowledge/nodejs/event-loop.mdx` | 能在明确 Node.js 版本下解释 I/O、定时器、nextTick 和 Promise 的关系；原理解释 |
| 16.1 | Node.js 模块机制 — `docs/basic-knowledge/nodejs/modules.mdx` | 能根据包声明、文件扩展名和导入方式判断加载机制，并定位解析/互操作问题；原理解释 |
| 16.1 | Buffer 与 Stream — `docs/basic-knowledge/nodejs/buffer-stream.mdx` | 能解释分块、背压、错误传播和内存成本；原理解释与实现 |
| 16.1 | Node.js 进程与线程 — `docs/basic-knowledge/nodejs/processes-workers.mdx` | 能针对 CPU 任务、隔离和通信成本选择 child_process 或 worker_threads；场景分析 |
| 16.1 | Node.js 性能分析 — `docs/basic-knowledge/nodejs/profiling.mdx` | 能用 CPU/堆/事件循环证据区分阻塞与泄漏；场景分析 |
| 16.2 | Node.js 中间件 — `docs/tools-and-frameworks/nodejs/middleware.mdx` | 用 Koa/Express 最小示例说明调用顺序、错误和响应；原理解释 |
| 16.2 | BFF — `docs/system-design/patterns/backend-for-frontend.mdx` | 解释接口聚合、认证边界、超时、部分失败与新增中间层的代价；场景分析 |
| 16.2 | NestJS — `docs/tools-and-frameworks/nodejs/nestjs.mdx` | 目标使用时解释模块、依赖注入、请求处理与测试；原理解释 |
| 16.2 | Node.js 服务生命周期 — `docs/basic-knowledge/nodejs/service-lifecycle.mdx` | 解释启动就绪、异常、连接排空与退出；场景分析 |
| 16.2 | Node.js 数据访问 — `docs/tools-and-frameworks/nodejs/data-access.mdx` | 目标使用 ORM 时解释查询、事务边界、连接管理与 N+1；场景分析 |

## 4. 共享正文与缺口

以下链接已核对本地文件及页面标题。只选择前端实际需要的章节，不能因引用某篇通用文章就把其全部后端深入内容加入前端必读。

| 复用目标 | 已有标准正文 | 前端阅读边界与尚缺内容 |
| --- | --- | --- |
| 请求与传输 | [DNS](../../docs/basic-knowledge/network/dns.mdx)、[TCP 连接](../../docs/basic-knowledge/network/tcp_handshake.mdx)、[HTTP](../../docs/basic-knowledge/network/http-versions-connection-reuse-timeouts.mdx)、[TLS](../../docs/basic-knowledge/network/tls.mdx) | 读取请求建立、连接复用、HTTPS 与错误条件。HTTP 请求方法、状态码、请求/响应头和内容协商需在已有 HTTP 主题补齐，再让 Fetch 文章引用，不能在各框架复制 |
| 缓存 | [HTTP 缓存](../../docs/basic-knowledge/network/http-cache.mdx) | 新鲜度、条件请求、Vary 与缓存策略；前端只补资源发布和浏览器观察例子。CDN 的通用机制仍归网络/系统设计 |
| 进程与内存 | [进程与线程](../../docs/basic-knowledge/operating-system/processes-threads.mdx)、[虚拟内存](../../docs/basic-knowledge/operating-system/virtual-memory.mdx) | 前者用于理解主线程、后台任务与隔离；后者按 Node.js 或性能追问选读，不把系统内存管理列为所有页面开发的第一轮要求 |
| 认证与授权 | [认证与授权](../../docs/system-design/security/authentication-authorization-trust-boundaries.mdx)、[Session、JWT、OAuth 2.0 与 OIDC](../../docs/system-design/security/session-jwt-oauth-oidc.mdx) | 身份、凭据、服务端权限校验与会话；OAuth/OIDC 的深入流程按登录项目选读 |
| XSS 与 CSRF | [Web 应用安全](../../docs/system-design/security/injection-authorization-ssrf-deserialization.mdx#xss-与-csrf) | 已有定义和防护片段。按总表 8.2 拟补《XSS》`docs/system-design/security/xss.mdx`、《CSRF》`docs/system-design/security/csrf.mdx`；先迁移/扩充权威解释并检查旧链接，再由前端引用，避免保留两套完整正文 |
| 跨源访问 | 当前没有独立 CORS 正文 | 按总表 8.2 拟补《跨域与 CORS》`docs/system-design/security/cors.mdx`，覆盖预检、响应头、凭据和缓存；与《同源策略》分工为“限制规则”和“服务端授权读取的协议”，互相引用 |
| 测试原则 | [测试金字塔](../../docs/basic-knowledge/java/quality/test-pyramid-contract-regression.mdx)、[测试替身](../../docs/basic-knowledge/java/quality/test-doubles-mock-stub-boundaries.mdx) | 复用分层、契约、替身、回归与不稳定测试；Java 工具操作不纳入前端要求。E2E 复用测试开发大纲拟补的《Web UI 自动化测试》`docs/tools-and-frameworks/testing/ui-automation.mdx` |
| 工程交付 | [Git](../../docs/tools-and-frameworks/git/index.md)、[可重复交付](../../docs/system-design/production/docker-ci-cd-reproducible-delivery.mdx)、[可观测性](../../docs/system-design/production/logs-metrics-traces-correlation.mdx) | Git 已有分支、合并与撤销解释，不因旧规划仍标待写而重复建文；交付与观测仅引用机制，前端增量为产物版本、浏览器错误和资源证据 |
| 算法与编码 | [数组](../../docs/basic-knowledge/data-structures/array.mdx)、[哈希表](../../docs/basic-knowledge/data-structures/hash-table.mdx)、[二分查找](../../docs/basic-knowledge/algorithms/binary-search.mdx)、[双指针](../../docs/basic-knowledge/algorithms/two-pointers.mdx)、[回溯](../../docs/basic-knowledge/algorithms/backtracking.mdx) | 复用数据结构与算法机制。补 JS 实现时核验数值、字符、排序比较器、递归和容器语义，不批量复制算法全文；按采样继续选树图、动态规划等共享主题 |
| 编码与项目表达 | [编码与 SQL 练习](../../docs/interview/coding-practice.mdx)、[项目准备](../../docs/interview/project-preparation.mdx) | 前者复用算法迁移和自检方法，SQL 与 Java 并发练习按岗排除；后者补充前端项目的交互、状态、网络、性能证据，不另建一份通用项目叙事指南 |

## 5. 编码与项目的验收任务

这些任务用于证明能力，不要求为每个任务再写一篇概念文章；解法与自检链接回上述文章。按已核验的实际问法补充变式和约束。

| 任务 | 可观察的完成结果 | 对应内容 |
| --- | --- | --- |
| 语言行为推导 | 对闭包、this、原型、对象拷贝和异步片段先给结果，再用规则解释；反例能实际运行验证 | 13.1—13.3 |
| 交互组件 | 完成可键盘操作的表单或弹窗，验证焦点、错误、重复操作与卸载清理 | 14.1—14.2、一条框架主线、组件测试 |
| 异步列表 | 支持加载、空状态、失败、重试和快速切换查询；旧响应不能覆盖新结果，并有回归验证 | Promise、async/await、Fetch、框架状态与 Effect/侦听清理 |
| 事件与异步工具 | 实现约定首尾行为的防抖/节流、Promise 组合或并发限制；检查空输入、错误、结果顺序和取消边界 | 对应语言与性能主题；不要求重造完整标准库 |
| 布局与性能诊断 | 在给定视口重现溢出或遮挡；在给定页面记录慢请求/长任务/偏移证据，做修改并比较相同条件 | 14.1—14.3 |
| 项目口述 | 用自己的项目说明功能目标、本人贡献、状态与数据流、一次技术选择、故障或优化证据、尚存限制 | 项目准备、工程化、测试与监控 |

## 6. 面经校准与后续写作

已阅读并保留 154 条来源记录：101 条主样本、41 条补充、12 条排除。检索、逐题释义与定位、采用理由、招聘类别、公司披露、子方向、日期及附件核验记录的存放安排见[研究口径与材料存放说明](./campus-expansion-progress.md#研究材料与迁移状态)。主样本含一篇未披露实际提问的复盘，仍计入分母。社招、招聘类别未知、转载与题单不进入主分母。

统计采用“明确披露考点的篇数／相应分层全部主样本篇数”，同篇同考点只计一次，并提供作者/公司来源分组的补充口径（多公司合辑保留联合组）。React、Vue、Node 是可以重叠的子方向，不能相加；React 44 篇、Vue 59 篇、Node.js 9 篇。该批材料以 Web 前端为主，Node.js 服务专项证据不足，继续按岗建设，不推断其市场比例。

校准后保持语言、异步、浏览器、布局、框架主线、编码和项目的第一轮范围；工程化、测试、可访问性不能因披露偏少而删除。增加对象属性、正则、CSS 动画与样式组织、表单、调试、上下文通信、图形、上传、编辑器、乐观更新、小程序及 Web 宿主通信等有明确问法的内容。Vue 状态管理统一承接 Vuex/Pinia；协议、数据库、系统、算法和 AI 仍复用共享分支。新增文章与零命中但必要前置的完整边界均列在写作清单中，不按频率截断交付。

开始正文前，应形成“来源问题 → 考点 → 文章/章节 → 自检条件”的映射，并解决第 4 节的共享归属。技术答案以规范、官方文档和可运行示例核验，面经只证明对应问法出现过。按最新 `AGENTS.md`，有来源题目的公司与全部原始链接写入私有 `linsama-account/content/coding101/companies.json`；公开正文不写公司归属或面试来源注释。无可核验来源题使用规定的本站原理自测注释。

每篇正文按 `lin-writing-style` 和仓库规范撰写：先定义或给结论，机制后接最小示例，面试核心与正文顺序一致，题目保留稳定 ID、考察重点、相关内容与默认收起的参考回答。篇幅和题目数由独立考点决定，不沿用旧文档中的阅读时长或 1—3 题限制。完稿后依次进行事实/示例核验、文风通读、严格文章格式检查、内容状态更新及受影响链接与构建检查。

## 7. 技术范围参考

以下一手文档用于核对语言、平台和框架的概念范围，不能作为校招频率证据。文章编写时还需转到对应机制的具体章节，核验适用版本与示例。

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)：语言、集合、异步和模块的概念组织。
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)：类型收窄、函数、对象、泛型与类型操作。
- [HTML Standard：Event loops](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)：浏览器宿主的任务、微任务和渲染处理。
- [MDN：CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)：跨源请求、预检与凭据规则。
- [React：Learn](https://react.dev/learn)：组件、交互、状态与外部系统同步的官方学习主线。
- [Vue：指南](https://cn.vuejs.org/guide/introduction)：响应式、组件、组合式 API、工程化与渲染。
- [web.dev：Web Vitals](https://web.dev/articles/vitals)：体验指标、测量与实验室/实际用户数据的区别。
- [Vite：Guide](https://vite.dev/guide/)：开发服务器、构建、资源和环境配置；具体底层工具随版本核验。
