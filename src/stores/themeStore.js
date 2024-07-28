// import { getActiveBgTheme, getTheme, getActiveTextTheme, getPrimaryTheme } from '@/utils/theme'
import { getPrimaryTheme } from '@/utils/theme'
import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useThemeStore = defineStore('theme', () => {
    // let theme = computed(() => getTheme())
    // let activeBgTheme = computed(() => getActiveBgTheme())
    // let activeTextTheme = computed(() => getActiveTextTheme())
    let primaryTheme = computed(() => getPrimaryTheme())
    return { primaryTheme }
})
