export default class Response {
  constructor({data, file, headers}) {
    this.data = data
    this.file = file
    this.headers = headers
  }

  build() {
    if(!!this.data) {
      return {
        data: typeof this.data === 'string' ? this.data : JSON.stringify(this.data),
        headers: Object.entries(this.headers)
      } 
    }    
  }
}
