import request from '@/utils/request'
export const fetchRoleList = () =>
    request({
        url: '/role/list',
        method: 'get'
    })
export const fetchUserRole = (id) => {
    return request({
        url: `/user-manage/role/${id}`,
        method: 'get'
    })
}
export const updateRole = (id, roles) => {
    return request({
        url: `/user-manage/update-role/${id}`,
        method: 'POST',
        data: {
            roles
        }
    })
}

