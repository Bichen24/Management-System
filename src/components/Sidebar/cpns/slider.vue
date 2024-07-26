<script setup>
import sliderItem from './slider-item.vue'
import { computed } from 'vue'
const props = defineProps({
    data: {
        type: Array,
        required: true
    }
})
const getIndex = (index) => {
    return index
}
const activeIndex = computed(() => getIndex())
</script>

<template>
    <!-- 一级 menu 菜单 -->
    <el-menu
        :uniqueOpened="true"
        :default-active="activeIndex"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router="true"
    >
        <slider-item
            v-for="(item, index) in props.data"
            :key="item.path"
            :data="{ item, index }"
            @get-active-index="getIndex"
        ></slider-item>
    </el-menu>
</template>

<style lang="scss" scoped></style>
