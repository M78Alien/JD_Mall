import axios from 'axios'
import { useUserStore } from '@/stores'

const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net'
// 创建 axios 实例，设置基础地址和超时时间
const http = axios.create({
  baseURL,
  timeout: 200000
})

// axios 请求拦截器
http.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (e) => Promise.reject(e)
)

// axios 响应拦截器
http.interceptors.response.use(
  (res) => res.data,
  (e) => {
    return Promise.reject(e)
  }
)

export default http
export { baseURL }
