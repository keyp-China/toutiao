import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/'
import Main from './views/home/main'
import Login from './views/login'

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
      children: [{
        path: '',
        component: Main
      }]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
