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
  enhanceApp({ app }) {
    // 注册全局组件，可在 markdown 中直接使用
    app.component('TransferExplorer', TransferExplorer)
    app.component('GPAAnalyzer', GPAAnalyzer)
    app.component('PageView', PageView)
    app.component('AnalyticsDashboard', AnalyticsDashboard)
    app.component('CategoriesIndex', CategoriesIndex)
  }
}
