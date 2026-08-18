import type {Config} from '@docusaurus/types';

import baseConfig from './docusaurus.config';

const githubPagesConfig: Config = {
  ...baseConfig,
  url: 'https://loveorange.github.io',
  baseUrl: '/coding101/',
  trailingSlash: true,
};

export default githubPagesConfig;
