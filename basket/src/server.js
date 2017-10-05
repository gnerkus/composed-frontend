/* eslint-disable no-console */
import express from 'express'
import morgan from 'morgan'
import renderBasket from './cf-basket-basket/render'
import renderBuy from './cf-basket-buy/render'

const app = express()
app.use(morgan('dev'))
app.use('/basket', express.static('./build'))

app.use('/cf-basket-buy', (req, res) => {
  res.send(renderBuy())
})
app.use('/cf-basket-basket', (req, res) => {
  res.send(renderBasket(0))
})

app.listen(3001)

console.log(`🔵 basket running. fragments are available here:
>> http://127.0.0.1:3001/cf-basket-buy
>> http://127.0.0.1:3001/cf-basket-basket
`)