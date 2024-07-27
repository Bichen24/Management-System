<script setup>
import svgIcon from '@/components/svgIcon/index.vue'
import { useAppStore } from '@/stores/appSotre.js'
import { setItem } from '@/utils/storage'
import { Lang } from '@/constant/index.js'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

defineProps({
    effect: {
        type: String,
        default: 'dark',
        validator: function (value) {
            // 这个值必须匹配下列字符串中的一个
            return ['dark', 'light'].indexOf(value) !== -1
        }
    }
})
const appStore = useAppStore()
const i18n = useI18n()
const handleSetLanguage = (lang) => {
    appStore.Language = lang
    setItem(Lang, lang)
    i18n.locale.value = lang
    ElMessage('更新成功')
}
</script>

<template>
    <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
        <div>
            <el-tooltip content="国际化" :effect="effect">
                <svg-icon icon="language" />
            </el-tooltip>
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item :disabled="appStore.Language === 'zh'" command="zh">
                    中文
                </el-dropdown-item>
                <el-dropdown-item :disabled="appStore.Language === 'en'" command="en">
                    English
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<style lang="scss" scoped></style>
