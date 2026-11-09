import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {Redirect} from '@docusaurus/router';
import {applyTrailingSlash} from '@docusaurus/utils-common';
import Layout from '@theme/Layout';

/** Readable fallback for mirrors; Cloudflare serves the matching HTTP 301. */
export default function LegacyArticleRedirect({to, title}: {to: string; title: string}) {
  const {siteConfig} = useDocusaurusContext();
  const destination = useBaseUrl(to);
  const canonical = new URL(applyTrailingSlash(destination.split('#')[0], siteConfig), siteConfig.url).href;
  return <Layout title={title}>
    <Head>
      <meta name="robots" content="noindex,follow" />
      <link rel="canonical" href={canonical} />
      <meta httpEquiv="refresh" content={`0; url=${destination}`} />
    </Head>
    <Redirect to={destination} />
    <main className="container margin-vert--lg">
      <h1>{title}</h1>
      <p>本文内容已合并至<Link to={destination}>{title}</Link>，请使用新地址继续阅读。</p>
    </main>
  </Layout>;
}
