/* eslint-disable no-console */
import express from 'express'
import morgan from 'morgan'
import RedisSMQ from 'rsmq'
import path from 'path'
import renderPage from './page/render'

const app = express()
const rsmqClient = new RedisSMQ({host: 'redis-data', port: 6379, ns: 'cf'})
app.use(morgan('dev'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/catalog/images', express.static('./images'))
app.use('/catalog', express.static('./build'))

// The catalog service is responsible for creating Redis queues.
rsmqClient.createQueue({qname: 'sku'}, (err, res) => {
  if (res === 1) {
    console.log('queue created')
  }
})

rsmqClient.createQueue({qname: 'basket'}, (err, res) => {
  if (res === 1) {
    console.log('queue created')
  }
})

app.get('/:sku?', (req, res) => {
  const sku = req.params.sku
  const html = renderPage(sku)

  res.render('layout', { html })
})

// Notify all other services that a tractor has been selected
app.post('/sku', (req, res, next) => {
  rsmqClient.sendMessage({qname: 'sku', message: req.body.sku}, (err, resp) => {
    if (resp) {
      res.json({msgstatus: 'sent', msgid: resp})
    } else {
      res.json({msgstatus: 'not sent'})
    }
  })
})

app.listen(3003);
console.log(`🔴  catalog running. product page is available here:
>> http://127.0.0.1:3003/`)
