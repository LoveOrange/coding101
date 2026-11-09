import DefaultNavbarItem from '@theme-original/NavbarItem/DefaultNavbarItem';
import type {ComponentProps} from 'react';
import {useLocaleLink} from '@site/src/i18n/LocalizedLink';

/** Preserve the shared hierarchy; hide entries until their pages are translated. */
export default function LocalizedNavbarItem(props: ComponentProps<typeof DefaultNavbarItem>) {
  const resolve = useLocaleLink();
  if (!props.to) return <DefaultNavbarItem {...props} />;
  const target = resolve(props.to);
  if (target.fallback) return null;
  return <DefaultNavbarItem {...props} to={target.href} autoAddBaseUrl={false} />;
}
