# HBU Wiki — Claude Code 开发指南

## 项目概览

**项目名称**：HBU Wiki（河北大学非官方知识库）  
**技术栈**：VitePress + 自定义 CSS + Vue 组件  
**定位**：面向在校学生的校园生活百科，内容包括走进河大、学术科研、生活指南、校园文化等板块  
**设计风格**：深色主题，学术感，简洁现代

---

## 设计规范

### 色彩系统

```css
/* 主色调 —— 河北大学校色蓝 */
--hbu-blue:         #1E56B0;   /* 主品牌色，用于标题、主按钮、强调 */
--hbu-blue-light:   #2E6FD8;   /* hover 状态、链接 */
--hbu-blue-dark:    #143D85;   /* active 状态、深色强调 */
--hbu-blue-muted:   #1E56B020; /* 卡片背景、淡色填充（20% 透明度） */

/* 背景层级 */
--bg-base:          #0f1117;   /* 页面底色 */
--bg-surface:       #1a1d27;   /* 卡片、导航栏背景 */
--bg-elevated:      #22263a;   /* hover 卡片、弹窗背景 */

/* 文字层级 */
--text-primary:     #e8eaf0;   /* 主标题、正文 */
--text-secondary:   #9aa0b8;   /* 副标题、描述文字 */
--text-muted:       #5c6280;   /* 时间戳、注释、disabled */

/* 边框 */
--border-subtle:    #2a2f45;   /* 卡片边框、分割线 */
--border-active:    #1E56B060; /* 选中状态边框 */
```

### 字体规范

```css
/* 字体栈 */
--font-sans: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", sans-serif;
--font-mono: "JetBrains Mono", "Fira Code", monospace;

/* 字号比例 */
--text-xs:   12px;  /* 标签、注释 */
--text-sm:   14px;  /* 卡片描述、辅助文字 */
--text-base: 16px;  /* 正文 */
--text-lg:   18px;  /* 小标题 */
--text-xl:   24px;  /* 卡片标题、节标题 */
--text-2xl:  36px;  /* Hero 副标题 */
--text-3xl:  56px;  /* Hero 主标题 */

/* 行高 */
--leading-tight:  1.3;  /* 大标题 */
--leading-normal: 1.6;  /* 正文 */
--leading-loose:  1.8;  /* 长文阅读 */
```

### 间距规范

```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-6:  24px;
--space-8:  32px;
--space-12: 48px;
--space-16: 64px;
```

### 圆角 & 阴影

```css
--radius-sm:  6px;   /* 标签、小按钮 */
--radius-md:  12px;  /* 卡片、输入框 */
--radius-lg:  20px;  /* 大卡片、Hero 容器 */
--radius-full: 9999px; /* 药丸形按钮 */

--shadow-card: 0 2px 12px rgba(0,0,0,0.3);
--shadow-hover: 0 8px 32px rgba(30,86,176,0.2);  /* 悬停时带校色光晕 */
```

---

## 组件规范

### 按钮

```css
/* 主按钮 —— 实心蓝，用于"立即进入"等主要操作 */
.btn-primary {
  background: var(--hbu-blue);
  color: #fff;
  border-radius: var(--radius-full);
  padding: 10px 24px;
  font-size: var(--text-base);
  font-weight: 600;
  transition: background 0.2s, box-shadow 0.2s;
}
.btn-primary:hover {
  background: var(--hbu-blue-light);
  box-shadow: var(--shadow-hover);
}

/* 次级按钮 —— 描边，用于"参与贡献"等次要操作 */
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  padding: 10px 24px;
}
.btn-secondary:hover {
  border-color: var(--hbu-blue);
  color: var(--hbu-blue-light);
}
```

### 分类卡片

```css
.category-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}
.category-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
  border-color: var(--border-active);
}

/* 图标容器统一尺寸 */
.card-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-sm);
  background: var(--hbu-blue-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-4);
}

/* 卡片标题 */
.card-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

/* 卡片描述 —— 注意对比度，不要低于 #7a82a0 */
.card-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: var(--leading-normal);
}
```

### 导航栏

- 背景：`var(--bg-surface)` + `backdrop-filter: blur(12px)`
- Logo 文字大小：18px，font-weight 700
- 导航项之间间距：`var(--space-8)`
- 当前页高亮：`color: var(--hbu-blue-light)`，下方 2px 蓝色下划线

---

## 已知问题 & 优化优先级

> 每次修改前先看这里，按优先级从高到低处理：

**P0 — 必须修复**
- [ ] 卡片描述文字颜色对比度不足，调整至 `--text-secondary: #9aa0b8` 以上
- [ ] 图标风格统一：统一使用同一图标库（推荐 `lucide-icons` 或 `iconify`），去掉 emoji 图标混用

**P1 — 重要优化**
- [ ] Hero 区域右侧校徽过于孤立，考虑改为背景水印或与文字融合排版
- [ ] "立即进入"按钮蓝色过于饱和，改用 `--hbu-blue` 替换当前颜色
- [ ] 导航栏"…"溢出菜单：重新规划导航结构，控制在 4-5 项以内

**P2 — 锦上添花**
- [ ] 卡片 hover 动画：加 `translateY(-4px)` 上浮效果
- [ ] Hero 标题加入渐变色（蓝色渐变）
- [ ] 页面滚动时导航栏加毛玻璃效果

---

## 开发约定

### 文件结构
```
docs/
├── .vitepress/
│   ├── config.ts          # 站点配置
│   ├── theme/
│   │   ├── index.ts       # 主题入口
│   │   ├── style.css      # 全局样式变量（CSS 变量在这里定义）
│   │   └── components/    # 自定义 Vue 组件
└── index.md               # 首页
```

### CSS 约定
- **所有颜色必须使用 CSS 变量**，禁止硬编码十六进制色值
- 新增 CSS 变量统一在 `style.css` 的 `:root` 下声明
- VitePress 内置变量以 `--vp-` 开头，自定义变量以 `--hbu-` 或语义名开头

### Vue 组件约定
- 组件文件名使用 PascalCase：`CategoryCard.vue`
- 每个组件只做一件事，超过 150 行考虑拆分
- Props 必须定义类型，不用 `any`

### 禁止事项
- 不要修改 VitePress 核心文件，只通过 `theme/` 目录覆盖样式
- 不要引入大型 UI 框架（Element Plus、Ant Design 等），保持轻量
- 不要在组件里写内联 style，统一用 CSS 变量 + class

---

## 参考资源

- VitePress 自定义主题文档：https://vitepress.dev/guide/custom-theme
- VitePress CSS 变量覆盖：https://vitepress.dev/reference/default-theme-colors
- Lucide 图标库：https://lucide.dev/icons/
- 河北大学官网色彩参考：校徽蓝 `#1E56B0`
