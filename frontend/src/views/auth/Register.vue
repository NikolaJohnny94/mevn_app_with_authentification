<template>
  <Alert
    v-model="registerAlert"
    title="Register user error"
    message="Error occured while trying to register new user!"
    :showRegisterInvalidCredentialsAlert="true"
  />
  <h1>Registration Form</h1>
  <div class="q-mx-auto" style="max-width: 400px">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        filled
        v-model="firstname"
        label="First Name *"
        hint="First Name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Firtsname is required']"
      />

      <q-input
        filled
        v-model="lastname"
        label="Last Name *"
        hint="Last Name "
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Last name is required']"
      />

      <q-input
        filled
        v-model="email"
        type="email"
        label="Email *"
        hint="Email "
        :rules="[(val) => (val && val.length > 0) || 'Email is required']"
      />

      <q-input
        filled
        v-model="password"
        type="password"
        label="Password *"
        hint="Password "
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Password is required',
          (val) =>
            (val && val.length >= 8) ||
            'Password must have at leas 8 characters',
        ]"
      />
      <q-input
        filled
        v-model="matchPassword"
        type="password"
        label="Confirm Password *"
        hint="Password "
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Please confirm password',
          (val) => (val && val == password) || 'Passwords must match',
        ]"
      />

      <div class="row justify-center">
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script>
  import { ref } from "vue";
  import { userStore } from "../../stores/user";
  import { useRouter } from "vue-router";
  import Alert from '../../components/Alert.vue'
  export default {
    components: {
      Alert,
    },
    setup() {
      //User store initialization
      const user_store = userStore();

      //Router initalization
      const router = useRouter();

      //Data
      const firstname = ref("");
      const lastname = ref("");
      const email = ref("");
      const password = ref("");
      const matchPassword = ref("");
      const registerAlert = ref(false);

      //Destructuring
      const { registerUser } = user_store;

      //Register user
      const onSubmit = async () => {
        try {
          await registerUser(
            firstname.value,
            lastname.value,
            email.value,
            password.value
          ).then(() => router.push(`/user/${user_store.slug}`));
        } catch (e) {
          registerAlert.value = true;
        }
      };

      return {
        firstname,
        lastname,
        email,
        password,
        matchPassword,
        registerAlert,
        onSubmit,
      };
    },
  };
</script>

<style scoped>
h1 {
  margin-top: 0;
  text-align: center;
  font-size: 42px;
}
</style>
