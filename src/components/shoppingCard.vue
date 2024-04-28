<script setup>
import {
  ShoppingCartFull,
  Delete,
  DeleteFilled,
  Checked
} from '@element-plus/icons-vue'
import { useCartStore } from '@/stores'
import { ElMessage } from 'element-plus'
// import { ElMessageBox } from 'element-plus';

defineProps({
  cardType: {
    type: String,
    default: 'cart'
  }
})

const useCart = useCartStore()
const toClear = () => {
  // eslint-disable-next-line no-undef
  ElMessageBox.confirm('确定要清空购物车吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      useCart.clearCart()
      ElMessage.success('购物车清空成功')
    })
    .catch(() => {})
}
// console.log(useCart.countPrice)
</script>

<template>
  <div v-if="cardType === 'cart'" style="height: 100%">
    <div class="title">
      购物车<el-icon><ShoppingCartFull /></el-icon>
    </div>
    <el-scrollbar max-height="1000px" style="height: 85%">
      <div
        v-for="item in useCart.cartList"
        :key="item"
        class="scrollbar-demo-item"
        style="margin-top: 10px"
      >
        <div class="cartMini">
          <img :src="item.picture" alt="" />
          <div style="width: 300px; margin-top: 10px">
            <routerLink class="text" :to="`/product/${item.id}`">
              {{ item.name }}
            </routerLink>
            <div style="font-size: 13px; margin-top: 5px; color: #737373">
              {{ item.attrsText }}
            </div>
            <div style="color: #cc0000; font-size: 20px; margin-top: 5px">
              ￥{{ (item.price * item.count).toFixed(2) }}
            </div>
            <div style="font-size: 13px; margin-top: 5px; color: #737373">
              数量：{{ item.count }} | 单价：{{ item.price }}
            </div>
          </div>
          <div style="margin: auto; display: block">
            <el-button
              type="danger"
              :icon="Delete"
              circle
              @click="useCart.delCart(item.skuId)"
            />
          </div>
        </div>
      </div>
    </el-scrollbar>
    <div
      style="
        display: flex;
        height: 40px;
        margin-top: 20px;
        justify-content: space-between;
      "
    >
      <div
        style="
          color: #cc0000;
          font-weight: bold;
          font-size: 18px;
          margin-top: 5px;
        "
      >
        总价：￥{{ useCart.countPrice }}
      </div>
      <div>
        <el-button
          type="warning"
          :icon="DeleteFilled"
          round
          style="height: 40px; width: 120px"
          @click="toClear"
          >清空购物车</el-button
        >
        <el-button
          type="danger"
          :icon="Checked"
          round
          style="height: 40px; width: 120px"
        >
          去结算
        </el-button>
      </div>
    </div>
  </div>
  <div v-else-if="cardType === 'form'">订单</div>
  <div v-else-if="cardType === 'user'">用户</div>
</template>

<style scoped lang="scss">
.title {
  font-size: 20px;
  font-weight: bold;
  height: 5%;
}
.card {
  background-color: antiquewhite;
  width: 100%;
  margin-top: 10px;
}
.cartMini {
  display: flex;
  width: 100%;
  height: 120px;
  border-radius: 10px;
  background-color: #f2f2f2;

  img {
    margin: 10px;
    height: 100px;
    border-radius: 6px;
  }

  .text {
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
    color: black;
  }
}
</style>
