import Link from '@docusaurus/Link';

import {accessOf, PLAN_PRICES, useLearner} from '../store';
import {Dialog} from '../ui';
import styles from './review.module.css';

/** 08 · shown when a free, guest or expired user opens a Pro-only entry. */
export function UpgradeDialog({open, onClose}: {open: boolean; onClose: () => void}) {
  const learner = useLearner();
  const access = accessOf(learner);
  const prices = PLAN_PRICES[learner.region];
  const expired = access === 'readonly';
  const monthly = learner.region === 'cn' ? prices['code-monthly'] : prices.monthly;
  const yearly = learner.region === 'cn' ? prices['code-yearly'] : prices.yearly;
  // TODO(copy): per-month figure follows the design draft's yearly price.
  const perMonth = learner.region === 'cn' ? '约 ¥8.25 / 月' : '约 $2.42 / 月';

  return (
    <Dialog open={open} onClose={onClose} width={520} labelledBy="upgrade-title">
      <div className={styles.dialogHead}>
        <span className={styles.proLabel}>PRO 功能</span>
        <span id="upgrade-title" className={styles.dialogTitle}>
          {expired ? 'Pro 已到期' : '复习需要 Pro'}
        </span>
        <span className={styles.dialogText}>
          {expired
            ? '进度和卡片状态都还在，现在只能查看。续费后从停下的地方继续：'
            : '免费版可以读全部文章，看每节的面试题和参考答案。升级后：'}
        </span>
      </div>
      <div className={styles.benefits}>
        <span>
          <b>✓</b>读过的章节自动进入复习，按遗忘时间安排
        </span>
        <span>
          <b>✓</b>记下没想起来的题，链接回对应章节
        </span>
        <span>
          <b>✓</b>全景进度图和闪卡库
        </span>
      </div>
      <div className={styles.planPair}>
        <span className={styles.planBox}>
          <span className={styles.planName}>月付</span>
          <span className={styles.planPrice}>{monthly}</span>
        </span>
        <span className={styles.planBoxActive}>
          <span className={styles.planNameAccent}>年付 · {perMonth}</span>
          <span className={styles.planPrice}>{yearly}</span>
        </span>
      </div>
      <Link className={styles.upgradeButton} to="/pricing">
        {expired ? '续费 Pro' : '升级 Pro'}
      </Link>
      <div className={styles.dialogFoot}>
        <button type="button" className={styles.textButton} onClick={onClose}>
          继续阅读
        </button>
        <Link to="/account/redeem">有激活码？</Link>
      </div>
    </Dialog>
  );
}
