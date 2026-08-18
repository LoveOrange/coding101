import type {Config} from '@docusaurus/types';

import baseConfig from './docusaurus.config';

const githubPagesConfig: Config = {
  ...baseConfig,
  url: 'https://linsama.me',
  baseUrl: '/coding101/',
  trailingSlash: true,
};

export default githubPagesConfig;
