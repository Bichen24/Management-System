import 'normalize.css'
import '@/styles/index.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// 国际化处理
import i18n from '@/i18n'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { useAppStore } from './stores/appSotre'

//svgIcon
import 'virtual:svg-icons-register'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(i18n)
const appStore = useAppStore()
app.use(ElementPlus, {
    locale: appStore.Language === 'zh' ? zhCn : en
})
app.mount('#app')
