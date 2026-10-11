import {useSyncExternalStore} from 'react';

import type {
  Account,
  BillingRecord,
  CardState,
  ExamSetup,
  LearnerState,
  Plan,
  Preferences,
  Rating,
  Region,
  ReviewSession,
  SessionAnswer,
  Subscription,
} from './types';

/**
 * Browser-only learner store.
 *
 * Prototype persistence: everything lives in localStorage under one key, so
 * accounts, payments and redemption are mocks. The API is shaped so a backend
 * can replace `read`/`write` without changing the pages.
 */

const KEY = 'coding101.learner.v1';
const TRIAL_DAYS = 7;
const RETAIN_DAYS = 90;
const GRACE_DAYS = 3;
const LOCK_MINUTES = 15;
const MAX_FAILURES = 5;

/* ---- Dates (local calendar days) ---- */

export function today(): string {
  return toDay(new Date());
}

export function toDay(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function addDays(day: string, days: number): string {
  const [y, m, d] = day.split('-').map(Number);
  return toDay(new Date(y, m - 1, d + days));
}

export function daysBetween(from: string, to: string): number {
  const [y1, m1, d1] = from.split('-').map(Number);
  const [y2, m2, d2] = to.split('-').map(Number);
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000);
}

/* ---- Scheduling ---- */

export function nextInterval(rating: Rating, previous?: CardState): number {
  const last = previous?.interval ?? 0;
  if (rating === 'again') return 1;
  if (rating === 'hard') return Math.max(3, Math.round(last * 1.2));
  return Math.max(12, Math.round(last * 2.5));
}

/* ---- State ---- */

const initialState: LearnerState = {
  version: 1,
  subscription: {status: 'free', hadTrial: false},
  region: 'cn',
  preferences: {dailyLimit: 20},
  cards: {},
  reading: {},
  billing: [],
  sessions: [],
  redeemFailures: {count: 0},
};

let state: LearnerState = initialState;
let loaded = false;
const listeners = new Set<() => void>();

function storage(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage;
  } catch {
    return null;
  }
}

/** Apply date-driven subscription transitions. */
function settle(current: LearnerState): LearnerState {
  const now = today();
  const sub = current.subscription;
  let next: Subscription = sub;
  if (sub.status === 'trial' && sub.endsAt < now) {
    next = {status: 'expired', endedAt: sub.endsAt, retainUntil: addDays(sub.endsAt, RETAIN_DAYS)};
  } else if (sub.status === 'pro' && sub.endsAt < now) {
    if (sub.autoRenew && !sub.renewalFailedAt) {
      const years = sub.plan === 'yearly' ? 12 : sub.plan === 'pass' ? 3 : 1;
      const [y, m, d] = sub.endsAt.split('-').map(Number);
      next = {...sub, endsAt: toDay(new Date(y, m - 1 + years, d))};
    } else if (!sub.renewalFailedAt || addDays(sub.renewalFailedAt, GRACE_DAYS) < now) {
      next = {status: 'expired', endedAt: sub.endsAt, retainUntil: addDays(sub.endsAt, RETAIN_DAYS)};
    }
  }
  if (next.status === 'expired' && next.retainUntil < now) {
    return {...current, subscription: {status: 'free', hadTrial: true}, cards: {}, sessions: []};
  }
  return next === sub ? current : {...current, subscription: next};
}

function load(): LearnerState {
  if (loaded) return state;
  loaded = true;
  const raw = storage()?.getItem(KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as LearnerState;
      if (parsed.version === 1) state = {...initialState, ...parsed};
    } catch {
      state = initialState;
    }
  }
  state = settle(state);
  return state;
}

function write(next: LearnerState) {
  state = next;
  try {
    storage()?.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage full or blocked: keep the in-memory state for this visit.
  }
  listeners.forEach((listener) => listener());
}

function update(change: (current: LearnerState) => LearnerState) {
  write(change(load()));
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== KEY) return;
    loaded = false;
    load();
    listener();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

export function useLearner(): LearnerState {
  return useSyncExternalStore(subscribe, load, () => initialState);
}

export function getLearner(): LearnerState {
  return load();
}

/* ---- Entitlements ---- */

export type Access = 'guest' | 'free' | 'active' | 'readonly';

export function accessOf(learner: LearnerState): Access {
  if (!learner.account) return 'guest';
  const status = learner.subscription.status;
  if (status === 'trial' || status === 'pro') return 'active';
  if (status === 'expired') return 'readonly';
  return 'free';
}

/* ---- Actions ---- */

