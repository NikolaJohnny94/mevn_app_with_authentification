<template>
    <Alert v-model="loginAlert" title="Login error"
        message="Invalid login credentials! Please check your email and password!"
        :showLoginInvalidCredentialsAlert="true" />
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
import Alert from '../../components/Alert.vue'

export default {
    components: {
        Alert
    },
    setup() {
        //User store initialization
        const user_store = userStore()

        //Router initialization
        const router = useRouter()

        //Data
        const email = ref('')
        const password = ref('')
        const loginAlert = ref(false)

        //Destructuring
        const { loginUser } = user_store

        //Login user
        const onSubmit = async () => {
            try {
                await loginUser(email.value, password.value).then(() => router.push(`/user/${user_store.slug}`))
            } catch (e) {
                console.log(e)
                loginAlert.value = true
            }
        }

        return {
            email,
            password,
            loginAlert,
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