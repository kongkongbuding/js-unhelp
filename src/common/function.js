
// 一元运算 ignoring any additional arguments
const unary = fn => val => fn(val)

// 防抖
const debounce = (fn, delay, immediate) => {
  let timer = null
  return function () {
    const context = this
    timer && clearTimeout(timer)
    if (immediate) {
      !timer && fn.apply(context, arguments)
    }
    timer = setTimeout(() => {
      fn.apply(context, arguments)
    }, delay)
  }
}

// 节流
const throttle = (fn, delay = 2000) => {
	let timer = null
	let startTime = new Date()
	return function() {
		const context = this
		let currentTime = new Date()
		clearTimeout(timer)
		if (currentTime - startTime >= delay) {
			fn.apply(context, arguments)
			startTime = currentTime
		} else {
			timer = setTimeout(() => {
				fn.apply(context, arguments)
			}, delay)
		}
	}
}
