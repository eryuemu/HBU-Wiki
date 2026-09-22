<script setup>
import { ref, computed } from 'vue'

const categories = ['全部', '转专业', '学习', '校园生活', '实用教程', '关于本站']

const currentCategory = ref('全部')
const searchQuery = ref('')
const viewMode = ref('cards') // 'cards' | 'list'

const articles = [
  {
    title: '转专业数据全解',
    category: '转专业',
    link: '/academics/transfer',
    description: '2026年河北大学70个专业转专业数据全解析，包含报录比、最低录取绩点、竞争热度分档、转专业政策解读与真实经验分享。',
    tags: ['转专业', '报录比', '录取绩点', '经验分享'],
    badge: '旗舰数据',
    date: '2026-03'
  },
  {
    title: '转专业数据探索器',
    category: '转专业',
    link: '/academics/data-explorer',
    description: '交互式转专业数据检索与模拟工具，支持按学院/热度多维筛选、分档查询、绩点定位与志愿策略评估。',
    tags: ['交互工具', '志愿模拟', '绩点定位'],
    badge: '交互工具',
    date: '2026-03'
  },
  {
    title: '各专业录取绩点及分析',
    category: '转专业',
    link: '/academics/gpa-analysis',
    description: '整理各学院专业往年录取最低绩点、平均分与竞争走势，提供客观的数据参考与转专业趋势研判。',
    tags: ['最低绩点', '竞争走势', '历史分析'],
    date: '2026-03'
  },
  {
    title: '官方文件及附件下载',
    category: '转专业',
    link: '/academics/transfer-materials',
    description: '教务处转专业官方通知、管理办法全文与各学院转专业接收条件原版附件汇总下载。',
    tags: ['教务处通知', '管理办法', '附件下载'],
    date: '2026-03'
  },
  {
    title: '选课推荐与避雷 (小红书篇)',
    category: '学习',
    link: '/academics/course-recommendations-xhs',
    description: '小红书与校内学长学姐精选选修课推荐、考核方式避坑指北与通识选修课学习指南。',
    tags: ['选课推荐', '考核方式', '避坑指北'],
    date: '2026-08'
  },
  {
    title: '教师授课评价 (真实反馈篇)',
    category: '学习',
    link: '/academics/teacher-evaluations',
    description: '收录各院系与公共课教师的课堂考勤、纪律规范、教学风格与平时分考核等学生真实客观反馈。',
    tags: ['教师评价', '授课风格', '课堂纪律', '真实反馈'],
    badge: '持续更新',
    date: '2026-09'
  },
  {
    title: '平均学分绩点计算',
    category: '学习',
    link: '/academics/grade-point-average',
    description: '河北大学学分绩点（GPA）官方计算规则、成绩等级换算对照表与保研推免绩点要求详解。',
    tags: ['学分绩点', 'GPA计算', '保研推免'],
    date: '2026-09'
  },
  {
    title: '竞赛加分表',
    category: '学习',
    link: '/academics/competition-bonus-table',
    description: '河北大学学生创新实践能力加分标准，涵盖学科竞赛、学术论文、科研项目及发明专利等加分细则。',
    tags: ['学科竞赛', '创新实践', '综合测评', '加分细则'],
    badge: '评优必备',
    date: '2026-09'
  },
  {
    title: '常用软件&公众号&网址',
    category: '校园生活',
    link: '/life/apps-and-websites',
    description: '易班、学习通、志愿汇、U校园AI版等常用APP，教务系统、正版软件平台与微信公众号全景导航。',
    tags: ['常用APP', '教务系统', '正版软件', '网址导航'],
    date: '2026-09'
  },
  {
    title: '玩遍保定指南',
    category: '校园生活',
    link: '/life/surroundings',
    description: '贴吧老哥倾情贡献，保定东南西北中五大片区美食餐饮、商圈休闲与娱乐全覆盖实操攻略。',
    tags: ['美食打卡', '保定游玩', '片区攻略'],
    date: '2026-08'
  },
  {
    title: '课本的准备方式',
    category: '校园生活',
    link: '/life/textbooks',
    description: '大学教材准备全指北，涵盖新书购买、二手教材淘选流转与电子教材获取渠道建议。',
    tags: ['教材准备', '二手书', '电子教材'],
    date: '2026-09'
  },
  {
    title: '第二课堂（中青二课）密码找回',
    category: '实用教程',
    link: '/tools/erke-password',
    description: '中青二课第二课堂账号密码遗忘、无法登录时的官方重置流程与图文排查方法。',
    tags: ['第二课堂', '密码找回', '图文指引'],
    date: '2026-08'
  },
  {
    title: '项目介绍',
    category: '关于本站',
    link: '/about',
    description: '关于河北大学 Wiki 的创立初衷、开源定位、技术栈与社群背景。',
    tags: ['开源共建', '项目定位', '发起故事'],
    date: '2026-08'
  },
  {
    title: '参与共建',
    category: '关于本站',
    link: '/contribution',
    description: '读者交流群与编辑群、主站 Wiki.js 在线撰写、GitHub 开源贡献全流程指引。',
    tags: ['读者群', '编辑组', '在线编辑', 'PR贡献'],
    badge: '社群交流',
    date: '2026-09'
  },
  {
    title: '实时数据',
    category: '关于本站',
    link: '/analytics',
    description: '基于开源 Umami 统计的全站实时访问数据公开看板，透明呈现站点访客与阅读趋势。',
    tags: ['数据看板', 'Umami', '公开透明'],
    date: '2026-08'
  }
]

