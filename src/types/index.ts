export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'post'
  | 'POST'
  | 'head'
  | 'HEAD'
  | 'put'
  | 'PUT'
  | 'options'
  | 'OPTIONS'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: AxiosTransform | AxiosTransform[]
  transformResponse?: AxiosTransform | AxiosTransform[]
  cancelToken?: CancelToken

  [propName: string]: any
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText?: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

export interface Axios<T = any> {
  defaultsConfig: AxiosRequestConfig
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>,
    response: AxiosInterceptorManager<AxiosResponse>
  }
  request<T = any>(config?: AxiosRequestConfig): AxiosPromise<T>
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

// axios 实例可能是两种类型的方法
export interface AxiosInstance<T = any> extends Axios<T> {
  // 第一种是只传一个配置对象
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  // 第二种是先传 url ,后传配置对象
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosStatic extends AxiosInstance {
  create(config: AxiosRequestConfig): AxiosInstance
}

export interface AxiosInterceptorManager<T> {
  use(resolve: ResolveFn<T>, reject?: RejectFn): number
  eject(id: number): void
}

export interface ResolveFn<T> {
  (val: T): T | null
}

export interface RejectFn {
  (err: any): any
}

export interface AxiosTransform {
  (data:any, headers?:any): any
}

export interface CancelToken {
  promise: Promise<string>
  reason?: string
}

export interface Canceler {
  (message?: string): void
}

export interface CancelExecutor {
  (cancel: Canceler): void
}
