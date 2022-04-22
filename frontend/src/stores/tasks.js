import axios from 'axios'
import { defineStore } from 'pinia'

export const taskStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    taskCreated: false,
    taskUpdated: false,
    currentTask: {},
  }),
  actions: {
    //Get all users tasks
    async getTasks() {
      const res = await axios
        .get('http://localhost:5000/api/v1/task/tasks', {
          withCredentials: true,
        })
        .then((res) => (this.tasks = res.data.data))
    },
    //Get specific task by ID
    async getTask(id) {
      const res = await axios.get(
        `http://localhost:5000/api/v1/task/tasks/${id}`,
        { withCredentials: true }
      )
      this.currentTask = res.data.data
    },
    //Add new task
    async addTask(passedData) {
      const res = await axios
        .post('http://localhost:5000/api/v1/task/tasks', passedData, {
          withCredentials: true,
        })
        .then((res) => (this.taskCreated = res.data.success))
    },
    //Update existing task
    async updateTask(id, passedData) {
      const res = await axios
        .put(`http://localhost:5000/api/v1/task/tasks/${id}`, passedData, {
          withCredentials: true,
        })
        .then((res) => (this.taskUpdated = res.data.success))
    },
    //Delete task
    async deleteTask(id) {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/task/tasks/${id}`,
        { withCredentials: true }
      )
    },
  },
})
