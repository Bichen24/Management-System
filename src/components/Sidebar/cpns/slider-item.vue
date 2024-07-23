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
console.log(props.data)
const hasChildren = computed(() => {
    if (JSON.stringify(item.meta) === '{}' && item.redirect) {
        item = item.children[0]
        return false
    }
    return props.data.item.children.length > 1
})
</script>

<template>
    <!-- 子集 menu 菜单 -->
    <el-sub-menu v-if="hasChildren" :index="index">
        <template #title>
            <el-menu-item :title="item.meta.title">
                <svg-icon :icon="item.meta.icon"></svg-icon>
                {{ item.meta.title }}
            </el-menu-item>
        </template>
        <el-menu-item
            v-for="(j, cindex) in item.children"
            :index="index + '-' + cindex"
            :key="j.path"
        >
            <svg-icon class="icon" :icon="j.meta.icon"></svg-icon>
            <router-link :to="j.path">
                {{ j.meta.title }}
            </router-link>
        </el-menu-item>
    </el-sub-menu>
    <!-- 具体菜单项 -->
    <el-menu-item v-else :index="index">
        <template #title>
            <router-link :to="item.path">
                <menu-item :title="item.meta.title" :icon="item.meta.icon">
                    <svg-icon :icon="item.meta.icon"></svg-icon>
                    {{ item.meta.title }}
                </menu-item>
            </router-link>
        </template>
    </el-menu-item>
</template>

<style lang="scss" scoped>
:deep(.icon) {
    transform: translate(-10px);
    fill: #fff !important;
}
</style>
