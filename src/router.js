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
      path: '/home',
      component: Home,
      children: [
        {
          path: '',
          component: Main
        },
        {
          path: 'comment',
          component: () => import('./views/comment')
        },
        {
          path: 'material',
          component: () => import('./views/material')
        }]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
