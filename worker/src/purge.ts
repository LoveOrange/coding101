/**
 * The retention purge: delete the learner document of every user whose access
 * ended more than the retention period ago — the account service reports them
 * as "free" again (expired = still within retention, kept read-only). The
 * account itself stays. Runs daily from the cron trigger.
 */
import { type Access } from "./account";
import { type Db } from "./db";
import { deleteLearnerDocs } from "./learner";

const BATCH = 25;

export async function purgeExpiredRecords(
  db: Db,
  accessOf: (userIds: string[]) => Promise<Record<string, Access>>,
): Promise<number> {
  let purged = 0;
  let after = "";
  for (;;) {
    const rows = await db.query<{ user_id: string }>(
      "SELECT user_id FROM learner_docs WHERE user_id > $1 ORDER BY user_id LIMIT $2",
      [after, BATCH],
    );
    if (rows.length === 0) return purged;
    const ids = rows.map((r) => r.user_id);
    const access = await accessOf(ids);
    purged += await deleteLearnerDocs(
      db,
      ids.filter((id) => access[id]?.status === "free"),
    );
    after = ids[ids.length - 1]!;
  }
}
