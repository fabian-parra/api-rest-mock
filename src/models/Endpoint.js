import {setTimeout} from 'timers/promises'
import Request from 'api-rest-mock/models/Request'
import Response from 'api-rest-mock/models/Response'

export default class Endpoint {
  constructor({url, method, latency, status, request, response}) {
    this.rawUrl = url
    this.url = new RegExp(url)
    this.method = method
    this.latency = latency
    this.status = status
    this.request = new Request(request)
    this.response = new Response(response)
  }
  
  match(url, method, data, headers){
    const matchMethod = method === this.method
    const matchUrl = this.url.test(url.pathname) 
    return [
      matchMethod,
      matchUrl,
      this.request.matchHeaders(headers),
      this.request.matchData(url, data)
    ].every(Boolean)
  }

  async process() {
    const {data, headers} = await setTimeout(this.latency, this.response.build())
    return {data, headers}
  }
  
}
