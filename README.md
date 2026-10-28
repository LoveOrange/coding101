# Coding 101

Coding 101 是一个面向技术岗位求职者的免费就业准备网站。项目按照目标岗位整理复习范围和优先级，并提供技术核心、面试题、算法、项目与系统设计内容。

当前重点建设 [Java 后端开发面试路线](https://coding101.linsama.com/java-interview-roadmap/)。路线中的“必会”是第一轮最小复习集合；“常考”在此基础上补充；“按岗选学”只在 JD 或项目经历相关时进入。

项目不建设职业晋升或通用管理成长内容。面向资深岗位的架构与协作主题，只有在能够直接服务求职面试时才会进入岗位路线。

## 项目规划

- [领域术语与内容模型](./plans/content-model.md)：领域、文章、闪卡、知识点与岗位关联。
- [文章与闪卡知识树](./plans/knowledge-tree/README.md)：方向 → 主题 → 文章 → 原子闪卡，提供完整与分支 Markdown 导图。
- [M1 知识点清单](./plans/knowledge-tree/m1-knowledge-points.md)与[覆盖检查](./plans/knowledge-tree/m1-coverage-review.md)：Java 后端校招考点、正文候选和缺口。
- [面经样本统计](./plans/audits/java-campus/frequency/README.md)：103 篇复盘、287 个考点的样本出现率与逐题来源。
- [项目计划](./plans/product-roadmap.md)：M1 内容与练习、M2 用户与个人学习计划。
- [用户故事地图](./plans/java-campus-user-story-map.md)：按主题学习与从问题出发复习。
- [当前实现与目标对照](./plans/java-campus-gap-analysis.md)：已有能力与待建设内容。

## 内容使用

文章、题目和参考答案免费阅读。欢迎分享原文链接，也可以保存副本用于个人学习。

本仓库公开可见，但未采用开源许可证或 Creative Commons 许可证。原创内容保留权利；全文转载、题库汇编分发、整站镜像或商业使用，请先联系相关权利人取得授权。第三方内容按其原有声明和许可证使用，法律允许的引用等权利及 GitHub 条款赋予的查看、Fork 权利不受影响。

完整说明见 [LICENSE](./LICENSE) 和[服务条款](https://coding101.linsama.com/terms#内容与反馈)，授权联系：support@linsama.com。

## 本地开发

```bash
npm install
npm start
```

## 检查与构建

```bash
npm run typecheck
npm run build
```

`npm run build` 会检查文档链接、文章结构和内容状态，再生成 Docusaurus 静态站点。构建后运行 `npm run check:discovery`，核验公开内容、静态学习入口、规范链接和 sitemap。个人账号、学习记录及练习会话页面使用 `noindex`，不进入 sitemap；主题和题库在 JavaScript 不可用时仍提供文章与题目入口。

`static/_redirects` 维护已合并文章的永久跳转，由 Cloudflare 静态资源服务处理。

## 广告与隐私

生产域名为 `coding101.linsama.com`。构建生成 AdSense 验证标签和 `ads.txt`，发布商为 `ca-pub-9495948352620553`，文章末尾使用展示广告位 `6787548357`。

广告请求默认关闭，验证标签与 `ads.txt` 始终保留。审核通过后，先在 AdSense 后台核实欧洲法规消息的隐私链接、拒绝选项和 Consent Mode，并关闭自动广告，再将 `release/production.json` 的 `ADSENSE_ENABLED` 改为 `"true"`，提交并按统一发布流程上线。

启用后，广告仅在知识树技术文章中、读者接近文章末尾时请求。目录、题库和隐私说明不放置广告；本地与预览域名不请求广告。启用账号功能时，具有有效付费或试用权限的读者不加载广告。

`static/privacy/index.html` 是独立的隐私说明页，不加载统计、广告或同意消息脚本。Google 同意消息的隐私链接应设为 `https://coding101.linsama.com/privacy/`。Analytics 在欧洲经济区、英国和瑞士默认拒绝存储；只有配置 Google CMP 的 Consent Mode 后才会更新同意状态。页面地址仅保留通过白名单校验的 UTM 推广参数，不发送其他查询参数和片段标识。

部署到 Cloudflare 统一运行 `npm run release:production`。先将改动提交、合并并推送到远端 `main`，在干净 checkout 中执行；仅检查时运行 `npm run release:check`。根目录和 `worker/` 的 `npm run deploy` 都转到同一个入口。脚本检查线上源码继承关系、获取远端互斥锁、隔离构建并验收线上版本，具体前提、失败处理和回滚见 [正式发布流程](plans/production-release.md)。禁止直接上传现有 `build/` 或绕过入口运行 Wrangler。

正式构建开关统一保存在 `release/production.json`：账号功能和购买入口开启，广告关闭。修改开关也需要提交和走发布流程；临时 shell 变量不覆盖这些值。GitHub Pages 仅是镜像，独立工作流不会发布 Cloudflare 正式站点。

购买入口还需要账户服务的 `PRODUCT_CHECKOUT=open`。暂停新订单时，先将账户服务的该变量改为 `closed` 并部署；付款回调继续接收，已购买用户的权益保持有效。若需要同时隐藏前端购买按钮，将 `release/production.json` 中的 `CHECKOUT_OPEN` 改为 `"false"`，提交并按统一流程发布站点。
