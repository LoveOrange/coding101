// Internal release step. Requests contain paths and hashes, never credentials.
// Production imports use npm run release:production.
import {readFile} from 'node:fs/promises';
import pg from 'pg';
import {digest, readConnection, savePrivateJson, checkMetadata, syncMetadata} from './company-metadata.mjs';

let request, client;
const receipt = {status: 'failed', commitState: 'not-started'};
try {
  if (process.argv.length !== 3) throw new Error('invalid_request');
  request = JSON.parse(await readFile(process.argv[2], 'utf8'));
  if (!['check', 'sync'].includes(request.mode)) throw new Error('invalid_mode');
  const metadata = await readFile(request.metadataFile, 'utf8');
  const cards = await readFile(request.cardsFile, 'utf8');
  Object.assign(receipt, {sourceHash: digest(metadata), cardsHash: digest(cards)});
  if (receipt.sourceHash !== request.sourceHash) throw new Error('source_changed');
  const input = {entries: JSON.parse(metadata), cards: JSON.parse(cards), database: request.target.database};
  let preflight;
  if (request.mode === 'sync') {
    preflight = JSON.parse(await readFile(request.preflightFile, 'utf8'));
    if (preflight.status !== 'checked' || preflight.sourceHash !== receipt.sourceHash || preflight.cardsHash !== receipt.cardsHash) {
      throw new Error('preflight_changed');
    }
  }
  const connectionString = await readConnection(request.connectionFile, request.target);
  client = new pg.Client({connectionString, connectionTimeoutMillis: 20_000, query_timeout: 30_000,
    application_name: `coding101-release-metadata-${request.mode}`});
  client.on('error', () => {});
  await client.connect();
  if (request.mode === 'check') {
    Object.assign(receipt, await checkMetadata(client, input), {status: 'checked'});
  } else {
    receipt.backupFile = request.backupFile;
    await syncMetadata(client, {...input, expectedDigest: preflight.databaseDigest, receipt,
      backup: rows => savePrivateJson(request.backupFile, {capturedAt: new Date().toISOString(), rows})});
    receipt.status = 'synced';
  }
} catch (error) {
  // Raw database errors can contain credentials, parameters or private sources.
  receipt.error = error.publicMessage ?? '公司元信息步骤失败；检查连接、权限及备份状态后重新运行正式入口。';
  receipt.errorCode = /^[A-Z0-9_]+$/.test(error.code ?? '') ? error.code : 'METADATA_STEP_FAILED';
  process.exitCode = 1;
} finally {
  if (client) await client.end().catch(() => {});
  receipt.finishedAt = new Date().toISOString();
  if (request?.outputFile) await savePrivateJson(request.outputFile, receipt);
  console.log(JSON.stringify({...receipt, expectedCounts: undefined}));
}
