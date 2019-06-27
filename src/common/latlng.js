// xxx°xx.xx' => xxx.xx
const stringToLatlng = v =>
  v
    .match(/^(\d*)°(\d*\.\d{2})[′'][NEWS]?$/i)
    .splice(1, 2)
    .map((c, i) => (i ? (parseFloat(c) / 60).toString().split('.')[1] : c))
    .join('.')

// xxx.xx => xx°xx'xx"
const latlngToString = v => {
  let f = Math.abs(v),
    f1 = Math.floor(f),
    f2 = Math.floor((f - f1) * 60),
    f3 = Math.round(((f - f1) * 3600) % 60)
  return f1 + '°' + f2 + "'" + f3 + '"'
}

/**
 * [lng, lat] => [lat, lng]
 * @param {经纬度数组} latlngs 
 * @param {数组层级} deep 
 */
const fmtLatLng = (latlngs, deep) => {
  if (!deep) return [latlngs[1], latlngs[0]]
  deep--
  for (let i = 0, len = latlngs.length; i < len; i++) {
    latlngs[i] = fmtLatLng(latlngs[i], deep)
  }
  return latlngs
}

export default {
  stringToLatlng,
  latlngToString,
  fmtLatLng
}
