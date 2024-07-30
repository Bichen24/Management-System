<script setup>
import SvgIcon from '@/components/svgIcon/index.vue'
import { useUserStore } from '@/stores/useUserStore.js'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
const isOpenEye = ref(false)
const showEye = () => {
    isOpenEye.value = !isOpenEye.value
}
const loginData = ref({
    username: 'super-admin',
    password: '123456'
})
const i18n = useI18n()
const rules = ref({
    password: [
        {
            requierd: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error(i18n.t('msg.login.passwordRule')))
                } else {
                    callback()
                }
            }
        }
    ],
    username: [
        {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
                if (value.length === 0) {
                    callback(new Error(i18n.t('msg.login.usernameRule')))
                } else {
                    callback()
                }
            }
        }
    ]
})
const router = useRouter()
const loading = ref(false)
const loginFromRef = ref(null)
const { userLogin } = useUserStore()
const login = () => {
    loginFromRef.value.validate((value) => {
        if (!value) return
        loading.value = true
        userLogin(loginData.value)
            .then(() => {
                loading.value = false
                router.push('/')
            })
            .catch((err) => {
                console.log(err)
                loading.value = false
            })
    })
}
</script>

<template>
    <div class="login-container">
        <el-form class="login-form" ref="loginFromRef" :model="loginData" :rules="rules">
            <div class="title-container">
                <h3 class="title">{{ $t('msg.login.title') }}</h3>
            </div>

            <el-form-item prop="username">
                <span class="svg-container">
                    <SvgIcon icon="user" color="#889aa4"></SvgIcon>
                </span>
                <el-input
                    v-model="loginData.username"
                    placeholder="username"
                    name="username"
                    type="text"
                />
            </el-form-item>

            <el-form-item prop="password">
                <span class="svg-container">
                    <SvgIcon icon="password" color="#889aa4"></SvgIcon>
                </span>
                <el-input
                    v-model="loginData.password"
                    placeholder="password"
                    name="password"
                    :type="isOpenEye ? 'text' : 'password'"
                />
                <span class="show-pwd" @click="showEye">
                    <SvgIcon v-show="!isOpenEye" icon="eye" color="#889aa4"></SvgIcon>
                    <SvgIcon v-show="isOpenEye" icon="eye-open" color="#889aa4"></SvgIcon>
                </span>
            </el-form-item>
            <el-button
                @click="login"
                :loading="loading"
                type="primary"
                style="width: 100%; margin-bottom: 30px"
                >{{ $t('msg.login.loginBtn') }}</el-button
            >
            <div class="tips" v-html="$t('msg.login.desc')"></div>
        </el-form>
    </div>
</template>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
        .tips {
            color: white;
            font-size: 18px;
        }
        :deep(.icon) {
            margin-right: 0.25vw;
        }
        :deep(.el-form-item) {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #ffffff;
        }
        :deep(.el-input) {
            display: inline-block;
            height: 47px;
            width: 85%;
            .el-input__wrapper {
                background: #fff;
                width: 100%;
                height: 100%;
                border: 0px;
                appearance: none;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                color: $light_gray;
                height: 47px;
                caret-color: $cursor;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        display: inline-block;
    }

    .title-container {
        position: relative;
        .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
}
</style>
