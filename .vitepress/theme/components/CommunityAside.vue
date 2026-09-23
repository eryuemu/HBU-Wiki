<script setup>
import { ref } from 'vue'

const props = defineProps({
  asideOnly: { type: Boolean, default: false },
  floatingOnly: { type: Boolean, default: false }
})

const currentTab = ref('reader') // 'reader' | 'editor'
const showMobileModal = ref(false)

const READER_LINK = 'https://qun.qq.com/universal-share/share?ac=1&authKey=t3o7wT8D4G9XuA50RJ%2BqLzknO9lFZhb73rpMswrq%2BhkjO5wfPBemg4PqJVG99%2BG0&busi_data=eyJncm91cENvZGUiOiIxMTI2NDA0NDgzIiwidG9rZW4iOiJBeksrZnh3Zkw3STZTRHZKTTNaZzJROUFmVW1jeXpkN21odXY0aW1mMWhxbWtnOHQxN3psNnA4bUozaVNSV1Y5IiwidWluIjoiMzQxOTE0NDg0MiJ9&data=HSyeTU6RPB8ppy95JU1qXTNNd7NbScFAtqhR6r0CIOrCrKdwkbZt00sF2e9ZvI4CAYktIDzT2OtNYZtfzVYwtw&svctype=4&tempid=h5_group_info'

const EDITOR_LINK = 'https://qun.qq.com/universal-share/share?ac=1&authKey=lcEI8UhEM1a%2BR06rVXgBcBIt1ySfJsbC1ZaG2lkioyj5B20oYKsbD17e2eKhbku8&busi_data=eyJncm91cENvZGUiOiIxMDU1ODI4NzgxIiwidG9rZW4iOiJWRWc0bVJBQ0VXaW9tNG5JTnJQNlNkMERUWDgwZlRmS0Judkd5cTlSb20zOUlvWWlaNzBWNlhIOHhqZ1VxZ2x6IiwidWluIjoiMzQxOTE0NDg0MiJ9&data=zc72jJPO929XPR00M1vivCB7toz_ZVTeRGrIuiQpziGrpR4H29kftFbZNrBcG2ck0Bx6wLhc5zaCpAMDi9Xp_g&svctype=4&tempid=h5_group_info'
</script>

<template>
  <!-- 桌面端侧边栏卡片（位于本页目录下方） -->
  <div v-if="!props.floatingOnly" class="community-aside-card">
    <div class="card-title-bar">
      <span class="card-title">联系我们</span>
    </div>

    <div class="group-list">
      <a
        :href="READER_LINK"
        target="_blank"
        rel="noopener"
        class="group-row"
        title="点击一键加入读者群"
      >
        <div class="group-info">
          <div class="group-name">聊天交流 QQ 群</div>
          <div class="group-number">1126404483</div>
        </div>
        <span class="group-arrow">↗</span>
      </a>

      <a
        :href="EDITOR_LINK"
        target="_blank"
        rel="noopener"
        class="group-row"
        title="点击一键加入编辑群"
      >
        <div class="group-info">
          <div class="group-name">编辑贡献 QQ 群</div>
          <div class="group-number">1055828781</div>
        </div>
        <span class="group-arrow">↗</span>
      </a>

      <a
        href="https://github.com/eryuemu/HBU-Wiki"
        target="_blank"
        rel="noopener"
        class="group-row github-row"
        title="前往 GitHub 仓库"
      >
        <div class="group-info">
          <div class="group-name">GitHub 仓库</div>
        </div>
        <span class="group-arrow">↗</span>
      </a>
    </div>

    <!-- 二维码切换展示区 -->
    <div class="qr-container">
      <div class="qr-tabs">
        <button
          type="button"
          :class="['tab-btn', { active: currentTab === 'reader' }]"
          @click="currentTab = 'reader'"
        >
          读者交流群
        </button>
        <button
          type="button"
          :class="['tab-btn', { active: currentTab === 'editor' }]"
          @click="currentTab = 'editor'"
        >
          编辑协作群
        </button>
      </div>

      <a
        :href="currentTab === 'reader' ? READER_LINK : EDITOR_LINK"
        target="_blank"
        rel="noopener"
        class="qr-link-box"
        title="点击一键加群，手机扫码加入"
      >
        <img
          :src="currentTab === 'reader' ? '/qrcode/reader-group-card.jpg' : '/qrcode/editor-group-card.jpg'"
          :alt="currentTab === 'reader' ? '读者交流群二维码' : '编辑协作群二维码'"
          class="qr-code-img"
        />
        <div class="qr-caption">点击一键加入 · 扫码入群</div>
      </a>
    </div>
  </div>

  <!-- 移动端悬浮加群触发按钮（仅在小于 1280px 屏幕展示） -->
  <div v-if="!props.asideOnly" class="mobile-community-trigger">
    <button
      class="mobile-float-btn"
      type="button"
      @click="showMobileModal = true"
      aria-label="加入社群交流"
    >
      <svg class="float-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      <span>加入群聊</span>
    </button>
  </div>

  <!-- 移动端弹窗 -->
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="showMobileModal"
        class="community-modal-overlay"
        @click.self="showMobileModal = false"
      >
        <div class="community-modal-card">
          <div class="modal-top">
            <h3 class="modal-heading">联系我们 & 加入群聊</h3>
            <button
              class="modal-close"
              type="button"
              @click="showMobileModal = false"
              aria-label="关闭弹窗"
            >
              ✕
            </button>
          </div>

          <p class="modal-desc">遇到内容错漏、想补充经验或咨询交流，欢迎随时加入：</p>

          <div class="modal-links">
            <a :href="READER_LINK" target="_blank" rel="noopener" class="modal-link-btn primary">
              <span class="btn-icon">💬</span>
              <div class="btn-text">
                <span class="btn-title">一键加入【读者交流群】</span>
                <span class="btn-sub">QQ 群号：1126404483</span>
              </div>
              <span class="btn-arrow">→</span>
            </a>

            <a :href="EDITOR_LINK" target="_blank" rel="noopener" class="modal-link-btn">
              <span class="btn-icon">✍️</span>
              <div class="btn-text">
                <span class="btn-title">一键加入【编辑协作群】</span>
                <span class="btn-sub">QQ 群号：1055828781</span>
              </div>
              <span class="btn-arrow">→</span>
            </a>

            <a href="https://github.com/eryuemu/HBU-Wiki" target="_blank" rel="noopener" class="modal-link-btn">
              <span class="btn-icon">🐙</span>
              <div class="btn-text">
                <span class="btn-title">访问 GitHub 仓库</span>
                <span class="btn-sub">开源协作与 Star 支持</span>
              </div>
              <span class="btn-arrow">→</span>
            </a>
          </div>

          <div class="modal-qr-preview">
            <img
              :src="currentTab === 'reader' ? '/qrcode/reader-group-card.jpg' : '/qrcode/editor-group-card.jpg'"
              alt="群二维码"
              class="modal-qr-img"
            />
            <div class="modal-qr-switch">
              <button
                :class="{ active: currentTab === 'reader' }"
                @click="currentTab = 'reader'"
              >
                读者群码
              </button>
              <button
                :class="{ active: currentTab === 'editor' }"
                @click="currentTab = 'editor'"
              >
                编辑群码
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ──────────────── 桌面端侧边栏卡片 ──────────────── */
.community-aside-card {
  margin-top: 24px;
  padding: 16px 14px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  transition: border-color 0.25s, box-shadow 0.25s;
}

