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

export function isDue(state: CardState | undefined, day = today()): boolean {
  return Boolean(state && !state.suspended && state.reps > 0 && state.due <= day);
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
