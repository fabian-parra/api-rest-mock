import { access, readFile, constants } from 'node:fs/promises'

export default class Response {
  constructor({data, file, headers}) {
    this.data = data
    this.file = file
    this.headers = headers
  }

  async build() {
    const headers = Object.entries(this.headers)
    if(!!this.data) {
      return {
        data: typeof this.data === 'string' ? this.data : JSON.stringify(this.data),
        headers 
      } 
    }    
    if(!!this.file) {
      try {
        await access(this.file, constants.R_OK)
        const data = await readFile(this.file, {encoding: 'utf8'})
        return {data, headers}
      } catch(error) {
        console.error(String(error))
      }
    }
    return { data: 'OK', headers}
  }
}
