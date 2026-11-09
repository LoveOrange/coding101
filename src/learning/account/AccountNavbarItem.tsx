import clsx from 'clsx';
import Link from '@site/src/i18n/LocalizedLink';
import {translate} from '@docusaurus/Translate';
import useIsBrowser from '@docusaurus/useIsBrowser';

import {useLearner} from '../store';

/** Navbar account entry: 登录 for guests, avatar and plan badge otherwise. */
export function AccountNavbarItem({mobile}: {mobile?: boolean}) {
  const isBrowser = useIsBrowser();
  const learner = useLearner();
  const account = isBrowser ? learner.account : undefined;
  const sub = learner.subscription;

  if (mobile) {
    return (
      <li className="menu__list-item">
        <Link className="menu__link" to="/account">
          {account ? translate({message: '账户 · {name}'}, {name: account.name}) : translate({message: '登录'})}
        </Link>
      </li>
    );
  }
  if (!account) {
    return (
      <Link className="c101-signin" to="/account">
        {translate({message: '登录'})}
      </Link>
    );
  }
  const badge =
    sub.status === 'pro'
      ? {label: 'PRO', tone: sub.renewalFailedAt ? 'warn' : 'pro'}
      : sub.status === 'trial'
        ? {label: translate({message: '试用'}), tone: 'trial'}
        : sub.status === 'expired'
          ? {label: translate({message: 'PRO 已到期'}), tone: 'expired'}
          : undefined;
  return (
    <Link className="c101-account" to="/account" aria-label={translate({message: '账户'})}>
      <span className="c101-account__avatar">{account.name.slice(0, 1)}</span>
      {badge && <span className={clsx('c101-account__badge', `c101-account__badge--${badge.tone}`)}>{badge.label}</span>}
    </Link>
  );
}
