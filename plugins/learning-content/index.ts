import fs from 'node:fs/promises';
import path from 'node:path';
import type {LoadContext, Plugin} from '@docusaurus/types';
import type {DocMetadata, LoadedContent} from '@docusaurus/plugin-content-docs';

import {javaInterviewRoadmap} from '../../src/data/interviewRoadmaps/java';
import type {
  ArticleIndex,
  CardDetail,
  CardIndex,
  Domain,
  Priority,
  Role,
} from '../../src/learning/types';
import {compactIndex} from '../../src/learning/compact';
import {parseDoc} from './parse';

/** Sidebars that make up the knowledge tree, in display order. */
const TREE_SIDEBARS = ['basicKnowledgeSidebar', 'systemDesignSidebar'];
/** A top-level category with more articles than this is split into its subcategories. */
const SPLIT_THRESHOLD = 30;

/** Routes served by the learning pages; each receives the card details module. */
const ROUTES: {path: string; component: string}[] = [
  {path: '/topics', component: '@site/src/learning/pages/Topics'},
];

type SidebarItem =
  | {type: 'doc'; id: string}
  | {type: 'category'; label: string; items: SidebarItem[]; link?: {type: string; id?: string}}
  | {type: string};

const PRIORITY_RANK: Record<Priority, number> = {must: 3, common: 2, optional: 1};

function normalizePath(href: string): string {
  return href.split('#')[0].replace(/\/$/, '');
}

function collectDocIds(items: SidebarItem[], skip: Set<string>): string[] {
  const ids: string[] = [];
  for (const item of items) {
    if (item.type === 'doc' && 'id' in item) {
      if (!skip.has(item.id)) ids.push(item.id);
    } else if (item.type === 'category' && 'items' in item) {
      ids.push(...collectDocIds(item.items, skip));
    }
  }
  return ids;
}

function commonDir(ids: string[]): string {
  const parts = ids.map((id) => id.split('/').slice(0, -1));
  const first = parts[0] ?? [];
  let length = first.length;
  for (const other of parts) {
    let i = 0;
    while (i < length && other[i] === first[i]) i += 1;
    length = i;
  }
  return first.slice(0, length).join('/');
}

function buildDomains(items: SidebarItem[], indexDocs: Set<string>, docs: Map<string, DocMetadata>): Domain[] {
  const domains: Domain[] = [];
  const push = (label: string, category: Extract<SidebarItem, {type: 'category'}>) => {
    const articleIds = collectDocIds(category.items, indexDocs).filter((id) => docs.has(id));
    if (!articleIds.length) return;
    const linkId = category.link?.type === 'doc' ? category.link.id : undefined;
    domains.push({
      id: commonDir(articleIds) || linkId || label,
      label,
      permalink: linkId ? docs.get(linkId)?.permalink : undefined,
      articleIds,
    });
  };
  for (const item of items) {
    if (item.type !== 'category' || !('items' in item)) continue;
    const total = collectDocIds(item.items, indexDocs).length;
    const subcategories = item.items.filter((child): child is Extract<SidebarItem, {type: 'category'}> => child.type === 'category');
    if (total > SPLIT_THRESHOLD && subcategories.length) {
      for (const child of subcategories) push(`${item.label} · ${child.label}`, child);
    } else {
      push(item.label, item);
    }
  }
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

export default function learningContentPlugin(context: LoadContext): Plugin {
  return {
    name: 'learning-content',

    async allContentLoaded({allContent, actions}) {
      const docsContent = allContent['docusaurus-plugin-content-docs']?.default as LoadedContent | undefined;
      const version = docsContent?.loadedVersions[0];
      if (!version) throw new Error('learning-content: docs content is not available');

      const docs = new Map(version.docs.map((doc) => [doc.id, doc]));
      const indexDocs = new Set<string>();
      const markIndexDocs = (items: SidebarItem[]) => {
        for (const item of items) {
          if (item.type !== 'category' || !('items' in item)) continue;
          if (item.link?.type === 'doc' && item.link.id) indexDocs.add(item.link.id);
          markIndexDocs(item.items);
        }
      };

      const domains: Domain[] = [];
      for (const sidebarId of TREE_SIDEBARS) {
        const items = (version.sidebars[sidebarId] ?? []) as SidebarItem[];
        markIndexDocs(items);
        domains.push(...buildDomains(items, indexDocs, docs));
      }

      const {roles, byPermalink} = roadmapRoles();
      const articles: Record<string, ArticleIndex> = {};
      const cards: Record<string, CardIndex> = {};
      const details: Record<string, CardDetail> = {};

      for (const domain of domains) {
        for (const docId of domain.articleIds) {
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
      for (const route of ROUTES) {
        actions.addRoute({path: route.path, component: route.component, exact: true, modules: {details: detailsPath}});
      }
    },
  };
}
