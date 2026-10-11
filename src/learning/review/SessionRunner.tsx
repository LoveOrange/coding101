import {useCallback, useEffect, useState} from 'react';
import clsx from 'clsx';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';

import {RATING_LABELS} from '../content';
import {accessOf, learnerActions, nextInterval, useLearner} from '../store';
import type {CardDetail, Rating, ReviewSession} from '../types';
import {Dialog, formatInterval, Kbd, Segments} from '../ui';
import {CardBody, CardMeta, SourceLink} from './CardFace';
import {RatingBar, RATINGS, Toast} from './RatingBar';
import {UpgradeDialog} from './UpgradeDialog';
import styles from './review.module.css';

const QUESTION_SECONDS = 180;

export function reportHref(session: ReviewSession): string {
  return session.mode === 'quiz' ? `/weak?session=${session.id}` : `/exam/report?session=${session.id}`;
}

/** Rating derived from checkpoint coverage in quiz and exam modes. */
export function ratingFromHits(hits: number, total: number): Rating {
  if (total === 0 || hits >= total) return 'good';
  return hits / total >= 0.5 ? 'hard' : 'again';
}

function formatClock(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function SessionRunner({sessionId, details}: {sessionId: string; details: Record<string, CardDetail>}) {
  const learner = useLearner();
  const history = useHistory();
  const session = learner.sessions.find((item) => item.id === sessionId);
  const answered = new Set(session?.answers.map((answer) => answer.cardId));
  const firstOpen = session ? session.cardIds.findIndex((id) => !answered.has(id)) : -1;
  const [position, setPosition] = useState(firstOpen < 0 ? 0 : firstOpen);
  const [revealed, setRevealed] = useState(false);
  const [hits, setHits] = useState<number[]>([]);
  const [confirmEnd, setConfirmEnd] = useState(false);
  const [toast, setToast] = useState<{message: string; undo: () => void} | undefined>();
  const [elapsed, setElapsed] = useState(0);
  const [questionStart, setQuestionStart] = useState(Date.now());

  const exam = session?.mode === 'exam' || session?.mode === 'quiz';
  const timed = Boolean(session?.setup?.timed);
  const cardId = session?.cardIds[position];
  const card = cardId ? details[cardId] : undefined;

  useEffect(() => {
    if (!session) return undefined;
    const started = new Date(session.startedAt).getTime();
    const tick = () => setElapsed(Math.floor((Date.now() - started) / 1000));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [session]);

  const finish = useCallback(() => {
    if (!session) return;
    learnerActions.finishSession(session.id);
    history.replace(reportHref(session));
  }, [history, session]);

  const advance = useCallback(() => {
    if (!session) return;
    setRevealed(false);
    setHits([]);
    setQuestionStart(Date.now());
    if (position + 1 >= session.cardIds.length) finish();
    else setPosition(position + 1);
  }, [finish, position, session]);

  const rate = useCallback(
    (rating: Rating) => {
      if (!session || !card || !revealed) return;
      const previous = learnerActions.rate(card.id, rating, {hits});
      learnerActions.answer(session.id, {cardId: card.id, rating, hits});
      setToast({
        message: `上一张已记为「${RATING_LABELS[rating]}」· ${formatInterval(nextInterval(rating, previous))}再出现`,
        undo: () => {
          learnerActions.restore(card.id, previous);
          learnerActions.unanswer(session.id, card.id);
          setPosition(position);
          setRevealed(true);
        },
      });
      advance();
    },
    [advance, card, hits, position, revealed, session],
  );

  const submitExam = useCallback(
    (skip: boolean) => {
      if (!session || !card) return;
      if (skip) {
        learnerActions.answer(session.id, {cardId: card.id, skipped: true});
      } else {
        const rating = ratingFromHits(hits.length, card.checkpoints.length);
        learnerActions.rate(card.id, rating, {hits});
        learnerActions.answer(session.id, {cardId: card.id, rating, hits});
      }
      advance();
    },
    [advance, card, hits, session],
  );

  // Per-question limit: reveal the answer when time is up.
  const remaining = timed ? Math.max(0, QUESTION_SECONDS - Math.floor((Date.now() - questionStart) / 1000)) : undefined;
  useEffect(() => {
    if (timed && remaining === 0 && !revealed) setRevealed(true);
  }, [remaining, revealed, timed]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(undefined), 5000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (confirmEnd) {
        if (event.key === 'Enter') setConfirmEnd(false);
        return;
      }
      if (event.key === 'Escape') setConfirmEnd(true);
      else if (event.key === ' ') {
        event.preventDefault();
        setRevealed(true);
      } else if (!exam && revealed && ['1', '2', '3'].includes(event.key)) rate(RATINGS[Number(event.key) - 1]);
      else if (exam && revealed && event.key === 'Enter') submitExam(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [confirmEnd, exam, rate, revealed, submitExam]);

  if (accessOf(learner) !== 'active') {
    return (
      <main className={styles.emptyPage}>
        <UpgradeDialog open onClose={() => history.push('/progress')} />
      </main>
    );
  }

  if (!session || !card) {
    return (
      <main className={styles.emptyPage}>
        <span className={styles.emptyTitle}>这一轮已经结束</span>
        <Link className={styles.primaryButton} to="/progress">
          回到我的进度 →
        </Link>
      </main>
    );
  }

  const done = session.answers.length;
  const total = session.cardIds.length;
  const previousCard = position > 0 ? details[session.cardIds[position - 1]] : undefined;
  const hitRating = ratingFromHits(hits.length, card.checkpoints.length);

  const endDialog = (
    <Dialog open={confirmEnd} onClose={() => setConfirmEnd(false)} width={480} labelledBy="end-title">
      <span id="end-title" className={styles.dialogTitle}>
        {exam ? '提前结束测试？' : '先停在这里？'}
      </span>
      <span className={styles.dialogText}>
        {exam
          ? `已作答 ${done} 题，结果已经写入复习。报告只统计已作答的题目。`
          : `已完成 ${done} 张，评分都已保存。剩下 ${total - done} 张留在今日复习，回到「我的进度」可以继续。`}
      </span>
      <div className={styles.dialogActions}>
        <button type="button" className={styles.darkButton} onClick={() => setConfirmEnd(false)}>
          {exam ? '继续作答' : '继续复习'}
        </button>
        {exam ? (
          <button type="button" className={styles.outlineButton} onClick={finish}>
            结束并查看报告
          </button>
        ) : (
          <Link className={styles.outlineButton} to="/progress">
            退出，稍后继续
          </Link>
        )}
      </div>
      <Kbd>Enter 继续 · Esc 退出</Kbd>
    </Dialog>
  );

  if (exam) {
    return (
      <main className={styles.focus}>
        <Head>
          <html className="c101-focus" />
        </Head>
        <header className={styles.focusBar}>
          <div className={styles.focusLeft}>
            <Link to="/" className={styles.focusLogo}>
              coding<span>101</span>
            </Link>
            <span>{session.title}</span>
          </div>
          <div className={styles.focusRight}>
            {remaining !== undefined && <span className={styles.clock}>本题剩 {formatClock(remaining)}</span>}
            <span className={styles.clock}>已用 {formatClock(elapsed)}</span>
            <button type="button" className={styles.pillButton} onClick={() => setConfirmEnd(true)}>
              退出
            </button>
          </div>
        </header>
        <div className={styles.column}>
          <div className={styles.progressRow}>
            <Segments total={total} done={position} current />
            <span className={styles.counter}>
              {position + 1} / {total}
            </span>
          </div>
          {revealed ? (
            <span className={styles.metaPathGreen}>
              揭开后显示出处 · <CardMeta card={card} showCompanies={false} />
            </span>
          ) : (
            <span className={styles.metaHidden}>题目不显示出处，揭开答案后可见</span>
          )}
          <h1 className={styles.question}>{card.question}</h1>
          <CardBody
            card={card}
            revealed={revealed}
            onReveal={() => setRevealed(true)}
            hits={hits}
            onToggleHit={(i) => setHits((current) => (current.includes(i) ? current.filter((x) => x !== i) : [...current, i]))}
            checkLabel="要点 · 勾选你答到的"
            answerFirst
          />
          <div className={styles.examFooter}>
            <button type="button" className={styles.outlineSmall} onClick={() => submitExam(true)}>
              跳过
            </button>
            <span className={styles.examSummary}>
              {revealed
                ? `答到 ${hits.length} / ${card.checkpoints.length} 个要点 · 记为「${RATING_LABELS[hitRating]}」，${formatInterval(nextInterval(hitRating, learner.cards[card.id]))}进入复习`
                : '先独立作答，再揭开答案勾选要点'}
            </span>
            <button type="button" className={styles.darkButton} disabled={!revealed} onClick={() => submitExam(false)}>
              {position + 1 >= total ? '完成 →' : '下一题 →'}
            </button>
          </div>
        </div>
        {endDialog}
      </main>
    );
  }

  return (
    <main className={styles.sessionPage}>
      <div className={styles.column}>
        <div className={styles.sessionBar}>
          <b>今日复习</b>
          <Segments total={total} done={done} current className={styles.sessionSegments} />
          <span className={styles.counter}>
            {Math.min(done + 1, total)} / {total}
          </span>
          <button type="button" className={styles.pillButton} onClick={() => setConfirmEnd(true)}>
            结束 <Kbd>Esc</Kbd>
          </button>
        </div>
        <CardMeta card={card} showCompanies={false} />
        <h1 className={styles.question}>{card.question}</h1>
        <CardBody
          card={card}
          revealed={revealed}
          onReveal={() => setRevealed(true)}
          hits={hits}
          onToggleHit={(i) => setHits((current) => (current.includes(i) ? current.filter((x) => x !== i) : [...current, i]))}
          answerFirst
          footer={<SourceLink card={card} variant="view" />}
        />
        <div className={styles.footer}>
          <button
            type="button"
            className={styles.nav}
            disabled={!previousCard}
            onClick={() => {
              setPosition(position - 1);
              setRevealed(true);
              setHits([]);
            }}>
            <span className={styles.navLabel}>← 上一张 · 可重新评分</span>
            <span className={styles.navTitle}>{previousCard?.question ?? '—'}</span>
          </button>
          <div className={styles.footerCenter}>
            <RatingBar previous={learner.cards[card.id]} disabled={!revealed} onRate={rate} />
          </div>
          <span className={clsx(styles.navLabel, styles.navNext)}>评分后自动下一张</span>
        </div>
      </div>
      {toast && <Toast message={toast.message} onUndo={() => { toast.undo(); setToast(undefined); }} />}
      {endDialog}
    </main>
  );
}
