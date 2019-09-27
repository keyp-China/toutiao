import axios from '../utils/axios-config'
import api from '../constant/api'

// 登录
export function login (data) {
  return axios({
    url: api.API_LOGIN,
    method: 'post',
    data
  })
}
