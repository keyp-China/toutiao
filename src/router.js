import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/'
import Main from './views/home/main'
import Login from './views/login'

// 在使用ElementUi时点击同一个路由，页面报错解决方法
const originalPush = Router.prototype.push
Router.prototype.push = function (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '*',
      component: () => import('./views/404')
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '',
          component: Main // 首页
        },
        {
          path: 'comment', // 评论列表
          component: () => import('./views/comment')
        },
        {
          path: 'material', // 素材管理
          component: () => import('./views/material')
        },
        {
          path: 'articles', // 内容列表
          component: () => import('./views/articles')
        },
        {
          path: 'publish', // 发布文章
          component: () => import('./views/publish')
        },
        {
          path: 'publish/:articlesId', // 修改文章
          component: () => import('./views/publish')
        },
        {
          path: 'account', // 账户信息
          component: () => import('./views/account')
        },
        {
          path: 'fanlist', // 粉丝列表
          component: () => import('./views/fans/fanlist')
        }, {
          path: '*', // 通配找不到跳转至404页面 二级以下路由只能写在最后
          component: () => import('./views/home/404')
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
