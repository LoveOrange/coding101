import {type ReactNode, useEffect, useRef} from 'react';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/** Keep the original questions readable at their stable article anchors. */
export function InterviewQuestionList({children}: {children: ReactNode}) {
  const ref = useRef<HTMLDetailsElement>(null);
  const {hash} = useLocation();
  const english = useDocusaurusContext().i18n.currentLocale === 'en';

  useEffect(() => {
    if (!hash || !ref.current) return;
    let id: string;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      return;
    }
    const target = document.getElementById(id);
    if (target && ref.current.contains(target)) {
      ref.current.open = true;
      target.scrollIntoView();
    }
  }, [hash]);

  return (
    <details ref={ref} className="c101-question-list">
      <summary>{english ? 'Questions and reference answers' : '本页题目与参考回答'}</summary>
      {children}
    </details>
  );
}
