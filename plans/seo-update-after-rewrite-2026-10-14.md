# 文风重写后的 SEO 更新清单（2026-10-14）

2026-10-14 按《大语言模型基础》的文风，重写了 AI/Agent 开发与 Java 的全部文章（共 153 篇，含栏目首页）。正文平均扩充约一倍，front matter 未改动，因此 `description` 和 `keywords` 可能与新正文不一致。请 Codex 逐篇对照新正文更新 SEO 字段。

注意：

- 只改 front matter 中的 `description` 和 `keywords`，不改 `knowledge.id`、正文、锚点和卡片。
- `docs/ai/llm/hallucination.mdx` 与 `docs/ai/prompting/context-management.mdx` 的 description 仍使用“材料”一词，正文已改为“检索到的文档”等具体说法，需要同步。
- 正文中的模糊名词规则见 AGENTS.md“可读性”一节，SEO 文案同样适用。

## docs/ai

- `docs/ai/index.mdx`

## docs/ai/agents

- `docs/ai/agents/agent-loop.mdx`
- `docs/ai/agents/harness.mdx`
- `docs/ai/agents/multi-agent.mdx`
- `docs/ai/agents/workflow-vs-agent.mdx`

## docs/ai/development

- `docs/ai/development/agent-frameworks.mdx`
- `docs/ai/development/ai-assisted-development.mdx`
- `docs/ai/development/ai-code-debugging.mdx`
- `docs/ai/development/coding-agent-evaluation.mdx`
- `docs/ai/development/repository-instructions.mdx`

## docs/ai/evaluation

- `docs/ai/evaluation/agent-evaluation.mdx`
- `docs/ai/evaluation/rag-evaluation.mdx`

## docs/ai/llm

- `docs/ai/llm/hallucination.mdx`
- `docs/ai/llm/llm-basics.mdx`
- `docs/ai/llm/transformer.mdx`

## docs/ai/prompting

- `docs/ai/prompting/context-compaction.mdx`
- `docs/ai/prompting/context-management.mdx`
- `docs/ai/prompting/prompt-engineering.mdx`

## docs/ai/rag

- `docs/ai/rag/chunking.mdx`
- `docs/ai/rag/embedding-vector-search.mdx`
- `docs/ai/rag/hybrid-search-rerank.mdx`
- `docs/ai/rag/rag.mdx`

## docs/ai/safety

- `docs/ai/safety/latency-cost-scaling.mdx`
- `docs/ai/safety/prompt-injection.mdx`
- `docs/ai/safety/tool-authorization-sandbox.mdx`

## docs/ai/state

- `docs/ai/state/durable-execution.mdx`
- `docs/ai/state/memory.mdx`

## docs/ai/tools

- `docs/ai/tools/agent-skills.mdx`
- `docs/ai/tools/function-calling.mdx`
- `docs/ai/tools/mcp.mdx`

## docs/basic-knowledge/java

- `docs/basic-knowledge/java/index.mdx`

## docs/basic-knowledge/java/algorithms

- `docs/basic-knowledge/java/algorithms/arrays-strings-sliding-window.mdx`
- `docs/basic-knowledge/java/algorithms/complexity-constraints-java-cost.mdx`
- `docs/basic-knowledge/java/algorithms/dynamic-programming-state-design.mdx`
- `docs/basic-knowledge/java/algorithms/index.mdx`
- `docs/basic-knowledge/java/algorithms/live-coding-counterexamples-tests.mdx`
- `docs/basic-knowledge/java/algorithms/trees-graphs-search.mdx`

## docs/basic-knowledge/java/collections

- `docs/basic-knowledge/java/collections/arraylist-growth-memory-locality.mdx`
- `docs/basic-knowledge/java/collections/blockingqueue-producer-consumer.mdx`
- `docs/basic-knowledge/java/collections/collection-interface-selection.mdx`
- `docs/basic-knowledge/java/collections/concurrent-collection-iteration-consistency.mdx`
- `docs/basic-knowledge/java/collections/concurrenthashmap-atomic-compound-operations.mdx`
- `docs/basic-knowledge/java/collections/concurrentlinkedqueue-lock-free-path.mdx`
- `docs/basic-knowledge/java/collections/copy-on-write-cost-model.mdx`
- `docs/basic-knowledge/java/collections/hashmap-structure-lookup-path.mdx`
- `docs/basic-knowledge/java/collections/index.mdx`
- `docs/basic-knowledge/java/collections/iterator-fail-fast-immutable.mdx`
- `docs/basic-knowledge/java/collections/linkedhashmap-lru.mdx`
- `docs/basic-knowledge/java/collections/linkedlist-semantics-cost.mdx`
- `docs/basic-knowledge/java/collections/treemap-treeset-ordered-query.mdx`

