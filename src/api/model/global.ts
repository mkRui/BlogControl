import axios from '../axios'

// 编辑全局设置
export function editGlobal (params: any): Promise<ajaxRes.reState> {
  return axios.post('/editGlobal', params)
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}

// 获取全局设置
export function detailGlobal (params: any): Promise<ajaxRes.reState> {
  return axios.get('/detailGlobal', { params })
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}

