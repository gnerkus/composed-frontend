const path = require('path')
const fs = require('fs')
const API = require('./api')

function isFile (input) {
  return fs.statSync(input).isFile()
}

function isDir (input) {
  return fs.statSync(input).isDirectory()
}

function isType (type) {
  return function enterFile (file) {
    return isFile(file) && path.extname(file) === '.' + type
  }
}

const isJs = isType('js')
const isCss = isType('css')

class UploadPlugin {
  constructor (options) {
    this.options = options
  }

  apply(compiler) {
    const self = this
    compiler.plugin('done', (stats, cb) => {
      // All compiled assets including js/css/img
      const assets = stats.compilation.assets
      const assetNames = Object.keys(assets)
      // classify assets
      const desireAssets = assetNames.reduce((last, name) => {
        const assetInfo = assets[name]
        const location = assetInfo.existsAt

        if (isJs(location)) {
          last.js[name] = assetInfo
        }

        return last
      }, {js: {}, css: {}})

      const {css, js} = desireAssets

      // make assets object to array with local path
      function makeArr (input) {
        return Object.keys(input).map(name => {
          const info = input[name]
          return info.existsAt
        })
      }

      // This returns an array of the asset locations on the system.
      // E.g [ 'C:\\Users\\ifean\\Projects\\fv\\composed-frontend\\projects\\src\\static\\js\\projects-bundle.js' ]
      const jsArr = makeArr(js)

      // Naive implementation of the file upload.
      // Here, we assume the Javascript file is the first in the list
      // No checks are performed.
      API.uploadFile(jsArr[0], 'bundle', Object.keys(js)[0])
    })
  }
}

module.exports = UploadPlugin
