import type {ArticleIndex, CardIndex, CardRef, LearningIndex, Priority, Role, SectionIndex} from './types';

/**
 * Compact wire format for the learning index in global data. Global data ships
 * with every page, so articles and cards are stored as tuples and card ids are
 * rebuilt from the article key and anchor.
 */

type SectionTuple = [id: string, title: string, number?: string];
/** Title is omitted when the ref points at the section heading itself. */
type RefTuple = [id: string, number: string, section: number, title?: string];
type CardTuple = [anchor: string, question: string, label: string, companies: string[], checkpoints: number, refs: RefTuple[]];
type ArticleTuple = [
  title: string,
  permalink: string,
  domain: number,
  minutes: number,
  priority: Priority | 0,
  roles: string[],
  sections: SectionTuple[],
  knowledgeId: string | 0,
  interviewAnchor: string | 0,
  cards: CardTuple[],
];

export type CompactIndex = {
  roles: Role[];
  domains: {id: string; label: string; permalink?: string; a: string[]}[];
  a: Record<string, ArticleTuple>;
};

function sectionTuple({id, title, number}: SectionIndex): SectionTuple {
  return number ? [id, title, number] : [id, title];
}

export function compactIndex(index: LearningIndex): CompactIndex {
  const domainIndex = new Map(index.domains.map((domain, i) => [domain.id, i]));
  const a: Record<string, ArticleTuple> = {};
  for (const article of Object.values(index.articles)) {
    const sectionIndex = new Map(article.sections.map((section, i) => [section.id, i]));
    const cards = article.cardIds.map((cardId): CardTuple => {
      const card = index.cards[cardId];
      const refs = card.refs.map((ref): RefTuple => {
        const section = sectionIndex.get(ref.section) ?? -1;
        return ref.id === ref.section ? [ref.id, ref.number ?? '', section] : [ref.id, ref.number ?? '', section, ref.title];
      });
      return [card.anchor, card.question, card.label, card.companies, card.checkpointCount, refs];
    });
    a[article.id] = [
      article.title,
      article.permalink,
      domainIndex.get(article.domainId) ?? -1,
      article.minutes,
      article.priority ?? 0,
      article.roles,
      article.sections.map(sectionTuple),
      article.knowledgeId ?? 0,
      article.interviewAnchor ?? 0,
      cards,
    ];
  }
  return {
    roles: index.roles,
    domains: index.domains.map(({id, label, permalink, articleIds}) => ({id, label, permalink, a: articleIds})),
    a,
  };
}

export function cardIdOf(articleKey: string, anchor: string): string {
  return `${articleKey}#${anchor}`;
}

export function expandIndex(compact: CompactIndex): LearningIndex {
  const articles: Record<string, ArticleIndex> = {};
  const cards: Record<string, CardIndex> = {};
  for (const [id, tuple] of Object.entries(compact.a)) {
    const [title, permalink, domain, minutes, priority, roles, sectionTuples, knowledgeId, interviewAnchor, cardTuples] = tuple;
    const sections = sectionTuples.map(([sectionId, sectionTitle, number]) => ({id: sectionId, title: sectionTitle, number}));
    const articleKey = knowledgeId || id;
    const cardIds = cardTuples.map(([anchor, question, label, companies, checkpointCount, refTuples]) => {
      const cardId = cardIdOf(articleKey, anchor);
      const refs = refTuples.map(([refId, number, section, refTitle]): CardRef => {
        const parent = sections[section];
        return {id: refId, number: number || undefined, title: refTitle ?? parent?.title ?? '', section: parent?.id ?? refId};
      });
      cards[cardId] = {id: cardId, articleId: id, anchor, question, label, companies, checkpointCount, refs};
      return cardId;
    });
    articles[id] = {
      id,
      knowledgeId: knowledgeId || undefined,
      title,
      permalink,
      domainId: compact.domains[domain]?.id ?? '',
      minutes,
      priority: priority || undefined,
      roles,
      sections,
      cardIds,
      interviewAnchor: interviewAnchor || undefined,
    };
  }
  return {
    roles: compact.roles,
    domains: compact.domains.map(({id, label, permalink, a}) => ({id, label, permalink, articleIds: a})),
    articles,
    cards,
  };
}
