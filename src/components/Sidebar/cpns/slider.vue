<script setup>
import sliderItem from './slider-item.vue'
const props = defineProps({
    data: {
        type: Array,
        required: true
    }
})
console.log(props.data)
</script>

<template>
    <!-- 一级 menu 菜单 -->
    <el-menu
        :uniqueOpened="true"
        default-active="2"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
    >
        <slider-item
            v-for="(item, index) in props.data"
            :key="item.path"
            :data="{ item, index }"
        ></slider-item>
    </el-menu>
</template>

<style lang="scss" scoped></style>
