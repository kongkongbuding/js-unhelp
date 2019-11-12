let isIE = 'ActiveXObject' in window ? /MSIE (\d+)/.test(navigator.userAgent) ? RegExp.$1 : 11 : false
let ie = isIE && isIE < 10 && typeof XDomainRequest !== 'undefined'
let xhr = ie ? new XDomainRequest() : new XMLHttpRequest()
xhr.open('POST', url, true)
// xhr.setRequestHeader("Content-Type", 'application/json')
// 'application/x-www-form-urlencoded' 'application/json' 'multipart/form-data' 'text/xml'
xhr.onload = e => {
  let result = JSON.parse(e.target.response)
  if (xhr.status < 200 || xhr.status >= 300) {
    return
  }
  return
}
xhr.onerror = e => {
  e
  return
}
xhr.send(JSON.stringify(pa))