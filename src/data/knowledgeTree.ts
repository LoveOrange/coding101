/**
 * Published part of the knowledge tree: domain → topic → article.
 *
 * Domains and topics follow plans/knowledge-tree/knowledge-tree.md, which also
 * lists the articles still to be written. Only existing docs are listed here;
 * plugins/learning-content builds the /topics page from this file and fails
 * the build when an id does not match a doc. Topics and domains without any
 * published article are left out of the page.
 */

export type KnowledgeTopic = {
  id: string;
  label: string;
  /** Doc ids in reading order. */
  articles: string[];
};

export type KnowledgeDomain = {
  id: string;
  label: string;
  /** Doc id of the domain's overview page, if any. */
  overview?: string;
  topics: KnowledgeTopic[];
};

const BK = 'basic-knowledge';
const SD = 'system-design';
const JAVA = `${BK}/java`;
const AI = 'ai';
const OPS = 'devops';

export const knowledgeTree: KnowledgeDomain[] = [
  {
    id: 'algorithms',
    label: '数据结构与算法',
    overview: `${BK}/common/index`,
    topics: [
      {
        id: 'algorithms/foundations',
        label: '复杂度与正确性',
        articles: [
          `${JAVA}/algorithms/complexity-constraints-java-cost`,
          `${JAVA}/algorithms/live-coding-counterexamples-tests`,
          `${BK}/algorithms/recursion`,
        ],
      },
      {
        id: 'algorithms/linear',
        label: '线性结构与哈希',
        articles: [
          `${BK}/data-structures/array`,
          `${BK}/data-structures/linked-list`,
          `${BK}/data-structures/stack`,
          `${BK}/data-structures/queue`,
          `${BK}/data-structures/concurrent-queues`,
          `${BK}/data-structures/hash-table`,
          `${BK}/data-structures/bloom-filter`,
        ],
      },
      {
        id: 'algorithms/trees-graphs',
        label: '树与图',
        articles: [
          `${BK}/data-structures/binary-tree`,
          `${BK}/data-structures/binary-search-tree`,
          `${BK}/data-structures/heap`,
          `${BK}/data-structures/graph`,
        ],
      },
      {
        id: 'algorithms/patterns',
        label: '算法模式',
        articles: [
          `${BK}/algorithms/binary-search`,
          `${BK}/algorithms/two-pointers`,
          `${JAVA}/algorithms/arrays-strings-sliding-window`,
          `${BK}/algorithms/prefix-sum`,
          `${BK}/algorithms/sorting`,
          `${BK}/algorithms/divide-and-conquer`,
          `${BK}/algorithms/integer-arithmetic`,
          `${BK}/algorithms/randomized-algorithms`,
          `${BK}/algorithms/streaming-statistics`,
          `${JAVA}/algorithms/trees-graphs-search`,
          `${BK}/algorithms/backtracking`,
          `${BK}/algorithms/greedy`,
          `${JAVA}/algorithms/dynamic-programming-state-design`,
        ],
      },
    ],
  },
  {
    id: 'os',
    label: '操作系统',
    overview: `${BK}/operating-system/index`,
    topics: [
      {
        id: 'os/processes',
        label: '进程与线程',
        articles: [`${BK}/operating-system/processes-threads`, `${BK}/operating-system/system-calls`, `${BK}/operating-system/thread-pools`],
      },
      {
        id: 'os/synchronization',
        label: '同步与死锁',
        articles: [`${BK}/operating-system/synchronization`, `${BK}/operating-system/deadlock`],
      },
      {
        id: 'os/memory',
        label: '内存管理',
        articles: [`${BK}/operating-system/virtual-memory`],
      },
      {
        id: 'os/io',
        label: '文件与 I/O',
        articles: [
          `${BK}/operating-system/file-descriptors`,
          `${BK}/operating-system/io-models`,
          `${BK}/operating-system/io-multiplexing`,
          `${JAVA}/io/file-mapping-zero-copy-direct-memory`,
          `${BK}/operating-system/disk-scheduling`,
        ],
      },
    ],
  },
  {
    id: 'network',
    label: '计算机网络',
    overview: `${BK}/network/index`,
    topics: [
      {
        id: 'network/models',
        label: '网络模型与地址',
        articles: [`${BK}/network/network-models`, `${BK}/network/ip`, `${BK}/network/arp`, `${BK}/network/dhcp`],
      },
      {
        id: 'network/tcp',
        label: 'TCP 与 UDP',
        articles: [`${BK}/network/tcp_udp`, `${BK}/network/tcp_handshake`],
      },
      {
        id: 'network/http',
        label: 'HTTP',
        articles: [
          `${BK}/network/http-versions-connection-reuse-timeouts`,
          `${BK}/network/http-cache`,
          `${BK}/network/file-upload`,
        ],
      },
      {
        id: 'network/tls-dns',
        label: 'HTTPS 与 DNS',
        articles: [`${BK}/network/tls`, `${BK}/network/dns`],
      },
      {
        id: 'network/rpc',
        label: 'RPC',
        articles: [`${BK}/network/rpc-serialization-netty-event-loop`, `${BK}/network/grpc`],
      },
      {
        id: 'network/email',
        label: '邮件协议',
        articles: [`${BK}/network/email-protocols`],
      },
      {
        id: 'network/realtime',
        label: '实时通信',
        articles: [
          'basic-knowledge/network/websocket',
          'basic-knowledge/network/server-sent-events',
        ],
      },
      {
        id: 'network/distribution',
        label: '内容分发',
        articles: [
          'basic-knowledge/network/cdn',
        ],
      },
      {
        id: 'network/api',
        label: 'API 协议',
        articles: [
          'basic-knowledge/network/graphql',
        ],
      },
    ],
  },
  {
    id: 'database',
    label: '数据库',
    overview: `${BK}/database/index`,
    topics: [
      {
        id: 'database/sql',
        label: 'SQL',
        articles: [`${BK}/database/sql/query`, `${BK}/database/sql/joins`, `${BK}/database/sql/aggregation`],
      },
      {
        id: 'database/modeling',
        label: '数据建模',
        articles: [
          `${BK}/database/modeling/index`,
          `${BK}/database/modeling/constraints`,
          `${BK}/database/modeling/data-types`,
        ],
      },
      {
        id: 'database/indexes',
        label: '索引',
        articles: [
          `${BK}/database/indices/index`,
          `${BK}/database/indices/b_plus_tree/index`,
          `${BK}/database/indices/clustered_index/index`,
          `${BK}/database/indices/composite-covering-back-table`,
          `${BK}/database/indices/index-review`,
          `${BK}/database/indices/execution-plan`,
        ],
      },
      {
        id: 'database/transactions',
        label: '事务与锁',
        articles: [
          `${BK}/database/transaction/index`,
          `${BK}/database/transaction/mvcc-read-view-consistent-read`,
          `${BK}/database/transaction/innodb-locking-ranges`,
          `${BK}/database/transaction/deadlock-detection-timeout-retry`,
          `${BK}/database/transaction/long-transactions-hot-updates-boundaries`,
        ],
      },
      {
        id: 'database/storage',
        label: '存储引擎与日志',
        articles: [
          `${BK}/database/storage/innodb`,
          `${BK}/database/storage/transaction-logs`,
          `${BK}/database/storage/lsm-tree`,
        ],
      },
      {
        id: 'database/replication',
        label: '复制与扩展',
        articles: [`${BK}/database/replication`, `${BK}/database/partitioning`],
      },
      {
        id: 'database/sqlite',
        label: 'SQLite',
        articles: [
          'basic-knowledge/database/sqlite',
        ],
      },
    ],
  },
  {
    id: 'cache',
    label: '缓存与 Redis',
    overview: `${BK}/nosql/index`,
    topics: [
      {
        id: 'cache/redis',
        label: 'Redis 基础',
        articles: [`${BK}/nosql/redis/index`, `${BK}/nosql/redis/data_structure`],
      },
      {
        id: 'cache/memory',
        label: '过期与内存',
        articles: [`${BK}/nosql/redis/expiration`, `${BK}/nosql/redis/eviction`],
      },
      {
        id: 'cache/availability',
        label: '持久化与高可用',
        articles: [`${BK}/nosql/redis/persistence`, `${BK}/nosql/redis/high-availability`],
      },
      {
        id: 'cache/design',
        label: '缓存设计',
        articles: [
          `${BK}/nosql/redis/cache-patterns-consistency`,
          `${BK}/nosql/redis/cache-penetration-stampede-avalanche-hotkeys`,
        ],
      },
      {
        id: 'cache/applications',
        label: 'Redis 应用',
        articles: [`${BK}/nosql/redis/distributed-lock-conditions-boundaries`],
      },
    ],
  },
  {
    id: 'middleware',
    label: '消息队列与中间件',
    overview: `${BK}/middleware/index`,
    topics: [
      {
        id: 'middleware/messaging',
        label: '消息队列基础',
        articles: [
          `${BK}/middleware/kafka-rabbitmq-queue-semantics`,
          `${BK}/middleware/message-ack-retry-dead-letter`,
          `${BK}/middleware/idempotent-consumption-order-duplicates`,
        ],
      },
      {
        id: 'middleware/search-coordination',
        label: '搜索与协调',
        articles: [
          `${BK}/middleware/elasticsearch-inverted-index-refresh-visibility`,
          `${BK}/middleware/etcd`,
          `${BK}/middleware/zookeeper`,
          `${BK}/middleware/scheduled-tasks-sharding-recovery`,
        ],
      },
    ],
  },
  {
    id: 'system-design',
    label: '系统设计',
    overview: `${SD}/index`,
    topics: [
      {
        id: 'system-design/method',
        label: '设计方法',
        articles: [
          `${SD}/system-design/interview-process`,
          `${SD}/system-design/system-design-problems/index`,
          `${SD}/system-design/capacity-slo-failure-model`,
          `${SD}/system-design/universe_architecture`,
        ],
      },
      {
        id: 'system-design/scaling',
        label: '扩展与分片',
        articles: [
          `${SD}/system-design/read-write-paths-hotspots-sharding`,
          `${BK}/data-structures/consistent-hashing`,
          'system-design/distributed-data/distributed-identifiers',
        ],
      },
      {
        id: 'system-design/distributed',
        label: '分布式理论',
        articles: [
          `${SD}/distributed-system/cap-theorem`,
          `${SD}/distributed-system/consistency-models-quorum-linearizability`,
          `${SD}/distributed-system/primary_backup_replication`,
          `${SD}/distributed-system/raft-election-log-replication`,
          `${SD}/distributed-system/cross-region-replication-latency-conflicts`,
          'system-design/distributed-system/paxos',
        ],
      },
      {
        id: 'system-design/transactions',
        label: '分布式事务',
        articles: [
          `${SD}/distributed-data/invariants-to-consistency-strategy`,
          `${SD}/distributed-data/2pc-tcc-coordination-cost`,
          `${SD}/distributed-data/saga-compensation-intermediate-state`,
          `${SD}/distributed-data/outbox-cdc-reliable-events`,
          `${SD}/distributed-data/idempotency-reconciliation-manual-repair`,
        ],
      },
      {
        id: 'system-design/reliability',
        label: '服务可靠性',
        articles: [
          `${SD}/reliability/timeout-budget-cancellation`,
          `${SD}/reliability/retry-backoff-jitter-storms`,
          `${SD}/reliability/idempotency-keys-safe-retries`,
          `${SD}/reliability/rate-limiting-capacity-protection`,
          `${SD}/reliability/circuit-breaker-degradation-bulkhead`,
        ],
      },
      {
        id: 'system-design/availability',
        label: '可用性与容灾',
        articles: [
          `${SD}/availability/sli-slo-error-budget-capacity-headroom`,
          `${SD}/availability/high-availability-backup-rto-rpo`,
          `${SD}/availability/failover-drills-recovery-validation`,
          `${SD}/availability/multi-tenant-isolation-quotas-data-boundaries`,
          `${SD}/availability/performance-reliability-cost-attribution`,
        ],
      },
      {
        id: 'system-design/microservices',
        label: '微服务治理',
        articles: [
          `${SD}/architecture/microservice-splitting-benefits-costs`,
          `${SD}/microservices/service-discovery-health-checks`,
          `${SD}/microservices/api-gateway-routing`,
          `${SD}/microservices/config-center-version-refresh`,
          `${SD}/microservices/canary-traffic-tagging-rollback`,
          `${SD}/microservices/control-plane-data-plane-failures`,
          'system-design/microservices/service-mesh',
        ],
      },
      {
        id: 'system-design/evolution',
        label: '架构演进',
        articles: [
          `${SD}/architecture/modular-monolith-dependency-constraints`,
          `${SD}/architecture/domain-bounded-context-ubiquitous-language`,
          `${SD}/architecture/aggregate-invariants-transaction-boundaries`,
          `${SD}/architecture/strangler-migration-compatibility-rollback`,
          `${SD}/leadership/compatibility-migration-canary-exit-criteria`,
          `${SD}/leadership/constraints-architecture-decision-records`,
          `${SD}/leadership/cross-team-design-review-disagreement`,
          `${SD}/leadership/incident-review-failed-designs-organizational-learning`,
          `${SD}/leadership/technical-debt-priority-business-value`,
        ],
      },
      {
        id: 'system-design/problems',
        label: '设计题',
        articles: [
          `${SD}/system-design/system-design-problems/pastebin/pastebin`,
          `${SD}/system-design/system-design-problems/web_crawler/index`,
          'system-design/cases/short-links',
          'system-design/cases/distributed-cache',
          'system-design/cases/feed',
          'system-design/cases/flash-sale',
        ],
      },
      {
        id: 'system-design/concurrency',
        label: '并发控制',
        articles: ['system-design/distributed-data/optimistic-concurrency-control'],
      },
    ],
  },
  {
    id: 'security',
    label: '安全',
    overview: `${SD}/security/index`,
    topics: [
      {
        id: 'security/auth',
        label: '认证与授权',
        articles: [
          `${SD}/security/authentication-authorization-trust-boundaries`,
          `${SD}/security/session-jwt-oauth-oidc`,
        ],
      },
      {
        id: 'security/web',
        label: 'Web 安全',
        articles: [`${SD}/security/injection-authorization-ssrf-deserialization`, 'system-design/security/cors', 'system-design/security/xss', 'system-design/security/csrf'],
      },
      {
        id: 'security/crypto',
        label: '密码学与密钥',
        articles: [`${SD}/security/secrets-certificates-audit-supply-chain`, 'system-design/security/cryptography'],
      },
    ],
  },
  {
    id: 'engineering',
    label: '软件工程',
    topics: [
      {
        id: 'engineering/git',
        label: 'Git',
        articles: ['tools-and-frameworks/git/index'],
      },
      {
        id: 'engineering/testing',
        label: '软件测试',
        articles: [`${JAVA}/quality/test-pyramid-contract-regression`, `${JAVA}/quality/test-doubles-mock-stub-boundaries`],
      },
      {
        id: 'engineering/design-patterns',
        label: '设计原则与设计模式',
        articles: [
          `${SD}/ood/solid`,
          `${BK}/design-patterns/singleton`,
          `${SD}/ood/questions/milktea-store`,
          'basic-knowledge/design-patterns/observer',
        ],
      },
      {
        id: 'engineering/cli',
        label: '命令行接口',
        articles: ['tools-and-frameworks/command-line-interface'],
      },
    ],
  },
  {
    id: 'java',
    label: 'Java',
    overview: `${JAVA}/index`,
    topics: [
      {
        id: 'java/language',
        label: '语言基础',
        articles: [
          `${JAVA}/language/types-references-value-passing`,
          `${JAVA}/language/encapsulation-inheritance-polymorphism`,
          `${JAVA}/language/equals-hashcode-object-identity`,
          `${JAVA}/language/string-immutability-pool`,
          `${JAVA}/language/wrappers-boxing-cache`,
          `${JAVA}/language/bigdecimal-money`,
          `${JAVA}/language/exceptions-error-boundaries`,
          `${JAVA}/language/optional-boundaries`,
          `${JAVA}/quality/immutable-objects-defensive-copying`,
          `${JAVA}/quality/api-design-from-invariants`,
        ],
      },
      {
        id: 'java/metaprogramming',
        label: '泛型、注解与反射',
        articles: [
          `${JAVA}/language/generics`,
          `${JAVA}/language/annotations-retention-processing`,
          `${JAVA}/language/reflection-method-handles`,
          `${JAVA}/language/runtime-scanning-compile-time-generation`,
        ],
      },
      {
        id: 'java/functional',
        label: '函数式与常用 API',
        articles: [
          `${JAVA}/functional/lambda-functional-interfaces-capture`,
          `${JAVA}/functional/stream-pipeline-lazy-evaluation`,
          `${JAVA}/functional/collectors-grouping-reduction`,
          `${JAVA}/functional/parallel-stream-model-pitfalls`,
          `${JAVA}/functional/java-time-time-zone-boundaries`,
        ],
      },
      {
        id: 'java/collections',
        label: '集合',
        articles: [
          `${JAVA}/collections/collection-interface-selection`,
          `${JAVA}/collections/arraylist-growth-memory-locality`,
          `${JAVA}/collections/linkedlist-semantics-cost`,
          `${JAVA}/collections/hashmap-structure-lookup-path`,
          `${JAVA}/collections/linkedhashmap-lru`,
          `${JAVA}/collections/treemap-treeset-ordered-query`,
          `${JAVA}/collections/iterator-fail-fast-immutable`,
          `${JAVA}/collections/concurrenthashmap-atomic-compound-operations`,
          `${JAVA}/collections/copy-on-write-cost-model`,
          `${JAVA}/collections/blockingqueue-producer-consumer`,
          `${JAVA}/collections/concurrentlinkedqueue-lock-free-path`,
          `${JAVA}/collections/concurrent-collection-iteration-consistency`,
        ],
      },
      {
        id: 'java/io',
        label: 'I/O',
        articles: [
          `${JAVA}/io/byte-character-buffered-streams`,
          `${JAVA}/io/buffer-channel-selector`,
          `${JAVA}/io/java-serialization-compatibility-security`,
        ],
      },
      {
        id: 'java/concurrency',
        label: '并发基础与锁',
        articles: [
          `${JAVA}/concurrency/thread-lifecycle-interruption`,
          `${JAVA}/concurrency/thread-safety-race-conditions`,
          `${JAVA}/concurrency/jmm-happens-before`,
          `${JAVA}/concurrency/volatile-barriers-visibility`,
          `${JAVA}/concurrency/synchronized-monitor-optimizations`,
          `${JAVA}/concurrency/reentrantlock-fairness-condition`,
          `${JAVA}/concurrency/cas-aba-versioning`,
          `${JAVA}/concurrency/aqs-state-wait-queue`,
          `${JAVA}/concurrency/atomic-longadder-contention`,
          `${JAVA}/concurrency/readwritelock-stampedlock`,
          `${JAVA}/concurrency/safe-publication-escape-final`,
          `${JAVA}/concurrency/liveness-deadlock-livelock-starvation`,
          `${JAVA}/concurrency/lock-contention-context-switch-benchmark`,
          `${JAVA}/concurrency/locks-vs-lock-free-cost`,
        ],
      },
      {
        id: 'java/executors',
        label: '线程池与异步',
        articles: [
          `${JAVA}/concurrency/threadpoolexecutor-execution-path`,
          `${JAVA}/concurrency/threadlocal-leaks-context`,
          `${JAVA}/concurrency/future-completablefuture-errors`,
          `${JAVA}/concurrency/latch-barrier-semaphore`,
          `${JAVA}/concurrency/interruption-timeout-cancellation`,
          `${JAVA}/concurrency/virtual-threads-boundaries`,
          `${JAVA}/concurrency/shared-state-message-passing`,
        ],
      },
      {
        id: 'java/jvm-memory',
        label: 'JVM 内存与类加载',
        articles: [
          `${JAVA}/jvm/runtime-data-areas`,
          `${JAVA}/jvm/source-to-bytecode`,
          `${JAVA}/jvm/object-creation-layout`,
          `${JAVA}/jvm/compressed-pointers-alignment`,
          `${JAVA}/jvm/direct-native-memory`,
          `${JAVA}/jvm/class-loading-stages`,
          `${JAVA}/jvm/classloaders-spi-isolation`,
          `${JAVA}/jvm/parent-delegation`,
          `${JAVA}/jvm/class-initialization-conflicts`,
        ],
      },
      {
        id: 'java/gc',
        label: '垃圾回收',
        articles: [
          `${JAVA}/jvm/gc-roots-reachability`,
          `${JAVA}/jvm/generational-barriers-safepoints`,
          `${JAVA}/jvm/serial-parallel-cms`,
          `${JAVA}/jvm/g1-regions-rset-collection-set`,
          `${JAVA}/jvm/zgc-shenandoah-low-latency`,
        ],
      },
      {
        id: 'java/jit',
        label: 'JIT 与性能',
        articles: [
          `${JAVA}/jvm/interpreter-tiered-compilation`,
          `${JAVA}/jvm/inlining-deoptimization`,
          `${JAVA}/jvm/escape-analysis-scalar-replacement`,
          `${JAVA}/jvm/jmh-correct-benchmarks`,
          `${JAVA}/jvm/aot-cds-native-image`,
        ],
      },
      {
        id: 'java/diagnostics',
        label: 'JVM 诊断',
        articles: [
          `${JAVA}/jvm/oom-stack-overflow`,
          `${JAVA}/jvm/diagnostic-tools-evidence`,
          `${JAVA}/jvm/cpu-high-diagnosis`,
          `${JAVA}/jvm/thread-dumps-deadlocks-contention`,
          `${JAVA}/jvm/heap-dumps-memory-leaks`,
          `${JAVA}/jvm/gc-logs-jfr-pauses`,
        ],
      },
      {
        id: 'java/spring-core',
        label: 'Spring 核心',
        articles: [
          `${JAVA}/spring/ioc-container-purpose`,
          `${JAVA}/spring/dependency-injection-selection`,
          `${JAVA}/spring/beandefinition-container-startup`,
          `${JAVA}/spring/bean-creation-lifecycle`,
          `${JAVA}/spring/circular-dependencies-scopes-early-exposure`,
          `${JAVA}/spring/aop-pointcut-interceptor-chain`,
          `${JAVA}/spring/jdk-proxy-cglib`,
          `${JAVA}/spring/declarative-transaction-execution`,
        ],
      },
      {
        id: 'java/spring-mvc',
        label: 'Spring MVC',
        articles: [
          `${JAVA}/spring/http-request-to-controller`,
          `${JAVA}/spring/dispatcherservlet-handler-mapping`,
          `${JAVA}/spring/binding-validation-content-negotiation`,
          `${JAVA}/spring/filter-interceptor-aspect-boundaries`,
          `${JAVA}/spring/api-error-contract`,
        ],
      },
      {
        id: 'java/spring-boot',
        label: 'Spring Boot 与生态',
        articles: [
          `${JAVA}/spring/spring-boot-startup`,
          `${JAVA}/spring/auto-configuration-conditions`,
          `${JAVA}/spring/custom-starter-boundaries`,
          `${JAVA}/spring/external-config-precedence`,
          `${JAVA}/spring/actuator-health-startup-diagnostics`,
          `${SD}/security/spring-security-filter-chain`,
        ],
      },
      {
        id: 'java/data-access',
        label: '数据访问',
        articles: [
          `${JAVA}/data-access/connection-pool-capacity-timeout-leaks`,
          `${JAVA}/data-access/mybatis-mapping-executor-plugins`,
          `${JAVA}/data-access/jpa-entity-states-dirty-checking-lazy-loading`,
          `${JAVA}/data-access/n-plus-one-fetch-strategies`,
          `${JAVA}/data-access/batching-pagination-data-access-tests`,
        ],
      },
      {
        id: 'java/build',
        label: '测试与构建',
        articles: [
          `${JAVA}/quality/junit-assertions-parameterized-tests`,
          `${SD}/production/maven-lifecycle-dependency-convergence`,
        ],
      },
      {
        id: 'java/reactive',
        label: '响应式编程',
        articles: [
          'tools-and-frameworks/rxjava',
        ],
      },
    ],
  },
  {
    id: 'go',
    label: 'Go',
    overview: `${BK}/go/language/index`,
    topics: [
      {
        id: 'go/language',
        label: '语言基础',
        articles: [
          `${BK}/go/language/index`,
          `${BK}/go/language/types-value-passing`,
          `${BK}/go/language/functions`,
          `${BK}/go/language/structs-method-sets`,
          `${BK}/go/language/packages-initialization`,
          `${BK}/go/language/interfaces`,
          `${BK}/go/language/defer`,
          `${BK}/go/language/errors`,
          `${BK}/go/language/generics`,
          `${BK}/go/language/reflection`,
        ],
      },
      {
        id: 'go/collections',
        label: '集合与文本',
        articles: [
          `${BK}/go/collections/slices`,
          `${BK}/go/collections/maps`,
          `${BK}/go/language/strings-runes`,
        ],
      },
      {
        id: 'go/concurrency',
        label: '并发',
        articles: [
          `${BK}/go/concurrency/goroutines`,
          `${BK}/go/concurrency/channels`,
          `${BK}/go/concurrency/select`,
          `${BK}/go/concurrency/mutexes`,
          `${BK}/go/concurrency/synchronization`,
          `${BK}/go/concurrency/memory-model`,
          `${BK}/go/concurrency/atomics`,
          `${BK}/go/concurrency/sync-map`,
          `${BK}/go/concurrency/sync-pool`,
          `${BK}/go/concurrency/context`,
          `${BK}/go/concurrency/task-coordination`,
          `${BK}/go/concurrency/leaks-races`,
          `${BK}/go/concurrency/singleflight`,
        ],
      },
      {
        id: 'go/runtime',
        label: '运行时',
        articles: [
          `${BK}/go/runtime/index`,
          `${BK}/go/runtime/scheduler`,
          `${BK}/go/runtime/escape-analysis`,
          `${BK}/go/runtime/memory-allocation`,
          `${BK}/go/runtime/garbage-collection`,
          `${BK}/go/runtime/network-poller`,
        ],
      },
      {
        id: 'go/web',
        label: 'HTTP 与服务开发',
        articles: [
          `${BK}/go/web/http-server`,
          `${BK}/go/web/http-client`,
          `${BK}/go/web/gin`,
          `${BK}/go/web/grpc-go`,
          `${BK}/go/web/go-zero`,
        ],
      },
      {
        id: 'go/database',
        label: '数据库访问',
        articles: [
          `${BK}/go/database/database-sql`,
          `${BK}/go/database/gorm`,
          `${BK}/go/database/sqlx`,
          `${BK}/go/database/sqlc`,
        ],
      },
      {
        id: 'go/engineering',
        label: '工程',
        articles: [
          `${BK}/go/engineering/modules`,
          `${BK}/go/engineering/build`,
          `${BK}/go/engineering/testing`,
          `${BK}/go/engineering/profiling`,
        ],
      },
      {
        id: 'go/cloud-native',
        label: '云原生开发',
        articles: [`${BK}/go/cloud-native/client-go`],
      },
    ],
  },
  {
    id: 'python',
    label: 'Python',
    topics: [
      {
        id: 'python/language',
        label: '语言基础',
        articles: [
          'basic-knowledge/python/language/object-model',
          'basic-knowledge/python/language/functions-scope',
          'basic-knowledge/python/language/classes-instances',
          'basic-knowledge/python/language/exceptions',
          'basic-knowledge/python/language/context-managers',
          'basic-knowledge/python/language/iterators-generators',
          'basic-knowledge/python/language/closures-decorators',
        ],
      },
      {
        id: 'python/collections',
        label: '集合',
        articles: [
          'basic-knowledge/python/collections/list-dict-set',
        ],
      },
      {
        id: 'python/concurrency',
        label: '运行时与并发',
        articles: [
          'basic-knowledge/python/runtime/memory-management',
          'basic-knowledge/python/concurrency/threads-processes-gil',
          'basic-knowledge/python/concurrency/asyncio',
        ],
      },
      {
        id: 'python/engineering',
        label: '环境与文件',
        articles: [
          'basic-knowledge/python/engineering/packages-environments',
          'basic-knowledge/python/engineering/files-text-processing',
        ],
      },
      {
        id: 'python/testing',
        label: 'Python 测试',
        articles: [
          'basic-knowledge/python/quality/pytest',
        ],
      },
    ],
  },
  {
    id: 'javascript',
    label: 'JavaScript 与 TypeScript',
    topics: [
      {
        id: 'javascript/language',
        label: '语言基础',
        articles: [
          'basic-knowledge/javascript/types-conversion',
          'basic-knowledge/javascript/scope-closures',
          'basic-knowledge/javascript/this-binding',
          'basic-knowledge/javascript/prototypes',
          'basic-knowledge/javascript/copying',
          'basic-knowledge/javascript/collections',
          'basic-knowledge/javascript/proxy-reflect',
          'basic-knowledge/javascript/iterators-generators',
          'basic-knowledge/javascript/higher-order-functions',
          'basic-knowledge/javascript/object-properties',
          'basic-knowledge/javascript/regular-expressions',
        ],
      },
      {
        id: 'javascript/async-runtime',
        label: '异步与运行时',
        articles: [
          'basic-knowledge/javascript/browser-event-loop',
          'basic-knowledge/javascript/promise',
          'basic-knowledge/javascript/async-await',
          'basic-knowledge/javascript/memory-management',
          'basic-knowledge/javascript/v8-execution',
        ],
      },
      {
        id: 'javascript/modules',
        label: '模块化',
        articles: [
          'basic-knowledge/javascript/modules',
          'basic-knowledge/javascript/tree-shaking',
        ],
      },
      {
        id: 'javascript/typescript',
        label: 'TypeScript',
        articles: [
          'basic-knowledge/typescript/type-system',
          'basic-knowledge/typescript/generics-utility-types',
          'basic-knowledge/typescript/type-interface',
          'basic-knowledge/typescript/declaration-files',
        ],
      },
    ],
  },
  {
    id: 'browser',
    label: '浏览器与前端基础',
    topics: [
      {
        id: 'browser/html-css',
        label: 'HTML 与 CSS',
        articles: [
          'frontend/html/semantics-accessibility',
          'frontend/css/box-model-formatting-contexts',
          'frontend/css/layout',
          'frontend/css/cascade',
          'frontend/css/responsive-layout',
          'frontend/css/stacking-context',
          'frontend/css/animations',
          'frontend/css/style-organization',
          'frontend/html/forms',
        ],
      },
      {
        id: 'browser/principles',
        label: '浏览器原理',
        articles: [
          'frontend/browser/rendering',
          'frontend/browser/dom-events',
          'frontend/browser/process-model',
          'frontend/browser/storage',
          'frontend/browser/same-origin-policy',
          'frontend/browser/fetch',
          'frontend/browser/web-worker',
          'frontend/browser/service-worker',
          'frontend/browser/debugging',
          'frontend/browser/cross-context-messaging',
          'frontend/browser/jsbridge',
          'frontend/browser/media',
          'frontend/browser/webassembly',
        ],
      },
      {
        id: 'browser/performance',
        label: '前端性能',
        articles: [
          'frontend/performance/metrics',
          'frontend/performance/resource-loading',
          'frontend/performance/debounce-throttle',
          'frontend/performance/virtual-list',
          'frontend/performance/observability',
        ],
      },
      {
        id: 'browser/graphics',
        label: '浏览器图形',
        articles: [
          'frontend/graphics/canvas',
          'frontend/graphics/webgl',
          'frontend/graphics/data-visualization',
        ],
      },
    ],
  },
  {
    id: 'frontend',
    label: '前端框架与工程化',
    topics: [
      {
        id: 'frontend/react',
        label: 'React',
        articles: [
          'tools-and-frameworks/react/components',
          'tools-and-frameworks/react/hooks',
          'tools-and-frameworks/react/reconciliation',
          'tools-and-frameworks/react/concurrent-rendering',
          'tools-and-frameworks/react/performance',
          'tools-and-frameworks/react/state-management',
          'tools-and-frameworks/react/server-components',
        ],
      },
      {
        id: 'frontend/vue',
        label: 'Vue',
        articles: [
          'tools-and-frameworks/vue/reactivity',
          'tools-and-frameworks/vue/rendering',
          'tools-and-frameworks/vue/components',
          'tools-and-frameworks/vue/computed-watch',
          'tools-and-frameworks/vue/state-management',
        ],
      },
      {
        id: 'frontend/routing-rendering',
        label: '路由与渲染模式',
        articles: [
          'frontend/routing/client-routing',
          'frontend/rendering/rendering-modes',
          'tools-and-frameworks/vue/router',
          'tools-and-frameworks/nextjs/index',
          'tools-and-frameworks/nuxt/index',
          'frontend/architecture/micro-frontends',
          'frontend/rendering/template-engines',
        ],
      },
      {
        id: 'frontend/engineering',
        label: '前端工程化',
        articles: [
          'tools-and-frameworks/frontend-build/build-pipeline',
          'tools-and-frameworks/frontend-build/package-management',
          'tools-and-frameworks/frontend-build/transpilation',
          'tools-and-frameworks/frontend-build/code-checks',
          'tools-and-frameworks/frontend-testing/component-testing',
          'tools-and-frameworks/frontend-build/asset-release',
        ],
      },
      {
        id: 'frontend/interaction',
        label: '前端交互',
        articles: [
          'frontend/interaction/text-editors',
          'frontend/interaction/optimistic-updates',
          'frontend/interaction/file-upload',
        ],
      },
      {
        id: 'frontend/component-architecture',
        label: '组件与视图架构',
        articles: [
          'frontend/architecture/component-frameworks',
          'frontend/architecture/view-models',
        ],
      },
      {
        id: 'frontend/platforms',
        label: '跨平台前端',
        articles: [
          'frontend/platforms/mini-programs',
        ],
      },
    ],
  },
  {
    id: 'nodejs',
    label: 'Node.js',
    topics: [
      {
        id: 'nodejs/runtime',
        label: '运行时',
        articles: [
          'basic-knowledge/nodejs/event-loop',
          'basic-knowledge/nodejs/modules',
          'basic-knowledge/nodejs/buffer-stream',
          'basic-knowledge/nodejs/processes-workers',
          'basic-knowledge/nodejs/profiling',
        ],
      },
      {
        id: 'nodejs/services',
        label: '服务开发',
        articles: [
          'tools-and-frameworks/nodejs/middleware',
          'system-design/patterns/backend-for-frontend',
          'tools-and-frameworks/nodejs/nestjs',
          'basic-knowledge/nodejs/service-lifecycle',
          'tools-and-frameworks/nodejs/data-access',
        ],
      },
    ],
  },
  {
    id: 'ai',
    label: 'AI 应用与 Agent',
    overview: `${AI}/index`,
    topics: [
      {
        id: 'ai/models',
        label: '模型基础',
        articles: [`${AI}/models/convolutional-neural-networks`],
      },
      {
        id: 'ai/llm',
        label: '大模型基础',
        articles: [`${AI}/llm/llm-basics`, `${AI}/llm/transformer`, `${AI}/llm/hallucination`],
      },
      {
        id: 'ai/prompting',
        label: '模型调用与提示',
        articles: [`${AI}/prompting/prompt-engineering`, `${AI}/prompting/context-management`, `${AI}/prompting/context-compaction`],
      },
      {
        id: 'ai/rag',
        label: 'RAG',
        articles: [
          `${AI}/rag/rag`,
          `${AI}/rag/chunking`,
          `${AI}/rag/embedding-vector-search`,
          `${AI}/rag/hybrid-search-rerank`,
        ],
      },
      {
        id: 'ai/tools',
        label: '工具调用与协议',
        articles: [`${AI}/tools/function-calling`, `${AI}/tools/mcp`, `${AI}/tools/agent-skills`],
      },
      {
        id: 'ai/agents',
        label: 'Agent 架构',
        articles: [
          `${AI}/agents/workflow-vs-agent`,
          `${AI}/agents/agent-loop`,
          `${AI}/agents/harness`,
          `${AI}/agents/multi-agent`,
        ],
      },
      {
        id: 'ai/state',
        label: '状态与记忆',
        articles: [`${AI}/state/durable-execution`, `${AI}/state/memory`],
      },
      {
        id: 'ai/evaluation',
        label: '评估与观测',
        articles: [`${AI}/evaluation/model-evaluation`, `${AI}/evaluation/agent-evaluation`, `${AI}/evaluation/rag-evaluation`],
      },
      {
        id: 'ai/safety',
        label: '安全与服务化',
        articles: [`${AI}/safety/prompt-injection`, `${AI}/safety/tool-authorization-sandbox`, `${AI}/safety/latency-cost-scaling`],
      },
      {
        id: 'ai/development',
        label: '框架与 AI 辅助开发',
        articles: [
          `${AI}/development/ai-assisted-development`,
          `${AI}/development/ai-code-debugging`,
          `${AI}/development/repository-instructions`,
          `${AI}/development/coding-agent-evaluation`,
          `${AI}/development/agent-frameworks`,
        ],
      },
    ],
  },
  {
    id: 'bigdata',
    label: '大数据',
    topics: [
      {
        id: 'bigdata/batch',
        label: '批处理计算',
        articles: [`${SD}/mit6.824/MapReduce/lec1_mapreduce`, `${SD}/mit6.824/MapReduce/lab1_mapreduce`],
      },
    ],
  },
  {
    id: 'devops',
    label: '运维与云原生',
    overview: `${OPS}/index`,
    topics: [
      {
        id: 'devops/linux',
        label: 'Linux',
        articles: [
          `${OPS}/linux/performance-troubleshooting`,
          `${OPS}/linux/commands-permissions`,
          `${OPS}/linux/disk-filesystem`,
          `${OPS}/linux/processes-signals`,
          `${OPS}/linux/network-troubleshooting`,
        ],
      },
      {
        id: 'devops/containers',
        label: '容器',
        articles: [`${OPS}/containers/container-principles`, `${OPS}/containers/docker-images`],
      },
      {
        id: 'devops/kubernetes',
        label: 'Kubernetes',
        articles: [`${OPS}/kubernetes/architecture`, `${OPS}/kubernetes/pods`, `${OPS}/kubernetes/workloads-networking`],
      },
      {
        id: 'devops/delivery',
        label: 'CI/CD 与发布',
        articles: [`${SD}/production/docker-ci-cd-reproducible-delivery`],
      },
      {
        id: 'devops/observability',
        label: '可观测性',
        articles: [`${OPS}/observability/monitoring-alerting`, `${SD}/production/logs-metrics-traces-correlation`],
      },
      {
        id: 'devops/incidents',
        label: 'SRE 与故障响应',
        articles: [
          `${OPS}/incidents/sre-practice`,
          `${OPS}/incidents/incident-response`,
          `${SD}/production/jvm-thread-sql-network-joint-diagnosis`,
        ],
      },
      {
        id: 'devops/traffic',
        label: '流量与接入',
        articles: [`${OPS}/traffic/nginx-load-balancing`],
      },
      {
        id: 'devops/cloud',
        label: '云计算',
        articles: ['devops/cloud-computing'],
      },
    ],
  },
  {
    id: 'storage',
    label: '存储系统',
    topics: [
      {
        id: 'storage/objects',
        label: '对象存储',
        articles: [`${BK}/storage/object-storage`],
      },
      {
        id: 'storage/distributed',
        label: '分布式存储',
        articles: [`${BK}/storage/ceph`],
      },
    ],
  },
  {
    id: 'computer-architecture',
    label: '计算机组成',
    topics: [
      {
        id: 'computer-architecture/foundations',
        label: '指令与数据表示',
        articles: [
          'basic-knowledge/computer-architecture/data-representation',
          'basic-knowledge/computer-architecture/instruction-execution',
        ],
      },
      {
        id: 'computer-architecture/encoding',
        label: '数据编码',
        articles: [
          'basic-knowledge/encoding/base64',
        ],
      },
    ],
  },
  {
    id: 'cpp',
    label: 'C++',
    topics: [
      {
        id: 'cpp/types',
        label: '类型与对象',
        articles: [
          'basic-knowledge/cpp/type-system',
          'basic-knowledge/cpp/pointers-references',
          'basic-knowledge/cpp/object-lifetime',
          'basic-knowledge/cpp/copy-move',
        ],
      },
      {
        id: 'cpp/abstractions',
        label: '抽象与资源管理',
        articles: [
          'basic-knowledge/cpp/polymorphism',
          'basic-knowledge/cpp/smart-pointers',
          'basic-knowledge/cpp/containers',
        ],
      },
      {
        id: 'cpp/build',
        label: '编译与链接',
        articles: [
          'basic-knowledge/cpp/compilation-linking',
        ],
      },
    ],
  },
  {
    id: 'kotlin',
    label: 'Kotlin',
    topics: [
      {
        id: 'kotlin/language',
        label: '语言基础',
        articles: [
          'basic-knowledge/kotlin/type-system',
          'basic-knowledge/kotlin/null-safety',
          'basic-knowledge/kotlin/functions',
          'basic-knowledge/kotlin/classes-interfaces',
          'basic-knowledge/kotlin/generics',
        ],
      },
      {
        id: 'kotlin/concurrency',
        label: '协程与流',
        articles: [
          'basic-knowledge/kotlin/coroutines',
          'basic-knowledge/kotlin/flow',
        ],
      },
    ],
  },
  {
    id: 'swift',
    label: 'Swift',
    topics: [
      {
        id: 'swift/language',
        label: '语言基础',
        articles: [
          'basic-knowledge/swift/type-system',
          'basic-knowledge/swift/optional',
          'basic-knowledge/swift/closures',
          'basic-knowledge/swift/protocols-generics',
        ],
      },
      {
        id: 'swift/memory-concurrency',
        label: '内存与并发',
        articles: [
          'basic-knowledge/swift/arc',
          'basic-knowledge/swift/concurrency',
        ],
      },
    ],
  },
  {
    id: 'objective-c',
    label: 'Objective-C',
    topics: [
      {
        id: 'objective-c/language',
        label: '对象与 Block',
        articles: [
          'basic-knowledge/objective-c/object-model',
          'basic-knowledge/objective-c/block',
        ],
      },
      {
        id: 'objective-c/runtime',
        label: '运行时与内存',
        articles: [
          'basic-knowledge/objective-c/runtime',
          'basic-knowledge/objective-c/memory-management',
        ],
      },
    ],
  },
  {
    id: 'dart',
    label: 'Dart',
    topics: [
      {
        id: 'dart/language',
        label: '类型与并发',
        articles: [
          'basic-knowledge/dart/type-system',
          'basic-knowledge/dart/concurrency',
        ],
      },
    ],
  },
  {
    id: 'mobile',
    label: '移动端开发',
    topics: [
      {
        id: 'mobile/data',
        label: '客户端数据',
        articles: [
          'mobile/common/data-synchronization',
          'mobile/common/image-loading',
        ],
      },
      {
        id: 'mobile/performance',
        label: '移动端性能',
        articles: [
          'mobile/common/performance-metrics',
        ],
      },
      {
        id: 'mobile/graphics-media',
        label: '图形与媒体',
        articles: [
          'mobile/common/rendering-pipeline',
          'mobile/common/media-playback',
        ],
      },
      {
        id: 'mobile/android-lifecycle',
        label: 'Android 组件与生命周期',
        articles: [
          'mobile/android/app-components',
          'mobile/android/activity-lifecycle',
          'mobile/android/fragment-lifecycle',
          'mobile/android/task-back-stack',
        ],
      },
      {
        id: 'mobile/android-ui',
        label: 'Android 界面',
        articles: [
          'mobile/android/view-layout-drawing',
          'mobile/android/touch-events',
          'mobile/android/recyclerview',
          'mobile/android/jetpack-compose',
        ],
      },
      {
        id: 'mobile/android-runtime',
        label: 'Android 运行机制',
        articles: [
          'mobile/android/handler-looper',
          'mobile/android/binder',
          'mobile/android/art',
          'mobile/android/parcelable',
          'mobile/android/jni',
          'mobile/android/dynamic-loading',
        ],
      },
      {
        id: 'mobile/android-data',
        label: 'Android 数据与网络',
        articles: [
          'mobile/android/viewmodel',
          'mobile/android/preferences',
          'mobile/android/datastore',
          'mobile/android/room',
          'mobile/android/okhttp',
          'mobile/android/retrofit',
        ],
      },
      {
        id: 'mobile/android-platform',
        label: 'Android 平台能力',
        articles: [
          'mobile/android/webview',
          'mobile/android/sandbox-permissions',
          'mobile/android/background-work',
        ],
      },
      {
        id: 'mobile/android-engineering',
        label: 'Android 诊断与工程',
        articles: [
          'mobile/android/memory-leaks',
          'mobile/android/anr',
          'mobile/android/performance-diagnostics',
          'mobile/android/build',
          'mobile/android/testing',
        ],
      },
      {
        id: 'mobile/ios-ui',
        label: 'iOS 生命周期与界面',
        articles: [
          'mobile/ios/app-lifecycle',
          'mobile/ios/view-controller',
          'mobile/ios/uikit-layout',
          'mobile/ios/responder-chain',
          'mobile/ios/list-views',
          'mobile/ios/swiftui-state',
        ],
      },
      {
        id: 'mobile/ios-runtime',
        label: 'iOS 运行机制',
        articles: [
          'mobile/ios/run-loop',
          'mobile/ios/gcd',
        ],
      },
      {
        id: 'mobile/ios-data',
        label: 'iOS 数据与网络',
        articles: [
          'mobile/ios/url-session',
          'mobile/ios/persistence',
        ],
      },
      {
        id: 'mobile/ios-platform',
        label: 'iOS 平台能力',
        articles: [
          'mobile/ios/wkwebview',
          'mobile/ios/sandbox-permissions',
          'mobile/ios/background-tasks',
          'mobile/ios/deep-links',
        ],
      },
      {
        id: 'mobile/ios-engineering',
        label: 'iOS 诊断与工程',
        articles: [
          'mobile/ios/performance-diagnostics',
          'mobile/ios/crash-diagnostics',
          'mobile/ios/build',
          'mobile/ios/testing',
        ],
      },
      {
        id: 'mobile/flutter-ui',
        label: 'Flutter 组件与界面',
        articles: [
          'mobile/flutter/widget-element-render-object',
          'mobile/flutter/state-management',
          'mobile/flutter/layout-rendering',
          'mobile/flutter/gestures',
          'mobile/flutter/navigation',
        ],
      },
      {
        id: 'mobile/flutter-engineering',
        label: 'Flutter 平台与工程',
        articles: [
          'mobile/flutter/platform-channels',
          'mobile/flutter/testing',
          'mobile/flutter/performance-diagnostics',
        ],
      },
      {
        id: 'mobile/react-native-runtime',
        label: 'React Native 渲染与平台',
        articles: [
          'mobile/react-native/rendering',
          'mobile/react-native/native-modules',
          'mobile/react-native/platform-adaptation',
        ],
      },
      {
        id: 'mobile/react-native-engineering',
        label: 'React Native 测试与性能',
        articles: [
          'mobile/react-native/testing',
          'mobile/react-native/performance-diagnostics',
        ],
      },
    ],
  },
  {
    id: 'testing',
    label: '测试开发',
    topics: [
      {
        id: 'testing/design',
        label: '测试分析与设计',
        articles: [
          'tools-and-frameworks/testing/test-analysis',
          'tools-and-frameworks/testing/equivalence-partitioning',
          'tools-and-frameworks/testing/boundary-value-analysis',
          'tools-and-frameworks/testing/decision-tables',
          'tools-and-frameworks/testing/state-transition-testing',
          'tools-and-frameworks/testing/combinatorial-testing',
          'tools-and-frameworks/testing/exploratory-testing',
        ],
      },
      {
        id: 'testing/reporting',
        label: '缺陷与质量报告',
        articles: [
          'tools-and-frameworks/testing/defect-management',
          'tools-and-frameworks/testing/test-reporting',
        ],
      },
      {
        id: 'testing/api',
        label: '接口、数据与环境',
        articles: [
          'tools-and-frameworks/testing/api-testing',
          'tools-and-frameworks/testing/test-data-management',
          'tools-and-frameworks/testing/test-environments',
        ],
      },
      {
        id: 'testing/automation',
        label: '自动化与开发流程',
        articles: [
          'tools-and-frameworks/testing/ui-automation',
          'tools-and-frameworks/testing/compatibility-testing',
          'tools-and-frameworks/testing/test-driven-development',
        ],
      },
      {
        id: 'testing/reliability',
        label: '性能与可靠性',
        articles: [
          'tools-and-frameworks/testing/performance-testing',
          'tools-and-frameworks/testing/jmeter',
          'tools-and-frameworks/testing/fault-injection-testing',
        ],
      },
      {
        id: 'testing/tools',
        label: '测试平台与辅助工具',
        articles: [
          'tools-and-frameworks/testing/test-execution-platform',
          'tools-and-frameworks/testing/fuzz-testing',
          'tools-and-frameworks/testing/ai-assisted-testing',
        ],
      },
    ],
  },
];
