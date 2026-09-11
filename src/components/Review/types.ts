export type ReviewStep = {
  id: string;
  title: string;
  href: string;
  scope: string;
  outcome: string;
  question: string;
  questionAnchor: string;
};

export type ReviewPlan = {
  id: string;
  title: string;
  href: string;
  routeHref: string;
  steps: ReviewStep[];
};
