import { useAppStore } from '@/stores/appSotre'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import rt from 'dayjs/plugin/relativeTime'

export const dateFilter = (val, format = 'YYYY-MM-DD') => {
    if (!isNaN(val)) {
        val = parseInt(val)
    }

    return dayjs(val).format(format)
}
// 计算相对时间
dayjs.extend(rt)
const relativeTime = (val) => {
    const appStore = useAppStore()

    if (!isNaN(val)) {
        val = parseInt(val)
    }
    return dayjs()
        .locale(appStore.Language === 'en' ? 'en' : 'zh-cn')
        .to(dayjs(val))
}
export default (app) => {
    app.config.globalProperties.$filters = {
        dateFilter,
        relativeTime
    }
}
