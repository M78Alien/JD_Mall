<script setup>
import {
  getBannerService,
  getCategoryService,
  getNewService,
  getHotService
} from '@/api/goods.js'
import { ref } from 'vue'

const bannerList = ref([])
const getBannerList = async () => {
  const res = await getBannerService()
  bannerList.value = res.result
}
getBannerList()

const categoryList = ref([])
const getCategoryList = async () => {
  const res = await getCategoryService()
  categoryList.value = res.result
  // console.log(categoryList.value)
}
getCategoryList()

const newGoodList = ref([])
const getNewGoodList = async () => {
  const res = await getNewService()
  newGoodList.value = res.result
}
getNewGoodList()

const hotGoodList = ref([])
const getHotGoodList = async () => {
  const res = await getHotService()
  hotGoodList.value = res.result
}
getHotGoodList()
</script>

<template>
  <div class="homePage">
    <div class="left">
      <ul>
        <li v-for="item in categoryList" :key="item.id" style="display: flex">
          <RouterLink :to="`/category/${item.id}`" style="color: #c60000">{{
            item.name
          }}</RouterLink>
          <ul class="itemIn">
            <li v-for="i in item.children.slice(0, 2)" :key="i">
              <RouterLink :to="`/category/${item.id}`">{{ i.name }}</RouterLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="homeBanner">
      <el-carousel height="500px" direction="vertical">
        <el-carousel-item v-for="item in bannerList" :key="item.id">
          <img :src="item.imgUrl" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>

  <home-card title="新鲜好物" subTitle="好评商品 为您推荐">
    <ul class="ulcon">
      <li v-for="item in newGoodList" :key="item.id">
        <RouterLink :to="`/product/${item.id}`">
          <product-card :item="item" cardType="proLarge"></product-card>
        </RouterLink>
      </li>
    </ul>
  </home-card>

  <home-card title="人气推荐" subTitle="人气爆款 不容错过">
    <ul class="ulcon">
      <li v-for="item in hotGoodList" :key="item.id">
        <RouterLink to="/home">
          <product-card :item="item" cardType="hot"></product-card>
        </RouterLink>
      </li>
    </ul>
  </home-card>

  <home-card
    v-for="item in categoryList.slice(0, 8)"
    :key="item.id"
    :title="item.name"
  >
    <div class="cateGoods">
      <RouterLink :to="`/product/${i.id}`" v-for="i in item.goods" :key="i.id">
        <product-card :item="i" cardType="proSmall"></product-card>
      </RouterLink>
      <RouterLink :to="`/category/${item.id}`">
        <product-card :item="item" cardType="cateCard"></product-card>
      </RouterLink>
    </div>
  </home-card>
</template>

<style lang="scss" scoped>
.homePage {
  display: flex;
  width: 1525px;
  height: 500px;
  margin: 0 auto;
}
a {
  text-decoration: none;
  color: #161616;
}
ul {
  list-style-type: none;
}
.left {
  background-color: #fff;
  width: 275px;
  height: 500px;
  margin-right: 10px;
  margin-top: 10px;
  border-radius: 10px;
  ul {
    list-style-type: none;
    padding-left: 20px;
    li {
      height: 20px;
      margin-bottom: 35px;
    }
    .itemIn {
      display: flex;
      li {
        margin-left: 7px;
      }
    }
  }
}
.homeBanner {
  width: 1240px;
  height: 500px;
  margin-top: 10px;

  img {
    width: 100%;
    height: 500px;
  }
}
.ulcon {
  list-style-type: none;
  display: flex;
  padding-left: 0;
  justify-content: space-between;

  li {
    margin-right: 14px;
  }
}

.cateGoods {
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 17px;
}
</style>
