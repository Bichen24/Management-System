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
// filter
import installFilter from '@/filters'
import installDirectives from '@/directives/index.js'
//svgIcon
import 'virtual:svg-icons-register'
//局部打印
import print from 'vue3-print-nb'
const pinia = createPinia()
const app = createApp(App)
installFilter(app)
app.use(pinia)
app.use(router)
app.use(i18n)
app.use(print)
installDirectives(app)
const appStore = useAppStore()
app.use(ElementPlus, {
    locale: appStore.Language === 'zh' ? zhCn : en
})
app.mount('#app')
