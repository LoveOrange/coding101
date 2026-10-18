import {useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import {LAUNCH_ENDS, learnerActions, PLAN_LABELS, PLAN_PRICES, priceOf, type PurchasablePlan, today, useLearner} from '../store';
import {Dialog} from '../ui';
import {ClientPage} from '../ui/ClientOnly';
import styles from './Pricing.module.css';

// TODO(copy): the regular prices and the retention period still need confirming.
const PRO_FEATURES = ['包含免费版全部内容', '闪卡作答与要点核对', '面试自测模式', '薄弱点追踪与间隔复习', '阅读进度与全景进度图', '哪些公司考过这道题'];
const FREE_FEATURES = ['全部主题文章与知识树', '题库搜索', '闪卡题目与参考答案（只读）'];

type Tier = {
  id: string;
  name: string;
  tone: 'green' | 'accent' | 'dark';
  unit?: string;
  note: string;
  badge?: string;
  features: string[];
  action: string;
  plan?: PurchasablePlan;
};

const TIERS: Tier[] = [
  {id: 'free', name: '免费', tone: 'green', note: '按主题学习', features: FREE_FEATURES, action: '开始学习'},
  {id: 'month', name: 'Pro 月付', tone: 'accent', unit: ' / 月', note: '自动续费 · 可随时关闭', features: PRO_FEATURES, action: '月付', plan: 'monthly'},
  {id: 'sprint', name: '冲刺 · 3 个月', tone: 'green', note: '一次付清 · 90 天 · 不自动续费 · 适合一轮面试周期', features: ['Pro 全部功能', '可随时续一段'], action: '购买冲刺', plan: 'sprint'},
  {id: 'year', name: 'Pro 年付', tone: 'dark', badge: '5 折', unit: ' / 年', note: '自动续费', features: ['Pro 全部功能'], action: '年付', plan: 'yearly'},
];

export default function Pricing(): JSX.Element {
  return (
    <ClientPage title="Coding101 Pro" description="文章一直免费。Pro 记下每次作答的结果，并按时安排复习。" noFooter={false}>
      {() => <PricingPage />}
    </ClientPage>
  );
}

function PricingPage() {
  const learner = useLearner();
  const history = useHistory();
  const [pending, setPending] = useState<Tier | undefined>();
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const launch = today() <= LAUNCH_ENDS;
  const {customFields} = useDocusaurusContext().siteConfig;
  const checkoutOpen = Boolean(customFields?.checkoutOpen);
  const adFree = Boolean(customFields?.adsenseClient);

  const choose = (tier: Tier) => {
    if (!tier.plan) {
      history.push('/topics');
      return;
    }
    if (!learner.account) {
      history.push(`/account?next=${encodeURIComponent('/pricing')}`);
      return;
    }
    setFailed(false);
    setPending(tier);
  };

  const confirm = async () => {
    if (!pending?.plan) return;
    setBusy(true);
    try {
      await learnerActions.purchase(pending.plan);
    } catch {
      setFailed(true);
      setBusy(false);
    }
  };

  return (
    <main className={clsx(styles.page, styles.pageWide)}>
      <div className={styles.head}>
        <h1 className={styles.title}>Coding101 Pro</h1>
        <p className={styles.lead}>文章一直免费。Pro 会记下你每次作答的结果，并按时安排复习。</p>
        {launch && (
          <div className={styles.offer}>
            <span className={styles.offerBadge}>开业优惠</span>
            <span>开业价，2026 年 12 月 31 日前购买有效</span>
          </div>
        )}
      </div>

      <div className={clsx(styles.tiers, styles.tiersFour)}>
        {TIERS.map((tier) => (
          <div key={tier.id} className={clsx(styles.tier, tier.tone === 'dark' && styles.tierDark)}>
            <div className={styles.tierHead}>
              <span className={clsx(styles.tierName, styles[`tone_${tier.tone}`])}>
                <span>{tier.name}</span>
                {tier.badge && launch && <span className={styles.tierBadge}>{tier.badge}</span>}
              </span>
              <span className={clsx(styles.was, !(launch && tier.plan) && styles.wasHidden)}>
                {tier.plan ? `${PLAN_PRICES[tier.plan].regular}${tier.unit ?? ''}` : '—'}
              </span>
              <span className={styles.price}>
                {tier.plan ? priceOf(tier.plan) : '$0'}
                {tier.unit && <span className={styles.unit}>{tier.unit}</span>}
              </span>
              <span className={styles.note}>
                {tier.plan === 'yearly' && `约 $${(Number(priceOf('yearly').slice(1)) / 12).toFixed(2)} / 月 · `}
                {tier.note}
              </span>
            </div>
            <div className={styles.features}>
              {(adFree && tier.id === 'month' ? [...tier.features, '无广告'] : tier.features).map((feature) => (
                <span key={feature}>✓ {feature}</span>
              ))}
            </div>
            <button
              type="button"
              className={clsx(styles.action, styles[`action_${tier.tone}`])}
              disabled={Boolean(tier.plan) && !checkoutOpen}
              onClick={() => choose(tier)}>
              {tier.plan && !checkoutOpen ? '即将开通' : tier.action}
            </button>
          </div>
        ))}
      </div>

      <div className={styles.foot}>
        {!checkoutOpen && <span>在线支付即将开通，现在可以先免费试用 7 天，或用激活码开通 Pro</span>}
        <span>大陆用户可在小红书、抖音店铺购买激活码 · 到期后进度数据保留 90 天</span>
        <span>
          已有激活码？<Link to="/account/redeem">去兑换</Link>
        </span>
      </div>

      <Dialog open={Boolean(pending)} onClose={() => setPending(undefined)} width={480} labelledBy="checkout-title">
        <span id="checkout-title" className={styles.dialogTitle}>
          确认{pending?.plan ? PLAN_LABELS[pending.plan] : ''}
        </span>
        <span className={styles.dialogText}>
          {failed
            ? '暂时没能打开支付页，请稍后再试。'
            : '将前往 Lemon Squeezy 完成支付。支付成功后自动开通，可以在「订阅与账单」里查看记录或关闭续费。'}
        </span>
        <div className={styles.dialogActions}>
          <button type="button" className={styles.dialogPrimary} disabled={busy} onClick={() => void confirm()}>
            {busy ? '正在打开…' : `前往支付 ${pending?.plan ? priceOf(pending.plan) : ''}`}
          </button>
          <button type="button" className={styles.dialogSecondary} onClick={() => setPending(undefined)}>
            取消
          </button>
        </div>
      </Dialog>
    </main>
  );
}
