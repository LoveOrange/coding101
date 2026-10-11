import {type ReactNode, useMemo} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

import {cardsInSection, moduleOf, RATING_LABELS, sectionLabel, topicsHref, useLearningIndex} from '../content';
import {useLearner} from '../store';
import type {ArticleIndex, CardIndex, CardState} from '../types';
import {Companies, PriorityDots} from '../ui';
import styles from './article.module.css';

export function reviewHref(article: ArticleIndex, card?: CardIndex): string {
  const params = new URLSearchParams({article: article.id});
  if (card) params.set('card', card.id);
  return `/review?${params.toString()}`;
}

export function ArticleMeta({article}: {article: ArticleIndex}) {
  const index = useLearningIndex();
  const module = moduleOf(index, article);
  return (
    <div className={styles.meta}>
      {module && <Link to={topicsHref(article)}>{module.label.replace(' / ', ' · ')}</Link>}
      <span>约 {article.minutes} 分钟</span>
      {article.cardIds.length > 0 && <span>{article.cardIds.length} 张卡</span>}
    </div>
  );
}

export function CoreSummary({children}: {children: ReactNode}) {
  return (
    <div className={styles.core}>
      <div className={styles.coreHead}>
        <span className={styles.coreTitle}>面试核心</span>
        <span className={styles.coreHint}>先记住这几条，再读正文</span>
      </div>
      <div className={styles.coreBody}>{children}</div>
    </div>
  );
}

function CardChip({article, card}: {article: ArticleIndex; card: CardIndex}) {
  return (
    <Link className={styles.chip} to={reviewHref(article, card)} title={card.question}>
      卡 · {card.question}
    </Link>
  );
}

export function SectionTags({article, sectionId}: {article: ArticleIndex; sectionId: string}) {
  const index = useLearningIndex();
  const cards = cardsInSection(index, article, sectionId);
  if (!cards.length) return null;
  return (
    <div className={styles.tags}>
      {article.priority && (
        <>
          <PriorityDots priority={article.priority} />
          <span className={styles.divider} />
        </>
      )}
      {cards.map((card) => (
        <CardChip key={card.id} article={article} card={card} />
      ))}
    </div>
  );
}

/** Heading ids that should show the card marker in the table of contents. */
export function useCardHeadings(article?: ArticleIndex): Set<string> {
  const index = useLearningIndex();
  return useMemo(() => {
    const ids = new Set<string>();
    if (!article) return ids;
    for (const cardId of article.cardIds) {
      for (const ref of index.cards[cardId].refs) {
        ids.add(ref.id);
        ids.add(ref.section);
      }
    }
    if (article.interviewAnchor && article.cardIds.length) ids.add(article.interviewAnchor);
    return ids;
  }, [article, index]);
}

export function TocLegend() {
  return (
    <div className={styles.legend}>
      <span className="c101-card-mark" aria-hidden="true" />
      有对应面试题卡片
    </div>
  );
}

function StatusDot({state}: {state?: CardState}) {
  if (!state || state.reps === 0) {
    return (
      <span className={styles.status}>
        <span className={clsx(styles.dot, styles.dotNone)} />
        未标记
      </span>
    );
  }
  const label = state.rating === 'good' ? '掌握' : RATING_LABELS[state.rating];
  return (
    <span className={styles.status}>
      <span className={clsx(styles.dot, styles[`dot_${state.rating}`])} />
      {label}
    </span>
  );
}

export function InterviewCards({article, headingId}: {article: ArticleIndex; headingId: string}) {
  const index = useLearningIndex();
  const learner = useLearner();
  const section = article.sections.find((item) => item.id === headingId);
  const cards = article.cardIds.map((id) => index.cards[id]);
  return (
    <>
      <h2 id={headingId} className={clsx('anchor', styles.interviewHeading, 'c101-interview')}>
        {section?.number ? `${section.number} · ` : ''}面试题卡片
      </h2>
      <div className={clsx(styles.interview, 'c101-interview-cards')}>
        <div className={styles.interviewHead}>
          <div className={styles.interviewIntro}>
            <span className={styles.interviewTitle}>先想答案，再翻面</span>
            <span className={styles.interviewHint}>题目来自公开面经。点任意一张进入翻卡，可左右切换，看完回到这里。</span>
          </div>
          {cards.length > 0 && (
            <Link className={styles.flipAll} to={reviewHref(article)}>
              逐张翻看 {cards.length} 张 →
            </Link>
          )}
        </div>
        <div className={styles.grid}>
          {cards.map((card) => (
            <Link key={card.id} className={styles.card} to={reviewHref(article, card)}>
              <div className={styles.cardTop}>
                <span className={styles.cardLabel}>{card.label}</span>
                <PriorityDots priority={article.priority} />
              </div>
              <div className={styles.cardQuestion}>{card.question}</div>
              <Companies names={card.companies} tone="paper" />
              <div className={styles.cardFoot}>
                <span>
                  考察 {card.checkpointCount} 点
                  {card.refs.length > 0 && ` · 相关 ${card.refs.map((ref) => sectionLabel(ref.number)).filter(Boolean).join(' ')}`}
                </span>
                <StatusDot state={learner.cards[card.id]} />
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.interviewNote}>
          <span className={clsx(styles.dot, styles.dotGreen)} />
          未标记的卡读完后明天进入复习；已标记的按状态安排
        </div>
      </div>
    </>
  );
}
