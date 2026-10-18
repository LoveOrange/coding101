/**
 * Paid card metadata: which companies asked a question. Names are served only
 * to users with access; the per-card COUNT is public (the site shows "N 家公司
 * 考过" as a teaser). Source notes never leave the server.
 */
import { type Db } from "./db";

export const MAX_CARDS_PER_REQUEST = 500;

export async function getCompanies(db: Db, cardIds: string[]): Promise<Record<string, string[]>> {
  const ids = [...new Set(cardIds)].slice(0, MAX_CARDS_PER_REQUEST);
  const rows = await db.query<{ card_id: string; companies: string[] }>(
    "SELECT card_id, companies FROM card_companies WHERE card_id = ANY($1)",
    [ids],
  );
  return Object.fromEntries(rows.map((r) => [r.card_id, r.companies]));
}

/** Company count per card (cards with at least one company). */
export async function companyCounts(db: Db): Promise<Record<string, number>> {
  const rows = await db.query<{ card_id: string; n: number }>(
    "SELECT card_id, cardinality(companies) AS n FROM card_companies WHERE cardinality(companies) > 0",
  );
  return Object.fromEntries(rows.map((r) => [r.card_id, Number(r.n)]));
}
