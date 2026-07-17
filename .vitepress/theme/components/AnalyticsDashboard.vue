<script setup>
import { ref, onMounted, computed } from 'vue'
import { useData } from 'vitepress'

const { theme } = useData()
const iframeLoading = ref(true)

// 从 themeConfig 中获取分享的 URL
const shareUrl = computed(() => {
  return theme.value.analyticsShareUrl || ''
})

function onIframeLoad() {
  iframeLoading.value = false
}
</script>

<template>
  <div class="analytics-dashboard-container">
    <div class="dashboard-header">
      <h1 class="dashboard-title">
        <svg class="title-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
        实时访问统计
      </h1>
      <p class="dashboard-subtitle">实时查看 HBU Wiki 的访问流量、活跃度以及热门页面数据</p>
    </div>

    <!-- 已配置 Share URL -->
    <div v-if="shareUrl" class="iframe-wrapper">
      <div v-if="iframeLoading" class="loading-overlay">
        <div class="spinner"></div>
        <p class="loading-text">正在载入实时统计大屏...</p>
      </div>
      <iframe
        :src="shareUrl"
        class="analytics-iframe"
        frameborder="0"
        scrolling="yes"
        allowtransparency="true"
        @load="onIframeLoad"
      ></iframe>
    </div>

    <!-- 未配置 Share URL 时显示的友好新手配置引导 -->
    <div v-else class="guide-card">
      <div class="guide-icon">🛠️</div>
      <h2 class="guide-title">需要完成最后一步配置</h2>
      <p class="guide-desc">
        您已经成功在网站上集成了统计代码！为了在此页面显示可视化的实时分析面板，请将您在 Umami 获得的公开分享链接配置到配置文件中。
      </p>
      
      <div class="steps-list">
        <div class="step-item">
          <span class="step-num">1</span>
          <span class="step-text">登录 <a href="https://cloud.umami.is" target="_blank">Umami Cloud 控制台</a></span>
        </div>
        <div class="step-item">
          <span class="step-num">2</span>
          <span class="step-text">进入 <b>Websites</b> 列表，找到 <b>HBU Wiki</b> 并点击右侧的 <b>Settings (齿轮图标)</b></span>
        </div>
        <div class="step-item">
          <span class="step-num">3</span>
          <span class="step-text">在设置中点击 <b>Share URL</b> 菜单，开启 <b>Share URL</b> 开关并复制生成的链接</span>
        </div>
        <div class="step-item">
          <span class="step-num">4</span>
          <span class="step-text">
            打开项目中的 <code>.vitepress/config.mjs</code>，在 <code>themeConfig</code> 节点中添加：
            <pre class="code-block"><code>analyticsShareUrl: '您的公开分享链接'</code></pre>
          </span>
        </div>
      </div>
      
      <div class="guide-tip">
        💡 <b>提示：</b> 配置完成后重启本地开发服务或重新打包，此页面就会自动渲染精美的实时数据面板！
      </div>
    </div>
  </div>
</template>

<style scoped>
.analytics-dashboard-container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 24px 32px 48px 32px;
  font-family: var(--font-sans);
}

.dashboard-header {
  margin-bottom: 28px;
  text-align: center;
}

.dashboard-title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 800;
  color: var(--text-primary, #e8eaf0);
  margin-bottom: 8px;
  background: linear-gradient(120deg, var(--text-primary, #e8eaf0) 30%, var(--hbu-blue, #1E56B0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title-icon {
  width: 32px;
  height: 32px;
  margin-right: 12px;
  stroke: var(--hbu-blue, #1E56B0);
  flex-shrink: 0;
}

.dashboard-subtitle {
  font-size: 15px;
  color: var(--text-secondary, #9aa0b8);
}

/* IFrame Wrapper */
.iframe-wrapper {
  position: relative;
  width: 100%;
  height: 800px;
  border-radius: var(--radius-lg, 20px);
  overflow: hidden;
  background: var(--bg-surface, #1a1d27);
  border: 1px solid var(--border-subtle, #2a2f45);
  box-shadow: var(--shadow-card, 0 4px 12px rgba(0, 0, 0, 0.3));
}

.analytics-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* Loading Overlay */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--bg-surface, #1a1d27);
  z-index: 10;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--border-subtle, #2a2f45);
  border-top-color: var(--hbu-blue, #1E56B0);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

.loading-text {
  font-size: 14px;
  color: var(--text-secondary, #9aa0b8);
  font-weight: 500;
}

/* Setup Guide Card */
.guide-card {
  background: var(--bg-surface, #1a1d27);
  border: 1px solid var(--border-subtle, #2a2f45);
  border-radius: var(--radius-lg, 20px);
  padding: 36px;
  max-width: 720px;
  margin: 32px auto 0 auto;
  box-shadow: var(--shadow-card, 0 4px 12px rgba(0, 0, 0, 0.3));
  transition: border-color 0.3s ease;
}

.guide-card:hover {
  border-color: var(--border-active, rgba(30, 86, 176, 0.4));
}

.guide-icon {
  font-size: 40px;
  text-align: center;
  margin-bottom: 16px;
}

.guide-title {
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  color: var(--text-primary, #e8eaf0);
  margin-bottom: 12px;
}

.guide-desc {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary, #9aa0b8);
  text-align: center;
  margin-bottom: 32px;
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 32px;
}

.step-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.step-num {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--hbu-blue-muted, rgba(30, 86, 176, 0.15));
  border: 1px solid var(--hbu-blue, #1E56B0);
  color: var(--hbu-blue-light, #2E6FD8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
}

.step-text {
  font-size: 14px;
  color: var(--text-primary, #e8eaf0);
  line-height: 1.5;
}

.step-text a {
  color: var(--hbu-blue-light, #2E6FD8);
  text-decoration: none;
  font-weight: 600;
}

.step-text a:hover {
  text-decoration: underline;
}

.code-block {
  margin-top: 8px;
  padding: 8px 12px;
  background: var(--bg-elevated, #22263a);
  border: 1px solid var(--border-subtle, #2a2f45);
  border-radius: var(--radius-sm, 6px);
  color: #fff;
  font-family: var(--font-mono, monospace);
  font-size: 13px;
}

.guide-tip {
  font-size: 13px;
  color: var(--text-secondary, #9aa0b8);
  background: rgba(30, 86, 176, 0.08);
  border-left: 3px solid var(--hbu-blue, #1E56B0);
  padding: 12px 16px;
  border-radius: 0 var(--radius-sm, 6px) var(--radius-sm, 6px) 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .analytics-dashboard-container {
    padding: 16px 16px 32px 16px;
  }
  .iframe-wrapper {
    height: 600px;
  }
  .guide-card {
    padding: 24px;
  }
}
</style>
