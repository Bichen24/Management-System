<script setup>
defineProps({
    featureData: {
        type: Array,
        required: true
    }
})
import { ref } from 'vue'

const activeNames = ref([])
const handleChange = (val) => {
    activeNames.value = val
}
</script>

<template>
    <div class="demo-collapse">
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item
                v-for="(item, index) in featureData"
                :title="item.title"
                :name="index"
                :key="item.id"
            >
                <div v-html="item.content"></div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<style lang="scss" scoped></style>
