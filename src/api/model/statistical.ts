import axios from '../axios'

// 阅读数量
export function getReadArticle (param: any): Promise<ajaxRes.reState> {
  return axios.get('/panel/statistical')
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}

// 文章发布数排名
export function getSubmitArticle (param: any): Promise<ajaxRes.reState> {
  return axios.get('/panel/submitArticle')
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}

// 文章阅读量排名
export function getArticleRead (param: any): Promise<ajaxRes.reState> {
  return axios.get('/panel/articleRead')
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}
