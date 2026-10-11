import type {ReactNode} from 'react';
import Admonition from '@theme-original/Admonition';
import type AdmonitionType from '@theme/Admonition';
import type {WrapperProps} from '@docusaurus/types';

import {CoreSummary} from '@site/src/learning/article/ArticleParts';

type Props = WrapperProps<typeof AdmonitionType>;

/** `:::tip 面试核心` renders as the dark summary block from the design. */
export default function AdmonitionWrapper(props: Props): ReactNode {
  if (props.title === '面试核心') return <CoreSummary>{props.children}</CoreSummary>;
  return <Admonition {...props} />;
}
