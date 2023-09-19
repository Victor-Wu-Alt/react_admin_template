import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {join} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': join(__dirname, 'src'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/styles/common.scss";',
            },
        },
    },
    server: {
        // 指定服务器应该监听哪个 IP 地址
        host: '0.0.0.0',
        // 指定开发服务器端口
        port: 9999,
        // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
        strictPort: true,
        // 服务器启动时自动在浏览器中打开应用程序 此值为字符串时，会被用作 URL 的路径名
        open: true,
        // 为开发服务器配置 CORS。默认启用并允许任何源，传递一个 选项对象 来调整行为或设为 false 表示禁用
        cors: true,
        fs: {
            strict: false,
        },
        proxy: {
            '/api': {
                target: 'http://medicalbed.tsingjet.com', // 开发局域网服务器
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/api/'),
            },
        },
    },
})
