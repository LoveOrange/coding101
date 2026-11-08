import type {InterviewRoadmapData} from '../../components/InterviewRoadmap';

export const goInterviewRoadmap: InterviewRoadmapData = {
  "id": "go",
  "label": "Go 后端",
  "title": "Go 后端校招复习路线",
  "introduction": "这条路线面向准备 Go 后端校招与实习的求职者。先掌握语言、并发、请求和数据访问，用编码与项目证据检查能否独立解释和实现。算法练习和项目材料可从第一轮同步准备，有基础的转岗读者也可以据此补缺。",
  "reviewHint": "第一轮按每项的停止条件完成核心阅读，再进入常考与追问。Go 内容以 1.22 为基线，Redis 以 6、7、MySQL 以 8.0 为基线；实现差异按文章标注的版本理解。框架、云原生和设计案例按 JD 或已有项目选择。",
  "phases": [
    {
      "id": "go-language",
      "title": "语言与工程起点",
      "topics": [
        {
          "id": "go-values",
          "title": "类型、函数与方法",
          "priority": "must",
          "depth": "mechanism",
          "details": {
            "outcomes": [
              "沿赋值、闭包捕获和方法调用解释值的复制与共享。",
              "结合调用方、内联与逃逸报告，判断值的生命周期和分配成本。"
            ],
            "interviewQuestions": [
              "把结构体换成指针接收者，会改变哪些调用与接口关系？",
              "为什么把地址传出去是安全的，却不能只凭写法断定堆分配？"
            ]
          },
          "articles": [
            {
              "title": "Go 类型与值传递",
              "href": "/docs/basic-knowledge/go/language/types-value-passing",
              "core": true,
              "scope": "零值、类型与赋值传参；能用结构体和指针解释复制范围。"
            },
            {
              "title": "Go 函数",
              "href": "/docs/basic-knowledge/go/language/functions",
              "core": true,
              "scope": "多返回值、函数参数与闭包捕获；先完成普通函数和闭包的小例子。"
            },
            {
              "title": "Go 结构体与方法集",
              "href": "/docs/basic-knowledge/go/language/structs-method-sets",
              "core": true,
              "scope": "字段、值接收者与指针接收者；方法集随接口继续，先不展开方法表达式。"
            },
            {
              "title": "Go 逃逸分析",
              "href": "/docs/basic-knowledge/go/runtime/escape-analysis",
              "core": false,
              "scope": "返回指针、内联与逃逸报告，结合调用方解释分配。"
            },
            {
              "title": "Go 语言",
              "href": "/docs/basic-knowledge/go/language/",
              "core": false
            }
          ],
          "firstRound": {
            "outcomes": [
              "判断一次赋值或调用复制了什么，哪些修改会影响调用方。",
              "写出带错误返回值的函数，并解释值接收者和指针接收者的差别。"
            ],
            "questions": [
              "为什么修改参数中的指针所指对象能被调用方看到？",
              "闭包捕获变量与把变量作为参数传入有什么不同？"
            ]
          }
        },
        {
          "id": "go-collections",
          "title": "切片、map 与字符串",
          "priority": "must",
          "depth": "mechanism",
          "details": {
            "outcomes": [
              "解释 append、容量与底层数组共享，以及 map 的键约束和并发访问边界。",
              "从字节和 rune 区分字符串长度、遍历和截取，按 Go 1.22 解释 map 的桶与扩容。"
            ],
            "interviewQuestions": [
              "两个切片什么时候会互相影响，append 为什么可能改变这种关系？",
              "map 扩容怎样迁移条目，为什么不能拿 Go 1.22 的布局概括所有版本？"
            ]
          },
          "articles": [
            {
              "title": "Go 切片",
              "href": "/docs/basic-knowledge/go/collections/slices",
              "core": true,
              "scope": "数组与切片、len/cap、截取、append 和 copy；画出共享的底层数组。"
            },
            {
              "title": "Go map",
              "href": "/docs/basic-knowledge/go/collections/maps",
              "core": true,
              "scope": "初始化、查询的第二返回值、键类型、遍历与并发边界；桶实现留到第二轮。"
            },
            {
              "title": "Go 字符串与 rune",
              "href": "/docs/basic-knowledge/go/language/strings-runes",
              "core": true,
              "scope": "字节、rune、UTF-8 和 range；能说明 len 与字符数量为什么不同。"
            },
            {
              "title": "Go map",
              "href": "/docs/basic-knowledge/go/collections/maps#go122的哈希实现",
              "core": false,
              "scope": "Go 1.22 的哈希实现与扩容，不把实现细节当成语言保证。"
            }
          ],
          "firstRound": {
            "outcomes": [
              "用一个 append 例子判断切片长度、容量和元素共享。",
              "区分 map 缺键与零值，并正确遍历包含中文的字符串。"
            ],
            "questions": [
              "nil 切片和 nil map 分别能进行哪些操作？",
              "为什么按字节截取字符串可能破坏一个汉字？"
            ]
          }
        },
        {
          "id": "go-interfaces-errors",
          "title": "接口与错误处理",
          "priority": "must",
          "depth": "mechanism",
          "details": {
            "outcomes": [
              "根据动态类型和值解释接口 nil、断言和比较边界。",
              "沿返回、defer 与 panic 展开执行顺序，用 errors.Is/As 保留错误判断能力。"
            ],
            "interviewQuestions": [
              "接口中的带类型 nil 为什么不等于 nil？",
              "recover 为什么不能在调用方 goroutine 捕获另一个 goroutine 的 panic？"
            ]
          },
          "articles": [
            {
              "title": "Go 接口",
              "href": "/docs/basic-knowledge/go/language/interfaces",
              "core": true,
              "scope": "隐式实现、方法集、接口 nil 与类型断言；比较和约束细节按需继续。"
            },
            {
              "title": "defer",
              "href": "/docs/basic-knowledge/go/language/defer",
              "core": true,
              "scope": "登记顺序、参数求值、返回值与资源释放；不要求复述编译器实现。"
            },
            {
              "title": "Go 错误处理",
              "href": "/docs/basic-knowledge/go/language/errors",
              "core": true,
              "scope": "error 返回、包装、Is/As 与 panic/recover 的职责；保留错误链。"
            },
            {
              "title": "defer",
              "href": "/docs/basic-knowledge/go/language/defer#panic与退出边界",
              "core": false,
              "scope": "panic 展开与退出边界，再看 Go 1.22 的 defer 实现。"
            }
          ],
          "firstRound": {
            "outcomes": [
              "区分普通错误返回和 panic，写出释放资源且保留错误信息的路径。",
              "判断接口 nil 和 defer 执行顺序，说明接收者方法集对接口赋值的影响。"
            ],
            "questions": [
              "defer 中的参数什么时候求值？",
              "包装错误后怎样仍识别原错误？"
            ]
          }
        },
        {
          "id": "go-engineering",
          "title": "模块与测试",
          "priority": "must",
          "depth": "mechanism",
          "details": {
            "outcomes": [
              "区分构建、运行和测试，说明目标平台、cgo 与运行资源的约束。",
              "沿包依赖解释变量初始化与 init 顺序，核对独立构建所使用的环境。"
            ],
            "interviewQuestions": [
              "交叉编译成功为什么不保证产物能在目标环境运行？",
              "两个包存在导入依赖时，初始化按什么顺序执行？"
            ]
          },
          "articles": [
            {
              "title": "Go Modules",
              "href": "/docs/basic-knowledge/go/engineering/modules",
              "core": true,
              "scope": "package 与 module、go.mod/go.sum、基本依赖维护；先能独立运行自己的模块。"
            },
            {
              "title": "Go 测试与基准测试",
              "href": "/docs/basic-knowledge/go/engineering/testing",
              "core": true,
              "scope": "测试入口、表驱动用例、断言和资源清理；先为边界输入保留失败用例。"
            },
            {
              "title": "Go 构建",
              "href": "/docs/basic-knowledge/go/engineering/build",
              "core": false,
              "scope": "build/run/test、目标平台与 cgo，核对产物运行所需资源。"
            },
            {
              "title": "Go 包初始化",
              "href": "/docs/basic-knowledge/go/language/packages-initialization",
              "core": false,
              "scope": "包依赖、变量初始化和 init 的先后关系。"
            }
          ],
          "firstRound": {
            "outcomes": [
              "说明模块、包和导入路径的关系，能运行 go test ./...。",
              "为一个函数写正常、空输入和错误路径的测试，解释每个断言在检查什么。"
            ],
            "questions": [
              "go.mod 和 go.sum 分别保存什么？",
              "测试只是调用函数但没有断言，能证明什么？"
            ]
          }
        },
        {
          "id": "go-generics",
          "title": "泛型与反射",
          "priority": "common",
          "depth": "mechanism",
          "details": {
            "outcomes": [
              "按类型约束判断可用操作，区分泛型复用与接口多态。",
              "解释 comparable、类型集合和类型推断；需要运行时动态操作时再补反射。"
            ],
            "interviewQuestions": [
              "为什么 any 不能让泛型函数对任意值使用加法？",
              "comparable 约束解决什么问题，能替代全部运行时检查吗？"
            ]
          },
          "articles": [
            {
              "title": "Go 泛型",
              "href": "/docs/basic-knowledge/go/language/generics",
              "core": true,
              "scope": "约束、类型集合、类型推断与 comparable。"
            },
            {
              "title": "Go 反射",
              "href": "/docs/basic-knowledge/go/language/reflection",
              "core": false,
              "scope": "反射类型、值、可设置性与接口边界；按实际动态操作理解。"
            }
          ]
        }
      ]
    },
    {
      "id": "go-concurrency",
      "title": "并发与运行时",
      "topics": [
        {
          "id": "go-goroutines",
          "title": "goroutine 与 channel",
          "priority": "must",
          "depth": "mechanism",
          "details": {
            "outcomes": [
              "按通道状态推演阻塞、关闭和广播，解释 select 的就绪选择。",
              "把任务完成、数据交付与共享状态保护分开设计。"
            ],
            "interviewQuestions": [
              "多个生产者怎样保证只关闭一次 channel？",
              "取消和业务分支同时就绪时，select 会优先取消吗？"
            ]
          },
          "articles": [
            {
              "title": "goroutine",
              "href": "/docs/basic-knowledge/go/concurrency/goroutines",
              "core": true,
              "scope": "创建、参数求值、等待和退出责任；区分 goroutine 与操作系统线程。"
            },
            {
              "title": "channel",
              "href": "/docs/basic-knowledge/go/concurrency/channels",
              "core": true,
              "scope": "缓冲、nil、关闭与收发结果；先按状态表推演，不背运行时结构。"
            },
            {
              "title": "select",
              "href": "/docs/basic-knowledge/go/concurrency/select",
              "core": true,
              "scope": "基本就绪选择、nil/default 分支与循环退出，为后面的取消处理做准备。"
            },
            {
              "title": "select",
              "href": "/docs/basic-knowledge/go/concurrency/select#协作取消",
              "core": false,
              "scope": "协作取消与同时就绪的分支，解释取消优先级的边界。"
            }
          ],
          "firstRound": {
            "outcomes": [
              "说明 goroutine 如何启动与完成，不能用 main 等待时间代替完成通知。",
              "正确判断通道收发是否阻塞或 panic，使用 select 等待多个信号，并说明谁有权关闭通道。"
            ],
            "questions": [
              "有缓冲 channel 满了会发生什么？",
              "关闭 channel 是否表示消费者已经处理完数据？"
            ]
          }
        },
        {
          "id": "go-synchronization",
          "title": "互斥与任务同步",
          "priority": "must",
          "depth": "mechanism",
          "details": {
            "outcomes": [
              "用同一套访问规则保护完整读改写，解释读写锁与等待工具的分工。",
              "通过 happens-before 说明可见性，区分无数据竞争与业务正确性。"
            ],
            "interviewQuestions": [
              "给读取和写入分别加锁，为什么仍可能丢失更新？",
              "为什么 WaitGroup 等到了结果，却不能保护任务之间的 count++？"
            ]
          },
          "articles": [
            {
              "title": "Go 互斥锁",
              "href": "/docs/basic-knowledge/go/concurrency/mutexes",
              "core": true,
              "scope": "临界区、不可复制、Mutex 与 RWMutex；等待交接实现留到深入阅读。"
            },
            {
              "title": "Go 同步原语",
              "href": "/docs/basic-knowledge/go/concurrency/synchronization",
              "core": true,
              "scope": "WaitGroup 的 Add/Done/Wait 顺序和 Once 初始化保证；Cond 按需继续。"
            },
            {
              "title": "Go 内存模型",
              "href": "/docs/basic-knowledge/go/concurrency/memory-model",
              "core": false,
              "scope": "同步关系、数据竞争与 -race 的验证范围。"
            },
            {
              "title": "Go 互斥锁",
              "href": "/docs/basic-knowledge/go/concurrency/mutexes#mutex的等待与交接",
              "core": false,
              "scope": "有限自旋、挂起、正常模式与饥饿模式，说明实现阈值的边界。"
            }
          ],
          "firstRound": {
            "outcomes": [
              "为共享计数选择锁，并把整个读改写放入临界区。",
              "正确安排 WaitGroup 的登记和等待，说明 Once 与互斥锁解决的问题不同。"
            ],
            "questions": [
              "为什么带锁的结构体使用后不能随意复制？",
              "为什么 Add 放在刚启动的 goroutine 里可能让 Wait 提前返回？"
            ]
          }
        },
        {
          "id": "go-cancellation",
          "title": "取消与并发任务管理",
          "priority": "must",
          "depth": "scenario",
          "details": {
            "outcomes": [
              "把 deadline 传到阻塞操作，区分停止等待、停止工作与已提交副作用。",
              "为一批任务设置活跃数量、排队上限、错误处理与退出确认。"
            ],
            "interviewQuestions": [
              "errgroup 的首个任务失败后，Wait 为什么可能仍不返回？",
              "队列有界，为什么进程里仍可能出现大量等待 goroutine？"
            ]
          },
          "articles": [
            {
              "title": "context",
              "href": "/docs/basic-knowledge/go/concurrency/context",
              "core": true,
              "scope": "取消树、期限、cancel 释放与请求作用域；明确取消只是通知。"
            },
            {
              "title": "Go 并发任务管理",
              "href": "/docs/basic-knowledge/go/concurrency/task-coordination",
              "core": true,
              "scope": "任务约定、固定 worker 与有界派发；先能说明如何结束生产和消费。"
            },
            {
              "title": "Go 并发诊断",
              "href": "/docs/basic-knowledge/go/concurrency/leaks-races",
              "core": false,
              "scope": "goroutine 栈、泄漏、数据竞争与最小复现。"
            },
            {
              "title": "Go 并发任务管理",
              "href": "/docs/basic-knowledge/go/concurrency/task-coordination#errgroup",
              "core": false,
              "scope": "首错取消、等待所有任务返回与派生 context 的生命周期。"
            }
          ],
          "firstRound": {
            "outcomes": [
              "把同一个请求的取消传到子任务，并等待它们完成清理。",
              "说明并发上限与队列容量的区别，为阻塞发送安排退出路径。"
            ],
            "questions": [
              "取消一个子 context 会不会取消兄弟任务？",
              "收到取消通知是否就可以关闭其他任务还在使用的资源？"
            ]
          }
        },
        {
          "id": "go-runtime",
          "title": "调度、内存与 GC",
          "priority": "common",
          "depth": "mechanism",
          "details": {
            "outcomes": [
              "用 G、M、P 解释阻塞、恢复和并行度，而不把 goroutine 数等同于线程数。",
              "从可达性、分配和并发标记解释 GC 成本，区分堆占用与进程 RSS。"
            ],
            "interviewQuestions": [
              "GOMAXPROCS 限制的是什么，为什么线程数还可能更多？",
              "对象业务上不用了，为什么 GC 仍可能无法回收？"
            ]
          },
          "articles": [
            {
              "title": "Go 调度器",
              "href": "/docs/basic-knowledge/go/runtime/scheduler",
              "core": true,
              "scope": "GMP、队列、工作窃取、阻塞恢复与抢占条件。"
            },
            {
              "title": "Go 内存分配",
              "href": "/docs/basic-knowledge/go/runtime/memory-allocation",
              "core": true,
              "scope": "栈、堆、小对象分配路径与栈增长。"
            },
            {
              "title": "Go 垃圾回收",
              "href": "/docs/basic-knowledge/go/runtime/garbage-collection",
              "core": true,
              "scope": "可达性、并发标记、写屏障、GOGC 与 GOMEMLIMIT 的范围。"
            },
            {
              "title": "Go 网络轮询",
              "href": "/docs/basic-knowledge/go/runtime/network-poller",
              "core": false,
              "scope": "网络就绪与 goroutine 唤醒；区别 socket 与普通文件。"
            },
            {
              "title": "Go 运行时",
              "href": "/docs/basic-knowledge/go/runtime/",
              "core": false
            }
          ]
        },
        {
          "id": "go-concurrent-tools",
          "title": "并发工具的选择",
          "priority": "common",
          "depth": "scenario",
          "details": {
            "outcomes": [
              "根据单键操作、跨字段不变量和对象所有权选择同步方式。",
              "用原子操作保护合适的单变量状态；需要对象复用或重复请求合并时再补相应工具。"
            ],
            "interviewQuestions": [
              "Load 后 Store 能不能实现并发计数？",
              "原子发布一个指针，会自动保护对象之后的修改吗？"
            ]
          },
          "articles": [
            {
              "title": "sync.Map",
              "href": "/docs/basic-knowledge/go/concurrency/sync-map",
              "core": true,
              "scope": "单次操作与复合约束、Range 和适用访问模式。"
            },
            {
              "title": "Go 原子操作",
              "href": "/docs/basic-knowledge/go/concurrency/atomics",
              "core": true,
              "scope": "原子操作与多步不变量、发布与 ABA。"
            },
            {
              "title": "singleflight",
              "href": "/docs/basic-knowledge/go/concurrency/singleflight",
              "core": false,
              "scope": "Group/key 范围、共同等待和取消边界。"
            },
            {
              "title": "sync.Pool",
              "href": "/docs/basic-knowledge/go/concurrency/sync-pool",
              "core": false,
              "scope": "临时对象借用、重置、归还后停止访问和 GC 清理。"
            }
          ]
        },
        {
          "id": "go-diagnosis",
          "title": "性能证据与排障",
          "priority": "common",
          "depth": "scenario",
          "details": {
            "outcomes": [
              "从延迟、CPU、等待和分配现象选择 profile 或 trace。",
              "把 Go 观测与操作系统指标结合，保持比较负载和采集条件一致。"
            ],
            "interviewQuestions": [
              "CPU 不高但请求慢，应继续查哪些等待阶段？",
              "heap profile 降低了，为什么 RSS 不一定同步下降？"
            ]
          },
          "articles": [
            {
              "title": "Go 性能分析",
              "href": "/docs/basic-knowledge/go/engineering/profiling",
              "core": true,
              "scope": "CPU、heap、goroutine、mutex/block profile 与 trace 的分工。"
            },
            {
              "title": "Linux 性能排查",
              "href": "/docs/devops/linux/performance-troubleshooting",
              "core": true,
              "scope": "load average、CPU、内存与 I/O 场景的证据链。"
            },
            {
              "title": "可观测性",
              "href": "/docs/system-design/production/logs-metrics-traces-correlation",
              "core": false,
              "scope": "指标、日志、Trace 与关联 ID，串起一次请求的证据。"
            }
          ]
        }
      ]
    },
    {
      "id": "go-services",
      "title": "请求链路与数据访问",
      "topics": [
        {
          "id": "go-protocols",
          "title": "HTTP 与传输协议",
          "priority": "must",
          "depth": "mechanism",
          "details": {
            "outcomes": [
              "从请求、连接池与重试区分不同阶段的失败。",
              "解释 TCP 字节流和 UDP 数据报，连接复用与多路复用各解决什么问题。"
            ],
            "interviewQuestions": [
              "响应超时为什么不能证明服务端没有处理请求？",
              "应用层怎样在 TCP 字节流里划分一条消息？"
            ]
          },
          "articles": [
            {
              "title": "HTTP",
              "href": "/docs/basic-knowledge/network/http-versions-connection-reuse-timeouts#请求与响应",
              "core": true,
              "scope": "请求响应、方法、状态码、HTTP/1.1 持久连接与超时；先不展开 HTTP/3。"
            },
            {
              "title": "TCP 与 UDP",
              "href": "/docs/basic-knowledge/network/tcp_udp",
              "core": true,
              "scope": "TCP 字节流、可靠传输与 UDP 数据报；结合应用协议说明消息边界。"
            },
            {
              "title": "HTTP",
              "href": "/docs/basic-knowledge/network/http-versions-connection-reuse-timeouts#http2-多路复用",
              "core": false,
              "scope": "多路复用与传输层队头阻塞，继续检查超时与重试。"
            },
            {
              "title": "TLS",
              "href": "/docs/basic-knowledge/network/tls",
              "core": false,
              "scope": "证书、身份验证、握手与加密的分工。"
            }
          ],
          "firstRound": {
            "outcomes": [
              "沿一次 HTTP 调用说清请求、响应、连接和超时，区分状态码与网络错误。",
              "比较 TCP 与 UDP 提供的保证，不把 TCP 可靠性等同于业务成功。"
            ],
            "questions": [
              "HTTP 500 与连接超时需要怎样分别处理？",
              "一次 Write 是否对应接收方的一次 Read？"
            ]
          }
        },
        {
          "id": "go-http",
          "title": "Go HTTP 服务与客户端",
          "priority": "must",
          "depth": "scenario",
          "details": {
            "outcomes": [
              "解释 Handler 生命周期、超时、响应提交和优雅关闭。",
              "为可复用客户端设置期限，正确处理响应体、错误和有限重试。"
            ],
            "interviewQuestions": [
              "Handler 返回后还能在后台 goroutine 写 ResponseWriter 吗？",
              "关闭响应体为什么不一定保证连接复用？"
            ]
          },
          "articles": [
            {
              "title": "Go HTTP 服务",
              "href": "/docs/basic-knowledge/go/web/http-server",
              "core": true,
              "scope": "Server/Handler/ServeMux、响应提交、请求体与中间件；先走通正常与错误路径。"
            },
            {
              "title": "Go HTTP 客户端",
              "href": "/docs/basic-knowledge/go/web/http-client",
              "core": true,
              "scope": "Client/Transport、状态检查、响应体释放和整体期限；复用客户端。"
            },
            {
              "title": "Go HTTP 服务",
              "href": "/docs/basic-knowledge/go/web/http-server#优雅关闭",
              "core": false,
              "scope": "Shutdown 的排空、超时与强制关闭责任。"
            },
            {
              "title": "Go HTTP 客户端",
              "href": "/docs/basic-knowledge/go/web/http-client#重定向重试与定位",
              "core": false,
              "scope": "连接池上限与重定向、重试条件。"
            }
          ],
          "firstRound": {
            "outcomes": [
              "写清 Handler 的输入检查、状态码和响应体顺序，不把响应留到处理结束之后。",
              "说明客户端何时检查错误、状态码和响应体读取错误，并释放响应体。"
            ],
            "questions": [
              "先 Write 再 WriteHeader(500) 会怎样？",
              "为什么每次请求都新建 Transport 会影响连接复用？"
            ]
          }
        },
        {
          "id": "go-database",
          "title": "SQL、事务与 Go 数据库访问",
          "priority": "must",
          "depth": "scenario",
          "details": {
            "outcomes": [
              "把业务约束落实到事务、条件更新与结果检查。",
              "解释连接池等待、Rows 生命周期、Tx 边界和提交结果不确定性。"
            ],
            "interviewQuestions": [
              "事务函数内调用 db.ExecContext，为什么不会自动加入 tx？",
              "同一个事务两次 COUNT 的结果何时可能不同？"
            ]
          },
          "articles": [
            {
              "title": "SQL 查询",
              "href": "/docs/basic-knowledge/database/sql/query#core",
              "core": true,
              "scope": "过滤、NULL、排序和分页；能独立写出带条件的查询，不把值拼进 SQL。"
            },
            {
              "title": "数据库事务",
              "href": "/docs/basic-knowledge/database/transaction/#1-事务保护一组相关状态变化",
              "core": true,
              "scope": "事务边界、ACID、并发异常和提交回滚；先用两步更新说明保证。"
            },
            {
              "title": "database/sql",
              "href": "/docs/basic-knowledge/go/database/database-sql",
              "core": true,
              "scope": "DB 连接池、Rows/Scan、Tx 和 context；检查错误并及时释放资源。"
            },
            {
              "title": "MVCC",
              "href": "/docs/basic-knowledge/database/transaction/mvcc-read-view-consistent-read",
              "core": false,
              "scope": "Read View、RC/RR、一致性读和当前读，按两个连接的时序推演。"
            },
            {
              "title": "MySQL 数据类型",
              "href": "/docs/basic-knowledge/database/modeling/data-types",
              "core": false
            }
          ],
          "firstRound": {
            "outcomes": [
              "写出带过滤、排序和分页的查询，说明 NULL 与普通值比较的差别。",
              "把相关更新放在同一个 Tx，检查查询和提交错误，说明连接池为何需要上限。"
            ],
            "questions": [
              "Rows.Next 返回 false 后还要检查什么？",
              "为什么事务中的两条 SQL 必须通过同一个 Tx 调用？"
            ]
          }
        },
        {
          "id": "go-indexes",
          "title": "索引与查询定位",
          "priority": "common",
          "depth": "scenario",
          "details": {
            "outcomes": [
              "从过滤、排序与返回字段设计联合索引，解释回表与覆盖索引。",
              "用 EXPLAIN 区分访问路径和真实成本，核对选择率与估算偏差。"
            ],
            "interviewQuestions": [
              "联合索引顺序为什么影响查询可利用的范围？",
              "执行计划出现索引名称，是否就能判定查询足够快？"
            ]
          },
          "articles": [
            {
              "title": "数据库索引",
              "href": "/docs/basic-knowledge/database/indices/#1-索引减少需要读取的数据页",
              "core": true,
              "scope": "B+ 树、聚簇与二级索引、联合索引及维护成本。"
            },
            {
              "title": "执行计划",
              "href": "/docs/basic-knowledge/database/indices/execution-plan#从查询条件到访问路径",
              "core": true,
              "scope": "type/key/rows/Extra 与实际统计，围绕一条查询形成证据。"
            },
            {
              "title": "MySQL 事务日志",
              "href": "/docs/basic-knowledge/database/storage/transaction-logs",
              "core": false,
              "scope": "undo、redo、binlog 与 WAL 的职责，连接事务和恢复。"
            },
            {
              "title": "InnoDB",
              "href": "/docs/basic-knowledge/database/storage/innodb",
              "core": false
            }
          ]
        },
        {
          "id": "go-security",
          "title": "身份与访问权限",
          "priority": "common",
          "depth": "scenario",
          "details": {
            "outcomes": [
              "区分身份验证和资源授权，沿请求链检查可信身份与资源归属。",
              "解释 Session 与 JWT 的状态、验证和撤销边界，不把签名当成加密。"
            ],
            "interviewQuestions": [
              "用户已经登录，为什么查询订单时仍要验证资源归属？",
              "撤销 Refresh Token 后，已经签发的 Access Token 是否立即失效？"
            ]
          },
          "articles": [
            {
              "title": "认证与授权",
              "href": "/docs/system-design/security/authentication-authorization-trust-boundaries#信任边界",
              "core": true,
              "scope": "信任边界、认证、资源授权和多租户隔离。"
            },
            {
              "title": "Session、JWT、OAuth 2.0 与 OIDC",
              "href": "/docs/system-design/security/session-jwt-oauth-oidc#session",
              "core": true,
              "scope": "Session、JWT 验证与撤销；OAuth/OIDC 按登录集成需求继续。"
            }
          ]
        },
        {
          "id": "go-cache",
          "title": "Redis 与缓存一致性",
          "priority": "common",
          "depth": "scenario",
          "details": {
            "outcomes": [
              "按访问方式选择 Redis 类型，区分数据类型、内部编码与单条命令的保证。",
              "推演 Cache-Aside 的读写时序、删除失败和旧值回填；遇到容量问题再区分穿透、击穿、雪崩与热点。"
            ],
            "interviewQuestions": [
              "修改数据库后删除缓存，为什么仍需考虑并发回填？",
              "旧值回填为什么可能重新获得完整的一段 TTL？"
            ]
          },
          "articles": [
            {
              "title": "Redis 数据结构",
              "href": "/docs/basic-knowledge/nosql/redis/data_structure",
              "core": true,
              "scope": "String、Hash、Set、ZSet 的场景与命令边界；先按数据关系选择。"
            },
            {
              "title": "缓存一致性",
              "href": "/docs/basic-knowledge/nosql/redis/cache-patterns-consistency#适合缓存的数据",
              "core": true,
              "scope": "Cache-Aside、失效顺序、过期与一致性边界。"
            },
            {
              "title": "缓存穿透、击穿、雪崩与热点 Key",
              "href": "/docs/basic-knowledge/nosql/redis/cache-penetration-stampede-avalanche-hotkeys",
              "core": false,
              "scope": "穿透、击穿、雪崩与热点识别，按故障成因选择保护。"
            },
            {
              "title": "Redis 持久化",
              "href": "/docs/basic-knowledge/nosql/redis/persistence",
              "core": false,
              "scope": "RDB/AOF、复制确认与恢复目标；不要把复制当成强一致保证。"
            }
          ]
        }
      ]
    },
    {
      "id": "go-practice",
      "title": "编码、交付与项目表达",
      "topics": [
        {
          "id": "go-coding",
          "title": "基础编码与自检",
          "priority": "must",
          "depth": "mechanism",
          "details": {
            "outcomes": [
              "根据不变量选择哈希和双指针，说明复杂度、重复值与输入副作用。",
              "扩展到二分与链表时，先明确边界和更新顺序，再验证反例。"
            ],
            "interviewQuestions": [
              "二分查找在区间收缩时怎样保证不漏解并且一定结束？",
              "链表反转时为什么必须先保存 next？"
            ]
          },
          "articles": [
            {
              "title": "哈希表",
              "href": "/docs/basic-knowledge/data-structures/hash-table",
              "core": true,
              "scope": "哈希定位、冲突、扩容与复杂度，选一个计数或去重问题解释。"
            },
            {
              "title": "双指针",
              "href": "/docs/basic-knowledge/algorithms/two-pointers",
              "core": true,
              "scope": "相向与同向移动的依据、边界和重复值；第一轮先完成一个线性扫描。"
            },
            {
              "title": "二分查找",
              "href": "/docs/basic-knowledge/algorithms/binary-search",
              "core": false,
              "scope": "区间不变量、左右边界与终止条件。"
            },
            {
              "title": "链表",
              "href": "/docs/basic-knowledge/data-structures/linked-list",
              "core": false,
              "scope": "节点链接、原地反转和快慢指针。"
            },
            {
              "title": "整数运算",
              "href": "/docs/basic-knowledge/algorithms/integer-arithmetic",
              "core": false
            }
          ],
          "firstRound": {
            "outcomes": [
              "现场先说明输入输出和不变量，再写实现、复杂度与边界用例。",
              "独立用 Go 完成一次哈希计数和双指针扫描；阅读示例语言不作为题目的语言要求。"
            ],
            "questions": [
              "为什么移动这个指针不会漏掉答案？",
              "空输入、重复值和越界应怎样验证？"
            ]
          }
        },
        {
          "id": "go-algorithms",
          "title": "排序与状态设计",
          "priority": "common",
          "depth": "mechanism",
          "details": {
            "outcomes": [
              "解释分区、合并、稳定性与额外空间，从规模选择排序方法。",
              "从状态定义推出转移、初始化和计算顺序，并用小规模枚举核对。"
            ],
            "interviewQuestions": [
              "大量重复值时，三路分区怎样减少重复处理？",
              "动态规划漏掉一种转移会怎样被最小反例发现？"
            ]
          },
          "articles": [
            {
              "title": "排序",
              "href": "/docs/basic-knowledge/algorithms/sorting",
              "core": true,
              "scope": "快排、三路分区、归并、计数排序及稳定性条件。"
            },
            {
              "title": "动态规划",
              "href": "/docs/basic-knowledge/java/algorithms/dynamic-programming-state-design",
              "core": true,
              "scope": "状态、转移、初始化和遍历顺序；理解通用算法后用 Go 自行实现。"
            },
            {
              "title": "堆",
              "href": "/docs/basic-knowledge/data-structures/heap",
              "core": false,
              "scope": "堆的局部有序、建堆与 Top-K，核对更新成本。"
            },
            {
              "title": "图",
              "href": "/docs/basic-knowledge/data-structures/graph",
              "core": false,
              "scope": "邻接表、访问状态、DFS/BFS 与连通分量。"
            }
          ]
        },
        {
          "id": "go-operations",
          "title": "Linux 与交付",
          "priority": "common",
          "depth": "scenario",
          "details": {
            "outcomes": [
              "用文件、进程、权限和日志命令缩小故障范围，核对管道与聚合单位。",
              "将可重复构建、制品标识与发布验证连接起来，区分构建通过和运行正确。"
            ],
            "interviewQuestions": [
              "日志中的请求次数最多与总响应字节最多，为什么不是同一个统计？",
              "同一提交为什么仍可能构建出不同镜像？"
            ]
          },
          "articles": [
            {
              "title": "Linux 常用命令与文件权限",
              "href": "/docs/devops/linux/commands-permissions",
              "core": true,
              "scope": "查文件与进程、grep 上下文、权限、管道和日志聚合。"
            },
            {
              "title": "可重复交付",
              "href": "/docs/system-design/production/docker-ci-cd-reproducible-delivery",
              "core": true,
              "scope": "固定依赖、镜像 digest、CI 验证与制品晋升；按实际交付链路复习。"
            },
            {
              "title": "Git",
              "href": "/docs/tools-and-frameworks/git/",
              "core": false,
              "scope": "工作区、暂存区、提交、合并与撤销；操作前先明确保留哪些修改。"
            }
          ]
        },
        {
          "id": "go-project",
          "title": "项目链路与个人证据",
          "priority": "must",
          "depth": "scenario",
          "details": {
            "outcomes": [
              "围绕一个真实项目解释约束、个人贡献、失败路径和替代方案。",
              "把容量假设与实测结果分开，能说明尚未验证的范围。"
            ],
            "interviewQuestions": [
              "你负责的请求从入口到提交结果经历哪些步骤？",
              "如果流量增加或依赖超时，先保护什么，怎样证明方案有效？"
            ]
          },
          "articles": [
            {
              "title": "项目准备",
              "href": "/docs/interview/project-preparation",
              "core": true,
              "scope": "一页项目材料、请求链路、技术追问与独立演练；将示例换成自己的 Go 项目，Spring 等延伸不属本轮要求。"
            },
            {
              "title": "容量规划",
              "href": "/docs/system-design/system-design/capacity-slo-failure-model",
              "core": false,
              "scope": "负载、容量余量、SLO 和故障模型；为自己的项目列出可核验假设。"
            }
          ],
          "firstRound": {
            "outcomes": [
              "用一页材料说明本人做了什么、一次请求怎样执行、一次失败怎样验证。",
              "用实际代码或记录支撑一个技术选择，不把教学例子或未实现能力当成个人成果。"
            ],
            "questions": [
              "你亲自定位并修复过哪个问题，证据是什么？",
              "不用缓存或 MQ 时，这个项目是否仍能满足当前约束？"
            ]
          }
        }
      ]
    },
    {
      "id": "go-distributed",
      "title": "后端可靠性与分布式机制",
      "topics": [
        {
          "id": "go-reliability",
          "title": "重试与容量保护",
          "priority": "common",
          "depth": "scenario",
          "details": {
            "outcomes": [
              "按业务标识识别重复请求，区分获取结果与再次执行。",
              "区分速率限制与并发上限，说明限流维度、等待和拒绝策略；依赖故障时再补熔断与隔离。"
            ],
            "interviewQuestions": [
              "请求超时后怎样重试，才能避免重复扣款？",
              "限流限制请求速率，为什么还可能需要限制同时执行的请求数？"
            ]
          },
          "articles": [
            {
              "title": "幂等键",
              "href": "/docs/system-design/reliability/idempotency-keys-safe-retries",
              "core": true,
              "scope": "幂等键、原子占用、业务结果与重复请求返回。"
            },
            {
              "title": "限流",
              "href": "/docs/system-design/reliability/rate-limiting-capacity-protection",
              "core": true,
              "scope": "速率与并发限制、窗口与令牌桶，明确限流维度。"
            },
            {
              "title": "服务容错",
              "href": "/docs/system-design/reliability/circuit-breaker-degradation-bulkhead",
              "core": false,
              "scope": "超时、熔断、降级与隔离的条件和恢复。"
            }
          ]
        },
        {
          "id": "go-messaging",
          "title": "消息投递与恢复",
          "priority": "common",
          "depth": "scenario",
          "details": {
            "outcomes": [
              "区分确认、持久化、消费进度与业务成功，按消息粒度解释顺序。",
              "给失败消息安排有限重试、死信和重放，保证重复处理的业务结果可控。"
            ],
            "interviewQuestions": [
              "消费者处理成功但确认丢失，会发生什么？",
              "先提交消费进度再完成业务，可能造成什么结果？"
            ]
          },
          "articles": [
            {
              "title": "消息队列",
              "href": "/docs/basic-knowledge/middleware/kafka-rabbitmq-queue-semantics",
              "core": true,
              "scope": "队列与日志、分区顺序、消费进度和投递语义。"
            },
            {
              "title": "消息可靠性",
              "href": "/docs/basic-knowledge/middleware/message-ack-retry-dead-letter",
              "core": true,
              "scope": "生产者确认、消费者确认时机、重试与死信。"
            },
            {
              "title": "消息幂等性",
              "href": "/docs/basic-knowledge/middleware/idempotent-consumption-order-duplicates",
              "core": false,
              "scope": "重复消费、业务幂等和顺序的适用范围。"
            }
          ]
        },
        {
          "id": "go-coordination",
          "title": "跨进程并发控制",
          "priority": "common",
          "depth": "scenario",
          "details": {
            "outcomes": [
              "比较条件更新、Redis 原子操作和分布式锁所保护的约束。",
              "解释租约过期、未知结果和旧持有者继续执行的边界，不把锁当成业务幂等。"
            ],
            "interviewQuestions": [
              "客户端超时后为什么不能确定加锁失败？",
              "锁过期后旧请求继续写入，单靠释放时比对 token 能防止吗？"
            ]
          },
          "articles": [
            {
              "title": "乐观并发控制",
              "href": "/docs/system-design/distributed-data/optimistic-concurrency-control",
              "core": true,
              "scope": "版本谓词、影响行数、重试与 ABA，先判断条件更新能否解决问题。"
            },
            {
              "title": "分布式锁",
              "href": "/docs/basic-knowledge/nosql/redis/distributed-lock-conditions-boundaries",
              "core": true,
              "scope": "唯一所有者、条件释放、租约、fencing 与最小 Go 调用。"
            },
            {
              "title": "Raft",
              "href": "/docs/system-design/distributed-system/raft-election-log-replication",
              "core": false,
              "scope": "多数派、日志一致性和故障假设；需要解释一致性协议时继续。"
            },
            {
              "title": "etcd",
              "href": "/docs/basic-knowledge/middleware/etcd",
              "core": false
            },
            {
              "title": "ZooKeeper",
              "href": "/docs/basic-knowledge/middleware/zookeeper",
              "core": false
            }
          ]
        }
      ]
    },
    {
      "id": "go-specialization",
      "title": "按岗位和项目补充",
      "topics": [
        {
          "id": "go-gin",
          "title": "Gin 请求处理",
          "priority": "optional",
          "depth": "scenario",
          "details": {
            "outcomes": [
              "项目或 JD 使用 Gin 时，解释它与 net/http 的分工。",
              "沿路由、中间件和 Context 生命周期定位校验与错误处理。"
            ],
            "interviewQuestions": [
              "Abort 为什么不等于当前处理器 return？",
              "为什么不能把原始 gin.Context 留到请求结束以后使用？"
            ]
          },
          "articles": [
            {
              "title": "Gin",
              "href": "/docs/basic-knowledge/go/web/gin",
              "core": true,
              "scope": "路由、Next/Abort、绑定校验与 Context 生命周期。"
            }
          ]
        },
        {
          "id": "go-gorm",
          "title": "GORM 数据访问",
          "priority": "optional",
          "depth": "scenario",
          "details": {
            "outcomes": [
              "项目使用 GORM 时，核对生成 SQL、影响行数、零值更新与事务句柄。",
              "定位关联查询的 N+1，先看查询行为再判断 ORM 成本。"
            ],
            "interviewQuestions": [
              "结构体 Updates 为什么可能不把 false 写入数据库？",
              "事务回调里继续使用原 db，会破坏什么保证？"
            ]
          },
          "articles": [
            {
              "title": "GORM",
              "href": "/docs/basic-knowledge/go/database/gorm",
              "core": true,
              "scope": "查询结果、零值更新、事务、关联查询与 SQL 检查。"
            }
          ]
        },
        {
          "id": "go-grpc",
          "title": "gRPC 服务调用",
          "priority": "optional",
          "depth": "scenario",
          "details": {
            "outcomes": [
              "需要 RPC 接口时，区分契约、序列化、传输和业务实现。",
              "在 grpc-go 中安排 deadline、状态处理、流关闭与幂等重试。"
            ],
            "interviewQuestions": [
              "ClientConn 创建成功是否说明服务已经可达？",
              "调用超时为什么不能据此判定服务端没有提交？"
            ]
          },
          "articles": [
            {
              "title": "gRPC",
              "href": "/docs/basic-knowledge/network/grpc",
              "core": true,
              "scope": "gRPC 的接口、消息与 HTTP/2 传输分工。"
            },
            {
              "title": "gRPC-Go",
              "href": "/docs/basic-knowledge/go/web/grpc-go",
              "core": true,
              "scope": "生成代码、ClientConn、deadline、状态、拦截器与流生命周期。"
            },
            {
              "title": "RPC",
              "href": "/docs/basic-knowledge/network/rpc-serialization-netty-event-loop#rpc-调用链",
              "core": false,
              "scope": "RPC 调用链与协议分工。"
            }
          ]
        },
        {
          "id": "go-gozero",
          "title": "go-zero 服务工程",
          "priority": "optional",
          "depth": "scenario",
          "details": {
            "outcomes": [
              "已有 go-zero 项目时，解释生成代码与业务代码各自负责什么。",
              "沿请求、数据库会话和缓存失效定位失败边界，而不只介绍脚手架命令。"
            ],
            "interviewQuestions": [
              "同一方法里的 SQL 为什么仍可能不在同一个事务中？",
              "缓存删除失败或旧请求回填时，怎样判断一致性边界？"
            ]
          },
          "articles": [
            {
              "title": "go-zero",
              "href": "/docs/basic-knowledge/go/web/go-zero",
              "core": true,
              "scope": "服务入口、校验、中间件、错误响应与关闭。"
            },
            {
              "title": "go-zero sqlx",
              "href": "/docs/basic-knowledge/go/database/sqlx",
              "core": true,
              "scope": "go-zero sqlx 的 Session、Tx 与结果处理。"
            },
            {
              "title": "go-zero sqlc",
              "href": "/docs/basic-knowledge/go/database/sqlc",
              "core": true,
              "scope": "go-zero sqlc 的缓存键、负缓存和写后失效。"
            }
          ]
        },
        {
          "id": "go-cloud-native",
          "title": "容器与 Kubernetes",
          "priority": "optional",
          "depth": "scenario",
          "details": {
            "outcomes": [
              "岗位涉及容器或 Kubernetes 时，区分隔离、资源限制和进程生命周期。",
              "解释 Pod、Deployment 与 Service 的分工；开发控制器时再补 client-go 的协调循环。"
            ],
            "interviewQuestions": [
              "容器运行环境与宿主机内核是什么关系？",
              "Pod 被替换后，客户端怎样继续通过 Service 访问后端？"
            ]
          },
          "articles": [
            {
              "title": "容器原理",
              "href": "/docs/devops/containers/container-principles",
              "core": true,
              "scope": "namespace、cgroup、文件系统与容器进程的隔离边界。"
            },
            {
              "title": "工作负载、Service 与集群网络",
              "href": "/docs/devops/kubernetes/workloads-networking",
              "core": true,
              "scope": "Pod、Deployment、Service 与集群网络。"
            },
            {
              "title": "client-go",
              "href": "/docs/basic-knowledge/go/cloud-native/client-go",
              "core": false,
              "scope": "List/Watch、Informer、工作队列与幂等协调。"
            },
            {
              "title": "服务网格",
              "href": "/docs/system-design/microservices/service-mesh",
              "core": false,
              "scope": "服务网格的数据面与控制面、代理职责和运维成本。"
            }
          ]
        },
        {
          "id": "go-system-design",
          "title": "系统设计演练",
          "priority": "optional",
          "depth": "scenario",
          "details": {
            "outcomes": [
              "目标面试涉及系统设计时，从容量和业务不变量开始选择组件。",
              "按自己的项目选择一个案例，说明正常路径、失败恢复与方案代价。"
            ],
            "interviewQuestions": [
              "短链接创建与跳转分别怎样应对重复请求和热点？",
              "短码碰撞与重复创建请求，为什么需要分别处理？"
            ]
          },
          "articles": [
            {
              "title": "短链接设计",
              "href": "/docs/system-design/cases/short-links",
              "core": true,
              "scope": "映射、短码冲突、幂等创建、跳转与失效；可作为第一个设计案例。"
            },
            {
              "title": "秒杀系统设计",
              "href": "/docs/system-design/cases/flash-sale",
              "core": false,
              "scope": "库存事务、下单幂等、支付与关单竞争；有交易系统需求时继续。"
            },
            {
              "title": "Feed 流设计",
              "href": "/docs/system-design/cases/feed",
              "core": false,
              "scope": "推拉分发、游标分页、点赞与评论；有信息流需求时继续。"
            },
            {
              "title": "分布式缓存设计",
              "href": "/docs/system-design/cases/distributed-cache",
              "core": false,
              "scope": "缓存节点、分片副本、失效与故障；有缓存系统需求时继续。"
            },
            {
              "title": "随机算法",
              "href": "/docs/basic-knowledge/algorithms/randomized-algorithms",
              "core": false
            },
            {
              "title": "流式统计",
              "href": "/docs/basic-knowledge/algorithms/streaming-statistics",
              "core": false
            },
            {
              "title": "布隆过滤器",
              "href": "/docs/basic-knowledge/data-structures/bloom-filter",
              "core": false
            },
            {
              "title": "一致性哈希",
              "href": "/docs/basic-knowledge/data-structures/consistent-hashing",
              "core": false
            },
            {
              "title": "分布式 ID",
              "href": "/docs/system-design/distributed-data/distributed-identifiers",
              "core": false
            }
          ]
        },
        {
          "id": "go-storage",
          "title": "对象与块存储",
          "priority": "optional",
          "depth": "mechanism",
          "details": {
            "outcomes": [
              "项目涉及文件或存储系统时，区分对象、块和文件接口的访问方式。",
              "解释对象上传完成、版本和权限边界；需要存储集群机制时再补 Ceph。"
            ],
            "interviewQuestions": [
              "对象存储为什么不等同于挂载一个普通文件系统？",
              "多段上传各段都成功，是否就能读取最终对象？"
            ]
          },
          "articles": [
            {
              "title": "对象存储",
              "href": "/docs/basic-knowledge/storage/object-storage",
              "core": true,
              "scope": "对象标识、元数据、上传与访问控制，连接实际文件需求。"
            },
            {
              "title": "Ceph",
              "href": "/docs/basic-knowledge/storage/ceph",
              "core": false,
              "scope": "RADOS、MON/OSD、CRUSH 与对象/块/文件接口；仅在岗位涉及时展开。"
            },
            {
              "title": "MySQL 分区",
              "href": "/docs/basic-knowledge/database/partitioning",
              "core": false
            },
            {
              "title": "MySQL 复制",
              "href": "/docs/basic-knowledge/database/replication",
              "core": false
            },
            {
              "title": "LSM 树",
              "href": "/docs/basic-knowledge/database/storage/lsm-tree",
              "core": false
            }
          ]
        }
      ]
    }
  ]
};
