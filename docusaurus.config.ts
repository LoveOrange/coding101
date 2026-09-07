import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const isProduction = process.env.NODE_ENV === "production";

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
        ...(isProduction
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
    navbar: {
      title: "Coding 101",
      logo: {
        alt: "Coding 101",
        src: "img/logo-duck.svg",
      },
      items: [
        {
          to: "/interview-roadmaps/",
          activeBaseRegex: "(interview-roadmaps|java-interview-roadmap)",
          position: "left",
          label: "岗位路线",
        },
        {
          type: "docSidebar",
          sidebarId: "basicKnowledgeSidebar",
          position: "left",
          label: "基础知识",
        },
        {
          type: "docSidebar",
          sidebarId: "leetcodeSidebar",
          position: "left",
          label: "算法练习",
        },
        {
          type: "docSidebar",
          sidebarId: "systemDesignSidebar",
          position: "left",
          label: "系统设计",
        },
        {
          type: "dropdown",
          label: "更多",
          position: "left",
          items: [
            { to: "/docs/tools-and-frameworks/git/", label: "工具与框架" },
            { to: "/docs/interview/", label: "面试准备" },
            { to: "/docs/chatgpt-guide/", label: "ChatGPT 简明指南" },
            { to: "/blog", label: "Blog" },
          ],
        },
        {
          href: "https://github.com/loveorange/coding101",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "light",
      links: [
        {
          title: "开始准备",
          items: [
            {
              label: "使用指南",
              to: "/docs/intro",
            },
            {
              label: "岗位面试路线",
              to: "/interview-roadmaps/",
            },
            {
              label: "Java 后端路线",
              to: "/java-interview-roadmap/",
            },
          ],
        },
        {
          title: "复习资料",
          items: [
            { label: "基础知识", to: "/docs/basic-knowledge/" },
            { label: "算法练习", to: "/docs/leetcode/re-leetcode/" },
            { label: "系统设计", to: "/docs/system-design/" },
          ],
        },
        {
          title: "项目",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/loveorange/coding101",
            },
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
