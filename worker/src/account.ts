/**
 * The account service (tenant coding101) behind a Service Binding. It owns
 * users, sessions, billing and access; this Worker forwards those routes as-is
 * and asks it who the caller is before serving Coding101's own data.
 */

/** Routes the account service answers for the site. `/api/product/internal/*` is never forwarded. */
export function isAccountRoute(path: string): boolean {
  if (path.startsWith("/api/product/internal/")) return false;
  return (
    path.startsWith("/api/auth/") ||
    path.startsWith("/api/billing/") ||
    path.startsWith("/api/product/") ||
    path === "/api/redeem"
  );
}

export type Access =
  | { status: "free"; hadTrial: boolean }
  | { status: "trial"; endsAt: string }
  | { status: "pro"; endsAt: string | null; autoRenew: boolean }
  | { status: "expired"; endedAt: string; retainUntil: string };

export interface Caller {
  user: { id: string } | null;
  access: Access | null;
}

/** Trial and Pro may write records and read paid data; expired is read-only. */
export function hasAccess(access: Access | null): boolean {
  return access?.status === "trial" || access?.status === "pro";
}

/** Who sent `request` (by its session cookie), per the account service. */
export async function whoIs(account: Fetcher, request: Request): Promise<Caller> {
  const res = await account.fetch(
    new Request(new URL("/api/product/me", request.url), {
      headers: { cookie: request.headers.get("cookie") ?? "" },
    }),
  );
  if (!res.ok) throw new Error(`account /me answered ${res.status}`);
  return (await res.json()) as Caller;
}

/** Access for up to 25 users at once (the purge), via the internal route. */
export async function accessOf(
  account: Fetcher,
  token: string,
  userIds: string[],
): Promise<Record<string, Access>> {
  const res = await account.fetch(
    new Request("https://account.internal/api/product/internal/access", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify({ userIds }),
    }),
  );
  if (!res.ok) throw new Error(`account internal/access answered ${res.status}`);
  return ((await res.json()) as { access: Record<string, Access> }).access;
}
