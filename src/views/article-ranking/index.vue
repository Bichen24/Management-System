<script setup>
import { fetchArticleList, removeArticle } from '@/api/article'
import { watchLanguage } from '@/utils/i18n'
import { onActivated, onMounted, ref } from 'vue'
const articleList = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(10)
const getArticleData = async () => {
    const res = await fetchArticleList({ page: page.value, size: size.value })
    articleList.value = res.list
    total.value = res.total
    console.log(articleList.value, total.value)
}
watchLanguage(getArticleData)
onActivated(() => {
    getArticleData()
})
const handleSizeChange = (currentSizes) => {
    size.value = currentSizes
    getArticleData()
}
const handleCurrentChange = (currentPage) => {
    page.value = currentPage
    getArticleData()
}
import { selectedColumns, tableColumns, dynamicData } from './dynamic'
import { initSortable, tableRef } from './sortable'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
onMounted(() => {
    initSortable(articleList, getArticleData)
})
const i18n = useI18n()
const onRemoveClick = (row) => {
    ElMessageBox.confirm(
        i18n.t('msg.article.dialogTitle1') + row.title + i18n.t('msg.article.dialogTitle2'),
        {
            type: 'warning'
        }
    ).then(async () => {
        try {
            await removeArticle(row._id)
            ElMessage.success(i18n.t('msg.article.removeSuccess'))
            getArticleData()
        } catch (err) {
            ElMessage.warning(i18n.t('msg.article.removeFail'))
        }
    })
}
const router = useRouter()
const onShowClick = (row) => {
    router.push(`/article/${row._id}`)
}
</script>
<template>
    <el-card class="header">
        <div class="dynamic-box">
            <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
            <el-checkbox-group v-model="selectedColumns">
                <el-checkbox v-for="(item, index) in dynamicData" :label="item.prop" :key="index">{{
                    item.label
                }}</el-checkbox>
            </el-checkbox-group>
        </div>
    </el-card>
    <el-card>
        <el-table ref="tableRef" :data="articleList" border>
            <el-table-column
                v-for="item in tableColumns"
                :key="item.prop"
                :prop="item.prop"
                :label="item.label"
            >
                <template v-if="item.prop === 'publicDate'" #default="{ row }">
                    {{ $filters.relativeTime(row.publicDate) }}
                </template>
                <template v-else-if="item.prop === 'action'" #default="{ row }">
                    <el-button type="primary" size="mini" @click="onShowClick(row)">{{
                        $t('msg.article.show')
                    }}</el-button>
                    <el-button type="danger" size="mini" @click="onRemoveClick(row)">{{
                        $t('msg.article.remove')
                    }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[2, 5, 10, 20]"
            :page-size="size"
            :current-page="page"
            :total="total"
            layout="prev, pager, next, jumper, total, sizes"
        >
        </el-pagination>
    </el-card>
</template>

<style lang="scss" scoped>
.article-ranking-container {
    .header {
        margin-bottom: 20px;
        .dynamic-box {
            display: flex;
            align-items: center;
            .title {
                margin-right: 20px;
                font-size: 14px;
                font-weight: bold;
            }
        }
    }

    :deep(.el-table__row) {
        cursor: pointer;
    }

    .pagination {
        margin-top: 20px;
        text-align: center;
    }
}
:deep(.sortable-ghost) {
    background-color: var(--primary-color);
    color: #fff;
    opacity: 0.6;
}
</style>
