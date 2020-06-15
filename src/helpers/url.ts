import { isDate, isPlainObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }

  let parts: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(item => {
      if (isDate(item)) {
        item = item.toISOString()
      } else if (isPlainObject(item)) {
        item = JSON.stringify(item)
      }
      parts.push(`${encode(key)}=${encode(item)}`)
    })
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    // 清除哈希
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams

    // url = 'me?hah=123'
    // 若 url 的第一个字符不是 '/'，则会自动加上路由前缀
    // 如 localshost:9000/base/ 去调用这个 url，
    // 则会去请球 localshost:9000/base/me?hah=123

    // 若 url 的第一个字符是 '/'，则会直接当作url，不加入路由前缀
    // 则去请求 localshost:9000/me?hah=123
  }

  return url
}
