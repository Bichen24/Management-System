<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
    <div class="app-main">
        <h2>appMain</h2>
        <RouterView />
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
</style>
