# Claude 校验 · 第 20 批（2026-10-30）

范围：运维与 SRE 栏目 15 篇（含栏目首页）。校验后直接修改，Lin 的审阅异步进行。

校验项：

1. 技术事实：逐条对照 Linux man-pages、内核文档、GNU 手册、systemd、Docker、Kubernetes、etcd、Prometheus、nginx 官方文档和 Google SRE 书。
2. 与相邻文章是否矛盾，站内锚点是否存在：205 个站内链接都存在。
3. 参考资料：108 个外部链接。
   - 1 个已失效，已修正，见下文。
   - Netflix 技术博客那篇（Brendan Gregg 的「Linux Performance Analysis in 60,000 Milliseconds」）对脚本和抓取工具都返回 Cloudflare 验证页，没能取回标题，链接保留。
   - 其余都返回对应页面。gnu.org 和 Red Hat 文档第一次请求被限流，之后逐个重新取回。

## 结论

15 篇全部通过，正文没有修改。

| 文章 | 结论 | 修改 |
| --- | --- | --- |
| [运维与 SRE（栏目首页）](../../docs/devops/index.mdx) | ✅ 通过 | — |
| [Linux 性能排查](../../docs/devops/linux/performance-troubleshooting.mdx) | ✅ 通过 | — |
| [Linux 常用命令与文件权限](../../docs/devops/linux/commands-permissions.mdx) | ✅ 已修改 | 1 个参考链接失效 |
| [磁盘与文件系统排查](../../docs/devops/linux/disk-filesystem.mdx) | ✅ 通过 | — |
| [进程管理与信号](../../docs/devops/linux/processes-signals.mdx) | ✅ 通过 | — |
| [Linux 网络排查](../../docs/devops/linux/network-troubleshooting.mdx) | ✅ 通过 | — |
| [容器原理](../../docs/devops/containers/container-principles.mdx) | ✅ 通过 | — |
| [Docker 镜像与 Dockerfile](../../docs/devops/containers/docker-images.mdx) | ✅ 通过 | — |
| [Kubernetes 架构](../../docs/devops/kubernetes/architecture.mdx) | ✅ 通过 | — |
| [Pod：生命周期、探针与资源](../../docs/devops/kubernetes/pods.mdx) | ✅ 通过 | — |
| [工作负载、Service 与集群网络](../../docs/devops/kubernetes/workloads-networking.mdx) | ✅ 通过 | — |
| [监控与告警](../../docs/devops/observability/monitoring-alerting.mdx) | ✅ 通过 | — |
| [SRE 的职责与工作方式](../../docs/devops/incidents/sre-practice.mdx) | ✅ 通过 | — |
| [故障响应与排查](../../docs/devops/incidents/incident-response.mdx) | ✅ 通过 | — |
| [Nginx 与负载均衡](../../docs/devops/traffic/nginx-load-balancing.mdx) | ✅ 通过 | — |

## 修改内容

### Linux 常用命令与文件权限（参考资料）

「GNU Findutils：Age Ranges」原链接 `manual/html_node/find_html/Age-Ranges.html` 现在返回 404。GNU 已把 findutils 手册改为 `manual/html_node/` 下的平铺结构，已改为 `manual/html_node/Age-Ranges.html`，取回的页面标题是「Age Ranges (GNU Findutils 4.11.0)」。

## 已验证的断言

Linux：

- `find -mtime +7` 按向下取整的 24 小时计数，要求大于 7，即至少 8 个整天。
- ACL 的 `mask` 约束命名用户、命名组和属组条目，不约束属主和 `other`。
- `pipefail` 返回最右侧失败命令的状态。
- `SIGCHLD` 的默认处置不同于显式设置 `SIG_IGN`，后者或 `SA_NOCLDWAIT` 会让子进程自动回收。
- RHEL 6 使用 Upstart（Red Hat 迁移指南 4.2.3 节）；`Type=exec` 自 systemd 240 起提供。
- 系统级 PSI 的 CPU `full` 没有定义，输出保持为 0。
- `free` 的 `buff/cache` 包含可回收 slab。
- `tcpdump -s 0` 使用默认截取长度。

容器与 Kubernetes：

- Docker：
  - `COPY` 的缓存校验不看 mtime。
  - secret 内容变化不会使缓存失效。
  - tmpfs 可能进入 swap。
- `pids.max` 计入线程。
- Pod 和发布：
  - Pod 的 phase 只有五种。
  - `preStop` 与应用退出共用终止宽限期（默认 30 秒）。
  - Guaranteed QoS 要求每个容器的 CPU、内存 request 等于 limit。
  - HPA 公式和 `ceil(3 × 80% / 50%) = 5` 的推算正确。
  - 3 副本时 `maxSurge: 25%` 向上取整为 1。
  - 超过 `progressDeadlineSeconds` 后 Deployment 不自动回滚。
- 存储与网络：
  - etcd 3.6 用 `etcdutl snapshot restore` 恢复，并支持 revision bump 和 `--mark-compacted`。
  - IPVS 模式把 VIP 绑在虚拟接口上。
  - `subPath` 挂载不接收 ConfigMap 更新。

监控、SRE 与 nginx：

- 目标从服务发现中消失后，`up` 序列随之消失。
- Pushgateway 保留指标，直到显式删除。
- `keep_firing_for` 不等于迟滞。
- 错误预算：
  - 30 天 99.9% 对应 43.2 分钟。
  - 100 万请求对应 1000 次失败。
  - burn rate 10 时约 3 天耗尽。
- `proxy_http_version`：nginx 1.29.7 起默认 1.1，此前为 1.0（官方文档原文）。
- 上游组只有一个服务器时，`max_fails` 和 `fail_timeout` 被忽略。
- `limit_req` 默认拒绝码为 503。
- `proxy_read_timeout` 限制的是相邻两次读取之间的间隔。
- 已发给上游的非幂等请求默认不换后端重试。

下一批：系统设计。
