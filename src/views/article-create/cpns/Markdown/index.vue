<script setup>
import MkEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { onMounted, ref } from 'vue'
import { useAppStore } from '@/stores/appSotre'
import { watchLanguage } from '@/utils/i18n'
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
})
watchLanguage(() => {
    if (!markdownBox.value) return
    const str = mkEditor.getHTML()
    mkEditor.destroy()
    initEditor()
    mkEditor.setHTML(str)
})
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
