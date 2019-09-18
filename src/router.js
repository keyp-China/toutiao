import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/home/index' 下列代码等同
import Home from './views/home/'
import Login from './views/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Home
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
