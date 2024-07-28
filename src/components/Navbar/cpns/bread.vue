<script setup>
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { generateTitle } from '@/utils/i18n.js'

const route = useRoute()
const breadcrumb = ref([])
watch(
    route,
    () => {
        breadcrumb.value = route.matched.filter((item) => {
            if (item.meta && item.meta.title) return true
        })
    },
    {
        immediate: true
    }
)
</script>

<template>
    <el-breadcrumb class="breadcrumb" id="guide-breadcrumb" separator="/">
        <el-breadcrumb-item
            v-for="(item, index) in breadcrumb"
            :key="item.path"
            :to="{ path: index === breadcrumb.length ? '' : item.path }"
        >
            {{ generateTitle(item.meta.title) }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<style lang="scss" scoped>
.breadcrumb {
    font-size: 20px;
}
</style>
