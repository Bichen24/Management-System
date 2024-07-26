<script setup>
import svgIcon from '@/components/svgIcon/index.vue'
import { computed } from 'vue'
import { useAppStore } from '@/stores/appSotre.js'

const store = useAppStore()
const toggleClick = () => {
    store.openIcon = !store.openIcon
}

const icon = computed(() => (store.openIcon ? 'hamburger-opened' : 'hamburger-closed'))
</script>

<template>
    <div class="hamburger-container" @click="toggleClick">
        <svg-icon class="hamburger" :icon="icon"></svg-icon>
    </div>
</template>

<style lang="scss" scoped>
.hamburger-container {
    display: inline-block;
    margin: 3px;
    .hamburger {
        padding: 12px;
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 20px;
    }
}
</style>
