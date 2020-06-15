const toString = Object.prototype.toString

export function isDate(val: any): boolean {
  return toString.call(val) === '[Object Date]'
}

// 还可能是数组，formdata之类的
export function isObject(val: any): boolean {
  return val !== null && typeof val === 'object'
}

// 普通对象
export function isPlainObject(val: any): boolean {
  return Object.prototype.toString.call(val) === '[object Object]'
}

// 将对象混合
export function extend<T, U>(to: T, from: U): T & U {
  for (let key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}