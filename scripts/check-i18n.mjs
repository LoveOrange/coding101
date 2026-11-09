import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {DEFAULT_PARSE_FRONT_MATTER, parseMarkdownFile} from '@docusaurus/utils';

const outDir = path.resolve(process.argv[2] ?? 'build');
const catalog = JSON.parse(await fs.readFile('i18n/en/catalog.json', 'utf8'));
for (const file of catalog.pages) {
  const translated = await fs.readFile(path.join('i18n/en/docusaurus-plugin-content-pages', file), 'utf8');
  assert.notEqual(translated, await fs.readFile(path.join('src/pages', file), 'utf8'), `Page translation is missing: ${file}`);
}
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b([^>]*)>`, 'gi'))].map((match) =>
  Object.fromEntries([...match[1].matchAll(/([^\s=<>]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)]
    .map((attribute) => [attribute[1], decode(attribute[2] ?? attribute[3] ?? attribute[4] ?? '')])));
const canonical = (html) => tags(html, 'link').find((tag) => tag.rel === 'canonical')?.href;
const locs = (xml) => [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decode(match[1]));
const route = (file) => '/' + file.replace(/\.(?:mdx?|tsx?)$/, '').replace(/(^|\/)index$/, '');
const expected = [...catalog.pages.map(route), ...catalog.docs.map((file) => '/docs' + route(file)), ...catalog.generatedRoutes];
const site = new URL(canonical(await fs.readFile(path.join(outDir, 'index.html'), 'utf8')));
const englishSite = new URL('en/', site);
const normalize = (pathname) => pathname.replace(/\/$/, '') || '/';
const englishSitemap = locs(await fs.readFile(path.join(outDir, 'en/sitemap.xml'), 'utf8'));
assert.deepEqual(new Set(englishSitemap.map((url) => normalize('/' + new URL(url).pathname.slice(englishSite.pathname.length)))), new Set(expected.map(normalize)), 'English sitemap must contain exactly the translated pages');
const robots = await fs.readFile(path.join(outDir, 'robots.txt'), 'utf8');
assert(robots.includes(new URL('sitemap.xml', englishSite).href), 'Root robots must advertise the English sitemap');

async function readPage(url) {
  const relative = decodeURIComponent(new URL(url).pathname.slice(site.pathname.length)).replace(/\/$/, '');
  for (const file of [path.join(outDir, relative, 'index.html'), path.join(outDir, relative + '.html')]) {
    try {return await fs.readFile(file, 'utf8');} catch (e) {if (!['ENOENT', 'ENOTDIR'].includes(e.code)) throw e;}
  }
  assert.fail(`Missing HTML: ${url}`);
}

const chineseSitemap = locs(await fs.readFile(path.join(outDir, 'sitemap.xml'), 'utf8'));
const allUrls = new Set([...chineseSitemap, ...englishSitemap]);
for (const url of allUrls) {
  const html = await readPage(url);
  const alternates = tags(html, 'link').filter((tag) => tag.rel === 'alternate' && tag.hreflang);
  const en = alternates.find((tag) => tag.hreflang === 'en');
  const suffix = '/' + new URL(url).pathname.slice((url.startsWith(englishSite.href) ? englishSite : site).pathname.length);
  assert.equal(Boolean(en), expected.map(normalize).includes(normalize(suffix)), `Unexpected translation claim: ${url}`);
  for (const alternate of alternates) {
    assert(allUrls.has(alternate.href), `hreflang points outside published canonical pages: ${alternate.href}`);
    const other = await readPage(alternate.href);
    assert(tags(other, 'link').some((tag) => tag.rel === 'alternate' && tag.href === url), `Missing reciprocal hreflang: ${url}`);
  }
  if (new URL(url).pathname.includes('/docs/')) assert(/<main\b/.test(html), `Sitemap contains a page without static article content: ${url}`);
  if (!url.startsWith(englishSite.href)) continue;
  assert.equal(canonical(html), url, `English canonical must point to itself: ${url}`);
  assert.equal(tags(html, 'html')[0].lang, 'en');
  assert(!tags(html, 'meta').some((tag) => tag.name === 'robots' && /noindex/i.test(tag.content)), `English page must be indexable: ${url}`);
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
  assert(main?.length > 300, `Missing static English body: ${url}`);
  for (const link of tags(html, 'a').filter((tag) => tag.href)) {
    const target = new URL(link.href, url);
    if (target.origin !== site.origin || !target.pathname.startsWith(englishSite.pathname)) continue;
    if (/\.(?:txt|xml|svg|png|jpg)$/.test(target.pathname)) continue;
    const destination = await readPage(target);
    if (target.hash) assert([...tags(destination, 'h2'), ...tags(destination, 'h3'), ...tags(destination, 'section'), ...tags(destination, 'div'), ...tags(destination, 'main')].some((tag) => tag.id === decodeURIComponent(target.hash.slice(1))), `Broken English anchor: ${target}`);
  }
}

const index = await fs.readFile(path.join(outDir, 'en/llms-index.txt'), 'utf8');
const entries = [...index.matchAll(/^- \[.*?\]\((https?:\/\/[^)]+)\): (.+)$/gm)];
assert.equal(entries.length, catalog.docs.length, 'English machine index must exclude untranslated docs');
for (const file of catalog.docs) {
  const source = await fs.readFile(path.join('docs', file), 'utf8');
  const filePath = path.join('i18n/en/docusaurus-plugin-content-docs/current', file);
  const translation = await fs.readFile(filePath, 'utf8');
  assert.notEqual(translation, source, `Untranslated fallback: ${file}`);
  const parse = (text) => parseMarkdownFile({filePath, fileContent: text, parseFrontMatter: DEFAULT_PARSE_FRONT_MATTER});
  const original = await parse(source);
  const translated = await parse(translation);
  assert.deepEqual(translated.frontMatter.knowledge, original.frontMatter.knowledge, `Knowledge identity changed: ${file}`);
  const entry = entries.find(([, , description]) => description === translated.frontMatter.description);
  assert(entry, `Missing translated description: ${file}`);
  const html = await readPage(entry[1]);
  const schema = JSON.parse(html.match(/<script[^>]*id="c101-document-schema"[^>]*>(.*?)<\/script>/)?.[1] ?? 'null');
  assert.equal(schema?.inLanguage, 'en');
  assert.equal(schema.url, entry[1]);
  for (const [, id] of source.matchAll(/^### .*\{#([^}]+)\}/gm)) {
    assert(translation.includes(`{#${id}}`), `Stable question id changed: ${file}#${id}`);
    assert(tags(html, 'h3').some((tag) => tag.id === id), `Question not present in static HTML: ${id}`);
  }
  const answers = [...html.matchAll(/<details\b([^>]*)>\s*<summary>Reference answer<\/summary>/g)];
  if (original.frontMatter.knowledge) {
    assert(answers.length > 0, 'Technical translation must retain readable answers');
    assert(answers.every(([, attributes]) => !/\bopen\b/.test(attributes)), 'Answers must start collapsed');
  }
}
console.log(`国际化检查通过：${englishSitemap.length} 个英文页面、${entries.length} 篇翻译，语言链接互指、静态正文、稳定题目 ID 与独立索引一致。`);
