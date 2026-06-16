<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const stats = [
  { label: '百科板块', target: 18, suffix: '+', current: ref(0) },
  { label: '收录条目', target: 160, suffix: '+', current: ref(0) },
  { label: '参与共建同学', target: 320, suffix: '+', current: ref(0) }
]

const containerRef = ref(null)
let observer = null

const startCountAnimation = (item, duration = 1500) => {
  let startTime = null
  const step = (timestamp) => {
    if (!startTime) startTime = timestamp
    const progress = Math.min((timestamp - startTime) / duration, 1)
    
    // 使用 easeOutQuad 缓动函数让数字增长在末尾慢下来，显得更自然高级
    const easeProgress = progress * (2 - progress)
    item.current.value = Math.floor(easeProgress * item.target)
    
    if (progress < 1) {
      requestAnimationFrame(step)
    } else {
      item.current.value = item.target
    }
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  // 只在浏览器环境中运行
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 滚动到视口中时，逐个触发数字累加动画，带有小小的交错延迟
          stats.forEach((item, index) => {
            setTimeout(() => {
              startCountAnimation(item, 1200 + index * 200)
            }, index * 150)
          })
          // 触发一次后就取消观察
          if (observer && containerRef.value) {
            observer.unobserve(containerRef.value)
          }
        }
      })
    }, { threshold: 0.15 })

    if (containerRef.value) {
      observer.observe(containerRef.value)
    }
  } else {
    // 降级处理：如果没有 IntersectionObserver 则直接加载目标数字
    stats.forEach(item => {
      item.current.value = item.target
    })
  }
})

onUnmounted(() => {
  if (observer && containerRef.value) {
    observer.disconnect()
  }
})
</script>

<template>
  <div ref="containerRef" class="hbu-stats-container">
    <div class="hbu-stats-grid">
      <div v-for="item in stats" :key="item.label" class="hbu-stat-card">
        <div class="hbu-stat-number">
          <span class="hbu-stat-digit">{{ item.current.value }}</span>
          <span class="hbu-stat-suffix">{{ item.suffix }}</span>
        </div>
        <div class="hbu-stat-label">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hbu-stats-container {
  max-width: 1152px;
  margin: 64px auto 32px auto;
  padding: 0 24px;
}

.hbu-stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.hbu-stat-card {
  background: var(--vp-c-bg-alt);
  padding: 32px 24px;
  border-radius: var(--radius-lg); /* 28px organic roundness */
  text-align: center;
  border: 1px solid transparent;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease;
}

.hbu-stat-card:hover {
  transform: translateY(-4px);
  border-color: var(--vp-c-border);
}

.hbu-stat-number {
  font-family: var(--vp-font-family-base);
  font-size: 48px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1.1;
  margin-bottom: 8px;
  letter-spacing: -0.03em;
  display: flex;
  justify-content: center;
  align-items: baseline;
}

.hbu-stat-digit {
  font-variant-numeric: tabular-nums; /* 防止数字改变时宽度抖动 */
}

.hbu-stat-suffix {
  font-size: 24px;
  margin-left: 2px;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.hbu-stat-label {
  font-size: 14.5px;
  color: var(--vp-c-text-2);
  font-weight: 500;
  letter-spacing: 0.02em;
}

@media (max-width: 768px) {
  .hbu-stats-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .hbu-stat-card {
    padding: 24px 16px;
  }
  .hbu-stat-number {
    font-size: 38px;
  }
  .hbu-stat-suffix {
    font-size: 20px;
  }
}
</style>
