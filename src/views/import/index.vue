<template>
    <upload-excel :on-success="onSuccess"></upload-excel>
</template>

<script setup>
import UploadExcel from '@/components/UploadExcel/index.vue'
import { USER_RELATIONS, formatDate } from './utils'
import { userBatchImport } from '@/api/import'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
const i18n = useI18n()
const router = useRouter()
const onSuccess = async ({ results }) => {
    const updateData = generateData(results)
    await userBatchImport(updateData)
    ElMessage.success({
        message: results.length + i18n.t('msg.excel.importSuccess'),
        type: 'success'
    })
    router.push('/user/manage')
}
//数据处理 中文转换为英文
const generateData = (data) => {
    const res = []
    data.forEach((item) => {
        const arr = {}
        Object.keys(item).forEach((key) => {
            if (USER_RELATIONS[key] === 'openTime') {
                arr[USER_RELATIONS[key]] = formatDate(item[key])
                return
            }
            arr[USER_RELATIONS[key]] = item[key]
        })
        res.push(arr)
    })
    return res
}
</script>
