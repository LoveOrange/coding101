import {useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

import {reviewHref} from '../article/ArticleParts';
import {
  articlesForRole,
  cardStatus,
  dueCardIds,
  isWeak,
  outlineSections,
  topicStatus,
  type TopicStatus,
  useLearningIndex,
} from '../content';
import {UpgradeDialog} from '../review/UpgradeDialog';
import {summarize} from '../review/WeakList';
import {accessOf, daysBetween, toDay, today, useLearner} from '../store';
import {formatMonthDay, ReadOnlyBanner, Segments, topicClass, TOPIC_STATUS_LABELS} from '../ui';
import {ClientPage} from '../ui/ClientOnly';
import {ProgressTabs} from './Cards';
import styles from './Progress.module.css';

const LEGEND: TopicStatus[] = ['mastered', 'learning', 'weak', 'new'];
const SECONDS_PER_CARD = 75;

export default function Progress(): JSX.Element {
  return <ClientPage title="我的进度">{() => <ProgressPage />}</ClientPage>;
}

function ProgressPage() {
  const index = useLearningIndex();
  const learner = useLearner();
  const access = accessOf(learner);
  const readonly = access === 'readonly';
  const active = access === 'active';
  const [upgradeOpen, setUpgradeOpen] = useState(access === 'guest' || access === 'free');
  const day = today();
  const role = index.roles.find((item) => item.id === learner.preferences.roleId);

  const articles = articlesForRole(index, role?.id);
  const statusOf = (articleId: string) => topicStatus(index.articles[articleId], index, learner);
  const mastered = articles.filter((article) => statusOf(article.id) === 'mastered').length;
  const weakTopics = articles.filter((article) => statusOf(article.id) === 'weak').length;

  const domains = index.domains
    .map((domain) => ({domain, articles: domain.articleIds.filter((id) => !role || index.articles[id].roles.includes(role.id))}))
    .filter((item) => item.articles.length);

  const weakCards = Object.keys(learner.cards).filter((id) => index.cards[id] && isWeak(index.cards[id], learner.cards[id]));
  const due = dueCardIds(index, learner, day);
  const session = learner.sessions.find(
    (item) => item.mode === 'today' && !item.finishedAt && toDay(new Date(item.startedAt)) === day && item.answers.length < item.cardIds.length,
  );
  const lastExam = learner.sessions.find((item) => item.mode === 'exam' && item.finishedAt);
  const lastExamSummary = lastExam ? summarize(lastExam, index) : undefined;

  const reading = Object.entries(learner.reading)
    .filter(([id, state]) => index.articles[id] && !state.done)
    .sort((a, b) => b[1].updatedAt.localeCompare(a[1].updatedAt))[0];
  const readingArticle = reading ? index.articles[reading[0]] : undefined;
  const readingSection = readingArticle ? outlineSections(readingArticle)[reading![1].furthest] : undefined;

  const interview = learner.preferences.interviewDate;
  const practiceDomain = (articleIds: string[]) => {
    const ids = articleIds
      .flatMap((id) => index.articles[id].cardIds)
      .filter((id) => cardStatus(index.cards[id], learner.cards[id]) !== 'mastered')
      .slice(0, learner.preferences.dailyLimit);
    return ids.length ? `/review?cards=${ids.map(encodeURIComponent).join(',')}` : undefined;
  };

  return (
    <main className={styles.page}>
      {learner.subscription.status === 'expired' && <ReadOnlyBanner endedAt={learner.subscription.endedAt} />}
      <div className={styles.tabsRow}>
        <ProgressTabs active="progress" />
      </div>
      <div className={styles.grid}>
        <section className={styles.map} aria-labelledby="progress-title">
          <div className={styles.mapHead}>
            <div className={styles.mapTitle}>
              <span className={styles.scope}>
                {role ? role.label : '全部领域'} · 共 {articles.length} 个主题
                {readonly && learner.subscription.status === 'expired' ? ` · 截至 ${formatMonthDay(learner.subscription.endedAt)}` : ''}
              </span>
              <h1 id="progress-title" className={styles.title}>
                掌握 {mastered} 个主题{weakTopics ? `，${weakTopics} 处待补` : ''}
              </h1>
            </div>
            <div className={styles.legend}>
              {LEGEND.map((status) => (
                <span key={status} className={styles.legendItem}>
                  <span className={clsx(styles.legendSwatch, topicClass(status))} />
                  {TOPIC_STATUS_LABELS[status]}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.domains}>
            {domains.map(({domain, articles: ids}) => {
              const href = active ? practiceDomain(ids) : undefined;
              return (
                <div key={domain.id} className={styles.domain}>
                  <div className={styles.domainSide}>
                    <span className={styles.domainName}>{domain.label}</span>
                    <span className={styles.domainCount}>
                      {ids.filter((id) => statusOf(id) === 'mastered').length} / {ids.length} 掌握
                    </span>
                    {href && (
                      <Link className={styles.domainPractice} to={href}>
                        练这个领域 →
                      </Link>
                    )}
                  </div>
                  <div className={styles.topics}>
                    {ids.map((id) => {
                      const article = index.articles[id];
                      const status = statusOf(id);
                      return (
                        <Link key={id} to={article.permalink} className={clsx(styles.topic, topicClass(status))} title={TOPIC_STATUS_LABELS[status]}>
                          {article.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <aside className={styles.side}>
          {readonly ? (
            <div className={styles.todayPaused}>
              <span className={styles.todayLabelMuted}>今日复习 · 已暂停</span>
              <span className={styles.todayTitleInk}>{due.length || Object.keys(learner.cards).length} 张卡在等你</span>
              <span className={styles.todayText}>到期后复习队列停止计时。续费后按原来的间隔继续，不会一次涌出积压的卡。</span>
              <Link className={styles.todayButton} to="/pricing">
                续费后继续 →
              </Link>
            </div>
          ) : session ? (
            <div className={styles.today}>
              <span className={styles.todayLabel}>
                今日复习 · 已完成 {session.answers.length} / {session.cardIds.length}
              </span>
              <Segments tone="inverse" total={session.cardIds.length} done={session.answers.length} />
              <span className={styles.todayTitle}>
                还剩 {session.cardIds.length - session.answers.length} 张 · 约{' '}
                {Math.max(1, Math.round(((session.cardIds.length - session.answers.length) * SECONDS_PER_CARD) / 60))} 分钟
              </span>
              <span className={styles.todayNote}>
                {new Date(session.startedAt).getHours() < 12 ? '上午' : '今天'}停在第 {session.answers.length + 1} 张，评分已保存
              </span>
              <Link className={styles.todayButton} to={`/review?session=${session.id}`}>
                继续 →
              </Link>
            </div>
          ) : (
            <div className={styles.today}>
              <span className={styles.todayLabel}>今日复习</span>
              <span className={styles.todayTitle}>
                {due.length ? `${Math.min(due.length, learner.preferences.dailyLimit)} 张 · 约 ${Math.max(1, Math.round((Math.min(due.length, learner.preferences.dailyLimit) * SECONDS_PER_CARD) / 60))} 分钟` : '今天没有到期的卡'}
              </span>
              <span className={styles.todayNote}>{due.length ? '评分后按遗忘时间安排下次出现' : '读完一篇文章，面试题会在第二天进入复习'}</span>
              {due.length ? (
                <Link className={styles.todayButton} to="/review?mode=today">
                  开始 →
                </Link>
              ) : (
                <Link className={styles.todayButton} to="/topics">
                  去读一篇 →
                </Link>
              )}
            </div>
          )}

          <div className={styles.block}>
            <div className={styles.blockHead}>
              <span className={styles.blockLabel}>待补</span>
              {active && weakCards.length > 0 && (
                <Link className={styles.blockAction} to={`/review?cards=${weakCards.map(encodeURIComponent).join(',')}`}>
                  全部重答 {weakCards.length} →
                </Link>
              )}
            </div>
            {weakCards.slice(0, 3).map((id) => {
              const card = index.cards[id];
              const article = index.articles[card.articleId];
              const state = learner.cards[id];
              const note = state.hits?.length === 0 || state.rating === 'again' ? '没答出' : state.hits ? `漏 ${card.checkpointCount - state.hits.length} 个要点` : '部分答出';
              return (
                <Link key={id} className={styles.weakItem} to={reviewHref(article, card)}>
                  <span className={styles.weakText}>
                    <span className={styles.weakTitle}>{article.title}</span>
                    <span className={styles.weakNote}>
                      {card.label} · {note}
                    </span>
                  </span>
                  <span className={styles.arrowAccent}>→</span>
                </Link>
              );
            })}
            {!weakCards.length && <span className={styles.none}>没有待补的卡</span>}
          </div>

          {!readonly && (
            <div className={styles.block}>
              <span className={styles.blockLabel}>专项练习</span>
              <div className={styles.practice}>
                <Link className={styles.practiceItem} to="/cards">
                  <span className={styles.practiceTitle}>按卡片筛选</span>
                  <span className={styles.practiceNote}>闪卡库 · 待补 {weakCards.length} 张</span>
                </Link>
                <Link className={styles.practiceItem} to="/exam">
                  <span className={styles.practiceTitle}>模拟测试</span>
                  <span className={styles.practiceNote}>
                    {lastExam && lastExamSummary
                      ? `上次 ${lastExamSummary.coverage}% · ${formatMonthDay(toDay(new Date(lastExam.startedAt)))}`
                      : '还没有记录'}
                  </span>
                </Link>
              </div>
              <span className={styles.practiceHint}>按领域练：点左侧领域名下的「练这个领域」</span>
            </div>
          )}

          {readingArticle && (
            <div className={styles.block}>
              <span className={styles.blockLabel}>继续阅读</span>
              <Link
                className={styles.readingItem}
                to={`${readingArticle.permalink}${readingSection ? `#${readingSection.id}` : ''}`}>
                <span className={styles.weakText}>
                  <span className={styles.weakTitle}>{readingArticle.title}</span>
                  <span className={styles.weakNote}>
                    读到 {readingSection ? `§${readingSection.number ?? reading![1].furthest + 1} ${readingSection.title}` : '开头'}
                  </span>
                </span>
                <span className={styles.arrowGreen}>→</span>
              </Link>
            </div>
          )}

          <div className={styles.interview}>
            <span className={styles.muted}>{readonly ? '面试日期 · 不可修改' : '面试日期'}</span>
            {interview ? (
              <span className={styles.interviewDate}>
                {formatMonthDay(interview)}
                {interview >= day ? ` · 还有 ${daysBetween(day, interview)} 天` : ' · 已过'}
              </span>
            ) : readonly ? (
              <span className={styles.muted}>未设置</span>
            ) : (
              <Link to="/account">设置日期</Link>
            )}
          </div>
        </aside>
      </div>
      <UpgradeDialog open={upgradeOpen} onClose={() => setUpgradeOpen(false)} />
    </main>
  );
}
