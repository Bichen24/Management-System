import request from '@/utils/request'
export const fetchUserManageData = (data) =>
    request({
        url: '/user-manage/list',
        method: 'get',
        params: data
    })
export const deleteUser = (id) => {
    return request({
        url: `/user-manage/detele/${id}`,
        method: 'get'
    })
}

export const fetchUserManageAllList = () => {
    return request({
        url: '/user-manage/all-list',
        method: 'get'
    })
}

export const fetchUserDetail = (id) => {
    return request({
        url: `/user-manage/detail/${id}`,
        method: 'get'
    })
}
