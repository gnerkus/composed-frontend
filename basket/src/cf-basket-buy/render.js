import React from 'react'

const prices = {
  t_porsche: '66,00 €',
  t_fendt: '54,00 €',
  t_eicher: '58,00 €'
}

function defaultClickHandler () {
  console.log('default click handler')
}

export default function renderBuy(sku = 't_porsche', clickHandler = defaultClickHandler) {
  const price = prices[sku]
  return React.createElement(
    'button',
    {
      type: 'button',
      onClick: clickHandler
    },
    `buy for ${price}`
  )
}
