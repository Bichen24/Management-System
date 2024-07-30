<template>
    <div class="upload-excel">
        <div class="btn-upload">
            <el-button :loading="loading" type="primary" @click="handleUpload">
                {{ $t('msg.uploadExcel.upload') }}
            </el-button>
        </div>

        <input
            ref="excelUploadInput"
            class="excel-upload-input"
            type="file"
            accept=".xlsx, .xls"
            @change="handleChange"
        />
        <!-- https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API -->
        <div
            class="drop"
            @drop.stop.prevent="handleDrop"
            @dragover.stop.prevent="handleDragover"
            @dragenter.stop.prevent="handleDragover"
        >
            <el-icon size="30"><FolderAdd /></el-icon>
            <span>{{ $t('msg.uploadExcel.drop') }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { FolderAdd } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import * as XLSX from 'xlsx'
import { getHeaderRow, isExcel } from './utils'
const excelUploadInput = ref(null)
const loading = ref(false)

const props = defineProps({
    beforeUpload: {
        type: Function
    },
    onSuccess: {
        type: Function
    }
})

//文件点击弹出上传框
const handleUpload = () => {
    excelUploadInput.value.click()
}
//文件上传成功回调
const handleChange = (value) => {
    const file = value.target.files[0]
    if (!file) return
    excelUploadInput.value.value = null
    // 如果没有指定上传前回调的话
    if (!props.beforeUpload) {
        upload(file)
        return
    }
    // 如果指定了上传前回调，那么只有返回 true 才会执行后续操作
    const before = props.beforeUpload(file)
    if (before) {
        upload(file)
    }
}
//文件处理
const upload = (file) => {
    loading.value = true
    return new Promise((resolve) => {
        // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
        const reader = new FileReader()
        // 该事件在读取操作完成时触发
        // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/onload
        reader.onload = (file) => {
            // 1. 获取解析到的数据
            const data = file.target.result
            // 2. 利用 XLSX 对数据进行解析
            const workbook = XLSX.read(data, { type: 'array' })
            // 3. 获取第一张表格(工作簿)名称
            const firstSheetName = workbook.SheetNames[0]
            // 4. 只读取 Sheet1（第一张表格）的数据
            const worksheet = workbook.Sheets[firstSheetName]
            // 5. 解析数据表头
            const header = getHeaderRow(worksheet)
            // 6. 解析数据体
            const results = XLSX.utils.sheet_to_json(worksheet)
            // 7. 传出f父组件解析之后的数据
            generateData({ header, results })
            // 8. loading 处理
            loading.value = false
            // 9. 异步完成
            resolve()
        }
        // 启动读取指定的 Blob 或 File 内容
        reader.readAsArrayBuffer(file)
    })
}
/**
 * 根据导入内容，生成数据
 */
const generateData = (excelData) => {
    props.onSuccess && props.onSuccess(excelData)
}
/**
 * 拖拽文本释放时触发
 */
const handleDrop = (e) => {
    // 上传中跳过
    if (loading.value) return
    const files = e.dataTransfer.files
    if (files.length !== 1) {
        ElMessage.error('必须要有一个文件')
        return
    }
    const rawFile = files[0]
    if (!isExcel(rawFile)) {
        ElMessage.error('文件必须是 .xlsx, .xls, .csv 格式')
        return false
    }
    // 触发上传事件
    upload(rawFile)
}

/**
 * 拖拽悬停时触发
 */
const handleDragover = (e) => {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/dropEffect
    // 在新位置生成源项的副本 复制图标
    e.dataTransfer.dropEffect = 'copy'
}
</script>

<style lang="scss" scoped>
.upload-excel {
    display: flex;
    justify-content: center;
    margin-top: 100px;
    .excel-upload-input {
        display: none;
        z-index: -9999;
    }
    .btn-upload,
    .drop {
        border: 1px dashed #bbb;
        width: 350px;
        height: 160px;
        text-align: center;
        line-height: 160px;
    }
    .drop {
        line-height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #bbb;
        align-items: center;
        :deep(.el-icon) {
            font-size: 50px !important;
            display: block;
        }
    }
}
</style>
