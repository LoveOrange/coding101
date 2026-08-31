import { Redirect } from "@docusaurus/router";
import Head from "@docusaurus/Head";

const destination =
  "/docs/basic-knowledge/java/language/encapsulation-inheritance-polymorphism";

export default function MethodDispatchRedirect(): JSX.Element {
  return (
    <>
      <Head>
        <title>面向对象编程（Object-Oriented Programming）</title>
        <meta httpEquiv="refresh" content={`0; url=${destination}`} />
      </Head>
      <Redirect to={destination} />
    </>
  );
}
