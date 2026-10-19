# 交接卡：改用 Creem 收款（2026-10-19）

交给 **Codex**：合规文案和 Creem 后台的商品与开户资料。账户服务里的 Creem 接入由 Claude 另做，不在本卡范围。

## 最新执行状态（2026-10-19）

用户已确认首发启用 5 折拉新。标价为月付 $7.80、90 天 $19.80、年付 $58；首发价对应 $3.90、$9.90、$29。购买截止时间为北京时间 2026-12-31 23:59:59，月付和年付持续订阅期间保持首发价，取消后重新订阅按当时价格。

网站代码已同步首发价格、优惠规则、订阅与退款条款、支持邮箱、Creem 支付文案和中英文隐私说明。尚需部署并核验线上页面，支付仍关闭；Creem 商品及折扣配置、端到端支付测试与申请提交尚未完成。此前保存的申请草稿中的原价仍为 $7.90、$19、$59，提交前需同步为上述新价格。

## 背景

- Lemon Squeezy 不接受中国大陆身份开店，已放弃。在线支付改走 **Creem**（收款主体，Merchant of Record）。
- Creem 文档写明中国大陆个人可以提现到支付宝。是否接受大陆身份证 KYC 还没验证，以运营者实际注册结果为准。
- 品牌层级：Creem 的 Store 名用 **Linsama Builds**，商品名不带品牌。以后一瞬、Nagi App 放在同一个 Store 下。
- 已定的规则（2026-10-19）：
  - **退款**：首次购买 7 天内无条件全额退款，每个账号限一次，退款后 Pro 立即失效。月付或年付自动续费后 7 天内申请，可以退当期并关闭续费。超过 7 天不按剩余天数折算退款，只能关闭续费，用到当期结束。冲刺首次购买 7 天内可退。
  - **首发价**：首发期内购买的用户锁定首发价，只要不取消订阅，以后续费一直按首发价。首发截止日期 2026-12-31 是购买截止日，到期前根据反馈决定是否延期（同时改 `LAUNCH_ENDS` 和折扣码到期时间）。
- 在线支付开关不变：站点 `CHECKOUT_OPEN` 和账户服务 `PRODUCT_CHECKOUT` 要等 Creem 店铺激活后再打开（见 [后台架构](./backend-architecture.md)）。

## 已完成（分支 `docs/operator-linsama-builds`，未提交）

- `static/privacy/index.html`：运营主体改为"Linsama Builds（个人开发者 Linsama）"，英文为 "Linsama Builds (independent developer Linsama)"
- `src/pages/terms.mdx`：运营主体同样改了
- 页脚和署名里的"由 Linsama 维护"不改
- `npm run build` 已通过

## 待办

- [x] `support@linsama.com` 已经转发到运营者邮箱（见 [开放注册任务清单](./launch-todo-2026-10-18.md) A4）。support 处理账单、退款和扣款疑问，privacy 只处理隐私请求，不要混用。
- [ ] **Codex**：在 `src/pages/terms.mdx` 补"订阅、续费、取消与退款"一节，替换第 21 行"本站当前不开放在线支付……"。要写清楚：
  - 由 Creem 作为收款主体代收，账单上显示的商户名可能不是 Coding 101
  - 月付和年付自动续费，可以在账户页关闭续费，当期结束后不再扣款
  - 冲刺 90 天一次付清，不自动续费
  - 首发五折的购买截止日是 2026-12-31，首发期内购买的订阅续费时一直按首发价，取消后再订阅按当时价格
  - 退款规则按上文"已定的规则"写，申请方式是发邮件到 `support@linsama.com`
  - 第 31 行激活码售后由第三方店铺负责，保留不变
  - "联系方式"一节补上 support@
- [ ] **Codex**：定价页 `src/learning/pages/Pricing.tsx` 在首发优惠显示时补一句"首发期内购买，续费一直按首发价"，同时提一句 7 天内可退款，并链接到条款。
- [ ] **Codex**：隐私说明（中英文）把 Creem 加为支付处理方，说明它收到哪些数据（邮箱、支付信息，卡号不经过本站）。
- [ ] **Codex**：把站点文案里的 Lemon Squeezy 换成 Creem：
  - `src/learning/pages/Billing.tsx:14`
  - `src/learning/pages/Pricing.tsx:147`
  - `plans/backend-architecture.md` 第 182–183 行把"开店前要定的规则"改成已定的首发价规则
  - `plans/backend-architecture.md` 里所有 Lemon Squeezy（手续费按 Creem 改：每笔 3.9% + $0.40，每次提现 $7 或 1% 取较高者，余额满 $50 才能提，每月 1 号和 15 号结算）
