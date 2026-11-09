import {type ReactNode, useEffect} from 'react';
import {useLocation} from '@docusaurus/router';
import {useCurrentArticle} from './context';

/** Indexed answers are rendered by cards; other docs retain their source questions. */
export function InterviewQuestionList({children}: {children: ReactNode}) {
  const article = useCurrentArticle();
  const {hash} = useLocation();

  // Client-rendered pages need to resolve old question links after cards mount.
  useEffect(() => {
    if (!hash || !article?.cardIds.length) return;
    let anchor: string;
    try {
      anchor = decodeURIComponent(hash.slice(1));
    } catch {
      return;
    }
    if (article.cardIds.some(id => id.endsWith(`#${anchor}`))) {
      document.getElementById(anchor)?.scrollIntoView();
    }
  }, [article, hash]);

  return article?.cardIds.length ? null : <>{children}</>;
}
