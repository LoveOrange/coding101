import clsx from 'clsx';
import Link from '@docusaurus/Link';

import {domainOf, domainShortLabel, rereadMinutes, sectionLabel, useLearningIndex} from '../content';
import {learnerActions, useLearner} from '../store';
import type {CardIndex, LearnerState, LearningIndex, ReviewSession, SessionAnswer} from '../types';
import styles from './report.module.css';

export type SessionSummary = {
  answered: SessionAnswer[];
  good: number;
  hard: number;
  again: number;
  skipped: number;
  /** Answers that need re-reading: anything not fully covered, skipped excluded. */
  weak: SessionAnswer[];
  coverage: number;
  minutes: number;
};

export function summarize(session: ReviewSession, index: LearningIndex): SessionSummary {
  const answered = session.answers.filter((answer) => index.cards[answer.cardId]);
  const count = (rating: string) => answered.filter((answer) => answer.rating === rating).length;
  const scored = answered.filter((answer) => !answer.skipped);
  const points = scored.reduce((sum, answer) => sum + index.cards[answer.cardId].checkpointCount, 0);
  const hit = scored.reduce(
    (sum, answer) =>
      sum +
      (answer.hits ? Math.min(answer.hits.length, index.cards[answer.cardId].checkpointCount) : answer.rating === 'good' ? index.cards[answer.cardId].checkpointCount : 0),
    0,
  );
  const end = session.finishedAt ? new Date(session.finishedAt).getTime() : Date.now();
  return {
    answered,
    good: count('good'),
    hard: count('hard'),
    again: count('again'),
    skipped: answered.filter((answer) => answer.skipped).length,
    weak: scored.filter((answer) =>
      answer.hits ? answer.hits.length < index.cards[answer.cardId].checkpointCount : answer.rating !== 'good',
    ),
    coverage: points ? Math.round((hit / points) * 100) : 0,
    minutes: Math.max(1, Math.round((end - new Date(session.startedAt).getTime()) / 60000)),
  };
}

/** Next day with due cards after today, and how many are due then. */
export function nextReview(learner: LearnerState, todayDay: string): {day: string; count: number} | undefined {
  const upcoming = Object.values(learner.cards)
    .filter((card) => !card.suspended && card.due > todayDay)
    .map((card) => card.due)
    .sort();
  if (!upcoming.length) return undefined;
  const day = upcoming[0];
  return {day, count: upcoming.filter((due) => due === day).length};
}

function missLabel(card: CardIndex, answer: SessionAnswer): string {
  if (!answer.hits) return answer.rating === 'again' ? '没想起来' : '有点模糊';
  const missed = card.checkpointCount - answer.hits.length;
  if (answer.hits.length === 0) return '没答出';
  return `漏答 ${missed} 个要点`;
}

export function WeakRow({answer, compact}: {answer: SessionAnswer; compact?: boolean}) {
  const index = useLearningIndex();
  const learner = useLearner();
  const card = index.cards[answer.cardId];
  const article = index.articles[card.articleId];
  const domain = domainOf(index, article);
  const reread = learner.cards[card.id]?.reread;
  const sections = [...new Set(card.refs.map((ref) => sectionLabel(ref.number)).filter(Boolean))];
  const target = card.refs[0]?.id ?? card.anchor;
  const progressNote = answer.hits ? `答到 ${answer.hits.length} / ${card.checkpointCount}` : missLabel(card, answer);

  return (
    <div className={clsx(styles.weakRow, compact && styles.weakRowCompact)}>
      <div className={styles.weakText}>
        <span className={styles.weakTitle}>{card.question}</span>
        <span className={styles.weakSub}>
          {compact ? progressNote : missLabel(card, answer)} · {domain ? `${domainShortLabel(domain.label)} / ` : ''}
          {article.title}
        </span>
      </div>
      {reread ? (
        <span className={styles.rereadDone}>① 已补读 ✓</span>
      ) : (
        <Link className={styles.rereadLink} to={`${article.permalink}#${target}`} onClick={() => learnerActions.markReread(card.id)}>
          ① 补读 {sections.length ? sections.join('、') : '原文'} · {rereadMinutes(card, article)} 分钟
        </Link>
      )}
      {reread ? (
        <Link className={styles.retry} to={`/review?cards=${encodeURIComponent(card.id)}`}>
          ② 重新作答 →
        </Link>
      ) : (
        <span className={styles.retryLocked}>② 重答（读完解锁）</span>
      )}
    </div>
  );
}
