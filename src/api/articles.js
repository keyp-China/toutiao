import axios from '../utils/axios-config'
import api from '../constant/api'

// 发布文章
export function publishArticle (articlesId, data, params) {
  return axios({
    url: articlesId ? `${api.API_ARTICLES}/${articlesId}` : api.API_ARTICLES,
    method: articlesId ? 'put' : 'post',
    data,
    params
  })
}

// 获取指定文章
export function getArticleById (articlesId) {
  return axios({
    url: `${api.API_ARTICLES}/${articlesId}`
  })
}

// 删除文章
export function delArticles (id) {
  return axios({
    url: `${api.API_ARTICLES}/${id.toString()}`,
    method: 'delete'
  })
}

// 获取文章列表
export function getArticles (params) {
  return axios({
    url: api.API_ARTICLES,
    params
  })
}

// 获取频道
export function getChannels () {
  return axios({
    url: api.API_CHANNELS
  })
}
