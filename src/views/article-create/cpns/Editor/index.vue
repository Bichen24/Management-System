<script setup>
import { onMounted, ref, watch } from 'vue'
import E from 'wangeditor'
import i18next from 'i18next'
import { useAppStore } from '@/stores/appSotre'
import { createCommit, updateCommit } from '../Markdown/commit'
const appSotre = useAppStore()
const editorBox = ref(null)
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    detail: {
        type: Object,
        default: () => ({})
    }
})
const emits = defineEmits(['onSuccess'])
let editor
onMounted(() => {
    initEditor()
    watch(
        () => props.detail,
        (val) => {
            editor.txt.html(val.content)
        },
        {
            immediate: true
        }
    )
})
const initEditor = () => {
    editor = new E(editorBox.value)
    editor.config.zIndex = 1
    // 菜单栏提示
    editor.config.showMenuTooltips = true
    //提示位置
    editor.config.menuTooltipPosition = 'down'
    // 国际化相关处理
    editor.config.lang = appSotre.Language === 'zh' ? 'zh-CN' : 'en'
    editor.i18next = i18next
    editor.create()
}
const onSubmitClick = async () => {
    if (props.detail && props.detail.id) {
        await updateCommit({
            id: props.detail.id,
            title: props.title,
            content: editor.txt.html()
        })
    } else {
        await createCommit({
            title: props.title,
            content: editor.txt.html()
        })
    }
    editor.txt.html('')
    emits('onSuccess')
}
</script>

<template>
    <div class="editorBox-container">
        <!-- 渲染区 -->
        <div ref="editorBox"></div>
        <div class="bottom">
            <el-button type="primary" @click="onSubmitClick">{{
                $t('msg.article.commit')
            }}</el-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.editorBox-container {
    .bottom {
        margin-top: 20px;
        text-align: right;
    }
}
</style>
