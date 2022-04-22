const asyncHandler = require('express-async-handler')
const userModel = require('../models/User')
const Response = require('../utils/Response')
const ResponseWithToken = require('../utils/ResponseWithToken')
const ErrorResponse = require('../utils/ErrorResponse')

/* GET | Get Currently Logged user */
module.exports.getLoggedUser = asyncHandler(async (req, res, next) => {
  try {
    res
      .status(200)
      .send(
        new ResponseWithToken(
          true,
          'User authenticated successfully!',
          req.user,
          req.cookies.token
        )
      )
  } catch (e) {
    console.log(e)
    res
      .status(400)
      .json(
        new ErrorResponse(
          false,
          'Problem occured while trying to get currently logged user!',
          e
        )
      )
  }
})

/* GET | Logout user */
module.exports.logoutUser = asyncHandler(async (req, res, next) => {
  try {
    res.clearCookie('token')
    res
      .status(200)
      .send(new Response(true, 'User loged out and cookie is cleared'))
  } catch (e) {
    console.log(e)
    res
      .status(400)
      .json(
        new ErrorResponse(
          false,
          `Problem occured while trying to logout user and clear cookie with token for user: ${req.user}`
        )
      )
  }
})

/* PUT | Upload photo */
module.exports.uploadPhoto = asyncHandler(async (req, res, next) => {
  try {
    await userModel.findByIdAndUpdate(req.user._id, {
      photo: req.file.filename,
    })
    res
      .status(200)
      .send(
        new Response(
          true,
          `Avatar picture successfully uploaded!`,
          `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/uploads/${req.file.filename}`
        )
      )
  } catch (e) {
    console.log(e)
    res
      .status(400)
      .json(
        new ErrorResponse(
          false,
          'Problem occured while trying to upload new picture for the currently logged user',
          e
        )
      )
  }
})

/* PUT | Dark Mode Switch */
module.exports.darkModeSwitch = asyncHandler(async (req, res, next) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    })
    if (user) {
      res
        .status(200)
        .json(new Response(true, `Dark mode set to ${user.darkMode}.`, user))
    } else {
      res
        .status(400)
        .json(
          new Response(
            false,
            'Problem occured while trying to update Dark Mode'
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
          'Problem occured while trying to update Dark Mode',
          e
        )
      )
  }
})

// DELETE | Delete Existing User
module.exports.deleteUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id)
    if (user) {
      await user.remove()
      res
        .status(200)
        .json(
          new Response(
            true,
            `User with the id: ${user._id} successfully deleted from the database!`
          )
        )
    } else {
      res
        .status(400)
        .json(
          new Response(
            false,
            `Unsucessfull deletion of the user: ${req.user.id} from the database!`
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
          `Problem occured while trying to delete user: ${req.user.id}`,
          e
        )
      )
  }
})