## docs/basic-knowledge/java/concurrency

- `docs/basic-knowledge/java/concurrency/aqs-state-wait-queue.mdx`
- `docs/basic-knowledge/java/concurrency/atomic-longadder-contention.mdx`
- `docs/basic-knowledge/java/concurrency/cas-aba-versioning.mdx`
- `docs/basic-knowledge/java/concurrency/future-completablefuture-errors.mdx`
- `docs/basic-knowledge/java/concurrency/index.mdx`
- `docs/basic-knowledge/java/concurrency/interruption-timeout-cancellation.mdx`
- `docs/basic-knowledge/java/concurrency/jmm-happens-before.mdx`
- `docs/basic-knowledge/java/concurrency/latch-barrier-semaphore.mdx`
- `docs/basic-knowledge/java/concurrency/liveness-deadlock-livelock-starvation.mdx`
- `docs/basic-knowledge/java/concurrency/lock-contention-context-switch-benchmark.mdx`
- `docs/basic-knowledge/java/concurrency/locks-vs-lock-free-cost.mdx`
- `docs/basic-knowledge/java/concurrency/readwritelock-stampedlock.mdx`
- `docs/basic-knowledge/java/concurrency/reentrantlock-fairness-condition.mdx`
- `docs/basic-knowledge/java/concurrency/safe-publication-escape-final.mdx`
- `docs/basic-knowledge/java/concurrency/shared-state-message-passing.mdx`
- `docs/basic-knowledge/java/concurrency/synchronized-monitor-optimizations.mdx`
- `docs/basic-knowledge/java/concurrency/thread-lifecycle-interruption.mdx`
- `docs/basic-knowledge/java/concurrency/thread-safety-race-conditions.mdx`
- `docs/basic-knowledge/java/concurrency/threadlocal-leaks-context.mdx`
- `docs/basic-knowledge/java/concurrency/threadpoolexecutor-execution-path.mdx`
- `docs/basic-knowledge/java/concurrency/virtual-threads-boundaries.mdx`
- `docs/basic-knowledge/java/concurrency/volatile-barriers-visibility.mdx`

## docs/basic-knowledge/java/data-access

- `docs/basic-knowledge/java/data-access/batching-pagination-data-access-tests.mdx`
- `docs/basic-knowledge/java/data-access/connection-pool-capacity-timeout-leaks.mdx`
- `docs/basic-knowledge/java/data-access/index.mdx`
- `docs/basic-knowledge/java/data-access/jpa-entity-states-dirty-checking-lazy-loading.mdx`
- `docs/basic-knowledge/java/data-access/mybatis-mapping-executor-plugins.mdx`
- `docs/basic-knowledge/java/data-access/n-plus-one-fetch-strategies.mdx`

## docs/basic-knowledge/java/functional

- `docs/basic-knowledge/java/functional/collectors-grouping-reduction.mdx`
- `docs/basic-knowledge/java/functional/index.mdx`
- `docs/basic-knowledge/java/functional/java-time-time-zone-boundaries.mdx`
- `docs/basic-knowledge/java/functional/lambda-functional-interfaces-capture.mdx`
- `docs/basic-knowledge/java/functional/parallel-stream-model-pitfalls.mdx`
- `docs/basic-knowledge/java/functional/stream-pipeline-lazy-evaluation.mdx`

## docs/basic-knowledge/java/io

- `docs/basic-knowledge/java/io/buffer-channel-selector.mdx`
- `docs/basic-knowledge/java/io/byte-character-buffered-streams.mdx`
- `docs/basic-knowledge/java/io/file-mapping-zero-copy-direct-memory.mdx`
- `docs/basic-knowledge/java/io/index.mdx`
- `docs/basic-knowledge/java/io/java-serialization-compatibility-security.mdx`

## docs/basic-knowledge/java/jvm

