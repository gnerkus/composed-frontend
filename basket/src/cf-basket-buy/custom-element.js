/* eslint-disable no-use-before-define, no-console, class-methods-use-this */
/* globals HTMLElement, window, CustomEvent */
import render from './render'

class BasketBuy extends HTMLElement {
  // These are the attributes that should be watched for changes
  // i.e sku
  static get observedAttributes() {
    return ['sku']
  }
  // This is called when a custom element is added to a document
  connectedCallback() {
    this.addToCart = this.addToCart.bind(this)
    const sku = this.getAttribute('sku')
    this.log('connected', sku)
    this.render()
    this.firstChild.addEventListener('click', this.addToCart)
  }
  addToCart() {
    window.basket.count += 1
    this.log('event sent "basket:basket:changed"')
    this.dispatchEvent(new CustomEvent('basket:basket:changed', {
      bubbles: true
    }))
  }
  render() {
    const sku = this.getAttribute('sku')
    this.innerHTML = render(sku)
  }
  // This is called when an observed attribute changes. i.e
  // when 'sku' changes
  attributeChangedCallback(attr, oldValue, newValue) {
    this.log('attributeChanged', attr, oldValue, newValue)
    this.render()
  }
  // This is called when a custom element is removed from the document
  disconnectedCallback() {
    this.firstChild.removeEventListener('click', this.addToCart)
    const sku = this.getAttribute('sku')
    this.log('disconnected', sku)
  }
  log(...args) {
    console.log('🔘 basket-buy', ...args)
  }
}

export default BasketBuy
