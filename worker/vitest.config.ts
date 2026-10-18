import { readFileSync } from "node:fs";

import { defineConfig } from "vitest/config";

// TEST_DATABASE_URL from .env.test (local Postgres, database coding101_test).
const env = Object.fromEntries(
  readFileSync(new URL(".env.test", import.meta.url), "utf8")
    .split("\n")
    .filter((line) => line.includes("="))
    .map((line) => [line.slice(0, line.indexOf("=")), line.slice(line.indexOf("=") + 1)]),
);

export default defineConfig({ test: { env, fileParallelism: false } });
