import type {ReactNode} from 'react';
import DocBreadcrumbs from '@theme-original/DocBreadcrumbs';
import type DocBreadcrumbsType from '@theme/DocBreadcrumbs';
import type {WrapperProps} from '@docusaurus/types';

import {ArticleMeta} from '@site/src/learning/article/ArticleParts';
import {useCurrentArticle} from '@site/src/learning/article/context';

type Props = WrapperProps<typeof DocBreadcrumbsType>;

/** Knowledge-tree articles show the domain, reading time and card count instead of breadcrumbs. */
export default function DocBreadcrumbsWrapper(props: Props): ReactNode {
  const article = useCurrentArticle();
  return article ? <ArticleMeta article={article} /> : <DocBreadcrumbs {...props} />;
}
