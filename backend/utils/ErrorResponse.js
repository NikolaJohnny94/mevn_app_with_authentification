class ErrorResponse {
  constructor(success, customMessage, error) {
    this.success = success
    this.customMessage = customMessage
    this.error = error
  }
}

module.exports = ErrorResponse
