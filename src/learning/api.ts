import siteConfig from '@generated/docusaurus.config';

import type {LearnerRecords} from './types';

/**
 * Client for the shared account service (account.linsama.com). Requests carry
 * the session cookie, which is scoped to .linsama.com, so signing in there or
 * here is one login. Errors surface as `ApiError` with the server's code.
 */

export function apiBase(): string {
  const base = siteConfig.customFields?.accountApi;
  return typeof base === 'string' ? base.replace(/\/$/, '') : '';
}

/**
 * Whether this build talks to the account service: learner features on, a
 * service URL configured, and not a `LEARNER_MOCKS` preview (those run offline).
 */
export function serverEnabled(): boolean {
  const fields = siteConfig.customFields ?? {};
  return Boolean(fields.learnerFeatures) && !fields.learnerMocks && Boolean(apiBase());
}

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    readonly body: Record<string, unknown> = {},
  ) {
    super(code);
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${apiBase()}${path}`, {
    ...init,
    credentials: 'include',
    headers: {'Content-Type': 'application/json', ...init.headers},
  });
  const body = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) throw new ApiError(res.status, typeof body.error === 'string' ? body.error : `http_${res.status}`, body);
  return body as T;
}

const post = <T>(path: string, body?: unknown) => request<T>(path, {method: 'POST', body: JSON.stringify(body ?? {})});

/* ---- Wire types (dates are ISO strings) ---- */

export type ServerPlan = 'monthly' | 'yearly' | 'sprint' | 'code';

export type ServerAccess =
  | {status: 'free'; hadTrial: boolean}
  | {status: 'trial'; endsAt: string}
  | {status: 'pro'; plan: ServerPlan; endsAt: string | null; autoRenew: boolean; renewalFailedAt?: string; renewsAt?: string | null}
  | {status: 'expired'; endedAt: string; retainUntil: string};

export type ServerUser = {id: string; name: string | null; email: string | null; createdAt: string};

export type ServerBillingRecord =
  | {kind: 'order'; date: string; plan: ServerPlan; amount: number; currency: string; status: 'paid' | 'refunded'}
  | {kind: 'subscription'; date: string; plan: ServerPlan; status: string; currentPeriodEnd: string | null; cancelAtPeriodEnd: boolean}
  | {kind: 'code'; date: string; masked: string; days: number};

export type Redemption = {masked: string; accessDays: number; startsAt: string; endsAt: string; previousUntil: string | null};

export const api = {
  signUp: (email: string, password: string, name: string) =>
    post<{user: ServerUser}>('/api/auth/sign-up/email', {email, password, name}),
  signIn: (email: string, password: string) => post<{user: ServerUser}>('/api/auth/sign-in/email', {email, password}),
  signOut: () => post<unknown>('/api/auth/sign-out'),

  /** `user` is null for a guest (no session). */
  me: () => request<{user: ServerUser; access: ServerAccess} | {user: null; access: null}>('/api/coding101/me'),
  startTrial: () => post<{access: ServerAccess}>('/api/coding101/trial'),

  getRecords: () =>
    request<{version: number; data: Partial<LearnerRecords> | null; writable: boolean}>('/api/coding101/learner'),
  /** Resolves with the new version, or rejects with ApiError 409 carrying `body.current`. */
  putRecords: (baseVersion: number, data: LearnerRecords) =>
    request<{version: number}>('/api/coding101/learner', {method: 'PUT', body: JSON.stringify({baseVersion, data})}),

  redeem: (code: string) => post<{redemption: Redemption}>('/api/redeem', {code}),
  billing: () => request<{records: ServerBillingRecord[]}>('/api/coding101/billing'),
  checkout: (plan: 'monthly' | 'sprint' | 'yearly') => post<{url: string}>('/api/coding101/checkout', {plan}),
  cancelAutoRenew: () => post<{ok: true}>('/api/coding101/subscription/cancel'),
  portal: () => request<{url: string}>('/api/coding101/portal'),

  companies: (cardIds: string[]) =>
    request<{companies: Record<string, string[]>}>(`/api/coding101/companies?cards=${encodeURIComponent(cardIds.join(','))}`),
  companyCounts: () => request<{counts: Record<string, number>}>('/api/coding101/companies/counts'),
};
