import React from 'react'
import renderFunc from './render'

class BasketBasket extends React.Component {
  constructor(props) {
    super(props)

    this.log = this.log.bind(this)
  }

  componentDidMount() {
    this.log('connected')
  }

  componentWillUnmount() {
    this.log('disconnected')
  }

  log(...args) {
    console.log('🛒 basket-basket', ...args)
  }

  render () {
    return renderFunc(window.basket.count)
  }
}

export default BasketBasket
