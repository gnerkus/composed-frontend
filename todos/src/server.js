import path from 'path'
import { Server } from 'http'
import Express from 'express'
import bodyParser from 'body-parser'
import RedisSMQ from 'rsmq'
import React from 'react'
import { renderToString } from 'react-dom/server'
import IndexPage from './components/IndexPage'

// initialize the server and configure support for ejs templates
const app = Express()
app.use(bodyParser.json())
const server = new Server(app)

const rsmqClient = new RedisSMQ({host: 'redis-data', port: 6379, ns: 'cf'})
const PORT = process.env.PORT || 1447

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')))

// create Redis client
rsmqClient.createQueue({qname: 'colorupdate'}, (err, res) => {
  if (res === 1) {
    console.log('queue created')
  }
})

// universal rendering
app.get('/', (req, res, next) => {
  const markup = renderToString(<IndexPage />)
  return res.render('index', { markup })
})

// API routes
app.post('/', (req, res, next) => {
  rsmqClient.sendMessage({qname: 'colorupdate', message: req.body.color}, (err, resp) => {
    if (resp) {
      res.json({msgstatus: 'sent', msgid: resp})
    } else {
      res.json({msgstatus: 'not sent'})
    }
  })
})

app.put('/', (req, res, next) => {
  rsmqClient.receiveMessage({qname: 'colorupdate'}, (err, resp) => {
    if (resp.id) {
      res.json({color: resp.message})
    } else {
      res.json({color: 'black-box'})
    }
  })
})

// start the server
const ENV = process.env.NODE_ENV || 'production'
server.listen(PORT, err => {
  if (err) {
    return console.error(err)
  }
  console.info(`Server ru8nning on http://localhost:${PORT} [${ENV}]`)
})
