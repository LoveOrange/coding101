# Claude 校验 · 第 18 批（2026-10-29）

范围：计算机网络栏目 10 篇（含栏目首页）。校验后直接修改，Lin 的审阅异步进行。

校验项：

1. 技术事实：逐条对照文中引用的 RFC、Linux man-pages 与内核文档、Netty 4.2 API、gRPC 和 Protobuf 文档。
2. 与相邻文章是否矛盾，站内锚点是否存在：100 个站内链接都存在。
3. 参考资料：57 个外部链接中，56 个返回对应页面。ISO 的 OSI 参考模型页面对脚本和抓取工具都返回 Cloudflare 验证页（403），没能取回标题；编号 20269 是 ISO/IEC 7498-1:1994 的标准页，链接保留。

## 结论

| 文章 | 结论 | 修改 |
| --- | --- | --- |
| [计算机网络（栏目首页）](../../docs/basic-knowledge/network/index.mdx) | ✅ 通过 | — |
| [网络模型](../../docs/basic-knowledge/network/network-models.mdx) | ✅ 通过 | — |
| [IP](../../docs/basic-knowledge/network/ip.mdx) | ✅ 通过 | — |
| [DNS](../../docs/basic-knowledge/network/dns.mdx) | ✅ 通过 | — |
| [TCP 与 UDP](../../docs/basic-knowledge/network/tcp_udp.mdx) | ✅ 通过 | — |
| [TCP 连接](../../docs/basic-knowledge/network/tcp_handshake.mdx) | ✅ 已修改 | 补上 `tcp_tw_recycle` 已从内核删除 |
| [HTTP](../../docs/basic-knowledge/network/http-versions-connection-reuse-timeouts.mdx) | ✅ 通过 | — |
| [TLS](../../docs/basic-knowledge/network/tls.mdx) | ✅ 通过 | — |
| [HTTP 缓存](../../docs/basic-knowledge/network/http-cache.mdx) | ✅ 通过 | — |
| [RPC](../../docs/basic-knowledge/network/rpc-serialization-netty-event-loop.mdx) | ✅ 通过 | — |

## 修改内容

### TCP 连接（6.1 节与 10.6 参考回答）

原文正确区分了 `tcp_tw_recycle` 和 `tcp_tw_reuse`，但只说 `tcp_tw_recycle` 是「旧实现」，读者可能以为现在还能设置它。这个参数在 Linux 4.12 被删除（提交 4396e46187ca「tcp: remove tcp_tw_recycle」），新内核上设置会报找不到 `/proc/sys/net/ipv4/tcp_tw_recycle`。已在正文和参考回答里补上。

## 已验证的断言

IP 与 DNS：

- IPv6 路由器不分片，包过大时回 Packet Too Big；IPv4 在 DF=1 时回「需要分片」，RFC 1191 在其中带回下一跳 MTU。
- RFC 3021 允许 /31 的两个地址都分配。
- 负缓存时长取 SOA 记录 TTL 与 MINIMUM 字段的较小值（RFC 2308）。
- 没有 EDNS 时 UDP DNS 消息上限为 512 字节，截断时设置 TC 位；RFC 7766 要求完整实现支持 TCP。

TCP 与 UDP：

- 快速重传在收到三个重复 ACK 后触发（RFC 5681），RACK 按时间判断丢失（RFC 8985）。
- Linux 的 UDP `recv()` 缓冲区不足时截断数据报，剩余部分丢弃（udp(7)）。
- `listen()` 的 `backlog` 是已完成握手的等待队列长度，超过 `somaxconn` 时被截断（listen(2)）。
- `tcp_fin_timeout` 管理孤儿 `FIN_WAIT_2`，不控制 `TIME_WAIT`。

HTTP 与 TLS：

- HTTP/2 的 DATA 帧同时受流窗口和连接窗口约束，并发流数受 `SETTINGS_MAX_CONCURRENT_STREAMS` 限制。
- HTTP 缓存：
  - 共享缓存优先看 `s-maxage`。
  - 请求带 `Authorization` 时，只有响应写了 `public`、`s-maxage` 或 `must-revalidate` 才可被共享缓存复用。
  - 同时出现两种验证条件时，服务器以 `If-None-Match` 为准。
  - `If-Range` 必须使用强验证器。
- TLS 1.3：
  - 0-RTT 早期数据缺少前向保密，并可能被重放。
  - 纯 PSK 模式缺少 DHE 的保护。
  - 主机名校验以 SAN 为依据（RFC 9525）。

RPC：

- `channel.write` 从管线尾端出发，`ctx.write` 从当前处理器出发。
- `SimpleChannelInboundHandler` 默认自动释放消息。
- `slice()` 和 `duplicate()` 不增加引用计数，`retainedSlice()` 和 `retainedDuplicate()` 会增加。
- 写缓冲高低水位只改变 `isWritable()`，不阻止写入。
- proto3 `optional` 自 Protobuf 3.15 起默认启用。

下一批：操作系统（8 篇）与通用基础。
