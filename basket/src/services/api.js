/* eslint-disable no-use-before-define */
const SERVER_URL = 'http://localhost:3000'

class API {
  static getSKUFromMessageQueue () {
    return fetch(`${SERVER_URL}/sku`, {
      method: 'get',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
  }

  static getBasketFromMessageQueue () {
    return fetch(`${SERVER_URL}/cart`, {
      method: 'get',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
  }

  static postBasketToMessageQueue (basketCount) {
    return fetch(`${SERVER_URL}/cart`, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        basketCount: basketCount
      })
    })
    .then(res => res.json())
  }
}

export default API
