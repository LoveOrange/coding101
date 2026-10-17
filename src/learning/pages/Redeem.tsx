import {Fragment, useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

import {AccountLayout} from '../account/AccountParts';
import styles from '../account/account.module.css';
import {CODE_ALPHABET, learnerActions, PLAN_LABELS, type RedeemResult, useLearner} from '../store';
import {ClientPage} from '../ui/ClientOnly';

export default function Redeem(): JSX.Element {
  return <ClientPage title="兑换激活码">{() => <RedeemPage />}</ClientPage>;
}

const GROUPS = 4;
const GROUP_LENGTH = 4;

function clean(value: string) {
  return value
    .toUpperCase()
    .split('')
    .filter((char) => CODE_ALPHABET.includes(char))
    .join('');
}

function maskCode(code: string) {
  const parts = code.split('-');
  return parts.length === 4 ? `${parts[0]}-····-····-${parts[3]}` : code;
}

function useCountdown(until?: string) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!until) return undefined;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [until]);
  return until ? Math.max(0, new Date(until).getTime() - now) : 0;
}

function RedeemPage() {
  const learner = useLearner();
  const [groups, setGroups] = useState<string[]>(['', '', '', '']);
  const [state, setState] = useState<'idle' | 'checking'>('idle');
  const [result, setResult] = useState<RedeemResult | undefined>();
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const lockedUntil = result?.status === 'locked' ? result.until : undefined;
  const lockLeft = useCountdown(lockedUntil);
  const locked = lockLeft > 0;
  const code = groups.join('');
  const complete = code.length === GROUPS * GROUP_LENGTH;
  const sub = learner.subscription;

  const fill = (start: number, value: string) => {
    const chars = clean(value);
    const next = [...groups];
    let position = start * GROUP_LENGTH;
    const flat = next.join('').padEnd(GROUPS * GROUP_LENGTH, ' ').split('');
    for (const char of chars) {
      if (position >= flat.length) break;
      flat[position] = char;
      position += 1;
    }
    // A single group edit replaces that group only.
    if (chars.length <= GROUP_LENGTH) {
      next[start] = chars.slice(0, GROUP_LENGTH);
      setGroups(next);
      if (chars.length === GROUP_LENGTH) inputs.current[start + 1]?.focus();
      return;
    }
    const joined = flat.join('').replace(/ /g, '');
    setGroups(Array.from({length: GROUPS}, (_, i) => joined.slice(i * GROUP_LENGTH, (i + 1) * GROUP_LENGTH)));
    inputs.current[Math.min(GROUPS - 1, Math.floor((position - 1) / GROUP_LENGTH))]?.focus();
  };

  useEffect(() => {
    learnerActions.loadBilling().catch(() => undefined);
  }, []);

  const submit = async () => {
    if (!complete || locked) return;
    setState('checking');
    setResult(undefined);
    setResult(await learnerActions.redeem(code));
    setState('idle');
  };

  const error =
    result?.status === 'not-found'
      ? '没有找到这个激活码，请核对后重试'
      : result?.status === 'used'
        ? `这个激活码已在 ${result.date} 兑换到你的账户`
        : result?.status === 'expired'
          ? `这个激活码已于 ${result.date} 过期`
          : locked
            ? `尝试次数过多，${new Date(lockedUntil!).toLocaleTimeString('zh-CN', {hour: '2-digit', minute: '2-digit'})} 后可再试`
            : result?.status === 'error'
              ? '暂时没能兑换，请稍后再试'
              : undefined;
  const hint =
    result?.status === 'not-found'
      ? '检查易混字符：0/O、1/I 不会出现在激活码中。'
      : result?.status === 'expired'
        ? '激活码自售出起 12 个月内有效。'
        : locked
          ? '连续错 5 次后锁 15 分钟，倒计时结束自动解锁。'
          : '支持直接粘贴，横线会自动补上';

  const records = learner.billing.filter((record) => record.method === 'code');
  const current =
    sub.status === 'pro'
      ? `当前：${PLAN_LABELS[sub.plan]}，有效期至 ${sub.endsAt}。兑换后在此日期上顺延。`
      : sub.status === 'trial'
        ? `当前：试用中，${sub.endsAt} 结束。兑换后从今天起算，试用剩余天数不叠加。`
        : sub.status === 'expired'
          ? `当前：已于 ${sub.endedAt} 到期。兑换后从今天起算，数据立即恢复可编辑。`
          : '当前：免费版。兑换后从今天起算。';

  return (
    <AccountLayout active="redeem">
      <div className={styles.heading}>
        <h1 className={styles.pageTitle}>兑换激活码</h1>
        <span className={styles.muted}>{current}</span>
      </div>

      {result?.status === 'ok' ? (
        <div className={styles.success}>
          <div className={styles.successHead}>
            <span className={styles.successMark}>✓</span>
            <span className={styles.successText}>
              <span className={styles.successLabel}>兑换成功</span>
              <span className={styles.successTitle}>Pro · {result.days} 天已生效</span>
              <span className={styles.successCode}>{result.code}</span>
            </span>
          </div>
          <div className={styles.dates}>
            <span className={styles.dateCol}>
              <span className={styles.muted}>{result.previousEnd ? '原到期日' : '开始日期'}</span>
              <b>{result.previousEnd ?? '今天'}</b>
            </span>
            <span className={styles.arrow}>→</span>
            <span className={styles.dateCol}>
              <span className={styles.muted}>新到期日</span>
              <b className={styles.green}>{result.endsAt}</b>
            </span>
          </div>
          <div className={styles.successActions}>
            <Link className={styles.primaryWide} to="/progress">
              {result.wasReadonly ? '回到我的进度' : '去今天的复习'}
            </Link>
            <button
              type="button"
              className={styles.textButton}
              onClick={() => {
                setResult(undefined);
                setGroups(['', '', '', '']);
              }}>
              再兑换一个
            </button>
          </div>
        </div>
      ) : (
        <form
          className={styles.redeemForm}
          onSubmit={(event) => {
            event.preventDefault();
            void submit();
          }}>
          <div className={styles.codeRow}>
            {groups.map((group, i) => (
              <Fragment key={i}>
                {i > 0 && <span className={styles.dash}>–</span>}
                <input
                  ref={(element) => {
                    inputs.current[i] = element;
                  }}
                  aria-label={`激活码第 ${i + 1} 组`}
                  className={clsx(styles.codeInput, error && styles.codeError, state === 'checking' && styles.codeLocked)}
                  value={group}
                  disabled={state === 'checking' || locked}
                  maxLength={GROUPS * GROUP_LENGTH + 3}
                  autoComplete="off"
                  spellCheck={false}
                  onChange={(event) => fill(i, event.target.value)}
                  onPaste={(event) => {
                    event.preventDefault();
                    fill(i, event.clipboardData.getData('text'));
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Backspace' && !group && i > 0) inputs.current[i - 1]?.focus();
                  }}
                />
              </Fragment>
            ))}
          </div>
          {error && (
            <span className={styles.error} role="alert">
              <b>!</b>
              {error}
              {result?.status === 'used' && <Link to="/account/billing">查看记录</Link>}
            </span>
          )}
          <span className={styles.muted}>{hint}</span>
          <button
            type="submit"
            className={clsx(styles.primaryWide, state === 'checking' && styles.checking)}
            disabled={!complete || locked || state === 'checking'}>
            {state === 'checking' ? '正在兑换…' : '兑换'}
          </button>
        </form>
      )}

      <section className={styles.records} aria-labelledby="records-title">
        <div className={styles.recordsHead}>
          <h2 id="records-title" className={styles.sectionTitle}>
            兑换记录
          </h2>
          <Link to="/account/billing">全部账单 →</Link>
        </div>
        <div className={clsx(styles.tableRow, styles.tableHead, styles.redeemCols)}>
          <span>日期</span>
          <span>激活码</span>
          <span>类型</span>
          <span>效果</span>
        </div>
        {records.map((record) => (
          <div key={record.id} className={clsx(styles.tableRow, styles.redeemCols)}>
            <span className={styles.mono}>{record.date}</span>
            <span className={styles.monoInk}>{record.code ? maskCode(record.code) : '—'}</span>
            <span>{record.item.replace('激活码', '')}</span>
            <span className={styles.green}>{record.effect}</span>
          </div>
        ))}
        {!records.length && <p className={styles.muted}>还没有兑换记录。</p>}
      </section>
    </AccountLayout>
  );
}
