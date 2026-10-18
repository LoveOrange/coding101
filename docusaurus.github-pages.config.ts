import type {Config} from '@docusaurus/types';

import baseConfig from './docusaurus.config';

const githubPagesConfig: Config = {
  ...baseConfig,
  url: 'https://linsama.me',
  baseUrl: '/coding101/',
  trailingSlash: true,
  // linsama.me is not same-site with the account service's .linsama.com cookie,
  // so the mirror stays free reading: no account service calls.
  customFields: {...baseConfig.customFields, serverApi: false, adsenseClient: null, adsenseSlot: null},
};

export default githubPagesConfig;
