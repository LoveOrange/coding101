import {createHash} from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import type {LoadContext, Plugin} from '@docusaurus/types';
import {normalizeUrl} from '@docusaurus/utils';
import type {DocMetadata, LoadedContent} from '@docusaurus/plugin-content-docs';

import {agentInterviewRoadmap} from '../../src/data/interviewRoadmaps/agent';
import {javaInterviewRoadmap} from '../../src/data/interviewRoadmaps/java';
import {sreInterviewRoadmap} from '../../src/data/interviewRoadmaps/sre';
import {knowledgeTree} from '../../src/data/knowledgeTree';
import moves from '../../src/data/contentMoves.json';
import type {
  ArticleIndex,
  CardDetail,
  CardIndex,
  CardRef,
  Domain,
  Priority,
  Role,
  Topic,
} from '../../src/learning/types';
import {compactIndex} from '../../src/learning/compact';
import {parseDoc, type ParsedDoc} from './parse';

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

const KNOWLEDGE_ID = /^[a-z0-9]+(?:[.-][a-z0-9]+)*$/;
const CARD_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function knowledgeOf(doc: DocMetadata): {id?: string} | undefined {
  return (doc.frontMatter as {knowledge?: {id?: string}}).knowledge;
}

/** Level-2 section containing the heading at `line`. */
function sectionOf(parsed: ParsedDoc, line: number): string {
  const h2s = parsed.headings.filter((heading) => heading.depth === 2 && heading.line <= line);
  return h2s[h2s.length - 1]?.id ?? '';
}