// 统计各分类文章数
const categoryCounts = computed(() => {
  const counts = { '全部': articles.length }
  for (const cat of categories) {
    if (cat !== '全部') {
      counts[cat] = articles.filter(a => a.category === cat).length
    }
  }
  return counts
})

// 筛选后的文章列表
const filteredArticles = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return articles.filter(a => {
    const matchCat = currentCategory.value === '全部' || a.category === currentCategory.value
    if (!matchCat) return false
    if (!q) return true
    const matchTitle = a.title.toLowerCase().includes(q)
    const matchDesc = a.description.toLowerCase().includes(q)
    const matchTags = a.tags.some(t => t.toLowerCase().includes(q))
    const matchCategory = a.category.toLowerCase().includes(q)
    return matchTitle || matchDesc || matchTags || matchCategory
  })
})

// 按分类分组（在查看全部且未搜索时使用）
const groupedArticles = computed(() => {
  if (currentCategory.value !== '全部' || searchQuery.value.trim() !== '') {
    return null
  }
  const groups = {}
  for (const cat of categories) {
    if (cat === '全部') continue
    const list = articles.filter(a => a.category === cat)
    if (list.length > 0) {
      groups[cat] = list
    }
  }
  return groups
})
</script>

<template>
  <div class="categories-page">
    <!-- 头部引导 -->
    <div class="catalog-header">
      <div class="catalog-meta">
        共收录 <span class="highlight">{{ articles.length }}</span> 篇深度文章 · 覆盖 <span class="highlight">{{ categories.length - 1 }}</span> 大校园主题
      </div>
    </div>

    <!-- 交互筛选栏 -->
    <div class="catalog-controls">
      <!-- 分类 Chip 列表 -->
      <div class="chips-wrapper" role="tablist">
        <button
          v-for="cat in categories"
          :key="cat"
          class="chip-btn"
          :class="{ active: currentCategory === cat }"
          type="button"
          role="tab"
          :aria-selected="currentCategory === cat"
          @click="currentCategory = cat"
        >
          <span>{{ cat }}</span>
          <span class="chip-count">{{ categoryCounts[cat] || 0 }}</span>
        </button>
      </div>

      <!-- 搜索与视图切换 -->
      <div class="action-bar">
        <div class="search-box">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            v-model="searchQuery"
            type="search"
            placeholder="筛选标题、标签或内容关键词…"
            aria-label="筛选文章"
          />
          <button v-if="searchQuery" class="clear-btn" type="button" @click="searchQuery = ''">✕</button>
        </div>

        <div class="view-switch" aria-label="切换展示视图">
          <button
            class="view-btn"
            :class="{ active: viewMode === 'cards' }"
            type="button"
            title="卡片视图"
            @click="viewMode = 'cards'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>
            </svg>
          </button>
          <button
            class="view-btn"
            :class="{ active: viewMode === 'list' }"
            type="button"
            title="列表视图"
            @click="viewMode = 'list'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 文章内容区域 -->
    <div class="catalog-content">
      <!-- 搜索结果为空提示 -->
      <div v-if="filteredArticles.length === 0" class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><line x1="8" x2="14" y1="11" y2="11"/>
        </svg>
        <p>未找到与「{{ searchQuery }}」相关的文章</p>
        <button class="reset-filter-btn" type="button" @click="searchQuery = ''; currentCategory = '全部'">
          重置所有筛选
        </button>
      </div>

      <!-- 分组展示（全部且未搜索模式） -->
      <template v-else-if="groupedArticles">
        <section v-for="(list, catName) in groupedArticles" :key="catName" class="catalog-section">
          <div class="section-title">
            <h2>{{ catName }}</h2>
            <span class="section-badge">{{ list.length }} 篇</span>
          </div>

          <div :class="['articles-container', viewMode]">
            <a
              v-for="item in list"
              :key="item.link"
              :href="item.link"
              class="article-card"
            >
              <div class="card-header">
                <span class="card-category">{{ item.category }}</span>
                <span v-if="item.badge" class="card-badge">{{ item.badge }}</span>
                <span class="card-date">{{ item.date }}</span>
              </div>
              <h3 class="card-title">
                {{ item.title }}
                <span class="card-arrow">→</span>
              </h3>
              <p class="card-desc">{{ item.description }}</p>
              <div class="card-tags">
                <span v-for="tag in item.tags" :key="tag" class="tag-pill">#{{ tag }}</span>
              </div>
            </a>
          </div>
        </section>
      </template>

      <!-- 扁平展示（选中特定分类或正在搜索时） -->
      <div v-else :class="['articles-container', viewMode]">
        <a
          v-for="item in filteredArticles"
          :key="item.link"
          :href="item.link"
          class="article-card"
        >
          <div class="card-header">
            <span class="card-category">{{ item.category }}</span>
            <span v-if="item.badge" class="card-badge">{{ item.badge }}</span>
            <span class="card-date">{{ item.date }}</span>
          </div>
          <h3 class="card-title">
            {{ item.title }}
            <span class="card-arrow">→</span>
          </h3>
          <p class="card-desc">{{ item.description }}</p>
          <div class="card-tags">
            <span v-for="tag in item.tags" :key="tag" class="tag-pill">#{{ tag }}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.categories-page {
  width: 100%;
  margin: 0 auto;
  padding: 8px 0 40px;
}

