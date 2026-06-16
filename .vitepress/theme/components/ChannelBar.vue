<script setup>
const channels = [
  {
    name: '河北大学官网',
    desc: '河北大学主页入口，提供学校新闻动态、通知公告及基本概况。',
    url: 'https://www.hbu.edu.cn',
    iconColor: '#1E56B0',
    iconText: 'HBU'
  },
  {
    name: '教务管理系统',
    desc: '学生选课、查询成绩、选修网课以及进行学期教学评教的官方门户。',
    url: 'http://jwgl.hbu.cn',
    iconColor: '#2a9d8f',
    iconText: '教务'
  },
  {
    name: '图书馆官网',
    desc: '图书检索、电子期刊数据库、馆内空间预约及海量学术文献资源。',
    url: 'http://lib.hbu.cn',
    iconColor: '#8338ec',
    iconText: '图书'
  },
  {
    name: '校园网服务',
    desc: '校内无线/有线网络自助登录、宽带充值、套餐变更及故障报修。',
    url: 'http://10.0.0.1',
    iconColor: '#eb5e28',
    iconText: '网络'
  }
]
</script>

<template>
  <div class="hbu-channelbar-container hbu-reveal">
    <div class="hbu-section-title-wrapper">
      <h2 class="hbu-section-title">🔗 常用通道 & 友情链接</h2>
      <p class="hbu-section-subtitle">一键直达河北大学常用官方服务平台</p>
    </div>
    
    <div class="hbu-channel-grid">
      <a 
        v-for="item in channels" 
        :key="item.name" 
        :href="item.url" 
        target="_blank" 
        rel="noopener noreferrer"
        class="hbu-channel-card"
      >
        <div class="hbu-channel-icon-wrapper" :style="{ backgroundColor: item.iconColor + '15', color: item.iconColor }">
          <span class="hbu-channel-icon-text">{{ item.iconText }}</span>
        </div>
        <div class="hbu-channel-content">
          <h3 class="hbu-channel-name">
            {{ item.name }}
            <svg class="hbu-external-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </h3>
          <p class="hbu-channel-desc">{{ item.desc }}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.hbu-channelbar-container {
  max-width: 1152px;
  margin: 64px auto 48px auto;
  padding: 0 24px;
}

.hbu-section-title-wrapper {
  margin-bottom: 32px;
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

.hbu-channel-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

@media (max-width: 960px) {
  .hbu-channel-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 540px) {
  .hbu-channel-grid {
    grid-template-columns: 1fr;
  }
  .hbu-section-title {
    font-size: 22px;
  }
}

.hbu-channel-card {
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
  text-decoration: none !important;
  color: inherit !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.hbu-channel-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.hbu-channel-card:hover {
  transform: translateY(-5px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 12px 30px rgba(30, 86, 176, 0.08);
}

.dark .hbu-channel-card:hover {
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.4);
  background: rgba(255, 255, 255, 0.02);
}

.hbu-channel-card:hover::before {
  opacity: 1;
}

.hbu-channel-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  font-weight: 700;
  font-size: 14px;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.hbu-channel-card:hover .hbu-channel-icon-wrapper {
  transform: scale(1.1) rotate(3deg);
}

.hbu-channel-icon-text {
  letter-spacing: -0.01em;
}

.hbu-channel-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.hbu-channel-name {
  font-size: 17px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.3s ease;
}

.hbu-channel-card:hover .hbu-channel-name {
  color: var(--vp-c-brand-1);
}

.hbu-external-icon {
  opacity: 0;
  transform: translate(-3px, 3px);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  color: var(--vp-c-text-3);
}

.hbu-channel-card:hover .hbu-external-icon {
  opacity: 1;
  transform: translate(0, 0);
  color: var(--vp-c-brand-1);
}

.hbu-channel-desc {
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  margin: 0;
}
</style>
