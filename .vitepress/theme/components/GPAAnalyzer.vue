<script setup>
import { ref, computed, watch } from 'vue'
import transferData from '../../data/transferData.json'

const gpaInput = ref('')
const gpaValue = computed(() => parseFloat(gpaInput.value) || 0)
const isValidGPA = computed(() => gpaValue.value > 0 && gpaValue.value <= 5)
const noMathRequired = ref(false) // 是否只看不需要高数C的专业

// 只分析有最低绩点数据的专业
const majorsWithGPA = computed(() =>
  transferData.majors.filter(m => m.minGPA !== null)
)

// 按用户绩点分类
const analysis = computed(() => {
  if (!isValidGPA.value) return null

  const gpa = gpaValue.value
  let all = majorsWithGPA.value

  // 如果勾选了只看不需要高数的专业，过滤掉需要高数的专业
  if (noMathRequired.value) {
    all = all.filter(m => !m.mathRequired)
  }

  const safe = []      // 保：绩点 > 最低绩点 + 0.15
  const match = []     // 稳：绩点在最低绩点 ± 0.15 之间
  const reach = []     // 冲：绩点 < 最低绩点 - 0.15 但差距 < 0.4
  const impossible = [] // 无望：差距 > 0.4

  all.forEach(m => {
    const diff = gpa - m.minGPA
    if (diff >= 0.15) {
      safe.push({ ...m, diff })
    } else if (diff >= -0.15) {
      match.push({ ...m, diff })
    } else if (diff >= -0.4) {
      reach.push({ ...m, diff })
    } else {
      impossible.push({ ...m, diff })
    }
  })

  // 各组内按最低绩点升序（更容易的排前面）
  safe.sort((a, b) => b.minGPA - a.minGPA)
  match.sort((a, b) => a.minGPA - b.minGPA)
  reach.sort((a, b) => a.minGPA - b.minGPA)
  impossible.sort((a, b) => a.minGPA - b.minGPA)

  return { safe, match, reach, impossible, filtered: noMathRequired.value }
})

// 志愿模拟
const selectedMajors = ref([]) // 最多5个
const showVolunteerPanel = ref(false)

function toggleMajor(major) {
  const idx = selectedMajors.value.findIndex(m => m.name === major.name)
  if (idx >= 0) {
    selectedMajors.value.splice(idx, 1)
  } else if (selectedMajors.value.length < 5) {
    selectedMajors.value.push(major)
  }
}

function isMajorSelected(major) {
  return selectedMajors.value.some(m => m.name === major.name)
}

function removeMajor(index) {
  selectedMajors.value.splice(index, 1)
}

function getMajorAdvice(major) {
  if (!isValidGPA.value || !major.minGPA) return { type: 'unknown', label: '数据不足' }
  const diff = gpaValue.value - major.minGPA
  if (diff >= 0.15) return { type: 'safe', label: '保' }
  if (diff >= -0.15) return { type: 'match', label: '稳' }
  if (diff >= -0.4) return { type: 'reach', label: '冲' }
  return { type: 'danger', label: '危险' }
}

const volunteerAnalysis = computed(() => {
  if (selectedMajors.value.length === 0 || !isValidGPA.value) return null

  const types = selectedMajors.value.map(m => getMajorAdvice(m).type)
  const hasSafe = types.includes('safe')
  const hasMatch = types.includes('match')
  const hasReach = types.includes('reach')
  const hasDanger = types.includes('danger')
  
  const tips = []

  if (!hasSafe && selectedMajors.value.length >= 3) {
    tips.push({ type: 'warning', text: '⚠️ 没有"保底"志愿！建议至少加一个绩点余量充足的专业，避免全部滑档。' })
  }
  if (types.every(t => t === 'safe')) {
    tips.push({ type: 'info', text: '💡 全是保底志愿，太保守了！可以把第1-2志愿换成更好的专业冲一冲。' })
  }
  if (types.every(t => t === 'danger' || t === 'reach')) {
    tips.push({ type: 'warning', text: '⚠️ 全是冲刺志愿，风险极高！强烈建议加入稳/保志愿。' })
  }
  if (hasSafe && hasReach) {
    tips.push({ type: 'success', text: '✅ 冲稳保搭配合理，志愿梯度不错！' })
  }
  if (hasDanger) {
    tips.push({ type: 'warning', text: '⚠️ 有"危险"志愿（绩点差距过大），大概率浪费志愿名额。' })
  }

  // 检查数学限制
  if (noMathRequired.value) {
    const mathRequired = selectedMajors.value.filter(m => m.mathRequired)
    if (mathRequired.length > 0) {
      tips.push({
        type: 'error',
        text: `🚫 你选的「${mathRequired.map(m => m.name).join('、')}」需要大学数学C及以上成绩！`
      })
    }
  }

  if (tips.length === 0) {
    tips.push({ type: 'info', text: '💡 继续添加志愿到5个，获得更完整的分析。' })
  }

  return { tips }
})

