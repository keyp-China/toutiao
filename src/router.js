import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/home/index' 下列代码等同
import Home from './views/home/'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    }
  ]
})
