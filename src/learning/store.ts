import {useSyncExternalStore} from 'react';

import {api, ApiError, serverEnabled, type ServerAccess, type ServerBillingRecord} from './api';
import type {
  BillingRecord,
  CardState,
  ExamSetup,
  LearnerRecords,
  LearnerState,
  Plan,
  Preferences,
  Rating,
  ReviewSession,
  SessionAnswer,
  Subscription,
} from './types';

/**
 * Learner store, cached in localStorage and reconciled with the account service.
 *
 * Learning records (card schedule, reading, sessions, preferences) are edited
 * locally first, so pages stay synchronous, then pushed as one versioned
 * document. A push based on a stale version gets the server copy back; the two
 * are merged entry by entry and pushed again. Account, subscription, billing
 * and redemption always come from the server. `?mock=` previews run offline.
 */

const KEY = 'coding101.learner.v1';
const RETAIN_DAYS = 90;
const SYNC_DELAY_MS = 2000;
const RETRY_DELAY_MS = 30000;

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

const isoDay = (iso: string) => toDay(new Date(iso));

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
  preferences: {dailyLimit: 20},
  cards: {},
  reading: {},
  billing: [],
  sessions: [],
};

let state: LearnerState = initialState;
let loaded = false;
/**
 * Offline when the build has no account service (learner features off, or a
 * `LEARNER_MOCKS` preview): nothing is fetched and sign-in stays local.
 */
let offline = !serverEnabled();
const listeners = new Set<() => void>();

function storage(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage;
  } catch {
    return null;
  }
}

/**
 * Apply date-driven transitions between server refreshes. The server is the
 * truth for renewals; this only keeps an open tab from showing a lapsed trial
 * or a non-renewing plan as active.
 */
function settle(current: LearnerState): LearnerState {
  const now = today();
  const sub = current.subscription;
  let next: Subscription = sub;
  if (sub.status === 'trial' && sub.endsAt < now) {
    next = {status: 'expired', endedAt: sub.endsAt, retainUntil: addDays(sub.endsAt, RETAIN_DAYS)};
  } else if (sub.status === 'pro' && sub.endsAt < now && !sub.autoRenew) {
    next = {status: 'expired', endedAt: sub.endsAt, retainUntil: addDays(sub.endsAt, RETAIN_DAYS)};
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
  if (Object.keys(state.cards).length || state.sessions.length) void migrateCardIds();
  return state;
}

/**
 * Re-key records saved under card ids that were later retired (see
 * src/data/contentMoves.json). The map is fetched only for learners with records.
 */
async function migrateCardIds() {
  const {cards: moved} = (await import('@site/src/data/contentMoves.json')).default as {cards: Record<string, string>};
  const current = load();
  const rename = (id: string) => moved[id] ?? id;
  const stale = [
    ...Object.keys(current.cards),
    ...current.sessions.flatMap((session) => [...session.cardIds, ...session.answers.map((answer) => answer.cardId)]),
  ].some((id) => moved[id]);
  if (!stale) return;
  const cards: Record<string, CardState> = {};
  for (const [id, card] of Object.entries(current.cards)) {
    // A record already kept under the new id wins over the retired one.
    if (!moved[id] || !current.cards[moved[id]]) cards[rename(id)] = card;
  }
  record(() => ({
    ...current,
    cards,
    sessions: current.sessions.map((session) => ({
      ...session,
      cardIds: session.cardIds.map(rename),
      answers: session.answers.map((answer) => ({...answer, cardId: rename(answer.cardId)})),
    })),
  }));
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

/** Change learning records and queue a push to the account service. */
function record(change: (current: LearnerState) => LearnerState) {
  const before = load();
  const next = change(before);
  if (next === before) return;
  write(next);
  scheduleSync();
}

let refreshedAt = 0;

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== KEY) return;
    loaded = false;
    load();
    listener();
  };
  // Reconcile with the server on the first render and when the tab regains focus.
  const onFocus = () => {
    if (Date.now() - refreshedAt > 60000) void refresh();
  };
  window.addEventListener('storage', onStorage);
  window.addEventListener('focus', onFocus);
  onFocus();
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
    window.removeEventListener('focus', onFocus);
  };
}

export function useLearner(): LearnerState {
  return useSyncExternalStore(subscribe, load, () => initialState);
}

export function getLearner(): LearnerState {
  return load();
}

