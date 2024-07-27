<script setup>
import { useUserStore } from '@/stores/useUserStore'
import bread from './cpns/bread.vue'
import languageSelect from './cpns/languageSelect.vue'
// import hamburger from './cpns/hamburger.vue'
const userStore = useUserStore()
const { userExit } = userStore
</script>

<template>
    <div class="navbar">
        <!-- <hamburger class="hamburger" /> -->
        <bread class="bread" />
        <div class="right-menu">
            <languageSelect class="right-menu-item hover-effect" />

            <el-dropdown>
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
    </div>
</template>
<style lang="scss" scoped>
.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    .bread {
        float: left;
        height: 100%;
        line-height: 50px;
        padding: 0 10px;
    }
    .hamburger {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        // hover 动画
        transition: background 0.5s;

        &:hover {
            background: rgba(0, 0, 0, 0.1);
        }
    }
    .right-menu {
        display: flex;
        align-items: center;
        float: right;
        padding-right: 16px;
        :deep(.right-menu-item) {
            display: inline-block;
            padding: 0 18px 0 0;
            font-size: 24px;
            color: #5a5e66;
            vertical-align: text-bottom;
        }
        &.hover-effect {
            cursor: pointer;
        }
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
