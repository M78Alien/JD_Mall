<script setup>
import { onMounted, ref } from 'vue'
import { getCategoryService } from '@/api/goods.js'

const categoryList = ref([])
const isUser = ref(true)
const squareUrl = ref()
const getCategoryList = async () => {
  const res = await getCategoryService()
  // console.log(res.result)
  categoryList.value = res.result
}
onMounted(() => getCategoryList())
</script>

<template>
  <nav style="background-color: #ffffff">
    <div class="headerCon">
      <div class="left">
        <div class="logo">
          <el-image
            src="src\assets\images\jdLogo.png"
            style="height: 95px"
          ></el-image>
        </div>
        <div class="cate">
          <ul>
            <li><el-link :underline="false" type="default">首页</el-link></li>
            <li v-for="item in categoryList" :key="item.id">
              <el-link :underline="false" type="default">{{
                item.name
              }}</el-link>
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
