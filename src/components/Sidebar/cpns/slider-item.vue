<script setup>
import { computed } from 'vue'

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})
let { item, index } = props.data
index = index + 1
const hasChildren = computed(() => {
    if (JSON.stringify(item.meta) === '{}' && item.redirect) {
        item = item.children[0]
        return false
    }
    return props.data.item.children.length > 1
})

const emits = defineEmits(['getActiveIndex'])
const itemClick = (index) => {
    emits('getActiveIndex', index)
}
import { generateTitle } from '@/utils/i18n'
</script>

<template>
    <!-- 子集 menu 菜单 -->
    <el-sub-menu v-if="hasChildren" :index="index">
        <template #title>
            <svg-icon :icon="item.meta.icon"></svg-icon>
            {{ generateTitle(item.meta.title) }}
        </template>
        <el-menu-item
            v-for="(j, cindex) in item.children"
            :index="index + '-' + cindex"
            :key="j.path"
            :route="j"
            @click="itemClick(index + '-' + cindex)"
        >
            <template #title>
                <svg-icon class="icon" :icon="j.meta.icon"></svg-icon>
                {{ generateTitle(j.meta.title) }}
            </template>
        </el-menu-item>
    </el-sub-menu>
    <!-- 具体菜单项 -->
    <el-menu-item v-else :index="index" :route="item" @click="itemClick(index)">
        <template #title>
            <svg-icon :icon="item.meta.icon"></svg-icon>
            {{ generateTitle(item.meta.title) }}
        </template>
    </el-menu-item>
</template>

<style lang="scss" scoped>
:deep(.icon) {
    transform: translateY(-2px);
    margin-right: 10px;
    fill: #fff !important;
}
</style>
