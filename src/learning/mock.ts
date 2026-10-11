import {addDays, getLearner, learnerActions, today} from './store';
import type {CardState, LearnerState, LearningIndex, Rating} from './types';

/**
 * Sample learner states for local previews. Enabled only when the site is
 * built with LEARNER_MOCKS=true; open any learner page with ?mock=<preset>.
 */
export type MockPreset = 'guest' | 'free' | 'trial' | 'pro' | 'expired';

const account = {name: '林同学', email: 'lin@example.com', createdAt: addDays(today(), -60)};

function sampleCards(index: LearningIndex): Record<string, CardState> {
  const ids = Object.keys(index.cards);
  const cards: Record<string, CardState> = {};
  const plan: [Rating, number, number][] = [
    // rating, interval, due offset
    ['again', 1, 0],
    ['hard', 3, 0],
    ['good', 12, 0],
    ['hard', 3, 0],
    ['again', 1, 0],
    ['good', 30, 19],
    ['hard', 3, 2],
    ['good', 12, 5],
    ['again', 1, 1],
    ['good', 30, 26],
  ];
  ids.slice(0, 60).forEach((id, i) => {
    const [rating, interval, offset] = plan[i % plan.length];
    const card = index.cards[id];
    const hits = rating === 'again' ? [0] : rating === 'hard' ? Array.from({length: Math.max(1, card.checkpointCount - 1)}, (_, k) => k) : undefined;
    cards[id] = {
      rating,
      interval,
      due: addDays(today(), offset),
      reviewedAt: new Date(Date.now() - (interval - offset) * 86400000).toISOString(),
      reps: 1 + (i % 3),
      hits: hits?.slice(0, card.checkpointCount),
    };
  });
  return cards;
}

function sampleReading(index: LearningIndex): LearnerState['reading'] {
  const reading: LearnerState['reading'] = {};
  const ids = Object.keys(index.articles).slice(0, 30);
  ids.forEach((id, i) => {
    const sections = index.articles[id].sections.length;
    reading[id] = {furthest: i % 4 === 3 ? 1 : sections, done: i % 4 !== 3, updatedAt: new Date().toISOString(), lastAnchor: index.articles[id].sections[1]?.id};
  });
  return reading;
}

export function applyMock(preset: MockPreset, index: LearningIndex) {
  learnerActions.reset();
  if (preset === 'guest') return;
  const base = getLearner();
  const cards = sampleCards(index);
  const cardIds = Object.keys(cards);
  const examCards = Object.keys(index.cards).slice(0, 20);
  const exam = {
    id: 's-mock-exam',
    mode: 'exam' as const,
    title: '模拟测试 · 20 题',
    cardIds: examCards,
    answers: examCards.map((cardId, i) => ({cardId, rating: (['good', 'hard', 'again', 'good'] as Rating[])[i % 4], hits: i % 4 === 2 ? [] : [0]})),
    startedAt: new Date(Date.now() - 7 * 86400000 - 2460000).toISOString(),
    finishedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    setup: {scope: 'role' as const, domainIds: [], count: 20, timed: false},
  };
  const quizCards = Object.keys(index.cards).slice(20, 30);
  const quiz = {
    id: 's-mock-quiz',
    mode: 'quiz' as const,
    title: '随机自测 · 10 题',
    cardIds: quizCards,
    answers: quizCards.map((cardId, i) => {
      const total = index.cards[cardId].checkpointCount;
      const rating: Rating = i < 6 ? 'good' : i === 6 ? 'hard' : 'again';
      const hits = rating === 'good' ? Array.from({length: total}, (_, k) => k) : rating === 'hard' ? [0] : [];
      return {cardId, rating, hits};
    }),
    startedAt: new Date(Date.now() - 18 * 60000).toISOString(),
    finishedAt: new Date().toISOString(),
  };
  const todayIds = cardIds.filter((id) => cards[id].due <= today()).slice(0, 12);
  const todaySession = {
    id: 's-mock-today',
    mode: 'today' as const,
    title: `今日复习 · ${todayIds.length} 张`,
    cardIds: todayIds,
    answers: todayIds.slice(0, 5).map((cardId) => ({cardId, rating: 'good' as Rating})),
    startedAt: new Date(Date.now() - 3 * 3600000).toISOString(),
  };
  const next: LearnerState = {
    ...base,
    account,
    preferences: {roleId: index.roles[0]?.id, interviewDate: addDays(today(), 23), dailyLimit: 20},
    reading: sampleReading(index),
    cards: preset === 'free' ? {} : cards,
    sessions: preset === 'free' ? [] : [todaySession, quiz, exam],
    billing:
      preset === 'pro' || preset === 'expired'
        ? [
            {id: 'b1', date: addDays(today(), -38), item: '激活码月卡', method: 'code', effect: '+30 天', status: 'applied', code: 'MV3A-7KQE-H2NB-8KQE'},
            {id: 'b2', date: addDays(today(), -176), item: '激活码年卡', method: 'code', effect: '开通 Pro', status: 'applied', code: 'YZT9-2HXN-Q4MD-2HXN'},
          ]
        : [],
    subscription:
      preset === 'free'
        ? {status: 'free', hadTrial: true}
        : preset === 'trial'
          ? {status: 'trial', endsAt: addDays(today(), 5)}
          : preset === 'pro'
            ? {status: 'pro', plan: 'yearly', endsAt: addDays(today(), 364), autoRenew: true}
            : {status: 'expired', endedAt: addDays(today(), -11), retainUntil: addDays(today(), 79)},
  };
  learnerActions.replace(next);
}
