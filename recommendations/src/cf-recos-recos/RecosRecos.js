import React from 'react'
import renderFunc from './render'
import API from './../services/api'

class RecosRecos extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      sku: 't_porsche'
    }

    this.updateRecommendations = this.updateRecommendations.bind(this)
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

  // Update the content of the recommendations sidebar based on the sku
  // saved in the 'sku' message queue on Redis.
  // This is done in lieu of a worker process and should
  // be replaced by the worker process if implemented.
  updateRecommendations () {
    this.log('updating...')
    API
    .getSKUFromMessageQueue()
    .then((res) => {
      this.log('current sku received')
      this.setState({
        sku: res.sku
      })
    })
  }

  log (...args) {
    console.log('🖼️ cf-recos-recos', ...args)
  }

  render() {
    const sku = this.state.sku
    return renderFunc(sku, this.updateRecommendations)
  }
}

export default RecosRecos
