import Axios from './core/Axios'
import { extend } from './helpers/util'
import { AxiosInstance, AxiosRequestConfig } from './types/index'
import defaultConfig from './defaults'

// 创建混合对象
function createInstance(defaultConfig: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(defaultConfig)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance(defaultConfig)

export default axios
