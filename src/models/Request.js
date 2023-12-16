export default class Request {
  constructor({body, queryString, headers}) {
    this.body = body
    this.queryString = queryString
    this.headers = headers
  }

  matchHeaders(headers) {
    return Object.entries(this.headers).reduce((isMatch, [reqHeader, reqValue]) => {
      const match = Object.entries(headers).find(([key, value]) => 
        !!key.match(new RegExp(reqHeader, 'i')) &&
        value === reqValue
      )
      return isMatch && !!match
    }, true)
  }

  matchData(url, data) {
    if(!!this.queryString) {
      const search = new URLSearchParams(url.search)
      const params = this.queryString.split('&').map(param => param.split('='))
      return params.map(([key, value]) => search.has(key, value)).every(Boolean)
    }
  }
}
