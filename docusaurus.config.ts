import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Coding 101",
  tagline: "Make coding fun and easy!",
  favicon: "img/favicon.ico",

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
  onBrokenMarkdownLinks: "warn",

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
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Coding 101",
      logo: {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "leetcodeSidebar",
          position: "left",
          label: "LeetCode",
        },
        {
          type: "docSidebar",
          sidebarId: "basicKnowledgeSidebar",
          position: "left",
          label: "基础知识",
        },
        {
          type: "docSidebar",
          sidebarId: "systemDesignSidebar",
          position: "left",
          label: "系统设计",
        },
        {
          type: "docSidebar",
          sidebarId: "toolsAndFrameworksSidebar",
          position: "left",
          label: "工具与框架",
        },
        {
          type: "docSidebar",
          sidebarId: "interviewSidebar",
          position: "left",
          label: "🌟 2025 秋招专题 🌟",
        },
        {
          type: "docSidebar",
          sidebarId: "chatgptBeginSidebar",
          position: "right",
          label: "ChatGPT 简明指南",
        },
        { to: "/blog", label: "Blog", position: "right" },
        {
          href: "https://github.com/loveorange/coding101",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Tutorial",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/docusaurus",
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/docusaurus",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/docusaurus",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/loveorange/coding101",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Coding 101, Inc. Built with Docusaurus.`,
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
    [
      "@docusaurus/plugin-ideal-image",
      {
        sizes: [320, 480, 640, 800, 960],
        quality: 85,
        max: 640,
        min: 320,
        steps: 3,
        disableInDev: false,
      },
    ],
  ],
};

export default config;
