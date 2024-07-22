import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/useUserStore'
const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000
})
request.interceptors.request.use((config) => {
    const { userToken } = useUserStore()
    config.headers.icode = 'helloqianduanxunlianying'
    if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`
    }
    return config // 必须返回配置
})
request.interceptors.response.use(
    (response) => {
        const { success, message, data } = response.data
        if (success) {
            return data
        } else {
            ElMessage.error(message)
            return Promise.reject(new Error(message))
        }
    },
    (err) => {
        ElMessage.error(err)
        return Promise.reject(err)
    }
)
export default request
