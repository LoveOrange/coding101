export type OutlineCatalogEntry = {
  id: string;
  label: string;
  href?: string;
};

export const sharedFoundationOutlines: OutlineCatalogEntry[] = [
  {id: 'F01', label: '数据结构、算法与现场编码', href: '/docs/basic-knowledge/algorithms/'},
  {id: 'F02', label: '计算机基础综合', href: '/docs/basic-knowledge/common/'},
  {id: 'F03', label: 'SQL、索引与事务', href: '/docs/basic-knowledge/database/'},
  {id: 'F04', label: 'Git 与版本控制', href: '/docs/tools-and-frameworks/git/'},
  {id: 'F05', label: '系统设计与分布式系统', href: '/docs/system-design/'},
  {id: 'F06', label: '安全、隐私与供应链安全', href: '/docs/system-design/security/'},
  {id: 'F07', label: '简历、项目与面试表达'},
  {id: 'F08', label: '数学、机器学习与深度学习'},
];

export const roleOutlines: OutlineCatalogEntry[] = [
  {id: 'R01', label: 'Java 后端开发', href: '/java-interview-roadmap/'},
  {id: 'R02', label: 'Go 后端与云原生开发'},
  {id: 'R03', label: 'Python 后端与 AI 服务开发'},
  {id: 'R04', label: 'C++ 系统与基础设施开发'},
  {id: 'R05', label: 'Web 前端开发'},
  {id: 'R06', label: '移动端通用与跨平台开发'},
  {id: 'R07', label: 'Android 开发'},
  {id: 'R08', label: 'iOS 开发'},
  {id: 'R09', label: '大数据与数据工程'},
  {id: 'R10', label: '软件测试与测试开发'},
  {id: 'R11', label: '运维、DevOps、SRE 与平台工程'},
  {id: 'R12', label: '大模型算法、训练与推理'},
  {id: 'R13', label: '大模型应用与 RAG 工程'},
  {id: 'R14', label: 'AI Agent 工程'},
];
