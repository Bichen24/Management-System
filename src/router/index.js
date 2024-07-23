import { TOKEN } from '@/constant'
import { useUserStore } from '@/stores/useUserStore'
import { getTokenOut } from '@/utils/loginTime'
import { getItem } from '@/utils/storage'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/layout'
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/login/index.vue')
        },
        {
            path: '/layout',
            name: 'layout',
            component: () => import('@/views/layout/index.vue')
        }
    ]
})
// 白名单
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    if (getItem(TOKEN)) {
        if (getTokenOut()) {
            userStore.userExit()
        }
        if (to.path === '/login') {
            next('/layout')
        } else {
            if (JSON.stringify(userStore.userInfo) === '{}') {
                userStore.getUserInfo()
            }
            next()
        }
    } else {
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next('/login')
        }
    }
})

export default router
