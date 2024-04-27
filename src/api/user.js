import request from '@/utils/request.js'

export const loginService = (account, password) =>
  request({ url: '/login', method: 'POST', data: { account, password } })
