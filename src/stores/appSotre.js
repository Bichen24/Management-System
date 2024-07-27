import { getItem } from '@/utils/storage'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Lang } from '@/constant/index.js'
export const useAppStore = defineStore('app', () => {
    const openIcon = ref(true)
    const Language = ref(getItem(Lang) || 'zh')
    return { openIcon, Language }
})
