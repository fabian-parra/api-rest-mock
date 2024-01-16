import Endpoint from 'api-rest-mock/models/Endpoint'
import {getInputs} from 'api-rest-mock/inbound/console'
import http from 'http'
import {readFileSync} from 'node:fs'

const inputs = getInputs()

const file = inputs.config
const content = readFileSync(file, {encoding: 'utf8'})
const configs = JSON.parse(content)
const Endpoints = configs.map(config => new Endpoint(config))
Endpoints.forEach(endpoint => console.log(`Register: ${endpoint.method} ${endpoint.rawUrl}`))

const serverListener = (req, res) => {
  const headers = req.headers
  const method = req.method
  const host = req.headers?.host || 'localhost'
  const url = new URL(req.url, `http://${host}`)
  let data = ''

  req.on('data', chunk => data += chunk)
  req.on('end', () => {
    console.log(`[Request] ${method} -> ${url.toString()}`)
    const endpoint = Endpoints.find(endpoint => endpoint.match(url, method, data, headers))
    if(!!endpoint) {
      endpoint.process().then(({data, headers}) => {
        console.log(`[Response] ${endpoint.status}`)
        headers.forEach(([key, value]) => res.setHeader(key, value))
        res.writeHead(endpoint.status)
        res.end(data)
      })
    } else {
      console.log(`[Response] 404`)
      res.writeHead(404).end('Not Found')
    }
  })
}
const server = http.createServer(serverListener)
server.listen(inputs.port, inputs.host, () => {
  console.log(`\n\n\nServer up on http://${inputs.host}:${inputs.port}`)
})

const gracefullShutdown = () => {
  server.close(() => {
    console.log('Server down')
    process.exit(0)
  })
  setTimeout(() => {
    process.exit(0)
  }, 10000)
}

process.on('SIGTERM', gracefullShutdown)
process.on('SIGINT', gracefullShutdown)
