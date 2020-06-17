import { AxiosRequestConfig } from './types/index'

const defaultConfig: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

const methodNoData = ['get', 'options', 'header', 'delete']
methodNoData.forEach(item => {
  defaultConfig.headers[item] = {}
})

const methodWithData = ['post', 'fetch', 'put']
methodWithData.forEach(item => {
  defaultConfig.headers[item] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaultConfig
