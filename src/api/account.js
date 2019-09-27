import axios from '../utils/axios-config'
import api from '../constant/api'

// 上传头像的方法
export function uploadImg (formdata) {
  return axios({
    url: `${api.API_USER}/photo`,
    method: 'patch',
    data: formdata
  })
}

// 修改用户信息
export function editUserInfo (formData) {
  return axios({
    url: `${api.API_USER}/profile`,
    method: 'patch',
    data: formData
  })
}

// 获取用户信息
export function getUserInfo () {
  return axios({
    url: `${api.API_USER}/profile`
  })
}
