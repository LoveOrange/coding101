import type {InterviewRoadmapData, RoadmapPhase, RoadmapTopic} from '../../components/InterviewRoadmap';

export type TestingLanguage = 'python' | 'java';

const topics: Record<string, RoadmapTopic> = {
  "analysis": {
    "id": "testing-analysis",
    "title": "需求风险与判定依据",
    "priority": "must",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "能把一个登录或订单需求拆成可观察的输入、状态、预期结果和未覆盖风险，再开始写用例。"
      ],
      "interviewQuestions": [
        "预期结果从哪里来？",
        "需求有歧义时，哪些假设必须先确认？"
      ]
    },
    "articles": [
      {
        "title": "测试分析",
        "href": "/docs/tools-and-frameworks/testing/test-analysis",
        "core": true
      }
    ]
  },
  "inputs": {
    "id": "testing-inputs",
    "title": "输入分类与边界",
    "priority": "must",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "能按明确约束选择有效、无效、边界内外和空输入，并解释这些代表值为何不同。"
      ],
      "interviewQuestions": [
        "长度上限与数值上限怎样取点？",
        "一个正常输入能代表哪些情况，不能代表哪些情况？"
      ]
    },
    "articles": [
      {
        "title": "等价类划分",
        "href": "/docs/tools-and-frameworks/testing/equivalence-partitioning",
        "core": true
      },
      {
        "title": "边界值分析",
        "href": "/docs/tools-and-frameworks/testing/boundary-value-analysis",
        "core": true
      }
    ]
  },
  "rules-states": {
    "id": "testing-rules-states",
    "title": "条件规则与状态变化",
    "priority": "must",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "能把权限规则写成判定表，把订单事件写成状态转换，找出冲突规则与非法顺序。"
      ],
      "interviewQuestions": [
        "条件很多时怎样说明精简依据？",
        "状态都出现过，为什么仍可能漏掉错误路径？"
      ]
    },
    "articles": [
      {
        "title": "判定表",
        "href": "/docs/tools-and-frameworks/testing/decision-tables",
        "core": true
      },
      {
        "title": "状态迁移测试",
        "href": "/docs/tools-and-frameworks/testing/state-transition-testing",
        "core": true
      }
    ]
  },
  "scope-defects": {
    "id": "testing-scope-defects",
    "title": "验证层次与缺陷复现",
    "priority": "must",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "能选择单元、集成或端到端验证，提交别人能够复现的缺陷，并区分复测与回归。"
      ],
      "interviewQuestions": [
        "覆盖率高为什么仍可能漏错？",
        "严重程度和修复优先级为何可能不同？"
      ]
    },
    "articles": [
      {
        "title": "测试金字塔",
        "href": "/docs/basic-knowledge/java/quality/test-pyramid-contract-regression",
        "core": true
      },
      {
        "title": "缺陷管理",
        "href": "/docs/tools-and-frameworks/testing/defect-management",
        "core": true
      }
    ]
  },
  "exploration": {
    "id": "testing-exploration",
    "title": "组合与探索",
    "priority": "common",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "能列出受约束的参数组合，说明成对覆盖的遗漏，并把探索发现保存为可重复的检查。"
      ],
      "interviewQuestions": [
        "成对覆盖能保证所有缺陷被发现吗？",
        "探索过程中如何保留依据和下一步？"
      ]
    },
    "articles": [
      {
        "title": "组合测试",
        "href": "/docs/tools-and-frameworks/testing/combinatorial-testing",
        "core": true
      },
      {
        "title": "探索式测试",
        "href": "/docs/tools-and-frameworks/testing/exploratory-testing",
        "core": true
      }
    ]
  },
  "python-values": {
    "id": "testing-python-values",
    "title": "Python 值、集合与函数",
    "priority": "must",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "能独立处理字符串、列表、字典与集合，解释对象共享、可变参数和函数作用域。"
      ],
      "interviewQuestions": [
        "赋值和浅拷贝何时共享对象？",
        "可变默认参数会怎样影响多次调用？"
      ]
    },
    "articles": [
      {
        "title": "Python 对象模型",
        "href": "/docs/basic-knowledge/python/language/object-model",
        "core": true
      },
      {
        "title": "Python 集合",
        "href": "/docs/basic-knowledge/python/collections/list-dict-set",
        "core": true
      },
      {
        "title": "Python 函数参数与作用域",
        "href": "/docs/basic-knowledge/python/language/functions-scope",
        "core": true
      }
    ]
  },
  "python-resources": {
    "id": "testing-python-resources",
    "title": "Python 异常与资源",
    "priority": "must",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "能用类组织简单状态，明确异常传播与资源关闭，让失败路径也能完成必要清理。"
      ],
      "interviewQuestions": [
        "finally 会怎样改变原来的返回或异常？",
        "上下文管理器退出时需要保留什么错误？"
      ]
    },
    "articles": [
      {
        "title": "Python 异常处理",
        "href": "/docs/basic-knowledge/python/language/exceptions",
        "core": true
      },
      {
        "title": "Python 上下文管理器",
        "href": "/docs/basic-knowledge/python/language/context-managers",
        "core": true
      },
      {
        "title": "Python 类与实例",
        "href": "/docs/basic-knowledge/python/language/classes-instances",
        "core": true
      },
      {
        "title": "Python 迭代器与生成器",
        "href": "/docs/basic-knowledge/python/language/iterators-generators",
        "core": false
      },
      {
        "title": "Python 闭包与装饰器",
        "href": "/docs/basic-knowledge/python/language/closures-decorators",
        "core": false
      }
    ]
  },
  "python-files": {
    "id": "testing-python-files",
    "title": "Python 文件与日志处理",
    "priority": "must",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "能按编码逐行读取日志，提取和汇总记录，并用空文件、非法行和大输入验证处理边界。"
      ],
      "interviewQuestions": [
        "为什么不能默认一次读入所有内容？",
        "解析失败的记录如何保留和报告？"
      ]
    },
    "articles": [
      {
        "title": "Python 文件与文本处理",
        "href": "/docs/basic-knowledge/python/engineering/files-text-processing",
        "core": true
      }
    ]
  },
  "python-tests": {
    "id": "testing-python-tests",
    "title": "pytest 断言与 fixture",
    "priority": "must",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "能写参数化测试，独立准备数据，验证断言失败后 fixture 仍清理，并检查退出码。"
      ],
      "interviewQuestions": [
        "怎样证明测试真的执行了？",
        "fixture 范围过大会带来哪些共享状态？"
      ]
    },
    "articles": [
      {
        "title": "pytest",
        "href": "/docs/basic-knowledge/python/quality/pytest",
        "core": true
      }
    ]
  },
  "python-environment": {
    "id": "testing-python-environment",
    "title": "Python 依赖与运行环境",
    "priority": "must",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "能在独立环境安装指定依赖，确认解释器、模块入口和退出码，使另一台机器能重现运行。"
      ],
      "interviewQuestions": [
        "同名包为什么可能被错误文件遮蔽？",
        "依赖声明和实际安装结果有什么区别？"
      ]
    },
    "articles": [
      {
        "title": "Python 包管理与虚拟环境",
        "href": "/docs/basic-knowledge/python/engineering/packages-environments",
        "core": true
      }
    ]
  },
  "python-runtime": {
    "id": "testing-python-runtime",
    "title": "Python 并发与内存",
    "priority": "optional",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "测试平台或并发脚本确实涉及这些机制时，能区分线程、进程、共享状态与对象存续。",
        "按项目和岗位要求学习；不作为所有测试脚本的前置。"
      ],
      "interviewQuestions": [
        "有 GIL 是否就没有数据竞争？",
        "循环引用与业务仍持有的对象怎样区分？"
      ]
    },
    "articles": [
      {
        "title": "Python 并发",
        "href": "/docs/basic-knowledge/python/concurrency/threads-processes-gil",
        "core": true
      },
      {
        "title": "Python 内存管理",
        "href": "/docs/basic-knowledge/python/runtime/memory-management",
        "core": true
      },
      {
        "title": "asyncio",
        "href": "/docs/basic-knowledge/python/concurrency/asyncio",
        "core": false
      }
    ]
  },
  "java-values": {
    "id": "testing-java-values",
    "title": "Java 类型与对象",
    "priority": "must",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "能解释值传递、对象共享、字符串和多态，并用最小程序证明自己的判断。"
      ],
      "interviewQuestions": [
        "传入对象后修改字段与替换参数有什么不同？",
        "equals 与对象身份如何区分？"
      ]
    },
    "articles": [
      {
        "title": "Java 值传递",
        "href": "/docs/basic-knowledge/java/language/types-references-value-passing",
        "core": true
      },
      {
        "title": "String",
        "href": "/docs/basic-knowledge/java/language/string-immutability-pool",
        "core": true
      },
      {
        "title": "面向对象编程（Object-Oriented Programming）",
        "href": "/docs/basic-knowledge/java/language/encapsulation-inheritance-polymorphism",
        "core": true
      },
      {
        "title": "对象相等性",
        "href": "/docs/basic-knowledge/java/language/equals-hashcode-object-identity",
        "core": true
      },
      {
        "title": "包装类型",
        "href": "/docs/basic-knowledge/java/language/wrappers-boxing-cache",
        "core": false
      },
      {
        "title": "Java 泛型",
        "href": "/docs/basic-knowledge/java/language/generics",
        "core": false
      }
    ]
  },
  "java-collections": {
    "id": "testing-java-collections",
    "title": "Java 集合与数据处理",
    "priority": "must",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "能按顺序、重复与查找要求选择 List、Set、Map，解释数组扩容和哈希查找。"
      ],
      "interviewQuestions": [
        "错误的 equals/hashCode 会怎样影响测试数据？",
        "遍历中修改集合为何可能出错？"
      ]
    },
    "articles": [
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
      },
      {
        "title": "迭代一致性",
        "href": "/docs/basic-knowledge/java/collections/concurrent-collection-iteration-consistency",
        "core": false
      }
    ]
  },
  "java-resources": {
    "id": "testing-java-resources",
    "title": "Java 异常与文件",
    "priority": "must",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "能按字节或字符处理文件，在失败时关闭资源，并保留能够定位问题的异常信息。"
      ],
      "interviewQuestions": [
        "编码不一致会怎样破坏断言？",
        "捕获异常后直接返回成功会造成什么结果？"
      ]
    },
    "articles": [
      {
        "title": "Java 异常",
        "href": "/docs/basic-knowledge/java/language/exceptions-error-boundaries",
        "core": true
      },
      {
        "title": "Java 流式 I/O",
        "href": "/docs/basic-knowledge/java/io/byte-character-buffered-streams",
        "core": true
      }
    ]
  },
  "java-tests": {
    "id": "testing-java-tests",
    "title": "JUnit 断言与参数化",
    "priority": "must",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "能写正常和反例测试，独立准备数据，用参数化覆盖边界并确认清理与失败退出。"
      ],
      "interviewQuestions": [
        "断言应根据什么规则确定预期？",
        "如何避免用例顺序影响结果？"
      ]
    },
    "articles": [
      {
        "title": "JUnit",
        "href": "/docs/basic-knowledge/java/quality/junit-assertions-parameterized-tests",
        "core": true
      }
    ]
  },
  "java-environment": {
    "id": "testing-java-environment",
    "title": "Java 构建与依赖",
    "priority": "must",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "能在干净目录用一致的 JDK 与依赖运行测试，区分未执行、断言失败和构建失败。"
      ],
      "interviewQuestions": [
        "测试未被发现时怎样确认？",
        "依赖版本冲突怎样定位？"
      ]
    },
    "articles": [
      {
        "title": "Maven",
        "href": "/docs/system-design/production/maven-lifecycle-dependency-convergence",
        "core": true
      }
    ]
  },
  "java-concurrency": {
    "id": "testing-java-concurrency",
    "title": "Java 并发与被测服务",
    "priority": "optional",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "岗位或项目涉及 Java 服务并发时，能用同步关系、线程状态和资源上限解释失败。"
      ],
      "interviewQuestions": [
        "共享可变状态为何会让并行测试偶发失败？",
        "任务被提交是否意味着已经执行？"
      ]
    },
    "articles": [
      {
        "title": "线程安全",
        "href": "/docs/basic-knowledge/java/concurrency/thread-safety-race-conditions",
        "core": true
      },
      {
        "title": "Java 线程",
        "href": "/docs/basic-knowledge/java/concurrency/thread-lifecycle-interruption",
        "core": true
      },
      {
        "title": "Java 线程池",
        "href": "/docs/basic-knowledge/java/concurrency/threadpoolexecutor-execution-path",
        "core": true
      },
      {
        "title": "JVM 运行时数据区域",
        "href": "/docs/basic-knowledge/java/jvm/runtime-data-areas",
        "core": false
      },
      {
        "title": "GC Roots",
        "href": "/docs/basic-knowledge/java/jvm/gc-roots-reachability",
        "core": false
      },
      {
        "title": "生产故障诊断",
        "href": "/docs/system-design/production/jvm-thread-sql-network-joint-diagnosis",
        "core": false
      }
    ]
  },
  "coding": {
    "id": "testing-coding",
    "title": "数据结构与现场编码",
    "priority": "must",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "能用所选语言独立处理数组、字符串、集合和查找，用边界输入检验结果并说明复杂度。"
      ],
      "interviewQuestions": [
        "二分边界为何会漏掉最后一个候选？",
        "如何为自己的实现找出反例？"
      ]
    },
    "articles": [
      {
        "title": "数据结构",
        "href": "/docs/basic-knowledge/data-structures/",
        "core": true
      },
      {
        "title": "二分查找",
        "href": "/docs/basic-knowledge/algorithms/binary-search",
        "core": true
      },
      {
        "title": "双指针",
        "href": "/docs/basic-knowledge/algorithms/two-pointers",
        "core": true
      },
      {
        "title": "排序",
        "href": "/docs/basic-knowledge/algorithms/sorting",
        "core": true
      },
      {
        "title": "编码与 SQL 练习",
        "href": "/docs/interview/coding-practice",
        "core": false
      },
      {
        "title": "回溯",
        "href": "/docs/basic-knowledge/algorithms/backtracking",
        "core": false
      }
    ]
  },
  "os": {
    "id": "testing-os",
    "title": "进程、线程与等待",
    "priority": "must",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "能区分进程资源与线程执行，识别共享状态和等待环，解释测试并发为何可能相互影响。"
      ],
      "interviewQuestions": [
        "进程隔离与线程共享有什么不同？",
        "一组请求互相等待时怎样找出条件？"
      ]
    },
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
        "core": false
      },
      {
        "title": "I/O 模型",
        "href": "/docs/basic-knowledge/operating-system/io-models",
        "core": false
      },
      {
        "title": "I/O 多路复用",
        "href": "/docs/basic-knowledge/operating-system/io-multiplexing",
        "core": false
      }
    ]
  },
  "network": {
    "id": "testing-network",
    "title": "请求、连接与响应",
    "priority": "must",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "能从域名解析、连接和 TLS 讲到 HTTP 请求，区分协议失败、业务错误与结果未知。"
      ],
      "interviewQuestions": [
        "HTTP 200 能证明业务成功吗？",
        "超时发生在连接和响应阶段有什么不同？"
      ]
    },
    "articles": [
      {
        "title": "HTTP",
        "href": "/docs/basic-knowledge/network/http-versions-connection-reuse-timeouts",
        "core": true
      },
      {
        "title": "TCP 连接",
        "href": "/docs/basic-knowledge/network/tcp_handshake",
        "core": true
      },
      {
        "title": "TLS",
        "href": "/docs/basic-knowledge/network/tls",
        "core": true
      },
      {
        "title": "DNS",
        "href": "/docs/basic-knowledge/network/dns",
        "core": true
      },
      {
        "title": "网络模型",
        "href": "/docs/basic-knowledge/network/network-models",
        "core": false
      },
      {
        "title": "TCP 与 UDP",
        "href": "/docs/basic-knowledge/network/tcp_udp",
        "core": false
      }
    ]
  },
  "sql": {
    "id": "testing-sql",
    "title": "SQL 核对与数据约束",
    "priority": "must",
    "depth": "mechanism",
    "details": {
      "outcomes": [
        "能写过滤、关联、聚合和去重查询，用 NULL、重复行和缺失记录检验结果。"
      ],
      "interviewQuestions": [
        "一对多关联为何会放大统计值？",
        "查询结果正确，是否说明写入约束也正确？"
      ]
    },
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
        "title": "SQL 聚合",
        "href": "/docs/basic-knowledge/database/sql/aggregation",
        "core": true
      },
      {
        "title": "数据建模",
        "href": "/docs/basic-knowledge/database/modeling/",
        "core": false
      },
      {
        "title": "数据约束",
        "href": "/docs/basic-knowledge/database/modeling/constraints",
        "core": false
      },
      {
        "title": "数据库索引",
        "href": "/docs/basic-knowledge/database/indices/",
        "core": false
      }
    ]
  },
  "transactions": {
    "id": "testing-transactions",
    "title": "事务与并发数据验证",
    "priority": "common",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "能用两条受控请求验证原子性、隔离与锁等待，区分观察结果和数据库承诺。"
      ],
      "interviewQuestions": [
        "两次读取不同一定违反隔离级别吗？",
        "怎样让并发问题可重复，而不是依赖碰巧发生？"
      ]
    },
    "articles": [
      {
        "title": "数据库事务",
        "href": "/docs/basic-knowledge/database/transaction/",
        "core": true
      },
      {
        "title": "InnoDB 锁",
        "href": "/docs/basic-knowledge/database/transaction/innodb-locking-ranges",
        "core": true
      },
      {
        "title": "MVCC",
        "href": "/docs/basic-knowledge/database/transaction/mvcc-read-view-consistent-read",
        "core": true
      }
    ]
  },
  "authorization": {
    "id": "testing-authorization",
    "title": "身份与资源权限",
    "priority": "must",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "能用不同用户、资源归属和会话状态设计越权与过期检查，说明服务端必须验证什么。"
      ],
      "interviewQuestions": [
        "登录成功为何仍不能访问别人的记录？",
        "输入校验与资源授权各解决什么问题？"
      ]
    },
    "articles": [
      {
        "title": "认证与授权",
        "href": "/docs/system-design/security/authentication-authorization-trust-boundaries",
        "core": true
      },
      {
        "title": "Session、JWT、OAuth 2.0 与 OIDC",
        "href": "/docs/system-design/security/session-jwt-oauth-oidc",
        "core": true
      },
      {
        "title": "Web 应用安全",
        "href": "/docs/system-design/security/injection-authorization-ssrf-deserialization",
        "core": false
      }
    ]
  },
  "test-doubles": {
    "id": "testing-test-doubles",
    "title": "测试替身与隔离",
    "priority": "must",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "能按风险选择真实依赖、Stub、Mock 或 Fake，并明确替身没有执行的链路。"
      ],
      "interviewQuestions": [
        "模拟返回成功能证明真实服务成功吗？",
        "模拟故障与真实故障注入怎样分工？"
      ]
    },
    "articles": [
      {
        "title": "测试替身",
        "href": "/docs/basic-knowledge/java/quality/test-doubles-mock-stub-boundaries",
        "core": true
      }
    ]
  },
  "api": {
    "id": "testing-api",
    "title": "接口回归与测试数据",
    "priority": "must",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "能完成准备、鉴权、请求、业务与持久化断言、清理和报告，反例必须让测试失败。",
        "用所选语言实现同一条流程；文章中的 Python 参考实现不要求 Java 主修读者再系统学习一门语言。"
      ],
      "interviewQuestions": [
        "为何只断言状态码不够？",
        "并行运行怎样避免互相删除测试数据？"
      ]
    },
    "articles": [
      {
        "title": "接口测试",
        "href": "/docs/tools-and-frameworks/testing/api-testing",
        "core": true
      },
      {
        "title": "测试数据管理",
        "href": "/docs/tools-and-frameworks/testing/test-data-management",
        "core": true
      },
      {
        "title": "测试报告",
        "href": "/docs/tools-and-frameworks/testing/test-reporting",
        "core": true
      }
    ]
  },
  "ui": {
    "id": "testing-ui",
    "title": "Web UI 自动化",
    "priority": "common",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "能用稳定定位、条件等待和独立会话验证用户流程，留下可回查的失败产物。",
        "面向 Web UI 自动化岗位时提前到第一轮实践；其他岗位先完成接口回归。"
      ],
      "interviewQuestions": [
        "固定 sleep 为什么无法保证稳定？",
        "哪些失败应在接口或组件层提前发现？"
      ]
    },
    "articles": [
      {
        "title": "Web UI 自动化测试",
        "href": "/docs/tools-and-frameworks/testing/ui-automation",
        "core": true
      },
      {
        "title": "HTML 语义与可访问性",
        "href": "/docs/frontend/html/semantics-accessibility",
        "core": true
      },
      {
        "title": "DOM 事件",
        "href": "/docs/frontend/browser/dom-events",
        "core": true
      },
      {
        "title": "前端组件测试",
        "href": "/docs/tools-and-frameworks/frontend-testing/component-testing",
        "core": false
      }
    ]
  },
  "environment": {
    "id": "testing-environment",
    "title": "环境、Git 与交付",
    "priority": "must",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "能在干净环境复现测试，记录代码、配置、依赖和数据版本，并保留失败退出码与产物。"
      ],
      "interviewQuestions": [
        "本地通过、流水线失败时先比较什么？",
        "重试通过为什么不能直接当作修复？"
      ]
    },
    "articles": [
      {
        "title": "测试环境",
        "href": "/docs/tools-and-frameworks/testing/test-environments",
        "core": true
      },
      {
        "title": "Git",
        "href": "/docs/tools-and-frameworks/git/",
        "core": true
      },
      {
        "title": "Docker 镜像与 Dockerfile",
        "href": "/docs/devops/containers/docker-images",
        "core": false
      },
      {
        "title": "可重复交付",
        "href": "/docs/system-design/production/docker-ci-cd-reproducible-delivery",
        "core": false
      }
    ]
  },
  "diagnosis": {
    "id": "testing-diagnosis",
    "title": "Linux 与故障证据",
    "priority": "must",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "能从日志、进程、端口和请求标识缩小失败范围，给出可验证的假设与回归检查。"
      ],
      "interviewQuestions": [
        "连接失败与服务慢分别看什么证据？",
        "怎样证明两条日志来自同一次请求？"
      ]
    },
    "articles": [
      {
        "title": "Linux 常用命令与文件权限",
        "href": "/docs/devops/linux/commands-permissions",
        "core": true
      },
      {
        "title": "Linux 网络排查",
        "href": "/docs/devops/linux/network-troubleshooting",
        "core": true
      },
      {
        "title": "可观测性",
        "href": "/docs/system-design/production/logs-metrics-traces-correlation",
        "core": true
      },
      {
        "title": "Linux 性能排查",
        "href": "/docs/devops/linux/performance-troubleshooting",
        "core": false
      },
      {
        "title": "磁盘与文件系统排查",
        "href": "/docs/devops/linux/disk-filesystem",
        "core": false
      }
    ]
  },
  "compatibility": {
    "id": "testing-compatibility",
    "title": "兼容性与支持范围",
    "priority": "common",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "能按真实支持范围选择浏览器、设备和版本组合，说明未验证的组合与升级回退风险。"
      ],
      "interviewQuestions": [
        "怎样从全部组合中选择有依据的代表项？",
        "在模拟器上通过能证明什么？"
      ]
    },
    "articles": [
      {
        "title": "兼容性测试",
        "href": "/docs/tools-and-frameworks/testing/compatibility-testing",
        "core": true
      }
    ]
  },
  "project": {
    "id": "testing-project",
    "title": "项目演示与面试表达",
    "priority": "must",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "能展示从需求风险、用例、实现到失败定位与修复回归的一条证据链，说明本人贡献与未覆盖范围。"
      ],
      "interviewQuestions": [
        "失败是如何被发现和复现的？",
        "改进数字基于怎样的前后比较？"
      ]
    },
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
    ]
  },
  "performance": {
    "id": "testing-performance",
    "title": "性能目标与负载",
    "priority": "common",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "能根据业务设定负载与验收指标，同时观察延迟分布、吞吐、错误和资源，排除压测机瓶颈。",
        "性能测试岗位在完成请求与数据基础后优先实践；不把一次本地实验外推为生产容量。"
      ],
      "interviewQuestions": [
        "平均延迟为什么会掩盖问题？",
        "并发数、到达速率和吞吐量有什么不同？"
      ]
    },
    "articles": [
      {
        "title": "性能测试",
        "href": "/docs/tools-and-frameworks/testing/performance-testing",
        "core": true
      },
      {
        "title": "JMeter",
        "href": "/docs/tools-and-frameworks/testing/jmeter",
        "core": true
      },
      {
        "title": "容量规划",
        "href": "/docs/system-design/system-design/capacity-slo-failure-model",
        "core": false
      }
    ]
  },
  "reliability": {
    "id": "testing-reliability",
    "title": "重试、幂等与故障恢复",
    "priority": "common",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "能构造提交后超时、重复请求和恢复场景，用持久化结果核对副作用，并控制故障实验范围。"
      ],
      "interviewQuestions": [
        "超时为什么可能已经产生写入？",
        "怎样证明重试没有重复扣减？"
      ]
    },
    "articles": [
      {
        "title": "故障注入测试",
        "href": "/docs/tools-and-frameworks/testing/fault-injection-testing",
        "core": true
      },
      {
        "title": "幂等键",
        "href": "/docs/system-design/reliability/idempotency-keys-safe-retries",
        "core": true
      },
      {
        "title": "缓存一致性",
        "href": "/docs/basic-knowledge/nosql/redis/cache-patterns-consistency",
        "core": false
      },
      {
        "title": "消息队列",
        "href": "/docs/basic-knowledge/middleware/kafka-rabbitmq-queue-semantics",
        "core": false
      }
    ]
  },
  "tdd-fuzz": {
    "id": "testing-tdd-fuzz",
    "title": "开发反馈与生成输入",
    "priority": "optional",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "需要改进开发反馈或输入鲁棒性时，能解释红绿重构、生成输入和有效判定依据，并保存最小失败用例。"
      ],
      "interviewQuestions": [
        "自动生成很多输入为何仍可能找不到错误？",
        "重构前需要哪些行为保护？"
      ]
    },
    "articles": [
      {
        "title": "测试驱动开发",
        "href": "/docs/tools-and-frameworks/testing/test-driven-development",
        "core": true
      },
      {
        "title": "模糊测试",
        "href": "/docs/tools-and-frameworks/testing/fuzz-testing",
        "core": true
      }
    ]
  },
  "platform": {
    "id": "testing-platform",
    "title": "测试执行平台",
    "priority": "optional",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "项目涉及执行平台时，能说明任务状态、隔离、超时取消、重复调度和失败回查。",
        "只在岗位或本人项目涉及平台开发时学习，不要求先搭建通用平台。"
      ],
      "interviewQuestions": [
        "执行器崩溃后怎样确定任务结果？",
        "取消请求为什么不等于所有外部副作用都已撤销？"
      ]
    },
    "articles": [
      {
        "title": "测试执行平台",
        "href": "/docs/tools-and-frameworks/testing/test-execution-platform",
        "core": true
      },
      {
        "title": "系统设计面试",
        "href": "/docs/system-design/system-design/interview-process",
        "core": false
      }
    ]
  },
  "ai-assistance": {
    "id": "testing-ai-assistance",
    "title": "AI 辅助测试",
    "priority": "optional",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "岗位或项目使用 AI 时，能审查生成用例与脚本，保持独立预期，实际执行并比较完整投入与效果。"
      ],
      "interviewQuestions": [
        "模型给出的断言为何不能直接当作事实？",
        "怎样证明生成结果提高了检查能力？"
      ]
    },
    "articles": [
      {
        "title": "AI 辅助测试",
        "href": "/docs/tools-and-frameworks/testing/ai-assisted-testing",
        "core": true
      },
      {
        "title": "AI 辅助开发",
        "href": "/docs/ai/development/ai-assisted-development",
        "core": false
      }
    ]
  },
  "model-testing": {
    "id": "testing-model-testing",
    "title": "模型与 AI 产品验证",
    "priority": "optional",
    "depth": "scenario",
    "details": {
      "outcomes": [
        "被测对象包含模型时，能定义评价对象、数据划分、指标和失败类别，区分功能成功与内容正确。",
        "这是 AI 产品测试分支，不要求通用测试开发候选人学习模型训练。"
      ],
      "interviewQuestions": [
        "测试集泄漏会怎样影响结论？",
        "如何区分模型效果变化和接口故障？"
      ]
    },
    "articles": [
      {
        "title": "模型评测",
        "href": "/docs/ai/evaluation/model-evaluation",
        "core": true
      },
      {
        "title": "大语言模型基础",
        "href": "/docs/ai/llm/llm-basics",
        "core": false
      },
      {
        "title": "检索增强生成（RAG）",
        "href": "/docs/ai/rag/",
        "core": false
      }
    ]
  }
};

