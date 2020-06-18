import Axios from './core/Axios'
import { extend } from './helpers/util'
import { AxiosStatic, AxiosRequestConfig } from './types/index'
import defaultConfig from './defaults'
import mergeConfig from './core/mergeConfig'

// 创建混合对象
function createInstance(defaultConfig: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(defaultConfig)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaultConfig)

axios.create = function createStatic(config: AxiosRequestConfig) {
  return createInstance(mergeConfig(defaultConfig, config))
}

export default axios
