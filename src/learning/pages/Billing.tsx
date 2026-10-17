import {useEffect, useState} from 'react';
import clsx from 'clsx';

import {AccountLayout, SubscriptionCard} from '../account/AccountParts';
import styles from '../account/account.module.css';
import {learnerActions, useLearner} from '../store';
import type {BillingRecord} from '../types';
import {ClientPage} from '../ui/ClientOnly';

export default function Billing(): JSX.Element {
  return <ClientPage title="订阅与账单">{() => <BillingPage />}</ClientPage>;
}

const METHOD: Record<BillingRecord['method'], string> = {code: '激活码', card: 'Lemon Squeezy'};
const STATUS: Record<BillingRecord['status'], string> = {paid: '已支付', refunded: '已退款', applied: ''};

function BillingPage() {
  const learner = useLearner();
  const paid = learner.billing.some((record) => record.method !== 'code');
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    learnerActions.loadBilling().catch(() => setFailed(true));
  }, []);
  const portal = () => {
    learnerActions.openPortal().catch(() => setFailed(true));
  };

  return (
    <AccountLayout active="billing">
      <SubscriptionCard variant="billing" />
      <section className={styles.records} aria-labelledby="billing-title">
        <div className={styles.recordsHead}>
          <h1 id="billing-title" className={styles.sectionTitle}>
            账单记录
          </h1>
          {paid ? (
            <button type="button" className={styles.textButton} onClick={portal}>
              支付方式与发票 →
            </button>
          ) : (
            <span className={styles.muted}>支付方式：未绑定</span>
          )}
        </div>
        <div className={clsx(styles.tableRow, styles.tableHead, styles.billingCols)}>
          <span>日期</span>
          <span>项目</span>
          <span>方式</span>
          <span>金额</span>
          <span>状态</span>
          <span />
        </div>
        {learner.billing.map((record) => (
          <div key={record.id} className={clsx(styles.tableRow, styles.billingCols)}>
            <span className={styles.mono}>{record.date}</span>
            <span>
              {record.item}
              {record.code ? ` · ${record.code.slice(0, 4)}-···-${record.code.slice(-4)}` : ''}
            </span>
            <span className={styles.muted}>{METHOD[record.method]}</span>
            <span>{record.amount ?? '—'}</span>
            <span className={record.status === 'applied' ? styles.green : record.status === 'refunded' ? styles.muted : undefined}>
              {record.status === 'applied' ? record.effect : STATUS[record.status]}
            </span>
            {record.method === 'code' ? (
              <span />
            ) : (
              <button type="button" className={clsx(styles.invoice, styles.textButton)} onClick={portal}>
                发票
              </button>
            )}
          </div>
        ))}
        {failed && <p className={styles.muted}>账单暂时没能加载，请稍后刷新。</p>}
        {!failed && !learner.billing.length && <p className={styles.muted}>还没有账单。订阅或兑换激活码后会出现在这里。</p>}
      </section>
    </AccountLayout>
  );
}
