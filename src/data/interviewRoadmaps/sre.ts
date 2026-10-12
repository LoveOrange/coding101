import type {InterviewRoadmapData} from '../../components/InterviewRoadmap';

/**
 * 运维 / SRE 面试路线。主题和优先级来自牛客网公开的 SRE、运维开发、DevOps
 * 面试复盘；没有正文的主题标为建设中。
 */
export const sreInterviewRoadmap: InterviewRoadmapData = {
  id: 'sre',
  label: '运维 / SRE',
  title: '运维与 SRE 面试路线',
  introduction:
    '这条路线面向 SRE、运维开发和 DevOps 岗位，按考点整理阅读顺序和完成标准。面试的主线是“线上出了问题怎么办”：先打牢操作系统和网络基础，再掌握 Linux 排查、容器与 Kubernetes，最后是监控告警、故障响应和稳定性建设。部分主题仍在编写，已标为建设中。',
  reviewHint:
    '优先级来自公开复盘中的考点出现情况。SRE 面试几乎都会问“你怎么理解 SRE”和一道线上故障场景题，还常要求现场写命令或脚本；准备每个主题时，都要能说出排查用的具体命令和判断依据。',
  phases: [
    {
      id: 'foundations',
      title: '操作系统与网络基础',
      topics: [
        {
          id: 'sre-os',
          title: '操作系统基础',
          depth: 'mechanism',
          priority: 'must',
          firstRound: {
            outcomes: ['说明进程与线程、用户态与内核态的区别。', '解释虚拟内存、缺页和 I/O 模型的基本概念。'],
            questions: ['进程和线程有什么区别？', '阻塞 I/O 和非阻塞 I/O 有什么区别？'],
          },
          details: {
            outcomes: ['用文件描述符和 I/O 多路复用解释高并发服务的工作方式。'],
            interviewQuestions: ['epoll 和 poll 有什么区别？', '多个进程共享文件描述符时偏移量怎样变化？'],
          },
          articles: [
            {core: true, title: '进程与线程', href: '/docs/basic-knowledge/operating-system/processes-threads'},
            {core: true, title: '虚拟内存', href: '/docs/basic-knowledge/operating-system/virtual-memory'},
            {core: true, title: 'I/O 模型', href: '/docs/basic-knowledge/operating-system/io-models'},
            {core: false, title: 'I/O 多路复用', href: '/docs/basic-knowledge/operating-system/io-multiplexing'},
            {core: false, title: '文件描述符', href: '/docs/basic-knowledge/operating-system/file-descriptors'},
          ],
        },
        {
          id: 'sre-network',
          title: '网络基础',
          depth: 'mechanism',
          priority: 'must',
          firstRound: {
            outcomes: ['讲清 TCP 三次握手、四次挥手和 TIME_WAIT 的作用。', '说明 DNS 解析过程和 HTTPS 握手中各方的角色。'],
            questions: ['为什么需要三次握手？TIME_WAIT 有什么作用？', '输入一个网址后，DNS 怎样解析？'],
          },
          details: {
            outcomes: ['区分 HTTP/1.1、HTTP/2、HTTP/3 的连接方式，以及四层和七层负载均衡。'],
            interviewQuestions: ['TCP 和 UDP 有什么区别？', 'OSI 和 TCP/IP 模型怎样对应？'],
          },
          articles: [
            {core: true, title: 'TCP 连接管理', href: '/docs/basic-knowledge/network/tcp_handshake'},
            {core: true, title: 'DNS', href: '/docs/basic-knowledge/network/dns'},
            {core: true, title: '网络模型', href: '/docs/basic-knowledge/network/network-models'},
            {core: false, title: 'TCP 与 UDP', href: '/docs/basic-knowledge/network/tcp_udp'},
            {core: false, title: 'HTTP 版本、连接复用与超时', href: '/docs/basic-knowledge/network/http-versions-connection-reuse-timeouts'},
            {core: false, title: 'TLS', href: '/docs/basic-knowledge/network/tls'},
          ],
        },
      ],
    },
    {
      id: 'linux',
      title: 'Linux',
      topics: [
        {
          id: 'linux-performance',
          title: '性能与磁盘排查',
          depth: 'scenario',
          priority: 'must',
          firstRound: {
            outcomes: ['解释 load average 并据此判断机器是否过载。', '按机器、进程、线程、代码的顺序定位 CPU 高和接口慢。'],
            questions: ['load average 的三个数字是什么含义？', '磁盘满了怎样排查？删除文件后空间为什么没有释放？'],
          },
          details: {
            outcomes: ['区分 inode 耗尽、文件被占用和挂载遮挡等磁盘问题。', '解释 buffer 与 cache，判断内存是否真的紧张。'],
            interviewQuestions: ['CPU 占用不高但接口很慢，怎样排查？', 'buffer 和 cache 有什么区别？'],
          },
          articles: [
            {core: true, title: 'Linux 性能排查', href: '/docs/devops/linux/performance-troubleshooting'},
            {core: true, title: '磁盘与文件系统排查', href: '/docs/devops/linux/disk-filesystem'},
          ],
        },
        {
          id: 'linux-basics',
          title: '常用命令、权限与进程',
          depth: 'foundation',
          priority: 'must',
          firstRound: {
            outcomes: ['用 grep、awk、sort、uniq 组合完成日志统计。', '解释文件和目录上 rwx 的含义；说明僵尸进程和孤儿进程。'],
            questions: ['怎样统计日志中访问次数最多的 10 个 IP？', '僵尸进程怎样处理？'],
          },
          details: {
            outcomes: ['用 systemd 托管服务，处理信号与优雅停止。', '编写带错误处理的 Shell 脚本。'],
            interviewQuestions: ['kill 和 kill -9 有什么区别？', 'systemd 怎样设置服务开机启动和崩溃重启？'],
          },
          articles: [
            {core: true, title: 'Linux 常用命令与文件权限', href: '/docs/devops/linux/commands-permissions'},
            {core: true, title: '进程管理与信号', href: '/docs/devops/linux/processes-signals'},
            {core: false, title: 'Shell 脚本'},
          ],
        },
        {
          id: 'linux-network',
          title: 'Linux 网络排查',
          depth: 'scenario',
          priority: 'must',
          firstRound: {
            outcomes: ['按解析、可达、端口、应用分层确认连通性。', '解释 TIME_WAIT 和 CLOSE_WAIT 过多的原因与处理。'],
            questions: ['ping 通了，业务端口一定通吗？', '怎样查看某个端口被哪个进程占用？'],
          },
          details: {
            outcomes: ['用 tcpdump 抓包判断报文在哪一段丢失；说明 iptables 的表和链。'],
            interviewQuestions: ['iptables 有哪些表和链？Kubernetes 中哪里用到了 DNAT？', '用 tcpdump 抓握手时关注哪些字段？'],
          },
          articles: [{core: true, title: 'Linux 网络排查', href: '/docs/devops/linux/network-troubleshooting'}],
        },
      ],
    },
    {
      id: 'cloud-native',
      title: '容器与 Kubernetes',
      topics: [
        {
          id: 'containers',
          title: '容器与镜像',
          depth: 'mechanism',
          priority: 'must',
          firstRound: {
            outcomes: ['从是否共享内核说明容器与虚拟机的区别。', '说明 Namespace 和 Cgroups 分别解决什么问题。'],
            questions: ['容器和虚拟机有什么本质区别？', 'CMD 和 ENTRYPOINT 有什么区别？'],
          },
          details: {
            outcomes: ['用多阶段构建和层缓存优化镜像体积与构建速度。'],
            interviewQuestions: ['怎样优化镜像体积和构建速度？', '两个容器怎样共享数据？'],
          },
          articles: [
            {core: true, title: '容器原理', href: '/docs/devops/containers/container-principles'},
            {core: true, title: 'Docker 镜像与 Dockerfile', href: '/docs/devops/containers/docker-images'},
          ],
        },
        {
          id: 'kubernetes-core',
          title: 'Kubernetes 架构与 Pod',
          depth: 'mechanism',
          priority: 'must',
          firstRound: {
            outcomes: ['说出控制平面和节点上的组件及职责。', '按状态排查 Pending 和 CrashLoopBackOff 的 Pod。'],
            questions: ['Kubernetes 有哪些核心组件？', '一个 Pod 一直 Pending，可能是什么原因？'],
          },
          details: {
            outcomes: ['描述从提交 Deployment 到 Pod 运行的完整链路；说明 etcd 的作用。', '配置探针、requests 与 limits，理解驱逐与 HPA。'],
            interviewQuestions: ['Pod 的启动流程是什么？', '三种探针分别起什么作用？'],
          },
          articles: [
            {core: true, title: 'Kubernetes 架构', href: '/docs/devops/kubernetes/architecture'},
            {core: true, title: 'Pod：生命周期、探针与资源', href: '/docs/devops/kubernetes/pods'},
          ],
        },
        {
          id: 'kubernetes-workloads',
          title: '工作负载、Service 与网络',
          depth: 'mechanism',
          priority: 'common',
          details: {
            outcomes: ['区分 Deployment、StatefulSet、DaemonSet 的适用场景。', '说明 Service、Ingress 和 CNI 怎样让流量到达 Pod。'],
            interviewQuestions: ['Service 有哪些类型？', 'Pod 之间怎样跨节点通信？Flannel 和 Calico 有什么区别？'],
          },
          articles: [
            {core: true, title: '工作负载、Service 与集群网络', href: '/docs/devops/kubernetes/workloads-networking'},
            {core: false, title: '存储（PV、PVC、StorageClass）'},
            {core: false, title: 'Helm 与 Operator'},
          ],
        },
      ],
    },
    {
      id: 'reliability',
      title: '监控、故障与稳定性',
      topics: [
        {
          id: 'sre-practice',
          title: 'SRE 的职责与方法',
          depth: 'foundation',
          priority: 'must',
          firstRound: {
            outcomes: ['说明 SLO、错误预算、消除琐事和无责复盘的含义。', '区分 SRE、传统运维、运维开发和 DevOps。'],
            questions: ['你怎么理解 SRE？', 'SLI、SLO、SLA 有什么区别？'],
          },
          details: {
            outcomes: ['设计受控的故障注入实验，控制爆炸半径。'],
            interviewQuestions: ['故障注入为什么要在线上做？怎样避免影响正常流量？'],
          },
          articles: [
            {core: true, title: 'SRE 的职责与工作方式', href: '/docs/devops/incidents/sre-practice'},
            {core: false, title: 'SLI、SLO 与错误预算', href: '/docs/system-design/availability/sli-slo-error-budget-capacity-headroom'},
          ],
        },
        {
          id: 'monitoring',
          title: '监控与告警',
          depth: 'scenario',
          priority: 'must',
          firstRound: {
            outcomes: ['说明 Prometheus 的组成和拉取模型。', '用黄金信号和 USE 方法确定一个服务要监控的指标。'],
            questions: ['Prometheus 的架构是怎样的？', '监控一个生产服务，你会监控哪些指标？'],
          },
          details: {
            outcomes: ['设计可执行、低噪声的告警，并说明分级与升级。', '把日志、指标和追踪关联起来排障。'],
            interviewQuestions: ['一个指标在阈值附近反复告警，怎样降下来？', '日志、指标和 Trace 各自能证明什么？'],
          },
          articles: [
            {core: true, title: '监控与告警', href: '/docs/devops/observability/monitoring-alerting'},
            {core: false, title: '日志、指标与追踪', href: '/docs/system-design/production/logs-metrics-traces-correlation'},
            {core: false, title: '日志系统（ELK、Loki）'},
            {core: false, title: '分布式追踪（OpenTelemetry）'},
          ],
        },
        {
          id: 'incident-response',
          title: '故障响应与排查',
          depth: 'scenario',
          priority: 'must',
          firstRound: {
            outcomes: ['按定级、止血、定位、修复、复盘的顺序处置故障，止血优先。', '从用户反馈出发，沿请求路径逐段定位。'],
            questions: ['一个高优先级故障发生了，你的处置流程是什么？', '某个地区的用户反馈打不开，怎样排查？'],
          },
          details: {
            outcomes: ['写出有时间线、根因和可跟踪改进项的复盘。', '联合 JVM、线程、SQL 和网络证据排查延迟问题。'],
            interviewQuestions: ['复盘应该包含哪些内容？', '接口 P99 升高但 CPU 正常，怎样联合排查？'],
          },
          articles: [
            {core: true, title: '故障响应与排查', href: '/docs/devops/incidents/incident-response'},
            {core: false, title: '生产故障联合诊断', href: '/docs/system-design/production/jvm-thread-sql-network-joint-diagnosis'},
            {core: false, title: '事故复盘与组织学习', href: '/docs/system-design/leadership/incident-review-failed-designs-organizational-learning'},
          ],
        },
        {
          id: 'high-availability',
          title: '高可用、容灾与过载保护',
          depth: 'scenario',
          priority: 'common',
          details: {
            outcomes: ['根据 RTO、RPO 设计备份和容灾方案，并验证故障转移。', '用限流、熔断、降级保护服务。'],
            interviewQuestions: ['高可用与容灾有什么区别？', '熔断、降级、限流分别解决什么问题？'],
          },
          articles: [
            {core: true, title: '高可用与容灾', href: '/docs/system-design/availability/high-availability-backup-rto-rpo'},
            {core: true, title: '故障转移演练与恢复验证', href: '/docs/system-design/availability/failover-drills-recovery-validation'},
            {core: false, title: '限流与容量保护', href: '/docs/system-design/reliability/rate-limiting-capacity-protection'},
            {core: false, title: '熔断、降级与舱壁', href: '/docs/system-design/reliability/circuit-breaker-degradation-bulkhead'},
          ],
        },
      ],
    },
    {
      id: 'delivery-traffic',
      title: '交付与流量',
      topics: [
        {
          id: 'traffic',
          title: 'Nginx 与负载均衡',
          depth: 'mechanism',
          priority: 'common',
          details: {
            outcomes: ['说明 Nginx 高并发的原因和负载均衡算法。', '区分四层与七层负载均衡、LVS 的几种模式；排查 502 和 504。'],
            interviewQuestions: ['Nginx 和 LVS 有什么区别？', 'Nginx 返回 502 怎样排查？'],
          },
          articles: [{core: true, title: 'Nginx 与负载均衡', href: '/docs/devops/traffic/nginx-load-balancing'}],
        },
        {
          id: 'delivery',
          title: 'CI/CD 与发布',
          depth: 'scenario',
          priority: 'common',
          details: {
            outcomes: ['设计从提交到生产的可重复交付流水线。', '用灰度和自动回滚控制发布风险。'],
            interviewQuestions: ['怎样设计一次可以安全回滚的灰度发布？', '蓝绿发布、滚动发布和金丝雀发布有什么区别？'],
          },
          articles: [
            {core: true, title: '可重复交付（Docker、CI/CD）', href: '/docs/system-design/production/docker-ci-cd-reproducible-delivery'},
            {core: true, title: '灰度发布与回滚', href: '/docs/system-design/microservices/canary-traffic-tagging-rollback'},
            {core: false, title: 'GitOps（Argo CD）'},
          ],
        },
        {
          id: 'infrastructure-as-code',
          title: '基础设施即代码与云',
          depth: 'scenario',
          priority: 'optional',
          details: {
            outcomes: ['用 Ansible、Terraform 管理配置和基础设施。', '说明 VPC、安全组和 IAM 的作用。'],
            interviewQuestions: ['Ansible 和 SaltStack 有什么区别？', '安全组和主机防火墙有什么区别？'],
          },
          articles: [
            {core: true, title: '基础设施即代码（Terraform、Ansible）'},
            {core: true, title: '云网络与权限（VPC、安全组、IAM）'},
          ],
        },
      ],
    },
    {
      id: 'programming',
      title: '编程与中间件',
      topics: [
        {
          id: 'sre-scripting',
          title: '脚本与运维开发语言',
          depth: 'foundation',
          priority: 'common',
          details: {
            outcomes: ['用 Python 编写日志处理、批量操作和巡检脚本。', '了解 Go 的并发模型，能读写运维平台和 Kubernetes 生态的代码。'],
            interviewQuestions: ['用 Python 统计日志中出现次数最多的错误。', 'Go 的 GMP 调度模型是怎样的？'],
          },
          articles: [
            {core: true, title: 'Python 运维脚本'},
            {core: false, title: 'Go 并发基础'},
          ],
        },
        {
          id: 'middleware-ops',
          title: '数据库与中间件运维',
          depth: 'mechanism',
          priority: 'optional',
          details: {
            outcomes: ['说明 Redis 持久化与高可用、主从复制和故障切换。', '了解消息队列的可靠性与选型。'],
            interviewQuestions: ['Redis 的 RDB、AOF、复制和 Cluster 分别解决什么问题？', '主节点故障后怎样保证新主不丢数据并避免双主？'],
          },
          articles: [
            {core: true, title: 'Redis 持久化与高可用', href: '/docs/basic-knowledge/nosql/redis/persistence'},
            {core: true, title: '主备复制', href: '/docs/system-design/distributed-system/primary_backup_replication'},
            {core: false, title: 'Kafka 与 RabbitMQ', href: '/docs/basic-knowledge/middleware/kafka-rabbitmq-queue-semantics'},
          ],
        },
      ],
    },
  ],
};
