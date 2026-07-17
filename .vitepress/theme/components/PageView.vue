<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const sitePv = ref(0)
const siteUv = ref(0)
const pagePv = ref(0)
const loading = ref(true)

const VERC_COOKIE_PREFIX = 'vercount_uv_'
const API_URL = 'https://events.vercount.one/api/v2/log'

function getHostName() {
  if (typeof window === 'undefined') return 'unknown-host'
  return window.location.host || 'unknown-host'
}

function isLocalhost() {
  if (typeof window === 'undefined') return false
  const hostname = window.location.hostname
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.') || hostname.startsWith('10.')
}

function getCookieName() {
  const host = getHostName().replace(/[^a-zA-Z0-9_-]/g, '_')
  return `${VERC_COOKIE_PREFIX}${host}`
}

function getCookie(name) {
  if (typeof window === 'undefined') return null
  const cookie = document.cookie.split('; ').find(row => row.startsWith(`${name}=`))
  return cookie ? cookie.substring(name.length + 1) : null
}

function setCookie(name, value) {
  if (typeof window === 'undefined') return
  document.cookie = `${name}=${value}; path=/; max-age=31536000; samesite=lax`
}

async function fetchStats() {
  if (typeof window === 'undefined') return
  
  if (isLocalhost()) {
    // 本地开发环境展示模拟数据，避免拉取/污染全球 localhost 统计数据
    sitePv.value = 8888
    pagePv.value = 66
    siteUv.value = 666
    loading.value = false
    return
  }
  
  loading.value = true
  
  const cookieName = getCookieName()
  const hasVisited = getCookie(cookieName) === '1'
  const isNewUv = !hasVisited
  
  if (isNewUv) {
    setCookie(cookieName, '1')
  }
  
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: window.location.href,
        isNewUv: isNewUv
      })
    })
    
    if (res.ok) {
      const json = await res.json()
      if (json && json.status === 'success' && json.data) {
        sitePv.value = Number(json.data.site_pv || 0)
        pagePv.value = Number(json.data.page_pv || 0)
        siteUv.value = Number(json.data.site_uv || 0)
      } else if (json) {
        sitePv.value = Number(json.site_pv || 0)
        pagePv.value = Number(json.page_pv || 0)
        siteUv.value = Number(json.site_uv || 0)
      }
    }
  } catch (err) {
    console.error('Failed to fetch stats:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchStats()
})

watch(() => route.path, () => {
  // 延迟一小会儿执行，确保路由和 window.location.href 已更新
  setTimeout(() => {
    fetchStats()
  }, 350)
})
</script>

<template>
  <div class="page-view-wrapper">
    <div class="page-view-stats" v-if="!loading || pagePv > 0">
      <div class="stat-item" title="当前页面阅读量">
        <svg class="stat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        <span class="stat-label">本文阅读量</span>
        <span class="stat-value">{{ pagePv }}</span>
      </div>
      
      <div class="stat-divider"></div>
      
      <div class="stat-item" title="全站总点击量">
        <svg class="stat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
        <span class="stat-label">全站总 PV</span>
        <span class="stat-value">{{ sitePv }}</span>
      </div>

      <div class="stat-divider"></div>
      
      <div class="stat-item" title="全站独立访客数">
        <svg class="stat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        <span class="stat-label">全站 UV</span>
        <span class="stat-value">{{ siteUv }}</span>
      </div>
    </div>
    
    <div class="page-view-stats-skeleton" v-else>
      <div class="skeleton-item" style="width: 100px;"></div>
      <div class="skeleton-divider"></div>
      <div class="skeleton-item" style="width: 100px;"></div>
      <div class="skeleton-divider"></div>
      <div class="skeleton-item" style="width: 100px;"></div>
    </div>
  </div>
</template>

<style scoped>
.page-view-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 12px 0 28px 0;
}

.page-view-stats {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  padding: 8px 18px;
  border-radius: var(--radius-md, 12px);
  background: var(--bg-surface, rgba(26, 29, 39, 0.75));
  border: 1px solid var(--border-subtle, #2a2f45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  font-family: var(--font-sans);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-view-stats:hover {
  border-color: var(--border-active, rgba(30, 86, 176, 0.5));
  box-shadow: var(--shadow-hover, 0 8px 32px rgba(30, 86, 176, 0.15));
  transform: translateY(-1px);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary, #9aa0b8);
  font-size: var(--text-xs, 12px);
}

.stat-icon {
  width: 14px;
  height: 14px;
  color: var(--hbu-blue, #1E56B0);
  transition: transform 0.3s ease;
}

.stat-item:hover .stat-icon {
  transform: scale(1.2);
}

.stat-label {
  font-weight: 500;
  font-size: 13px;
}

.stat-value {
  font-family: var(--font-mono, monospace);
  font-weight: 700;
  color: var(--text-primary, #e8eaf0);
  background: var(--hbu-blue-muted, rgba(30, 86, 176, 0.15));
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
  border: 1px solid rgba(30, 86, 176, 0.1);
}

.stat-divider {
  width: 1px;
  height: 14px;
  background: var(--border-subtle, #2a2f45);
}

/* 骨架屏 Skeleton Loading */
.page-view-stats-skeleton {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 8px 18px;
  border-radius: var(--radius-md, 12px);
  background: var(--bg-surface, rgba(26, 29, 39, 0.5));
  border: 1px solid var(--border-subtle, #2a2f45);
}

.skeleton-item {
  height: 18px;
  background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 37%, rgba(255,255,255,0.03) 63%);
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
  border-radius: 4px;
}

.skeleton-divider {
  width: 1px;
  height: 14px;
  background: var(--border-subtle, #2a2f45);
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

@media (max-width: 576px) {
  .page-view-stats {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
  .stat-divider {
    display: none;
  }
}
</style>
