# GEO 内容发现与引用支持

Coding 101 的 GEO 支持以公开原文为基础，让搜索引擎和 AI 检索工具找到文章、读取答案，并引用稳定的页面地址。内容继续面向技术岗位求职与面试准备，技术准确性、版本条件和参考资料由原文章维护。

## 当前实现

| 入口 | 用途 | 内容来源 |
| --- | --- | --- |
| `/articles/` | 无需 JavaScript 的公开文章目录，展示标题、摘要和原文链接。 | Docusaurus 已发布文档元数据与现有知识树分组。 |
| `/llms.txt` | 简短说明站点范围，链接岗位路线、主题目录与完整索引。 | 构建插件与当前公开文章分组。 |
| `/llms-index.txt` | 列出全部公开文章的标题、规范 URL 和最新摘要。 | 与文章目录相同的数据。 |
| `/robots.txt` | 允许抓取，并声明当前部署的 sitemap 地址。 | 构建时根据站点配置生成；`static/` 中的显式规则优先。 |
| 文章内的 JSON-LD | 标明页面身份、摘要、语言、更新时间与站点关系。 | 当前文章元数据。 |

声明 `knowledge.id` 的技术文章使用 `TechArticle` 和 `LearningResource`，并标明用途为技术面试准备。栏目、岗位资料和历史笔记使用 `WebPage`。更新时间沿用页面本身的 Docusaurus 元数据，不额外生成发布日期、作者身份、评分或公司背书。

面试题保留翻卡入口，同时通过原文中的“本页题目与参考回答”提供原生折叠阅读。题目与答案直接存在于 HTML 中，原有题目锚点继续可用；打开题目链接会展开外层列表，参考回答仍默认收起。主题页在 JavaScript 加载前也提供文章目录入口。

文章目录和文本索引排除草稿与 `unlisted` 文档。生成文件只放入构建产物，不另外维护一套文章正文。文档更新后，下一次构建自动同步标题、摘要和 URL。

## 验证与部署

```sh
npm run typecheck
npm run build
npm run check:discovery
```

GitHub Pages 的构建与检查：

```sh
npm run build -- --config docusaurus.github-pages.config.ts
npm run check:discovery
```

`check:discovery` 核对全部公开文章的目录链接、文本索引、HTML 摘要、结构化数据与 sitemap，并检查题目锚点、原页折叠阅读和主题页的静态入口。GitHub Actions 在构建后执行这一检查。

开发服务器与生产构建同时运行时，可通过 `DOCUSAURUS_GENERATED_FILES_DIR_NAME` 指定独立生成目录，并设置 `DOCUSAURUS_NO_PERSISTENT_CACHE=1`，避免共享导航产物和旧缓存影响验证。

上线后需要检查实际域名上的页面、索引与 robots 响应，并确认 CDN 没有阻止搜索爬虫。`robots.txt` 只在域名根目录生效；部署在 `/coding101/` 等子路径时，子路径内的文件不能替代该域名根目录的 robots 配置。搜索抓取与模型训练是不同用途，是否允许训练应按站点自己的政策单独配置。

2026-10-15 的核验结果：类型检查、默认配置构建、GitHub Pages 配置构建与两份产物的 `check:discovery` 均通过。检查覆盖 363 篇公开文章、268 篇技术文章的结构化数据和 877 个稳定题目锚点。浏览器验证了关闭 JavaScript 后展开题目与参考回答、题目链接自动展开定位，以及 390 像素宽度下文章目录没有横向溢出。文章源文件和知识树数据没有修改。

依赖管理器另报告 82 条现存安全审计告警，尚未逐项复核。本次只将原有的 `@docusaurus/utils-common@3.10.2` 声明为直接依赖，以复用框架的 URL 规范化规则，没有升级依赖或执行自动修复。

## 效果评估

本次完成的是内容发现与读取支持，尚未代表线上收录或 AI 引用增长。`llms.txt` 是可供工具使用的社区提案，Google AI 搜索不要求这个文件，也不要求专门的结构化数据。

部署后以 Google Search Console 的索引和搜索表现、Bing Webmaster Tools 的 AI Performance 引用情况，以及网站分析中的 AI 来源访问作为观察依据。抽查问题应覆盖真实求职需求，例如 Java 21 虚拟线程的适用边界、InnoDB 锁等待排查和 Agent 工具授权；记录问题、时间、引用 URL 与答案准确性，不把一次问答当作稳定排名。

## 参考资料

- [Google：AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google：结构化数据通用要求](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [OpenAI：搜索与训练爬虫](https://developers.openai.com/api/docs/bots)
- [Anthropic：各类爬虫的用途与控制](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Bing：AI Performance](https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c)
- [Schema.org：TechArticle](https://schema.org/TechArticle)
- [llms.txt 社区提案](https://llmstxt.org/)
