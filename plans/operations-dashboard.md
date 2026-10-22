# Coding 101 运营数据与本地看板

运营数据用于判断三个问题：是否吸引了目标读者、读者是否持续使用、使用是否转化为收入。第一版先提供可靠的流量、账户和订阅概览，再补学习事件与收入流水。

## 1. 当前交付与运行方式

已实现本地看板、只读聚合采集脚本和基础日报生成。代码在 `operations/`，与公开 Docusaurus 站点分离，不进入 `build/`。2026-10-20 已接通生产账户库、学习库与 GA4，三个来源均完成真实采集。

```bash
npm run ops:collect
npm run ops:dashboard
```

看板地址为 `http://127.0.0.1:4318`，每分钟重读本地结果；刷新视图不会查询数据库。采集退出码 0 表示三个来源均成功，2 表示部分来源未配置或失败但已保存本次状态，1 表示配置或输出失败。退出码 2 不代表业务指标为零。

本机配置：`~/.config/coding101-operations/config.json`，模板为 `operations/config.example.json`。凭证只填入这个仓库外文件，权限设为 `600`。也支持环境变量 `OPS_ACCOUNT_DATABASE_URL`、`OPS_LEARNING_DATABASE_URL`、`GA4_PROPERTY_ID`、`OPS_GOOGLE_SERVICE_ACCOUNT_FILE`；`CODING101_OPS_CONFIG` 可以覆盖配置文件路径。

结果保存在 `~/.local/share/coding101-operations/`，可由 `CODING101_OPS_DATA_DIR` 覆盖：`report.json` 供看板和 Skill 读取，`report.md` 是基础日报，`snapshots/<采集时间>.json` 保存每次结果。当前不自动删除历史快照。来源读取失败时记录本次失败，不把旧数据标成最新。

## 2. 第一版指标

| 指标 | 来源与口径 | 用途与边界 |
| --- | --- | --- |
| 昨日访客 | 正式域名的 GA4 `totalUsers` | 访问规模，不等于注册人数或真实自然人数 |
| 浏览量 PV、会话 | GA4 `screenPageViews`、`sessions` | 内容消费与访问次数；可能受广告拦截、同意状态和网络影响 |
| 7 / 28 天访客 | 单独查询完整区间去重人数 | 不能累加每日 UV |
| 参与率 | GA4 `engagementRate`，保留在 JSON | 访问质量，不等于完成阅读 |
| 页面排行 | 近 28 天 `pagePath` + PV 前 10 | 决定维护哪些内容 |
| 渠道排行 | 近 28 天 `sessionDefaultChannelGroup` + 会话前 10 | 判断搜索、直接访问和外部渠道贡献 |
| 推广来源、活动、内容 | 会话级手动 UTM 维度，昨日 / 上周同日 / 近 28 天独立查询 | 仅包含可识别活动名称的访问；不代表注册或付费归因 |
| 现存账户、邮箱已验证账户 | `users` 总数及 `emailVerified` | 不导出邮箱；删除账户后数量会减少 |
| 新增账户 | `users.createdAt` 按北京时间分日 | 当前仍存在的记录，后续删除会改变历史值 |
| 有效订阅用户、合同数 | 正式 SKU 的有效订阅，分别按人去重和按合同计数 | active 且到期日为空或在未来；canceled 仍在期内；past_due 在配置宽限期内 |
| 自动续费用户 | 有效订阅中 active 且未设置期末取消 | 当前续费意向，不保证扣款成功 |
| 取消续费用户 | 有效订阅中 canceled 或期末取消 | 当前状态，不是昨日取消事件数 |
| 宽限期用户 | 当前仍有效的 past_due 用户 | 续费风险，不是永久流失 |
| Pro 权益用户 | 有效订阅与当前非试用 grant 的用户并集 | 含激活码、一次性购买、人工赠送，不等于付费订阅 |
| 纯试用用户 | 当前有试用 grant，同时没有 Pro 权益 | 避免已付费但试用未结束时重复归类 |
| 昨日兑换码数量 | 正式 SKU 的 `redemption_codes.redeemedAt` | 不等于购买人数和渠道收入 |
| 有同步记录用户 | `learner_docs` 行数 | 存储覆盖情况，不是活跃人数 |
| 最后同步在昨日 | 当前 `learner_docs.updated_at` 落在昨日 | 今天再同步后就不再计入，不能重建每日活跃 |
| 数据准备度 | 来源状态、采集时间、GA4 阈值 / 抽样等提示 | 区分零值、未接入、失败与过期数据 |

