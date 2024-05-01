import request from '@/utils/request.js'

export const getOrderPreService = () => request({ url: '/member/order/pre' })

export const pushOrderService = (data) =>
  request({
    url: '/member/order',
    method: 'POST',
    data
  })
