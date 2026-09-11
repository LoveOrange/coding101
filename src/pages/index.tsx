import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import IconArrow from '@theme/Icon/Arrow';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import {javaInterviewRoadmap} from '@site/src/data/interviewRoadmaps/java';

import styles from './index.module.css';

const firstRoundTopics = javaInterviewRoadmap.phases
  .flatMap((phase) => phase.topics)
  .filter((topic) => topic.priority === 'must');

const subjects = [
  {
    title: '基础知识',
    description: '编程语言、数据结构、网络、数据库与缓存。',
    href: '/docs/basic-knowledge/',
    label: 'FOUNDATIONS',
  },
  {
    title: '算法与练习',
    description: '理解常见数据结构与算法，再通过题目练习。',
    href: '/docs/basic-knowledge/algorithms/',
    label: 'ALGORITHMS',
  },
  {
    title: '系统设计',
    description: '围绕需求、约束和代价，练习系统设计分析。',
    href: '/docs/system-design/',
    label: 'SYSTEM DESIGN',
  },
  {
    title: '面试准备',
    description: '查看岗位要求，准备简历、项目经历与面试表达。',
    href: '/docs/interview/',
    label: 'INTERVIEW PREP',
  },
];

function HomepageHeader() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>CODING 101 · 技术求职准备</p>
          <h1 className={styles.title}>
            技术面试准备，
            <span>从核心知识开始。</span>
          </h1>
          <p className={styles.description}>
            面向学生、转岗者和在职求职者，按目标岗位确定复习范围，掌握核心知识，再用面试题检验理解。
          </p>
          <div className={styles.actions}>
            <Link className="button button--primary button--lg" to="/java-interview-roadmap/">
              开始 Java 第一轮复习
              <IconArrow viewBox="0 0 20 20" className={styles.arrow} />
            </Link>
            <Link className={styles.secondaryLink} to="/interview-roadmaps/">
              查看岗位路线
            </Link>
          </div>
          <p className={styles.heroNote}>
            <Link to="/docs/interview/campus-2027/">2027 校招岗位与投递</Link> · <Link to="/docs/interview/resume">简历准备</Link> · <Link to="/docs/intro">使用指南</Link>
          </p>
        </div>

        <section className={styles.roadmap} aria-labelledby="featured-roadmap-title">
          <div className={styles.roadmapTopline}>
            <span>从这里开始</span>
            <span className={styles.roundLabel}>第一轮 · 必会</span>
          </div>
          <h2 id="featured-roadmap-title">
            {javaInterviewRoadmap.title}
          </h2>
          <p className={styles.roadmapDescription}>
            已有 Java 基础？先按顺序完成核心复习。
          </p>
          <ol className={styles.topicList}>
            {firstRoundTopics.slice(0, 3).map((topic, index) => (
              <li key={topic.id}>
                <Link to={`/java-interview-roadmap/#${topic.id}`}>
                  <span className={styles.topicNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.topicTitle}>{topic.title}</span>
                  <IconArrow viewBox="0 0 20 20" className={styles.arrow} />
                </Link>
              </li>
            ))}
          </ol>
          <Link className={styles.roadmapFooter} to="/java-interview-roadmap/">
            <span>查看全部 {firstRoundTopics.length} 项必会主题</span>
            <IconArrow viewBox="0 0 20 20" className={styles.arrow} />
          </Link>
        </section>
      </div>
    </header>
  );
}

function SubjectDirectory() {
  return (
    <section className={styles.directory} aria-labelledby="subjects-title">
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.eyebrow}>按主题查阅</p>
          <h2 id="subjects-title">补齐当前需要的知识</h2>
        </div>
        <p>带着问题阅读，沿着相关内容继续深入。</p>
      </div>
      <div className={styles.subjectGrid}>
        {subjects.map((subject) => (
          <Link key={subject.href} className={styles.subject} to={subject.href}>
            <span className={styles.subjectLabel}>{subject.label}</span>
            <h3>{subject.title}</h3>
            <p>{subject.description}</p>
            <IconArrow viewBox="0 0 20 20" className={styles.arrow} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="技术求职准备"
      description="Coding 101 按照目标岗位整理技术面试的复习范围、优先级、核心知识和自测问题。">
      <main className={styles.home}>
        <HomepageHeader />
        <HomepageFeatures />
        <SubjectDirectory />
      </main>
    </Layout>
  );
}
