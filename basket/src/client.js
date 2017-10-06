/* globals window */
import BasketBasket from './cf-basket-basket/custom-element'
import BasketBuy form './cf-basket-buy/custom-element'

window.basket = { count: 0 }
window.customElements.define('cf-basket-basket', BasketBasket)
window.customElements.define('cf-basket-buy', BasketBuy)