function formatDiff(diff) {
  if (diff >= 0) return `+${diff.toFixed(4)}`
  return diff.toFixed(4)
}

function getRatioColor(ratio) {
  if (ratio >= 15) return '#dc2626'
  if (ratio >= 10) return '#f59e0b'
  if (ratio >= 6.5) return '#eab308'
  if (ratio >= 3) return '#22c55e'
  return '#64748b'
}
</script>

<template>
  <div class="ga-container">
    <!-- Header -->
    <div class="ga-header">
      <h3 class="ga-title">🎯 绩点定位器</h3>
      <p class="ga-subtitle">输入你的通识通修课绩点，看看能冲哪些专业</p>
    </div>

    <!-- Input Section -->
    <div class="ga-input-section">
      <div class="ga-input-row">
        <div class="ga-input-wrapper">
          <label class="ga-input-label">你的通识通修课绩点</label>
          <div class="ga-input-field-wrapper">
            <input
              v-model="gpaInput"
              type="number"
              step="0.01"
              min="0"
              max="5"
              class="ga-input-field"
              placeholder="例如 3.85"
            />
            <span class="ga-input-hint">满分 5.0</span>
          </div>
        </div>
      </div>
      
      <label class="ga-toggle">
        <input type="checkbox" v-model="noMathRequired" />
        <span class="ga-toggle-slider"></span>
        <span class="ga-toggle-label">只看不需要大学数学C及以上成绩的专业</span>
      </label>
    </div>

    <!-- Results -->
    <div v-if="isValidGPA && analysis" class="ga-results">
      <!-- Summary Bar -->
      <div class="ga-summary">
        <div class="ga-summary-item ga-safe">
          <span class="ga-summary-count">{{ analysis.safe.length }}</span>
          <span class="ga-summary-label">🟢 可保底</span>
        </div>
        <div class="ga-summary-item ga-match">
          <span class="ga-summary-count">{{ analysis.match.length }}</span>
          <span class="ga-summary-label">🟡 可冲稳</span>
        </div>
        <div class="ga-summary-item ga-reach">
          <span class="ga-summary-count">{{ analysis.reach.length }}</span>
          <span class="ga-summary-label">🟠 搏一搏</span>
        </div>
        <div class="ga-summary-item ga-impossible">
          <span class="ga-summary-count">{{ analysis.impossible.length }}</span>
          <span class="ga-summary-label">🔴 难度极大</span>
        </div>
      </div>

      <!-- GPA Position Visualization -->
      <div class="ga-visual">
        <div class="ga-visual-bar">
          <div class="ga-visual-track">
            <div 
              class="ga-visual-marker" 
              :style="{ left: Math.min((gpaValue / 5) * 100, 100) + '%' }"
            >
              <span class="ga-visual-marker-label">你的绩点 {{ gpaValue.toFixed(2) }}</span>
              <span class="ga-visual-marker-dot"></span>
            </div>
            <!-- T0-T4 区间标记 -->
            <div class="ga-visual-zone ga-zone-t4" style="left: 0; width: 70%"></div>
            <div class="ga-visual-zone ga-zone-t3" style="left: 70%; width: 6%"></div>
            <div class="ga-visual-zone ga-zone-t2" style="left: 76%; width: 4%"></div>
            <div class="ga-visual-zone ga-zone-t1" style="left: 80%; width: 4%"></div>
            <div class="ga-visual-zone ga-zone-t0" style="left: 84%; width: 16%"></div>
          </div>
          <div class="ga-visual-labels">
            <span>0</span>
            <span>T4 (&lt;3.5)</span>
            <span>T3</span>
            <span>T2</span>
            <span>T1</span>
            <span>T0 (4.2+)</span>
          </div>
        </div>
      </div>

      <!-- Major Lists by Category -->
      <div v-if="analysis.safe.length" class="ga-group">
        <div class="ga-group-header ga-safe-header">
          <span class="ga-group-icon">🟢</span>
          <span class="ga-group-title">保底区</span>
          <span class="ga-group-desc">— 你的绩点高于去年最低录取线 0.15+，上岸概率大</span>
        </div>
        <div class="ga-major-list">
          <div
            v-for="m in analysis.safe" :key="m.name"
            :class="['ga-major-item', { 'ga-selected': isMajorSelected(m) }]"
            @click="toggleMajor(m)"
          >
            <div class="ga-major-info">
              <span class="ga-major-name">{{ m.name }}</span>
              <span class="ga-major-college">{{ m.college }}</span>
            </div>
            <div class="ga-major-data">
              <span class="ga-gpa-diff ga-diff-positive">{{ formatDiff(m.diff) }}</span>
              <span class="ga-gpa-min">最低 {{ m.minGPA.toFixed(4) }}</span>
              <span class="ga-ratio" :style="{ color: getRatioColor(m.ratio) }">{{ m.ratio.toFixed(1) }}:1</span>
            </div>
            <span class="ga-add-btn" :title="isMajorSelected(m) ? '移出志愿' : '加入志愿'">
              {{ isMajorSelected(m) ? '✓' : '+' }}
            </span>
          </div>
        </div>
      </div>

      <div v-if="analysis.match.length" class="ga-group">
        <div class="ga-group-header ga-match-header">
          <span class="ga-group-icon">🟡</span>
          <span class="ga-group-title">冲稳区</span>
          <span class="ga-group-desc">— 和去年录取线接近（±0.15），有机会但有风险</span>
        </div>
        <div class="ga-major-list">
          <div
            v-for="m in analysis.match" :key="m.name"
            :class="['ga-major-item', { 'ga-selected': isMajorSelected(m) }]"
            @click="toggleMajor(m)"
          >
            <div class="ga-major-info">
              <span class="ga-major-name">{{ m.name }}</span>
              <span class="ga-major-college">{{ m.college }}</span>
            </div>
            <div class="ga-major-data">
              <span :class="['ga-gpa-diff', m.diff >= 0 ? 'ga-diff-positive' : 'ga-diff-negative']">{{ formatDiff(m.diff) }}</span>
              <span class="ga-gpa-min">最低 {{ m.minGPA.toFixed(4) }}</span>
              <span class="ga-ratio" :style="{ color: getRatioColor(m.ratio) }">{{ m.ratio.toFixed(1) }}:1</span>
            </div>
            <span class="ga-add-btn" :title="isMajorSelected(m) ? '移出志愿' : '加入志愿'">
              {{ isMajorSelected(m) ? '✓' : '+' }}
            </span>
          </div>
        </div>
      </div>

      <div v-if="analysis.reach.length" class="ga-group">
        <div class="ga-group-header ga-reach-header">
          <span class="ga-group-icon">🟠</span>
          <span class="ga-group-title">搏一搏区</span>
          <span class="ga-group-desc">— 绩点低于去年线 0.15~0.4，需要运气加持</span>
        </div>
        <div class="ga-major-list">
          <div
            v-for="m in analysis.reach" :key="m.name"
            :class="['ga-major-item', { 'ga-selected': isMajorSelected(m) }]"
            @click="toggleMajor(m)"
          >
            <div class="ga-major-info">
              <span class="ga-major-name">{{ m.name }}</span>
              <span class="ga-major-college">{{ m.college }}</span>
            </div>
            <div class="ga-major-data">
              <span class="ga-gpa-diff ga-diff-negative">{{ formatDiff(m.diff) }}</span>
              <span class="ga-gpa-min">最低 {{ m.minGPA.toFixed(4) }}</span>
              <span class="ga-ratio" :style="{ color: getRatioColor(m.ratio) }">{{ m.ratio.toFixed(1) }}:1</span>
            </div>
            <span class="ga-add-btn" :title="isMajorSelected(m) ? '移出志愿' : '加入志愿'">
              {{ isMajorSelected(m) ? '✓' : '+' }}
            </span>
          </div>
        </div>
      </div>

      <div v-if="analysis.impossible.length" class="ga-group">
        <div class="ga-group-header ga-impossible-header">
          <span class="ga-group-icon">🔴</span>
          <span class="ga-group-title">难度极大</span>
          <span class="ga-group-desc">— 绩点差距超过 0.4，建议另选目标</span>
        </div>
        <details class="ga-collapse">
          <summary class="ga-collapse-trigger">展开查看 {{ analysis.impossible.length }} 个专业</summary>
          <div class="ga-major-list">
            <div
              v-for="m in analysis.impossible" :key="m.name"
              class="ga-major-item ga-faded"
            >
              <div class="ga-major-info">
                <span class="ga-major-name">{{ m.name }}</span>
                <span class="ga-major-college">{{ m.college }}</span>
              </div>
              <div class="ga-major-data">
                <span class="ga-gpa-diff ga-diff-negative">{{ formatDiff(m.diff) }}</span>
                <span class="ga-gpa-min">最低 {{ m.minGPA.toFixed(4) }}</span>
              </div>
            </div>
          </div>
        </details>
      </div>

      <!-- Volunteer Simulator -->
      <div class="ga-volunteer-section">
        <div class="ga-volunteer-header" @click="showVolunteerPanel = !showVolunteerPanel">
          <h4 class="ga-volunteer-title">📋 志愿模拟器</h4>
          <span class="ga-volunteer-toggle">{{ showVolunteerPanel ? '收起' : '展开' }}</span>
        </div>

        <div v-if="showVolunteerPanel" class="ga-volunteer-panel">
          <p class="ga-volunteer-hint">👆 点击上方专业列表中的「+」将专业加入志愿（最多5个），系统会分析你的冲稳保策略。</p>

          <div v-if="selectedMajors.length > 0" class="ga-volunteer-list">
            <div v-for="(m, i) in selectedMajors" :key="m.name" class="ga-volunteer-item">
              <span class="ga-volunteer-index">志愿{{ i + 1 }}</span>
              <span class="ga-volunteer-name">{{ m.name }}</span>
              <span :class="['ga-volunteer-badge', `ga-badge-${getMajorAdvice(m).type}`]">
                {{ getMajorAdvice(m).label }}
              </span>
              <button class="ga-volunteer-remove" @click="removeMajor(i)">✕</button>
            </div>
          </div>
          <div v-else class="ga-volunteer-empty">
            还没有选择志愿，点击专业卡片右侧的「+」添加
          </div>

          <!-- Analysis Tips -->
          <div v-if="volunteerAnalysis" class="ga-volunteer-tips">
            <div
              v-for="(tip, i) in volunteerAnalysis.tips" :key="i"
              :class="['ga-tip', `ga-tip-${tip.type}`]"
            >
              {{ tip.text }}
            </div>
          </div>
        </div>
      </div>

      <!-- Disclaimer -->
      <div class="ga-disclaimer">
        <p>⚠️ 分析基于2026年数据，仅供参考。每年报名人数和录取线都会变化，实际结果请以学校官方公示为准。</p>
        <p>💡 "冲稳保"分类基于去年最低录取绩点的差值：保（+0.15以上）、稳（±0.15）、冲（-0.15~-0.4）。</p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="gpaInput && !isValidGPA" class="ga-error">
      请输入 0 ~ 5 之间的绩点
    </div>
  </div>
