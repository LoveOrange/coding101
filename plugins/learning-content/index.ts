import fs from 'node:fs/promises';
import path from 'node:path';
import type {LoadContext, Plugin} from '@docusaurus/types';
import {normalizeUrl} from '@docusaurus/utils';
import type {DocMetadata, LoadedContent} from '@docusaurus/plugin-content-docs';

import {javaInterviewRoadmap} from '../../src/data/interviewRoadmaps/java';
import {knowledgeTree} from '../../src/data/knowledgeTree';
import type {
  ArticleIndex,
  CardDetail,
  CardIndex,
  Domain,
  Priority,
  Role,
  Topic,
} from '../../src/learning/types';
import {compactIndex} from '../../src/learning/compact';
import {parseDoc} from './parse';

/** Routes served by the learning pages; each receives the card details module. */
const ROUTES: {path: string; component: string}[] = [
  {path: '/topics', component: '@site/src/learning/pages/Topics'},
  {path: '/review', component: '@site/src/learning/pages/Review'},
  {path: '/questions', component: '@site/src/learning/pages/Questions'},
];

/** Routes that need a learner account; registered only with learnerFeatures. */
const LEARNER_ROUTES: {path: string; component: string}[] = [
  {path: '/weak', component: '@site/src/learning/pages/Weak'},
  {path: '/pricing', component: '@site/src/learning/pages/Pricing'},
  {path: '/progress', component: '@site/src/learning/pages/Progress'},
  {path: '/account', component: '@site/src/learning/pages/Account'},
  {path: '/account/redeem', component: '@site/src/learning/pages/Redeem'},
  {path: '/account/billing', component: '@site/src/learning/pages/Billing'},
  {path: '/cards', component: '@site/src/learning/pages/Cards'},
  {path: '/exam', component: '@site/src/learning/pages/Exam'},
  {path: '/exam/report', component: '@site/src/learning/pages/Report'},
];

const PRIORITY_RANK: Record<Priority, number> = {must: 3, common: 2, optional: 1};

function normalizePath(href: string): string {
  return href.split('#')[0].replace(/\/$/, '');
}

/**
 * Domains for the knowledge tree from src/data/knowledgeTree.ts. Draft docs are
 * skipped (they only exist in development); any other unknown id fails the build.
 */
function buildDomains(docs: Map<string, DocMetadata>, drafts: Set<string>): Domain[] {
  const missing: string[] = [];
  const placed = new Set<string>();
  const domains: Domain[] = [];
  for (const domain of knowledgeTree) {
    const topics: Topic[] = [];
    for (const topic of domain.topics) {
      const articleIds = topic.articles.filter((id) => {
        if (placed.has(id)) throw new Error(`learning-content: ${id} appears twice in the knowledge tree`);
        placed.add(id);
        if (!docs.has(id) && !drafts.has(id)) missing.push(id);
        return docs.has(id);
      });
      if (articleIds.length) topics.push({id: topic.id, label: topic.label, articleIds});
    }
    if (!topics.length) continue;
    domains.push({
      id: domain.id,
      label: domain.label,
      permalink: domain.overview ? docs.get(domain.overview)?.permalink : undefined,
      topics,
      articleIds: topics.flatMap((topic) => topic.articleIds),
    });
  }
  if (missing.length) throw new Error(`learning-content: unknown doc ids in knowledgeTree.ts:\n  ${missing.join('\n  ')}`);
  return domains;
}

