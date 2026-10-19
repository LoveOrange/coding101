# 开放注册任务清单（2026-10-18）

目标：在 `coding101.linsama.com` 开放注册，提供 7 天试用和激活码兑换；在线支付仍关闭（B 段）。背景见 [后台架构](./backend-architecture.md) 第 7、8 节。

负责人：**Claude**（代码、部署、验证）· **Codex**（文案、需要操作网页后台的任务）· **你**（决定、付款、本人身份、收件箱）。

状态：`[ ]` 未开始 · `[~]` 进行中 · `[x]` 完成 · `[!]` 卡住

## A1. 收尾与上线当前改动

- [x] Claude：提交工作区改动（about、contact、privacy、统计、文章广告位、删除示例 blog），两个构建配置都通过 → coding101 #7
- [x] 合并 coding101 #7（A1–A4 的站点改动）

## A2. 合规文本

- [x] Codex：隐私说明补账号部分（中英文）——收集的数据、处理方、保存期限、删除与导出
- [x] Codex：新增服务条款页 `/terms`，页脚加链接
- [x] 隐私联系邮箱 `privacy@linsama.com`，经 Cloudflare Email Routing 转发到运营者邮箱
- [ ] 你：审阅两份文本；确认邮件导出申请由谁、多久内处理
- [ ] 待定：请求日志、邮件日志、数据库备份的保存期限（Cloudflare、Neon 的默认值），确认后补进隐私说明

## A3. 注销账号

- [x] Claude：账户服务 `POST /api/product/account/delete`，仍在续费的订阅返回 409 → linsama-account #4
- [x] Claude：站点 Worker 先删学习记录再转发；账户页“数据与隐私”提供删除，需输入邮箱确认 → coding101 #7
- [x] 合并 linsama-account #4
- [x] Claude：同一邮箱只给一次试用（删除时保留邮箱 HMAC）→ linsama-account #6；隐私与条款文案 → coding101 #8
- [x] 合并 linsama-account #6、coding101 #8；account_coding101 迁移已跑
- [x] 生产验证中发现重新注册后仍显示可试用（`hadTrial: false`），已修 → linsama-account #8

## A4. 验证码邮件

- [x] Claude：发送失败时返回 502，前端提示“验证码邮件没能发出” → linsama-account #5；失败也会记入 Workers 日志
- [x] Claude：同步到 project-skeleton：上游原本没有邮箱验证码，连同整个功能一起推上去 → project-skeleton #10
- [x] 合并 project-skeleton #10
- [x] 合并 linsama-account #5
- [~] 你：用 QQ、163、Gmail、Outlook 各收一次验证码，记录是否进垃圾箱、到达耗时
  - Outlook：1 分钟内到达；纯文本版进垃圾箱（SPF/DKIM/DMARC 均 pass），加 HTML 正文后进收件箱
  - QQ、163、Gmail：待测
- [x] 邮件服务改用 Cloudflare Email Service → project-skeleton #11、linsama-account #7；隐私说明去掉 Resend → coding101 #9
- [x] Claude：linsama.com 开通 Email Sending（`cf-bounce` 子域）；`privacy@`、`support@`、`support-bhxcz@` 转发到 linsama1030@outlook.com
- [x] Claude：验证码邮件加 HTML 正文 → project-skeleton #12、linsama-account #9
- [ ] 你：Cloudflare DNS 把 `_dmarc.linsama.com` 改为 `v=DMARC1; p=quarantine; adkim=r; aspf=r`（当前 `p=none`；SPF/DKIM 已对齐）

## A5. 数据与运维

