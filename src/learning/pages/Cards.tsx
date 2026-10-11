import {useMemo, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';

import {reviewHref} from '../article/ArticleParts';
import {cardStatus, type CardStatus, domainShortLabel, isDue, RATING_LABELS, useLearningIndex} from '../content';
import {UpgradeDialog} from '../review/UpgradeDialog';
import {accessOf, learnerActions, today, useLearner} from '../store';
import type {CardIndex} from '../types';
import {formatDue, ReadOnlyBanner, StatusTag} from '../ui';
import {ClientPage} from '../ui/ClientOnly';
import styles from './Cards.module.css';

type Filter = 'all' | 'due' | CardStatus;

const FILTERS: {id: Filter; label: string}[] = [
  {id: 'all', label: '全部'},
  {id: 'due', label: '今天到期'},
  {id: 'weak', label: '待补'},
  {id: 'learning', label: '学习中'},
  {id: 'mastered', label: '已掌握'},
  {id: 'new', label: '未练过'},
  {id: 'suspended', label: '已暂停'},
];
const PAGE = 60;

export default function Cards(): JSX.Element {
  return <ClientPage title="闪卡库">{() => <CardsPage />}</ClientPage>;
}

export function ProgressTabs({active}: {active: 'progress' | 'cards'}) {
  return (
    <nav className={styles.tabs} aria-label="我的进度">
      <Link to="/progress" className={clsx(styles.tab, active === 'progress' && styles.tabOn)}>
        全景图
      </Link>
      <Link to="/cards" className={clsx(styles.tab, active === 'cards' && styles.tabOn)}>
        闪卡库
      </Link>
    </nav>
  );
}

function CardsPage() {
  const index = useLearningIndex();
  const learner = useLearner();
  const history = useHistory();
  const access = accessOf(learner);
  const readonly = access === 'readonly';
  const [filter, setFilter] = useState<Filter>('all');
  const [group, setGroup] = useState('');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [limit, setLimit] = useState(PAGE);
  const [upgradeOpen, setUpgradeOpen] = useState(access === 'guest' || access === 'free');
  const day = today();

  const cards = useMemo(
    () => index.domains.flatMap((domain) => domain.articleIds.flatMap((id) => index.articles[id].cardIds.map((cardId) => index.cards[cardId]))),
    [index],
  );
  const groupOf = (card: CardIndex) => {
    const domain = index.domains.find((item) => item.id === index.articles[card.articleId].domainId);
    return domain ? domainShortLabel(domain.label) : '';
  };
  const groups = useMemo(() => [...new Set(cards.map(groupOf))], [cards]); // eslint-disable-line react-hooks/exhaustive-deps

  const status = (card: CardIndex) => cardStatus(card, learner.cards[card.id]);
  const matches = (card: CardIndex, id: Filter) =>
    id === 'all' || (id === 'due' ? !readonly && isDue(learner.cards[card.id], day) : status(card) === id);
  const scoped = cards
    .filter((card) => !group || groupOf(card) === group)
    .filter((card) => !query.trim() || card.question.toLowerCase().includes(query.trim().toLowerCase()));
  const visible = scoped.filter((card) => matches(card, filter));
  const allVisibleSelected = visible.length > 0 && visible.slice(0, limit).every((card) => selected.includes(card.id));

  const toggle = (id: string) => setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  const selectedSuspended = selected.length > 0 && selected.every((id) => learner.cards[id]?.suspended);

  return (
    <main className={styles.page}>
      {learner.subscription.status === 'expired' && <ReadOnlyBanner endedAt={learner.subscription.endedAt} />}
      <div className={styles.top}>
        <ProgressTabs active="cards" />
        <div className={styles.toolbar}>
          <div className={styles.filters}>
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={filter === item.id}
                className={clsx(styles.filter, filter === item.id && styles.filterOn)}
                onClick={() => {
                  setFilter(item.id);
                  setLimit(PAGE);
                }}>
                {item.label}
                <span className={styles.filterCount}>{scoped.filter((card) => matches(card, item.id)).length}</span>
              </button>
            ))}
          </div>
          <div className={styles.controls}>
            <select className={styles.control} value={group} onChange={(event) => setGroup(event.target.value)} aria-label="领域">
              <option value="">全部领域</option>
              {groups.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <input
              className={clsx(styles.control, styles.search)}
              type="search"
              placeholder="搜索题目"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>
      </div>

      <div className={styles.table} role="table" aria-label="闪卡">
        <div className={styles.headRow} role="row">
          {readonly ? (
            <span />
          ) : (
            <button
              type="button"
              className={clsx(styles.box, allVisibleSelected && styles.boxOn)}
              aria-label="全选"
              onClick={() =>
                setSelected(allVisibleSelected ? [] : [...new Set([...selected, ...visible.slice(0, limit).map((card) => card.id)])])
              }>
              {allVisibleSelected ? '✓' : ''}
            </button>
          )}
          <span>题目</span>
          <span>主题</span>
          <span>状态</span>
          <span>上次评分</span>
          <span>下次复习</span>
        </div>
        {visible.slice(0, limit).map((card) => {
          const state = learner.cards[card.id];
          const isSelected = selected.includes(card.id);
          const article = index.articles[card.articleId];
          const practiced = state && state.reps > 0;
          return (
            <div key={card.id} role="row" className={clsx(styles.row, isSelected && styles.rowOn)}>
              {readonly ? (
                <span />
              ) : (
                <button
                  type="button"
                  className={clsx(styles.box, isSelected && styles.boxOn)}
                  aria-pressed={isSelected}
                  aria-label="选择"
                  onClick={() => toggle(card.id)}>
                  {isSelected ? '✓' : ''}
                </button>
              )}
              <Link className={styles.question} to={reviewHref(article, card)}>
                {card.question}
              </Link>
              <span className={styles.topic}>{article.title}</span>
              <StatusTag status={status(card)} />
              <span className={styles.muted}>{practiced ? RATING_LABELS[state.rating] : '—'}</span>
              <span
                className={clsx(
                  styles.due,
                  !readonly && practiced && !state.suspended && state.due <= day && styles.dueToday,
                  readonly && styles.muted,
                )}>
                {readonly
                  ? '已暂停'
                  : state?.suspended
                    ? '已暂停'
                    : state && (practiced || state.due)
                      ? formatDue(state.due, day)
                      : '—'}
              </span>
            </div>
          );
        })}
        {!visible.length && <p className={styles.empty}>这个筛选下没有卡片。</p>}
        {visible.length > limit && (
          <button type="button" className={styles.more} onClick={() => setLimit(limit + PAGE)}>
            再显示 {Math.min(PAGE, visible.length - limit)} 张
          </button>
        )}
      </div>

      {readonly ? (
        <div className={styles.bar}>
          <span>点卡片可以看正反面。标状态、暂停、批量复习需要续费。</span>
          <Link className={styles.barPrimary} to="/pricing">
            续费
          </Link>
        </div>
      ) : (
        selected.length > 0 && (
          <div className={styles.bar}>
            <span>已选 {selected.length} 张</span>
            <div className={styles.barActions}>
              <button
                type="button"
                className={styles.barButton}
                onClick={() => {
                  learnerActions.markMastered(selected);
                  setSelected([]);
                }}>
                标为已掌握
              </button>
              <button
                type="button"
                className={styles.barButton}
                onClick={() => {
                  learnerActions.setSuspended(selected, !selectedSuspended);
                  setSelected([]);
                }}>
                {selectedSuspended ? '恢复' : '暂停'}
              </button>
              <button
                type="button"
                className={styles.barPrimary}
                onClick={() => history.push(`/review?cards=${selected.map(encodeURIComponent).join(',')}`)}>
                复习这 {selected.length} 张 →
              </button>
            </div>
          </div>
        )
      )}
      <UpgradeDialog open={upgradeOpen} onClose={() => setUpgradeOpen(false)} />
    </main>
  );
}
