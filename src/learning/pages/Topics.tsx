import {useEffect, useMemo, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useHistory, useLocation} from '@docusaurus/router';

import {cardsInSection, outlineSections, PRIORITY_LABELS, sectionReadStatus, useLearningIndex} from '../content';
import {learnerActions, useLearner} from '../store';
import type {ArticleIndex, Domain, LearnerState, Priority, Topic} from '../types';
import {useLearnerFeatures} from '../features';
import {ClientPage} from '../ui/ClientOnly';
import styles from './Topics.module.css';

type Progress = 'done' | 'reading' | 'none';

const RANK: Record<Priority, number> = {must: 3, common: 2, optional: 1};

function ProgressMark({progress, optional}: {progress: Progress; optional?: boolean}) {
  if (progress === 'done') return <span className={clsx(styles.mark, styles.markDone)}>✓</span>;
  if (progress === 'reading') return <span className={clsx(styles.mark, styles.markReading)} />;
  return <span className={clsx(styles.mark, optional ? styles.markOptional : styles.markNone)} />;
}

function articleProgress(article: ArticleIndex, learner: LearnerState): Progress {
  const reading = learner.reading[article.id];
  if (!reading) return 'none';
  return reading.done ? 'done' : 'reading';
}

function topicProgress(articles: ArticleIndex[], learner: LearnerState): Progress {
  const states = articles.map((article) => articleProgress(article, learner));
  if (states.length && states.every((state) => state === 'done')) return 'done';
  return states.some((state) => state !== 'none') ? 'reading' : 'none';
}

function highestPriority(articles: ArticleIndex[]): Priority | undefined {
  return articles
    .map((article) => article.priority)
    .filter((priority): priority is Priority => Boolean(priority))
    .sort((a, b) => RANK[b] - RANK[a])[0];
}

export default function Topics(): JSX.Element {
  // Selection comes from the URL and reading progress from localStorage,
  // so render in the browser only to avoid hydration mismatches.
  return (
    <ClientPage title="知识树" description="按目标岗位查看领域、主题和文章，并从上次读到的位置继续。">
      {() => <TopicsPage />}
    </ClientPage>
  );
}

