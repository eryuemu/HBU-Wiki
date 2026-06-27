<script setup>
import { ref, computed } from 'vue'
import transferData from '../../data/transferData.json'

const searchQuery = ref('')
const sortBy = ref('ratio')
const sortOrder = ref('desc')
const selectedCategory = ref('all')
const selectedTier = ref('all')
const showMathOnly = ref(false)

const categories = computed(() => {
  const cats = new Set(transferData.majors.map(m => m.category))
  return ['all', ...Array.from(cats).sort()]
})

const categoryLabels = {
  'all': '全部',
  '工学': '🔧 工学',
  '理学': '🔬 理学',
  '医学': '🏥 医学',
  '管理学': '📊 管理学',
  '经济学': '💰 经济学',
  '法学': '⚖️ 法学',
  '文学': '📝 文学',
  '教育学': '📖 教育学',
  '历史学': '📜 历史学',
  '哲学': '💭 哲学'
}

function getTierByRatio(ratio) {
  for (const tier of transferData.tiers.ratio) {
    if (ratio >= tier.min) return tier
  }
  return transferData.tiers.ratio[transferData.tiers.ratio.length - 1]
}

function getTierByGPA(gpa) {
  if (!gpa) return null
  for (const tier of transferData.tiers.gpa) {
    if (gpa >= tier.min) return tier
  }
  return transferData.tiers.gpa[transferData.tiers.gpa.length - 1]
}

function getRatioTierId(ratio) {
  const tier = getTierByRatio(ratio)
  return tier ? tier.id : 'none'
}

const filteredMajors = computed(() => {
  let result = [...transferData.majors]

  // Search filter
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.college.toLowerCase().includes(q) ||
      m.tags.some(t => t.toLowerCase().includes(q))
    )
  }

  // Category filter
  if (selectedCategory.value !== 'all') {
    result = result.filter(m => m.category === selectedCategory.value)
  }

  // Tier filter
  if (selectedTier.value !== 'all') {
    result = result.filter(m => getRatioTierId(m.ratio) === selectedTier.value)
  }

  // Math filter
  if (showMathOnly.value) {
    result = result.filter(m => !m.mathRequired)
  }

  // Sort
  result.sort((a, b) => {
    let va, vb
    switch (sortBy.value) {
      case 'ratio':
        va = a.ratio; vb = b.ratio; break
      case 'gpa':
        va = a.minGPA || 0; vb = b.minGPA || 0; break
      case 'slots':
        va = a.slots; vb = b.slots; break
      case 'applicants':
        va = a.applicants; vb = b.applicants; break
      default:
        va = a.ratio; vb = b.ratio
    }
    return sortOrder.value === 'desc' ? vb - va : va - vb
  })

  return result
})

const sortOptions = [
  { value: 'ratio', label: '竞争比' },
  { value: 'gpa', label: '最低绩点' },
  { value: 'slots', label: '招生名额' },
  { value: 'applicants', label: '报名人数' }
]

function toggleSort(field) {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'desc' ? 'asc' : 'desc'
  } else {
    sortBy.value = field
    sortOrder.value = 'desc'
  }
}

function formatGPA(gpa) {
  if (!gpa) return '暂无'
  return gpa.toFixed(4)
}

function getGPAPercent(gpa) {
  if (!gpa) return 0
  // 绩点范围 0-5，映射到百分比
  return Math.min((gpa / 5) * 100, 100)
}

function getRatioColor(ratio) {
  const tier = getTierByRatio(ratio)
  return tier ? tier.color : '#94a3b8'
}
</script>

