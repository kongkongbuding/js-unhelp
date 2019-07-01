/**
 * 坐标转换
 *
 */

const X_PI = (3.14159265358979324 * 3000.0) / 180.0
const A = 6378245.0
const EE = 0.00669342162296594323
const PI = Math.P

const transformLat = (lng, lat) => {
  let ret =
    -100.0 +
    2.0 * lng +
    3.0 * lat +
    0.2 * lat * lat +
    0.1 * lng * lat +
    0.2 * Math.sqrt(Math.abs(lng))
  ret +=
    ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
      2.0) /
    3.0
  ret +=
    ((20.0 * Math.sin(lat * PI) + 40.0 * Math.sin((lat / 3.0) * PI)) * 2.0) /
    3.0
  ret +=
    ((160.0 * Math.sin((lat / 12.0) * PI) + 320 * Math.sin((lat * PI) / 30.0)) *
      2.0) /
    3.0
  return ret
}

const transformLng = (lng, lat) => {
  let ret =
    300.0 +
    lng +
    2.0 * lat +
    0.1 * lng * lng +
    0.1 * lng * lat +
    0.1 * Math.sqrt(Math.abs(lng))
  ret +=
    ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
      2.0) /
    3.0
  ret +=
    ((20.0 * Math.sin(lng * PI) + 40.0 * Math.sin((lng / 3.0) * PI)) * 2.0) /
    3.0
  ret +=
    ((150.0 * Math.sin((lng / 12.0) * PI) +
      300.0 * Math.sin((lng / 30.0) * PI)) *
      2.0) /
    3.0
  return ret
}

const outOfChina = (lng, lat) => {
  return lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271
}

/**
 * BD09 坐标转 GCJ02 坐标
 *
 * @param lng BD09 坐标纬度
 * @param lat BD09 坐标经度
 * @return GCJ02 坐标：[经度，纬度]
 */
bd09ToGcj02 = (lng, lat) => {
  let x = lng - 0.0065,
    y = lat - 0.006,
    z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI),
    theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI),
    gg_lng = z * Math.cos(theta),
    gg_lat = z * Math.sin(theta)

  return [gg_lng, gg_lat]
}

/**
 * GCJ02 坐标转 BD09 坐标
 *
 * @param lng GCJ02 坐标经度
 * @param lat GCJ02 坐标纬度
 * @return BD09 坐标：[经度，纬度]
 */
const gcj02ToBd09 = (lng, lat) => {
  let z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * X_PI),
    theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * X_PI),
    bd_lng = z * Math.cos(theta) + 0.0065,
    bd_lat = z * Math.sin(theta) + 0.006

  return [bd_lng, bd_lat]
}

/**
 * GCJ02 坐标转 WGS84 坐标
 *
 * @param lng GCJ02 坐标经度
 * @param lat GCJ02 坐标纬度
 * @return WGS84 坐标：[经度，纬度]
 */
 const gcj02ToWGS84 = (lng, lat) => {
  if (outOfChina(lng, lat)) {
    return [lng, lat]
  }
  let dlat = transformLat(lng - 105.0, lat - 35.0),
    dlng = transformLng(lng - 105.0, lat - 35.0),
    radlat = (lat / 180.0) * PI,
    magic = Math.sin(radlat)
  magic = 1 - EE * magic * magic
  let sqrtmagic = Math.sqrt(magic)
  dlat = (dlat * 180.0) / (((A * (1 - EE)) / (magic * sqrtmagic)) * PI)
  dlng = (dlng * 180.0) / ((A / sqrtmagic) * Math.cos(radlat) * PI)
  let mglat = lat + dlat,
    mglng = lng + dlng

  return [lng * 2 - mglng, lat * 2 - mglat]
}

/**
 * WGS84 坐标转 GCJ02 坐标
 *
 * @param lng WGS84 坐标经度
 * @param lat WGS84 坐标纬度
 * @return GCJ02 坐标：[经度，纬度]
 */
const wgs84ToGcj02 = (lng, lat) => {
  if (outOfChina(lng, lat)) {
    return [lng, lat]
  }
  let dlat = transformLat(lng - 105.0, lat - 35.0),
    dlng = transformLng(lng - 105.0, lat - 35.0),
    radlat = (lat / 180.0) * PI,
    magic = Math.sin(radlat)
  magic = 1 - EE * magic * magic
  let sqrtmagic = Math.sqrt(magic)
  dlat = (dlat * 180.0) / (((A * (1 - EE)) / (magic * sqrtmagic)) * PI)
  dlng = (dlng * 180.0) / ((A / sqrtmagic) * Math.cos(radlat) * PI)
  let mglat = lat + dlat,
    mglng = lng + dlng

  return [mglng, mglat]
}

/**
 * BD09 坐标转 WGS84 坐标
 *
 * @param lng BD09 坐标经度
 * @param lat BD09 坐标纬度
 * @return WGS84 坐标：[经度，纬度]
 */
const bd09ToWGS84 = (lng, lat) => {
  let gcj = bd09ToGcj02(lng, lat)
  return gcj02ToWGS84(gcj[0], gcj[1])
}

/**
 * WGS84 坐标转 BD09 坐标
 *
 * @param lng WGS84 坐标经度
 * @param lat WGS84 坐标纬度
 * @return BD09 坐标：[经度，纬度]
 */
const wgs84ToBd09 = (lng, lat) => {
  let gcj = wgs84ToGcj02(lng, lat)
  return gcj02ToBd09(gcj[0], gcj[1])
}

export default {
  bd09ToGcj02,
  gcj02ToBd09,
  gcj02ToWGS84,
  wgs84ToGcj02,
  bd09ToWGS84,
  wgs84ToBd09
}