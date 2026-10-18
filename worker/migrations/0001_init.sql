-- Coding101's own data. Users are the account service's (tenant coding101):
-- user_id is its user id, with no foreign key across the two databases.

-- The learner's synced state (card schedule, reading progress, sessions,
-- preferences). The site's store owns the scheduling; the server checks shape
-- and size, gates writes on access, and resolves devices by version.
CREATE TABLE learner_docs (
  user_id    TEXT PRIMARY KEY,
  data       JSONB NOT NULL,
  -- Incremented on every write; a write must name the version it was based on.
  version    INTEGER NOT NULL DEFAULT 1,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Paid card metadata: the companies a question appeared at, keyed by the
-- card's stable id. Imported from the private data file; sources never leave
-- the server.
CREATE TABLE card_companies (
  card_id    TEXT PRIMARY KEY,
  companies  TEXT[] NOT NULL,
  sources    TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
