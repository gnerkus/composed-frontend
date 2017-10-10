/* eslint-disable no-console */
import express from 'express'
import morgan from 'morgan'
import RedisSMQ from 'rsmq'
import React from 'react'
import { renderToString } from 'react-dom/server'
import RecosRecos from './cf-recos-recos/RecosRecos'

const app = express()
const rsmqClient = new RedisSMQ({host: 'redis-data', port: 6379, ns: 'cf'})
app.use(morgan('dev'))

app.use('/recommendations/images', express.static('./images'))
app.use('/recommendations', express.static('./build'))

app.use('/cf-recos-recos', (req, res) => {
  res.send(
    renderToString(
      React.createElement(
        RecosRecos,
        {
          id: 'reco',
          sku: req.query.sku
        },
        null
      )
    )
  )
})

// Update the recommendations based on the sku
app.get('/sku', (req, res, next) => {
  rsmqClient.receiveMessage({qname: 'sku'}, (err, resp) => {
    if (resp.id) {
      res.json({sku: resp.message})
    } else {
      res.json({sku: 't_porsche'})
    }
  })
})

app.listen(3002)
console.log(`💚 recommendations running. fragments are available here:
>> http://127.0.0.1:3002/cf-recos-recos
`)