/** Retired ids in src/data/contentMoves.json must point at content that exists. */
function checkMoves(cards: Record<string, CardIndex>, articles: Record<string, ArticleIndex>): string[] {
  const errors: string[] = [];
  const articleKeys = new Set(Object.values(articles).map((article) => article.knowledgeId ?? article.id));
  for (const [from, to] of Object.entries(moves.cards as Record<string, string>)) {
    if (cards[from]) errors.push(`contentMoves.json: card ${from} still exists; remove the move or the card`);
    if (!cards[to]) errors.push(`contentMoves.json: card ${from} moves to ${to}, which does not exist`);
  }
  for (const [from, to] of Object.entries(moves.articles as Record<string, string>)) {
    if (articleKeys.has(from)) errors.push(`contentMoves.json: article ${from} still exists; remove the move or the article`);
    if (!articleKeys.has(to)) errors.push(`contentMoves.json: article ${from} moves to ${to}, which does not exist`);
  }
  return errors;
}

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
  const roadmaps = [
    {data: javaInterviewRoadmap, href: '/java-interview-roadmap/'},
    {data: agentInterviewRoadmap, href: '/agent-interview-roadmap/'},
    {data: sreInterviewRoadmap, href: '/sre-interview-roadmap/'},
  ];
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
  return {roles: roadmaps.map(({data, href}) => ({id: data.id, label: data.label, href})), byPermalink};
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
      // Roadmap hrefs are site-relative; permalinks include the baseUrl.
      const sitePath = (doc: DocMetadata) => normalizePath('/' + doc.permalink.slice(context.baseUrl.length));
      const articles: Record<string, ArticleIndex> = {};
      const cards: Record<string, CardIndex> = {};
      const details: Record<string, CardDetail> = {};
      const errors: string[] = [];

      // Parse every tree article first so cards can point into any of them.
      const treeIds = domains.flatMap((domain) => domain.articleIds);
      const sourcePathOf = (doc: DocMetadata) => path.join(context.siteDir, doc.source.replace(/^@site\//, ''));
      const byPath = new Map(treeIds.map((id) => [sourcePathOf(docs.get(id)!), id]));
      const parsedDocs = new Map<string, ParsedDoc>();
      for (const id of treeIds) parsedDocs.set(id, parseDoc(await fs.readFile(sourcePathOf(docs.get(id)!), 'utf8')));

      const knowledgeIds = new Map<string, string>();
      for (const doc of version.docs) {
        const knowledgeId = knowledgeOf(doc)?.id;
        if (knowledgeId === undefined) continue;
        if (!KNOWLEDGE_ID.test(knowledgeId)) errors.push(`${doc.id}: knowledge.id "${knowledgeId}" must be lowercase words joined by "." or "-"`);
        const other = knowledgeIds.get(knowledgeId);
        if (other) errors.push(`${doc.id}: knowledge.id "${knowledgeId}" is already used by ${other}`);
        knowledgeIds.set(knowledgeId, doc.id);
      }

      for (const domain of domains) {
        for (const docId of domain.articleIds) {
          const topic = domain.topics.find((item) => item.articleIds.includes(docId))!;
          const doc = docs.get(docId)!;
          const parsed = parsedDocs.get(docId)!;
          const knowledgeId = knowledgeOf(doc)?.id;
          if (knowledgeId === undefined) {
            errors.push(`${docId}: knowledge tree articles need a knowledge.id in front matter`);
            continue;
          }
          const roadmap = byPermalink.get(sitePath(doc));
          const h2s = parsed.headings.filter((heading) => heading.depth === 2);

          const cardIds: string[] = [];
          for (const card of parsed.cards) {
            const where = `${docId}#${card.anchor}`;
            const report = (message: string) => errors.push(`${where}: ${message}`);
            if (!card.explicitId) {
              report('card heading needs an explicit id, e.g. "### 6.1 问题 {#short-name}"');
            } else if (!CARD_ID.test(card.anchor)) {
              report(`card id "${card.anchor}" must be lowercase words joined by "-"`);
            }

            const refs: CardRef[] = [];
            for (const link of card.related) {
              const targetId = link.path ? byPath.get(path.resolve(path.dirname(sourcePathOf(doc)), link.path)) : docId;
              if (!targetId) {
                report(`相关内容 links to ${link.path}, which is not an article in the knowledge tree`);
                continue;
              }
              const target = parsedDocs.get(targetId)!;
              if (!link.anchor) {
                refs.push({articleId: targetId, id: '', title: docs.get(targetId)!.title, section: ''});
                continue;
              }
              const heading = target.headings.find((item) => item.id === link.anchor);
              if (!heading) {
                report(`相关内容 anchor #${link.anchor} does not exist in ${targetId}`);
                continue;
              }
              refs.push({articleId: targetId, id: heading.id, title: heading.title, number: heading.number, section: sectionOf(target, heading.line)});
            }
            if (!refs.length) report('相关内容 needs at least one link to the explanation');
            if (card.composite && new Set(refs.map((ref) => `${ref.articleId}#${ref.section}`)).size < 2) {
              report('a composite question must point to at least two sections or articles');
            }

            const id = `${knowledgeId}#${card.anchor}`;
            if (cards[id]) errors.push(`${where}: card id ${id} is used twice`);
            const local = refs.find((ref) => ref.articleId === docId && ref.id);
            const index: CardIndex = {
              id,
              articleId: doc.id,
              anchor: card.anchor,
              question: card.question,
              label: card.composite ? '综合题' : (local ?? refs[0])?.title || doc.title,
              companies: card.companies,
              checkpointCount: card.checkpoints.length,
              refs,
              ...(card.composite ? {composite: true} : {}),
            };
            cards[id] = index;
            const rev = createHash('sha1').update(card.source).digest('hex').slice(0, 8);
            details[id] = {...index, checkpoints: card.checkpoints, answer: card.answer, rev};
            cardIds.push(id);
          }

          articles[doc.id] = {
            id: doc.id,
            knowledgeId,
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

      // Roadmap dialogs are not server-rendered, so the broken-link check never sees these hrefs.
      const docPaths = new Set(version.docs.map(sitePath));
      for (const href of byPermalink.keys()) {
        if (href.startsWith('/docs/') && !docPaths.has(href)) errors.push(`interview roadmap links to ${href}, which is not a doc`);
      }
      errors.push(...checkMoves(cards, articles));
      if (errors.length) throw new Error(`learning-content: ${errors.length} content problem(s):\n  ${errors.join('\n  ')}`);

      actions.setGlobalData(compactIndex({domains, articles, cards, roles}));

      const detailsPath = await actions.createData('card-details.json', JSON.stringify(details));
      for (const route of options.learnerFeatures ? [...ROUTES, ...LEARNER_ROUTES] : ROUTES) {
        actions.addRoute({path: normalizeUrl([context.baseUrl, route.path]), component: route.component, exact: true, modules: {details: detailsPath}});
      }
    },
  };
}
