import { readdir, readFile } from "node:fs/promises";

import pg from "pg";

import { type Db } from "../src/db";

/** A fresh schema on the local test database, for one test file. */
export async function testDb(): Promise<{ db: Db; close: () => Promise<void> }> {
  const pool = new pg.Pool({ connectionString: process.env.TEST_DATABASE_URL });
  await pool.query("DROP TABLE IF EXISTS learner_docs, card_companies");
  const dir = decodeURIComponent(new URL("../migrations/", import.meta.url).pathname);
  for (const name of (await readdir(dir)).sort()) {
    await pool.query(await readFile(`${dir}/${name}`, "utf8"));
  }
  return {
    db: { query: async (text, params) => (await pool.query(text, params)).rows },
    close: () => pool.end(),
  };
}
