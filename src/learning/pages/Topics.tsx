import {useEffect, useMemo, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useHistory, useLocation} from '@docusaurus/router';
import Layout from '@theme/Layout';

import {
  cardsInSection,
  domainShortLabel,
  outlineSections,
  PRIORITY_LABELS,
  sectionReadStatus,
  useLearningIndex,
} from '../content';
import {learnerActions, useLearner} from '../store';
import type {ArticleIndex, Domain, ReadingState} from '../types';
import styles from './Topics.module.css';

type Progress = 'done' | 'reading' | 'none';

function articleProgress(reading?: ReadingState): Progress {
  if (!reading) return 'none';
  return reading.done ? 'done' : 'reading';
}

function ProgressMark({progress, optional}: {progress: Progress; optional?: boolean}) {
  if (progress === 'done') return <span className={clsx(styles.mark, styles.markDone)}>✓</span>;
  if (progress === 'reading') return <span className={clsx(styles.mark, styles.markReading)} />;
  return <span className={clsx(styles.mark, optional ? styles.markOptional : styles.markNone)} />;
}

export default function Topics(): JSX.Element {
  const index = useLearningIndex();
  const learner = useLearner();
  const location = useLocation();
  const history = useHistory();
  const roleId = learner.preferences.roleId;
  const role = index.roles.find((item) => item.id === roleId);

  const params = new URLSearchParams(location.search);
  const [domainId, setDomainId] = useState(params.get('domain') ?? undefined);
  const [articleId, setArticleId] = useState(params.get('article') ?? undefined);

  const inRole = (article: ArticleIndex) => !roleId || article.roles.includes(roleId);
  const domainArticles = (domain: Domain) => domain.articleIds.map((id) => index.articles[id]);
  const roleCount = (domain: Domain) => domainArticles(domain).filter(inRole).length;

  const domain =
    index.domains.find((item) => item.id === domainId) ??
    index.domains.find((item) => roleCount(item) > 0) ??
    index.domains[0];

  // Articles in the role first (suggested order), then the rest as optional reading.
  const articles = useMemo(() => {
    const all = domainArticles(domain);
    return [...all.filter(inRole), ...all.filter((article) => !inRole(article))];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain, roleId, index]);

  const article =
    articles.find((item) => item.id === articleId) ??
    articles.find((item) => inRole(item) && !learner.reading[item.id]?.done) ??
    articles[0];

  useEffect(() => {
    const next = new URLSearchParams();
    next.set('domain', domain.id);
    if (article) next.set('article', article.id);
    const search = `?${next.toString()}`;
    if (search !== location.search) history.replace({search});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain.id, article?.id]);

  const sections = article ? outlineSections(article) : [];
  const reading = article ? learner.reading[article.id] : undefined;
  const position = article ? articles.indexOf(article) + 1 : 0;
  const cardCount = article?.cardIds.length ?? 0;
  const resumeIndex = reading && !reading.done ? Math.min(reading.furthest, sections.length - 1) : 0;
  const resume = sections[resumeIndex];

  const action = !article
    ? undefined
    : reading?.done
      ? {label: '重新阅读 →', to: article.permalink}
      : reading
        ? {label: `继续读第 ${resume?.number ?? resumeIndex + 1} 节 →`, to: `${article.permalink}#${resume?.id ?? ''}`}
        : {label: '开始阅读 →', to: article.permalink};

  return (
    <Layout title="知识树" description="按目标岗位查看领域、主题和章节，并从上次读到的位置继续。">
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
          <span className={styles.rolesHint}>{role ? '只显示这个岗位面试常考的内容' : '显示全部领域与主题'}</span>
        </div>

        <div className={styles.columns}>
          <nav className={styles.domains} aria-label="领域">
            <div className={styles.columnLabel}>领域</div>
            {index.domains.map((item) => {
              const count = roleCount(item);
              const optional = Boolean(roleId) && count === 0;
              const done = domainArticles(item).filter((a) => inRole(a) && learner.reading[a.id]?.done).length;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={clsx(styles.domain, item.id === domain.id && styles.domainActive, optional && styles.domainOptional)}
                  onClick={() => {
                    setDomainId(item.id);
                    setArticleId(undefined);
                  }}>
                  <span>{item.label}</span>
                  <span className={styles.domainCount}>{optional ? '选修' : `${done} / ${count}`}</span>
                </button>
              );
            })}
          </nav>

          <nav className={styles.articles} aria-label="主题">
            <div className={styles.columnLabel}>{domain.label} · 主题（建议顺序）</div>
            {articles.map((item) => {
              const optional = !inRole(item) || item.priority === 'optional';
              return (
                <button
                  key={item.id}
                  type="button"
                  className={clsx(styles.article, item.id === article?.id && styles.articleActive, optional && styles.articleOptional)}
                  onClick={() => setArticleId(item.id)}>
                  <ProgressMark progress={articleProgress(learner.reading[item.id])} optional={optional} />
                  <span>{item.title}</span>
                  {item.priority === 'must' && inRole(item) && <span className={styles.tagMust}>必会</span>}
                  {optional && <span className={styles.tagOptional}>{inRole(item) ? '按岗选学' : '选读'}</span>}
                </button>
              );
            })}
          </nav>

          {article && (
            <section className={styles.detail} aria-labelledby="topic-title">
              <div className={styles.detailHead}>
                <span className={styles.detailMeta}>
                  {domainShortLabel(domain.label)} / 主题 {position} / {articles.length}
                  {role && article.priority && inRole(article) ? ` · ${role.label}${PRIORITY_LABELS[article.priority]}` : ''}
                </span>
                <h1 id="topic-title" className={styles.detailTitle}>
                  {article.title}
                </h1>
                <span className={styles.detailFacts}>
                  {sections.length} 节 · 约 {article.minutes} 分钟 · {cardCount} 道面试题
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
                        {status === 'read' ? '已读' : status === 'reading' ? '阅读中' : '—'}
                      </span>
                      <span className={clsx(styles.sectionCards, status === 'read' && count > 0 && styles.green)}>
                        {count ? `${count} 题` : '—'}
                      </span>
                    </li>
                  );
                })}
              </ol>

              {action && (
                <div className={styles.actions}>
                  <Link className={styles.primary} to={action.to}>
                    {action.label}
                  </Link>
                  <span className={styles.actionsHint}>读过的章节，面试题会自动进入复习</span>
                </div>
              )}
            </section>
          )}
        </div>
      </main>
    </Layout>
  );
}
