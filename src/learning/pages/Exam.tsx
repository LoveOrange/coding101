import {useMemo, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';

import {articlesForRole, domainShortLabel, isWeak, shuffle, useLearningIndex} from '../content';
import {UpgradeDialog} from '../review/UpgradeDialog';
import {summarize} from '../review/WeakList';
import {accessOf, learnerActions, toDay, useLearner} from '../store';
import type {ExamSetup, LearningIndex, Priority} from '../types';
import {formatMonthDay} from '../ui';
import {ClientPage} from '../ui/ClientOnly';
import styles from './Exam.module.css';

const COUNTS = [10, 20, 30];
const PRIORITY_WEIGHT: Record<Priority, number> = {must: 3, common: 2, optional: 1};

export default function Exam(): JSX.Element {
  return <ClientPage title="模拟测试">{() => <ExamSetupPage />}</ClientPage>;
}

/** Domains grouped by short label, e.g. all "Java · …" domains become "Java". */
function domainGroups(index: LearningIndex) {
  const groups = new Map<string, string[]>();
  for (const domain of index.domains) {
    const name = domainShortLabel(domain.label);
    groups.set(name, [...(groups.get(name) ?? []), domain.id]);
  }
  return [...groups.entries()].map(([name, ids]) => ({name, ids}));
}

function ExamSetupPage() {
  const index = useLearningIndex();
  const learner = useLearner();
  const history = useHistory();
  const role = index.roles.find((item) => item.id === learner.preferences.roleId);
  const groups = useMemo(() => domainGroups(index), [index]);
  const [setup, setSetup] = useState<ExamSetup>(learner.examSetup ?? {scope: 'role', domainIds: [], count: 20, timed: false});
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  const roleCards = articlesForRole(index, role?.id).flatMap((article) => article.cardIds);
  const weakCards = Object.keys(learner.cards).filter((id) => index.cards[id] && isWeak(index.cards[id], learner.cards[id]));
  const domainCards = Object.values(index.articles)
    .filter((article) => setup.domainIds.includes(article.domainId))
    .flatMap((article) => article.cardIds);
  const pool = setup.scope === 'role' ? roleCards : setup.scope === 'weak' ? weakCards : domainCards;
  const count = Math.min(setup.count, pool.length);

  const lastExam = learner.sessions.find((session) => session.mode === 'exam' && session.finishedAt);
  const lastSummary = lastExam ? summarize(lastExam, index) : undefined;

  const toggleGroup = (ids: string[]) => {
    const selected = ids.every((id) => setup.domainIds.includes(id));
    setSetup({
      ...setup,
      scope: 'domains',
      domainIds: selected ? setup.domainIds.filter((id) => !ids.includes(id)) : [...new Set([...setup.domainIds, ...ids])],
    });
  };

  const start = () => {
    if (accessOf(learner) !== 'active') {
      setUpgradeOpen(true);
      return;
    }
    // Weight by roadmap priority so 必会 topics come up more often.
    const weighted = shuffle(pool)
      .map((id) => ({id, weight: PRIORITY_WEIGHT[index.articles[index.cards[id].articleId].priority ?? 'optional'] + Math.random() * 2}))
      .sort((a, b) => b.weight - a.weight)
      .slice(0, count)
      .map((item) => item.id);
    learnerActions.setExamSetup(setup);
    const scopeLabel = setup.scope === 'role' ? role?.label ?? '全部领域' : setup.scope === 'weak' ? '待补' : '自选领域';
    const sessionId = learnerActions.startSession('exam', `模拟测试 · ${scopeLabel} · ${weighted.length} 题`, shuffle(weighted), setup);
    history.push(`/review?session=${sessionId}`);
  };

  return (
    <main className={styles.page}>
      <div className={styles.column}>
        <div className={styles.intro}>
          <Link to="/questions" className={styles.back}>
            ← 返回题库
          </Link>
          <h1 className={styles.title}>模拟一次面试</h1>
          <p className={styles.lead}>按考频抽题，题目不显示出处。先在心里或出声回答，再揭开答案，勾选你答到的要点。</p>
        </div>

        <fieldset className={styles.group}>
          <legend className={styles.label}>范围</legend>
          <label className={clsx(styles.option, setup.scope === 'role' && styles.optionActive)}>
            <input type="radio" name="scope" checked={setup.scope === 'role'} onChange={() => setSetup({...setup, scope: 'role'})} />
            <span className={clsx(styles.radio, setup.scope === 'role' && styles.radioOn)} />
            <span className={styles.optionTitle}>{role ? `${role.label} · 全部领域` : '全部领域'}</span>
            <span className={styles.optionCount}>{roleCards.length} 题</span>
          </label>
          <div className={clsx(styles.option, styles.optionWrap, setup.scope === 'domains' && styles.optionActive)}>
            <label className={styles.optionInline}>
              <input type="radio" name="scope" checked={setup.scope === 'domains'} onChange={() => setSetup({...setup, scope: 'domains'})} />
              <span className={clsx(styles.radio, setup.scope === 'domains' && styles.radioOn)} />
              <span className={styles.optionTitle}>选择领域</span>
            </label>
            <span className={styles.chips}>
              {groups.map((group) => (
                <button
                  key={group.name}
                  type="button"
                  aria-pressed={group.ids.every((id) => setup.domainIds.includes(id))}
                  className={clsx(styles.chip, group.ids.every((id) => setup.domainIds.includes(id)) && styles.chipOn)}
                  onClick={() => toggleGroup(group.ids)}>
                  {group.name}
                </button>
              ))}
            </span>
            {setup.scope === 'domains' && <span className={styles.optionCount}>{domainCards.length} 题</span>}
          </div>
          <label className={clsx(styles.option, setup.scope === 'weak' && styles.optionActive)}>
            <input type="radio" name="scope" checked={setup.scope === 'weak'} onChange={() => setSetup({...setup, scope: 'weak'})} />
            <span className={clsx(styles.radio, setup.scope === 'weak' && styles.radioOn)} />
            <span className={styles.optionTitle}>只考待补</span>
            <span className={styles.optionCount}>{weakCards.length} 题</span>
          </label>
        </fieldset>

        <fieldset className={styles.group}>
          <legend className={styles.label}>题数</legend>
          <div className={styles.tiles}>
            {COUNTS.map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={setup.count === value}
                className={clsx(styles.tile, setup.count === value && styles.tileOn)}
                onClick={() => setSetup({...setup, count: value})}>
                <span className={styles.tileValue}>{value} 题</span>
                <span className={styles.tileHint}>约 {value * 2} 分钟</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className={styles.group}>
          <legend className={styles.label}>每题限时</legend>
          <div className={styles.timeRow}>
            <div className={styles.tilesSmall}>
              {[false, true].map((timed) => (
                <button
                  key={String(timed)}
                  type="button"
                  aria-pressed={setup.timed === timed}
                  className={clsx(styles.tile, setup.timed === timed && styles.tileOn)}
                  onClick={() => setSetup({...setup, timed})}>
                  <span className={styles.tileValue}>{timed ? '3 分钟' : '关'}</span>
                </button>
              ))}
            </div>
            <span className={styles.hint}>{setup.timed ? '到时自动揭开答案' : '关闭时只记录总用时'}</span>
          </div>
        </fieldset>

        <div className={styles.foot}>
          <span className={styles.hint}>
            {lastExam && lastSummary
              ? `上次：${formatMonthDay(toDay(new Date(lastExam.startedAt)))} · ${lastExam.cardIds.length} 题 · 要点覆盖 ${lastSummary.coverage}%`
              : '第一次模拟测试'}
          </span>
          <button type="button" className={styles.start} disabled={count === 0} onClick={start}>
            {count ? `开始 ${count} 题 →` : '当前范围没有题目'}
          </button>
        </div>
      </div>
      <UpgradeDialog open={upgradeOpen} onClose={() => setUpgradeOpen(false)} />
    </main>
  );
}
