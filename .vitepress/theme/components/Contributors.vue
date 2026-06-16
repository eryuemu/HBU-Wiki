<script setup>
import { ref, onMounted } from 'vue'

// 静态备用贡献者列表 (在 API 请求失败或限流时展示)
const fallbackContributors = [
  {
    login: 'eryuemu',
    avatar_url: 'https://github.com/eryuemu.png',
    html_url: 'https://github.com/eryuemu',
    contributions: 1
  }
]

const contributors = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('https://api.github.com/repos/eryuemu/HBU-Wiki/contributors')
    if (!res.ok) throw new Error('API request failed')
    const data = await res.json()
    if (Array.isArray(data) && data.length > 0) {
      contributors.value = data
    } else {
      contributors.value = fallbackContributors
    }
  } catch (err) {
    console.warn('Failed to fetch contributors, using fallback data:', err)
    contributors.value = fallbackContributors
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="hbu-contributors-container">
    <div class="hbu-section-title-wrapper">
      <h2 class="hbu-section-title">✨ 鸣谢与贡献者</h2>
      <p class="hbu-section-subtitle">感谢所有为 HBU Wiki 做出贡献的开发者与内容创作者</p>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading && contributors.length === 0" class="hbu-contributors-loading">
      <div class="hbu-spinner"></div>
      <span>正在加载贡献者列表...</span>
    </div>

    <!-- 贡献者头像列表 -->
    <div v-else class="hbu-contributors-list-wrapper">
      <div class="hbu-contributors-list">
        <a
          v-for="user in contributors"
          :key="user.login"
          :href="user.html_url"
          target="_blank"
          rel="noopener noreferrer"
          class="hbu-contributor-card"
          :title="`${user.login} (${user.contributions} 次贡献)`"
        >
          <div class="hbu-avatar-wrapper">
            <img :src="user.avatar_url" :alt="user.login" class="hbu-contributor-avatar" loading="lazy" />
            <div class="hbu-avatar-glow"></div>
          </div>
          <span class="hbu-contributor-name">{{ user.login }}</span>
          <span class="hbu-contributor-badge">{{ user.contributions }} 贡献</span>
        </a>
      </div>

      <div class="hbu-cta-wrapper">
        <a
          href="https://github.com/eryuemu/HBU-Wiki"
          target="_blank"
          rel="noopener noreferrer"
          class="hbu-cta-btn"
        >
          <span>加入我们，参与贡献</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hbu-contributors-container {
  max-width: 1152px;
  margin: 64px auto 96px auto;
  padding: 0 24px;
}

.hbu-section-title-wrapper {
  margin-bottom: 40px;
  text-align: center;
}

.hbu-section-title {
  font-size: 26px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  letter-spacing: -0.02em;
  margin-bottom: 6px;
  background: linear-gradient(135deg, var(--vp-c-text-1) 30%, var(--vp-c-brand-1) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.hbu-section-subtitle {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.hbu-contributors-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 120px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.hbu-spinner {
  width: 28px;
  height: 28px;
  border: 2px solid var(--vp-c-border);
  border-top-color: var(--vp-c-brand-1);
  border-radius: 50%;
  animation: hbu-spin 0.8s linear infinite;
}

@keyframes hbu-spin {
  to { transform: rotate(360deg); }
}

.hbu-contributors-list-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.hbu-contributors-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  max-width: 800px;
}

.hbu-contributor-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none !important;
  color: inherit !important;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  width: 100px;
}

.hbu-avatar-wrapper {
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-bottom: 10px;
  padding: 2px;
  background: linear-gradient(135deg, var(--vp-c-border), var(--vp-c-border));
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.hbu-contributor-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--vp-c-bg);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.hbu-avatar-glow {
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--vp-c-brand-1) 0%, transparent 70%);
  opacity: 0;
  z-index: -1;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  filter: blur(8px);
}

.hbu-contributor-name {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  max-width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  margin-bottom: 2px;
  transition: color 0.3s ease;
}

.hbu-contributor-badge {
  font-size: 11px;
  padding: 2px 6px;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-2);
  border-radius: 99px;
  font-weight: 500;
  transform: scale(0.9);
  transition: all 0.3s ease;
}

/* 悬停动效 */
.hbu-contributor-card:hover {
  transform: translateY(-6px);
}

.hbu-contributor-card:hover .hbu-avatar-wrapper {
  background: linear-gradient(135deg, var(--vp-c-brand-1) 0%, var(--vp-c-brand-2) 100%);
  box-shadow: 0 8px 20px rgba(30, 86, 176, 0.25);
}

.hbu-contributor-card:hover .hbu-avatar-glow {
  opacity: 0.65;
  transform: scale(1.25);
}

.hbu-contributor-card:hover .hbu-contributor-avatar {
  transform: scale(1.05);
}

.hbu-contributor-card:hover .hbu-contributor-name {
  color: var(--vp-c-brand-1);
}

.hbu-contributor-card:hover .hbu-contributor-badge {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: rgba(30, 86, 176, 0.2);
}

/* 呼吁贡献 CTA 按钮 */
.hbu-cta-wrapper {
  margin-top: 12px;
}

.hbu-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 32px;
  border-radius: 99px;
  background: linear-gradient(135deg, var(--vp-c-brand-1) 0%, var(--vp-c-brand-2) 100%);
  color: white !important;
  font-weight: 600;
  font-size: 15px;
  text-decoration: none !important;
  box-shadow: 0 4px 16px rgba(30, 86, 176, 0.25);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.hbu-cta-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.25),
    transparent
  );
  transition: all 0.6s ease;
}

.hbu-cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(30, 86, 176, 0.4);
}

.hbu-cta-btn:hover::before {
  left: 100%;
}

.hbu-cta-btn svg {
  transition: transform 0.3s ease;
}

.hbu-cta-btn:hover svg {
  transform: translateX(4px);
}

@media (max-width: 540px) {
  .hbu-contributors-list {
    gap: 16px;
  }
  .hbu-contributor-card {
    width: 80px;
  }
  .hbu-avatar-wrapper {
    width: 52px;
    height: 52px;
  }
  .hbu-cta-btn {
    padding: 10px 24px;
    font-size: 14px;
  }
  .hbu-section-title {
    font-size: 22px;
  }
}
</style>
