import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',
  title: "HBU Wiki - 河北大学生存指南",
  titleTemplate: ':title | HBU Wiki',
  description: "河北大学非官方学生生存指南 — 帮河大人做出更聪明的选择",
  lang: 'zh-CN',

  sitemap: {
    hostname: 'https://guide.hbuwiki.top'
  },

  srcExclude: ['**/CLAUDE.md', '**/README.md'],

  head: [
    // SEO 基础
    ['meta', { name: 'google-site-verification', content: 'pGPoExqwEc0-BewUPBRHHFs33Ks-ngO7qslBGjDwI5Y' }],
    ['meta', { name: 'keywords', content: '河北大学,HBU,转专业,保定,校园指南,大学生活,选课,绩点,河大' }],
    ['meta', { name: 'author', content: 'eryuemu' }],

    // Favicon
    ['link', { rel: 'icon', type: 'image/png', href: '/hbuwiki.png' }],

    // Open Graph (静态部分，动态部分由 transformHead 注入)
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'HBU Wiki' }],
    ['meta', { property: 'og:image', content: 'https://guide.hbuwiki.top/hbuwiki.png' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],

    // Twitter Card (静态部分)
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://guide.hbuwiki.top/hbuwiki.png' }],

    // Analytics
    ['script', { defer: true, src: 'https://cloud.umami.is/script.js', 'data-website-id': '1d20e51d-d353-46f6-9e0e-d2ae9909fa6c' }]
  ],

  ignoreDeadLinks: true,
  lastUpdated: true,

  transformHead({ pageData }) {
    const canonicalUrl = `https://guide.hbuwiki.top/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '.html')

    const title = pageData.frontmatter.title 
      ? `${pageData.frontmatter.title} | HBU Wiki` 
      : (pageData.title && pageData.title !== 'HBU Wiki' ? `${pageData.title} | HBU Wiki` : 'HBU Wiki - 河北大学生存指南')
    const description = pageData.frontmatter.description || pageData.description || '河北大学非官方学生生存指南 — 帮河大人做出更聪明的选择'

    return [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
    ]
  },

  themeConfig: {
    logo: { src: '/hbuwiki.png', alt: 'HBU Wiki Logo' },
    siteTitle: 'HBU Wiki',
    analyticsShareUrl: 'https://cloud.umami.is/share/D4DaAkY7F16XlfNy', // 请在此处填入您的 Umami 公开分享链接
    
    nav: [
      { text: '首页', link: '/' },
      { text: '📖 进入Wiki', link: '/about' },
      { text: '🤝 参与贡献', link: '/about#如何参与贡献' },
      { text: '📊 实时数据', link: '/analytics' },
      { text: '🏠 HBU Wiki 主站', link: 'https://hbuwiki.top' }
    ],

    sidebar: [
      {
        text: '📋 关于本站',
        collapsed: false,
        items: [
          { text: '项目介绍', link: '/about' },
        ]
      },
      {
        text: '🔄 转专业',
        collapsed: false,
        items: [
          { text: '转专业数据探索器', link: '/academics/data-explorer' },
          { text: '转专业数据全解', link: '/academics/transfer' },
          { text: '各专业录取绩点及分析', link: '/academics/gpa-analysis' },
          { text: '官方文件及附件下载', link: '/academics/transfer-materials' },
        ]
      },
      {
        text: '📖 选课',
        collapsed: false,
        items: [
          { text: '选课推荐与避雷 (小红书篇)', link: '/academics/course-recommendations-xhs' },
        ]
      },
      {
        text: '🍜 校园生活',
        collapsed: false,
        items: [
          { text: '玩遍保定指南', link: '/life/surroundings' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/eryuemu/HBU-Wiki' }
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
          modal: {
            noResultsText: '没有找到相关结果',
            resetButtonTitle: '清除搜索',
            footer: { selectText: '选择', navigateText: '切换' }
          }
        }
      }
    },

    lastUpdated: {
      text: '最后更新于',
    },

    docFooter: { prev: '上一页', next: '下一页' },
    outline: { label: '本页目录', level: 'deep' },

    footer: {
      message: '基于 MIT 协议开源 · 非官方项目 · 友情链接：<a href="https://hbuwiki.top" target="_blank" rel="noopener">HBU Wiki 主站 (Wiki.js)</a>',
      copyright: '© 2026 HBU Wiki Contributors'
    }
  }
})
