import type {InterviewRoadmapData, RoadmapPhase, RoadmapTopic} from '../../components/InterviewRoadmap';

export type FrontendFramework = 'react' | 'vue';

const topics: Record<string, RoadmapTopic> = {
  "values": {
    "id": "frontend-values",
    "title": "值、变量与函数",
    "priority": "must",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "能按调用方式判断 this，画出实例与原型关系，并说明浅拷贝后哪些对象仍然共享。",
        "用自己的代码解释一处闭包或对象共享问题；不要求第一轮手写完整深拷贝库。"
      ],
      "interviewQuestions": [
        "方法被单独取出调用后，this 为什么可能变化？",
        "实例自己的同名属性会怎样影响原型查找？",
        "只复制最外层对象能隔离嵌套状态吗？"
      ]
    },
    "articles": [
      {
        "title": "JavaScript 数据类型与类型转换",
        "href": "/docs/basic-knowledge/javascript/types-conversion",
        "core": true,
        "scope": "先看值的类型、对象共享、类型识别与严格相等；精度和序列化按追问补充。"
      },
      {
        "title": "作用域与闭包",
        "href": "/docs/basic-knowledge/javascript/scope-closures",
        "core": true,
        "scope": "先看词法查找、let/const 与闭包共享绑定，自己推导一个循环回调。"
      },
      {
        "title": "this 绑定",
        "href": "/docs/basic-knowledge/javascript/this-binding",
        "core": false
      },
      {
        "title": "原型与原型链",
        "href": "/docs/basic-knowledge/javascript/prototypes",
        "core": false
      },
      {
        "title": "JavaScript 对象拷贝",
        "href": "/docs/basic-knowledge/javascript/copying",
        "core": false
      },
      {
        "title": "高阶函数与柯里化",
        "href": "/docs/basic-knowledge/javascript/higher-order-functions",
        "core": false
      },
      {
        "title": "迭代器与生成器",
        "href": "/docs/basic-knowledge/javascript/iterators-generators",
        "core": false
      },
      {
        "title": "JavaScript 对象属性",
        "href": "/docs/basic-knowledge/javascript/object-properties",
        "core": false
      },
      {
        "title": "Proxy 与 Reflect",
        "href": "/docs/basic-knowledge/javascript/proxy-reflect",
        "core": false
      },
      {
        "title": "正则表达式",
        "href": "/docs/basic-knowledge/javascript/regular-expressions",
        "core": false
      }
    ],
    "firstRound": {
      "outcomes": [
        "能区分修改对象与重新赋值，判断 null、数组和普通值，并按定义位置推导闭包读取的变量，即可继续。",
        "先能写函数、分支、循环和数组操作；语法不熟时先用最小程序练习。"
      ],
      "questions": [
        "两个变量引用同一对象时，哪些修改会相互影响？",
        "循环中的回调为什么可能读到同一个值？"
      ]
    }
  },
  "async": {
    "id": "frontend-async",
    "title": "异步结果与执行顺序",
    "priority": "must",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "能把 Promise 链改写成 async/await，说明串行等待、并发启动和异常捕获的差异。",
        "遇到取消或超时，能区分停止等待、终止网络操作与撤销服务端结果。"
      ],
      "interviewQuestions": [
        "循环里逐次 await 和先启动再 Promise.all 有什么区别？",
        "外层 try/catch 为什么抓不到以后定时器里的异常？"
      ]
    },
    "articles": [
      {
        "title": "Promise",
        "href": "/docs/basic-knowledge/javascript/promise",
        "core": true,
        "scope": "先掌握状态、then 返回值、拒绝传播和组合方法；手写 Promise 与并发调度器留到追问。"
      },
      {
        "title": "浏览器事件循环",
        "href": "/docs/basic-knowledge/javascript/browser-event-loop",
        "core": true,
        "scope": "先用执行栈、任务与微任务推导短程序；不背所有宿主 API 的统一顺序。"
      },
      {
        "title": "async 与 await",
        "href": "/docs/basic-knowledge/javascript/async-await",
        "core": false
      }
    ],
    "firstRound": {
      "outcomes": [
        "能推导同步代码、已兑现 Promise 与定时器的基本顺序，写出成功、失败、清理三条路径，即可继续。",
        "前置：函数调用、闭包和返回值。"
      ],
      "questions": [
        "then 返回普通值、Promise 或抛错时，下一步分别得到什么？",
        "Promise.all 中一个任务失败后，其余任务会自动停止吗？"
      ]
    }
  },
  "layout": {
    "id": "frontend-layout",
    "title": "页面语义与布局",
    "priority": "must",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "能沿层叠规则解释样式为何未生效，选择响应式断点，并在长文本和不同视口下检查溢出。",
        "前置：盒模型、Flex/Grid 与原生控件的基本使用。"
      ],
      "interviewQuestions": [
        "选择器更具体，为什么仍可能没有赢过另一个声明？",
        "固定宽度的侧栏遇到窄屏时，应该怎样调整约束？"
      ]
    },
    "articles": [
      {
        "title": "HTML 语义与可访问性",
        "href": "/docs/frontend/html/semantics-accessibility",
        "core": true,
        "scope": "先掌握链接、按钮、label 与键盘焦点，检查自己的表单能否不用鼠标完成。"
      },
      {
        "title": "CSS 盒模型与格式化上下文",
        "href": "/docs/frontend/css/box-model-formatting-contexts",
        "core": true,
        "scope": "先计算 content-box、border-box 与溢出；BFC 只需能解释一个实际布局问题。"
      },
      {
        "title": "CSS 布局",
        "href": "/docs/frontend/css/layout",
        "core": true,
        "scope": "实现两栏或居中布局，验证窄屏、长文本与最小尺寸；不背全部属性值。"
      },
      {
        "title": "CSS 层叠",
        "href": "/docs/frontend/css/cascade",
        "core": false
      },
      {
        "title": "响应式布局",
        "href": "/docs/frontend/css/responsive-layout",
        "core": false
      },
      {
        "title": "CSS 动画",
        "href": "/docs/frontend/css/animations",
        "core": false
      },
      {
        "title": "层叠上下文",
        "href": "/docs/frontend/css/stacking-context",
        "core": false
      },
      {
        "title": "CSS 样式组织",
        "href": "/docs/frontend/css/style-organization",
        "core": false
      },
      {
        "title": "HTML 表单",
        "href": "/docs/frontend/html/forms",
        "core": false
      }
    ],
    "firstRound": {
      "outcomes": [
        "能写出含标签的输入框和按钮，用 Flex 或 Grid 完成一个可缩放布局，并解释尺寸、对齐与溢出原因，即可继续。",
        "用键盘检查焦点、操作与可见状态；布局正确不等于交互可用。"
      ],
      "questions": [
        "width: 100% 加 padding 为什么可能溢出？",
        "为什么不能只把 div 改成按钮的外观？"
      ]
    }
  },
  "browser": {
    "id": "frontend-browser",
    "title": "浏览器呈现与事件",
    "priority": "must",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "能用断点、Network 和计算样式把白屏或重复事件缩小到具体阶段，修复后按原条件复验。",
        "能区分进程隔离与主线程调度，不把一标签页等同于固定一个进程。"
      ],
      "interviewQuestions": [
        "按钮第二次点击执行两次，怎样证明是重复监听？",
        "DOM 已更新，为什么用户还没有看到变化？"
      ]
    },
    "articles": [
      {
        "title": "浏览器渲染流程",
        "href": "/docs/frontend/browser/rendering",
        "core": true,
        "scope": "先说明 DOM、样式、布局与绘制，区分普通脚本、defer、async；复杂性能取证后补。"
      },
      {
        "title": "DOM 事件",
        "href": "/docs/frontend/browser/dom-events",
        "core": true,
        "scope": "先掌握捕获与冒泡、target/currentTarget、事件委托和监听清理。"
      },
      {
        "title": "浏览器调试",
        "href": "/docs/frontend/browser/debugging",
        "core": false
      },
      {
        "title": "浏览器进程模型",
        "href": "/docs/frontend/browser/process-model",
        "core": false
      }
    ],
    "firstRound": {
      "outcomes": [
        "能说明页面从文档结构到呈现的大致过程，写出有边界检查的事件委托并正确移除监听器，即可继续。",
        "前置：页面布局和浏览器事件循环。"
      ],
      "questions": [
        "stopPropagation 与 preventDefault 分别控制什么？",
        "读取几何信息为什么可能让浏览器提前执行布局？"
      ]
    }
  },
  "requests": {
    "id": "frontend-requests",
    "title": "HTTP 与接口交互",
    "priority": "must",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "能根据请求、预检和响应头定位跨源读取失败，解释 Cookie 与浏览器存储的发送及可读边界。",
        "知道跨源读取限制、身份认证和服务端授权分别解决什么问题。"
      ],
      "interviewQuestions": [
        "为什么服务端已处理请求，浏览器仍不让代码读取响应？",
        "localStorage 与 Cookie 在请求中怎样参与身份传递？"
      ]
    },
    "articles": [
      {
        "title": "HTTP",
        "href": "/docs/basic-knowledge/network/http-versions-connection-reuse-timeouts#请求与响应",
        "core": true,
        "scope": "第一轮读请求响应、方法和状态码；连接版本、超时预算与重试追问后补。"
      },
      {
        "title": "Fetch API",
        "href": "/docs/frontend/browser/fetch",
        "core": true,
        "scope": "先做 JSON 请求，检查状态与正文，处理取消和旧响应覆盖；请求缓存封装后补。"
      },
      {
        "title": "跨域与 CORS",
        "href": "/docs/system-design/security/cors",
        "core": false
      },
      {
        "title": "浏览器存储",
        "href": "/docs/frontend/browser/storage",
        "core": false
      },
      {
        "title": "Base64",
        "href": "/docs/basic-knowledge/encoding/base64",
        "core": false
      },
      {
        "title": "文件上传",
        "href": "/docs/basic-knowledge/network/file-upload",
        "core": false
      }
    ],
    "firstRound": {
      "outcomes": [
        "能完成带加载、空结果和错误状态的接口页面，区分 HTTP 错误、网络失败与解析失败，并避免旧响应覆盖新输入，即可继续。",
        "前置：Promise 和浏览器事件；先用自己能观察请求响应的练习接口。"
      ],
      "questions": [
        "fetch 收到 404 为什么不一定进入 catch？",
        "AbortController 能撤销服务端已经保存的数据吗？"
      ]
    }
  },
  "react": {
    "id": "frontend-react",
    "title": "React 组件与状态",
    "priority": "must",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "能解释组件位置和 key 如何影响状态保留，为共享状态选择提升、Context 或外部存储。",
        "用组件边界与实际订阅范围解释更新，不把 Context 自动当成性能优化。"
      ],
      "interviewQuestions": [
        "列表使用下标作为 key，重排后会出现什么问题？",
        "共享状态放到 Context 后，哪些消费者需要更新？"
      ]
    },
    "articles": [
      {
        "title": "React 组件",
        "href": "/docs/tools-and-frameworks/react/components",
        "core": true,
        "scope": "先实现受控表单、列表与父子通信，解释状态快照和不可变更新。"
      },
      {
        "title": "React Hooks",
        "href": "/docs/tools-and-frameworks/react/hooks",
        "core": true,
        "scope": "先掌握 Hook 调用规则、Effect 依赖与清理；自定义计时器等追问可后补。"
      },
      {
        "title": "React 协调",
        "href": "/docs/tools-and-frameworks/react/reconciliation",
        "core": false
      },
      {
        "title": "React 状态管理",
        "href": "/docs/tools-and-frameworks/react/state-management",
        "core": false
      },
      {
        "title": "组件框架",
        "href": "/docs/frontend/architecture/component-frameworks",
        "core": false
      },
      {
        "title": "视图架构模式",
        "href": "/docs/frontend/architecture/view-models",
        "core": false
      }
    ],
    "firstRound": {
      "outcomes": [
        "能独立做一个带输入、列表、请求与卸载清理的小页面，说明 props、state、ref 和 Effect 的职责，即可继续。",
        "前置：闭包、不可变更新、Promise 与 DOM 事件；第一轮只准备选定的框架。"
      ],
      "questions": [
        "连续调用状态 setter，为什么可能仍只增加一次？",
        "Effect 依赖改变时，旧订阅在哪里清理？"
      ]
    }
  },
  "vue": {
    "id": "frontend-vue",
    "title": "Vue 组件与响应式",
    "priority": "must",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "能按派生值与副作用选择 computed、watch 或 watchEffect，清理过时异步操作。",
        "能解释 key、组件更新与共享状态归属，说明 Pinia 的使用条件。"
      ],
      "interviewQuestions": [
        "computed 和 watch 为什么不能只按是否能算出结果选择？",
        "列表重排时，key 如何影响组件状态？"
      ]
    },
    "articles": [
      {
        "title": "Vue 组件",
        "href": "/docs/tools-and-frameworks/vue/components",
        "core": true,
        "scope": "先实现 props/emits、表单与父子通信，说明组件状态归属。"
      },
      {
        "title": "Vue 响应式",
        "href": "/docs/tools-and-frameworks/vue/reactivity",
        "core": true,
        "scope": "先掌握 ref/reactive、代理身份、依赖追踪和 nextTick 的含义；手写响应式系统后补。"
      },
      {
        "title": "computed 与 watch",
        "href": "/docs/tools-and-frameworks/vue/computed-watch",
        "core": false
      },
      {
        "title": "Vue 状态管理",
        "href": "/docs/tools-and-frameworks/vue/state-management",
        "core": false
      },
      {
        "title": "Vue 渲染机制",
        "href": "/docs/tools-and-frameworks/vue/rendering",
        "core": false
      },
      {
        "title": "组件框架",
        "href": "/docs/frontend/architecture/component-frameworks",
        "core": false
      },
      {
        "title": "视图架构模式",
        "href": "/docs/frontend/architecture/view-models",
        "core": false
      }
    ],
    "firstRound": {
      "outcomes": [
        "能独立做一个含表单、列表、请求和父子通信的小页面，解释 ref/reactive 与 DOM 更新时机，即可继续。",
        "前置：对象、闭包、Promise 与 DOM 事件；这里按 Vue 3 文章准备。"
      ],
      "questions": [
        "解构 reactive 对象的普通属性后，为什么可能失去响应式关联？",
        "修改状态后，nextTick 保证了什么，又没有保证什么？"
      ]
    }
  },
  "coding": {
    "id": "frontend-coding",
    "title": "基础数据结构与现场编码",
    "priority": "must",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "能用 JavaScript 实现反转链表、二分边界和双指针，说明循环不变式、复杂度与输入条件。",
        "空输入、重复值、极值和原输入是否可修改都能给出自检用例。"
      ],
      "interviewQuestions": [
        "二分循环为什么可能漏掉最后一个候选？",
        "反转链表时，怎样避免丢失后继节点？"
      ]
    },
    "articles": [
      {
        "title": "JavaScript 集合",
        "href": "/docs/basic-knowledge/javascript/collections",
        "core": true,
        "scope": "用 Array、Map、Set 实现统计、去重和查找，明确相等与顺序约定。"
      },
      {
        "title": "哈希表",
        "href": "/docs/basic-knowledge/data-structures/hash-table",
        "core": true,
        "scope": "理解按键查找、冲突和平均成本，不先背 Java 容器实现。"
      },
      {
        "title": "链表",
        "href": "/docs/basic-knowledge/data-structures/linked-list",
        "core": false
      },
      {
        "title": "二分查找",
        "href": "/docs/basic-knowledge/algorithms/binary-search",
        "core": false
      },
      {
        "title": "双指针",
        "href": "/docs/basic-knowledge/algorithms/two-pointers",
        "core": false
      }
    ],
    "firstRound": {
      "outcomes": [
        "能独立写出频次统计、去重或两数查找，说明输入约定、复杂度，并用空数组和重复值自检，即可继续。",
        "使用 JavaScript 实现；通用结构文章的其他语言示例只用于理解机制。"
      ],
      "questions": [
        "Map 的对象键按内容还是身份比较？",
        "哈希表的 O(1) 为什么不是无条件保证？"
      ]
    }
  },
  "project": {
    "id": "frontend-project",
    "title": "项目证据与协作",
    "priority": "must",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "能为真实组件补充成功、等待和失败路径的检查，说明替身测试与真实浏览器验证各自证明了什么。",
        "能解释类型检查、lint、格式和测试各自的职责，而非只报告命令通过。"
      ],
      "interviewQuestions": [
        "mock 保存函数的组件测试通过，是否证明真实接口可用？",
        "AI 生成的页面能运行后，你还检查了哪些边界？"
      ]
    },
    "articles": [
      {
        "title": "项目准备",
        "href": "/docs/interview/project-preparation",
        "core": true,
        "scope": "使用一页材料与独立演练方法，换成自己做过的前端页面和请求链路；无需照搬后端教学示例。"
      },
      {
        "title": "Git",
        "href": "/docs/tools-and-frameworks/git/",
        "core": true,
        "scope": "先会查看差异、选择暂存、提交和处理冲突，区分共享与未共享历史。"
      },
      {
        "title": "前端组件测试",
        "href": "/docs/tools-and-frameworks/frontend-testing/component-testing",
        "core": false
      },
      {
        "title": "前端代码检查",
        "href": "/docs/tools-and-frameworks/frontend-build/code-checks",
        "core": false
      }
    ],
    "firstRound": {
      "outcomes": [
        "能用两分钟说明项目背景、本人负责的页面或组件、一次问题定位和验证结果，再回答三道追问，即可进入第二轮。",
        "至少有一个可以运行的页面；如使用 AI 辅助，能解释和修改交付的代码，并保留真实的未验证范围。"
      ],
      "questions": [
        "一次点击怎样经过组件、请求、接口结果和界面更新？",
        "提交了哪些内容，怎样证明没有混入无关修改？"
      ]
    }
  },
  "typescript": {
    "id": "frontend-typescript",
    "title": "类型约束与运行时输入",
    "priority": "common",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "能为组件或请求封装写出类型关系，用 unknown 接收外部数据并在运行时检查；能区分编译期约束与业务校验。",
        "前置：JavaScript 值、对象和函数。"
      ],
      "interviewQuestions": [
        "as 为什么不能证明接口返回数据有效？",
        "泛型与直接写 any 相比，保留了什么关系？"
      ]
    },
    "articles": [
      {
        "title": "TypeScript 类型系统",
        "href": "/docs/basic-knowledge/typescript/type-system",
        "core": true,
        "scope": "重点看结构类型、联合类型和收窄，以及类型断言不会校验输入。"
      },
      {
        "title": "TypeScript 泛型与工具类型",
        "href": "/docs/basic-knowledge/typescript/generics-utility-types",
        "core": true,
        "scope": "用泛型保留输入输出关系，选读自己能解释的工具类型。"
      },
      {
        "title": "interface 与 type",
        "href": "/docs/basic-knowledge/typescript/type-interface",
        "core": false
      },
      {
        "title": "TypeScript 声明文件",
        "href": "/docs/basic-knowledge/typescript/declaration-files",
        "core": false
      }
    ]
  },
  "modules": {
    "id": "frontend-modules",
    "title": "模块、依赖与构建",
    "priority": "common",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "能解释源码怎样进入浏览器，复现依赖安装，判断开发代理与生产接口地址的差异，即可继续。",
        "涉及产物体积或兼容性追问时，再读 Tree Shaking 与代码转换；不要求手写通用打包器。"
      ],
      "interviewQuestions": [
        "开发环境运行正常，为什么生产构建仍可能缺少依赖或接口地址错误？",
        "动态 import 为什么不保证首屏一定更快？"
      ]
    },
    "articles": [
      {
        "title": "ES Module 与 CommonJS",
        "href": "/docs/basic-knowledge/javascript/modules",
        "core": true,
        "scope": "先区分 ESM 与 CommonJS 的导入导出、加载及值绑定。"
      },
      {
        "title": "JavaScript 包管理",
        "href": "/docs/tools-and-frameworks/frontend-build/package-management",
        "core": true,
        "scope": "重点看清单、锁文件、冻结安装和依赖声明。"
      },
      {
        "title": "前端构建",
        "href": "/docs/tools-and-frameworks/frontend-build/build-pipeline",
        "core": true,
        "scope": "讲清入口、依赖图、转换和产物，区分开发服务与生产构建。"
      },
      {
        "title": "Tree Shaking",
        "href": "/docs/basic-knowledge/javascript/tree-shaking",
        "core": false
      },
      {
        "title": "JavaScript 代码转换",
        "href": "/docs/tools-and-frameworks/frontend-build/transpilation",
        "core": false
      }
    ]
  },
  "cache": {
    "id": "frontend-cache",
    "title": "HTTP 缓存与资源发布",
    "priority": "common",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "能为 HTML 和版本化静态资源分别制定缓存策略，解释发版后用户仍见旧页面的排查顺序。",
        "前置：HTTP 与构建产物；涉及边缘缓存、多地区访问或回源问题时再补 CDN。"
      ],
      "interviewQuestions": [
        "no-cache 和 no-store 的含义有什么区别？",
        "发布新页面后立即删除旧 chunk，会影响哪些用户？"
      ]
    },
    "articles": [
      {
        "title": "HTTP 缓存",
        "href": "/docs/basic-knowledge/network/http-cache",
        "core": true,
        "scope": "区分新鲜度与条件请求，用 Cache-Control、ETag 和 304 推导缓存行为。"
      },
      {
        "title": "前端资源发布",
        "href": "/docs/tools-and-frameworks/frontend-build/asset-release",
        "core": true,
        "scope": "说明 HTML 与带内容哈希资源的缓存、发布顺序及旧客户端资源保留。"
      },
      {
        "title": "CDN",
        "href": "/docs/basic-knowledge/network/cdn",
        "core": false
      }
    ]
  },
  "performance": {
    "id": "frontend-performance",
    "title": "页面性能与测量",
    "priority": "common",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "能对一次加载慢或交互卡顿保留基线，定位主要瓶颈，修改后在相同条件下比较结果，即可继续。",
        "前置：浏览器呈现、网络请求和异步调度；不能仅凭分包数量或单次跑分声称优化有效。"
      ],
      "interviewQuestions": [
        "页面内容出现得快，为什么输入仍然可能迟钝？",
        "预加载太多资源为什么也可能拖慢关键请求？"
      ]
    },
    "articles": [
      {
        "title": "Web 性能指标",
        "href": "/docs/frontend/performance/metrics",
        "core": true,
        "scope": "先识别加载、交互与布局稳定性分别关注什么，区分实验室与真实用户数据。"
      },
      {
        "title": "Web 资源加载",
        "href": "/docs/frontend/performance/resource-loading",
        "core": true,
        "scope": "根据关键资源发现和请求时序选择加载策略。"
      },
      {
        "title": "前端监控",
        "href": "/docs/frontend/performance/observability",
        "core": false
      },
      {
        "title": "JavaScript 内存管理",
        "href": "/docs/basic-knowledge/javascript/memory-management",
        "core": false
      },
      {
        "title": "V8 执行过程",
        "href": "/docs/basic-knowledge/javascript/v8-execution",
        "core": false
      },
      {
        "title": "Web Worker",
        "href": "/docs/frontend/browser/web-worker",
        "core": false
      }
    ]
  },
  "security": {
    "id": "frontend-security",
    "title": "页面输入与请求安全",
    "priority": "common",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "能沿输入到危险输出位置解释 XSS，沿凭据到状态变更解释 CSRF，并说明前端隐藏按钮不能代替服务端授权，即可。",
        "前置：Fetch、Cookie 与跨源读取；自己的项目涉及富文本或登录时应提前准备。"
      ],
      "interviewQuestions": [
        "为什么插入文本与插入 HTML 需要不同处理？",
        "CORS 报错为什么不一定能阻止一次状态变更？"
      ]
    },
    "articles": [
      {
        "title": "XSS",
        "href": "/docs/system-design/security/xss",
        "core": true,
        "scope": "按输出上下文选择文本 API、编码或净化，了解 CSP 的补充作用。"
      },
      {
        "title": "CSRF",
        "href": "/docs/system-design/security/csrf",
        "core": true,
        "scope": "解释浏览器自动携带凭据、CSRF Token 与来源检查的分工。"
      },
      {
        "title": "认证与授权",
        "href": "/docs/system-design/security/authentication-authorization-trust-boundaries",
        "core": true,
        "scope": "重点区分身份认证、服务端授权与前端界面控制。"
      },
      {
        "title": "同源策略",
        "href": "/docs/frontend/browser/same-origin-policy",
        "core": false
      }
    ]
  },
  "interaction": {
    "id": "frontend-interaction",
    "title": "高频输入与异步状态",
    "priority": "common",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "能为搜索或保存交互设计等待、成功和失败状态，并处理旧请求、重复操作与组件卸载，即可。",
        "前置：闭包、Promise、Fetch 和所选框架的状态更新；上传只在项目需要时展开实现。"
      ],
      "interviewQuestions": [
        "防抖为什么不能保证服务端只产生一次效果？",
        "上传进度达到 100% 后，为什么还可能没有保存成功？"
      ]
    },
    "articles": [
      {
        "title": "防抖与节流",
        "href": "/docs/frontend/performance/debounce-throttle",
        "core": true,
        "scope": "先实现一种明确约定的防抖或节流，说明尾次调用、取消与参数保存。"
      },
      {
        "title": "乐观更新",
        "href": "/docs/frontend/interaction/optimistic-updates",
        "core": true,
        "scope": "重点看过时响应、失败回滚与服务端确认的关系。"
      },
      {
        "title": "浏览器文件上传",
        "href": "/docs/frontend/interaction/file-upload",
        "core": true,
        "scope": "先掌握 File/Blob、切片、取消和进度；续传协议另按链接深入。"
      }
    ]
  },
  "algorithms": {
    "id": "frontend-algorithms",
    "title": "树、排序与递归",
    "priority": "common",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "能用 JavaScript 写树遍历或递归处理嵌套数据，说明时间与栈空间；再按目标笔试补堆和回溯。",
        "前置：数组、函数和基础编码自检；不要求为阅读通用示例再学另一门语言。"
      ],
      "interviewQuestions": [
        "递归为何需要同时检查终止条件与问题是否缩小？",
        "使用 sort 排序数字时，比较器需要表达什么关系？"
      ]
    },
    "articles": [
      {
        "title": "二叉树",
        "href": "/docs/basic-knowledge/data-structures/binary-tree",
        "core": true,
        "scope": "先写遍历并说明递归栈，区分树形结构与搜索树的额外约束。"
      },
      {
        "title": "排序",
        "href": "/docs/basic-knowledge/algorithms/sorting",
        "core": true,
        "scope": "解释比较、稳定性和复杂度，用小输入验证排序实现。"
      },
      {
        "title": "递归",
        "href": "/docs/basic-knowledge/algorithms/recursion",
        "core": true,
        "scope": "明确子问题、终止条件与返回含义。"
      },
      {
        "title": "堆",
        "href": "/docs/basic-knowledge/data-structures/heap",
        "core": false
      },
      {
        "title": "回溯",
        "href": "/docs/basic-knowledge/algorithms/backtracking",
        "core": false
      },
      {
        "title": "分治算法",
        "href": "/docs/basic-knowledge/algorithms/divide-and-conquer",
        "core": false
      }
    ]
  },
  "routing": {
    "id": "frontend-routing",
    "title": "前端导航与页面状态",
    "priority": "common",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "能解释前进后退、直接刷新和参数变化时页面怎样更新，并区分导航守卫与服务端鉴权，即可。",
        "前置：浏览器事件和所选框架；Vue 项目继续看 Vue Router 的对应实现。"
      ],
      "interviewQuestions": [
        "客户端路由能跳转，为什么直接刷新却可能得到 404？",
        "切换参数后为什么还需要取消旧请求？"
      ]
    },
    "articles": [
      {
        "title": "前端路由",
        "href": "/docs/frontend/routing/client-routing",
        "core": true,
        "scope": "区分 URL、历史记录、页面状态及服务端回退。"
      }
    ]
  },
  "vue-router": {
    "id": "frontend-vue-router",
    "title": "Vue Router 实践",
    "priority": "common",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "能在 Vue Router 中区分路由组件复用、参数变化与导航守卫，并验证直接访问和后退行为，即可。",
        "前置：前端路由与 Vue 组件。"
      ],
      "interviewQuestions": [
        "同一个路由组件只改变参数，为什么未必重新挂载？"
      ]
    },
    "articles": [
      {
        "title": "Vue Router",
        "href": "/docs/tools-and-frameworks/vue/router",
        "core": true,
        "scope": "重点看参数变化、嵌套路由、守卫与刷新回退。"
      }
    ]
  },
  "react-performance": {
    "id": "frontend-react-performance",
    "title": "React 更新与性能",
    "priority": "common",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "能用一次实际交互说明更新来源、测量证据与优化收益；涉及低优先级更新追问时再解释并发渲染。",
        "前置：React 状态、协调和闭包；不要把每个函数都缓存作为默认方案。"
      ],
      "interviewQuestions": [
        "父组件更新时，memo 是否一定阻止子组件重渲染？"
      ]
    },
    "articles": [
      {
        "title": "React 性能优化",
        "href": "/docs/tools-and-frameworks/react/performance",
        "core": true,
        "scope": "先测量，再判断 memo、useMemo、useCallback 与状态位置是否能减少实际工作。"
      },
      {
        "title": "React 并发渲染",
        "href": "/docs/tools-and-frameworks/react/concurrent-rendering",
        "core": false
      }
    ]
  },
  "ssr-react": {
    "id": "frontend-ssr-react",
    "title": "服务端渲染与 Next.js",
    "priority": "optional",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "仅在目标岗位或项目使用 SSR、Next.js 时准备：能画出请求、服务端渲染、传输与客户端交互的边界，解释缓存和 hydration 失败。",
        "前置：React、路由、HTTP 缓存与构建；涉及 Server Components 时再读深入文章。"
      ],
      "interviewQuestions": [
        "SSR 返回 HTML 后，为什么交互仍可能需要客户端 JavaScript？",
        "用户相关结果被错误共享缓存，会发生什么？"
      ]
    },
    "articles": [
      {
        "title": "Web 渲染模式",
        "href": "/docs/frontend/rendering/rendering-modes",
        "core": true
      },
      {
        "title": "Next.js",
        "href": "/docs/tools-and-frameworks/nextjs/",
        "core": true
      },
      {
        "title": "React Server Components",
        "href": "/docs/tools-and-frameworks/react/server-components",
        "core": false
      },
      {
        "title": "模板引擎",
        "href": "/docs/frontend/rendering/template-engines",
        "core": false
      }
    ]
  },
  "ssr-vue": {
    "id": "frontend-ssr-vue",
    "title": "服务端渲染与 Nuxt",
    "priority": "optional",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "仅在目标岗位或项目使用 SSR、Nuxt 时准备：能画出请求、服务端取数、HTML 与客户端交互的边界，处理 hydration 和请求隔离。",
        "前置：Vue、路由、HTTP 缓存与构建。"
      ],
      "interviewQuestions": [
        "为什么服务端模块顶层的可变用户状态可能影响其他请求？",
        "客户端与服务端首次渲染结果不一致，会带来什么问题？"
      ]
    },
    "articles": [
      {
        "title": "Web 渲染模式",
        "href": "/docs/frontend/rendering/rendering-modes",
        "core": true
      },
      {
        "title": "Nuxt",
        "href": "/docs/tools-and-frameworks/nuxt/",
        "core": true
      },
      {
        "title": "模板引擎",
        "href": "/docs/frontend/rendering/template-engines",
        "core": false
      }
    ]
  },
  "node": {
    "id": "frontend-node",
    "title": "Node.js 与 BFF",
    "priority": "optional",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "仅在需要维护 Node.js 服务、上传处理或 BFF 时准备：能解释事件循环、流式背压、请求取消，以及聚合接口的超时和权限边界。",
        "前置：浏览器异步、HTTP 和模块机制；这一项不替代数据库、部署或完整后端路线。"
      ],
      "interviewQuestions": [
        "接收上传时，为什么不能无界缓存所有分片再写文件？",
        "前端请求已取消，BFF 的下游任务会自动停止吗？"
      ]
    },
    "articles": [
      {
        "title": "Node.js 事件循环",
        "href": "/docs/basic-knowledge/nodejs/event-loop",
        "core": true
      },
      {
        "title": "Buffer 与 Stream",
        "href": "/docs/basic-knowledge/nodejs/buffer-stream",
        "core": true
      },
      {
        "title": "BFF",
        "href": "/docs/system-design/patterns/backend-for-frontend",
        "core": true
      },
      {
        "title": "Node.js 中间件",
        "href": "/docs/tools-and-frameworks/nodejs/middleware",
        "core": false
      },
      {
        "title": "Node.js 模块机制",
        "href": "/docs/basic-knowledge/nodejs/modules",
        "core": false
      },
      {
        "title": "Node.js 进程与线程",
        "href": "/docs/basic-knowledge/nodejs/processes-workers",
        "core": false
      },
      {
        "title": "Node.js 性能分析",
        "href": "/docs/basic-knowledge/nodejs/profiling",
        "core": false
      },
      {
        "title": "Node.js 服务生命周期",
        "href": "/docs/basic-knowledge/nodejs/service-lifecycle",
        "core": false
      },
      {
        "title": "Node.js 数据访问",
        "href": "/docs/tools-and-frameworks/nodejs/data-access",
        "core": false
      },
      {
        "title": "NestJS",
        "href": "/docs/tools-and-frameworks/nodejs/nestjs",
        "core": false
      },
      {
        "title": "GraphQL",
        "href": "/docs/basic-knowledge/network/graphql",
        "core": false
      }
    ]
  },
  "platform": {
    "id": "frontend-platform",
    "title": "小程序与混合应用",
    "priority": "optional",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "只选择目标平台相关部分：小程序说明宿主能力、状态同步与生命周期；混合应用说明 JSBridge 的来源校验、回调和页面销毁。",
        "前置：事件、异步和组件状态；浏览器演示不代替真实宿主或真机验证。"
      ],
      "interviewQuestions": [
        "小程序状态修改后，为什么还要关注视图同步成本？",
        "页面已经离开，原生回调再次到达时怎样处理？"
      ]
    },
    "articles": [
      {
        "title": "小程序",
        "href": "/docs/frontend/platforms/mini-programs",
        "core": true
      },
      {
        "title": "JSBridge",
        "href": "/docs/frontend/browser/jsbridge",
        "core": true
      },
      {
        "title": "浏览器上下文通信",
        "href": "/docs/frontend/browser/cross-context-messaging",
        "core": false
      },
      {
        "title": "浏览器媒体 API",
        "href": "/docs/frontend/browser/media",
        "core": false
      },
      {
        "title": "Service Worker",
        "href": "/docs/frontend/browser/service-worker",
        "core": false
      },
      {
        "title": "WebAssembly",
        "href": "/docs/frontend/browser/webassembly",
        "core": false
      }
    ]
  },
  "graphics": {
    "id": "frontend-graphics",
    "title": "图形与数据可视化",
    "priority": "optional",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "仅在图表、画布编辑器或图形岗位需要时准备：能处理坐标、像素密度、命中判断与更新，说明图形正确性和性能的验证方式。",
        "前置：DOM 事件与渲染；WebGL 只在岗位涉及 GPU 图形时深入。"
      ],
      "interviewQuestions": [
        "CSS 尺寸和 Canvas 位图尺寸不同，会影响哪些结果？",
        "数据缺失时，图表应该怎样表达，为什么不能直接补零？"
      ]
    },
    "articles": [
      {
        "title": "Canvas",
        "href": "/docs/frontend/graphics/canvas",
        "core": true
      },
      {
        "title": "数据可视化",
        "href": "/docs/frontend/graphics/data-visualization",
        "core": true
      },
      {
        "title": "WebGL",
        "href": "/docs/frontend/graphics/webgl",
        "core": false
      }
    ]
  },
  "realtime": {
    "id": "frontend-realtime",
    "title": "实时消息与流式界面",
    "priority": "optional",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "仅在聊天、通知或流式输出项目需要时准备：按双向通信与服务器推送选择协议，解释重连、重复、顺序和页面取消。",
        "前置：HTTP、Promise 和请求状态；展示增量文本不能直接当成可信 HTML。"
      ],
      "interviewQuestions": [
        "连接重建后，怎样知道有没有漏掉或重复处理消息？",
        "传输分块为什么不等于一条完整业务消息？"
      ]
    },
    "articles": [
      {
        "title": "WebSocket",
        "href": "/docs/basic-knowledge/network/websocket",
        "core": true
      },
      {
        "title": "Server-Sent Events",
        "href": "/docs/basic-knowledge/network/server-sent-events",
        "core": true
      }
    ]
  },
  "large-ui": {
    "id": "frontend-large-ui",
    "title": "大型列表与编辑交互",
    "priority": "optional",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "按项目选择虚拟列表或文本编辑器：能说明窗口、滚动定位或选区、组合输入与撤销状态的关系，并验证边界操作。",
        "前置：DOM 事件、渲染与状态管理；无需为了普通表单实现一个编辑器。"
      ],
      "interviewQuestions": [
        "可变高度列表怎样处理滚动位置与高度估计？",
        "组合输入过程中，为什么不能随意重建可编辑 DOM？"
      ]
    },
    "articles": [
      {
        "title": "虚拟列表",
        "href": "/docs/frontend/performance/virtual-list",
        "core": true
      },
      {
        "title": "文本编辑器",
        "href": "/docs/frontend/interaction/text-editors",
        "core": true
      },
      {
        "title": "微前端",
        "href": "/docs/frontend/architecture/micro-frontends",
        "core": false
      }
    ]
  },
  "ai": {
    "id": "frontend-ai",
    "title": "AI 辅助开发与验收",
    "priority": "optional",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "在项目使用过 AI 编程工具或岗位明确询问时准备：选一个真实例子说明任务约束、审查、修正和验证，能独立解释最终代码即可。",
        "前置：项目证据与代码检查；没有实际测量的数据不写成效率提升。"
      ],
      "interviewQuestions": [
        "生成的测试也通过了，为什么仍需核对业务预期与反例？"
      ]
    },
    "articles": [
      {
        "title": "AI 辅助开发",
        "href": "/docs/ai/development/ai-assisted-development",
        "core": true
      }
    ]
  }
};

