/* eslint-disable no-use-before-define */
const SERVER_URL = 'http://localhost:3000'

class API {
  static getSKUFromMessageQueue () {
    return fetch(`${SERVER_URL}/sku`, {
      method: 'put',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
  }
}

export default API
