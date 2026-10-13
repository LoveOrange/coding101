# 文章格式审计：batch-14

日期：2026-10-13。分支：`content/article-format-2026-10-13`。

本批优化指定的 14 篇 DevOps 文章。保留原有 43 道卡片，新增 22 道本站自测。改动限于本批文章和本记录，未提交 git。

## 表达与标识

- 完整阅读 AGENTS.md、batch-1b 记录和两篇参考文章。
- 开头明确每篇分工。正文按机制、条件和结果展开。面试核心改为直接结论，参考回答先回答题目。
- 普通二、三级标题改为概念或机制名称。原有显式锚点全部保留，缺失的章节锚点已补齐。面试题保留完整问句。
- 拆分长句，删除笼统限定和连续否定。逐段通读后，修正生硬指代与缺少条件的结论。
- 与 HEAD 逐文件比较：knowledge.id、原有卡片 ID、显式锚点均未改变。原有卡片未删除或合并。
- 原有公司列表及来源注释逐卡核对一致。两处长公司列表分成两行带字段的列表；现有解析器会合并读取。
- 新题统一使用本站自测注释，没有新增公司归属。参考回答保持默认收起，参考资料保持连续列表。
- 文内链接保留旧锚点，链接文字同步新标题。跨文章链接统一使用目标页面标题。

## 每篇改动与依据

### 1. 容器原理

文件：[container-principles.mdx](../../../docs/devops/containers/container-principles.mdx)。

负责 Namespace、cgroup、联合文件系统和安全边界。镜像构建与存储使用改为相邻文章链接。补充用户映射、rootless、capabilities 和 seccomp。

新增题：`container-security-boundary`。

修正：删除固定启动速度的概括。说明 Namespace 可以共享，Mount Namespace 管理挂载视图。cgroup v2 的 pids 限额包含线程。退出码 137 需结合 OOM 事件判断。补充 OverlayFS 元数据复制的条件。

