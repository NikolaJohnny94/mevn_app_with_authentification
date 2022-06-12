const asyncHandler = require('express-async-handler')
const taskModel = require('../models/Task')
const Response = require('../utils/Response')
const ErrorResponse = require('../utils/ErrorResponse')

//GET || Get all tasks by currently logged user
module.exports.getAllTasks = asyncHandler(async (req, res, next) => {
  try {
    const tasks = await taskModel.find({ user: req.user._id })
    if (tasks.length > 0) {
      res
        .status(200)
        .json(
          new Response(
            true,
            `Tasks for the user: ${req.user.firstname} ${req.user.lastname}, Id: ${req.user._id} successfully retrieved from the database!`,
            tasks
          )
        )
    } else {
      res
        .status(200)
        .json(
          new Response(
            true,
            `There are no tasks in the database for the user with the id: ${req.user.id}`,
            tasks
          )
        )
    }
  } catch (e) {
    console.log(e)
    res
      .status(400)
      .json(
        new Response(
          false,
          'Problem occured while trying to retrieve all tasks from the database',
          e
        )
      )
  }
})

//GET || Get single task by Id that belongs to currently logged user
module.exports.getTask = asyncHandler(async (req, res, next) => {
  try {
    const task = await taskModel.findById(req.params.id)
    if (task && req.user._id.toString() == task.user) {
      res
        .status(200)
        .json(
          new Response(
            true,
            `Task with id: ${task._id} from user: ${req.user._id} successfully retrieved from the database!`,
            task
          )
        )
    } else {
      res
        .status(400)
        .json(
          new Response(
            false,
            `Problem occured while trying to get task by id: ${req.params.id}`
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
          `Problem occured while trying to get task by id: ${req.params.id}`,
          e
        )
      )
  }
})

//POST || Create new task for the currently logged user
module.exports.createTask = asyncHandler(async (req, res, next) => {
  try {
    const { title, description, done } = req.body
    const task = await taskModel.create({
      title,
      description,
      done,
      user: req.user._id,
    })
    if (task) {
      res
        .status(200)
        .json(
          new Response(
            true,
            `Task for the user: ${req.user.firstname} ${req.user.lastname} with the id: ${req.user._id} was successfully created!`,
            task
          )
        )
    } else {
      res
        .status(400)
        .json(
          new Response(false, 'Problem occured while trying to create new task')
        )
    }
  } catch (e) {
    console.log(e)
    res
      .status(400)
      .json(
        new ErrorResponse(
          false,
          'Problem occured while trying to create new task',
          e
        )
      )
  }
})

//PUT || Update specific task for the currently logged user
module.exports.updateTask = asyncHandler(async (req, res, next) => {
  try {
    const { title, description, done } = req.body
    const task = await taskModel.findById(req.params.id)

    if (task && req.user._id.toString() == task.user) {
      await taskModel.updateOne(
        { _id: task.id },
        {
          title,
          description,
          done,
        }
      )
      res
        .status(200)
        .json(
          new Response(
            true,
            `Task with the id: ${req.params.id} for the user: ${req.user._id} is successfully updated!`,
            task
          )
        )
    } else {
      res
        .status(400)
        .json(
          new Response(
            false,
            `Problem occured while trying to update task by id: ${req.params.id}`
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
          `Problem occured while trying to update task by id: ${req.params.id}`,
          e
        )
      )
  }
})

//DELETE || DELETE specific task for the currently logged user
module.exports.deleteTask = asyncHandler(async (req, res, next) => {
  try {
    const task = await taskModel.findById(req.params.id)
    if (task && req.user._id.toString() == task.user) {
      await task.deleteOne()
      res
        .status(200)
        .send(
          new Response(
            true,
            `Task with id: ${req.params.id} for the user: ${req.user._id} is successfully updated!`
          )
        )
    } else {
      res
        .status(200)
        .send(
          new Response(
            false,
            `Problem occured while trying to delete task by id: ${req.params.id}`
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
          `Problem occured while trying to delete task by id: ${req.params.id}`,
          e
        )
      )
  }
})
