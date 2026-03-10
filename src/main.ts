import 'simplebar/dist/simplebar.min.css'
import 'simplebar'

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import b24UiPlugin from '@bitrix24/b24ui-nuxt/vue-plugin'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(b24UiPlugin)

app.mount('#app')