function roadmapRoles(): {roles: Role[]; byPermalink: Map<string, {priority: Priority; roles: string[]}>} {
  const roadmaps = [{data: javaInterviewRoadmap, label: 'Java 后端', href: '/java-interview-roadmap/'}];
  const byPermalink = new Map<string, {priority: Priority; roles: string[]}>();
  for (const {data} of roadmaps) {
    for (const phase of data.phases) {
      for (const topic of phase.topics) {
        for (const article of topic.articles) {
          if (!article.href) continue;
          const key = normalizePath(article.href);
          const current = byPermalink.get(key);
          const priority =
            current && PRIORITY_RANK[current.priority] >= PRIORITY_RANK[topic.priority] ? current.priority : topic.priority;
          const roles = new Set(current?.roles ?? []);
          roles.add(data.id);
          byPermalink.set(key, {priority, roles: [...roles]});
        }
      }
    }
  }
  return {roles: roadmaps.map(({data, label, href}) => ({id: data.id, label, href})), byPermalink};
}

export default function learningContentPlugin(context: LoadContext, options: {learnerFeatures?: boolean} = {}): Plugin {
  return {
    name: 'learning-content',

    async allContentLoaded({allContent, actions}) {
      const docsContent = allContent['docusaurus-plugin-content-docs']?.default as LoadedContent | undefined;
      const version = docsContent?.loadedVersions[0];
      if (!version) throw new Error('learning-content: docs content is not available');

      const docs = new Map(version.docs.map((doc) => [doc.id, doc]));
      const domains = buildDomains(docs, new Set(version.drafts.map((doc) => doc.id)));

      const {roles, byPermalink} = roadmapRoles();
      const articles: Record<string, ArticleIndex> = {};
      const cards: Record<string, CardIndex> = {};
      const details: Record<string, CardDetail> = {};

      for (const domain of domains) {
        for (const docId of domain.articleIds) {
          const topic = domain.topics.find((item) => item.articleIds.includes(docId))!;
          const doc = docs.get(docId)!;
          const source = await fs.readFile(path.join(context.siteDir, doc.source.replace(/^@site\//, '')), 'utf8');
          const parsed = parseDoc(source);
          const knowledge = (doc.frontMatter as {knowledge?: {id?: string}}).knowledge;
          const articleKey = knowledge?.id ?? doc.id;
          const roadmap = byPermalink.get(normalizePath(doc.permalink));

          const h2s = parsed.headings.filter((heading) => heading.depth === 2);
          const sectionOf = (line: number) => [...h2s].reverse().find((heading) => heading.line <= line)?.id ?? '';

          const cardIds: string[] = [];
          for (const card of parsed.cards) {
            const id = `${articleKey}#${card.anchor}`;
            const refs = card.related.flatMap((anchor) => {
              const heading = parsed.headings.find((item) => item.id === anchor);
              return heading
                ? [{id: heading.id, title: heading.title, number: heading.number, section: sectionOf(heading.line)}]
                : [];
            });
            const index: CardIndex = {
              id,
              articleId: doc.id,
              anchor: card.anchor,
              question: card.question,
              label: refs[0]?.title ?? doc.title,
              companies: card.companies,
              checkpointCount: card.checkpoints.length,
              refs,
            };
            cards[id] = index;
            details[id] = {...index, checkpoints: card.checkpoints, answer: card.answer};
            cardIds.push(id);
          }

          articles[doc.id] = {
            id: doc.id,
            knowledgeId: knowledge?.id,
            title: doc.title,
            permalink: doc.permalink,
            domainId: domain.id,
            topicId: topic.id,
            minutes: parsed.minutes,
            priority: roadmap?.priority,
            roles: roadmap?.roles ?? [],
            sections: h2s.map(({id, title, number}) => ({id, title, number})),
            cardIds,
            interviewAnchor: parsed.interviewAnchor,
          };
        }
      }

      actions.setGlobalData(compactIndex({domains, articles, cards, roles}));

      const detailsPath = await actions.createData('card-details.json', JSON.stringify(details));
      for (const route of options.learnerFeatures ? [...ROUTES, ...LEARNER_ROUTES] : ROUTES) {
        actions.addRoute({path: normalizeUrl([context.baseUrl, route.path]), component: route.component, exact: true, modules: {details: detailsPath}});
      }
    },
  };
}
