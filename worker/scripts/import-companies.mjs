// Replace the company table from the private data file (an array of
// { cardId, companies: string[], sources?: string }); it lives in the private
// linsama-account repo, never in this public one.
//   DATABASE_URL=postgres://… npm run import-companies -- <path/to/companies.json>
import { readFile } from "node:fs/promises";

import pg from "pg";

const url = process.env.DIRECT_DATABASE_URL ?? process.env.DATABASE_URL;
const file = process.argv[2];
if (!url || !file) throw new Error("usage: DATABASE_URL=… npm run import-companies -- <companies.json>");

const entries = JSON.parse(await readFile(file, "utf8"));
const client = new pg.Client({ connectionString: url });
await client.connect();
try {
  await client.query("BEGIN");
  const ids = entries.map((e) => e.cardId);
  const removed = await client.query("DELETE FROM card_companies WHERE NOT (card_id = ANY($1))", [ids]);
  for (const e of entries) {
    await client.query(
      `INSERT INTO card_companies (card_id, companies, sources) VALUES ($1, $2, $3)
       ON CONFLICT (card_id) DO UPDATE SET companies = $2, sources = $3, updated_at = now()`,
      [e.cardId, e.companies, e.sources ?? null],
    );
  }
  await client.query("COMMIT");
  console.log(`companies: ${entries.length} upserted, ${removed.rowCount} removed`);
} catch (error) {
  await client.query("ROLLBACK");
  throw error;
} finally {
  await client.end();
}
