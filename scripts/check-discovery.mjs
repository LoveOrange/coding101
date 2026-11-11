import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {DEFAULT_PARSE_FRONT_MATTER, parseMarkdownFile, loadFreshModule} from '@docusaurus/utils';
import {assertDiscoverableCard} from './discovery-card.mjs';

const outDir = path.resolve(process.argv[2] ?? 'build');
const cardDetails = JSON.parse(await fs.readFile(path.resolve(
  process.env.DOCUSAURUS_GENERATED_FILES_DIR_NAME ?? '.docusaurus',
  'learning-content/default/card-details.json',
), 'utf8'));
const decode = (value) => value.replace(/&(?:amp|quot|apos|lt|gt|#\d+|#x[\da-f]+);/gi, (entity) => {
  const named = {'&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>'};
  return named[entity] ?? String.fromCodePoint(entity[2].toLowerCase() === 'x'
    ? parseInt(entity.slice(3, -1), 16) : parseInt(entity.slice(2, -1), 10));
});
function attributes(text) {
  return Object.fromEntries([...text.matchAll(/([^\s=<>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)]
    .map((match) => [match[1], decode(match[2] ?? match[3] ?? match[4] ?? '')]));
}
const tags = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b([^>]*)>`, 'gi'))].map((match) => attributes(match[1]));
const canonical = (html) => tags(html, 'link').find((tag) => tag.rel === 'canonical')?.href;
const meta = (html, name) => tags(html, 'meta').find((tag) => tag.name === name)?.content;

async function filesIn(directory) {
  const entries = await fs.readdir(directory, {withFileTypes: true});
  return (await Promise.all(entries.map((entry) => entry.isDirectory()
    ? filesIn(path.join(directory, entry.name)) : [path.join(directory, entry.name)]))).flat();
}

const sources = new Map();
for (const filePath of (await filesIn('docs')).filter((file) => /\.mdx?$/.test(file))) {
  const source = await fs.readFile(filePath, 'utf8');
  const {frontMatter, content, excerpt} = await parseMarkdownFile({filePath, fileContent: source, parseFrontMatter: DEFAULT_PARSE_FRONT_MATTER});
  if (frontMatter.draft || frontMatter.unlisted) continue;
  // Match the docs plugin: an omitted description uses the parsed excerpt.
  const description = frontMatter.description ?? excerpt ?? '';
  assert(description.trim(), `${filePath}: public discovery entry needs a description`);
  assert(!sources.has(description), `${filePath}: duplicate description prevents distinct discovery entries`);
  sources.set(description, {filePath, frontMatter, content});
}

const directory = await fs.readFile(path.join(outDir, 'articles/index.html'), 'utf8');
const directoryUrl = new URL(canonical(directory));
const site = new URL('../', directoryUrl);
const index = await fs.readFile(path.join(outDir, 'llms-index.txt'), 'utf8');
const entries = [...index.matchAll(/^- \[(.*?)\]\((https?:\/\/[^)]+)\): (.+)$/gm)];
assert.equal(entries.length, sources.size, 'Every public doc must be listed once; drafts and unlisted docs must be excluded');
const directoryLinks = new Set(tags(directory, 'a').filter((tag) => tag.href).map((tag) => new URL(tag.href, directoryUrl).href));
const sitemap = new Set([...((await fs.readFile(path.join(outDir, 'sitemap.xml'), 'utf8')).matchAll(/<loc>(.*?)<\/loc>/g))].map((match) => decode(match[1])));
const seen = new Set();
let technical = 0;
let questionAnchors = 0;

async function readPage(url) {
  assert.equal(url.origin, site.origin, `Wrong deployment origin: ${url}`);
  assert(url.pathname.startsWith(site.pathname), `Wrong deployment baseUrl: ${url}`);
  const relative = decodeURIComponent(url.pathname.slice(site.pathname.length));
  const candidates = [path.join(outDir, relative, 'index.html'), path.join(outDir, `${relative}.html`)];
  for (const file of candidates) {
    try {return await fs.readFile(file, 'utf8');} catch (error) {if (error.code !== 'ENOENT' && error.code !== 'ENOTDIR') throw error;}
  }
  assert.fail(`Missing HTML: ${url}`);
}

const terms = await readPage(new URL('terms', site));
const contentUseUrl = new URL('#内容与反馈', canonical(terms)).href;
assert(tags(terms, 'h2').some((tag) => tag.id === '内容与反馈'), 'Content-use terms must have a stable destination');

for (const [, escapedTitle, href, description] of entries) {
  const source = sources.get(description);
  assert(source, `Unknown or stale description: ${href}`);
  assert(!seen.has(source.filePath), `Duplicate article: ${href}`);
  seen.add(source.filePath);
  const html = await readPage(new URL(href));
  assert.equal(canonical(html), href, `Non-canonical index link: ${href}`);
  assert.equal(meta(html, 'description'), description, `HTML description differs: ${href}`);
  assert(!/noindex/i.test(meta(html, 'robots') ?? ''), `Public doc is noindex: ${href}`);
  assert(directoryLinks.has(href), `Missing server-rendered directory link: ${href}`);
  assert(sitemap.has(href), `Missing sitemap URL: ${href}`);

  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter((match) => attributes(match[1]).id === 'c101-document-schema');
  assert.equal(scripts.length, 1, `Expected one document schema: ${href}`);
  const data = JSON.parse(scripts[0][2]);
  assert.equal(data.url, href);
  assert.equal(data['@id'], href);
  assert.equal(data.name, escapedTitle.replace(/\\(.)/g, '$1'));
  assert.equal(data.description, description);
  assert.deepEqual(data.keywords, source.frontMatter.keywords);
  assert.equal(data.isPartOf.url, site.href);
  if (source.frontMatter.knowledge) {
    technical += 1;
    assert.deepEqual(data['@type'], ['TechArticle', 'LearningResource']);
    assert.equal(data.identifier, source.frontMatter.knowledge.id);
    assert.equal(data.mainEntityOfPage['@id'], href);
    assert(tags(html, 'a').some((tag) => tag.href
      && new URL(tag.href, directoryUrl).href === contentUseUrl),
    `Missing article content-use link: ${href}`);
    const interview = /\n##\s+(?:\d+\.\s*)?面试题[^\n]*\n([\s\S]*?)(?=\n##\s|$)/.exec(source.content);
    if (interview) {
      const anchors = [...interview[1].matchAll(/^###\s+.*\{#([^}]+)\}\s*$/gm)].map((match) => match[1]);
      const knowledgeId = source.frontMatter.knowledge.id;
      const indexed = Object.keys(cardDetails).some((id) => id.startsWith(`${knowledgeId}#`));
      if (indexed) {
        assert(tags(html, 'div').some((tag) => tag.class?.split(' ').includes('c101-interview-cards')),
          `Missing server-rendered card list: ${href}`);
        const links = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map((match) => ({
          ...attributes(match[1]), text: decode(match[2].replace(/<[^>]*>/g, '')),
        }));
        for (const anchor of anchors) {
          const cardId = `${knowledgeId}#${anchor}`;
          assertDiscoverableCard({link: links.find((link) => link.id === anchor), card: cardDetails[cardId],
            cardId, anchor, site, articleUrl: href});
        }
      } else {
        // Docs outside the learning index retain their original questions and answers.
        const ids = new Set(tags(html, 'h3').map((tag) => tag.id));
        for (const anchor of anchors) assert(ids.has(anchor), `Lost question anchor ${anchor}: ${href}`);
        assert(/<summary\b[^>]*>参考回答<\/summary>/.test(html), `Missing server-rendered reference answers: ${href}`);
      }
      questionAnchors += anchors.length;
    }
  } else {
    assert.equal(data['@type'], 'WebPage', `Do not label directories or historical notes as technical articles: ${href}`);
  }
}

