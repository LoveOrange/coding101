import {writeFile} from 'node:fs/promises';
import path from 'node:path';

import type {LoadContext, Plugin} from '@docusaurus/types';

/**
 * Verification for the canonical host. ArticleAd owns ad loading and placement;
 * navigation, directories, the mirror and local previews do not request ads.
 */
export default function adsensePlugin(context: LoadContext, options: {client?: string}): Plugin {
  const {client} = options;
  if (!client || context.siteConfig.url !== 'https://coding101.linsama.com') return {name: 'adsense'};
  if (!/^ca-pub-\d{16}$/.test(client)) throw new Error('Invalid AdSense publisher ID');
  return {
    name: 'adsense',
    injectHtmlTags: () =>
      ({headTags: [{tagName: 'meta', attributes: {name: 'google-adsense-account', content: client}}]}),
    async postBuild({outDir}) {
      const publisher = client.replace(/^ca-/, '');
      await writeFile(path.join(outDir, 'ads.txt'), `google.com, ${publisher}, DIRECT, f08c47fec0942fa0\n`);
    },
  };
}
