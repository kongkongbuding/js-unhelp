import { isArray } from "./common"

/**
 * 渐变色
 * @author kongkongbuding
 * @since 2019.10.28
 */

class GradationColor {
  /**
   * 
   */
  color = new THREE.Color()
  /**
   * 
   */
  options = {
    min: 0,
    max: 100,
    colors: [
      [0, 0, 0],
      [255, 255, 255]
    ]
  }
  /**
   * 
   */
  constructor(options) {

    if ( options ) {

      let { min = 0, max = 100, colors } = options
      let fmtColors = []

      colors.map(v => {

        if (isArray(v)) {

          fmtColors.push(v)

        } else {

          let color = new THREE.Color(v)

          fmtColors.push([color.r * 255, color.g * 255, color.b * 255])

        }

      })

      this.options = Object.assign(this.options, {
        min,
        max,
        colors: fmtColors
      })

    }

  }
  /**
   * 
   */
  getColorValue (v, i) {

    let { colors } = this.options

    if ( v <= 0 || colors.length == 0 ) {

      return colors[0][i]

    }

    if ( v >= 1 ) {

      return colors[colors.length - 1][i]
      
    }

    let l = colors.length - 1
    let n = Math.floor(v * l)

    v = v - n / l

    return colors[n][i] + (colors[n + 1][i] - colors[n][i]) * v * l

  }
  /**
   * 
   */
  getColor = v => {

    let { min, max } = this.options
    let level = (v - min) / (max - min)

    let r = this.getColorValue(level, 0) / 255
    let g = this.getColorValue(level, 1) / 255
    let b = this.getColorValue(level, 2) / 255

    this.color.setRGB(r, g, b)
    
    return this.color

  }
}

export default GradationColor
