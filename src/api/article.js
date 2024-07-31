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
// 删除文章
export const removeArticle = (id) => {
    return request({
        url: `/article/delete/${id}`
    })
}
// 获取文章详情
export const fetchArticleDetail = (id) => {
    return request({
        url: `/article/${id}`
    })
}
