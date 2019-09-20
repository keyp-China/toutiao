import axios from 'axios'

// axios请求拦截器
axios.interceptors.request.use(function (config) {
  // 获取token
  let token = window.localStorage.getItem('user_token')
  // 统一注入token 到headers属性 因为所有接口要求的token格式是一样的
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  // 对请求失败做处理
  return Promise.reject(error)
})

export default axios
