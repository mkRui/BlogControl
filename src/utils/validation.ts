/**
 * 账号类型检测
 * @param rule any
 * @param value string
 * @param callback (para?: Error) => any
 */

export function accountValidator (rule: any, value: string, callback: (para?: Error) => any) {
  /^[a-zA-Z0-9_]{4,40}$/.test(value)
  ? callback()
  : callback(new Error('4到40位（字母，数字，下划线）'))
}

/**
 * 密码检测
 * @param rule any
 * @param value string
 * @param callback (para?: Error) => any
 */
export function passWordValidator (rule: any, value: string, callback: (para?: Error) => any) {
  /^[\w_-]{6,16}$/.test(value)
  ? callback()
  : callback(new Error('6到16位（字母，数字，下划线）'))
}
