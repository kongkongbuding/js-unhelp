// webapi 时间格式化
const webapiTime = v =>
  new Date(v.replace(/^(\d{4})-(\d{2})-(\d{2})[ T](.*)$/, '$1/$2/$3 $4'))

// 获取月底时间
const getMonthEndTime = v => {
  
  let spv = v.split['-']

  return new Date(new Date(spv[0],spv[1]).getTime() - 1 + 8 * 3600000).toISOString().split('.').shift().replace('T', ' ')

}


let t = window.performance.timing

let windowTime = {

  重定向耗时: t.redirectEnd - t.redirectStart,
  
  DNS查询耗时: t.domainLookupEnd - t.domainLookupStart,
  
  TCP链接耗时: t.connectEnd - t.connectStart,
  
  HTTP请求耗时: t.responseEnd - t.responseStart,
  
  解析dom树耗时: t.domComplete - t.domInteractive,
  
  白屏时间: t.responseStart - t.navigationStart,
  
  DOMready时间: t.domContentLoadedEventEnd - t.navigationStart,
  
  onload时间: t.loadEventEnd - t.navigationStart

}
  
export default {

  webapiTime,

  getMonthEndTime,

  windowTime
  
}