依据：[cgroup v2](https://docs.kernel.org/admin-guide/cgroup-v2.html)、[OverlayFS](https://docs.kernel.org/filesystems/overlayfs.html)、[Docker 安全](https://docs.docker.com/engine/security/)、[Rootless mode](https://docs.docker.com/engine/security/rootless/)。已加入或保留于参考资料。

人工确认：无。未进行特权容器或内核隔离实验。

### 2. Docker 镜像与 Dockerfile

文件：[docker-images.mdx](../../../docs/devops/containers/docker-images.mdx)。

负责构建、缓存、镜像标识和数据挂载。补充 digest、BuildKit secret mount 和密钥变更的缓存行为。

新增题：`build-secrets-digests`。

修正：COPY --from 支持阶段、镜像和构建上下文。缓存失效沿依赖传播，文件 mtime 不参与该缓存校验。远程软件包更新不会自动刷新缓存。补充 tmpfs 与 swap 的边界。Docker Engine 29 新装默认存储需区分 containerd 数据目录。

依据：[Dockerfile reference](https://docs.docker.com/reference/dockerfile/)、[Cache invalidation](https://docs.docker.com/build/cache/invalidation/)、[Build secrets](https://docs.docker.com/build/building/secrets/)、[Daemon data directory](https://docs.docker.com/engine/daemon/#daemon-data-directory)、[Storage](https://docs.docker.com/engine/storage/)。

人工确认：无。构建配置为教学示例，未下载基础镜像构建应用。

### 3. 故障响应与排查

文件：[incident-response.mdx](../../../docs/devops/incidents/incident-response.mdx)。

负责事故分工、影响定位、止血和恢复验证。复盘机制引用事故复盘文章。补充流量分母、积压、数据完整性与回切检查。

新增题：`recovery-validation`。

修正：变更时间相关性只用于形成假设。回滚需确认配置和数据兼容性。采证需考虑现场成本，不把完整转储设为止血前置条件。错误率下降还需结合流量与业务结果判断。

依据：[Managing Incidents](https://sre.google/sre-book/managing-incidents/)、[Incident Response](https://sre.google/workbook/incident-response/)、[Postmortem Culture](https://sre.google/sre-book/postmortem-culture/)。

人工确认：无。没有模拟生产事故。

### 4. SRE 的职责与工作方式

文件：[sre-practice.mdx](../../../docs/devops/incidents/sre-practice.mdx)。

负责 SRE 职责、Toil、错误预算策略和混沌实验。SLI、SLO 定义与容量方法引用相邻文章。补充预算耗尽后的发布策略和消耗速率。

新增题：`error-budget-policy`。

修正：按重复、可自动化等特征识别 Toil。请求预算与时间预算分别计算。安全修复和恢复动作需保留例外。染色流量仍可能影响共享依赖，实验需设中止条件。

依据：[Eliminating Toil](https://sre.google/sre-book/eliminating-toil/)、[Error Budget Policy](https://sre.google/workbook/error-budget-policy/)、[Alerting on SLOs](https://sre.google/workbook/alerting-on-slos/)、[Principles of Chaos Engineering](https://principlesofchaos.org/)。

人工确认：无。预算规则作为策略示例呈现。

### 5. Kubernetes 架构

文件：[architecture.mdx](../../../docs/devops/kubernetes/architecture.mdx)。

负责控制面分工、调度链路、etcd 恢复和 API 安全。Pod 与网络数据面引用相邻文章。补充认证、RBAC、准入和 Secret 加密。

新增题：`api-security`。

修正：组件间存在直接通信路径。etcd 保存 Kubernetes 对象，不概括为全部业务数据。运行时调用 CNI 配置网络。etcd 故障后已有负载也需考虑后续依赖。按 etcd 3.6 说明 etcdutl 恢复及修订号处理。

依据：[Control Plane–Node Communication](https://kubernetes.io/docs/concepts/architecture/control-plane-node-communication/)、[RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)、[Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)、[etcd 3.6 Disaster recovery](https://etcd.io/docs/v3.6/op-guide/recovery/)。

人工确认：无。未操作真实集群或执行 etcd 恢复。

### 6. Pod：生命周期、探针与资源

文件：[pods.mdx](../../../docs/devops/kubernetes/pods.mdx)。

负责 Pod 沙箱、探针、资源、驱逐和终止。补充原生 sidecar、preStop、共享宽限期、端点传播与请求排空。

新增题：`graceful-termination`。

修正：Pod phase 与容器等待原因分开。默认进程视图相互独立。readiness 变化仍需考虑既有连接。节点驱逐排序结合 requests、Priority 和使用量。PDB 主要约束自愿中断。PreferNoSchedule 是软约束。CPU 利用率 HPA 需有对应 requests。

依据：[Pod Lifecycle](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/)、[Sidecar Containers](https://kubernetes.io/docs/concepts/workloads/pods/sidecar-containers/)、[Node-pressure Eviction](https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/)、[Disruptions](https://kubernetes.io/docs/concepts/workloads/pods/disruptions/)、[Horizontal Pod Autoscaling](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)。原生 sidecar 注明 Kubernetes 1.33 稳定。

人工确认：无。未开展驱逐或终止时序实验。

### 7. 工作负载、Service 与集群网络

文件：[workloads-networking.mdx](../../../docs/devops/kubernetes/workloads-networking.mdx)。

负责工作负载选择、配置更新和网络路径。补充滚动参数、回滚边界、NetworkPolicy 与外部流量策略。

新增题：`rollout-config-update`、`network-policy`、`external-traffic-local`。

修正：StatefulSet 的身份和存储能力与应用复制分开。Deployment 进展超时不会自动回滚。环境变量与卷文件有不同更新行为。Service 代理按端点条件选后端。隧道需满足底层可达和 MTU 条件。注明 IPVS 模式自 Kubernetes 1.35 弃用。区分 ingress-nginx 退役与 Ingress API 生命周期。

依据：[Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)、[ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/)、[Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)、[Virtual IPs and Service Proxies](https://kubernetes.io/docs/reference/networking/virtual-ips/)、[Ingress NGINX Retirement](https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/)。同时补入 Flannel、Calico 和 Cilium 的官方网络资料。

人工确认：无。没有指定生产网络插件，正文按部署模式说明差异。

### 8. Linux 常用命令与文件权限

文件：[commands-permissions.mdx](../../../docs/devops/linux/commands-permissions.mdx)。

负责文本处理、权限和 Shell 组合。补充 umask、ACL mask、重定向顺序与 pipefail。

新增题：`umask-acl`、`shell-redirection`。

修正：删除目录项需要父目录 w 与 x。Sticky 位也允许目录属主及具备特权者操作。umask 根据创建 mode 屏蔽权限。默认 ACL 需按继承规则处理。find 的 `-mtime +7` 对应至少 8 个完整天。

依据：[unlink(2)](https://man7.org/linux/man-pages/man2/unlink.2.html)、[umask(2)](https://man7.org/linux/man-pages/man2/umask.2.html)、[acl(5)](https://man7.org/linux/man-pages/man5/acl.5.html)、[Bash Redirections](https://www.gnu.org/s/bash/manual/html_node/Redirections.html)、[Bash Pipelines](https://www.gnu.org/software/bash/manual/html_node/Pipelines.html)、[Findutils Age Ranges](https://www.gnu.org/software/findutils/manual/html_node/find_html/Age-Ranges.html)。

人工确认：无。umask、重定向和管道状态已用临时容器验证。

### 9. 磁盘与文件系统排查

文件：[disk-filesystem.mdx](../../../docs/devops/linux/disk-filesystem.mdx)。

负责块空间、inode、打开文件和持久化。补充稀疏文件、页缓存、fsync 与目录同步。

新增题：`fsync-sparse-files`。

修正：du 默认统计已分配块，ls 显示逻辑大小。ext4 inode 数量需结合扩容条件说明。截断保留原偏移，后续越过文件尾写入可产生空洞。缓存回收受脏页等条件影响。

依据：[ext4](https://docs.kernel.org/filesystems/ext4/index.html)、[unlink(2)](https://man7.org/linux/man-pages/man2/unlink.2.html)、[truncate(2)](https://man7.org/linux/man-pages/man2/truncate.2.html)、[fsync(2)](https://man7.org/linux/man-pages/man2/fsync.2.html)、[du](https://www.gnu.org/software/coreutils/manual/html_node/du-invocation.html)。

人工确认：无。已验证 unlink 后打开描述符仍可读，以及稀疏文件的大小差异。未做断电持久性实验。

### 10. Linux 网络排查

文件：[network-troubleshooting.mdx](../../../docs/devops/linux/network-troubleshooting.mdx)。

负责监听、连接、抓包、转换规则与请求阶段定位。TCP 状态机制和复用参数引用 TCP 连接文章。补充 curl 累计耗时与指定解析。

新增题：`curl-phase-timing`。

修正：ss 使用精确端口过滤和无表头计数。TTL 表示剩余跳数。单侧抓包证据不足以确定丢包根因。NAT 规则与连接跟踪分工明确。注明 Nginx 1.29.7 起默认代理 HTTP/1.1。HTTPS 指定地址时保留域名以正确处理 SNI。

依据：[ss(8)](https://man7.org/linux/man-pages/man8/ss.8.html)、[tcpdump](https://www.tcpdump.org/manpages/tcpdump.1.html)、[curl Manual](https://curl.se/docs/manpage.html)、[NAT HOWTO](https://www.netfilter.org/documentation/HOWTO/NAT-HOWTO-5.html)、[Nginx proxy module](https://nginx.org/en/docs/http/ngx_http_proxy_module.html)。

人工确认：无。没有抓取主机流量或修改网络参数。

### 11. Linux 性能排查

文件：[performance-troubleshooting.mdx](../../../docs/devops/linux/performance-troubleshooting.mdx)。

负责 CPU、内存、I/O 和任务阻塞的证据组合。JVM 诊断引用对应文章。补充 PSI、单核热点与容器 CPU 限流。

新增题：`psi-throttling`。

修正：load average 包含可运行和不可中断等待任务。主机平均 CPU 会掩盖局部热点及配额。await 包含排队时间，现代设备的 util 需结合并行能力解读。系统级 CPU full 未定义，输出为零。

依据：[proc_loadavg(5)](https://man7.org/linux/man-pages/man5/proc_loadavg.5.html)、[iostat(1)](https://man7.org/linux/man-pages/man1/iostat.1.html)、[PSI](https://docs.kernel.org/accounting/psi.html)、[cgroup v2](https://docs.kernel.org/admin-guide/cgroup-v2.html)。

人工确认：无。未执行主机压力测试。

### 12. 进程管理与信号

文件：[processes-signals.mdx](../../../docs/devops/linux/processes-signals.mdx)。

负责进程创建、回收、信号和 systemd 托管。补充信号递送、普通信号合并、依赖顺序与配置重载。

新增题：`signal-delivery`、`systemd-ordering`。

修正：fork 的私有映射、共享映射和文件描述符分别说明。SIGKILL 需等待任务能处理终止。孤儿进程回收取决于接收者执行 wait。CentOS 6 使用 Upstart。Type=exec 示例注明 systemd 240 起支持。After 与 Requires 分别控制顺序和依赖。

依据：[fork(2)](https://man7.org/linux/man-pages/man2/fork.2.html)、[signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)、[pid_namespaces(7)](https://man7.org/linux/man-pages/man7/pid_namespaces.7.html)、[systemd.unit](https://www.freedesktop.org/software/systemd/man/latest/systemd.unit.html)、[systemd 240 NEWS](https://github.com/systemd/systemd/blob/v240/NEWS)、[RHEL 6 Upstart](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/6/html/migration_planning_guide/sect-networking-upstart)。

人工确认：无。没有修改主机服务或发送进程信号。

### 13. 监控与告警

文件：[monitoring-alerting.mdx](../../../docs/devops/observability/monitoring-alerting.mdx)。

负责指标模型、PromQL 和告警链路。可观测性概念与错误预算策略引用相邻文章。补充分位数聚合、指标缺失和 Pushgateway 生命周期。

新增题：`histogram-aggregation`、`missing-metrics-pushgateway`。

修正：Summary 的分位数与 sum/count 分开。rate 先于聚合处理计数重置。服务错误率按请求数加权。目标消失与 up=0 区分。for、keep_firing_for 与阈值滞回分别说明。Alertmanager 的通知路由与人工升级流程分工明确。

依据：[Histograms and summaries](https://prometheus.io/docs/practices/histograms/)、[Query functions](https://prometheus.io/docs/prometheus/latest/querying/functions/)、[Alerting rules](https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/)、[When to use the Pushgateway](https://prometheus.io/docs/practices/pushing/)、[Alertmanager](https://prometheus.io/docs/alerting/latest/alertmanager/)。

人工确认：无。PromQL 已按官方函数语义核对，未连接监控实例。

### 14. Nginx 与负载均衡

文件：[nginx-load-balancing.mdx](../../../docs/devops/traffic/nginx-load-balancing.mdx)。

负责代理、负载均衡、连接容量和故障诊断。补充超时重试、URI 替换、可信代理与请求限流。

新增题：`connection-capacity`、`proxy-timeout-retry`、`proxy-uri-realip`、`request-rate-limit`。

修正：事件驱动仍需考虑阻塞工作。删除 DR 性能的无条件排序。FULLNAT 注明实现扩展来源。no live upstreams 对应 502。proxy_read_timeout 限制相邻读取等待。upstream keepalive 是每 worker 的空闲连接缓存。POST 重试需结合请求发送状态及副作用。

依据：[Upstream module](https://nginx.org/en/docs/http/ngx_http_upstream_module.html)、[Proxy module](https://nginx.org/en/docs/http/ngx_http_proxy_module.html)、[Core functionality](https://nginx.org/en/docs/ngx_core_module.html)、[Real IP module](https://nginx.org/en/docs/http/ngx_http_realip_module.html)、[Request limiting](https://nginx.org/en/docs/http/ngx_http_limit_req_module.html)、[Alibaba LVS](https://github.com/alibaba/LVS)。

人工确认：无。未部署代理或进行吞吐基准测试。

## 验证

使用本地已有 `mysql:8.4` 镜像的 Bash 工具环境。覆盖 entrypoint，没有启动数据库。容器禁用网络，无主机端口和目录挂载。测试目录使用 tmpfs，退出后自动删除。

通过的实验断言：

- umask 022 下，0666 创建的文件为 0644，0777 创建的目录为 0755。
- 两种重定向顺序得到不同的标准错误目标。
- 默认管道状态与启用 pipefail 的失败状态符合示例。
- unlink 后名称消失，打开描述符仍能读取，链接数为零。
- 稀疏文件逻辑大小为 1048576 字节，已分配块数为零。

已确认临时容器 `coding101-batch14-check` 不再存在。

检查命令：

```sh
node scripts/check-article-format.mjs --style-strict -- \
  docs/devops/containers/container-principles.mdx \
  docs/devops/containers/docker-images.mdx \
  docs/devops/incidents/incident-response.mdx \
  docs/devops/incidents/sre-practice.mdx \
  docs/devops/kubernetes/architecture.mdx \
  docs/devops/kubernetes/pods.mdx \
  docs/devops/kubernetes/workloads-networking.mdx \
  docs/devops/linux/commands-permissions.mdx \
  docs/devops/linux/disk-filesystem.mdx \
  docs/devops/linux/network-troubleshooting.mdx \
  docs/devops/linux/performance-troubleshooting.mdx \
  docs/devops/linux/processes-signals.mdx \
  docs/devops/observability/monitoring-alerting.mdx \
  docs/devops/traffic/nginx-load-balancing.mdx
npm run build
git diff --check
```

- 严格检查：14 篇，0 篇结构问题，0 篇文风提示。
- 标识核对：原有 43 道卡片、公司列表和来源注释全部保留。
- 构建通过：链接、复习资源、岗位和面经数据检查均通过。Docusaurus 已生成静态文件。
- 本次全站格式检查：268 篇，0 篇结构问题，0 篇文风提示。
- `git diff --check` 通过。最终改动为 14 篇文章和本记录。
- 构建仍提示既有博客作者、摘要及 Node localStorage 警告。Docusaurus 更新检查受配置目录权限限制。上述提示不影响构建，未改动全局配置。

## 未完成与人工确认

无阻塞事项。逐篇验证范围已列出。现有面经来源保持原样，本批未重新认证其公司归属。新增机制以官方文档和源码为依据，没有把文档核对写成运行测试。
