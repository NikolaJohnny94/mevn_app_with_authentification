<template>
    <h1>Edit task</h1>
    <div class="q-mx-auto" style="max-width: 400px">
        <q-form @submit="onSubmit" class="q-gutter-md" v-bind:class="{ 'darkMode': user_store.user.darkMode }">
            <!-- Task title in dark mode -->
            <q-input v-if="user_store.user.darkMode" color="purple" filled v-model="title" label="Title *"
                hint="Task title" lazy-rules :rules="[val => val && val.length > 0 || 'Please add task title']" />
            <!-- Task title in light mode -->
            <q-input v-else filled v-model="title" label="Title *" hint="Task title" lazy-rules
                :rules="[val => val && val.length > 0 || 'Please add task title']" />
            <!-- Task description in dark mode -->
            <q-input v-if="user_store.user.darkMode" color="purple" filled type="text" v-model="description"
                label="Description *" hint="Task description" lazy-rules
                :rules="[val => val && val.length > 0 || 'Please add task description']" />
            <!-- Task description in light mode -->
            <q-input v-else filled type="text" v-model="description" label="Description *" hint="Task description"
                lazy-rules :rules="[val => val && val.length > 0 || 'Please add task description']" />
            <q-toggle v-model="done" label="Task is done" />
            <div class="row justify-center">
                <q-btn class="display" label="Submit" type="submit" color="primary" />
            </div>
        </q-form>
    </div>
    <q-btn id="back_button" @click="router.go(-1)" color="negative">
        <q-icon name='arrow_back' title="Go back" />
    </q-btn>
</template>

<script>
import { onBeforeMount, ref } from 'vue'
import { taskStore } from '../../stores/tasks'
import { useRoute, useRouter } from 'vue-router'
import { userStore } from '../../stores/user'
export default {
    name: 'Edit Task',
    setup() {
        const user_store = userStore()
        const router = useRouter()
        const route = useRoute()
        const title = ref('')
        const description = ref('')
        const done = ref('')
        const task_store = taskStore()

        //Destructuring
        const { checkCredentials } = user_store
        const { getTask, updateTask } = task_store

        onBeforeMount(async () => {
            await getTask(route.params.id)
            title.value = task_store.currentTask.title
            description.value = task_store.currentTask.description, done.value = task_store.currentTask.done
        })

        const onSubmit = async () => {
            await updateTask(route.params.id, { title: title.value, description: description.value, done: done.value })
            if (task_store.taskUpdated) {
                router.go(-1)
            }
        }

        if (checkCredentials() === false) {
            router.push('/')
        }



        return {
            title,
            description,
            done,
            task_store,
            user_store,
            router,
            onSubmit,
        }
    }

}
</script>

<style scoped>
h1 {
    margin-top: 0;
    text-align: center;
    font-size: 42px;
}

#back_button {
    display: block;
    margin-top: 5%;
}
</style>