<template>
  <div>
    <Alert v-model="fileSizeAlert" title="File size exceeded" message="Picture size must be less or equal" :fileSize="2"
      :showFileSizeAlert="fileSizeAlert" />

    <Alert v-model="deleteUserAlert" title="Delete user" message="Are you sure you want to delete user: "
      :yes_no_section="true" :userId="user_store.user._id" :showDeleteUserAlert="deleteUserAlert"
      @confirmDeletingUser="removeUser" />

    <q-layout view="lHh Lpr lff" container class="shadow-2 rounded-borders">
      <q-header id="header" elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title class="text-center">
            <span v-if="user_store.loggedUser">
              <q-icon @click="darkModeSwitch" v-if="!user_store.user.darkMode" id="dark_mode_icon" name="dark_mode" />
              <q-icon @click="darkModeSwitch" v-else id="light_mode_icon" name="light_mode" />
            </span>
            <q-img class="stack-logos" src="http://localhost:5000/images/mongodb.png" />
            <q-img class="stack-logos" src="http://localhost:5000/images/expressjs.png" />
            <span id="headerTitle">MEVN Web App</span>
            <q-img class="stack-logos" src="http://localhost:5000/images/vuejs.png" />
            <q-img class="stack-logos" src="http://localhost:5000/images/node.js.png" />
          </q-toolbar-title>
          <q-btn flat @click="drawerClosed = !drawerClosed" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawerClosed" show-if-above :width="200" :breakpoint="400">
        <q-scroll-area id="scrollarea" v-bind:class="{
          'bg-purple-7': user_store.user.darkMode,
          'bg-cyan-8': !user_store.user.darkMode,
        }">
          <q-list padding class="menu-list">
            <!-- Currently logged user -->
            <q-item v-if="user_store.user && user_store.loggedUser" active clickable v-ripple>
              <q-item-section avatar>
                <q-icon id="account_icon" name="account_circle" />
              </q-item-section>

              <q-item-section>
                <router-link id="account_text" :to="{ name: 'User', params: { slug: user_store.user.slug } }">{{
                    user_store.user.firstname
                }}</router-link>
              </q-item-section>
            </q-item>

            <!-- Register User -->
            <q-item v-else active clickable v-ripple>
              <q-item-section avatar>
                <q-icon id="register_icon" name="app_registration" />
              </q-item-section>

              <q-item-section>
                <router-link :to="{ name: 'Register' }">Register</router-link>
              </q-item-section>
            </q-item>

            <!-- Login -->
            <q-item v-if="!user_store.loggedUser" clickable v-ripple>
              <q-item-section avatar>
                <q-icon id="login_icon" name="login" />
              </q-item-section>

              <q-item-section>
                <router-link :to="{ name: 'Login' }">Login</router-link>
              </q-item-section>
            </q-item>

            <!-- Delete user -->
            <q-item v-if="user_store.loggedUser" clickable v-ripple>
              <q-item-section avatar>
                <q-icon id="logout_icon" name="person_remove" />
              </q-item-section>

              <q-item-section>
                <span id="logout_text" @click="deleteUserAlertDialog">Delete User</span>
              </q-item-section>
            </q-item>

            <!-- Logout -->
            <q-item v-if="user_store.loggedUser" clickable v-ripple>
              <q-item-section avatar>
                <q-icon id="logout_icon" name="logout" />
              </q-item-section>

              <q-item-section>
                <span id="logout_text" @click="logoutUser">Logout</span>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" v-bind:class="{ 'logged': user_store.loggedUser }"
          src="https://i.imgur.com/qXygq0Q.gif">
          <div class="absolute-bottom bg-transparent">
            <label for="avatar-select">
              <q-avatar size="56x" class="q-mb-sm" title="Add avatar image">
                <img v-if="user_store.loggedUser" :src="
            previewImage !== ''
              ? previewImage
              : user_store.user.photo === 'avatar.png'
                ? 'http://localhost:5000/images/avatar.png'
                : `http://localhost:5000/uploads/${user_store.user.photo}`" />
              </q-avatar>
            </label>
            <input id="avatar-select" type="file" name="avatar" @change="onSelect($event)" style="visibility: hidden" />
            <div v-if="user_store.user && user_store.loggedUser" class="users_info text-weight-bold">
              {{ user_store.user.firstname }} {{ user_store.user.lastname }}
            </div>
            <div class="users_info">{{ user_store.user.email }}</div>
          </div>
        </q-img>
      </q-drawer>
      <q-page-container>
        <q-page padding>
          <RouterView />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref } from 'vue'
import { userStore } from '../stores/user'
import { useRouter } from 'vue-router'
import Alert from './Alert.vue'

export default {
  components: {
    Alert,
  },
  setup() {
    const user_store = userStore()
    const router = useRouter()
    const drawerClosed = ref(false)
    const previewImage = ref('')
    const fileSizeAlert = ref(false)
    const deleteUserAlert = ref(false)

    //Destructuring from user store
    const {
      getLoggedUser,
      checkCredentials,
      uploadPhoto,
      logout,
      darkModeSwitch,
      deletUser,
    } = user_store

    //Get Currently logged user and check credential
    if (
      Object.keys(localStorage).includes('loggedUser') &&
      localStorage.getItem('loggedUser')
    ) {
      getLoggedUser()
      checkCredentials()
    }

    //Upload picture and show preview
    const onSelect = async (e) => {
      if (e.target.files[0].size <= 2000000) {
        await uploadPhoto(e.target.files[0])
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = (e) => {
          previewImage.value = e.target.result
        }
      } else {
        deleteUserAlert.value = false
        fileSizeAlert.value = true
      }
    }

    //Logout user
    const logoutUser = () => {
      logout()
      previewImage.value = ''
      setTimeout(() => {
        router.push('/')
      }, 100)
    }

    const deleteUserAlertDialog = () => {
      fileSizeAlert.value = false
      deleteUserAlert.value = true
    }

    const removeUser = () => {
      logout()
      deletUser()
      previewImage.value = ''
      setTimeout(() => {
        router.push('/')
      }, 100)
    }

    return {
      user_store,
      drawerClosed,
      previewImage,
      fileSizeAlert,
      deleteUserAlert,
      onSelect,
      logoutUser,
      darkModeSwitch,
      removeUser,
      deleteUserAlertDialog
    }
  },
}
</script>

<style scoped>
a {
  color: #fff;
  text-decoration: none !important;
}

.q-layout-container {
  height: 100vh;
}

.q-scrollarea {
  height: calc(100% - 150px);
  margin-top: 150px;
}

.q-img {
  height: 150px;
}

.q-avatar:active {
  transform: scale(0.9);
}

.stack-logos {
  width: 30px;
  height: 30px !important;
}

.stack-logos:nth-of-type(3) {
  width: 25px;
  height: 25px !important;
}

#headerTitle {
  display: inline-block;
  margin-left: 7px;
  margin-right: 5px;
}

#logout_text {
  color: #fff;
}

#dark_mode_icon {
  float: left;
  font-size: 32px;
  color: #ffd670;
}

#light_mode_icon {
  float: left;
  font-size: 32px;
  color: #ffd62a;
}

#register_icon,
#login_icon,
#account_icon,
#logout_icon {
  color: #1c138e !important;
}

#scrollarea {
  transition: color 0.5s, background-color 0.5s;
}

.users_info {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}
</style>
