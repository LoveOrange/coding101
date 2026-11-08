import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import ts from 'typescript';

// Load the real route factories and codec, without a browser or a second mapping of content.
const modules = new Map();
function moduleUrl(url) {
  if (modules.has(url.href)) return modules.get(url.href);
  const compiled = ts.transpileModule(fs.readFileSync(url, 'utf8'), {
    compilerOptions: {module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022},
  }).outputText.replace(/from ['"]([^'"]+)['"]/g, (_, name) => {
    assert(name.startsWith('.'), `Unexpected runtime dependency: ${name}`);
    return `from '${moduleUrl(new URL(`${name}.ts`, url))}'`;
  });
  const result = `data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`;
  modules.set(url.href, result);
  return result;
}
const load = relative => import(moduleUrl(new URL(relative, import.meta.url)));
const {learningRoutes, buildRoleGuides, buildRoleReadings, roadmapPath} = await load('../src/data/interviewRoadmaps/learningRoles.ts');
const {priorityForRole, resolveRoleId, withRole, legacyTopicsHref} = await load('../src/learning/roles.ts');
const {compactIndex, expandIndex} = await load('../src/learning/compact.ts');
const {studyForRole, selectStudyTopic} = await load('../src/learning/study.ts');
const {roles, byPermalink} = buildRoleReadings();
const pathsFor = roleId => [...byPermalink].filter(([, priorities]) => priorities[roleId]).map(([path]) => path);

test('selected routes round trip through the bank and back to the same framework, language and host', () => {
  assert.equal(new Set(roles.map(role => role.id)).size, roles.length);
  for (const role of roles) {
    const url = new URL(role.href, 'https://example.test');
    assert.equal(url.pathname, '/topics');
    assert.equal(resolveRoleId(roles, url.search), role.id);
    assert(pathsFor(role.id).length > 0, `Empty route: ${role.id}`);
  }
  for (const legacy of ['java-backend', 'go', 'frontend', 'mobile', 'testing', 'agent', 'sre']) {
    assert(roles.some(role => role.id === legacy), `Lost existing preference: ${legacy}`);
  }
  assert.equal(roles.find(role => role.id === 'java-backend').label, '后端（Java）');
  assert.equal(roles.find(role => role.id === 'go').label, '后端（Go）');
});

test('concrete stacks expose their new articles without requiring unrelated stacks', () => {
  const includes = (role, fragment) => pathsFor(role).some(path => path.includes(fragment));
  assert(includes('frontend-react', '/react/'));
  assert(!includes('frontend-react', '/vue/'));
  assert(includes('frontend-vue', '/vue/'));
  assert(!includes('frontend-vue', '/react/'));
  assert(includes('go', '/go/'));
  assert(!includes('go', '/java/language/'));
  assert(includes('java-backend', '/java/'));
  assert(!includes('java-backend', '/go/'));
  assert(includes('testing-python', '/python/'));
  assert(!includes('testing-python', '/java/language/'));
  assert(includes('testing-java', '/java/'));
  assert(!includes('testing-java', '/python/'));
  assert(includes('mobile-android-kotlin', '/kotlin/'));
  assert(!includes('mobile-android-kotlin', '/swift/'));
  assert(includes('mobile-ios-swift', '/swift/'));
  assert(!includes('mobile-ios-swift', '/kotlin/'));
  assert(includes('mobile-flutter-android', '/android/'));
  assert(!includes('mobile-flutter-android', '/ios/'));
  assert(includes('mobile-flutter-ios', '/ios/'));
  assert(!includes('mobile-flutter-ios', '/android/'));
});

test('a shared article keeps separate priorities and deeper readings stay out of the must set', () => {
  const route = (id, priority, core = true) => ({role: {id}, roadmap: {phases: [{topics: [
    {priority, articles: [{href: '/shared#one', core}, {href: '/deeper#two', core: false}]},
  ]}]}});
  const result = buildRoleReadings([route('backend', 'must'), route('frontend', 'optional')]);
  const article = {rolePriorities: result.byPermalink.get('/shared')};
  assert.equal(priorityForRole(article, 'backend'), 'must');
  assert.equal(priorityForRole(article, 'frontend'), 'optional');
  assert.equal(priorityForRole(article, ''), undefined);
  assert.equal(priorityForRole(article, 'unknown'), undefined);
  assert.equal(result.byPermalink.get('/deeper').backend, 'common');
  assert.throws(() => buildRoleReadings([route('same', 'must'), route('same', 'common')]), /duplicate role/);
});

