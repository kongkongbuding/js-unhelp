import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'

const fs = require('fs-extra')
const path = __dirname + '/src/function'
const es5except = ['download.js']

let rollupConfig = [
  {
    input: 'src/common/index.js',
    output: {
      file: 'dist/js-unhelp.js',
      format: 'umd',
      name: 'jsUnhelp'
    },
    plugins: [babel()]
  },
  {
    input: 'src/common/index.js',
    output: {
      file: 'dist/js-unhelp.min.js',
      format: 'umd',
      name: 'jsUnhelp'
    },
    plugins: [babel(), terser()]
  }
]

fs.readdirSync(path).forEach(function(file) {
  let pathname = path + '/' + file
  let filename = 'dist/' + file
  let name = file.split('.')[0]
  var moduleConfig = {
    input: pathname,
    output: {
      file: filename,
      format: 'umd',
      name: name
    },
    plugins: []
  }
  if (es5except.indexOf(file) === -1) moduleConfig.plugins.push(babel())
  rollupConfig.push(moduleConfig)
})

export default rollupConfig
