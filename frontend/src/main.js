import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

createApp(App)
  .use(Quasar, quasarUserOptions)
  .use(createPinia())
  .use(router)
  .mount('#app')
