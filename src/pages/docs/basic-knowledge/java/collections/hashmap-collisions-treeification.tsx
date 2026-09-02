import { Redirect } from "@docusaurus/router";
import Head from "@docusaurus/Head";

const destination = "/docs/basic-knowledge/java/collections/hashmap-structure-lookup-path";

export default function HashMapTreeificationRedirect(): JSX.Element {
  return <><Head><title>HashMap</title><meta httpEquiv="refresh" content={`0; url=${destination}#hashmap-treeification`} /></Head><Redirect to={`${destination}#hashmap-treeification`} /></>;
}