const phases = [
  {
    "id": "testing-design-stage",
    "title": "测试分析与用例设计",
    "keys": [
      "analysis",
      "inputs",
      "rules-states",
      "scope-defects",
      "exploration"
    ]
  },
  {
    "id": "testing-foundation-stage",
    "title": "现场编码与系统基础",
    "keys": [
      "coding",
      "os",
      "network",
      "sql",
      "transactions",
      "authorization"
    ]
  },
  {
    "id": "testing-automation-stage",
    "title": "从单元测试到自动化回归",
    "keys": [
      "test-doubles",
      "api",
      "ui"
    ]
  },
  {
    "id": "testing-delivery-stage",
    "title": "环境、定位与项目表达",
    "keys": [
      "environment",
      "diagnosis",
      "compatibility",
      "project"
    ]
  },
  {
    "id": "testing-extension-stage",
    "title": "按目标岗位补充",
    "keys": [
      "performance",
      "reliability",
      "tdd-fuzz",
      "platform",
      "ai-assistance",
      "model-testing"
    ]
  }
];
const languages: Record<TestingLanguage, string[]> = {
  "python": [
    "python-values",
    "python-resources",
    "python-files",
    "python-tests",
    "python-environment",
    "python-runtime"
  ],
  "java": [
    "java-values",
    "java-collections",
    "java-resources",
    "java-tests",
    "java-environment",
    "java-concurrency"
  ]
};

