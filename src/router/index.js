import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/views/layout/index.vue'

import ArticleCreaterRouter from './modules/ArticleCreate'
import ArticleRouter from './modules/Article'
import PermissionListRouter from './modules/PermissionList'
import RoleListRouter from './modules/RoleList'
import UserManageRouter from './modules/userManage'

export const privateRoutes = [
    RoleListRouter,
    UserManageRouter,
    PermissionListRouter,
    ArticleCreaterRouter,
    ArticleRouter
]
// 公共功能
export const publicRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/',
        name: 'layout',
        redirect: '/profile',
        component: layout,
        children: [
            {
                path: '/profile',
                name: 'profile',
                component: () => import('@/views/profile/index.vue'),
                meta: {
                    title: 'profile',
                    icon: 'user'
                }
            }
        ]
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404.vue')
    },
    {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401.vue')
    }
]
const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [...publicRoutes]
})

export default router

import { TOKEN } from '@/constant'
import { useUserStore } from '@/stores/useUserStore'
import { getTokenOut } from '@/utils/loginTime'
import { getItem } from '@/utils/storage'
import { usePermissionStore } from '@/stores/permission.js'
import { ref } from 'vue'
// 白名单
const whiteList = ['/login', '/404', '/401']
// 路由跳转
router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    const permissionStore = usePermissionStore()
    if (getItem(TOKEN)) {
        if (getTokenOut()) {
            userStore.userExit()
        }
        if (to.path === '/login') {
            next('/')
        } else {
            if (JSON.stringify(userStore.userInfo) === '{}') {
                const res = userStore.getUserInfo()
                const { filterRoutes } = permissionStore
                let permission = ref([])
                res.then((data) => {
                    permission.value = data.permission
                    const filterRoute = filterRoutes(permission.value.menus)
                    filterRoute.forEach((item) => {
                        router.addRoute(item)
                    })
                    return next(to.path)
                })
            } else {
                next()
            }
        }
    } else {
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next('/login')
        }
    }
})
