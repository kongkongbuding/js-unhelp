/**
 * 墨卡托 球体
 * @author kongkongbuding
 * @since 2019.12.11
 */

let earthRadius = 6378137

let SphericalMercator = {

	R: earthRadius,

	MAX_LATITUDE: 85.0511287798,

  d: 0.5 / ( Math.PI * earthRadius ),

	project: function (latlng) {

		let d = Math.PI / 180
		let max = this.MAX_LATITUDE
    let lat = Math.max(Math.min(max, latlng.lat), -max)
		let sin = Math.sin(lat * d)

    return {

      x: this.R * latlng.lng * d,
      y: this.R * Math.log((1 + sin) / (1 - sin)) / 2

    }

	},

	unproject: function (point) {

		let d = 180 / Math.PI

    return {

      lat: (2 * Math.atan(Math.exp(point.y / this.R)) - (Math.PI / 2)) * d,
      lng: point.x * d / this.R

    }

	},

  getTile: function (latlng, zoom) {

    let point = this.project(latlng)
    let x = (this.d * point.x + 0.5) * Math.pow(2, zoom)
    let y = (-this.d * point.y + 0.5) * Math.pow(2, zoom)

    return {

      x,
      y,
      tileX: Math.floor(x),
      tileY: Math.floor(y)

    }

  },

  unTile: function (tile, zoom) {

    let point = {
      x: (tile.x / Math.pow(2, zoom) - 0.5) / this.d,
      y: (tile.y / Math.pow(2, zoom) - 0.5) / -this.d
    }

    return this.unproject(point)

  }

}

export default SphericalMercator
