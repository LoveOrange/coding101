# Coding 101 推广链接命名规则

UTM 用于区分站外推广带来的访问来源、活动和内容。所有新推广链接填写 `utm_source`、`utm_medium`、`utm_campaign` 和 `utm_content`；不为站内导航、文章互链添加 UTM。

## 1. 通用规则

- 参数名使用上述标准写法；参数值统一使用小写英文、数字和下划线，匹配 `[a-z0-9]+(?:_[a-z0-9]+)*`。不使用中文、空格、大小写混写或临时同义词。
- 同一活动跨平台使用同一个活动名；同一内容版本使用同一个内容名。更换平台只改来源，改变入口位置或素材版本才改内容名。
- 发布后不重命名已有标签。新活动重新编号，历史报表保留原值，不合并大小写或猜测标签含义。
- 不写姓名、邮箱、手机号、用户 ID、真实群名或邀请码。群和合作方使用公开或匿名代号，如 `group01`。
- 每个参数只出现一次；保留目标链接已有的业务参数和 `#` 锚点，把 UTM 放在锚点之前。短链接和二维码使用同一完整目标链接，发布前检查跳转后参数仍在。
- 站点埋点只向 GA4 的页面地址传递上述五个 UTM 参数，值仅接受 1–100 位英文字母、数字、下划线、连字符，并以字母或数字开头；重复参数、自由文本和其他查询参数不转发，页面锚点也不转发。兼容已有大小写和连字符标签，但新链接仍遵守小写与下划线规则。Topic 页面切换保留有效 UTM。此逻辑已随 2026-10-22 的公开站点发布生效；GA4 接收验证状态见 [发布记录](operations-utm-release-2026-10-22.md)。
- 新平台或新媒介先更新本文件的字典。单个值建议不超过 100 个字符，确保标签可读。

## 2. 参数字典

| 参数 | 规则 | 示例 |
| --- | --- | --- |
| `utm_source` | 平台或来源的固定名称 | `zhihu`、`juejin`、`wechat`、`xiaohongshu`、`bilibili`、`github`、`newsletter` |
| `utm_medium` | 推广方式，使用下表的固定值 | `social` |
| `utm_campaign` | `c101_启动年月_主题_目标`；主题可包含下划线 | `c101_202610_java_interview_trial` |
| `utm_content` | `形式_主题_位置_版本`，版本从 `v1` 开始 | `article_hashmap_footer_v1` |
| `utm_term` | 仅付费搜索需要时使用关键词代号，其他推广省略 | `java_interview` |

活动目标首批使用 `visit`（访问）、`signup`（注册）、`trial`（试用）、`purchase`（购买）。目标只是活动命名，不能证明已实现转化，也不代表已具备对应归因。

活动启动年月固定，不因跨月而变化。一次有明确起止周期或主题的推广对应一个活动；要比较两轮推广时建立新活动名，例如增加 `_r2`。形式使用 `article`、`video`、`text`、`card`、`email` 或 `profile`；位置使用 `body`、`footer`、`bio`、`pinned` 或匿名社群编号 `group01` 等。

| 场景 | source | medium | content 示例 |
| --- | --- | --- | --- |
| 知乎文章末尾 | `zhihu` | `social` | `article_hashmap_footer_v1` |
| 掘金文章末尾 | `juejin` | `social` | `article_hashmap_footer_v1` |
| 微信群分享 | `wechat` | `social` | `text_java_group01_v1` |
| 微信公众号文末 | `wechat` | `social` | `article_java_footer_v1` |
| 小红书个人简介 | `xiaohongshu` | `social` | `profile_java_bio_v1` |
| B 站视频简介 | `bilibili` | `social` | `video_java_body_v1` |
| GitHub README 链接 | `github` | `referral` | `article_java_body_v1` |
| 订阅邮件 | `newsletter` | `email` | `email_java_footer_v1` |
| 付费社交广告（开展时） | 对应平台 | `paid_social` | 按素材和位置填写 |
| 付费搜索（开展时） | 对应搜索平台 | `cpc` | 按素材和位置填写 |
| 链路验证（内部测试） | `qa` | `referral` | `text_topics_probe_v1` |