function TopicsPage() {
  const index = useLearningIndex();
  const features = useLearnerFeatures();
  const storedLearner = useLearner();
  // Without learner features, reading progress is not shown anywhere.
  const learner = features ? storedLearner : {...storedLearner, reading: {}};
  const location = useLocation();
  const history = useHistory();
  const roleId = learner.preferences.roleId;
  const role = index.roles.find((item) => item.id === roleId);

  const params = new URLSearchParams(location.search);
  const linkedArticle = params.get('article') ? index.articles[params.get('article')!] : undefined;
  const [domainId, setDomainId] = useState(linkedArticle?.domainId ?? params.get('domain') ?? undefined);
  const [topicId, setTopicId] = useState(linkedArticle?.topicId ?? params.get('topic') ?? undefined);

  const inRole = (article: ArticleIndex) => !roleId || article.roles.includes(roleId);
  const topicArticles = (topic: Topic) => topic.articleIds.map((id) => index.articles[id]);
  const topicInRole = (topic: Topic) => topicArticles(topic).some(inRole);
  const roleTopics = (domain: Domain) => domain.topics.filter(topicInRole);

  // Older links may point at a topic id or a docs directory as the domain.
  const domain =
    index.domains.find((item) => item.id === domainId) ??
    index.domains.find((item) => item.topics.some((topic) => topic.id === domainId)) ??
    (domainId ? index.domains.find((item) => item.articleIds.some((id) => id.startsWith(`${domainId}/`))) : undefined) ??
    index.domains.find((item) => roleTopics(item).length > 0) ??
    index.domains[0];

  // Topics in the role first (suggested order), then the rest as optional reading.
  const topics = useMemo(
    () => [...domain.topics.filter(topicInRole), ...domain.topics.filter((topic) => !topicInRole(topic))],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [domain, roleId, index],
  );

  const topic =
    topics.find((item) => item.id === topicId) ??
    topics.find((item) => item.id === domainId) ??
    topics.find((item) => topicInRole(item) && topicProgress(topicArticles(item), learner) !== 'done') ??
    topics[0];

  useEffect(() => {
    const next = new URLSearchParams();
    next.set('domain', domain.id);
    if (topic) next.set('topic', topic.id);
    const search = `?${next.toString()}`;
    if (search !== location.search) history.replace({search});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain.id, topic?.id]);

  // Domains in the role first, then the optional ones, each group in its original order.
  const domains = useMemo(
    () => [
      ...index.domains.filter((item) => roleTopics(item).length > 0),
      ...index.domains.filter((item) => roleTopics(item).length === 0),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [roleId, index],
  );

  const position = topic ? topics.indexOf(topic) + 1 : 0;
  const articles = topic ? topicArticles(topic) : [];
  const priority = highestPriority(articles.filter(inRole));
  const meta = `${domain.label} / 主题 ${position} / ${topics.length}${role && priority && topic && topicInRole(topic) ? ` · ${role.label}${PRIORITY_LABELS[priority]}` : ''}`;

  return (
    <main className={styles.page}>
        <div className={styles.roles}>
          <span className={styles.rolesLabel}>我的目标岗位</span>
          <div className={styles.rolePills}>
            {index.roles.map((item) => (
              <button
                key={item.id}
                type="button"
                className={clsx(styles.pill, item.id === roleId && styles.pillActive)}
                onClick={() => learnerActions.setPreferences({roleId: item.id})}>
                {item.label}
              </button>
            ))}
            <button
              type="button"
              className={clsx(styles.pill, !roleId && styles.pillActive)}
              onClick={() => learnerActions.setPreferences({roleId: undefined})}>
              全部
            </button>
          </div>
          <span className={styles.rolesHint}>{role ? '高亮为这个岗位面试常考的内容，其余为选读' : '显示全部领域与主题'}</span>
        </div>

        <div className={styles.columns}>
          <nav className={styles.domains} aria-label="领域">
            <div className={styles.columnLabel}>领域</div>
            {domains.map((item) => {
              const list = roleTopics(item);
              const optional = Boolean(roleId) && list.length === 0;
              const done = list.filter((t) => topicProgress(topicArticles(t).filter(inRole), learner) === 'done').length;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={clsx(styles.domain, item.id === domain.id && styles.domainActive, optional && styles.domainOptional)}
                  onClick={() => {
                    setDomainId(item.id);
                    setTopicId(undefined);
                  }}>
                  <span>{item.label}</span>
                  <span className={styles.domainCount}>
                    {optional ? '选修' : features ? `${done} / ${list.length}` : `${list.length} 个主题`}
                  </span>
                </button>
              );
            })}
          </nav>

          <nav className={styles.articles} aria-label="主题">
            <div className={styles.columnLabel}>{domain.label} · 主题（建议顺序）</div>
            {topics.map((item) => {
              const list = topicArticles(item);
              const optional = !topicInRole(item) || highestPriority(list.filter(inRole)) === 'optional';
              const itemPriority = highestPriority(list.filter(inRole));
              return (
                <button
                  key={item.id}
                  type="button"
                  className={clsx(styles.article, item.id === topic?.id && styles.articleActive, optional && styles.articleOptional)}
                  onClick={() => setTopicId(item.id)}>
                  <ProgressMark progress={topicProgress(list, learner)} optional={optional} />
                  <span>{item.label}</span>
                  {list.length > 1 && <span className={styles.topicCount}>{list.length} 篇</span>}
                  {itemPriority === 'must' && topicInRole(item) && <span className={styles.tagMust}>必会</span>}
                  {optional && <span className={styles.tagOptional}>{topicInRole(item) ? '按岗选学' : '选读'}</span>}
                </button>
              );
            })}
          </nav>

          {topic && articles.length > 1 && (
            <TopicArticles topic={topic} articles={articles} meta={meta} inRole={inRole} learner={learner} features={features} />
          )}
          {topic && articles.length === 1 && <ArticleSections article={articles[0]} meta={meta} learner={learner} features={features} />}
        </div>
    </main>
  );
}

