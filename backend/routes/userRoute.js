const express = require('express')
const router = express.Router()
const multer = require('multer')
const protectRoute = require('../middleware/auth')
const {
  getLoggedUser,
  logoutUser,
  uploadPhoto,
  darkModeSwitch,
  deleteUser,
} = require('../controllers/userController')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, 'Avatar' + '-' + uniqueSuffix + '.jpg')
  },
})

const upload = multer({ storage: storage, limits: { fileSize: 2000000 } })

router.put('/upload-photo', protectRoute, upload.single('avatar'), uploadPhoto)
router.get('/logged-user', protectRoute, getLoggedUser)
router.get('/logout', protectRoute, logoutUser)
router.put('/dark-mode', protectRoute, darkModeSwitch)
router.delete('/delete-user', protectRoute, deleteUser)

module.exports = router