订阅条件对齐账户仓库 `packages/product/src/domain/access.ts`，默认 SKU 为 `coding101.pro`，宽限期为 3 天。缺少到期日的有效订阅单列。用户可以有多份订阅，各续费状态分类可能交叉。部署策略改变时同步调整配置。

GA4 访客使用 `totalUsers`，与 GA4 网页和屏幕报告默认显示的“活跃用户”不是同一个指标。对账时必须选相同指标；例如 2026-10-19 总用户为 10，网页和屏幕报告活跃用户为 9。

第一版没有排除生产库中的内部测试账户。上线对账前需要明确测试标记，不能凭邮箱猜测或悄悄扣减。

推广链接统一遵循 [UTM 命名规则](utm-conventions.md)。看板按来源＋媒介、活动、来源＋媒介＋活动＋内容展示会话、访客、PV 和参与率，每表最多 20 组。日报展示昨日与近 28 天各表前 5 组，昨日按同维度组合对比上周同日会话绝对变化。缺行或基期榜单之外的分组不补零。各表保留独立查询状态、总行数与 GA4 元数据；推广查询失败不丢弃已成功的全站流量，采集退出码为 2。

## 3. 下一阶段指标与采集缺口

建议以“每周有效学习用户”为产品使用的核心指标：一周内完成至少一次卡片自评或模拟测试的去重用户。当前没有可靠事件，不用同步人数代替。

| 指标 | 定义与必要前提 |
| --- | --- |
| 学习 DAU / WAU | 按行为发生时间，对完成有效学习动作的用户按日 / 周去重 |
| 激活率 | 同一注册批次中，7 天内完成首个有效学习动作的人数 / 该批注册人数 |
| D1 / D7 留存 | 首次有效学习用户在第 1 / 7 个自然日再次学习的比例；未到观察日期标记未成熟 |
| 试用转付费率 | 同一试用批次，在固定窗口内首次实付人数 / 试用人数；不能混用每日独立总数 |
| 结账转化 | 可关联的结账尝试从发起到成功或失败；不能用支付人数直接除以全站 UV |
| 新付费、续费、退款 | 标准化可信支付事件，按交易 / 退款 ID 幂等，区分首次与续期 |
| 净收款、MRR | 净收款按币种统计收款减退款；MRR 按实际订阅成交价归一，年付除以 12，排除一次性 90 天和激活码 |
| 订阅流失率 | 期初有效付费订阅 cohort 中，到期后未续订的人数 / 期初人数；取消续费与实际流失分开 |
| 激活码渠道销售 | 导入店铺成交、退款与手续费，关联批次 / 渠道；兑换率与收入分开 |
| 搜索曝光、点击、CTR | 后续接入 Search Console；GA4 不能完整提供未点击的搜索曝光 |

`payment_orders` 没有独立 `paidAt`，订阅续费主要更新订阅状态，原始事件保存在 `payment_events`。不能把订单创建时间当支付日期，也不能仅求和当前 paid 订单就称为全部收入。后续从可信 webhook 建立支付事实，包含交易 ID、发生时间、首次 / 续费、币种、实付、退款、税费口径与测试标记，覆盖部分退款、重放和乱序验证。

学习状态是可更新的 JSON，模拟测试仅保留最近 50 条。后续添加可去重的学习事件或每日用户活动事实，包含事件 ID、发生时间、接收时间、内部用户键、动作及 Topic / Card ID。至少记录卡片自评和模拟测试完成；在业务操作成功后记录，处理重试与离线迟到，不保存答案文本或邮箱。保留策略与用户删除一起设计。

## 4. 安全与只读接入

```text
账户库 ─ 独立只读角色 ─┐
学习库 ─ 独立只读角色 ─┼─ 本机 collect.mjs ─ 本地聚合 JSON ─ Dashboard
GA4 ── Viewer 授权 ───┘                              └─ 运营 Skill / 日报
```

