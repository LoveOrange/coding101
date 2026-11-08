import type {ArticleIndex, Domain, LearnerState, LearningIndex, Priority, StudyGuide, Topic} from './types';

/** Keep the knowledge-tree columns; order their existing entries by the selected study plan. */
export function studyForRole(index: LearningIndex, guides: StudyGuide[]) {
  const positions = new Map<string, number>();
  const readings = new Map<string, StudyGuide['readings'][number]>();
  const rank: Record<Priority, number> = {must: 0, common: 1, optional: 2};
  const ordered = guides.flatMap(guide => guide.readings.map(reading => ({reading,
    rank: rank[guide.priority === 'must' && !reading.core ? 'common' : guide.priority] ?? 1,
  }))).sort((a, b) => a.rank - b.rank);
  for (const {reading} of ordered) {
    if (!positions.has(reading.articleId)) positions.set(reading.articleId, positions.size);
    if (!readings.has(reading.articleId) || (reading.core && !readings.get(reading.articleId)!.core)) readings.set(reading.articleId, reading);
  }
  const position = (ids: string[]) => Math.min(...ids.map(id => positions.get(id) ?? Infinity));
  const compare = (a: {articleIds: string[]}, b: {articleIds: string[]}) => {
    const left = position(a.articleIds), right = position(b.articleIds);
    return left === right ? 0 : left - right;
  };
  return {
    domains: index.domains.map(domain => ({...domain, topics: [...domain.topics].sort(compare)})).sort(compare),
    articlesForTopic: (topic: Topic) => [...topic.articleIds]
      .sort((a, b) => compare({articleIds: [a]}, {articleIds: [b]}))
      .map(id => index.articles[id]),
    guidesForTopic: (topic: Topic) => guides.filter(guide => guide.readings.some(reading => topic.articleIds.includes(reading.articleId))),
    readingFor: (article: ArticleIndex) => readings.get(article.id),
  };
}

/** Resolve the URL on every navigation, including Back/Forward and legacy article links. */
export function selectStudyTopic(domains: Domain[], articles: Record<string, ArticleIndex>, search: string, guides: StudyGuide[], reading: LearnerState['reading'] = {}) {
  const params = new URLSearchParams(search);
  const guidedArticle = guides.find(guide => guide.id === params.get('guide'))?.readings[0]?.articleId;
  const linkedArticle = articles[params.get('article') ?? guidedArticle ?? ''];
  const domainId = params.get('domain') ?? linkedArticle?.domainId;
  const topicId = params.get('topic') ?? linkedArticle?.topicId;
  const domain = domains.find(item => item.id === domainId)
    ?? domains.find(item => item.topics.some(topic => topic.id === domainId || (!domainId && topic.id === topicId)))
    ?? (domainId ? domains.find(item => item.articleIds.some(id => id.startsWith(`${domainId}/`))) : undefined)
    ?? domains[0];
  const recommended = new Set(guides.flatMap(guide => guide.readings.map(item => item.articleId)));
  const unfinished = domain.topics.find(item => item.articleIds.some(id =>
    (!guides.length || recommended.has(id)) && !reading[id]?.done));
  const topic = domain.topics.find(item => item.id === topicId || item.id === domainId) ?? unfinished ?? domain.topics[0];
  return {domain, topic};
}
