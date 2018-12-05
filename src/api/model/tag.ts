import axios from '../axios'
import { message } from '@/utils/message'

//  获取标签&分类
export function getAllTag (params: any): Promise<ajaxRes.reState> {
  return axios.get('/tagControl/allTagPage', { params })
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}

// 添加标签
export function addAllTag (params: any): Promise<ajaxRes.reState> {
  return axios.post('/tagControl/addPageState', params)
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}

// 删除标签
export function delAllTag (params: any): Promise<ajaxRes.reState> {
  return axios.post('/tagControl/deleteTag', params)
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}

// 修改标签
export function editAllTag (params: any): Promise<ajaxRes.reState> {
  return axios.post('/tagControl/updateTagInfo', params)
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}