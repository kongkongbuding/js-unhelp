import _check from './check'
var { isString } = _check
// 排序 v(array|string) order(asc|desc) by(对象数组排序key)
const sort = (v, { order = 'asc', by }) => {
  if (isString(v)) v = v.split('')
  let f = [2, 0]
  if (order.toLowerCase() === 'desc') f.reverse()
  v.sort((a, b) => {
    let m = a[by] === void 0 ? a : a[by],
      n = b[by] === void 0 ? b : b[by],
      c = m > n ? f[0] : f[1]
    return c - 1
  })
  return v
}

// 归并排序
const mergeSort = function(arr, order, by) {
  var len = arr.length
  if (len < 2) {
    return arr
  }
  var middle = Math.floor(len / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle)
  return mergeValue(
    mergeSort(left, order, by),
    mergeSort(right, order, by),
    order,
    by
  )
}
function mergeValue(left, right, order, by) {
  var result = []

  while (left.length && right.length) {
    var l = left[0]
    var r = right[0]
    if (by !== void 0) {
      l = l[by]
      r = r[by]
    }
    if ((order && l <= r) || (!order && l >= r)) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }

  while (left.length) result.push(left.shift())

  while (right.length) result.push(right.shift())

  return result
}

export default {
  sort,
  mergeSort
}
