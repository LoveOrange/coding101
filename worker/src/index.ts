/**
 * coding101.linsama.com: the whole site on one Worker.
 *
 * - Static pages (the Docusaurus build) are Workers Static Assets: served from
 *   Cloudflare's CDN without running this code (`run_worker_first` is /api/*).
 * - Accounts, billing and codes belong to the account service (tenant
 *   coding101); its routes are forwarded over the ACCOUNT Service Binding, so
 *   the session cookie is first-party to this domain.
 * - Coding101's own data (learning records, company tags) lives in its own
 *   database, under /api/c101/*. The account service says who the caller is
 *   and whether they have access.
 */
import { type Caller, accessOf, hasAccess, isAccountRoute, whoIs } from "./account";
import { MAX_CARDS_PER_REQUEST, companyCounts, getCompanies } from "./companies";
import { type Db, neonDb } from "./db";
import { getLearnerDoc, parseLearnerDoc, putLearnerDoc } from "./learner";
import { purgeExpiredRecords } from "./purge";

export interface Env {
  ASSETS: Fetcher;
  ACCOUNT: Fetcher;
  DATABASE_URL: string;
  INTERNAL_API_TOKEN: string;
}

const json = (body: unknown, status = 200, headers: HeadersInit = {}) =>
  Response.json(body, { status, headers });

async function withCaller(
  env: Env,
  request: Request,
  handler: (caller: Caller & { user: { id: string } }) => Promise<Response>,
): Promise<Response> {
  const caller = await whoIs(env.ACCOUNT, request);
  if (!caller.user) return json({ error: "unauthenticated" }, 401);
  return handler(caller as Caller & { user: { id: string } });
}

async function learner(env: Env, db: Db, request: Request): Promise<Response> {
  return withCaller(env, request, async ({ user, access }) => {
    if (request.method === "GET") {
      return json({ ...(await getLearnerDoc(db, user.id)), writable: hasAccess(access) });
    }
    const body = (await request.json().catch(() => null)) as {
      baseVersion?: unknown;
      data?: unknown;
    } | null;
    const baseVersion = body?.baseVersion;
    if (typeof baseVersion !== "number" || !Number.isInteger(baseVersion) || baseVersion < 0) {
      return json({ error: "invalid_request" }, 400);
    }
    if (!hasAccess(access)) return json({ error: "access_required" }, 402);
    const doc = parseLearnerDoc(body?.data);
    if (!doc) return json({ error: "invalid_document" }, 400);
    const result = await putLearnerDoc(db, user.id, baseVersion, doc);
    return result.ok
      ? json({ version: result.version })
      : json({ error: "version_conflict", current: result.current }, 409);
  });
}

async function companies(env: Env, db: Db, request: Request): Promise<Response> {
  return withCaller(env, request, async ({ access }) => {
    const ids = (new URL(request.url).searchParams.get("cards") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (ids.length === 0 || ids.length > MAX_CARDS_PER_REQUEST) {
      return json({ error: "invalid_request" }, 400);
    }
    if (!hasAccess(access)) return json({ error: "access_required" }, 402);
    return json({ companies: await getCompanies(db, ids) });
  });
}

/** Public and identical for everyone: served from the colo cache, so a hit skips the database. */
async function counts(db: Db, request: Request, ctx: ExecutionContext): Promise<Response> {
  const key = new Request(new URL(request.url).toString());
  const cached = await caches.default.match(key);
  if (cached) return cached;
  const res = json({ counts: await companyCounts(db) }, 200, {
    "Cache-Control": "public, max-age=3600",
  });
  ctx.waitUntil(caches.default.put(key, res.clone()));
  return res;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (isAccountRoute(pathname)) return env.ACCOUNT.fetch(request);
    if (!pathname.startsWith("/api/")) return env.ASSETS.fetch(request);

    const db = neonDb(env.DATABASE_URL);
    const method = request.method;
    if (pathname === "/api/c101/learner" && (method === "GET" || method === "PUT")) {
      return learner(env, db, request);
    }
    if (pathname === "/api/c101/companies" && method === "GET") return companies(env, db, request);
    if (pathname === "/api/c101/companies/counts" && method === "GET") return counts(db, request, ctx);
    return json({ error: "not_found" }, 404);
  },

  // Daily retention purge: records go once the retention period after access ends.
  async scheduled(_event: ScheduledController, env: Env, ctx: ExecutionContext): Promise<void> {
    const db = neonDb(env.DATABASE_URL);
    ctx.waitUntil(
      purgeExpiredRecords(db, (ids) => accessOf(env.ACCOUNT, env.INTERNAL_API_TOKEN, ids)).then(
        (n) => console.log(`[purge] removed ${n} learner documents`),
      ),
    );
  },
};
