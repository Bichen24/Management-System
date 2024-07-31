<template>
    <el-card>
        <el-table ref="tableRef" :data="articleList" border>
            <el-table-column :label="$t('msg.article.ranking')" prop="ranking"></el-table-column>
            <el-table-column :label="$t('msg.article.title')" prop="title"></el-table-column>
            <el-table-column :label="$t('msg.article.author')" prop="author"></el-table-column>
            <el-table-column :label="$t('msg.article.publicDate')" prop="publicDate">
            </el-table-column>
            <el-table-column :label="$t('msg.article.desc')" prop="desc"></el-table-column>
            <el-table-column :label="$t('msg.article.action')">
                <el-button type="primary" size="mini" @click="onShowClick(row)">{{
                    $t('msg.article.show')
                }}</el-button>
                <el-button type="danger" size="mini" @click="onRemoveClick(row)">{{
                    $t('msg.article.remove')
                }}</el-button>
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
</script>

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
