import axios from 'axios'
import jsonBigInt from 'json-bigint'
import router from '../router'
import { Message } from 'element-ui'

axios.defaults.transformResponse = [function (data) {
  // data 是响应回来的字符串
  return data ? jsonBigInt.parse(data) : {} // 换了一个转化方法 使得 计算更精确 保证id不失真
}]

// axios请求数据拦截器
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

// axios响应数据拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做处理
  return response.data
}, function (error) {
  // 执行失败时执行
  let status = error.response.status // 获取失败的状态码
  let message = '未知错误'
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '403 refresh_token未携带或已过期'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      message = 'token过期或未出'
      window.localStorage.clear() // 清空缓存
      router.push('/login') // this.$router.push()
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  // 提示框
  Message({ message, type: 'error' })
  // 希望 在异常处理函数中将所有的错误都处理完毕 不再进入catch  终止错误
  return new Promise(function () { }) // 终止当前的错误
})

export default axios
