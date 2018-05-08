import Vue, { AsyncComponent } from 'vue'
import Router, { RouteConfig, Route, NavigationGuard } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

// 路由容器
const home: AsyncComponent = ():any => import(/* webpackChunkName: "home" */ './../pages/home.vue')

// 首页展示数据
const statistical: AsyncComponent = ():any => import(/* webpackChunkName: "statistical" */ './../pages/statistical/index.vue')

// 查看文章列表
const viewAriicle: AsyncComponent = ():any => import(/* webpackChunkName: "viewAriicle" */ './../pages/viewArticle/index.vue')

// 编辑文章
const editorAricle: AsyncComponent = ():any => import(/* webpackChunkName: "editorAricle" */ './../pages/editorArticle/index.vue')

// 标签管理
const tagsControl: AsyncComponent = ():any => import(/* webpackChunkName: "tagsControl" */ './../pages/tagsControl/index.vue')

// 留言情
const leaveMessage: AsyncComponent = ():any => import(/* webpackChunkName: "leaveMessage" */ './../pages/leaveMessage/index.vue')

// 全局设置
const global: AsyncComponent = ():any => import(/* webpackChunkName: "global" */ './../pages/global/index.vue')

// 评论控制
const comments: AsyncComponent = ():any => import(/* webpackChunkName: "comments" */ './../pages/comments/index.vue')

const router = new Router({
  routes: [
    {path: '/', redirect: '/statistical'},
    {
      path: '/',
      component: home,
      name: '数据统计',
      meta: {firstRoute: true},
      children: [
        {path: '/statistical', component: statistical, name: '我的面板', meta: {page: '数据'}}
      ]
    },
    {
      path: '/',
      component: home,
      name: '文章管理',
      meta: {firstRoute: false},
      children: [
        {path: '/viewAriicle', component: viewAriicle, name: '文章列表', meta: {page: '列表'}},
        {path: '/editorAricle', component: editorAricle, name: '文章列表', meta: {page: '编辑'}}
      ]
    },
    {
      path: '/',
      component: home,
      name: '标签管理',
      meta: {firstRoute: true},
      children: [
        {path: '/tagsControl', component: tagsControl, name: '标签管理', meta: {page: '标签'}},
      ]
    },
    {
      path: '/',
      component: home,
      name: '留言墙',
      meta: {firstRoute: true},
      children: [
        {path: '/leaveMessage', component: leaveMessage, name: '留言情', meta: {page: '留言'}},
      ]
    },
    {
      path: '/',
      component: home,
      name: '全局设置',
      meta: {firstRoute: true},
      children: [
        {path: '/global', component: global, name: '全局设置', meta: {page: '设置'}},
      ]
    },
    {
      path: '/',
      component: home,
      name: '评论控制',
      meta: {firstRoute: true},
      children: [
        {path: '/comments', component: comments, name: '评论控制', meta: {page: '设置'}},
      ]
    }
  ]
})

router.beforeEach((to: Route, form: Route, next: any) => {
  console.log(to)
  NProgress.start()
  next()
})

router.afterEach((to: Route, form: Route) => {
  NProgress.done()
})

export default router
