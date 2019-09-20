import router from './router'

// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    // 如果请求的是login 则放行
    next()
  } else {
    // 判断是否具有token 有则放行 没有则跳转login
    window.localStorage.getItem('user_token') ? next() : next('/login')
  }
})

export default router
