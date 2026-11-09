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

## 2026-11：静态发现入口与国际化

岗位路线保留原有弹窗，同时提供原生 `details` 阅读目录，所有已发布的核心阅读和深入阅读链接都存在于首屏 HTML 中。无 JavaScript 时也可以展开目录阅读；没有发布的文章仍标为建设中。关于页、使用指南与 `llms.txt` 的岗位入口共用 `outlineCatalog.ts`，避免人工分别维护路线数量。

线上抽查发现旧 HashMap 入口返回 200 和空正文，实际只包含跳转信息。同类的 11 个合并文章入口统一补充 Cloudflare `_redirects` 301；镜像站保留 `noindex`、目标 canonical、meta refresh 和可读的新地址链接。旧入口不再进入 sitemap。原有章节和卡片 ID 不变。

HTTP 复核还发现，Workers 会将无尾斜杠的目录地址以 307 跳转到带 `/` 的地址，而此前 Docusaurus 的默认配置生成无尾斜杠的 canonical。现在显式使用 `trailingSlash: true`，让 canonical、sitemap、内链和合并文章的重定向目标都指向实际返回 200 的地址。旧地址仍可访问，文章路径和 ID 不变；线上审计会检查 canonical 与最终 HTTP 地址是否一致。

新增 `npm run audit:crawl`，检查线上 robots、其声明的各语言 sitemap、首页／目录／岗位路线以及均匀抽取的文章。报告包含 HTTP 状态、canonical、noindex、静态正文与通用客户端探测。直接执行 `node scripts/audit-crawl.mjs > /tmp/coding101-crawl.json` 可保留 JSON 结果。它只检查公开 HTTP 响应，不等同于搜索引擎已经收录，也不伪装成经过验证的搜索机器人。

本次观察到默认 `Python-urllib/3.9` 请求被 Cloudflare 返回 403/1010，而明确标识的审计客户端和浏览器请求正常。现有 Wrangler 凭据不能读取该 zone 的安全设置，未更改 Browser Integrity Check 或 WAF。实际搜索机器人是否受到影响，仍需结合 Search Console 的实时 URL 检查与 Cloudflare 已验证机器人请求记录判断。不能根据 User-Agent 字符串探测成功就宣称 Googlebot、OAI-SearchBot 或 Claude 已经抓取。

### 英文试点范围

中文继续使用现有 URL；英文使用 `/en/`。首批提供首页、关于页、文章目录、使用指南和 DNS，共五个可索引页面。英文文章完整翻译正文、题目和参考回答；账号、复习队列、题库与岗位筛选仍使用中文入口，不生成中文正文的英文 URL 副本。

`i18n/en/catalog.json` 明确列出已发布译文，Docusaurus 只构建这些英文源文件。英文和中文各有独立的 canonical、sitemap、`llms.txt` 和 `llms-index.txt`；根 robots 同时声明两份 sitemap。仅在确有对应语言页面时输出双向 hreflang；文章的英文简介不算全文译文。未翻译页面的语言菜单指向英文首页，并标明 `English home`。切换语言不携带原语言的章节锚点，因为章节锚点随正文语言变化。

增加译文时：

1. 在 `i18n/en/docusaurus-plugin-content-docs/current/` 或 `i18n/en/docusaurus-plugin-content-pages/` 下添加完整译文，并加入 catalog。文档相对路径与中文保持一致；自定义 slug 需要同时扩展路由映射和校验。
2. 保留 `knowledge.id` 和题目显式 ID；普通章节使用英文锚点，更新文内链接。尚未翻译的延伸阅读使用 `ChineseLink` 并明确标注中文。
3. 新领域在 `i18n/en/discovery.json` 的 `groups` 中提供英文名称与简介，使用知识领域的稳定 ID；缺少介绍时构建会报错。新增学习功能需要翻译完整流程，不能仅开放中文功能的 `/en/` 地址。
4. 校对后运行 `npm run content-status -- mark en done <中文 docs 路径>`。中文源文后续修改会使翻译状态过期，需重新核对。
5. 运行类型检查、构建和 `npm run check:discovery`。检查包括全部中文内容、英文精确页面集合、无翻译回退、双向 hreflang、独立 canonical、静态正文、题目 ID 与原生折叠答案。GitHub Pages 子路径构建也执行同一检查。

`SiteMetadata` 和语言菜单基于 Docusaurus 3.10.2 的对应主题组件，增加对实际译文集合的过滤；升级主题时需核对这两个覆盖组件。

### 英文内容发现入口

`/en/articles/` 同时展示岗位与主题介绍、已发布的英文全文，以及配有英文简介的中文原文。目录覆盖现有 7 个岗位入口、28 个知识领域和额外资料分组；首批为 34 篇代表性文章提供英文简介，保留原有 2 篇全文译文。没有增加独立路线页或文章的英文空壳 URL。

- 岗位链接和建设状态来自 `publishedRoleEntries`，分组、阅读顺序及各组文章数量来自知识树和公开文档；英文文案集中维护在 `i18n/en/discovery.json`，不另建路线或复制知识正文。
- `articles` 以 Docusaurus doc ID 关联中文原文，仅保存英文标题、摘要和 `sourceDigest`。摘要校验值是中文元数据 `title + '\n' + description` 的 SHA-256；元信息变化后构建会报出需复核的条目及新校验值。先阅读新源信息并调整英文摘要，再更新校验值，不能只为通过检查批量刷新。
- 未翻译文章显示 `Read in Chinese` 和原文标题，使用中文 canonical；译文显示 `Read in English` 并保留中文原文链接。跨语言链接使用普通 HTML 锚点，保留镜像站的子路径和岗位筛选参数。
- 全文译文加入发布清单后，目录自动优先采用译文的实际标题、摘要与 URL。对应的简介条目可以删除；尚未清理的旧简介不覆盖译文，也不重复产生文章入口。正文翻译状态仍由 `content-status` 管理，英文简介不将 `en` 状态标为完成。
- HTML 目录与英文文本索引共用构建数据；文本索引逐条标注 `Full text: en` 或 `Full text: zh-Hans`。完整中文目录仍列出全部公开文章，英文目录通过分组链接提供完整集合入口。
- `sourceDocs.ts` 复用 Docusaurus 3.10.2 的元数据解析方法，只读取中文源信息，不注册路由。它保留编号目录、`index` 文档与自定义 slug 的规则；框架升级时应核对导入的内部 API。译文路由映射目前仍遵守上文的同路径约定。

`check:i18n` 同时验证英文简介与全文译文的语言、实际 canonical、静态 HTML 链接、全主题覆盖、岗位筛选参数、中文原文链接和镜像路径。它仍要求英文 sitemap 只包含实际发布的英文页面，不把简介当作文章译文声明 hreflang。

这些入口用于帮助读者和检索工具发现内容，不意味着必然被索引或引用。Google 明确说明其搜索不使用 `llms.txt`；HTML 可访问性、内容质量及真实抓取与收录仍是主要验证对象。

## 参考资料

- [Google：AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google：生成式 AI 搜索优化指南](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google：多语言网站](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- [Google：结构化数据通用要求](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [OpenAI：搜索与训练爬虫](https://developers.openai.com/api/docs/bots)
- [Anthropic：各类爬虫的用途与控制](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Bing：AI Performance](https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c)
- [Schema.org：TechArticle](https://schema.org/TechArticle)
- [llms.txt 社区提案](https://llmstxt.org/)
