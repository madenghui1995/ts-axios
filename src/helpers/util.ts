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
