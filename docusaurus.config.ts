import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import remarkArticleBlocks from "./plugins/remark-article-blocks";
import englishCatalog from './i18n/en/catalog.json';

const english = process.env.DOCUSAURUS_CURRENT_LOCALE === 'en';
const routeFromFile = (file: string) => '/' + file.replace(/\.(?:mdx?|tsx?)$/, '').replace(/(^|\/)index$/, '');
const englishRoutes = [
  ...englishCatalog.pages.map(routeFromFile),
  ...englishCatalog.docs.map((file) => '/docs' + routeFromFile(file)),
  ...englishCatalog.generatedRoutes,
];

const enableAnalytics =
  process.env.NODE_ENV === "production" && process.env.LOCAL_PREVIEW !== "true";
const adsenseClient = process.env.ADSENSE_CLIENT || 'ca-pub-4697439207371426';

// Production builds opt into accounts, subscriptions and progress tracking.
// Lightweight public previews can omit LEARNER_FEATURES; mocks also enable it.
const learnerFeatures =
  process.env.LEARNER_FEATURES === "true" || process.env.LEARNER_MOCKS === "true";

const stylePreviewPlugins: NonNullable<Config["plugins"]> =
  process.env.STYLE_PREVIEW === "true"
    ? [
        [
          "@docusaurus/plugin-content-docs",
          {
            id: "stylePreview",
            path: "plans/style-calibration/2026-08-28",
            routeBasePath: "preview",
            include: ["WELCOME.md"],
            sidebarPath: false,
          },
        ],
      ]
    : [];

