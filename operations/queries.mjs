// Account Prisma timestamps are UTC TIMESTAMP WITHOUT TIME ZONE.
// All results are aggregate JSON: no names, email, tokens or learner documents leave PostgreSQL.
export const accountQuery = `
WITH live_subs AS (
  SELECT "userId", status, "cancelAtPeriodEnd", "currentPeriodEnd" FROM subscriptions WHERE sku = $1 AND (
    (status = 'active' AND ("currentPeriodEnd" IS NULL OR "currentPeriodEnd" > $2::timestamp)) OR
    (status = 'canceled' AND "currentPeriodEnd" > $2::timestamp) OR
    (status = 'past_due' AND "currentPeriodEnd" + $3::int * interval '1 day' > $2::timestamp)
  )
), live_grants AS (
  SELECT "userId", source FROM access_grants WHERE sku = $1
    AND "startsAt" <= $2::timestamp AND "endsAt" > $2::timestamp
), pro_users AS (
  SELECT "userId" FROM live_subs UNION
  SELECT "userId" FROM live_grants WHERE source <> 'trial'
), days AS (
  SELECT generate_series($4::date, $5::date, interval '1 day')::date AS day
), registrations AS (
  SELECT (("createdAt" AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Shanghai')::date AS day, count(*) AS n
  FROM users WHERE "createdAt" >= ($4::date::timestamp AT TIME ZONE 'Asia/Shanghai') AT TIME ZONE 'UTC'
    AND "createdAt" < (($5::date + 1)::timestamp AT TIME ZONE 'Asia/Shanghai') AT TIME ZONE 'UTC'
  GROUP BY 1
), redemptions AS (
  SELECT ((c."redeemedAt" AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Shanghai')::date AS day, count(*) AS n
  FROM redemption_codes c JOIN redemption_batches b ON b.id = c."batchId"
  WHERE b.sku = $1 AND c.status = 'redeemed'
    AND c."redeemedAt" >= ($4::date::timestamp AT TIME ZONE 'Asia/Shanghai') AT TIME ZONE 'UTC'
    AND c."redeemedAt" < (($5::date + 1)::timestamp AT TIME ZONE 'Asia/Shanghai') AT TIME ZONE 'UTC'
  GROUP BY 1
)
SELECT jsonb_build_object(
  'snapshot', jsonb_build_object(
    'users', (SELECT count(*) FROM users),
    'verifiedUsers', (SELECT count(*) FROM users WHERE "emailVerified"),
    'subscriptionUsers', (SELECT count(DISTINCT "userId") FROM live_subs),
    'subscriptionContracts', (SELECT count(*) FROM live_subs),
    'autoRenewUsers', (SELECT count(DISTINCT "userId") FROM live_subs WHERE status = 'active' AND NOT "cancelAtPeriodEnd"),
    'cancelingUsers', (SELECT count(DISTINCT "userId") FROM live_subs WHERE status = 'canceled' OR "cancelAtPeriodEnd"),
    'pastDueUsers', (SELECT count(DISTINCT "userId") FROM live_subs WHERE status = 'past_due'),
    'unknownEndSubscriptions', (SELECT count(*) FROM live_subs WHERE "currentPeriodEnd" IS NULL),
    'proUsers', (SELECT count(*) FROM pro_users),
    'trialUsers', (SELECT count(DISTINCT "userId") FROM live_grants g WHERE source = 'trial'
      AND NOT EXISTS (SELECT 1 FROM pro_users p WHERE p."userId" = g."userId"))
  ),
  'daily', (SELECT jsonb_agg(jsonb_build_object('date', d.day::text,
    'registrations', coalesce(r.n, 0), 'redemptions', coalesce(c.n, 0)) ORDER BY d.day)
    FROM days d LEFT JOIN registrations r USING(day) LEFT JOIN redemptions c USING(day))
) AS data`;

// updated_at measures document sync, not study activity. Do not use it for DAU or retention.
export const learningQuery = `SELECT jsonb_build_object(
  'storedLearners', count(*),
  'syncedYesterday', count(*) FILTER (WHERE updated_at >= $1::timestamptz AND updated_at < $2::timestamptz)
) AS data FROM learner_docs`;
