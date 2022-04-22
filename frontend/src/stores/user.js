import axios from 'axios'
import { defineStore } from 'pinia'
import { useRouter, useRoute } from 'vue-router'

export const userStore = defineStore('user', {
  state: () => ({
    user: {},
    slug: '',
    url: '',
    loggedUser: false,
    success: null,
    message: null,
    token: null,
  }),
  actions: {
    //Register user
    async registerUser(firstname, lastname, email, password) {
      const res = await axios
        .post(
          'http://localhost:5000/api/v1/auth/register',
          {
            firstname,
            lastname,
            email,
            password,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          this.slug = res.data.data.slug
          localStorage.setItem('loggedUser', true)
        })
    },
    //Login user
    async loginUser(email, password) {
      const res = await axios
        .post(
          'http://localhost:5000/api/v1/auth/login',
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          this.slug = res.data.data.slug
          localStorage.setItem('loggedUser', true)
        })
    },
    //Logout user
    async logout() {
      const res = await axios.get('http://localhost:5000/api/v1/user/logout', {
        withCredentials: true,
      })
      this.loggedUser = false
      this.user = {}
      this.success = null
      this.message = null
      this.token = null
      localStorage.removeItem('loggedUser')
    },
    //Upload avatar photo
    async uploadPhoto(image) {
      const formData = new FormData()
      formData.append('avatar', image)
      const res = await axios
        .put('http://localhost:5000/api/v1/user/upload-photo', formData, {
          headers: {
            'Content-Type':
              'multipart/form-data;boundary=<calculated when request is sent>',
          },
          withCredentials: true,
        })
        .then((res) => {
          this.url = res.data.data
        })
    },
    //Get currently logged user
    async getLoggedUser() {
      const router = useRouter()
      const route = useRoute()
      const res = await axios
        .get('http://localhost:5000/api/v1/user/logged-user', {
          withCredentials: true,
        })
        .then((res) => {
          this.success = res.data.success
          this.message = res.data.message
          this.user = res.data.data
          this.loggedUser = true
          this.token = res.data.token
        })
        .then(() => {
          if (
            this.success === null ||
            this.success === false ||
            this.message === null ||
            this.message !== 'User authenticated successfully!' ||
            this.token === null ||
            route.params.slug !== this.user.slug
          ) {
            router.push('/')
          }
          if (this.user.darkMode === true) {
            document.querySelector('body').classList.add('darkMode')
            document.querySelector('#header').classList.remove('bg-cyan-8')
            document.querySelector('#header').classList.add('bg-purple-7')
          } else {
            document.querySelector('body').classList.remove('darkMode')
            document.querySelector('#header').classList.remove('bg-purple-7')
            document.querySelector('#header').classList.add('bg-cyan-8')
          }
        })
    },
    //Check credentials for currently logged user
    checkCredentials() {
      if (
        !Object.keys(localStorage).includes('loggedUser') ||
        localStorage.getItem('loggedUser') === false ||
        document.cookie === '' ||
        document.cookie.split('=')[0] !== 'token' ||
        document.cookie.split('=')[1] === '' ||
        document.cookie.split('=')[1] !== this.token
      ) {
        return false
      }
    },
    //Dark Mode switch
    async darkModeSwitch() {
      await axios
        .put(
          'http://localhost:5000/api/v1/user/dark-mode',
          { darkMode: !this.user.darkMode },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          this.user.darkMode = !this.user.darkMode
          if (this.user.darkMode === true) {
            document.querySelector('body').classList.add('darkMode')
            document.querySelector('#header').classList.remove('bg-cyan-8')
            document.querySelector('#header').classList.add('bg-purple-7')
          } else {
            document.querySelector('body').classList.remove('darkMode')
            document.querySelector('#header').classList.remove('bg-purple-7')
            document.querySelector('#header').classList.add('bg-cyan-8')
          }
        })
    },
    //Delete user
    async deletUser() {
      await axios.delete('http://localhost:5000/api/v1/user/delete-user', {
        withCredentials: true,
      })
      this.loggedUser = false
      this.user = {}
      this.success = null
      this.message = null
      this.slug = null
      this.token = null
      localStorage.removeItem('loggedUser')
    },
  },
})
