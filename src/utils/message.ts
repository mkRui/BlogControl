import { Notification } from 'element-ui'

export function message (item: string) {
  return Notification({
    title: '成功',
    message: item,
    type: 'success'
  })
}

export function error (item: string) {
  return Notification.error({
    title: '错误',
    message: item,
  })
}

export function info (item: string) {
  return Notification.info({
    title: '消息',
    message: item,
    type: 'success'
  })
}
