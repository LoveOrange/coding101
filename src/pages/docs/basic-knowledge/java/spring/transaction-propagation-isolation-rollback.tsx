import { Redirect } from "@docusaurus/router";
import Head from "@docusaurus/Head";

const destination = "/docs/basic-knowledge/java/spring/declarative-transaction-execution";

export default function SpringTransactionConfigurationRedirect(): JSX.Element {
  return <><Head><title>Spring 事务</title><meta httpEquiv="refresh" content={`0; url=${destination}#transaction-settings`} /></Head><Redirect to={`${destination}#transaction-settings`} /></>;
}
