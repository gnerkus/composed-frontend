const Express = require('express')
const multer = require('multer')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const Loki = require('lokijs')

const loadCollection = require('./utils').loadCollection
const scriptFilter = require('./utils').scriptFilter

// setup
const PORT = process.env.PORT || 1667
const DB_NAME = 'db.json'
const COLLECTION_NAME = 'scripts'
const UPLOAD_PATH = 'uploads'
const upload = multer({
  dest: `${UPLOAD_PATH}/`,
  fileFilter: scriptFilter
})
const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, {persistenceMethod: 'fs'})

// optional: clean all data before start
// cleanFolder(UPLOAD_PATH)

const app = Express()
app.use(cors())

// Upload a Javascript file
app.post('/bundle', upload.single('bundle'), (req, res) => {
  loadCollection(COLLECTION_NAME, db)
    .then(col => {
      const data = col.insert(req.file)
      db.saveDatabase()
      res.send({
        id: data.$loki, fileName: data.filename,
        originalName: data.originalname
      })
    })
    .catch(err => {
      res.sendStatus(400)
    })
})

// Retrieve a list of Javascript files
app.get('/scripts', (req, res) => {
  loadCollection(COLLECTION_NAME, db)
    .then(col => {
      res.send(col.data)
    })
    .catch(err => {
      res.sendStatus(400)
    })
})

// Retrieve a Javascript file by id
app.get('/scripts/:id', (req, res) => {
  loadCollection(COLLECTION_NAME, db)
    .then(col => {
      const result = col.get(req.params.id)

      if (!result) {
        res.sendStatus(404)
        return
      }

      res.setHeader('Content-Type', result.mimetype)
      fs.createReadStream(path.join(UPLOAD_PATH, result.filename)).pipe(res)
    })
    .catch(err => {
      res.sendStatus(400)
    })
})

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
