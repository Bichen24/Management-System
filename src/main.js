import 'normalize.css'
import '@/styles/index.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
//svgIcon
import 'virtual:svg-icons-register'
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
