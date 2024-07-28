<script setup>
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
let driverObj = ref(null)
onMounted(() => {
    driverObj.value = driver({
        // 禁止点击蒙版关闭
        allowClose: false,
        animate: true,
        closeBtnText: i18n.t('msg.guide.close'),
        nextBtnText: i18n.t('msg.guide.next'),
        prevBtnText: i18n.t('msg.guide.prev'),
        steps: [
            {
                element: '#guide-start',
                popover: {
                    title: i18n.t('msg.guide.guideTitle'),
                    description: i18n.t('msg.guide.guideDesc'),
                    position: 'bottom-right'
                }
            },
            {
                element: '#guide-breadcrumb',
                popover: {
                    title: i18n.t('msg.guide.breadcrumbTitle'),
                    description: i18n.t('msg.guide.breadcrumbDesc')
                }
            },
            {
                element: '#guide-search',
                popover: {
                    title: i18n.t('msg.guide.searchTitle'),
                    description: i18n.t('msg.guide.searchDesc'),
                    position: 'bottom-right'
                }
            },
            {
                element: '#guide-full',
                popover: {
                    title: i18n.t('msg.guide.fullTitle'),
                    description: i18n.t('msg.guide.fullDesc'),
                    position: 'bottom-right'
                }
            },
            {
                element: '#guide-theme',
                popover: {
                    title: i18n.t('msg.guide.themeTitle'),
                    description: i18n.t('msg.guide.themeDesc'),
                    position: 'bottom-right'
                }
            },
            {
                element: '#guide-lang',
                popover: {
                    title: i18n.t('msg.guide.langTitle'),
                    description: i18n.t('msg.guide.langDesc'),
                    position: 'bottom-right'
                }
            },
            {
                element: '#guide-tags',
                popover: {
                    title: i18n.t('msg.guide.tagTitle'),
                    description: i18n.t('msg.guide.tagDesc')
                }
            },
            {
                element: '#guide-sidebar',
                popover: {
                    title: i18n.t('msg.guide.sidebarTitle'),
                    description: i18n.t('msg.guide.sidebarDesc'),
                    position: 'right-center'
                }
            }
        ]
    })
})
const onclick = () => {
    driverObj.value.drive()
}
</script>

<template>
    <div>
        <el-tooltip id="11" :content="$t('msg.navBar.guide')">
            <svg-icon @click="onclick" id="guide-start" icon="guide" />
        </el-tooltip>
    </div>
</template>

<style lang="scss" scoped></style>
