import axios from './axios'

export function init (): Promise<ajaxRes.VueRes> {
  return axios.get('/initPage').then((res: ajaxRes.VueRes) => res.data)
}
