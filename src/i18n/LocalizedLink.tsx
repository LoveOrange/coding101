import type {ComponentProps} from 'react';
import DocusaurusLink from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {localeRoute} from './routeLink';

export function useLocaleLink() {
  const {siteConfig, i18n} = useDocusaurusContext();
  return (href: string) => localeRoute(href, {
    locale: i18n.currentLocale, defaultLocale: i18n.defaultLocale,
    siteUrl: siteConfig.url,
    baseUrls: Object.fromEntries(Object.entries(i18n.localeConfigs).map(([locale, config]) => [locale, config.baseUrl])),
    englishRoutes: siteConfig.customFields.englishRoutes as string[],
  });
}

/** Hide navigation to pages that have no translation in the current locale. */
export default function LocalizedLink({to, children, ...props}: ComponentProps<typeof DocusaurusLink>) {
  const resolve = useLocaleLink();
  const target = typeof to === 'string' ? resolve(to) : undefined;
  if (target?.fallback) return null;
  return <DocusaurusLink {...props} to={target?.href ?? to} autoAddBaseUrl={target ? false : props.autoAddBaseUrl}>{children}</DocusaurusLink>;
}
