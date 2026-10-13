import {useEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';

import {reviewHref} from '../article/ArticleParts';
import {cardStatus, type CardStatus, domainShortLabel, PRIORITY_LABELS, useLearningIndex} from '../content';
import {summarize} from '../review/WeakList';
import {learnerActions, toDay, useLearner} from '../store';
import type {CardIndex, Priority} from '../types';
import {Companies, formatMonthDay, PriorityDots, StatusTag} from '../ui';
import {useLearnerFeatures} from '../features';
import {ClientPage} from '../ui/ClientOnly';
import styles from './Questions.module.css';

const PAGE = 50;
const PRIORITIES: Priority[] = ['must', 'common', 'optional'];
const STATUSES: CardStatus[] = ['new', 'weak', 'learning', 'mastered'];
const RANK: Record<Priority, number> = {must: 0, common: 1, optional: 2};

export default function Questions(): JSX.Element {
  return (
    <ClientPage title="题库" description="按岗位、领域、考频和练习状态筛选面试题，点开即可翻卡自测。">
      {() => <QuestionsPage />}
    </ClientPage>
  );
}

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function QuestionsPage() {
  const index = useLearningIndex();
  const learner = useLearner();
  const features = useLearnerFeatures();
  const params = new URLSearchParams(useLocation().search);
  const initialQuery = params.get('q') ?? '';
  const [roleId, setRoleId] = useState(params.get('role') ?? learner.preferences.roleId ?? '');
  const [group, setGroup] = useState<string>('');
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [statuses, setStatuses] = useState<CardStatus[]>([]);
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<'priority' | 'order'>('priority');
  const [limit, setLimit] = useState(PAGE);
  const search = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === '/' && document.activeElement !== search.current) {
        event.preventDefault();
        search.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const role = index.roles.find((item) => item.id === roleId);
  const ordered = useMemo(
    () => index.domains.flatMap((domain) => domain.articleIds.flatMap((id) => index.articles[id].cardIds.map((cardId) => index.cards[cardId]))),
    [index],
  );
  const inRole = (card: CardIndex) => !roleId || index.articles[card.articleId].roles.includes(roleId);
  const groupOf = (card: CardIndex) => {
    const domain = index.domains.find((item) => item.id === index.articles[card.articleId].domainId);
    return domain ? domainShortLabel(domain.label) : '';
  };

  const roleCards = ordered.filter(inRole);
  const groups = useMemo(() => {
    const counts = new Map<string, number>();
    for (const card of roleCards) counts.set(groupOf(card), (counts.get(groupOf(card)) ?? 0) + 1);
    return [...counts.entries()];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleId, index]);

  const needle = query.trim().toLowerCase();
  const filtered = roleCards
    .filter((card) => !group || groupOf(card) === group)
    .filter((card) => !priorities.length || priorities.includes(index.articles[card.articleId].priority ?? 'optional'))
    .filter((card) => !statuses.length || statuses.includes(cardStatus(card, learner.cards[card.id])))
    .filter(
      (card) =>
        !needle ||
        card.question.toLowerCase().includes(needle) ||
        index.articles[card.articleId].title.toLowerCase().includes(needle) ||
        card.companies.some((company) => company.toLowerCase().includes(needle)),
    );
  const sorted =
    sort === 'priority'
      ? [...filtered].sort(
          (a, b) => RANK[index.articles[a.articleId].priority ?? 'optional'] - RANK[index.articles[b.articleId].priority ?? 'optional'],
        )
      : filtered;

  const lastExam = learner.sessions.find((session) => session.mode === 'exam' && session.finishedAt);
  const lastSummary = lastExam ? summarize(lastExam, index) : undefined;

  const prepareExam = () => {
    const domainIds = group
      ? index.domains.filter((domain) => domainShortLabel(domain.label) === group).map((domain) => domain.id)
      : [];
    learnerActions.setExamSetup({
      scope: domainIds.length ? 'domains' : 'role',
      domainIds,
      count: learner.examSetup?.count ?? 20,
      timed: learner.examSetup?.timed ?? false,
    });
    if (roleId !== learner.preferences.roleId) learnerActions.setPreferences({roleId: roleId || undefined});
  };

  return (
    <main className={styles.page}>
      <aside className={styles.filters}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>目标岗位</span>
          <select className={styles.select} value={roleId} onChange={(event) => setRoleId(event.target.value)}>
            {index.roles.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
            <option value="">全部岗位</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>领域</span>
          <button type="button" className={clsx(styles.domain, !group && styles.domainOn)} onClick={() => setGroup('')}>
            <span>全部</span>
            <span className={styles.domainCount}>{roleCards.length}</span>
          </button>
          {groups.map(([name, count]) => (
            <button key={name} type="button" className={clsx(styles.domain, group === name && styles.domainOn)} onClick={() => setGroup(name)}>
              <span>{name}</span>
              <span className={styles.domainCount}>{count}</span>
            </button>
          ))}
        </div>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>考频</span>
          <div className={styles.chips}>
            {PRIORITIES.map((priority) => (
              <button
                key={priority}
                type="button"
                aria-pressed={priorities.includes(priority)}
                className={clsx(styles.chip, priorities.includes(priority) && styles.chipOn)}
                onClick={() => setPriorities(toggle(priorities, priority))}>
                {PRIORITY_LABELS[priority]}
              </button>
            ))}
          </div>
        </div>
        {features && (
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>我的状态</span>
          <div className={styles.chips}>
            {STATUSES.map((status) => (
              <button
                key={status}
                type="button"
                aria-pressed={statuses.includes(status)}
                className={clsx(styles.chip, statuses.includes(status) && styles.chipOn)}
                onClick={() => setStatuses(toggle(statuses, status))}>
                {{new: '未练过', weak: '待补', learning: '学习中', mastered: '已掌握', suspended: '已暂停'}[status]}
              </button>
            ))}
          </div>
        </div>
        )}
      </aside>

      <section className={styles.main}>
        {features && (
        <div className={styles.banner}>
          <div className={styles.bannerText}>
            <span className={styles.bannerLabel}>模拟测试</span>
            <span className={styles.bannerTitle}>
              按{group || role?.label || '全部'}{group ? '题目' : '常考题'}抽 {learner.examSetup?.count ?? 20} 道，约 {(learner.examSetup?.count ?? 20) * 2} 分钟
            </span>
            {lastExam && lastSummary && (
              <span className={styles.bannerHint}>
                上次 {formatMonthDay(toDay(new Date(lastExam.startedAt)))} · 要点覆盖 {lastSummary.coverage}%
              </span>
            )}
          </div>
          <Link className={styles.bannerButton} to="/exam" onClick={prepareExam}>
            设置并开始 →
          </Link>
        </div>
        )}

        <div className={styles.toolbar}>
          <label className={styles.search}>
            <input
              ref={search}
              type="search"
              value={query}
              placeholder="搜索问题，例如「HTTPS 握手过程」"
              onChange={(event) => {
                setQuery(event.target.value);
                setLimit(PAGE);
              }}
            />
          </label>
          <label className={styles.sort}>
            排序：
            <select value={sort} onChange={(event) => setSort(event.target.value as 'priority' | 'order')}>
              <option value="priority">考频</option>
              <option value="order">知识树顺序</option>
            </select>
          </label>
          <span className={styles.total}>{sorted.length} 题</span>
        </div>

        <div className={clsx(styles.table, !features && styles.noStatus)} role="table" aria-label="题目">
          <div className={styles.headRow} role="row">
            <span role="columnheader">题目</span>
            <span role="columnheader">主题</span>
            <span role="columnheader">考频</span>
            <span role="columnheader">公司</span>
            {features && <span role="columnheader">我的状态</span>}
          </div>
          {sorted.slice(0, limit).map((card) => {
            const article = index.articles[card.articleId];
            return (
              <Link key={card.id} role="row" className={styles.row} to={reviewHref(article, card)}>
                <span className={styles.question}>{card.question}</span>
                <span className={styles.topic}>{article.title}</span>
                <span>
                  <PriorityDots priority={article.priority} />
                </span>
                <span>
                  <Companies names={card.companies.slice(0, 2)} selfTest={card.selfTest} />
                </span>
                {features && (
                  <span>
                    <StatusTag status={cardStatus(card, learner.cards[card.id])} />
                  </span>
                )}
              </Link>
            );
          })}
          {!sorted.length && <p className={styles.empty}>没有符合条件的题目。可以清空搜索词，或减少筛选条件。</p>}
        </div>
        {sorted.length > limit && (
          <button type="button" className={styles.more} onClick={() => setLimit(limit + PAGE)}>
            再显示 {Math.min(PAGE, sorted.length - limit)} 题
          </button>
        )}
        <span className={styles.note}>
          {features ? '点任意一题进入翻卡。按领域筛选后，模拟测试会从这个领域抽题。' : '点任意一题进入翻卡：先想答案，再看考察重点和参考回答。'}
        </span>
      </section>
    </main>
  );
}
