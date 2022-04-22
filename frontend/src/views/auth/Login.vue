<template>
    <h1>Login</h1>
    <div class="q-mx-auto" style="max-width: 400px">
        <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input filled type="email" v-model="email" label="Your email *" hint="Email address" lazy-rules
                :rules="[val => val && val.length > 0 || 'Please type something']" />

            <q-input filled type="password" v-model="password" label="Password *" hint="Password" lazy-rules
                :rules="[val => val && val.length > 0 || 'Please type something']" />

            <div class="row justify-center">
                <q-btn label="Submit" type="submit" color="primary" />
            </div>
        </q-form>
    </div>
</template>

<script>
import { ref } from 'vue'
import { userStore } from '../../stores/user'
import { useRouter } from 'vue-router'

export default {
    setup() {
        //User store initialization
        const user_store = userStore()

        //Router initialization
        const router = useRouter()

        //Data
        const email = ref('')
        const password = ref('')

        //Destructuring
        const { loginUser } = user_store

        //Login user
        const onSubmit = async () => {
            await loginUser(email.value, password.value).then(() => router.push(`/user/${user_store.slug}`))
        }

        return {
            email,
            password,
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
</style>