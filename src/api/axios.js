import axios from 'axios'
import * as config from './../config'
import queryString from 'querystring'

const ax = axios.create({
  baseURL: config.contentPath,
  timeout: 5000
})

ax.interceptors.request.use(config => {
  if (config.method === 'post' ||
      config.method === 'put' ||
      config.method === 'delete' ||
      config.method === 'patch'
  ) {
    config.data = queryString.stringify(config.data)
  }
  return config
}, error => {
  return Promise.reject(error)
})

export default ax
