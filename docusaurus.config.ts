import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import remarkArticleBlocks from "./plugins/remark-article-blocks";

const enableAnalytics =
  process.env.NODE_ENV === "production" && process.env.LOCAL_PREVIEW !== "true";

// Accounts, subscriptions, spaced review and progress tracking are built but
// held back until there are real users. LEARNER_FEATURES=true (or the mock
// preview flag) turns them on for local work.
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
  tagline: "技术求职准备，从岗位路线到面试回答",
  favicon: "img/logo-duck.svg",

  // Set the production url of your site here
  url: "https://coding101.linsama.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "LoveOrange", // Usually your GitHub org/user name.
  projectName: "coding101", // Usually your repo name.

  onBrokenLinks: "throw",

  customFields: {
    // Local previews only: enables ?mock=<preset> sample learner states.
    learnerMocks: process.env.LEARNER_MOCKS === "true",
    learnerFeatures,
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/loveorange/coding101/tree/main/",
          showLastUpdateTime: true,
          remarkPlugins: [remarkArticleBlocks],
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/loveorange/coding101/tree/main/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        ...(enableAnalytics
          ? {
              gtag: {
                trackingID: "G-Q16V88YMHD",
                anonymizeIP: true,
              },
            }
          : {}),
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
            { to: "/docs/tags/campus-2027", label: "2027 校招季" },
            { to: "/docs/tags/interview-preparation", label: "面试准备" },
            { to: "/docs/tools-and-frameworks/git/", label: "工具与框架" },
            { to: "/docs/chatgpt-guide/", label: "ChatGPT 简明指南" },
            { to: "/blog", label: "Blog" },
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
            { label: "2027 校招季", to: "/docs/tags/campus-2027" },
            { label: "面试准备", to: "/docs/tags/interview-preparation" },
            { label: "工具与框架", to: "/docs/tools-and-frameworks/git/" },
            { label: "使用指南", to: "/docs/intro" },
          ],
        },
        {
          title: "项目",
          items: [
            { label: "GitHub", href: "https://github.com/loveorange/coding101" },
            { label: "Blog", to: "/blog" },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Coding 101.`,
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

export default config;
