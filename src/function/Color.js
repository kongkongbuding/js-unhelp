
class Color {

	isColor = true

	r = 1
	g = 1
	b = 1

	constructor(r, g, b) {

		if ( g === undefined && b === undefined ) {

			return this.set( r )
	
		}
	
		return this.setRGB( r, g, b )

	}

	set = value => {

		if ( value && value.isColor ) {

			this.copy( value )

		} else if ( typeof value === 'number' ) {

			this.setHex( value )

		} else if ( typeof value === 'string' ) {

			this.setStyle( value )

		}

		return this

	}

	setHex = hex => {

		hex = Math.floor( hex )

		this.r = ( hex >> 16 & 255 ) / 255
		this.g = ( hex >> 8 & 255 ) / 255
		this.b = ( hex & 255 ) / 255

		return this

	}

	setRGB = ( r, g, b ) => {

		this.r = r
		this.g = g
		this.b = b

		return this

	}

	setStyle = style => {

		let m

		if ( m = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec( style ) ) {

			let color
			let name = m[ 1 ]
			let components = m[ 2 ]

			switch ( name ) {

				case 'rgb':
				case 'rgba':

					if ( color = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec( components ) ) {

						this.r = Math.min( 255, parseInt( color[ 1 ], 10 ) ) / 255
						this.g = Math.min( 255, parseInt( color[ 2 ], 10 ) ) / 255
						this.b = Math.min( 255, parseInt( color[ 3 ], 10 ) ) / 255

						return this

					}

					if ( color = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec( components ) ) {

						this.r = Math.min( 100, parseInt( color[ 1 ], 10 ) ) / 100
						this.g = Math.min( 100, parseInt( color[ 2 ], 10 ) ) / 100
						this.b = Math.min( 100, parseInt( color[ 3 ], 10 ) ) / 100

						return this

					}

					break

				case 'hsl':
				case 'hsla':

					if ( color = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec( components ) ) {

						let h = parseFloat( color[ 1 ] ) / 360
						let s = parseInt( color[ 2 ], 10 ) / 100
						let l = parseInt( color[ 3 ], 10 ) / 100

						return this.setHSL( h, s, l )

					}

					break

			}

		} else if ( m = /^\#([A-Fa-f0-9]+)$/.exec( style ) ) {

			let hex = m[ 1 ]
			let size = hex.length

			if ( size === 3 ) {

				this.r = parseInt( hex.charAt( 0 ) + hex.charAt( 0 ), 16 ) / 255
				this.g = parseInt( hex.charAt( 1 ) + hex.charAt( 1 ), 16 ) / 255
				this.b = parseInt( hex.charAt( 2 ) + hex.charAt( 2 ), 16 ) / 255

				return this

			} else if ( size === 6 ) {

				this.r = parseInt( hex.charAt( 0 ) + hex.charAt( 1 ), 16 ) / 255
				this.g = parseInt( hex.charAt( 2 ) + hex.charAt( 3 ), 16 ) / 255
				this.b = parseInt( hex.charAt( 4 ) + hex.charAt( 5 ), 16 ) / 255

				return this

			}

		}

		if ( style && style.length > 0 ) {

			let hex = ColorKeywords[ style ]

			if ( hex !== undefined ) {

				this.setHex( hex )

			} else {

				console.warn( '未知的颜色： ' + style );

			}

		}

		return this

	}

	clone = () => {

		return new this.constructor( this.r, this.g, this.b )

	}

	copy = color => {

		this.r = color.r
		this.g = color.g
		this.b = color.b

		return this

	}

}

export default Color
