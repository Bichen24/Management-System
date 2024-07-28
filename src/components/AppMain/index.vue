<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
    <div class="app-main">
        <router-view v-slot="{ Component, route }">
            <transition name="fade-transform" mode="out-in">
                <keep-alive>
                    <component :is="Component" :key="route.path" />
                </keep-alive>
            </transition>
        </router-view>
    </div>
</template>

<style lang="scss" scoped>
.app-main {
    width: 100%;
    position: relative;
    overflow: hidden;
    padding: 100px 20px 20px 20px;
    box-sizing: border-box;
}
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
    transition: all 0.3s;
}

.fade-transform-enter-from {
    opacity: 0;
    transform: translateX(-30px);
}

.fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
