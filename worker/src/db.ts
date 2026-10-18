/**
 * The one thing the services need from Postgres: run a parameterized query and
 * get rows back. On Workers this is Neon's HTTP driver (one fetch per query, no
 * connection to set up); tests pass a node-postgres pool.
 */
import { neon } from "@neondatabase/serverless";

export interface Db {
  query<T = Record<string, unknown>>(text: string, params?: unknown[]): Promise<T[]>;
}

export function neonDb(url: string): Db {
  const sql = neon(url);
  return {
    query: async <T>(text: string, params: unknown[] = []) => (await sql.query(text, params)) as T[],
  };
}
