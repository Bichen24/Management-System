<script setup>
import permission from './cpns/permission.vue'
import { fetchRoleList } from '@/api/role'
import { watchLanguage } from '@/utils/i18n'
import { ref, watch } from 'vue'

const allRoles = ref([])
const modelValue = ref(false)
const roleId = ref('')
const getRoleData = async () => {
    const res = await fetchRoleList()
    allRoles.value = res
}
watchLanguage(getRoleData)
const showPermission = (row) => {
    modelValue.value = true
    roleId.value = row.id
}
watch(
    () => modelValue,
    () => {
        if (!modelValue.value) roleId.value = ''
    }
)
</script>

<template>
    <el-card>
        <el-table :data="allRoles" border style="width: 100%">
            <el-table-column :label="$t('msg.role.index')" type="index" width="120">
            </el-table-column>
            <el-table-column :label="$t('msg.role.name')" prop="title"> </el-table-column>
            <el-table-column :label="$t('msg.role.desc')" prop="describe"> </el-table-column>
            <el-table-column
                :label="$t('msg.role.action')"
                prop="action"
                width="260"
                #default="{ row }"
            >
                <el-button
                    type="primary"
                    size="small"
                    v-permission="['distributePermission']"
                    @click="showPermission(row)"
                >
                    {{ $t('msg.role.assignPermissions') }}
                </el-button>
            </el-table-column>
        </el-table>
    </el-card>
    <permission v-model="modelValue" :roleId="roleId" />
</template>

<style lang="scss" scoped></style>
