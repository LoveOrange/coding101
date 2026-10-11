import type {ReactNode} from 'react';
import Content from '@theme-original/DocSidebar/Desktop/Content';
import type ContentType from '@theme/DocSidebar/Desktop/Content';
import type {WrapperProps} from '@docusaurus/types';

import {ModuleSidebar} from '@site/src/learning/article/ModuleSidebar';
import {articleByPermalink} from '@site/src/learning/article/context';
import {useLearningIndex} from '@site/src/learning/content';

type Props = WrapperProps<typeof ContentType>;

/** Knowledge-tree articles list only their own domain; other docs keep the full sidebar. */
export default function ContentWrapper(props: Props): ReactNode {
  const index = useLearningIndex();
  const article = articleByPermalink(index.articles, props.path);
  if (!article) return <Content {...props} />;
  return <ModuleSidebar article={article} />;
}
