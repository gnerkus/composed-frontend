import React from 'react'

const recos = {
  t_porsche: ['3', '5', '6'],
  t_fendt: ['3', '6', '4'],
  t_eicher: ['1', '8', '7']
}

function defaultClickHandler () {
  console.log('default click handler')
}

export default function renderRecos(sku = 't_porsche', updateRecos = defaultClickHandler) {
  const reco = recos[sku] || []
  return React.createElement(
    'div',
    null,
    [
      React.createElement(
        'button',
        {
          type: 'button',
          onClick: updateRecos
        },
        'Update recommendations'
      )
    ].concat(
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
  )
}
