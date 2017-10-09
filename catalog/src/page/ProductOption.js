import React from 'react'

class ProductOption extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const variant = this.props.variant
    const active = this.props.sku === variant.sku ? 'active' : ''

    return React.createElement(
      'a',
      {
        href: `/${variant.sku}`,
        className: active,
        type: 'button',
        'data-sku': variant.sku,
        onClick: this.props.optionClick
      },
      React.createElement(
        'img',
        {
          src: variant.thumb,
          alt: variant.name
        },
        null
      )
    )
  }
}

export default ProductOption
