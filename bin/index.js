import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'

const fs = require('fs-extra')
const path = __dirname + '/src/function'
const configPath = __dirname + '/bin/config.json'
const rollupConfig = [
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
const config = fs.readJsonSync(configPath)
const { es5except } = config

fs.readdirSync(path).forEach(function(file) {

  let pathname = path + '/' + file
  let filename = 'dist/' + file
  let name = file.split('.')[0] + 'Help'

  let moduleConfig = {
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
