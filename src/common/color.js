// 颜色 rgba => #******
const color10to16 = v => {

  let c = v.match(
    /^rgb[a]?\((\s?[0-9]*),(\s?[0-9]*),(\s?[0-9]*),?(\s?[0-9]?\.?[0-9]?)?\)$/i
  )

  let r = k => {

    let m = parseInt(k)
      .toString(16)
      .toUpperCase()

    return m.length < 2 ? '0' + m : m

  }

  return { color: '#' + r(c[1]) + r(c[2]) + r(c[3]), c, o: c[4] || 1 }
  
}

// 颜色 #****** => rgba
const color16to10 = v =>
  'rgba(' +
  v
    .match(/^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/i)
    .splice(1, 3)
    .map(c => parseInt(c, 16))
    .join(',') +
  ',1)'

export default {

  color10to16,
  color16to10
  
}
