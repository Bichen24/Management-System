<script setup>
import { computed, defineProps } from 'vue'
const props = defineProps({
    icon: {
        type: String,
        required: true
    },
    color: {
        type: String
    }
})
/**
 * 判断是否为外部图标
 */
const isExternal = computed(() => /^(https?:|mailto:|tel:)/.test(props.icon))
/**
 * 项目内图标，使用 #icon- 前缀，其中 icon- 对应 svg-loader 的配置
 */
const iconName = computed(() => `#icon-${props.icon}`)
</script>

<template>
    <img v-if="isExternal" :src="props.icon" v-bind="$attrs" class="icon" />
    <svg v-else v-bind="$attrs" class="icon" :style="{ fill: color }">
        <use :xlink:href="iconName" />
    </svg>
</template>

<style lang="scss" scoped>
.icon {
    font-size: 1em;
    width: 1em;
    height: 1em;
    vertical-align: middle;
}
</style>
