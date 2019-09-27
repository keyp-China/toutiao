import axios from '../utils/axios-config'
import api from '../constant/api'

// 收藏状态切换
export function changeCollected (item) {
  return axios({
    url: `${api.API_USER_IMAGES}/${item.id}`,
    method: 'put',
    data: { collect: !item.is_collected }
  })
}

// 删除素材
export function delMaterial (id) {
  return axios({
    url: `${api.API_USER_IMAGES}/${id}`,
    method: 'delete'
  })
}

// 上传图片
export function uploadImg (data) {
  return axios({
    url: api.API_USER_IMAGES,
    method: 'post',
    data
  })
}

// 获取素材列表
export function getMaterial (params) {
  return axios({
    url: '/user/images',
    params
  })
}
