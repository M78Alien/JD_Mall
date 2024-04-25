<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { getCateService } from '@/api/goods.js'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const cateData = ref({})

const route = useRoute()
const getRoute = async (id) => {
  const res = await getCateService(id)
  cateData.value = res.result
  // console.log(cateData.value)
}
const routeRef = ref(route.params.id)

onMounted(() => getRoute(routeRef.value))
</script>

<template>
  <el-breadcrumb
    :separator-icon="ArrowRight"
    style="width: 1525px; margin: 10px auto; padding-left: 40px"
  >
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ cateData.name }}</el-breadcrumb-item>
  </el-breadcrumb>

  <div class="catePage">
    <home-card :title="cateData.name" subTitle="分类">
      <div class="cateHead">
        <el-card
          v-for="item in cateData.children"
          :key="item.id"
          shadow="never"
          body-style="padding: 0; height: 150px"
        >
          <img
            :src="item.picture"
            alt=""
            style="width: 150px; height: 150px; background-color: #e5e4e4"
          />
          <template #footer>
            <div style="text-align: center; font-weight: bold">
              {{ item.name }}
            </div>
          </template>
        </el-card>
      </div>
    </home-card>
  </div>

  <div class="catePage" v-for="item in cateData.children" :key="item.id">
    <home-card :title="item.name">
      <div class="cateSec">
        <RouterLink
          v-for="i in item.goods"
          :key="i.id"
          :to="`/product/${i.id}`"
          style="text-decoration: none"
        >
          <product-card :item="i" cardType="proSmall"></product-card>
        </RouterLink>
      </div>
    </home-card>
  </div>
</template>

<style scoped lang="scss">
.catePage {
  width: 1525px;
  margin: 0 auto;
  margin-bottom: 25px;
  padding-bottom: 25px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
}
.cateHead {
  width: 100%;
  display: flex;
  padding-bottom: 10px;
  justify-content: space-evenly;
}
.cateSec {
  width: 100%;
  padding: 0 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}
</style>
