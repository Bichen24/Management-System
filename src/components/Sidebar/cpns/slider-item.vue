<script setup>
import { computed, ref } from 'vue'
import { generateTitle } from '@/utils/i18n'

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})
const route = ref(props.data)
const hasChildren = computed(() => {
    if (props.data && JSON.stringify(props.data.meta) === '{}' && props.data.redirect) {
        route.value = props.data.children[0]
        return false
    }
    return props.data.children.length > 0
})
</script>

<template>
    <!-- 子集 menu 菜单 -->
    <el-sub-menu v-if="hasChildren" :index="route.path">
        <template #title>
            <svg-icon :icon="route.meta.icon"></svg-icon>
            {{ generateTitle(route.meta.title) }}
        </template>
        <el-menu-item v-for="j in route.children" :index="j.path" :key="j.path">
            <template #title>
                <svg-icon class="icon" :icon="j.meta.icon"></svg-icon>
                {{ generateTitle(j.meta.title) }}
            </template>
        </el-menu-item>
    </el-sub-menu>
    <!-- 具体菜单项 -->
    <el-menu-item v-else :index="route.path" :route="route">
        <template #title>
            <svg-icon :icon="route.meta.icon"></svg-icon>
            {{ generateTitle(route.meta.title) }}
        </template>
    </el-menu-item>
</template>

<style lang="scss" scoped>
:deep(.icon) {
    transform: translateY(-2px);
    margin-right: 10px;
    fill: var(--text-color);
}
:deep(.is-active .icon) {
    fill: #000;
}
.is-active[class*='el-menu-item'] .icon {
    fill: #000;
}
:deep(.el-sub-menu__title:hover),
.el-menu-item:hover {
    background-color: rgba($color: #000000, $alpha: 0.2) !important;
}
</style>