<template>
  <div class="te-container">
    <!-- Header -->
    <div class="te-header">
      <div class="te-title-row">
        <h3 class="te-title">🔍 转专业数据探索器</h3>
        <span class="te-badge">{{ filteredMajors.length }} / {{ transferData.majors.length }} 个专业</span>
      </div>
      <p class="te-subtitle">{{ transferData.year }}年数据 · 支持筛选、排序、搜索</p>
    </div>

    <!-- Search -->
    <div class="te-search-wrapper">
      <svg class="te-search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <input
        v-model="searchQuery"
        type="text"
        class="te-search-input"
        placeholder="搜索专业名、学院或标签..."
      />
      <span v-if="searchQuery" class="te-search-clear" @click="searchQuery = ''">✕</span>
    </div>

    <!-- Filters -->
    <div class="te-filters">
      <!-- Category chips -->
      <div class="te-filter-group">
        <div class="te-filter-label">学科门类</div>
        <div class="te-chips">
          <button
            v-for="cat in categories"
            :key="cat"
            :class="['te-chip', { active: selectedCategory === cat }]"
            @click="selectedCategory = cat"
          >
            {{ categoryLabels[cat] || cat }}
          </button>
        </div>
      </div>

      <!-- Tier filter -->
      <div class="te-filter-group">
        <div class="te-filter-label">竞争等级</div>
        <div class="te-chips">
          <button
            :class="['te-chip', { active: selectedTier === 'all' }]"
            @click="selectedTier = 'all'"
          >全部</button>
          <button
            v-for="tier in transferData.tiers.ratio"
            :key="tier.id"
            :class="['te-chip', { active: selectedTier === tier.id }]"
            :style="selectedTier === tier.id ? { borderColor: tier.color, color: tier.color } : {}"
            @click="selectedTier = tier.id"
          >
            {{ tier.label }}
          </button>
        </div>
      </div>

      <!-- Quick toggles -->
      <div class="te-filter-group">
        <label class="te-toggle">
          <input type="checkbox" v-model="showMathOnly" />
          <span class="te-toggle-slider"></span>
          <span class="te-toggle-label">只看不需要大学数学C及以上成绩的专业</span>
        </label>
      </div>
    </div>

    <!-- Sort bar -->
    <div class="te-sort-bar">
      <span class="te-sort-label">排序：</span>
      <button
        v-for="opt in sortOptions"
        :key="opt.value"
        :class="['te-sort-btn', { active: sortBy === opt.value }]"
        @click="toggleSort(opt.value)"
      >
        {{ opt.label }}
        <span v-if="sortBy === opt.value" class="te-sort-arrow">
          {{ sortOrder === 'desc' ? '↓' : '↑' }}
        </span>
      </button>
    </div>

    <!-- Results -->
    <div class="te-results">
      <div v-if="filteredMajors.length === 0" class="te-empty">
        <p>没有找到匹配的专业 😅</p>
        <button class="te-reset-btn" @click="searchQuery = ''; selectedCategory = 'all'; selectedTier = 'all'; showMathOnly = false">
          重置筛选
        </button>
      </div>

      <div
        v-for="major in filteredMajors"
        :key="major.name"
        class="te-card"
      >
        <div class="te-card-header">
          <div class="te-card-title-row">
            <span class="te-tier-icon" :style="{ color: getRatioColor(major.ratio) }">
              {{ getTierByRatio(major.ratio).label.split(' ')[0] }}
            </span>
            <h4 class="te-major-name">{{ major.name }}</h4>
            <span v-if="major.mathRequired" class="te-math-badge" title="需要大学数学C及以上">📐 需高数</span>
          </div>
          <div class="te-card-college">{{ major.college }}</div>
        </div>

        <div class="te-card-stats">
          <div class="te-stat">
            <div class="te-stat-value" :style="{ color: getRatioColor(major.ratio) }">
              {{ major.ratio > 0 ? major.ratio.toFixed(2) : '-' }}
            </div>
            <div class="te-stat-label">竞争比</div>
          </div>
          <div class="te-stat-divider"></div>
          <div class="te-stat">
            <div class="te-stat-value">{{ major.slots }}</div>
            <div class="te-stat-label">计划名额</div>
          </div>
          <div class="te-stat-divider"></div>
          <div class="te-stat">
            <div class="te-stat-value">{{ major.applicants }}</div>
            <div class="te-stat-label">报名人数</div>
          </div>
        </div>

        <!-- GPA bar -->
        <div v-if="major.minGPA" class="te-gpa-section">
          <div class="te-gpa-header">
            <span class="te-gpa-label">最低录取绩点</span>
            <span class="te-gpa-value">{{ formatGPA(major.minGPA) }}</span>
            <span v-if="getTierByGPA(major.minGPA)" class="te-gpa-tier">
              {{ getTierByGPA(major.minGPA).id }}
            </span>
          </div>
          <div class="te-gpa-bar-track">
            <div
              class="te-gpa-bar-fill"
              :style="{
                width: getGPAPercent(major.minGPA) + '%',
                backgroundColor: getRatioColor(major.ratio)
              }"
            ></div>
          </div>
        </div>
        <div v-else class="te-gpa-section">
          <span class="te-gpa-label te-gpa-na">最低绩点：暂无数据</span>
        </div>

        <!-- Tags -->
        <div class="te-tags">
          <span v-for="tag in major.tags" :key="tag" class="te-tag">{{ tag }}</span>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="te-footer">
      <p>📊 数据来源：{{ transferData.dataSource }}</p>
      <p>⏰ 报录比统计时间：{{ transferData.ratioDataTime }}</p>
    </div>
  </div>
</template>

<style scoped>
.te-container {
  margin: 32px 0;
  font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, sans-serif);
}

.te-header {
  margin-bottom: 24px;
}

.te-title-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.te-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0;
}

.te-badge {
  font-size: 13px;
  padding: 4px 12px;
  border-radius: 99px;
  background: var(--vp-c-brand-soft, rgba(30, 86, 176, 0.08));
  color: var(--vp-c-brand-1);
  font-weight: 600;
  white-space: nowrap;
}

.te-subtitle {
  font-size: 14px;
  color: var(--vp-c-text-3);
  margin-top: 4px;
}

/* Search */
.te-search-wrapper {
  position: relative;
  margin-bottom: 20px;
}

.te-search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--vp-c-text-3);
  pointer-events: none;
}

