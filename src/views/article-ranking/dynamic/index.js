import i18n from '@/i18n'
import { watchLanguage } from '@/utils/i18n'
import { ref, watch } from 'vue'
const t = i18n.global.t
const getTableData = () => [
    {
        prop: 'ranking',
        label: t('msg.article.ranking')
    },
    {
        prop: 'title',
        label: t('msg.article.title')
    },

    {
        prop: 'publicDate',
        label: t('msg.article.publicDate')
    },

    {
        prop: 'desc',
        label: t('msg.article.desc')
    },
    {
        prop: 'author',
        label: t('msg.article.author')
    },
    {
        prop: 'action',
        label: t('msg.article.action')
    }
]
export const selectedColumns = ref([])
export const tableColumns = ref([])
export const dynamicData = ref(getTableData())
dynamicData.value.forEach((item) => {
    selectedColumns.value.push(item.prop)
})
watchLanguage(() => {
    dynamicData.value = getTableData()
})
watch(
    selectedColumns,
    () => {
        tableColumns.value = dynamicData.value.filter((item) =>
            selectedColumns.value.includes(item.prop)
        )
    },
    {
        immediate: true
    }
)
