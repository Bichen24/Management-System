import request from '@/utils/request'
export const fetchFeatureData = () => {
    return request({
        url: '/user/feature'
    })
}
