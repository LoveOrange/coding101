import React from 'react';
import Link from '@docusaurus/Link';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import {javaInterviewRoadmap} from '../../data/interviewRoadmaps/java';
import resources from '../../data/reviewPlans/javaReadingResources.json';
import type {RoadmapTopic} from '../InterviewRoadmap';

type Reading = {scope: string; coreHref: string};
type Question = {title: string; href: string};
const readings = resources.articles as Record<string, Reading>;
const prerequisites = resources.prerequisites as Record<string, string[]>;
const questions = resources.questions as Record<string, Question[]>;
const topics = javaInterviewRoadmap.phases.flatMap((phase) => phase.topics);
const byId = new Map(topics.map((topic) => [topic.id, topic]));

function orderedCoreTopics() {
  const result: RoadmapTopic[] = [];
  const seen = new Set<string>();
  function add(topic: RoadmapTopic) {
    if (seen.has(topic.id)) return;
    seen.add(topic.id);
    (prerequisites[topic.id] ?? []).forEach((id) => add(byId.get(id)!));
    result.push(topic);
  }
  topics.filter((topic) => topic.priority === 'must').forEach(add);
  return result;
}

export function CoreReadingGuide(): JSX.Element {
  const ordered = orderedCoreTopics();
  const links = useBrokenLinks();
  ordered.forEach((topic) => links.collectAnchor(topic.id));
  return <>
    <nav aria-label="核心主题目录"><ol>{ordered.map((topic) => <li key={topic.id}><Link to={`#${topic.id}`}>{topic.title}</Link></li>)}</ol></nav>
    {ordered.map((topic, index) => (
      <section key={topic.id} id={topic.id} style={{scrollMarginTop: '5rem', marginBottom: '2.5rem'}}>
        <h3>{index + 1}. {topic.title}</h3>
        <p><strong>前置：</strong>{prerequisites[topic.id]?.length ? prerequisites[topic.id].map((id, n) => <React.Fragment key={id}>{n > 0 && '、'}<Link to={`#${id}`}>{byId.get(id)!.title}</Link></React.Fragment>) : '能读懂简单 Java 代码；遇到术语可先查通用基础。'}</p>
        <ul>{topic.articles.filter((article) => article.core).map((article) => {
          const reading = readings[article.href!];
          return <li key={article.href}><Link to={reading?.coreHref ?? article.href!}>{article.title}</Link>：{reading?.scope ?? article.scope}</li>;
        })}</ul>
        <p><strong>停止条件：</strong>{topic.firstRound?.outcomes.join(' ')}</p>
        <p><Link to={`/docs/interview/questions#${topic.id}`}>本主题题目与参考回答</Link> · <Link to={`/java-interview-roadmap/?round=all#${topic.id}`}>查看完整范围与深入文章</Link></p>
      </section>
    ))}
  </>;
}

export function TopicQuestionIndex(): JSX.Element {
  const links = useBrokenLinks();
  topics.forEach((topic) => links.collectAnchor(topic.id));
  return <>
    <nav aria-label="题目主题目录"><ul>{topics.map((topic) => <li key={topic.id}><Link to={`#${topic.id}`}>{topic.title}</Link></li>)}</ul></nav>
    {topics.map((topic) => (
      <section key={topic.id} id={topic.id} style={{scrollMarginTop: '5rem', marginBottom: '1.5rem'}}>
        <details><summary>{topic.title}</summary>
          {topic.articles.filter((article) => questions[article.href!]?.length).map((article) => <div key={article.href}>
            <p><strong><Link to={article.href!}>{article.title}</Link></strong></p>
            <ul>{questions[article.href!].map((question) => <li key={question.href}><Link to={question.href}>{question.title}</Link></li>)}</ul>
          </div>)}
          <p><Link to={`/java-interview-roadmap/?round=all#${topic.id}`}>返回主题阅读范围</Link></p>
        </details>
      </section>
    ))}
  </>;
}
