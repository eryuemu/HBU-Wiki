# HBU Wiki

> 河北大学非官方开源知识库 — 致力于打破泥河的信息差，惠及更多河大人

🔗 **此站 (GitHub Pages)**：[guide.hbuwiki.top](https://guide.hbuwiki.top)  
🏠 **HBU Wiki 主站**：[hbuwiki.top](https://hbuwiki.top)  
📖 **全部目录**：[guide.hbuwiki.top/categories](https://guide.hbuwiki.top/categories)  
📋 **项目介绍**：[guide.hbuwiki.top/about](https://guide.hbuwiki.top/about)

## 这是什么

HBU-Wiki是关于河北大学的开源知识库项目，此站定位为副站，主站为 [hbuwiki.top](https://hbuwiki.top)，偏向传统的知识库，部署在VPS上。此站托管在GitHub Pages。

## 技术栈

- **框架**：[VitePress](https://vitepress.dev/) + Vue 3
- **交互组件**：Vue 3 Composition API（TransferExplorer 数据探索器、CategoriesIndex 全站目录等）
- **数据层**：结构化 JSON 数据驱动
- **评论系统**：[Giscus](https://giscus.app/)（基于 GitHub Discussions）
- **访问统计**：[Umami Cloud](https://umami.is/)（实时流量分析） + [Vercount](https://github.com/Evan-ry/Vercount)（基于 Cloudflare 的文章级与全站 PV/UV 统计）
- **搜索**：VitePress 内置本地搜索（支持 Intl.Segmenter 中文分词）
- **部署**：GitHub Actions → GitHub Pages
- **样式**：自定义 CSS 设计系统（亮/暗模式）

## 开发

```bash
# 安装依赖
npm install

# 本地开发
npm run docs:dev

# 构建
npm run docs:build

# 预览构建结果
npm run docs:preview
```

## 项目结构

```
HBU-Wiki/
├── public/
│   ├── apps/                # 常用软件与平台相关配图
│   ├── tools/               # 实用教程相关配图
│   └── transfer/            # 转专业相关原始表格、PDF 附件资源
├── .vitepress/
│   ├── config.mjs          # VitePress 配置
│   ├── data/
│   │   └── transferData.json  # 结构化转专业数据
│   └── theme/
│       ├── index.js         # 主题入口
│       ├── style.css        # 全局样式
│       └── components/
│           ├── Layout.vue          # 自定义布局
│           ├── CategoriesIndex.vue # 全站分类目录组件
│           ├── TransferExplorer.vue # 转专业数据探索器
│           ├── GPAAnalyzer.vue      # 绩点定位与志愿模拟器
│           ├── GiscusComments.vue   # 评论组件
│           ├── PageView.vue         # 访问量统计组件（PV/UV）
│           └── AnalyticsDashboard.vue # 实时访问统计大屏组件
├── academics/
│   ├── transfer.md               # 转专业数据全解
│   ├── data-explorer.md          # 转专业数据探索器
│   ├── gpa-analysis.md           # 各专业录取绩点及分析
│   ├── grade-point-average.md    # 绩点规则
│   ├── course-recommendations-xhs.md # 选课推荐与避雷 (小红书篇)
│   └── transfer-materials.md     # 转专业官方文件及附件下载
├── life/
│   ├── apps-and-websites.md # 常用软件&公众号&网址
│   ├── surroundings.md      # 保定吃喝玩乐指南
│   └── textbooks.md         # 课本的准备方式
├── tools/
│   └── erke-password.md     # 第二课堂密码找回
├── categories.md            # 全站目录
├── about.md                 # 项目介绍
├── analytics.md             # 实时统计大屏
└── index.md                 # 首页
```
## 参与贡献与社群交流

HBU-Wiki 是一项人人皆可参与的开源公益项目，欢迎通过以下途径参与共建与交流：

- **读者交流与反馈群**：`1126404483`（零门槛提问答疑、报错勘误、分享校内最新线索）
- **编辑协作群**：`1055828781`（深度参与内容策展与审校、开通主站 [hbuwiki.top](https://hbuwiki.top) 在线编辑权限）
- **GitHub 进阶贡献**：欢迎提交 Pull Request 或 Issue，参与前建议加入编辑协作群以方便协同沟通。
- **联系站长**：
  - 个人 QQ：3419144842
  - 个人邮箱：eryuemu1213@qq.com / eryuemu1213@outlook.com
  - 个人博客：[eryuemu.com](https://eryuemu.com)

## 免责声明

Wiki信息来自互联网公开信息和在校学生及已毕业学长学姐，难免有错误和疏漏，如果你发现问题请及时提出。

Wiki的文章观点仅为发布者个人观点，不代表校方观点，此项目性质为非官方的，公益性质的，校园知识库开源项目，与校方无关。

## 协议

[MIT License](LICENSE)
