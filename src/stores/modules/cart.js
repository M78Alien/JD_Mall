import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  insertCartService,
  getCartListService,
  deleteCartService
} from '@/api/user'

export const useCartStore = defineStore(
  'cart',
  () => {
    const cartList = ref([])
    const countPrice = ref(0)
    const addCart = async (goods) => {
      await insertCartService(goods.skuId, goods.count)
    }
    const getCart = async () => {
      const res = await getCartListService()
      cartList.value = res.result
    }
    const delCart = async (ids) => {
      await deleteCartService([ids])
      getCart()
    }
    const getPrice = () => {
      getCart()
      let price = 0
      for (let i = 0; i < cartList.value.length; i++) {
        price = price + cartList.value[i].price * cartList.value[i].count
      }
      countPrice.value = price.toFixed(2)
      // console.log(countPrice.value)
    }
    const clearCart = async () => {
      let clearList = []
      for (let i = 0; i < cartList.value.length; i++) {
        clearList.push(cartList.value[i].skuId)
      }
      await deleteCartService(clearList)
      getCart()
      countPrice.value = 0
    }

    return {
      cartList,
      countPrice,
      addCart,
      getCart,
      delCart,
      getPrice,
      clearCart
    }
  },
  {
    persist: true
  }
)
