/* globals window */
// The catalog service renders the content from the other services
// (basket, recommendations).
import React from 'react'

import ProductOption from './ProductOption'

class Page extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sku: 't_porsche',
      name: 'Tractor',
      variants: [
        {
          sku: 't_porsche',
          color: 'red',
          name: 'Porsche-Diesel Master 419',
          image: '/catalog/images/tractor-red.jpg',
          thumb: '/catalog/images/tractor-red-thumb.jpg',
          price: '66,00 €',
        },
        {
          sku: 't_fendt',
          color: 'green',
          name: 'Fendt F20 Dieselroß',
          image: '/catalog/images/tractor-green.jpg',
          thumb: '/catalog/images/tractor-green-thumb.jpg',
          price: '54,00 €',
        },
        {
          sku: 't_eicher',
          color: 'blue',
          name: 'Eicher Diesel 215/16',
          image: '/catalog/images/tractor-blue.jpg',
          thumb: '/catalog/images/tractor-blue-thumb.jpg',
          price: '58,00 €',
        }
      ]
    }

    this.optionClick = props.optionClick
  }

  componentWillMount() {
    // if (window) {
    //   const sku = window.location.pathname.substr(1)
    //   this.setState({
    //     sku
    //   })
    // }
  }

  render() {
    const variant = this.state.variants.find(v => this.state.sku === v.sku)
    const noVariant = React.createElement(
      'pre',
      null,
      'no product found'
    )

    let renderResult = React.createElement(
      'div',
      null,
      [
        React.createElement(
          'h1',
          {id: 'catalog'},
          null
        ),
        '<!--#include virtual="/cf-basket-basket" -->',
        React.createElement(
          'div',
          {id: 'image'},
          React.createElement(
            'div',
            null,
            React.createElement(
              'img',
              {
                src: variant.image,
                alt: variant.name
              },
              null
            )
          )
        ),
        React.createElement(
          'h2',
          {id: 'name'},
          [
            this.state.name,
            React.createElement(
              'small',
              null,
              variant.name
            )
          ]
        ),
        React.createElement(
          'div',
          {id: 'options'},
          this.state.variants.map((variant) => {
            return React.createElement(
              ProductOption,
              {
                sku: this.state.sku,
                variant,
                optionClick: this.optionClick
              }
            )
          })
        ),
        '<!--#include virtual="/cf-basket-buy" -->',
        '<!--#include virtual="/cf-recos-recos" -->'
      ]
    )

    if (!variant) {
      renderResult = noVariant
    }

    return renderResult
  }
}

export default Page