/** True when this build runs without the account service (previews, mirror). */
export function isOffline(): boolean {
  return offline;
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

/* ---- Server reconciliation ---- */

function recordsOf(current: LearnerState): LearnerRecords {
  const {cards, reading, sessions, preferences, examSetup} = current;
  return {cards, reading, sessions, preferences, ...(examSetup ? {examSetup} : {})};
}

function normalizeRecords(data: Partial<LearnerRecords> | null | undefined): LearnerRecords {
  return {
    cards: data?.cards ?? {},
    reading: data?.reading ?? {},
    sessions: data?.sessions ?? [],
    preferences: {...initialState.preferences, ...data?.preferences},
    ...(data?.examSetup ? {examSetup: data.examSetup} : {}),
  };
}

const stamp = (card: CardState) => card.updatedAt ?? card.reviewedAt;

/**
 * Merge two copies of the records (this device and another one) entry by entry:
 * the later card change wins, reading progress only moves forward, sessions are
 * united by id, and this device's preferences win.
 */
export function mergeRecords(local: LearnerRecords, remote: LearnerRecords): LearnerRecords {
  const cards = {...remote.cards};
  for (const [id, card] of Object.entries(local.cards)) {
    const other = cards[id];
    if (!other || stamp(card) >= stamp(other)) cards[id] = card;
  }
  const reading = {...remote.reading};
  for (const [id, item] of Object.entries(local.reading)) {
    const other = reading[id];
    if (!other) {
      reading[id] = item;
      continue;
    }
    const later = item.updatedAt >= other.updatedAt ? item : other;
    reading[id] = {
      furthest: Math.max(item.furthest, other.furthest),
      done: item.done || other.done,
      lastAnchor: later.lastAnchor,
      updatedAt: later.updatedAt,
    };
  }
  const sessions = new Map(remote.sessions.map((session) => [session.id, session]));
  for (const session of local.sessions) {
    const other = sessions.get(session.id);
    const keepLocal =
      !other || Boolean(session.finishedAt) > Boolean(other.finishedAt) || session.answers.length >= other.answers.length;
    if (keepLocal) sessions.set(session.id, session);
  }
  return {
    cards,
    reading,
    sessions: [...sessions.values()].sort((a, b) => b.startedAt.localeCompare(a.startedAt)).slice(0, 20),
    preferences: {...remote.preferences, ...local.preferences},
    ...((local.examSetup ?? remote.examSetup) ? {examSetup: local.examSetup ?? remote.examSetup} : {}),
  };
}

function toSubscription(access: ServerAccess): Subscription {
  switch (access.status) {
    case 'free':
      return {status: 'free', hadTrial: access.hadTrial};
    case 'trial':
      return {status: 'trial', endsAt: isoDay(access.endsAt)};
    case 'expired':
      return {status: 'expired', endedAt: isoDay(access.endedAt), retainUntil: isoDay(access.retainUntil)};
    case 'pro':
      return {
        status: 'pro',
        plan: access.plan,
        // An active subscription without a known period end keeps renewing.
        endsAt: access.endsAt ? isoDay(access.endsAt) : '9999-12-31',
        autoRenew: access.autoRenew,
        ...(access.renewalFailedAt ? {renewalFailedAt: isoDay(access.renewalFailedAt)} : {}),
      };
  }
}

let pushTimer: number | undefined;
let pushing = false;
let dirty = false;

function canSync(current: LearnerState): boolean {
  return !offline && accessOf(current) === 'active';
}

function scheduleSync(delay = SYNC_DELAY_MS) {
  if (typeof window === 'undefined' || !canSync(load())) return;
  dirty = true;
  window.clearTimeout(pushTimer);
  pushTimer = window.setTimeout(() => void push(), delay);
}

async function push() {
  if (pushing) return;
  const current = load();
  if (!canSync(current)) return;
  pushing = true;
  dirty = false;
  try {
    const {version} = await api.putRecords(current.syncVersion ?? 0, recordsOf(current));
    write({...load(), syncVersion: version});
  } catch (error) {
    if (error instanceof ApiError && error.status === 409) {
      // Another device wrote first: merge its copy in and push the result.
      const remote = error.body.current as {version: number; data: Partial<LearnerRecords> | null};
      const latest = load();
      write({...latest, ...mergeRecords(recordsOf(latest), normalizeRecords(remote.data)), syncVersion: remote.version});
      dirty = true;
    } else if (error instanceof ApiError && (error.status === 401 || error.status === 402)) {
      void refresh();
    } else {
      pushing = false;
      scheduleSync(RETRY_DELAY_MS);
      return;
    }
  } finally {
    pushing = false;
  }
  if (dirty) scheduleSync(0);
}

let accessKnown: Promise<void> | undefined;

/**
 * Resolves once this visit's first server refresh has settled who the reader
 * is (at once when offline; with the cached state if the service is down).
 */
export function whenAccessKnown(): Promise<void> {
  if (offline || typeof window === 'undefined') return Promise.resolve();
  return accessKnown ?? refresh();
}

/** Pull account, access and records from the server and reconcile the cache. */
export function refresh(): Promise<void> {
  const run = pull();
  accessKnown ??= run;
  return run;
}

async function pull(): Promise<void> {
  if (offline || typeof window === 'undefined') return;
  refreshedAt = Date.now();
  let me;
  try {
    me = await api.me();
  } catch {
    return; // Service unreachable: keep the cached state.
  }
  if (!me.user) {
    // Signed out (here or elsewhere): drop the account and this browser's copy of its records.
    if (load().account) write(initialState);
    return;
  }
  let current = load();
  if (current.account?.id && current.account.id !== me.user.id) current = initialState;
  const email = me.user.email ?? '';
  let next: LearnerState = {
    ...current,
    account: {id: me.user.id, name: me.user.name || email.split('@')[0], email, createdAt: isoDay(me.user.createdAt)},
    subscription: toSubscription(me.access),
  };
  try {
    const remote = await api.getRecords();
    const remoteRecords = normalizeRecords(remote.data);
    const merged = remote.data ? mergeRecords(recordsOf(next), remoteRecords) : recordsOf(next);
    next = {...next, ...merged, syncVersion: remote.version};
    write(settle(next));
    if (remote.writable && JSON.stringify(merged) !== JSON.stringify(remoteRecords)) scheduleSync(0);
  } catch {
    write(settle(next));
  }
}

/* ---- Plans and prices ---- */

export const PLAN_LABELS: Record<Plan, string> = {
  monthly: 'Pro 月付',
  yearly: 'Pro 年付',
  sprint: '冲刺 · 3 个月',
  code: '激活码',
};

export type PurchasablePlan = Exclude<Plan, 'code'>;

/** Purchase deadline in Asia/Shanghai; existing subscriptions keep their discount. */
export const LAUNCH_ENDS = '2026-12-31';

// Display only; Creem must apply the matching 50% discount at checkout.
export const PLAN_PRICES: Record<PurchasablePlan, {price: string; regular: string}> = {
  monthly: {price: '$3.90', regular: '$7.80'},
  sprint: {price: '$9.90', regular: '$19.80'},
  yearly: {price: '$29', regular: '$58'},
};

export function isLaunchOfferActive(now = Date.now()): boolean {
  return now <= Date.parse(`${LAUNCH_ENDS}T23:59:59.999+08:00`);
}

/** New-purchase price only. Renewal amounts belong to the existing subscription. */
export function priceOf(plan: PurchasablePlan, now = Date.now()): string {
  return isLaunchOfferActive(now) ? PLAN_PRICES[plan].price : PLAN_PRICES[plan].regular;
}

function toBillingRecords(records: ServerBillingRecord[]): BillingRecord[] {
  return records.map((item, i) => {
    const date = isoDay(item.date);
    if (item.kind === 'code') {
      return {id: `code-${i}`, date, item: `激活码 · ${item.days} 天`, method: 'code', effect: `+${item.days} 天`, status: 'applied', code: item.masked};
    }
    if (item.kind === 'order') {
      const amount = `${item.currency === 'USD' ? '$' : `${item.currency} `}${(item.amount / 100).toFixed(2).replace(/\.00$/, '')}`;
      return {id: `order-${i}`, date, item: PLAN_LABELS[item.plan], method: 'card', amount, effect: '+90 天', status: item.status};
    }
    const label = `${PLAN_LABELS[item.plan]} · ${item.cancelAtPeriodEnd ? '已关闭续费' : '自动续费'}`;
    return {id: `sub-${i}`, date, item: label, method: 'card', effect: '开通 Pro', status: 'paid'};
  });
}

/* ---- Redemption ---- */

export type RedeemResult =
  | {status: 'ok'; days: number; previousEnd?: string; endsAt: string; code: string; wasReadonly: boolean}
  | {status: 'not-found'}
  | {status: 'used'; date: string}
  | {status: 'expired'; date: string}
  | {status: 'locked'; until: string}
  | {status: 'error'};

/** Activation codes never contain 0, O, 1 or I. */
export const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function normalizeCode(raw: string): string {
  const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 16);
  return clean.match(/.{1,4}/g)?.join('-') ?? '';
}

