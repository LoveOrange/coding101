import type {ReactNode} from 'react';
import TOC from '@theme-original/TOC';
import type TOCType from '@theme/TOC';
import type {WrapperProps} from '@docusaurus/types';

import {TocLegend} from '@site/src/learning/article/ArticleParts';
import {useCurrentArticle} from '@site/src/learning/article/context';

type Props = WrapperProps<typeof TOCType>;

export default function TOCWrapper(props: Props): ReactNode {
  const article = useCurrentArticle();
  if (!article) return <TOC {...props} />;
  return (
    <div className="c101-toc">
      <span className="c101-toc__label">本页</span>
      <TOC {...props} />
      {article.cardIds.length > 0 && <TocLegend />}
    </div>
  );
}
