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
- [ ] 待定：请求日志、邮件日志、数据库备份的保存期限（Cloudflare、Resend、Neon 的默认值），确认后补进隐私说明

## A3. 注销账号

- [x] Claude：账户服务 `POST /api/product/account/delete`，仍在续费的订阅返回 409 → linsama-account #4
- [x] Claude：站点 Worker 先删学习记录再转发；账户页“数据与隐私”提供删除，需输入邮箱确认 → coding101 #7
- [x] 合并 linsama-account #4
- [x] Claude：同一邮箱只给一次试用（删除时保留邮箱 HMAC）→ linsama-account #6；隐私与条款文案 → coding101 #8
- [ ] 你：合并 linsama-account #6、coding101 #8（#6 部署前要先在 account_coding101 上跑迁移）

## A4. 验证码邮件

- [x] Claude：发送失败时返回 502，前端提示“验证码邮件没能发出” → linsama-account #5；失败也会记入 Workers 日志
- [x] Claude：同步到 project-skeleton：上游原本没有邮箱验证码，连同整个功能一起推上去 → project-skeleton #10
- [ ] 你：合并 project-skeleton #10
- [x] 合并 linsama-account #5
- [ ] 你：用 QQ、163、Gmail、Outlook 各收一次验证码，记录是否进垃圾箱、到达耗时
- [x] 邮件服务改用 Cloudflare Email Service → project-skeleton #11、linsama-account #7；隐私说明去掉 Resend → coding101 PR
- [ ] Claude：`wrangler email sending enable linsama.com`，并建立 `privacy@` 转发规则（需要你先运行 `wrangler login` 补授权）
- [ ] Claude：送达率不好时收紧 DMARC（当前 `p=none`），检查 SPF/DKIM 对齐

## A5. 数据与运维

- [x] 公司数据已导入（生产库 402 行，与私有 JSON 一致）
- [x] 你：升级 Cloudflare Workers Paid
- [ ] Codex（你来启动）：设置用量提醒；查看 Neon、Cloudflare、Resend 的日志与备份保留期
- [x] Claude：`limits.cpu_ms` 站点 200、账户 500 → 包含在 coding101 #8、linsama-account #6
- [ ] 你：决定 `c101-beta.linsama.com` 保留为预发环境还是下线（它和正式站共用同一个 Worker 和数据库）

## A6. 开放

- [ ] Claude：部署账户 Worker（`wrangler deploy --env coding101`），再用 `LEARNER_FEATURES=true` 构建并部署站点 Worker
- [ ] Claude：在正式域名走一遍：登录 → 试用 → 兑换 → 同步 → 删除账号 → 退出
- [ ] 你：决定第一批激活码的数量与渠道；Claude 生成并导出 CSV
