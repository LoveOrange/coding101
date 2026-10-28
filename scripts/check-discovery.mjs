import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {DEFAULT_PARSE_FRONT_MATTER, parseMarkdownFile} from '@docusaurus/utils';

const outDir = path.resolve(process.argv[2] ?? 'build');
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
  const {frontMatter, content} = await parseMarkdownFile({filePath, fileContent: source, parseFrontMatter: DEFAULT_PARSE_FRONT_MATTER});
  if (frontMatter.draft || frontMatter.unlisted) continue;
  assert(!sources.has(frontMatter.description), `${filePath}: duplicate description prevents distinct discovery entries`);
  sources.set(frontMatter.description, {filePath, frontMatter, content});
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
    const interview = /\n##\s+(?:\d+\.\s*)?面试题[^\n]*\n([\s\S]*?)(?=\n##\s|$)/.exec(source.content);
    if (interview) {
      const disclosure = tags(html, 'details').find((tag) => tag.class?.split(' ').includes('c101-question-list'));
      assert(disclosure, `Questions must be readable in a native disclosure: ${href}`);
      assert(!('hidden' in disclosure) && !('open' in disclosure), `Questions should start collapsed, not permanently hidden: ${href}`);
      const ids = new Set(tags(html, 'h3').map((tag) => tag.id));
      for (const [, anchor] of interview[1].matchAll(/^###\s+.*\{#([^}]+)\}\s*$/gm)) {
        assert(ids.has(anchor), `Lost question anchor ${anchor}: ${href}`);
        questionAnchors += 1;
      }
      assert(/<summary\b[^>]*>参考回答<\/summary>/.test(html), `Missing server-rendered reference answers: ${href}`);
    }
  } else {
    assert.equal(data['@type'], 'WebPage', `Do not label directories or historical notes as technical articles: ${href}`);
  }
}

const llms = await fs.readFile(path.join(outDir, 'llms.txt'), 'utf8');
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
  assert(tags(html, 'h3').some((tag) => tag.id === decodeURIComponent(url.hash.slice(1))), `Question catalog has a broken anchor: ${url}`);
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
for (const line of redirects.trim().split('\n').filter((line) => line && !line.startsWith('#'))) {
  const [from, to, status] = line.split(/\s+/);
  assert.equal(status, '301', `Article consolidation must use a permanent redirect: ${from}`);
  await readPage(new URL(to, site));
  assert(![...sitemap].some((url) => new URL(url).pathname.replace(/\/$/, '') === from.replace(/\/$/, '')), `Redirect source must not enter sitemap: ${from}`);
}
const robots = await fs.readFile(path.join(outDir, 'robots.txt'), 'utf8');
assert(robots.includes(new URL('sitemap.xml', site).href), 'robots.txt must advertise this deployment’s sitemap');
assert(!(await fs.readFile('src/css/custom.css', 'utf8')).includes('h2.c101-interview ~ :not'), 'Question answers must not be hidden by the old CSS rule');
console.log(`内容发现检查通过：${seen.size} 篇公开文章、${technical} 篇技术文章结构化数据、${questionAnchors} 个稳定题目锚点；目录、文本索引与 sitemap 一致。`);
