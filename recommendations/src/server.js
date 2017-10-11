/* eslint-disable no-console */
import express from 'express'
import morgan from 'morgan'
import React from 'react'
import { renderToString } from 'react-dom/server'
import RecosRecos from './cf-recos-recos/RecosRecos'

const app = express()
app.use(morgan('dev'))

app.use('/recommendations/images', express.static('./images'))
app.use('/recommendations', express.static('./build'))

app.listen(3002)
console.log(`💚 recommendations running. fragments are available here:
>> http://127.0.0.1:3002/cf-recos-recos
`)
