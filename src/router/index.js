import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/views/layout/index.vue'
const privateRoutes = [
    {
        path: '/user',
        redirect: '/user/manage',
        component: layout,
        meta: {
            title: '用户',
            icon: 'personnel'
        },
        children: [
            {
                path: '/user/manage',
                component: () => import('@/views/user-manage/index.vue'),
                meta: {
                    title: '用户管理',
                    icon: 'personnel-manage'
                }
            },
            {
                path: '/user/role',
                component: () => import('@/views/role-list/index.vue'),
                meta: {
                    title: '角色管理',
                    icon: 'role'
                }
            },
            {
                path: '/user/permission',
                component: () => import('@/views/permission-list/index.vue'),
                meta: {
                    title: '用户权限',
                    icon: 'permission'
                }
            },
            {
                path: '/user/info/:id',
                name: 'userInfo',
                component: () => import('@/views/user-info/index.vue'),
                meta: {
                    title: '用户信息'
                }
            },
            {
                path: '/user/import',
                name: 'import',
                component: () => import('@/views/import/index.vue'),
                meta: {
                    title: 'excelImport'
                }
            }
        ]
    },
    {
        path: '/article',
        redirect: '/article/ranking',
        component: layout,
        meta: {
            title: '文章',
            icon: 'article'
        },
        children: [
            {
                path: '/article/ranking',
                component: () => import('@/views/article-ranking/index.vue'),
                meta: {
                    title: '文章排名',
                    icon: 'article-ranking'
                }
            },
            {
                path: '/article/:id',
                component: () => import('@/views/article-detail/index.vue'),
                meta: {
                    title: '文章详情'
                }
            },
            {
                path: '/article/create',
                component: () => import('@/views/article-create/index.vue'),
                meta: {
                    title: '创建文章',
                    icon: 'article-create'
                }
            },
            {
                path: '/article/editor/:id',
                component: () => import('@/views/article-create/index.vue'),
                meta: {
                    title: '文章编辑'
                }
            }
        ]
    }
]
// 公共功能
const publicRoutes = [
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
                    title: '个人中心',
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
    routes: [...publicRoutes, ...privateRoutes]
})

export default router

import { TOKEN } from '@/constant'
import { useUserStore } from '@/stores/useUserStore'
import { getTokenOut } from '@/utils/loginTime'
import { getItem } from '@/utils/storage'
// 白名单
const whiteList = ['/login', '/404', '/401']
// 路由跳转
router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    if (getItem(TOKEN)) {
        console.log(getItem(TOKEN))
        if (getTokenOut()) {
            userStore.userExit()
        }
        if (to.path === '/login') {
            next('/')
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
