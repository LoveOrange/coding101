export type LocaleRouteOptions = {
  locale: string;
  defaultLocale: string;
  siteUrl: string;
  baseUrls: Record<string, string>;
  englishRoutes: string[];
};

/** Resolve one logical site route without inventing untranslated locale URLs. */
export function localeRoute(href: string, options: LocaleRouteOptions) {
  if (!href.startsWith('/') || href.startsWith('//')) return {href, fallback: false};
  const url = new URL(href, options.siteUrl);
  const bases = Object.entries(options.baseUrls).sort((a, b) => b[1].length - a[1].length);
  const match = bases.find(([, base]) => base !== '/' && (url.pathname === base.slice(0, -1) || url.pathname.startsWith(base)));
  const suffix = match ? '/' + url.pathname.slice(match[1].replace(/\/$/, '').length).replace(/^\//, '') : url.pathname;
  const route = suffix.replace(/\/$/, '') || '/';
  const translated = options.englishRoutes.includes(route);
  const locale = options.locale === 'en' && translated ? 'en' : options.defaultLocale;
  const base = options.baseUrls[locale];
  const pathname = base + suffix.replace(/^\//, '');
  // Pages in this site are directory routes. Keep query filters and hashes.
  url.pathname = /\.[a-z0-9]+$/i.test(pathname) ? pathname : pathname.replace(/\/?$/, '/');
  return {href: url.pathname + url.search + url.hash, fallback: locale !== options.locale};
}
