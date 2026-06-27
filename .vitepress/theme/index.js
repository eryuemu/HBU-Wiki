import DefaultTheme from 'vitepress/theme'
import Layout from './components/Layout.vue'
import TransferExplorer from './components/TransferExplorer.vue'
import GPAAnalyzer from './components/GPAAnalyzer.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // 注册全局组件，可在 markdown 中直接使用
    app.component('TransferExplorer', TransferExplorer)
    app.component('GPAAnalyzer', GPAAnalyzer)
  }
}
