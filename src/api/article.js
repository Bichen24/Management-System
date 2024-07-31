import request from '@/utils/request'

export const fetchArticleList = (data) => {
    return request({
        url: '/article/list',
        method: 'get',
        params: data
    })
}
// 更新排名
export const updateRanking = (data) => {
    return request({
        url: '/article/sort',
        method: 'POST',
        data
    })
}
