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
          账户保存你的邮箱、登录会话、试用与激活码记录，以及卡片复习状态、阅读进度、学习会话、偏好和模拟测试设置。Pro 或试用到期后，学习记录只读保留 90 天，期满后由每日清理任务删除。日志、邮件正文预览和数据库恢复历史的保存期限详见
          <a href="/privacy/">隐私与 Cookie</a>。
        </p>
        <p className={styles.muted}>
          查询或导出账号数据和学习记录，请发送邮件至
          <a href="mailto:privacy@linsama.com">privacy@linsama.com</a>，由运营者 Linsama 本人处理，并在收到申请后 30 天内答复。处理前可能需要核验邮箱归属，目前没有自助导出功能。
        </p>
        <div className={styles.prefRow}>
          <span className={styles.prefLabel}>删除账号</span>
          <span>删除账号及服务端学习记录，剩余权益作废。保留项见删除确认说明。</span>
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
          <span>删除成功后，账号、会话、权益和学习记录从业务数据库移除。剩余权益作废，不能通过重新注册恢复。</span>
          <span>已用激活码解除账号关联，仍不可复用。用过试用或 Pro 的邮箱保留带密钥哈希值（HMAC）以防止重复试用，未设自动到期时间。</span>
          <span>日志、邮件正文预览和数据库恢复历史按<a href="/privacy/">隐私说明</a>中的期限保留。</span>
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
