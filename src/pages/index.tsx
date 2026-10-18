import {type FormEvent, useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import Layout from '@theme/Layout';

import {useLearnerFeatures} from '@site/src/learning/features';

import styles from './index.module.css';

const steps = [
  {
    title: '读文章',
    description: '按领域和主题组织，全文阅读，无需登录。',
  },
  {
    title: '练闪卡',
    description: '每节末尾的面试题，答完标「没想起来 / 模糊 / 记得」，按间隔生成今日复习队列。',
    // Shown while spaced review is held back (learnerFeatures off).
    plain: '每篇文章末尾的面试题都能翻卡自测：先想答案，再对照考察重点和参考回答。',
  },
  {
    title: '回到原文',
    description: '汇总薄弱点，一键跳回对应段落，补读后重测。',
    plain: '每张卡都标出相关章节，答不上来就跳回原文对应段落补读。',
  },
];

const topic = (domain: string, topicId?: string) =>
  `/topics?domain=${encodeURIComponent(domain)}${topicId ? `&topic=${encodeURIComponent(topicId)}` : ''}`;

const domains: {label: string; href?: string}[] = [
  {label: '后端', href: topic('basic-knowledge/java', 'basic-knowledge/java/language')},
  {label: '算法', href: topic('basic-knowledge/algorithms')},
  {label: '系统设计', href: topic('system-design/system-design')},
  {label: '数据库', href: topic('basic-knowledge/database')},
  {label: '网络', href: topic('basic-knowledge/network')},
];

const ratings = ['没想起来', '模糊', '记得'];

function Intro() {
  const features = useLearnerFeatures();
  return (
    <section className={styles.intro}>
      <div className={styles.introCopy}>
        <p className={styles.eyebrow}>技术面试复习</p>
        <h1 className={styles.title}>
          读懂一遍，
          <br />
          再练到记住。
        </h1>
        <p className={styles.lead}>
          {features
            ? 'Coding101 把后端、算法、系统设计、数据库、网络等面试内容整理成文章，每篇末尾配面试闪卡。读过的内容进入复习队列，答不上来的题会带你回到原文段落。'
            : 'Coding101 把后端、算法、系统设计、数据库、网络等面试内容整理成文章，每篇末尾配面试闪卡。先想答案再翻面，答不上来的题会带你回到原文段落。'}
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
        <p className={styles.note}>
          {features ? '文章全文免费阅读，无需登录。注册即 7 天完整 Pro，不绑卡。' : '文章和面试题全部免费，无需登录。'}
        </p>
      </div>

      <div className={styles.cardStack} aria-hidden="true">
        <div className={styles.cardShadow} />
        <div className={styles.card}>
          <div className={styles.cardMeta}>
            <span>网络 · HTTPS</span>
            <span>正面</span>
          </div>
          <p className={styles.cardQuestion}>HTTPS 握手时，客户端如何确认服务器的身份？</p>
          {features ? (
          <div className={styles.ratings}>
            {ratings.map((rating, index) => (
              <span
                key={rating}
                className={index === ratings.length - 1 ? styles.ratingActive : styles.rating}>
                {rating}
              </span>
            ))}
          </div>
          ) : (
            <div className={styles.flipHint}>先想一想，再翻面看答案</div>
          )}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const features = useLearnerFeatures();
  return (
    <section className={styles.how} aria-labelledby="how-title">
      <div className={styles.sectionHeading}>
        <p className={styles.eyebrow}>怎么用</p>
        <h2 id="how-title" className={styles.howTitle}>
          阅读、作答与补习
        </h2>
      </div>
      <ol className={styles.steps}>
        {steps.map((step, index) => (
          <li key={step.title} className={styles.step}>
            <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepText}>{features || !step.plain ? step.description : step.plain}</p>
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
  const features = useLearnerFeatures();
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
            <p className={styles.routeTextInverse}>{features ? '按领域读文章，每节末尾附面试题，读过的内容会进入复习。' : '按领域阅读技术文章，再用文末面试题检查能否独立解释。'}</p>
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
              {features && <span className={styles.badgePro}>Pro</span>}
            </div>
            <h3 className={styles.routeTitle}>从问题出发</h3>
            <p className={styles.routeText}>先答题，哪里答不上来，再去读对应的文章。</p>
          </div>
          <div className={styles.routeFoot}>
            <QuestionSearch />
            <Link className={styles.routeButtonQuestion} to={features ? '/review?mode=quiz' : '/questions'}>
              <span>{features ? '随机来 10 道题' : '去题库挑题'}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="技术面试复习"
      description="Coding 101 提供 Java 后端、AI Agent 开发与运维 / SRE 岗位路线，以及算法、数据库、网络和系统设计文章与面试自测。">
      <main className={styles.home}>
        <Intro />
        <HowItWorks />
        <Choose />
        <section className={styles.reading} aria-labelledby="reading-title">
          <h2 id="reading-title">从具体问题开始阅读</h2>
          <p>还没有确定复习范围时，先选<a href="/interview-roadmaps/">岗位路线</a>。想补一个知识点时，可以直接阅读下面的文章；每篇都提供原理说明和参考资料。</p>
          <div className={styles.readingGrid}>
            <article><h3><Link to="/docs/basic-knowledge/network/tls">TLS</Link></h3><p>从证书验证、密钥协商到加密通信，解释 HTTPS 怎样确认服务端身份，以及它的保护边界。</p></article>
            <article><h3><Link to="/docs/basic-knowledge/algorithms/binary-search">二分查找</Link></h3><p>用半开区间推导重复值的左右边界，检查空数组、目标缺失和整数溢出。</p></article>
            <article><h3><Link to="/docs/basic-knowledge/algorithms/backtracking">回溯</Link></h3><p>通过子集枚举解释选择与撤销，区分路径恢复、同层去重和保存答案的复制成本。</p></article>
          </div>
          <p><Link to="/articles/">浏览完整文章目录</Link> · <Link to="/about">了解内容范围与资料来源</Link></p>
        </section>
      </main>
    </Layout>
  );
}
