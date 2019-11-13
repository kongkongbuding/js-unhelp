// 去空
const trim = v => v.replace(/^\s+|\s+$/g, '')
const trimLeft = v => v.replace(/^\s*/g, '')
const trimRight = v => v.replace(/\s*$/, '')

// 补位
const padLeft = (s, len, v) => (new Array(Math.max(0, len - s.length + 1)).join(v,  '')).substr(0, Math.max(len - s.length, 0)) + s
const padRight = (s, len, v) => s + (new Array(Math.max(0, len - s.length + 1)).join(v,  '')).substr(0, Math.max(len - s.length, 0))

// 翻转字符串
const reverseString = v =>
  v
    .split('')
    .reverse()
    .join('')

// 随机字符串
const randomString = n => {

  let tmp = '',
    i = 0

  for (; i < n; i++)
    tmp += String.fromCharCode(Math.round(Math.random() * 26) + 97)

  return tmp

}

export default {

  trim,
  trimLeft,
  trimRight,
  padLeft,
  padRight,
  reverseString,
  randomString
  
}
