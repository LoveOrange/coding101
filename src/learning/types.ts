/**
 * Shared types for the learning layer.
 *
 * Content types (Article*, Card*, Domain, Role) are produced at build time by
 * plugins/learning-content from the docs. Learner types (CardState, Account…)
 * live in the browser through src/learning/store.ts until a backend exists.
 */

export type Priority = 'must' | 'common' | 'optional';

export type Inline =
  | string
  | {t: 'code'; v: string}
  | {t: 'strong'; c: Inline[]}
  | {t: 'em'; c: Inline[]}
  | {t: 'link'; href: string; c: Inline[]};

export type Block =
  | {t: 'p'; c: Inline[]}
  | {t: 'code'; lang?: string; v: string}
  | {t: 'list'; ordered: boolean; items: Inline[][]};

export type SectionIndex = {
  id: string;
  title: string;
  /** Heading number such as "2" or "2.2", without the trailing dot. */
  number?: string;
};

export type ArticleIndex = {
  /** Docs plugin id, e.g. basic-knowledge/network/tls. */
  id: string;
  /** Stable knowledge id from front matter when present. */
  knowledgeId?: string;
  title: string;
  permalink: string;
  domainId: string;
  topicId: string;
  minutes: number;
  priority?: Priority;
  /** Roadmap ids that list this article. */
  roles: string[];
  /** Level-2 sections in document order. */
  sections: SectionIndex[];
  cardIds: string[];
  /** Anchor of the article's interview-question section. */
  interviewAnchor?: string;
};

export type CardRef = SectionIndex & {
  /** Article the ref points into; differs from the card's article for cross-article refs. */
  articleId: string;
  /**
   * Level-2 section that contains the referenced heading. Empty, together
   * with an empty `id`, when the ref points at a whole article.
   */
  section: string;
};

export type CardIndex = {
  /** `${articleKey}#${anchor}`; articleKey is knowledgeId or doc id. */
  id: string;
  articleId: string;
  /** Anchor of the question heading inside the article. */
  anchor: string;
  question: string;
  /** Short label taken from the first related section. */
  label: string;
  companies: string[];
  /** Explicitly marked as a site-authored self-test in the article. */
  selfTest?: boolean;
  checkpointCount: number;
  refs: CardRef[];
  /** A composite question combines several articles or sections; atomic cards test one point. */
  composite?: boolean;
};

export type CardDetail = CardIndex & {
  checkpoints: Inline[][];
  answer: Block[];
  /** Hash of question, checkpoints and answer; changes when the card content changes. */
  rev: string;
};

/** A doc subcategory, or a single article placed directly in a domain. */
export type Topic = {
  id: string;
  label: string;
  permalink?: string;
  articleIds: string[];
};

export type Domain = {
  id: string;
  label: string;
  permalink?: string;
  topics: Topic[];
  /** All articles of the domain, in topic order. */
  articleIds: string[];
};

export type Role = {
  id: string;
  label: string;
  href: string;
};

export type LearningIndex = {
  domains: Domain[];
  articles: Record<string, ArticleIndex>;
  cards: Record<string, CardIndex>;
  roles: Role[];
};

/* ---- Learner state ---- */

export type Rating = 'again' | 'hard' | 'good';

export type CardState = {
  rating: Rating;
  /** Local date (YYYY-MM-DD) when the card is due again. */
  due: string;
  /** Days between the last review and `due`. */
  interval: number;
  reviewedAt: string;
  reps: number;
  suspended?: boolean;
  /** Set when the learner opened the source section after missing points. */
  reread?: boolean;
  /** Checkpoints hit on the last answer, as indexes. */
  hits?: number[];
};

export type ReadingState = {
  /** Highest level-2 section index reached. */
  furthest: number;
  /** Anchor of the last section seen, for "continue reading". */
  lastAnchor?: string;
  done: boolean;
  updatedAt: string;
};

export type Plan = 'monthly' | 'yearly' | 'pass' | 'code-monthly' | 'code-yearly';

export type Subscription =
  | {status: 'free'; hadTrial: boolean}
  | {status: 'trial'; endsAt: string}
  | {status: 'pro'; plan: Plan; endsAt: string; autoRenew: boolean; renewalFailedAt?: string}
  | {status: 'expired'; endedAt: string; retainUntil: string};

export type Region = 'cn' | 'intl';

export type BillingRecord = {
  id: string;
  date: string;
  item: string;
  method: 'code' | 'wechat' | 'card';
  amount?: string;
  effect: string;
  status: 'paid' | 'refunded' | 'applied';
  code?: string;
};

export type Account = {
  name: string;
  email: string;
  createdAt: string;
};

export type Preferences = {
  roleId?: string;
  interviewDate?: string;
  dailyLimit: number;
};

export type SessionMode = 'today' | 'quiz' | 'exam';

export type SessionAnswer = {
  cardId: string;
  rating?: Rating;
  hits?: number[];
  skipped?: boolean;
};

export type ReviewSession = {
  id: string;
  mode: SessionMode;
  title: string;
  cardIds: string[];
  answers: SessionAnswer[];
  startedAt: string;
  finishedAt?: string;
  /** Exam settings, kept to rerun the same setup. */
  setup?: ExamSetup;
};

export type ExamSetup = {
  scope: 'role' | 'domains' | 'weak';
  domainIds: string[];
  count: number;
  timed: boolean;
};

export type LearnerState = {
  version: 1;
  account?: Account;
  subscription: Subscription;
  region: Region;
  preferences: Preferences;
  cards: Record<string, CardState>;
  reading: Record<string, ReadingState>;
  billing: BillingRecord[];
  sessions: ReviewSession[];
  redeemFailures: {count: number; lockedUntil?: string};
  examSetup?: ExamSetup;
};
