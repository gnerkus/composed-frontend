const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
// const redis = require('redis')
const RedisSMQ = require('rsmq')

const app = express()

app.use(bodyParser.json())
// Using host entries created by Docker in /etc/hosts (RECOMMENDED)
// const redisClient = redis.createClient('6379', 'redis-data')
const rsmqClient = new RedisSMQ({host: 'redis-data', port: 6379, ns: 'cf'})
const PORT = process.env.PORT || 1337

rsmqClient.createQueue({qname: 'colorupdate'}, (err, res) => {
  if (res === 1) {
    console.log('queue created')
  }
})

app.get('/', (req, res, next) =>
  // redisClient.incr('projects', (err, counter) => {
  //   if (err) return next(err)
  //   res.send(`PROJECTS has been viewed ${counter} times!`)
  // })
  res.sendFile(path.join(`${__dirname}/projects.html`))
  // The server receives messages from RabbitMQ and sends a
  // HTML page depending on the message received
)

app.post('/', (req, res, next) => {
  rsmqClient.sendMessage({qname: 'colorupdate', message: req.body.color}, (err, resp) => {
    if (resp) {
      console.log(`Message sent. ID: ${resp}`)
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

app
  .listen(PORT, () =>
    console.log(`Listening on port ${PORT}`)
  )
