<script setup>
import { onMounted, ref } from 'vue'
import { getCategoryService } from '@/api/goods.js'
import { useRoute } from 'vue-router'

const route = useRoute()
const categoryList = ref([])
const isUser = ref(true)
const squareUrl = ref()
const getCategoryList = async () => {
  const res = await getCategoryService()
  // console.log(res.result)
  categoryList.value = res.result
}
onMounted(() => getCategoryList())
const routeRef = ref(route.params.id)
</script>

<template>
  <nav style="background-color: #ffffff">
    <div class="headerCon">
      <div class="left">
        <div class="logo">
          <RouterLink to="/home">
            <img
              src="../assets/images/jdLogo.png"
              alt=""
              style="height: 95px"
            />
          </RouterLink>
        </div>
        <div class="cate">
          <ul>
            <li>
              <RouterLink to="/home">
                <el-link :underline="false" type="default" v-if="routeRef">
                  首页
                </el-link>
                <el-link
                  :underline="false"
                  type="default"
                  v-else
                  style="color: #e60000"
                  >首页</el-link
                >
              </RouterLink>
            </li>
            <li v-for="item in categoryList" :key="item.id">
              <RouterLink :to="`/category/${item.id}`">
                <el-link
                  :underline="false"
                  type="default"
                  v-if="routeRef === item.id"
                  style="color: #e60000"
                  >{{ item.name }}</el-link
                >
                <el-link :underline="false" type="default" v-else>{{
                  item.name
                }}</el-link>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="user" v-if="isUser">
        <el-link :underline="false" type="info">Alien</el-link>
        <el-link :underline="false" type="info">购物车</el-link>
        <el-link :underline="false" type="info">我的订单</el-link>
        <el-link :underline="false" type="info">退出登录</el-link>
        <el-avatar shape="square" :size="40" :src="squareUrl" />
      </div>
      <div class="user" v-else>请登录</div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
nav {
  border-bottom: 1px solid #b8b8b8;
}
.headerCon {
  width: 1525px;
  height: 100px;
  margin: auto;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .cate {
      justify-content: space-evenly;
      .el-link {
        font-weight: bold;
      }
    }
  }
  .el-link {
    font-size: 15px;
  }

  .logo {
    margin-left: 30px;
  }
}
ul {
  list-style-type: none;
  display: flex;
  li {
    margin-left: 30px;
  }
}
.user {
  margin-right: 15px;
  display: flex;
  .el-link {
    margin-right: 15px;
  }
}
</style>
