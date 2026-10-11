import clsx from 'clsx';
import Link from '@docusaurus/Link';

import {moduleOf, outlineSections, topicsHref, useLearningIndex} from '../content';
import {useLearner} from '../store';
import type {ArticleIndex} from '../types';
import {Segments} from '../ui';
import styles from './article.module.css';

/** Desktop sidebar for knowledge-tree articles: the domain's articles and progress. */
export function ModuleSidebar({article}: {article: ArticleIndex}) {
  const index = useLearningIndex();
  const learner = useLearner();
  const module = moduleOf(index, article);
  if (!module) return null;
  const articles = module.articleIds.map((id) => index.articles[id]);
  const position = articles.findIndex((item) => item.id === article.id);
  const next = articles[position + 1];
  const done = articles.filter((item) => learner.reading[item.id]?.done).length;
  const reading = learner.reading[article.id];
  const sections = outlineSections(article).length || 1;
  const partial = reading && !reading.done ? Math.min(1, (reading.furthest + 1) / sections) : undefined;
  const treeHref = topicsHref(article);

  return (
    <nav className={clsx('menu thin-scrollbar', styles.sidebar)} aria-label={`${module.label} 文章`}>
      <Link className={styles.sidebarLabel} to={treeHref}>
        {module.label}
      </Link>
      <ul className={styles.sidebarList}>
        {articles.map((item) => {
          const read = learner.reading[item.id]?.done;
          const active = item.id === article.id;
          return (
            <li key={item.id}>
              <Link
                to={item.permalink}
                className={clsx(styles.sidebarItem, active && styles.sidebarActive, read && !active && styles.sidebarRead)}
                aria-current={active ? 'page' : undefined}>
                <span>{item.title}</span>
                {read && <span className={styles.sidebarCount}>✓</span>}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className={styles.sidebarFoot}>
        <Link className={styles.sidebarLabel} to={treeHref}>
          {module.short} · 第 {position + 1} / {articles.length} 篇
        </Link>
        <Segments
          className={styles.sidebarProgress}
          tone="green"
          total={articles.length}
          done={reading?.done ? done : Math.min(done, position)}
          partial={partial}
        />
        {next && (
          <Link className={styles.next} to={next.permalink}>
            <span className={styles.nextLabel}>下一篇</span>
            <span className={styles.nextTitle}>
              <span>{next.title}</span>
              <span aria-hidden="true">→</span>
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
