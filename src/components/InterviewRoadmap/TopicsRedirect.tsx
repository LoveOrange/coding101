import {Redirect, useLocation} from '@docusaurus/router';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import {legacyTopicsHref} from '../../learning/roles';

/** Temporary route URLs now open the existing topics page with the same selection. */
export default function TopicsRedirect() {
  const location = useLocation();
  const destination = legacyTopicsHref(location.pathname, location.search);
  return <>
    <Head><title>技术主题</title><meta name="robots" content="noindex,follow" /></Head>
    <Redirect to={destination} />
    <main><Link to={destination}>进入技术主题</Link></main>
  </>;
}
