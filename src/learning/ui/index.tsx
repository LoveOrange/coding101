import {type ReactNode, useEffect, useRef} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

import {CARD_STATUS_LABELS, type CardStatus, PRIORITY_LABELS, type TopicStatus} from '../content';
import type {Block, Inline, Priority} from '../types';
import styles from './styles.module.css';

export function Eyebrow({children, tone, className}: {children: ReactNode; tone?: 'green' | 'accent'; className?: string}) {
  return <span className={clsx(styles.eyebrow, tone && styles[tone], className)}>{children}</span>;
}

export function PriorityDots({priority}: {priority?: Priority}) {
  if (!priority) return null;
  const filled = priority === 'must' ? 3 : priority === 'common' ? 2 : 1;
  return (
    <span className={clsx(styles.priority, styles[`priority_${priority}`])}>
      <span className={styles.dots} aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span key={i} className={i < filled ? styles.dotOn : styles.dotOff} />
        ))}
      </span>
      {PRIORITY_LABELS[priority]}
    </span>
  );
}

export function Companies({names, tone = 'fill'}: {names: string[]; tone?: 'fill' | 'paper'}) {
  if (!names.length) return null;
  return (
    <span className={styles.companies}>
      {names.map((name) => (
        <span key={name} className={clsx(styles.company, tone === 'paper' && styles.companyPaper)}>
          {name}
        </span>
      ))}
    </span>
  );
}

export function StatusTag({status}: {status: CardStatus}) {
  return <span className={clsx(styles.status, styles[`status_${status}`])}>{CARD_STATUS_LABELS[status]}</span>;
}

export const TOPIC_STATUS_LABELS: Record<TopicStatus, string> = {
  mastered: '已掌握',
  learning: '学习中',
  weak: '有薄弱点',
  new: '未开始',
};

export function topicClass(status: TopicStatus): string {
  return styles[`topic_${status}`];
}

/** Segmented progress bar. `partial` fills part of the segment at `done`. */
export function Segments({
  total,
  done,
  current,
  partial,
  tone = 'ink',
  className,
}: {
  total: number;
  done: number;
  current?: boolean;
  partial?: number;
  tone?: 'ink' | 'green' | 'inverse';
  className?: string;
}) {
  return (
    <span className={clsx(styles.segments, styles[`segments_${tone}`], className)} aria-hidden="true">
      {Array.from({length: total}, (_, i) => {
        const style =
          i === done && partial !== undefined
            ? {background: `linear-gradient(90deg, var(--seg-on) ${Math.round(partial * 100)}%, var(--seg-off) ${Math.round(partial * 100)}%)`}
            : undefined;
        return (
          <span
            key={i}
            style={style}
            className={clsx(styles.segment, i < done && styles.segmentOn, current && i === done && styles.segmentCurrent)}
          />
        );
      })}
    </span>
  );
}

export function Kbd({children, className}: {children: ReactNode; className?: string}) {
  return <kbd className={clsx(styles.kbd, className)}>{children}</kbd>;
}

export function Dialog({
  open,
  onClose,
  children,
  width = 500,
  labelledBy,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: number;
  labelledBy?: string;
}) {
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey, true);
    panel.current?.querySelector<HTMLElement>('button, a')?.focus();
    return () => window.removeEventListener('keydown', onKey, true);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        ref={panel}
        className={styles.dialog}
        style={{maxWidth: width}}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export function ReadOnlyBanner({endedAt}: {endedAt: string}) {
  return (
    <div className={styles.banner}>
      <span>
        <b>Pro 已于 {formatMonthDay(endedAt)}到期。</b>你的进度和卡片状态都还在，现在只能查看，不能更新。续费后从这里继续。
      </span>
      <Link className={styles.bannerButton} to="/pricing">
        续费
      </Link>
    </div>
  );
}

/* ---- Rich text from extracted Markdown ---- */

export function InlineText({nodes}: {nodes: Inline[]}) {
  return (
    <>
      {nodes.map((node, i) => {
        if (typeof node === 'string') return node === '\n' ? <br key={i} /> : <span key={i}>{node}</span>;
        if (node.t === 'code') return <code key={i}>{node.v}</code>;
        if (node.t === 'strong') return <strong key={i}><InlineText nodes={node.c} /></strong>;
        if (node.t === 'em') return <em key={i}><InlineText nodes={node.c} /></em>;
        return (
          <Link key={i} to={node.href}>
            <InlineText nodes={node.c} />
          </Link>
        );
      })}
    </>
  );
}

export function RichText({blocks, className}: {blocks: Block[]; className?: string}) {
  return (
    <div className={clsx(styles.rich, className)}>
      {blocks.map((block, i) => {
        if (block.t === 'p') return <p key={i}><InlineText nodes={block.c} /></p>;
        if (block.t === 'code') return <pre key={i}><code>{block.v}</code></pre>;
        const List = block.ordered ? 'ol' : 'ul';
        return (
          <List key={i}>
            {block.items.map((item, j) => (
              <li key={j}><InlineText nodes={item} /></li>
            ))}
          </List>
        );
      })}
    </div>
  );
}

/* ---- Formatting ---- */

export function formatMonthDay(day: string): string {
  const [, m, d] = day.split('-').map(Number);
  return `${m} 月 ${d} 日`;
}

export function formatDate(day: string): string {
  const [y, m, d] = day.split('-').map(Number);
  return `${y} 年 ${m} 月 ${d} 日`;
}

export function formatDue(due: string, todayDay: string): string {
  if (due <= todayDay) return '今天';
  const [y1, m1, d1] = todayDay.split('-').map(Number);
  const [y2, m2, d2] = due.split('-').map(Number);
  const diff = Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000);
  if (diff === 1) return '明天';
  return formatMonthDay(due);
}

export function formatInterval(days: number): string {
  return days === 1 ? '明天' : `${days} 天后`;
}

export {styles as uiStyles};
