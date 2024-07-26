// import { TOKEN } from '@/constant'
// import { useUserStore } from '@/stores/useUserStore'
// import { getTokenOut } from '@/utils/loginTime'
// import { getItem } from '@/utils/storage'
// // 白名单
// const whiteList = ['/login', '/404']
// // 路由跳转
// router.beforeEach((to, from, next) => {
//     const userStore = useUserStore()
//     if (getItem(TOKEN)) {
//         if (getTokenOut()) {
//             userStore.userExit()
//         }
//         if (to.path === '/login') {
//             next('/')
//         } else {
//             if (JSON.stringify(userStore.userInfo) === '{}') {
//                 userStore.getUserInfo()
//             }
//             next()
//         }
//     } else {
//         if (whiteList.includes(to.path)) {
//             next()
//         } else {
//             next('/login')
//         }
//     }
// })