.catalog-header {
  margin-bottom: 24px;
  animation: catalog-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: 0.08s;
}

.catalog-meta {
  font-size: 14px;
  color: var(--text-secondary);
}

.catalog-meta .highlight {
  font-weight: 600;
  color: var(--hbu-blue-light);
}

/* 控制栏 */
.catalog-controls {
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: catalog-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: 0.16s;
}

@keyframes catalog-in {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 分类 Chips 列表 */
.chips-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: var(--radius-full);
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  font-size: 13.5px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.chip-btn:hover {
  border-color: var(--hbu-blue);
  color: var(--text-primary);
}

.chip-btn.active {
  background: var(--hbu-blue);
  border-color: var(--hbu-blue);
  color: #fff;
  font-weight: 500;
}

.chip-count {
  font-size: 11.5px;
  padding: 1px 6px;
  border-radius: 9999px;
  background: rgba(125, 125, 125, 0.15);
}

.chip-btn.active .chip-count {
  background: rgba(255, 255, 255, 0.25);
  color: #fff;
}

/* 操作栏：搜索与视图 */
.action-bar {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-box {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: var(--text-muted);
  pointer-events: none;
}

.search-box input {
  width: 100%;
  padding: 8px 36px 8px 36px;
  border-radius: var(--radius-sm);
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  font-size: 13.5px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search-box input:focus {
  border-color: var(--hbu-blue);
  box-shadow: 0 0 0 2px var(--hbu-blue-muted);
}

.clear-btn {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 2px 6px;
  font-size: 12px;
}

.clear-btn:hover {
  color: var(--text-primary);
}

.view-switch {
  display: flex;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  background: var(--bg-surface);
  padding: 2px;
}

.view-btn {
  padding: 6px 10px;
  background: none;
  border: none;
  color: var(--text-muted);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.view-btn.active {
  background: var(--bg-elevated);
  color: var(--hbu-blue-light);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

/* 分组标题 */
.catalog-section {
  margin-bottom: 36px;
  animation: catalog-in 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.catalog-section:nth-child(1) { animation-delay: 0.20s; }
.catalog-section:nth-child(2) { animation-delay: 0.28s; }
.catalog-section:nth-child(3) { animation-delay: 0.36s; }
.catalog-section:nth-child(4) { animation-delay: 0.44s; }
.catalog-section:nth-child(5) { animation-delay: 0.52s; }
.catalog-section:nth-child(6) { animation-delay: 0.60s; }

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border-subtle);
}

.section-title h2 {
  margin: 0 !important;
  padding: 0 !important;
  font-size: 19px !important;
  font-weight: 600 !important;
  color: var(--text-primary);
  border: none !important;
}

.section-badge {
  font-size: 12px;
  color: var(--text-muted);
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  padding: 1px 8px;
  border-radius: var(--radius-full);
}

/* 文章容器：卡片视图 */
.articles-container.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

/* 卡片样式 */
.article-card {
  display: flex;
  flex-direction: column;
  padding: 18px 20px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  text-decoration: none !important;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  animation: card-appear 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
  will-change: transform, opacity;
}

@keyframes card-appear {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.articles-container .article-card:nth-child(1) { animation-delay: 0.06s; }
.articles-container .article-card:nth-child(2) { animation-delay: 0.12s; }
.articles-container .article-card:nth-child(3) { animation-delay: 0.18s; }
.articles-container .article-card:nth-child(4) { animation-delay: 0.24s; }
.articles-container .article-card:nth-child(5) { animation-delay: 0.30s; }
.articles-container .article-card:nth-child(6) { animation-delay: 0.36s; }
.articles-container .article-card:nth-child(7) { animation-delay: 0.42s; }
.articles-container .article-card:nth-child(8) { animation-delay: 0.48s; }

.article-card:hover {
  transform: translateY(-3px);
  border-color: rgba(46, 111, 216, 0.35);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

.dark .article-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35), 0 0 12px rgba(46, 111, 216, 0.15);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.card-category {
  font-size: 11.5px;
  color: var(--hbu-blue-light);
  font-weight: 600;
  text-transform: uppercase;
}

.card-badge {
  font-size: 11px;
  background: var(--hbu-blue-muted);
  color: var(--hbu-blue-light);
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 500;
}

.card-date {
  margin-left: auto;
  font-size: 12px;
  color: var(--text-muted);
}

.card-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16.5px !important;
  font-weight: 600 !important;
  color: var(--text-primary) !important;
  margin: 0 0 8px 0 !important;
  line-height: 1.4 !important;
}

.card-arrow {
  color: var(--hbu-blue-light);
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.article-card:hover .card-arrow {
  opacity: 1;
  transform: translateX(0);
}

.card-desc {
  font-size: 13.5px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 14px 0 !important;
  flex: 1;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag-pill {
  font-size: 11.5px;
  color: var(--text-muted);
  background: var(--bg-elevated);
  padding: 2px 8px;
  border-radius: 4px;
}

/* 列表视图样式 */
.articles-container.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.articles-container.list .article-card {
  padding: 12px 18px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.articles-container.list .card-header {
  margin-bottom: 0;
  min-width: 110px;
}

.articles-container.list .card-title {
  margin-bottom: 0 !important;
  font-size: 15px !important;
  min-width: 200px;
}

.articles-container.list .card-desc {
  display: none;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 48px 0;
  color: var(--text-muted);
}

.empty-state svg {
  margin: 0 auto 12px;
}

.empty-state p {
  font-size: 14.5px;
  margin-bottom: 16px;
}

.reset-filter-btn {
  padding: 8px 18px;
  border-radius: var(--radius-full);
  background: var(--hbu-blue);
  color: #fff;
  border: none;
  font-size: 13.5px;
  cursor: pointer;
}

@media (max-width: 639px) {
  .articles-container.cards {
    grid-template-columns: 1fr;
  }
  .articles-container.list .card-tags {
    display: none;
  }
}
</style>
