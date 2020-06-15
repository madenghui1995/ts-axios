import { isPlainObject } from './util'

export function transformRequest(data: any): any {
  // 因为可能是 formdata 之类的，所以要用 any
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }

  return data
}

export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data)
    } catch {
      // do nothing
    }
  }
  return data
}
