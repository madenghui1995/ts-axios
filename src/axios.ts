import Axios from './core/Axios'
import { extend } from './helpers/util'
import { AxiosInstance } from './types/index'

// 创建混合对象
function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
