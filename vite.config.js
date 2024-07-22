import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
//配置svgicon
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        }),
        createSvgIconsPlugin({
            // 指定需要缓存的图标文件夹
            iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
            // 指定symbolId格式
            symbolId: 'icon-[name]'
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        // 配置反向代理
        proxy: {
            // 当地址中有/api的时候会触发代理机制
            '/api': {
                // 要代理的服务器地址  这里不用写 api
                target: 'https://api.imooc-admin.lgdsunday.club/',
                changeOrigin: true // 是否跨域
            }
        },
        hmr: true
    }
})
