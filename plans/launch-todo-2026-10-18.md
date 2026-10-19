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
- [x] Codex：对照当前实现审阅中英文隐私说明、服务条款和站内摘要，修正账号删除、邮箱 HMAC、90 天只读期、邮件服务及支付状态；查询与导出统一通过 `privacy@linsama.com`，由运营者 Linsama 本人处理，收到申请后 30 天内答复 → coding101 #16
- [x] Codex：按 A5 的核验结果（coding101 #15）补齐中英文保存期限及来源：Workers Logs 7 天，邮件发送与路由事件日志 31 天，发送邮件正文预览约 7 天，Neon PITR 6 小时（历史上限 1 GB）；注明生产分支当前无额外 Neon 快照或定时快照计划 → coding101 #16

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
- [ ] Codex（你来启动）：设置用量提醒；查看 Neon、Cloudflare（含邮件服务）的日志与备份保留期
- [ ] 你：GitHub Actions 因账单问题停跑（付款失败或花费上限），到 Billing & plans 处理
- [x] Claude：`limits.cpu_ms` 站点 200、账户 500 → 包含在 coding101 #8、linsama-account #6
- [x] 下线 `c101-beta.linsama.com`：去掉站点 Worker 的自定义域名与账户服务的 `AUTH_TRUSTED_ORIGINS`

## A6. 开放

- [x] 部署账户 Worker 与站点 Worker（`LEARNER_FEATURES=true`）
- [x] Claude：在正式域名走一遍：登录 → 试用 → 同步 → 删除账号 → 同一邮箱重新注册不给试用 → 退出（兑换只测了无效码，真码等第一批生成后再测）
- [ ] 你：决定第一批激活码的数量与渠道；Claude 生成并导出 CSV
