import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useLocation} from '@docusaurus/router';
import {applyTrailingSlash} from '@docusaurus/utils-common';

/** Only advertise translations that are actually published. */
export function useLocaleRoutes() {
  const {siteConfig, i18n} = useDocusaurusContext();
  const {pathname} = useLocation();
  const suffix = pathname.slice(siteConfig.baseUrl.length).replace(/\/$/, '');
  const translated = (siteConfig.customFields.englishRoutes as string[]).includes('/' + suffix);
  return {
    translated,
    availableLocales: translated ? i18n.locales : [i18n.defaultLocale],
    chineseUrl: (path: string) => applyTrailingSlash(i18n.localeConfigs[i18n.defaultLocale].baseUrl + path.replace(/^\//, ''), siteConfig),
  };
}
