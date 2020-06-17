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

// 深拷贝对象
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
