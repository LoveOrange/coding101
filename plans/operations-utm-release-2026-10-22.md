# UTM 正式发布与链路验证

## 当前结果

2026-10-22 14:27（北京时间）已恢复 UTM 修复，正式版本为 `99302b2a-54b4-47f7-9e2c-a8b0e178de2b`，源码提交为 `4487d7c`。Chrome 实际验证：`/topics` 跳转及客户端添加 `domain=network`、`topic=network/http` 后，四项 UTM 均保留。首页、Topic 与账户页均返回 HTTP 200。

正式资源与本次隔离构建逐字节一致：

- `main.1fb3ba6b.js`：SHA-256 `c8ec687fc99a20ae314a864a759d136a3e49e94f8b3f1d7fc980d3ac28e56043`。
- `runtime~main.4eef3a9f.js`：SHA-256 `97f3eebe6cc705913f631b377f0c1b86d87b99718f98c2ce35b97f888acb6bed`。

GA4 接收和活动归因仍未验收，用户要求暂停网络排查。下面保留首次发布、覆盖与恢复过程，不能把首次发布版本当作当前线上版本。

## 首次发布结果

- 正式域名：`https://coding101.linsama.com`，Cloudflare Worker：`coding101`。
- 发布版本：`47cea571-c22e-45db-acd5-36049ec2c918`。
- 发布前版本：`87330d39-3710-495f-a773-77d1fed6325f`，可作为本次回滚目标。
- 使用 `npm run build:production`、`npm run check:discovery`，在 `worker/` 执行 `npm run deploy -- --keep-vars`。账户服务与数据库没有改动。
- 类型检查、完整生产构建、内容发现检查和 10 项运营 / UTM 测试通过；需要本地 PostgreSQL 容器的既有测试未运行。
- 首页、Topic 页、账户页 HTTP 状态均为 200。
- 正式 Topic 页面引用的 `runtime~main.37562341.js` 和 `main.5aece45a.js` 均与本地生产构建逐字节一致；主包 SHA-256 为 `8d674d726a5abf90bcdc47809c87e7925d94b3399f7649ec5a90346102fa14ca`。

## 验证链接

```text
https://coding101.linsama.com/topics?utm_source=qa&utm_medium=referral&utm_campaign=c101_202610_utm_validation_visit&utm_content=text_topics_probe_v1
```

这是内部测试，未向用户推广。后续 GA4 中出现 `qa` / `utm_validation` 流量时，必须标为验证访问，不能用于评价获客效果。

## 首次发布验证

1. 2026-10-22 11:49（北京时间）在内置浏览器访问，11:50 在 Chrome 复核。
2. `/topics` 跳转到 `/topics/` 后四项 UTM 保留；客户端添加 `domain=algorithms`、`topic=algorithms/foundations` 时，四项 UTM 仍保留。
3. 两个浏览器加载 `https://www.googletagmanager.com/gtag/js?id=G-Q16V88YMHD` 均返回 `net::ERR_CONNECTION_CLOSED`，未捕获到 GA4 `g/collect` 请求。命令行对该域名的 TLS 连接也失败。
4. 验证前 Coding101 GA4 实时概览显示过去 30 分钟活跃用户为 0。由于本次脚本未成功加载，不能把站点访问成功当作 GA4 已接收。
5. 已请求用户检查代理 / 广告拦截设置，恢复 `www.googletagmanager.com` 与 `*.google-analytics.com` 的访问。本次没有修改网络或拦截设置，也没有手工注入 Measurement Protocol 事件替代浏览器验收。

## 后续发布覆盖与本次处理

2026-10-22 14 时（北京时间）重试时发现：

- 11:51 的后续版本 `70687ebe-c767-4ca2-b274-5973d6a50dba` 覆盖了首次修复。浏览器实际加载 `main.ef0b95ce.js`，其中 `page_view` 再次仅使用 origin + pathname；Topic 页也再次删除 UTM。
- Wrangler 本机发布日志表明，该次部署来自另一套工具的临时源码目录，未包含 UTM 修复。没有直接回滚该版本；本次从已提交的 `4487d7c` 导出隔离源码，重新构建，保留正式账户与购买功能配置。工作区未提交的 CSS 修改没有纳入发布。
- Google 标签脚本仍报 `net::ERR_CONNECTION_CLOSED`，没有捕获到 GA4 收集请求。用户也确认脚本地址无法直接打开，并明确要求暂时不处理。网络排查与 GA4 接收验收已暂停。
- 隔离源码的完整生产构建、内容发现检查、类型检查与 10 项测试通过；既有 PostgreSQL 容器测试跳过。

## 恢复网络后可继续的验收

以下为未完成项目，当前不主动重试。

- 网络恢复后重新打开验证链接，记录 `page_view` 请求的 `tid`、`dl` 与四项 UTM，以及 Google 接收端 HTTP 状态。
- 在属性 `447993563` 的实时用户概况中核对事件和页面地址；实时 API 不提供会话级 UTM 四个维度，不能据此声称活动归因已处理完。
- GA4 标准报告完成处理后，核对手动来源 `qa`、媒介 `referral`、活动和内容；次日正常 `ops:collect` 应读到该日已识别的活动记录。尚未返回行时保持“待处理 / 待验证”。
