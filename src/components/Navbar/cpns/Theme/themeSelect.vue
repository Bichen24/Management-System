<template>
    <el-dropdown v-bind="$attrs" trigger="click" class="theme" @command="handleSetTheme">
        <div>
            <el-tooltip :content="$t('msg.navBar.themeChange')">
                <svg-icon id="guide-theme" icon="change-theme" />
            </el-tooltip>
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="color">
                    {{ $t('msg.theme.themeColorChange') }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
    <!-- 展示弹出层 -->
    <div>
        <select-color v-model="selectColorVisible"></select-color>
    </div>
</template>

<script setup>
import SelectColor from './SelectColor.vue'
import { ref } from 'vue'

const selectColorVisible = ref(false)
const handleSetTheme = () => {
    selectColorVisible.value = true
}
</script>

<style lang="scss" scoped></style>
