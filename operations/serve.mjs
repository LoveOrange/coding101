import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {dataDir} from './core.mjs';

export function dashboardServer(directory = dataDir) {
  const files = new Map([
    ['/', [new URL('./dashboard/index.html', import.meta.url), 'text/html; charset=utf-8']],
    ['/app.js', [new URL('./dashboard/app.js', import.meta.url), 'text/javascript; charset=utf-8']],
    ['/style.css', [new URL('./dashboard/style.css', import.meta.url), 'text/css; charset=utf-8']],
    ['/report.json', [join(directory, 'report.json'), 'application/json; charset=utf-8']],
  ]);
  return createServer(async (req, res) => {
    const port = res.socket.localPort;
    if (![`127.0.0.1:${port}`, `localhost:${port}`].includes(req.headers.host) || req.method !== 'GET') {
      res.writeHead(403).end('Forbidden'); return;
    }
    const file = files.get(req.url);
    if (!file) {res.writeHead(404).end('Not found'); return;}
    const headers = {'Content-Type': file[1], 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'",
      'Referrer-Policy': 'no-referrer'};
    try {
      const body = await readFile(file[0]);
      res.writeHead(200, headers).end(body);
    }
    catch {res.writeHead(404, headers).end(req.url === '/report.json' ? '{"error":"尚未采集，请运行 npm run ops:collect"}' : 'Not found');}
  });
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.OPS_PORT || 4318);
  dashboardServer().listen(port, '127.0.0.1', () => console.log(`Coding 101 运营看板：http://127.0.0.1:${port}`));
}
