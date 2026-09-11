import type {InterviewRoadmapData} from '../../components/InterviewRoadmap';
import {javaCollectionsReview} from '../reviewPlans/javaCollections';

export const javaInterviewRoadmap: InterviewRoadmapData = {
  id: 'java-backend',
  title: 'Java 后端开发面试路线',
  introduction:
    '这条路线面向已有 Java 基础的后端求职者，按考点整理阅读顺序和完成标准。先完成第一轮核心复习，再根据目标岗位补充常考与深入内容。',
  reviewHint:
    '优先级决定先学什么；回答深度决定学到哪里。深度不是候选人职级。“按岗选学”只在目标岗位明确涉及，或能由自己的项目经历支撑时进入。',
  phases: [
    {
      id: 'language-foundation',
      title: 'Java 语言与标准库',

      topics: [
        {
          firstRound: {
            outcomes: [
              '解释值传递、对象身份和相等性的区别。',
              '根据调用链解释重载、重写与动态绑定。',
            ],
            questions: [
              '传入对象后修改字段为什么对调用方可见？',
              '重写 equals 时为什么需要同时处理 hashCode？',
            ],
          },
          id: 'java-oop',
          title: '类型系统与对象模型',
          depth: 'foundation',
          priority: 'must',
          details: {
            outcomes: [
              '能说明基本类型、引用类型、值传递和对象身份之间的关系。',
              '能用业务变化解释组合、继承、接口和抽象类的选择。',
            ],
            interviewQuestions: [
              'Java 为什么只有值传递？传入对象后修改字段为什么仍然可见？',
              '重载、重写和动态绑定分别发生在什么阶段？',
            ],
          },
          articles: [
            {
              core: true,
              title: 'Java 值传递',
              href: '/docs/basic-knowledge/java/language/types-references-value-passing',
            },
            {
              core: true,
              title: '面向对象编程（Object-Oriented Programming）',
              href: '/docs/basic-knowledge/java/language/encapsulation-inheritance-polymorphism',
            },
            {
              core: true,
              title: '对象相等性',
              href: '/docs/basic-knowledge/java/language/equals-hashcode-object-identity',
            },
          ],
        },
        {
          firstRound: {
            outcomes: [
              '解释字符串不可变、装箱与数值精度的使用边界。',
              '说明异常传播、异常分类与资源关闭路径。',
            ],
            questions: [
              '金额为什么不宜直接用 double 表示？',
              'try-with-resources 怎样处理关闭资源时的异常？',
            ],
          },
          id: 'java-values-errors',
          title: '字符串、数值与异常',
          depth: 'foundation',
          priority: 'must',
          details: {
            outcomes: [
              '用 Optional 表达返回值缺失，并选择合适的默认值处理方式。',
            ],
            interviewQuestions: [
              'orElse 与 orElseGet 的默认值计算时机有什么不同？',
            ],
          },
          articles: [
            {
              core: true,
              title: 'String',
              href: '/docs/basic-knowledge/java/language/string-immutability-pool',
            },
            {
              core: true,
              title: 'Java 异常',
              href: '/docs/basic-knowledge/java/language/exceptions-error-boundaries',
            },
            {
              core: true,
              title: 'BigDecimal',
              href: '/docs/basic-knowledge/java/language/bigdecimal-money',
            },
            {
              core: true,
              title: '包装类型',
              href: '/docs/basic-knowledge/java/language/wrappers-boxing-cache',
            },
            {
              core: false,
              title: 'Optional',
              href: '/docs/basic-knowledge/java/language/optional-boundaries',
            },
          ],
        },
        {
          id: 'java-generics-reflection',
          title: '泛型、注解与反射',
          depth: 'mechanism',
          priority: 'common',
          details: {
            outcomes: [
              '能使用上下界、通配符和 PECS 解释 API 的读写约束。',
              '能说明类型擦除、反射调用和注解处理器各自发生的阶段。',
            ],
            interviewQuestions: [
              '为什么不能直接创建 T 的实例或 new T[]？',
              'Spring 如何通过注解和反射找到 Bean 与处理方法？',
            ],
          },
          articles: [
            {
              core: true,
              title: 'Java 泛型',
              href: '/docs/basic-knowledge/java/language/generics',
            },
            {
              core: true,
              title: 'Java 注解',
              href: '/docs/basic-knowledge/java/language/annotations-retention-processing',
            },
            {
              core: true,
              title: 'Java 反射',
              href: '/docs/basic-knowledge/java/language/reflection-method-handles',
            },
            {
              core: false,
              title: 'Java 注解处理器',
              href: '/docs/basic-knowledge/java/language/runtime-scanning-compile-time-generation',
            },
          ],
        },
        {
          id: 'java-io',
          title: 'I/O、NIO 与资源管理',
          depth: 'foundation',
          priority: 'common',
          details: {
            outcomes: [
              '能区分字节流、字符流、缓冲、阻塞和非阻塞。',
              '能解释 try-with-resources 如何沿异常路径关闭资源。',
            ],
            interviewQuestions: [
              'BIO、NIO 和 AIO 的差异到底是线程模型还是 API 名字？',
              '零拷贝减少了哪些数据复制和上下文切换？',
            ],
          },
          articles: [
            {
              core: true,
              title: 'Java 流式 I/O',
              href: '/docs/basic-knowledge/java/io/byte-character-buffered-streams',
            },
            {
              core: true,
              title: 'Java NIO',
              href: '/docs/basic-knowledge/java/io/buffer-channel-selector',
            },
            {
              core: false,
              title: '零拷贝',
              href: '/docs/basic-knowledge/java/io/file-mapping-zero-copy-direct-memory',
            },
            {
              core: false,
              title: 'Java 序列化',
              href: '/docs/basic-knowledge/java/io/java-serialization-compatibility-security',
            },
          ],
        },
        {
          id: 'java-functional',
          title: 'Lambda、Stream 与日期时间',
          depth: 'foundation',
          priority: 'common',
          details: {
            outcomes: [
              '能区分中间操作、终止操作、短路和状态操作。',
              '能正确处理时区、Instant、LocalDateTime 和格式化。',
            ],
            interviewQuestions: [
              'Stream 为什么只能消费一次？惰性求值有什么作用？',
              'parallelStream 在服务端为什么可能让延迟更差？',
            ],
          },
          articles: [
            {
              core: true,
              title: 'Lambda 表达式',
              href: '/docs/basic-knowledge/java/functional/lambda-functional-interfaces-capture',
            },
            {
              core: true,
              title: 'Stream',
              href: '/docs/basic-knowledge/java/functional/stream-pipeline-lazy-evaluation',
            },
            {
              core: false,
              title: 'Collector',
              href: '/docs/basic-knowledge/java/functional/collectors-grouping-reduction',
            },
            {
              core: false,
              title: '并行流',
              href: '/docs/basic-knowledge/java/functional/parallel-stream-model-pitfalls',
            },
            {
              core: true,
              title: 'java.time',
              href: '/docs/basic-knowledge/java/functional/java-time-time-zone-boundaries',
            },
          ],
        },
      ],
    },
    {
      id: 'collections-engineering',
      title: '集合、算法与代码质量',

      topics: [
        {
          guide: javaCollectionsReview,
          firstRound: {
            outcomes: javaCollectionsReview.steps.map((step) => step.outcome),
            questions: javaCollectionsReview.steps.map((step) => step.question),
          },
          id: 'java-collections',
          title: 'Java 集合',
          depth: 'mechanism',
          priority: 'must',
          details: {
            outcomes: [
              '解释 LinkedList 的定位成本，以及有序集合的比较与范围查询。',
              '区分 fail-fast、不可修改视图和不可变副本的保证。',
            ],
            interviewQuestions: [
              '为什么不能仅凭插入删除多就选择 LinkedList？',
              'fail-fast 能否保证线程安全，不可修改视图是否仍可能变化？',
            ],
          },
          articles: [
            ...javaCollectionsReview.steps.map(({title, href, scope}) => ({
              title,
              href,
              scope,
              core: true,
            })),
            {
              title: 'LinkedList',
              href: '/docs/basic-knowledge/java/collections/linkedlist-semantics-cost',
              core: false,
            },
            {
              title: 'TreeMap 与 TreeSet',
              href: '/docs/basic-knowledge/java/collections/treemap-treeset-ordered-query',
              core: false,
            },
            {
              title: '集合迭代器',
              href: '/docs/basic-knowledge/java/collections/iterator-fail-fast-immutable',
              core: false,
            },
          ],
        },
        {
          id: 'hashmap',
          title: 'HashMap 与 LinkedHashMap',
          depth: 'mechanism',
          priority: 'common',
          details: {
            outcomes: [
              '根据哈希位解释容量选择、树化条件与扩容后的节点迁移。',
              '说明 LinkedHashMap 的访问顺序怎样支持 LRU，以及它的限制。',
            ],
            interviewQuestions: [
              'HashMap 为什么使用 2 的幂作为容量？',
              'LinkedHashMap 的访问顺序怎样支持 LRU 淘汰？',
            ],
          },
          articles: [
            {
              core: true,
              title: 'HashMap',
              href: '/docs/basic-knowledge/java/collections/hashmap-structure-lookup-path',
            },
            {
              core: false,
              title: '对象相等性',
              href: '/docs/basic-knowledge/java/language/equals-hashcode-object-identity',
            },
            {
              core: true,
              title: 'LinkedHashMap',
              href: '/docs/basic-knowledge/java/collections/linkedhashmap-lru',
            },
          ],
        },
        {
          id: 'concurrent-collections',
          title: '并发集合',
          depth: 'mechanism',
          priority: 'common',
          details: {
            outcomes: [
              '能比较 ConcurrentHashMap、CopyOnWriteArrayList 和 BlockingQueue。',
              '能用原子复合方法替代先检查后执行的竞态代码。',
            ],
            interviewQuestions: [
              'ConcurrentHashMap 为什么不允许 null？',
              'CopyOnWriteArrayList 适合什么读写比例，代价是什么？',
            ],
          },
          articles: [
            {
              core: true,
              title: 'ConcurrentHashMap',
              href: '/docs/basic-knowledge/java/collections/concurrenthashmap-atomic-compound-operations',
            },
            {
              core: true,
              title: 'CopyOnWrite 容器',
              href: '/docs/basic-knowledge/java/collections/copy-on-write-cost-model',
            },
            {
              core: true,
              title: 'BlockingQueue',
              href: '/docs/basic-knowledge/java/collections/blockingqueue-producer-consumer',
            },
            {
              core: false,
              title: 'ConcurrentLinkedQueue',
              href: '/docs/basic-knowledge/java/collections/concurrentlinkedqueue-lock-free-path',
            },
            {
              core: false,
              title: '迭代一致性',
              href: '/docs/basic-knowledge/java/collections/concurrent-collection-iteration-consistency',
            },
          ],
        },
        {
          firstRound: {
            outcomes: [
              '用输入规模说明时间、空间复杂度，并覆盖边界输入。',
              '用滑动窗口或树与图搜索说明状态、不变量和终止条件。',
            ],
            questions: [
              '滑动窗口的边界移动需要满足什么条件？',
              '图搜索怎样避免重复访问，复杂度怎样计算？',
            ],
          },
          id: 'java-algorithms',
          title: '算法实现与复杂度',
          depth: 'foundation',
          priority: 'must',
          details: {
            outcomes: ['为动态规划定义状态、转移、初始条件和计算顺序。'],
            interviewQuestions: [
              '怎样判断一个状态转移依赖的子问题已经得到答案？',
            ],
          },
          articles: [
            {
              core: true,
              title: '算法复杂度',
              href: '/docs/basic-knowledge/java/algorithms/complexity-constraints-java-cost',
            },
            {core: true, title: '数据结构', href: '/docs/basic-knowledge/data-structures/'},
            {core: true, title: '算法', href: '/docs/basic-knowledge/algorithms/'},
            {
              core: true,
              title: '滑动窗口',
              href: '/docs/basic-knowledge/java/algorithms/arrays-strings-sliding-window',
            },
            {
              core: true,
              title: '树与图搜索',
              href: '/docs/basic-knowledge/java/algorithms/trees-graphs-search',
            },
            {
              core: false,
              title: '动态规划',
              href: '/docs/basic-knowledge/java/algorithms/dynamic-programming-state-design',
            },
            {
              core: true,
              title: '算法正确性',
              href: '/docs/basic-knowledge/java/algorithms/live-coding-counterexamples-tests',
            },
          ],
        },
        {
          id: 'java-quality',
          title: 'API 设计、测试与代码质量',
          depth: 'foundation',
          priority: 'optional',
          details: {
            outcomes: [
              '能设计窄接口、不可变值对象和明确的失败语义。',
              '能区分单元、集成、契约和端到端测试的证据范围。',
            ],
            interviewQuestions: [
              '什么情况下测试私有方法是在暴露设计问题？',
              '为什么高覆盖率仍然可能无法阻止严重回归？',
            ],
          },
          articles: [
            {
              core: true,
              title: 'Java API 设计',
              href: '/docs/basic-knowledge/java/quality/api-design-from-invariants',
            },
            {
              core: true,
              title: '不可变对象',
              href: '/docs/basic-knowledge/java/quality/immutable-objects-defensive-copying',
            },
            {
              core: true,
              title: 'JUnit',
              href: '/docs/basic-knowledge/java/quality/junit-assertions-parameterized-tests',
            },
            {
              core: false,
              title: '测试替身',
              href: '/docs/basic-knowledge/java/quality/test-doubles-mock-stub-boundaries',
            },
            {
              core: true,
              title: '测试金字塔',
              href: '/docs/basic-knowledge/java/quality/test-pyramid-contract-regression',
            },
          ],
        },
      ],
    },
    {
      id: 'common-foundations',
      title: '通用基础与数据查询',
      topics: [
        {
          id: 'operating-system-foundations',
          title: '进程、内存与 I/O',
          depth: 'mechanism',
          priority: 'must',
          firstRound: {
            outcomes: ['解释进程与线程的共享边界、同步和死锁。', '区分虚拟地址、TLB 未命中与缺页。'],
            questions: ['线程共享哪些资源，为什么需要同步？', '缺页一定需要磁盘 I/O 吗？'],
          },
          details: {
            outcomes: ['解释文件描述符、阻塞与非阻塞、I/O 就绪通知。'],
            interviewQuestions: ['epoll 就绪是否代表请求已经读完？'],
          },
          articles: [
            {core: true, title: '进程与线程', href: '/docs/basic-knowledge/operating-system/processes-threads'},
            {core: true, title: '线程同步', href: '/docs/basic-knowledge/operating-system/synchronization'},
            {core: true, title: '死锁', href: '/docs/basic-knowledge/operating-system/deadlock'},
            {core: true, title: '虚拟内存', href: '/docs/basic-knowledge/operating-system/virtual-memory'},
            {core: false, title: '文件描述符', href: '/docs/basic-knowledge/operating-system/file-descriptors'},
            {core: false, title: 'I/O 模型', href: '/docs/basic-knowledge/operating-system/io-models'},
            {core: false, title: 'I/O 多路复用', href: '/docs/basic-knowledge/operating-system/io-multiplexing'},
          ],
        },
        {
          id: 'sql-foundations',
          title: 'SQL 与数据约束',
          depth: 'foundation',
          priority: 'must',
          firstRound: {
            outcomes: ['在小表上完成过滤、连接和聚合，解释 NULL 与重复行。', '说明唯一约束怎样处理并发写入冲突。'],
            questions: ['LEFT JOIN 的条件放在 ON 和 WHERE 有什么区别？', 'COUNT(*) 和 COUNT(column) 分别统计什么？'],
          },
          details: {
            outcomes: ['从查询条件推导访问路径，并核对执行计划。'],
            interviewQuestions: ['分页只按非唯一列排序会发生什么？'],
          },
          articles: [
            {core: true, title: 'SQL 查询', href: '/docs/basic-knowledge/database/sql/query'},
            {core: true, title: 'SQL 连接', href: '/docs/basic-knowledge/database/sql/joins'},
            {core: true, title: 'SQL 聚合', href: '/docs/basic-knowledge/database/sql/aggregation'},
            {core: true, title: '数据约束', href: '/docs/basic-knowledge/database/modeling/constraints'},
          ],
        },
      ],
    },
    {
      id: 'jvm-runtime',
      title: 'JVM 与运行时',

      topics: [
        {
          id: 'jvm-class-loading',
          title: '字节码与类加载',
          depth: 'mechanism',
          priority: 'common',
          details: {
            outcomes: [
              '能说明类加载的五个阶段与初始化触发条件。',
              '能解释双亲委派、上下文类加载器和模块隔离。',
            ],
            interviewQuestions: [
              'ClassNotFoundException 与 NoClassDefFoundError 有什么区别？',
              'SPI 为什么常使用线程上下文类加载器？',
            ],
          },
          articles: [
            {
              core: true,
              title: 'Java 字节码',
              href: '/docs/basic-knowledge/java/jvm/source-to-bytecode',
            },
            {
              core: true,
              title: '类加载',
              href: '/docs/basic-knowledge/java/jvm/class-loading-stages',
            },
            {
              core: true,
              title: '双亲委派模型',
              href: '/docs/basic-knowledge/java/jvm/parent-delegation',
            },
            {
              core: true,
              title: '类加载器',
              href: '/docs/basic-knowledge/java/jvm/classloaders-spi-isolation',
            },
            {
              core: false,
              title: '类加载故障',
              href: '/docs/basic-knowledge/java/jvm/class-initialization-conflicts',
            },
          ],
        },
        {
          firstRound: {
            outcomes: [
              '区分线程栈、堆、类元数据与直接内存，说明各自保存什么。',
              '从异常类型判断先检查哪类内存和运行证据。',
            ],
            questions: [
              '对象和局部变量分别存放在哪里？',
              'OutOfMemoryError 与 StackOverflowError 的排查起点有什么不同？',
            ],
          },
          id: 'jvm-memory',
          title: '运行时内存与对象布局',
          depth: 'mechanism',
          priority: 'must',
          details: {
            outcomes: [
              '根据目标 JVM 配置解释对象头、字段、引用宽度和内存对齐。',
              '区分直接内存与堆内存的分配、生命周期及诊断证据。',
            ],
            interviewQuestions: [
              '压缩指针和对象对齐为什么会改变实际占用？',
              '堆内存充足时，为什么仍可能出现直接内存不足？',
            ],
          },
          articles: [
            {
              core: true,
              title: 'JVM 运行时数据区域',
              href: '/docs/basic-knowledge/java/jvm/runtime-data-areas',
            },
            {
              core: true,
              title: 'OutOfMemoryError 与 StackOverflowError',
              href: '/docs/basic-knowledge/java/jvm/oom-stack-overflow',
            },
            {
              core: false,
              title: 'Java 对象布局',
              href: '/docs/basic-knowledge/java/jvm/object-creation-layout',
            },
            {
              core: false,
              title: '压缩指针与对象对齐',
              href: '/docs/basic-knowledge/java/jvm/compressed-pointers-alignment',
            },
            {
              core: false,
              title: 'Java 直接内存',
              href: '/docs/basic-knowledge/java/jvm/direct-native-memory',
            },
          ],
        },
        {
          firstRound: {
            outcomes: [
              '从 GC Roots 解释可达性，判断循环引用能否被回收。',
              '说明分代假设与对象分配、存活和回收之间的关系。',
            ],
            questions: [
              '两个对象相互引用为什么仍可能被回收？',
              '分代回收利用了对象存活时间的什么特点？',
            ],
          },
          id: 'jvm-gc',
          title: '垃圾回收与收集器',
          depth: 'mechanism',
          priority: 'must',
          details: {
            outcomes: [
              '结合目标 JDK 比较收集器的停顿、吞吐和资源代价。',
              '说明 G1 的区域管理，以及低延迟收集器增加并发工作的原因。',
            ],
            interviewQuestions: [
              '低延迟收集器怎样减少停顿，又会增加哪些成本？',
              'G1 与传统按连续空间分代的回收方式有什么区别？',
            ],
          },
          articles: [
            {
              core: true,
              title: 'GC Roots',
              href: '/docs/basic-knowledge/java/jvm/gc-roots-reachability',
            },
            {
              core: true,
              title: '分代回收',
              href: '/docs/basic-knowledge/java/jvm/generational-barriers-safepoints',
            },
            {
              core: false,
              title: 'G1',
              href: '/docs/basic-knowledge/java/jvm/g1-regions-rset-collection-set',
            },
            {
              core: false,
              title: 'Serial、Parallel 与 CMS',
              href: '/docs/basic-knowledge/java/jvm/serial-parallel-cms',
            },
            {
              core: false,
              title: '低延迟垃圾收集器',
              href: '/docs/basic-knowledge/java/jvm/zgc-shenandoah-low-latency',
            },
          ],
        },
        {
          id: 'jvm-jit',
          title: 'JIT 与运行时优化',
          depth: 'mechanism',
          priority: 'optional',
          details: {
            outcomes: [
              '能说明分层编译、热点探测、内联和逃逸分析。',
              '能识别死代码消除、常量折叠对微基准的干扰。',
            ],
            interviewQuestions: [
              'Java 是解释执行还是编译执行，为什么二选一不准确？',
              '逃逸分析可能带来哪些优化，为什么结果不能靠源码猜？',
            ],
          },
          articles: [
            {
              core: true,
              title: '分层编译',
              href: '/docs/basic-knowledge/java/jvm/interpreter-tiered-compilation',
            },
            {
              core: true,
              title: '方法内联与去优化',
              href: '/docs/basic-knowledge/java/jvm/inlining-deoptimization',
            },
            {
              core: true,
              title: '逃逸分析与标量替换',
              href: '/docs/basic-knowledge/java/jvm/escape-analysis-scalar-replacement',
            },
            {
              core: true,
              title: 'JMH',
              href: '/docs/basic-knowledge/java/jvm/jmh-correct-benchmarks',
            },
            {
              core: false,
              title: 'Java 启动优化',
              href: '/docs/basic-knowledge/java/jvm/aot-cds-native-image',
            },
          ],
        },
        {
          id: 'jvm-diagnostics',
          title: 'JVM 性能诊断',
          depth: 'scenario',
          priority: 'common',
          details: {
            outcomes: [
              '能使用 jcmd、jstack、jmap、JFR 和 async-profiler 收集匹配证据。',
              '能区分内存泄漏、分配过快、锁竞争和 GC 配置问题。',
            ],
            interviewQuestions: [
              'Java 进程 CPU 飙高时，怎样从系统线程定位到 Java 栈？',
              '堆使用率持续升高，如何判断是缓存增长还是内存泄漏？',
            ],
          },
          articles: [
            {
              core: true,
              title: 'JVM 诊断',
              href: '/docs/basic-knowledge/java/jvm/diagnostic-tools-evidence',
            },
            {
              core: true,
              title: 'CPU 使用率',
              href: '/docs/basic-knowledge/java/jvm/cpu-high-diagnosis',
            },
            {
              core: true,
              title: '线程转储',
              href: '/docs/basic-knowledge/java/jvm/thread-dumps-deadlocks-contention',
            },
            {
              core: true,
              title: '堆转储',
              href: '/docs/basic-knowledge/java/jvm/heap-dumps-memory-leaks',
            },
            {
              core: false,
              title: 'GC 停顿分析',
              href: '/docs/basic-knowledge/java/jvm/gc-logs-jfr-pauses',
            },
          ],
        },
      ],
    },
    {
      id: 'concurrency',
      title: '并发与 Java 内存模型',

      topics: [
        {
          firstRound: {
            outcomes: [
              '区分原子性、可见性和有序性，识别共享状态上的竞态。',
              '根据线程状态和 happens-before 解释跨线程结果。',
            ],
            questions: [
              '一个自增操作为什么可能丢失更新？',
              'happens-before 如何约束线程能看到的写入？',
            ],
          },
          id: 'java-concurrency',
          title: '线程、竞态与 JMM',
          depth: 'mechanism',
          priority: 'must',
          details: {
            outcomes: [
              '用安全发布保证对象初始化状态对其他线程可见。',
              '说明消息传递怎样减少共享可变状态，以及队列引入的约束。',
            ],
            interviewQuestions: [
              '对象构造完成为什么不等于已经安全发布？',
              '通过队列传递可变对象后，发送方继续修改会有什么问题？',
            ],
          },
          articles: [
            {
              core: true,
              title: '线程安全',
              href: '/docs/basic-knowledge/java/concurrency/thread-safety-race-conditions',
            },
            {
              core: true,
              title: 'Java 线程',
              href: '/docs/basic-knowledge/java/concurrency/thread-lifecycle-interruption',
            },
            {
              core: true,
              title: 'Java 内存模型',
              href: '/docs/basic-knowledge/java/concurrency/jmm-happens-before',
            },
            {
              core: false,
              title: '安全发布',
              href: '/docs/basic-knowledge/java/concurrency/safe-publication-escape-final',
            },
            {
              core: false,
              title: '消息传递',
              href: '/docs/basic-knowledge/java/concurrency/shared-state-message-passing',
            },
          ],
        },
        {
          firstRound: {
            outcomes: [
              '说明 synchronized 保护的临界区和锁对象。',
              '解释 volatile 的可见性保证，识别需要原子性的复合操作。',
            ],
            questions: [
              'volatile 为什么不能保证 i++ 的原子性？',
              '两个 synchronized 方法在什么条件下会相互排斥？',
            ],
          },
          id: 'synchronization',
          title: '同步与原子性',
          depth: 'mechanism',
          priority: 'must',
          details: {
            outcomes: [
              '沿 CAS 重试说明原子更新、失败重试和 ABA 问题。',
              '根据竞争、状态范围和进展保证比较锁与无锁方案。',
            ],
            interviewQuestions: [
              'CAS 为什么通常需要重试，为什么仍可能遇到 ABA？',
              '无锁算法是否意味着每个线程都能及时完成操作？',
            ],
          },
          articles: [
            {
              core: true,
              title: 'synchronized',
              href: '/docs/basic-knowledge/java/concurrency/synchronized-monitor-optimizations',
            },
            {
              core: true,
              title: 'volatile',
              href: '/docs/basic-knowledge/java/concurrency/volatile-barriers-visibility',
            },
            {
              core: false,
              title: 'CAS',
              href: '/docs/basic-knowledge/java/concurrency/cas-aba-versioning',
            },
            {
              core: false,
              title: 'Java 原子类',
              href: '/docs/basic-knowledge/java/concurrency/atomic-longadder-contention',
            },
            {
              core: false,
              title: '锁与无锁',
              href: '/docs/basic-knowledge/java/concurrency/locks-vs-lock-free-cost',
            },
          ],
        },
        {
          id: 'aqs',
          title: 'Lock、AQS 与并发工具',
          depth: 'mechanism',
          priority: 'common',
          details: {
            outcomes: [
              '能沿 acquire/release 解释线程入队、阻塞和唤醒。',
              '能根据并发协议选择 ReentrantLock、ReadWriteLock、Latch 或 Semaphore。',
            ],
            interviewQuestions: [
              '公平锁为什么通常吞吐更低？',
              'CountDownLatch、CyclicBarrier 和 Semaphore 分别约束什么？',
            ],
          },
          articles: [
            {
              core: true,
              title: 'AQS',
              href: '/docs/basic-knowledge/java/concurrency/aqs-state-wait-queue',
            },
            {
              core: true,
              title: 'ReentrantLock',
              href: '/docs/basic-knowledge/java/concurrency/reentrantlock-fairness-condition',
            },
            {
              core: true,
              title: '读写锁',
              href: '/docs/basic-knowledge/java/concurrency/readwritelock-stampedlock',
            },
            {
              core: true,
              title: 'Java 并发同步器',
              href: '/docs/basic-knowledge/java/concurrency/latch-barrier-semaphore',
            },
            {
              core: false,
              title: '任务取消',
              href: '/docs/basic-knowledge/java/concurrency/interruption-timeout-cancellation',
            },
          ],
        },
        {
          firstRound: {
            outcomes: [
              '解释线程数、队列和拒绝策略怎样共同处理任务。',
              '说明异步任务的异常、超时与取消需要在哪里处理。',
            ],
            questions: [
              '提交任务后，线程池怎样决定排队、创建线程或拒绝？',
              'CompletableFuture 的超时是否意味着底层任务已停止？',
            ],
          },
          id: 'thread-pool',
          title: '线程池与异步编排',
          depth: 'scenario',
          priority: 'must',
          details: {
            outcomes: [
              '解释虚拟线程的调度与阻塞行为，区分线程数量和下游资源上限。',
            ],
            interviewQuestions: [
              '使用虚拟线程后，为什么仍要限制数据库连接和请求并发？',
            ],
          },
          articles: [
            {
              core: true,
              title: 'Java 线程池',
              href: '/docs/basic-knowledge/java/concurrency/threadpoolexecutor-execution-path',
            },
            {
              core: true,
              title: 'CompletableFuture',
              href: '/docs/basic-knowledge/java/concurrency/future-completablefuture-errors',
            },
            {
              core: false,
              title: '虚拟线程',
              href: '/docs/basic-knowledge/java/concurrency/virtual-threads-boundaries',
            },
          ],
        },
        {
          id: 'concurrency-diagnostics',
          title: '并发故障与性能诊断',
          depth: 'scenario',
          priority: 'common',
          details: {
            outcomes: [
              '能从线程转储构建等待关系并定位死锁。',
              '能区分锁竞争、I/O 阻塞、线程池饱和和频繁切换。',
            ],
            interviewQuestions: [
              '死锁的四个必要条件如何映射到 Java 代码？',
              '线程数很多但 CPU 不高，应该先检查什么？',
            ],
          },
          articles: [
            {
              core: true,
              title: '并发活跃性',
              href: '/docs/basic-knowledge/java/concurrency/liveness-deadlock-livelock-starvation',
            },
            {
              core: true,
              title: '线程转储',
              href: '/docs/basic-knowledge/java/jvm/thread-dumps-deadlocks-contention',
            },
            {
              core: false,
              title: 'ThreadLocal',
              href: '/docs/basic-knowledge/java/concurrency/threadlocal-leaks-context',
            },
            {
              core: true,
              title: '锁竞争',
              href: '/docs/basic-knowledge/java/concurrency/lock-contention-context-switch-benchmark',
            },
          ],
        },
      ],
    },
    {
      id: 'spring-data-access',
      title: 'Spring 与数据访问',

      topics: [
        {
          firstRound: {
            outcomes: [
              '沿实例化、依赖注入、初始化和销毁解释 Bean 生命周期。',
              '说明构造器注入、作用域与对象依赖关系。',
            ],
            questions: [
              'Bean 由创建到可用通常经历哪些步骤？',
              '构造器注入有什么约束和用途？',
            ],
          },
          id: 'spring-ioc',
          title: 'Spring IoC 与 Bean 生命周期',
          depth: 'mechanism',
          priority: 'must',
          details: {
            outcomes: [
              '区分 BeanDefinition 元数据与 Bean 实例，以及容器扩展的位置。',
              '根据依赖方式和代理约束解释循环依赖能否被处理。',
            ],
            interviewQuestions: [
              '修改 BeanDefinition 和修改 Bean 实例有什么区别？',
              '构造器循环依赖为什么不能靠提前暴露实例解决？',
            ],
          },
          articles: [
            {
              core: true,
              title: 'IoC 容器',
              href: '/docs/basic-knowledge/java/spring/ioc-container-purpose',
            },
            {
              core: true,
              title: 'Bean 生命周期',
              href: '/docs/basic-knowledge/java/spring/bean-creation-lifecycle',
            },
            {
              core: true,
              title: '依赖注入',
              href: '/docs/basic-knowledge/java/spring/dependency-injection-selection',
            },
            {
              core: false,
              title: 'BeanDefinition',
              href: '/docs/basic-knowledge/java/spring/beandefinition-container-startup',
            },
            {
              core: false,
              title: 'Spring 循环依赖',
              href: '/docs/basic-knowledge/java/spring/circular-dependencies-scopes-early-exposure',
            },
          ],
        },
        {
          firstRound: {
            outcomes: [
              '沿代理调用链解释切面怎样生效，区分两类代理。',
              '判断事务传播、回滚规则和自调用的生效边界。',
            ],
            questions: [
              '同一个对象内部调用为什么可能绕过事务代理？',
              'JDK 动态代理与 CGLIB 对被代理类型有什么要求？',
            ],
          },
          id: 'spring-aop',
          title: 'AOP、代理与声明式事务',
          depth: 'mechanism',
          priority: 'must',
          details: {
            outcomes: [
              '能比较 JDK 动态代理与 CGLIB 子类代理。',
              '能解释事务传播、回滚规则、隔离级别与代理失效。',
            ],
            interviewQuestions: [
              '@Transactional 为什么在 private 方法或同类自调用中常常无效？',
              'REQUIRES_NEW 与 NESTED 的资源和回滚语义有什么差异？',
            ],
          },
          articles: [
            {
              core: true,
              title: 'Spring AOP',
              href: '/docs/basic-knowledge/java/spring/aop-pointcut-interceptor-chain',
            },
            {
              core: true,
              title: 'Spring 事务',
              href: '/docs/basic-knowledge/java/spring/declarative-transaction-execution',
            },
            {
              core: true,
              title: 'JDK 动态代理与 CGLIB',
              href: '/docs/basic-knowledge/java/spring/jdk-proxy-cglib',
            },
          ],
        },
        {
          firstRound: {
            outcomes: [
              '沿 Filter、DispatcherServlet、Interceptor 和 Controller 解释请求路径。',
              '区分过滤器与拦截器的适用位置。',
            ],
            questions: [
              '一个 HTTP 请求怎样到达 Controller？',
              'Filter 和 Interceptor 分别适合处理哪些问题？',
            ],
          },
          id: 'spring-request',
          title: 'Spring MVC 与 Web 请求链',
          depth: 'mechanism',
          priority: 'must',
          details: {
            outcomes: ['说明参数解析、输入校验和错误契约如何协同。'],
            interviewQuestions: [
              '参数解析失败与业务处理失败应怎样形成可区分的错误响应？',
            ],
          },
          articles: [
            {
              core: true,
              title: 'Spring MVC 请求生命周期',
              href: '/docs/basic-knowledge/java/spring/http-request-to-controller',
            },
            {
              core: true,
              title: 'DispatcherServlet',
              href: '/docs/basic-knowledge/java/spring/dispatcherservlet-handler-mapping',
            },
            {
              core: true,
              title: 'Spring 拦截机制',
              href: '/docs/basic-knowledge/java/spring/filter-interceptor-aspect-boundaries',
            },
            {
              core: false,
              title: 'Spring MVC 参数解析',
              href: '/docs/basic-knowledge/java/spring/binding-validation-content-negotiation',
            },
            {
              core: false,
              title: 'API 错误契约',
              href: '/docs/basic-knowledge/java/spring/api-error-contract',
            },
          ],
        },
        {
          firstRound: {
            outcomes: [
              '解释自动配置导入、条件判断与用户配置的关系。',
              '根据启动流程和配置来源定位配置未生效的问题。',
            ],
            questions: [
              '自动配置在什么条件下会让用户提供的 Bean 生效？',
              '同一个配置项来自不同位置时怎样确定最终值？',
            ],
          },
          id: 'spring-boot',
          title: 'Spring Boot 自动配置与启动',
          depth: 'mechanism',
          priority: 'must',
          details: {
            outcomes: [
              '用 Starter 组织可复用配置，并通过 Actuator 获取运行状态。',
            ],
            interviewQuestions: [
              '一个 Starter 应怎样与使用方配置协作？',
              'Actuator 提供的观测信息怎样帮助验证服务状态？',
            ],
          },
          articles: [
            {
              core: true,
              title: 'Spring Boot 启动',
              href: '/docs/basic-knowledge/java/spring/spring-boot-startup',
            },
            {
              core: true,
              title: 'Spring Boot 自动配置',
              href: '/docs/basic-knowledge/java/spring/auto-configuration-conditions',
            },
            {
              core: true,
              title: 'Spring Boot 外部化配置',
              href: '/docs/basic-knowledge/java/spring/external-config-precedence',
            },
            {
              core: false,
              title: 'Spring Boot Starter',
              href: '/docs/basic-knowledge/java/spring/custom-starter-boundaries',
            },
            {
              core: false,
              title: 'Spring Boot Actuator',
              href: '/docs/basic-knowledge/java/spring/actuator-health-startup-diagnostics',
            },
          ],
        },
        {
          firstRound: {
            outcomes: [
              '解释数据库连接的借还、事务参与和连接池耗尽。',
              '沿 MyBatis 调用链说明参数绑定与查询执行。',
            ],
            questions: [
              '连接没有及时归还会怎样影响请求？',
              'MyBatis 的参数绑定怎样影响 SQL 注入风险？',
            ],
          },
          id: 'data-access',
          title: 'MyBatis 与数据库连接池',
          depth: 'mechanism',
          priority: 'must',
          details: {
            outcomes: [
              '解释 JPA 实体状态和加载方式，识别 N+1 查询。',
              '根据查询次数、内存和事务范围选择批处理与分页方式。',
            ],
            interviewQuestions: [
              '延迟加载怎样导致 N+1 查询？',
              '批处理或分页查询为什么仍要控制事务与内存范围？',
            ],
          },
          articles: [
            {
              core: true,
              title: 'MyBatis',
              href: '/docs/basic-knowledge/java/data-access/mybatis-mapping-executor-plugins',
            },
            {
              core: true,
              title: '数据库连接池',
              href: '/docs/basic-knowledge/java/data-access/connection-pool-capacity-timeout-leaks',
            },
            {
              core: false,
              title: 'JPA',
              href: '/docs/basic-knowledge/java/data-access/jpa-entity-states-dirty-checking-lazy-loading',
            },
            {
              core: false,
              title: 'N+1 查询',
              href: '/docs/basic-knowledge/java/data-access/n-plus-one-fetch-strategies',
            },
            {
              core: false,
              title: '批处理与分页',
              href: '/docs/basic-knowledge/java/data-access/batching-pagination-data-access-tests',
            },
          ],
        },
      ],
    },
    {
      id: 'service-data',
      title: '网络、数据与服务端生态',

      topics: [
        {
          firstRound: {
            outcomes: [
              '沿 TCP、HTTP 和 RPC 解释一次远程调用的主要过程。',
              '说明连接、序列化、超时和调用失败的边界。',
            ],
            questions: [
              'HTTP 与 TCP 分别负责远程调用中的什么问题？',
              'RPC 超时后，服务端是否可能已经完成操作？',
            ],
          },
          id: 'network',
          title: 'TCP、HTTP 与 RPC',
          depth: 'mechanism',
          priority: 'must',
          details: {
            outcomes: ['区分网络分层的职责，比较 TCP 与 UDP 的传输语义。'],
            interviewQuestions: [
              '选择 TCP 或 UDP 时，应用层分别需要承担哪些工作？',
            ],
          },
          articles: [
            {
              core: true,
              title: 'TCP 连接',
              href: '/docs/basic-knowledge/network/tcp_handshake',
            },
            {core: true, title: 'DNS', href: '/docs/basic-knowledge/network/dns'},
            {core: true, title: 'TLS', href: '/docs/basic-knowledge/network/tls'},
            {
              core: true,
              title: 'HTTP',
              href: '/docs/basic-knowledge/network/http-versions-connection-reuse-timeouts',
            },
            {
              core: true,
              title: 'RPC',
              href: '/docs/basic-knowledge/network/rpc-serialization-netty-event-loop',
            },
            {
              core: false,
              title: '网络模型',
              href: '/docs/basic-knowledge/network/network-models',
            },
            {
              core: false,
              title: 'TCP 与 UDP',
              href: '/docs/basic-knowledge/network/tcp_udp',
            },
          ],
        },
        {
          firstRound: {
            outcomes: [
              '解释 B+ 树、聚簇与二级索引、回表和覆盖索引。',
              '根据联合索引列顺序判断哪些查询条件能缩小扫描范围。',
            ],
            questions: [
              '覆盖索引为什么能减少回表？',
              '联合索引的列顺序会怎样影响查询？',
            ],
          },
          id: 'database-index',
          title: 'MySQL 索引与查询优化',
          depth: 'mechanism',
          priority: 'must',
          details: {
            outcomes: ['根据执行计划、扫描行数和实际耗时检查索引效果。'],
            interviewQuestions: [
              '索引存在但查询仍慢时，如何用执行计划缩小原因范围？',
            ],
          },
          articles: [
            {
              core: true,
              title: '数据库索引',
              href: '/docs/basic-knowledge/database/indices/',
            },
            {core: true, title: '执行计划', href: '/docs/basic-knowledge/database/indices/execution-plan'},
            {
              core: true,
              title: 'B+ 树',
              href: '/docs/basic-knowledge/database/indices/b_plus_tree/',
            },
            {
              core: true,
              title: '聚簇索引',
              href: '/docs/basic-knowledge/database/indices/clustered_index/',
            },
            {
              core: true,
              title: '联合索引与覆盖索引',
              href: '/docs/basic-knowledge/database/indices/composite-covering-back-table',
            },
            {
              core: false,
              title: '索引设计',
              href: '/docs/basic-knowledge/database/indices/index-review',
            },
          ],
        },
        {
          firstRound: {
            outcomes: [
              '说明事务隔离级别如何约束并发读写。',
              '区分快照读与当前读，解释 MVCC 与锁各自的作用。',
            ],
            questions: [
              '同一事务内两次查询为什么可能得到不同结果？',
              '快照读和当前读分别依赖什么机制？',
            ],
          },
          id: 'database-transaction',
          title: '事务、锁与 MVCC',
          depth: 'mechanism',
          priority: 'must',
          details: {
            outcomes: [
              '从等待关系解释死锁，并设计事务重试边界。',
              '说明长事务对锁持有、版本保留和资源占用的影响。',
            ],
            interviewQuestions: [
              '发生死锁后，为什么通常需要重试整个事务？',
              '长事务即使很少修改数据，为什么仍可能影响数据库？',
            ],
          },
          articles: [
            {
              core: true,
              title: '数据库事务',
              href: '/docs/basic-knowledge/database/transaction/',
            },
            {
              core: true,
              title: 'InnoDB 锁',
              href: '/docs/basic-knowledge/database/transaction/innodb-locking-ranges',
            },
            {
              core: true,
              title: 'MVCC',
              href: '/docs/basic-knowledge/database/transaction/mvcc-read-view-consistent-read',
            },
            {
              core: false,
              title: '数据库死锁',
              href: '/docs/basic-knowledge/database/transaction/deadlock-detection-timeout-retry',
            },
            {
              core: false,
              title: '长事务',
              href: '/docs/basic-knowledge/database/transaction/long-transactions-hot-updates-boundaries',
            },
          ],
        },
        {
          firstRound: {
            outcomes: [
              '根据访问方式选择 Redis 数据结构，并解释缓存与数据库的更新顺序。',
              '区分缓存穿透、击穿、雪崩与热点问题，说明处理条件。',
            ],
            questions: [
              '先更新数据库再删除缓存还可能留下什么竞争窗口？',
              '缓存击穿与雪崩分别应该怎样处理？',
            ],
          },
          id: 'cache-mq',
          title: 'Redis 与缓存一致性',
          depth: 'scenario',
          priority: 'must',
          details: {
            outcomes: [
              '区分 Redis 持久化、复制与集群各自的保证和故障窗口。',
              '说明分布式锁的持有者、过期、释放与业务幂等边界。',
            ],
            interviewQuestions: [
              '复制成功是否等于数据已经持久化？',
              '锁过期后原持有者继续执行，业务应该怎样处理？',
            ],
          },
          articles: [
            {
              core: true,
              title: 'Redis',
              href: '/docs/basic-knowledge/nosql/redis/',
            },
            {core: true, title: 'Redis 过期', href: '/docs/basic-knowledge/nosql/redis/expiration'},
            {core: true, title: 'Redis 内存淘汰', href: '/docs/basic-knowledge/nosql/redis/eviction'},
            {
              core: true,
              title: '缓存一致性',
              href: '/docs/basic-knowledge/nosql/redis/cache-patterns-consistency',
            },
            {
              core: true,
              title: '缓存穿透、击穿、雪崩与热点 Key',
              href: '/docs/basic-knowledge/nosql/redis/cache-penetration-stampede-avalanche-hotkeys',
            },
            {
              core: false,
              title: 'Redis 持久化、复制与集群',
              href: '/docs/basic-knowledge/nosql/redis/persistence',
            },
            {
              core: false,
              title: '分布式锁',
              href: '/docs/basic-knowledge/nosql/redis/distributed-lock-conditions-boundaries',
            },
          ],
        },
        {
          id: 'messaging-search',
          title: '消息、搜索与后台任务',
          depth: 'scenario',
          priority: 'common',
          details: {
            outcomes: [
              '能解释消息确认、重试、死信、顺序和幂等消费。',
              '能说明倒排索引、分词、刷新与数据库同步。',
            ],
            interviewQuestions: [
              '如何做到消息不丢失，为什么“恰好一次”常需要限定范围？',
              '数据库与搜索索引不一致时，如何发现并重建？',
            ],
          },
          articles: [
            {
              core: true,
              title: '消息队列',
              href: '/docs/basic-knowledge/middleware/kafka-rabbitmq-queue-semantics',
            },
            {
              core: true,
              title: '消息可靠性',
              href: '/docs/basic-knowledge/middleware/message-ack-retry-dead-letter',
            },
            {
              core: true,
              title: '消息幂等性',
              href: '/docs/basic-knowledge/middleware/idempotent-consumption-order-duplicates',
            },
            {
              core: true,
              title: 'Elasticsearch',
              href: '/docs/basic-knowledge/middleware/elasticsearch-inverted-index-refresh-visibility',
            },
            {
              core: false,
              title: '分布式任务调度',
              href: '/docs/basic-knowledge/middleware/scheduled-tasks-sharding-recovery',
            },
          ],
        },
      ],
    },
    {
      id: 'microservices-production',
      title: '微服务与生产治理',

      topics: [
        {
          id: 'service-governance',
          title: '注册、配置、网关与流量治理',
          depth: 'scenario',
          priority: 'common',
          details: {
            outcomes: [
              '能说明客户端发现、服务端发现、健康检查和配置推送。',
              '能设计灰度、路由、限流与配置回滚。',
            ],
            interviewQuestions: [
              '注册中心短暂不可用时，客户端应该清空还是保留本地实例表？',
              '配置动态生效为何需要版本、校验和回滚？',
            ],
          },
          articles: [
            {
              core: true,
              title: '服务发现',
              href: '/docs/system-design/microservices/service-discovery-health-checks',
            },
            {
              core: true,
              title: '配置中心',
              href: '/docs/system-design/microservices/config-center-version-refresh',
            },
            {
              core: true,
              title: 'API 网关',
              href: '/docs/system-design/microservices/api-gateway-routing',
            },
            {
              core: true,
              title: '灰度发布',
              href: '/docs/system-design/microservices/canary-traffic-tagging-rollback',
            },
            {
              core: false,
              title: '控制平面与数据平面',
              href: '/docs/system-design/microservices/control-plane-data-plane-failures',
            },
          ],
        },
        {
          id: 'resilience',
          title: '超时、重试、限流与熔断',
          depth: 'scenario',
          priority: 'common',
          details: {
            outcomes: [
              '能设计端到端超时、指数退避、抖动和重试上限。',
              '能区分固定窗口、滑动窗口、漏桶和令牌桶。',
            ],
            interviewQuestions: [
              '为什么重试会形成流量放大，哪些请求不适合自动重试？',
              '熔断、降级和限流分别处理什么问题？',
            ],
          },
          articles: [
            {
              core: true,
              title: '超时',
              href: '/docs/system-design/reliability/timeout-budget-cancellation',
            },
            {
              core: true,
              title: '重试',
              href: '/docs/system-design/reliability/retry-backoff-jitter-storms',
            },
            {
              core: true,
              title: '限流',
              href: '/docs/system-design/reliability/rate-limiting-capacity-protection',
            },
            {
              core: true,
              title: '服务容错',
              href: '/docs/system-design/reliability/circuit-breaker-degradation-bulkhead',
            },
            {
              core: false,
              title: '幂等键',
              href: '/docs/system-design/reliability/idempotency-keys-safe-retries',
            },
          ],
        },
        {
          id: 'distributed-transaction',
          title: '分布式事务与数据一致性',
          depth: 'scenario',
          priority: 'common',
          details: {
            outcomes: [
              '能比较 2PC、TCC、Saga、Outbox 和最终一致。',
              '能设计幂等、补偿、对账和人工修复入口。',
            ],
            interviewQuestions: [
              '本地事务提交后消息发送失败，如何保证最终发布？',
              '补偿操作为什么不等于数据库回滚？',
            ],
          },
          articles: [
            {
              core: true,
              title: '分布式一致性',
              href: '/docs/system-design/distributed-data/invariants-to-consistency-strategy',
            },
            {
              core: true,
              title: '2PC 与 TCC',
              href: '/docs/system-design/distributed-data/2pc-tcc-coordination-cost',
            },
            {
              core: true,
              title: 'Saga',
              href: '/docs/system-design/distributed-data/saga-compensation-intermediate-state',
            },
            {
              core: true,
              title: 'Transactional Outbox 与 CDC',
              href: '/docs/system-design/distributed-data/outbox-cdc-reliable-events',
            },
            {
              core: false,
              title: '分布式流程恢复',
              href: '/docs/system-design/distributed-data/idempotency-reconciliation-manual-repair',
            },
          ],
        },
        {
          id: 'security',
          title: '认证、授权与应用安全',
          depth: 'scenario',
          priority: 'common',
          details: {
            outcomes: [
              '能解释 Session、JWT、OAuth 2.0、OIDC 与 RBAC/ABAC。',
              '能处理注入、反序列化、SSRF、CSRF、XSS 和密钥泄漏风险。',
            ],
            interviewQuestions: [
              'JWT 如何撤销，短期令牌与刷新令牌分别承担什么？',
              '水平越权为何通常无法只靠网关鉴权解决？',
            ],
          },
          articles: [
            {
              core: true,
              title: '认证与授权',
              href: '/docs/system-design/security/authentication-authorization-trust-boundaries',
            },
            {
              core: true,
              title: 'Session、JWT、OAuth 2.0 与 OIDC',
              href: '/docs/system-design/security/session-jwt-oauth-oidc',
            },
            {
              core: false,
              title: 'Spring Security',
              href: '/docs/system-design/security/spring-security-filter-chain',
            },
            {
              core: true,
              title: 'Web 应用安全',
              href: '/docs/system-design/security/injection-authorization-ssrf-deserialization',
            },
            {
              core: false,
              title: '密钥、证书、审计与供应链安全',
              href: '/docs/system-design/security/secrets-certificates-audit-supply-chain',
            },
          ],
        },
        {
          id: 'delivery',
          title: '可观测性、交付与联合排障',
          depth: 'scenario',
          priority: 'common',
          details: {
            outcomes: [
              '能说明 Maven 生命周期、依赖解析、镜像构建和灰度回滚。',
              '能用日志、指标、Trace、JFR 和数据库证据完成联合排障。',
            ],
            interviewQuestions: [
              'P99 延迟升高但 CPU 正常，排查路径如何展开？',
              '日志、指标和 Trace 各自能证明什么，不能证明什么？',
            ],
          },
          articles: [
            {
              core: true,
              title: 'Git',
              href: '/docs/tools-and-frameworks/git/',
            },
            {
              core: true,
              title: 'Maven',
              href: '/docs/system-design/production/maven-lifecycle-dependency-convergence',
            },
            {
              core: true,
              title: '可重复交付',
              href: '/docs/system-design/production/docker-ci-cd-reproducible-delivery',
            },
            {
              core: true,
              title: '可观测性',
              href: '/docs/system-design/production/logs-metrics-traces-correlation',
            },
            {
              core: true,
              title: '生产故障诊断',
              href: '/docs/system-design/production/jvm-thread-sql-network-joint-diagnosis',
            },
          ],
        },
      ],
    },
    {
      id: 'architecture-interview',
      title: '系统设计与架构面试',

      topics: [
        {
          id: 'system-design',
          title: '系统设计方法与容量',
          depth: 'scenario',
          priority: 'optional',
          details: {
            outcomes: [
              '能澄清功能、规模、延迟、一致性、可用性和成本目标。',
              '能沿读写路径说明存储、缓存、异步、分片和容灾。',
            ],
            interviewQuestions: [
              '如何设计短链接、秒杀、Feed 或文件服务，并验证瓶颈？',
              '估算不精确时，容量计算还有什么价值？',
            ],
          },
          articles: [
            {
              core: true,
              title: '系统设计面试',
              href: '/docs/system-design/system-design/interview-process',
            },
            {
              core: true,
              title: '系统架构',
              href: '/docs/system-design/system-design/universe_architecture',
            },
            {
              core: true,
              title: '容量规划',
              href: '/docs/system-design/system-design/capacity-slo-failure-model',
            },
            {
              core: false,
              title: '数据拆分',
              href: '/docs/system-design/system-design/read-write-paths-hotspots-sharding',
            },
            {
              core: false,
              title: '系统设计题',
              href: '/docs/system-design/system-design/system-design-problems/',
            },
          ],
        },
        {
          id: 'distributed-system',
          title: '复制、一致性与共识',
          depth: 'scenario',
          priority: 'optional',
          details: {
            outcomes: [
              '能解释主从复制、Quorum、一致性模型和线性一致。',
              '能说明 Raft 的选举、日志复制、安全性与成员变更。',
            ],
            interviewQuestions: [
              'CAP 中的一致性与数据库 ACID 的 C 为什么不是一回事？',
              '网络分区时，为什么系统无法同时保证线性一致和所有请求成功？',
            ],
          },
          articles: [
            {
              core: true,
              title: 'CAP 理论',
              href: '/docs/system-design/distributed-system/cap-theorem',
            },
            {
              core: true,
              title: '主备复制',
              href: '/docs/system-design/distributed-system/primary_backup_replication',
            },
            {
              core: true,
              title: '一致性模型',
              href: '/docs/system-design/distributed-system/consistency-models-quorum-linearizability',
            },
            {
              core: true,
              title: 'Raft',
              href: '/docs/system-design/distributed-system/raft-election-log-replication',
            },
            {
              core: false,
              title: '跨地域复制',
              href: '/docs/system-design/distributed-system/cross-region-replication-latency-conflicts',
            },
          ],
        },
        {
          id: 'domain-architecture',
          title: 'DDD、模块化单体与微服务',
          depth: 'scenario',
          priority: 'optional',
          details: {
            outcomes: [
              '能识别限界上下文、聚合、不变量和集成事件。',
              '能比较单体、模块化单体和微服务的迁移条件。',
            ],
            interviewQuestions: [
              '服务应该按数据库表、技术层还是业务能力拆分？',
              '聚合边界过大或过小分别会制造什么问题？',
            ],
          },
          articles: [
            {
              core: true,
              title: '限界上下文',
              href: '/docs/system-design/architecture/domain-bounded-context-ubiquitous-language',
            },
            {
              core: true,
              title: '聚合',
              href: '/docs/system-design/architecture/aggregate-invariants-transaction-boundaries',
            },
            {
              core: true,
              title: '模块化单体',
              href: '/docs/system-design/architecture/modular-monolith-dependency-constraints',
            },
            {
              core: true,
              title: '微服务架构',
              href: '/docs/system-design/architecture/microservice-splitting-benefits-costs',
            },
            {
              core: false,
              title: '绞杀者模式',
              href: '/docs/system-design/architecture/strangler-migration-compatibility-rollback',
            },
          ],
        },
        {
          id: 'availability-cost',
          title: '高可用、容灾、多租户与成本',
          depth: 'scenario',
          priority: 'optional',
          details: {
            outcomes: [
              '能使用 SLI/SLO、错误预算、RTO/RPO 和容量余量。',
              '能设计租户隔离、限额、数据边界和成本归因。',
            ],
            interviewQuestions: [
              '高可用与容灾有什么区别，双机部署为什么不自动满足容灾？',
              '多租户系统如何避免噪声邻居和数据越权？',
            ],
          },
          articles: [
            {
              core: true,
              title: '服务等级目标（SLO）',
              href: '/docs/system-design/availability/sli-slo-error-budget-capacity-headroom',
            },
            {
              core: true,
              title: '灾难恢复',
              href: '/docs/system-design/availability/high-availability-backup-rto-rpo',
            },
            {
              core: true,
              title: '故障转移',
              href: '/docs/system-design/availability/failover-drills-recovery-validation',
            },
            {
              core: true,
              title: '多租户',
              href: '/docs/system-design/availability/multi-tenant-isolation-quotas-data-boundaries',
            },
            {
              core: false,
              title: '成本归因',
              href: '/docs/system-design/availability/performance-reliability-cost-attribution',
            },
          ],
        },
        {
          id: 'architecture-evolution',
          title: '架构演进与技术决策',
          depth: 'scenario',
          priority: 'optional',
          details: {
            outcomes: [
              '能编写 ADR、迁移计划、风险清单和回滚标准。',
              '能复盘故障与失败方案，并把改进项连接到责任和验证。',
            ],
            interviewQuestions: [
              '旧系统迁移如何拆分阶段，并为每一阶段保留回滚路径？',
              '短期交付与长期技术债冲突时，怎样形成可执行决策？',
            ],
          },
          articles: [
            {
              core: true,
              title: '架构决策记录（ADR）',
              href: '/docs/system-design/leadership/constraints-architecture-decision-records',
            },
            {
              core: true,
              title: '架构迁移',
              href: '/docs/system-design/leadership/compatibility-migration-canary-exit-criteria',
            },
            {
              core: true,
              title: '技术债',
              href: '/docs/system-design/leadership/technical-debt-priority-business-value',
            },
            {
              core: false,
              title: '设计评审',
              href: '/docs/system-design/leadership/cross-team-design-review-disagreement',
            },
            {
              core: false,
              title: '事故复盘',
              href: '/docs/system-design/leadership/incident-review-failed-designs-organizational-learning',
            },
          ],
        },
      ],
    },
  ],
};
