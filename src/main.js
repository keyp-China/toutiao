import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入ElementUI组件
import 'element-ui/lib/theme-chalk/index.css' // 引入ElementUI样式
import './style/index.less' // 引入index样式
import axios from 'axios' // 引入axios
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 设置axios的默认URL
Vue.prototype.$axios = axios // 将axios共享给所有Vue或者组件实例使用

Vue.config.productionTip = false
Vue.use(ElementUI) // 全局使用ElementUI

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
