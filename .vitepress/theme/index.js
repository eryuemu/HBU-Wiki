import DefaultTheme from 'vitepress/theme'
import Layout from './components/Layout.vue'
import TransferExplorer from './components/TransferExplorer.vue'
import GPAAnalyzer from './components/GPAAnalyzer.vue'
import PageView from './components/PageView.vue'
import AnalyticsDashboard from './components/AnalyticsDashboard.vue'
import CategoriesIndex from './components/CategoriesIndex.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router }) {
    // 注册全局组件，可在 markdown 中直接使用
    app.component('TransferExplorer', TransferExplorer)
    app.component('GPAAnalyzer', GPAAnalyzer)
    app.component('PageView', PageView)
    app.component('AnalyticsDashboard', AnalyticsDashboard)
    app.component('CategoriesIndex', CategoriesIndex)

    if (typeof window !== 'undefined' && router) {
      // 客户端路由跳转容灾：若因部署后 chunk hash 更新导致 SPA 路由意外命中 404，执行一次页面硬重载拉取最新 HTML
      const originalOnAfter = router.onAfterRouteChanged
      router.onAfterRouteChanged = (to) => {
        if (originalOnAfter) originalOnAfter(to)
        try {
          if (router.route && router.route.data && router.route.data.isNotFound && !to.includes('/404')) {
            const healKey = 'hbuwiki_heal_404_' + to
            if (!sessionStorage.getItem(healKey)) {
              sessionStorage.setItem(healKey, '1')
              window.location.href = to
            }
          }
        } catch (e) {}
      }
    }
  }
}
