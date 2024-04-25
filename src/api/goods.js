import request from '@/utils/request.js'

export const getCategoryService = () => request({ url: '/home/category/head' })

export const getBannerService = () => request({ url: '/home/banner' })

export const getNewService = () => request({ url: '/home/new' })

export const getHotService = () => request({ url: '/home/hot' })

export const getCateService = (id) =>
  request({ url: '/category', params: { id } })

export const getGoodsService = (id) =>
  request({ url: '/goods', params: { id } })
