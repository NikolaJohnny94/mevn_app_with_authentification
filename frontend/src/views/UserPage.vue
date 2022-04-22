<template>
  <h1>Your tasks</h1>
  <div class="column items-center">
    <!-- Delete prompt dialog -->
    <Alert v-model="alert" title="Delete task ?" message="Are you sure that you want to delete task with id:"
      :taskId="currentTaskId" :yes_no_section="true" :showDeleteTaskAlert="true" @confirmDeletingTask="removeTasks" />

    <q-list bordered separator>
      <q-item v-for="task in tasks" :key="task._id" clickable v-ripple>
        <q-icon id="check_icon" v-if="task.done" name="check_circle" color="green" />
        <q-icon id="cancel_icon" v-else name="cancel" color="red" />
        <q-item-section>
          <q-item-label>{{ task.title }}</q-item-label>
          <q-item-label caption lines="2">{{ task.description }}</q-item-label>
          <q-item-label v-if="task.createdAt !== task.updatedAt" caption lines="2">
            <em>Updated at</em>
            : {{
              new Date(task.updatedAt).toLocaleString('en', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit',
              })
            }}
            <!-- :{{ task.updatedAt.split('T')[0] }} ({{
              task.updatedAt.split('T')[1].split('.')[0]
            }}) -->
          </q-item-label>
          <q-item-label v-else caption lines="2">
            <em>Created at</em> :
            {{
              new Date(task.createdAt).toLocaleString('en', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit',
              })
            }}
            <!-- : {{ task.createdAt.split('T')[0] }}:{{
              task.createdAt.split('T')[1].split('.')[0]
            }} -->
          </q-item-label>
        </q-item-section>

        <q-item-section id="item_section" side top>
          <router-link title="Edit task" :to="`/user/${user_store.user.slug}/edit-task/${task._id}`">
            <q-icon id="edit_icon" name="edit" />
          </router-link>

          <q-icon id="delete_icon" @click="showAlert(task._id)" name="delete" title="Delete task" />
        </q-item-section>
      </q-item>
    </q-list>
    <router-link :to="`/user/${user_store.user.slug}/add-task`">
      <q-icon id="add_task_icon" class="q-mx-auto" name="add_circle_outline" color="grey" />
    </router-link>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import { userStore } from '../stores/user'
import { taskStore } from '../stores/tasks'
import Alert from '../components/Alert.vue'
import router from '../router'
export default {
  components: {
    Alert
  },
  setup() {
    //User store initialization
    const user_store = userStore()

    //Task store initialization
    const task_store = taskStore()

    //Data
    const tasks = ref([])
    const alert = ref(false)
    const currentTaskId = ref(null)
    const darkMode = ref(false)

    //Destructuring from user's store
    const { getLoggedUser, checkCredentials } = user_store

    //Destructuring from tasks's store
    const { getTasks, deleteTask } = task_store

    //Get currently logged user
    const getUser = async () => {
      await getLoggedUser()

      //Check credentials for logged User
      if (checkCredentials() === false) {
        router.push('/')
      }

      await getTasks()
      tasks.value = task_store.tasks
    }

    //Get currently logged user along with users tasks
    getUser()

    //Check credentials for logged User
    if (checkCredentials() === false) {
      router.push('/')
    }

    //Show deleteUser alert
    const showAlert = (id) => {
      alert.value = true
      currentTaskId.value = id
    }

    //Remove task
    const removeTasks = async () => {
      await deleteTask(currentTaskId.value)
      tasks.value = tasks.value.filter(
        (task) => task._id !== currentTaskId.value
      )
    }

    //Watching for darkMode value changte
    watchEffect(() => {
      darkMode.value = user_store.user.darkMode
    })

    return {
      user_store,
      task_store,
      tasks,
      alert,
      currentTaskId,
      darkMode,
      removeTasks,
      showAlert,
    }
  },
}
</script>

<style scoped>
h1 {
  margin-top: 0;
  text-align: center;
  font-size: 42px;
}

a {
  text-decoration: none;
}

#item_section {
  display: flex !important;
  flex-direction: row !important;
  align-items: center;
}

#current_user_span {
  display: inline-block;
  margin-left: 3px;
  text-decoration: underline;
}

.q-icon {
  display: block !important;
}

.q-card__section {
  display: flex;
}

#warning_icon {
  font-size: 26px;
  margin-right: 10px;
  color: #fff;
}

#check_icon,
#cancel_icon {
  font-size: 32px;
  margin-right: 10px;
}

#add_task_icon {
  font-size: 56px !important;
  display: block;
  margin-top: 5px;
}

#edit_icon {
  color: #3c52b2;
  font-size: 30px;
}

#delete_icon {
  color: #cc0610;
  font-size: 30px;
}

#edit_icon:active,
#delete_icon:active {
  transform: scale(0.9);
}

.uploading-image {
  display: flex;
}
</style>
