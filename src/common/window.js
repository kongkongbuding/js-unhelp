// setImmediate
const setImmediate = function(callback) {

  let params = [].slice.call(arguments, 1)

  return window.setTimeout(function() {

    callback.apply(null, params)

  }, 0)

}

// clearImmediate
const clearImmediate = function(handle) {

  window.clearTimeout(handle)

}

// encodeURIComponent
const encode = v => encodeURIComponent(v)

// decodeURIComponent
const decode = v => decodeURIComponent(v)

export default {

  setImmediate,
  clearImmediate,
  encode,
  decode
  
}
