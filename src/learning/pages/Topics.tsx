import {useEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useHistory, useLocation} from '@docusaurus/router';

import {cardsInSection, outlineSections, PRIORITY_LABELS, sectionReadStatus, priorityForRole, useActiveRoleId, useLearningIndex} from '../content';
import {useLearner} from '../store';
import type {ArticleIndex, LearnerState, Priority, RoleGuides, StudyGuide, Topic} from '../types';
import {useLearnerFeatures} from '../features';
import {ClientPage} from '../ui/ClientOnly';
import {PublicCatalog} from '../ui/PublicCatalog';
import {withRole} from '../roles';
import {RolePicker} from '../ui/RolePicker';
import {scrollSelection} from '../ui/scrollSelection';
import {selectStudyTopic, studyForRole} from '../study';
import styles from './Topics.module.css';

type Progress = 'done' | 'reading' | 'none';
const RANK: Record<Priority, number> = {must: 3, common: 2, optional: 1};
const EMPTY_GUIDES: StudyGuide[] = [];
const DEPTH = {foundation: '基础回答', mechanism: '原理解释', scenario: '场景分析'};

function ProgressMark({progress, optional}: {progress: Progress; optional?: boolean}) {
  if (progress === 'done') return <span className={clsx(styles.mark, styles.markDone)}>✓</span>;
  if (progress === 'reading') return <span className={clsx(styles.mark, styles.markReading)} />;
  return <span className={clsx(styles.mark, optional ? styles.markOptional : styles.markNone)} />;
}

function articleProgress(article: ArticleIndex, learner: LearnerState): Progress {
  const reading = learner.reading[article.id];
  return !reading ? 'none' : reading.done ? 'done' : 'reading';
}

function topicProgress(articles: ArticleIndex[], learner: LearnerState): Progress {
  const states = articles.map(article => articleProgress(article, learner));
  if (states.length && states.every(state => state === 'done')) return 'done';
  return states.some(state => state !== 'none') ? 'reading' : 'none';
}

function highestPriority(articles: ArticleIndex[], roleId: string): Priority | undefined {
  return articles.map(article => priorityForRole(article, roleId))
    .filter((priority): priority is Priority => Boolean(priority)).sort((a, b) => RANK[b] - RANK[a])[0];
}

export default function Topics({guides}: {guides: RoleGuides}): JSX.Element {
  return <ClientPage title="技术主题" description="按目标岗位查看复习顺序、掌握要求和核心阅读，并用面试题检查理解。"
    noIndex={false} fallback={<PublicCatalog />}>
    {() => <TopicsPage guides={guides} />}
  </ClientPage>;
}

