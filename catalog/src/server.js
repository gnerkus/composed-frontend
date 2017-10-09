/* eslint-disable no-console */
import express from 'express'
import morgan from 'morgan'
import path from 'path'
import { renderString } from 'react-dom/server'
import Page from './page/Page'

const app = express()
app.use(morgan('dev'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/catalog/images', express.static('./images'))
app.use('/catalog', express.static('./build'))

app.get('/:sku?', (req, res) => {
  const sku = req.params.sku
  const content = renderToString(
    React.createElement(
      Page,
      {
        sku: req.params.sku
      },
      null
    )
  )

  res.render('layout', { content })
})

app.listen(3003);
console.log(`🔴  catalog running. product page is available here:
>> http://127.0.0.1:3003/`)
