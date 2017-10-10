import React from 'react'

const recos = {
  t_porsche: ['3', '5', '6'],
  t_fendt: ['3', '6', '4'],
  t_eicher: ['1', '8', '7']
}

export default function renderRecos(sku = 't_porsche') {
  const reco = recos[sku] || []
  return React.createElement(
    'div',
    null,
    reco.map(function(elemId) {
      return React.createElement(
        'img',
        {
          src: `./recommendations/images/reco_${elemId}.jpg`,
          alt: `Reco ${elemId}`
        }
      )
    })
  )
}
