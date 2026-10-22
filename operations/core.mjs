import {homedir} from 'node:os';
import {join} from 'node:path';

export const dataDir = process.env.CODING101_OPS_DATA_DIR || join(homedir(), '.local/share/coding101-operations');
export const configPath = process.env.CODING101_OPS_CONFIG || join(homedir(), '.config/coding101-operations/config.json');
export const timezone = 'Asia/Shanghai';
export function dayAt(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit'}).format(now);
}
export function shiftDay(day, offset) {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + offset);
  return d.toISOString().slice(0, 10);
}
export function windowFor(now = new Date()) {
  const end = shiftDay(dayAt(now), -1);
  return {start: shiftDay(end, -27), end, timezone};
}
export function change(current, previous) {
  if (current == null || previous == null) return '不可比较';
  const delta = current - previous;
  const sign = delta > 0 ? '+' : '';
  if (previous === 0) return `${sign}${delta}（基期为 0，不计算百分比）`;
  return `${sign}${delta}（${sign}${(delta / previous * 100).toFixed(1)}%）`;
}
export function gaRows(response) {
  return (response.rows || []).map(row => Object.fromEntries([
    ...(response.dimensionHeaders || []).map((h, i) => [h.name, row.dimensionValues[i].value]),
    ...(response.metricHeaders || []).map((h, i) => [h.name, Number(row.metricValues[i].value)]),
  ]));
}
const promotionViews = [
  ['sources', '推广来源 / 媒介', ['sessionManualSource', 'sessionManualMedium']],
  ['campaigns', '推广活动', ['sessionManualCampaignName']],
  ['contents', '推广内容（来源 / 媒介 / 活动 / 内容）', ['sessionManualSource', 'sessionManualMedium', 'sessionManualCampaignName', 'sessionManualAdContent']],
];
const markdownCell = value => String(value ?? '未识别').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('|', '&#124;').replace(/[\r\n]/g, ' ');
export function promotionReport(promotion) {
  if (!promotion) return ['推广统计尚未采集，请刷新采集结果；不能视为零访问。'];
  const lines = ['## 推广表现', '', '仅统计 GA4 已识别活动名称的手动推广会话；缺少活动名称的访问不在本表内。未返回行不等于没有推广访问。',
    '访客按各分组和时间范围独立去重，不能相加；此处不代表注册、付费或收入归因。'];
  for (const [period, label] of [['yesterday', '昨日（暂定）'], ['monthly', '近 28 天']]) {
    const current = promotion[period];
    lines.push('', `### ${label} · ${current?.start ?? '未知'} — ${current?.end ?? '未知'}`);
    for (const [view, title, dimensions] of promotionViews) {
      const result = current?.views?.[view];
      lines.push('', `**${title}**`);
      if (result?.status !== 'ok') {lines.push(result?.message || '尚未采集，不能视为零访问。'); continue;}
      if (!result.data.rows.length) {lines.push('本期未返回可识别活动的推广数据。'); continue;}
      const prior = promotion.previousWeek?.views?.[view];
      lines.push('', `| ${title} | 会话 | 访客 | PV |${period === 'yesterday' ? ' 较上周同日会话变化 |' : ''}`,
        `| --- | ---: | ---: | ---: |${period === 'yesterday' ? ' ---: |' : ''}`);
      for (const row of result.data.rows.slice(0, 5)) {
        const before = prior?.status === 'ok' ? prior.data.rows.find(p => dimensions.every(d => p[d] === row[d])) : null;
        const delta = row.sessions != null && before?.sessions != null ? row.sessions - before.sessions : null;
        const comparison = delta == null ? '不可比较（基期失败或未返回该组）' : `${delta > 0 ? '+' : ''}${delta}`;
        lines.push(`| ${dimensions.map(d => markdownCell(row[d] === '(not set)' || row[d] === '' ? '未标记/未识别' : row[d])).join(' / ')} | ${row.sessions ?? '未知'} | ${row.totalUsers ?? '未知'} | ${row.screenPageViews ?? '未知'} |${period === 'yesterday' ? ` ${comparison} |` : ''}`);
      }
      if (result.data.rowCount > 5) lines.push(`仅展示会话前 5 组，共 ${result.data.rowCount} 组；不将榜单合计当作全部推广流量。`);
      const m = result.data.metadata;
      if (m?.subjectToThresholding || m?.dataLossFromOtherRow || m?.samplingMetadatas?.length) lines.push('本表存在 GA4 阈值、聚合或抽样限制。');
    }
  }
  lines.push('', `上周同日比较日期：${promotion.previousWeek?.end ?? '未知'}；基期缺行或未进入已采集的前 20 组时，不补零。`);
  return lines;
}
export function dailyReport(report) {
  const lines = [`# Coding 101 运营日报 · ${report.window.end}`, '',
    `统计时区：${timezone}；采集时间：${report.generatedAt}。账户与权益为采集时点快照。`, ''];
  for (const [key, label] of [['account', '账户与权益'], ['learning', '学习记录'], ['ga', 'GA4 流量']]) {
    const source = report.sources[key];
    lines.push(`- ${label}：${source.status === 'ok' ? '已采集' : source.message}`);
  }
  const account = report.sources.account.data;
  if (account) {
    const current = account.daily.find(r => r.date === report.window.end);
    const prior = account.daily.find(r => r.date === shiftDay(report.window.end, -7));
    lines.push('', `现存账户 ${account.snapshot.users}；当前有效订阅用户 ${account.snapshot.subscriptionUsers}；当前 Pro 权益用户 ${account.snapshot.proUsers}；当前纯试用用户 ${account.snapshot.trialUsers}。`,
      `昨日新增账户 ${current.registrations}，较上周同日 ${change(current.registrations, prior?.registrations)}；昨日兑换 ${current.redemptions} 个激活码。`,
      '新增账户按当前仍存在的用户记录计算；删除账户后历史值会减少。Pro 含兑换、一次性购买和人工赠送，不等同于付费订阅。');
  }
  const ga = report.sources.ga.data;
  if (ga) {
    const today = ga.daily.find(r => r.date === report.window.end.replaceAll('-', ''));
    const before = ga.daily.find(r => r.date === shiftDay(report.window.end, -7).replaceAll('-', ''));
    lines.push('', `昨日 GA4 访客 ${today?.totalUsers ?? '无返回行'}；浏览量 ${today?.screenPageViews ?? '无返回行'}；会话 ${today?.sessions ?? '无返回行'}。`,
      `浏览量较上周同日：${change(today?.screenPageViews, before?.screenPageViews)}。`,
      '昨日 GA4 数据为暂定值；缺行不自动记为 0。广告拦截、同意状态和网络可造成漏计。');
    lines.push('', ...promotionReport(ga.promotion));
  }
  lines.push('', ...report.notes.map(note => `- ${note}`), '', '收入、MRR、学习活跃与留存尚未接入可靠口径，不作估算。', '');
  return lines.join('\n');
}
