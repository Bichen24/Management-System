<script setup>
import { rolePermission, permissionList, distributePermission } from '@/api/permission'
import { watchLanguage } from '@/utils/i18n'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    roleId: {
        type: String,
        required: true
    }
})
const emits = defineEmits(['update:modelValue'])
const allPermission = ref([])
const getPermissionList = async () => {
    allPermission.value = await permissionList()
}
watchLanguage(getPermissionList)
const defaultProps = {
    children: 'children',
    label: 'permissionName'
}
const rolePermissions = ref([])
const treeRef = ref(null)
const getRolePermissions = async () => {
    rolePermissions.value = await rolePermission(props.roleId)
    treeRef.value.setCheckedKeys(rolePermissions.value)
}
watch(
    () => props.roleId,
    (val) => {
        if (val) getRolePermissions()
    }
)
/**
  确定按钮点击事件
 */
import { ElMessage } from 'element-plus'

const i18n = useI18n()
const onConfirm = async () => {
    await distributePermission({
        roleId: props.roleId,
        permissions: treeRef.value.getCheckedKeys()
    })
    ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
    closed()
}
/**
 * 关闭
 */
const closed = () => {
    emits('update:modelValue', false)
}
</script>

<template>
    <el-dialog :title="$t('msg.excel.roleDialogTitle')" :model-value="modelValue" @close="closed">
        <el-tree
            ref="treeRef"
            :data="allPermission"
            show-checkbox
            check-strictly
            node-key="id"
            default-expand-all
            :props="defaultProps"
        >
        </el-tree>

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
