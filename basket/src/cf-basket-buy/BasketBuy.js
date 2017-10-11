import React from 'react'
import renderFunc from './render'
import API from './../services/api'

class BasketBuy extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sku: 't_porsche'
    }

    this.addToCart = this.addToCart.bind(this)
    this.updateBuyButton = this.updateBuyButton.bind(this)
    this.log = this.log.bind(this)
  }

  componentDidMount() {
    this.log('connected')
  }

  componentWillUnmount() {
    const sku = this.state.sku
    this.log('disconnected', sku)
  }

  componentWillUpdate(nextProps, nextState) {
    this.log('attributeChanged', 'sku', this.state.sku, nextState.sku)
  }

  // Update the text of the Buy button based on the sku
  // saved in the 'sku' message queue on Redis.
  // This is done in lieu of a worker process and should
  // be replaced by the worker process if implemented.
  updateBuyButton () {
    this.log('updating buy button...')
    API
    .getSKUFromMessageQueue()
    .then((res) => {
      this.log('current sku price received')
      this.setState({
        sku: res.sku
      })
    })
  }

  addToCart () {
    const currentCount = window.basketCount + 1
    // fetch the count stored in window.basketCount, increment it and post it
    this.log('updating current basket count in Redis...')
    API
    .postBasketToMessageQueue(currentCount)
    .then((res) => {
      this.log('basket updated')
    })
  }

  log (...args) {
    console.log('🔘 basket-buy', ...args)
  }

  render() {
    const sku = this.state.sku
    return renderFunc(sku, this.updateBuyButton, this.addToCart)
  }
}

export default BasketBuy
