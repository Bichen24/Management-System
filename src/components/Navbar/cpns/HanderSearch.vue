<template>
    <div :class="{ show: isShow }" class="header-search">
        <svg-icon
            class-name="search-icon"
            id="guide-search"
            icon="search"
            @click.stop="onShowClick"
        />
        <el-select
            ref="headerSearchSelectRef"
            class="header-search-select"
            v-model="search"
            filterable
            default-first-option
            remote
            placeholder="Search"
            :remote-method="querySearch"
            @change="onSelectChange"
        >
            <el-option
                v-for="option in options"
                :key="option.item.path"
                :label="option.item.title"
                :value="option.item.path"
            ></el-option>
        </el-select>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { getChildrenRouteSearch } from '@/utils/routesChange'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import { generateTitle } from '@/utils/i18n'
// 数据源
const router = useRouter()
const data = computed(() => {
    const res = getChildrenRouteSearch(router.getRoutes())
    res.map((item) => {
        item.title = generateTitle(item.title)
    })
    return res
})

// 控制 search 显示
const isShow = ref(false)
// el-select 实例
const headerSearchSelectRef = ref(null)
const onShowClick = () => {
    isShow.value = !isShow.value
    options.value = []
    headerSearchSelectRef.value.focus()
}
//搜索设置
const fuse = new Fuse(data.value, {
    // 是否按优先级进行排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
    // name：搜索的键
    // weight：对应的权重
    keys: [
        {
            name: 'title',
            weight: 1
        }
    ]
})
// search 相关
const search = ref('')
const options = ref([])
// 搜索方法
const querySearch = (query) => {
    if (query !== '') {
        options.value = fuse.search(query)
    } else {
        options.value = []
    }
}
// 选中回调
const onSelectChange = (val) => {
    router.push(val)
}
</script>

<style lang="scss" scoped>
.header-search {
    font-size: 18px !important;
    .search-icon {
        cursor: pointer;
        font-size: 18px;
        vertical-align: middle;
    }
    .header-search-select {
        font-size: 18px;
        transition: width 0.2s;
        width: 0;
        overflow: hidden;
        background: transparent;
        border-radius: 0;
        display: inline-block;
        vertical-align: middle;

        :deep(.el-input__inner) {
            border-radius: 0;
            border: 0;
            padding-left: 0;
            padding-right: 0;
            box-shadow: none !important;
            border-bottom: 1px solid #d9d9d9;
            vertical-align: middle;
        }
    }
    &.show {
        .header-search-select {
            width: 210px;
            margin-left: 10px;
        }
    }
}
</style>
