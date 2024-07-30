import { defineStore } from 'pinia'
import { fetchUserInfo, login } from '@/api/sys'
import { TOKEN } from '@/constant'
import md5 from 'md5'
import { clearItem, getItem, removeItem, setItem } from '@/utils/storage'
import { ref } from 'vue'
import router from '@/router'
import { reomveTokenTimestap, setTokenTimestap } from '@/utils/loginTime'

export const useUserStore = defineStore('user', () => {
    const userToken = ref(getItem(TOKEN) || '')
    let userInfo = ref({})

    const getUserInfo = async () => {
        let res = ref({})
        if (JSON.stringify(userInfo.value) === '{}' && userToken.value !== '') {
            res.value = await fetchUserInfo()
            userInfo.value = res.value
        }
        return res.value
    }

    const userLogin = (loginData) => {
        const { username, password } = loginData
        return new Promise((resolve, reject) => {
            login({
                username,
                password: md5(password)
            })
                .then((data) => {
                    userToken.value = data.token
                    setItem(TOKEN, data.token)
                    setTokenTimestap()
                    resolve(data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    function userExit() {
        return new Promise((resolve) => {
            if (userInfo.value && userInfo.value.permission && userInfo.value.permission.menus) {
                const menus = userInfo.value.permission.menus
                menus.forEach((menu) => {
                    router.removeRoute(menu)
                })
                console.log(router.getRoutes())
            }
            userInfo.value = {}
            removeItem(TOKEN)
            removeItem('tagsView')
            reomveTokenTimestap()
            clearItem()

            resolve()
        }).then(() => {
            router.push('/login')
        })
    }

    return { userLogin, userToken, getUserInfo, userInfo, userExit }
})
