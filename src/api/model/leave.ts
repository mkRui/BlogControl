import axios from '../axios'

// 获取留言墙列表
export function getLeaveMessageList (params: any): Promise<ajaxRes.reState> {
  return axios.get('/leaveWell/allLeaveList', { params })
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}

// 获取留言墙详情
export function getLeaveMessage (params: any): Promise<ajaxRes.reState> {
  return axios.get('/leaveWell/viewDetail', { params })
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}

// 删除留言墙
export function delLeaveMessage (params: any): Promise<ajaxRes.reState> {
  return axios.get('/leaveWell/viewDetail', params)
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}
