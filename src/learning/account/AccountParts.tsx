import {type ReactNode, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useHistory, useLocation} from '@docusaurus/router';

import {ApiError} from '../api';
import {daysBetween, isOffline, learnerActions, PLAN_LABELS, priceOf, today, useLearner} from '../store';
import type {Subscription} from '../types';
import {Dialog, formatDate} from '../ui';
import styles from './account.module.css';

type Section = 'profile' | 'billing' | 'redeem' | 'preferences' | 'privacy';

const NAV: {id: Section; label: string; href?: string}[] = [
  {id: 'profile', label: '个人资料'},
  {id: 'billing', label: '订阅与账单', href: '/account/billing'},
  {id: 'redeem', label: '兑换激活码', href: '/account/redeem'},
  {id: 'preferences', label: '学习偏好', href: '/account'},
  {id: 'privacy', label: '数据与隐私'},
];

export function AccountLayout({active, children}: {active: Section; children: ReactNode}) {
  const learner = useLearner();
  const history = useHistory();
  if (!learner.account) return <SignIn />;
  const initial = learner.account.name.slice(0, 1);
  return (
    <main className={styles.page}>
      <aside className={styles.side}>
        <div className={styles.who}>
          <span className={styles.avatar}>{initial}</span>
          <span className={styles.whoText}>
            <span className={styles.name}>{learner.account.name}</span>
            <span className={styles.email}>{learner.account.email}</span>
          </span>
        </div>
        <nav className={styles.nav} aria-label="账户">
          {NAV.map((item) =>
            item.href ? (
              <Link key={item.id} to={item.href} className={clsx(styles.navItem, active === item.id && styles.navOn)} aria-current={active === item.id ? 'page' : undefined}>
                {item.label}
              </Link>
            ) : (
              <span key={item.id} className={clsx(styles.navItem, styles.navDisabled)} title="原型阶段暂未提供">
                {item.label}
              </span>
            ),
          )}
        </nav>
        <button
          type="button"
          className={styles.signOut}
          onClick={() => {
            void learnerActions.signOut().then(() => history.push('/'));
          }}>
          退出登录
        </button>
      </aside>
      <div className={styles.content}>{children}</div>
    </main>
  );
}

const MIN_PASSWORD = 8;

function signInError(error: unknown, mode: 'signIn' | 'signUp'): string {
  if (!(error instanceof ApiError)) return '暂时连不上账户服务，请稍后再试。';
  if (mode === 'signIn' && error.status === 401) return '邮箱或密码不正确。';
  if (mode === 'signUp' && error.status === 422) return '这个邮箱已经注册，请直接登录。';
  if (error.status === 429) return '尝试太频繁，请稍后再试。';
  return '没能完成，请检查后重试。';
}

