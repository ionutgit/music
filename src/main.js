import './assets/base.css'
import './assets/main.css'
import 'nprogress/nprogress.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VeeValidate from '@/includes/validation'
import { auth } from './includes/firebase'
import Icon from './directives/icon'
import I18n from './includes/i18n'
import { registerSW } from "virtual:pwa-register"
import GlobalComponents from "./includes/_globals"
import progressBar from './includes/progress-bar'

import App from './App.vue'
import router from './router'

registerSW({ immediate: true })

progressBar(router);

let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)

    app.use(createPinia())
    app.use(router)
    app.use(VeeValidate)
    app.use(I18n)
    app.use(GlobalComponents)
    app.directive('icon', Icon)

    app.mount('#app')
  }
})
