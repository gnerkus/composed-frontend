import React from 'react'
import renderFunc from './render'
import API from './../services/api'

class BasketBasket extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      basketCount: 0
    }

    this.updateBasket = this.updateBasket.bind(this)
    this.log = this.log.bind(this)
  }

  componentDidMount() {
    this.log('connected')
  }

  componentWillUnmount() {
    this.log('disconnected')
  }

  // Update the count of items in the basket based on the value
  // of basketCount saved in the 'basket' message queue on Redis.
  // This is done in lieu of a worker process and should
  // be replaced by the worker process if implemented.
  updateBasket() {
    this.log('updating basket...')
    API
    .getBasketFromMessageQueue()
    .then((res) => {
      this.log('current basket count received')
      window.basketCount = res.count
      this.setState({
        basketCount: res.count
      })
    })
  }

  log(...args) {
    console.log('🛒 cf-basket-basket', ...args)
  }

  render () {
    return renderFunc(this.state.basketCount, this.updateBasket)
  }
}

export default BasketBasket
