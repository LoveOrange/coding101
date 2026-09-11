import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import ts from 'typescript';
import {createSlugger, parseMarkdownHeadingId} from '@docusaurus/utils';

const data = JSON.parse(fs.readFileSync('src/data/reviewPlans/javaReadingResources.json', 'utf8'));
const headings = new Map();
function resolve(href) {
  const [route, anchor] = href.split('#');
  assert(route.startsWith('/docs/'), `非文档链接：${href}`);
  const base = route.slice(1).replace(/\/$/, '');
  const candidates = [base+'.mdx',base+'.md',path.join(base,'index.mdx'),path.join(base,'index.md')].filter(fs.existsSync);
  assert.equal(candidates.length,1,href);
  const file = candidates[0];
  if (!headings.has(file)) {
    const ids = new Set(); const slugger = createSlugger(); let fence = false;
    for (const line of fs.readFileSync(file,'utf8').split('\n')) {
      if (/^```|^~~~/.test(line)) {fence = !fence; continue;}
      if (fence) continue;
      const heading = /^#{1,6} (.+)$/.exec(line);
      if (heading) {
        const parsed = parseMarkdownHeadingId(heading[1], 'classic');
        ids.add(parsed.id ?? slugger.slug(parsed.text.replace(/`/g,'')));
      }
    }
    headings.set(file,ids);
  }
  if (anchor) assert(headings.get(file).has(decodeURIComponent(anchor)),`找不到题目或章节：${href}`);
}
for (const [href, reading] of Object.entries(data.articles)) {
  resolve(href); resolve(reading.coreHref); assert(reading.scope.trim(),href);
}
for (const [href, questions] of Object.entries(data.questions)) {
  resolve(href); for (const question of questions) {assert(question.title.trim());resolve(question.href);}
}
const active = new Set(), done = new Set();
function visit(id) {
  assert(Object.hasOwn(data.prerequisites,id),`未知前置：${id}`);
  assert(!active.has(id),`前置循环：${id}`);
  if (done.has(id)) return;
  active.add(id); data.prerequisites[id].forEach(visit);active.delete(id);done.add(id);
}
Object.keys(data.prerequisites).forEach(visit);
console.log(`复习资源检查通过：${done.size} 个核心主题，${Object.keys(data.articles).length} 篇阅读范围，${Object.values(data.questions).flat().length} 道题目链接。`);

// Check the resource map against the actual route, so newly added core articles
// cannot silently fall back to an empty reading scope in the UI.
function loadRouteData(file) {
  const source = fs.readFileSync(file, 'utf8');
  const compiled = ts.transpileModule(source, {compilerOptions: {module: ts.ModuleKind.CommonJS}}).outputText;
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    require: (specifier) => {
      const target = path.resolve(path.dirname(file), specifier+'.ts');
      assert(target.startsWith(path.resolve('src/data')+path.sep), `意外的数据依赖：${specifier}`);
      return loadRouteData(target);
    },
  }, {filename:file});
  return exports;
}
const route = loadRouteData(path.resolve('src/data/interviewRoadmaps/java.ts')).javaInterviewRoadmap;
const topics = route.phases.flatMap((phase) => phase.topics);
const byId = new Map(topics.map((topic) => [topic.id,topic]));
assert.equal(byId.size,topics.length,'重复的 Topic ID');
const core = topics.filter((topic) => topic.priority === 'must');
assert.deepEqual(Object.keys(data.prerequisites).sort(),Array.from(core, (topic) => topic.id).sort());
for (const topic of core) {
  assert(topic.firstRound?.outcomes.length, `缺少停止条件：${topic.id}`);
  for (const article of topic.articles.filter((article) => article.core)) {
    assert(data.articles[article.href]?.scope, `缺少核心章节范围：${article.href}`);
  }
}
for (const theme of JSON.parse(fs.readFileSync('src/data/reviewPlans/interviewResearchThemes.json','utf8'))) {
  if (theme.topicId) assert(byId.has(theme.topicId),`面经指向未知主题：${theme.topicId}`);
}
console.log('路线、核心范围与面经主题映射一致。');
