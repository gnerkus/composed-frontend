const express = require('express')
const http = require('http')
const redis = require('redis')

const app = express()
// Using host entries created by Docker in /etc/hosts (RECOMMENDED)
const redisClient = redis.createClient('6379', 'redis-data')
const PORT = process.env.PORT || 1337

app.get('/', (req, res, next) =>
  redisClient.incr('projects', (err, counter) => {
    if (err) return next(err)
    res.send(`PROJECTS has been viewed ${counter} times!`)
  })
)

http
  .createServer(app)
  .listen(PORT, () =>
    console.log(`Listening on port ${PORT}`)
  )
