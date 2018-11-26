import axios from '../axios'

export function init (): Promise<ajaxRes.reState> {
  return axios.get('/initPage')
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}

export function login (params: any): Promise<ajaxRes.reState> {
  return axios.post('/login', params)
  .then((res: any) => res.data)
  .catch((e: any) => console.error(e))
}

