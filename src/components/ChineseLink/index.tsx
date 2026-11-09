import type {ReactNode} from 'react';
import {useLocaleRoutes} from '@site/src/i18n/useLocaleRoutes';

/** Full navigation crosses locale bundles and preserves mirror base paths. */
export default function ChineseLink({to, children}: {to: string; children: ReactNode}) {
  const {chineseUrl} = useLocaleRoutes();
  return <a href={chineseUrl(to)} hrefLang="zh-Hans">{children}</a>;
}
