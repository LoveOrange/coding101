import { Redirect } from "@docusaurus/router";
import Head from "@docusaurus/Head";

const destination = "/docs/basic-knowledge/java/concurrency/threadpoolexecutor-execution-path";

export default function ThreadPoolSaturationRedirect(): JSX.Element {
  return <><Head><title>Java 线程池</title><meta httpEquiv="refresh" content={`0; url=${destination}#thread-pool-saturation`} /></Head><Redirect to={`${destination}#thread-pool-saturation`} /></>;
}
