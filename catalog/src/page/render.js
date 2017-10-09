
// The catalog service renders the content from the other services
// (basket, recommendations).
export default function renderPage(sku = 't_porsche') {
  const variant = product.variants.find(v => sku === v.sku)
  if (!variant) { return '<pre>no product not found</pre>' }
  return `
    <h1 id="catalog">Catalog</h1>
    <cf-basket-basket id="basket"><!--#include virtual="/cf-basket-basket" --></cf-basket-basket>
    <div id="image"><div><img src="${variant.image}" alt="${variant.name}" /></div></div>
    <h2 id="name">${product.name} <small>${variant.name}</small></h2>
    <div id="options">${product.variants.map(v => renderOption(v, sku)).join('')}</div>
    <cf-basket-buy id="buy" sku="${variant.sku}"><!--#include virtual="/cf-basket-buy?sku=${encodeURIComponent(variant.sku)}" --></cf-basket-buy>
    <cf-recos-recos id="reco" sku="${variant.sku}"><!--#include virtual="/cf-recos-recos?sku=${encodeURIComponent(variant.sku)}" --></cf-recos-recos>
  `
}

import React from 'react'

import Option from './Option'

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

    this.optionClick = props.optionClick.bind(this)
  }

  componentWillMount() {
    const sku = window.location.pathname.substr(1)
    this.setState({
      sku
    })
  }

  render() {
    const variant = this.state.variants.find(v => this.state.sku === v.sku)
    const noVariant = React.createElement(
      'pre',
      null,
      'no product found'
    )

    const renderResult = React.createElement(
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
              Option,
              {
                sku: this.state.sku,
                variant
              }
            )
          })
        ),
        
      ]
      
    )

    if (!variant) {
      renderResult = noVariant
    }

    return renderResult
  }
}

export default Page

    <cf-basket-buy id="buy" sku="${variant.sku}"><!--#include virtual="/cf-basket-buy?sku=${encodeURIComponent(variant.sku)}" --></cf-basket-buy>
    <cf-recos-recos id="reco" sku="${variant.sku}"><!--#include virtual="/cf-recos-recos?sku=${encodeURIComponent(variant.sku)}" --></cf-recos-recos>
