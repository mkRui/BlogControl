import Vue, { AsyncComponent } from 'vue'
import Router, { RouteConfig, Route, NavigationGuard } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

const home: AsyncComponent = ():any => import(/* webpackChunkName: "home" */ './../pages/home.vue')

const router = new Router({
  routes: [
    {path: '/', redirect: '/index'},
    {
      path: '/index',
      component: home,
      name: 'index'
    }
  ]
})

router.beforeEach((to, form, next) => {
  NProgress.start()
  next()
})

router.afterEach((to, form) => {
  NProgress.done()
})

export default router
