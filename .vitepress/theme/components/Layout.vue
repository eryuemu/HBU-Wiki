<script setup>
import DefaultTheme from 'vitepress/theme'
import { useRoute, useData } from 'vitepress'
import { watch, nextTick, onMounted, onUnmounted } from 'vue'
import GiscusComments from './GiscusComments.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()

const route = useRoute()

// 路由切换过渡
watch(
  () => route.path,
  () => {
    nextTick(() => {
      const content = document.querySelector('.VPContent')
      if (content) {
        content.classList.remove('page-transition-active')
        void content.offsetWidth
        content.classList.add('page-transition-active')
      }
      destroyScrollReveal()
      destroyHeroTilt()
      setTimeout(() => {
        constrainHeroImage()
        initHeroTilt()
        initScrollReveal()
      }, 300)
    })
  }
)

let cleanupFns = []

// ──────────────────────────────────────────────
// 校徽图片尺寸约束
// ──────────────────────────────────────────────
let heroStyle = null
function constrainHeroImage() {
  if (typeof window === 'undefined') return
  if (!heroStyle) {
    heroStyle = document.getElementById('hbu-hero-img-fix')
    if (!heroStyle) {
      heroStyle = document.createElement('style')
      heroStyle.id = 'hbu-hero-img-fix'
      document.head.appendChild(heroStyle)
    }
  }
  heroStyle.textContent = `
    .VPHero .image-src { max-width: 100% !important; max-height: none !important; width: auto !important; height: auto !important; }
    .VPHero .image-container { max-width: 100% !important; margin: 0 auto; }
  `
}

// ──────────────────────────────────────────────
// 校徽 3D 轻柔倾斜 + 动态投影
// ──────────────────────────────────────────────
let tiltCleanup = null

function initHeroTilt() {
  if (typeof window === 'undefined') return
  // 移动端不启用
  if (window.innerWidth < 960) return

  const wrapper = document.querySelector('.VPHero .image')
  const img = document.querySelector('.VPHero .VPImage')
  if (!wrapper || !img) return
  if (wrapper.dataset.tiltInit === 'true') return
  wrapper.dataset.tiltInit = 'true'

  // 移除 JS 初始化内联 filter，交由 CSS 处理
  img.style.removeProperty('filter')

  wrapper.style.perspective = '600px'
  wrapper.style.perspectiveOrigin = 'center center'

  let targetX = 0, targetY = 0
  let currentX = 0, currentY = 0
  let rafId = null
  const MAX_DEG = 4 // 最大倾斜角度，克制

  function lerp(a, b, t) {
    return a + (b - a) * t
  }

  function animate() {
    currentX = lerp(currentX, targetX, 0.06)
    currentY = lerp(currentY, targetY, 0.06)

    // 动态投影：随倾斜方向轻微偏移
    const shadowX = -currentY * 1.5
    const shadowY = currentX * 1.5

    img.style.transform = `translate(-50%, -50%) rotateX(${currentX}deg) rotateY(${currentY}deg)`
    // 通过 CSS 变量传递动态阴影坐标
    img.style.setProperty('--shadow-x', `${shadowX}px`)
    img.style.setProperty('--shadow-y', `${shadowY}px`)

    if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
      rafId = requestAnimationFrame(animate)
    } else {
      rafId = null
    }
  }

  function onMove(e) {
    const rect = wrapper.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5  // -0.5 ~ 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    targetY = x * MAX_DEG * 2
    targetX = -y * MAX_DEG * 2

    if (!rafId) rafId = requestAnimationFrame(animate)
  }

  function onLeave() {
    targetX = 0
    targetY = 0
    if (!rafId) rafId = requestAnimationFrame(animate)
  }

  wrapper.addEventListener('mousemove', onMove)
  wrapper.addEventListener('mouseleave', onLeave)

  // 进场时给一个微妙的呼吸动画，鼠标进入后暂停
  img.style.transition = 'transform 0.15s ease-out'

  tiltCleanup = () => {
    wrapper.removeEventListener('mousemove', onMove)
    wrapper.removeEventListener('mouseleave', onLeave)
    if (rafId) cancelAnimationFrame(rafId)
    wrapper.dataset.tiltInit = ''
  }
}

function destroyHeroTilt() {
  if (tiltCleanup) {
    tiltCleanup()
    tiltCleanup = null
  }
}

// ──────────────────────────────────────────────
// 滚动渐入
// ──────────────────────────────────────────────
let revealObserver = null

function initScrollReveal() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

  const vpFeatures = document.querySelector('.VPFeatures')
  if (vpFeatures) {
    vpFeatures.classList.add('hbu-reveal')
  }

  const allElements = document.querySelectorAll('.hbu-reveal')

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active')
        revealObserver.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  })

  allElements.forEach(el => {
    revealObserver.observe(el)
  })
}

function destroyScrollReveal() {
  if (revealObserver) {
    revealObserver.disconnect()
    revealObserver = null
  }
}

function onResize() {
  constrainHeroImage()
}

onMounted(() => {
  setTimeout(() => {
    constrainHeroImage()
    initHeroTilt()
  }, 400)
  window.addEventListener('resize', onResize)
  cleanupFns.push(() => window.removeEventListener('resize', onResize))
  nextTick(() => {
    setTimeout(initScrollReveal, 600)
  })
})

onUnmounted(() => {
  cleanupFns.forEach(fn => fn())
  cleanupFns = []
  destroyHeroTilt()
  destroyScrollReveal()
})
</script>

<template>
  <Layout>
    <!-- 文档页面底部：评论区 -->
    <template #doc-after>
      <GiscusComments />
    </template>
  </Layout>
</template>

<style>
/* 强制在亮色模式下将主页校徽和顶部 Logo 改为黑色 */
:root:not(.dark) .VPHero .VPImage,
:root:not(.dark) .VPHero .image-src {
  /* 默认阴影为 0px 4px，当 JS 接管时由变量控制 */
  filter: brightness(0) drop-shadow(var(--shadow-x, 0px) var(--shadow-y, 4px) 12px rgba(0, 0, 0, 0.15)) !important;
}

.dark .VPHero .VPImage,
.dark .VPHero .image-src {
  filter: drop-shadow(var(--shadow-x, 0px) var(--shadow-y, 4px) 12px rgba(0, 0, 0, 0.3)) !important;
}

:root:not(.dark) .VPNavBarTitle .logo {
  filter: brightness(0) !important;
}
</style>