/** Sign in or sign up with email and password; a new account starts the 7-day trial. */
function SignIn() {
  const history = useHistory();
  const next = new URLSearchParams(useLocation().search).get('next');
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const offline = isOffline();
  const valid = /^\S+@\S+\.\S+$/.test(email) && (offline || password.length >= MIN_PASSWORD);
  const signUp = mode === 'signUp';

  const submit = async () => {
    if (!valid || busy) return;
    setBusy(true);
    setError(undefined);
    try {
      if (signUp) await learnerActions.signUp(email, password, name.trim() || email.split('@')[0]);
      else await learnerActions.signIn(email, password);
      if (next?.startsWith('/')) history.push(next);
    } catch (caught) {
      setError(signInError(caught, mode));
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className={styles.signInPage}>
      <form
        className={styles.signIn}
        onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}>
        <span className={styles.signInTitle}>{signUp ? '注册 Coding101' : '登录 Coding101'}</span>
        <span className={styles.signInText}>文章全文免费阅读，无需登录。注册即 7 天完整 Pro，不绑卡。</span>
        <label className={styles.field}>
          <span>邮箱</span>
          <input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
        </label>
        {!offline && (
          <label className={styles.field}>
            <span>密码{signUp ? `（至少 ${MIN_PASSWORD} 位）` : ''}</span>
            <input
              type="password"
              required
              minLength={MIN_PASSWORD}
              autoComplete={signUp ? 'new-password' : 'current-password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        )}
        {(signUp || offline) && (
          <label className={styles.field}>
            <span>称呼（可选）</span>
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="林同学" />
          </label>
        )}
        {error && (
          <span className={styles.error} role="alert">
            <b>!</b>
            {error}
          </span>
        )}
        <button type="submit" className={styles.primaryWide} disabled={!valid || busy}>
          {busy ? '请稍候…' : signUp ? '注册并开始试用' : '登录'}
        </button>
        {offline ? (
          <span className={styles.signInNote}>预览模式：账户只保存在当前浏览器。</span>
        ) : (
          <button
            type="button"
            className={styles.textButton}
            onClick={() => {
              setMode(signUp ? 'signIn' : 'signUp');
              setError(undefined);
            }}>
            {signUp ? '已有账户？去登录' : '还没有账户？注册'}
          </button>
        )}
      </form>
    </main>
  );
}

/* ---- Subscription card (07s) ---- */

function Tag({tone, children}: {tone: 'mute' | 'green' | 'accent' | 'danger' | 'expired'; children: ReactNode}) {
  return <span className={clsx(styles.tag, styles[`tag_${tone}`])}>{children}</span>;
}

export function SubscriptionCard({variant = 'account'}: {variant?: 'account' | 'billing'}) {
  const learner = useLearner();
  const sub = learner.subscription;
  const [dialog, setDialog] = useState<'renew' | 'payment' | undefined>();
  const [failed, setFailed] = useState(false);
  const price = (s: Extract<Subscription, {status: 'pro'}>) =>
    s.plan === 'monthly' || s.plan === 'yearly' ? priceOf(s.plan) : '';
  const act = (action: () => Promise<void>) => {
    setFailed(false);
    void action().catch(() => setFailed(true));
  };
  const day = today();

  let card: ReactNode;
  if (sub.status === 'free') {
    card = (
      <div className={styles.subLight}>
        <Tag tone="mute">免费</Tag>
        <span className={styles.subTitle}>免费版</span>
        <span className={styles.subText}>文章和面试题可读。复习、进度、闪卡库需要 Pro。</span>
        <div className={styles.subActions}>
          <Link className={styles.btnAccent} to="/pricing">
            升级 Pro
          </Link>
          <Link className={styles.btnOutline} to="/account/redeem">
            兑换激活码
          </Link>
        </div>
      </div>
    );
  } else if (sub.status === 'trial') {
    card = (
      <div className={styles.subLight}>
        <Tag tone="green">试用</Tag>
        <span className={styles.subTitle}>试用中 · 还剩 {Math.max(0, daysBetween(day, sub.endsAt))} 天</span>
        <span className={styles.subText}>{sub.endsAt} 结束，不会自动扣费。结束后进入只读。</span>
        <div className={styles.subActions}>
          <Link className={styles.btnAccent} to="/pricing">
            现在订阅
          </Link>
          <Link className={styles.btnOutline} to="/account/redeem">
            兑换激活码
          </Link>
        </div>
      </div>
    );
  } else if (sub.status === 'expired') {
    card = (
      <div className={styles.subLight}>
        <Tag tone="expired">已到期</Tag>
        <span className={styles.subTitle}>{sub.endedAt} 已到期 · 只读</span>
        <span className={styles.subText}>
          进度和卡片状态保留到 {sub.retainUntil}（剩 {Math.max(0, daysBetween(day, sub.retainUntil))} 天），期间续费即恢复。
        </span>
        <div className={styles.subActions}>
          <Link className={styles.btnAccent} to="/pricing">
            续费
          </Link>
          <Link className={styles.btnOutline} to="/account/redeem">
            兑换激活码
          </Link>
        </div>
      </div>
    );
  } else if (sub.renewalFailedAt) {
    card = (
      <div className={styles.subLight}>
        <Tag tone="danger">续费失败</Tag>
        <span className={styles.subTitle}>{sub.renewalFailedAt} 扣款未成功</span>
        <span className={styles.subText}>保留 3 天宽限期，Pro 功能照常；宽限期内未补付则进入只读。</span>
        <div className={styles.subActions}>
          <button type="button" className={styles.btnAccent} onClick={() => setDialog('payment')}>
            更新支付方式
          </button>
          <button type="button" className={styles.btnOutline} onClick={() => setDialog('payment')}>
            重试扣款
          </button>
        </div>
      </div>
    );
  } else {
    const renewable = sub.plan === 'monthly' || sub.plan === 'yearly';
    card = (
      <div className={styles.subDark}>
        <div className={styles.subMain}>
          <span className={styles.subTagRow}>
            <Tag tone="accent">PRO</Tag>
            <span className={styles.subPlan}>{PLAN_LABELS[sub.plan].replace('Pro ', '')}</span>
          </span>
          <span className={styles.subTitle}>有效期至 {formatDate(sub.endsAt)}</span>
          <span className={styles.subTextInverse}>
            {!renewable
              ? '到期不自动扣费，可以随时兑换激活码或续一段。'
              : sub.autoRenew
                ? `到期按 ${price(sub)} 续费，可随时关闭`
                : '已关闭自动续费，到期后不再扣费。'}
          </span>
        </div>
        <div className={styles.subActionsInverse}>
          {variant === 'account' ? (
            <Link className={styles.btnGhost} to="/account/billing">
              账单记录
            </Link>
          ) : (
            renewable && (
              <button type="button" className={styles.btnGhost} onClick={() => setDialog('payment')}>
                更换支付方式
              </button>
            )
          )}
          {renewable &&
            (sub.autoRenew ? (
              <button
                type="button"
                className={variant === 'billing' ? styles.btnPaper : styles.btnGhost}
                onClick={() => setDialog('renew')}>
                关闭自动续费
              </button>
            ) : (
              <button type="button" className={styles.btnPaper} onClick={() => act(() => learnerActions.setAutoRenew(true))}>
                重新开启续费
              </button>
            ))}
          {!renewable && (
            <Link className={styles.btnGhost} to="/account/redeem">
              兑换激活码
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {card}
      {failed && (
        <span className={styles.error} role="alert">
          <b>!</b>暂时没能完成操作，请稍后再试。
        </span>
      )}
      <Dialog open={dialog === 'renew'} onClose={() => setDialog(undefined)} labelledBy="renew-title">
        <span id="renew-title" className={styles.dialogTitle}>
          关闭自动续费？
        </span>
        <div className={styles.dialogText}>
          {sub.status === 'pro' && (
            <span>
              Pro 仍可用到 <b>{sub.endsAt}</b>，之后不再扣费。
            </span>
          )}
          <span>到期后进度和卡片状态保留 90 天，只读；期间续费或兑换激活码即恢复。</span>
        </div>
        <div className={styles.dialogActions}>
          <button type="button" className={styles.btnGreen} onClick={() => setDialog(undefined)}>
            保留续费
          </button>
          <button
            type="button"
            className={styles.btnOutlineMuted}
            onClick={() => {
              act(() => learnerActions.setAutoRenew(false));
              setDialog(undefined);
            }}>
            确认关闭
          </button>
        </div>
      </Dialog>
      <Dialog open={dialog === 'payment'} onClose={() => setDialog(undefined)} labelledBy="payment-title">
        <span id="payment-title" className={styles.dialogTitle}>
          支付方式
        </span>
        <span className={styles.dialogText}>支付方式、发票和重试扣款在 Lemon Squeezy 的账单页管理，处理完回到这里即可。</span>
        <div className={styles.dialogActions}>
          <button
            type="button"
            className={styles.btnGreen}
            onClick={() => {
              act(() => learnerActions.openPortal());
              setDialog(undefined);
            }}>
            打开账单页
          </button>
          <button type="button" className={styles.btnOutlineMuted} onClick={() => setDialog(undefined)}>
            取消
          </button>
        </div>
      </Dialog>
    </>
  );
}
