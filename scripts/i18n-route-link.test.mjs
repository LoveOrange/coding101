import assert from 'node:assert/strict';
import test from 'node:test';
import {loadFreshModule} from '@docusaurus/utils';
const {localeRoute} = await loadFreshModule(new URL('../src/i18n/routeLink.ts', import.meta.url).pathname);

for (const base of ['/', '/coding101/']) {
  const options = {locale: 'en', defaultLocale: 'zh-Hans', siteUrl: 'https://example.org', baseUrls: {'zh-Hans': base, en: base + 'en/'}, englishRoutes: ['/', '/about', '/articles', '/docs/basic-knowledge/network/dns']};
  test(`translated links and Chinese fallbacks retain filters and anchors at ${base}`, () => {
    assert.deepEqual(localeRoute('/about', options), {href: base + 'en/about/', fallback: false});
    assert.deepEqual(localeRoute('/topics?domain=network#dns', options), {href: base + 'topics/?domain=network#dns', fallback: true});
    assert.deepEqual(localeRoute(base + 'en/about/', options), {href: base + 'en/about/', fallback: false});
    assert.deepEqual(localeRoute(base + 'topics/?role=java', options), {href: base + 'topics/?role=java', fallback: true});
    assert.deepEqual(localeRoute('/about', {...options, locale: 'zh-Hans'}), {href: base + 'about/', fallback: false});
    assert.deepEqual(localeRoute('/', options), {href: base + 'en/', fallback: false});
    for (const href of ['#choose', 'https://example.net/', '//example.net/']) assert.deepEqual(localeRoute(href, options), {href, fallback: false});
  });
}
