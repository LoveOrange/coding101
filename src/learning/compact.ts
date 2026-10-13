import type {ArticleIndex, CardIndex, CardRef, LearningIndex, Priority, Role, SectionIndex} from './types';

/**
 * Compact wire format for the learning index in global data. Global data ships
 * with every page, so articles and cards are stored as tuples and card ids are
 * rebuilt from the article key and anchor.
 */

type SectionTuple = [id: string, title: string, number?: string];
/**
 * Refs inside the card's own article store the section as an index and omit
 * the title when it is the section heading itself. Refs into another article,
 * or to a whole article, carry the title, article id and section id.
 */
type RefTuple =
  | [id: string, number: string, section: number, title?: string]
  | [id: string, number: string, section: -1, title: string, articleId: string, sectionId: string];
type CardTuple = [
  anchor: string,
  question: string,
  label: string,
  companies: string[],
  checkpoints: number,
  refs: RefTuple[],
  composite?: 0 | 1,
  selfTest?: 1,
];
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

type CompactTopic = {id: string; label: string; permalink?: string; a: string[]};

export type CompactIndex = {
  roles: Role[];
  domains: {id: string; label: string; permalink?: string; t: CompactTopic[]}[];
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
        const section = sectionIndex.get(ref.section);
        if (ref.articleId !== article.id || section === undefined) {
          return [ref.id, ref.number ?? '', -1, ref.title, ref.articleId, ref.section];
        }
        return ref.id === ref.section ? [ref.id, ref.number ?? '', section] : [ref.id, ref.number ?? '', section, ref.title];
      });
      const tuple: CardTuple = [card.anchor, card.question, card.label, card.companies, card.checkpointCount, refs];
      if (card.composite || card.selfTest) tuple.push(card.composite ? 1 : 0);
      if (card.selfTest) tuple.push(1);
      return tuple;
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
    domains: index.domains.map(({id, label, permalink, topics}) => ({
      id,
      label,
      permalink,
      t: topics.map((topic) => ({id: topic.id, label: topic.label, permalink: topic.permalink, a: topic.articleIds})),
    })),
    a,
  };
}

export function cardIdOf(articleKey: string, anchor: string): string {
  return `${articleKey}#${anchor}`;
}

export function expandIndex(compact: CompactIndex): LearningIndex {
  const topicOf = new Map<string, string>();
  for (const domain of compact.domains) for (const topic of domain.t) for (const id of topic.a) topicOf.set(id, topic.id);
  const articles: Record<string, ArticleIndex> = {};
  const cards: Record<string, CardIndex> = {};
  for (const [id, tuple] of Object.entries(compact.a)) {
    const [title, permalink, domain, minutes, priority, roles, sectionTuples, knowledgeId, interviewAnchor, cardTuples] = tuple;
    const sections = sectionTuples.map(([sectionId, sectionTitle, number]) => ({id: sectionId, title: sectionTitle, number}));
    const articleKey = knowledgeId || id;
    const cardIds = cardTuples.map(([anchor, question, label, companies, checkpointCount, refTuples, composite, selfTest]) => {
      const cardId = cardIdOf(articleKey, anchor);
      const refs = refTuples.map((ref): CardRef => {
        if (ref.length === 6) {
          const [refId, number, , refTitle, articleId, sectionId] = ref;
          return {articleId, id: refId, number: number || undefined, title: refTitle, section: sectionId};
        }
        const [refId, number, section, refTitle] = ref;
        const parent = sections[section];
        return {articleId: id, id: refId, number: number || undefined, title: refTitle ?? parent?.title ?? '', section: parent?.id ?? refId};
      });
      cards[cardId] = {id: cardId, articleId: id, anchor, question, label, companies, checkpointCount, refs, ...(composite ? {composite: true} : {}), ...(selfTest ? {selfTest: true} : {})};
      return cardId;
    });
    articles[id] = {
      id,
      knowledgeId: knowledgeId || undefined,
      title,
      permalink,
      domainId: compact.domains[domain]?.id ?? '',
      topicId: topicOf.get(id) ?? id,
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
    domains: compact.domains.map(({id, label, permalink, t}) => {
      const topics = t.map((topic) => ({id: topic.id, label: topic.label, permalink: topic.permalink, articleIds: topic.a}));
      return {id, label, permalink, topics, articleIds: topics.flatMap((topic) => topic.articleIds)};
    }),
    articles,
    cards,
  };
}
