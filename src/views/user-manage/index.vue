<template>
    <div class="user-manage-container">
        <el-card class="header">
            <div>
                <el-button type="primary" @click="onImportExcelClick" v-permission="['importUser']">
                    {{ $t('msg.excel.importExcel') }}</el-button
                >
                <el-button @click="onExportExcelClick" type="success">
                    {{ $t('msg.excel.exportExcel') }}
                </el-button>
            </div>
        </el-card>
        <el-card>
            <el-table :data="userManage.list">
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column :label="$t('msg.excel.name')" prop="username"></el-table-column>
                <el-table-column :label="$t('msg.excel.mobile')" prop="mobile"></el-table-column>
                <el-table-column :label="$t('msg.excel.avatar')">
                    <template #default="{ row }">
                        <el-image
                            class="avatar"
                            :src="row.avatar"
                            :preview-src-list="[row.avatar]"
                        />
                    </template>
                </el-table-column>
                <el-table-column :label="$t('msg.excel.role')">
                    <template #default="{ row }">
                        <div v-if="row.role && row.role.length > 0">
                            <el-tag v-for="item in row.role" :key="item.id" size="small">
                                {{ item.title }}
                            </el-tag>
                        </div>
                        <div v-else>
                            <el-tag size="small">{{ $t('msg.excel.defaultRole') }}</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="openTime" :label="$t('msg.excel.openTime')">
                    <template #default="{ row }">
                        {{ $filters.dateFilter(row.openTime) }}
                    </template>
                </el-table-column>
                <el-table-column :label="$t('msg.excel.action')" fixed="right" width="260">
                    <template #default="{ row }">
                        <el-button type="primary" size="small" @click="onShow(row._id)">{{
                            $t('msg.excel.show')
                        }}</el-button>
                        <el-button
                            type="info"
                            size="small"
                            @click="roleClick(row._id)"
                            v-permission="['distributeRole']"
                        >
                            {{ $t('msg.excel.showRole') }}
                        </el-button>
                        <el-button
                            type="danger"
                            @click="onRemoveClick(row)"
                            size="small"
                            v-permission="['removeUser']"
                        >
                            {{ $t('msg.excel.remove') }}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                :current-page="page"
                :page-sizes="[2, 5, 10, 20]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </el-card>
        <ExportToExcel v-model="modelValue" />
        <userRole v-model="roleValue" :userId="roleId" />
    </div>
</template>

<script setup>
import { deleteUser, fetchUserManageData } from '@/api/user-manage'
import { watchLanguage } from '@/utils/i18n'
import { onActivated, ref, watch } from 'vue'
import ExportToExcel from './cpns/ExportExcel.vue'
import userRole from './cpns/role.vue'
import { useRouter } from 'vue-router'
const userManage = ref({})
const total = ref(0)
const page = ref(1)
const size = ref(2)
const getUserManageData = async () => {
    const res = await fetchUserManageData({
        page: page.value,
        size: size.value
    })
    userManage.value = res
    total.value = res.total
}
watchLanguage(getUserManageData)
onActivated(() => {
    getUserManageData()
})
// 分页相关
/**
 * size 改变触发
 */
const handleSizeChange = (currentSize) => {
    size.value = currentSize
    getUserManageData()
}

/**
 * 页码改变触发
 */
const handleCurrentChange = (currentPage) => {
    page.value = currentPage
    getUserManageData()
}

//import点击
const router = useRouter()
const onImportExcelClick = () => {
    router.push('/user/import')
}
//删除员工
const onRemoveClick = async (row) => {
    console.log(row)
    await deleteUser(row._id)
    // 重新渲染数据
    getUserManageData()
}
//导出
const modelValue = ref(false)
const onExportExcelClick = () => {
    modelValue.value = true
}

//查看用户信息
const onShow = (id) => {
    router.push(`/user/info/${id}`)
}
//查看用户角色
const roleValue = ref(false)
const roleId = ref('')
const roleClick = (id) => {
    roleId.value = id
    roleValue.value = true
}
watch(
    () => roleValue.value,
    (val) => {
        if (!val) {
            roleId.value = ''
        }
    }
)
</script>

<style lang="scss" scoped>
.user-manage-container {
    .header {
        margin-bottom: 22px;
        text-align: right;
    }
    :deep(.avatar) {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }

    :deep(.el-tag) {
        margin-right: 6px;
    }

    .pagination {
        margin-top: 20px;
        text-align: center;
    }
}
</style>
