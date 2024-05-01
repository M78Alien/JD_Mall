<script setup>
import { onMounted, ref } from 'vue'
import { getCategoryService } from '@/api/goods.js'
import { useRoute } from 'vue-router'
import { useUserStore, useCartStore } from '@/stores'
import { UserFilled } from '@element-plus/icons-vue'

const route = useRoute()
const useStore = useUserStore()
const useCart = useCartStore()
const categoryList = ref([])
const getCategoryList = async () => {
  const res = await getCategoryService()
  // console.log(res.result)
  categoryList.value = res.result
}
onMounted(() => getCategoryList())
const routeRef = ref(route.params.id)

const turnOff = () => {
  useStore.clearUser()
  // eslint-disable-next-line no-undef
  ElMessage({ type: 'success', message: '账号成功退出' })
}

const disDrawer = ref(false)
const cardType = ref('')
const openCard = (item) => {
  disDrawer.value = true
  cardType.value = item
}
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
      <div class="user" v-if="useStore.userInfo.token">
        <el-link :underline="false" type="info" @click="openCard('user')">
          <el-icon><UserFilled /></el-icon> {{ useStore.userInfo.nickname }}
        </el-link>
        <el-link
          :underline="false"
          type="info"
          @click="
            () => {
              openCard('cart')
              useCart.getCart()
              useCart.getPrice()
            }
          "
        >
          购物车
        </el-link>
        <el-link :underline="false" type="info" @click="turnOff">
          退出登录
        </el-link>
        <el-avatar
          :size="40"
          :src="useStore.userInfo.avatar"
          @click="openCard('user')"
        />
      </div>
      <div class="user" v-else>
        <routerLink to="/login" style="color: #737373">请登录</routerLink>
      </div>
    </div>

    <el-drawer
      v-model="disDrawer"
      :with-header="false"
      style="border-radius: 20px 0 0 20px"
    >
      <shopping-card
        :cardType="cardType"
        v-if="cardType === 'cart'"
      ></shopping-card>
      <shopping-card
        :cardType="cardType"
        v-if="cardType === 'user'"
      ></shopping-card>
    </el-drawer>
  </nav>
</template>

<style scoped lang="scss">
a {
  text-decoration: none;
}
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
