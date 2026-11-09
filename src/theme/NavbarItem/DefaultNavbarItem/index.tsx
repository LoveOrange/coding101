import DefaultNavbarItem from '@theme-original/NavbarItem/DefaultNavbarItem';
import type {ComponentProps} from 'react';
import {useLocaleLink} from '@site/src/i18n/LocalizedLink';

/** Navigation keeps one hierarchy across locales, including untranslated pages. */
export default function LocalizedNavbarItem(props: ComponentProps<typeof DefaultNavbarItem>) {
  const resolve = useLocaleLink();
  if (!props.to) return <DefaultNavbarItem {...props} />;
  const target = resolve(props.to);
  return <DefaultNavbarItem {...props} to={target.fallback ? `pathname://${target.href}` : target.href}
    autoAddBaseUrl={false} target={target.fallback ? '_self' : props.target}
    hrefLang={target.fallback ? 'zh-Hans' : props.hrefLang}
    label={target.fallback ? `${props.label} (Chinese)` : props.label} />;
}
