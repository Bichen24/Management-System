import i18n from '@/i18n/index.js'
import { useAppStore } from '@/stores/appSotre'
import { watch } from 'vue'

export function generateTitle(title) {
    return i18n.global.t('msg.route.' + title)
}
export function watchLanguage(...fns) {
    const appStore = useAppStore()
    watch(
        () => appStore.Language,
        () => {
            fns.forEach((fn) => fn())
        },
        { immediate: true }
    )
}
