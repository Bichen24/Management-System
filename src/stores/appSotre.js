import { getItem, setItem } from '@/utils/storage'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Lang, TAGS_VIEW } from '@/constant/index.js'
export const useAppStore = defineStore('app', () => {
    const openIcon = ref(true)
    const Language = ref(getItem(Lang) || 'zh')
    const tagsViewList = ref(getItem(TAGS_VIEW) || [])
    const whiteTagLists = ref(['/login', '/404', '/401'])

    const addTagsView = (tag) => {
        if (
            !tagsViewList.value.find((item) => {
                return item.path === tag.path
            })
        ) {
            tag.title = tagsViewList.value.push(tag)
            setItem(TAGS_VIEW, tagsViewList.value)
        }
    }
    const removeTagView = (index) => {
        tagsViewList.value.splice(index, 1)
        setItem(TAGS_VIEW, tagsViewList.value)
    }
    return {
        openIcon,
        Language,
        tagsViewList,
        addTagsView,
        whiteTagLists,
        removeTagView
    }
})
