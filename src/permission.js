import router from './router'
import nprogress from 'nprogress' // 引入nprogress模块
import 'nprogress/nprogress.css' // 引入nprogress的css

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 进度条开始
  nprogress.start()
  if (to.path === '/login') {
    // 如果请求的是login 则放行
    next()
  } else {
    // 判断是否具有token 有则放行 没有则跳转login
    window.localStorage.getItem('user_token') ? next() : next('/login')
  }
})

// 后置守卫
router.afterEach(() => {
  // 进度条结束
  nprogress.done()
})

export default router
