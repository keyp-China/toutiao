import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breadCrumb from './common/bread-crumb'
import coverImage from './publish/cover-image'
import selectImage from './publish/select-image'
import fansMenu from './fans/fans-menu'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

// 全局注册所有普通组件
export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside) // 侧边导航
    Vue.component('layout-header', layoutHeader) // 头部
    Vue.component('bread-crumb', breadCrumb) // 面包屑
    Vue.component('quill-editor', quillEditor) // 全局注册富文本编辑器
    Vue.component('cover-image', coverImage) // 上传封面组件
    Vue.component('select-image', selectImage) // 上传封面选择素材组件
    Vue.component('fans-menu', fansMenu) // 上传封面选择素材组件
  }
}
