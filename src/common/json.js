import _check from './check'

let { isArray, isObject, isString } = _check

// 清空冻结
const emptyObject = () => Object.freeze({})

// 深层拷贝
const newSpace = (d, f) => {

  if (f !== void 0) return JSON.parse(JSON.stringify(d))

  if (isArray(d)) {

    if (d.length == 0 || (d.length > 0 && !isArray(d[0]) && !isObject(d[0])))
      return Object.assign([], d, [])

    return d.map(v => newSpace(v))

  }

  if (isObject(d)) {

    let nd = new Object()

    for (let p in d) nd[p] = newSpace(d[p])

    return nd

  }

  return d

}

// 深层 string -> json 转换 (string to json)
const deepParse = d => {

  if (isArray(d)) {

    for (let i = 0; d[i]; i++) d[i] = deepParse(d[i])

    return d

  }

  if (isObject(d)) {

    for (let p in d) d[p] = deepParse(d[p])

    return d

  }

  if (isString(d)) {

    try {

      d = JSON.parse(d)

    } catch (e) {}

    if (isString(d)) return d

    return deepParse(d)

  }

  return d

}

// 循环
function forEach(obj, fn) {

  if (obj === null || typeof obj === 'undefined') return

  if (typeof obj !== 'object') obj = [obj]

  if (isArray(obj)) {

    for (let i = 0, l = obj.length; i < l; i++) {

      fn.call(null, obj[i], i, obj)

    }

    return

  }

  for (let key in obj) {

    if (Object.prototype.hasOwnProperty.call(obj, key)) {

      fn.call(null, obj[key], key, obj)

    }

  }

}

// array 去重
const unRepeat = arr => {

  if ('Set' in window) return [...new Set(arr)]

  let list = Array.prototype.concat.apply([], arr)

  return list.filter(function(item, i) {

    return i == list.indexOf(item)

  })

}

// 混入
const merge = v => {

  let ret = {}

  function assignValue(val, key) {

    if (typeof ret[key] === 'object' && typeof val === 'object') {

      ret[key] = merge(ret[key], val)

    } else {

      ret[key] = val

    }

  }

  for (let i = 0, l = v.length; i < l; i++) {

    forEach(v[i], assignValue)

  }

  return ret

}

// 转object
const toObject = v => {

  if (v === null || v === undefined) throw TypeError()
  
  return Object(v)

}

export default {

  emptyObject,
  newSpace,
  deepParse,
  forEach,
  unRepeat,
  merge,
  toObject
  
}
