const asyncHandler = require('express-async-handler')
const UserModel = require('../models/User')
const Response = require('../utils/Response')
const jwt = require('jsonwebtoken')

const protectRoute = asyncHandler(async (req, res, next) => {
  if (!req.cookies.token) {
    res
      .status(401)
      .send(new Response(false, 'Not authorized to access this route!'))
  }

  try {
    const decodeToken = await jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET
    )
    req.user = await UserModel.findById(decodeToken.id)
    next()
  } catch (e) {
    res
      .status(401)
      .send(
        new Response(false, 'Not authorized to access this route!', e.message)
      )
  }
})

module.exports = protectRoute
