import request from '@/utils/request'

export const userBatchImport = (data) => {
    return request({
        url: '/user-manage/batch/import',
        method: 'POST',
        data
    })
}
