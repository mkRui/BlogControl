import axios from '../axios'

//  获取标签&分类
export function getAllTag (params: any): Promise<ajaxRes.reState> {
  return axios.get('/tagControl/allTagPage', { params })
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}