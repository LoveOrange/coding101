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
          `${BK}/data-structures/hash-table`,
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
        articles: [`${BK}/operating-system/processes-threads`],
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
        label: '网络模型与 IP',
        articles: [`${BK}/network/network-models`, `${BK}/network/ip`],
      },
      {
        id: 'network/tcp',
        label: 'TCP 与 UDP',
        articles: [`${BK}/network/tcp_udp`, `${BK}/network/tcp_handshake`],
      },
      {
        id: 'network/http',
        label: 'HTTP',
        articles: [`${BK}/network/http-versions-connection-reuse-timeouts`, `${BK}/network/http-cache`],
      },
      {
        id: 'network/tls-dns',
        label: 'HTTPS 与 DNS',
        articles: [`${BK}/network/tls`, `${BK}/network/dns`],
      },
      {
        id: 'network/rpc',
        label: 'RPC',
        articles: [`${BK}/network/rpc-serialization-netty-event-loop`],
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
        articles: [`${BK}/database/modeling/constraints`],
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
        articles: [`${BK}/nosql/redis/persistence`],
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
        articles: [`${SD}/system-design/read-write-paths-hotspots-sharding`],
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
        ],
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
        articles: [`${SD}/security/injection-authorization-ssrf-deserialization`],
      },
      {
        id: 'security/crypto',
        label: '密码学与密钥',
        articles: [`${SD}/security/secrets-certificates-audit-supply-chain`],
      },
    ],
  },
  {
    id: 'engineering',
    label: '软件工程',
    topics: [
      {
        id: 'engineering/testing',
        label: '软件测试',
        articles: [`${JAVA}/quality/test-pyramid-contract-regression`, `${JAVA}/quality/test-doubles-mock-stub-boundaries`],
      },
      {
        id: 'engineering/design-patterns',
        label: '设计原则与设计模式',
        articles: [`${SD}/ood/solid`, `${SD}/ood/questions/milktea-store`],
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
    ],
  },
  {id: 'go', label: 'Go', topics: []},
  {id: 'python', label: 'Python', topics: []},
  {id: 'javascript', label: 'JavaScript 与 TypeScript', topics: []},
  {id: 'browser', label: '浏览器与前端基础', topics: []},
  {id: 'frontend', label: '前端框架与工程化', topics: []},
  {id: 'nodejs', label: 'Node.js', topics: []},
  {id: 'ai', label: 'AI 应用与 Agent', topics: []},
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
    topics: [
      {
        id: 'devops/delivery',
        label: 'CI/CD 与发布',
        articles: [`${SD}/production/docker-ci-cd-reproducible-delivery`],
      },
      {
        id: 'devops/observability',
        label: '可观测性',
        articles: [`${SD}/production/logs-metrics-traces-correlation`],
      },
      {
        id: 'devops/incidents',
        label: '故障排查与响应',
        articles: [`${SD}/production/jvm-thread-sql-network-joint-diagnosis`],
      },
    ],
  },
];
