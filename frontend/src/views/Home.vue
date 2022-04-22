<template>
  <main>
    <div class="row justify-center q-my-xl">
      <q-img class="image" src="http://localhost:5000/images/mongodb.png" />
      <q-img class="image" src="http://localhost:5000/images/expressjs.png" />
      <q-img class="image" src="http://localhost:5000/images/vuejs.png" />
      <q-img class="image" src="http://localhost:5000/images/node.js.png" />
    </div>
  </main>
</template>

<script>
import { userStore } from '../stores/user'
import { useRouter } from 'vue-router'

export default {
  setup() {
    //User store initialization
    const user_store = userStore()

    //Router initialization
    const router = useRouter()

    //Destructuring
    const { getLoggedUser } = user_store

    //Get currently logged user and redirect to user's route
    const getCurrentUser = async () => {
      await getLoggedUser().then(() =>
        router.push(`/user/${user_store.user.slug}`)
      )
    }

    //If cookie exists get current logged user data else remove darkMode class if exists
    if (localStorage.getItem('loggedUser')) {
      getCurrentUser()
    } else {
      document.body.classList.remove('darkMode')
      document.querySelector('#header').classList.add('bg-cyan-8')
      document.querySelector('#header').classList.remove('bg-purple-7')
      console.log('There is no user currently logged in!')
    }
  },
}
</script>

<style scoped>
div {
  margin-top: 7%;
}

.image {
  width: 200px !important;
  height: 200px !important;
}
</style>