function id(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export const learnerActions = {
  signIn(account: Pick<Account, 'name' | 'email'>) {
    update((current) => {
      const sub = current.subscription;
      const startTrial = sub.status === 'free' && !sub.hadTrial;
      return {
        ...current,
        account: {...account, createdAt: current.account?.createdAt ?? today()},
        subscription: startTrial ? {status: 'trial', endsAt: addDays(today(), TRIAL_DAYS)} : sub,
      };
    });
  },

  signOut() {
    update((current) => ({...current, account: undefined}));
  },

  rate(cardId: string, rating: Rating, options: {hits?: number[]} = {}) {
    let previous: CardState | undefined;
    update((current) => {
      previous = current.cards[cardId];
      const interval = nextInterval(rating, previous);
      const next: CardState = {
        rating,
        interval,
        due: addDays(today(), interval),
        reviewedAt: new Date().toISOString(),
        reps: (previous?.reps ?? 0) + 1,
        hits: options.hits,
      };
      return {...current, cards: {...current.cards, [cardId]: next}};
    });
    return previous;
  },

  restore(cardId: string, previous: CardState | undefined) {
    update((current) => {
      const cards = {...current.cards};
      if (previous) cards[cardId] = previous;
      else delete cards[cardId];
      return {...current, cards};
    });
  },

  markReread(cardId: string) {
    update((current) => {
      const card = current.cards[cardId];
      if (!card) return current;
      return {...current, cards: {...current.cards, [cardId]: {...card, reread: true}}};
    });
  },

  setSuspended(cardIds: string[], suspended: boolean) {
    update((current) => {
      const cards = {...current.cards};
      for (const cardId of cardIds) {
        const card = cards[cardId];
        cards[cardId] = card
          ? {...card, suspended}
          : {rating: 'good', interval: 0, due: today(), reviewedAt: new Date().toISOString(), reps: 0, suspended};
      }
      return {...current, cards};
    });
  },

  markMastered(cardIds: string[]) {
    update((current) => {
      const cards = {...current.cards};
      for (const cardId of cardIds) {
        const card = cards[cardId];
        const interval = Math.max(12, card?.interval ?? 0);
        cards[cardId] = {
          rating: 'good',
          interval,
          due: addDays(today(), interval),
          reviewedAt: new Date().toISOString(),
          reps: (card?.reps ?? 0) + 1,
        };
      }
      return {...current, cards};
    });
  },

  recordReading(articleId: string, furthest: number, lastAnchor: string | undefined, done: boolean) {
    update((current) => {
      const previous = current.reading[articleId];
      if (previous && previous.furthest >= furthest && previous.done >= done && previous.lastAnchor === lastAnchor) {
        return current;
      }
      return {
        ...current,
        reading: {
          ...current.reading,
          [articleId]: {
            furthest: Math.max(previous?.furthest ?? 0, furthest),
            lastAnchor,
            done: Boolean(previous?.done) || done,
            updatedAt: new Date().toISOString(),
          },
        },
      };
    });
  },

  /** Queue unrated cards for tomorrow once their article has been read. */
  queueCards(cardIds: string[]) {
    update((current) => {
      if (accessOf(current) !== 'active') return current;
      const fresh = cardIds.filter((cardId) => !current.cards[cardId]);
      if (!fresh.length) return current;
      const cards = {...current.cards};
      const due = addDays(today(), 1);
      for (const cardId of fresh) {
        cards[cardId] = {rating: 'hard', interval: 0, due, reviewedAt: new Date().toISOString(), reps: 0};
      }
      return {...current, cards};
    });
  },

  setPreferences(preferences: Partial<Preferences>) {
    update((current) => ({...current, preferences: {...current.preferences, ...preferences}}));
  },

  setRegion(region: Region) {
    update((current) => ({...current, region}));
  },

  setExamSetup(setup: ExamSetup) {
    update((current) => ({...current, examSetup: setup}));
  },

  /** Mock checkout: activates the plan immediately. */
  purchase(plan: Plan) {
    update((current) => {
      const sub = current.subscription;
      const base = sub.status === 'pro' && sub.endsAt > today() ? sub.endsAt : today();
      const months = plan === 'yearly' || plan === 'code-yearly' ? 12 : plan === 'pass' ? 3 : 1;
      const [y, m, d] = base.split('-').map(Number);
      const endsAt = toDay(new Date(y, m - 1 + months, d));
      const autoRenew = plan === 'monthly' || plan === 'yearly';
      const record: BillingRecord = {
        id: id('bill'),
        date: today(),
        item: PLAN_LABELS[plan],
        method: current.region === 'cn' ? 'wechat' : 'card',
        amount: PLAN_PRICES[current.region][plan],
        effect: sub.status === 'pro' ? `+${months} 个月` : '开通 Pro',
        status: 'paid',
      };
      return {
        ...current,
        subscription: {status: 'pro', plan, endsAt, autoRenew},
        billing: [record, ...current.billing],
      };
    });
  },

  setAutoRenew(autoRenew: boolean) {
    update((current) => {
      const sub = current.subscription;
      if (sub.status !== 'pro') return current;
      return {...current, subscription: {...sub, autoRenew}};
    });
  },

  redeem(rawCode: string): RedeemResult {
    const current = load();
    const now = new Date();
    const lock = current.redeemFailures.lockedUntil;
    if (lock && new Date(lock) > now) return {status: 'locked', until: lock};

    const code = normalizeCode(rawCode);
    const used = current.billing.find((record) => record.code === code);
    const outcome = used ? ({status: 'used', date: used.date} as const) : checkMockCode(code);
    if (outcome.status !== 'ok') {
      const count = current.redeemFailures.count + 1;
      const lockedUntil = count >= MAX_FAILURES ? new Date(now.getTime() + LOCK_MINUTES * 60000).toISOString() : undefined;
      write({...current, redeemFailures: {count: lockedUntil ? 0 : count, lockedUntil}});
      return lockedUntil ? {status: 'locked', until: lockedUntil} : outcome;
    }

    const sub = current.subscription;
    const previousEnd = sub.status === 'pro' ? sub.endsAt : undefined;
    const startsFrom = previousEnd && previousEnd >= today() ? previousEnd : today();
    const [y, m, d] = startsFrom.split('-').map(Number);
    const endsAt = toDay(new Date(y, m - 1 + (outcome.plan === 'code-yearly' ? 12 : 0), d + (outcome.plan === 'code-yearly' ? 0 : 30)));
    const record: BillingRecord = {
      id: id('bill'),
      date: today(),
      item: PLAN_LABELS[outcome.plan],
      method: 'code',
      effect: sub.status === 'pro' ? (outcome.plan === 'code-yearly' ? '+365 天' : '+30 天') : '开通 Pro',
      status: 'applied',
      code,
    };
    write({
      ...current,
      subscription: {
        status: 'pro',
        plan: sub.status === 'pro' ? sub.plan : outcome.plan,
        endsAt,
        autoRenew: sub.status === 'pro' ? sub.autoRenew : false,
      },
      billing: [record, ...current.billing],
      redeemFailures: {count: 0},
    });
    return {status: 'ok', plan: outcome.plan, previousEnd, endsAt, code, wasReadonly: sub.status === 'expired'};
  },

  startSession(mode: ReviewSession['mode'], title: string, cardIds: string[], setup?: ExamSetup): string {
    const session: ReviewSession = {id: id('s'), mode, title, cardIds, answers: [], startedAt: new Date().toISOString(), setup};
    update((current) => ({...current, sessions: [session, ...current.sessions.slice(0, 19)]}));
    return session.id;
  },

  answer(sessionId: string, answer: SessionAnswer) {
    update((current) => ({
      ...current,
      sessions: current.sessions.map((session) =>
        session.id === sessionId
          ? {...session, answers: [...session.answers.filter((item) => item.cardId !== answer.cardId), answer]}
          : session,
      ),
    }));
  },

  unanswer(sessionId: string, cardId: string) {
    update((current) => ({
      ...current,
      sessions: current.sessions.map((session) =>
        session.id === sessionId ? {...session, answers: session.answers.filter((item) => item.cardId !== cardId)} : session,
      ),
    }));
  },

  finishSession(sessionId: string) {
    update((current) => ({
      ...current,
      sessions: current.sessions.map((session) =>
        session.id === sessionId && !session.finishedAt ? {...session, finishedAt: new Date().toISOString()} : session,
      ),
    }));
  },

  /** Development helper: jump to a subscription state. */
  setSubscription(subscription: Subscription) {
    update((current) => ({...current, subscription}));
  },

  reset() {
    write(initialState);
  },

  /** Replace the whole state; used by local preview mocks. */
  replace(next: LearnerState) {
    write(settle(next));
  },
};

/* ---- Plans and redemption ---- */

export const PLAN_LABELS: Record<Plan, string> = {
  monthly: 'Pro 月付',
  yearly: 'Pro 年付',
  pass: '求职通行证 · 3 个月',
  'code-monthly': '激活码月卡',
  'code-yearly': '激活码年卡',
};

// TODO(copy): prices come from the design draft and are not final.
export const PLAN_PRICES: Record<Region, Record<Plan, string>> = {
  cn: {monthly: '¥9.9', yearly: '¥99', pass: '—', 'code-monthly': '¥9.9', 'code-yearly': '¥99'},
  intl: {monthly: '$3.9', yearly: '$29', pass: '$19', 'code-monthly': '—', 'code-yearly': '—'},
};

export type RedeemResult =
  | {status: 'ok'; plan: Plan; previousEnd?: string; endsAt: string; code: string; wasReadonly: boolean}
  | {status: 'not-found'}
  | {status: 'used'; date: string}
  | {status: 'expired'; date: string}
  | {status: 'locked'; until: string};

/** Activation codes never contain 0, O, 1 or I. */
export const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function normalizeCode(raw: string): string {
  const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 16);
  return clean.match(/.{1,4}/g)?.join('-') ?? '';
}

/**
 * Mock validation until a redemption service exists:
 * codes starting with Y are yearly, M monthly, X expired; anything else is unknown.
 */
function checkMockCode(code: string): {status: 'ok'; plan: Plan} | {status: 'not-found'} | {status: 'expired'; date: string} {
  const chars = code.replace(/-/g, '');
  if (chars.length !== 16 || [...chars].some((char) => !CODE_ALPHABET.includes(char))) return {status: 'not-found'};
  if (chars.startsWith('Y')) return {status: 'ok', plan: 'code-yearly'};
  if (chars.startsWith('M')) return {status: 'ok', plan: 'code-monthly'};
  if (chars.startsWith('X')) return {status: 'expired', date: addDays(today(), -30)};
  return {status: 'not-found'};
}