内部链路验证统一使用 `qa` 来源、`c101_202610_utm_validation_visit` 一类包含 `utm_validation` 的活动名，并登记实际测试时间。该流量保留用于验收，但不能用于评价真实渠道获客效果；全站 GA4 总量可能包含这些验证访问。

不要把普通分享写成 `organic`、`direct` 或 `cpc`。GA4 默认渠道分组还依赖其平台识别规则，不保证所有自定义来源都落入期望大类；Dashboard 的来源/媒介表保留实际手动参数。使用广告平台自动标记时先核验归因配置，不自行覆盖其参数。

## 3. 可直接采用的示例

以下为命名示例，不代表已经开展推广。三条链接属于同一个 Java 面试试用活动。

知乎文章：

```text
https://coding101.linsama.com/topics?utm_source=zhihu&utm_medium=social&utm_campaign=c101_202610_java_interview_trial&utm_content=article_hashmap_footer_v1
```

掘金文章：

```text
https://coding101.linsama.com/topics?utm_source=juejin&utm_medium=social&utm_campaign=c101_202610_java_interview_trial&utm_content=article_hashmap_footer_v1
```

微信群：

```text
https://coding101.linsama.com/topics?utm_source=wechat&utm_medium=social&utm_campaign=c101_202610_java_interview_trial&utm_content=text_java_group01_v1
```

发布前按下面模板登记到本文件；同一个完整链接复用时不重复登记。先填写活动目标和目标页面，再确定标签。新增行的初始状态写“待发布”，实际发布后填写日期和公开内容链接。

| 活动 | 来源 | 媒介 | 内容 | 目标页面 | 目标 | 状态 / 发布日期 | 公开内容链接 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `c101_202610_utm_validation_visit` | `qa` | `referral` | `text_topics_probe_v1` | `/topics` | 内部链路验证 | 2026-10-22 已访问；Google 脚本连接失败，待重试 | 未对外推广 |

## 4. Dashboard 与日报口径

- 从 GA4 读取会话级手动维度：`sessionManualSource`、`sessionManualMedium`、`sessionManualCampaignName`、`sessionManualAdContent`。仅统计正式主机名 `coding101.linsama.com`。
- 三张表分别查询来源＋媒介、活动、来源＋媒介＋活动＋内容。活动表合并同一活动的跨平台访问；内容表保留完整上下文，避免把不同平台的同名内容混在一起。
- 统计范围为昨日、上周同日和近 28 天，均截止到昨日；每个范围独立查询。指标为会话、去重访客、PV、参与率。各行访客不能相加，榜单也不能当作全量合计。
- 只纳入有可识别手动活动名称的记录，排除空值和 GA4 的 `(not set)`、`(direct)`、`(organic)`、`(referral)`、`(none)`、`(other)`。历史自定义活动即使不符合新命名格式也保留原值；缺少来源或内容时显示“未标记/未识别”。仅有 source 而缺少 campaign 的链接不进入推广榜单，后续发布需补齐四项。
- Dashboard 每表展示会话前 20 组，日报展示前 5 组；返回总行数超过展示上限时明确提示。昨日比较上周同日相同维度组合的会话绝对变化；基期失败、缺行或未进入前 20 组时不补零。
- 昨日 GA4 数据标为暂定。缺行不等于零访问，读取失败单独显示；保留阈值、抽样和聚合限制。未标记的历史访问无法补回 UTM；转发可能继承原链接标签，不能据此识别实际转发平台。
- 当前只能衡量访问表现，不能把全站注册、订阅或兑换分配给某个 UTM，也不能计算渠道获客成本、付费转化率或收入。

## 参考资料

- [Google：使用自定义网址收集广告系列数据](https://support.google.com/analytics/answer/10917952?hl=en)
- [GA4 Data API 维度与指标](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema)
- [Google：手动标记与自动标记](https://support.google.com/analytics/answer/11242870?hl=en)
