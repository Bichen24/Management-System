import axios from 'axios'

const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000
})
request.interceptors.request.use((config) => {
    config.headers.icode = 'helloqianduanxunlianying'
    return config // 必须返回配置
})
export default request
