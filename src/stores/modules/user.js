import { loginService } from '@/api/user.js'
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({})
    const getUserInfo = async (id, pwd) => {
      const res = await loginService(id, pwd)
      userInfo.value = res.result
      // console.log(res)
    }
    const clearUser = () => {
      userInfo.value = {}
    }
    return {
      userInfo,
      getUserInfo,
      clearUser
    }
  },
  {
    persist: true
  }
)
