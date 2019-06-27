import _check from './check'
let { isNumber } = _check

// 转为数字
const toNumber = v => {
  const n = parseFloat(v)
  return isNumber(n) ? v : n
}

// 转int
const toInteger = n => {
  n = Number(n)
  if (isNaN(n)) return 0
  if (n === 0 || n === Infinity || n === -Infinity) return n
  return (n < 0 ? -1 : 1) * floor(abs(n))
}

// 强制转为数字
const toAbsNum = v => {
  v = v
    .toString()
    .replace(/[^\d.]/g, '')
    .replace(/^\./g, '')
    .replace(/\.{2,}/g, '.')
    .replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.')
  if (v === '') v = 0
  return +v
}

export default {
  toNumber,
  toInteger,
  toAbsNum
}
