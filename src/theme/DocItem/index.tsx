import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import DocItem from '@theme-original/DocItem';
import type DocItemType from '@theme/DocItem';
import type {WrapperProps} from '@docusaurus/types';
import {applyTrailingSlash} from '@docusaurus/utils-common';

type Props = WrapperProps<typeof DocItemType>;

/** Use the loaded document itself, so metadata follows edits and canonical URLs. */
export default function DocItemWrapper(props: Props): ReactNode {
  const {siteConfig, i18n} = useDocusaurusContext();
  const {metadata, frontMatter} = props.content;
  const knowledge = metadata.frontMatter.knowledge as {id?: string} | undefined;
  const publicDoc = !metadata.draft && !metadata.unlisted;
  const url = new URL(applyTrailingSlash(metadata.permalink, siteConfig), siteConfig.url).href;
  const website = {
    '@type': 'WebSite',
    name: siteConfig.title,
    url: new URL(siteConfig.baseUrl, siteConfig.url).href,
  };
  const data = {
    '@context': 'https://schema.org',
    '@type': knowledge ? ['TechArticle', 'LearningResource'] : 'WebPage',
    '@id': url,
    url,
    name: metadata.title,
    ...(knowledge ? {
      headline: metadata.title,
      identifier: knowledge.id,
      learningResourceType: '技术文章',
      educationalUse: '技术面试准备',
      mainEntityOfPage: {'@type': 'WebPage', '@id': url},
    } : {}),
    description: metadata.description,
    keywords: frontMatter.keywords,
    inLanguage: i18n.currentLocale,
    isAccessibleForFree: true,
    isPartOf: website,
    ...(metadata.lastUpdatedAt ? {dateModified: new Date(metadata.lastUpdatedAt).toISOString()} : {}),
  };

  return (
    <>
      {publicDoc && (
        <Head>
          <script type="application/ld+json" id="c101-document-schema">
            {JSON.stringify(data).replace(/</g, '\\u003c')}
          </script>
        </Head>
      )}
      <DocItem {...props} />
    </>
  );
}
