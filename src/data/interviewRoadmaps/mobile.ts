import {mobileRoleId} from '../../learning/roles';
import type {InterviewRoadmapData, RoadmapPhase, RoadmapTopic} from '../../components/InterviewRoadmap';

// Shared reading plus one selected platform; the role catalog uses the conditional union below.
const topics: Record<string, RoadmapTopic> = {
  "algorithms": {
    "id": "mobile-algorithms",
    "title": "数据结构与现场编码",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "数组",
        "href": "/docs/basic-knowledge/data-structures/array",
        "core": true
      },
      {
        "title": "链表",
        "href": "/docs/basic-knowledge/data-structures/linked-list",
        "core": true
      },
      {
        "title": "哈希表",
        "href": "/docs/basic-knowledge/data-structures/hash-table",
        "core": true
      },
      {
        "title": "二叉树",
        "href": "/docs/basic-knowledge/data-structures/binary-tree",
        "core": true
      },
      {
        "title": "堆",
        "href": "/docs/basic-knowledge/data-structures/heap",
        "core": true
      },
      {
        "title": "二分查找",
        "href": "/docs/basic-knowledge/algorithms/binary-search",
        "core": true
      },
      {
        "title": "排序",
        "href": "/docs/basic-knowledge/algorithms/sorting",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能按输入约束选择结构，独立写出反转链表、二分边界和Top K，并用空输入、重复值和极值自检即可进入平台练习。",
        "用主修语言实现，说明复杂度与身份比较；不要求为读Java示例先学另一门语言。",
        "前置：已经能用主修语言写函数、循环和容器操作。"
      ],
      "interviewQuestions": [
        "反转链表怎样避免丢失后继？",
        "二分为什么会漏掉最后一个候选？",
        "Top K 的k=1怎样处理？"
      ]
    }
  },
  "dp": {
    "id": "mobile-dp",
    "title": "动态规划基础",
    "priority": "common",
    "depth": "mechanism",
    "articles": [
      {
        "title": "动态规划",
        "href": "/docs/basic-knowledge/java/algorithms/dynamic-programming-state-design",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能用一句话定义状态，列出转移来源、初值和计算顺序，并用小输入验证即可。",
        "示例中的Java只用于说明算法，现场用主修语言实现；空间压缩和方案恢复按追问补充。",
        "前置：数组、循环、复杂度与边界自检。"
      ],
      "interviewQuestions": [
        "只记住状态转移式为什么不够？",
        "0/1背包压缩为一维后为什么倒序更新？"
      ]
    }
  },
  "os": {
    "id": "mobile-os",
    "title": "进程、线程与内存",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "进程与线程",
        "href": "/docs/basic-knowledge/operating-system/processes-threads",
        "core": true
      },
      {
        "title": "线程同步",
        "href": "/docs/basic-knowledge/operating-system/synchronization",
        "core": true
      },
      {
        "title": "死锁",
        "href": "/docs/basic-knowledge/operating-system/deadlock",
        "core": true
      },
      {
        "title": "虚拟内存",
        "href": "/docs/basic-knowledge/operating-system/virtual-memory",
        "core": true
      },
      {
        "title": "系统调用",
        "href": "/docs/basic-knowledge/operating-system/system-calls",
        "core": false
      }
    ],
    "details": {
      "outcomes": [
        "沿一次受控内核入口解释参数检查、阻塞和调度的不同责任，不把特权切换等同线程切换。"
      ],
      "interviewQuestions": [
        "调用系统调用一定会切换到另一个线程吗？"
      ]
    },
    "firstRound": {
      "outcomes": [
        "能区分进程资源、线程执行状态、共享数据和对象存续，画出一个等待环并解释同步规则即可。",
        "说明虚拟地址、缺页与内存占用的区别，不把Linux回收参数直接套到移动系统。"
      ],
      "questions": [
        "主线程阻塞和进程被终止分别影响什么？",
        "为什么条件等待要循环检查谓词？"
      ]
    }
  },
  "network": {
    "id": "mobile-network",
    "title": "移动请求的网络基础",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "DNS",
        "href": "/docs/basic-knowledge/network/dns",
        "core": true
      },
      {
        "title": "TCP 与 UDP",
        "href": "/docs/basic-knowledge/network/tcp_udp",
        "core": true
      },
      {
        "title": "TCP 连接",
        "href": "/docs/basic-knowledge/network/tcp_handshake",
        "core": true
      },
      {
        "title": "HTTP",
        "href": "/docs/basic-knowledge/network/http-versions-connection-reuse-timeouts",
        "core": true
      },
      {
        "title": "TLS",
        "href": "/docs/basic-knowledge/network/tls",
        "core": true
      },
      {
        "title": "HTTP 缓存",
        "href": "/docs/basic-knowledge/network/http-cache",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能串起DNS、建连、TLS、HTTP请求与缓存验证，并指出连接失败、响应超时和业务结果未知的区别即可。",
        "解释字节流边界、HTTP/2复用与304，不背平台客户端的未知默认值。",
        "前置：进程与线程、基本网络请求。"
      ],
      "interviewQuestions": [
        "TCP确认收到字节能证明订单提交了吗？",
        "HTTP/2为什么仍可能受TCP丢包影响？",
        "304之后响应体从哪里取得？"
      ]
    }
  },
  "sql": {
    "id": "mobile-sql",
    "title": "本地查询与事务",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "SQL 查询",
        "href": "/docs/basic-knowledge/database/sql/query",
        "core": true
      },
      {
        "title": "SQL 连接",
        "href": "/docs/basic-knowledge/database/sql/joins",
        "core": true
      },
      {
        "title": "数据约束",
        "href": "/docs/basic-knowledge/database/modeling/constraints",
        "core": true
      },
      {
        "title": "SQLite",
        "href": "/docs/basic-knowledge/database/sqlite",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能在SQLite写过滤、稳定排序和关联查询，用事务保存一次本地变化并验证迁移失败即可。",
        "识别MySQL专属方言、InnoDB检查时机与SQLite差异；不要求完成服务器数据库运维。",
        "前置：主修语言的数据模型与文件读写。"
      ],
      "interviewQuestions": [
        "LEFT JOIN的条件放ON和WHERE有什么区别？",
        "迁移失败后怎样避免留下半更新的数据？",
        "唯一约束为什么不能由先查询代替？"
      ]
    }
  },
  "failure": {
    "id": "mobile-failure",
    "title": "取消、重试与重复请求",
    "priority": "must",
    "depth": "scenario",
    "articles": [
      {
        "title": "超时",
        "href": "/docs/system-design/reliability/timeout-budget-cancellation",
        "core": true
      },
      {
        "title": "重试",
        "href": "/docs/system-design/reliability/retry-backoff-jitter-storms",
        "core": true
      },
      {
        "title": "幂等键",
        "href": "/docs/system-design/reliability/idempotency-keys-safe-retries",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能为一次请求设置总预算，取消失效工作，并用稳定操作标识处理结果未知的重试即可。",
        "说明客户端取消、按钮防重与服务端幂等分别保证什么。",
        "前置：HTTP请求与失败状态。"
      ],
      "interviewQuestions": [
        "超时后为什么不能直接再发一次支付？",
        "连续重试为什么会加重故障？"
      ]
    }
  },
  "security": {
    "id": "mobile-security",
    "title": "身份与资源授权",
    "priority": "must",
    "depth": "foundation",
    "articles": [
      {
        "title": "认证与授权",
        "href": "/docs/system-design/security/authentication-authorization-trust-boundaries",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能区分登录身份、资源授权与系统权限，说明服务器为什么仍要核对资源归属即可。",
        "不把客户端隐藏按钮、可信网络或已登录状态当成授权。",
        "前置：请求与响应。"
      ],
      "interviewQuestions": [
        "登录成功后改订单ID，服务端还应检查什么？",
        "相册授权和业务访问令牌有什么区别？"
      ]
    }
  },
  "testing": {
    "id": "mobile-testing",
    "title": "测试范围与替身",
    "priority": "must",
    "depth": "scenario",
    "articles": [
      {
        "title": "测试金字塔",
        "href": "/docs/basic-knowledge/java/quality/test-pyramid-contract-regression",
        "core": true
      },
      {
        "title": "测试替身",
        "href": "/docs/basic-knowledge/java/quality/test-doubles-mock-stub-boundaries",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能为一条列表加载流程分别安排逻辑、真实集成和设备测试，说明替身没有执行哪些行为即可。",
        "断言检查外部结果，保留失败触发条件；覆盖率和一次重跑通过不证明全部行为正确。",
        "前置：主修语言基本代码与可观察结果。"
      ],
      "interviewQuestions": [
        "Mock网络成功后还缺哪些证据？",
        "偶发失败重跑通过，能直接删除失败记录吗？"
      ]
    }
  },
  "git": {
    "id": "mobile-git",
    "title": "提交、分支与撤销",
    "priority": "must",
    "depth": "foundation",
    "articles": [
      {
        "title": "Git",
        "href": "/docs/tools-and-frameworks/git/",
        "core": true
      },
      {
        "title": "使用 Git 进行第一次提交",
        "href": "/docs/tools-and-frameworks/git/basic-usages/first-commit",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能在练习仓库确认工作区、暂存区与提交差异，解决一次冲突并说明何时用revert即可。",
        "提交可运行的修改，区分本地提交与推送，不改写他人已经依赖的历史。"
      ],
      "interviewQuestions": [
        "git add之后又修改文件，提交包含哪一版？",
        "merge和rebase怎样影响已有提交？"
      ]
    }
  },
  "sync": {
    "id": "mobile-sync",
    "title": "客户端状态与数据同步",
    "priority": "must",
    "depth": "scenario",
    "articles": [
      {
        "title": "客户端数据同步",
        "href": "/docs/mobile/common/data-synchronization",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能给内存、本地记录与远端数据明确所有者，复现断网、重连、过期响应和重复提交即可。",
        "第一轮说明缓存刷新与业务同步；冲突合并按项目约束选择，不追求所有同步算法。",
        "前置：本地事务、HTTP缓存、取消与幂等。"
      ],
      "interviewQuestions": [
        "旧请求晚于新请求返回时，怎样防止界面倒退？",
        "离线修改与服务器更新冲突时，谁决定合并规则？"
      ]
    }
  },
  "images": {
    "id": "mobile-images",
    "title": "图片加载与列表复用",
    "priority": "common",
    "depth": "scenario",
    "articles": [
      {
        "title": "移动端图片加载",
        "href": "/docs/mobile/common/image-loading",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能从请求、解码、缩放、缓存到显示解释成本，用请求取消和身份检查复现并修复列表错图即可。",
        "前置：所选平台列表生命周期、网络与内存。"
      ],
      "interviewQuestions": [
        "只取消网络请求就能避免复用单元显示旧图吗？",
        "压缩图片很小，解码后内存为什么仍很大？"
      ]
    }
  },
  "metrics": {
    "id": "mobile-metrics",
    "title": "移动端性能测量",
    "priority": "must",
    "depth": "scenario",
    "articles": [
      {
        "title": "移动端性能指标",
        "href": "/docs/mobile/common/performance-metrics",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能为启动、滚动或内存固定设备、构建类型、数据和指标，给出可比较的前后证据即可。",
        "区分主观体验、采样观察与归因，平台诊断工具在主线中继续练习。",
        "前置：所选平台页面与线程执行。"
      ],
      "interviewQuestions": [
        "debug构建的耗时能代表发布构建吗？",
        "优化后平均帧耗时降低，是否足以证明没有卡顿？"
      ]
    }
  },
  "project": {
    "id": "mobile-project",
    "title": "项目与面试表达",
    "priority": "must",
    "depth": "scenario",
    "articles": [
      {
        "title": "项目准备",
        "href": "/docs/interview/project-preparation",
        "core": true
      },
      {
        "title": "简历准备",
        "href": "/docs/interview/resume",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能用两分钟讲清自己负责的链路、一个技术选择和一次有证据的故障处理，再独立回答追问即可。",
        "只复用材料结构与真实性要求；Java后端教学示例需换成自己的移动项目。",
        "展示可安装产物与验证范围，区分模拟器、真机、替身及尚未触达的状态。",
        "前置：完成所选平台的列表、详情与失败恢复练习。"
      ],
      "interviewQuestions": [
        "这次改动由你完成了哪一部分？",
        "性能结果的设备、基线、数据量和失败边界是什么？"
      ]
    }
  },
  "machine": {
    "id": "mobile-machine",
    "title": "指令与二进制数据",
    "priority": "optional",
    "depth": "foundation",
    "articles": [
      {
        "title": "指令执行",
        "href": "/docs/basic-knowledge/computer-architecture/instruction-execution",
        "core": true
      },
      {
        "title": "二进制数据表示",
        "href": "/docs/basic-knowledge/computer-architecture/data-representation",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "目标面试涉及机器执行、二进制协议或原生代码时学习。",
        "能解释函数调用中的栈帧与寄存器职责，按字节序解读整数和编码数据即可；不背完整ABI。",
        "前置：进程线程与基本类型。"
      ],
      "interviewQuestions": [
        "栈帧是不是整个线程栈？",
        "同一组字节在不同字节序下怎样解释？"
      ]
    }
  },
  "cpp-types": {
    "id": "mobile-cpp-types",
    "title": "C++ 类型与对象生命周期",
    "priority": "optional",
    "depth": "mechanism",
    "articles": [
      {
        "title": "C++ 类型系统",
        "href": "/docs/basic-knowledge/cpp/type-system",
        "core": true
      },
      {
        "title": "C++ 指针与引用",
        "href": "/docs/basic-knowledge/cpp/pointers-references",
        "core": true
      },
      {
        "title": "C++ 对象生命周期",
        "href": "/docs/basic-knowledge/cpp/object-lifetime",
        "core": true
      },
      {
        "title": "C++ 复制与移动",
        "href": "/docs/basic-knowledge/cpp/copy-move",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "目标面试明确考C/C++，或项目包含JNI、原生库时学习；无需所有移动端读者通学。",
        "能区分值、指针与引用，追踪对象创建销毁、悬空引用及复制移动后的状态，并用RAII说明资源责任即可。",
        "前置：主修语言类型与对象基础。"
      ],
      "interviewQuestions": [
        "const修饰对象和指针分别约束什么？",
        "返回局部对象的引用为什么会悬空？",
        "std::move本身会转移资源吗？"
      ]
    }
  },
  "cpp-tools": {
    "id": "mobile-cpp-tools",
    "title": "C++ 抽象、容器与构建",
    "priority": "optional",
    "depth": "mechanism",
    "articles": [
      {
        "title": "C++ 多态",
        "href": "/docs/basic-knowledge/cpp/polymorphism",
        "core": true
      },
      {
        "title": "C++ 智能指针",
        "href": "/docs/basic-knowledge/cpp/smart-pointers",
        "core": true
      },
      {
        "title": "C++ 容器",
        "href": "/docs/basic-knowledge/cpp/containers",
        "core": true
      },
      {
        "title": "C++ 编译与链接",
        "href": "/docs/basic-knowledge/cpp/compilation-linking",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "承接原生库或C++语言题时学习。",
        "能说明虚析构、切片、共享计数环和迭代器失效，区分编译、链接与加载问题即可。",
        "前置：C++类型、对象生命周期与复制移动。"
      ],
      "interviewQuestions": [
        "通过基类指针删除对象，析构函数有什么要求？",
        "vector扩容后保存的指针还能使用吗？"
      ]
    }
  },
  "media": {
    "id": "mobile-media",
    "title": "媒体与图形管线",
    "priority": "optional",
    "depth": "mechanism",
    "articles": [
      {
        "title": "媒体播放",
        "href": "/docs/mobile/common/media-playback",
        "core": true
      },
      {
        "title": "图形渲染管线",
        "href": "/docs/mobile/common/rendering-pipeline",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "岗位或项目涉及播放器、图形、相机或自定义渲染时学习。",
        "能沿媒体读取、解封装、解码、缓冲、时钟与输出说明一次播放，区分CPU提交、GPU绘制、合成与显示即可。",
        "依据实际平台验证；不把离屏像素检查当成屏幕帧率验收。",
        "前置：线程、网络、内存与所选平台UI。"
      ],
      "interviewQuestions": [
        "播放进度跳转后如何恢复音视频同步？",
        "GPU完成绘制是否代表用户已经看到这一帧？"
      ]
    }
  },
  "android-java": {
    "id": "mobile-android-java",
    "title": "Java 语言与容器",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "Java 值传递",
        "href": "/docs/basic-knowledge/java/language/types-references-value-passing",
        "core": true
      },
      {
        "title": "对象相等性",
        "href": "/docs/basic-knowledge/java/language/equals-hashcode-object-identity",
        "core": true
      },
      {
        "title": "Java 泛型",
        "href": "/docs/basic-knowledge/java/language/generics",
        "core": true
      },
      {
        "title": "String",
        "href": "/docs/basic-knowledge/java/language/string-immutability-pool",
        "core": true
      },
      {
        "title": "Java 集合框架",
        "href": "/docs/basic-knowledge/java/collections/collection-interface-selection",
        "core": true
      },
      {
        "title": "ArrayList",
        "href": "/docs/basic-knowledge/java/collections/arraylist-growth-memory-locality",
        "core": true
      },
      {
        "title": "HashMap",
        "href": "/docs/basic-knowledge/java/collections/hashmap-structure-lookup-path",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能解释值传递、相等性、泛型读写约束与容器选择，用自己的Java代码验证空值和可变键即可。",
        "类库API与实现细节按Android版本核对，不照搬HotSpot布局与Java21全部API。",
        "前置：基本Java语法。"
      ],
      "interviewQuestions": [
        "修改形参为什么有时能改变调用方看到的对象？",
        "用可变字段做HashMap键会怎样？"
      ]
    }
  },
  "android-java-interop": {
    "id": "mobile-android-java-interop",
    "title": "Java 互操作基础",
    "priority": "common",
    "depth": "mechanism",
    "articles": [
      {
        "title": "Java 值传递",
        "href": "/docs/basic-knowledge/java/language/types-references-value-passing",
        "core": true
      },
      {
        "title": "对象相等性",
        "href": "/docs/basic-knowledge/java/language/equals-hashcode-object-identity",
        "core": true
      },
      {
        "title": "Java 泛型",
        "href": "/docs/basic-knowledge/java/language/generics",
        "core": true
      },
      {
        "title": "String",
        "href": "/docs/basic-knowledge/java/language/string-immutability-pool",
        "core": true
      },
      {
        "title": "Java 集合框架",
        "href": "/docs/basic-knowledge/java/collections/collection-interface-selection",
        "core": true
      },
      {
        "title": "ArrayList",
        "href": "/docs/basic-knowledge/java/collections/arraylist-growth-memory-locality",
        "core": true
      },
      {
        "title": "HashMap",
        "href": "/docs/basic-knowledge/java/collections/hashmap-structure-lookup-path",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能读懂Kotlin调用的Java接口，解释平台类型、泛型边界、相等性与可变容器即可。",
        "只补项目所需的Java契约；不要求将Java作为第二门完整主修语言。",
        "前置：Kotlin类型、空安全与泛型。"
      ],
      "interviewQuestions": [
        "Java接口可能返回null时，Kotlin调用方怎么处理？",
        "Kotlin只读集合是否保证底层对象不可变？"
      ]
    }
  },
  "android-kotlin": {
    "id": "mobile-android-kotlin",
    "title": "Kotlin 类型、函数与泛型",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "Kotlin 类型系统",
        "href": "/docs/basic-knowledge/kotlin/type-system",
        "core": true
      },
      {
        "title": "Kotlin 空安全",
        "href": "/docs/basic-knowledge/kotlin/null-safety",
        "core": true
      },
      {
        "title": "Kotlin 类与接口",
        "href": "/docs/basic-knowledge/kotlin/classes-interfaces",
        "core": true
      },
      {
        "title": "Kotlin 函数",
        "href": "/docs/basic-knowledge/kotlin/functions",
        "core": true
      },
      {
        "title": "Kotlin 泛型",
        "href": "/docs/basic-knowledge/kotlin/generics",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能解释可空类型、智能转换、val、数据类、扩展函数与泛型投影，并用最小程序验证Java互操作即可。",
        "前置：变量、函数和对象基础。"
      ],
      "interviewQuestions": [
        "val为什么不等于对象不可变？",
        "扩展函数与成员函数如何决定调用目标？"
      ]
    }
  },
  "android-coroutines": {
    "id": "mobile-android-coroutines",
    "title": "Kotlin 协程与Flow",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "Kotlin 协程",
        "href": "/docs/basic-knowledge/kotlin/coroutines",
        "core": true
      },
      {
        "title": "Kotlin Flow",
        "href": "/docs/basic-knowledge/kotlin/flow",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能区分挂起与阻塞、解释父子任务取消和异常传播，并按状态或事件选择Flow类型即可。",
        "通过生命周期结束后不更新旧页面的案例自检，不把suspend当成后台线程。",
        "前置：Kotlin函数、线程与取消。"
      ],
      "interviewQuestions": [
        "挂起函数一定在后台线程运行吗？",
        "StateFlow与SharedFlow适合保存什么？"
      ]
    }
  },
  "android-java-concurrency": {
    "id": "mobile-android-java-concurrency",
    "title": "Android 的Java并发基础",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "线程安全",
        "href": "/docs/basic-knowledge/java/concurrency/thread-safety-race-conditions",
        "core": true
      },
      {
        "title": "Java 内存模型",
        "href": "/docs/basic-knowledge/java/concurrency/jmm-happens-before",
        "core": true
      },
      {
        "title": "synchronized",
        "href": "/docs/basic-knowledge/java/concurrency/synchronized-monitor-optimizations",
        "core": true
      },
      {
        "title": "volatile",
        "href": "/docs/basic-knowledge/java/concurrency/volatile-barriers-visibility",
        "core": true
      },
      {
        "title": "Java 线程池",
        "href": "/docs/basic-knowledge/java/concurrency/threadpoolexecutor-execution-path",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能找出共享状态，用同锁或发布关系解释可见性，分析线程池排队与拒绝即可。",
        "停止条件限定Java语言/API；HotSpot锁优化、JFR和虚拟线程不作为ART要求。",
        "前置：Java或Kotlin的对象与共享状态。"
      ],
      "interviewQuestions": [
        "volatile为什么不能让递增整体原子？",
        "在线程池的提交线程执行慢任务，会影响UI吗？"
      ]
    }
  },
  "android-lifecycle": {
    "id": "mobile-android-lifecycle",
    "title": "Android 组件与页面生命周期",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "Android 应用组件",
        "href": "/docs/mobile/android/app-components",
        "core": true
      },
      {
        "title": "Activity 生命周期",
        "href": "/docs/mobile/android/activity-lifecycle",
        "core": true
      },
      {
        "title": "Fragment 生命周期",
        "href": "/docs/mobile/android/fragment-lifecycle",
        "core": true
      },
      {
        "title": "Android 任务栈",
        "href": "/docs/mobile/android/task-back-stack",
        "core": false
      }
    ],
    "details": {
      "outcomes": [
        "按Intent标志与启动模式推演任务栈和返回行为，核对页面实例与任务归属。"
      ],
      "interviewQuestions": [
        "重复打开详情页时，新的Intent交给哪个实例？"
      ]
    },
    "firstRound": {
      "outcomes": [
        "能区分组件职责、Activity与Fragment视图生命周期，复现配置变化与进程重建后的状态恢复即可。",
        "不依赖退出前一定执行清理回调。",
        "前置：进程、对象生命周期与主修语言。"
      ],
      "questions": [
        "旋转后数据应该放ViewModel还是磁盘？",
        "Fragment对象仍在，为什么视图可能已销毁？"
      ]
    }
  },
  "android-messages": {
    "id": "mobile-android-messages",
    "title": "Android 消息机制",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "Android 消息机制",
        "href": "/docs/mobile/android/handler-looper",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能沿入队、唤醒、分发解释执行线程，指出长任务、延迟消息与引用持有的影响即可。",
        "前置：线程、队列与生命周期。"
      ],
      "interviewQuestions": [
        "Handler指定了后台Looper，回调在哪个线程？",
        "主线程消息队列空时是否一直忙循环？"
      ]
    }
  },
  "android-ui": {
    "id": "mobile-android-ui",
    "title": "View、触摸与列表",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "Android View",
        "href": "/docs/mobile/android/view-layout-drawing",
        "core": true
      },
      {
        "title": "Android 触摸事件",
        "href": "/docs/mobile/android/touch-events",
        "core": true
      },
      {
        "title": "RecyclerView",
        "href": "/docs/mobile/android/recyclerview",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能解释测量、布局、绘制与触摸目标，完成复用列表并复现身份错误或事件冲突即可。",
        "前置：页面生命周期、树与坐标。"
      ],
      "interviewQuestions": [
        "measure与layout分别决定什么？",
        "父容器拦截后原触摸目标会收到什么？",
        "复用单元怎样确认异步结果仍属于当前条目？"
      ]
    }
  },
  "android-state": {
    "id": "mobile-android-state",
    "title": "ViewModel 与界面状态",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "Android ViewModel",
        "href": "/docs/mobile/android/viewmodel",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能划分UI、状态持有者与数据来源，说明ViewModel、保存状态和持久化数据各能跨越哪些重建即可。",
        "前置：生命周期与取消。"
      ],
      "interviewQuestions": [
        "ViewModel能保证进程被杀后数据还在吗？",
        "请求结果晚于页面销毁返回时谁负责处理？"
      ]
    }
  },
  "android-storage": {
    "id": "mobile-android-storage",
    "title": "Android 本地数据",
    "priority": "common",
    "depth": "mechanism",
    "articles": [
      {
        "title": "Room",
        "href": "/docs/mobile/android/room",
        "core": true
      },
      {
        "title": "Android DataStore",
        "href": "/docs/mobile/android/datastore",
        "core": true
      },
      {
        "title": "Android 偏好存储",
        "href": "/docs/mobile/android/preferences",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能按数据模型选择Room、DataStore或偏好存储，验证迁移、并发更新与失败恢复即可。",
        "项目使用某项存储时，把对应文章提前到第一轮；不要求同时使用全部库。",
        "前置：SQLite、协程或Java异步调用。"
      ],
      "interviewQuestions": [
        "DataStore与SharedPreferences的更新和错误处理有什么不同？",
        "Room升级失败时怎样保护已有记录？"
      ]
    }
  },
  "android-network": {
    "id": "mobile-android-network",
    "title": "OkHttp 与Retrofit",
    "priority": "common",
    "depth": "mechanism",
    "articles": [
      {
        "title": "OkHttp",
        "href": "/docs/mobile/android/okhttp",
        "core": true
      },
      {
        "title": "Retrofit",
        "href": "/docs/mobile/android/retrofit",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能沿调用、拦截器、连接、转换与响应消费解释请求，处理取消与资源关闭即可。",
        "项目采用这些库时提前完成；区分业务重试与客户端内部重试。",
        "前置：HTTP、TLS、缓存、泛型与取消。"
      ],
      "interviewQuestions": [
        "应用拦截器与网络拦截器观察的范围有何不同？",
        "Retrofit声明接口之后由谁真正发送网络请求？"
      ]
    }
  },
  "android-rx": {
    "id": "mobile-android-rx",
    "title": "RxJava 异步流",
    "priority": "common",
    "depth": "mechanism",
    "articles": [
      {
        "title": "RxJava",
        "href": "/docs/tools-and-frameworks/rxjava",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能按subscribeOn、observeOn与操作符解释线程和订阅，验证取消与错误传播即可；项目未使用时放在核心之后。",
        "前置：Java泛型、函数与线程。"
      ],
      "interviewQuestions": [
        "subscribeOn与observeOn影响哪一段？",
        "flatMap怎样改变结果顺序和并发？"
      ]
    }
  },
  "android-runtime": {
    "id": "mobile-android-runtime",
    "title": "ART、Binder 与Parcelable",
    "priority": "common",
    "depth": "mechanism",
    "articles": [
      {
        "title": "ART",
        "href": "/docs/mobile/android/art",
        "core": true
      },
      {
        "title": "Binder",
        "href": "/docs/mobile/android/binder",
        "core": true
      },
      {
        "title": "Parcelable",
        "href": "/docs/mobile/android/parcelable",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能说明ART的执行与回收职责，区分Binder跨进程调用和普通调用，解释Parcel的传输用途即可。",
        "不把Parcel当成长期存储格式，不背所有驱动细节。",
        "前置：进程隔离、Java语言和系统调用。"
      ],
      "interviewQuestions": [
        "Binder调用为什么要处理线程、大小与进程死亡？",
        "ART与HotSpot的实现细节可以互相套用吗？"
      ]
    }
  },
  "android-permissions": {
    "id": "mobile-android-permissions",
    "title": "Android 沙箱与权限",
    "priority": "must",
    "depth": "foundation",
    "articles": [
      {
        "title": "Android 应用沙箱与权限",
        "href": "/docs/mobile/android/sandbox-permissions",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能区分UID沙箱、系统授权与业务鉴权，验证拒绝路径并选择合适的敏感数据存储即可。",
        "前置：组件生命周期、文件与信任边界。"
      ],
      "interviewQuestions": [
        "有文件路径就一定有权访问吗？",
        "用户拒绝权限时业务怎样继续或退出？"
      ]
    }
  },
  "android-background": {
    "id": "mobile-android-background",
    "title": "Android 后台工作",
    "priority": "common",
    "depth": "mechanism",
    "articles": [
      {
        "title": "Android 后台任务",
        "href": "/docs/mobile/android/background-work",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能按任务是否需延后、持续与恢复选择执行方式，说明线程、Service、前台服务和WorkManager的责任即可。",
        "前置：进程与组件生命周期、取消。"
      ],
      "interviewQuestions": [
        "创建Service为什么不等于开后台线程？",
        "应用退出后仍需完成的工作怎样安排？"
      ]
    }
  },
  "android-stability": {
    "id": "mobile-android-stability",
    "title": "Android 内存与卡顿诊断",
    "priority": "must",
    "depth": "scenario",
    "articles": [
      {
        "title": "Android 内存泄漏",
        "href": "/docs/mobile/android/memory-leaks",
        "core": true
      },
      {
        "title": "ANR",
        "href": "/docs/mobile/android/anr",
        "core": true
      },
      {
        "title": "Android 性能诊断",
        "href": "/docs/mobile/android/performance-diagnostics",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能根据引用链与线程栈区分泄漏、计算、锁等待和I/O，用trace与同条件测量验证一次修复即可。",
        "区分卡顿、ANR和进程终止，不只根据单条日志归因。",
        "前置：生命周期、消息机制、内存与性能指标。"
      ],
      "interviewQuestions": [
        "被销毁Activity仍然存活，怎样找出持有路径？",
        "CPU不高但出现ANR，应先看哪些线程？"
      ]
    }
  },
  "android-delivery": {
    "id": "mobile-android-delivery",
    "title": "Android 构建与测试",
    "priority": "must",
    "depth": "scenario",
    "articles": [
      {
        "title": "Android 构建",
        "href": "/docs/mobile/android/build",
        "core": true
      },
      {
        "title": "Android 测试",
        "href": "/docs/mobile/android/testing",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能解释源码到安装包、签名与映射文件的作用，完成逻辑测试和至少一个设备流程即可。",
        "复现旋转、进程重建、弱网与权限拒绝；说明未验证的设备和版本。",
        "前置：Git、生命周期、状态与测试范围。"
      ],
      "interviewQuestions": [
        "R8处理后怎样把崩溃栈还原到源码？",
        "本地单元测试通过，哪些平台行为仍需设备验证？"
      ]
    }
  },
  "android-compose": {
    "id": "mobile-android-compose",
    "title": "Jetpack Compose",
    "priority": "optional",
    "depth": "mechanism",
    "articles": [
      {
        "title": "Jetpack Compose",
        "href": "/docs/mobile/android/jetpack-compose",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "JD或项目使用Compose时提前到第一轮；其他读者按岗选学。",
        "能说明状态读取、重组、身份和副作用生命周期，完成列表更新与状态恢复即可。",
        "前置：Kotlin函数、生命周期与布局。"
      ],
      "interviewQuestions": [
        "重组为什么不等于每次都重新绘制？",
        "remember与可保存状态分别能跨过什么？"
      ]
    }
  },
  "android-web": {
    "id": "mobile-android-web",
    "title": "Android WebView",
    "priority": "optional",
    "depth": "scenario",
    "articles": [
      {
        "title": "JSBridge",
        "href": "/docs/frontend/browser/jsbridge",
        "core": true
      },
      {
        "title": "Android WebView",
        "href": "/docs/mobile/android/webview",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "项目包含混合页面或网页与原生通信时学习。",
        "能说明网页导航、消息协议与原生入口授权，验证不可信页面、frame和页面销毁时的行为即可。",
        "前置：HTTP、信任边界与Activity生命周期。"
      ],
      "interviewQuestions": [
        "网页发来一个方法名，宿主能直接反射执行吗？",
        "导航后旧请求回调如何作废？"
      ]
    }
  },
  "android-native": {
    "id": "mobile-android-native",
    "title": "JNI 与动态加载",
    "priority": "optional",
    "depth": "mechanism",
    "articles": [
      {
        "title": "JNI",
        "href": "/docs/mobile/android/jni",
        "core": true
      },
      {
        "title": "Android 动态加载",
        "href": "/docs/mobile/android/dynamic-loading",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "岗位或项目实际使用原生库、插件或动态加载时学习。",
        "能解释JNI线程关联、引用和异常边界，说明动态加载的类、资源与版本约束即可。",
        "不把历史热修复方案当成所有现代环境的可行方案。",
        "前置：C++类型与资源管理、编译链接、ART与Android构建。"
      ],
      "interviewQuestions": [
        "JNI局部引用能直接跨线程保存吗？",
        "加载了代码是否意味着资源和组件也自动生效？"
      ]
    }
  },
  "ios-swift": {
    "id": "mobile-ios-swift",
    "title": "Swift 类型与闭包",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "Swift 类型系统",
        "href": "/docs/basic-knowledge/swift/type-system",
        "core": true
      },
      {
        "title": "Swift Optional",
        "href": "/docs/basic-knowledge/swift/optional",
        "core": true
      },
      {
        "title": "Swift 协议与泛型",
        "href": "/docs/basic-knowledge/swift/protocols-generics",
        "core": true
      },
      {
        "title": "Swift 闭包",
        "href": "/docs/basic-knowledge/swift/closures",
        "core": true
      },
      {
        "title": "Swift ARC",
        "href": "/docs/basic-knowledge/swift/arc",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能解释值语义、Optional、协议泛型与闭包捕获，画出强引用环并选择weak或unowned即可。",
        "不把ARC当成线程安全，也不机械给所有闭包添加weak。",
        "前置：函数、对象与生命周期。"
      ],
      "interviewQuestions": [
        "结构体复制后引用字段是否仍可能共享对象？",
        "unowned在对象先销毁时会发生什么？"
      ]
    }
  },
  "ios-objc": {
    "id": "mobile-ios-objc",
    "title": "Objective-C 对象与内存",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "Objective-C 对象模型",
        "href": "/docs/basic-knowledge/objective-c/object-model",
        "core": true
      },
      {
        "title": "Objective-C Block",
        "href": "/docs/basic-knowledge/objective-c/block",
        "core": true
      },
      {
        "title": "Objective-C 内存管理",
        "href": "/docs/basic-knowledge/objective-c/memory-management",
        "core": true
      },
      {
        "title": "Objective-C Runtime",
        "href": "/docs/basic-knowledge/objective-c/runtime",
        "core": false
      }
    ],
    "details": {
      "outcomes": [
        "沿消息查找与转发解释Runtime，区分类别、关联对象、KVC和KVO的职责；源码细节按实际追问展开。"
      ],
      "interviewQuestions": [
        "消息找不到实现时，会经历哪些处理机会？"
      ]
    },
    "firstRound": {
      "outcomes": [
        "能解释对象、属性、Block与自动释放池，追踪引用计数和弱引用关系即可。",
        "前置：对象、指针的基本含义。"
      ],
      "questions": [
        "copy属性与strong属性对可变对象有什么不同？",
        "Block怎样捕获对象并形成引用环？"
      ]
    }
  },
  "ios-objc-basics": {
    "id": "mobile-ios-objc-basics",
    "title": "Objective-C 互操作与消息基础",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "Objective-C 对象模型",
        "href": "/docs/basic-knowledge/objective-c/object-model",
        "core": true
      },
      {
        "title": "Objective-C 内存管理",
        "href": "/docs/basic-knowledge/objective-c/memory-management",
        "core": true
      },
      {
        "title": "Objective-C Runtime",
        "href": "/docs/basic-knowledge/objective-c/runtime",
        "core": true
      },
      {
        "title": "Objective-C Block",
        "href": "/docs/basic-knowledge/objective-c/block",
        "core": false
      }
    ],
    "details": {
      "outcomes": [
        "混编接口或项目使用Block时，解释捕获、堆栈存续和循环引用，并与Swift闭包的实际桥接边界区分。"
      ],
      "interviewQuestions": [
        "Block持有对象后，哪条引用导致对象不能销毁？"
      ]
    },
    "firstRound": {
      "outcomes": [
        "Swift主修读者能说明Objective-C对象、消息派发与引用计数的基本链路即可。",
        "只补平台与混编所需的基础；完整转发、类别技巧和Runtime源码放在具体岗位追问中。",
        "前置：主修语言的对象与内存管理。"
      ],
      "questions": [
        "给Objective-C对象发送消息与C函数调用有什么区别？",
        "自动释放池为什么不等于垃圾回收？"
      ]
    }
  },
  "ios-swift-elective": {
    "id": "mobile-ios-swift-elective",
    "title": "Swift 互操作与并发",
    "priority": "optional",
    "depth": "mechanism",
    "articles": [
      {
        "title": "Swift 类型系统",
        "href": "/docs/basic-knowledge/swift/type-system",
        "core": true
      },
      {
        "title": "Swift Optional",
        "href": "/docs/basic-knowledge/swift/optional",
        "core": true
      },
      {
        "title": "Swift 协议与泛型",
        "href": "/docs/basic-knowledge/swift/protocols-generics",
        "core": true
      },
      {
        "title": "Swift 闭包",
        "href": "/docs/basic-knowledge/swift/closures",
        "core": true
      },
      {
        "title": "Swift ARC",
        "href": "/docs/basic-knowledge/swift/arc",
        "core": true
      },
      {
        "title": "Swift 并发",
        "href": "/docs/basic-knowledge/swift/concurrency",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "Objective-C主修岗位遇到Swift混编、SwiftUI或Swift并发要求时学习。",
        "Objective-C主修项目需要Swift模块时，先补类型、Optional与闭包，再解释ARC、Task和actor隔离即可。",
        "前置：Objective-C对象、内存与线程。"
      ],
      "interviewQuestions": [
        "Swift值类型与Objective-C对象如何跨接口交接？",
        "actor为何仍可能在挂起后观察到状态变化？"
      ]
    }
  },
  "ios-lifecycle": {
    "id": "mobile-ios-lifecycle",
    "title": "iOS 应用与页面",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "iOS 应用生命周期",
        "href": "/docs/mobile/ios/app-lifecycle",
        "core": true
      },
      {
        "title": "UIViewController",
        "href": "/docs/mobile/ios/view-controller",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能区分App、Scene与页面生命周期，完成导航和前后台恢复，说明页面消失与对象销毁的区别即可。",
        "前置：主修语言对象与进程线程。"
      ],
      "interviewQuestions": [
        "viewDidDisappear后对象一定销毁吗？",
        "进程被系统终止前一定会收到清理回调吗？"
      ]
    }
  },
  "ios-ui": {
    "id": "mobile-ios-ui",
    "title": "UIKit 布局、事件与列表",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "UIKit 布局",
        "href": "/docs/mobile/ios/uikit-layout",
        "core": true
      },
      {
        "title": "iOS 事件响应链",
        "href": "/docs/mobile/ios/responder-chain",
        "core": true
      },
      {
        "title": "iOS 列表视图",
        "href": "/docs/mobile/ios/list-views",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能按约束与视图层级解释布局，沿命中测试找到事件目标，验证列表复用与异步图片身份即可。",
        "前置：页面生命周期、树与坐标。"
      ],
      "interviewQuestions": [
        "约束冲突与布局时机怎样定位？",
        "透明或越界子视图一定能够接收触摸吗？"
      ]
    }
  },
  "ios-gcd": {
    "id": "mobile-ios-gcd",
    "title": "Grand Central Dispatch",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "Grand Central Dispatch",
        "href": "/docs/mobile/ios/gcd",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能区分队列与线程、同步与串行，画出等待关系并解释主队列自锁即可。",
        "任务并发不等于修改共享数据自动安全。",
        "前置：线程、同步与死锁。"
      ],
      "interviewQuestions": [
        "同步提交到当前串行队列为什么可能无法返回？",
        "串行队列是否总使用同一条线程？"
      ]
    }
  },
  "ios-runloop": {
    "id": "mobile-ios-runloop",
    "title": "RunLoop",
    "priority": "common",
    "depth": "mechanism",
    "articles": [
      {
        "title": "RunLoop",
        "href": "/docs/mobile/ios/run-loop",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能解释事件源、Timer与运行模式，分析模式切换对回调时机的影响即可；不把一次实验推广成所有系统时序。",
        "前置：线程与事件驱动。"
      ],
      "interviewQuestions": [
        "Timer到期后为什么不一定立刻执行？",
        "RunLoop与GCD队列各管理什么？"
      ]
    }
  },
  "ios-concurrency": {
    "id": "mobile-ios-concurrency",
    "title": "Swift 并发",
    "priority": "common",
    "depth": "mechanism",
    "articles": [
      {
        "title": "Swift 并发",
        "href": "/docs/basic-knowledge/swift/concurrency",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能解释Task父子关系、协作取消、actor重入与MainActor，验证取消后不提交过期结果即可。",
        "Swift并发项目应把本项提前到第一轮。",
        "前置：Swift闭包、ARC与并发基础。"
      ],
      "interviewQuestions": [
        "actor为什么不能让跨await的不变量自动成立？",
        "取消Task后，底层请求会自动停止吗？"
      ]
    }
  },
  "ios-data": {
    "id": "mobile-ios-data",
    "title": "URLSession 与持久化",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "URLSession",
        "href": "/docs/mobile/ios/url-session",
        "core": true
      },
      {
        "title": "iOS 数据持久化",
        "href": "/docs/mobile/ios/persistence",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能管理请求结果与页面存续，选择文件、偏好、Keychain或对象持久化，验证取消、错误和离线读取即可。",
        "Core Data与SwiftData深入按项目选择，不能当成SQLite API的简单别名。",
        "前置：HTTP、缓存、取消与本地事务。"
      ],
      "interviewQuestions": [
        "请求完成时页面已销毁，结果由谁处理？",
        "访问令牌为什么不应按普通偏好保存？"
      ]
    }
  },
  "ios-privacy": {
    "id": "mobile-ios-privacy",
    "title": "iOS 沙箱与权限",
    "priority": "must",
    "depth": "foundation",
    "articles": [
      {
        "title": "iOS 应用沙箱与权限",
        "href": "/docs/mobile/ios/sandbox-permissions",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能区分目录用途、备份属性、系统授权与业务授权，处理拒绝或有限访问，并说明实际测试范围即可。",
        "不把simctl命令成功或addOnly授权当成readWrite授权证据。",
        "前置：文件、应用生命周期与信任边界。"
      ],
      "interviewQuestions": [
        "照片有限访问对应用的数据范围有什么影响？",
        "文件读写成功是否证明锁屏保护已经验证？"
      ]
    }
  },
  "ios-background": {
    "id": "mobile-ios-background",
    "title": "iOS 后台任务",
    "priority": "optional",
    "depth": "mechanism",
    "articles": [
      {
        "title": "iOS 后台任务",
        "href": "/docs/mobile/ios/background-tasks",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "岗位或项目需要后台刷新、传输或持续任务时学习。",
        "能解释后台执行由系统调度，按任务类型安排工作并处理过期与取消即可。",
        "前置：生命周期、异步任务与权限。"
      ],
      "interviewQuestions": [
        "后台任务请求提交成功，是否表示会立即执行？",
        "后台回调到期时怎样清理未完成工作？"
      ]
    }
  },
  "ios-diagnostics": {
    "id": "mobile-ios-diagnostics",
    "title": "iOS 性能与崩溃诊断",
    "priority": "must",
    "depth": "scenario",
    "articles": [
      {
        "title": "iOS 性能诊断",
        "href": "/docs/mobile/ios/performance-diagnostics",
        "core": true
      },
      {
        "title": "iOS 崩溃诊断",
        "href": "/docs/mobile/ios/crash-diagnostics",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能用调用栈、分配与引用证据定位一次问题，核对符号与构建产物，给出同条件前后结果即可。",
        "区分异常、内存访问错误、系统终止与泄漏。",
        "前置：ARC、UI、GCD与性能指标。"
      ],
      "interviewQuestions": [
        "拿到崩溃地址后怎样确认符号匹配？",
        "CPU忙与主线程等待怎样用证据区分？"
      ]
    }
  },
  "ios-delivery": {
    "id": "mobile-ios-delivery",
    "title": "iOS 构建与测试",
    "priority": "must",
    "depth": "scenario",
    "articles": [
      {
        "title": "iOS 构建",
        "href": "/docs/mobile/ios/build",
        "core": true
      },
      {
        "title": "iOS 测试",
        "href": "/docs/mobile/ios/testing",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能解释编译、链接、签名与包产物，完成逻辑、异步和至少一个平台流程验证即可。",
        "保留调试符号，明确模拟器与真机、替身与真实API的边界。",
        "前置：Git、生命周期、网络与测试范围。"
      ],
      "interviewQuestions": [
        "签名通过能否证明运行时权限也已授予？",
        "异步测试怎样避免未等待完成就断言？"
      ]
    }
  },
  "ios-links": {
    "id": "mobile-ios-links",
    "title": "iOS 深层链接",
    "priority": "common",
    "depth": "scenario",
    "articles": [
      {
        "title": "iOS 深层链接",
        "href": "/docs/mobile/ios/deep-links",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能比较URL Scheme与Universal Link，验证域名关联、输入、登录态和页面恢复即可。",
        "前置：App/Scene、URL与资源授权。"
      ],
      "interviewQuestions": [
        "Universal Link关联文件正确就一定直接打开App吗？",
        "链接参数请求访问资源时还需哪些校验？"
      ]
    }
  },
  "ios-swiftui": {
    "id": "mobile-ios-swiftui",
    "title": "SwiftUI 状态管理",
    "priority": "optional",
    "depth": "mechanism",
    "articles": [
      {
        "title": "SwiftUI 状态管理",
        "href": "/docs/mobile/ios/swiftui-state",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "JD或项目使用SwiftUI时提前到第一轮。",
        "能说明状态来源、依赖、身份与副作用，按部署版本选择观察方案并验证页面重建即可。",
        "前置：Swift类型、闭包、ARC与应用生命周期。"
      ],
      "interviewQuestions": [
        "View值重新创建是否意味着所有状态被丢弃？",
        "状态所有权与传递方式怎样对应？"
      ]
    }
  },
  "ios-web": {
    "id": "mobile-ios-web",
    "title": "WKWebView",
    "priority": "optional",
    "depth": "scenario",
    "articles": [
      {
        "title": "JSBridge",
        "href": "/docs/frontend/browser/jsbridge",
        "core": true
      },
      {
        "title": "WKWebView",
        "href": "/docs/mobile/ios/wkwebview",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "项目包含网页或混合页面时学习。",
        "能解释网页到原生的消息边界，处理导航、来源校验、回调关联与页面销毁即可。",
        "前置：信任边界、ARC与页面生命周期。"
      ],
      "interviewQuestions": [
        "消息来自哪个frame，宿主怎样确认？",
        "脚本处理器为什么可能形成引用环？"
      ]
    }
  },
  "dart": {
    "id": "mobile-dart",
    "title": "Dart 类型与异步",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "Dart 类型系统",
        "href": "/docs/basic-knowledge/dart/type-system",
        "core": true
      },
      {
        "title": "Dart 并发",
        "href": "/docs/basic-knowledge/dart/concurrency",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能解释空安全、Future、Stream与Isolate，推导同一事件循环中任务的执行和错误传播即可。",
        "前置：函数、类型与事件队列。"
      ],
      "interviewQuestions": [
        "await为什么不等于新建线程？",
        "Isolate之间怎样传递结果？"
      ]
    }
  },
  "flutter-trees": {
    "id": "mobile-flutter-trees",
    "title": "Flutter 对象树与布局",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "Flutter Widget、Element 与 RenderObject",
        "href": "/docs/mobile/flutter/widget-element-render-object",
        "core": true
      },
      {
        "title": "Flutter 布局与渲染",
        "href": "/docs/mobile/flutter/layout-rendering",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能分别说明Widget、Element与RenderObject的责任，按约束传递推演尺寸，定位一次溢出即可。",
        "前置：Dart对象与异步。"
      ],
      "interviewQuestions": [
        "Widget重新创建后状态为什么可以保留？",
        "约束向下、尺寸向上怎样作用于列表？"
      ]
    }
  },
  "flutter-state": {
    "id": "mobile-flutter-state",
    "title": "Flutter 状态与导航",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "Flutter 状态管理",
        "href": "/docs/mobile/flutter/state-management",
        "core": true
      },
      {
        "title": "Flutter 导航",
        "href": "/docs/mobile/flutter/navigation",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能给状态明确所有者，用身份和生命周期管理页面更新、返回与深链，处理异步完成时页面已销毁即可。",
        "前置：对象树与Dart异步。"
      ],
      "interviewQuestions": [
        "Key改变后状态如何变化？",
        "异步函数返回后还能直接使用旧BuildContext吗？"
      ]
    }
  },
  "flutter-gesture": {
    "id": "mobile-flutter-gesture",
    "title": "Flutter 手势",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "Flutter 手势",
        "href": "/docs/mobile/flutter/gestures",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能区分命中测试和手势识别，解释手势竞争并验证嵌套滚动或拖动行为即可。",
        "前置：对象树、布局与事件目标。"
      ],
      "interviewQuestions": [
        "收到Pointer事件是否意味着手势已经获胜？",
        "父子都声明点击时怎样决定回调？"
      ]
    }
  },
  "flutter-channels": {
    "id": "mobile-flutter-channels",
    "title": "Flutter 平台通信",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "Flutter 平台通信",
        "href": "/docs/mobile/flutter/platform-channels",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能解释调用、序列化、线程与错误返回，验证插件原生部分和资源释放即可。",
        "只深入项目实际使用的宿主平台，不要求Android与iOS都完成一遍。",
        "前置：Dart异步与已选宿主的生命周期。"
      ],
      "interviewQuestions": [
        "Dart端调用成功是否证明原生工作已经完成？",
        "插件持有Activity时怎样处理销毁与重建？"
      ]
    }
  },
  "flutter-delivery": {
    "id": "mobile-flutter-delivery",
    "title": "Flutter 测试与性能",
    "priority": "must",
    "depth": "scenario",
    "articles": [
      {
        "title": "Flutter 测试",
        "href": "/docs/mobile/flutter/testing",
        "core": true
      },
      {
        "title": "Flutter 性能诊断",
        "href": "/docs/mobile/flutter/performance-diagnostics",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能安排单元、Widget与集成测试，使用合适构建测量重建、布局和渲染成本即可。",
        "至少在声明支持的一个宿主平台实际验证，debug帧耗时不代表发布性能。",
        "前置：对象树、状态、平台调用与性能指标。"
      ],
      "interviewQuestions": [
        "Widget测试通过能说明平台插件正常吗？",
        "掉帧来自Dart计算还是栅格工作，怎样区分？"
      ]
    }
  },
  "rn-js": {
    "id": "mobile-rn-js",
    "title": "JavaScript 类型与对象",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "JavaScript 数据类型与类型转换",
        "href": "/docs/basic-knowledge/javascript/types-conversion",
        "core": true
      },
      {
        "title": "作用域与闭包",
        "href": "/docs/basic-knowledge/javascript/scope-closures",
        "core": true
      },
      {
        "title": "this 绑定",
        "href": "/docs/basic-knowledge/javascript/this-binding",
        "core": true
      },
      {
        "title": "原型与原型链",
        "href": "/docs/basic-knowledge/javascript/prototypes",
        "core": true
      },
      {
        "title": "JavaScript 对象拷贝",
        "href": "/docs/basic-knowledge/javascript/copying",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能解释类型转换、闭包、this、原型与浅拷贝，用最小代码说明对象身份与共享数据即可。",
        "只复用语言语义，不把DOM或浏览器实现当成React Native前置。",
        "前置：函数与对象基础。"
      ],
      "interviewQuestions": [
        "闭包为什么会读到旧的一次渲染中的值？",
        "浅拷贝对象后哪个嵌套字段仍然共享？"
      ]
    }
  },
  "rn-js-async": {
    "id": "mobile-rn-js-async",
    "title": "JavaScript 异步与模块",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "Promise",
        "href": "/docs/basic-knowledge/javascript/promise",
        "core": true
      },
      {
        "title": "async 与 await",
        "href": "/docs/basic-knowledge/javascript/async-await",
        "core": true
      },
      {
        "title": "ES Module 与 CommonJS",
        "href": "/docs/basic-knowledge/javascript/modules",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能推导Promise链、await与异常传播，理解模块绑定和循环依赖的边界即可。",
        "React Native任务调度由实际运行环境决定，不照搬浏览器完整事件循环。",
        "前置：JavaScript函数与闭包。"
      ],
      "interviewQuestions": [
        "await之后抛出的错误怎样被调用方收到？",
        "模块导出的绑定与复制出来的值有什么区别？"
      ]
    }
  },
  "rn-ts": {
    "id": "mobile-rn-ts",
    "title": "TypeScript 类型约束",
    "priority": "common",
    "depth": "mechanism",
    "articles": [
      {
        "title": "TypeScript 类型系统",
        "href": "/docs/basic-knowledge/typescript/type-system",
        "core": true
      },
      {
        "title": "TypeScript 泛型与工具类型",
        "href": "/docs/basic-knowledge/typescript/generics-utility-types",
        "core": true
      },
      {
        "title": "interface 与 type",
        "href": "/docs/basic-knowledge/typescript/type-interface",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能为props、原生接口与可空返回建立类型约束，说明类型擦除和运行时校验的区别即可。",
        "TypeScript项目把本项提前到第一轮，纯JavaScript项目按岗补充。",
        "前置：JavaScript对象与模块。"
      ],
      "interviewQuestions": [
        "接口声明了返回结构，网络数据就一定符合吗？",
        "泛型约束与具体类型的赋值关系是什么？"
      ]
    }
  },
  "rn-react": {
    "id": "mobile-rn-react",
    "title": "React 组件与状态",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "React 组件",
        "href": "/docs/tools-and-frameworks/react/components",
        "core": true
      },
      {
        "title": "React Hooks",
        "href": "/docs/tools-and-frameworks/react/hooks",
        "core": true
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
      }
    ],
    "details": {
      "outcomes": [
        "解释协调、身份、状态保存与外部状态来源，按项目约束划分状态所有者和订阅范围。"
      ],
      "interviewQuestions": [
        "改变key为什么会重建组件状态？",
        "外部Store如何避免不必要的更新？"
      ]
    },
    "firstRound": {
      "outcomes": [
        "能解释props/state快照、状态提升、Effect清理与依赖，处理异步结果和列表身份即可。",
        "只复用组件语义，Web根挂载与DOM事件不作为原生执行机制。",
        "前置：JavaScript闭包、异步与对象。"
      ],
      "questions": [
        "为什么连续更新可能读到同一份状态快照？",
        "Effect清理如何避免旧请求影响新页面？"
      ]
    }
  },
  "rn-render": {
    "id": "mobile-rn-render",
    "title": "React Native 渲染",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "React Native 渲染",
        "href": "/docs/mobile/react-native/rendering",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能说明JS逻辑、原生UI与渲染工作各自的责任，区分Legacy与New Architecture并按项目版本解释即可。",
        "前置：React组件、线程与所选宿主UI。"
      ],
      "interviewQuestions": [
        "JS线程繁忙会影响哪些交互？",
        "Fabric与React协调各负责什么？"
      ]
    }
  },
  "rn-native": {
    "id": "mobile-rn-native",
    "title": "React Native 原生调用",
    "priority": "must",
    "depth": "mechanism",
    "articles": [
      {
        "title": "React Native 原生模块",
        "href": "/docs/mobile/react-native/native-modules",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能说明原生模块接口、类型转换、线程、错误与释放边界，验证至少一次真实原生调用即可。",
        "JSI或TurboModules内部实现只沿项目需要继续深入。",
        "前置：JavaScript异步与所选宿主语言/生命周期。"
      ],
      "interviewQuestions": [
        "JS模拟处理器返回成功能证明原生模块正常吗？",
        "同步原生调用为什么可能阻塞调用方？"
      ]
    }
  },
  "rn-adaptation": {
    "id": "mobile-rn-adaptation",
    "title": "React Native 平台适配",
    "priority": "must",
    "depth": "scenario",
    "articles": [
      {
        "title": "React Native 平台适配",
        "href": "/docs/mobile/react-native/platform-adaptation",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能验证导航、返回、键盘、权限与深链，并说明平台文件和依赖的作用即可。",
        "只宣称实际验证的平台组合；共享业务代码不代表所有设备行为相同。",
        "前置：React状态与所选宿主生命周期。"
      ],
      "interviewQuestions": [
        "Android返回键与iOS导航返回需要怎样适配？",
        "深链进入时页面与登录态尚未准备好怎么办？"
      ]
    }
  },
  "rn-delivery": {
    "id": "mobile-rn-delivery",
    "title": "React Native 测试与性能",
    "priority": "must",
    "depth": "scenario",
    "articles": [
      {
        "title": "React Native 测试",
        "href": "/docs/mobile/react-native/testing",
        "core": true
      },
      {
        "title": "React Native 性能诊断",
        "href": "/docs/mobile/react-native/performance-diagnostics",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "能用逻辑、组件、原生集成与设备流程组合验证，按发布构建定位JS计算或原生UI成本即可。",
        "Jest通过不代表原生模块、权限或设备导航已通过。",
        "前置：React状态、原生调用与性能指标。"
      ],
      "interviewQuestions": [
        "掉帧发生时怎样区分JS工作与原生工作？",
        "组件替身遮住了哪些平台风险？"
      ]
    }
  },
  "host-android": {
    "id": "mobile-host-android",
    "title": "Android 宿主基础",
    "priority": "must",
    "depth": "foundation",
    "articles": [
      {
        "title": "Android 应用组件",
        "href": "/docs/mobile/android/app-components",
        "core": true
      },
      {
        "title": "Activity 生命周期",
        "href": "/docs/mobile/android/activity-lifecycle",
        "core": true
      },
      {
        "title": "Android 应用沙箱与权限",
        "href": "/docs/mobile/android/sandbox-permissions",
        "core": true
      },
      {
        "title": "Android 构建",
        "href": "/docs/mobile/android/build",
        "core": true
      },
      {
        "title": "Android 测试",
        "href": "/docs/mobile/android/testing",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "跨平台项目选择Android为首个宿主时，能解释组件重建、系统授权和安装产物，验证一个设备流程即可。",
        "不要求完成Android原生主线的全部UI、框架和深入机制。",
        "前置：进程线程、主修语言异步与对象状态。"
      ],
      "interviewQuestions": [
        "Flutter或RN页面存在，宿主Activity是否仍可能重建？",
        "插件权限拒绝怎样返回跨平台调用方？"
      ]
    }
  },
  "host-ios": {
    "id": "mobile-host-ios",
    "title": "iOS 宿主基础",
    "priority": "must",
    "depth": "foundation",
    "articles": [
      {
        "title": "iOS 应用生命周期",
        "href": "/docs/mobile/ios/app-lifecycle",
        "core": true
      },
      {
        "title": "UIViewController",
        "href": "/docs/mobile/ios/view-controller",
        "core": true
      },
      {
        "title": "iOS 应用沙箱与权限",
        "href": "/docs/mobile/ios/sandbox-permissions",
        "core": true
      },
      {
        "title": "iOS 构建",
        "href": "/docs/mobile/ios/build",
        "core": true
      },
      {
        "title": "iOS 测试",
        "href": "/docs/mobile/ios/testing",
        "core": true
      }
    ],
    "details": {
      "outcomes": [
        "跨平台项目选择iOS为首个宿主时，能解释App/Scene、页面存续、系统授权与签名产物，验证一个平台流程即可。",
        "不要求完成iOS原生主线的全部UIKit、Runtime和深入机制。",
        "前置：进程线程、主修语言异步与对象状态。"
      ],
      "interviewQuestions": [
        "跨平台页面状态如何对应Scene的前后台变化？",
        "模拟器中测试成功还有哪些设备边界？"
      ]
    }
  }
};

