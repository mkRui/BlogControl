declare namespace ajaxRes {
  interface VueRes {
    data: reState
  }

  interface reState {
    code: number,
    message: string,
    result: any
  }
}