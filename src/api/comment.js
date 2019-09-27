import axios from '../utils/axios-config'
import api from '../constant/api'

// 切换评论状态
export function triggerStatus (row) {
  return axios({
    url: api.API_COMMENTS_STATUS,
    method: 'put',
    params: { article_id: row.id.toString() },
    data: { allow_comment: !row.comment_status }
  })
}
// 获取评论列表
export function getComment (params) {
  return axios({
    url: api.API_ARTICLES,
    params
  })
}
