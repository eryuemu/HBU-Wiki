<script setup>
import { ref } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  label: { type: String, default: '复制' }
})

const state = ref('idle')
let timer = null

function flash(next) {
  state.value = next
  clearTimeout(timer)
  timer = setTimeout(() => { state.value = 'idle' }, 1600)
}

async function copy() {
  try {
    await navigator.clipboard.writeText(props.text)
    return flash('done')
  } catch (e) {
    // 手机 QQ 内置浏览器等环境没有 clipboard API
  }
  try {
    const ta = document.createElement('textarea')
    ta.value = props.text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.top = '-9999px'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    flash(ok ? 'done' : 'fail')
  } catch (e) {
    flash('fail')
  }
}
</script>

<template>
  <button
    class="copy-btn"
    :class="{ 'is-done': state === 'done', 'is-fail': state === 'fail' }"
    type="button"
    :title="'复制 ' + text"
    :aria-label="'复制 ' + text"
    @click="copy"
  >
    <svg
      class="copy-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <template v-if="state === 'done'">
        <path d="M20 6 9 17l-5-5" />
      </template>
      <template v-else>
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </template>
    </svg>
    <span class="copy-text">{{ state === 'done' ? '已复制' : state === 'fail' ? '长按复制' : label }}</span>
  </button>
</template>

<style scoped>
.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  padding: 2px 9px;
  font-size: var(--text-xs);
  line-height: 1.6;
  font-family: inherit;
  color: var(--text-secondary);
  background: var(--hbu-blue-muted);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}

.copy-btn:hover {
  color: var(--hbu-blue-light);
  border-color: var(--border-active);
}

.copy-btn.is-done {
  color: var(--hbu-success);
  background: var(--hbu-success-soft);
  border-color: var(--hbu-success);
}

.copy-btn.is-fail {
  color: var(--hbu-warning);
  background: var(--hbu-warning-soft);
  border-color: var(--hbu-warning);
}

.copy-icon {
  flex-shrink: 0;
}

.copy-text {
  white-space: nowrap;
}
</style>
