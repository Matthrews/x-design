import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'x-design',
  description: '基于React的企业级UI组件库',
  favicon: 'https://cdn.jsdelivr.net/gh/Matthrews/zm_cdn/images/x-design.png',
  logo: 'https://cdn.jsdelivr.net/gh/Matthrews/zm_cdn/images/x-design.png',
  outputPath: 'docs-dist',
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English'],
  ],
  // mode: 'site',
  publicPath: './',
  webpack5: {
    lazyCompilation: {},
  },
  // more config: https://d.umijs.org/config
});
