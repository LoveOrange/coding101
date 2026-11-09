import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ChineseLink from '@site/src/components/ChineseLink';
import type {ArticleGroup, DiscoveryRole} from './types';
import styles from './directory.module.css';

/** A public, server-rendered catalog; no account or browser storage is needed. */
export default function ArticleDirectory({groups, roles}: {groups: ArticleGroup[]; roles: DiscoveryRole[]}) {
  const {i18n, siteConfig} = useDocusaurusContext();
  const english = i18n.currentLocale === 'en';
  // Keep canonical URLs in discovery data, but let same-site browsing stay on
  // the current host (including local previews). Cross-locale links reload fully.
  const navigationHref = (href: string) => {
    const url = new URL(href, siteConfig.url);
    return url.origin === new URL(siteConfig.url).origin ? url.pathname + url.search + url.hash : href;
  };
  return (
    <Layout title={english ? "Interview preparation articles and topics" : "文章目录"} description={english ? "Explore technical interview preparation by role and topic: English introductions to Java, Go, frontend, mobile, testing, SRE and AI agent material, with full-text languages clearly marked." : "按技术主题查找 Coding 101 的公开文章、面试自测、岗位准备资料和算法题解。"}>
      <main className={styles.page}>
        <header>
          <h1>{english ? "Articles" : "文章目录"}</h1>
          {english ? <>
            <p>Find what to review for your target role, from technical fundamentals to system design and interview questions. Start with the topic introductions and selected articles below, or browse the <ChineseLink to="/articles/">full collection (Chinese)</ChineseLink>.</p>
            <p>Each article is marked <strong>Read in English</strong> or <strong>Read in Chinese</strong>. English introductions summarize Chinese articles; full translations are added as they become available.</p>
          </> : <p>按主题查找技术原理、面试自测和求职准备资料。先从<Link to="/interview-roadmaps/">岗位路线</Link>确定复习重点，再阅读需要补充的文章。</p>}
        </header>
        <nav aria-label={english ? "Article categories" : "文章分类"} className={styles.categories}>
          {english && <a href="#role-preparation">Role preparation</a>}
          {groups.map((group) => <a key={group.id} href={`#${group.id}`}>{group.title}</a>)}
        </nav>
        {english && <section id="role-preparation" className={styles.group}>
          <h2>Prepare for your target role</h2>
          <p>Use the job description to choose your review scope. These guides and topic filters are in Chinese.</p>
          <ul className={styles.articles}>
            {roles.map((role) => <li key={role.permalink}>
              <a href={navigationHref(role.permalink)} hrefLang="zh-Hans">{role.title}</a>
              <p>{role.description}</p>
              <span className={styles.language}>Chinese{role.status === 'building' ? ' · In progress' : ''}</span>
            </li>)}
          </ul>
        </section>}
        {groups.map((group) => (
          <section key={group.id} id={group.id} className={styles.group}>
            <h2>{group.title}</h2>
            {group.description && <p>{group.description}</p>}
            {group.browsePermalink && <p><a href={navigationHref(group.browsePermalink)} hrefLang="zh-Hans">Browse {group.totalArticles === 1 ? 'the article' : `all ${group.totalArticles} articles`} in Chinese →</a></p>}
            <ul className={styles.articles}>
              {group.articles.map((article) => (
                <li key={article.id} data-article-id={article.id} data-content-language={article.language}>
                  {english && article.language === 'zh-Hans'
                    ? <a href={navigationHref(article.permalink)} hrefLang="zh-Hans">{article.title}</a>
                    : <Link to={article.permalink} hrefLang={article.language}>{article.title}</Link>}
                  <p>{article.description}</p>
                  {english && <div className={styles.language}>
                    <span>{article.language === 'en' ? 'Read in English' : 'Read in Chinese'}</span>
                    {article.originalTitle && <> · <span lang="zh-Hans">{article.originalTitle}</span></>}
                    {article.originalPermalink && <> · <a href={navigationHref(article.originalPermalink)} hrefLang="zh-Hans">Chinese original</a></>}
                  </div>}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </Layout>
  );
}
