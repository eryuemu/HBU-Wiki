# HBU Wiki

> 河北大学非官方学生生存指南 — 帮河大人做出更聪明的选择

🔗 **在线访问**：[hbuwiki.com](https://hbuwiki.com) *(部署在 GitHub Pages)*

## 这是什么？

HBU Wiki 是一个面向河北大学学生的**功能性知识平台**，不同于传统百科式信息堆砌，我们聚焦于「帮助学生做出具体决策」的高价值内容。

## 当前内容

### 📊 转专业数据全解（2026年）
- 67个专业的报录比、最低录取绩点、竞争分析
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
│           └── GiscusComments.vue   # 评论组件
├── academics/
│   ├── transfer.md               # 转专业数据全解
│   └── transfer-materials.md     # 转专业官方文件及附件下载
├── life/
│   └── surroundings.md      # 保定吃喝玩乐指南
└── index.md                 # 首页
```

## 后续计划

- [ ] 食堂评价数据
- [ ] 课程/老师评价系统
- [ ] 宿舍对比工具
- [ ] 选课攻略

## 参与贡献

内容由站长策展 + 社群收集。如果你有想分享的校园信息，欢迎联系我。

## 协议

[MIT License](https://opensource.org/licenses/MIT)
