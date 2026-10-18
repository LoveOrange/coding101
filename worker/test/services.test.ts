import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { type Access, isAccountRoute } from "../src/account";
import { companyCounts, getCompanies } from "../src/companies";
import { type Db } from "../src/db";
import { MAX_SESSIONS, getLearnerDoc, parseLearnerDoc, putLearnerDoc } from "../src/learner";
import { deleteAccount } from "../src/index";
import { purgeExpiredRecords } from "../src/purge";
import { testDb } from "./helpers";

let db: Db;
let close: () => Promise<void>;
beforeAll(async () => ({ db, close } = await testDb()));
afterAll(() => close());

const doc = (n: number) =>
  parseLearnerDoc({ cards: { [`card#${n}`]: { rating: "good", interval: 12 } }, preferences: {} })!;

describe("routing", () => {
  it("forwards account routes but never the internal ones", () => {
    for (const p of ["/api/auth/sign-in/email-otp", "/api/billing/webhook", "/api/redeem", "/api/product/me"]) {
      expect(isAccountRoute(p)).toBe(true);
    }
    for (const p of ["/api/product/internal/access", "/api/c101/learner", "/api/redeemx", "/docs"]) {
      expect(isAccountRoute(p)).toBe(false);
    }
  });
});

describe("learner document", () => {
  it("drops unknown top-level keys and rejects malformed or oversized documents", () => {
    expect(parseLearnerDoc({ cards: {}, account: { plan: "pro" } })).toEqual({
      cards: {},
      reading: {},
      sessions: [],
      preferences: {},
    });
    expect(parseLearnerDoc({ cards: { a: 1 } })).toBeNull();
    expect(parseLearnerDoc({ sessions: [{ noId: true }] })).toBeNull();
    expect(parseLearnerDoc({ sessions: Array.from({ length: MAX_SESSIONS + 1 }, (_, i) => ({ id: `${i}` })) })).toBeNull();
    expect(parseLearnerDoc({ cards: { big: { blob: "x".repeat(1_000_001) } } })).toBeNull();
    expect(parseLearnerDoc([])).toBeNull();
  });

  it("stores, versions and detects a stale write from another device", async () => {
    expect(await getLearnerDoc(db, "u1")).toEqual({ version: 0, data: null, updatedAt: null });
    expect(await putLearnerDoc(db, "u1", 0, doc(1))).toEqual({ ok: true, version: 1 });
    // A second device that also started from nothing.
    const stale = await putLearnerDoc(db, "u1", 0, doc(2));
    expect(stale.ok).toBe(false);
    if (!stale.ok) expect(Object.keys(stale.current.data!.cards)).toEqual(["card#1"]);
    expect(await putLearnerDoc(db, "u1", 1, doc(3))).toEqual({ ok: true, version: 2 });
    expect((await putLearnerDoc(db, "u1", 1, doc(4))).ok).toBe(false);
    expect((await getLearnerDoc(db, "u1")).version).toBe(2);
  });
});

describe("company tags", () => {
  it("serves names by card and public counts for cards with companies", async () => {
    await db.query("INSERT INTO card_companies (card_id, companies, sources) VALUES ($1, $2, $3), ($4, $5, NULL)", [
      "a",
      ["字节跳动", "美团"],
      "https://example.test/1",
      "b",
      [],
    ]);
    expect(await getCompanies(db, ["a", "a", "missing"])).toEqual({ a: ["字节跳动", "美团"] });
    expect(await companyCounts(db)).toEqual({ a: 2 });
  });
});

describe("retention purge", () => {
  it("deletes only users the account service reports free again, in batches", async () => {
    const ids = Array.from({ length: 30 }, (_, i) => `p${String(i).padStart(2, "0")}`);
    for (const id of ids) await putLearnerDoc(db, id, 0, doc(1));
    const asked: number[] = [];
    const purged = await purgeExpiredRecords(db, async (batch) => {
      asked.push(batch.length);
      return Object.fromEntries(
        batch.map((id): [string, Access] => [
          id,
          id === "p03" || id === "p27"
            ? { status: "free", hadTrial: true }
            : { status: "expired", endedAt: "2026-01-01", retainUntil: "2026-04-01" },
        ]),
      );
    });
    expect(purged).toBe(2);
    expect(asked.every((n) => n <= 25)).toBe(true);
    expect((await getLearnerDoc(db, "p03")).data).toBeNull();
    expect((await getLearnerDoc(db, "p04")).version).toBe(1);
    expect((await getLearnerDoc(db, "u1")).version).toBe(2); // not reported: kept
  });
});

describe("account deletion", () => {
  const account = (access: Access | null, calls: string[]) =>
    ({
      fetch: async (input: RequestInfo | URL) => {
        const path = new URL(input instanceof Request ? input.url : String(input)).pathname;
        calls.push(path);
        return path === "/api/product/me"
          ? Response.json({ user: access ? { id: "del1" } : null, access })
          : Response.json({ ok: true });
      },
    }) as unknown as Fetcher;
  const request = () =>
    new Request("https://coding101.test/api/product/account/delete", { method: "POST" });

  it("deletes the records, then forwards to the account service", async () => {
    await putLearnerDoc(db, "del1", 0, doc(1));
    const calls: string[] = [];
    const res = await deleteAccount({ ACCOUNT: account({ status: "trial", endsAt: "2026-10-25" }, calls) }, db, request());
    expect(res.status).toBe(200);
    expect(calls).toEqual(["/api/product/me", "/api/product/account/delete"]);
    expect((await getLearnerDoc(db, "del1")).version).toBe(0);
  });

  it("keeps the records while a plan still renews, and refuses guests", async () => {
    await putLearnerDoc(db, "del1", 0, doc(1));
    const calls: string[] = [];
    const pro: Access = { status: "pro", endsAt: "2026-11-18", autoRenew: true };
    expect((await deleteAccount({ ACCOUNT: account(pro, calls) }, db, request())).status).toBe(409);
    expect((await deleteAccount({ ACCOUNT: account(null, calls) }, db, request())).status).toBe(401);
    expect(calls).not.toContain("/api/product/account/delete");
    expect((await getLearnerDoc(db, "del1")).version).toBe(1);
  });
});
