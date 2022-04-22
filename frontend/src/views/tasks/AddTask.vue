<template>
    <h1>Add new task</h1>
    <div class="q-mx-auto" style="max-width: 400px">
        <q-form @submit="onSubmit" class="q-gutter-md" v-bind:class="{ 'darkMode': user_store.user.darkMode }">
            <q-input v-if="user_store.user.darkMode" color="purple" filled v-model="title" label="Title *"
                hint="Task title" lazy-rules :rules="[val => val && val.length > 0 || 'Please add task title']" />
            <q-input v-else filled v-model="title" label="Title *" hint="Task title" lazy-rules
                :rules="[val => val && val.length > 0 || 'Please add task title']" />
            <q-input v-if="user_store.user.darkMode" color="purple" filled type="text" v-model="description"
                label="Description *" hint="Task description" lazy-rules
                :rules="[val => val && val.length > 0 || 'Please add task description']" />
            <q-input v-else filled type="text" v-model="description" label="Description *" hint="Task description"
                lazy-rules :rules="[val => val && val.length > 0 || 'Please add task description']" />
            <div class="row justify-center">
                <q-btn label="Submit" type="submit" color="primary" />
            </div>
        </q-form>
    </div>
    <q-btn id="back_button" @click="router.go(-1)" color="negative">
        <q-icon name='arrow_back' title="Go back" />
    </q-btn>
</template>

<script>
import { onMounted, ref } from 'vue'
import { taskStore } from '../../stores/tasks'
import { useRouter } from 'vue-router'
import { userStore } from '../../stores/user'
export default {
    setup() {
        const user_store = userStore()
        const task_store = taskStore()
        const router = useRouter()
        const title = ref('')
        const description = ref('')

        //Destructuring
        const { checkCredentials } = user_store
        const { addTask } = task_store

        //Add task, if task is not created return to previous route
        const onSubmit = async () => {
            await addTask({ title: title.value, description: description.value }).then(() => {
                if (task_store.taskCreated) {
                    router.go(-1)
                }
            })
        }

        if (checkCredentials() === false) {
            router.push('/')
        }

        return {
            title,
            description,
            user_store,
            router,
            onSubmit
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

.darkMode {
    color: #fff !important;
}

#back_button {
    display: block;
    margin-top: 5%;
}
</style>