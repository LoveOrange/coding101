import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import Layout from '@theme-original/DocItem/Layout';
import type LayoutType from '@theme/DocItem/Layout';
import type {WrapperProps} from '@docusaurus/types';

import {ArticleProvider, articleByPermalink} from '@site/src/learning/article/context';
import {useReadingTracker} from '@site/src/learning/article/useReadingTracker';
import {useLearningIndex} from '@site/src/learning/content';
import {useLearnerFeatures} from '@site/src/learning/features';
import ArticleAd from '@site/src/components/ArticleAd';

type Props = WrapperProps<typeof LayoutType>;

// The article is found by route path: importing useDoc from
// @docusaurus/plugin-content-docs/client here can resolve to a second copy of
// the package under pnpm, whose context the theme never provides.
export default function LayoutWrapper(props: Props): ReactNode {
  const {pathname} = useLocation();
  const article = articleByPermalink(useLearningIndex().articles, pathname);
  useReadingTracker(useLearnerFeatures() ? article : undefined);
  return (
    <ArticleProvider article={article}>
      <div className={article ? 'c101-article' : undefined}>
        <Layout {...props}>
          {props.children}
          <p className="margin-top--lg text--small">
            来源：<Link to={pathname}>Coding 101 原文</Link>
            {' · 免费阅读，引用请保留出处。'}
            <Link to="/terms#内容与反馈">内容使用说明</Link>
          </p>
          {article && <ArticleAd key={pathname} permalink={pathname} />}
        </Layout>
      </div>
    </ArticleProvider>
  );
}
