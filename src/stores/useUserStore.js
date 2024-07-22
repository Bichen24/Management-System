import { defineStore } from 'pinia'
import { login } from '@/api/sys'
import md5 from 'md5'
export const useUserStore = defineStore('user', () => {
    const userLogin = (loginData) => {
        const { username, password } = loginData
        return new Promise((resolve, reject) => {
            login({
                username,
                password: md5(password)
            })
                .then((data) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
    return { userLogin }
})
