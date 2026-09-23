<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vitepress'
import { useData } from 'vitepress'

const route = useRoute()
const { isDark } = useData()
const container = ref(null)

const theme = computed(() => isDark.value ? 'noborder_dark' : 'noborder_light')

function loadGiscus() {
  if (!container.value) return
  // Clear existing
  container.value.innerHTML = ''

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'eryuemu/HBU-Wiki')
  script.setAttribute('data-repo-id', 'R_kgDOSP50yA')
  script.setAttribute('data-category', 'Announcements')
  script.setAttribute('data-category-id', 'DIC_kwDOSP50yM4C__Te')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'top')
  script.setAttribute('data-theme', theme.value)
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('data-loading', 'lazy')
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true

  container.value.appendChild(script)
}

// Reload on theme change
watch(theme, () => {
  const iframe = container.value?.querySelector('iframe.giscus-frame')
  if (iframe) {
    iframe.contentWindow?.postMessage(
      { giscus: { setConfig: { theme: theme.value } } },
      'https://giscus.app'
    )
  }
})

// Reload on route change
watch(() => route.path, () => {
  setTimeout(loadGiscus, 300)
})

onMounted(() => {
  setTimeout(loadGiscus, 500)
})
</script>

<template>
  <div class="giscus-wrapper">
    <div class="giscus-divider">
      <span class="giscus-divider-text">💬 评论区</span>
    </div>
    <div ref="container" class="giscus-container"></div>
    <div class="giscus-notice">
      <p>评论基于 <a href="https://giscus.app" target="_blank" rel="noopener">Giscus</a>（需 GitHub 登录）。没有 GitHub 账号？欢迎加入 <a href="https://qun.qq.com/universal-share/share?ac=1&authKey=t3o7wT8D4G9XuA50RJ%2BqLzknO9lFZhb73rpMswrq%2BhkjO5wfPBemg4PqJVG99%2BG0&busi_data=eyJncm91cENvZGUiOiIxMTI2NDA0NDgzIiwidG9rZW4iOiJBeksrZnh3Zkw3STZTRHZKTTNaZzJROUFmVW1jeXpkN21odXY0aW1mMWhxbWtnOHQxN3psNnA4bUozaVNSV1Y5IiwidWluIjoiMzQxOTE0NDg0MiJ9&data=HSyeTU6RPB8ppy95JU1qXTNNd7NbScFAtqhR6r0CIOrCrKdwkbZt00sF2e9ZvI4CAYktIDzT2OtNYZtfzVYwtw&svctype=4&tempid=h5_group_info" target="_blank" rel="noopener">读者交流群（QQ: 1126404483）</a> 随手截图报错或提问贡献！</p>
    </div>
  </div>
</template>

<style scoped>
.giscus-wrapper {
  margin-top: 48px;
  padding-top: 32px;
}

.giscus-divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.giscus-divider::before,
.giscus-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--vp-c-border);
}

.giscus-divider-text {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.giscus-container {
  min-height: 200px;
}

.giscus-notice {
  margin-top: 16px;
  text-align: center;
}

.giscus-notice p {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.giscus-notice a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.giscus-notice a:hover {
  text-decoration: underline;
}
</style>
