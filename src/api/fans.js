import axios from '../utils/axios-config'
import api from '../constant/api'

// 获取粉丝列表
export function getFansList (params) {
  return axios({
    url: api.API_FOLLOWERS,
    params
  })
}
