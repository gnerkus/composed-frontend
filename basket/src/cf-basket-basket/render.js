import React from 'react'

function defaultClickHandler () {
  console.log('default click handler')
}

export default function renderBasket(count, updateBasket = defaultClickHandler) {
  const classname = count === 0 ? 'empty' : 'filled'
  return React.createElement(
    'div',
    null,
    [
      React.createElement(
        'button',
        {
          type: 'button',
          onClick: updateBasket
        },
        'Update basket'
      ),
      React.createElement(
        'div',
        {
          className: classname
        },
        `basket: ${count} item(s)`
      )
    ]
  )
}
