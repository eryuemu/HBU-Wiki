import { defineConfig } from 'vitepress'

// 导航栏与侧边栏分组图标 (SVG 规范)
const ICONS = {
    transfer: '<svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>',
    study: '<svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>',
    life: '<svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"/></svg>',
    tools: '<svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    about: '<svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'
}

export default defineConfig({
    base: '/',
    title: "河北大学 Wiki (HBU Wiki) - 河北大学生存指北",
    titleTemplate: ':title | 河北大学 Wiki (HBU Wiki)',
    description: "河北大学 Wiki (HBU Wiki) 是由河大学子共同维护的非官方河北大学学生生存指北与校园知识库。汇集河北大学转专业真实报录比与最低录取绩点分析、选课推荐与避雷、保定吃喝玩乐周边攻略、教务系统办事教程等干货，打破信息差，帮河大人做出更聪明的选择。",
    lang: 'zh-CN',
    markdown: {
        math: true
    },


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
            { text: '全部目录', link: '/categories' },
            {
                text: `${ICONS.transfer} 转专业`,
                items: [
                    { text: '转专业数据全解', link: '/academics/transfer' },
                    { text: '转专业数据探索器', link: '/academics/data-explorer' },
                    { text: '各专业录取绩点及分析', link: '/academics/gpa-analysis' },
                    { text: '官方文件及附件下载', link: '/academics/transfer-materials' }
                ]
            },
            {
                text: `${ICONS.study} 学习`,
                items: [
                    { text: '选课推荐与避雷 (小红书篇)', link: '/academics/course-recommendations-xhs' },
                    { text: '教师授课评价 (真实反馈篇)', link: '/academics/teacher-evaluations' },
                    { text: '平均学分绩点计算', link: '/academics/grade-point-average' },
                    { text: '综评成绩计算', link: '/academics/comprehensive-assessment-score' },
                    { text: '竞赛加分表', link: '/academics/competition-bonus-table' },
                    { text: '体育成绩评分细则', link: '/academics/sports-score' }
                ]
            },
            {
                text: `${ICONS.life} 校园生活`,
                items: [
                    { text: '常用软件&公众号&网址', link: '/life/apps-and-websites' },
                    { text: '玩遍保定指南', link: '/life/surroundings' },
                    { text: '课本的准备方式', link: '/life/textbooks' }
                ]
            },
            {
                text: `${ICONS.tools} 实用教程`,
                items: [
                    { text: '五星级宿舍公示查询与加分统计', link: '/tools/star-dorm-query' },
                    { text: '第二课堂（中青二课）密码找回', link: '/tools/erke-password' }
                ]
            },
            {
                text: `${ICONS.about} 关于本站`,
                items: [
                    { text: '项目介绍', link: '/about' },
                    { text: '参与共建', link: '/contribution' },
                    { text: '实时数据', link: '/analytics' },
                    { text: 'HBU Wiki 主站', link: 'https://hbuwiki.top' }
                ]
            }
        ],

        sidebar: [
            {
                text: `${ICONS.transfer} 转专业`,
                collapsed: false,
                items: [
                    { text: '转专业数据全解', link: '/academics/transfer' },
                    { text: '转专业数据探索器', link: '/academics/data-explorer' },
                    { text: '各专业录取绩点及分析', link: '/academics/gpa-analysis' },
                    { text: '官方文件及附件下载', link: '/academics/transfer-materials' },
                ]
            },
            {
                text: `${ICONS.study} 学习`,
                collapsed: false,
                items: [
                    { text: '选课推荐与避雷 (小红书篇)', link: '/academics/course-recommendations-xhs' },
                    { text: '教师授课评价 (真实反馈篇)', link: '/academics/teacher-evaluations' },
                    { text: '平均学分绩点计算', link: '/academics/grade-point-average' },
                    { text: '综评成绩计算', link: '/academics/comprehensive-assessment-score' },
                    { text: '竞赛加分表', link: '/academics/competition-bonus-table' },
                    { text: '体育成绩评分细则', link: '/academics/sports-score' }
                ]
            },
            {
                text: `${ICONS.life} 校园生活`,
                collapsed: false,
                items: [
                    { text: '常用软件&公众号&网址', link: '/life/apps-and-websites' },
                    { text: '玩遍保定指南', link: '/life/surroundings' },
                    { text: '课本的准备方式', link: '/life/textbooks' },
                ]
            },
            {
                text: `${ICONS.tools} 实用教程`,
                collapsed: false,
                items: [
                    { text: '五星级宿舍公示查询与加分统计', link: '/tools/star-dorm-query' },
                    { text: '第二课堂（中青二课）密码找回', link: '/tools/erke-password' },
                ]
            },
            {
                text: `${ICONS.about} 关于本站`,
                collapsed: false,
                items: [
                    { text: '项目介绍', link: '/about' },
                    { text: '参与共建', link: '/contribution' },
                    { text: '实时数据', link: '/analytics' },
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/eryuemu/HBU-Wiki' }
        ],

        search: {
            provider: 'local',
            options: {
                locales: {
                    root: {
                        translations: {
                            button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
                            modal: {
                                noResultsText: '无法找到相关结果',
                                resetButtonTitle: '清除查询条件',
                                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
                            }
                        }
                    }
                },
                miniSearch: {
                    options: {
                        tokenize: (text) => {
                            if (typeof Intl !== 'undefined' && Intl.Segmenter) {
                                const segmenter = new Intl.Segmenter('zh-CN', { granularity: 'word' })
                                return Array.from(segmenter.segment(text))
                                    .map(s => s.segment)
                                    .filter(s => s.trim().length > 0)
                            }
                            return text.split(/[\s,，.。!！?？:：;；"'"（）()【】\[\]]+/).filter(Boolean)
                        }
                    },
                    searchOptions: {
                        combineWith: 'AND',
                        fuzzy: 0.2,
                        prefix: true,
                        processTerm: (term) => {
                            if (typeof Intl !== 'undefined' && Intl.Segmenter) {
                                const segmenter = new Intl.Segmenter('zh-CN', { granularity: 'word' })
                                return Array.from(segmenter.segment(term))
                                    .map(s => s.segment)
                                    .filter(s => s.trim().length > 0)
                            }
                            return term.split(/[\s,，.。!！?？:：;；"'"（）()【】\[\]]+/).filter(Boolean)
                        }
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
