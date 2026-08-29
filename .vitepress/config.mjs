import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',
  title: "河北大学 Wiki (HBU Wiki) - 河北大学生存指北",
  titleTemplate: ':title | 河北大学 Wiki (HBU Wiki)',
  description: "河北大学 Wiki (HBU Wiki) 是由河大学子共同维护的非官方河北大学学生生存指北与校园知识库。汇集河北大学转专业真实报录比与最低录取绩点分析、选课推荐与避雷、保定吃喝玩乐周边攻略、教务系统办事教程等干货，打破信息差，帮河大人做出更聪明的选择。",
  lang: 'zh-CN',

  cleanUrls: true,

  sitemap: {
    hostname: 'https://guide.hbuwiki.top'
  },

  srcExclude: ['**/CLAUDE.md', '**/README.md'],

  head: [
    // SEO 基础与站长验证
    ['meta', { name: 'google-site-verification', content: 'pGPoExqwEc0-BewUPBRHHFs33Ks-ngO7qslBGjDwI5Y' }],
    // 百度、必应站长验证（可在 content 中填入您的验证码）
    // ['meta', { name: 'baidu-site-verification', content: '' }],
    // ['meta', { name: 'msvalidate.01', content: '' }],

    ['meta', { name: 'keywords', content: '河北大学wiki,河北大学 wiki,河北大学Wiki,河大wiki,河大Wiki,HBU Wiki,HBU-Wiki,hbuwiki,河北大学生存指北,河北大学生存指南,河北大学转专业,河北大学选课,河北大学绩点,河北大学,河大,保定河北大学,河北大学知识库,河北大学校园指北' }],
    ['meta', { name: 'author', content: 'eryuemu, HBU Wiki Contributors' }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }],

    // 搜索引擎爬虫适配
    ['meta', { name: 'renderer', content: 'webkit' }],
    ['meta', { name: 'format-detection', content: 'telephone=no' }],

    // Favicon
    ['link', { rel: 'icon', type: 'image/png', href: '/hbuwiki.png' }],

    // Open Graph (静态部分，动态部分由 transformHead 注入)
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: '河北大学 Wiki (HBU Wiki)' }],
    ['meta', { property: 'og:image', content: 'https://guide.hbuwiki.top/hbuwiki.png' }],
    ['meta', { property: 'og:image:alt', content: '河北大学 Wiki (HBU Wiki) Logo' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],

    // Twitter Card (静态部分)
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://guide.hbuwiki.top/hbuwiki.png' }],

    // JSON-LD 结构化数据 (Schema.org)
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': 'https://guide.hbuwiki.top/#website',
          'url': 'https://guide.hbuwiki.top/',
          'name': '河北大学 Wiki',
          'alternateName': ['河北大学Wiki', '河北大学 wiki', 'HBU Wiki', 'HBU-Wiki', 'hbuwiki', '河大Wiki', '河北大学生存指北', '河北大学生存指南'],
          'description': '河北大学非官方学生生存指北与开源知识库',
          'inLanguage': 'zh-CN',
          'publisher': {
            '@id': 'https://guide.hbuwiki.top/#organization'
          }
        },
        {
          '@type': 'Organization',
          '@id': 'https://guide.hbuwiki.top/#organization',
          'name': '河北大学 Wiki (HBU Wiki)',
          'alternateName': 'HBU Wiki Contributors',
          'url': 'https://guide.hbuwiki.top/',
          'logo': 'https://guide.hbuwiki.top/hbuwiki.png'
        }
      ]
    })],

    // Analytics
    ['script', { defer: true, src: 'https://cloud.umami.is/script.js', 'data-website-id': '1d20e51d-d353-46f6-9e0e-d2ae9909fa6c' }]
  ],

  ignoreDeadLinks: true,
  lastUpdated: true,

  transformHead({ pageData }) {
    const cleanPath = pageData.relativePath
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '')
    const canonicalUrl = `https://guide.hbuwiki.top/${cleanPath}`

    let pageTitle = '河北大学 Wiki (HBU Wiki) - 河北大学生存指北'
    if (pageData.relativePath === 'index.md' || pageData.frontmatter.layout === 'home') {
      pageTitle = pageData.frontmatter.title || '河北大学 Wiki (HBU Wiki) - 河北大学生存指北与校园知识库'
    } else if (pageData.frontmatter.title) {
      pageTitle = pageData.frontmatter.title.includes('HBU Wiki') || pageData.frontmatter.title.includes('河北大学 Wiki')
        ? pageData.frontmatter.title
        : `${pageData.frontmatter.title} | 河北大学 Wiki (HBU Wiki)`
    } else if (pageData.title && pageData.title !== 'HBU Wiki') {
      pageTitle = `${pageData.title} | 河北大学 Wiki (HBU Wiki)`
    }

    const description = pageData.frontmatter.description || pageData.description || '河北大学 Wiki (HBU Wiki) 是由河大学子共同维护的非官方河北大学学生生存指北与校园知识库。汇集转专业真实数据、选课推荐避雷、保定吃喝玩乐攻略等，打破信息差，帮河大人做出更聪明的选择。'

    const keywords = pageData.frontmatter.keywords || '河北大学wiki, 河北大学 wiki, 河北大学Wiki, 河大wiki, 河大Wiki, HBU Wiki, HBU-Wiki, hbuwiki, 河北大学生存指北, 河北大学生存指南, 河北大学转专业, 河北大学选课, 河北大学绩点, 河北大学, 河大, 保定河北大学, 河北大学知识库'

    return [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { name: 'description', content: description }],
      ['meta', { name: 'keywords', content: keywords }],
      ['meta', { property: 'og:title', content: pageTitle }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { name: 'twitter:title', content: pageTitle }],
      ['meta', { name: 'twitter:description', content: description }],
    ]
  },

  themeConfig: {
    logo: { src: '/hbuwiki.png', alt: '河北大学 Wiki (HBU Wiki) Logo' },
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
          { text: '常用软件与网址', link: '/life/apps-and-websites' },
        ]
      },
      {
        text: '🧰 实用教程',
        collapsed: false,
        items: [
          { text: '第二课堂（中青二课）密码找回', link: '/tools/erke-password' },
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
      message: '基于 MIT 协议开源 · 河北大学非官方校园知识库 · 友情链接：<a href="https://hbuwiki.top" target="_blank" rel="noopener">HBU Wiki 主站 (Wiki.js)</a>',
      copyright: '© 2026 河北大学 Wiki (HBU Wiki) Contributors'
    }
  }
})
