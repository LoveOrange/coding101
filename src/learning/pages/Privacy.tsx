import {useState} from 'react';
import {useHistory} from '@docusaurus/router';

import {AccountLayout} from '../account/AccountParts';
import styles from '../account/account.module.css';
import {ApiError} from '../api';
import {learnerActions, useLearner} from '../store';
import {Dialog} from '../ui';
import {ClientPage} from '../ui/ClientOnly';

export default function Privacy(): JSX.Element {
  return <ClientPage title="数据与隐私">{() => <PrivacyPage />}</ClientPage>;
}

function PrivacyPage() {
  const learner = useLearner();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<'renewal' | 'failed' | undefined>();
  const email = learner.account?.email ?? '';

  const close = () => {
    setOpen(false);
    setTyped('');
  };
  const remove = async () => {
    setBusy(true);
    setError(undefined);
    try {
      await learnerActions.deleteAccount();
      history.push('/');
    } catch (err) {
      setError(err instanceof ApiError && err.code === 'subscription_active' ? 'renewal' : 'failed');
      close();
    } finally {
      setBusy(false);
    }
  };

  return (
    <AccountLayout active="privacy">
      <section className={styles.prefs} aria-labelledby="privacy-title">
        <h1 id="privacy-title" className={styles.sectionTitle}>
          数据与隐私
        </h1>
        <p className={styles.muted}>
          账户保存你的邮箱、登录会话、试用与激活码记录，以及卡片复习状态、阅读进度和学习偏好。Pro 到期后，学习记录只读保留 90 天，期满自动删除。详见
          <a href="/privacy/">隐私与 Cookie</a>。
        </p>
        <div className={styles.prefRow}>
          <span className={styles.prefLabel}>删除账号</span>
          <span>立即删除账号和全部学习记录，无法恢复。</span>
          <button type="button" className={styles.prefEdit} onClick={() => setOpen(true)}>
            删除
          </button>
        </div>
        {error && (
          <span className={styles.error} role="alert">
            <b>!</b>
            {error === 'renewal' ? (
              <span>
                请先在<a href="/account/billing">订阅与账单</a>关闭自动续费，再删除账号。
              </span>
            ) : (
              '暂时没能删除账号，请稍后再试。'
            )}
          </span>
        )}
      </section>
      <Dialog open={open} onClose={close} labelledBy="delete-title">
        <span id="delete-title" className={styles.dialogTitle}>
          删除账号？
        </span>
        <div className={styles.dialogText}>
          <span>账号、复习进度和激活码兑换记录都会被删除，剩余的 Pro 天数也会作废。</span>
          <span>
            输入 <b>{email}</b> 确认：
          </span>
          <input
            className={styles.input}
            type="email"
            value={typed}
            onChange={(event) => setTyped(event.target.value)}
            aria-label="输入邮箱确认"
          />
        </div>
        <div className={styles.dialogActions}>
          <button type="button" className={styles.btnGreen} onClick={close}>
            取消
          </button>
          <button
            type="button"
            className={styles.btnOutlineMuted}
            disabled={busy || typed.trim().toLowerCase() !== email.toLowerCase()}
            onClick={() => void remove()}>
            {busy ? '正在删除…' : '确认删除'}
          </button>
        </div>
      </Dialog>
    </AccountLayout>
  );
}