</template>

<style scoped>
.ga-container {
  margin: 32px 0;
  padding: 28px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-border);
  border-radius: 20px;
}

.ga-header { margin-bottom: 24px; }

.ga-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 4px 0;
}

.ga-subtitle {
  font-size: 14px;
  color: var(--vp-c-text-3);
  margin: 0;
}

/* Input */
.ga-input-section {
  margin-bottom: 28px;
}

.ga-input-row {
  margin-bottom: 16px;
}

.ga-input-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}

.ga-input-field-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ga-input-field {
  width: 160px;
  padding: 12px 16px;
  border: 2px solid var(--vp-c-border);
  border-radius: 12px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 20px;
  font-weight: 700;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
  font-variant-numeric: tabular-nums;
}

.ga-input-field:focus {
  border-color: var(--vp-c-brand-1);
}

.ga-input-field::placeholder {
  color: var(--vp-c-text-3);
  font-weight: 400;
  font-size: 16px;
}

/* Remove number input spinners */
.ga-input-field::-webkit-outer-spin-button,
.ga-input-field::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.ga-input-field[type=number] { -moz-appearance: textfield; }

.ga-input-hint {
  font-size: 13px;
  color: var(--vp-c-text-3);
}

/* Toggle */
.ga-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
}

.ga-toggle input { display: none; }

