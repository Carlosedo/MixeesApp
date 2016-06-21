const querystring = require('querystring')


export default class APIClient {
  constructor(options=null) {
    this.API_HOST = 'http://localhost:8000/graphql/'
    this.REQUEST_OBJECT = {
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       }
    }

    if (options != null) {
      this.dispatch = options.dispatch
      this.getState = options.getState
    }
  }

  _serialize_get_params(get_params) {
    return encodeURIComponent(get_params)
  }

  _get_params_as_querystring(params=null) {
    if (params != null) {
      return `?query=${this._serialize_get_params(params)}`
    }

    return ''
  }

  async get(url, params) {
    console.log(params)
    let request_url = `${this.API_HOST}${url}${this._get_params_as_querystring(params)}`

    console.log(`GET: '${request_url}`)

    this.REQUEST_OBJECT['headers']['X-Requested-With'] = 'XMLHttpRequest'
    this.REQUEST_OBJECT['method'] = 'GET'
    delete this.REQUEST_OBJECT['body']

    let response = await fetch(request_url, this.REQUEST_OBJECT)

    return response
  }
}