const llms = await fs.readFile(path.join(outDir, 'llms.txt'), 'utf8');
const {publishedRoleEntries} = await loadFreshModule(path.resolve('src/data/interviewRoadmaps/outlineCatalog.ts'));
const about = await readPage(new URL('about', site));
const guide = await readPage(new URL('docs/intro', site));
const guideLinks = new Set(tags(guide, 'a').filter((tag) => tag.href).map((tag) => new URL(tag.href, site).href));
const aboutLinks = new Set(tags(about, 'a').filter((tag) => tag.href).map((tag) => new URL(tag.href, site).href));
for (const role of publishedRoleEntries) {
  const roleUrl = new URL(role.href.replace(/^\//, ''), site);
  const expected = new URL(canonical(await readPage(roleUrl)));
  expected.search = roleUrl.search;
  const href = expected.href;
  assert(guideLinks.has(href), `Study guide is missing published role: ${role.label}`);
  assert(aboutLinks.has(href), `About page is missing published role: ${role.label}`);
  assert(llms.includes(`](${href}):`), `Machine index is missing published role: ${role.label}`);
}
const {learningRoutes} = await loadFreshModule(path.resolve('src/data/interviewRoadmaps/learningRoles.ts'));
for (const [roleId, route] of [['java-backend', 'java-interview-roadmap/'], ['agent', 'agent-interview-roadmap/'], ['sre', 'sre-interview-roadmap/']]) {
  const {roadmap} = learningRoutes.find(({role}) => role.id === roleId);
  const html = await readPage(new URL(route, site));
  assert(html.includes('data-roadmap-readings='), `${route}: missing native reading directory`);
  const links = new Set(tags(html, 'a').filter((tag) => tag.href).map((tag) => new URL(tag.href, site).pathname.replace(/\/$/, '')));
  for (const topic of roadmap.phases.flatMap((phase) => phase.topics)) {
    assert(tags(html, 'details').some((tag) => tag.id === `reading-${topic.id}` && !('hidden' in tag)), `${route}: topic needs a readable native disclosure: ${topic.id}`);
    for (const article of topic.articles.filter((article) => article.href)) {
      const url = new URL(article.href.replace(/^\//, ''), site);
      assert(links.has(url.pathname.replace(/\/$/, '')), `${route}: article requires a JavaScript interaction: ${article.href}`);
    }
  }
}
assert(llms.includes(new URL('llms-index.txt', site).href), 'llms.txt must link to the complete index');
for (const [, href] of llms.matchAll(/^- \[.*?\]\((https?:\/\/[^)]+)\):/gm)) {
  const url = new URL(href);
  if (url.pathname.endsWith('.txt')) continue;
  const html = await readPage(url);
  if (url.hash) assert(tags(html, 'section').some((tag) => tag.id === decodeURIComponent(url.hash.slice(1))), `Missing catalog section: ${url}`);
}
const topics = await fs.readFile(path.join(outDir, 'topics/index.html'), 'utf8');
assert(tags(topics, 'a').some((tag) => tag.href && new URL(tag.href, site).href === directoryUrl.href), 'Topics must expose the directory before JavaScript runs');
const topicLinks = new Set(tags(topics, 'a').map((tag) => tag.href).filter(Boolean).map((href) => new URL(href, site).href));
const questions = await readPage(new URL('questions', site));
const questionLinks = tags(questions, 'a').filter((tag) => tag.href?.includes('#'))
  .map((tag) => new URL(tag.href, site)).filter((url) => url.pathname.startsWith(`${site.pathname}docs/`));
for (const [, , href, description] of entries) {
  if (!sources.get(description).frontMatter.knowledge) continue;
  assert(topicLinks.has(href), `Technical article missing from static topics: ${href}`);
}
assert(questionLinks.length > 0, 'Question catalog must link directly to article questions before JavaScript runs');
for (const url of questionLinks) {
  const html = await readPage(url);
  assert([...tags(html, 'h3'), ...tags(html, 'a')].some((tag) => tag.id === decodeURIComponent(url.hash.slice(1))), `Question catalog has a broken anchor: ${url}`);
}
for (const route of ['topics', 'questions']) {
  const html = await readPage(new URL(route, site));
  assert(!/noindex/i.test(meta(html, 'robots') ?? ''), `Public catalog must be indexable: ${route}`);
  assert(sitemap.has(canonical(html)), `Public catalog missing from sitemap: ${route}`);
}
for (const route of ['review', 'weak', 'progress', 'account', 'account/redeem', 'account/billing', 'account/privacy', 'cards', 'exam', 'exam/report']) {
  const file = path.join(outDir, route, 'index.html');
  try {await fs.access(file);} catch {continue;} // Optional learner routes may be absent.
  const html = await fs.readFile(file, 'utf8');
  assert(/noindex/i.test(meta(html, 'robots') ?? ''), `Personal view must be noindex: ${route}`);
  assert(!sitemap.has(canonical(html)), `Personal view must not enter sitemap: ${route}`);
}
assert(![...sitemap].some((url) => url.includes('/markdown-page')), 'Template page must not be published');
await assert.rejects(fs.access(path.join(outDir, 'markdown-page/index.html')), {code: 'ENOENT'});
const redirects = await fs.readFile(path.join(outDir, '_redirects'), 'utf8');
const redirectUrl = (href) => new URL(href.startsWith(site.pathname) ? href : href.replace(/^\//, ''), site);
for (const line of redirects.trim().split('\n').filter((line) => line && !line.startsWith('#'))) {
  const [from, to, status] = line.split(/\s+/);
  const sourceUrl = redirectUrl(from);
  const englishBase = new URL('en/', site).pathname;
  const localePause = sourceUrl.pathname === englishBase.slice(0, -1) || sourceUrl.pathname.startsWith(englishBase);
  assert.equal(status, localePause ? '302' : '301', `Unexpected redirect status: ${from}`);
  const destination = redirectUrl(to);
  const destinationHtml = await readPage(destination);
  if (destination.hash) assert([...tags(destinationHtml, 'h2'), ...tags(destinationHtml, 'h3'), ...tags(destinationHtml, 'div'), ...tags(destinationHtml, 'main')].some((tag) => tag.id === decodeURIComponent(destination.hash.slice(1))), `Redirect target anchor is missing: ${destination}`);
  const sourceFile = path.join('src/pages', from.replace(/^\//, '').replace(/\/$/, '') + '.tsx');
  if (await fs.access(sourceFile).then(() => true, () => false)) {
    const fallback = await readPage(new URL(from.replace(/^\//, ''), site));
    assert.equal(canonical(fallback), canonical(destinationHtml), `Redirect fallback canonical must point to destination: ${from}`);
    assert(/noindex/.test(meta(fallback, 'robots') ?? ''), `Redirect fallback must be noindex: ${from}`);
    const expected = new URL(canonical(destinationHtml));
    expected.hash = destination.hash;
    assert(tags(fallback, 'a').some((tag) => tag.href && new URL(tag.href, site).href === expected.href), `Redirect fallback needs a real destination link: ${from}`);
  }
  const sourcePath = sourceUrl.pathname.replace(/\/$/, '');
  assert(![...sitemap].some((url) => new URL(url).pathname.replace(/\/$/, '') === sourcePath), `Redirect source must not enter sitemap: ${from}`);
}
const robots = await fs.readFile(path.join(outDir, 'robots.txt'), 'utf8');
assert(robots.includes(new URL('sitemap.xml', site).href), 'robots.txt must advertise this deployment’s sitemap');
assert(robots.includes(`Disallow: ${site.pathname}api/`), 'robots.txt must exclude API crawling with the deployment baseUrl');
assert(/User-agent: \*\nAllow: \//.test(robots), 'Public reading must remain crawlable');
assert(!(await fs.readFile('src/css/custom.css', 'utf8')).includes('h2.c101-interview ~ :not'), 'Question answers must not be hidden by the old CSS rule');
console.log(`内容发现检查通过：${seen.size} 篇公开文章、${technical} 篇技术文章结构化数据、${questionAnchors} 个稳定题目锚点；目录、文本索引与 sitemap 一致。`);
