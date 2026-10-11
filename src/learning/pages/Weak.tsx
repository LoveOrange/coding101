import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';

import {useLearningIndex} from '../content';
import {nextReview, summarize, WeakRow} from '../review/WeakList';
import styles from '../review/report.module.css';
import {today, useLearner} from '../store';
import {formatDue} from '../ui';
import {ClientPage} from '../ui/ClientOnly';

export default function Weak(): JSX.Element {
  return <ClientPage title="薄弱点">{() => <WeakPage />}</ClientPage>;
}

function WeakPage() {
  const index = useLearningIndex();
  const learner = useLearner();
  const sessionId = new URLSearchParams(useLocation().search).get('session');
  const session =
    learner.sessions.find((item) => item.id === sessionId) ??
    learner.sessions.find((item) => item.mode === 'quiz' && item.finishedAt);

  if (!session) {
    return (
      <main className={styles.empty}>
        <span className={styles.emptyTitle}>还没有自测记录</span>
        <span className={styles.emptyText}>随机抽 10 道题自测，答完后这里会列出要补读的内容。</span>
        <Link className={styles.primary} to="/review?mode=quiz">
          随机来 10 道题 →
        </Link>
      </main>
    );
  }

  const summary = summarize(session, index);
  const correct = summary.good;
  const next = nextReview(learner, today());
  const total = summary.answered.length || 1;

  return (
    <main className={styles.page}>
      <div className={styles.head}>
        <div className={styles.headText}>
          <span className={styles.eyebrow}>
            本次自测 · {session.cardIds.length} 题 · {summary.minutes} 分钟
          </span>
          <h1 className={styles.title}>
            {summary.weak.length ? `答对 ${correct} 题，${summary.weak.length} 题要补` : `答对 ${correct} 题，没有要补的`}
          </h1>
        </div>
        <div className={styles.stack} aria-label={`记得 ${summary.good}，模糊 ${summary.hard}，没想起来 ${summary.again}`}>
          <span style={{flex: summary.good / total}} className={styles.stackGood} />
          <span style={{flex: summary.hard / total}} className={styles.stackHard} />
          <span style={{flex: summary.again / total}} className={styles.stackAgain} />
        </div>
      </div>

      <div className={styles.list}>
        {summary.weak.map((answer) => (
          <WeakRow key={answer.cardId} answer={answer} />
        ))}
      </div>

      <div className={styles.foot}>
        <span>
          答对的 {correct} 题会隔几天再出现。
          {next ? `下次复习：${formatDue(next.day, today())}，${next.count} 张` : ''}
        </span>
        <Link className={styles.footLink} to="/">
          返回首页
        </Link>
      </div>
    </main>
  );
}
