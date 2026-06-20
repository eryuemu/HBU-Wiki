<script setup>
const tags = [
  { text: '🍔 食堂测评', link: '/life/food', color: 'rgba(235, 94, 40, 0.15)', textColor: '#eb5e28' },
  { text: '🗺️ 校园地图', link: '/general/map', color: 'rgba(78, 170, 255, 0.15)', textColor: '#3a86c8' },
  { text: '📚 选课攻略', link: '/academics/departments', color: 'rgba(74, 201, 153, 0.15)', textColor: '#2a9d8f' },
  { text: '📖 图书馆指南', link: '/academics/library', color: 'rgba(155, 93, 229, 0.15)', textColor: '#8338ec' },
  { text: '🎭 社团百科', link: '/culture/societies', color: 'rgba(241, 91, 181, 0.15)', textColor: '#d90429' },
  { text: '💡 避坑指南', link: '/tools/avoid-traps', color: 'rgba(255, 190, 11, 0.15)', textColor: '#e7a600' }
]
</script>

<template>
  <div class="hbu-tagbar-container hbu-reveal">
    <div class="hbu-section-title-wrapper">
      <h2 class="hbu-section-title">🔍 探索主题</h2>
      <p class="hbu-section-subtitle">点击热门标签，快速跳转至对应百科页面</p>
    </div>
    <div class="hbu-tags-wrapper">
      <a
        v-for="tag in tags"
        :key="tag.text"
        :href="tag.link"
        class="hbu-tag-pill"
        :style="{
          '--tag-bg': tag.color,
          '--tag-text-color': tag.textColor
        }"
      >
        <span class="hbu-tag-bullet"></span>
        <span class="hbu-tag-text">{{ tag.text }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.hbu-tagbar-container {
  max-width: 1152px;
  margin: 48px auto 24px auto;
  padding: 0 24px;
}

.hbu-section-title-wrapper {
  margin-bottom: 24px;
  text-align: center;
}

.hbu-section-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  letter-spacing: -0.02em;
  margin-bottom: 6px;
}

.hbu-section-subtitle {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.hbu-tags-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
}

.hbu-tag-pill {
  display: inline-flex;
  align-items: center;
  padding: 10px 22px;
  border-radius: 99px;
  background: var(--tag-bg);
  border: 1px solid rgba(255, 255, 255, 0.08);
  text-decoration: none !important;
  color: var(--tag-text-color) !important;
  font-weight: 600;
  font-size: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.hbu-tag-pill::before {
  content: '';
  position: absolute;
  inset: 0;
  background: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.dark .hbu-tag-pill::before {
  background: black;
}

.hbu-tag-bullet {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--tag-text-color);
  margin-right: 8px;
  opacity: 0.7;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.hbu-tag-pill:hover {
  border-color: var(--tag-text-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.dark .hbu-tag-pill:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.hbu-tag-pill:hover .hbu-tag-bullet {
  transform: scale(1.3);
  opacity: 1;
}

.hbu-tag-text {
  position: relative;
  z-index: 1;
}

@media (max-width: 640px) {
  .hbu-tag-pill {
    padding: 8px 16px;
    font-size: 13px;
  }
  .hbu-section-title {
    font-size: 22px;
  }
}
</style>