function TopicsPage({guides}: {guides: RoleGuides}) {
  const index = useLearningIndex();
  const features = useLearnerFeatures();
  const storedLearner = useLearner();
  const learner = features ? storedLearner : {...storedLearner, reading: {}};
  const location = useLocation();
  const history = useHistory();
  const roleId = useActiveRoleId();
  const role = index.roles.find(item => item.id === roleId);
  const selectedGuides = guides[roleId] ?? EMPTY_GUIDES;
  const study = useMemo(() => studyForRole(index, selectedGuides), [index, selectedGuides]);
  const {domain, topic} = selectStudyTopic(study.domains, index.articles, location.search, selectedGuides, learner.reading);
  const [navigationOpen, setNavigationOpen] = useState(false);
  const selectionToggle = useRef<HTMLButtonElement>(null);
  const roleControls = useRef<HTMLDivElement>(null);
  const domainNav = useRef<HTMLElement>(null);
  const topicNav = useRef<HTMLElement>(null);
  const inRole = (article: ArticleIndex) => !roleId || article.roles.includes(roleId);
  const topicArticles = (item: Topic) => study.articlesForTopic(item);
  const roleArticles = (item: Topic) => topicArticles(item).filter(inRole);
  const topicInRole = (item: Topic) => roleArticles(item).length > 0;

  useEffect(() => {
    const reveal = () => {
      roleControls.current?.querySelectorAll<HTMLElement>('[role="group"]').forEach(scrollSelection);
      scrollSelection(domainNav.current);
      scrollSelection(topicNav.current);
    };
    reveal();
    window.addEventListener('resize', reveal);
    return () => window.removeEventListener('resize', reveal);
  }, [domain.id, topic.id, roleId, navigationOpen]);

  useEffect(() => {
    const next = new URLSearchParams(location.search);
    next.delete('article');
    next.delete('guide');
    next.set('role', roleId);
    next.set('domain', domain.id);
    next.set('topic', topic.id);
    const search = `?${next.toString()}`;
    if (search !== location.search) history.replace({search});
  }, [domain.id, topic.id, roleId, location.search, history]);

  const select = (selection: {role?: string; domain?: string; topic?: string}) => {
    const next = new URLSearchParams(location.search);
    next.delete('article');
    next.delete('guide');
    if (selection.role !== undefined) {
      next.set('role', selection.role);
      next.delete('domain');
      next.delete('topic');
    } else {
      if (selection.domain) next.set('domain', selection.domain);
      if (selection.topic) next.set('topic', selection.topic);
      else next.delete('topic');
    }
    history.push({search: `?${next.toString()}`});
  };
  const articles = topicArticles(topic);
  const meta = `${role ? `${role.label} · ` : ''}${domain.label} / 主题 ${domain.topics.indexOf(topic) + 1} / ${domain.topics.length}`;
  const expectations = study.guidesForTopic(topic);
  const questionsHref = `/questions?${new URLSearchParams({role: roleId, topic: topic.id})}`;
  const closeNavigation = () => {
    setNavigationOpen(false);
    if (navigationOpen && selectionToggle.current?.getClientRects().length) selectionToggle.current.focus();
  };

  return <main className={clsx(styles.page, navigationOpen && styles.navigationOpen)} onKeyDown={event => {
    if (navigationOpen && event.key === 'Escape') { event.preventDefault(); closeNavigation(); }
  }}>
    <button ref={selectionToggle} type="button" className={styles.selectionToggle}
      aria-label="岗位与主题选择" aria-describedby="topic-selection-summary" aria-expanded={navigationOpen} aria-controls="topic-role-picker topic-domains topic-list"
      onClick={() => setNavigationOpen(open => !open)}>
      <span id="topic-selection-summary" className={styles.selectionSummary}>
        <span className={styles.selectionRole}>{role?.label ?? '全部岗位'}</span>
        <span className={styles.selectionTopic}>{domain.label} / {topic.label}</span>
      </span>
      <span className={styles.selectionAction}>{navigationOpen ? '收起' : '切换'}<span className={styles.selectionChevron} aria-hidden="true" /></span>
    </button>
    <div ref={roleControls} id="topic-role-picker" className={styles.roleControls}>
      <RolePicker roles={index.roles} value={roleId} onChange={id => { if (id !== roleId) select({role: id}); }} />
    </div>
    <div className={styles.columns}>
      <nav ref={domainNav} id="topic-domains" className={styles.domains} aria-label="领域">
        <div className={styles.columnLabel}>{role ? '领域 · 建议顺序' : '领域'}</div>
        {study.domains.map(item => {
          const list = item.topics.filter(topicInRole);
          const optional = Boolean(roleId) && !list.length;
          const done = list.filter(t => topicProgress(roleArticles(t), learner) === 'done').length;
          return <button key={item.id} type="button" aria-pressed={item.id === domain.id}
            className={clsx(styles.domain, item.id === domain.id && styles.domainActive, optional && styles.domainOptional)}
            onClick={() => select({domain: item.id})}>
            <span>{item.label}</span>
            <span className={styles.domainCount}>{optional ? '选读' : features ? `${done} / ${list.length}` : `${list.length} 个主题`}</span>
          </button>;
        })}
      </nav>
      <nav ref={topicNav} id="topic-list" className={styles.articles} aria-label="主题">
        <div className={styles.columnLabel}>{domain.label} · 主题{role ? '（建议顺序）' : ''}</div>
        {domain.topics.map(item => {
          const list = roleArticles(item);
          const priority = highestPriority(list, roleId);
          const optional = !list.length || priority === 'optional';
          return <button key={item.id} type="button" aria-pressed={item.id === topic.id}
            className={clsx(styles.article, item.id === topic.id && styles.articleActive, optional && styles.articleOptional)}
            onClick={() => { select({topic: item.id}); closeNavigation(); }}>
            <ProgressMark progress={topicProgress(list, learner)} optional={optional} />
            <span>{item.label}</span>
            {(list.length || item.articleIds.length) > 1 && <span className={styles.topicCount}>{list.length || item.articleIds.length} 篇</span>}
            {priority === 'must' && <span className={styles.tagMust}>必会</span>}
            {optional && <span className={styles.tagOptional}>{list.length ? '按岗选学' : '选读'}</span>}
          </button>;
        })}
      </nav>
      <div className={styles.selectionDone}><button type="button" onClick={closeNavigation}>完成选择</button></div>
      {articles.length > 1
        ? <TopicArticles key={`${roleId}:${topic.id}`} topic={topic} articles={articles} meta={meta} learner={learner}
            features={features} guides={expectations} study={study} roleId={roleId} questionsHref={questionsHref} />
        : <ArticleSections key={`${roleId}:${topic.id}`} article={articles[0]} meta={meta} learner={learner}
            features={features} guides={expectations} roleId={roleId} questionsHref={questionsHref} readingTarget={study.readingFor(articles[0])} />}
    </div>
  </main>;
}

