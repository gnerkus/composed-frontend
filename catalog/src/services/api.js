/* eslint-disable no-use-before-define */
const SERVER_URL = 'http://localhost:3000'

class API {
  static postSKUToMessageQueue (sku) {
    return fetch(`${SERVER_URL}/sku`, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sku: sku
      })
    })
    .then(res => res.json())
  }
}

export default API
