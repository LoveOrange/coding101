import styles from './styles.module.css';

const steps = [
  {
    title: '按岗位确定范围',
    description: '从目标岗位进入路线，明确复习顺序，以及每个主题需要回答到什么深度。',
  },
  {
    title: '先完成核心阅读',
    description: '第一轮聚焦必会内容。掌握核心后，再根据 JD 和项目经历补充常考与选学主题。',
  },
  {
    title: '用问题检查理解',
    description: '合上文章，尝试解释原理、比较方案。根据自测结果，决定继续深入还是进入下一项。',
  },
];

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.section} aria-labelledby="review-method-title">
      <div className={styles.inner}>
        <h2 id="review-method-title" className={styles.heading}>
          如何使用 Coding 101
        </h2>
        <ol className={styles.steps}>
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
