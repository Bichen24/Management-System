<script setup>
import { useUserStore } from '@/stores/useUserStore'
import svgIcon from '@/components/svgIcon/index.vue'

const userStore = useUserStore()
defineProps({
    featureData: {
        type: Array,
        required: true
    }
})
</script>

<template>
    <div class="project">
        <el-col class="userinfo">
            <span>
                <el-avatar class="avatar" :size="120" :src="userStore.userInfo.avatar" />
            </span>
            <div class="info">
                <h2>
                    {{ userStore.userInfo.title }}
                </h2>
                <h2>
                    {{ userStore.userInfo.username }}
                </h2>
            </div>
        </el-col>
        <el-col class="projectinfo">
            <h3>
                <svgIcon color="#000" icon="article"></svgIcon>
                {{ $t('msg.profile.projectIntroduction') }}
            </h3>
            <p>
                {{ $t('msg.profile.muted') }}
            </p>
        </el-col>
        <el-col>
            <h3>
                <svgIcon color="#000" icon="article"></svgIcon>
                {{ $t('msg.profile.projectIntroduction') }}
            </h3>
            <div class="progress-item" v-for="item in featureData" :key="item.id">
                <div>{{ item.title }}</div>
                <el-progress :percentage="item.percentage" status="success" />
            </div>
        </el-col>
    </div>
</template>

<style lang="scss" scoped>
.project {
    font-size: 1.2vw;
    :deep(.el-col) {
        padding: 15px 0;
        h3 {
            border-bottom: 1px solid #ccc;
            padding-bottom: 4px;
            margin-bottom: 1vw;
        }
        :deep(.icon) {
            margin-bottom: 0.5vw;
            fill: #000;
        }
    }
    .userinfo {
        position: relative;
        text-align: center;
        .avatar {
            transition: all 1s;
        }
        .info {
            font-size: 1vw;
        }
    }
    .progress-item {
        font-size: 1vw;
        margin: 1vw 0;
    }
}
</style>