const phaseSpecs = {
  "foundation": {
    "id": "mobile-foundations",
    "title": "共同基础与现场编码",
    "topics": [
      "algorithms",
      "dp",
      "os",
      "network",
      "sql",
      "failure",
      "security",
      "testing",
      "git"
    ]
  },
  "data": {
    "id": "mobile-shared-practice",
    "title": "状态、数据与测量",
    "topics": [
      "sync",
      "images",
      "metrics"
    ]
  },
  "delivery": {
    "id": "mobile-project-delivery",
    "title": "验证、协作与项目表达",
    "topics": [
      "project"
    ]
  },
  "optional": {
    "id": "mobile-targeted-topics",
    "title": "按岗位与项目补充",
    "topics": [
      "machine",
      "cpp-types",
      "cpp-tools",
      "media"
    ]
  },
  "android-platform": {
    "id": "mobile-android-platform",
    "title": "Android 页面、数据与执行",
    "topics": [
      "android-java-concurrency",
      "android-lifecycle",
      "android-messages",
      "android-ui",
      "android-state",
      "android-storage",
      "android-network",
      "android-rx",
      "android-runtime",
      "android-permissions",
      "android-background"
    ]
  },
  "android-delivery": {
    "id": "mobile-android-delivery-stage",
    "title": "Android 诊断与交付",
    "topics": [
      "android-stability",
      "android-delivery"
    ]
  },
  "android-optional": {
    "id": "mobile-android-optional",
    "title": "Android 按岗选学",
    "topics": [
      "android-compose",
      "android-web",
      "android-native"
    ]
  },
  "ios-platform": {
    "id": "mobile-ios-platform",
    "title": "iOS 页面、数据与执行",
    "topics": [
      "ios-lifecycle",
      "ios-ui",
      "ios-gcd",
      "ios-runloop",
      "ios-data",
      "ios-privacy",
      "ios-links"
    ]
  },
  "ios-delivery": {
    "id": "mobile-ios-delivery-stage",
    "title": "iOS 诊断与交付",
    "topics": [
      "ios-diagnostics",
      "ios-delivery"
    ]
  },
  "ios-optional": {
    "id": "mobile-ios-optional",
    "title": "iOS 按岗选学",
    "topics": [
      "ios-swiftui",
      "ios-web",
      "ios-background"
    ]
  },
  "flutter-platform": {
    "id": "mobile-flutter-platform",
    "title": "Flutter 状态、布局与平台调用",
    "topics": [
      "flutter-trees",
      "flutter-state",
      "flutter-gesture",
      "flutter-channels"
    ]
  },
  "flutter-delivery": {
    "id": "mobile-flutter-delivery-stage",
    "title": "Flutter 验证与性能",
    "topics": [
      "flutter-delivery"
    ]
  },
  "rn-language": {
    "id": "mobile-rn-language",
    "title": "JavaScript、TypeScript 与React",
    "topics": [
      "rn-js",
      "rn-js-async",
      "rn-ts",
      "rn-react"
    ]
  },
  "rn-platform": {
    "id": "mobile-rn-platform",
    "title": "React Native 渲染与平台能力",
    "topics": [
      "rn-render",
      "rn-native",
      "rn-adaptation"
    ]
  },
  "rn-delivery": {
    "id": "mobile-rn-delivery-stage",
    "title": "React Native 验证与性能",
    "topics": [
      "rn-delivery"
    ]
  }
};

