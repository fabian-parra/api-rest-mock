import {describe, it} from 'node:test'
import assert from 'node:assert/strict'
import Request from 'api-rest-mock/models/Request'

describe('[Model] Request', () => {
  it('Should match headers with request model', () => {
    const request = new Request({
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const headers = {
      'content-type': 'application/json'
    }
    const match = request.matchHeaders(headers)
    assert.equal(match, true)
  }) 

  it('Should not match with request model', () => {
    const request = new Request({
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const headers = {
      'content-type': 'text/plain'
    }
    const match = request.matchHeaders(headers)
    assert.equal(match, false)
  })

  it('Should match data when exist queryString', () => {
    const request = new Request({
      queryString: 'a=1&b=2'
    })
    const url = new URL('http://localhost:8883/path/to/api?a=1&b=2')
    const match = request.matchData(url)
    assert.equal(match, true)
  })

  it('Should match sub data when exist queryString', () => {
    const request = new Request({
      queryString: 'a=1&b=2'
    })
    const url = new URL('http://localhost:8883/path/to/api?c=3&a=1&d=4&b=2')
    const match = request.matchData(url)
    assert.equal(match, true)
  })

  it('Should not match data when exist queryString', () => {
    const request = new Request({
      queryString: 'a=1&c=2'
    })
    const url = new URL('http://localhost:8883/path/to/api?a=1&b=2')
    const match = request.matchData(url)
    assert.equal(match, false)
  })

  it.todo('Should match data when exist body')
})
