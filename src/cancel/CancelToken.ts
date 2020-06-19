// 使用示例
// const CancelToken = axios.CancelToken
// let cancel

// new 一个实例，然后将c方法赋值给cancel，c方法是可以直接将promise从pending状态变为resolve状态，然后就可以直接停止请求
// axios.get(',,,', {
//   cancelToken: new CancelToken(function excutor(c) {
//     cancel = c
//   })
// })
// cancel()

import { CancelExecutor } from '../types/index'

interface ResolvePromise {
  (message?: string): void
}

//
export default class CancelToken {
  promise: Promise<string>
  reason?: string

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<string>(resolve => {
      resolvePromise = resolve
    })

    executor((message) => {
      if (this.reason) {
        return
      }
      this.reason = message
      resolvePromise(this.reason)
    })
  }
}