const config: Config = {
  title: "Coding 101",
  tagline: english ? 'Technical interview preparation, from study priorities to clear answers' : "技术求职准备，从岗位路线到面试回答",
  favicon: "img/logo-duck.svg",

  // Set the production url of your site here
  url: "https://coding101.linsama.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",
  // Workers serves directory index files at trailing-slash URLs. Canonicals,
  // sitemaps and internal links must name that final HTTP 200 destination.
  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "LoveOrange", // Usually your GitHub org/user name.
  projectName: "coding101", // Usually your repo name.

  onBrokenLinks: "throw",

  customFields: {
    englishRoutes,
    // Local previews only: enables ?mock=<preset> sample learner states.
    learnerMocks: process.env.LEARNER_MOCKS === "true",
    learnerFeatures,
    // The site's own API (worker/): accounts, billing, synced records.
    serverApi: true,
    // Online payment; off until the Creem store is live (the account
    // service's PRODUCT_CHECKOUT refuses checkouts until then as well).
    checkoutOpen: process.env.CHECKOUT_OPEN === "true",
    analyticsId: enableAnalytics ? 'G-Q16V88YMHD' : null,
    // Only the canonical production host displays the article ad unit.
    adsenseClient: enableAnalytics && process.env.ADSENSE_ENABLED === 'true' ? adsenseClient : null,
    adsenseSlot: '9606013308',
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans", "en"],
    localeConfigs: {
      'zh-Hans': {label: '简体中文', htmlLang: 'zh-Hans'},
      en: {label: 'English', htmlLang: 'en'},
    },
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: english ? false : "./sidebars.ts",
          ...(english ? {include: englishCatalog.docs} : {}),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/loveorange/coding101/tree/main/",
          editLocalizedFiles: true,
          showLastUpdateTime: true,
          remarkPlugins: [remarkArticleBlocks],
        },
        pages: english ? {include: englishCatalog.pages} : {},
        blog: english ? false : {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/loveorange/coding101/tree/main/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },
  themes: ["@docusaurus/theme-mermaid"],

  themeConfig: {
    image: "img/coding101-social-card.png",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Coding 101",
      items: [
        {
          to: "/topics",
          activeBaseRegex: "^/(topics|docs/basic-knowledge|docs/system-design|docs/ai|docs/devops)",
          position: "left",
          label: "主题",
        },
        {
          to: "/questions",
          activeBaseRegex: learnerFeatures ? "^/(questions|exam|review|weak)" : "^/(questions|review)",
          position: "left",
          label: "题库",
        },
        ...(learnerFeatures
          ? [
              {
                to: "/progress",
                activeBaseRegex: "^/(progress|cards)",
                position: "left" as const,
                label: "我的进度",
              },
            ]
          : []),
        {
          type: "dropdown",
          label: "更多",
          position: "left",
          items: [
            { to: "/interview-roadmaps/", label: "岗位路线" },
            { to: "/docs/tags/interview-preparation", label: "面试准备" },
            { to: "/docs/tools-and-frameworks/git/", label: "工具与框架" },
            { to: "/docs/chatgpt-guide/", label: "ChatGPT 辅助面试复习" },
            { to: "/about", label: "关于本站" },
            { href: "https://github.com/loveorange/coding101", label: "GitHub" },
          ],
        },
        ...(learnerFeatures ? [{ type: "custom-account", position: "right" as const }] : []),
      ],
    },
    footer: {
      style: "light",
      links: [
        {
          title: "学习",
          items: [
            { label: "主题", to: "/topics" },
            { label: "题库", to: "/questions" },
            { label: "岗位路线", to: "/interview-roadmaps/" },
            { label: "Java 后端路线", to: "/java-interview-roadmap/" },
            { label: "Agent 开发路线", to: "/agent-interview-roadmap/" },
            { label: "运维 / SRE 路线", to: "/sre-interview-roadmap/" },
          ],
        },
        {
          title: "资料",
          items: [
            { label: "面试准备", to: "/docs/tags/interview-preparation" },
            { label: "工具与框架", to: "/docs/tools-and-frameworks/git/" },
            { label: "文章目录", to: "/articles/" },
            { label: "使用指南", to: "/docs/intro" },
          ],
        },
        {
          title: "项目",
          items: [
            { label: "关于本站", to: "/about" },
            { label: "联系与纠错", to: "/contact" },
            { label: "隐私与 Cookie", href: "https://coding101.linsama.com/privacy/" },
            { label: "服务条款", to: "/terms" },
            { label: "GitHub", href: "https://github.com/loveorange/coding101" },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Coding 101 · Linsama Builds`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        "powershell",
        "java",
        // 'sh',
        "sql",
      ],
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    ["./plugins/learning-content/index.ts", { learnerFeatures }],
    "./plugins/content-discovery/index.ts",
    ["./plugins/adsense/index.ts", { client: adsenseClient }],
    './plugins/analytics/index.ts',
    ...stylePreviewPlugins,
    // [
    //   "@docusaurus/plugin-ideal-image",
    //   {
    //     sizes: [320, 480, 640, 800, 960],
    //     quality: 85,
    //     max: 640,
    //     min: 320,
    //     steps: 3,
    //     disableInDev: false,
    //   },
    // ],
  ],
};

const theme = config.themeConfig as Preset.ThemeConfig;
if (english) {
  const labels: Record<string, string> = {
    '主题': 'Topics', '题库': 'Questions', '我的进度': 'My progress', '更多': 'More',
    '岗位路线': 'Role guides', '面试准备': 'Interview preparation', '工具与框架': 'Tools and frameworks',
    'ChatGPT 辅助面试复习': 'Studying with ChatGPT', '关于本站': 'About',
    '学习': 'Study', '资料': 'Resources', '项目': 'Project',
    'Java 后端路线': 'Java backend guide', 'Agent 开发路线': 'Agent development guide',
    '运维 / SRE 路线': 'DevOps / SRE guide', '文章目录': 'Article directory', '使用指南': 'Study guide',
    '联系与纠错': 'Contact and corrections', '隐私与 Cookie': 'Privacy and cookies (Chinese)', '服务条款': 'Terms',
  };
  const localize = (item: {label?: unknown; title?: unknown; items?: unknown}) => {
    if (typeof item.label === 'string') item.label = labels[item.label] ?? item.label;
    if (typeof item.title === 'string') item.title = labels[item.title] ?? item.title;
    if (Array.isArray(item.items)) item.items.forEach(localize);
  };
  theme.navbar?.items?.forEach(localize);
  theme.footer?.links?.forEach(localize);
}
theme.navbar?.items?.push({type: 'localeDropdown', position: 'right'});

export default config;
