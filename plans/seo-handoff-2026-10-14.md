# SEO 交接（2026-10-14）

本文是交给 Codex 的文章级 SEO 任务。站点级配置（sitemap、robots、全站 headTags、canonical）由 Claude 处理，不在本文范围内。

## 1. 现状

- `docs/` 下 365 篇 `.md`/`.mdx`，只有 2 篇有 `description` frontmatter。没有 `description` 时 Docusaurus 会截取正文第一段作为 meta description，大多数文章的第一段是导语或 `面试核心` 列表，不适合作为搜索摘要。
- `keywords` 基本没有。

## 2. 任务

为每篇文章补 frontmatter，不改正文：

```yaml
---
description: 一句话说明这篇讲什么、适合谁，80—120 个汉字。
keywords: [核心概念, 常见别名或英文名, 面试场景词]
---
```

规则：

- `description` 写这篇文章回答的问题和覆盖的范围，包含 1—2 个核心关键词。文风按 `AGENTS.md`：直接陈述，不用“深入浅出”“一文搞懂”“全网最全”之类的标题党写法，不用问句。
- `keywords` 3—6 个：核心概念、英文名或缩写（如 `MVCC`、`AQS`）、读者会搜的面试说法（如 `HashMap 扩容`）。不堆砌，不重复标题原文。
- 已有 `title`、`sidebar_label`、`slug`、`tags` 等字段保持不变，新字段按现有顺序追加。
- 已有 `description` 的 2 篇只检查是否符合上述规则。
- 目录索引页（`index.md`、`_category_` 生成页）同样补 `description`，写成该目录的范围说明。

## 3. 分批与验收

- 按顶层目录分批：`basic-knowledge`、`interview`、`system-design`、`tools-and-frameworks`、`devops`、`leetcode`、`ai`、`chatgpt-guide`、根目录。每批一个提交。
- 每批完成后运行 `npm run build`，确认无报错。
- 全部完成后，下面的命令应输出 0：

```bash
for f in $(find docs -name "*.md" -o -name "*.mdx"); do grep -q "^description:" "$f" || echo "$f"; done | wc -l
```

- 抽查 10 篇的 `build/` 产物，确认 `<meta name="description">` 和 `<meta name="keywords">` 为新写的内容。
