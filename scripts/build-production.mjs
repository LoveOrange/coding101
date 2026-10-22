import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const {features} = JSON.parse(readFileSync(new URL('../release/production.json', import.meta.url), 'utf8'));
const result = spawnSync('npm', ['run', 'build'], {
  cwd: root, stdio: 'inherit',
  env: {...process.env, ...features, NODE_ENV: 'production', LOCAL_PREVIEW: 'false',
    LEARNER_MOCKS: 'false', STYLE_PREVIEW: 'false', ADSENSE_CLIENT: 'ca-pub-9495948352620553'},
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
