import axios from '../axios'

//  初始化
export function init (): Promise<ajaxRes.reState> {
  return axios.get('/initPage')
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}

// 登录
export function login (params: any): Promise<ajaxRes.reState> {
  return axios.post('/login', params)
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}

// 注册/添加人员
export function addUser (params: any): Promise<ajaxRes.reState> {
  return axios.post('/addUser', params)
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}

// 修改人员状态
export function updateState (params: any): Promise<ajaxRes.reState> {
  return axios.post('/user/updateState', params)
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}

// 获取人员列表
export function getUserPage (params: any): Promise<ajaxRes.reState> {
  return axios.get('/user/getUserPage', { params })
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}

// 修改人员信息
export function exitUserInfo (params: any): Promise<ajaxRes.reState> {
  return axios.post('/user/updateInfo', params)
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}

// 删除人员
export function delUser (params: any): Promise<ajaxRes.reState> {
  return axios.post('/user/delUser', params)
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}
