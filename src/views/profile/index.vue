<template>
    <div class="my-container">
        <el-row>
            <el-col :span="6">
                <el-card class="user-card">
                    <project-card :featureData="featureData"></project-card>
                </el-card>
            </el-col>
            <el-col :span="18">
                <el-card>
                    <el-tabs v-model="activeName">
                        <el-tab-pane :label="$t('msg.profile.author')" name="author">
                            <author />
                        </el-tab-pane>
                        <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
                            <feature :featureData="featureData" />
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import ProjectCard from './cpns/ProjectCard/index.vue'
import Feature from './cpns/feature/index.vue'
import Author from './cpns/author/index.vue'
import { fetchFeatureData } from '@/api/profile'
import { ref, watch } from 'vue'
import { useAppStore } from '@/stores/appSotre'
const activeName = ref('feature')
const appStore = useAppStore()
const featureData = ref([])

const getFeatureData = async () => {
    const res = await fetchFeatureData()
    featureData.value = res
}
getFeatureData()
watch(
    () => appStore.Language,
    (newVal) => {
        getFeatureData(newVal)
    }
)
</script>

<style lang="scss" scoped>
.my-container {
    .user-card {
        margin-right: 20px;
    }
}
</style>
