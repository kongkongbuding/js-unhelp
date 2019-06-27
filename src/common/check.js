const O = Object.prototype.toString
const UA = navigator.userAgent

// 字符串
const isString = v => typeof v === 'string'

// 数组
const isArray = v => O.call(v) === '[object Array]'

// 对象
const isObject = v => O.call(v) === '[object Object]'

// 方法
const isFunction = v => O.call(v) === '[object Function]'

// date
const isDate = v => O.call(v) === '[object Date]'

// isFile
const isFile = v => O.call(v) === '[object File]'

// 数字
const isNumber = v => !isNaN(parseFloat(v)) && isFinite(v)

// symbol
const isSymbol = v =>
  typeof v === 'symbol' || ('Symbol' in window && v instanceof window.Symbol)

// buffer
const isBuffer = v =>
  v &&
  typeof v === 'object' &&
  typeof v.copy === 'function' &&
  typeof v.fill === 'function' &&
  typeof v.readUInt8 === 'function'

// isFormData
const isFormData = v => typeof FormData !== 'undefined' && v instanceof FormData

// 手机
const isPhone = v => /^0*1\d{10}$/.test(v)

// 邮箱
const isEmail = v =>
  /^([a-z0-9]+[_\-\.]?)*[a-z0-9]+@([a-z0-9]+[_\-\.]?)*[a-z0-9]+\.[a-z]{2,5}$/i.test(
    v
  )

// 正则
const isRegExp = v => O.call(v) === '[object RegExp]'

// 真
const isTrue = v => v === true

// 假
const isFalse = v => v === false

// ie
const isIE = () => {
  if ('ActiveXObject' in window) return /MSIE (\d+)/.test(UA) ? RegExp.$1 : 11
  return false
}

// android
const isAndroid = () => UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1

// ios
const isIOS = () => /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(UA)

export default {
  isString,
  isArray,
  isObject,
  isFunction,
  isDate,
  isFile,
  isNumber,
  isSymbol,
  isBuffer,
  isFormData,
  isPhone,
  isEmail,
  isRegExp,
  isTrue,
  isFalse,
  isIE,
  isAndroid,
  isIOS
}
