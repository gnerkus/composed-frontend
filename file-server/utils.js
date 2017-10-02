const del = require('del')
const Loki = require('lokijs')

const loadCollection = (colName, db) => {
  return new Promise(resolve => {
    db.loadDatabase({}, () => {
      const _collection = db.getCollection(colName) || db.addCollection(colName)
      resolve(_collection)
    })
  })
}

const scriptFilter = (req, file, cb) => {
  // accept javascript files only
  if (!file.originalname.match(/\.js$/)) {
    return cb(new Error('Only Javascript files are allowed!'), false)
  }

  cb(null, true)
}

const cleanFolder = (folderPath) => {
  // delete the files inside the folder but not the folder itself
  del.sync([`${folderPath}/**`, `!${folderPath}`])
}

module.exports = {
  cleanFolder,
  loadCollection,
  scriptFilter
}
