# Handoff: Coding101 视觉方案 v2 → Docusaurus

## 这是什么
Coding101 视觉改版（亮/暗双主题）的设计参考。`Coding101 Redesign.dc.html` 是用 HTML 做的**高保真设计稿**，不是要直接上线的代码。任务是在现有 Docusaurus 站点里，用 Docusaurus 的方式（theme 变量、swizzle 组件、React 页面、MDX）**重建**这些界面。

保真度：**高保真**。颜色、字体、间距、圆角以设计稿为准。

## 产品原则
两条主线，一个界面原则：每屏只做一件事。
- **按主题学习 · 墨绿**（阅读免费，练卡需订阅）：选范围 → 读文章 → 练闪卡 → 核对遗漏 → 补读重练
- **从问题出发 · 朱砂**（订阅）：搜题/开始自测 → 独立作答 → 找薄弱点 → 跳到章节 → 回卡重答
- 内容免费，记录付费；订阅到期后数据只读。

## 界面清单（设计稿里的 data-screen-label）
| 编号 | 界面 | Docusaurus 落地建议 |
|---|---|---|
| 00 / 00b | 用户故事地图 / Pro 复习旅程 | 仅参考，不实现 |
| 01 | 首页（+介绍、怎么用） | `src/pages/index.tsx` |
| 01b | 知识树 | 自定义页面或 swizzle `DocSidebar` |
| 02 | 文章页 | swizzle `DocItem/Layout`、`DocItem/Footer`（文末接卡片入口） |
| 03 / 03r | 卡片 / 桌面复习模式 | `src/pages/review.tsx` + 组件 |
| 04 | 薄弱点 | `src/pages/weak.tsx` |
| 05 | 订阅 · 大陆版 / 海外版 | `src/pages/pricing.tsx`（按地区切换） |
| 06 / 06e | 我的进度 / 到期只读 | `src/pages/progress.tsx` |
| 07 / 07b / 07c / 07s | 账户、兑换激活码、订阅与账单、订阅状态 | `src/pages/account/*` |
| 08 | 免费用户升级 | 弹层组件，复用在付费入口 |
| 10 / 10e | 闪卡库 / 到期只读 | `src/pages/cards.tsx` |
| 11 | 题库 | `src/pages/questions.tsx` |
| 12 / 12b / 12c | 模拟测试 设置 / 作答 / 报告 | `src/pages/exam/*` |

每屏的精确尺寸、文案、状态以 HTML 为准：在浏览器打开 `Coding101 Redesign.dc.html`（与 `support.js` 同目录），或让 Claude Code 直接读源码（全部为内联样式，可直接提取数值）。

## Design Tokens
完整变量见 `custom.css`（已映射到 Infima，可直接替换 `src/css/custom.css`）。

亮色：canvas #E9E6DD · paper #F6F4EE · card #FFFFFF · fill #EFECE4 · border #E2DED3 / #D9D4C7 / #C9C4B6 · mute #9A958A / #6B675E · body #3A3832 · ink #1B1A17 · 朱砂 accent #C2541B（hover #B0461A，tint #FBEDE4） · 墨绿 green #2F5D50（tint #C5D6CE）

暗色：canvas #121110 · paper #1A1917 · card #23221F · body #D6D2C8 · ink #F3F0E8 · accent #E2763E · green #7FB3A2

字体：
- 标题 Noto Serif SC 700/900
- 正文 Noto Sans SC 400/500/700
- 标签、编号、代码 JetBrains Mono 400/600（小号、字距 .12em、大写）

主题：Docusaurus 自带 `data-theme="light|dark"`，变量名与设计稿一致，开启 `colorMode.respectPrefersColorScheme: true` 即对应设计稿的 system 模式。

## 状态与数据（需后端/存储）
- 用户身份、订阅状态（免费 / 订阅中 / 已到期只读）、地区（大陆/海外）
- 卡片掌握状态、复习计划、薄弱点、测试记录
- 原型阶段可先用 localStorage mock，接口再定

## 文件
- `Coding101 Redesign.dc.html` + `support.js`：设计稿（打开即可看全部界面）
- `custom.css`：tokens + Infima 映射
- `CLAUDE.md`：放到 Docusaurus 仓库根目录，给 Claude Code 的项目规则
