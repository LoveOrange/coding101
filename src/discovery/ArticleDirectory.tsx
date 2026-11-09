import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ChineseLink from '@site/src/components/ChineseLink';
import type {ArticleGroup} from './types';
import styles from './directory.module.css';

/** A public, server-rendered catalog; no account or browser storage is needed. */
export default function ArticleDirectory({groups}: {groups: ArticleGroup[]}) {
  const english = useDocusaurusContext().i18n.currentLocale === 'en';
  return (
    <Layout title={english ? "Articles" : "文章目录"} description={english ? "Browse Coding 101’s English articles for technical interview preparation, with explanations, examples and self-assessment questions." : "按技术主题查找 Coding 101 的公开文章、面试自测、岗位准备资料和算法题解。"}>
      <main className={styles.page}>
        <header>
          <h1>{english ? "Articles" : "文章目录"}</h1>
          {english ? <p>Start with the published English articles below. The <ChineseLink to="/articles/">full collection (Chinese)</ChineseLink> covers additional technical topics and role preparation.</p> : <p>按主题查找技术原理、面试自测和求职准备资料。先从<Link to="/interview-roadmaps/">岗位路线</Link>确定复习重点，再阅读需要补充的文章。</p>}
        </header>
        <nav aria-label={english ? "Article categories" : "文章分类"} className={styles.categories}>
          {groups.map((group) => <a key={group.id} href={`#${group.id}`}>{group.title}</a>)}
        </nav>
        {groups.map((group) => (
          <section key={group.id} id={group.id} className={styles.group}>
            <h2>{group.title}</h2>
            <ul className={styles.articles}>
              {group.articles.map((article) => (
                <li key={article.id}>
                  <Link to={article.permalink}>{article.title}</Link>
                  <p>{article.description}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </Layout>
  );
}
