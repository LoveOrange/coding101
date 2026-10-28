import fs from 'node:fs/promises';
import path from 'node:path';
import type {LoadContext, Plugin} from '@docusaurus/types';
import type {LoadedContent} from '@docusaurus/plugin-content-docs';
import {normalizeUrl} from '@docusaurus/utils';
import {applyTrailingSlash} from '@docusaurus/utils-common';

import {knowledgeTree} from '../../src/data/knowledgeTree';
import type {ArticleGroup, PublicArticle} from '../../src/discovery/types';

const OTHER_GROUPS: Record<string, string> = {
  interview: '求职与面试准备',
  'basic-knowledge': '基础知识栏目',
  'system-design': '系统设计资料',
  ai: 'AI 与 Agent 开发栏目',
  devops: '运维与 SRE 栏目',
  leetcode: '已有算法题解',
  'tools-and-frameworks': '工具与框架',
  'chatgpt-guide': 'ChatGPT 辅助面试复习',
};

const label = (text: string) => text.replace(/[\r\n]+/g, ' ').replace(/([\\[\]])/g, '\\$1');

export default function contentDiscoveryPlugin(context: LoadContext): Plugin {
  let groups: ArticleGroup[] = [];
  const sitePath = (pathname: string) => normalizeUrl([context.baseUrl, pathname]);
  const absolute = (pathname: string) => new URL(pathname, context.siteConfig.url).href;

  return {
    name: 'content-discovery',

    async allContentLoaded({allContent, actions}) {
      const content = allContent['docusaurus-plugin-content-docs']?.default as LoadedContent | undefined;
      const version = content?.loadedVersions[0];
      if (!version) throw new Error('content-discovery: default docs are unavailable');
      const articles = new Map<string, PublicArticle>(version.docs
        .filter((doc) => !doc.draft && !doc.unlisted && !doc.frontMatter.draft && !doc.frontMatter.unlisted)
        .map((doc) => [doc.id, {
          id: doc.id,
          title: doc.title,
          description: doc.description,
          permalink: applyTrailingSlash(doc.permalink, context.siteConfig),
        }]));
      const placed = new Set<string>();
      groups = [];
      const addGroup = (id: string, title: string, ids: string[]) => {
        const entries: PublicArticle[] = [];
        for (const articleId of ids) {
          const article = articles.get(articleId);
          if (article && !placed.has(articleId)) {
            entries.push(article);
            placed.add(articleId);
          }
        }
        if (entries.length) groups.push({id, title, articles: entries});
      };
      for (const domain of knowledgeTree) {
        addGroup(domain.id, domain.label, [domain.overview, ...domain.topics.flatMap((topic) => topic.articles)].filter(Boolean));
      }
      for (const [directory, title] of Object.entries(OTHER_GROUPS)) {
        addGroup(`more-${directory}`, title, [...articles.keys()].filter((id) => id.startsWith(`${directory}/`)).sort());
      }
      addGroup('site-guide', '站点使用指南', [...articles.keys()].sort());

      const dataPath = await actions.createData('article-directory.json', JSON.stringify(groups));
      actions.addRoute({
        path: sitePath('/articles/'),
        component: '@site/src/discovery/ArticleDirectory',
        exact: true,
        modules: {groups: dataPath},
      });
    },

    async postBuild({outDir}) {
      const root = absolute(sitePath('/'));
      const directory = absolute(applyTrailingSlash(sitePath('/articles/'), context.siteConfig));
      const entry = [
        `# ${context.siteConfig.title}`,
        '',
        '> 面向技术岗位求职者的中文就业准备网站，提供技术文章、面试自测、岗位路线和算法及项目准备资料。',
        '',
        '现有岗位路线覆盖 Java 后端、AI Agent 开发与运维 / SRE。路线按必会、常考、按岗选学安排复习，并区分基础回答、原理解释和场景分析。',
        '',
        '技术文章包含定义、执行机制、适用条件、版本边界、示例和参考资料。面试题是学习自测；公司名称仅表示题目曾见于公开复盘，不代表公司的固定题库。招聘资料和历史使用笔记以各页注明的范围为准。',
        '',
        `内容免费阅读；引用请保留作者、标题和原文链接。内容使用说明：${absolute(sitePath('/terms'))}#内容与反馈。索引提供发现入口，不授予全文转载、镜像或商业使用许可。`,
        '',
        '## 阅读入口',
        '',
        `- [站点首页](${root}): Coding 101 的内容与使用入口。`,
        `- [岗位面试路线](${absolute(applyTrailingSlash(sitePath('/interview-roadmaps/'), context.siteConfig))}): 根据目标岗位选择复习重点和回答深度。`,
        `- [文章目录](${directory}): 按主题浏览全部公开文章及摘要。`,
        `- [完整文章索引](${absolute(sitePath('/llms-index.txt'))}): 自动同步的文章标题、规范页面地址和内容摘要。`,
        '',
        '## 技术主题与资料',
        '',
        ...groups.map((group) => `- [${label(group.title)}](${directory}#${group.id}): ${group.articles.length} 篇公开文章。`),
        '',
      ].join('\n');
      const index = [
        `# ${context.siteConfig.title} 公开文章索引`,
        '',
        '> 每个链接指向文章的规范页面。摘要来自当前文章；版本条件、完整解释与参考资料请见对应原文。草稿和未列出的文章不包含在本索引中。',
        '',
        ...groups.flatMap((group) => [
          `## ${group.title}`, '',
          ...group.articles.map((article) => `- [${label(article.title)}](${absolute(article.permalink)}): ${article.description.replace(/[\r\n]+/g, ' ')}`),
          '',
        ]),
      ].join('\n');
      await Promise.all([
        fs.writeFile(path.join(outDir, 'llms.txt'), entry),
        fs.writeFile(path.join(outDir, 'llms-index.txt'), index),
      ]);

      // Keep any explicit robots policy supplied through static/ authoritative.
      const robots = path.join(outDir, 'robots.txt');
      try {
        // Discovery policy only: private API data still requires server-side access checks.
        await fs.writeFile(robots, [
          `# Content use: ${absolute(sitePath('/terms'))}#内容与反馈`,
          'User-agent: *',
          'Allow: /',
          `Disallow: ${sitePath('/api/')}`,
          '',
          `Sitemap: ${absolute(sitePath('/sitemap.xml'))}`,
          '',
        ].join('\n'), {flag: 'wx'});
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
      }
    },
  };
}
