# HBU Wiki

> 河北大学非官方开源知识库 — 致力于打破泥河的信息差，惠及更多河大人

🔗 **此站 (GitHub Pages)**：[guide.hbuwiki.top](https://guide.hbuwiki.top)  
🏠 **HBU Wiki 主站**：[hbuwiki.top](https://hbuwiki.top)  
📖 **项目介绍**：[guide.hbuwiki.top/about](https://guide.hbuwiki.top/about)

## 这是什么

HBU-Wiki是关于河北大学的开源知识库项目，此站定位为副站，主站为 [hbuwiki.top](https://hbuwiki.top)，偏向传统的知识库，部署在VPS上。此站托管在GitHub Pages。

## 当前内容

### 📊 转专业数据全解（2026年）
- 70个专业的报录比、最低录取绩点、竞争分析
- **交互式数据探索器**：支持按学科/竞争等级筛选、多维度排序、模糊搜索
- **绩点定位器 & 志愿模拟器**：输入绩点，自动分析冲/稳/保专业，并提供志愿策略评估
- 政策解读 + 贴吧真实讨论 + 趋势分析
- **官方资料下载专区**：独家汇总教务处最新转专业公示文件、管理办法与各学院成绩单原始表格
- 数据来源：教务处官方公示

### 🍜 玩遍保定指南
- 东南西北中五大片区美食娱乐全覆盖
- 来源：贴吧老哥真实分享

## 技术栈

- **框架**：[VitePress](https://vitepress.dev/) + Vue 3
- **交互组件**：Vue 3 Composition API（TransferExplorer 数据探索器）
- **数据层**：结构化 JSON 数据驱动
- **评论系统**：[Giscus](https://giscus.app/)（基于 GitHub Discussions）
- **访问统计**：[Umami Cloud](https://umami.is/)（实时流量分析） + [Vercount](https://github.com/Evan-ry/Vercount)（基于 Cloudflare 的文章级与全站 PV/UV 统计）
- **搜索**：VitePress 内置本地搜索
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
│           ├── TransferExplorer.vue # 转专业数据探索器
│           ├── GPAAnalyzer.vue      # 绩点定位与志愿模拟器
│           ├── GiscusComments.vue   # 评论组件
│           ├── PageView.vue         # 访问量统计组件（PV/UV）
│           └── AnalyticsDashboard.vue # 实时访问统计大屏组件
├── academics/
│   ├── transfer.md               # 转专业数据全解
│   └── transfer-materials.md     # 转专业官方文件及附件下载
├── life/
│   └── surroundings.md      # 保定吃喝玩乐指南
├── about.md                 # 项目介绍
├── analytics.md             # 实时统计大屏
└── index.md                 # 首页
```

## 后续计划

- [ ] 食堂评价数据
- [ ] 课程/老师评价系统
- [ ] 宿舍对比工具
- [ ] 选课攻略

## 参与贡献

如果你会使用GitHub，会提issue和pr，想成为Contributor，欢迎直接提PR。

如果觉得项目还不错，欢迎点个 Star ⭐，对我来说是很大的鼓励！

也可以联系我：

- 个人邮箱：eryuemu1213@qq.com / eryuemu1213@outlook.com
- 个人博客：[eryuemu.com](https://eryuemu.com)
- 个人QQ：3419144842

## 免责声明

Wiki信息来自互联网公开信息和在校学生及已毕业学长学姐，难免有错误和疏漏，如果你发现问题请及时提出。

Wiki的文章观点仅为发布者个人观点，不代表校方观点，此项目性质为非官方的，公益性质的，校园知识库开源项目，与校方无关。

## 协议

[MIT License](LICENSE)
