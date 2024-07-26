<script setup>
import { useRouter } from 'vue-router'
import { clearChildrenRoute } from '@/utils/routesChange.js'
import slider from './cpns/slider.vue'
const router = useRouter()
// 获取路由
const allRoutes = router.getRoutes()
const menuList = clearChildrenRoute(allRoutes)
</script>

<template>
    <div class="slidebar">
        <h2>slidebar</h2>
        <slider :data="menuList"></slider>
    </div>
</template>

<style lang="scss" scoped></style>