.ga-toggle-slider {
  width: 40px;
  height: 22px;
  border-radius: 11px;
  background: var(--vp-c-border);
  position: relative;
  transition: background 0.2s;
  flex-shrink: 0;
}

.ga-toggle-slider::after {
  content: '';
  position: absolute;
  width: 18px; height: 18px;
  border-radius: 50%;
  background: white;
  top: 2px; left: 2px;
  transition: transform 0.2s;
}

.ga-toggle input:checked + .ga-toggle-slider {
  background: var(--vp-c-brand-1);
}

.ga-toggle input:checked + .ga-toggle-slider::after {
  transform: translateX(18px);
}

.ga-toggle-label {
  font-size: 13.5px;
  color: var(--vp-c-text-2);
}

/* Summary */
.ga-summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 28px;
}

.ga-summary-item {
  text-align: center;
  padding: 16px 8px;
  border-radius: 14px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
}

.ga-summary-count {
  display: block;
  font-size: 28px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  line-height: 1.2;
}

.ga-safe .ga-summary-count { color: #22c55e; }
.ga-match .ga-summary-count { color: #eab308; }
.ga-reach .ga-summary-count { color: #f97316; }
.ga-impossible .ga-summary-count { color: #ef4444; }

.ga-summary-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-top: 4px;
  display: block;
}

/* Visual bar */
.ga-visual {
  margin-bottom: 28px;
}

.ga-visual-track {
  position: relative;
  height: 12px;
  border-radius: 6px;
  background: var(--vp-c-border);
  overflow: visible;
}

.ga-visual-zone {
  position: absolute;
  top: 0;
  height: 100%;
  opacity: 0.3;
}

.ga-zone-t4 { background: #64748b; border-radius: 6px 0 0 6px; }
.ga-zone-t3 { background: #eab308; }
.ga-zone-t2 { background: #f97316; }
.ga-zone-t1 { background: #ef4444; }
.ga-zone-t0 { background: #dc2626; border-radius: 0 6px 6px 0; }

.ga-visual-marker {
  position: absolute;
  top: -32px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
}

.ga-visual-marker-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  white-space: nowrap;
  margin-bottom: 4px;
}

.ga-visual-marker-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  border: 3px solid var(--vp-c-bg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.ga-visual-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 11px;
  color: var(--vp-c-text-3);
}

/* Groups */
.ga-group {
  margin-bottom: 24px;
}

.ga-group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.ga-group-icon { font-size: 16px; }

.ga-group-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.ga-group-desc {
  font-size: 13px;
  color: var(--vp-c-text-3);
}

/* Major list */
.ga-major-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ga-major-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  background: var(--vp-c-bg);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ga-major-item:hover {
  border-color: var(--vp-c-border);
  background: var(--vp-c-bg-soft);
}

.ga-major-item.ga-selected {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft, rgba(30, 86, 176, 0.06));
}

.ga-major-item.ga-faded {
  opacity: 0.6;
  cursor: default;
}

.ga-major-info {
  flex: 1;
  min-width: 0;
}

.ga-major-name {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.ga-major-college {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.ga-major-data {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.ga-gpa-diff {
  font-size: 14px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  min-width: 65px;
  text-align: right;
}

.ga-diff-positive { color: #22c55e; }
.ga-diff-negative { color: #ef4444; }

.ga-gpa-min {
  font-size: 12px;
  color: var(--vp-c-text-3);
  min-width: 80px;
}

.ga-ratio {
  font-size: 13px;
  font-weight: 600;
  min-width: 50px;
  text-align: right;
}

.ga-add-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--vp-c-brand-soft, rgba(30, 86, 176, 0.1));
  color: var(--vp-c-brand-1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  flex-shrink: 0;
  transition: all 0.2s;
}

.ga-selected .ga-add-btn {
  background: var(--vp-c-brand-1);
  color: white;
}

/* Collapse */
.ga-collapse {
  border: none;
}

.ga-collapse-trigger {
  font-size: 13px;
  color: var(--vp-c-text-3);
  cursor: pointer;
  padding: 8px 0;
  margin-bottom: 8px;
  list-style: none;
}

.ga-collapse-trigger::-webkit-details-marker { display: none; }

.ga-collapse-trigger::before {
  content: '▸ ';
}

.ga-collapse[open] .ga-collapse-trigger::before {
  content: '▾ ';
}

/* Volunteer */
.ga-volunteer-section {
  margin-top: 32px;
  border-top: 1px solid var(--vp-c-border);
  padding-top: 24px;
}

.ga-volunteer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 16px;
}

.ga-volunteer-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0;
}

.ga-volunteer-toggle {
  font-size: 13px;
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.ga-volunteer-hint {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin-bottom: 16px;
}

.ga-volunteer-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.ga-volunteer-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: var(--vp-c-bg);
  border-radius: 10px;
  border: 1px solid var(--vp-c-border);
}

.ga-volunteer-index {
  font-size: 12px;
  font-weight: 700;
  color: var(--vp-c-text-3);
  min-width: 40px;
}

.ga-volunteer-name {
  flex: 1;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.ga-volunteer-badge {
  font-size: 12px;
  font-weight: 700;
  padding: 2px 10px;
  border-radius: 99px;
}

.ga-badge-safe { background: rgba(34, 197, 94, 0.15); color: #22c55e; }
.ga-badge-match { background: rgba(234, 179, 8, 0.15); color: #ca8a04; }
.ga-badge-reach { background: rgba(249, 115, 22, 0.15); color: #f97316; }
.ga-badge-danger { background: rgba(239, 68, 68, 0.15); color: #ef4444; }
.ga-badge-unknown { background: var(--vp-c-bg-soft); color: var(--vp-c-text-3); }

.ga-volunteer-remove {
  background: none;
  border: none;
  color: var(--vp-c-text-3);
  cursor: pointer;
  font-size: 14px;
  padding: 4px;
  transition: color 0.2s;
}

.ga-volunteer-remove:hover {
  color: #ef4444;
}

.ga-volunteer-empty {
  text-align: center;
  padding: 24px;
  color: var(--vp-c-text-3);
  font-size: 14px;
}

/* Tips */
.ga-volunteer-tips {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ga-tip {
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.6;
}

.ga-tip-success { background: rgba(34, 197, 94, 0.08); color: #16a34a; border: 1px solid rgba(34, 197, 94, 0.2); }
.ga-tip-warning { background: rgba(249, 115, 22, 0.08); color: #ea580c; border: 1px solid rgba(249, 115, 22, 0.2); }
.ga-tip-error { background: rgba(239, 68, 68, 0.08); color: #dc2626; border: 1px solid rgba(239, 68, 68, 0.2); }
.ga-tip-info { background: rgba(30, 86, 176, 0.06); color: var(--vp-c-brand-1); border: 1px solid rgba(30, 86, 176, 0.15); }

.dark .ga-tip-success { color: #4ade80; }
.dark .ga-tip-warning { color: #fb923c; }
.dark .ga-tip-error { color: #f87171; }

/* Disclaimer */
.ga-disclaimer {
  margin-top: 24px;
  padding: 16px;
  background: var(--vp-c-bg);
  border-radius: 10px;
}

.ga-disclaimer p {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin: 4px 0;
  line-height: 1.6;
}

.ga-error {
  text-align: center;
  padding: 24px;
  color: #ef4444;
  font-size: 14px;
}

/* Responsive */
@media (max-width: 640px) {
  .ga-container { padding: 20px 16px; }
  .ga-summary { grid-template-columns: repeat(2, 1fr); }
  .ga-summary-count { font-size: 22px; }
  .ga-major-data { flex-wrap: wrap; gap: 6px; }
  .ga-gpa-min { display: none; }
  .ga-major-item { padding: 10px 12px; }
  .ga-input-field { width: 120px; font-size: 18px; }
}
</style>