.te-search-input {
  width: 100%;
  padding: 12px 40px 12px 42px;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  box-sizing: border-box;
  font-family: inherit;
}

.te-search-input:focus {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft, rgba(30, 86, 176, 0.1));
}

.te-search-input::placeholder {
  color: var(--vp-c-text-3);
}

.te-search-clear {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--vp-c-text-3);
  font-size: 14px;
  padding: 4px;
  transition: color 0.2s;
}

.te-search-clear:hover {
  color: var(--vp-c-text-1);
}

/* Filters */
.te-filters {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.te-filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.te-filter-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  letter-spacing: 0.02em;
}

.te-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.te-chip {
  padding: 6px 14px;
  border-radius: 99px;
  border: 1px solid var(--vp-c-border);
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  font-family: inherit;
}

.te-chip:hover {
  border-color: var(--vp-c-text-3);
  color: var(--vp-c-text-1);
}

.te-chip.active {
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
  border-color: var(--vp-c-text-1);
}

/* Toggle */
.te-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
}

.te-toggle input {
  display: none;
}

.te-toggle-slider {
  width: 40px;
  height: 22px;
  border-radius: 11px;
  background: var(--vp-c-border);
  position: relative;
  transition: background 0.2s ease;
  flex-shrink: 0;
}

.te-toggle-slider::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  top: 2px;
  left: 2px;
  transition: transform 0.2s ease;
}

.te-toggle input:checked + .te-toggle-slider {
  background: var(--vp-c-brand-1);
}

.te-toggle input:checked + .te-toggle-slider::after {
  transform: translateX(18px);
}

.te-toggle-label {
  font-size: 13.5px;
  color: var(--vp-c-text-2);
}

/* Sort bar */
.te-sort-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.te-sort-label {
  font-size: 13px;
  color: var(--vp-c-text-3);
  font-weight: 500;
}

.te-sort-btn {
  padding: 5px 12px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: inherit;
}

.te-sort-btn:hover {
  border-color: var(--vp-c-text-3);
}

.te-sort-btn.active {
  background: var(--vp-c-brand-soft, rgba(30, 86, 176, 0.08));
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.te-sort-arrow {
  font-size: 12px;
}

/* Results */
.te-results {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.te-empty {
  text-align: center;
  padding: 48px 24px;
  color: var(--vp-c-text-3);
}

.te-reset-btn {
  margin-top: 12px;
  padding: 8px 20px;
  border-radius: 99px;
  border: 1px solid var(--vp-c-border);
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  font-family: inherit;
}

.te-reset-btn:hover {
  border-color: var(--vp-c-text-1);
  color: var(--vp-c-text-1);
}

/* Card */
.te-card {
  padding: 20px 24px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
}

.te-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.dark .te-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  background: #161616;
}

.te-card-header {
  margin-bottom: 16px;
}

.te-card-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.te-tier-icon {
  font-size: 18px;
  flex-shrink: 0;
}

.te-major-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0;
}

.te-math-badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 99px;
  background: rgba(245, 158, 11, 0.12);
  color: #d97706;
  font-weight: 600;
  white-space: nowrap;
}

.te-card-college {
  font-size: 13.5px;
  color: var(--vp-c-text-3);
  margin-top: 4px;
}

/* Stats row */
.te-card-stats {
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 16px;
  padding: 12px 0;
  border-top: 1px solid var(--vp-c-border);
  border-bottom: 1px solid var(--vp-c-border);
}

.te-stat {
  flex: 1;
  text-align: center;
}

.te-stat-value {
  font-size: 22px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
  line-height: 1.2;
}

.te-stat-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-top: 2px;
}

.te-stat-divider {
  width: 1px;
  height: 32px;
  background: var(--vp-c-border);
  flex-shrink: 0;
}

/* GPA bar */
.te-gpa-section {
  margin-bottom: 12px;
}

.te-gpa-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.te-gpa-label {
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}

.te-gpa-na {
  font-style: italic;
}

.te-gpa-value {
  font-size: 14px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
}

.te-gpa-tier {
  font-size: 11px;
  padding: 1px 8px;
  border-radius: 99px;
  background: var(--vp-c-bg-elv, var(--vp-c-bg-soft));
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.te-gpa-bar-track {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: var(--vp-c-border);
  overflow: hidden;
}

.te-gpa-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Tags */
.te-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.te-tag {
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 99px;
  background: var(--vp-c-brand-soft, rgba(30, 86, 176, 0.08));
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

/* Footer */
.te-footer {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-border);
}

.te-footer p {
  font-size: 12.5px;
  color: var(--vp-c-text-3);
  margin: 4px 0;
}

/* Responsive */
@media (max-width: 640px) {
  .te-card {
    padding: 16px;
  }

  .te-stat-value {
    font-size: 18px;
  }

  .te-major-name {
    font-size: 16px;
  }

  .te-chips {
    gap: 6px;
  }

  .te-chip {
    padding: 5px 10px;
    font-size: 12px;
  }
}
</style>
