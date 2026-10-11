import {useCallback, useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useHistory, useLocation} from '@docusaurus/router';

import {
  articlesForRole,
  cardStatus,
  dueCardIds,
  moduleOf,
  RATING_LABELS,
  shuffle,
  useLearningIndex,
} from '../content';
import {CardBody, CardMeta, SourceLink} from '../review/CardFace';
import {RatingBar, Toast} from '../review/RatingBar';
import {SessionRunner} from '../review/SessionRunner';
import {UpgradeDialog} from '../review/UpgradeDialog';
import styles from '../review/review.module.css';
import {accessOf, learnerActions, nextInterval, toDay, today, useLearner} from '../store';
import type {CardDetail, CardState, Rating} from '../types';
import {formatInterval, Kbd} from '../ui';
import {ClientPage} from '../ui/ClientOnly';

type Props = {details: Record<string, CardDetail>};

export default function Review({details}: Props): JSX.Element {
  return <ClientPage title="复习">{() => <ReviewRouter details={details} />}</ClientPage>;
}

function ReviewRouter({details}: Props) {
  const params = new URLSearchParams(useLocation().search);
  const sessionId = params.get('session');
  if (sessionId) return <SessionRunner sessionId={sessionId} details={details} />;
  const mode = params.get('mode');
  const cards = params.get('cards');
  if (mode === 'today' || mode === 'quiz' || cards) {
    return <SessionStarter mode={mode === 'quiz' ? 'quiz' : 'today'} cardIds={cards?.split(',').filter(Boolean)} />;
  }
  return <ArticleReview details={details} articleId={params.get('article')} cardId={params.get('card')} />;
}

/* ---- Starting a session ---- */

function SessionStarter({mode, cardIds}: {mode: 'today' | 'quiz'; cardIds?: string[]}) {
  const index = useLearningIndex();
  const learner = useLearner();
  const history = useHistory();
  const started = useRef(false);
  const access = accessOf(learner);
  const [blocked, setBlocked] = useState(false);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    if (access !== 'active') {
      setBlocked(true);
      return;
    }
    let ids: string[];
    let title: string;
    if (cardIds) {
      ids = cardIds.filter((id) => index.cards[id]);
      title = `复习 ${ids.length} 张`;
    } else if (mode === 'quiz') {
      const pool = articlesForRole(index, learner.preferences.roleId)
        .flatMap((article) => article.cardIds)
        .filter((id) => cardStatus(index.cards[id], learner.cards[id]) !== 'mastered');
      ids = shuffle(pool).slice(0, 10);
      title = `随机自测 · ${ids.length} 题`;
    } else {
      ids = dueCardIds(index, learner).slice(0, learner.preferences.dailyLimit);
      title = `今日复习 · ${ids.length} 张`;
    }
    if (!ids.length) {
      setEmpty(true);
      return;
    }
    const sessionId = learnerActions.startSession(mode === 'quiz' && !cardIds ? 'quiz' : 'today', title, ids);
    history.replace(`/review?session=${sessionId}`);
  }, [access, cardIds, history, index, learner, mode]);

  if (empty) {
    return (
      <main className={styles.emptyPage}>
        <span className={styles.emptyTitle}>今天没有要复习的卡</span>
        <span className={styles.emptyText}>读完一篇文章后，它的面试题会在第二天进入复习。</span>
        <Link className={styles.primaryButton} to="/topics">
          去读一篇文章 →
        </Link>
      </main>
    );
  }
  return (
    <main className={styles.emptyPage}>
      <UpgradeDialog open={blocked} onClose={() => history.goBack()} />
    </main>
  );
}

/* ---- Article mode (03) ---- */

