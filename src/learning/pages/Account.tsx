import {useState} from 'react';

import {AccountLayout, SubscriptionCard} from '../account/AccountParts';
import styles from '../account/account.module.css';
import {useLearningIndex} from '../content';
import {learnerActions, useLearner} from '../store';
import {formatDate} from '../ui';
import {ClientPage} from '../ui/ClientOnly';

const LIMITS = [10, 20, 30, 50];

export default function Account(): JSX.Element {
  return <ClientPage title="账户">{() => <AccountPage />}</ClientPage>;
}

type Field = 'role' | 'date' | 'limit';

function AccountPage() {
  const index = useLearningIndex();
  const learner = useLearner();
  const [editing, setEditing] = useState<Field | undefined>();
  const prefs = learner.preferences;
  const role = index.roles.find((item) => item.id === prefs.roleId);

  const row = (field: Field, label: string, value: string, editor: JSX.Element) => (
    <div className={styles.prefRow}>
      <span className={styles.prefLabel}>{label}</span>
      {editing === field ? editor : <span>{value}</span>}
      <button type="button" className={styles.prefEdit} onClick={() => setEditing(editing === field ? undefined : field)}>
        {editing === field ? '完成' : '修改'}
      </button>
    </div>
  );

  return (
    <AccountLayout active="preferences">
      <SubscriptionCard />
      <section className={styles.prefs} aria-labelledby="prefs-title">
        <h1 id="prefs-title" className={styles.sectionTitle}>
          学习偏好
        </h1>
        {row(
          'role',
          '目标岗位',
          role?.label ?? '全部领域',
          <select
            className={styles.input}
            value={prefs.roleId ?? ''}
            onChange={(event) => learnerActions.setPreferences({roleId: event.target.value || undefined})}>
            {index.roles.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
            <option value="">全部领域</option>
          </select>,
        )}
        {row(
          'date',
          '面试日期',
          prefs.interviewDate ? formatDate(prefs.interviewDate) : '未设置',
          <input
            className={styles.input}
            type="date"
            value={prefs.interviewDate ?? ''}
            onChange={(event) => learnerActions.setPreferences({interviewDate: event.target.value || undefined})}
          />,
        )}
        {row(
          'limit',
          '每天最多复习',
          `${prefs.dailyLimit} 张卡`,
          <select
            className={styles.input}
            value={prefs.dailyLimit}
            onChange={(event) => learnerActions.setPreferences({dailyLimit: Number(event.target.value)})}>
            {LIMITS.map((limit) => (
              <option key={limit} value={limit}>
                {limit} 张卡
              </option>
            ))}
          </select>,
        )}
      </section>
    </AccountLayout>
  );
}
