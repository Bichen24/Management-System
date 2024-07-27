import i18n from '@/i18n/index.js'
export function generateTitle(title) {
    return i18n.global.t('msg.route.' + title)
}
