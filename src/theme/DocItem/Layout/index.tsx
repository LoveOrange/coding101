import type {ReactNode} from 'react';
import {useLocation} from '@docusaurus/router';
import Layout from '@theme-original/DocItem/Layout';
import type LayoutType from '@theme/DocItem/Layout';
import type {WrapperProps} from '@docusaurus/types';

import {ArticleProvider, articleByPermalink} from '@site/src/learning/article/context';
import {useReadingTracker} from '@site/src/learning/article/useReadingTracker';
import {useLearningIndex} from '@site/src/learning/content';

type Props = WrapperProps<typeof LayoutType>;

// The article is found by route path: importing useDoc from
// @docusaurus/plugin-content-docs/client here can resolve to a second copy of
// the package under pnpm, whose context the theme never provides.
export default function LayoutWrapper(props: Props): ReactNode {
  const {pathname} = useLocation();
  const article = articleByPermalink(useLearningIndex().articles, pathname);
  useReadingTracker(article);
  return (
    <ArticleProvider article={article}>
      <div className={article ? 'c101-article' : undefined}>
        <Layout {...props} />
      </div>
    </ArticleProvider>
  );
}
