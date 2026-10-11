import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/**
 * Whether account-bound features are on: sign-in, subscriptions, ratings and
 * spaced review, reading progress, the progress page, card library and mock
 * exams. Off by default until real accounts exist; see docusaurus.config.ts.
 */
export function useLearnerFeatures(): boolean {
  return Boolean(useDocusaurusContext().siteConfig.customFields?.learnerFeatures);
}
