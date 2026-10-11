import type {ComponentProps, ReactNode} from 'react';
import clsx from 'clsx';
import Li from '@theme-original/MDXComponents/Li';

import {useCoreItem} from '@site/src/learning/article/ArticleParts';

/** 面试核心 points move their card links into a chip column. */
export default function MDXLi(props: ComponentProps<'li'>): ReactNode {
  const core = useCoreItem(props.children);
  if (!core) return <Li {...props} />;
  return (
    <Li {...props} className={clsx(props.className, core.className)}>
      {core.content}
    </Li>
  );
}
