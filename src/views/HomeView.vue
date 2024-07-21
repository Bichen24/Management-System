<script setup>
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
console.log(counterStore.count)
</script>

<template>
    <div class="homeView">
        <h2>Homeview</h2>
    </div>
</template>

<style lang="scss" scoped>
div {
    h2 {
        color: red;
    }
}
</style>