- [ ] **Codex**：在 Creem 后台填开户资料并建商品，内容见下文。提交审核前，上面的条款更新要先上线。
- [ ] **Claude**：在 Creem 测试模式里验证长期折扣码的续费行为：续费按折扣价扣款，折扣码到期后已有订阅不受影响。
- [ ] 每项改完都运行 `npm run build`，然后连同已完成的运营主体改动一起开 PR。

## Creem 商品

标价按原价填，首发优惠用一个折扣码：五折、duration 选 `forever`（续费也打折），只对上面三个商品生效，过期时间 2026-12-31（只影响新购买，已有订阅继续按首发价续费）。价格必须和 `src/learning/store.ts` 里的 `PLAN_PRICES` 一致。

| plan | Product Name | 类型 | 标价 |
|---|---|---|---|
| monthly | Coding 101 Pro · Monthly | 订阅，按月 | $7.80 |
| yearly | Coding 101 Pro · Yearly | 订阅，按年 | $58 |
| sprint | Coding 101 Sprint · 3 Months | 一次性付款 | $19.80 |

商品描述里写上 `coding101.linsama.com`，方便用户认出账单上的扣款，减少拒付（每笔拒付收 $25）。上线前用测试卡买一次，确认账单上显示的商户名。

## Creem 开户资料（英文，`[ ]` 由运营者补）

运营者补 `[ ]` 时：职业经历写年限、方向和公司类型，不想写公司名可以写"大型互联网公司"；用户来源有数据就写。月流水宁可稍高也不要填得太低，以免流水上涨时触发风控冻结。

### About you or your business

> I'm Linsama, an independent software developer based in mainland China, operating as **Linsama Builds**, which is the umbrella brand for my indie products at linsama.com. I design, build and run the products myself, from content and engineering to customer support. `[X years as a <backend / Java> engineer at <a large internet company>; interview experience as candidate and interviewer]`
>
> My first paid product is **Coding 101** (coding101.linsama.com), a Chinese-language learning site for software engineers preparing for technical interviews. I started it in May 2024 and it now has 300+ free articles. `[Readers come from <Xiaohongshu / WeChat official account / GitHub / referrals>]` I plan to bring later products, such as a note-taking app, under the same brand and store.
>
> I operate as an individual; there is no registered company yet.
>
> Contact: support@linsama.com

### Product and Platform Details

> **What we sell:** Coding 101 Pro, a digital SaaS subscription delivered instantly through the user's account. There are no physical goods and no downloadable files.
>
> **Free vs. paid:** All articles, interview questions and reference answers are free to read without an account. Pro adds interactive study tools: flashcard practice with answer checking, mock-interview self-tests, weak-spot tracking with spaced repetition, reading progress and a topic progress map, and the companies a question is known to have been asked at.
>
> **Plans** (USD; standard prices below, with a 50% launch discount through December 31, 2026, Asia/Shanghai):
> - Pro Monthly: $7.80/month ($3.90 at launch), auto-renewing, cancel anytime
> - Pro Yearly: $58/year ($29 at launch), auto-renewing
> - Sprint (3 months): $19.80 ($9.90 at launch), one-time for 90 days of Pro, no auto-renewal
>
> New accounts get a 7-day free trial without entering a card. Customers who buy during the launch period keep the launch price on renewals.
>
> **Refunds:** Full refund within 7 days of the first purchase, once per account. Renewal charges can be refunded within 7 days of the charge. Requests go to support@linsama.com.
>
> **Customers:** Chinese-speaking software engineers and computer science students, mostly in mainland China and Singapore.
>
> **Platform:** A website at coding101.linsama.com. Users sign in with an email one-time code. Checkout goes through Creem's hosted checkout. A webhook to our account service (account.linsama.com) grants or revokes Pro access, and users can see their billing history and cancel renewal on their account page.
>
> **Policies:** Terms at coding101.linsama.com/terms; privacy policy at coding101.linsama.com/privacy/.
>
> **Expected volume:** $0–500 per month at launch; average order $4–60.
