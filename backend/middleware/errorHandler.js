const errorHandler = (err, req, res, next) => {
  console.log(err.message)
  res
    .status(err.statusCode || 500)
    .json({ success: false, message: err.message, error: err })
}

module.exports = errorHandler
