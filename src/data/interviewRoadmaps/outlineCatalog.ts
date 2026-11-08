export type OutlineRoute = {
  label: string;
  href?: string;
  /** Published but still missing some articles. */
  status?: 'building';
};

export type OutlineCatalogEntry = OutlineRoute & {
  id: string;
  routes?: OutlineRoute[];
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
  {id: 'R01', label: '后端开发', routes: [
    {label: 'Java', href: '/java-interview-roadmap/'},
    {label: 'Go', href: '/topics?role=go'},
    {label: 'Python'},
    {label: 'Node.js'},
  ]},
  {id: 'R02', label: '前端开发', href: '/topics?role=frontend-react'},
  {id: 'R03', label: '移动端开发', href: '/topics?role=mobile-shared'},
  {id: 'R04', label: '测试开发', href: '/topics?role=testing-python'},
  {id: 'R05', label: '大数据开发'},
  {id: 'R06', label: 'DevOps / SRE', href: '/sre-interview-roadmap/', status: 'building'},
  {id: 'R07', label: 'AI 应用开发', routes: [
    {label: 'AI Agent', href: '/agent-interview-roadmap/'},
  ]},
];
