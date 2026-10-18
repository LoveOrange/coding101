import siteConfig from '@generated/docusaurus.config';

import type {LearnerRecords} from './types';

/**
 * Client for the site's own API (same origin, served by worker/). Accounts and
 * billing are forwarded to the account service behind it; learning records and
 * company tags are Coding101's. Requests carry the first-party session cookie.
 * Errors surface as `ApiError` with the server's code.
 */

/**
 * Whether this build talks to the API: learner features on, the API enabled
 * (not the GitHub Pages mirror), and not a `LEARNER_MOCKS` preview (offline).
 */
export function serverEnabled(): boolean {
  const fields = siteConfig.customFields ?? {};
  return Boolean(fields.learnerFeatures) && !fields.learnerMocks && Boolean(fields.serverApi);
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
  const res = await fetch(path, {
    ...init,
    credentials: 'same-origin',
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
  /** Email a one-time sign-in code; the first verified code creates the account. */
  sendCode: (email: string) => post<unknown>('/api/auth/email-otp/send-verification-otp', {email, type: 'sign-in'}),
  verifyCode: (email: string, otp: string) => post<{user: ServerUser}>('/api/auth/sign-in/email-otp', {email, otp}),
  signOut: () => post<unknown>('/api/auth/sign-out'),

  /** `user` is null for a guest (no session). */
  me: () => request<{user: ServerUser; access: ServerAccess} | {user: null; access: null}>('/api/product/me'),
  startTrial: () => post<{access: ServerAccess}>('/api/product/trial'),

  getRecords: () =>
    request<{version: number; data: Partial<LearnerRecords> | null; writable: boolean}>('/api/c101/learner'),
  /** Resolves with the new version, or rejects with ApiError 409 carrying `body.current`. */
  putRecords: (baseVersion: number, data: LearnerRecords) =>
    request<{version: number}>('/api/c101/learner', {method: 'PUT', body: JSON.stringify({baseVersion, data})}),

  redeem: (code: string) => post<{redemption: Redemption}>('/api/redeem', {code}),
  billing: () => request<{records: ServerBillingRecord[]}>('/api/product/billing'),
  checkout: (plan: 'monthly' | 'sprint' | 'yearly') => post<{url: string}>('/api/product/checkout', {plan}),
  cancelAutoRenew: () => post<{ok: true}>('/api/product/subscription/cancel'),
  portal: () => request<{url: string}>('/api/product/portal'),
  /** Deletes the learning records, then the account. 409 subscription_active while renewal is on. */
  deleteAccount: () => post<{ok: true}>('/api/product/account/delete'),

  companies: (cardIds: string[]) =>
    request<{companies: Record<string, string[]>}>(`/api/c101/companies?cards=${encodeURIComponent(cardIds.join(','))}`),
  companyCounts: () => request<{counts: Record<string, number>}>('/api/c101/companies/counts'),
};
