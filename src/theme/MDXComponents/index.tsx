import MDXComponents from '@theme-original/MDXComponents';

import {CoreSection} from '@site/src/learning/article/ArticleParts';
import {FaqItem} from '@site/src/learning/article/FaqItem';

/** Adds the elements emitted by plugins/remark-article-blocks. */
export default {
  ...MDXComponents,
  CoreSection,
  FaqItem,
};
