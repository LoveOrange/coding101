import {writeFile} from 'node:fs/promises';
import path from 'node:path';

import type {LoadContext, Plugin} from '@docusaurus/types';

/**
 * Google AdSense for free readers, on when the build sets ADSENSE_CLIENT
 * (`ca-pub-…`). Adds the account meta tag AdSense verifies the site with and
 * ads.txt; the ad script itself is loaded by ./client.ts only once the visitor
 * is known not to have Pro or a trial.
 */
export default function adsensePlugin(_context: LoadContext, options: {client?: string}): Plugin {
  const {client} = options;
  return {
    name: 'adsense',
    getClientModules: () => (client ? [path.resolve(__dirname, './client.ts')] : []),
    injectHtmlTags: () =>
      client ? {headTags: [{tagName: 'meta', attributes: {name: 'google-adsense-account', content: client}}]} : {},
    async postBuild({outDir}) {
      if (!client) return;
      const publisher = client.replace(/^ca-/, '');
      await writeFile(path.join(outDir, 'ads.txt'), `google.com, ${publisher}, DIRECT, f08c47fec0942fa0\n`);
    },
  };
}
