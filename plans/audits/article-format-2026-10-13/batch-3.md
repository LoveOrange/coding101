# 文章格式审计：batch-3

日期：2026-10-13。分支：`content/article-format-2026-10-13`。

本批完成指定 20 篇文章的表达优化。新增 40 道本站原理自测。仅修改本批文章与本记录，未提交 git。

## 表达与标识

- 完整阅读根目录 AGENTS.md、batch-1b 与两篇样例。
- 开头明确文章范围，相邻机制改为结论加链接。
- 面试核心改为可直接回答的结论。参考回答首句直接回应题目。
- 普通二、三级标题改为概念或机制名称。面试题保留完整问题。
- 按短句要求逐段通读，拆分长句。用具体主体连接原因、结果和边界。
- 20 篇文章的 front matter 均保持不变。
- 与 HEAD 对照，137 个已有显式锚点全部保留。
- 20 道原有卡片全部保留，未删除或合并。
- 原有公司归属和来源注释均保留。未新增公司归属。
- 所有二、三级标题都有显式锚点，编号连续。
- 新增正文锚点采用标题文字。新增卡片使用英文 ID。
- 新增自测统一使用以下注释：

`<!-- 本题为本站原理自测，尚未核验对应公司面经，不作公司归属。 -->`

## 每篇改动与依据

### 1. DNS

文件：[dns.mdx](../../../docs/basic-knowledge/network/dns.mdx)。

重写资源记录、递归与迭代查询、TTL 和切流。补充 NXDOMAIN/NODATA、SOA 负缓存、EDNS/TCP 回退和 DNSSEC/DoH/DoT 分工。

新增题：`dns-negative-cache`、`dns-tcp-fallback`、`dnssec-encrypted-dns`。

