const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a task title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  done: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true,
  },
})

taskSchema.set('timestamps', true)

const taskModel = mongoose.model('task', taskSchema)

module.exports = taskModel
