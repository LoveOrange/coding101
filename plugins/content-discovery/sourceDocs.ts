import type {LoadContext} from '@docusaurus/types';
import type {LoadedVersion} from '@docusaurus/plugin-content-docs';
import {normalizeUrl} from '@docusaurus/utils';
import {processDocMetadata, readVersionDocs} from '@docusaurus/plugin-content-docs/lib/docs.js';
import {DEFAULT_OPTIONS} from '@docusaurus/plugin-content-docs/lib/options.js';

/** Reuse Docusaurus 3.10's ID/slug rules, including numbered folders and index docs.
 * This reads metadata only: it never registers untranslated English routes.
 * check:i18n compares every resulting destination with the built Chinese canonical.
 */
export async function readSourceDocs(context: LoadContext, version: LoadedVersion) {
  const sourceVersion = {
    ...version,
    contentPathLocalized: undefined,
    path: normalizeUrl([context.i18n.localeConfigs[context.i18n.defaultLocale].baseUrl, '/docs']),
  };
  const options = {...DEFAULT_OPTIONS, showLastUpdateAuthor: false, showLastUpdateTime: false};
  return Promise.all((await readVersionDocs(sourceVersion, options)).map((docFile) =>
    processDocMetadata({docFile, versionMetadata: sourceVersion, context, options, env: 'production', tagsFile: null})));
}
