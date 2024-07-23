import { defineStore } from 'pinia'
import { fetchUserInfo, login } from '@/api/sys'
import { TOKEN } from '@/constant'
import md5 from 'md5'
import { getItem, removeItem, setItem } from '@/utils/storage'
import { computed, ref } from 'vue'
import router from '@/router'
import { reomveTokenTimestap, setTokenTimestap } from '@/utils/loginTime'

export const useUserStore = defineStore('user', () => {
    const userToken = computed(() => {
        const token = getItem(TOKEN)
        return token ? token : ''
    })
    let userInfo = ref({})

    const getUserInfo = async () => {
        let res = ref(userInfo.value)
        if (JSON.stringify(userInfo.value) === '{}' || userToken.value !== '') {
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
                    router.push('/')
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
            userInfo.value = {}
            removeItem(TOKEN)
            reomveTokenTimestap()
            resolve()
        }).then(() => {
            console.log(1)
            router.push('/login')
        })
    }

    return { userLogin, userToken, getUserInfo, userInfo, userExit }
})
