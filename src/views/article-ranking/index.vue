<script setup>
import { fetchArticleList } from '@/api/article'
import { watchLanguage } from '@/utils/i18n'
import { onActivated, ref } from 'vue'
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
</style>
