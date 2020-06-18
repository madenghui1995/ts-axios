import { AxiosRequestConfig } from './types/index'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'

const defaultConfig: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  transformRequest: [
    function(data: any, headers: any) {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data:any): any {
      return transformResponse(data)
    }
  ]
}

const methodNoData = ['get', 'options', 'head', 'delete']
methodNoData.forEach(item => {
  defaultConfig.headers[item] = {}
})

const methodWithData = ['post', 'patch', 'put']
methodWithData.forEach(item => {
  defaultConfig.headers[item] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaultConfig
