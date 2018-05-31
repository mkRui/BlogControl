declare namespace ajaxRes {

  // axios 默认
  interface VueRes {
    data: reState
  }
  interface reState {
    // 后台自定义状态码
    code: number,

    // 后台返回信息
    message: string,

    // 后台返回的数据
    result: any
  }
}