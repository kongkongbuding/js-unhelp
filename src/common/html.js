// ${*} 替换  // 参考es6 字符串模板
const templateFmt = (str, data) => {

  let t_str, t_key

  while (str.includes('${')) {

    let a = str.indexOf('${'),
      b = str.indexOf('}')

    t_str = str.substring(a, b + 1)
    t_key = str.substring(a + 2, b)
    str = str.replace(t_str, data[t_key])

  }

  return str

}


// string to html
const stringToHtml = v => {

  let replaceList = function(str, re) {

    function _replace(a, b) {

      let arr = str.split(a)

      str = arr.join(b)

    }

    str = str || ''

    for (let key in re) {

      _replace(key, re[key])

    }
    
    return str

  }

  return replaceList(v, {

    '&': '&amp;',
    '"': '&quot;',
    "'": '&#39;',
    '<': '&lt;',
    '>': '&gt;',
    ' ': '&nbsp;',
    '\t': '&#09;',
    '(': '&#40;',
    ')': '&#41;',
    '*': '&#42;',
    '+': '&#43;',
    ',': '&#44;',
    '-': '&#45;',
    '.': '&#46;',
    '/': '&#47;',
    '?': '&#63;',
    '\\': '&#92;',
    '\n': '<br>'

  })
}


export default {

  templateFmt,
  stringToHtml
  
}
