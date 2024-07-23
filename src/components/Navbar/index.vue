<script setup>
import { useUserStore } from '@/stores/useUserStore'
const userStore = useUserStore()
const { userExit } = userStore
</script>

<template>
    <div class="navbar">
        <el-dropdown class="right-menu">
            <el-avatar shape="square" :size="50" :src="userStore.userInfo.avatar"></el-avatar>
            <template #dropdown>
                <el-dropdown-menu class="user-dropdown">
                    <router-link to="/">
                        <el-dropdown-item> 首页 </el-dropdown-item>
                    </router-link>
                    <a target="_blank" href="">
                        <el-dropdown-item>课程主页</el-dropdown-item>
                    </a>
                    <el-dropdown-item divided @click="userExit()"> 退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>
<style lang="scss" scoped>
.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .right-menu {
        display: flex;
        align-items: center;
        float: right;
        padding-right: 16px;

        :deep(.avatar-container) {
            cursor: pointer;
            .avatar-wrapper {
                margin-top: 5px;
                position: relative;
                .el-avatar {
                    --el-avatar-background-color: none;
                    margin-right: 12px;
                }
            }
        }
    }
}
</style>
