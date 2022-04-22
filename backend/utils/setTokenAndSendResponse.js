const ResponseWithToken = require('./ResponseWithToken')

const setTokenAndSendResponse = (statusCode, user, message, res) => {
  const token = user.asignToken()

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .send(new ResponseWithToken(true, message, user, token))
}

module.exports = setTokenAndSendResponse
