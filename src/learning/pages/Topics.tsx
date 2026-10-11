import Layout from '@theme/Layout';
import {useLearningIndex} from '../content';

export default function Topics(): JSX.Element {
  const index = useLearningIndex();
  return (
    <Layout title="知识树">
      <pre>{JSON.stringify({domains: index.domains.length, cards: Object.keys(index.cards).length}, null, 2)}</pre>
    </Layout>
  );
}
