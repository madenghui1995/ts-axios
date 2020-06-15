import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  // headers 的设置要在设置 data 之前，因为 data 设置可能会 json.stringfy 变字符串
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig): string {
  let { url, params } = config
  return buildURL(url, params)
}

function transformHeaders(config: AxiosRequestConfig): any {
  let { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformRequestData(config: AxiosRequestConfig): any {
  let { data } = config
  return transformRequest(data)
}

function transformResponseData(res: AxiosResponse): any {
  res.data = transformResponse(res.data)
  return res
}

export default axios
