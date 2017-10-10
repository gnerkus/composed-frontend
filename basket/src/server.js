/* eslint-disable no-console */
import express from 'express'
import morgan from 'morgan'
import RedisSMQ from 'rsmq'
import React from 'react'
import { renderToString } from 'react-dom/server'
import BasketBuy from './cf-basket-buy/BasketBuy'
import BasketBasket from './cf-basket-basket/BasketBasket'

const app = express()
const rsmqClient = new RedisSMQ({host: 'redis-data', port: 6379, ns: 'cf'})

app.use(morgan('dev'))
app.use('/basket', express.static('./build'))

app.get('/cf-basket-buy', (req, res) => {
  res.send(
    renderToString(
      React.createElement(
        BasketBuy,
        {id: 'buy'},
        null
      )
    )
  )
})

app.get('/cf-basket-basket', (req, res) => {
  res.send(
    renderToString(
      React.createElement(
        BasketBasket,
        {id: 'basket'},
        null
      )
    )
  )
})

// Update number of items in basket
app.get('/basket', (req, res, next) => {
  rsmqClient.receiveMessage({qname: 'basket'}, (err, resp) => {
    if (resp.id) {
      res.json({count: resp.message})
    } else {
      res.json({count: 0})
    }
  })
})

// Update the price in the buy button based on the sku
app.get('/sku', (req, res, next) => {
  rsmqClient.receiveMessage({qname: 'sku'}, (err, resp) => {
    if (resp.id) {
      res.json({sku: resp.message})
    } else {
      res.json({sku: 't_porsche'})
    }
  })
})

// Notify all other services that an object has been added to the basket
app.post('/basket', (req, res, next) => {
  rsmqClient.sendMessage({qname: 'basket', message: req.body.basketCount}, (err, resp) => {
    if (resp) {
      res.json({msgstatus: 'sent', msgid: resp})
    } else {
      res.json({msgstatus: 'not sent'})
    }
  })
})

app.listen(3001)

console.log(`🔵 basket running. fragments are available here:
>> http://127.0.0.1:3001/cf-basket-buy
>> http://127.0.0.1:3001/cf-basket-basket
`)