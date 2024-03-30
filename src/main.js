import './assets/base.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VeeValidate from '@/includes/validation'
import { auth } from './includes/firebase'
import Icon from './directives/icon'
import I18n from './includes/i18n'

import App from './App.vue'
import router from './router'

let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)

    app.use(createPinia())
    app.use(router)
    app.use(VeeValidate)
    app.use(I18n)
    app.directive('icon', Icon)

    app.mount('#app')
  }
})