/** Right column for a topic with several articles: the articles themselves. */
function TopicArticles({
  topic,
  articles,
  meta,
  inRole,
  learner,
  features,
}: {
  topic: Topic;
  articles: ArticleIndex[];
  meta: string;
  inRole: (article: ArticleIndex) => boolean;
  learner: LearnerState;
  features: boolean;
}) {
  const minutes = articles.reduce((sum, article) => sum + article.minutes, 0);
  const cards = articles.reduce((sum, article) => sum + article.cardIds.length, 0);
  const done = articles.filter((article) => learner.reading[article.id]?.done).length;
  const next =
    articles.find((article) => learner.reading[article.id] && !learner.reading[article.id].done) ??
    articles.find((article) => inRole(article) && !learner.reading[article.id]) ??
    articles.find((article) => !learner.reading[article.id]?.done);
  const nextIndex = next ? articles.indexOf(next) + 1 : 0;
  const started = articles.some((article) => learner.reading[article.id]);

  return (
    <section className={styles.detail} aria-labelledby="topic-title">
      <div className={styles.detailHead}>
        <span className={styles.detailMeta}>{meta}</span>
        <h1 id="topic-title" className={styles.detailTitle}>
          {topic.label}
        </h1>
        <span className={styles.detailFacts}>
          {articles.length} 篇 · 约 {minutes} 分钟 · {cards} 道面试题
          {done ? ` · 已读 ${done} 篇` : ''}
        </span>
      </div>

      <ol className={styles.sections}>
        {articles.map((article, i) => {
          const status = articleProgress(article, learner);
          const optional = !inRole(article);
          return (
            <li
              key={article.id}
              className={clsx(styles.section, status === 'reading' && styles.sectionReading, status === 'done' && styles.sectionRead)}>
              <Link to={article.permalink} className={styles.sectionTitle}>
                {i + 1}. {article.title}
                {article.priority === 'must' && !optional && <span className={styles.inlineMust}>必会</span>}
                {optional && <span className={styles.inlineOptional}>选读</span>}
              </Link>
              <span className={clsx(styles.sectionStatus, status === 'reading' && styles.green)}>
                {status === 'done' ? '已读' : status === 'reading' ? '阅读中' : `${article.minutes} 分钟`}
              </span>
              <span className={clsx(styles.sectionCards, status === 'done' && article.cardIds.length > 0 && styles.green)}>
                {article.cardIds.length ? `${article.cardIds.length} 题` : '—'}
              </span>
            </li>
          );
        })}
      </ol>

      {next && (
        <div className={styles.actions}>
          <Link className={styles.primary} to={next.permalink}>
            {started ? `继续读第 ${nextIndex} 篇 →` : '从第 1 篇开始 →'}
          </Link>
          {features && <span className={styles.actionsHint}>读过的文章，面试题会自动进入复习</span>}
        </div>
      )}
    </section>
  );
}

/** Right column for a single-article topic: its sections. */
function ArticleSections({article, meta, learner, features}: {article: ArticleIndex; meta: string; learner: LearnerState; features: boolean}) {
  const index = useLearningIndex();
  const sections = outlineSections(article);
  const reading = learner.reading[article.id];
  const resumeIndex = reading && !reading.done ? Math.min(reading.furthest, sections.length - 1) : 0;
  const resume = sections[resumeIndex];
  const action = reading?.done
    ? {label: '重新阅读 →', to: article.permalink}
    : reading
      ? {label: `继续读第 ${resume?.number ?? resumeIndex + 1} 节 →`, to: `${article.permalink}#${resume?.id ?? ''}`}
      : {label: '开始阅读 →', to: article.permalink};

  return (
    <section className={styles.detail} aria-labelledby="topic-title">
      <div className={styles.detailHead}>
        <span className={styles.detailMeta}>{meta}</span>
        <h1 id="topic-title" className={styles.detailTitle}>
          {article.title}
        </h1>
        <span className={styles.detailFacts}>
          {sections.length} 节 · 约 {article.minutes} 分钟 · {article.cardIds.length} 道面试题
          {reading && !reading.done && resume ? ` · 读到第 ${resume.number ?? resumeIndex + 1} 节` : ''}
          {reading?.done ? ' · 已读完' : ''}
        </span>
      </div>

      <ol className={styles.sections}>
        {sections.map((section, i) => {
          const status = sectionReadStatus(i, reading);
          const count = cardsInSection(index, article, section.id).length;
          return (
            <li key={section.id} className={clsx(styles.section, status === 'reading' && styles.sectionReading, status === 'read' && styles.sectionRead)}>
              <Link to={`${article.permalink}#${section.id}`} className={styles.sectionTitle}>
                {section.number ? `${section.number}. ` : ''}
                {section.title}
              </Link>
              <span className={clsx(styles.sectionStatus, status === 'reading' && styles.green)}>
                {status === 'read' ? '已读' : status === 'reading' ? '阅读中' : ''}
              </span>
              <span className={clsx(styles.sectionCards, status === 'read' && count > 0 && styles.green)}>{count ? `${count} 题` : '—'}</span>
            </li>
          );
        })}
      </ol>

      <div className={styles.actions}>
        <Link className={styles.primary} to={action.to}>
          {action.label}
        </Link>
        {features && <span className={styles.actionsHint}>读过的章节，面试题会自动进入复习</span>}
      </div>
    </section>
  );
}