依据：[IETF：DNS Negative Caching](https://www.rfc-editor.org/rfc/rfc2308.html)、[RFC 7766：DNS Transport over TCP](https://www.rfc-editor.org/rfc/rfc7766.html)、[RFC 6891：EDNS(0)](https://www.rfc-editor.org/rfc/rfc6891.html)、[RFC 4033：DNS Security](https://www.rfc-editor.org/rfc/rfc4033.html)、[RFC 7858：DNS over TLS](https://www.rfc-editor.org/rfc/rfc7858.html)、[RFC 8484：DNS over HTTPS](https://www.rfc-editor.org/rfc/rfc8484.html)。上述资料均列入文章参考资料。

纠错与边界：原文没有确认的事实错误。将传输与缓存边界具体化，区分 512 字节限制和 EDNS 扩展。

人工确认：无。

### 2. HTTP 缓存

文件：[http-cache.mdx](../../../docs/basic-knowledge/network/http-cache.mdx)。

区分存储、新鲜度和条件验证。补充 s-maxage、Expires 优先级、Vary、强弱 ETag 与 If-None-Match 优先级。

新增题：`cache-validator-priority`、`shared-cache-vary`。

依据：[IETF：HTTP Caching](https://www.rfc-editor.org/rfc/rfc9111.html)、[IETF：HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html)。上述资料均列入文章参考资料。

纠错与边界：原文没有确认的事实错误。把 no-cache 的表述限定为无字段参数形式，补充 must-revalidate 失联错误语义。

人工确认：无。

### 3. HTTP

文件：[http-versions-connection-reuse-timeouts.mdx](../../../docs/basic-knowledge/network/http-versions-connection-reuse-timeouts.mdx)。

改写持久连接、多路复用、池容量、deadline 与重试。补充 HTTP/2 双层流量窗口、并发流上限和 800ms 预算例。

新增题：`deadline-and-retry`、`http2-flow-control`。

依据：[RFC 9112：HTTP/1.1](https://www.rfc-editor.org/rfc/rfc9112.html)、[RFC 9113：HTTP/2](https://www.rfc-editor.org/rfc/rfc9113.html)、[RFC 9114：HTTP/3](https://www.rfc-editor.org/rfc/rfc9114.html)、[RFC 9000：QUIC](https://www.rfc-editor.org/rfc/rfc9000.html)、[RFC 9204：QPACK](https://www.rfc-editor.org/rfc/rfc9204.html)。上述资料均列入文章参考资料。

纠错与边界：修正“HTTP/3 一个流丢包不影响其他流”的绝对表述。保留独立交付结论，补充共享拥塞控制和 QPACK 依赖。修正“只有幂等操作才能重试”：确认尚未发送的请求也可重试。

人工确认：无。

### 4. IP

文件：[ip.mdx](../../../docs/basic-knowledge/network/ip.mdx)。

补充地址位数、最长前缀、ARP/邻居发现、NAT、路径 MTU、MSS、IPv4 DF 和 IPv6 源端分片。增加 ICMP 探测与应用可达性的区别。

新增题：`path-mtu-fragmentation`、`icmp-service-reachability`。

依据：[RFC 1191：Path MTU Discovery](https://www.rfc-editor.org/rfc/rfc1191.html)、[RFC 4861：IPv6 Neighbor Discovery](https://www.rfc-editor.org/rfc/rfc4861.html)、[RFC 3021：IPv4 /31 Links](https://www.rfc-editor.org/rfc/rfc3021.html)、[RFC 3022：Traditional NAT](https://www.rfc-editor.org/rfc/rfc3022.html)、[RFC 792：ICMP](https://www.rfc-editor.org/rfc/rfc792.html)。上述资料均列入文章参考资料。

纠错与边界：原文没有确认的事实错误。补充 /24 地址计数的适用范围，并列明 /31 例外。

人工确认：无。

### 5. 网络模型

文件：[network-models.mdx](../../../docs/basic-knowledge/network/network-models.mdx)。

用职责表重写 OSI 与 TCP/IP，保留原有插图和归属。补充逐跳封装、交换与路由分工，以及 HTTPS 内容路由条件。

新增题：`encapsulation-hop`。

依据：[RFC 1122：Requirements for Internet Hosts](https://www.rfc-editor.org/rfc/rfc1122)、[ITU-T X.200：OSI Basic Reference Model](https://www.itu.int/rec/T-REC-X.200-199407-I/en)、[NGINX：HTTP Load Balancing](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/)、[NGINX：TCP and UDP Load Balancing](https://docs.nginx.com/nginx/admin-guide/load-balancer/tcp-udp-load-balancer/)。上述资料均列入文章参考资料。

纠错与边界：修正表示层负责界面展示、链路层建立端到端路径等误导。删除 TCP/IP 是 OSI 简化版的因果表述。修正每层都增加头部、按请求来源路由就属于四层的说法。

人工确认：无。

### 6. RPC

文件：[rpc-serialization-netty-event-loop.mdx](../../../docs/basic-knowledge/network/rpc-serialization-netty-event-loop.mdx)。

限定 Netty 4.2 NIO 执行模型。补充请求关联、Protobuf reserved/optional、管线传播方向、异步 retain/release 和写缓冲反馈。

新增题：`protobuf-field-evolution`、`bytebuf-async-lifetime`。

依据：[Netty 4.2：ChannelPipeline](https://netty.io/4.2/api/io/netty/channel/ChannelPipeline.html)、[Netty 4.2：WriteBufferWaterMark](https://netty.io/4.2/api/io/netty/channel/WriteBufferWaterMark.html)、[Netty：Reference-counted objects](https://netty.io/wiki/reference-counted-objects.html)、[Protobuf：Proto3 Language Guide](https://protobuf.dev/programming-guides/proto3/)、[Protobuf：Field Presence](https://protobuf.dev/programming-guides/field_presence/)。上述资料均列入文章参考资料。

纠错与边界：将删除字段后“不立即复用编号”改为 reserved 保留退役编号。明确 Channel 顺序不覆盖任意业务线程，水位反馈需要应用主动响应。

人工确认：无。

### 7. TCP 与 UDP

文件：[tcp_udp.mdx](../../../docs/basic-knowledge/network/tcp_udp.mdx)。

重写可靠传输和头部字段。补充累计 ACK、SACK、RTO、RACK、rwnd/cwnd、零窗口探测及 Nagle/延迟 ACK。握手和分帧细节改为相邻链接。

新增题：`tcp-flow-congestion`、`tcp-ack-retransmission`、`nagle-delayed-ack`。

依据：[RFC 9293：Transmission Control Protocol](https://www.rfc-editor.org/rfc/rfc9293)、[RFC 5681：TCP Congestion Control](https://www.rfc-editor.org/rfc/rfc5681.html)、[RFC 6298：TCP Retransmission Timer](https://www.rfc-editor.org/rfc/rfc6298.html)、[RFC 2018：TCP SACK](https://www.rfc-editor.org/rfc/rfc2018.html)、[RFC 8985：RACK-TLP](https://www.rfc-editor.org/rfc/rfc8985.html)、[Linux man-pages：tcp(7)](https://man7.org/linux/man-pages/man7/tcp.7.html)。上述资料均列入文章参考资料。

纠错与边界：修正序列号和确认号被解释为包序号的问题。修正仅靠两个端口标识连接、校验和相同就保证数据正确的说法。移除握手保证后续可达、挥手保证业务处理完成的误导。

人工确认：无。

### 8. TLS

文件：[tls.mdx](../../../docs/basic-knowledge/network/tls.mdx)。

以 TLS 1.3 证书握手说明证书、签名、Finished、临时交换和 AEAD。补充 SNI/ALPN、SAN、前向保密、PSK 恢复和 0-RTT。

新增题：`tls-forward-secrecy-replay`、`sni-alpn`。

依据：[IETF：TLS 1.3](https://www.rfc-editor.org/rfc/rfc8446.html)、[IETF：Service Identity in TLS](https://www.rfc-editor.org/rfc/rfc9525.html)、[RFC 6066：Server Name Indication](https://www.rfc-editor.org/rfc/rfc6066.html)、[RFC 7301：ALPN](https://www.rfc-editor.org/rfc/rfc7301.html)。上述资料均列入文章参考资料。

纠错与边界：原文没有确认的事实错误。补充纯 PSK 与临时 DHE 的边界，以及 1-RTT 不含 TCP 建连、HelloRetryRequest 增加往返的条件。

人工确认：无。

### 9. 死锁

文件：[deadlock.mdx](../../../docs/basic-knowledge/operating-system/deadlock.mdx)。

补全四个必要条件的含义，区分预防、检测和恢复。补充安全序列、银行家算法及 10 份资源的分配例。

新增题：`deadlock-safe-state`。

依据：[OSTEP：Concurrency Bugs](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-bugs.pdf)、[E. W. Dijkstra：The Mathematics behind the Banker's Algorithm](https://www.cs.utexas.edu/~EWD/transcriptions/EWD06xx/EWD623.html)。上述资料均列入文章参考资料。

纠错与边界：原文没有确认的事实错误。明确不安全状态与已经死锁的差别，保留多实例资源图的判断边界。

人工确认：无。

### 10. 文件描述符

文件：[file-descriptors.mdx](../../../docs/basic-knowledge/operating-system/file-descriptors.mdx)。

改写 fd、打开文件描述、dup/fork、偏移共享和关闭责任。补充 EMFILE/ENFILE、RLIMIT_NOFILE、O_CLOEXEC 竞争窗口和 close 错误处理。

新增题：`fd-exhaustion`、`cloexec-race`。

依据：[Linux man-pages：open](https://man7.org/linux/man-pages/man2/open.2.html)、[Linux man-pages：dup](https://man7.org/linux/man-pages/man2/dup.2.html)、[Linux man-pages：close(2)](https://man7.org/linux/man-pages/man2/close.2.html)、[Linux man-pages：getrlimit(2)](https://man7.org/linux/man-pages/man2/getrlimit.2.html)。上述资料均列入文章参考资料。

纠错与边界：原文没有确认的事实错误。新增 Linux close 即使报告 EIO 也已释放编号的边界，避免盲目重试误关复用 fd。

人工确认：无。

### 11. I/O 模型

文件：[io-models.mdx](../../../docs/basic-knowledge/operating-system/io-models.mdx)。

增加模型对照、Reactor/Proactor 和 io_uring 生命周期。补充 TCP 正长度 recv 的返回值、UDP 空数据报、部分写入和 EAGAIN 处理。

新增题：`socket-read-results`、`reactor-proactor`。

依据：[Linux man-pages：recv](https://man7.org/linux/man-pages/man2/recv.2.html)、[Linux man-pages：send(2)](https://man7.org/linux/man-pages/man2/send.2.html)、[Linux man-pages：io_uring(7)](https://man7.org/linux/man-pages/man7/io_uring.7.html)、[Boost.Asio：The Proactor Design Pattern](https://www.boost.org/doc/libs/latest/doc/html/boost_asio/overview/core/async.html)。上述资料均列入文章参考资料。

纠错与边界：原文没有确认的事实错误。明确零长度 UDP 数据报与 TCP EOF 不同，O_NONBLOCK 对普通磁盘文件的等待无效。

人工确认：无。

### 12. I/O 多路复用

文件：[io-multiplexing.mdx](../../../docs/basic-knowledge/operating-system/io-multiplexing.mdx)。

用表格比较 select/poll/epoll，补充 fd_set、nfds、编号范围和 EPOLLONESHOT。细化 ET drain、公平调度、HUP 与 EPOLLOUT 订阅。

新增题：`select-fd-limit`、`epoll-oneshot-rearm`。

依据：[Linux man-pages：epoll](https://man7.org/linux/man-pages/man7/epoll.7.html)、[Linux man-pages：epoll_ctl(2)](https://man7.org/linux/man-pages/man2/epoll_ctl.2.html)、[Linux man-pages：poll](https://man7.org/linux/man-pages/man2/poll.2.html)、[Linux man-pages：select(2)](https://man7.org/linux/man-pages/man2/select.2.html)。上述资料均列入文章参考资料。

纠错与边界：原文没有确认的事实错误。明确 1024 是 glibc fd_set 的编号范围，单次通知还需 EPOLL_CTL_MOD 重新启用。

人工确认：无。

### 13. 进程与线程

文件：[processes-threads.mdx](../../../docs/basic-knowledge/operating-system/processes-threads.mdx)。

补充运行/就绪/阻塞转换、fork/exec/wait、僵尸与孤儿、IPC 对照。写时复制细节引用虚拟内存，fd 继承引用描述符文章。

新增题：`fork-exec-zombie`、`ipc-shared-memory`。

依据：[Linux man-pages：pthreads](https://man7.org/linux/man-pages/man7/pthreads.7.html)、[Linux man-pages：fork(2)](https://man7.org/linux/man-pages/man2/fork.2.html)、[Linux man-pages：execve(2)](https://man7.org/linux/man-pages/man2/execve.2.html)、[Linux man-pages：wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html)、[Linux man-pages：shm_overview(7)](https://man7.org/linux/man-pages/man7/shm_overview.7.html)。上述资料均列入文章参考资料。

纠错与边界：将并发仅解释成交替推进的表述改为执行时段重叠。明确 exec 保持 PID，多线程 fork 子进程只保留调用线程。

人工确认：无。

### 14. 线程同步

文件：[synchronization.mdx](../../../docs/basic-knowledge/operating-system/synchronization.mdx)。

保留丢失更新和条件变量伪代码。补充谓词循环、signal/broadcast、信号量计数、自旋与阻塞的代价。

新增题：`condition-vs-semaphore`。

依据：[POSIX：pthread_cond_wait](https://pubs.opengroup.org/onlinepubs/9799919799/functions/pthread_cond_wait.html)、[POSIX：pthread_cond_signal](https://pubs.opengroup.org/onlinepubs/9699919799/functions/pthread_cond_broadcast.html)、[Linux man-pages：sem_overview(7)](https://man7.org/linux/man-pages/man7/sem_overview.7.html)、[Linux man-pages：pthread_spin_lock(3)](https://man7.org/linux/man-pages/man3/pthread_spin_lock.3.html)、[GCC：Volatiles](https://gcc.gnu.org/onlinedocs/gcc/Volatiles.html)。上述资料均列入文章参考资料。

纠错与边界：原文没有确认的事实错误。具体说明无人等待时通知不保留，信号量保存许可；区分 C/C++ volatile 与同步机制。

人工确认：无。

### 15. 虚拟内存

文件：[virtual-memory.mdx](../../../docs/basic-knowledge/operating-system/virtual-memory.mdx)。

补充多级页表、大页、minor/major fault、mmap 共享/私有映射、msync、RSS/PSS 和 overcommit。

新增题：`cow-mmap`、`tlb-huge-pages`。

依据：[Linux Kernel：Page Tables](https://docs.kernel.org/mm/page_tables.html)、[Linux man-pages：mmap(2)](https://man7.org/linux/man-pages/man2/mmap.2.html)、[Linux man-pages：msync(2)](https://man7.org/linux/man-pages/man2/msync.2.html)、[Linux man-pages：getrusage(2)](https://man7.org/linux/man-pages/man2/getrusage.2.html)、[Linux man-pages：proc_pid_smaps(5)](https://man7.org/linux/man-pages/man5/proc_pid_smaps.5.html)、[Linux Kernel：Overcommit Accounting](https://docs.kernel.org/mm/overcommit-accounting.html)。上述资料均列入文章参考资料。

纠错与边界：原文没有确认的事实错误。明确共享文件映射的可见性与持久化不同；匿名映射不套用底层文件写回结论。

人工确认：无。

### 16. Elasticsearch

文件：[elasticsearch-inverted-index-refresh-visibility.mdx](../../../docs/basic-knowledge/middleware/elasticsearch-inverted-index-refresh-visibility.mdx)。

固定自管 8.19 范围。补充 text/keyword、match/term、doc values、translog、refresh 参数、PIT/search_after 和深分页成本。

新增题：`text-keyword-doc-values`、`refresh-translog-durability`、`search-after-pit`。

依据：[Elasticsearch 8.19：Near real-time search](https://www.elastic.co/guide/en/elasticsearch/reference/8.19/near-real-time.html)、[Elasticsearch 8.19：Translog](https://www.elastic.co/guide/en/elasticsearch/reference/8.19/index-modules-translog.html)、[Elasticsearch 8.19：Doc values](https://www.elastic.co/guide/en/elasticsearch/reference/8.19/doc-values.html)、[Elasticsearch 8.19：Pagination](https://www.elastic.co/guide/en/elasticsearch/reference/8.19/paginate-search-results.html)、[Elasticsearch：Refresh parameter](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/refresh-parameter)。上述资料均列入文章参考资料。

纠错与边界：修正默认 1 秒的无条件表述。补充最近 30 秒搜索条件和 Serverless 5 秒差异。修正 flush 才开始持久化的误导，说明 request translog 恢复边界。回退旧索引前需核对增量。

人工确认：无。

### 17. 消息幂等性

文件：[idempotent-consumption-order-duplicates.mdx](../../../docs/basic-knowledge/middleware/idempotent-consumption-order-duplicates.mdx)。

补充消费者作用域、去重事务、载荷核对和保留期限。明确 Kafka 事务提交输出与 offset，新增完整快照与增量事件的版本例。

新增题：`snapshot-vs-delta`。

依据：[Kafka 4.1：Design](https://kafka.apache.org/41/design/design/)、[Kafka 4.1：Consumer Configs](https://kafka.apache.org/41/configuration/consumer-configs/)、[MySQL 8.4：InnoDB Error Handling](https://dev.mysql.com/doc/refman/8.4/en/innodb-error-handling.html)、[Debezium：Outbox Event Router](https://debezium.io/documentation/reference/stable/transformations/outbox-event-router.html)。上述资料均列入文章参考资料。

纠错与边界：修正任意唯一键冲突都能视为已处理的表述。修正按较新版本直接跳过旧事件的泛化：增量事件会丢效果。澄清 read_committed 仍返回非事务消息。

人工确认：无。

### 18. 消息队列

文件：[kafka-rabbitmq-queue-semantics.mdx](../../../docs/basic-knowledge/middleware/kafka-rabbitmq-queue-semantics.mdx)。

固定 Kafka 4.1 普通消费组与 RabbitMQ 4.1 队列范围。补充 delete/compact、tombstone、offset 空洞和容量计算。

新增题：`retention-compaction`。

依据：[Kafka 4.1：Design](https://kafka.apache.org/41/design/design/)、[Kafka 4.1：Topic Configs](https://kafka.apache.org/41/configuration/topic-configs/)、[Kafka 4.1：KafkaConsumer](https://kafka.apache.org/41/javadoc/org/apache/kafka/clients/consumer/KafkaConsumer.html)、[RabbitMQ 4.1：Queues](https://www.rabbitmq.com/docs/4.1/queues)、[RabbitMQ 4.1：Streams](https://www.rabbitmq.com/docs/4.1/streams)。上述资料均列入文章参考资料。

纠错与边界：将可重放限定在保留范围内，避免“任意 offset”暗示永久可回溯。区分 Kafka Share Groups 与普通组、RabbitMQ Streams 与常规队列。

人工确认：无。

### 19. 消息可靠性

文件：[message-ack-retry-dead-letter.mdx](../../../docs/basic-knowledge/middleware/message-ack-retry-dead-letter.mdx)。

补充 mandatory/basic.return、ISR 与 acks 配置、生产幂等条件、连续 offset 提交、delivery tag、prefetch 和 quorum 死信确认。

新增题：`confirm-unroutable`、`kafka-acks-isr`、`consumer-progress-gap`、`quorum-dead-letter`。

依据：[RabbitMQ 4.1：Confirms](https://www.rabbitmq.com/docs/4.1/confirms)、[RabbitMQ 4.1：Quorum Queues](https://www.rabbitmq.com/docs/4.1/quorum-queues)、[RabbitMQ 4.1：TTL](https://www.rabbitmq.com/docs/4.1/ttl)、[Kafka 4.1：Producer Configs](https://kafka.apache.org/41/configuration/producer-configs/)、[Kafka 4.1：Topic Configs](https://kafka.apache.org/41/configuration/topic-configs/)、[Kafka 4.1：KafkaConsumer](https://kafka.apache.org/41/javadoc/org/apache/kafka/clients/consumer/KafkaConsumer.html)。上述资料均列入文章参考资料。

纠错与边界：明确不可路由消息也能获得 publisher confirm。纠正重试上限自动触发通用死信的泛化，区分框架与 broker 行为。补充 retry topic 需调度到期、TTL 队头等待、默认死信转发丢失窗口。

人工确认：无。

### 20. 分布式任务调度

文件：[scheduled-tasks-sharding-recovery.mdx](../../../docs/basic-knowledge/middleware/scheduled-tasks-sharding-recovery.mdx)。

补充原子领取、资源端 fencing、固定输入范围和连续检查点。区分补调窗口、运行时限、失败次数，以及 Kubernetes 1.27+ 时区设置。

新增题：`lease-fencing`、`cronjob-deadlines`。

依据：[Kubernetes：CronJob](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/)、[Kubernetes：Jobs](https://kubernetes.io/docs/concepts/workloads/controllers/job/)、[etcd：Lease expiry and fencing example](https://github.com/etcd-io/etcd/blob/main/contrib/lock/README.md)。上述资料均列入文章参考资料。

纠错与边界：修正只校验进度 owner 就能隔离业务副作用的不足。明确实例唯一约束只去重创建；业务结果仍需约束。Forbid 按 Kubernetes 语义跳过重叠执行，未描述成排队延后。

人工确认：无。

## 相邻文章分工

- 网络模型负责分层和封装。IP、TCP 与 UDP 负责各自协议。
- TCP 握手、挥手与连接状态引用既有连接文章。
- HTTP 缓存负责缓存语义。HTTP 文章负责连接、版本和超时。
- TLS 负责加密连接，RPC 负责调用与 Netty 执行。
- I/O 模型负责等待与完成语义。多路复用负责就绪通知和事件循环。
- 进程文章说明执行与生命周期。映射机制、fd 共享分别引用对应文章。
- 消息队列负责存储与分发。可靠性文章负责确认、重试与死信。
- 幂等文章负责业务副作用和乱序处理。调度文章负责领取、接管与进度。

这些调整均在本批文章内完成。未修改批次外文章。

## 验证

技术事实依据规范、官方文档和一手资料核对。版本差异在正文列明。本批未运行 Docker 实验，也未做性能或故障注入测试。

要求的检查均通过：

```sh
node scripts/check-article-format.mjs --style-strict -- \
  docs/basic-knowledge/network/dns.mdx \
  docs/basic-knowledge/network/http-cache.mdx \
  docs/basic-knowledge/network/http-versions-connection-reuse-timeouts.mdx \
  docs/basic-knowledge/network/ip.mdx \
  docs/basic-knowledge/network/network-models.mdx \
  docs/basic-knowledge/network/rpc-serialization-netty-event-loop.mdx \
  docs/basic-knowledge/network/tcp_udp.mdx \
  docs/basic-knowledge/network/tls.mdx \
  docs/basic-knowledge/operating-system/deadlock.mdx \
  docs/basic-knowledge/operating-system/file-descriptors.mdx \
  docs/basic-knowledge/operating-system/io-models.mdx \
  docs/basic-knowledge/operating-system/io-multiplexing.mdx \
  docs/basic-knowledge/operating-system/processes-threads.mdx \
  docs/basic-knowledge/operating-system/synchronization.mdx \
  docs/basic-knowledge/operating-system/virtual-memory.mdx \
  docs/basic-knowledge/middleware/elasticsearch-inverted-index-refresh-visibility.mdx \
  docs/basic-knowledge/middleware/idempotent-consumption-order-duplicates.mdx \
  docs/basic-knowledge/middleware/kafka-rabbitmq-queue-semantics.mdx \
  docs/basic-knowledge/middleware/message-ack-retry-dead-letter.mdx \
  docs/basic-knowledge/middleware/scheduled-tasks-sharding-recovery.mdx
npm run build
git diff --check
```

- 严格格式检查：20 篇，0 篇结构问题，0 篇文风提示。
- 构建：链接、复习资源、岗位和面经检查通过。
- Docusaurus 成功生成静态文件，构建退出码为 0。
- 标识检查：20 个 knowledge.id 保持不变。
- 原有 137 个显式锚点、20 道卡片全部保留。
- 新增 40 道自测的注释和英文 ID 检查通过。
- 所有二、三级标题均有显式锚点，未发现重复 ID。
- 全站检查仍报告 6 篇结构问题、222 篇文风提示。这些问题均在本批之外。
- 构建仍有博客作者、摘要和 Node localStorage 提示。
- Docusaurus 更新检查也提示本地配置权限问题。上述提示均未阻断构建，未扩大范围处理。

## 未完成与人工确认

无阻塞事项。各篇新增考点均有正文和自测对应。所有要求的检查均已通过。

本文档记录的是内容核验结果。部署环境中的性能和故障行为未做实验验证。