- `docs/basic-knowledge/java/jvm/aot-cds-native-image.mdx`
- `docs/basic-knowledge/java/jvm/class-initialization-conflicts.mdx`
- `docs/basic-knowledge/java/jvm/class-loading-stages.mdx`
- `docs/basic-knowledge/java/jvm/classloaders-spi-isolation.mdx`
- `docs/basic-knowledge/java/jvm/compressed-pointers-alignment.mdx`
- `docs/basic-knowledge/java/jvm/cpu-high-diagnosis.mdx`
- `docs/basic-knowledge/java/jvm/diagnostic-tools-evidence.mdx`
- `docs/basic-knowledge/java/jvm/direct-native-memory.mdx`
- `docs/basic-knowledge/java/jvm/escape-analysis-scalar-replacement.mdx`
- `docs/basic-knowledge/java/jvm/g1-regions-rset-collection-set.mdx`
- `docs/basic-knowledge/java/jvm/gc-logs-jfr-pauses.mdx`
- `docs/basic-knowledge/java/jvm/gc-roots-reachability.mdx`
- `docs/basic-knowledge/java/jvm/generational-barriers-safepoints.mdx`
- `docs/basic-knowledge/java/jvm/heap-dumps-memory-leaks.mdx`
- `docs/basic-knowledge/java/jvm/index.mdx`
- `docs/basic-knowledge/java/jvm/inlining-deoptimization.mdx`
- `docs/basic-knowledge/java/jvm/interpreter-tiered-compilation.mdx`
- `docs/basic-knowledge/java/jvm/jmh-correct-benchmarks.mdx`
- `docs/basic-knowledge/java/jvm/object-creation-layout.mdx`
- `docs/basic-knowledge/java/jvm/oom-stack-overflow.mdx`
- `docs/basic-knowledge/java/jvm/parent-delegation.mdx`
- `docs/basic-knowledge/java/jvm/runtime-data-areas.mdx`
- `docs/basic-knowledge/java/jvm/serial-parallel-cms.mdx`
- `docs/basic-knowledge/java/jvm/source-to-bytecode.mdx`
- `docs/basic-knowledge/java/jvm/thread-dumps-deadlocks-contention.mdx`
- `docs/basic-knowledge/java/jvm/zgc-shenandoah-low-latency.mdx`

## docs/basic-knowledge/java/language

- `docs/basic-knowledge/java/language/annotations-retention-processing.mdx`
- `docs/basic-knowledge/java/language/bigdecimal-money.mdx`
- `docs/basic-knowledge/java/language/encapsulation-inheritance-polymorphism.mdx`
- `docs/basic-knowledge/java/language/equals-hashcode-object-identity.mdx`
- `docs/basic-knowledge/java/language/exceptions-error-boundaries.mdx`
- `docs/basic-knowledge/java/language/generics.mdx`
- `docs/basic-knowledge/java/language/index.mdx`
- `docs/basic-knowledge/java/language/optional-boundaries.mdx`
- `docs/basic-knowledge/java/language/reflection-method-handles.mdx`
- `docs/basic-knowledge/java/language/runtime-scanning-compile-time-generation.mdx`
- `docs/basic-knowledge/java/language/string-immutability-pool.mdx`
- `docs/basic-knowledge/java/language/types-references-value-passing.mdx`
- `docs/basic-knowledge/java/language/wrappers-boxing-cache.mdx`

## docs/basic-knowledge/java/quality

- `docs/basic-knowledge/java/quality/api-design-from-invariants.mdx`
- `docs/basic-knowledge/java/quality/immutable-objects-defensive-copying.mdx`
- `docs/basic-knowledge/java/quality/index.mdx`
- `docs/basic-knowledge/java/quality/junit-assertions-parameterized-tests.mdx`
- `docs/basic-knowledge/java/quality/test-doubles-mock-stub-boundaries.mdx`
- `docs/basic-knowledge/java/quality/test-pyramid-contract-regression.mdx`

## docs/basic-knowledge/java/spring

- `docs/basic-knowledge/java/spring/actuator-health-startup-diagnostics.mdx`
- `docs/basic-knowledge/java/spring/aop-pointcut-interceptor-chain.mdx`
- `docs/basic-knowledge/java/spring/api-error-contract.mdx`
- `docs/basic-knowledge/java/spring/auto-configuration-conditions.mdx`
- `docs/basic-knowledge/java/spring/bean-creation-lifecycle.mdx`
- `docs/basic-knowledge/java/spring/beandefinition-container-startup.mdx`
- `docs/basic-knowledge/java/spring/binding-validation-content-negotiation.mdx`
- `docs/basic-knowledge/java/spring/circular-dependencies-scopes-early-exposure.mdx`
- `docs/basic-knowledge/java/spring/custom-starter-boundaries.mdx`
- `docs/basic-knowledge/java/spring/declarative-transaction-execution.mdx`
- `docs/basic-knowledge/java/spring/dependency-injection-selection.mdx`
- `docs/basic-knowledge/java/spring/dispatcherservlet-handler-mapping.mdx`
- `docs/basic-knowledge/java/spring/external-config-precedence.mdx`
- `docs/basic-knowledge/java/spring/filter-interceptor-aspect-boundaries.mdx`
- `docs/basic-knowledge/java/spring/http-request-to-controller.mdx`
- `docs/basic-knowledge/java/spring/index.mdx`
- `docs/basic-knowledge/java/spring/ioc-container-purpose.mdx`
- `docs/basic-knowledge/java/spring/jdk-proxy-cglib.mdx`
- `docs/basic-knowledge/java/spring/spring-boot-startup.mdx`
