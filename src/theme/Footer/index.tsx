import type {ReactNode} from 'react';
import Link, {useLocaleLink} from '@site/src/i18n/LocalizedLink';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
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
  const {siteConfig, i18n} = useDocusaurusContext();
  const english = i18n.currentLocale === 'en';
  const resolve = useLocaleLink();
  if (!footer) return null;
  const columns = ((footer.links ?? []) as FooterColumn[]).map((column) => ({
    ...column,
    items: column.items.filter((item) => {
      if (item.to) return !resolve(item.to).fallback;
      if (!english || !item.href) return true;
      const url = new URL(item.href, siteConfig.url);
      // The canonical privacy URL may differ from the mirror's origin.
      if (url.origin === siteConfig.url || url.origin === 'https://coding101.linsama.com') return !resolve(url.pathname).fallback;
      return true;
    }),
  })).filter((column) => column.items.length);

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            coding<span>101</span>
          </Link>
          <p className={styles.tagline}>{english ? 'Prepare for technical interviews: understand the concepts, then test your explanations.' : '技术面试复习：按主题读文章，用每篇末尾的面试题自测。'}</p>
        </div>
        <nav className={styles.columns} aria-label={english ? 'Footer' : '页脚'}>
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
