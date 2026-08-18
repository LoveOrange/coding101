import React, {useMemo, useRef, useState} from 'react';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

export type RoadmapLevel = 'junior' | 'middle' | 'senior';
export type RoadmapPriority = 'high' | 'important' | 'extension';

export type RoadmapArticle = {
  title: string;
  href?: string;
};

export type RoadmapTopic = {
  id: string;
  title: string;
  module: string;
  level: RoadmapLevel;
  priority: RoadmapPriority;
  objective: string;
  articleCount: number;
  articles: RoadmapArticle[];
};

export type RoadmapPhase = {
  id: string;
  order: string;
  title: string;
  range: string;
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

const LEVEL_LABELS: Record<RoadmapLevel, string> = {
  junior: '初级',
  middle: '中级',
  senior: '高级',
};

const PRIORITY_LABELS: Record<RoadmapPriority, string> = {
  high: '高频',
  important: '重点',
  extension: '扩展',
};

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
  const [selectedTopic, setSelectedTopic] = useState<RoadmapTopic>(topics[0]);
  const dialogRef = useRef<HTMLDialogElement>(null);
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
          </header>

          <section className={styles.legend} aria-label="路线图例">
            <div>
              <strong>Level</strong>
              {Object.entries(LEVEL_LABELS).map(([level, label]) => (
                <span
                  key={level}
                  className={`${styles.levelTag} ${styles[level]}`}>
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
                  <strong>{phase.range}</strong>
                </header>

                <div className={styles.topicTable}>
                  <div className={styles.tableHeader} aria-hidden="true">
                    <span>#</span>
                    <span>Topic</span>
                    <span>Module</span>
                    <span>Level</span>
                    <span>优先级</span>
                    <span>学习目标</span>
                    <span>文章</span>
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
                        <span className={`${styles.levelTag} ${styles[topic.level]}`}>
                          {LEVEL_LABELS[topic.level]}
                        </span>
                        <span
                          className={`${styles.priorityTag} ${styles[topic.priority]}`}>
                          {PRIORITY_LABELS[topic.priority]}
                        </span>
                        <p className={styles.objective}>{topic.objective}</p>
                        <span className={styles.articleCount}>
                          {topic.articleCount} 篇
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
          <span className={`${styles.levelTag} ${styles[selectedTopic.level]}`}>
            {LEVEL_LABELS[selectedTopic.level]}
          </span>
          <span
            className={`${styles.priorityTag} ${styles[selectedTopic.priority]}`}>
            {PRIORITY_LABELS[selectedTopic.priority]}
          </span>
          <span>计划 {selectedTopic.articleCount} 篇文章</span>
        </div>

        <section className={styles.articleSeries}>
          <h3>专题文章</h3>
          <ol>
            {selectedTopic.articles.map((article) => (
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
          {selectedTopic.articleCount > selectedTopic.articles.length && (
            <p>这里先列出主干文章，其余内容会随着专题建设逐步补充。</p>
          )}
        </section>
      </dialog>
    </>
  );
}