/* ---- Actions ---- */

/** Preview builds: a browser-only account whose first sign-in starts the trial. */
function localSignIn(email: string) {
  update((current) => {
    const sub = current.subscription;
    const startTrial = sub.status === 'free' && !sub.hadTrial;
    return {
      ...current,
      account: {name: email.split('@')[0], email, createdAt: current.account?.createdAt ?? today()},
      subscription: startTrial ? {status: 'trial', endsAt: addDays(today(), 7)} : sub,
    };
  });
}

function id(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

const nowIso = () => new Date().toISOString();

export const learnerActions = {
  /** Email a sign-in code (no-op in offline previews). */
  async sendCode(email: string) {
    if (!offline) await api.sendCode(email);
  },

  /**
   * Sign in with the emailed code. The first sign-in creates the account and
   * starts the 7-day trial (the server grants it at most once per account).
   */
  async verifyCode(email: string, code: string) {
    if (offline) return localSignIn(email);
    await api.verifyCode(email, code);
    await api.startTrial().catch(() => undefined);
    await refresh();
  },

  /** Sign out and drop this browser's copy of the records (they stay on the server). */
  async signOut() {
    window.clearTimeout(pushTimer);
    if (!offline) await api.signOut().catch(() => undefined);
    write(initialState);
  },

  /** Delete the account and its records on the server, then this browser's copy. */
  async deleteAccount() {
    window.clearTimeout(pushTimer);
    if (!offline) await api.deleteAccount();
    write(initialState);
  },

  rate(cardId: string, rating: Rating, options: {hits?: number[]} = {}) {
    let previous: CardState | undefined;
    record((current) => {
      previous = current.cards[cardId];
      const interval = nextInterval(rating, previous);
      const next: CardState = {
        rating,
        interval,
        due: addDays(today(), interval),
        reviewedAt: nowIso(),
        updatedAt: nowIso(),
        reps: (previous?.reps ?? 0) + 1,
        hits: options.hits,
      };
      return {...current, cards: {...current.cards, [cardId]: next}};
    });
    return previous;
  },

  restore(cardId: string, previous: CardState | undefined) {
    record((current) => {
      const cards = {...current.cards};
      if (previous) cards[cardId] = {...previous, updatedAt: nowIso()};
      else delete cards[cardId];
      return {...current, cards};
    });
  },

  markReread(cardId: string) {
    record((current) => {
      const card = current.cards[cardId];
      if (!card) return current;
      return {...current, cards: {...current.cards, [cardId]: {...card, reread: true, updatedAt: nowIso()}}};
    });
  },

  setSuspended(cardIds: string[], suspended: boolean) {
    record((current) => {
      const cards = {...current.cards};
      for (const cardId of cardIds) {
        const card = cards[cardId];
        cards[cardId] = card
          ? {...card, suspended, updatedAt: nowIso()}
          : {rating: 'good', interval: 0, due: today(), reviewedAt: nowIso(), updatedAt: nowIso(), reps: 0, suspended};
      }
      return {...current, cards};
    });
  },

  markMastered(cardIds: string[]) {
    record((current) => {
      const cards = {...current.cards};
      for (const cardId of cardIds) {
        const card = cards[cardId];
        const interval = Math.max(12, card?.interval ?? 0);
        cards[cardId] = {
          rating: 'good',
          interval,
          due: addDays(today(), interval),
          reviewedAt: nowIso(),
          updatedAt: nowIso(),
          reps: (card?.reps ?? 0) + 1,
        };
      }
      return {...current, cards};
    });
  },

  recordReading(articleId: string, furthest: number, lastAnchor: string | undefined, done: boolean) {
    record((current) => {
      if (accessOf(current) !== 'active') return current;
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
            updatedAt: nowIso(),
          },
        },
      };
    });
  },

  /** Queue unrated cards for tomorrow once their article has been read. */
  queueCards(cardIds: string[]) {
    record((current) => {
      if (accessOf(current) !== 'active') return current;
      const fresh = cardIds.filter((cardId) => !current.cards[cardId]);
      if (!fresh.length) return current;
      const cards = {...current.cards};
      const due = addDays(today(), 1);
      for (const cardId of fresh) {
        cards[cardId] = {rating: 'hard', interval: 0, due, reviewedAt: nowIso(), updatedAt: nowIso(), reps: 0};
      }
      return {...current, cards};
    });
  },

  setPreferences(preferences: Partial<Preferences>) {
    record((current) => ({...current, preferences: {...current.preferences, ...preferences}}));
  },

  setExamSetup(setup: ExamSetup) {
    record((current) => ({...current, examSetup: setup}));
  },

  /** Go to the platform checkout for a plan (the page leaves the site). */
  async purchase(plan: PurchasablePlan) {
    const {url} = await api.checkout(plan);
    window.location.assign(url);
  },

  /** Turning renewal off cancels at period end; turning it back on happens in the portal. */
  async setAutoRenew(autoRenew: boolean) {
    if (autoRenew) {
      await learnerActions.openPortal();
      return;
    }
    await api.cancelAutoRenew();
    await refresh();
  },

  /** The platform's self-serve portal: payment method, invoices, resuming renewal. */
  async openPortal() {
    const {url} = await api.portal();
    window.location.assign(url);
  },

  async loadBilling() {
    if (offline) return;
    const {records} = await api.billing();
    update((current) => ({...current, billing: toBillingRecords(records)}));
  },

  async redeem(rawCode: string): Promise<RedeemResult> {
    const wasReadonly = load().subscription.status === 'expired';
    try {
      const {redemption} = await api.redeem(normalizeCode(rawCode));
      await refresh();
      void learnerActions.loadBilling().catch(() => undefined);
      return {
        status: 'ok',
        days: redemption.accessDays,
        previousEnd: redemption.previousUntil ? isoDay(redemption.previousUntil) : undefined,
        endsAt: isoDay(redemption.endsAt),
        code: redemption.masked,
        wasReadonly,
      };
    } catch (error) {
      if (!(error instanceof ApiError)) return {status: 'error'};
      const at = typeof error.body.at === 'string' ? error.body.at : undefined;
      switch (error.code) {
        case 'code_not_found':
          return {status: 'not-found'};
        case 'code_used':
          return {status: 'used', date: at ? isoDay(at) : today()};
        case 'code_expired':
          return {status: 'expired', date: at ? isoDay(at) : today()};
        case 'redemption_locked':
          return {status: 'locked', until: at ?? new Date(Date.now() + 15 * 60000).toISOString()};
        default:
          return {status: 'error'};
      }
    }
  },

  startSession(mode: ReviewSession['mode'], title: string, cardIds: string[], setup?: ExamSetup): string {
    const session: ReviewSession = {id: id('s'), mode, title, cardIds, answers: [], startedAt: nowIso(), setup};
    record((current) => ({...current, sessions: [session, ...current.sessions.slice(0, 19)]}));
    return session.id;
  },

  answer(sessionId: string, answer: SessionAnswer) {
    record((current) => ({
      ...current,
      sessions: current.sessions.map((session) =>
        session.id === sessionId
          ? {...session, answers: [...session.answers.filter((item) => item.cardId !== answer.cardId), answer]}
          : session,
      ),
    }));
  },

  unanswer(sessionId: string, cardId: string) {
    record((current) => ({
      ...current,
      sessions: current.sessions.map((session) =>
        session.id === sessionId ? {...session, answers: session.answers.filter((item) => item.cardId !== cardId)} : session,
      ),
    }));
  },

  finishSession(sessionId: string) {
    record((current) => ({
      ...current,
      sessions: current.sessions.map((session) =>
        session.id === sessionId && !session.finishedAt ? {...session, finishedAt: nowIso()} : session,
      ),
    }));
  },

  /** Development helper: jump to a subscription state (local previews). */
  setSubscription(subscription: Subscription) {
    update((current) => ({...current, subscription}));
  },

  reset() {
    write(initialState);
  },

  /** Replace the whole state for a local preview; the store then stays offline. */
  replace(next: LearnerState) {
    offline = true;
    window.clearTimeout(pushTimer);
    write(settle(next));
  },
};
