import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';

const compile = code => ts.transpileModule(code, {compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020}}).outputText;
const utm = {};
new Function('exports', compile(await readFile(new URL('../../src/analytics/utm.ts', import.meta.url), 'utf8')))(utm);

test('analytics preserves campaign labels while dropping search text, duplicates and private query parameters', () => {
  const search = '?utm_source=zhihu&utm_medium=social&utm_campaign=c101_202610_java_trial&utm_content=article_hashmap_footer_v1&q=private&email=test@example.com&token=SECRET&domain=java';
  assert.equal(utm.analyticsPageLocation('https://coding101.linsama.com', '/topics', search),
    'https://coding101.linsama.com/topics?utm_source=zhihu&utm_medium=social&utm_campaign=c101_202610_java_trial&utm_content=article_hashmap_footer_v1');
  assert.equal(utm.campaignParameters('?utm_source=a&utm_source=b&utm_campaign=a%40b.com&utm_content=hello%20world').toString(), '');
  assert.equal(utm.campaignParameters('?utm_source=WeChat&utm_campaign=old-campaign').toString(), 'utm_source=WeChat&utm_campaign=old-campaign');
  assert.equal(utm.campaignParameters(`?utm_content=${'a'.repeat(101)}`).toString(), '');
  const topicSearch = utm.campaignParameters(search);
  topicSearch.set('domain', 'database'); topicSearch.set('topic', 'mysql');
  assert.equal(topicSearch.get('utm_source'), 'zhihu');
  assert.equal(topicSearch.has('token'), false);
});

test('page views capture the incoming campaign before asynchronous URL rewrites and do not duplicate query-only navigation', async () => {
  const exports = {}; const events = []; const timers = [];
  const browser = {location: {hostname: 'coding101.linsama.com', origin: 'https://coding101.linsama.com'},
    gtag: (...args) => events.push(args), setTimeout: callback => timers.push(callback)};
  const document = {title: 'Topics', createElement: () => ({}), head: {appendChild: () => {}}};
  const config = {default: {url: 'https://coding101.linsama.com', customFields: {analyticsId: 'G-FIXTURE'}}};
  const require = name => {
    if (name === '@generated/docusaurus.config') return config;
    if (name === '../../src/analytics/utm') return utm;
    throw new Error(`Unexpected import: ${name}`);
  };
  new Function('exports', 'require', 'window', 'document', compile(await readFile(new URL('../../plugins/analytics/client.ts', import.meta.url), 'utf8')))(exports, require, browser, document);
  const location = {pathname: '/topics', search: '?utm_source=zhihu&utm_campaign=c101_202610_java_trial&token=SECRET'};
  exports.default.onRouteDidUpdate({location});
  location.search = '?domain=java';
  timers.shift()();
  const page = events.find(e => e[0] === 'event');
  assert.match(page[2].page_location, /utm_source=zhihu/);
  assert.doesNotMatch(JSON.stringify(events), /SECRET|domain=java/);
  assert.match(events.find(e => e[0] === 'config')[2].page_location, /utm_campaign=c101_202610_java_trial/);
  exports.default.onRouteDidUpdate({location, previousLocation: {pathname: '/topics'}});
  assert.equal(timers.length, 0);
});
