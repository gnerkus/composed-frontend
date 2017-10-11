/* globals window */
import React from 'react'
import ReactDOM from 'react-dom'

import BasketBuy from './cf-basket-buy/BasketBuy'
import BasketBasket from './cf-basket-basket/BasketBasket'

ReactDOM.render(
  React.createElement(
    BasketBuy,
    null,
    null
  ),
  document.getElementById('buy')
)

ReactDOM.render(
  React.createElement(
    BasketBasket,
    null,
    null
  ),
  document.getElementById('basket')
)

window.basket = { count: 0 }
