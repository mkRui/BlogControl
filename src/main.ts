// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './layouts/App.vue'
import router from './router'
import './assets/scss/index.scss'
import ElementUI from 'element-ui'
import './assets/scss/element-variables.scss'
import store from './store/index'
import { format } from './filter/index'

// 以下都是simplemde的配置选项
import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'
import 'github-markdown-css'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
(window as any).hljs = hljs

Vue.use(VueSimplemde)

Vue.filter('format', format)

Vue.use(ElementUI)

Vue.config.productionTip = false

const app: Vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

export default app
