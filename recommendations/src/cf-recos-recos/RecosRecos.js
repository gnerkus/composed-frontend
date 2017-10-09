import React from 'react'
import renderFunc from './render'

class RecosRecos extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      sku: 't_porsche'
    }

    this.log = this.log.bind(this)
  }

  componentDidMount() {
    const sku = window.location.pathname.substr(1)
    this.log('connected', sku)
    this.setState({
      sku
    })
  }

  componentWillUnmount() {
    const sku = this.state.sku
    this.log('disconnected', sku)
  }

  componentWillUpdate(nextProps, nextState) {
    this.log('attributeChanged', 'sku', this.state.sku, nextState.sku)
  }

  log (...args) {
    console.log('🖼️ cf-recos-recos', ...args)
  }

  render() {
    const sku = this.state.sku
    return renderFunc(sku)
  }
}

export default RecosRecos
