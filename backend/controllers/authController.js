const asyncHandler = require('express-async-handler')
const userModel = require('../models/User')
const Response = require('../utils/Response')
const ErrorResponse = require('../utils/ErrorResponse')
const setTokenAndSendResponse = require('../utils/setTokenAndSendResponse')

/* POST | Register new User */
module.exports.registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body
    const user = await userModel.create({
      firstname,
      lastname,
      email,
      password,
    })
    if (user) {
      setTokenAndSendResponse(200, user, 'User successfully created!', res)
    } else {
      res
        .status(400)
        .json(
          new Response(
            false,
            'Problem occured while trying to register new user'
          )
        )
    }
  } catch (e) {
    console.log(e)
    res
      .status(400)
      .json(
        new ErrorResponse(
          false,
          'Problem occured while trying to register new user',
          e
        )
      )
  }
})

/* POST | Login User */
module.exports.loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email) {
      res.status(400).send(new Response(false, 'Email required'))
    }

    if (!password) {
      res.status(400).send(new Response(false, 'Password required'))
    }

    const user = await userModel.findOne({ email }).select('+password')

    if (!user) {
      res.status(401).send(new Response(false, 'User not found'))
    } else {
      const passwordMatch = await user.checkPassword(password)

      if (!passwordMatch) {
        res
          .status(401)
          .send(
            new Response(false, "Invalid credentials: [Password doesn't match]")
          )
      } else {
        setTokenAndSendResponse(200, user, 'Credentials are valid', res)
      }
    }
  } catch (e) {
    console.log()
    res
      .status(400)
      .json(
        new ErrorResponse(
          false,
          'Problem occured while trying to login user',
          e
        )
      )
  }
})