function phase(key: keyof typeof phaseSpecs): RoadmapPhase {
  const spec = phaseSpecs[key];
  return {...spec, topics: spec.topics.map((id) => topics[id])};
}
function selectionPhase(id: string, title: string, ids: string[]): RoadmapPhase {
  return {id, title, topics: ids.map((key) => topics[key])};
}
const reviewHint = '必会是所选主线的第一轮停止范围；常考表示在核心之后补充的复习建议；按岗选学由JD或项目触发。回答深度分别是基础回答、原理解释和场景分析。复习顺序同时考虑岗位要求和必要前置。代码与设备验证按所选语言和实际平台开展。';
function route(title: string, introduction: string, phases: RoadmapPhase[]): InterviewRoadmapData {
  return {id: 'mobile', label: '移动端开发', title, introduction, reviewHint, phases};
}
export const mobileSharedInterviewRoadmap = route('移动端校招复习路线',
  '先选择Android、iOS、Flutter或React Native中的一条主线。这里列出共同基础与完成标准；主修语言、平台机制与设备练习在所选主线中展开，不要求把四个平台学完。',
  [phase('foundation'), phase('data'), phase('delivery'), phase('optional')]);
export type MobilePlatform = 'shared' | 'android' | 'ios' | 'flutter' | 'react-native';
export type MobileHost = 'android' | 'ios';
export type MobileSelection = {platform: MobilePlatform; language?: 'kotlin' | 'java' | 'swift' | 'objective-c'; host?: MobileHost};
function selectedMobileRoadmap(selection: MobileSelection): InterviewRoadmapData {
  if (selection.platform === 'shared') return mobileSharedInterviewRoadmap;
  if (selection.platform === 'android') {
    const kotlin = selection.language !== 'java';
    return route(`Android校招复习路线 · ${kotlin ? 'Kotlin' : 'Java'}主修`,
      `先用${kotlin ? 'Kotlin' : 'Java'}完成可运行的列表与详情应用，再按页面、任务、数据和失败处理复习。另一门语言只补互操作或项目要求；停止条件达到后进入下一项，不要求通学iOS与跨平台框架。`,
      [selectionPhase('mobile-android-language', '主修语言与异步', kotlin ? ['android-kotlin', 'android-coroutines', 'android-java-interop'] : ['android-java']),
       phase('foundation'), phase('android-platform'), phase('data'), phase('android-delivery'), phase('delivery'), phase('android-optional'), phase('optional')]);
  }
  if (selection.platform === 'ios') {
    const swift = selection.language !== 'objective-c';
    return route(`iOS校招复习路线 · ${swift ? 'Swift' : 'Objective-C'}主修`,
      `先用${swift ? 'Swift' : 'Objective-C'}完成页面与列表，再复习对象生命周期、UI、并发、请求与持久化。Swift主修仍需掌握Objective-C对象、消息和内存的基础；另一门语言的完整语法按混编需求补充。`,
      [selectionPhase('mobile-ios-language', '主修语言与对象存续', swift ? ['ios-swift', 'ios-objc-basics'] : ['ios-objc']),
       phase('foundation'), phase('ios-platform'), ...(swift ? [selectionPhase('mobile-ios-async', 'Swift异步项目', ['ios-concurrency'])] : []),
       phase('data'), phase('ios-delivery'), phase('delivery'), ...(!swift ? [selectionPhase('mobile-ios-swift-elective-stage', 'Swift混编前置', ['ios-swift-elective'])] : []), phase('ios-optional'), phase('optional')]);
  }
  const host = selection.host === 'ios' ? 'ios' : 'android';
  const hostPhase = selectionPhase('mobile-native-host', `${host === 'ios' ? 'iOS' : 'Android'}宿主基础`, [`host-${host}`]);
  if (selection.platform === 'flutter') return route('Flutter校招复习路线',
    `先用Dart解释对象树、状态与异步，再验证平台调用与性能。当前以${host === 'ios' ? 'iOS' : 'Android'}为首个宿主，只补这一个平台的生命周期、权限与构建；只有声明支持另一平台时才追加验证。`,
    [selectionPhase('mobile-flutter-language', 'Dart语言与异步', ['dart']), phase('foundation'), hostPhase, phase('flutter-platform'), phase('data'), phase('flutter-delivery'), phase('delivery'), phase('optional')]);
  return route('React Native校招复习路线',
    `先掌握JavaScript与React，再解释JS逻辑、原生UI和跨语言调用。当前选择${host === 'ios' ? 'iOS' : 'Android'}为首个宿主；Web专属DOM和CSS机制不当成原生平台前置，TypeScript按项目提前学习。`,
    [phase('rn-language'), phase('foundation'), hostPhase, phase('rn-platform'), phase('data'), phase('rn-delivery'), phase('delivery'), phase('optional')]);
}
export function getMobileInterviewRoadmap(selection: MobileSelection): InterviewRoadmapData {
  return {...selectedMobileRoadmap(selection), questionRoleId: mobileRoleId(selection)};
}
export const androidInterviewRoadmap = getMobileInterviewRoadmap({platform: 'android', language: 'kotlin'});
export const iosInterviewRoadmap = getMobileInterviewRoadmap({platform: 'ios', language: 'swift'});
export const flutterInterviewRoadmap = getMobileInterviewRoadmap({platform: 'flutter', host: 'android'});
export const reactNativeInterviewRoadmap = getMobileInterviewRoadmap({platform: 'react-native', host: 'android'});

