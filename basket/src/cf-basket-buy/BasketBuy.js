import React from 'react'
import renderFunc from './render'

class BasketBuy extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sku: 't_porsche'
    }

    this.addToCart = this.addToCart.bind(this)
    this.log = this.log.bind(this)
  }

  componentDidMount() {
    const sku = this.state.sku
    this.log('connected', sku)
  }

  componentWillUnmount() {
    const sku = this.state.sku
    this.log('disconnected', sku)
  }

  componentWillUpdate(nextProps, nextState) {
    this.log('attributeChanged', 'sku', this.state.sku, nextState.sku)
  }

  addToCart () {
    window.basket.count += 1
    this.log('event sent "basket:basket:changed"')
    // Notify other components on the page that the basket
    // has changed.
    // This implementation might not work.
    // TODO: replace this with a Redux implementation
    this.dispatchEvent(new CustomEvent('basket:basket:changed', {
      bubbles: true
    }))
  }

  log (...args) {
    console.log('🔘 basket-buy', ...args)
  }

  render() {
    const sku = this.state.sku
    return renderFunc(sku, this.addToCart)
  }
}

export default BasketBuy
