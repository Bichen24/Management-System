import request from '@/utils/request'
export const fetchUserManageData = () =>
    request({
        url: '/user-manage/list',
        method: 'get'
    })
