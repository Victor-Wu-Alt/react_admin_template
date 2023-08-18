import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
})
// 添加请求拦截器
instance.interceptors.request.use(
    function (config) {
        // 请求成功做点什么
        return config
    },
    function (error) {
        // 对请求错误做点什么
        return Promise.reject(error)
    }
)
// 添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        const { success, message, data } = response.data
        // 判断当前请求是否成功
        if (success) {
            return data
        } else {
            // 请求失败，业务失败，消息提示
            return Promise.reject(new Error(message))
        }
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error)
    }
)


export default instance
