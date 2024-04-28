import request from '@/utils/request.js'

export const loginService = (account, password) =>
  request({ url: '/login', method: 'POST', data: { account, password } })

export const insertCartService = (skuId, count) => {
  return request({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count
    }
  })
}

export const getCartListService = () =>
  request({ url: '/member/cart', method: 'GET' })

export const deleteCartService = (ids) => {
  return request({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids
    }
  })
}
