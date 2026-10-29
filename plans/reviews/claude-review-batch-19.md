# Claude 校验 · 第 19 批（2026-10-29）

范围：操作系统栏目 8 篇（含栏目首页），加上基础知识首页和通用基础复习，共 10 篇。至此基础知识栏目全部完成。校验后直接修改，Lin 的审阅异步进行。

校验项：

1. 技术事实：逐条对照 Linux man-pages、内核文档、POSIX 与 OSTEP。
2. 与相邻文章是否矛盾，站内锚点是否存在：109 个站内链接都存在。
3. 站点页面：文中引用的岗位路线页面都存在。
4. 参考资料：40 个外部链接都返回对应页面。

## 结论

| 文章 | 结论 | 修改 |
| --- | --- | --- |
| [基础知识](../../docs/basic-knowledge/index.mdx) | ✅ 通过 | — |
| [通用基础复习](../../docs/basic-knowledge/common/index.mdx) | ✅ 已修改 | 岗位路线现状过时 |
| [操作系统（栏目首页）](../../docs/basic-knowledge/operating-system/index.mdx) | ✅ 通过 | — |
| [进程与线程](../../docs/basic-knowledge/operating-system/processes-threads.mdx) | ✅ 通过 | — |
| [线程同步](../../docs/basic-knowledge/operating-system/synchronization.mdx) | ✅ 通过 | — |
| [死锁](../../docs/basic-knowledge/operating-system/deadlock.mdx) | ✅ 通过 | — |
| [虚拟内存](../../docs/basic-knowledge/operating-system/virtual-memory.mdx) | ✅ 通过 | — |
| [文件描述符](../../docs/basic-knowledge/operating-system/file-descriptors.mdx) | ✅ 通过 | — |
| [I/O 模型](../../docs/basic-knowledge/operating-system/io-models.mdx) | ✅ 通过 | — |
| [I/O 多路复用](../../docs/basic-knowledge/operating-system/io-multiplexing.mdx) | ✅ 已修改 | 6.2 的相关内容多链了一个无关小节 |

## 修改内容

### 通用基础复习（自检与下一步）

原文写「当前可使用 Java 后端开发面试路线。其他岗位路线尚在规划」。站点现在已有 AI Agent 工程（`/agent-interview-roadmap/`）和运维 / SRE（`/sre-interview-roadmap/`）两条路线，见 `src/data/interviewRoadmaps/outlineCatalog.ts`。已改成三条路线，并按路线目录的说明注明 SRE 路线部分主题仍在编写。

### I/O 多路复用（6.2 相关内容）

「select 的 1024 限制是连接数上限吗？」的相关内容同时链到「单次通知与工作线程」，那一节讲 `EPOLLONESHOT`，与本题无关，已删去。

## 已验证的断言

进程、同步与死锁：

- `fork` 后子进程只保留调用线程，在 `exec` 前只应调用异步信号安全函数。
- 孤儿进程由子收割器或 `init` 收养。
- `pthread_cond_wait` 原子释放互斥锁并等待，返回前重新取得锁；允许虚假唤醒。
- 银行家算法示例：总量 10，P1 持 5、最多需要 7，P2 持 3、最多需要 9。先给 P1 时存在安全序列 P1 → P2；先给 P2 时两者各持 5，剩余为 0，处于不安全状态。数字已逐一推算。

虚拟内存与文件描述符：

- `MAP_PRIVATE` 使用写时复制，修改不写回文件；`MAP_SHARED` 的修改对其他共享映射可见，落盘另需 `msync`。
- RSS 按进程重复计入共享页，PSS 按共享者分摊。
- `dup` 和 `fork` 共享打开文件描述，包括偏移和 `O_NONBLOCK`；`FD_CLOEXEC` 属于单个描述符，`dup` 新建的描述符没有这个标志。
- Linux 上 `close` 返回错误时编号也已释放，不应重试。
- `EMFILE` 对应进程的 `RLIMIT_NOFILE`，`ENFILE` 对应系统上限。

I/O：

- 对正长度的 TCP `recv`，返回 0 表示对端有序关闭；UDP 允许零长度数据报。
- 普通文件上的 `O_NONBLOCK` 不能消除磁盘等待。
- glibc 的 `FD_SETSIZE` 为 1024，限制的是 fd 编号。
- `EPOLLONESHOT` 交付一次事件后需要用 `EPOLL_CTL_MOD` 重新启用。

下一批：DevOps。
