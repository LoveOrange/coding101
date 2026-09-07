import React, {useMemo, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import useBrokenLinks from '@docusaurus/useBrokenLinks';

import styles from './styles.module.css';

export type RoadmapDepth = 'foundation' | 'mechanism' | 'scenario';
export type RoadmapPriority = 'must' | 'common' | 'optional';

export type RoadmapArticle = {
  title: string;
  href?: string;
};

export type RoadmapTopicDetail = {
  mechanism: string;
  outcomes: string[];
  interviewQuestions: string[];
};

export type RoadmapTopic = {
  id: string;
  title: string;
  module: string;
  depth: RoadmapDepth;
  priority: RoadmapPriority;
  objective: string;
  details: RoadmapTopicDetail;
  articles: RoadmapArticle[];
  coreArticleCount?: number;
};

export type RoadmapPhase = {
  id: string;
  order: string;
  title: string;
  focus: string;
  description: string;
  topics: RoadmapTopic[];
};

export type RoadmapNavigationItem = {
  label: string;
  href?: string;
  state?: 'active' | 'planned';
  badge?: string;
};

export type RoadmapNavigationGroup = {
  label: string;
  items: RoadmapNavigationItem[];
};

export type InterviewRoadmapData = {
  eyebrow: string;
  title: string;
  introduction: string;
  reviewHint: string;
  navigationTitle: string;
  mobileNavigationLabel: string;
  navigationGroups: RoadmapNavigationGroup[];
  phases: RoadmapPhase[];
};

const DEPTH_LABELS: Record<RoadmapDepth, string> = {
  foundation: '基础回答',
  mechanism: '原理解释',
  scenario: '场景分析',
};

const PRIORITY_LABELS: Record<RoadmapPriority, string> = {
  must: '必会',
  common: '常考',
  optional: '按岗选学',
};

function getCoreArticleCount(topic: RoadmapTopic): number {
  const fallback = topic.priority === 'optional' ? 1 : 2;
  return Math.min(topic.coreArticleCount ?? fallback, topic.articles.length);
}

function ArticleList({articles}: {articles: RoadmapArticle[]}): JSX.Element {
  return (
    <ol>
      {articles.map((article) => (
        <li key={article.title}>
          {article.href ? (
            <Link to={article.href}>{article.title}</Link>
          ) : (
            <span>{article.title}</span>
          )}
          {!article.href && <small>规划中</small>}
        </li>
      ))}
    </ol>
  );
}

function RouteNavigation({
  groups,
  title,
  mobileLabel,
  mobile = false,
}: {
  groups: RoadmapNavigationGroup[];
  title: string;
  mobileLabel: string;
  mobile?: boolean;
}) {
  const content = groups.map((group) => (
    <div key={group.label} className={styles.routeGroup}>
      <span className={styles.routeGroupLabel}>{group.label}</span>
      {group.items.map((item) => {
        if (item.href) {
          return (
            <Link key={item.label} className={styles.routeLink} to={item.href}>
              {item.label}
            </Link>
          );
        }

        if (item.state === 'active') {
          return (
            <span key={item.label} className={styles.activeRoute}>
              {item.label}
            </span>
          );
        }

        return (
          <span key={item.label} className={styles.plannedRoute}>
            <span>{item.label}</span>
            <small>{item.badge ?? '规划中'}</small>
          </span>
        );
      })}
    </div>
  ));

  if (mobile) {
    return (
      <details className={styles.mobileRoutes}>
        <summary>{mobileLabel}</summary>
        <nav aria-label={title}>{content}</nav>
      </details>
    );
  }

  return (
    <aside className={styles.routeSidebar}>
      <h2>{title}</h2>
      <nav aria-label={title}>{content}</nav>
    </aside>
  );
}

export default function InterviewRoadmap({
  roadmap,
}: {
  roadmap: InterviewRoadmapData;
}): JSX.Element {
  const topics = useMemo(
    () => roadmap.phases.flatMap((phase) => phase.topics),
    [roadmap.phases],
  );
  const brokenLinks = useBrokenLinks();
  roadmap.phases.forEach((phase) => brokenLinks.collectAnchor(phase.id));
  topics.forEach((topic) => brokenLinks.collectAnchor(topic.id));
  const mustTopics = topics.filter((topic) => topic.priority === 'must');
  const firstRoundArticleCount = mustTopics.reduce(
    (count, topic) => count + getCoreArticleCount(topic),
    0,
  );
  const [selectedTopic, setSelectedTopic] = useState<RoadmapTopic>(topics[0]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selectedCoreArticleCount = getCoreArticleCount(selectedTopic);
  const selectedCoreArticles = selectedTopic.articles.slice(
    0,
    selectedCoreArticleCount,
  );
  const selectedDeepArticles = selectedTopic.articles.slice(
    selectedCoreArticleCount,
  );
  let sequence = 0;

  function openTopic(topic: RoadmapTopic) {
    setSelectedTopic(topic);
    dialogRef.current?.showModal();
  }

  return (
    <>
      <main className={styles.page}>
        <RouteNavigation
          groups={roadmap.navigationGroups}
          title={roadmap.navigationTitle}
          mobileLabel={roadmap.mobileNavigationLabel}
        />

        <article className={styles.content}>
          <RouteNavigation
            groups={roadmap.navigationGroups}
            title={roadmap.navigationTitle}
            mobileLabel={roadmap.mobileNavigationLabel}
            mobile
          />

          <header className={styles.intro}>
            <p className={styles.eyebrow}>{roadmap.eyebrow}</p>
            <h1>{roadmap.title}</h1>
            <p>{roadmap.introduction}</p>
            <div className={styles.routeStats}>
              <span>第一轮</span>
              <strong>{mustTopics.length} 个必会 Topic</strong>
              <strong>{firstRoundArticleCount} 篇核心阅读</strong>
            </div>
          </header>

          <section className={styles.legend} aria-label="路线图例">
            <div>
              <strong>回答深度</strong>
              {Object.entries(DEPTH_LABELS).map(([depth, label]) => (
                <span
                  key={depth}
                  className={`${styles.depthTag} ${styles[depth]}`}>
                  {label}
                </span>
              ))}
            </div>
            <div>
              <strong>面试优先级</strong>
              {Object.entries(PRIORITY_LABELS).map(([priority, label]) => (
                <span
                  key={priority}
                  className={`${styles.priorityTag} ${styles[priority]}`}>
                  {label}
                </span>
              ))}
            </div>
            <p>{roadmap.reviewHint}</p>
          </section>

          <div className={styles.routeOutline}>
            {roadmap.phases.map((phase) => (
              <section key={phase.id} className={styles.phase} id={phase.id}>
                <header className={styles.phaseHeader}>
                  <span>{phase.order}</span>
                  <div>
                    <h2>{phase.title}</h2>
                    <p>{phase.description}</p>
                  </div>
                  <strong>{phase.focus}</strong>
                </header>

                <div className={styles.topicTable}>
                  <div className={styles.tableHeader} aria-hidden="true">
                    <span>#</span>
                    <span>Topic</span>
                    <span>Module</span>
                    <span>深度</span>
                    <span>优先级</span>
                    <span>学习目标</span>
                    <span>核心阅读</span>
                    <span>入口</span>
                  </div>

                  {phase.topics.map((topic) => {
                    sequence += 1;
                    return (
                      <div key={topic.id} className={styles.topicRow} id={topic.id}>
                        <span className={styles.sequence}>
                          {String(sequence).padStart(2, '0')}
                        </span>
                        <strong className={styles.topicTitle}>{topic.title}</strong>
                        <span className={styles.module}>{topic.module}</span>
                        <span className={`${styles.depthTag} ${styles[topic.depth]}`}>
                          {DEPTH_LABELS[topic.depth]}
                        </span>
                        <span
                          className={`${styles.priorityTag} ${styles[topic.priority]}`}>
                          {PRIORITY_LABELS[topic.priority]}
                        </span>
                        <p className={styles.objective}>{topic.objective}</p>
                        <span className={styles.articleCount}>
                          {getCoreArticleCount(topic)} / {topic.articles.length} 篇
                        </span>
                        <button
                          type="button"
                          className={styles.topicEntry}
                          onClick={() => openTopic(topic)}>
                          进入专题
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>

      <dialog ref={dialogRef} className={styles.topicDialog}>
        <div className={styles.dialogHeader}>
          <div>
            <span>{selectedTopic.module}</span>
            <h2>{selectedTopic.title}</h2>
          </div>
          <form method="dialog">
            <button type="submit" aria-label="关闭专题">
              关闭
            </button>
          </form>
        </div>

        <p className={styles.dialogObjective}>{selectedTopic.objective}</p>
        <div className={styles.dialogMeta}>
          <span className={`${styles.depthTag} ${styles[selectedTopic.depth]}`}>
            {DEPTH_LABELS[selectedTopic.depth]}
          </span>
          <span
            className={`${styles.priorityTag} ${styles[selectedTopic.priority]}`}>
            {PRIORITY_LABELS[selectedTopic.priority]}
          </span>
          <span>
            核心 {selectedCoreArticleCount} / 共 {selectedTopic.articles.length} 篇
          </span>
        </div>

        <section className={styles.topicDetails}>
          <div>
            <h3>核心结论</h3>
            <p>{selectedTopic.details.mechanism}</p>
          </div>
          <div>
            <h3>复习到这里</h3>
            <ul>
              {selectedTopic.details.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>自测问题</h3>
            <ul>
              {selectedTopic.details.interviewQuestions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.articleSeries}>
          <h3>核心阅读</h3>
          <ArticleList articles={selectedCoreArticles} />
          {selectedDeepArticles.length > 0 && (
            <details className={styles.deepArticles}>
              <summary>深入阅读（{selectedDeepArticles.length} 篇）</summary>
              <ArticleList articles={selectedDeepArticles} />
            </details>
          )}
        </section>
      </dialog>
    </>
  );
}
