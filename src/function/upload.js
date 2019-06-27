/**
 * 文件上传
 * @param {} opt 
 */
export default function (opt) {
  let { url, data, onprogress, success, error, file, headers } = opt
  let isIE = 'ActiveXObject' in window ? /MSIE (\d+)/.test(navigator.userAgent) ? RegExp.$1 : 11 : false
  let ie = isIE && isIE < 10 && typeof XDomainRequest !== 'undefined'
  let xhr = ie ? new XDomainRequest() : new XMLHttpRequest()

  if (xhr.upload) {
    xhr.upload.onprogress = function (v) {
      if (v.total > 0) {
        v.percent = v.loaded / v.total * 100
      }
      v.totalText = v.total < 1048576 ? Math.round(v.total / 1024) + 'KB' : (v.total / 1048576).toFixed(2) + 'MB'
      v.loadedText = v.loaded < 1048576 ? Math.round(v.loaded / 1024) + 'KB' : (v.loaded / 1048576).toFixed(2) + 'MB'
      v.percent = v.total ? (v.loaded / v.total * 100).toFixed(1) : 0
      onprogress(v)
    }
  }

  let formData = new FormData()
  if (data) {
    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    })
  }
  formData.append('file', file)

  xhr.onload = function () {
    if (xhr.status < 200 || xhr.status >= 300) {
      return error(xhr)
    }
    let text = xhr.responseText || xhr.response
    if (text) {
      try {
        text = JSON.parse(text)
      } catch (e) {}
    }
    success(text)
  }

  xhr.onerror = function (e) {
    error(xhr)
  }

  xhr.open('POST', url, true)

  for (let p in headers) {
    if (headers.hasOwnProperty(p) && headers[p] !== null) {
      xhr.setRequestHeader(p, headers[p])
    }
  }

  xhr.send(formData)
  return xhr
}