const phases = [
  {
    "id": "frontend-language-stage",
    "title": "JavaScript 与页面基础",
    "keys": [
      "values",
      "async",
      "layout",
      "browser",
      "requests"
    ]
  },
  {
    "id": "frontend-practice-stage",
    "title": "编码与项目表达",
    "keys": [
      "coding",
      "project"
    ]
  },
  {
    "id": "frontend-engineering-stage",
    "title": "工程机制与场景追问",
    "keys": [
      "typescript",
      "modules",
      "cache",
      "performance",
      "security",
      "interaction",
      "algorithms",
      "routing"
    ]
  },
  {
    "id": "frontend-specialties-stage",
    "title": "按目标岗位与项目选择",
    "keys": [
      "node",
      "platform",
      "graphics",
      "realtime",
      "large-ui",
      "ai"
    ]
  }
];

function sharedPhases(): RoadmapPhase[] {
  return phases.map(phase => ({
    id: phase.id,
    title: phase.title,
    topics: phase.keys.map(key => topics[key]),
  }));
}

export function readFrontendFramework(search: string): FrontendFramework {
  return new URLSearchParams(search).get('framework') === 'vue' ? 'vue' : 'react';
}

export function frontendFrameworkSearch(search: string, framework: FrontendFramework): string {
  const params = new URLSearchParams(search);
  params.set('framework', framework);
  params.set('round', 'first');
  return `?${params.toString()}`;
}

