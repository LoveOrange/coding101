import React from 'react';
import Link from '@docusaurus/Link';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import type {ReviewPlan, ReviewStep} from './types';
import styles from './styles.module.css';

export function readingHref(_plan: ReviewPlan, step: ReviewStep, selfTest = false) {
  return `${step.href}#${selfTest ? 'review-checkpoint' : 'core-reading'}`;
}

export function ReviewGuide({plan}: {plan: ReviewPlan}): JSX.Element {
  useBrokenLinks().collectAnchor('collection-self-test');
  return (
    <section className={styles.guide} aria-label={`${plan.title}核心阅读`}>
      <div className={styles.heading}>Java 后端 · 核心阅读</div>
      <p className={styles.lead}>按下面的范围阅读，能解释对应问题后，自行选择下一篇或深入内容。</p>
      <ol className={styles.steps}>
        {plan.steps.map((step, index) => (
          <li key={step.id}>
            <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <Link to={readingHref(plan, step)}><strong>{step.title}</strong></Link>
              <p>{step.outcome}</p>
              <small>{step.scope}</small>
            </div>
          </li>
        ))}
      </ol>
      <details className={styles.selfTest} id="collection-self-test">
        <summary>代表题与停止条件</summary>
        <p>先尝试解释，再打开原文中的参考回答。能说明机制与边界即可继续。</p>
        {plan.steps.map((step) => (
          <div key={step.id} className={styles.question}>
            <Link to={`${step.href}#${step.questionAnchor}`}>{step.question}</Link>
            <p>{step.outcome}</p>
          </div>
        ))}
      </details>
    </section>
  );
}

export function ReviewReading({plan, stepId}: {plan: ReviewPlan; stepId: string}): JSX.Element {
  useBrokenLinks().collectAnchor('core-reading');
  const step = plan.steps.find((item) => item.id === stepId)!;
  return (
    <aside className={styles.reading} id="core-reading" aria-label="核心阅读范围">
      <strong>{plan.title} · 核心阅读</strong>
      <p>{step.scope}</p>
      <div className={styles.actions}>
        <Link to={plan.href}>查看主题导读</Link>
        <Link to="#review-checkpoint">查看停止条件与题目</Link>
      </div>
    </aside>
  );
}

export function ReviewCheckpoint({plan, stepId}: {plan: ReviewPlan; stepId: string}): JSX.Element {
  useBrokenLinks().collectAnchor('review-checkpoint');
  const index = plan.steps.findIndex((step) => step.id === stepId);
  const step = plan.steps[index];
  const next = plan.steps[index + 1];
  return (
    <section className={styles.checkpoint} id="review-checkpoint" aria-label="核心阅读停止条件">
      <span className={styles.kicker}>核心阅读到这里</span>
      <h3>检查能否解释</h3>
      <p>{step.outcome}</p>
      <Link to={`#${step.questionAnchor}`}>{step.question} 查看题目与参考回答 →</Link>
      <div className={styles.actions}>
        {next && <Link to={readingHref(plan, next)}>下一篇：{next.title}</Link>}
        <Link to={plan.href}>返回主题目录</Link>
        <Link to={plan.routeHref}>查看其他复习主题</Link>
      </div>
    </section>
  );
}

export function ReviewQuestionAnchor(): JSX.Element {
  useBrokenLinks().collectAnchor('review-question');
  return <div id="review-question" />;
}
