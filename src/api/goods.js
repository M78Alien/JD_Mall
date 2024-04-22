import request from '@/utils/request.js'

export const getCategoryService = () => request({ url: '/home/category/head' })

export const getBannerService = () => request({ url: '/home/banner' })

export const getNewService = () => request({ url: '/home/new' })

export const getHotService = () => request({ url: '/home/hot' })
