<script setup>
import { useRouter } from 'vue-router'
import { clearChildrenRoute } from '@/utils/routesChange.js'
import slider from './cpns/slider.vue'
import { useUserStore } from '@/stores/useUserStore'
const router = useRouter()
// 获取路由
const allRoutes = router.getRoutes()
const menuList = clearChildrenRoute(allRoutes)
const userStore = useUserStore()
</script>

<template>
    <div class="slidebar" id="guide-sidebar">
        <div class="slider-header">
            <el-avatar
                class="slider-avatar"
                size="default"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
            <h3 class="slider-username">{{ userStore.userInfo.username }}</h3>
        </div>
        <slider :data="menuList"></slider>
    </div>
</template>

<style lang="scss" scoped>
.slidebar {
    width: 100%;
    background-color: var(--primary-color);
}
.slider-header {
    display: flex;
    height: 70px;
    justify-content: center;
    align-items: center;
    background-color: var(--primary-color);
    .slider-username {
        margin-left: 5px;
        color: #fff;
    }
}
</style>
