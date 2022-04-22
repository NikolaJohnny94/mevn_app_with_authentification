const Response = require('./Response')

class ResponseWithToken extends Response {
  constructor(success, message, data, token) {
    super(success, message, data)
    this.token = token
  }
}

module.exports = ResponseWithToken
