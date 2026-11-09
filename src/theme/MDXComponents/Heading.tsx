import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import type {Props} from '@theme/MDXComponents/Heading';

import {InterviewCards, SectionTags} from '@site/src/learning/article/ArticleParts';
import {useCurrentArticle} from '@site/src/learning/article/context';

export default function MDXHeading(props: Props): ReactNode {
  const article = useCurrentArticle();
  if (!article || props.as !== 'h2' || !props.id) return <Heading {...props} />;
  if (props.id === article.interviewAnchor) {
    return (
      <>
        <Heading {...props}>{props.children}卡片</Heading>
        <InterviewCards article={article} />
      </>
    );
  }
  return (
    <>
      <Heading {...props} />
      <SectionTags article={article} sectionId={props.id} />
    </>
  );
}
