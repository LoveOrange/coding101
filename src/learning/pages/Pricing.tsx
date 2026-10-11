import {useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';

import {learnerActions, PLAN_LABELS, useLearner} from '../store';
import type {Plan, Region} from '../types';
import {Dialog} from '../ui';
import {ClientPage} from '../ui/ClientOnly';
import styles from './Pricing.module.css';

// TODO(copy): plans, prices, the launch offer and retention period come from
// the design draft and are not confirmed.
const PRO_FEATURES = ['包含免费版全部内容', '闪卡作答与要点核对', '面试自测模式', '薄弱点追踪与间隔复习', '阅读进度与全景进度图'];
const FREE_FEATURES = ['全部主题文章与知识树', '题库搜索', '闪卡题目与参考答案（只读）'];

type Tier = {
  id: string;
  name: string;
  tone: 'green' | 'accent' | 'dark';
  was?: string;
  price: string;
  unit?: string;
  note: string;
  badge?: string;
  features: string[];
  action: string;
  plan?: Plan;
  kind: 'free' | 'code' | 'checkout';
};

const TIERS: Record<Region, Tier[]> = {
  cn: [
    {id: 'free', name: '免费', tone: 'green', price: '¥0', note: '按主题学习', features: FREE_FEATURES, action: '开始学习', kind: 'free'},
    {id: 'month', name: 'Pro 月卡', tone: 'accent', price: '¥9.9', unit: ' / 月', note: '30 天 · 激活码', features: PRO_FEATURES, action: '购买月卡激活码', plan: 'code-monthly', kind: 'code'},
    {id: 'year', name: 'Pro 年卡', tone: 'dark', badge: '省 ¥19.8', price: '¥99', unit: ' / 年', note: '365 天 · 约 ¥8.25 / 月', features: ['月卡的全部功能'], action: '购买年卡激活码', plan: 'code-yearly', kind: 'code'},
  ],
  intl: [
    {id: 'free', name: '免费', tone: 'green', price: '$0', note: '按主题学习', features: FREE_FEATURES, action: '开始学习', kind: 'free'},
    {id: 'month', name: 'Pro 月付', tone: 'accent', was: '$7.9 / 月', price: '$3.9', unit: ' / 月', note: '首年开业价，之后 $7.9 / 月 · 自动续费', features: PRO_FEATURES, action: '月付', plan: 'monthly', kind: 'checkout'},
    {id: 'pass', name: '求职通行证', tone: 'green', price: '$19', unit: ' / 3 个月', note: '一次付清 · 不自动续费 · 适合一轮面试周期', features: ['Pro 全部功能', '到期前 7 天邮件提醒', '可随时续一段'], action: '购买通行证', plan: 'pass', kind: 'checkout'},
    {id: 'year', name: 'Pro 年付', tone: 'dark', badge: '5 折', was: '$59 / 年', price: '$29', unit: ' / 年', note: '约 $2.42 / 月 · 首年开业价，续费 $59 / 年', features: ['Pro 全部功能', '续费前 7 天邮件提醒'], action: '年付', plan: 'yearly', kind: 'checkout'},
  ],
};

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
  const region = learner.region;
  const [pending, setPending] = useState<Tier | undefined>();
  const tiers = TIERS[region];

  const choose = (tier: Tier) => {
    if (tier.kind === 'free') {
      history.push('/topics');
      return;
    }
    if (!learner.account) {
      history.push(`/account?next=${encodeURIComponent('/pricing')}`);
      return;
    }
    setPending(tier);
  };

  const confirm = () => {
    if (pending?.plan) learnerActions.purchase(pending.plan);
    setPending(undefined);
    history.push('/account/billing');
  };

  return (
    <main className={clsx(styles.page, region === 'intl' && styles.pageWide)}>
      <div className={styles.head}>
        <h1 className={styles.title}>Coding101 Pro</h1>
        <p className={styles.lead}>
          文章一直免费。Pro 会记下你每次作答的结果，并按时安排复习。{region === 'cn' ? '大陆版通过激活码开通。' : ''}
        </p>
        {region === 'intl' && (
          <div className={styles.offer}>
            <span className={styles.offerBadge}>开业优惠</span>
            <span>首年 5 折，2026 年 12 月 31 日前订阅有效</span>
          </div>
        )}
        <div className={styles.regions} role="group" aria-label="地区">
          {(['cn', 'intl'] as Region[]).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={region === item}
              className={clsx(styles.region, region === item && styles.regionOn)}
              onClick={() => learnerActions.setRegion(item)}>
              {item === 'cn' ? '大陆版' : '海外版'}
            </button>
          ))}
        </div>
      </div>

      <div className={clsx(styles.tiers, region === 'intl' && styles.tiersFour)}>
        {tiers.map((tier) => (
          <div key={tier.id} className={clsx(styles.tier, tier.tone === 'dark' && styles.tierDark)}>
            <div className={styles.tierHead}>
              <span className={clsx(styles.tierName, styles[`tone_${tier.tone}`])}>
                <span>{tier.name}</span>
                {tier.badge && <span className={styles.tierBadge}>{tier.badge}</span>}
              </span>
              {region === 'intl' && <span className={clsx(styles.was, !tier.was && styles.wasHidden)}>{tier.was ?? '—'}</span>}
              <span className={styles.price}>
                {tier.price}
                {tier.unit && <span className={styles.unit}>{tier.unit}</span>}
              </span>
              <span className={styles.note}>{tier.note}</span>
            </div>
            <div className={styles.features}>
              {tier.features.map((feature) => (
                <span key={feature}>✓ {feature}</span>
              ))}
            </div>
            <button type="button" className={clsx(styles.action, styles[`action_${tier.tone}`])} onClick={() => choose(tier)}>
              {tier.action}
            </button>
          </div>
        ))}
      </div>

      <div className={styles.foot}>
        <span>
          {region === 'cn'
            ? '激活码在小红书、抖音店铺售卖 · 到期不自动扣费 · 到期后进度数据保留 90 天'
            : '开业价仅限首个计费周期 · 随时取消 · 取消后进度数据保留 90 天'}
        </span>
        <span>
          已有激活码？<Link to="/account/redeem">去兑换</Link>
        </span>
      </div>

      <Dialog open={Boolean(pending)} onClose={() => setPending(undefined)} width={480} labelledBy="checkout-title">
        <span id="checkout-title" className={styles.dialogTitle}>
          {pending?.kind === 'code' ? '购买激活码' : `确认${pending ? PLAN_LABELS[pending.plan!] : ''}`}
        </span>
        <span className={styles.dialogText}>
          {pending?.kind === 'code'
            ? '激活码在小红书、抖音店铺售卖，店铺链接上线后会放在这里。拿到激活码后，在账户里兑换即可开通。'
            : '原型模式：不会真实扣款。确认后直接开通，可以在「订阅与账单」里查看记录或关闭续费。'}
        </span>
        <div className={styles.dialogActions}>
          {pending?.kind === 'code' ? (
            <Link className={styles.dialogPrimary} to="/account/redeem">
              去兑换激活码
            </Link>
          ) : (
            <button type="button" className={styles.dialogPrimary} onClick={confirm}>
              确认开通 {pending?.price}
            </button>
          )}
          <button type="button" className={styles.dialogSecondary} onClick={() => setPending(undefined)}>
            取消
          </button>
        </div>
      </Dialog>
    </main>
  );
}
