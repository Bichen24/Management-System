<script setup>
import MkEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { onMounted, ref, watch } from 'vue'
import { useAppStore } from '@/stores/appSotre'
import { watchLanguage } from '@/utils/i18n'
import { createCommit, updateCommit } from './commit'
const props = defineProps({
    title: { type: String, required: true },
    detail: {
        type: Object,
        default: () => ({})
    }
})
const emits = defineEmits(['onSuccess'])
const appStore = useAppStore()
let markdownBox = ref(null)
let mkEditor
const initEditor = () => {
    mkEditor = new MkEditor({
        el: markdownBox.value,
        height: '500px',
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        language: appStore.Language === 'en' ? 'en' : 'zh-CN'
    })
    mkEditor.getMarkdown()
}
onMounted(() => {
    initEditor()
    watch(
        () => props.detail,
        () => {
            if (JSON.stringify(props.detail) !== '{}') {
                mkEditor.setHTML(props.detail.content)
            }
        },
        { immediate: true }
    )
})
watchLanguage(() => {
    if (!markdownBox.value) return
    const str = mkEditor.getHTML()
    mkEditor.destroy()
    initEditor()
    mkEditor.setHTML(str)
})
// 提交文章
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()

const onSubmitClick = () => {
    if (JSON.stringify(props.detail) === '{}') {
        createCommit({ title: props.title, content: mkEditor.getHTML() }, () => {
            mkEditor.reset()
            ElMessage.success(i18n.t('msg.article.editorSuccess'))
            emits('onSuccess')
        })
    } else {
        console.log(1)
        updateCommit(
            {
                id: props.detail._id,
                title: props.title,
                content: mkEditor.getHTML()
            },
            () => {
                ElMessage.success(i18n.t('msg.article.editorSuccess'))
                mkEditor.reset()
                emits('onSuccess')
            }
        )
    }
}
</script>

<template>
    <div class="markdown-container">
        <!-- 渲染区 -->
        <div ref="markdownBox" id="markdown-box"></div>
        <div class="bottom">
            <el-button type="primary" @click="onSubmitClick">{{
                $t('msg.article.commit')
            }}</el-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.markdown-container {
    .bottom {
        margin-top: 20px;
        text-align: right;
    }
}
</style>
