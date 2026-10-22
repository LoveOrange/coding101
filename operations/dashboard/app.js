let report;
const $ = id => document.getElementById(id);
const number = value => value == null ? '—' : new Intl.NumberFormat('zh-CN').format(value);
function node(tag, text, className) {
  const el = document.createElement(tag);
  if (text != null) el.textContent = text;
  if (className) el.className = className;
  return el;
}
function empty(text = '数据源尚未接入，接通后自动展示。') {return node('div', text, 'empty');}
function list(id, rows, dimension, metric) {
  $(id).replaceChildren();
  if (!rows?.length) {$(id).append(empty(rows ? '本期没有返回排行数据。' : undefined)); return;}
  for (const row of rows) {
    const item = node('div', null, 'list-row');
    item.append(node('span', row[dimension]), node('b', number(row[metric])));
    $(id).append(item);
  }
}
function promotions() {
  const periods = report?.sources.ga.data?.promotion;
  const period = $('promotion-period').value;
  const selected = periods?.[period];
  $('promotion-dates').textContent = selected ? `${selected.start} — ${selected.end}${period === 'yesterday' ? ' · 暂定' : ''}` : '尚未采集推广统计';
  const definitions = [
    ['sources', ['来源', '媒介'], ['sessionManualSource', 'sessionManualMedium']],
    ['campaigns', ['活动'], ['sessionManualCampaignName']],
    ['contents', ['来源', '媒介', '活动', '内容'], ['sessionManualSource', 'sessionManualMedium', 'sessionManualCampaignName', 'sessionManualAdContent']],
  ];
  for (const [view, labels, dimensions] of definitions) {
    const container = $(`promotion-${view}`);
    container.replaceChildren();
    const result = selected?.views?.[view];
    if (result?.status !== 'ok') {container.append(empty(result?.message || '尚未采集，不能视为零访问。')); continue;}
    if (!result.data.rows.length) {container.append(empty('本期未返回可识别活动的推广数据。未返回行不等于没有推广访问。')); continue;}
    const table = node('table');
    const head = node('thead'); const heading = node('tr');
    for (const text of [...labels, '会话', '访客', 'PV', '参与率', ...(period === 'yesterday' ? ['会话变化¹'] : [])]) {
      const th = node('th', text); th.scope = 'col'; heading.append(th);
    }
    head.append(heading); table.append(head);
    const body = node('tbody');
    for (const row of result.data.rows) {
      const tr = node('tr');
      const values = dimensions.map(d => !row[d] || row[d] === '(not set)' ? '未标记/未识别' : row[d]);
      values.push(number(row.sessions), number(row.totalUsers), number(row.screenPageViews), row.engagementRate == null ? '—' : `${(row.engagementRate * 100).toFixed(1)}%`);
      if (period === 'yesterday') {
        const prior = periods?.previousWeek?.views?.[view];
        const before = prior?.status === 'ok' ? prior.data.rows.find(p => dimensions.every(d => p[d] === row[d])) : null;
        const delta = row.sessions != null && before?.sessions != null ? row.sessions - before.sessions : null;
        values.push(delta == null ? '不可比较' : `${delta > 0 ? '+' : ''}${delta}`);
      }
      for (const value of values) tr.append(node('td', value));
      body.append(tr);
    }
    table.append(body); container.append(table);
    const {rowCount, limit, metadata: m} = result.data;
    if (rowCount > limit) container.append(node('p', `仅展示会话前 ${limit} 组，共 ${rowCount} 组。榜单不是全部推广流量。`, 'caption'));
    if (m?.subjectToThresholding || m?.dataLossFromOtherRow || m?.samplingMetadatas?.length) container.append(node('p', '本表存在 GA4 阈值、聚合或抽样限制。', 'caption'));
  }
}
function chart() {
  const ga = report?.sources.ga.data;
  const range = Number($('range').value);
  const metric = $('metric').value;
  $('chart').replaceChildren();
  $('traffic-summary').textContent = '';
  if (!ga?.daily.length) {$('chart').append(empty('接入 GA4 后，在这里查看访问趋势。缺失数据不会绘制为零。')); return;}
  const start = new Date(`${report.window.end}T00:00:00Z`);
  start.setUTCDate(start.getUTCDate() - range + 1);
  const days = Array.from({length: range}, (_, i) => {
    const d = new Date(start); d.setUTCDate(d.getUTCDate() + i);
    return d.toISOString().slice(0, 10).replaceAll('-', '');
  });
  const maximum = Math.max(1, ...ga.daily.map(r => r[metric]));
  for (const [i, day] of days.entries()) {
    const row = ga.daily.find(r => r.date === day);
    const wrap = node('div', null, 'bar-wrap');
    wrap.title = `${day.slice(0, 4)}-${day.slice(4, 6)}-${day.slice(6)}：${number(row?.[metric])}`;
    wrap.setAttribute('aria-label', wrap.title);
    if (row) {
      const bar = node('div', null, 'bar');
      bar.style.height = `${row[metric] / maximum * 100}%`;
      wrap.append(bar);
    }
    if (range === 7 || i % 5 === 0 || i === days.length - 1) wrap.append(node('small', `${day.slice(4, 6)}/${day.slice(6)}`));
    $('chart').append(wrap);
  }
  const total = range === 7 ? ga.weekly : ga.monthly;
  $('traffic-summary').textContent = `近 ${range} 天：${number(total?.totalUsers)} 位 GA4 访客 · ${number(total?.screenPageViews)} 次浏览 · ${number(total?.sessions)} 次会话`;
}
function render(data) {
  report = data;
  $('date').textContent = `日报日期 ${data.window.end}`;
  $('freshness').textContent = `采集于 ${new Date(data.generatedAt).toLocaleString('zh-CN', {timeZone: 'Asia/Shanghai', hour12: false})}`;
  const unavailable = Object.values(data.sources).filter(s => s.status !== 'ok').length;
  const stale = Date.now() - Date.parse(data.generatedAt) > 30 * 3600000;
  $('notice').textContent = [unavailable ? `${unavailable} 个数据源尚未可用。以下显示真实接入状态，暂无数据的指标以 — 展示。` : '',
    stale ? '采集结果已超过 30 小时，请检查每日任务。' : '',
    data.notes.some(n => n.includes('报告限制')) ? 'GA4 返回报告限制提示，请核对本地日报。' : ''].filter(Boolean).join(' ');
  const account = data.sources.account.data;
  const snapshot = account?.snapshot;
  const yesterday = account?.daily.find(r => r.date === data.window.end);
  const ga = data.sources.ga.data;
  const traffic = ga?.daily.find(r => r.date === data.window.end.replaceAll('-', ''));
  $('metrics').replaceChildren();
  for (const [i, [label, value, note]] of [
    ['昨日访客', traffic?.totalUsers, 'GA4 totalUsers · 暂定'],
    ['昨日浏览量', traffic?.screenPageViews, 'GA4 page views · 暂定'],
    ['昨日新增账户', yesterday?.registrations, '当前仍存在的注册记录'],
    ['有效订阅用户', snapshot?.subscriptionUsers, '当前快照 · 含有效取消与宽限期'],
  ].entries()) {
    const card = node('article', null, `metric${i === 0 ? ' primary' : ''}`);
    card.append(node('div', label, 'metric-label'), node('div', number(value), 'metric-value'), node('div', note, 'metric-note'));
    $('metrics').append(card);
  }
  $('membership').replaceChildren();
  for (const [label, value] of [
    ['现存账户', snapshot?.users], ['已验证邮箱账户', snapshot?.verifiedUsers],
    ['有效订阅合同', snapshot?.subscriptionContracts], ['自动续费用户', snapshot?.autoRenewUsers],
    ['已取消续费用户', snapshot?.cancelingUsers], ['宽限期用户', snapshot?.pastDueUsers],
    ['Pro 权益用户', snapshot?.proUsers], ['纯试用用户', snapshot?.trialUsers],
    ['昨日兑换码数量', yesterday?.redemptions], ['有同步记录用户', data.sources.learning.data?.storedLearners],
    ['最后同步在昨日', data.sources.learning.data?.syncedYesterday], ['订阅到期时间缺失', snapshot?.unknownEndSubscriptions],
  ]) {
    const fact = node('div', null, 'fact'); fact.append(node('span', label), node('strong', number(value)));
    $('membership').append(fact);
  }
  list('pages', ga?.pages, 'pagePath', 'screenPageViews');
  list('channels', ga?.channels, 'sessionDefaultChannelGroup', 'sessions');
  $('sources').replaceChildren();
  for (const [key, label] of [['account', '01 / 账户数据库'], ['learning', '02 / 学习数据库'], ['ga', '03 / Google Analytics']]) {
    const source = data.sources[key];
    const box = node('div', null, 'source');
    box.append(node('strong', label), node('p', source.status === 'ok' ? '● 已采集' : '○ 待接入 / 检查', source.status), node('p', source.message || '本次读取成功，仅展示聚合结果。'));
    $('sources').append(box);
  }
  chart();
  promotions();
}
async function refresh() {
  $('refresh').disabled = true;
  try {
    const response = await fetch('/report.json', {cache: 'no-store'});
    if (!response.ok) throw new Error('尚无采集结果。请在项目目录运行 npm run ops:collect。');
    render(await response.json());
  } catch (err) {$('notice').textContent = err.message;}
  finally {$('refresh').disabled = false;}
}
$('refresh').addEventListener('click', refresh);
$('range').addEventListener('change', chart);
$('metric').addEventListener('change', chart);
$('promotion-period').addEventListener('change', promotions);
refresh();
setInterval(refresh, 60000);