function Guidance({guides}: {guides: StudyGuide[]}) {
  const [selected, setSelected] = useState(guides[0]?.id);
  const guide = guides.find(item => item.id === selected) ?? guides[0];
  if (!guide) return null;
  return <section className={styles.guidance} aria-label="掌握要求">
    <div className={styles.guidanceHead}><h2>掌握要求</h2><span>{PRIORITY_LABELS[guide.priority]} · {DEPTH[guide.depth]}</span></div>
    {guides.length > 1 ? <div className={styles.guideTabs} role="group" aria-label="复习重点">
      {guides.map(item => <button key={item.id} type="button" aria-pressed={item.id === guide.id}
        className={clsx(styles.guideTab, item.id === guide.id && styles.guideTabActive)} onClick={() => setSelected(item.id)}>{item.title}</button>)}
    </div> : <p className={styles.guideTitle}>{guide.title}</p>}
    <ul>{guide.outcomes.map(outcome => <li key={outcome}>{outcome}</li>)}</ul>
    <details className={styles.followups} key={guide.id}>
      <summary>自测与进一步追问</summary>
      <ul>{guide.questions.map(question => <li key={question}>{question}</li>)}</ul>
      {guide.further && <>
        <p>核心要求达到后，继续补充：</p>
        <ul>{guide.further.outcomes.map(outcome => <li key={outcome}>{outcome}</li>)}</ul>
        <ul>{guide.further.questions.map(question => <li key={question}>{question}</li>)}</ul>
      </>}
    </details>
  </section>;
}

function TopicArticles({topic, articles, meta, learner, features, guides, study, roleId, questionsHref}: {
  topic: Topic; articles: ArticleIndex[]; meta: string; learner: LearnerState; features: boolean; guides: StudyGuide[];
  study: ReturnType<typeof studyForRole>; roleId: string; questionsHref: string;
}) {
  const inRole = (article: ArticleIndex) => !roleId || article.roles.includes(roleId);
  const scoped = articles.filter(inRole);
  const core = scoped.filter(article => study.readingFor(article)?.core);
  const deeper = scoped.filter(article => !study.readingFor(article)?.core);
  const other = articles.filter(article => !inRole(article));
  const next = scoped.find(article => learner.reading[article.id] && !learner.reading[article.id].done)
    ?? [...core, ...deeper].find(article => !learner.reading[article.id]?.done);
  const started = scoped.some(article => learner.reading[article.id]);
  const cards = scoped.reduce((sum, article) => sum + article.cardIds.length, 0);
  const minutes = scoped.reduce((sum, article) => sum + article.minutes, 0);
  const done = scoped.filter(article => learner.reading[article.id]?.done).length;
  const readingHref = (article: ArticleIndex) => withRole(study.readingFor(article)?.href ?? article.permalink, roleId);
  const list = (items: ArticleIndex[]) => <ol className={styles.sections}>
    {items.map(article => {
      const status = articleProgress(article, learner);
      const reading = study.readingFor(article);
      const priority = priorityForRole(article, roleId);
      return <li key={article.id} className={clsx(styles.section, status === 'reading' && styles.sectionReading, status === 'done' && styles.sectionRead)}>
        <div className={styles.reading}>
          <Link to={readingHref(article)} className={styles.sectionTitle}>{article.title}</Link>
          {priority && <span className={priority === 'must' ? styles.inlineMust : styles.inlineOptional}>{PRIORITY_LABELS[priority]}</span>}
          {reading?.scope && <p className={styles.readingScope}>{reading.scope}</p>}
        </div>
        <span className={clsx(styles.sectionStatus, status === 'reading' && styles.green)}>{status === 'done' ? '已读' : status === 'reading' ? '阅读中' : `${article.minutes} 分钟`}</span>
        <span className={styles.sectionCards}>{article.cardIds.length ? `${article.cardIds.length} 题` : '—'}</span>
      </li>;
    })}
  </ol>;
  return <section className={styles.detail} aria-labelledby="topic-title">
    <div className={styles.detailHead}>
      <span className={styles.detailMeta}>{meta}</span>
      <h1 id="topic-title" className={styles.detailTitle}>{topic.label}</h1>
      <span className={styles.detailFacts}>{scoped.length} 篇{roleId ? '推荐阅读' : ''} · 约 {minutes} 分钟 · {cards} 道面试题{done ? ` · 已读 ${done} 篇` : ''}</span>
    </div>
    <Guidance guides={guides} />
    {roleId ? <>
      {core.length > 0 && <section><h2 className={styles.readingLabel}>核心阅读</h2>{list(core)}</section>}
      {deeper.length > 0 && <section><h2 className={styles.readingLabel}>深入阅读</h2>{list(deeper)}</section>}
      {other.length > 0 && <details className={styles.otherReading} open={!scoped.length}><summary>其他选读 · {other.length} 篇</summary>{list(other)}</details>}
    </> : list(articles)}
    <div className={styles.actions}>
      {next && <Link className={styles.primary} to={readingHref(next)}>{started ? '继续阅读 →' : '开始阅读 →'}</Link>}
      {cards > 0 && <Link to={questionsHref}>练习本主题题目 →</Link>}
      {features && <span className={styles.actionsHint}>读过的文章，面试题会自动进入复习</span>}
    </div>
  </section>;
}