function sharedPhases(): RoadmapPhase[] {
  return phases.map(phase => ({id: phase.id, title: phase.title, topics: phase.keys.map(key => topics[key])}));
}
export function readTestingLanguage(search: string): TestingLanguage {
  return new URLSearchParams(search).get('language') === 'java' ? 'java' : 'python';
}
export function testingLanguageSearch(search: string, language: TestingLanguage): string {
  const params = new URLSearchParams(search);
  params.set('language', language);
  params.set('round', 'first');
  return `?${params.toString()}`;
}
export function getTestingInterviewRoadmap(language: TestingLanguage): InterviewRoadmapData {
  const result = sharedPhases();
  result.splice(1, 0, {id: `testing-${language}-stage`, title: language === 'java' ? 'Java 编码与测试' : 'Python 编码与测试', topics: languages[language].map(key => topics[key])});
  return {
    id: 'testing',
    questionRoleId: `testing-${language}`, label: '测试开发', title: '测试开发校招复习路线',
    introduction: '先选熟悉的 Java 或 Python，再完成需求分析、编码、接口回归和失败定位。核心目标是能用明确依据发现问题，并把检查稳定地运行起来；UI、性能、平台和 AI 测试按岗位要求补充。',
    reviewHint: '必会构成第一轮的最小准备范围，常考在核心实践完成后补充。Java 与 Python 任选一门；工具与专项按目标岗位选择，不要求全部学完。',
    phases: result,
  };
}
// Legacy aggregate for readers who have not selected a main language.
export const testingInterviewRoadmap: InterviewRoadmapData = {
  ...getTestingInterviewRoadmap('python'),
  phases: [...sharedPhases(), {id: 'testing-language-options-stage', title: '按主修语言选择', topics: [...languages.python, ...languages.java].map(key => ({...topics[key], priority: 'optional' as const}))}],
};
