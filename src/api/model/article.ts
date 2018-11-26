// 文章列表
import axios from '../axios'

export  function articleList (params: any): Promise<ajaxRes.reState> {
  return axios.get('/article/articlePage', { params })
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}

export  function addArticle (params: any): Promise<ajaxRes.reState> {
  return axios.post('/article/addArticle', params)
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}

export  function delArticle (params: any): Promise<ajaxRes.reState> {
  return axios.post('/article/deleteArticle', params)
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}

export  function articleDetail (params: any): Promise<ajaxRes.reState> {
  return axios.get('/article/articleDetail', { params })
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}

