import type {InterviewRoadmapData} from '../../components/InterviewRoadmap';
import {createOutlineNavigation} from './outlineCatalog';

export const javaInterviewRoadmap: InterviewRoadmapData = {
  eyebrow: 'R01 / Java Backend',
  title: 'Java 后端开发面试路线',
  introduction:
    '这条路线把 Java 面试拆成 8 个阶段、40 个 Topic。顺序从语言和运行时出发，经过 Spring、数据与服务治理，最后进入架构决策。每个 Topic 都给出原理链路、掌握标准、必会问题、实践检验和 Senior 追问。',
  reviewHint:
    '时间有限时先完成“高频”，再补“重点”。“扩展”不是冷知识仓库，而是岗位深度足够后才有收益的部分。',
  navigationTitle: 'Outline 目录',
  mobileNavigationLabel: '查看 Outline 目录',
  navigationGroups: createOutlineNavigation('R01'),
  phases: [
    {
      id: 'language-foundation',
      order: '01',
      title: 'Java 语言与标准库',
      range: '初级',
      description: '先建立稳定的语言模型。框架会变化，类型、对象和异常语义不会替你一起变化。',
      topics: [
        {
          id: 'java-oop',
          title: '类型系统与对象模型',
          module: 'Java',
          level: 'junior',
          priority: 'high',
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
            practice:
              '实现一个支持多种计价策略的订单模型，再新增一种策略，检查是否需要修改已有调用方。',
            seniorFollowUp:
              '当继承层次已经影响发布和测试时，如何迁移到组合模型，并保持二进制兼容？',
          },
          articles: [
            {title: 'Java 类型、引用与值传递'},
            {title: '封装、继承与多态的真实边界'},
            {title: '接口、抽象类与组合的选择'},
            {title: '重载、重写与动态绑定'},
            {title: 'equals、hashCode 与对象身份'},
          ],
        },
        {
          id: 'java-values-errors',
          title: '字符串、数值与异常',
          module: 'Java',
          level: 'junior',
          priority: 'high',
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
            practice:
              '实现一个金额计算与参数校验模块，覆盖精度、空值、非法状态和异常转换。',
            seniorFollowUp:
              '跨服务调用中，怎样设计稳定的错误契约，同时保留可诊断的内部原因？',
          },
          articles: [
            {title: 'String 不可变性与字符串常量池'},
            {title: '包装类型、自动装箱与缓存'},
            {title: 'BigDecimal 与金额计算'},
            {title: '异常体系与错误边界'},
            {title: 'Optional 能解决什么，不能解决什么'},
          ],
        },
        {
          id: 'java-generics-reflection',
          title: '泛型、注解与反射',
          module: 'Java',
          level: 'junior',
          priority: 'important',
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
            practice:
              '实现一个带运行时校验注解的小型映射器，并记录反射缓存前后的调用差异。',
            seniorFollowUp:
              '需要降低反射成本或提高 Native Image 兼容性时，可以把哪些工作移到编译期？',
          },
          articles: [
            {
              title: 'Java 泛型',
              href: '/docs/basic-knowledge/java/language/generics',
            },
            {title: '注解的保留策略与处理阶段'},
            {title: '反射 API、MethodHandle 与调用成本'},
            {title: '从运行时扫描到编译期代码生成'},
          ],
        },
        {
          id: 'java-io',
          title: 'I/O、NIO 与资源管理',
          module: 'Java',
          level: 'junior',
          priority: 'important',
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
            practice:
              '分别用流和 Channel 复制大文件，记录吞吐、内存与异常中断后的资源状态。',
            seniorFollowUp:
              '高并发文件服务中，怎样在吞吐、堆外内存、背压和连接公平性之间取舍？',
          },
          articles: [
            {title: '字节流、字符流与缓冲'},
            {title: 'try-with-resources 与关闭语义'},
            {title: 'Buffer、Channel 与 Selector'},
            {title: '文件映射、零拷贝与直接内存'},
            {title: 'Java 序列化的兼容与安全边界'},
          ],
        },
        {
          id: 'java-functional',
          title: 'Lambda、Stream 与日期时间',
          module: 'Java',
          level: 'junior',
          priority: 'important',
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
            practice:
              '把一段包含过滤、聚合和分组的循环改写为 Stream，并比较可读性与基准结果。',
            seniorFollowUp:
              '共享 ForkJoinPool 影响请求隔离时，怎样判断继续并行、改用独立执行器还是回到串行？',
          },
          articles: [
            {title: 'Lambda、函数式接口与闭包捕获'},
            {title: 'Stream 流水线与惰性求值'},
            {title: 'Collector、分组与归约'},
            {title: '并行流的执行模型与陷阱'},
            {title: 'java.time 与时区边界'},
          ],
        },
      ],
    },
    {
      id: 'collections-engineering',
      order: '02',
      title: '集合、算法与代码质量',
      range: '初级 → 中级',
      description: '集合不是 API 背诵题。选择是否合理，取决于访问模式、数据规模和并发条件。',
      topics: [
        {
          id: 'java-collections',
          title: '集合框架与选型',
          module: 'Java',
          level: 'junior',
          priority: 'high',
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
            practice:
              '为订单去重、延迟任务和排行榜三个场景选集合，并用数据规模说明选择。',
            seniorFollowUp:
              '当堆占用和 GC 成为瓶颈时，集合布局、装箱和对象数量应如何进入选型？',
          },
          articles: [
            {title: 'List、Set、Map 与 Queue 的选择'},
            {title: 'ArrayList 扩容与内存局部性'},
            {title: 'LinkedList 的语义与现实成本'},
            {title: 'TreeMap、TreeSet 与有序查询'},
            {title: '迭代器、fail-fast 与不可变集合'},
          ],
        },
        {
          id: 'hashmap',
          title: 'HashMap 与 LinkedHashMap',
          module: 'Java',
          level: 'middle',
          priority: 'high',
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
            practice:
              '实现一个基于 LinkedHashMap 的有界 LRU，并用碰撞键验证正确性。',
            seniorFollowUp:
              '攻击者可控制 Key 时，如何评估哈希碰撞、CPU 消耗和内存放大的风险？',
          },
          articles: [
            {title: 'HashMap 的数据结构与查找路径'},
            {title: '哈希冲突、树化与退化条件'},
            {title: '容量、负载因子与扩容'},
            {title: 'equals 与 hashCode 契约'},
            {title: 'LinkedHashMap 与 LRU'},
          ],
        },
        {
          id: 'concurrent-collections',
          title: '并发集合',
          module: 'Java',
          level: 'middle',
          priority: 'high',
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
            practice:
              '实现一个并发计数与生产消费示例，用压力测试验证丢更新和阻塞行为。',
            seniorFollowUp:
              '热点 Key 使并发 Map 吞吐下降时，如何通过分片、聚合或数据模型调整缓解竞争？',
          },
          articles: [
            {title: 'ConcurrentHashMap 与原子复合操作'},
            {title: 'CopyOnWrite 容器的成本模型'},
            {title: 'BlockingQueue 与生产消费'},
            {title: 'ConcurrentLinkedQueue 的无锁路径'},
            {title: '并发容器的迭代一致性'},
          ],
        },
        {
          id: 'java-algorithms',
          title: '算法实现与复杂度',
          module: 'Algorithm',
          level: 'junior',
          priority: 'high',
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
            practice:
              '完成数组、链表、树、图和动态规划各一题，并为每题补反例与自动化测试。',
            seniorFollowUp:
              '数据无法完整装入内存或必须在线处理时，原算法需要怎样改写？',
          },
          articles: [
            {title: '复杂度、约束与 Java 成本模型'},
            {title: '数组、字符串与滑动窗口'},
            {title: '树、图与搜索模板'},
            {title: '动态规划的状态设计'},
            {title: '现场编码中的反例与测试'},
          ],
        },
        {
          id: 'java-quality',
          title: 'API 设计、测试与代码质量',
          module: 'Engineering',
          level: 'middle',
          priority: 'important',
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
            practice:
              '为一个支付适配层编写单元、集成和契约测试，比较每层能发现的问题。',
            seniorFollowUp:
              '大型代码库中，怎样通过模块边界、兼容策略和测试组合控制变更成本？',
          },
          articles: [
            {title: '从不变量出发设计 Java API'},
            {title: '不可变对象与防御性复制'},
            {title: 'JUnit、断言与参数化测试'},
            {title: 'Mock、Stub 与测试替身边界'},
            {title: '测试金字塔、契约与回归成本'},
          ],
        },
      ],
    },
    {
      id: 'jvm-runtime',
      order: '03',
      title: 'JVM 与运行时',
      range: '中级',
      description: 'JVM 题目的价值不在术语数量，而在于能否把代码、内存、编译和故障证据连起来。',
      topics: [
        {
          id: 'jvm-class-loading',
          title: '字节码与类加载',
          module: 'JVM',
          level: 'middle',
          priority: 'high',
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
            practice:
              '编写自定义类加载器加载两个版本的同名类，观察类型身份和强制转换结果。',
            seniorFollowUp:
              '插件系统、应用服务器或热部署环境如何设计类隔离、共享包和卸载边界？',
          },
          articles: [
            {title: '从 Java 源码到字节码'},
            {title: '类加载的五个阶段'},
            {title: '双亲委派模型解决的问题'},
            {title: '类加载器、SPI 与隔离'},
            {title: '类初始化死锁与版本冲突排查'},
          ],
        },
        {
          id: 'jvm-memory',
          title: '运行时内存与对象布局',
          module: 'JVM',
          level: 'middle',
          priority: 'high',
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
            practice:
              '构造堆、元空间、直接内存和栈耗尽案例，记录异常、参数和监控差异。',
            seniorFollowUp:
              '容器内运行 JVM 时，堆、非堆、线程栈和 native memory 应怎样共同纳入容量预算？',
          },
          articles: [
            {title: 'JVM 运行时数据区域'},
            {title: '对象创建、对象头与内存布局'},
            {title: '指针压缩、对齐与对象成本'},
            {title: '直接内存与 Native Memory'},
            {title: '常见 OOM 与栈溢出场景'},
          ],
        },
        {
          id: 'jvm-gc',
          title: '垃圾回收与收集器',
          module: 'JVM',
          level: 'middle',
          priority: 'high',
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
            practice:
              '对同一分配负载使用两种收集器，比较吞吐、P99 停顿和 CPU。',
            seniorFollowUp:
              '低延迟服务中，选择低停顿收集器后，还要怎样处理分配速率、堆余量和容器成本？',
          },
          articles: [
            {title: 'GC Roots 与可达性分析'},
            {title: '分代回收、屏障与安全点'},
            {title: 'Serial、Parallel 与 CMS 的历史位置'},
            {title: 'G1 的 Region、RSet 与回收集合'},
            {title: 'ZGC、Shenandoah 与低延迟代价'},
          ],
        },
        {
          id: 'jvm-jit',
          title: 'JIT 与运行时优化',
          module: 'JVM',
          level: 'middle',
          priority: 'important',
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
            practice:
              '使用 JMH 比较两种实现，验证预热、分叉、黑洞和常量折叠的影响。',
            seniorFollowUp:
              '短生命周期任务更在意启动与峰值性能时，如何比较 JVM、AOT 和 Native Image？',
          },
          articles: [
            {title: '解释器、分层编译与热点探测'},
            {title: '方法内联与去优化'},
            {title: '逃逸分析与标量替换'},
            {title: 'JMH 如何避免错误基准'},
            {title: 'AOT、CDS 与 Native Image 的取舍'},
          ],
        },
        {
          id: 'jvm-diagnostics',
          title: 'JVM 性能诊断',
          module: 'JVM',
          level: 'middle',
          priority: 'high',
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
            practice:
              '构造 CPU 热点、死锁和对象泄漏，分别输出时间线、证据和结论。',
            seniorFollowUp:
              '生产环境不能长时间停顿或导出完整堆时，怎样设计低风险的证据采集方案？',
          },
          articles: [
            {title: 'JVM 诊断工具与证据选择'},
            {title: 'CPU 升高的排查路径'},
            {title: '线程转储、死锁与锁竞争'},
            {title: '堆转储与内存泄漏'},
            {title: 'GC 日志、JFR 与停顿分析'},
          ],
        },
      ],
    },
    {
      id: 'concurrency',
      order: '04',
      title: '并发与 Java 内存模型',
      range: '中级',
      description: '并发问题来自共享状态和执行顺序。工具很多，证据最终仍要回到这两件事。',
      topics: [
        {
          id: 'java-concurrency',
          title: '线程、竞态与 JMM',
          module: 'JUC',
          level: 'middle',
          priority: 'high',
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
            practice:
              '编写一个错误发布与丢更新示例，再分别用锁、volatile 和不可变对象修复。',
            seniorFollowUp:
              '跨线程对象生命周期复杂时，怎样用所有权、不可变性和消息传递减少共享状态？',
          },
          articles: [
            {title: '线程安全问题从哪里产生'},
            {title: '线程生命周期与中断语义'},
            {title: 'Java 内存模型与 happens-before'},
            {title: '安全发布、逸出与 final 语义'},
            {title: '从共享状态到消息传递'},
          ],
        },
        {
          id: 'synchronization',
          title: 'synchronized、volatile 与 CAS',
          module: 'JUC',
          level: 'middle',
          priority: 'high',
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
            practice:
              '实现计数器、状态机和双重检查单例，分别证明所用同步机制足够。',
            seniorFollowUp:
              '竞争激烈时，无锁方案为何可能输给锁，怎样通过基准和 profile 判断？',
          },
          articles: [
            {title: 'synchronized 的 monitor 与优化'},
            {title: 'volatile、屏障与可见性'},
            {title: 'CAS、ABA 与版本标记'},
            {title: '原子类、LongAdder 与热点竞争'},
            {title: '锁与无锁方案的成本比较'},
          ],
        },
        {
          id: 'aqs',
          title: 'Lock、AQS 与并发工具',
          module: 'JUC',
          level: 'middle',
          priority: 'high',
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
            practice:
              '实现一个限并发的批处理器，并验证超时、取消、中断和许可归还。',
            seniorFollowUp:
              '读多写少场景中，读写锁、StampedLock、Copy-on-Write 和不可变快照应如何比较？',
          },
          articles: [
            {title: 'AQS 的同步状态与等待队列'},
            {title: 'ReentrantLock、公平性与 Condition'},
            {title: '读写锁与 StampedLock'},
            {title: 'Latch、Barrier 与 Semaphore'},
            {title: '中断、超时与取消协议'},
          ],
        },
        {
          id: 'thread-pool',
          title: '线程池与异步编排',
          module: 'JUC',
          level: 'middle',
          priority: 'high',
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
            practice:
              '为 CPU 与 I/O 两类任务各配置线程池，压测饱和后的延迟、队列和拒绝。',
            seniorFollowUp:
              '多个业务共用执行器造成互相拖累时，怎样设计舱壁、预算和动态保护？',
          },
          articles: [
            {title: '线程池的核心参数与执行路径'},
            {title: '队列、拒绝策略与过载'},
            {title: '线程池大小的估算与验证'},
            {title: 'Future、CompletableFuture 与异常传播'},
            {title: '虚拟线程的适用条件与边界'},
          ],
        },
        {
          id: 'concurrency-diagnostics',
          title: '并发故障与性能诊断',
          module: 'JUC',
          level: 'middle',
          priority: 'important',
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
            practice:
              '构造死锁、线程池饥饿和 ThreadLocal 泄漏，形成一份带证据的故障报告。',
            seniorFollowUp:
              '偶发并发故障无法稳定复现时，如何设计低开销的事件记录与故障注入？',
          },
          articles: [
            {title: '死锁、活锁与饥饿'},
            {title: '线程转储与等待关系'},
            {title: '线程池饱和与任务堆积'},
            {title: 'ThreadLocal 泄漏与上下文污染'},
            {title: '锁竞争、切换成本与并发压测'},
          ],
        },
      ],
    },
    {
      id: 'spring-data-access',
      order: '05',
      title: 'Spring 与数据访问',
      range: '初级 → 中级',
      description: '从一次请求进入容器，再沿代理、事务和持久化返回。框架原理应该落在这条链路上。',
      topics: [
        {
          id: 'spring-ioc',
          title: 'Spring IoC 与 Bean 生命周期',
          module: 'Spring',
          level: 'junior',
          priority: 'high',
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
            practice:
              '实现一个最小 IoC 容器，支持定义注册、构造器注入和生命周期回调。',
            seniorFollowUp:
              '大型应用启动缓慢时，怎样区分扫描、Bean 创建、外部连接和初始化任务的成本？',
          },
          articles: [
            {title: 'IoC 容器解决的问题'},
            {title: 'BeanDefinition 与容器启动'},
            {title: '依赖注入方式的选择'},
            {title: 'Bean 的创建与生命周期'},
            {title: '循环依赖、作用域与提前暴露'},
          ],
        },
        {
          id: 'spring-aop',
          title: 'AOP、代理与声明式事务',
          module: 'Spring',
          level: 'middle',
          priority: 'high',
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
            practice:
              '构造自调用、异常捕获和多数据源场景，用日志证明事务边界。',
            seniorFollowUp:
              '事务边界跨越远程调用或消息发布时，为什么继续扩大本地事务通常不是答案？',
          },
          articles: [
            {title: 'AOP、切点与拦截链'},
            {title: 'JDK 动态代理与 CGLIB'},
            {title: '声明式事务的执行路径'},
            {title: '事务传播、隔离与回滚规则'},
            {title: '事务、缓存与异步注解的失效场景'},
          ],
        },
        {
          id: 'spring-request',
          title: 'Spring MVC 与 Web 请求链',
          module: 'Spring',
          level: 'middle',
          priority: 'high',
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
            practice:
              '实现请求 ID、认证、参数校验和统一异常处理，并验证执行顺序。',
            seniorFollowUp:
              '同步 Servlet、异步 Servlet、WebFlux 和虚拟线程应按哪些工作负载变量选择？',
          },
          articles: [
            {title: '一次 HTTP 请求如何到达 Controller'},
            {title: 'DispatcherServlet 与处理器映射'},
            {title: '过滤器、拦截器与切面的边界'},
            {title: '参数绑定、校验与内容协商'},
            {title: '统一异常处理与 API 错误契约'},
          ],
        },
        {
          id: 'spring-boot',
          title: 'Spring Boot 自动配置与启动',
          module: 'Spring Boot',
          level: 'middle',
          priority: 'high',
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
            practice:
              '编写一个带配置属性和条件 Bean 的 starter，并验证覆盖规则。',
            seniorFollowUp:
              '数百个模块共用 starter 时，如何治理版本兼容、默认值变化和灰度升级？',
          },
          articles: [
            {title: 'Spring Boot 启动流程'},
            {title: '自动配置与条件评估'},
            {title: '配置文件、环境变量与属性优先级'},
            {title: '自定义 Starter 的边界'},
            {title: 'Actuator、健康检查与启动诊断'},
          ],
        },
        {
          id: 'data-access',
          title: 'MyBatis、JPA 与连接池',
          module: 'Data Access',
          level: 'middle',
          priority: 'high',
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
            practice:
              '实现同一组分页、批量写入和关联查询，记录 SQL 数量与连接占用。',
            seniorFollowUp:
              '数据库成为瓶颈时，怎样判断问题属于 SQL、连接、事务边界还是数据模型？',
          },
          articles: [
            {title: 'MyBatis 映射、执行器与插件'},
            {title: 'JPA 实体状态、脏检查与懒加载'},
            {title: 'N+1 查询与抓取策略'},
            {title: '连接池容量、超时与泄漏'},
            {title: '批处理、分页与数据访问测试'},
          ],
        },
      ],
    },
    {
      id: 'service-data',
      order: '06',
      title: '网络、数据与服务端生态',
      range: '中级',
      description: '服务端组件不是购物清单。每增加一个组件，都要说明它解决的问题和新增的故障模式。',
      topics: [
        {
          id: 'network',
          title: 'TCP、HTTP、RPC 与 Netty',
          module: 'Network',
          level: 'middle',
          priority: 'high',
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
            practice:
              '实现一个带长度字段的 Netty 协议，加入超时、背压和连接指标。',
            seniorFollowUp:
              '跨机房调用中，如何共同设计连接池、超时预算、重试和限流，避免故障放大？',
          },
          articles: [
            {title: '网络模型', href: '/docs/basic-knowledge/network/network-models'},
            {title: 'TCP 与 UDP', href: '/docs/basic-knowledge/network/tcp_udp'},
            {title: 'TCP 建立与释放连接', href: '/docs/basic-knowledge/network/tcp_handshake'},
            {title: 'HTTP 版本、连接复用与超时'},
            {title: 'RPC、序列化与 Netty 事件循环'},
          ],
        },
        {
          id: 'database-index',
          title: 'MySQL 索引与查询优化',
          module: 'Database',
          level: 'middle',
          priority: 'high',
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
            practice:
              '为一组真实查询设计索引，对比执行计划、扫描行数、写入成本和数据分布变化。',
            seniorFollowUp:
              '索引继续增加但收益下降时，如何比较查询改写、反范式、缓存和数据拆分？',
          },
          articles: [
            {title: '索引总览', href: '/docs/basic-knowledge/database/indices/'},
            {title: 'B+ 树', href: '/docs/basic-knowledge/database/indices/b_plus_tree/'},
            {title: '聚簇索引', href: '/docs/basic-knowledge/database/indices/clustered_index/'},
            {title: '联合索引、覆盖索引与回表'},
            {
              title: '索引复习与 EXPLAIN',
              href: '/docs/basic-knowledge/database/indices/index-review',
            },
          ],
        },
        {
          id: 'database-transaction',
          title: '事务、锁与 MVCC',
          module: 'Database',
          level: 'middle',
          priority: 'high',
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
            practice:
              '用两个会话复现脏读、不可重复读、锁等待和死锁，记录每一步可见结果。',
            seniorFollowUp:
              '热点行和长事务持续制造冲突时，如何从业务不变量重划事务边界？',
          },
          articles: [
            {
              title: '事务与隔离级别',
              href: '/docs/basic-knowledge/database/transaction/',
            },
            {title: 'InnoDB 锁模型与加锁范围'},
            {title: 'MVCC、Read View 与一致性读'},
            {title: '死锁检测、超时与重试'},
            {title: '长事务、热点更新与边界调整'},
          ],
        },
        {
          id: 'cache-mq',
          title: 'Redis 与缓存一致性',
          module: 'Middleware',
          level: 'middle',
          priority: 'high',
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
            practice:
              '实现 cache-aside，加入并发更新、失败注入和命中率监控，观察不一致窗口。',
            seniorFollowUp:
              '强一致要求提高后，应继续修补缓存协议，还是改变读取路径和数据所有权？',
          },
          articles: [
            {title: 'Redis 基础', href: '/docs/basic-knowledge/nosql/redis/'},
            {title: '缓存模式、更新顺序与一致性'},
            {title: '穿透、击穿、雪崩与热点治理'},
            {title: 'Redis 持久化、复制与 Cluster'},
            {title: '分布式锁的成立条件与边界'},
          ],
        },
        {
          id: 'messaging-search',
          title: '消息、搜索与后台任务',
          module: 'Middleware',
          level: 'middle',
          priority: 'important',
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
            practice:
              '实现带 Outbox、幂等消费和死信处理的索引更新链路，再注入重复与乱序。',
            seniorFollowUp:
              '积压持续增长时，怎样区分容量不足、分区倾斜、下游变慢和毒消息？',
          },
          articles: [
            {title: 'Kafka、RabbitMQ 与队列语义'},
            {title: '消息确认、重试与死信'},
            {title: '幂等消费、顺序与重复处理'},
            {title: '倒排索引与 Elasticsearch 写入可见性'},
            {title: '定时任务、分片与故障恢复'},
          ],
        },
      ],
    },
    {
      id: 'microservices-production',
      order: '07',
      title: '微服务与生产治理',
      range: '中级 → 高级',
      description: '微服务把进程内问题变成网络和组织问题。拆分容易，稳定地运行才是主要成本。',
      topics: [
        {
          id: 'service-governance',
          title: '注册、配置、网关与流量治理',
          module: 'Microservices',
          level: 'middle',
          priority: 'high',
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
            practice:
              '为两个服务实现发现、灰度路由和配置变更，注入注册中心断连与错误配置。',
            seniorFollowUp:
              '治理控制面故障时，数据面怎样降级，哪些策略必须本地保留？',
          },
          articles: [
            {title: '服务注册、发现与健康检查'},
            {title: '配置中心、版本与动态刷新'},
            {title: 'API 网关与请求路由'},
            {title: '灰度发布、流量染色与回滚'},
            {title: '控制面与数据面的故障边界'},
          ],
        },
        {
          id: 'resilience',
          title: '超时、重试、限流与熔断',
          module: 'Reliability',
          level: 'middle',
          priority: 'high',
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
            practice:
              '构造一个逐步变慢的下游，比较无保护与加入预算后的吞吐、错误率和队列。',
            seniorFollowUp:
              '多层代理和服务都在重试时，如何建立统一预算并阻止乘法放大？',
          },
          articles: [
            {title: '超时预算与取消传播'},
            {title: '重试、退避、抖动与重试风暴'},
            {title: '限流算法与容量保护'},
            {title: '熔断、降级与舱壁隔离'},
            {title: '幂等键与安全重试'},
          ],
        },
        {
          id: 'distributed-transaction',
          title: '分布式事务与数据一致性',
          module: 'Distributed Data',
          level: 'senior',
          priority: 'important',
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
            practice:
              '实现订单、库存、支付的 Saga 或 Outbox 流程，注入每个步骤的超时与重复。',
            seniorFollowUp:
              '补偿本身失败或业务不可逆时，怎样定义终态、风险敞口和人工处置？',
          },
          articles: [
            {title: '从业务不变量到一致性方案'},
            {title: '2PC、TCC 与协调成本'},
            {title: 'Saga、补偿与中间状态'},
            {title: 'Outbox、CDC 与可靠事件'},
            {title: '幂等、对账与人工修复'},
          ],
        },
        {
          id: 'security',
          title: '认证、授权与应用安全',
          module: 'Security',
          level: 'middle',
          priority: 'important',
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
            practice:
              '为多租户 API 实现认证、资源级授权、审计和密钥轮换测试。',
            seniorFollowUp:
              '权限模型随业务扩张后，怎样治理策略复杂度、审计证据和跨服务一致性？',
          },
          articles: [
            {title: '认证、授权与信任边界'},
            {title: 'Session、JWT、OAuth 2.0 与 OIDC'},
            {title: 'Spring Security 过滤器链'},
            {title: '注入、越权、SSRF 与反序列化风险'},
            {title: '密钥、证书、审计与供应链安全'},
          ],
        },
        {
          id: 'delivery',
          title: '可观测性、交付与联合排障',
          module: 'Production',
          level: 'middle',
          priority: 'high',
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
            practice:
              '为服务建立构建流水线和三类遥测，再注入慢 SQL、线程池饱和和 GC 压力。',
            seniorFollowUp:
              '遥测成本开始影响业务预算时，怎样按风险设计采样、保留和高基数限制？',
          },
          articles: [
            {title: 'Git 的工作区与分支模型', href: '/docs/tools-and-frameworks/git/'},
            {title: 'Maven 生命周期与依赖收敛'},
            {title: 'Docker、CI/CD 与可重复交付'},
            {title: '日志、指标、Trace 与关联 ID'},
            {title: 'JVM、线程、SQL 与网络联合排障'},
          ],
        },
      ],
    },
    {
      id: 'architecture-leadership',
      order: '08',
      title: '架构、演进与技术领导力',
      range: '高级',
      description: '高级面试不再奖励组件数量。真正需要说明的是约束、取舍、迁移路径和失败后的恢复。',
      topics: [
        {
          id: 'system-design',
          title: '系统设计方法与容量',
          module: 'System Design',
          level: 'senior',
          priority: 'high',
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
            practice:
              '在 45 分钟内完成一个系统设计，明确假设、数量级、单点故障和演进步骤。',
            seniorFollowUp:
              '需求和流量预测都不稳定时，怎样控制前期投入，又保留可演进的关键边界？',
          },
          articles: [
            {
              title: '系统设计面试流程',
              href: '/docs/system-design/system-design/interview-process',
            },
            {
              title: '系统设计通用架构',
              href: '/docs/system-design/system-design/universe_architecture',
            },
            {title: '容量估算、SLO 与故障模型'},
            {title: '读写路径、热点与数据拆分'},
            {
              title: '系统设计题目',
              href: '/docs/system-design/system-design/system-design-problems/',
            },
          ],
        },
        {
          id: 'distributed-system',
          title: '复制、一致性与共识',
          module: 'Distributed Systems',
          level: 'senior',
          priority: 'important',
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
            practice:
              '为一个三副本 KV 服务画出故障时间线，分析主节点失联、延迟和脑裂。',
            seniorFollowUp:
              '跨地域部署中，如何按数据类型选择同步复制、异步复制和冲突合并？',
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
            {title: '一致性模型、Quorum 与线性一致'},
            {title: 'Raft 选举与日志复制'},
            {title: '跨地域复制、延迟与冲突'},
          ],
        },
        {
          id: 'domain-architecture',
          title: 'DDD、模块化单体与微服务',
          module: 'Architecture',
          level: 'senior',
          priority: 'important',
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
            practice:
              '为订单域建立上下文图，从模块化单体开始设计可回退的拆分步骤。',
            seniorFollowUp:
              '组织边界与领域边界长期错位时，架构调整应先改代码、接口还是团队责任？',
          },
          articles: [
            {title: '领域、限界上下文与统一语言'},
            {title: '聚合、不变量与事务边界'},
            {title: '模块化单体的依赖约束'},
            {title: '微服务拆分的收益与账单'},
            {title: '绞杀者迁移、兼容与回退'},
          ],
        },
        {
          id: 'availability-cost',
          title: '高可用、容灾、多租户与成本',
          module: 'Architecture',
          level: 'senior',
          priority: 'important',
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
            practice:
              '为一个多租户服务制定 SLO、容量、备份恢复和年度演练方案，并估算成本。',
            seniorFollowUp:
              '可靠性目标提高一个数量级时，如何判断用户收益是否值得新增成本和组织负担？',
          },
          articles: [
            {title: 'SLI、SLO、错误预算与容量余量'},
            {title: '高可用、备份、RTO 与 RPO'},
            {title: '故障转移、演练与恢复验证'},
            {title: '多租户隔离、配额与数据边界'},
            {title: '性能、可靠性与成本归因'},
          ],
        },
        {
          id: 'technical-leadership',
          title: '架构演进与技术领导力',
          module: 'Leadership',
          level: 'senior',
          priority: 'important',
          objective: '用证据推动跨团队技术决策，并为迁移、失败和长期维护保留责任边界。',
          details: {
            mechanism:
              '架构演进依赖可分阶段交付的迁移路径，技术决策则需要明确约束、备选方案和验证方式。影响力来自降低共同风险，不来自把个人偏好写进规范。',
            outcomes: [
              '能编写 ADR、迁移计划、风险清单和回滚标准。',
              '能复盘故障与失败方案，并把改进项连接到责任和验证。',
            ],
            interviewQuestions: [
              '如何推动一个没有汇报关系的团队接受接口迁移？',
              '短期交付与长期技术债冲突时，怎样形成可执行决策？',
            ],
            practice:
              '选择一个旧系统改造案例，写出约束、备选方案、阶段计划、指标和退出条件。',
            seniorFollowUp:
              '方向被证明错误后，如何停止投入、保护团队信任，并把结论沉淀为下一次决策的输入？',
          },
          articles: [
            {title: '从约束到架构决策记录'},
            {title: '兼容、迁移、灰度与退出条件'},
            {title: '技术债、优先级与业务价值'},
            {title: '跨团队设计评审与分歧处理'},
            {title: '事故复盘、失败方案与组织学习'},
          ],
        },
      ],
    },
  ],
};
