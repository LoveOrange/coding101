import {usePluginData} from '@docusaurus/useGlobalData';

import {type CompactIndex, expandIndex} from './compact';
import {today} from './store';
import type {ArticleIndex, CardIndex, CardState, LearnerState, LearningIndex, Priority, Rating} from './types';

let expanded: {source: CompactIndex; index: LearningIndex} | undefined;

export function useLearningIndex(): LearningIndex {
  const source = usePluginData('learning-content') as CompactIndex;
  if (expanded?.source !== source) expanded = {source, index: expandIndex(source)};
  return expanded.index;
}

export const PRIORITY_LABELS: Record<Priority, string> = {
  must: '必会',
  common: '常考',
  optional: '按岗选学',
};

export const RATING_LABELS: Record<Rating, string> = {
  again: '没想起来',
  hard: '模糊',
  good: '记得',
};

export type CardStatus = 'new' | 'weak' | 'learning' | 'mastered' | 'suspended';

export const CARD_STATUS_LABELS: Record<CardStatus, string> = {
  new: '未练过',
  weak: '待补',
  learning: '学习中',
  mastered: '已掌握',
  suspended: '已暂停',
};

export function isWeak(card: CardIndex, state?: CardState): boolean {
  if (!state || state.reps === 0) return false;
  if (state.rating === 'again') return true;
  return state.hits !== undefined && state.hits.length < card.checkpointCount;
}

export function cardStatus(card: CardIndex, state?: CardState): CardStatus {
  if (!state) return 'new';
  if (state.suspended) return 'suspended';
  if (state.reps === 0) return 'new';
  if (isWeak(card, state)) return 'weak';
  if (state.rating === 'good' && state.interval >= 12) return 'mastered';
  return 'learning';
}

/** Due cards include unrated cards queued after their article was read. */
export function isDue(state: CardState | undefined, day = today()): boolean {
  return Boolean(state && !state.suspended && state.due <= day);
}

/** Section status for an article's level-2 sections, from reading progress. */
export function sectionReadStatus(index: number, reading?: {furthest: number; done: boolean}): 'read' | 'reading' | 'none' {
  if (!reading) return 'none';
  if (reading.done || index < reading.furthest) return 'read';
  return index === reading.furthest ? 'reading' : 'none';
}

/** Level-2 sections shown in outlines: everything except the interview section. */
export function outlineSections(article: ArticleIndex) {
  return article.sections.filter((section) => section.id !== article.interviewAnchor);
}

export function cardsInSection(index: LearningIndex, article: ArticleIndex, sectionId: string): CardIndex[] {
  return article.cardIds
    .map((id) => index.cards[id])
    .filter((card) => card.refs.some((ref) => ref.section === sectionId));
}

export type TopicStatus = 'mastered' | 'learning' | 'weak' | 'new';

export function topicStatus(article: ArticleIndex, index: LearningIndex, learner: LearnerState): TopicStatus {
  const statuses = article.cardIds.map((id) => cardStatus(index.cards[id], learner.cards[id]));
  if (statuses.includes('weak')) return 'weak';
  if (statuses.length && statuses.every((status) => status === 'mastered')) return 'mastered';
  if (learner.reading[article.id] || statuses.some((status) => status !== 'new')) return 'learning';
  return 'new';
}

/** Articles in the given role, or every article when no role is selected. */
export function articlesForRole(index: LearningIndex, roleId?: string): ArticleIndex[] {
  return index.domains
    .flatMap((domain) => domain.articleIds)
    .map((id) => index.articles[id])
    .filter((article) => !roleId || article.roles.includes(roleId));
}

export function dueCardIds(index: LearningIndex, learner: LearnerState, day = today()): string[] {
  return Object.keys(learner.cards)
    .filter((id) => index.cards[id] && isDue(learner.cards[id], day))
    .sort((a, b) => learner.cards[a].due.localeCompare(learner.cards[b].due));
}

export function sectionLabel(number?: string): string {
  return number ? `§${number}` : '';
}

export function domainOf(index: LearningIndex, article: ArticleIndex) {
  return index.domains.find((domain) => domain.id === article.domainId);
}

export function topicOf(index: LearningIndex, article: ArticleIndex) {
  return domainOf(index, article)?.topics.find((topic) => topic.id === article.topicId);
}

/**
 * The article list an article belongs to for side navigation: its topic when
 * the topic groups several articles, otherwise the whole domain.
 */
export function moduleOf(index: LearningIndex, article: ArticleIndex) {
  const domain = domainOf(index, article);
  const topic = topicOf(index, article);
  if (!domain) return undefined;
  if (topic && topic.articleIds.length > 1) {
    return {label: `${domain.label} / ${topic.label}`, short: topic.label, articleIds: topic.articleIds, domain, topic};
  }
  return {label: domain.label, short: domain.label, articleIds: domain.articleIds, domain, topic};
}

/** Link to the knowledge tree with the article's topic selected. */
export function topicsHref(article: ArticleIndex): string {
  return `/topics?domain=${encodeURIComponent(article.domainId)}&topic=${encodeURIComponent(article.topicId)}`;
}

/** Status for a topic: aggregated over its articles. */
export function topicGroupStatus(articleIds: string[], index: LearningIndex, learner: LearnerState): TopicStatus {
  const statuses = articleIds.map((id) => topicStatus(index.articles[id], index, learner));
  if (statuses.includes('weak')) return 'weak';
  if (statuses.every((status) => status === 'mastered')) return 'mastered';
  if (statuses.some((status) => status !== 'new')) return 'learning';
  return 'new';
}

/** Short domain name for metadata lines, e.g. "Java · 语言基础" → "Java". */
export function domainShortLabel(label: string): string {
  return label.split(' · ')[0];
}

/** Rough minutes needed to re-read the sections a card points to. */
export function rereadMinutes(card: CardIndex, article: ArticleIndex): number {
  const sections = new Set(card.refs.map((ref) => ref.section));
  const share = article.sections.length ? Math.max(1, sections.size) / article.sections.length : 1;
  return Math.max(2, Math.round(article.minutes * share));
}

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
