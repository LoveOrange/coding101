import {Children, isValidElement, type MouseEvent, type ReactNode, useEffect, useId, useState} from 'react';
import clsx from 'clsx';
import {useLocation} from '@docusaurus/router';

import styles from './article.module.css';

/**
 * One question in a "常见问题" section, wrapped by the remark-faq plugin. The
 * first child is the h3; the answer below it collapses. Opening a link to the
 * heading (TOC, shared URL) expands it.
 */
export function FaqItem({defaultOpen = false, children}: {defaultOpen?: boolean; children: ReactNode}) {
  const [heading, ...answer] = Children.toArray(children);
  const headingId = isValidElement<{id?: string}>(heading) ? heading.props.id : undefined;
  const [open, setOpen] = useState(defaultOpen);
  const {hash} = useLocation();
  const bodyId = useId();

  useEffect(() => {
    if (headingId && decodeURIComponent(hash.slice(1)) === headingId) setOpen(true);
  }, [hash, headingId]);

  const toggle = (event: MouseEvent) => {
    if ((event.target as HTMLElement).closest('a')) return;
    setOpen(!open);
  };

  return (
    <div className={clsx(styles.faq, open && styles.faqOpen)}>
      <div className={styles.faqHead} onClick={toggle}>
        {heading}
        <button type="button" className={styles.faqToggle} aria-expanded={open} aria-controls={bodyId}>
          {open ? '收起 ▴' : '展开 ▾'}
        </button>
      </div>
      <div id={bodyId} className={styles.faqBody} hidden={!open}>
        {answer}
      </div>
    </div>
  );
}
