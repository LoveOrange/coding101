import type {InterviewRoadmapData} from '../../components/InterviewRoadmap';
import type {ArticleIndex, Priority, Role, RoleGuides} from '../../learning/types';
import {javaInterviewRoadmap} from './java';
import {goInterviewRoadmap} from './go';
import {agentInterviewRoadmap} from './agent';
import {sreInterviewRoadmap} from './sre';
import {frontendInterviewRoadmap, getFrontendInterviewRoadmap} from './frontend';
import {testingInterviewRoadmap, getTestingInterviewRoadmap} from './testing';
import {getMobileInterviewRoadmap, mobileInterviewRoadmap, type MobileSelection} from './mobile';

type LearningRoute = {role: Role; roadmap: InterviewRoadmapData};
function entry(roadmap: InterviewRoadmapData, label: string, group: string, id = roadmap.questionRoleId ?? roadmap.id): LearningRoute {
  return {role: {id, label, group, href: `/topics?role=${encodeURIComponent(id)}`}, roadmap};
}

const mobileSelections: {selection: MobileSelection; label: string}[] = [
  {selection: {platform: 'shared'}, label: '移动端（共同基础）'},
  {selection: {platform: 'android', language: 'kotlin'}, label: '移动端（Android / Kotlin）'},
  {selection: {platform: 'android', language: 'java'}, label: '移动端（Android / Java）'},
  {selection: {platform: 'ios', language: 'swift'}, label: '移动端（iOS / Swift）'},
  {selection: {platform: 'ios', language: 'objective-c'}, label: '移动端（iOS / Objective-C）'},
  {selection: {platform: 'flutter', host: 'android'}, label: '移动端（Flutter / Android）'},
  {selection: {platform: 'flutter', host: 'ios'}, label: '移动端（Flutter / iOS）'},
  {selection: {platform: 'react-native', host: 'android'}, label: '移动端（React Native / Android）'},
  {selection: {platform: 'react-native', host: 'ios'}, label: '移动端（React Native / iOS）'},
];

/** Reuse exactly the routes rendered after the reader chooses a stack or platform. */
export const learningRoutes: LearningRoute[] = [
  entry(javaInterviewRoadmap, '后端（Java）', '后端开发'),
  entry(goInterviewRoadmap, '后端（Go）', '后端开发'),
  ...(['react', 'vue'] as const).map(framework => entry(getFrontendInterviewRoadmap(framework),
    `前端（${framework === 'react' ? 'React' : 'Vue'}）`, '前端开发')),
  // Legacy role ids keep their explicit aggregate meaning for old URLs and preferences.
  entry(frontendInterviewRoadmap, '前端（全部框架）', '前端开发', 'frontend'),
  ...mobileSelections.map(({selection, label}) => entry(getMobileInterviewRoadmap(selection), label, '移动端开发')),
  entry(mobileInterviewRoadmap, '移动端（全部平台）', '移动端开发', 'mobile'),
  ...(['java', 'python'] as const).map(language => entry(getTestingInterviewRoadmap(language),
    `测试开发（${language === 'java' ? 'Java' : 'Python'}）`, '测试开发')),
  entry(testingInterviewRoadmap, '测试开发（全部语言）', '测试开发', 'testing'),
  entry(sreInterviewRoadmap, 'DevOps / SRE', 'DevOps / SRE'),
  entry(agentInterviewRoadmap, 'AI 应用（Agent）', 'AI 应用开发'),
];

export function roadmapPath(href: string): string {
  return href.split(/[?#]/)[0].replace(/\/$/, '');
}

/** Merge repeated readings within one role only. Other roles never promote its priority. */
export function buildRoleReadings(routes = learningRoutes) {
  if (new Set(routes.map(({role}) => role.id)).size !== routes.length) {
    throw new Error('learning-content: duplicate role ids');
  }
  const rank: Record<Priority, number> = {must: 3, common: 2, optional: 1};
  const byPermalink = new Map<string, Record<string, Priority>>();
  for (const {role, roadmap} of routes) {
    for (const phase of roadmap.phases) for (const topic of phase.topics) for (const article of topic.articles) {
      if (!article.href) continue;
      const key = roadmapPath(article.href);
      const priorities = byPermalink.get(key) ?? {};
      // A must-learn topic's deeper readings belong after the first round.
      const priority = topic.priority === 'must' && !article.core ? 'common' : topic.priority;
      if (!priorities[role.id] || rank[priority] > rank[priorities[role.id]]) priorities[role.id] = priority;
      byPermalink.set(key, priorities);
    }
  }
  return {roles: routes.map(({role}) => role), byPermalink};
}

/** Reuse the same selected route for topic order, core readings and stopping conditions. */
export function buildRoleGuides(articles: ArticleIndex[], routes = learningRoutes): RoleGuides {
  const byPath = new Map(articles.map(article => [roadmapPath(article.permalink), article]));
  return Object.fromEntries(routes.map(({role, roadmap}) => [role.id, roadmap.phases.flatMap(phase =>
    phase.topics.map(topic => ({
      id: topic.id,
      title: topic.title,
      phase: phase.title,
      priority: topic.priority,
      depth: topic.depth,
      outcomes: topic.firstRound?.outcomes ?? topic.details.outcomes,
      questions: topic.firstRound?.questions ?? topic.details.interviewQuestions,
      ...(topic.firstRound ? {further: {outcomes: topic.details.outcomes, questions: topic.details.interviewQuestions}} : {}),
      readings: topic.articles.flatMap(reading => {
        const article = reading.href && byPath.get(roadmapPath(reading.href));
        return article ? [{articleId: article.id, core: reading.core, href: reading.href!, ...(reading.scope ? {scope: reading.scope} : {})}] : [];
      }),
    })).filter(topic => topic.readings.length > 0),
  )]));
}
