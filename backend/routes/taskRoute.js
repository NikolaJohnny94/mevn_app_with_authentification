const express = require('express')
const router = express.Router()
const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController')
const protectRoute = require('../middleware/auth')

router.get('/tasks', protectRoute, getAllTasks)
router.get('/tasks/:id', protectRoute, getTask)
router.post('/tasks', protectRoute, createTask)
router.put('/tasks/:id', protectRoute, updateTask)
router.delete('/tasks/:id', protectRoute, deleteTask)

module.exports = router
