import { publicRoutes, privateRoutes } from '@/router/index.js'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePermissionStore = defineStore('permission', () => {
    // 路由表：初始拥有静态路由权限
    const routes = ref([...publicRoutes])
    /**
     * 增加路由
     */ const setRoutes = (newsRoutes) => {
        // 永远在静态路由的基础上增加新路由
        routes.value = [...publicRoutes, ...newsRoutes]
    }
    /**
     * 根据权限筛选路由
     */
    const filterRoutes = (menus) => {
        console.log(menus)
        const routes = []
        // 路由权限匹配
        menus.forEach((key) => {
            // 权限名 与 路由的 name 匹配
            routes.push(...privateRoutes.filter((item) => item.name === key))
        })
        // 最后添加 不匹配路由进入 404
        routes.push({
            path: '/:catchAll(.*)',
            redirect: '/404'
        })
        setRoutes(routes)
        return routes
    }
    return {
        routes,
        filterRoutes,
        setRoutes
    }
})
