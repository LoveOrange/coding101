import {useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';

import {domainOf, domainShortLabel, useLearningIndex} from '../content';
import {nextReview, summarize, WeakRow} from '../review/WeakList';
import styles from '../review/report.module.css';
import {addDays, toDay, today, useLearner} from '../store';
import type {LearningIndex, ReviewSession} from '../types';
import {formatDue, formatMonthDay} from '../ui';
import {ClientPage} from '../ui/ClientOnly';

const VISIBLE_WEAK = 3;

export default function Report(): JSX.Element {
  return <ClientPage title="测试报告">{() => <ReportPage />}</ClientPage>;
}

function domainBreakdown(session: ReviewSession, index: LearningIndex) {
  const groups = new Map<string, {count: number; points: number; hit: number}>();
  for (const answer of session.answers) {
    const card = index.cards[answer.cardId];
    if (!card || answer.skipped) continue;
    const domain = domainOf(index, index.articles[card.articleId]);
    const name = domain ? domainShortLabel(domain.label) : '其他';
    const group = groups.get(name) ?? {count: 0, points: 0, hit: 0};
    group.count += 1;
    group.points += card.checkpointCount;
    group.hit += answer.hits ? Math.min(answer.hits.length, card.checkpointCount) : answer.rating === 'good' ? card.checkpointCount : 0;
    groups.set(name, group);
  }
  return [...groups.entries()].map(([name, group]) => ({name, count: group.count, score: group.points ? Math.round((group.hit / group.points) * 100) : 0}));
}

function ReportPage() {
  const index = useLearningIndex();
  const learner = useLearner();
  const sessionId = new URLSearchParams(useLocation().search).get('session');
  const [expanded, setExpanded] = useState(false);
  const session = learner.sessions.find((item) => item.id === sessionId) ?? learner.sessions.find((item) => item.mode === 'exam' && item.finishedAt);

  if (!session) {
    return (
      <main className={styles.empty}>
        <span className={styles.emptyTitle}>还没有测试报告</span>
        <Link className={styles.primary} to="/exam">
          设置一次模拟测试 →
        </Link>
      </main>
    );
  }

  const summary = summarize(session, index);
  const day = toDay(new Date(session.finishedAt ?? session.startedAt));
  const next = nextReview(learner, today());
  const tomorrow = addDays(today(), 1);
  const weak = expanded ? summary.weak : summary.weak.slice(0, VISIBLE_WEAK);
  const hidden = summary.weak.length - weak.length;

  if (session.mode !== 'exam') {
    const total = session.cardIds.length;
    const finished = summary.answered.length >= total;
    return (
      <main className={styles.page}>
        <div className={styles.head}>
          <div className={styles.headText}>
            <span className={styles.eyebrow}>
              {session.title} · {summary.minutes} 分钟
            </span>
            <h1 className={styles.title}>{finished ? `${total} 张过完了` : `过完 ${summary.answered.length} / ${total} 张`}</h1>
          </div>
          <div className={styles.compare}>
            <span>
              记得 {summary.good} · 模糊 {summary.hard} · 没想起来 {summary.again}
            </span>
            <div className={styles.stack}>
              <span style={{flex: summary.good}} className={styles.stackGood} />
              <span style={{flex: summary.hard}} className={styles.stackHard} />
              <span style={{flex: summary.again}} className={styles.stackAgain} />
            </div>
          </div>
        </div>
        {summary.weak.length > 0 && (
          <div className={styles.list}>
            <span className={styles.listLabel}>建议补读</span>
            {weak.map((answer) => (
              <WeakRow key={answer.cardId} answer={answer} compact />
            ))}
            {hidden > 0 && (
              <button type="button" className={styles.more} onClick={() => setExpanded(true)}>
                还有 {hidden} 题 ▾
              </button>
            )}
          </div>
        )}
        <div className={styles.foot}>
          <span>{next ? `下次复习：${formatDue(next.day, today())} · ${next.count} 张` : '没有待安排的复习'}</span>
          <div className={styles.footActions}>
            <Link className={styles.dark} to="/progress">
              回到我的进度
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const previous = learner.sessions.find((item) => item.mode === 'exam' && item.finishedAt && item.id !== session.id && item.startedAt < session.startedAt);
  const previousCoverage = previous ? summarize(previous, index).coverage : undefined;
  const delta = previousCoverage === undefined ? undefined : summary.coverage - previousCoverage;
  const domains = domainBreakdown(session, index);
  const tomorrowCount = summary.weak.filter((answer) => learner.cards[answer.cardId]?.due === tomorrow).length;

  return (
    <main className={styles.page}>
      <div className={styles.head}>
        <div className={styles.headText}>
          <span className={styles.eyebrow}>
            模拟测试 · {session.cardIds.length} 题 · {summary.minutes} 分钟 · {formatMonthDay(day)}
          </span>
          <h1 className={styles.title}>
            要点覆盖 {summary.coverage}%{summary.weak.length ? `，${summary.weak.length} 题要补` : ''}
          </h1>
        </div>
        {previous && delta !== undefined && (
          <div className={styles.compare}>
            <span>
              上次 {formatMonthDay(toDay(new Date(previous.startedAt)))} · {previousCoverage}%
            </span>
            <span className={clsx(styles.delta, delta >= 0 ? styles.deltaUp : styles.deltaDown)}>
              {delta >= 0 ? '+' : ''}
              {delta}%
            </span>
          </div>
        )}
      </div>

      <div className={styles.domains}>
        {domains.map((domain) => (
          <div key={domain.name} className={styles.domain}>
            <div className={styles.domainHead}>
              <span className={styles.domainName}>{domain.name}</span>
              <span className={styles.domainCount}>{domain.count} 题</span>
            </div>
            <span className={clsx(styles.domainScore, domain.score < 60 && styles.domainScoreLow)}>{domain.score}%</span>
            <span className={styles.bar}>
              <span className={clsx(styles.barFill, domain.score < 60 && styles.barFillLow)} style={{width: `${domain.score}%`}} />
            </span>
          </div>
        ))}
      </div>

      {summary.weak.length > 0 && (
        <div className={styles.list}>
          <span className={styles.listLabel}>要补的 {summary.weak.length} 题</span>
          {weak.map((answer) => (
            <WeakRow key={answer.cardId} answer={answer} compact />
          ))}
          {hidden > 0 && (
            <button type="button" className={styles.more} onClick={() => setExpanded(true)}>
              还有 {hidden} 题 ▾
            </button>
          )}
        </div>
      )}

      <div className={styles.foot}>
        <span>
          结果已写入复习：{summary.weak.length} 题进入待补
          {tomorrowCount ? `，明天的今日复习多 ${tomorrowCount} 张` : ''}
        </span>
        <div className={styles.footActions}>
          <Link className={styles.outline} to="/exam">
            再来一次
          </Link>
          <Link className={styles.dark} to="/progress">
            回到我的进度
          </Link>
        </div>
      </div>
    </main>
  );
}
