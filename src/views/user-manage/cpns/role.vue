<script setup>
import { fetchRoleList, fetchUserRole, updateRole } from '@/api/role'
import { watchLanguage } from '@/utils/i18n'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})
const emits = defineEmits(['update:modelValue'])
// 获取角色列表
const allRoleList = ref([])
const userRoleTitleList = ref([])

const getRoleList = async () => {
    const res = await fetchRoleList()
    allRoleList.value = res
    console.log(allRoleList.value)
}
watchLanguage(getRoleList)

const closed = () => {
    emits('update:modelValue', false)
}
const i18n = useI18n()
import { ElMessage } from 'element-plus'
const onConfirm = async () => {
    // 处理数据结构
    const roles = userRoleTitleList.value.map((title) => {
        return allRoleList.value.find((role) => role.title === title)
    })
    const res = await updateRole(props.userId, roles)
    console.log(res)
    ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
    closed()
}
const getUserRole = async () => {
    const res = await fetchUserRole(props.userId)
    userRoleTitleList.value = res.role.map((item) => item.title)
}

watch(
    () => props.userId,
    (val) => {
        if (val) getUserRole()
    }
)
</script>

<template>
    <el-dialog :title="$t('msg.excel.roleDialogTitle')" :model-value="modelValue" @close="closed">
        <el-checkbox-group v-model="userRoleTitleList">
            <el-checkbox
                v-for="item in allRoleList"
                :key="item.id"
                :label="item.title"
            ></el-checkbox>
        </el-checkbox-group>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
                <el-button type="primary" @click="onConfirm">{{
                    $t('msg.universal.confirm')
                }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang="scss" scoped></style>
