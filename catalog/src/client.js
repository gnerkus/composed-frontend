/* globals document, window */
/* eslint-disable no-use-before-define */
import React from 'react'
import ReactDOM from 'react-dom'
import Page from './page/Page'

// Update the app's URL when an item has been clicked.
// This is to indicate it has been selected.
function handleClickOption(e) {
  e.preventDefault()
  const sku = e.target.getAttribute('data-sku')
  window.history.pushState(null, null, sku)
}

// ReactDOM render will be done here
window.onload = () => {
  ReactDOM.render(
    React.createElement(
      Page,
      {
        optionClick: handleClickOption
      },
      null
    ),
    document.getElementById('app')
  )
}