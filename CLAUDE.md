# Coding101 — Claude Code 项目规则

- 本站是 Docusaurus。视觉以 `design/Coding101 Redesign.dc.html` 为准（高保真设计稿，HTML 只做参考，不要直接搬进站点）。
- 颜色只用 `src/css/custom.css` 里的 `--c-*` 变量，不要写死色值；亮/暗主题都要检查。
- 字体：标题 Noto Serif SC，正文 Noto Sans SC，标签/代码 JetBrains Mono。
- 墨绿 = 按主题学习（免费阅读）；朱砂 = 从问题出发 / 付费功能。不要混用。
- 每屏只做一件事，不加设计稿以外的模块。
- 改 Docusaurus 主题组件时优先 `npm run swizzle -- --wrap`，必要时再 eject。
- 组件样式用 CSS Modules（`*.module.css`）。
- 改完运行 `npm run build` 确认无报错。
