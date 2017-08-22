const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
// const redis = require('redis')

const app = express()
app.use(bodyParser.json())
// Using host entries created by Docker in /etc/hosts (RECOMMENDED)
// const redisClient = redis.createClient('6379', 'redis-data')
const PORT = process.env.PORT || 1447

app.get('/', (req, res, next) =>
  // redisClient.incr('projects', (err, counter) => {
  //   if (err) return next(err)
  //   res.send(`PROJECTS has been viewed ${counter} times!`)
  // })
  res.sendFile(path.join(`${__dirname}/todos.html`))
  // The server receives messages from RabbitMQ and sends a
  // HTML page depending on the message received
)

app.post('/projects', (req, res, next) => {
  res.json(req.body)
})

app
  .listen(PORT, () =>
    console.log(`Listening on port ${PORT}`)
  )
