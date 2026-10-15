import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import type {ArticleGroup} from './types';
import styles from './directory.module.css';

/** A public, server-rendered catalog; no account or browser storage is needed. */
export default function ArticleDirectory({groups}: {groups: ArticleGroup[]}) {
  return (
    <Layout title="文章目录" description="按技术主题查找 Coding 101 的公开文章、面试自测、岗位准备资料和算法题解。">
      <main className={styles.page}>
        <header>
          <h1>文章目录</h1>
          <p>按主题查找技术原理、面试自测和求职准备资料。先从<Link to="/interview-roadmaps/">岗位路线</Link>确定复习重点，再阅读需要补充的文章。</p>
        </header>
        <nav aria-label="文章分类" className={styles.categories}>
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
