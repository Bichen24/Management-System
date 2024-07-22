<script setup>
import Navbar from '@/components/Navbar/index.vue'
import Sidebar from '@/components/Sidebar/index.vue'
import AppMain from '@/components/AppMain/index.vue'
import { useUserStore } from '@/stores/useUserStore'
import { storeToRefs } from 'pinia'
const { userInfo } = storeToRefs(useUserStore())
</script>

<template>
    <div class="app-wrapper">
        <!-- 左侧 menu -->
        <sidebar id="guide-sidebar" class="sidebar-container" />
        <div class="main-container">
            <div class="fixed-header">
                <!-- 顶部的 navbar -->
                <navbar />
            </div>
            <!-- 内容区 -->
            <app-main />
            <h2>{{ userInfo }}</h2>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/variables.scss';

.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
}

.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
}
.sidebar-container {
    background-color: $menuBg;
}
</style>
