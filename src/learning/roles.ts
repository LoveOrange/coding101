import type {ArticleIndex, Priority, Role} from './types';

/** No selected role means no universal interview priority. */
export function priorityForRole(article: ArticleIndex, roleId?: string): Priority | undefined {
  return roleId ? article.rolePriorities[roleId] : undefined;
}

/** An explicit empty role overrides a saved preference; unknown ids fail open to the catalog. */
export function resolveRoleId(roles: Role[], search: string, preferred?: string): string {
  const params = new URLSearchParams(search);
  const requested = params.has('role') ? params.get('role') : preferred;
  return roles.some(role => role.id === requested) ? requested! : '';
}

export function withRole(href: string, roleId: string): string {
  const [url, hash] = href.split('#');
  const [pathname, search] = url.split('?');
  const params = new URLSearchParams(search);
  params.set('role', roleId);
  return `${pathname}?${params.toString()}${hash ? `#${hash}` : ''}`;
}

export function mobileRoleId(selection: {platform: string; language?: string; host?: string}): string {
  if (selection.platform === 'android') return `mobile-android-${selection.language === 'java' ? 'java' : 'kotlin'}`;
  if (selection.platform === 'ios') return `mobile-ios-${selection.language === 'objective-c' ? 'objective-c' : 'swift'}`;
  if (selection.platform === 'flutter' || selection.platform === 'react-native') {
    return `mobile-${selection.platform}-${selection.host === 'ios' ? 'ios' : 'android'}`;
  }
  return 'mobile-shared';
}

/** Compatibility for the four temporary route URLs, without another learning screen. */
export function legacyTopicsHref(pathname: string, search: string): string {
  const params = new URLSearchParams(search);
  let roleId = 'go';
  if (pathname.includes('frontend-interview-roadmap')) roleId = `frontend-${params.get('framework') === 'vue' ? 'vue' : 'react'}`;
  if (pathname.includes('testing-interview-roadmap')) roleId = `testing-${params.get('language') === 'java' ? 'java' : 'python'}`;
  if (pathname.includes('mobile-interview-roadmap')) roleId = mobileRoleId({
    platform: params.get('platform') ?? 'shared', language: params.get('language') ?? undefined, host: params.get('host') ?? undefined,
  });
  const topic = params.get('topic');
  if (topic) params.set('guide', topic);
  for (const key of ['framework', 'language', 'platform', 'host', 'round', 'topic', 'domain']) params.delete(key);
  params.set('role', roleId);
  return `/topics?${params.toString()}`;
}
