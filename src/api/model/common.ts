import axios from '../axios'

//  获取标签&分类
export function getAllTag (params: any): Promise<ajaxRes.reState> {
  return axios.get('/tagControl/allTagPage', { params })
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}

// 获取所有文章
export function getAllArticle (params: any): Promise<ajaxRes.reState> {
  return axios.get('/article/searchArticle', { params })
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}