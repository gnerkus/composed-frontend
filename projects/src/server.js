import path from 'path'
import { Server } from 'http'
import Express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import IndexPage from './components/IndexPage'

// initialize the server and configure support for ejs templates
const app = Express()
const server = new Server(app)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')))

// universal rendering
app.get('*', (req, res) => {
  const markup = renderToString(<IndexPage />)
  return res.render('index', { markup })
})

// start the server
const port = process.env.PORT || 1337;
const env = process.env.NODE_ENV || 'production'
server.listen(port, err => {
  if (err) {
    return console.error(err)
  }
  console.info(`Server ru8nning on http://localhost:${port} [${env}]`)
})