不新增公网运维接口可以减少入口。安全提升来自最小权限、凭证隔离和聚合输出；数据库仍有连接端点，用管理员账号直查会扩大泄露后的影响。

采集器执行固定 SQL、只读事务和 15 秒 SQL 超时，拒绝管理员或 public 表写权限角色，账户角色不得读取邮箱和认证表。该检查用于防止误用应用账号，不代替数据库侧权限审计。查询增长后再考虑预聚合或只读副本。

看板只监听 loopback，限制 Host 和固定文件路径，不提供任意 SQL、配置读取或采集写入接口。配置、密钥、快照位于仓库外，前端只收到聚合结果。远程 PostgreSQL 连接应使用验证证书的 TLS，例如 `sslmode=verify-full`。

以下角色及列权限已于 2026-10-20 在生产配置。角色使用 SQL 创建，密码只保存在本机受限配置中，不写入提交或聊天。不要使用 Neon 控制台创建的默认管理角色作为采集账号。

账户库 `account_coding101`：

```sql
CREATE ROLE c101_ops_account LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE
  NOREPLICATION NOBYPASSRLS CONNECTION LIMIT 3;
GRANT CONNECT ON DATABASE account_coding101 TO c101_ops_account;
GRANT USAGE ON SCHEMA public TO c101_ops_account;
GRANT SELECT (id, "createdAt", "emailVerified") ON users TO c101_ops_account;
GRANT SELECT ("userId", sku, status, "cancelAtPeriodEnd", "currentPeriodEnd")
  ON subscriptions TO c101_ops_account;
GRANT SELECT ("userId", sku, source, "startsAt", "endsAt")
  ON access_grants TO c101_ops_account;
GRANT SELECT (id, sku) ON redemption_batches TO c101_ops_account;
GRANT SELECT ("batchId", status, "redeemedAt") ON redemption_codes TO c101_ops_account;
ALTER ROLE c101_ops_account SET default_transaction_read_only = on;
ALTER ROLE c101_ops_account SET statement_timeout = '15s';
ALTER ROLE c101_ops_account SET idle_in_transaction_session_timeout = '30s';
```

学习库 `coding101`：

```sql
CREATE ROLE c101_ops_learning LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE
  NOREPLICATION NOBYPASSRLS CONNECTION LIMIT 3;
GRANT CONNECT ON DATABASE coding101 TO c101_ops_learning;
GRANT USAGE ON SCHEMA public TO c101_ops_learning;
GRANT SELECT (updated_at) ON learner_docs TO c101_ops_learning;
ALTER ROLE c101_ops_learning SET default_transaction_read_only = on;
ALTER ROLE c101_ops_learning SET statement_timeout = '15s';
ALTER ROLE c101_ops_learning SET idle_in_transaction_session_timeout = '30s';
```

只授予必要列，不自动授权未来表，不加入应用或管理角色组。更严格的后续方案是汇总视图加视图 SELECT 权限。只读事务本身不能限制角色原有的读取范围。

GA4 接入步骤：

1. 从 GA4 属性设置获取数字 Property ID；不是代码中的 `G-Q16V88YMHD` Measurement ID。
2. 在 Google Cloud 启用 Google Analytics Data API，为专用服务账号授予 GA4 属性的 Viewer 权限。
3. 将服务账号 JSON 密钥放在本机受限目录，绝对路径填入 `googleServiceAccountFile`。采集器换取只读短期令牌，不写入结果。
4. 核对报表时区为 `Asia/Shanghai`。若不同，先评估历史影响；当前脚本会拒绝混合两套日期，不自动改属性设置。
5. 首次接通后，对照 GA4 自身报告核验相同日期、相同域名的 PV、访客和会话，确认手工 page_view 与增强型衡量没有重复上报。

本机已配置：Google Cloud 项目 `coding101-operations`，启用 Google Analytics Data API；服务账号 `coding101-ops@coding101-operations.iam.gserviceaccount.com` 仅在 Coding101 属性 `447993563` 获得 Viewer 权限，没有授予 Cloud 项目角色。JSON 密钥位于 `~/.config/coding101-operations/google-service-account.json`，文件权限为 `600`，所在目录为 `700`；下载目录中的副本已移走。