export function getFrontendInterviewRoadmap(framework: FrontendFramework): InterviewRoadmapData {
  const result = sharedPhases();
  result.splice(1, 0, {
    id: `frontend-${framework}-stage`,
    title: framework === 'react' ? '目标框架：React' : '目标框架：Vue',
    topics: [topics[framework]],
  });
  const engineering = result.find(phase => phase.id === 'frontend-engineering-stage')!;
  engineering.topics.push(topics[framework === 'react' ? 'react-performance' : 'vue-router']);
  const specialties = result.find(phase => phase.id === 'frontend-specialties-stage')!;
  specialties.topics.unshift(topics[`ssr-${framework}`]);
  return {
    id: 'frontend',
    questionRoleId: `frontend-${framework}`,
    label: '前端开发',
    title: '前端开发校招复习路线',
    introduction: '先用 JavaScript、HTML 和 CSS 解释一个页面怎样工作，再选择 React 或 Vue，把组件、接口交互和项目证据串起来。第一轮以能独立实现并解释一个小页面为目标，随后补充性能、安全、工程化与算法追问。',
    reviewHint: '第一轮完成八项必会的停止条件即可继续，核心阅读只读标出的范围。React 与 Vue 任选一个目标栈；第二轮补充常考与深入阅读，SSR、Node.js、图形和小程序按 JD 或项目经历选择。已有阅读材料仍在持续复核，不代表覆盖所有企业的题目。',
    phases: result,
  };
}

// The catalog needs both conditional stacks without making both mandatory.
export const frontendInterviewRoadmap: InterviewRoadmapData = {
  ...getFrontendInterviewRoadmap('react'),
  phases: [
    ...sharedPhases(),
    {
      id: 'frontend-framework-options-stage',
      title: '按目标框架选择',
      topics: ['react', 'vue', 'react-performance', 'vue-router', 'ssr-react', 'ssr-vue']
        .map(key => ({...topics[key], priority: 'optional' as const})),
    },
  ],
};
