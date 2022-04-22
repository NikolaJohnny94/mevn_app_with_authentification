import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/auth/Register.vue'
import Login from '../views/auth/Login.vue'
import AddTask from '../views/tasks/AddTask.vue'
import EditTask from '../views/tasks/EditTask.vue'
import Home from '../views/Home.vue'
import UserPage from '../views/UserPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/register-user',
      name: 'Register',
      component: Register,
    },
    {
      path: '/login-user',
      name: 'Login',
      component: Login,
    },
    {
      path: '/user/:slug',
      name: 'User',
      component: UserPage,
    },
    {
      path: '/user/:slug/add-task',
      name: 'Add Task',
      component: AddTask,
    },
    {
      path: '/user/:slug/edit-task/:id',
      name: 'Edit Task',
      component: EditTask,
    },
  ],
})

export default router
