import {type FormEvent, useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import Layout from '@theme/Layout';

import {getLearner} from '@site/src/learning/store';

import styles from './index.module.css';

const steps = [
  {
    title: '读文章',
    description: '按领域和主题组织，全文阅读，无需登录。',
  },
  {
    title: '练闪卡',
    description: '每节末尾的面试题，答完标「没想起来 / 模糊 / 记得」，按间隔生成今日复习队列。',
  },
  {
    title: '回到原文',
    description: '汇总薄弱点，一键跳回对应段落，补读后重测。',
  },
];

// 前端暂无文章，先不加链接。
const topic = (domain: string) => `/topics?domain=${encodeURIComponent(domain)}`;

const domains: {label: string; href?: string}[] = [
  {label: '前端'},
  {label: '后端', href: topic('basic-knowledge/java/language')},
  {label: '算法', href: topic('basic-knowledge/algorithms')},
  {label: '系统设计', href: topic('system-design/system-design')},
  {label: '数据库', href: topic('basic-knowledge/database')},
  {label: '网络', href: topic('basic-knowledge/network')},
];

const ratings = ['没想起来', '模糊', '记得'];

function Intro() {
  return (
    <section className={styles.intro}>
      <div className={styles.introCopy}>
        <p className={styles.eyebrow}>技术面试复习 · 中文 / EN</p>
        <h1 className={styles.title}>
          读懂一遍，
          <br />
          再练到记住。
        </h1>
        <p className={styles.lead}>
          Coding101 把前端、后端、算法、系统设计、数据库、网络六个领域整理成文章，每节末尾配面试闪卡。读过的内容进入复习队列，答不上来的题会带你回到原文段落。
        </p>
        <div className={styles.actions}>
          <a className={styles.primaryButton} href="#choose">
            <span>开始复习</span>
            <span aria-hidden="true">↓</span>
          </a>
          <Link className={styles.secondaryButton} to="/docs/basic-knowledge/network/tls">
            先读一篇文章
          </Link>
        </div>
        <p className={styles.note}>文章全文免费阅读，无需登录。注册即 7 天完整 Pro，不绑卡。</p>
      </div>

      <div className={styles.cardStack} aria-hidden="true">
        <div className={styles.cardShadow} />
        <div className={styles.card}>
          <div className={styles.cardMeta}>
            <span>网络 · HTTPS</span>
            <span>正面</span>
          </div>
          <p className={styles.cardQuestion}>HTTPS 握手时，客户端如何确认服务器的身份？</p>
          <div className={styles.ratings}>
            {ratings.map((rating, index) => (
              <span
                key={rating}
                className={index === ratings.length - 1 ? styles.ratingActive : styles.rating}>
                {rating}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className={styles.how} aria-labelledby="how-title">
      <div className={styles.sectionHeading}>
        <p className={styles.eyebrow}>怎么用</p>
        <h2 id="how-title" className={styles.howTitle}>
          一套内容，三步闭环
        </h2>
      </div>
      <ol className={styles.steps}>
        {steps.map((step, index) => (
          <li key={step.title} className={styles.step}>
            <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepText}>{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function QuestionSearch() {
  const history = useHistory();
  const [query, setQuery] = useState('');
  const submit = (event: FormEvent) => {
    event.preventDefault();
    history.push(query.trim() ? `/questions?q=${encodeURIComponent(query.trim())}` : '/questions');
  };
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const field = document.getElementById('home-question-search');
      if (event.key === '/' && document.activeElement !== field) {
        event.preventDefault();
        field?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return (
    <form className={styles.search} onSubmit={submit} role="search">
      <input
        id="home-question-search"
        className={styles.searchInput}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="搜索问题，例如「HTTPS 握手过程」"
        aria-label="搜索问题"
      />
      <kbd className={styles.kbd}>/</kbd>
    </form>
  );
}

function Choose() {
  return (
    <section id="choose" className={styles.choose} aria-labelledby="choose-title">
      <div className={styles.chooseHeading}>
        <h2 id="choose-title" className={styles.chooseTitle}>
          今天，你想怎么复习？
        </h2>
        <p className={styles.chooseLead}>两种方式用的是同一套文章和闪卡，随时可以切换。</p>
      </div>

      <div className={styles.routes}>
        <div className={styles.routeTopic}>
          <div className={styles.routeHead}>
            <div className={styles.routeMeta}>
              <span>路线 A · 先学再测</span>
              <span className={styles.badgeFree}>阅读免费</span>
            </div>
            <h3 className={styles.routeTitle}>按主题学习</h3>
            <p className={styles.routeTextInverse}>按领域读文章，每节末尾附面试题，读过的内容会进入复习。</p>
          </div>
          <div className={styles.routeFoot}>
            <ul className={styles.chips}>
              {domains.map((domain) => (
                <li key={domain.label}>
                  {domain.href ? (
                    <Link className={styles.chip} to={domain.href}>
                      {domain.label}
                    </Link>
                  ) : (
                    <span className={styles.chip}>{domain.label}</span>
                  )}
                </li>
              ))}
            </ul>
            <Link className={styles.routeButtonTopic} to="/topics">
              <span>选一个领域</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className={styles.routeQuestion}>
          <div className={styles.routeHead}>
            <div className={`${styles.routeMeta} ${styles.routeMetaAccent}`}>
              <span>路线 B · 先测再补</span>
              <span className={styles.badgePro}>Pro</span>
            </div>
            <h3 className={styles.routeTitle}>从问题出发</h3>
            <p className={styles.routeText}>先答题，哪里答不上来，再去读对应的文章。</p>
          </div>
          <div className={styles.routeFoot}>
            <QuestionSearch />
            <Link className={styles.routeButtonQuestion} to="/review?mode=quiz">
              <span>随机来 10 道题</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Signed-in learners land on the route choice instead of the introduction. */
function useLandOnChoice() {
  useEffect(() => {
    if (window.location.hash || !getLearner().account) return;
    document.getElementById('choose')?.scrollIntoView();
  }, []);
}

export default function Home(): JSX.Element {
  useLandOnChoice();
  return (
    <Layout
      title="技术面试复习"
      description="Coding101 把前端、后端、算法、系统设计、数据库、网络整理成文章，每节末尾配面试闪卡。">
      <main className={styles.home}>
        <Intro />
        <HowItWorks />
        <Choose />
      </main>
    </Layout>
  );
}
