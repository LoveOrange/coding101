import React, {useEffect, useMemo, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import {useHistory, useLocation} from '@docusaurus/router';
import useBrokenLinks from '@docusaurus/useBrokenLinks';

import type {ReviewPlan} from '../Review/types';
import styles from './styles.module.css';
import readingResources from '../../data/reviewPlans/javaReadingResources.json';
const coreReadings = readingResources.articles as Record<string, {scope: string; coreHref: string}>;

export type RoadmapDepth = 'foundation' | 'mechanism' | 'scenario';
export type RoadmapPriority = 'must' | 'common' | 'optional';
export type RoadmapArticle = {
  title: string;
  href?: string;
  core: boolean;
  scope?: string;
};
export type RoadmapTopicDetail = {
  outcomes: string[];
  interviewQuestions: string[];
};
export type RoadmapTopic = {
  id: string;
  title: string;
  depth: RoadmapDepth;
  priority: RoadmapPriority;
  details: RoadmapTopicDetail;
  firstRound?: {outcomes: string[]; questions: string[]};
  guide?: ReviewPlan;
  articles: RoadmapArticle[];
};
export type RoadmapPhase = {id: string; title: string; topics: RoadmapTopic[]};
export type InterviewRoadmapData = {
  id: string;
  title: string;
  introduction: string;
  reviewHint: string;
  phases: RoadmapPhase[];
};

type Round = 'first' | 'second' | 'optional' | 'all';
const ROUNDS: Record<Round, {label: string; description: string}> = {
  first: {
    label: '第一轮 · 必会',
    description:
      '先掌握能支撑基础回答的核心机制。按顺序复习，能解释本项问题即可继续。',
  },
  second: {
    label: '第二轮 · 常考与追问',
    description:
      '补充常考主题，并回到第一轮知识继续深入。已学主题在这里展示深入阅读。',
  },
  optional: {
    label: '按岗选学',
    description:
      '根据 JD、项目经历和目标面试选择；有明确需要时，也可以提前学习。',
  },
  all: {
    label: '全部内容',
    description: '按具体问题查找完整复习范围。需要顺序复习时，可以切回第一轮。',
  },
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

function isInRound(topic: RoadmapTopic, round: Round) {
  if (round === 'all') return true;
  if (round === 'first') return topic.priority === 'must';
  if (round === 'optional') return topic.priority === 'optional';
  return (
    topic.priority === 'common' ||
    (topic.priority === 'must' &&
      topic.articles.some((article) => !article.core))
  );
}
function isDeepReview(topic: RoadmapTopic, round: Round) {
  return round === 'second' && topic.priority === 'must';
}
function articlesFor(topic: RoadmapTopic, round: Round) {
  return topic.articles.filter((article) =>
    isDeepReview(topic, round) ? !article.core : article.core,
  );
}
function outcomesFor(topic: RoadmapTopic, round: Round) {
  return !isDeepReview(topic, round) && topic.firstRound
    ? topic.firstRound.outcomes
    : topic.details.outcomes;
}
function questionsFor(topic: RoadmapTopic, round: Round) {
  return !isDeepReview(topic, round) && topic.firstRound
    ? topic.firstRound.questions
    : topic.details.interviewQuestions;
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
  const {search, hash, pathname} = useLocation();
  const history = useHistory();
  const [round, setRound] = useState<Round>('first');
  const [selectedTopic, setSelectedTopic] = useState<RoadmapTopic>(topics[0]);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const requested = new URLSearchParams(search).get('round');
    if (requested && Object.prototype.hasOwnProperty.call(ROUNDS, requested)) {
      setRound(requested as Round);
    } else {
      const target =
        topics.find((topic) => `#${topic.id}` === hash) ??
        roadmap.phases.find((phase) => `#${phase.id}` === hash)?.topics[0];
      setRound(
        target?.priority === 'common'
          ? 'second'
          : target?.priority === 'optional'
            ? 'optional'
            : 'first',
      );
    }
  }, [search, hash, topics, roadmap.phases]);
  useEffect(() => {
    if (!hash) return;
    const frame = requestAnimationFrame(() =>
      document.getElementById(hash.slice(1))?.scrollIntoView(),
    );
    return () => cancelAnimationFrame(frame);
  }, [hash, round]);

  const visibleTopics = topics.filter((topic) => isInRound(topic, round));
  const selectedArticles = articlesFor(selectedTopic, round);
  const extraArticles = selectedTopic.articles.filter(
    (article) => !selectedArticles.includes(article),
  );
  const guide = !isDeepReview(selectedTopic, round)
    ? selectedTopic.guide
    : undefined;
  let sequence = 0;

  function changeRound(value: Round) {
    setRound(value);
    history.replace({pathname, search: `?round=${value}`, hash: ''});
  }
  function openTopic(topic: RoadmapTopic) {
    setSelectedTopic(topic);
    dialogRef.current?.showModal();
  }
  function articleList(articles: RoadmapArticle[]) {
    return (
      <ol className={styles.articleList}>
        {articles.map((article) => (
          <li key={article.title}>
            <div>
              {article.href ? (
                <Link to={article.core && !isDeepReview(selectedTopic, round) ? coreReadings[article.href]?.coreHref ?? article.href : article.href}>
                  {article.title}
                </Link>
              ) : (
                <span>{article.title} · 待补充</span>
              )}
              {article.core && !isDeepReview(selectedTopic, round) && <small>{coreReadings[article.href ?? '']?.scope ?? article.scope}</small>}
            </div>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <>
      <main className={styles.page}>
        <header className={styles.intro}>
          <div className={styles.breadcrumb}>
            <Link to="/interview-roadmaps/">岗位复习路线</Link>
            <span>/</span>
            <span>Java 后端</span>
          </div>
          <h1>{roadmap.title}</h1>
          <p>{roadmap.introduction}</p>
        </header>
        <nav className={styles.rounds} aria-label="选择复习范围">
          {(Object.keys(ROUNDS) as Round[]).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={round === value}
              onClick={() => changeRound(value)}
            >
              {ROUNDS[value].label}
            </button>
          ))}
        </nav>
        <section className={styles.start} aria-label="复习资源入口">
          <div className={styles.startMain}>
            <span className={styles.kicker}>Java 校招准备</span>
            <h2>先确定范围，再按主题阅读</h2>
            <p>查看岗位要求与核心阅读边界，按自己的时间选择内容。日程和复习笔记由你自行安排。</p>
            <div className={styles.actions}>
              <Link className="button button--primary" to="/docs/interview/java-campus-review">两周与一个月的阅读范围</Link>
              <Link to="/docs/interview/campus-2027/">2027 校招岗位与投递</Link>
              <Link to="/docs/interview/resume">简历准备</Link>
              <Link to="/docs/interview/questions">代表题与练习</Link>
            </div>
          </div>
        </section>
        <div className={styles.scope}>
          <h2>{ROUNDS[round].label}</h2>
          <p>{ROUNDS[round].description}</p>
        </div>
        <div className={styles.outline}>
          {roadmap.phases.map((phase) => {
            const phaseTopics = phase.topics.filter((topic) =>
              isInRound(topic, round),
            );
            if (!phaseTopics.length) return null;
            return (
              <section className={styles.phase} key={phase.id} id={phase.id}>
                <header className={styles.phaseHeader}>
                  <h3>{phase.title}</h3>
                  <span>{phaseTopics.length} 项</span>
                </header>
                {phaseTopics.map((topic) => {
                  const deep = isDeepReview(topic, round);
                  sequence += 1;
                  return (
                    <article
                      className={styles.topic}
                      key={topic.id}
                      id={topic.id}
                    >
                      <span className={styles.number}>
                        {String(sequence).padStart(2, '0')}
                      </span>
                      <div className={styles.topicBody}>
                        <div className={styles.topicHeading}>
                          <h4>{topic.title}</h4>
                          <span className={styles.tag}>
                            {deep
                              ? '深入阅读'
                              : PRIORITY_LABELS[topic.priority]}
                          </span>
                        </div>
                        <p>{outcomesFor(topic, round)[0]}</p>
                        <div className={styles.meta}>
                          <span>{DEPTH_LABELS[topic.depth]}</span>
                          <span>
                            {
                              articlesFor(topic, round).filter(
                                (article) => article.href,
                              ).length
                            }{' '}
                            篇{deep ? '深入阅读' : '核心阅读'}
                          </span>
                        </div>
                      </div>
                      <div className={styles.topicAction}>
                        {topic.guide && !deep ? (
                          <Link to={topic.guide.href}>查看重点 →</Link>
                        ) : (
                          <button
                            type="button"
                            onClick={() => openTopic(topic)}
                          >
                            查看重点 →
                          </button>
                        )}
                      </div>
                    </article>
                  );
                })}
              </section>
            );
          })}
        </div>
        <details className={styles.help}>
          <summary>复习优先级与回答深度</summary>
          <p>{roadmap.reviewHint}</p>
          <p>
            基础回答：说清定义和差异。原理解释：讲清关键执行链路。场景分析：结合约束说明选择和代价。
          </p>
        </details>
      </main>
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="topic-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        <header className={styles.dialogHeader}>
          <div>
            <span>{ROUNDS[round].label}</span>
            <h2 id="topic-title">{selectedTopic.title}</h2>
          </div>
          <form method="dialog">
            <button type="submit" aria-label="关闭专题">
              关闭
            </button>
          </form>
        </header>
        <div className={styles.dialogBody}>
          {selectedTopic.priority === 'must' && <p><Link to={`/docs/interview/java-campus-review#${selectedTopic.id}`}>查看前置知识与核心导读</Link></p>}
          <h3>本轮需要会什么</h3>
          <ul>
            {outcomesFor(selectedTopic, round).map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
          {guide ? (
            <Link className="button button--primary" to={guide.href}>
              进入本轮导读与阅读
            </Link>
          ) : (
            <>
              <h3>
                {isDeepReview(selectedTopic, round)
                  ? '本轮深入阅读'
                  : '本轮核心阅读'}
              </h3>
              {articleList(selectedArticles)}
              <h3>自行检查</h3>
              <ul>
                {questionsFor(selectedTopic, round).map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
              <p className={styles.feedback}>
                先独立解释，再对照文章中的参考回答。<Link to={`/docs/interview/questions#${selectedTopic.id}`}>按主题查找代表题与练习</Link>。
              </p>
            </>
          )}
          {extraArticles.length > 0 && (
            <details className={styles.more}>
              <summary>
                {isDeepReview(selectedTopic, round)
                  ? '回顾核心内容'
                  : '后续阅读'}{' '}
                · {extraArticles.length} 篇
              </summary>
              {articleList(extraArticles)}
            </details>
          )}
        </div>
      </dialog>
    </>
  );
}
