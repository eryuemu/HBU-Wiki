<template>
  <span class="major-icon-wrap" :style="{ color: color || 'var(--vp-c-text-2)' }">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="size || 18"
      :height="size || 18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="major-svg"
      v-html="svgPath"
    ></svg>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, default: '' },
  college: { type: String, default: '' },
  category: { type: String, default: '' },
  color: { type: String, default: '' },
  size: { type: Number, default: 18 }
})

const svgPath = computed(() => {
  const str = `${props.name} ${props.college} ${props.category}`.toLowerCase()

  // 计算机 / 软件 / AI / 信安 / 数析
  if (/计算机|软件|人工智能|数据科学|信息安全|网络空间/.test(str)) {
    return `<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>`
  }
  // 电气 / 自动化 / 电子 / 通信
  if (/电气|自动化|电子|通信|智能医学/.test(str)) {
    return `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`
  }
  // 医学 / 临床 / 口腔 / 护理 / 预防 / 药学 / 中医
  if (/医|临床|口腔|护理|预防|卫生|药|中医|康复/.test(str)) {
    return `<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><line x1="12" y1="8" x2="12" y2="14"/><line x1="9" y1="11" x2="15" y2="11"/>`
  }
  // 经管 / 金融 / 经济 / 会计 / 财务 / 贸易
  if (/经|金融|经济|会计|财务|保险|贸易|管理|物流/.test(str)) {
    return `<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>`
  }
  // 法学
  if (/法/.test(str)) {
    return `<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h18"/>`
  }
  // 文学 / 中国语言 / 新闻 / 广告 / 传媒
  if (/文|汉字|中文|新闻|广告|编辑|出版|传媒/.test(str)) {
    return `<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6.5 6H20"/>`
  }
  // 外国语 / 英语 / 日语 / 俄语 / 法语 / 葡萄牙语
  if (/语|外|英语|日语|俄语|法语|葡萄牙语/.test(str)) {
    return `<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`
  }
  // 物理 / 光电 / 新能源
  if (/物|物理|光电|新能源|器件/.test(str)) {
    return `<ellipse cx="12" cy="12" rx="9" ry="3" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3" transform="rotate(90 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3" transform="rotate(150 12 12)"/>`
  }
  // 化学 / 材料
  if (/化|化学|材料/.test(str)) {
    return `<path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55A1 1 0 0 0 5.608 22h12.784a1 1 0 0 0 .888-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><line x1="8.5" y1="2" x2="15.5" y2="2"/><line x1="7" y1="16" x2="17" y2="16"/>`
  }
  // 生物 / 生态
  if (/生|生物|环境|生态/.test(str)) {
    return `<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.1 2 7 0 6-4.5 11-10 11Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>`
  }
  // 建筑 / 土木 / 智能建造
  if (/建|土木|建筑|建造/.test(str)) {
    return `<rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>`
  }
  // 教育 / 心理学 / 学前教育
  if (/教|育|心理|学前/.test(str)) {
    return `<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>`
  }
  // 质监 / 测控 / 机械 / 仪器
  if (/质|测控|机械|仪器|制造|安全工程/.test(str)) {
    return `<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>`
  }
  // 历史 / 哲学 / 社科
  if (/史|哲|社|社会/.test(str)) {
    return `<path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>`
  }
  // 数学
  if (/数|算/.test(str)) {
    return `<path d="M4 19L19 4"/><path d="M4 4l15 15"/><path d="M12 3v18"/><path d="M3 12h18"/>`
  }

  // 默认图标: Layers
  return `<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>`
})
</script>

<style scoped>
.major-icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  vertical-align: middle;
}
.major-svg {
  display: block;
}
</style>
