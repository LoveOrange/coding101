import type {InterviewRoadmapData} from '../../components/InterviewRoadmap';
import {createOutlineNavigation} from './outlineCatalog';

export const javaInterviewRoadmap: InterviewRoadmapData = {
  eyebrow: 'R01 / Java Backend',
  title: 'Java 后端开发面试路线',
  introduction:
    '这条路线把 Java 后端面试拆成 8 个阶段、40 个 Topic。它不是完整知识清单：先用“必会”建立能够直接作答的核心框架，再根据 JD、项目经历和面试反馈补充常考与深入内容。',
  reviewHint:
    '优先级决定先学什么；回答深度决定学到哪里。深度不是候选人职级。“按岗选学”只在目标岗位明确涉及，或能由自己的项目经历支撑时进入。',
  navigationTitle: 'Outline 目录',
  mobileNavigationLabel: '查看 Outline 目录',
  navigationGroups: createOutlineNavigation('R01'),
  phases: [
    {
      id: 'language-foundation',
      order: '01',
      title: 'Java 语言与标准库',
      focus: '基础必会',
      description: '先建立稳定的语言模型。框架会变化，类型、对象和异常语义不会替你一起变化。',
      topics: [
        {
          id: 'java-oop',
          title: '类型系统与对象模型',
          module: 'Java',
          depth: 'foundation',
          priority: 'must',
          objective: '解释对象如何协作，并根据变化方向选择组合、继承、接口或抽象类。',
          details: {
            mechanism:
              '类定义状态与行为，运行时通过动态绑定选择实际方法。封装限制状态的修改入口，多态则把调用方与具体实现分开。抽象带来替换能力，也会增加间接层。',
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
              title: 'Java 值传递',
              href: '/docs/basic-knowledge/java/language/types-references-value-passing',
            },
            {
              title: '面向对象编程（Object-Oriented Programming）',
              href: '/docs/basic-knowledge/java/language/encapsulation-inheritance-polymorphism',
            },
            {
              title: '对象相等性',
              href: '/docs/basic-knowledge/java/language/equals-hashcode-object-identity',
            },
          ],
        },
        {
          id: 'java-values-errors',
          title: '字符串、数值与异常',
          module: 'Java',
          depth: 'foundation',
          priority: 'must',
          objective: '正确处理不可变值、精度、空值和失败路径，避免把数据问题拖到生产环境。',
          details: {
            mechanism:
              'String 的不可变性让共享和缓存更安全，数值类型决定表示范围，异常则把正常控制流与失败路径分开。机制本身不消灭错误，只让错误更早暴露。',
            outcomes: [
              '能解释字符串常量池、BigDecimal 精度和装箱缓存。',
              '能区分受检异常、运行时异常与业务错误码的适用场景。',
            ],
            interviewQuestions: [
              '为什么金额不适合直接使用 double？',
              'String、StringBuilder 和 StringBuffer 的差异来自哪里？',
            ],
          },
          articles: [
            {
              title: 'String',
              href: '/docs/basic-knowledge/java/language/string-immutability-pool',
            },
            {
              title: 'Java 异常',
              href: '/docs/basic-knowledge/java/language/exceptions-error-boundaries',
            },
            {
              title: 'BigDecimal',
              href: '/docs/basic-knowledge/java/language/bigdecimal-money',
            },
            {
              title: '包装类型',
              href: '/docs/basic-knowledge/java/language/wrappers-boxing-cache',
            },
            {
              title: 'Optional',
              href: '/docs/basic-knowledge/java/language/optional-boundaries',
            },
          ],
        },
        {
          id: 'java-generics-reflection',
          title: '泛型、注解与反射',
          module: 'Java',
          depth: 'mechanism',
          priority: 'common',
          objective: '理解编译期类型约束如何落到运行时，并解释框架为何能够发现和调用用户代码。',
          details: {
            mechanism:
              '泛型把一部分类型错误提前到编译期，类型擦除维持了既有字节码兼容。注解保存元数据，反射在运行时读取元数据并操作类型。灵活性增加后，错误更晚、调用也更难静态分析。',
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
              title: 'Java 泛型',
              href: '/docs/basic-knowledge/java/language/generics',
            },
            {
              title: 'Java 注解',
              href: '/docs/basic-knowledge/java/language/annotations-retention-processing',
            },
            {
              title: 'Java 反射',
              href: '/docs/basic-knowledge/java/language/reflection-method-handles',
            },
            {
              title: 'Java 注解处理器',
              href: '/docs/basic-knowledge/java/language/runtime-scanning-compile-time-generation',
            },
          ],
        },
        {
          id: 'java-io',
          title: 'I/O、NIO 与资源管理',
          module: 'Java',
          depth: 'foundation',
          priority: 'common',
          objective: '根据数据规模和阻塞模型选择 I/O API，并保证资源在失败路径上也能释放。',
          details: {
            mechanism:
              '流式 I/O 按顺序搬运数据，缓冲减少系统调用；NIO 用 Buffer、Channel 和 Selector 分离数据与就绪事件。吞吐提升通常以状态管理变复杂为代价。',
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
              title: 'Java 流式 I/O',
              href: '/docs/basic-knowledge/java/io/byte-character-buffered-streams',
            },
            {
              title: 'Java NIO',
              href: '/docs/basic-knowledge/java/io/buffer-channel-selector',
            },
            {
              title: '零拷贝',
              href: '/docs/basic-knowledge/java/io/file-mapping-zero-copy-direct-memory',
            },
            {
              title: 'Java 序列化',
              href: '/docs/basic-knowledge/java/io/java-serialization-compatibility-security',
            },
          ],
        },
        {
          id: 'java-functional',
          title: 'Lambda、Stream 与日期时间',
          module: 'Java',
          depth: 'foundation',
          priority: 'common',
          objective: '在可读性和性能边界内使用函数式 API，避免把一条数据管道写成调试盲区。',
          details: {
            mechanism:
              'Lambda 把行为作为值传递，Stream 用惰性中间操作构建流水线，并在终止操作时执行。抽象减少样板代码，但副作用和并行执行会放大认知成本。',
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
              title: 'Lambda 表达式',
              href: '/docs/basic-knowledge/java/functional/lambda-functional-interfaces-capture',
            },
            {
              title: 'Stream',
              href: '/docs/basic-knowledge/java/functional/stream-pipeline-lazy-evaluation',
            },
            {
              title: 'Collector',
              href: '/docs/basic-knowledge/java/functional/collectors-grouping-reduction',
            },
            {
              title: '并行流',
              href: '/docs/basic-knowledge/java/functional/parallel-stream-model-pitfalls',
            },
            {
              title: 'java.time',
              href: '/docs/basic-knowledge/java/functional/java-time-time-zone-boundaries',
            },
          ],
        },
      ],
    },
    {
      id: 'collections-engineering',
      order: '02',
      title: '集合、算法与代码质量',
      focus: '基础必会',
      description: '集合不是 API 背诵题。选择是否合理，取决于访问模式、数据规模和并发条件。',
      topics: [
        {
          id: 'java-collections',
          title: '集合框架与选型',
          module: 'Java',
          depth: 'foundation',
          priority: 'must',
          objective: '根据访问、顺序、去重和队列语义选择集合，并说清复杂度与内存代价。',
          details: {
            mechanism:
              'List、Set、Map 和 Queue 暴露不同语义，具体实现再选择数组、链表、哈希或树。平均复杂度只能描述常见路径，扩容、冲突和缓存局部性决定了真实成本。',
            outcomes: [
              '能从读写模式选择 ArrayList、LinkedList、HashSet、TreeSet 或 Queue。',
              '能解释迭代器、fail-fast 与不可变集合的边界。',
            ],
            interviewQuestions: [
              'ArrayList 扩容时发生什么，为什么随机访问更快？',
              'HashSet 如何依赖 HashMap，同时保证元素不重复？',
            ],
          },
          articles: [
            {
              title: 'Java 集合框架',
              href: '/docs/basic-knowledge/java/collections/collection-interface-selection',
            },
            {
              title: 'ArrayList',
              href: '/docs/basic-knowledge/java/collections/arraylist-growth-memory-locality',
            },
            {
              title: 'LinkedList',
              href: '/docs/basic-knowledge/java/collections/linkedlist-semantics-cost',
            },
            {
              title: 'TreeMap 与 TreeSet',
              href: '/docs/basic-knowledge/java/collections/treemap-treeset-ordered-query',
            },
            {
              title: '集合迭代器',
              href: '/docs/basic-knowledge/java/collections/iterator-fail-fast-immutable',
            },
          ],
        },
        {
          id: 'hashmap',
          title: 'HashMap 与 LinkedHashMap',
          module: 'Java',
          depth: 'mechanism',
          priority: 'must',
          objective: '从哈希分布、冲突和扩容解释查询性能，并正确实现作为键的对象。',
          details: {
            mechanism:
              'HashMap 先把哈希映射到桶，再在桶内比较键。冲突过多时链表转为树，扩容则重新分配桶。LinkedHashMap 额外维护顺序，因此能实现 LRU，也会多付指针和维护成本。',
            outcomes: [
              '能沿 put/get 路径解释哈希扰动、桶定位、冲突和树化。',
              '能说明 equals/hashCode 契约被破坏后的具体后果。',
            ],
            interviewQuestions: [
              'HashMap 为什么通常使用 2 的幂作为容量？',
              'JDK 8 的扩容为什么能减少重新计算哈希？',
            ],
          },
          articles: [
            {
              title: 'HashMap',
              href: '/docs/basic-knowledge/java/collections/hashmap-structure-lookup-path',
            },
            {
              title: '对象相等性',
              href: '/docs/basic-knowledge/java/language/equals-hashcode-object-identity',
            },
            {
              title: 'LinkedHashMap',
              href: '/docs/basic-knowledge/java/collections/linkedhashmap-lru',
            },
          ],
        },
        {
          id: 'concurrent-collections',
          title: '并发集合',
          module: 'Java',
          depth: 'mechanism',
          priority: 'common',
          objective: '根据竞争模式选择并发容器，理解弱一致迭代和复合操作的边界。',
          details: {
            mechanism:
              '并发集合通过分段、CAS、细粒度锁或写时复制减少共享状态上的串行等待。吞吐提高后，读取语义、内存占用和更新成本会随实现而变化。',
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
              title: 'ConcurrentHashMap',
              href: '/docs/basic-knowledge/java/collections/concurrenthashmap-atomic-compound-operations',
            },
            {
              title: 'CopyOnWrite 容器',
              href: '/docs/basic-knowledge/java/collections/copy-on-write-cost-model',
            },
            {
              title: 'BlockingQueue',
              href: '/docs/basic-knowledge/java/collections/blockingqueue-producer-consumer',
            },
            {
              title: 'ConcurrentLinkedQueue',
              href: '/docs/basic-knowledge/java/collections/concurrentlinkedqueue-lock-free-path',
            },
            {
              title: '迭代一致性',
              href: '/docs/basic-knowledge/java/collections/concurrent-collection-iteration-consistency',
            },
          ],
        },
        {
          id: 'java-algorithms',
          title: '算法实现与复杂度',
          module: 'Algorithm',
          depth: 'foundation',
          priority: 'must',
          objective: '把算法复杂度、边界条件和 Java 实现细节放进同一次推理，而不是分别背答案。',
          details: {
            mechanism:
              '算法描述状态如何变化，数据结构决定每次变化的成本。Java 的对象分配、递归栈、比较器和整数范围会进一步改变实现结果。',
            outcomes: [
              '能在编码前说明输入约束、时间复杂度和空间复杂度。',
              '能主动覆盖空输入、重复值、溢出和极端规模。',
            ],
            interviewQuestions: [
              '为什么相同 Big-O 的两个 Java 实现可能有明显性能差异？',
              '如何证明二分边界或动态规划状态转移没有漏解？',
            ],
          },
          coreArticleCount: 3,
          articles: [
            {
              title: '算法复杂度',
              href: '/docs/basic-knowledge/java/algorithms/complexity-constraints-java-cost',
            },
            {
              title: '滑动窗口',
              href: '/docs/basic-knowledge/java/algorithms/arrays-strings-sliding-window',
            },
            {
              title: '树与图搜索',
              href: '/docs/basic-knowledge/java/algorithms/trees-graphs-search',
            },
            {
              title: '动态规划',
              href: '/docs/basic-knowledge/java/algorithms/dynamic-programming-state-design',
            },
            {
              title: '算法正确性',
              href: '/docs/basic-knowledge/java/algorithms/live-coding-counterexamples-tests',
            },
          ],
        },
        {
          id: 'java-quality',
          title: 'API 设计、测试与代码质量',
          module: 'Engineering',
          depth: 'foundation',
          priority: 'optional',
          objective: '让类型、接口和测试共同约束变化，避免依靠注释维持正确性。',
          details: {
            mechanism:
              '清晰的 API 把不变量编码进类型和边界，测试再验证可观察行为。Mock 可以隔离外部依赖，但过度 Mock 会把实现细节焊死在测试里。',
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
              title: 'Java API 设计',
              href: '/docs/basic-knowledge/java/quality/api-design-from-invariants',
            },
            {
              title: '不可变对象',
              href: '/docs/basic-knowledge/java/quality/immutable-objects-defensive-copying',
            },
            {
              title: 'JUnit',
              href: '/docs/basic-knowledge/java/quality/junit-assertions-parameterized-tests',
            },
            {
              title: '测试替身',
              href: '/docs/basic-knowledge/java/quality/test-doubles-mock-stub-boundaries',
            },
            {
              title: '测试金字塔',
              href: '/docs/basic-knowledge/java/quality/test-pyramid-contract-regression',
            },
          ],
        },
      ],
    },
    {
      id: 'jvm-runtime',
      order: '03',
      title: 'JVM 与运行时',
      focus: '高频原理',
      description: 'JVM 题目的价值不在术语数量，而在于能否把代码、内存、编译和故障证据连起来。',
      topics: [
        {
          id: 'jvm-class-loading',
          title: '字节码与类加载',
          module: 'JVM',
          depth: 'mechanism',
          priority: 'common',
          objective: '说明源码如何变成可执行类，并判断类冲突、初始化和隔离问题出现在哪个阶段。',
          details: {
            mechanism:
              'javac 生成平台无关字节码，JVM 经过加载、链接和初始化建立运行时类型。双亲委派优先复用上层定义，减少重复与伪造；隔离需求则需要受控地打破委派。',
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
              title: 'Java 字节码',
              href: '/docs/basic-knowledge/java/jvm/source-to-bytecode',
            },
            {
              title: '类加载',
              href: '/docs/basic-knowledge/java/jvm/class-loading-stages',
            },
            {
              title: '双亲委派模型',
              href: '/docs/basic-knowledge/java/jvm/parent-delegation',
            },
            {
              title: '类加载器',
              href: '/docs/basic-knowledge/java/jvm/classloaders-spi-isolation',
            },
            {
              title: '类加载故障',
              href: '/docs/basic-knowledge/java/jvm/class-initialization-conflicts',
            },
          ],
        },
        {
          id: 'jvm-memory',
          title: '运行时内存与对象布局',
          module: 'JVM',
          depth: 'mechanism',
          priority: 'must',
          objective: '把对象、栈帧、类元数据和直接内存放回对应区域，并由此判断异常来源。',
          details: {
            mechanism:
              '线程栈保存调用状态，堆保存大多数对象，元空间保存类元数据，直接内存服务于堆外 I/O。对象布局和指针压缩决定单个对象成本，数量放大后才成为堆压力。',
            outcomes: [
              '能区分堆、虚拟机栈、程序计数器、元空间和直接内存。',
              '能解释对象头、对齐、压缩指针与逃逸后的分配位置。',
            ],
            interviewQuestions: [
              '哪些对象一定分配在堆上，这个说法为什么需要加条件？',
              '不同区域的 OOM 和 StackOverflowError 分别如何产生？',
            ],
          },
          articles: [
            {
              title: 'JVM 运行时数据区域',
              href: '/docs/basic-knowledge/java/jvm/runtime-data-areas',
            },
            {
              title: 'OutOfMemoryError 与 StackOverflowError',
              href: '/docs/basic-knowledge/java/jvm/oom-stack-overflow',
            },
            {
              title: 'Java 对象布局',
              href: '/docs/basic-knowledge/java/jvm/object-creation-layout',
            },
            {
              title: '压缩指针与对象对齐',
              href: '/docs/basic-knowledge/java/jvm/compressed-pointers-alignment',
            },
            {
              title: 'Java 直接内存',
              href: '/docs/basic-knowledge/java/jvm/direct-native-memory',
            },
          ],
        },
        {
          id: 'jvm-gc',
          title: '垃圾回收与收集器',
          module: 'JVM',
          depth: 'mechanism',
          priority: 'must',
          objective: '从存活判断、复制与并发标记解释停顿，并根据延迟和吞吐目标选择收集器。',
          details: {
            mechanism:
              'GC 从 Roots 追踪可达对象，再回收不可达空间。分代利用对象寿命差异减少扫描，并发收集器把部分工作移到应用运行期间。停顿减少后，CPU、屏障和并发回收风险会上升。',
            outcomes: [
              '能解释可达性分析、分代假设、写屏障和安全点。',
              '能比较 Serial、Parallel、G1、ZGC 与 Shenandoah 的目标。',
            ],
            interviewQuestions: [
              'Minor GC、Major GC 和 Full GC 为什么不能只按名字判断成本？',
              'G1 如何通过 Region 和 Remembered Set 回收局部区域？',
            ],
          },
          coreArticleCount: 3,
          articles: [
            {
              title: 'GC Roots',
              href: '/docs/basic-knowledge/java/jvm/gc-roots-reachability',
            },
            {
              title: '分代回收',
              href: '/docs/basic-knowledge/java/jvm/generational-barriers-safepoints',
            },
            {
              title: 'G1',
              href: '/docs/basic-knowledge/java/jvm/g1-regions-rset-collection-set',
            },
            {
              title: 'Serial、Parallel 与 CMS',
              href: '/docs/basic-knowledge/java/jvm/serial-parallel-cms',
            },
            {
              title: '低延迟垃圾收集器',
              href: '/docs/basic-knowledge/java/jvm/zgc-shenandoah-low-latency',
            },
          ],
        },
        {
          id: 'jvm-jit',
          title: 'JIT 与运行时优化',
          module: 'JVM',
          depth: 'mechanism',
          priority: 'optional',
          objective: '理解热点代码如何被优化，以及基准、预热和去优化为什么会改变观测结果。',
          details: {
            mechanism:
              '解释执行先收集运行时画像，JIT 再对热点方法进行内联、逃逸分析和代码优化。假设失效时会去优化。峰值性能来自画像，代价是预热时间和编译资源。',
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
              title: '分层编译',
              href: '/docs/basic-knowledge/java/jvm/interpreter-tiered-compilation',
            },
            {
              title: '方法内联与去优化',
              href: '/docs/basic-knowledge/java/jvm/inlining-deoptimization',
            },
            {
              title: '逃逸分析与标量替换',
              href: '/docs/basic-knowledge/java/jvm/escape-analysis-scalar-replacement',
            },
            {
              title: 'JMH',
              href: '/docs/basic-knowledge/java/jvm/jmh-correct-benchmarks',
            },
            {
              title: 'Java 启动优化',
              href: '/docs/basic-knowledge/java/jvm/aot-cds-native-image',
            },
          ],
        },
        {
          id: 'jvm-diagnostics',
          title: 'JVM 性能诊断',
          module: 'JVM',
          depth: 'scenario',
          priority: 'common',
          objective: '从症状选择线程、堆、GC 或运行时证据，用排除法缩小故障范围。',
          details: {
            mechanism:
              '性能诊断先确认用户可见症状，再关联 CPU、线程、分配和 GC 时间线。单个快照只能描述当时状态，持续采样和事件记录才可能解释因果。',
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
              title: 'JVM 诊断',
              href: '/docs/basic-knowledge/java/jvm/diagnostic-tools-evidence',
            },
            {
              title: 'CPU 使用率',
              href: '/docs/basic-knowledge/java/jvm/cpu-high-diagnosis',
            },
            {
              title: '线程转储',
              href: '/docs/basic-knowledge/java/jvm/thread-dumps-deadlocks-contention',
            },
            {
              title: '堆转储',
              href: '/docs/basic-knowledge/java/jvm/heap-dumps-memory-leaks',
            },
            {
              title: 'GC 停顿分析',
              href: '/docs/basic-knowledge/java/jvm/gc-logs-jfr-pauses',
            },
          ],
        },
      ],
    },
    {
      id: 'concurrency',
      order: '04',
      title: '并发与 Java 内存模型',
      focus: '高频原理',
      description: '并发问题来自共享状态和执行顺序。工具很多，证据最终仍要回到这两件事。',
      topics: [
        {
          id: 'java-concurrency',
          title: '线程、竞态与 JMM',
          module: 'JUC',
          depth: 'mechanism',
          priority: 'must',
          objective: '区分原子性、可见性和有序性，并用 happens-before 判断跨线程结果。',
          details: {
            mechanism:
              '线程共享堆内存，但 CPU 缓存和编译器优化会改变观察顺序。Java 内存模型用 happens-before 约束允许的结果，避免把具体硬件规则直接暴露给程序。',
            outcomes: [
              '能说明线程状态、竞态条件、数据竞争和安全发布。',
              '能用 happens-before 推导一个读操作是否必须看到某次写入。',
            ],
            interviewQuestions: [
              '可见性、原子性和有序性各自会产生什么错误？',
              'final 字段为什么拥有额外的初始化安全保证？',
            ],
          },
          coreArticleCount: 3,
          articles: [
            {
              title: '线程安全',
              href: '/docs/basic-knowledge/java/concurrency/thread-safety-race-conditions',
            },
            {
              title: 'Java 线程',
              href: '/docs/basic-knowledge/java/concurrency/thread-lifecycle-interruption',
            },
            {
              title: 'Java 内存模型',
              href: '/docs/basic-knowledge/java/concurrency/jmm-happens-before',
            },
            {
              title: '安全发布',
              href: '/docs/basic-knowledge/java/concurrency/safe-publication-escape-final',
            },
            {
              title: '消息传递',
              href: '/docs/basic-knowledge/java/concurrency/shared-state-message-passing',
            },
          ],
        },
        {
          id: 'synchronization',
          title: 'synchronized、volatile 与 CAS',
          module: 'JUC',
          depth: 'mechanism',
          priority: 'must',
          objective: '根据临界区和状态转换选择同步机制，而不是把 volatile 当成轻量锁。',
          details: {
            mechanism:
              'synchronized 为临界区提供互斥与可见性，volatile 约束单个变量的读写顺序，CAS 用比较交换实现无锁状态更新。冲突越高，重试和调度成本越明显。',
            outcomes: [
              '能说明 monitor、锁升级现状、内存屏障和 CAS 循环。',
              '能识别 volatile 不能保护的复合不变量。',
            ],
            interviewQuestions: [
              'volatile 能否保证 i++ 的线程安全，为什么？',
              'CAS 的 ABA 问题何时影响正确性？',
            ],
          },
          articles: [
            {
              title: 'synchronized',
              href: '/docs/basic-knowledge/java/concurrency/synchronized-monitor-optimizations',
            },
            {
              title: 'volatile',
              href: '/docs/basic-knowledge/java/concurrency/volatile-barriers-visibility',
            },
            {
              title: 'CAS',
              href: '/docs/basic-knowledge/java/concurrency/cas-aba-versioning',
            },
            {
              title: 'Java 原子类',
              href: '/docs/basic-knowledge/java/concurrency/atomic-longadder-contention',
            },
            {
              title: '锁与无锁',
              href: '/docs/basic-knowledge/java/concurrency/locks-vs-lock-free-cost',
            },
          ],
        },
        {
          id: 'aqs',
          title: 'Lock、AQS 与并发工具',
          module: 'JUC',
          depth: 'mechanism',
          priority: 'common',
          objective: '从同步状态和等待队列理解 Lock、Latch、Semaphore 与读写锁。',
          details: {
            mechanism:
              'AQS 用一个同步状态和 FIFO 等待队列组织竞争线程，子类只需定义状态获取与释放。统一骨架减少重复实现，但公平性、取消和条件队列仍会影响性能。',
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
              title: 'AQS',
              href: '/docs/basic-knowledge/java/concurrency/aqs-state-wait-queue',
            },
            {
              title: 'ReentrantLock',
              href: '/docs/basic-knowledge/java/concurrency/reentrantlock-fairness-condition',
            },
            {
              title: '读写锁',
              href: '/docs/basic-knowledge/java/concurrency/readwritelock-stampedlock',
            },
            {
              title: 'Java 并发同步器',
              href: '/docs/basic-knowledge/java/concurrency/latch-barrier-semaphore',
            },
            {
              title: '任务取消',
              href: '/docs/basic-knowledge/java/concurrency/interruption-timeout-cancellation',
            },
          ],
        },
        {
          id: 'thread-pool',
          title: '线程池与异步编排',
          module: 'JUC',
          depth: 'scenario',
          priority: 'must',
          objective: '根据任务时间和资源上限配置执行器，并让过载通过队列与拒绝策略显式暴露。',
          details: {
            mechanism:
              '线程池复用线程并限制并发，队列吸收短时突发，拒绝策略处理超过容量的任务。队列过大不会消灭压力，只会把拒绝变成更长的延迟和更多内存。',
            outcomes: [
              '能解释核心线程、最大线程、队列、存活时间和拒绝策略的联动。',
              '能处理 Future、CompletableFuture 的异常、超时和取消。',
            ],
            interviewQuestions: [
              '线程池大小应按 CPU 核数直接设置吗？还缺哪些变量？',
              'CompletableFuture 默认执行器会带来什么隔离问题？',
            ],
          },
          articles: [
            {
              title: 'Java 线程池',
              href: '/docs/basic-knowledge/java/concurrency/threadpoolexecutor-execution-path',
            },
            {
              title: 'CompletableFuture',
              href: '/docs/basic-knowledge/java/concurrency/future-completablefuture-errors',
            },
            {
              title: '虚拟线程',
              href: '/docs/basic-knowledge/java/concurrency/virtual-threads-boundaries',
            },
          ],
        },
        {
          id: 'concurrency-diagnostics',
          title: '并发故障与性能诊断',
          module: 'JUC',
          depth: 'scenario',
          priority: 'common',
          objective: '识别死锁、活锁、饥饿、线程泄漏和上下文切换，并用时间线证明原因。',
          details: {
            mechanism:
              '并发故障通常表现为进度停止或吞吐下降。线程状态、锁拥有关系、队列长度和调度事件共同描述系统是否仍在前进，单看线程数很容易误判。',
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
              title: '并发活跃性',
              href: '/docs/basic-knowledge/java/concurrency/liveness-deadlock-livelock-starvation',
            },
            {
              title: '线程转储',
              href: '/docs/basic-knowledge/java/jvm/thread-dumps-deadlocks-contention',
            },
            {
              title: 'ThreadLocal',
              href: '/docs/basic-knowledge/java/concurrency/threadlocal-leaks-context',
            },
            {
              title: '锁竞争',
              href: '/docs/basic-knowledge/java/concurrency/lock-contention-context-switch-benchmark',
            },
          ],
        },
      ],
    },
    {
      id: 'spring-data-access',
      order: '05',
      title: 'Spring 与数据访问',
      focus: '高频框架',
      description: '从一次请求进入容器，再沿代理、事务和持久化返回。框架原理应该落在这条链路上。',
      topics: [
        {
          id: 'spring-ioc',
          title: 'Spring IoC 与 Bean 生命周期',
          module: 'Spring',
          depth: 'mechanism',
          priority: 'must',
          objective: '解释对象创建为何交给容器，并判断作用域、生命周期和循环依赖问题。',
          details: {
            mechanism:
              'IoC 容器读取定义、创建对象、注入依赖并执行扩展点。依赖关系集中管理后更容易替换和测试，代价是对象创建不再只由 new 表达，启动链路也更长。',
            outcomes: [
              '能说明 Bean 定义、实例化、属性注入、初始化和销毁。',
              '能解释构造器注入、Setter 注入、作用域与循环依赖边界。',
            ],
            interviewQuestions: [
              'BeanFactory 与 ApplicationContext 的差异落在哪里？',
              '三级缓存能处理哪些循环依赖，为什么构造器循环依赖仍然失败？',
            ],
          },
          articles: [
            {
              title: 'IoC 容器',
              href: '/docs/basic-knowledge/java/spring/ioc-container-purpose',
            },
            {
              title: 'Bean 生命周期',
              href: '/docs/basic-knowledge/java/spring/bean-creation-lifecycle',
            },
            {
              title: '依赖注入',
              href: '/docs/basic-knowledge/java/spring/dependency-injection-selection',
            },
            {
              title: 'BeanDefinition',
              href: '/docs/basic-knowledge/java/spring/beandefinition-container-startup',
            },
            {
              title: 'Spring 循环依赖',
              href: '/docs/basic-knowledge/java/spring/circular-dependencies-scopes-early-exposure',
            },
          ],
        },
        {
          id: 'spring-aop',
          title: 'AOP、代理与声明式事务',
          module: 'Spring',
          depth: 'mechanism',
          priority: 'must',
          objective: '沿代理调用链解释切面如何生效，并识别事务、缓存和异步注解的失效边界。',
          details: {
            mechanism:
              'Spring 代理拦截外部方法调用，在目标方法前后执行事务、鉴权或监控逻辑。自调用没有经过代理，因此注解不会自动生效。横切逻辑集中后，调用路径也更隐蔽。',
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
              title: 'Spring AOP',
              href: '/docs/basic-knowledge/java/spring/aop-pointcut-interceptor-chain',
            },
            {
              title: 'Spring 事务',
              href: '/docs/basic-knowledge/java/spring/declarative-transaction-execution',
            },
            {
              title: 'JDK 动态代理与 CGLIB',
              href: '/docs/basic-knowledge/java/spring/jdk-proxy-cglib',
            },
          ],
        },
        {
          id: 'spring-request',
          title: 'Spring MVC 与 Web 请求链',
          module: 'Spring',
          depth: 'mechanism',
          priority: 'must',
          objective: '跟踪请求从连接进入 Controller 再到响应的路径，并放置正确的校验、鉴权和异常处理。',
          details: {
            mechanism:
              'Servlet 容器管理连接与线程，DispatcherServlet 根据映射找到处理器，再经过参数解析、调用和返回值处理生成响应。过滤器位于 Servlet 链，拦截器位于 MVC 链。',
            outcomes: [
              '能说明 Filter、Interceptor、ControllerAdvice 和参数解析器的位置。',
              '能设计一致的输入校验、错误响应和请求上下文。',
            ],
            interviewQuestions: [
              '一次 HTTP 请求如何到达 Controller？',
              '过滤器与拦截器的执行范围和依赖能力有什么区别？',
            ],
          },
          articles: [
            {
              title: 'Spring MVC 请求生命周期',
              href: '/docs/basic-knowledge/java/spring/http-request-to-controller',
            },
            {
              title: 'DispatcherServlet',
              href: '/docs/basic-knowledge/java/spring/dispatcherservlet-handler-mapping',
            },
            {
              title: 'Spring 拦截机制',
              href: '/docs/basic-knowledge/java/spring/filter-interceptor-aspect-boundaries',
            },
            {
              title: 'Spring MVC 参数解析',
              href: '/docs/basic-knowledge/java/spring/binding-validation-content-negotiation',
            },
            {
              title: 'API 错误契约',
              href: '/docs/basic-knowledge/java/spring/api-error-contract',
            },
          ],
        },
        {
          id: 'spring-boot',
          title: 'Spring Boot 自动配置与启动',
          module: 'Spring Boot',
          depth: 'mechanism',
          priority: 'must',
          objective: '解释自动配置为何生效、如何覆盖，并在启动失败时定位条件与配置来源。',
          details: {
            mechanism:
              'Spring Boot 根据 classpath、Bean 和配置属性评估条件，再导入匹配的自动配置。约定减少手工配置，代价是行为依赖条件组合，排查时必须查看条件报告与属性优先级。',
            outcomes: [
              '能说明启动入口、自动配置导入、条件注解和外部化配置。',
              '能使用 Actuator 与条件报告定位配置覆盖和 Bean 冲突。',
            ],
            interviewQuestions: [
              '@SpringBootApplication 实际组合了什么？',
              '自定义 starter 应如何提供自动配置并避免覆盖用户 Bean？',
            ],
          },
          articles: [
            {
              title: 'Spring Boot 启动',
              href: '/docs/basic-knowledge/java/spring/spring-boot-startup',
            },
            {
              title: 'Spring Boot 自动配置',
              href: '/docs/basic-knowledge/java/spring/auto-configuration-conditions',
            },
            {
              title: 'Spring Boot 外部化配置',
              href: '/docs/basic-knowledge/java/spring/external-config-precedence',
            },
            {
              title: 'Spring Boot Starter',
              href: '/docs/basic-knowledge/java/spring/custom-starter-boundaries',
            },
            {
              title: 'Spring Boot Actuator',
              href: '/docs/basic-knowledge/java/spring/actuator-health-startup-diagnostics',
            },
          ],
        },
        {
          id: 'data-access',
          title: 'MyBatis、JPA 与连接池',
          module: 'Data Access',
          depth: 'mechanism',
          priority: 'must',
          objective: '根据查询复杂度和领域模型选择持久化方式，并控制连接、事务和批处理成本。',
          details: {
            mechanism:
              'MyBatis 显式映射 SQL，JPA 维护对象状态并生成 SQL，连接池复用昂贵的数据库连接。抽象越高，常规操作越省事；复杂查询和隐式加载则更需要观察真实 SQL。',
            outcomes: [
              '能比较 MyBatis 与 JPA 在查询控制、状态管理和测试上的成本。',
              '能解释一级缓存、N+1、批处理和连接池耗尽。',
            ],
            interviewQuestions: [
              'MyBatis 的一级、二级缓存分别绑定什么范围？',
              'JPA 的脏检查和懒加载为何容易制造意外 SQL？',
            ],
          },
          articles: [
            {
              title: 'MyBatis',
              href: '/docs/basic-knowledge/java/data-access/mybatis-mapping-executor-plugins',
            },
            {
              title: '数据库连接池',
              href: '/docs/basic-knowledge/java/data-access/connection-pool-capacity-timeout-leaks',
            },
            {
              title: 'JPA',
              href: '/docs/basic-knowledge/java/data-access/jpa-entity-states-dirty-checking-lazy-loading',
            },
            {
              title: 'N+1 查询',
              href: '/docs/basic-knowledge/java/data-access/n-plus-one-fetch-strategies',
            },
            {
              title: '批处理与分页',
              href: '/docs/basic-knowledge/java/data-access/batching-pagination-data-access-tests',
            },
          ],
        },
      ],
    },
    {
      id: 'service-data',
      order: '06',
      title: '网络、数据与服务端生态',
      focus: '后端基础',
      description: '服务端组件不是购物清单。每增加一个组件，都要说明它解决的问题和新增的故障模式。',
      topics: [
        {
          id: 'network',
          title: 'TCP、HTTP、RPC 与 Netty',
          module: 'Network',
          depth: 'mechanism',
          priority: 'must',
          objective: '从连接、协议和线程模型解释一次远程调用的延迟、超时与资源占用。',
          details: {
            mechanism:
              'TCP 提供有序字节流，HTTP 或 RPC 定义消息语义，连接池摊薄握手成本。Netty 用事件循环管理大量连接。复用提高吞吐，也会引入队头阻塞、背压和连接治理。',
            outcomes: [
              '能说明 TCP 连接、HTTP 版本、序列化和 RPC 调用链。',
              '能解释 Reactor、EventLoop、ByteBuf 与粘包拆包。',
            ],
            interviewQuestions: [
              'HTTP/1.1、HTTP/2 和 HTTP/3 的并发与队头阻塞差异是什么？',
              'RPC 超时应从客户端、代理还是服务端开始计算？',
            ],
          },
          coreArticleCount: 3,
          articles: [
            {title: 'TCP 连接', href: '/docs/basic-knowledge/network/tcp_handshake'},
            {
              title: 'HTTP',
              href: '/docs/basic-knowledge/network/http-versions-connection-reuse-timeouts',
            },
            {
              title: 'RPC',
              href: '/docs/basic-knowledge/network/rpc-serialization-netty-event-loop',
            },
            {title: '网络模型', href: '/docs/basic-knowledge/network/network-models'},
            {title: 'TCP 与 UDP', href: '/docs/basic-knowledge/network/tcp_udp'},
          ],
        },
        {
          id: 'database-index',
          title: 'MySQL 索引与查询优化',
          module: 'Database',
          depth: 'mechanism',
          priority: 'must',
          objective: '理解索引如何缩小扫描范围，并用执行计划验证联合索引与查询改写。',
          details: {
            mechanism:
              'B+ 树通过有序页减少随机查找，联合索引按列顺序组织键。优化器根据统计信息选择访问路径。索引加快读取，却会增加写放大、空间和维护成本。',
            outcomes: [
              '能解释聚簇、二级、联合、覆盖索引和回表。',
              '能从 EXPLAIN、扫描行数和实际耗时定位慢查询。',
            ],
            interviewQuestions: [
              '为什么 InnoDB 使用 B+ 树，联合索引为什么遵循最左前缀？',
              'SQL 使用了索引，为什么仍然可能很慢？',
            ],
          },
          articles: [
            {title: '数据库索引', href: '/docs/basic-knowledge/database/indices/'},
            {title: 'B+ 树', href: '/docs/basic-knowledge/database/indices/b_plus_tree/'},
            {title: '聚簇索引', href: '/docs/basic-knowledge/database/indices/clustered_index/'},
            {
              title: '联合索引与覆盖索引',
              href: '/docs/basic-knowledge/database/indices/composite-covering-back-table',
            },
            {
              title: '索引设计',
              href: '/docs/basic-knowledge/database/indices/index-review',
            },
          ],
        },
        {
          id: 'database-transaction',
          title: '事务、锁与 MVCC',
          module: 'Database',
          depth: 'mechanism',
          priority: 'must',
          objective: '解释隔离级别如何约束并发读写，以及锁与多版本分别处理什么问题。',
          details: {
            mechanism:
              '事务把一组变化作为提交单位，锁约束冲突操作，MVCC 让读取访问历史版本以减少读写互斥。隔离越强，异常越少，但等待和失败重试通常更多。',
            outcomes: [
              '能说明 ACID、隔离级别、快照读、当前读和版本链。',
              '能分析行锁、间隙锁、死锁和长事务。',
            ],
            interviewQuestions: [
              '可重复读如何避免大部分幻读，当前读为何仍需要间隙锁？',
              '死锁发生后，数据库为什么选择回滚一个事务而不是一直等待？',
            ],
          },
          coreArticleCount: 3,
          articles: [
            {
              title: '数据库事务',
              href: '/docs/basic-knowledge/database/transaction/',
            },
            {
              title: 'InnoDB 锁',
              href: '/docs/basic-knowledge/database/transaction/innodb-locking-ranges',
            },
            {
              title: 'MVCC',
              href: '/docs/basic-knowledge/database/transaction/mvcc-read-view-consistent-read',
            },
            {
              title: '数据库死锁',
              href: '/docs/basic-knowledge/database/transaction/deadlock-detection-timeout-retry',
            },
            {
              title: '长事务',
              href: '/docs/basic-knowledge/database/transaction/long-transactions-hot-updates-boundaries',
            },
          ],
        },
        {
          id: 'cache-mq',
          title: 'Redis 与缓存一致性',
          module: 'Middleware',
          depth: 'scenario',
          priority: 'must',
          objective: '根据访问模式决定是否缓存，并处理失效、热点和数据库一致性代价。',
          details: {
            mechanism:
              '缓存把热点数据放到更快的存储层，以命中率换取更低延迟。缓存与数据库成为两份状态后，更新顺序、过期和故障都会制造短暂或长期不一致。',
            outcomes: [
              '能选择 Redis 数据结构并解释持久化、复制与集群。',
              '能处理穿透、击穿、雪崩、热点 Key 和大 Key。',
            ],
            interviewQuestions: [
              '先更新数据库再删缓存，仍然可能出现什么竞态？',
              'Redis 分布式锁需要哪些条件，为什么它不能自动保证业务正确？',
            ],
          },
          coreArticleCount: 3,
          articles: [
            {title: 'Redis', href: '/docs/basic-knowledge/nosql/redis/'},
            {
              title: '缓存一致性',
              href: '/docs/basic-knowledge/nosql/redis/cache-patterns-consistency',
            },
            {
              title: '缓存穿透、击穿、雪崩与热点 Key',
              href: '/docs/basic-knowledge/nosql/redis/cache-penetration-stampede-avalanche-hotkeys',
            },
            {
              title: 'Redis 持久化、复制与集群',
              href: '/docs/basic-knowledge/nosql/redis/persistence',
            },
            {
              title: '分布式锁',
              href: '/docs/basic-knowledge/nosql/redis/distributed-lock-conditions-boundaries',
            },
          ],
        },
        {
          id: 'messaging-search',
          title: '消息、搜索与后台任务',
          module: 'Middleware',
          depth: 'scenario',
          priority: 'common',
          objective: '用异步和专用索引处理慢任务与复杂查询，同时保证消息和索引可以恢复。',
          details: {
            mechanism:
              '消息队列把生产与消费解耦，搜索引擎用倒排索引换取查询能力，调度器按时间触发任务。组件各自保存状态，因此重复、乱序、延迟和重建必须成为设计的一部分。',
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
              title: '消息队列',
              href: '/docs/basic-knowledge/middleware/kafka-rabbitmq-queue-semantics',
            },
            {
              title: '消息可靠性',
              href: '/docs/basic-knowledge/middleware/message-ack-retry-dead-letter',
            },
            {
              title: '消息幂等性',
              href: '/docs/basic-knowledge/middleware/idempotent-consumption-order-duplicates',
            },
            {
              title: 'Elasticsearch',
              href: '/docs/basic-knowledge/middleware/elasticsearch-inverted-index-refresh-visibility',
            },
            {
              title: '分布式任务调度',
              href: '/docs/basic-knowledge/middleware/scheduled-tasks-sharding-recovery',
            },
          ],
        },
      ],
    },
    {
      id: 'microservices-production',
      order: '07',
      title: '微服务与生产治理',
      focus: '按 JD 选学',
      description: '微服务把进程内问题变成网络和组织问题。拆分容易，稳定地运行才是主要成本。',
      topics: [
        {
          id: 'service-governance',
          title: '注册、配置、网关与流量治理',
          module: 'Microservices',
          depth: 'scenario',
          priority: 'common',
          objective: '理解服务实例如何被发现、配置和路由，并控制变更传播范围。',
          details: {
            mechanism:
              '注册中心维护实例位置，配置中心分发运行参数，网关执行入口路由与通用策略。集中治理减少重复实现，也会形成关键依赖和较大的故障半径。',
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
              title: '服务发现',
              href: '/docs/system-design/microservices/service-discovery-health-checks',
            },
            {
              title: '配置中心',
              href: '/docs/system-design/microservices/config-center-version-refresh',
            },
            {
              title: 'API 网关',
              href: '/docs/system-design/microservices/api-gateway-routing',
            },
            {
              title: '灰度发布',
              href: '/docs/system-design/microservices/canary-traffic-tagging-rollback',
            },
            {
              title: '控制平面与数据平面',
              href: '/docs/system-design/microservices/control-plane-data-plane-failures',
            },
          ],
        },
        {
          id: 'resilience',
          title: '超时、重试、限流与熔断',
          module: 'Reliability',
          depth: 'scenario',
          priority: 'common',
          objective: '为失败设置明确预算，避免局部变慢经由重试和排队扩散为系统故障。',
          details: {
            mechanism:
              '超时限制单次等待，重试处理暂时失败，限流保护容量，熔断在连续异常时快速失败。保护机制叠加不当会放大流量或过早拒绝，因此必须共享预算。',
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
              title: '超时',
              href: '/docs/system-design/reliability/timeout-budget-cancellation',
            },
            {
              title: '重试',
              href: '/docs/system-design/reliability/retry-backoff-jitter-storms',
            },
            {
              title: '限流',
              href: '/docs/system-design/reliability/rate-limiting-capacity-protection',
            },
            {
              title: '服务容错',
              href: '/docs/system-design/reliability/circuit-breaker-degradation-bulkhead',
            },
            {
              title: '幂等键',
              href: '/docs/system-design/reliability/idempotency-keys-safe-retries',
            },
          ],
        },
        {
          id: 'distributed-transaction',
          title: '分布式事务与数据一致性',
          module: 'Distributed Data',
          depth: 'scenario',
          priority: 'common',
          objective: '从业务不变量选择强一致、补偿或事件驱动方案，并设计可恢复的中间状态。',
          details: {
            mechanism:
              '跨服务后不存在单个本地事务统一提交。两阶段提交协调参与者，Saga 用补偿连接局部事务，Outbox 把数据变化与事件写入同一本地事务。可靠性来自状态可追踪，不来自隐藏失败。',
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
              title: '分布式一致性',
              href: '/docs/system-design/distributed-data/invariants-to-consistency-strategy',
            },
            {
              title: '2PC 与 TCC',
              href: '/docs/system-design/distributed-data/2pc-tcc-coordination-cost',
            },
            {
              title: 'Saga',
              href: '/docs/system-design/distributed-data/saga-compensation-intermediate-state',
            },
            {
              title: 'Transactional Outbox 与 CDC',
              href: '/docs/system-design/distributed-data/outbox-cdc-reliable-events',
            },
            {
              title: '分布式流程恢复',
              href: '/docs/system-design/distributed-data/idempotency-reconciliation-manual-repair',
            },
          ],
        },
        {
          id: 'security',
          title: '认证、授权与应用安全',
          module: 'Security',
          depth: 'scenario',
          priority: 'common',
          objective: '把身份、权限、输入和密钥放到明确边界，避免依赖网络位置作为信任证明。',
          details: {
            mechanism:
              '认证确认主体身份，授权判断主体能否执行动作，输入校验限制不可信数据，密钥保护用于建立可信通信。每层都只能解决自己的问题，JWT 也不会顺便修复越权。',
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
              title: '认证与授权',
              href: '/docs/system-design/security/authentication-authorization-trust-boundaries',
            },
            {
              title: 'Session、JWT、OAuth 2.0 与 OIDC',
              href: '/docs/system-design/security/session-jwt-oauth-oidc',
            },
            {
              title: 'Spring Security',
              href: '/docs/system-design/security/spring-security-filter-chain',
            },
            {
              title: 'Web 应用安全',
              href: '/docs/system-design/security/injection-authorization-ssrf-deserialization',
            },
            {
              title: '密钥、证书、审计与供应链安全',
              href: '/docs/system-design/security/secrets-certificates-audit-supply-chain',
            },
          ],
        },
        {
          id: 'delivery',
          title: '可观测性、交付与联合排障',
          module: 'Production',
          depth: 'scenario',
          priority: 'common',
          objective: '让代码经过可重复构建进入环境，并用日志、指标和追踪解释生产故障。',
          details: {
            mechanism:
              '构建固定输入与产物，流水线执行测试和发布策略，可观测性记录系统输出。三者连接后，版本变化与运行异常才能出现在同一条时间线上。',
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
            {title: 'Git', href: '/docs/tools-and-frameworks/git/'},
            {
              title: 'Maven',
              href: '/docs/system-design/production/maven-lifecycle-dependency-convergence',
            },
            {
              title: '可重复交付',
              href: '/docs/system-design/production/docker-ci-cd-reproducible-delivery',
            },
            {
              title: '可观测性',
              href: '/docs/system-design/production/logs-metrics-traces-correlation',
            },
            {
              title: '生产故障诊断',
              href: '/docs/system-design/production/jvm-thread-sql-network-joint-diagnosis',
            },
          ],
        },
      ],
    },
    {
      id: 'architecture-interview',
      order: '08',
      title: '系统设计与架构面试',
      focus: '架构岗位选学',
      description: '只在目标岗位明确考察系统设计或架构经验时进入。回答重点是约束、取舍、迁移路径和故障恢复。',
      topics: [
        {
          id: 'system-design',
          title: '系统设计方法与容量',
          module: 'System Design',
          depth: 'scenario',
          priority: 'optional',
          objective: '从需求、规模和可靠性目标出发，完成容量估算、边界拆分与关键选型。',
          details: {
            mechanism:
              '系统设计先把模糊需求变成可验证约束，再用数据流和故障模型选择组件。容量估算用于暴露数量级，架构图只是推理结果，不是答案本身。',
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
              title: '系统设计面试',
              href: '/docs/system-design/system-design/interview-process',
            },
            {
              title: '系统架构',
              href: '/docs/system-design/system-design/universe_architecture',
            },
            {
              title: '容量规划',
              href: '/docs/system-design/system-design/capacity-slo-failure-model',
            },
            {
              title: '数据拆分',
              href: '/docs/system-design/system-design/read-write-paths-hotspots-sharding',
            },
            {
              title: '系统设计题',
              href: '/docs/system-design/system-design/system-design-problems/',
            },
          ],
        },
        {
          id: 'distributed-system',
          title: '复制、一致性与共识',
          module: 'Distributed Systems',
          depth: 'scenario',
          priority: 'optional',
          objective: '在节点故障和网络分区条件下，判断复制、一致性与可用性的真实边界。',
          details: {
            mechanism:
              '复制提高读取能力和容错，但副本必须处理顺序、延迟与冲突。共识让多数节点对日志顺序达成一致，无法让网络恢复，也无法绕过多数派存活条件。',
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
              title: 'CAP 理论',
              href: '/docs/system-design/distributed-system/cap-theorem',
            },
            {
              title: '主备复制',
              href: '/docs/system-design/distributed-system/primary_backup_replication',
            },
            {
              title: '一致性模型',
              href: '/docs/system-design/distributed-system/consistency-models-quorum-linearizability',
            },
            {
              title: 'Raft',
              href: '/docs/system-design/distributed-system/raft-election-log-replication',
            },
            {
              title: '跨地域复制',
              href: '/docs/system-design/distributed-system/cross-region-replication-latency-conflicts',
            },
          ],
        },
        {
          id: 'domain-architecture',
          title: 'DDD、模块化单体与微服务',
          module: 'Architecture',
          depth: 'scenario',
          priority: 'optional',
          objective: '按业务变化和团队边界划分模块，避免用部署单元替代领域分析。',
          details: {
            mechanism:
              '领域边界把高内聚规则放在一起，通过明确契约减少跨边界修改。模块化单体保留进程内协作，微服务增加独立部署。独立性越强，分布式数据和运维成本越高。',
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
              title: '限界上下文',
              href: '/docs/system-design/architecture/domain-bounded-context-ubiquitous-language',
            },
            {
              title: '聚合',
              href: '/docs/system-design/architecture/aggregate-invariants-transaction-boundaries',
            },
            {
              title: '模块化单体',
              href: '/docs/system-design/architecture/modular-monolith-dependency-constraints',
            },
            {
              title: '微服务架构',
              href: '/docs/system-design/architecture/microservice-splitting-benefits-costs',
            },
            {
              title: '绞杀者模式',
              href: '/docs/system-design/architecture/strangler-migration-compatibility-rollback',
            },
          ],
        },
        {
          id: 'availability-cost',
          title: '高可用、容灾、多租户与成本',
          module: 'Architecture',
          depth: 'scenario',
          priority: 'optional',
          objective: '把可靠性目标、恢复能力、租户隔离和资源成本放进同一份架构预算。',
          details: {
            mechanism:
              '冗余减少单点故障，容灾缩短严重故障后的恢复，多租户提高资源利用率。副本、隔离和跨地域都会增加成本与操作复杂度，因此必须由 SLO 和风险决定。',
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
              title: '服务等级目标（SLO）',
              href: '/docs/system-design/availability/sli-slo-error-budget-capacity-headroom',
            },
            {
              title: '灾难恢复',
              href: '/docs/system-design/availability/high-availability-backup-rto-rpo',
            },
            {
              title: '故障转移',
              href: '/docs/system-design/availability/failover-drills-recovery-validation',
            },
            {
              title: '多租户',
              href: '/docs/system-design/availability/multi-tenant-isolation-quotas-data-boundaries',
            },
            {
              title: '成本归因',
              href: '/docs/system-design/availability/performance-reliability-cost-attribution',
            },
          ],
        },
        {
          id: 'architecture-evolution',
          title: '架构演进与技术决策',
          module: 'Architecture',
          depth: 'scenario',
          priority: 'optional',
          objective: '在架构面试中说明技术决策、迁移步骤、回滚条件和失败后的修正方式。',
          details: {
            mechanism:
              '架构演进依赖可分阶段交付的迁移路径，技术决策需要明确约束、备选方案、验证指标和退出条件。面试回答应使用自己经历过的证据，不把管理方法当作通用结论。',
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
              title: '架构决策记录（ADR）',
              href: '/docs/system-design/leadership/constraints-architecture-decision-records',
            },
            {
              title: '架构迁移',
              href: '/docs/system-design/leadership/compatibility-migration-canary-exit-criteria',
            },
            {
              title: '技术债',
              href: '/docs/system-design/leadership/technical-debt-priority-business-value',
            },
            {
              title: '设计评审',
              href: '/docs/system-design/leadership/cross-team-design-review-disagreement',
            },
            {
              title: '事故复盘',
              href: '/docs/system-design/leadership/incident-review-failed-designs-organizational-learning',
            },
          ],
        },
      ],
    },
  ],
};
