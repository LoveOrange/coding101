import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import type {Props} from '@theme/TOCItems/Tree';

import {useCardHeadings} from '@site/src/learning/article/ArticleParts';
import {useCurrentArticle} from '@site/src/learning/article/context';

// Ejected from theme-classic: adds a card marker to headings that have
// interview cards and hides the individual questions under the interview section.
function TOCItemTree({toc, className, linkClassName, isChild}: Props): ReactNode {
  const article = useCurrentArticle();
  const withCards = useCardHeadings(article);
  if (!toc.length) {
    return null;
  }
  return (
    <ul className={isChild ? undefined : className}>
      {toc.map((heading) => (
        <li key={heading.id}>
          <span className="c101-toc__row">
            <Link
              to={`#${heading.id}`}
              className={linkClassName ?? undefined}
              // Developer provided the HTML, so assume it's safe.
              dangerouslySetInnerHTML={{__html: heading.value}}
            />
            {withCards.has(heading.id) && <span className="c101-card-mark" aria-label="有对应面试题卡片" />}
          </span>
          {heading.id !== article?.interviewAnchor && (
            <TOCItemTree isChild toc={heading.children} className={className} linkClassName={linkClassName} />
          )}
        </li>
      ))}
    </ul>
  );
}

// Memo only the tree root is enough
export default React.memo(TOCItemTree);
