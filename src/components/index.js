import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'

// 全局注册所有普通组件
export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
  }
}
