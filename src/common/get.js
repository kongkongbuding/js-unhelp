import _string from './string'
let { trim } = _string

/**
 * 获取 url 参数
 */
const getParams = () => {
  let e = {},
    t = location.hash.slice(1) || '/',
    n = t.split('?')[1]
  if (!n) return e
  n = n.split('&')
  for (let r = 0, len = n.length, f = void 0; r < len; r++)
    (f = n[r].split('=')), (e[f[0]] = f[1])
  return e
}

/**
 * 获取 cookie
 * @param {cookie key} name 
 * @param {[? 赋值]} value 
 */
const cookie = (name, value) => {
  if (!(value === void 0)) return (document.cookie = name + '=' + value), true
  let cookie = document.cookie.split(';'),
    e = {}
  for (let i = 0, len = cookie.length, kv = void 0; i < len; i++)
    (kv = cookie[i].split('=')), (kv[0] && kv[1] && (e[trim(kv[0])] = trim(kv[1])))
  if (!(name === void 0)) return e[name]
  return e
}

// 获取 translate3
// const getTranslate = v =>
//   v.match(/^translate3?d?\(-?(\d+)px,\s*-?(\d+)px(.*)\)$/i)

/**
 * 获取dom实际属性
 * @param {*} dom 
 * @param {String} v styleKey 
 */
const getStyle = (dom, v) => document.defaultView.getComputedStyle(dom, null)[v]

export default {
  getParams,
  cookie,
  // getTranslate,
  getStyle
}
