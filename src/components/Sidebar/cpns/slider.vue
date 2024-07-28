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
        active-text-color="#000"
        text-color="var(--text-color)"
        background-color="var(--primary-color)"
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