// Legacy aggregate for readers who have not selected a platform; never render as a compulsory route.
// Native/platform/language requirements are conditional, so union priority is optional.
const sharedIds = new Set(mobileSharedInterviewRoadmap.phases.flatMap((p) => p.topics.map((t) => t.id)));
export const mobileInterviewRoadmap: InterviewRoadmapData = {
  ...mobileSharedInterviewRoadmap,
  phases: [
    ...mobileSharedInterviewRoadmap.phases,
    {id: 'mobile-platform-catalog', title: '按所选平台复习', topics: Object.values(topics)
      .filter((topic) => !sharedIds.has(topic.id))
      .map((topic) => ({...topic, priority: 'optional' as const}))},
  ],
};

/** URL defaults stay within one mobile role; no implicit second platform. */
export function readMobileSelection(search: string): MobileSelection {
  const params = new URLSearchParams(search);
  const platform = params.get('platform');
  if (platform === 'android') return {platform, language: params.get('language') === 'java' ? 'java' : 'kotlin'};
  if (platform === 'ios') return {platform, language: params.get('language') === 'objective-c' ? 'objective-c' : 'swift'};
  if (platform === 'flutter' || platform === 'react-native') return {platform, host: params.get('host') === 'ios' ? 'ios' : 'android'};
  return {platform: 'shared'};
}
export function mobileSelectionSearch(search: string, next: MobileSelection): string {
  const params = new URLSearchParams(search);
  params.set('platform', next.platform);
  params.set('round', 'first');
  params.delete('language');
  params.delete('host');
  if (next.platform === 'android') params.set('language', next.language === 'java' ? 'java' : 'kotlin');
  if (next.platform === 'ios') params.set('language', next.language === 'objective-c' ? 'objective-c' : 'swift');
  if (next.platform === 'flutter' || next.platform === 'react-native') params.set('host', next.host === 'ios' ? 'ios' : 'android');
  return `?${params.toString()}`;
}
