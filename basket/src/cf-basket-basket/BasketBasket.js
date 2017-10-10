import React from 'react'
import renderFunc from './render'

class BasketBasket extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      basketCount: 0
    }

    this.log = this.log.bind(this)
  }

  componentDidMount() {
    this.setState({
      basketCount: window.basket.count
    })
    this.log('connected')
  }

  componentWillUnmount() {
    this.log('disconnected')
  }

  log(...args) {
    console.log('🛒 basket-basket', ...args)
  }

  render () {
    return renderFunc(this.state.basketCount)
  }
}

export default BasketBasket
