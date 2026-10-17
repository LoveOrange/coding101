import {useEffect, useSyncExternalStore} from 'react';

import {api} from './api';
import {accessOf, isOffline, useLearner} from './store';

/**
 * Company tags are paid data served by the account service, not part of the
 * build. Pro and trial users get the names; everyone else gets the public
 * per-card count ("3 家公司考过"). Requests from all components on a page are
 * batched into one call, and results are cached for the visit.
 */

const names = new Map<string, string[]>();
let counts: Record<string, number> | undefined;
let countsLoading = false;
const pending = new Set<string>();
let flushTimer: number | undefined;
let version = 0;
const listeners = new Set<() => void>();

function changed() {
  version += 1;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function flush() {
  flushTimer = undefined;
  const ids = [...pending].slice(0, 500);
  ids.forEach((cardId) => pending.delete(cardId));
  if (!ids.length) return;
  api
    .companies(ids)
    .then(({companies}) => {
      for (const cardId of ids) names.set(cardId, companies[cardId] ?? []);
      changed();
    })
    .catch(() => undefined);
  if (pending.size) flushTimer = window.setTimeout(flush, 0);
}

function requestNames(cardIds: string[]) {
  for (const cardId of cardIds) if (!names.has(cardId)) pending.add(cardId);
  if (pending.size && flushTimer === undefined) flushTimer = window.setTimeout(flush, 0);
}

function requestCounts() {
  if (counts || countsLoading) return;
  countsLoading = true;
  api
    .companyCounts()
    .then((result) => {
      counts = result.counts;
      changed();
    })
    .catch(() => {
      countsLoading = false;
    });
}

export type CompanyInfo =
  /** Names, for users with access (empty when the card has no verified company). */
  | {kind: 'names'; names: string[]}
  /** How many companies asked it, for users without access. */
  | {kind: 'count'; count: number}
  | {kind: 'unknown'};

/** Company info for one card; components on a page share one request. */
export function useCompanies(cardId: string): CompanyInfo {
  const learner = useLearner();
  const paid = accessOf(learner) === 'active';
  const offline = isOffline();
  useSyncExternalStore(subscribe, () => version, () => 0);
  useEffect(() => {
    if (offline) return;
    if (paid) requestNames([cardId]);
    else requestCounts();
  }, [cardId, paid, offline]);
  if (paid && names.has(cardId)) return {kind: 'names', names: names.get(cardId)!};
  if (!paid && counts) return {kind: 'count', count: counts[cardId] ?? 0};
  return {kind: 'unknown'};
}

/** Company names already loaded for search (Pro only); empty until fetched. */
export function loadedCompanyNames(cardId: string): string[] {
  return names.get(cardId) ?? [];
}
