import clsx from 'clsx';
import Link from '@docusaurus/Link';

import {domainOf, domainShortLabel, primaryRef, refHref, sectionLabel, useLearningIndex} from '../content';
import type {CardRef} from '../types';
import type {CardDetail} from '../types';
import {Companies, InlineText, PriorityDots, RichText} from '../ui';
import styles from './review.module.css';

export function SourceLink({card, variant = 'read'}: {card: CardDetail; variant?: 'read' | 'view'}) {
  const index = useLearningIndex();
  const ref = primaryRef(card);
  const section = ref ? `${sectionLabel(ref.number)} ${variant === 'view' ? ref.title : ''}`.trim() : '';
  const label = variant === 'view' ? `在原文中查看${section ? ` · ${section}` : ''} →` : `读 ${section || '原文'} 原文 →`;
  const others = card.refs.filter((item: CardRef) => item.articleId !== card.articleId);
  const link = (
    <Link className={styles.sourceLink} to={refHref(index, card, ref)}>
      {label}
    </Link>
  );
  if (!others.length) return link;
  return (
    <div className={styles.sourceLinks}>
      {link}
      <span className={styles.sourceOthers}>
        另见
        {others.map((item) => (
          <Link key={`${item.articleId}#${item.id}`} className={styles.sourceOther} to={refHref(index, card, item)}>
            {index.articles[item.articleId]?.title}
            {item.id && item.id !== item.section ? ` · ${item.title}` : item.number ? ` · ${sectionLabel(item.number)}` : ''}
          </Link>
        ))}
      </span>
    </div>
  );
}

export function CardMeta({card, showCompanies = true}: {card: CardDetail; showCompanies?: boolean}) {
  const index = useLearningIndex();
  const article = index.articles[card.articleId];
  const domain = domainOf(index, article);
  const ref = primaryRef(card);
  return (
    <div className={styles.metaRow}>
      <span className={styles.metaPath}>
        {domain ? `${domainShortLabel(domain.label)} · ` : ''}
        {article.title}
        {card.composite ? ' · 综合题' : ref?.number && ref.articleId === card.articleId ? ` · ${sectionLabel(ref.number)}` : ''}
      </span>
      <div className={styles.metaRight}>
        <PriorityDots priority={article.priority} />
        {showCompanies && <Companies names={card.companies} selfTest={card.selfTest} />}
      </div>
    </div>
  );
}

type FaceProps = {
  card: CardDetail;
  revealed: boolean;
  onReveal: () => void;
  /** Checkable points; when omitted points are a plain list. */
  hits?: number[];
  onToggleHit?: (index: number) => void;
  checkLabel?: string;
  answerFirst?: boolean;
  footer?: React.ReactNode;
};

export function CardBody({card, revealed, onReveal, hits, onToggleHit, checkLabel, answerFirst, footer}: FaceProps) {
  const points = (
    <div className={styles.block}>
      <span className={styles.blockLabel}>{hits ? checkLabel ?? '要点 · 勾选你想到的' : '考察重点'}</span>
      {card.checkpoints.map((point, i) =>
        hits ? (
          <button
            key={i}
            type="button"
            className={styles.check}
            aria-pressed={hits.includes(i)}
            onClick={() => onToggleHit?.(i)}>
            <span className={clsx(styles.checkBox, hits.includes(i) && styles.checkBoxOn)}>{hits.includes(i) ? '✓' : ''}</span>
            <span>
              <InlineText nodes={point} />
            </span>
          </button>
        ) : (
          <div key={i} className={styles.point}>
            <span className={styles.pointDot}>·</span>
            <span>
              <InlineText nodes={point} />
            </span>
          </div>
        ),
      )}
    </div>
  );
  const answer = (
    <div className={styles.block}>
      <span className={styles.blockLabel}>参考回答</span>
      <RichText blocks={card.answer} />
    </div>
  );
  const content = (
    <div className={styles.blocks}>
      {answerFirst ? answer : points}
      {answerFirst ? points : answer}
    </div>
  );

  if (!revealed) {
    return (
      <button type="button" className={styles.cover} onClick={onReveal}>
        <div className={styles.coverBlur} aria-hidden="true">
          {content}
        </div>
        <span className={styles.coverPrompt}>
          <span className={styles.coverButton}>先想一想，再点开答案</span>
          <span className={styles.coverHint}>点击任意位置或按空格</span>
        </span>
      </button>
    );
  }
  return (
    <div className={clsx(styles.revealed, answerFirst && styles.revealedPanel)}>
      {content}
      {footer}
    </div>
  );
}
