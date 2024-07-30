<script setup>
import sliderItem from './slider-item.vue'
import { ref } from 'vue'
const props = defineProps({
    data: {
        type: Array,
        required: true
    }
})
const activeIndex = ref('/profile')
console.log(props.data)
</script>

<template>
    <!-- 一级 menu 菜单 -->
    <el-menu
        :uniqueOpened="true"
        :default-active="activeIndex"
        active-text-color="#000"
        text-color="var(--text-color)"
        background-color="var(--primary-color)"
        :router="true"
    >
        <slider-item v-for="item in data" :key="item.path" :data="item"></slider-item>
    </el-menu>
</template>

<style lang="scss" scoped></style>