test('new supplemental articles are usable from the appropriate roles without enlarging the first round', () => {
  for (const [role, article] of [
    ['frontend-react', 'frontend/html/forms'],
    ['frontend-vue', 'frontend/browser/web-worker'],
    ['go', 'basic-knowledge/go/runtime'],
    ['java-backend', 'basic-knowledge/data-structures/concurrent-queues'],
    ['testing-python', 'basic-knowledge/python/concurrency/asyncio'],
    ['sre', 'devops/cloud-computing'],
  ]) {
    const priority = byPermalink.get(`/docs/${article}`)?.[role];
    assert(priority, `${article} must be available to ${role}`);
    assert.notEqual(priority, 'must', `${article} is supplemental reading`);
  }
});

test('URL selection overrides saved preferences and explicit all never falls back to a saved role', () => {
  assert.equal(resolveRoleId(roles, '?role=frontend-vue', 'go'), 'frontend-vue');
  assert.equal(resolveRoleId(roles, '?q=HTTP', 'go'), 'go');
  assert.equal(resolveRoleId(roles, '?role=', 'go'), '');
  assert.equal(resolveRoleId(roles, '?role=deleted', 'go'), '');
  assert.equal(resolveRoleId(roles, '', 'deleted'), '');
  assert.equal(withRole('/review?article=example&card=example%23question', 'frontend-react'),
    '/review?article=example&card=example%23question&role=frontend-react');
  assert.equal(withRole('/docs/network?utm_source=route#core', 'go'), '/docs/network?utm_source=route&role=go#core');
  assert.equal(withRole('/questions?role=go', ''), '/questions?role=');
});

test('temporary route URLs preserve stack and platform when redirected into topics', () => {
  for (const [path, query, expected] of [
    ['frontend', '?framework=vue', 'frontend-vue'],
    ['frontend', '', 'frontend-react'],
    ['go', '', 'go'],
    ['testing', '?language=java', 'testing-java'],
    ['testing', '', 'testing-python'],
    ['mobile', '?platform=ios&language=objective-c', 'mobile-ios-objective-c'],
    ['mobile', '?platform=flutter&host=ios', 'mobile-flutter-ios'],
    ['mobile', '?platform=react-native&host=android', 'mobile-react-native-android'],
    ['mobile', '', 'mobile-shared'],
  ]) {
    const url = new URL(legacyTopicsHref(`/${path}-interview-roadmap/`, query), 'https://example.test');
    assert.equal(url.pathname, '/topics');
    assert.equal(url.searchParams.get('role'), expected);
  }
  const oldTopic = new URL(legacyTopicsHref('/frontend-interview-roadmap/', '?framework=vue&topic=frontend-values&utm_source=bookmark'), 'https://example.test');
  assert.equal(oldTopic.searchParams.get('guide'), 'frontend-values');
  assert.equal(oldTopic.searchParams.get('utm_source'), 'bookmark');
});

test('study order follows the role and URL navigation cannot retain a stale domain or topic', () => {
  const articles = {
    shared: {id: 'shared', domainId: 'algorithms', topicId: 'algorithms/general'},
    language: {id: 'language', domainId: 'language', topicId: 'language/basics'},
    framework: {id: 'framework', domainId: 'framework', topicId: 'framework/core'},
    elective: {id: 'elective', domainId: 'language', topicId: 'language/extra'},
  };
  const domain = (id, topics) => ({id, articleIds: topics.flatMap(t => t.articleIds), topics});
  const index = {articles, domains: [
    domain('algorithms', [{id: 'algorithms/general', articleIds: ['shared']}]),
    domain('language', [{id: 'language/extra', articleIds: ['elective']}, {id: 'language/basics', articleIds: ['language']}]),
    domain('framework', [{id: 'framework/core', articleIds: ['framework']}]),
  ]};
  const guides = [{id: 'language-guide', priority: 'must', readings: [{articleId: 'language', core: true}, {articleId: 'shared', core: false}]},
    {id: 'framework-guide', priority: 'must', readings: [{articleId: 'framework', core: true}]}];
  const study = studyForRole(index, guides);
  assert.deepEqual(study.domains.map(d => d.id), ['language', 'framework', 'algorithms']);
  assert.equal(study.domains[0].topics[0].id, 'language/basics');
  assert.equal(study.readingFor(articles.language).core, true);
  assert.equal(study.readingFor(articles.shared).core, false);
  assert.equal(study.readingFor(articles.elective), undefined);
  assert.equal(selectStudyTopic(study.domains, articles, '?role=example', guides).topic.id, 'language/basics');
  assert.equal(selectStudyTopic(study.domains, articles, '?topic=framework/core', guides).domain.id, 'framework');
  assert.equal(selectStudyTopic(study.domains, articles, '?article=shared', guides).topic.id, 'algorithms/general');
  assert.equal(selectStudyTopic(study.domains, articles, '?guide=framework-guide', guides).topic.id, 'framework/core');
  assert.equal(selectStudyTopic(study.domains, articles, '?domain=language&topic=language/extra', guides).topic.id, 'language/extra');
  assert.equal(selectStudyTopic(study.domains, articles, '?domain=language&topic=language/basics', guides).topic.id, 'language/basics');
  assert.equal(selectStudyTopic(study.domains, articles, '?domain=language', [], {language: {done: true}}).topic.id, 'language/extra');
  assert.equal(selectStudyTopic(study.domains, articles, '?domain=language&topic=language/basics', [], {language: {done: true}}).topic.id, 'language/basics');
});

