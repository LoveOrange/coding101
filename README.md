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

`npm run build` 会先检查文档链接，再生成 Docusaurus 静态站点。
