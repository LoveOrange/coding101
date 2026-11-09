import {execFile} from 'node:child_process';
import {promisify} from 'node:util';

const exec = promisify(execFile);
const origin = new URL(process.argv[2] ?? 'https://coding101.linsama.com/');
if (origin.protocol !== 'https:' && origin.hostname !== '127.0.0.1') throw new Error('Use an HTTPS origin or localhost');
const userAgent = 'Coding101DiscoveryAudit/1.0 (+https://coding101.linsama.com/about)';
async function fetchPage(url, agent = userAgent) {
  const {stdout} = await exec('curl', ['--silent', '--show-error', '--location', '--max-time', '30', '--retry', '1', '--user-agent', agent, '--include', '--write-out', '\n%{http_code}\n%{url_effective}', url.href], {maxBuffer: 12 * 1024 * 1024});
  const lines = stdout.trimEnd().split('\n');
  const effectiveUrl = lines.pop();
  const status = Number(lines.pop());
  const raw = lines.join('\n');
  const bodyStart = raw.lastIndexOf('\r\n\r\n');
  const headers = raw.slice(0, bodyStart);
  const body = raw.slice(bodyStart + 4);
  return {status, effectiveUrl, headers, body};
}
const report = {checkedAt: new Date().toISOString(), origin: origin.href, userAgent, limitations: 'Synthetic HTTP probes are not evidence of verified search-bot visits or indexing. Confirm actual crawl and indexing in Search Console and CDN logs.', sitemaps: [], pages: [], probes: [], errors: []};
const robots = await fetchPage(new URL('robots.txt', origin));
if (robots.status !== 200 || !/User-agent:\s*\*/i.test(robots.body)) report.errors.push('robots.txt unavailable or missing general policy');
const maps = [...robots.body.matchAll(/^Sitemap:\s*(\S+)/gmi)].map((match) => new URL(match[1]));
if (!maps.length) report.errors.push('robots.txt does not advertise a sitemap');
for (const url of maps) {
  if (url.origin !== origin.origin) {report.errors.push(`Unexpected sitemap origin: ${url}`); continue;}
  const response = await fetchPage(url);
  const urls = [...response.body.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].replace(/&amp;/g, '&'));
  report.sitemaps.push({url: url.href, status: response.status, count: urls.length});
  if (response.status !== 200 || !urls.length) report.errors.push(`Invalid sitemap: ${url}`);
  const sample = urls.filter((url) => url.includes('/docs/')).filter((_, i, all) => i % Math.max(1, Math.floor(all.length / 10)) === 0).slice(0, 10);
  for (const href of [...new Set([origin.href, ...['about', 'articles/', 'java-interview-roadmap/', 'agent-interview-roadmap/', 'sre-interview-roadmap/'].map((route) => new URL(route, origin).href), ...sample])]) {
    if (report.pages.some((page) => page.url === href)) continue;
    const response = await fetchPage(new URL(href));
    const canonical = response.body.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
    const blocked = /<meta[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(response.body) || /x-robots-tag:[^\r\n]*noindex/i.test(response.headers);
    const result = {url: href, status: response.status, effectiveUrl: response.effectiveUrl, canonical, noindex: blocked, hasMain: /<main\b/.test(response.body)};
    report.pages.push(result);
    if (result.status !== 200 || !canonical || blocked || !result.hasMain) report.errors.push(`Public page failed crawl checks: ${href}`);
  }
}
// Detect generic-client filtering separately. Do not impersonate verified bots.
for (const agent of ['Python-urllib/3.9', 'Mozilla/5.0']) {
  const response = await fetchPage(origin, agent);
  report.probes.push({userAgent: agent, status: response.status, cloudflare1010: /error code: 1010/.test(response.body)});
}
console.log(JSON.stringify(report, null, 2));
if (report.errors.length) process.exitCode = 1;