test('wire encoding preserves role priorities and existing stable learning IDs', () => {
  const id = 'example.article#question';
  const article = {id: 'example/article', knowledgeId: 'example.article', title: 'Example', permalink: '/docs/example/article',
    domainId: 'example', topicId: 'example-topic', minutes: 3, rolePriorities: {go: 'must', 'frontend-react': 'optional'},
    roles: ['go', 'frontend-react'], sections: [{id: 'core', title: 'Core'}], cardIds: [id], interviewAnchor: 'interview'};
  const card = {id, articleId: article.id, anchor: 'question', question: 'Why?', label: 'Core', checkpointCount: 1,
    refs: [{articleId: article.id, id: 'core', title: 'Core', section: 'core'}], selfTest: true};
  const index = {roles, domains: [{id: 'example', label: 'Example', articleIds: [article.id], topics: [
    {id: 'example-topic', label: 'Example', articleIds: [article.id]},
  ]}], articles: {[article.id]: article}, cards: {[id]: card}};
  const expanded = expandIndex(compactIndex(index));
  assert.deepEqual(expanded.articles[article.id].rolePriorities, article.rolePriorities);
  assert.deepEqual(expanded.articles[article.id].cardIds, [id]);
  assert.deepEqual(Object.keys(expanded.cards), [id]);
  assert.equal(expanded.cards[id].selfTest, true);
  assert.equal(expanded.cards[id].refs[0].id, 'core');
});

// Optional integration check against the actual Docusaurus build, not a fixture.
if (process.env.LEARNING_INDEX_FILE) {
  const built = expandIndex(JSON.parse(fs.readFileSync(process.env.LEARNING_INDEX_FILE, 'utf8'))['learning-content'].default);
  test('topics receive the actual route order, first-round outcomes and core/deeper reading split', () => {
    const guides = buildRoleGuides(Object.values(built.articles));
    for (const {role, roadmap} of learningRoutes) {
      assert(guides[role.id].length > 0, role.id);
      const first = guides[role.id][0];
      const source = roadmap.phases.flatMap(phase => phase.topics).find(topic => topic.id === first.id);
      assert.deepEqual(first.outcomes, source.firstRound?.outcomes ?? source.details.outcomes);
      assert.deepEqual(first.questions, source.firstRound?.questions ?? source.details.interviewQuestions);
      for (const guide of guides[role.id]) for (const reading of guide.readings) {
        assert(built.articles[reading.articleId].roles.includes(role.id), `${role.id}: ${reading.articleId}`);
      }
    }
    assert.equal(studyForRole(built, guides.go).domains[0].id, 'go');
    assert.equal(studyForRole(built, guides['frontend-vue']).domains[0].id, 'javascript');
    const reactReadings = guides['frontend-react'].flatMap(guide => guide.readings);
    assert(!reactReadings.some(reading => reading.articleId.startsWith('tools-and-frameworks/vue/')));
  });
  test('built cards cover the selected readings and carry exactly their role priorities', () => {
    for (const role of roles) {
      const articles = Object.values(built.articles).filter(article => article.roles.includes(role.id));
      assert(articles.some(article => article.cardIds.length > 0), `No cards for ${role.id}`);
    }
    for (const article of Object.values(built.articles)) {
      const expected = byPermalink.get(roadmapPath(article.permalink)) ?? {};
      assert.deepEqual(article.rolePriorities, expected, article.id);
      assert.deepEqual(article.roles.sort(), Object.keys(expected).sort(), article.id);
      for (const id of article.cardIds) assert.equal(built.cards[id].articleId, article.id);
    }
    const baselineFile = process.env.LEARNING_BASELINE_FILE;
    if (baselineFile) {
      const before = expandIndex(JSON.parse(fs.readFileSync(baselineFile, 'utf8')));
      assert.deepEqual(Object.keys(built.cards).sort(), Object.keys(before.cards).sort(), 'Learning history IDs must not change');
      assert.deepEqual(Object.keys(built.articles).sort(), Object.keys(before.articles).sort());
    }
  });
}
