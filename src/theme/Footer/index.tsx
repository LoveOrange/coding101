import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {useThemeConfig} from '@docusaurus/theme-common';

import styles from './styles.module.css';

type FooterItem = {label: string; to?: string; href?: string};
type FooterColumn = {title?: string; items: FooterItem[]};

/**
 * Footer from the redesign: text mark and one-line positioning on the left,
 * link columns with mono labels on the right. Links and copyright still come
 * from themeConfig.footer in docusaurus.config.ts.
 */
export default function Footer(): ReactNode {
  const {footer} = useThemeConfig();
  if (!footer) return null;
  const columns = (footer.links ?? []) as FooterColumn[];

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            coding<span>101</span>
          </Link>
          <p className={styles.tagline}>技术面试复习：按主题读文章，用每篇末尾的面试题自测。</p>
        </div>
        <nav className={styles.columns} aria-label="页脚">
          {columns.map((column) => (
            <div key={column.title} className={styles.column}>
              {column.title && <span className={styles.label}>{column.title}</span>}
              <ul className={styles.list}>
                {column.items.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <a className={styles.link} href={item.href} target="_blank" rel="noopener noreferrer">
                        {item.label}
                        <span className={styles.external} aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    ) : (
                      <Link className={styles.link} to={item.to}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      {footer.copyright && <div className={styles.bottom}>{footer.copyright}</div>}
    </footer>
  );
}
