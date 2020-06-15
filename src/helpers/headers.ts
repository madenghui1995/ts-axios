import { isPlainObject } from './util'

function normalizeHeaderName(headers: any, normalizedName: string): any {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && normalizedName.toUpperCase() === name.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
  return headers
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charest=utf-8'
    }
  }

  return headers
}

// 解析 header，使其返回一个对象，而不是一长窜用换行符分割的字符串
export function parseHeader(header: string): any {
  let res = Object.create(null)
  if (!header) {
    return res
  }
  header.split('\r\n').forEach(item => {
    let [key, val] = item.split(':')
    if (!key) {
      return
    }
    key = key.trim().toLowerCase()
    val = val.trim()
    res[key] = val
  })
  return res
}
