import { Redirect } from "@docusaurus/router";
import Head from "@docusaurus/Head";

const destination = "/docs/basic-knowledge/nosql/redis/";

export default function RedisIntroductionRedirect(): JSX.Element {
  return (
    <>
      <Head>
        <title>Redis</title>
        <meta httpEquiv="refresh" content={`0; url=${destination}`} />
      </Head>
      <Redirect to={destination} />
    </>
  );
}
