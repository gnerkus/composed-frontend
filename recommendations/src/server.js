/* eslint-disable no-console */
import express from 'express'
import morgan from 'morgan'
import renderRecos from './cf-recos-recos/render'

const app = express()
app.use(morgan('dev'))
app.use('/recommendations/images', express.static('./images'))
app.use('/recommendations', express.static('./build'))

app.use('/cf-recos-recos', (req, res) => {
  res.send(renderRecos(req.query.sku))
})

app.listen(3002)
console.log(`💚 recommendations running. fragments are available here:
>> http://127.0.0.1:3002/cf-recos-recos
`)