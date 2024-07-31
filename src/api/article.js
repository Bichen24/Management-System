import request from '@/utils/request'

export const fetchArticleList = (data) => {
    return request({
        url: '/article/list',
        method: 'get',
        params: data
    })
}
