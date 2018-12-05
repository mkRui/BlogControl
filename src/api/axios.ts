import axios from 'axios'
import * as config from './../config'
import queryString from 'querystring'
import router from '@/router'
import { error } from '@/utils/message'

const ax:any = axios.create({
  baseURL: config.contentPath,
  timeout: 5000
})

ax.interceptors.request.use((config: any) => {
  if (config.method === 'post' ||
      config.method === 'put' ||
      config.method === 'delete' ||
      config.method === 'patch'
  ) {
    config.data = queryString.stringify(config.data)
  }
  return config
}, (error: any) => {
  return Promise.reject(error)
})

ax.interceptors.response.use((response: any) => {
  if (response.data.code === -2) {
    router.push('/login')
  } else if (response.data.code !== 1) {
    error(response.data.messgae)
  }
  return response
}, (e: any) => {
  return Promise.reject(e)
})

export default ax
