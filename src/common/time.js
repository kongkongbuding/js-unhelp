// webapi 时间格式化
const webapiTime = v =>
  new Date(v.replace(/^(\d{4})-(\d{2})-(\d{2})[ T](.*)$/, '$1/$2/$3 $4'))

export default {

  webapiTime
  
}
