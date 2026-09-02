import { Redirect } from "@docusaurus/router";
import Head from "@docusaurus/Head";

const destination =
  "/docs/basic-knowledge/java/language/exceptions-error-boundaries#try-with-resources";

export default function TryWithResourcesRedirect(): JSX.Element {
  return (
    <>
      <Head>
        <title>Java 异常</title>
        <meta httpEquiv="refresh" content={`0; url=${destination}`} />
      </Head>
      <Redirect to={destination} />
    </>
  );
}
