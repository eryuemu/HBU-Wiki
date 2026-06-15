<script setup>
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import { watch, nextTick, onMounted, onUnmounted } from 'vue'

const { Layout } = DefaultTheme
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
      // 路由变化后重新初始化首页特效
      setTimeout(initHeroEffect, 300)
    })
  }
)

let cleanupFns = []

function initHeroEffect() {
  cleanupFns.forEach(fn => fn())
  cleanupFns = []

  const wrapper = document.querySelector('.VPHero .image')
  const img = document.querySelector('.VPHero .VPImage')
  if (!wrapper || !img) return

  // 校徽图片尺寸约束：防止宽幅图片在移动端溢出
  function constrainHeroImage() {
    const w = window.innerWidth
    if (w < 640) {
      img.style.maxWidth = '192px'
      img.style.maxHeight = 'none'
    } else if (w < 960) {
      img.style.maxWidth = '256px'
      img.style.maxHeight = 'none'
    } else {
      img.style.maxWidth = '320px'
      img.style.maxHeight = 'none'
    }
    img.style.width = 'auto'
    img.style.height = 'auto'
  }
  constrainHeroImage()
  window.addEventListener('resize', constrainHeroImage)
  cleanupFns.push(() => window.removeEventListener('resize', constrainHeroImage))

  // 已初始化过就跳过
  if (wrapper.dataset.hero3d === 'true') return
  wrapper.dataset.hero3d = 'true'

  // 设置 3D 透视
  wrapper.style.transformStyle = 'preserve-3d'
  wrapper.style.transition = 'transform 0.1s ease-out'
  wrapper.style.willChange = 'transform'
  wrapper.style.display = 'inline-block'

  // 光影层
  let shine = wrapper.querySelector('.hero-shine')
  if (!shine) {
    shine = document.createElement('div')
    shine.className = 'hero-shine'
    shine.style.cssText = 'position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:2;opacity:0;transition:opacity .3s ease;'
    wrapper.appendChild(shine)
  }

  let rafId = null
  let targetX = 0, targetY = 0, currentX = 0, currentY = 0

  function animate() {
    currentX += (targetX - currentX) * 0.08
    currentY += (targetY - currentY) * 0.08
    wrapper.style.transform = `perspective(800px) rotateX(${currentX}deg) rotateY(${currentY}deg)`
    if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
      rafId = requestAnimationFrame(animate)
    } else {
      rafId = null
    }
  }

  function onMove(e) {
    const rect = wrapper.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2

    targetX = -((y - cy) / cy) * 12
    targetY = ((x - cx) / cx) * 12

    shine.style.background = `radial-gradient(circle at ${(x/rect.width)*100}% ${(y/rect.height)*100}%, rgba(255,255,255,0.2) 0%, transparent 60%)`
    shine.style.opacity = '1'

    if (!rafId) rafId = requestAnimationFrame(animate)
  }

  function onLeave() {
    targetX = 0
    targetY = 0
    shine.style.opacity = '0'
    if (!rafId) rafId = requestAnimationFrame(animate)
  }

  wrapper.addEventListener('mousemove', onMove)
  wrapper.addEventListener('mouseleave', onLeave)

  cleanupFns.push(() => {
    wrapper.removeEventListener('mousemove', onMove)
    wrapper.removeEventListener('mouseleave', onLeave)
    if (rafId) cancelAnimationFrame(rafId)
    wrapper.dataset.hero3d = ''
  })
}

onMounted(() => {
  // 延迟初始化，等 VitePress 渲染完
  setTimeout(initHeroEffect, 500)
})

onUnmounted(() => {
  cleanupFns.forEach(fn => fn())
  cleanupFns = []
})
</script>

<template>
  <Layout />
</template>
