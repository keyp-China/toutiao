import Vue from 'vue'
import App from './App.vue'
import router from './permission' // 路由先走全局导航守卫 判断用户是否已登录
import ElementUI from 'element-ui' // 引入ElementUI组件
import 'element-ui/lib/theme-chalk/index.css' // 引入ElementUI样式
import './style/index.less' // 引入index样式
import axios from './utils/axios-config' // 引入axios
import Component from './components' // 引入注册的所有全局普通组件
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 设置axios的默认URL
Vue.prototype.$axios = axios // 将axios共享给所有Vue或者组件实例使用

Vue.config.productionTip = false
Vue.use(ElementUI) // 全局使用ElementUI
Vue.use(Component) // 全局使用普通组件

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
