/* eslint-disable no-use-before-define, no-console, class-methods-use-this */
/* globals HTMLElement, window, CustomEvent */
import render from './render';

class BlueBasket extends HTMLElement {
  // This is called when a custom element is added to the document
  connectedCallback() {
    this.refresh = this.refresh.bind(this);
    this.log('connected');
    this.render();
    window.addEventListener('basket:basket:changed', this.refresh);
  }
  refresh() {
    this.log('event recieved "basket:basket:changed"');
    this.render();
  }
  render() {
    this.innerHTML = render(window.blue.count);
  }
  // This is called when a custom element is removed from the document
  disconnectedCallback() {
    window.removeEventListener('basket:basket:changed', this.refresh);
    this.log('disconnected');
  }
  log(...args) {
    console.log('🛒 basket-basket', ...args);
  }
}

export default BlueBasket;