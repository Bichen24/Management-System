<template>
    <div class="article-create">
        <el-card>
            <el-input
                class="title-input"
                :placeholder="$t('msg.article.titlePlaceholder')"
                v-model="title"
                maxlength="20"
                clearable
            >
            </el-input>
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
                    <markdown
                        :title="title"
                        @onSuccess="onSuccess"
                        :detail="articleDetail"
                    ></markdown>
                </el-tab-pane>
                <el-tab-pane :label="$t('msg.article.richText')" name="editor">
                    <editor :title="title" @onSuccess="onSuccess" :detail="articleDetail"></editor>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
<script setup>
import { fetchArticleDetail } from '@/api/article'
import Editor from './cpns/Editor/index.vue'
import Markdown from './cpns/Markdown/index.vue'
import { onMounted, ref } from 'vue'
const props = defineProps({
    id: { type: String }
})
const activeName = ref('markdown')
const articleDetail = ref({})
const title = ref('')
const onSuccess = () => {
    title.value = ''
}
onMounted(async () => {
    if (props.id) {
        articleDetail.value = await fetchArticleDetail(props.id)
        title.value = articleDetail.value.title
    }
})
</script>
<style lang="scss" scoped>
.title-input {
    margin-bottom: 20px;
}
</style>
