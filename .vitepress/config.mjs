import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "HBU Wiki",
  description: "一个关于河北大学的开源知识库",
  themeConfig: {
    logo: 'https://www.hbu.edu.cn/images/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '走进河大', link: '/general/intro' },
      { text: '生活指南', link: '/life/food' },
      { text: '常用工具', link: '/tools/links' }
    ],

    sidebar: [
      {
        text: '🏛️ 走进河大',
        collapsed: false,
        items: [
          { text: '学校概况', link: '/general/intro' },
          { text: '校园地图', link: '/general/map' },
          { text: '校历与节点', link: '/general/calendar' },
        ]
      },
      {
        text: '📚 学术科研',
        collapsed: true,
        items: [
          { text: '院系设置', link: '/academics/departments' },
          { text: '图书馆指南', link: '/academics/library' },
          { text: '教务办事处', link: '/academics/office' },
          { text: '实验与科研', link: '/academics/research' },
        ]
      },
      {
        text: '🍱 生活指南',
        collapsed: true,
        items: [
          { text: '舌尖上的河大', link: '/life/food' },
          { text: '住宿生活', link: '/life/dormitory' },
          { text: '交通出行', link: '/life/transport' },
          { text: '医疗/后勤', link: '/life/service' },
        ]
      },
      {
        text: '🎸 校园文化与社团',
        collapsed: true,
        items: [
          { text: '社团百科', link: '/culture/societies' },
          { text: '传统活动', link: '/culture/activities' },
          { text: '校园传说', link: '/culture/legends' },
        ]
      },
      {
        text: '🛠️ 实用工具与资源',
        collapsed: true,
        items: [
          { text: '常用链接', link: '/tools/links' },
          { text: '下载专区', link: '/tools/download' },
          { text: '避坑指南', link: '/tools/avoid-traps' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/eryuemu/HBU-Wiki' }
    ],

    docFooter: { prev: '上一页', next: '下一页' },
    outline: { label: '本页目录', level: 'deep' }
  }
})
