import { createI18n } from 'vue-i18n'
import mEnLocale from './en.js'
import mZhLocale from './zh.js'
import { getItem } from '@/utils/storage.js'
import { Lang } from '@/constant'

const messages = {
    en: {
        msg: {
            ...mEnLocale
        }
    },
    zh: {
        msg: {
            ...mZhLocale
        }
    }
}
const locale = getItem(Lang) || 'zh'

const i18n = createI18n({
    // 使用setup语法
    legacy: false,
    // 全局使用$T注入函数
    globalInjection: true,
    // 语言
    locale,
    messages
})

export default i18n