.community-aside-card:hover {
  border-color: var(--vp-c-brand-soft);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.card-title-bar {
  margin-bottom: 12px;
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
  gap: 6px;
}

.card-title::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 14px;
  background-color: var(--vp-c-brand-1);
  border-radius: 2px;
}

.group-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}

.group-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  text-decoration: none !important;
  color: var(--vp-c-text-1) !important;
  transition: all 0.2s ease;
}

.group-row:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-mute);
  transform: translateY(-1px);
}

.group-name {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.3;
}

.group-number {
  font-size: 11px;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-2);
}

.group-arrow {
  font-size: 12px;
  color: var(--vp-c-text-3);
  transition: transform 0.2s, color 0.2s;
}

.group-row:hover .group-arrow {
  color: var(--vp-c-brand-1);
  transform: translate(2px, -2px);
}

/* 二维码区域 */
.qr-container {
  padding-top: 10px;
  border-top: 1px dashed var(--vp-c-divider);
}

.qr-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
  background-color: var(--vp-c-bg-mute);
  padding: 2px;
  border-radius: 6px;
}

.tab-btn {
  flex: 1;
  padding: 4px 0;
  font-size: 11px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn.active {
  background-color: var(--vp-c-bg);
  color: var(--vp-c-brand-1);
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.qr-link-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none !important;
  padding: 4px;
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  transition: border-color 0.2s;
}

.qr-link-box:hover {
  border-color: var(--vp-c-brand-1);
}

.qr-code-img {
  width: 100%;
  max-width: 150px;
  height: auto;
  border-radius: 6px;
  display: block;
}

.qr-caption {
  margin-top: 6px;
  font-size: 11px;
  color: var(--vp-c-text-3);
  text-align: center;
}

.qr-link-box:hover .qr-caption {
  color: var(--vp-c-brand-1);
}

/* ──────────────── 移动端悬浮按钮与弹窗 ──────────────── */
.mobile-community-trigger {
  display: none;
}

@media (max-width: 1279px) {
  .mobile-community-trigger {
    display: block;
    position: fixed;
    right: 18px;
    bottom: 24px;
    z-index: 80;
  }

  .mobile-float-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 9px 14px;
    border-radius: 24px;
    background: var(--vp-c-brand-1);
    color: #ffffff;
    font-size: 13px;
    font-weight: 600;
    border: none;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .mobile-float-btn:active {
    transform: scale(0.96);
  }
}

.community-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.community-modal-card {
  width: 100%;
  max-width: 360px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
  max-height: 90vh;
  overflow-y: auto;
}

.modal-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.modal-heading {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.modal-close {
  background: transparent;
  border: none;
  font-size: 18px;
  color: var(--vp-c-text-3);
  cursor: pointer;
  padding: 4px;
}

.modal-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin: 0 0 16px 0;
}

.modal-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.modal-link-btn {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
  text-decoration: none !important;
  color: var(--vp-c-text-1) !important;
  transition: all 0.2s;
}

.modal-link-btn.primary {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.btn-icon {
  font-size: 20px;
  margin-right: 10px;
}

.btn-text {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.btn-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.btn-sub {
  font-size: 11px;
  color: var(--vp-c-text-2);
}

.btn-arrow {
  color: var(--vp-c-text-3);
  font-size: 14px;
}

.modal-qr-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12px;
  border-top: 1px dashed var(--vp-c-divider);
}

.modal-qr-img {
  width: 140px;
  height: auto;
  border-radius: 8px;
  margin-bottom: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.modal-qr-switch {
  display: flex;
  gap: 8px;
}

.modal-qr-switch button {
  padding: 4px 10px;
  font-size: 12px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border-radius: 4px;
  cursor: pointer;
}

.modal-qr-switch button.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
