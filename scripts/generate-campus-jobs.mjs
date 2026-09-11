import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const research = JSON.parse(fs.readFileSync(path.join(root, 'plans/audits/java-campus/research-sources.json'), 'utf8'));
const jobs = research.jobs.filter((job) => job.verified && job.cohort?.includes('2027'));
const slugs = {'百度':'baidu','字节跳动':'bytedance','快手':'kuaishou','腾讯':'tencent','阿里巴巴':'alibaba','美团':'meituan','京东':'jd','网易':'netease','蚂蚁集团':'ant','小红书':'xiaohongshu','滴滴':'didi','携程':'trip','华为':'huawei','哔哩哔哩':'bilibili','拼多多':'pdd'};
const groups = Object.groupBy ? Object.groupBy(jobs, (job) => job.company) : jobs.reduce((all, job) => ((all[job.company] ??= []).push(job), all), {});
const output = path.join(root, 'docs/interview/campus-2027');
fs.mkdirSync(output, {recursive: true});
const write = (name, text) => {
  const destination = path.join(output, name);
  if (process.argv.includes('--check')) {
    if (!fs.existsSync(destination) || fs.readFileSync(destination, 'utf8') !== text) throw new Error(`请运行 node scripts/generate-campus-jobs.mjs 更新 ${name}`);
  } else fs.writeFileSync(destination, text);
};
const frontmatter = (position) => `---\nsidebar_position: ${position}\ntags: [campus-2027, interview-preparation]\n---\n\n`;
const list = (values) => values?.length ? values.map((value) => `- ${value}`).join('\n') : '原页未单列。';
for (const [company, entries] of Object.entries(groups)) {
  if (!slugs[company]) throw new Error(`缺少公司路径：${company}`);
  let text = frontmatter(10) + `# ${company} 2027 校招岗位\n\n本页转述${company}公开招聘页面中已核验的岗位职责和任职要求，采集日期为 ${research.collectedAt}。岗位开放状态、地点和资格可能变化，投递前请回到来源页面确认。\n\n`;
  for (const job of entries) {
    text += `## ${job.title} {#${job.id.toLowerCase()}}\n\n[${job.sourceType === '企业官网' ? '官方职位与投递入口' : '企业招聘账号发布页与投递入口'}](${job.url})\n\n`;
    text += `| 信息 | 内容 |\n| --- | --- |\n| 职位编号 | ${job.jobId ?? '未披露'} |\n| 招聘类型 | ${job.type} · ${job.cohort} 届 |\n| 团队 | ${job.team ?? '原页未单列'} |\n| 地点 | ${job.cities?.join('、') || '未披露'} |\n| ${job.dateKind ?? '页面日期'} | ${job.date ?? '未披露'} |\n| 语言范围 | ${job.language} |\n\n`;
    text += `**资格要求**：${job.eligibility}\n\n### 岗位职责\n\n${list(job.duties)}\n\n### 任职要求\n\n${list(job.requirements)}\n\n### 加分项\n\n${list(job.preferred)}\n\n`;
    if (job.notes) text += `${job.notes}\n\n`;
    if (job.contextUrl) text += `[招聘项目与列表来源](${job.contextUrl})。\n\n`;
  }
  text += `## 准备资料\n\n先对照[岗位要求与方向差异](./index.mdx#requirements)选择范围，再进入 [Java 校招复习范围](../java-campus-review.mdx)、[简历准备](../resume.mdx)与[项目准备](../project-preparation.mdx)。\n`;
  write(`${slugs[company]}.mdx`, text);
}
let index = frontmatter(1)+`# 2027 校招岗位与投递\n\n本页整理接受 Java 的后端校招岗位，提供具体职责、任职要求和投递入口；来源分别标明企业官网或招聘平台的企业账号。当前收录 **${jobs.length} 条去重 JD，覆盖 ${Object.keys(groups).length} 家公司**，采集日期为 ${research.collectedAt}；所选样本不代表全部招聘岗位。\n\n同一职位在多个城市或业务集团使用相同正文时合并。校招正式、实习及适用毕业时间按各职位标注；不以职位名称或网页抓取时间推断资格。\n\n## 1. 具体岗位与投递\n\n| 公司 | 岗位 | 招聘类型 | 详情与投递 |\n| --- | --- | --- | --- |\n`;
for (const job of jobs) index += `| ${job.company} | ${job.title} | ${job.type} | [查看 JD](./${slugs[job.company]}.mdx#${job.id.toLowerCase()}) · [${job.sourceType === '企业官网' ? '官方入口' : '企业发布页'}](${job.url}) |\n`;
index += `\n## 2. 岗位要求与方向差异 {#requirements}\n\n先区分资格、基本能力和方向要求，再选复习内容。下面是当前样本的归纳，不提供市场占比或面试命中概率。\n\n| 要求类型 | 如何理解 | 对应资料 |\n| --- | --- | --- |\n| 毕业时间、学历、专业与地点 | 每个岗位单独核对；不同公司毕业区间可能不同 | 上方具体 JD 与官网 |\n| Java 或其他后端语言 | 有些岗位明确 Java，有些允许 Go、C++ 等语言；不能自动推导为必须掌握全部框架 | [Java 校招复习范围](../java-campus-review.mdx) |\n| 数据结构、算法、操作系统与网络 | 既要能解释，也要能通过编码或时序分析检查理解 | [通用基础复习](../../basic-knowledge/common/index.mdx)、[编码与 SQL 练习](../coding-practice.mdx) |\n| 数据库、缓存与消息 | 区分会使用、理解机制和能处理故障；依具体 JD 与项目选择深度 | [数据库](../../basic-knowledge/database/index.mdx)、[Redis](../../basic-knowledge/nosql/redis/index.mdx) |\n| 项目、调试、协作与代码质量 | 展示个人贡献、选择理由和验证证据 | [项目准备](../project-preparation.mdx)、[简历准备](../resume.mdx) |\n| 安全、分布式、AI 等专项 | 职责、必需条件和加分项分别记录，不全都升级为所有人的必会 | 各职位的任职要求与加分项 |\n\n例如，快手安全 Java 方向的职责包含 PKI 与设备认证；阿里 Java 岗位明确提到大模型 API 和应用框架；字节、百度、腾讯的部分岗位涉及 AI 辅助研发与结果验证。具体条件见各岗位原页，不据此要求所有候选人重做一个 AI 项目。\n\n## 3. 使用顺序\n\n1. 打开具体 JD，确认资格、职责、任职要求和加分项，保留目标职位链接。\n2. 对照[复习范围](../java-campus-review.mdx)选择主题；两周先读核心，有更多时间再补机制与迁移练习。\n3. 使用[简历准备](../resume.mdx)与[项目准备](../project-preparation.mdx)整理真实经历。\n4. 回到来源入口确认职位仍开放并自行投递；投递记录和日程保存在自己的工具中。\n\n更多资料可按[2027 校招季](/docs/tags/campus-2027)和[面试准备](/docs/tags/interview-preparation)标签查阅。\n`;
index = index.replace(/(?:^\|.*\n)+/gm, (table) => '<div className="campus-resource-table" tabIndex={0} role="region" aria-label="岗位资料表格，可横向滚动">\n\n'+table+'\n</div>\n');
write('index.mdx', index);
write('_category_.json', JSON.stringify({label:'2027 校招季',position:2},null,2)+'\n');
console.log(`${jobs.length} 条 JD，${Object.keys(groups).length} 家公司；岗位页面${process.argv.includes('--check')?'检查通过':'已生成'}。`);