- [x] 公司数据已导入（生产库 402 行，与私有 JSON 一致）
- [x] 你：升级 Cloudflare Workers Paid
- [!] Codex：设置用量提醒；查看 Neon、Cloudflare（含邮件服务）的日志与备份保留期（2026-10-19 核验；已完成项与阻塞项如下）
  - [x] Cloudflare Workers 请求数提醒：已创建并启用 `Workers requests - 80% included usage`。阈值为每账单月 **8,000,000 次**（包含额度 10,000,000 次的 80%），收件人为 `linsama1030@outlook.com`。来源：[后台提醒](https://dash.cloudflare.com/b6e7aa700efbc27266aa5c45ecc55835/notifications/edit/265f26bb28464d8eaf7fa33e896635b1)、[Workers 定价](https://developers.cloudflare.com/workers/platform/pricing/#workers)。
  - [x] Cloudflare Workers CPU 时间提醒：已创建并启用 `Workers CPU - 80% included usage`。阈值为每账单月 **24,000,000 CPU 毫秒**（包含额度 30,000,000 CPU 毫秒的 80%），收件人为 `linsama1030@outlook.com`。两条提醒均统计整个账户的 Workers Standard 用量，后台触发条件为超过阈值。来源：[后台提醒](https://dash.cloudflare.com/b6e7aa700efbc27266aa5c45ecc55835/notifications/edit/ec288b7d49c04c7e83ae177a4933ac37)、[Workers 定价](https://developers.cloudflare.com/workers/platform/pricing/#workers)。
  - [!] Cloudflare Email Sending 用量提醒：目标为每账单月 **2,400 封**（包含额度 3,000 封的 80%）。后台 Usage based billing 产品列表未提供 Email Sending；邮件页面的 Add Budget Alert 只接受美元金额，无法按邮件数量设置此阈值，因此未创建替代金额提醒。来源：[提醒创建页](https://dash.cloudflare.com/b6e7aa700efbc27266aa5c45ecc55835/notifications/create/billing_usage_alert)、[Email Sending 后台](https://dash.cloudflare.com/b6e7aa700efbc27266aa5c45ecc55835/email-service/sending)、[邮件服务定价](https://developers.cloudflare.com/email-service/platform/pricing/)。
  - [x] Cloudflare Workers Logs / Observability：Workers Paid 的日志保留期为 **7 天**。来源：[Workers Logs 定价与保留期](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#pricing)。
  - [x] Cloudflare Email Sending / Email Routing：发送和路由事件日志均保留 **31 天**；Activity log 使用同一批事件数据，后台预设时间范围最长为 30 天。来源：[事件数据集与保留期](https://developers.cloudflare.com/email-service/observability/metrics-analytics/)、[Activity log](https://developers.cloudflare.com/email-service/observability/logs/)。
  - [x] Cloudflare 发送邮件正文预览：`linsama.com` 的 Email preview 已开启，正文预览保留 **约 7 天**，与事件日志的 31 天分开记录。来源：[后台设置](https://dash.cloudflare.com/b6e7aa700efbc27266aa5c45ecc55835/email-service/sending/8bf73c0ca16e72b2c5755a0349a7593f/bf3456d09eac4b3e9d19ea093d414f91/settings)、[Message preview](https://developers.cloudflare.com/email-service/observability/logs/#message-preview)。
  - [x] Neon 当前套餐：组织 `LinsamaBuilds` 使用 **Free Plan**，每个项目包含 **100 CU-hours/月、1 GB 存储**。项目 `linsama-account`（`long-pine-14026346`）承载 `account_coding101`、`coding101` 两个数据库，额度按项目共享。来源：[Billing 后台](https://console.neon.tech/app/org-damp-sky-06976634/billing)、[项目概览](https://console.neon.tech/app/projects/long-pine-14026346/branches/br-aged-resonance-a19rahpt)、[套餐额度](https://neon.com/docs/introduction/plans)。
  - [!] Neon 计算与存储提醒：80% 目标阈值分别为 **80 CU-hours/月、0.8 GB 存储**。已检查 Billing、项目概览和设置，未找到按计算时长或存储量自定义提醒的入口，因此未设置。官方 Spending notifications 仅支持 Launch / Scale 套餐，按组织的美元消费阈值提醒，不能替代这两项免费额度提醒。来源：[Billing 后台](https://console.neon.tech/app/org-damp-sky-06976634/billing)、[消费通知](https://neon.com/docs/introduction/spending-notifications)。
  - [x] Neon PITR / history retention：`production` 分支当前实际窗口为 **6 小时**；Backup & Restore 显示 `6 hour history window`，Settings → Postgres 的 History window 也设为 6h。Free 的历史记录另受 **1 GB** 上限约束。来源：[恢复后台](https://console.neon.tech/app/projects/long-pine-14026346/branches/br-aged-resonance-a19rahpt/restore)、[项目设置](https://console.neon.tech/app/projects/long-pine-14026346/settings/postgres)、[History window](https://neon.com/docs/postgres/backup-restore/history-window)。
  - [x] Neon 其他备份现状：`production` 的 Backup & Restore 显示 **No snapshots, no schedule set**，当前没有额外快照或定时快照计划。Free 支持 1 个手动快照，但当前未创建；手动快照未指定到期时间时不会自动过期。这里只记录 Neon 后台可见的备份状态，不据此判断是否存在外部导出。来源：[备份后台](https://console.neon.tech/app/projects/long-pine-14026346/branches/br-aged-resonance-a19rahpt/restore)、[快照额度](https://neon.com/docs/introduction/plans#snapshots)、[快照保留规则](https://neon.com/docs/guides/backup-restore#snapshot-retention)。
  - [!] Neon 自动备份计划：后台显示 **Upgrade for schedules**，需付费套餐才能启用；本次未升级或创建计划。来源：[备份后台](https://console.neon.tech/app/projects/long-pine-14026346/branches/br-aged-resonance-a19rahpt/restore)、[Backup & restore](https://neon.com/docs/guides/backup-restore)。
- [ ] 你：GitHub Actions 因账单问题停跑（付款失败或花费上限），到 Billing & plans 处理
- [x] Claude：`limits.cpu_ms` 站点 200、账户 500 → 包含在 coding101 #8、linsama-account #6
- [x] 下线 `c101-beta.linsama.com`：去掉站点 Worker 的自定义域名与账户服务的 `AUTH_TRUSTED_ORIGINS`

## A6. 开放

- [x] 部署账户 Worker 与站点 Worker（`LEARNER_FEATURES=true`）
- [x] Claude：在正式域名走一遍：登录 → 试用 → 同步 → 删除账号 → 同一邮箱重新注册不给试用 → 退出（兑换只测了无效码，真码等第一批生成后再测）
- [ ] 你：决定第一批激活码的数量与渠道；Claude 生成并导出 CSV