function ArticleSections({article, meta, learner, features, guides, roleId, questionsHref, readingTarget}: {
  article: ArticleIndex; meta: string; learner: LearnerState; features: boolean; guides: StudyGuide[]; roleId: string; questionsHref: string; readingTarget?: StudyGuide['readings'][number];
}) {
  const index = useLearningIndex();
  const sections = outlineSections(article);
  const reading = learner.reading[article.id];
  const resumeIndex = reading && !reading.done ? Math.min(reading.furthest, sections.length - 1) : 0;
  const resume = sections[resumeIndex];
  const action = reading?.done ? {label: '重新阅读 →', to: article.permalink}
    : reading ? {label: `继续读第 ${resume?.number ?? resumeIndex + 1} 节 →`, to: `${article.permalink}#${resume?.id ?? ''}`}
    : {label: '开始阅读 →', to: readingTarget?.href ?? article.permalink};
  return <section className={styles.detail} aria-labelledby="topic-title">
    <div className={styles.detailHead}>
      <span className={styles.detailMeta}>{meta}</span>
      <h1 id="topic-title" className={styles.detailTitle}>{article.title}</h1>
      <span className={styles.detailFacts}>{sections.length} 节 · 约 {article.minutes} 分钟 · {article.cardIds.length} 道面试题
        {reading && !reading.done && resume ? ` · 读到第 ${resume.number ?? resumeIndex + 1} 节` : ''}{reading?.done ? ' · 已读完' : ''}</span>
    </div>
    <Guidance guides={guides} />
    {readingTarget?.scope && <p className={styles.readingScope}>{readingTarget.scope}</p>}
    <ol className={styles.sections}>
      {sections.map((section, i) => {
        const status = sectionReadStatus(i, reading);
        const count = cardsInSection(index, article, section.id).length;
        return <li key={section.id} className={clsx(styles.section, status === 'reading' && styles.sectionReading, status === 'read' && styles.sectionRead)}>
          <Link to={withRole(`${article.permalink}#${section.id}`, roleId)} className={styles.sectionTitle}>{section.number ? `${section.number}. ` : ''}{section.title}</Link>
          <span className={clsx(styles.sectionStatus, status === 'reading' && styles.green)}>{status === 'read' ? '已读' : status === 'reading' ? '阅读中' : ''}</span>
          <span className={styles.sectionCards}>{count ? `${count} 题` : '—'}</span>
        </li>;
      })}
    </ol>
    <div className={styles.actions}>
      <Link className={styles.primary} to={withRole(action.to, roleId)}>{action.label}</Link>
      {article.cardIds.length > 0 && (!roleId || article.roles.includes(roleId)) && <Link to={questionsHref}>练习本主题题目 →</Link>}
      {features && <span className={styles.actionsHint}>读过的章节，面试题会自动进入复习</span>}
    </div>
  </section>;
}
