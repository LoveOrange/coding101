import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {DEFAULT_PARSE_FRONT_MATTER, parseMarkdownFile, loadFreshModule} from '@docusaurus/utils';

const outDir = path.resolve(process.argv[2] ?? 'build');
const catalog = JSON.parse(await fs.readFile('i18n/en/catalog.json', 'utf8'));
const discovery = JSON.parse(await fs.readFile('i18n/en/discovery.json', 'utf8'));
const {parseDoc} = await loadFreshModule(path.resolve('plugins/learning-content/parse.ts'));
const {cardTranslationErrors} = await loadFreshModule(path.resolve('plugins/learning-content/translation.ts'));
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
const release = JSON.parse(await fs.readFile('release/production.json', 'utf8'));
const publicI18n = (process.env.PUBLIC_I18N ?? release.features.PUBLIC_I18N) === 'true';
if (!publicI18n) {
  assert.equal(await fs.stat(path.join(outDir, 'en')).then(() => true, () => false), false, 'Closed locales must not leave public English assets');
  const sitemap = locs(await fs.readFile(path.join(outDir, 'sitemap.xml'), 'utf8'));
  for (const url of sitemap) {
    assert(!url.startsWith(englishSite.href), `Hidden English URL in sitemap: ${url}`);
    const html = await readPage(url);
    assert(!tags(html, 'link').some(tag => tag.hreflang === 'en'), `Hidden English hreflang: ${url}`);
    assert(!tags(html, 'a').some(tag => tag.lang || (tag.href && new URL(tag.href, site).href.startsWith(englishSite.href))), `Hidden locale navigation: ${url}`);
  }
  for (const file of ['robots.txt', 'llms.txt', 'llms-index.txt']) {
    const text = await fs.readFile(path.join(outDir, file), 'utf8');
    assert(!text.includes(englishSite.href), `Hidden English discovery entry: ${file}`);
  }
  const redirects = await fs.readFile(path.join(outDir, '_redirects'), 'utf8');
  for (const route of expected) {
    const source = new URL('en' + (route === '/' ? '' : route), site).pathname.replace(/\/$/, '');
    const target = new URL(route.replace(/^\//, ''), site).pathname.replace(/\/?$/, '/');
    for (const from of [source, source + '/']) assert(redirects.includes(`${from} ${target}# 302`), `Missing temporary locale redirect: ${from}`);
  }
  for (const file of catalog.docs) {
    const original = await fs.readFile(path.join('docs', file), 'utf8');
    const translated = await fs.readFile(path.join('i18n/en/docusaurus-plugin-content-docs/current', file), 'utf8');
    assert.deepEqual(cardTranslationErrors(parseDoc(original), parseDoc(translated, 'en')), [], `Preserved translation has invalid cards: ${file}`);
  }
  console.log(`国际化关闭检查通过：${sitemap.length} 个中文页面无语言入口及英文发现声明；英文产物未公开，${expected.length} 个旧入口暂时跳转中文，译文卡片校验通过。`);
  process.exit(0);
}
const activeRedirects = await fs.readFile(path.join(outDir, '_redirects'), 'utf8');
assert(!activeRedirects.split('\n').some(line => line.startsWith(englishSite.pathname) || line.startsWith(englishSite.pathname.slice(0, -1) + ' ')), 'Enabled English pages must not retain pause redirects');
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
const chineseHome = await readPage(site);
const englishHome = await readPage(englishSite);
const region = (html, tag) => html.match(new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?</${tag}>`))?.[0] ?? '';
const logicalLinks = (html) => tags(html, 'a').filter((tag) => tag.href && !tag.lang).map((tag) => {
  const url = new URL(tag.href, site);
  if (url.origin !== site.origin) return url.href;
  const base = url.pathname.startsWith(englishSite.pathname) ? englishSite.pathname : site.pathname;
  return '/' + url.pathname.slice(base.length) + url.search + url.hash;
});
for (const section of ['nav', 'main', 'footer']) {
  const chineseLinks = logicalLinks(region(chineseHome, section));
  const englishLinks = logicalLinks(region(englishHome, section));
  assert(englishLinks.every(link => chineseLinks.includes(link)), `English ${section} must use the shared structure`);
  assert(!region(englishHome, section).includes('(Chinese)'), `Untranslated navigation must be hidden in ${section}`);
}
const chineseMain = region(chineseHome, 'main');
const englishMain = region(englishHome, 'main');
assert(tags(englishMain, 'section').every(section => tags(chineseMain, 'section').some(original => JSON.stringify(section) === JSON.stringify(original))), 'Visible homepage sections must share the same layout');
assert(!/[㐀-鿿]/.test(englishMain.replace(/<[^>]+>/g, '')), 'Homepage copy must be translated');
assert(!tags(region(englishHome, 'nav'), 'a').some((tag) => tag.href === new URL('articles/', englishSite).pathname), 'Article directory must remain an auxiliary entry, as in Chinese');
for (const link of tags(englishHome, 'a').filter((tag) => tag.hreflang === 'zh-Hans' && !tag.lang)) {
  assert.equal(link.target, '_self', 'Locale fallback must navigate in the current tab');
  const target = new URL(link.href, site);
  assert(!target.pathname.startsWith(englishSite.pathname), `Fallback points into the English bundle: ${target}`);
  await readPage(target);
}
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
const directory = await readPage(new URL('articles/', englishSite));
const directoryItems = tags(directory, 'li').filter((tag) => tag['data-article-id']);
const expectedIds = new Set([...Object.keys(discovery.articles), ...catalog.docs.map((file) => file.replace(/\.mdx?$/, ''))]);
assert.deepEqual(new Set(directoryItems.map((item) => item['data-article-id'])), expectedIds, 'Discovery must include introductions and actual translations, without duplicates');
assert.equal(directoryItems.length, expectedIds.size);
assert.equal(entries.length, expectedIds.size, 'Human and machine directories must cover the same articles');
assert.equal(new Set(entries.map((entry) => entry[1])).size, entries.length, 'Every article needs a single preferred destination');
const links = tags(directory, 'a').filter((tag) => tag.href);
const englishEntries = entries.filter((entry) => entry[2].startsWith('Full text: en. '));
assert.equal(englishEntries.length, catalog.docs.length, 'Only complete translations may be marked English');
for (const [, href, description] of entries) {
  assert(allUrls.has(href), `Discovery destination must be in a sitemap: ${href}`);
  const html = await readPage(href);
  assert.equal(canonical(html), href, `Discovery must use the real canonical, including index docs: ${href}`);
  const language = description.match(/^Full text: (en|zh-Hans)\. /)?.[1];
  assert(language, `Missing full-text language: ${href}`);
  assert.equal(tags(html, 'html')[0].lang, language, `Mislabelled full-text language: ${href}`);
  assert(links.some((link) => new URL(link.href, englishSite).href === href && link.hreflang === language), `Missing labelled static article link: ${href}`);
  if (language === 'zh-Hans') {
    const introduction = Object.values(discovery.articles).find((item) => description === `Full text: zh-Hans. ${item.description}`);
    assert(introduction, `Unknown English introduction: ${href}`);
    assert(directory.includes(introduction.description.replaceAll('&', '&amp;')), `Missing visible introduction: ${href}`);
    assert(!tags(html, 'link').some((tag) => tag.rel === 'alternate' && tag.hreflang === 'en'), `An introduction is not a full translation: ${href}`);
  }
}
// Cross-locale links require full navigation, the correct mirror base path and
// actual Chinese anchors. Query filters (for roles) must survive normalization.
for (const link of links.filter((link) => link.hreflang === 'zh-Hans')) {
  const target = new URL(link.href, englishSite);
  assert.equal(target.origin, site.origin);
  assert(target.pathname.startsWith(site.pathname) && !target.pathname.startsWith(englishSite.pathname));
  const html = await readPage(target);
  const destination = new URL(target); destination.search = ''; destination.hash = '';
  assert.equal(canonical(html), destination.href, `Cross-locale link must not redirect: ${target}`);
  if (target.hash) assert(tags(html, 'section').some((tag) => tag.id === decodeURIComponent(target.hash.slice(1))), `Missing Chinese topic anchor: ${target}`);
}
const {publishedRoleEntries} = await loadFreshModule(path.resolve('src/data/interviewRoadmaps/outlineCatalog.ts'));
const llms = await fs.readFile(path.join(outDir, 'en/llms.txt'), 'utf8');
for (const role of publishedRoleEntries) {
  const target = new URL(role.href.replace(/^\//, ''), site);
  const expected = new URL(canonical(await readPage(target))); expected.search = target.search;
  assert(links.some((link) => new URL(link.href, englishSite).href === expected.href), `Missing role or role filter: ${role.href}`);
  assert(llms.includes(`](${expected.href}): Full guide language: zh-Hans`), `Missing role in text index: ${role.href}`);
  assert(directory.includes(discovery.roles[role.href].title));
}
const chineseDirectory = await readPage(new URL('articles/', site));
const chineseSections = tags(chineseDirectory, 'section').map((tag) => tag.id);
assert.deepEqual(tags(directory, 'section').map((tag) => tag.id).filter((id) => id !== 'role-preparation'), chineseSections, 'English introductions must cover every published topic group');
for (const file of catalog.docs) {
  const source = await fs.readFile(path.join('docs', file), 'utf8');
  const filePath = path.join('i18n/en/docusaurus-plugin-content-docs/current', file);
  const translation = await fs.readFile(filePath, 'utf8');
  assert.notEqual(translation, source, `Untranslated fallback: ${file}`);
  const parse = (text) => parseMarkdownFile({filePath, fileContent: text, parseFrontMatter: DEFAULT_PARSE_FRONT_MATTER});
  const original = await parse(source);
  const translated = await parse(translation);
  assert.deepEqual(translated.frontMatter.knowledge, original.frontMatter.knowledge, `Knowledge identity changed: ${file}`);
  const parsed = parseDoc(translation, 'en');
  assert.deepEqual(cardTranslationErrors(parseDoc(source), parsed), [], `Invalid translated cards: ${file}`);
  for (const card of parsed.cards) {
    for (const ref of card.related.filter((ref) => ref.path)) {
      const target = path.posix.normalize(path.posix.join(path.posix.dirname(file), ref.path));
      assert(catalog.docs.includes(target), `Card reference needs a published translation: ${file}#${card.anchor} -> ${target}`);
      const other = parseDoc(await fs.readFile(path.join('i18n/en/docusaurus-plugin-content-docs/current', target), 'utf8'), 'en');
      if (ref.anchor) assert(other.headings.some((heading) => heading.id === ref.anchor), `Missing translated card reference: ${target}#${ref.anchor}`);
    }
  }
  const entry = englishEntries.find(([, , description]) => description.startsWith(`Full text: en. ${translated.frontMatter.description} Chinese original: `));
  assert(entry, `Missing translated description: ${file}`);
  const html = await readPage(entry[1]);
  const schema = JSON.parse(html.match(/<script[^>]*id="c101-document-schema"[^>]*>(.*?)<\/script>/)?.[1] ?? 'null');
  assert.equal(schema?.inLanguage, 'en');
  assert.equal(schema.url, entry[1]);
  for (const {anchor: id} of parseDoc(source).cards) {
    assert(translation.includes(`{#${id}}`), `Stable question id changed: ${file}#${id}`);
    assert(tags(html, 'h3').some((tag) => tag.id === id), `Question not present in static HTML: ${id}`);
  }
  const answers = [...html.matchAll(/<details\b([^>]*)>\s*<summary>Reference answer<\/summary>/g)];
  if (original.frontMatter.knowledge) {
    assert(answers.length > 0, 'Technical translation must retain readable answers');
    assert(answers.every(([, attributes]) => !/\bopen\b/.test(attributes)), 'Answers must start collapsed');
  }
}
console.log(`国际化检查通过：${englishSitemap.length} 个英文页面、${englishEntries.length} 篇全文翻译、${entries.length - englishEntries.length} 篇英文简介、${publishedRoleEntries.length} 个岗位入口；语言标注、规范链接、主题覆盖与双向 hreflang 一致。`);