代码已有正式站点 page_view 上报逻辑，只能证明已配置，不能证明 GA4 收到了全部流量，也不能代替报表读取权限。

## 5. 自动采集与每日汇报

每天北京时间 10:00，当前聊天的自动任务使用 `coding101-operations` Skill，执行采集并汇报前一天数据。Skill 保留方法，调度器负责唤醒，脚本负责可重复计算。本机任务需要电脑在线、Codex 运行且凭证可用。需要全天候运行时，将采集迁至受控常驻环境，看板继续读取同格式汇总。

账户和权益按采集时点展示，10 点快照不能称为前一天 24 点状态。严格期末存量需要后续午夜快照或状态事件历史。GA4 每次回读最近 28 天，吸收迟到事件与归因变化；昨日标记暂定，较早日期也不保证永久不变。保留阈值、抽样和 other 行丢失提示；无返回行不自动当作零。

日报先说明数据质量，再写流量、注册、当前订阅、内容和渠道变化，最后给最多三条有证据支持的动作。日指标优先比较上周同日；比例同时列分子分母；基期为零不计算增长百分比；小样本只报告绝对变化。按用户要求每日汇报，即使没有异常。不自动外发邮件或发布社交内容。

每日同时汇报 `sources.ga.data.promotion` 的来源、活动和内容统计。以昨日为主，近 28 天作为带日期的补充；无可识别活动、部分失败、尚未采集分别说明。命名规范与详细口径见 [UTM 命名规则](utm-conventions.md)，不要把全站渠道大类当作手动推广来源，也不要将已有注册或收入强行归因到 UTM。

## 6. 验证

`npm run ops:test` 验证时区、缺失值、错误脱敏和本地 HTTP 访问限制。设置 `OPS_TEST_POSTGRES_CONTAINER` 可额外在本地 PostgreSQL 事务中用临时表验证实际 SQL，完成后回滚，不修改已有业务表。

2026-10-20 已用两个生产只读账号分别登录，验证默认只读、聚合查询成功、没有 public 业务表写权限；账户角色读取邮箱列、学习角色读取学习 JSON 均返回权限拒绝。14:11 的完整采集退出码为 0，三个来源全部成功；GA4 返回的时区确认为 `Asia/Shanghai`，五份报表均未返回阈值或抽样提示。

GA4 网页和屏幕报告按主机名 `coding101.linsama.com` 精确过滤后，2026-09-22 至 2026-10-19 的浏览量为 296，昨日浏览量为 10，均与采集结果一致，热门页面前 3 名及浏览量也一致。属性中还存在 `c101-beta.linsama.com`、`linsama.me` 流量，采集器已通过域名过滤排除。此次验证确认读取与聚合链路，尚未执行浏览器事件级埋点审计，不据此宣称全部访问均无漏报或重复。

2026-10-22 11:35（北京时间）的真实采集已验证新增 9 份推广报表：三个范围、三个分组全部返回成功，尚无可识别活动行。已通过推广查询部分失败、基期缺行、维度组合、榜单截断与输出转义测试，并在独立临时数据目录核验有数据时的看板表格。临时数据没有写入真实报告。

同次修改补充公开站点的 UTM 白名单：`page_view` 保留有效推广标签、去掉其他查询参数和锚点，Topic 页面重写网址时保留有效 UTM。已通过参数过滤与异步路由回归测试、类型检查和完整构建；该站点修改已于 2026-10-22 发布。本机到 Google 统计脚本的连接在重试后仍失败，用户确认直接打开脚本也失败，并要求暂时不处理；GA4 接收与活动归因验收暂停，不能标为完整链路通过。Dashboard 与日报采集已在本机生效。发布版本、后续发布覆盖情况与恢复验证见 [UTM 发布记录](operations-utm-release-2026-10-22.md)。

## 参考资料

- [GA4 Data API 入门](https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart)
- [GA4 指标与维度](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema)
- [GA4 数据新鲜度](https://support.google.com/analytics/answer/11198161?hl=en)
- [Google 服务账号 OAuth](https://developers.google.com/identity/protocols/oauth2/service-account)
- [Neon 数据库角色](https://neon.com/docs/manage/roles)
- [本地技能与定时任务的运行条件](https://developers.openai.com/training/walkthroughs/scheduled-tasks)
