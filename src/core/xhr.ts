import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'

import { parseHeader } from '../helpers/headers'

import { createError } from '../helpers/error'

import CancelToken from '../cancel/CancelToken'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, method = 'get', data = null, headers, responseType, timeout, cancelToken } = config
    const request = new XMLHttpRequest()

    // 参数说明 xhrReq.open(method, url, async, user, password);
    request.open(method.toUpperCase(), url!, true)

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
        // 异常情况，status 为0
        return
      }

      // 解析 header，使其返回一个对象，而不是一长窜用换行符分割的字符串
      const responseHeaders = parseHeader(request.getAllResponseHeaders())

      const responseData = responseType !== 'text' ? request.response : request.responseText

      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }

    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    // 设置 header
    if (headers) {
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          // 如果 data 数据为空，就不需要设置 content-type
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    // 使用 promise 进行异步分离，让 promise从pending状态转换为resolved状态，即可停止请求
    if (cancelToken) {
      cancelToken.promise.then(reason => {
        // 停止请求
        // xhr 里使用abort（）来停止请求
        request.abort()
        reject(reason)
      })
    }

    request.send(data)

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
