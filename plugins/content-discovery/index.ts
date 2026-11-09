import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import type {LoadContext, Plugin} from '@docusaurus/types';
import type {LoadedContent} from '@docusaurus/plugin-content-docs';
import {normalizeUrl} from '@docusaurus/utils';
import {applyTrailingSlash} from '@docusaurus/utils-common';

import {knowledgeTree} from '../../src/data/knowledgeTree';
import {publishedRoleEntries} from '../../src/data/interviewRoadmaps/outlineCatalog';
import discovery from '../../i18n/en/discovery.json';
import type {ArticleGroup, PublicArticle, DiscoveryRole} from '../../src/discovery/types';
import {readSourceDocs} from './sourceDocs';

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
  let roles: DiscoveryRole[] = [];
  const english = context.i18n.currentLocale === 'en';
  const sitePath = (pathname: string) => normalizeUrl([context.baseUrl, pathname]);
  const absolute = (pathname: string) => new URL(pathname, context.siteConfig.url).href;
  const chineseRoot = context.i18n.localeConfigs[context.i18n.defaultLocale];
  const chinese = (pathname: string) => new URL(applyTrailingSlash(normalizeUrl([chineseRoot.baseUrl, pathname]), context.siteConfig), chineseRoot.url).href;

  return {
    name: 'content-discovery',
    getPathsToWatch: () => [path.join(context.siteDir, 'docs/**/*.{md,mdx}'), path.join(context.siteDir, 'i18n/en/discovery.json')],

    async allContentLoaded({allContent, actions}) {
      const content = allContent['docusaurus-plugin-content-docs']?.default as LoadedContent | undefined;
      const version = content?.loadedVersions[0];
      if (!version) throw new Error('content-discovery: default docs are unavailable');
      const published = (doc: (typeof version.docs)[number]) => !doc.draft && !doc.unlisted && !doc.frontMatter.draft && !doc.frontMatter.unlisted;
      const sourceDocs = english ? await readSourceDocs(context, version) : version.docs;
      const source = new Map(sourceDocs.filter(published).map((doc) => [doc.id, doc]));
      const localizedDocs = version.docs.filter(published);
      const translatedIds = new Set(english ? localizedDocs.map((doc) => doc.id) : []);
      const summaries = discovery.articles as Record<string, {title: string; description: string; sourceDigest: string}>;
      if (english) {
        for (const [id, summary] of Object.entries(summaries)) {
          const doc = source.get(id);
          if (!doc) throw new Error(`content-discovery: English introduction references a missing or nonpublic doc: ${id}`);
          const digest = createHash('sha256').update(doc.title + '\n' + doc.description).digest('hex');
          if (!translatedIds.has(id) && digest !== summary.sourceDigest) throw new Error(`content-discovery: review the English introduction after source metadata changed: ${id}. After reviewing title and description, set sourceDigest to ${digest}`);
        }
        for (const id of translatedIds) if (!source.has(id)) throw new Error(`content-discovery: translation has no public source article: ${id}`);
      }
      const articles = new Map<string, PublicArticle>(localizedDocs
        .map((doc) => [doc.id, {
          id: doc.id,
          title: doc.title,
          description: doc.description,
          permalink: applyTrailingSlash(doc.permalink, context.siteConfig),
          language: english ? 'en' : 'zh-Hans',
          ...(english ? {originalPermalink: new URL(applyTrailingSlash(source.get(doc.id)!.permalink, context.siteConfig), chineseRoot.url).href} : {}),
        }]));
      if (english) {
        for (const [id, summary] of Object.entries(summaries)) {
          // Actual translations always take precedence over discovery-only copy.
          if (articles.has(id)) continue;
          const doc = source.get(id)!;
          articles.set(id, {id, title: summary.title, description: summary.description,
            permalink: new URL(applyTrailingSlash(doc.permalink, context.siteConfig), chineseRoot.url).href,
            language: 'zh-Hans', originalTitle: doc.title});
        }
        roles = publishedRoleEntries.map((role) => {
          const copy = (discovery.roles as Record<string, {title: string; description: string}>)[role.href];
          if (!copy) throw new Error(`content-discovery: missing English role introduction: ${role.href}`);
          return {...copy, permalink: chinese(role.href), status: role.status};
        });
      }
      const placed = new Set<string>();
      groups = [];
      const addGroup = (id: string, title: string, ids: string[]) => {
        const entries: PublicArticle[] = [];
        let totalArticles = 0;
        for (const articleId of ids) {
          if (!source.has(articleId) || placed.has(articleId)) continue;
          placed.add(articleId);
          totalArticles += 1;
          const article = articles.get(articleId);
          if (article) entries.push(article);
        }
        if (totalArticles) {
          const copy = english ? (discovery.groups as Record<string, {title: string; description: string}>)[id] : {title};
          if (!copy) throw new Error(`content-discovery: missing English group introduction for ${id}`);
          groups.push({id, ...copy, totalArticles, articles: entries,
            ...(english ? {browsePermalink: chinese('/articles/') + '#' + id} : {})});
        }
      };
      for (const domain of knowledgeTree) {
        addGroup(domain.id, domain.label, [domain.overview, ...domain.topics.flatMap((topic) => topic.articles)].filter(Boolean));
      }
      for (const [directory, title] of Object.entries(OTHER_GROUPS)) {
        addGroup(`more-${directory}`, title, [...source.keys()].filter((id) => id.startsWith(`${directory}/`)).sort());
      }
      addGroup('site-guide', '站点使用指南', [...source.keys()].sort());

      const dataPath = await actions.createData('article-directory.json', JSON.stringify(groups));
      const rolesPath = await actions.createData('discovery-roles.json', JSON.stringify(roles));
      actions.addRoute({
        path: sitePath('/articles/'),
        component: '@site/src/discovery/ArticleDirectory',
        exact: true,
        modules: {groups: dataPath, roles: rolesPath},
      });
    },

    async postBuild({outDir}) {
      const root = absolute(sitePath('/'));
      const directory = absolute(applyTrailingSlash(sitePath('/articles/'), context.siteConfig));
      const englishRoot = context.i18n.localeConfigs.en;
      const entry = (english ? [
        `# ${context.siteConfig.title}`,
        '',
        '> Technical interview preparation: explanations, examples and self-assessment questions for software engineering candidates.',
        '',
        'Discover the collection through English role and topic introductions, selected article summaries and available full translations. Every article entry identifies the language of its linked full text. An English summary does not mean the full article is translated. Role guides, the question bank and progress tools are in Chinese.',
        '',
        `Free to read. Credit the author, title and original URL when citing. Content-use terms (Chinese): ${chinese('/terms')}#内容与反馈. This index does not grant permission to republish, mirror or commercially reuse full articles.`,
        '',
        '## Reading',
        '',
        `- [Home](${root}): Technical interview preparation and the available English material.`,
        `- [Articles](${directory}): English topic introductions, selected Chinese articles and available English translations.`,
        `- [Article discovery index](${absolute(sitePath('/llms-index.txt'))}): Selected summaries, full-text languages and canonical URLs; not a list of full English translations.`,
        `- [Role guides (Chinese)](${chinese('/interview-roadmaps/')}): Available study directions and their current status.`,
        '',
        '## Role preparation', '',
        ...roles.map((role) => `- [${label(role.title)}](${role.permalink}): Full guide language: zh-Hans (Chinese). ${role.description}`),
        '',
        '## Topics', '',
        ...groups.map((group) => `- [${label(group.title)}](${directory}#${group.id}): ${group.description} ${group.totalArticles} ${group.totalArticles === 1 ? 'article' : 'articles'} in the Chinese collection.`),
        '',
      ] : [
        `# ${context.siteConfig.title}`,
        '',
        '> 面向技术岗位求职者的中文就业准备网站，提供技术文章、面试自测、岗位路线和算法及项目准备资料。',
        '',
        '岗位复习入口见下方列表；建设中与规划中的内容以岗位目录标注为准。路线按必会、常考、按岗选学安排复习，并区分基础回答、原理解释和场景分析。',
        '',
        '技术文章包含定义、执行机制、适用条件、版本边界、示例和参考资料。面试题是学习自测；公司名称仅表示题目曾见于公开复盘，不代表公司的固定题库。招聘资料和历史使用笔记以各页注明的范围为准。',
        '',
        `内容免费阅读；引用请保留作者、标题和原文链接。内容使用说明：${absolute(applyTrailingSlash(sitePath('/terms'), context.siteConfig))}#内容与反馈。索引提供发现入口，不授予全文转载、镜像或商业使用许可。`,
        '',
        '## 阅读入口',
        '',
        `- [站点首页](${root}): Coding 101 的内容与使用入口。`,
        `- [English](${new URL(englishRoot.baseUrl, englishRoot.url).href}): 已发布的英文内容与阅读入口。`,
        `- [岗位面试路线](${absolute(applyTrailingSlash(sitePath('/interview-roadmaps/'), context.siteConfig))}): 根据目标岗位选择复习重点和回答深度。`,
        `- [文章目录](${directory}): 按主题浏览全部公开文章及摘要。`,
        `- [完整文章索引](${absolute(sitePath('/llms-index.txt'))}): 自动同步的文章标题、规范页面地址和内容摘要。`,
        '',
        '## 岗位复习入口',
        '',
        ...publishedRoleEntries.map((role) => `- [${label(role.label)}](${absolute(applyTrailingSlash(sitePath(role.href), context.siteConfig))}): ${role.status === 'building' ? '建设中，已发布内容可开始阅读。' : '按岗位选择复习重点与阅读顺序。'}`),
        '',
        '## 技术主题与资料',
        '',
        ...groups.map((group) => `- [${label(group.title)}](${directory}#${group.id}): ${group.articles.length} 篇公开文章。`),
        '',
      ]).join('\n');
      const index = [
        `# ${context.siteConfig.title} ${english ? 'article discovery index (English introductions)' : '公开文章索引'}`,
        '',
        english ? '> Selected English summaries and published full translations. Each entry states the full-text language; English summaries may link to Chinese originals. Consult the linked article for complete explanations, version scope and sources. Drafts and unlisted articles are excluded.' : '> 每个链接指向文章的规范页面。摘要来自当前文章；版本条件、完整解释与参考资料请见对应原文。草稿和未列出的文章不包含在本索引中。',
        '',
        ...groups.flatMap((group) => [
          `## ${group.title}`, '',
          ...(english ? [`${group.description} Browse ${group.totalArticles === 1 ? 'the article' : `all ${group.totalArticles} articles`} (Chinese): ${group.browsePermalink}`, ''] : []),
          ...group.articles.map((article) => `- [${label(article.title)}](${absolute(article.permalink)}): ${english ? `Full text: ${article.language}. ` : ''}${article.description.replace(/[\r\n]+/g, ' ')}${english && article.originalPermalink ? ` Chinese original: ${article.originalPermalink}` : ''}`),
          '',
        ]),
      ].join('\n');
      await Promise.all([
        fs.writeFile(path.join(outDir, 'llms.txt'), entry),
        fs.writeFile(path.join(outDir, 'llms-index.txt'), index),
      ]);

      if (english) return;
      // Keep any explicit robots policy supplied through static/ authoritative.
      const robots = path.join(outDir, 'robots.txt');
      try {
        // Discovery policy only: private API data still requires server-side access checks.
        await fs.writeFile(robots, [
          `# Content use: ${absolute(applyTrailingSlash(sitePath('/terms'), context.siteConfig))}#内容与反馈`,
          'User-agent: *',
          'Allow: /',
          `Disallow: ${sitePath('/api/')}`,
          '',
          ...Object.values(context.i18n.localeConfigs).map((locale) => `Sitemap: ${new URL(normalizeUrl([locale.baseUrl, '/sitemap.xml']), locale.url).href}`),
          '',
        ].join('\n'), {flag: 'wx'});
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
      }
    },
  };
}
