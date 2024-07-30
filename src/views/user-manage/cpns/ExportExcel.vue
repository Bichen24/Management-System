<script setup>
import { fetchUserManageAllList } from '@/api/user-manage'
import { watchLanguage } from '@/utils/i18n'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { USER_RELATIONS } from './utils'
import { export_json_to_excel } from '@/utils/Export2Excel.js'
import { dateFilter } from '@/filters'

defineProps({
    modelValue: {
        type: Boolean,
        required: true
    }
})
const emits = defineEmits(['update:modelValue'])
const loading = ref(false)

const closed = () => {
    loading.value = false
    emits('update:modelValue', false)
}

//导出文件名处理
const i18n = useI18n()
let exportDefaultName = i18n.t('msg.excel.defaultName')
const excelName = ref('')
excelName.value = exportDefaultName
watchLanguage(() => {
    exportDefaultName = i18n.t('msg.excel.defaultName')
    excelName.value = exportDefaultName
})

// const excel = await import('@/utils/Export2Excel')
const header = USER_RELATIONS
//导出处理
const onConfirm = async () => {
    loading.value = true
    const res = (await fetchUserManageAllList()).list
    const exportJson = exportData(header, res)
    export_json_to_excel({
        header: Object.keys(header), //表头
        data: exportJson, //数据
        filename: excelName.value, //文件名
        autoWidth: true, //是否自动宽度
        bookType: 'xlsx' //导出类型
    })
    closed()
}
// 数据转换处理
const exportData = (headers, rows) => {
    return rows.map((row) => {
        return Object.keys(headers).map((key) => {
            if (headers[key] === 'role') {
                let role = ''
                row[headers[key]].forEach((item) => {
                    role = role + role ? '、' : '' + item.title
                })
                return role
            }
            if (headers[key] === 'openTime') {
                return dateFilter(row[headers[key]])
            }
            return row[headers[key]]
        })
    })
}
</script>

<template>
    <el-dialog :title="$t('msg.excel.title')" @close="closed" :model-value="modelValue" width="30%">
        <el-input v-model="excelName" :placeholder="$t('msg.excel.placeholder')"> </el-input>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
                <el-button type="primary" :loading="loading" @click="onConfirm">{{
                    $t('msg.excel.confirm')
                }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang="scss" scoped></style>