function ArticleReview({details, articleId, cardId}: {details: Record<string, CardDetail>; articleId: string | null; cardId: string | null}) {
  const index = useLearningIndex();
  const learner = useLearner();
  const history = useHistory();
  const access = accessOf(learner);
  const [revealed, setRevealed] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [toast, setToast] = useState<{message: string; undo: () => void} | undefined>();

  const article =
    (articleId && index.articles[articleId]) || (cardId && details[cardId] && index.articles[details[cardId].articleId]) || undefined;
  const cards = article ? article.cardIds.map((id) => details[id]).filter(Boolean) : [];
  const position = Math.max(0, cards.findIndex((card) => card.id === cardId));
  const card = cards[position];
  const prev = cards[position - 1];
  const next = cards[position + 1];

  const go = useCallback(
    (target?: CardDetail) => {
      if (!target || !article) return;
      setRevealed(false);
      history.replace(`/review?article=${encodeURIComponent(article.id)}&card=${encodeURIComponent(target.id)}`);
    },
    [article, history],
  );

  const backHref = article ? `${article.permalink}#${article.interviewAnchor ?? ''}` : '/topics';
  const state: CardState | undefined = card ? learner.cards[card.id] : undefined;
  const ratedToday = state && state.reps > 0 && toDay(new Date(state.reviewedAt)) === today() ? state.rating : undefined;

  const rate = useCallback(
    (rating: Rating) => {
      if (!card) return;
      if (access !== 'active') {
        setUpgradeOpen(true);
        return;
      }
      const previous = learnerActions.rate(card.id, rating);
      setToast({
        message: `已记为「${RATING_LABELS[rating]}」· ${formatInterval(nextInterval(rating, previous))}再出现`,
        undo: () => learnerActions.restore(card.id, previous),
      });
    },
    [access, card],
  );

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(undefined), 5000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || upgradeOpen) return;
      if (event.key === 'ArrowLeft') go(prev);
      else if (event.key === 'ArrowRight') go(next);
      else if (event.key === ' ') {
        event.preventDefault();
        setRevealed(true);
      } else if (event.key === 'Escape') history.push(backHref);
      else if (revealed && ['1', '2', '3'].includes(event.key)) rate((['again', 'hard', 'good'] as Rating[])[Number(event.key) - 1]);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [backHref, go, history, next, prev, rate, revealed, upgradeOpen]);

  if (!article || !card) {
    return (
      <main className={styles.emptyPage}>
        <span className={styles.emptyTitle}>没有找到这张卡</span>
        <Link className={styles.primaryButton} to="/topics">
          回到知识树 →
        </Link>
      </main>
    );
  }

  const module = moduleOf(index, article);
  const interview = article.sections.find((section) => section.id === article.interviewAnchor);

  return (
    <main className={styles.split}>
      <aside className={styles.tree}>
        <span className={styles.treeLabel}>{module?.label}</span>
        {module?.articleIds.map((id) => {
          const item = index.articles[id];
          const current = id === article.id;
          return (
            <div key={id}>
              <Link
                to={item.cardIds.length ? `/review?article=${encodeURIComponent(id)}` : item.permalink}
                className={clsx(styles.treeArticle, current && styles.treeArticleCurrent, learner.reading[id]?.done && !current && styles.treeArticleRead)}>
                <span>{item.title}</span>
                {learner.reading[id]?.done && <span className={styles.treeCount}>✓</span>}
              </Link>
              {current && (
                <div className={styles.treeCards}>
                  {cards.map((item) => {
                    const itemState = learner.cards[item.id];
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={clsx(styles.treeCard, item.id === card.id && styles.treeCardCurrent)}
                        onClick={() => go(item)}>
                        <span className={clsx(styles.stateDot, itemState?.reps ? styles[`stateDot_${itemState.rating}`] : styles.stateDotNone)} />
                        <span>{item.question}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        <div className={styles.treeFoot}>
          <SourceLink card={card} />
          <span>
            ← → 切换　空格 翻面{access === 'active' ? '　1 2 3 标记' : ''}
          </span>
        </div>
      </aside>

      <section className={styles.stage}>
        <Link to={backHref} className={styles.backBar}>
          <span>
            <b>← 回到文章</b>
            <span className={styles.backContext}>
              {article.title}
              {interview?.number ? ` · 第 ${interview.number} 节 面试题` : ''}
            </span>
          </span>
          <Kbd>Esc</Kbd>
        </Link>
        <CardMeta card={card} />
        <h1 className={styles.question}>{card.question}</h1>
        <CardBody
          card={card}
          revealed={revealed}
          onReveal={() => setRevealed(true)}
          footer={<SourceLink card={card} />}
        />
        <div className={styles.footer}>
          <button type="button" className={styles.nav} disabled={!prev} onClick={() => go(prev)}>
            <span className={styles.navLabel}>← 上一张</span>
            <span className={styles.navTitle}>{prev?.label ?? '—'}</span>
          </button>
          <div className={styles.footerCenter}>
            {access === 'active' ? (
              <RatingBar previous={state} selected={ratedToday} disabled={!revealed} onRate={rate} />
            ) : (
              <span className={styles.footerCta}>
                标记状态、自动安排复习
                <Link to={access === 'guest' ? '/account' : '/pricing'}>
                  {access === 'readonly' ? '续费后继续 →' : '免费试用 7 天 →'}
                </Link>
              </span>
            )}
          </div>
          <button type="button" className={clsx(styles.nav, styles.navNext)} disabled={!next} onClick={() => go(next)}>
            <span className={styles.navLabel}>下一张 →</span>
            <span className={styles.navTitle}>{next?.label ?? '—'}</span>
          </button>
        </div>
      </section>

      {toast && <Toast message={toast.message} onUndo={() => { toast.undo(); setToast(undefined); }} />}
      <UpgradeDialog open={upgradeOpen} onClose={() => setUpgradeOpen(false)} />
    </main>
  );
}
