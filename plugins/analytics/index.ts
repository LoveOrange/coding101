import path from 'node:path';
import type {Plugin} from '@docusaurus/types';

export default function analyticsPlugin(): Plugin {
  return {name: 'site-analytics', getClientModules: () => [path.resolve(__dirname, './client.ts')]};
}
