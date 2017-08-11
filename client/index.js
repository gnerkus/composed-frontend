const express = require('express')
const http = require('http')

const app = express()
app.use(express.static('./'))

const PORT = process.env.PORT || 1557

app.get('/', (req, res, next) =>
  res.render('index.html')
)

http
  .createServer(app)
  .listen(PORT, () =>
    console.log(`Listening on port ${PORT}`)
  )
