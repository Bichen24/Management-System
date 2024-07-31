import { updateRanking } from '@/api/article'
import { ElMessage } from 'element-plus'
import Sortable from 'sortablejs'
import { ref } from 'vue'
import i18n from '@/i18n'
// 获取TableDom对象
export const tableRef = ref(null)
// 初始化sortable
export const initSortable = (tableData, updataDom) => {
    const el = tableRef.value.$el.querySelector('.el-table__body > tbody')
    Sortable.create(el, {
        // 被拖拽元素的类名
        ghostClass: 'sortable-ghost',
        // 拖拽结束后的回调
        async onEnd(e) {
            const { newIndex, oldIndex } = e
            await updateRanking({
                initRanking: tableData.value[oldIndex].ranking,
                finalRanking: tableData.value[newIndex].ranking
            })
            ElMessage.success({
                message: i18n.global.t('msg.article.sortSuccess'),
                type: 'success'
            })
            // 直接重新获取数据无法刷新 table！！
            tableData.value = []
            if (updataDom) updataDom()
        }
    })
}
