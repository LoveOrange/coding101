/**
 * The synced learner document. The site's `src/learning/store.ts` owns the
 * scheduling logic; the server only checks the document's shape and size, so a
 * broken or hostile client can't store arbitrary blobs, and resolves two
 * devices by optimistic versioning: a stale write gets the current document
 * back, which the client merges and retries. Unknown top-level keys are dropped
 * (account / subscription / billing come from the account service).
 */
import { type Db } from "./db";

export const MAX_DOC_BYTES = 1_000_000;
export const MAX_SESSIONS = 50;
const MAX_KEY = 300;

export interface LearnerDoc {
  cards: Record<string, Record<string, unknown>>;
  reading: Record<string, Record<string, unknown>>;
  sessions: ({ id: string } & Record<string, unknown>)[];
  preferences: Record<string, unknown>;
  examSetup?: Record<string, unknown>;
}

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

function recordOfObjects(v: unknown): Record<string, Record<string, unknown>> | null {
  if (v === undefined) return {};
  if (!isObject(v)) return null;
  for (const [key, value] of Object.entries(v)) {
    if (key.length > MAX_KEY || !isObject(value)) return null;
  }
  return v as Record<string, Record<string, unknown>>;
}

/** The document to store, or null when `input` is malformed or too large. */
export function parseLearnerDoc(input: unknown): LearnerDoc | null {
  if (!isObject(input)) return null;
  const cards = recordOfObjects(input.cards);
  const reading = recordOfObjects(input.reading);
  const sessions = input.sessions ?? [];
  const preferences = input.preferences ?? {};
  const examSetup = input.examSetup;
  if (!cards || !reading || !isObject(preferences)) return null;
  if (
    !Array.isArray(sessions) ||
    sessions.length > MAX_SESSIONS ||
    !sessions.every((s) => isObject(s) && typeof s.id === "string")
  ) {
    return null;
  }
  if (examSetup !== undefined && !isObject(examSetup)) return null;
  const doc: LearnerDoc = {
    cards,
    reading,
    sessions: sessions as LearnerDoc["sessions"],
    preferences,
    ...(examSetup ? { examSetup } : {}),
  };
  return new TextEncoder().encode(JSON.stringify(doc)).length > MAX_DOC_BYTES ? null : doc;
}

export interface StoredLearnerDoc {
  /** 0 when nothing was stored yet. */
  version: number;
  data: LearnerDoc | null;
  updatedAt: string | null;
}

export async function getLearnerDoc(db: Db, userId: string): Promise<StoredLearnerDoc> {
  const [row] = await db.query<{ version: number; data: LearnerDoc; updated_at: Date }>(
    "SELECT version, data, updated_at FROM learner_docs WHERE user_id = $1",
    [userId],
  );
  return row
    ? { version: row.version, data: row.data, updatedAt: new Date(row.updated_at).toISOString() }
    : { version: 0, data: null, updatedAt: null };
}

export type PutResult = { ok: true; version: number } | { ok: false; current: StoredLearnerDoc };

/** Store `doc` if `baseVersion` is current (0 = nothing stored yet). Access is the caller's check. */
export async function putLearnerDoc(
  db: Db,
  userId: string,
  baseVersion: number,
  doc: LearnerDoc,
): Promise<PutResult> {
  const json = JSON.stringify(doc);
  const rows =
    baseVersion === 0
      ? await db.query<{ version: number }>(
          `INSERT INTO learner_docs (user_id, data) VALUES ($1, $2::jsonb)
           ON CONFLICT (user_id) DO NOTHING RETURNING version`,
          [userId, json],
        )
      : await db.query<{ version: number }>(
          `UPDATE learner_docs SET data = $3::jsonb, version = version + 1, updated_at = now()
           WHERE user_id = $1 AND version = $2 RETURNING version`,
          [userId, baseVersion, json],
        );
  const [row] = rows;
  return row ? { ok: true, version: row.version } : { ok: false, current: await getLearnerDoc(db, userId) };
}

export async function deleteLearnerDocs(db: Db, userIds: string[]): Promise<number> {
  if (userIds.length === 0) return 0;
  const rows = await db.query("DELETE FROM learner_docs WHERE user_id = ANY($1) RETURNING user_id", [
    userIds,
  ]);
  return rows.length;
}
