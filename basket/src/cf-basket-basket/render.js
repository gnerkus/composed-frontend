import React from 'react'

export default function renderBasket(count) {
  const classname = count === 0 ? 'empty' : 'filled'
  return React.createElement(
    'div',
    {
      className: classname
    },
    `basket: ${count} item(s)`
  )
}
