const express = require('express')
const http = require('http')
// const redis = require('redis')

const app = express()
app.use(express.static('./'))
// Using host entries created by Docker in /etc/hosts (RECOMMENDED)
// const redisClient = redis.createClient('6379', 'redis-data')
const PORT = process.env.PORT || 1447

app.get('/', (req, res, next) =>
  // redisClient.incr('todos', (err, counter) => {
  //   if (err) return next(err)
  //   res.send(`This page has been viewed ${counter} times!`)
  // })
  res.render('index.html')
)

http
  .createServer(app)
  .listen(PORT, () =>
    console.log(`Listening on port ${PORT}`)
  )
