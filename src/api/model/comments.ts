import axios from '../axios'

// 分页评论
export function getCommentsList (params: any): Promise<ajaxRes.reState> {
  return axios.get('/comments/getCommentsList', { params })
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}

// 删除
export function delComments (params: any): Promise<ajaxRes.reState> {
  return axios.post('/comments/deleteComment', params)
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}

// 添加评论
export function addComments (params: any): Promise<ajaxRes.reState> {
  return axios.post('/comments/addComment', params)
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}
