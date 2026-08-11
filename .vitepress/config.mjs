import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',
  title: "HBU Wiki",
  description: "河北大学非官方学生生存指南 — 帮河大人做出更聪明的选择",
  
  head: [
    ['meta', { name: 'keywords', content: '河北大学,HBU,转专业,保定,校园指南,大学生活' }],
    ['meta', { name: 'author', content: 'eryuemu' }],
    ['meta', { property: 'og:title', content: 'HBU Wiki — 河北大学学生生存指南' }],
    ['meta', { property: 'og:description', content: '帮河大人做出更聪明的选择' }],
    ['script', { defer: true, src: 'https://cloud.umami.is/script.js', 'data-website-id': '1d20e51d-d353-46f6-9e0e-d2ae9909fa6c' }]
  ],

  ignoreDeadLinks: true,
  lastUpdated: true,

  themeConfig: {
    logo: '/hbuwiki.jpg',
    analyticsShareUrl: 'https://cloud.umami.is/share/D4DaAkY7F16XlfNy', // 请在此处填入您的 Umami 公开分享链接
    
    nav: [
      { text: '首页', link: '/' },
      { text: '转专业数据探索器', link: '/academics/data-explorer' },
      { text: '转专业数据全解', link: '/academics/transfer' },
      { text: '保定攻略', link: '/life/surroundings' },
      { text: '📊 实时数据', link: '/analytics' }
    ],

    sidebar: [
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
      message: '基于 MIT 协议开源 · 非官方项目',
      copyright: '© 2026 HBU Wiki Contributors'
    }
  }
})
