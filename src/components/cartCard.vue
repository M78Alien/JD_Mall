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
import { ref } from 'vue'
import { getOrderPreService, pushOrderService } from '@/api/order.js'

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

const innerDrawer = ref(false)
const orderList = ref()
const addressList = ref()
const toAddress = ref()
const toOrder = async () => {
  if (useCart.cartList.length === 0) {
    ElMessage.warning('购物车还没有商品')
  } else {
    innerDrawer.value = true
    const res = await getOrderPreService()
    // console.log(res.result)
    orderList.value = res.result
    addressList.value = orderList.value.userAddresses
    for (let i = 0; i < addressList.value.length; i++) {
      if (addressList.value[i].isDefault === 0) {
        toAddress.value = addressList.value[i]
      }
    }
  }
}
const dialogVisible = ref(false)
const selectedItem = ref()

const pushOrder = async () => {
  const res = await pushOrderService({
    deliveryTimeType: 1,
    payType: 1,
    payChannel: 1,
    buyerMessage: '',
    goods: orderList.value.goods.map((item) => {
      return {
        skuId: item.skuId,
        count: item.count
      }
    }),
    addressId: toAddress.value.id
  })
  console.log(res.result)
  const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
  const backURL = window.location.href
  const redirectUrl = encodeURIComponent(backURL)
  const payUrl = `${baseURL}pay/aliPay?orderId=${res.result.id}&redirect=${redirectUrl}`
  window.open(payUrl, '_blank')
  window.location.reload()
}
</script>

<template>
  <div class="title">
    购物车<el-icon><ShoppingCartFull /></el-icon>
  </div>
  <el-scrollbar max-height="1000px" style="height: 88%">
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
    <div style="display: flex">
      <el-button
        type="warning"
        :icon="DeleteFilled"
        round
        style="height: 40px; width: 120px"
        @click="toClear"
      >
        清空购物车
      </el-button>
      <el-button
        type="danger"
        :icon="Checked"
        round
        style="height: 40px; width: 120px"
        @click="toOrder"
      >
        下单结算
      </el-button>
    </div>
  </div>

  <el-drawer
    v-model="innerDrawer"
    :append-to-body="true"
    :with-header="false"
    style="border-radius: 20px 0 0 20px"
  >
    <div class="title">
      正在下单 <el-icon><Checked /></el-icon>
    </div>
    <el-scrollbar max-height="1000px" style="height: 88%">
      <div class="cartMini">
        <div
          style="font-size: 15px; margin-top: 5px; margin-left: 10px"
          v-if="!orderList?.userAddresses"
        >
          <p>您需要先添加收货地址才可提交订单</p>
          <p>可在个人中心管理收货地址哦！</p>
        </div>
        <div
          v-else
          style="
            font-size: 15px;
            margin-top: 5px;
            margin-left: 10px;
            width: 100%;
          "
        >
          <div
            style="font-size: 15px; color: #737373; display: flex; height: 22px"
          >
            <div
              v-if="!toAddress.isDefault"
              style="
                background-color: #ff0000;
                color: white;
                width: 35px;
                height: 20px;
                text-align: center;
                font-size: 13px;
                border-radius: 5px;
                line-height: 20px;
                margin-top: 2px;
                margin-right: 5px;
              "
            >
              默认
            </div>
            {{ toAddress.fullLocation }}
          </div>
          <div style="font-size: 18px; margin-top: 4px">
            {{ toAddress.address }}
          </div>
          <div style="font-size: 15px; margin-top: 6px; color: #737373">
            {{ toAddress.receiver }}
            {{ toAddress.contact }}
          </div>
          <div
            style="
              width: 100%;
              height: 25px;
              margin-top: 6px;
              display: flex;
              /* flex-direction: row-reverse; */
              justify-content: space-between;
            "
          >
            <div style="font-size: 12px; line-height: 25px; color: #cc0000">
              祝您购物愉快，不要填错地址哦！
            </div>
            <el-button
              type="info"
              style="height: 100%; width: 80px; margin-right: 10px"
              @click="dialogVisible = true"
            >
              选择地址
            </el-button>
          </div>
        </div>
      </div>

      <el-divider />

      <div
        v-for="item in orderList?.goods"
        :key="item"
        class="scrollbar-demo-item"
        style="margin-top: 10px"
      >
        <div class="cartMini">
          <img :src="item.picture" alt="" />
          <div style="width: 300px; margin-top: 10px">
            <div class="text">{{ item.name }}</div>
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
        </div>
      </div>

      <el-divider />

      <div class="orderFooter">
        <div class="footerBox">
          <div class="footerText">
            <div>商品总数：</div>
            <div>{{ orderList?.summary.goodsCount }}件</div>
          </div>
          <div class="footerText">
            <div>商品金额：</div>
            <div>￥{{ orderList?.summary.totalPrice.toFixed(2) }}</div>
          </div>
          <div class="footerText">
            <div>邮费：</div>
            <div>￥{{ orderList?.summary.postFee.toFixed(2) }}</div>
          </div>
          <div class="footerText">
            <div>订单优惠：</div>
            <div>￥{{ orderList?.summary.discountPrice.toFixed(2) }}</div>
          </div>
          <div class="footerText">
            <div>实付金额：</div>
            <div style="color: #cc0000">
              ￥{{ orderList?.summary.totalPayPrice.toFixed(2) }}
            </div>
          </div>
        </div>
      </div>

      <el-divider />

      <div>支付方式</div>
      <div
        style="
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        "
      >
        <div
          class="payCard"
          style="display: flex; justify-content: center; align-items: center"
        >
          <img
            src="../assets/images/aliPaylogo.png"
            alt=""
            style="height: 70px; border-radius: 10px"
          />
        </div>
        <div
          class="payCard"
          style="line-height: 100px; text-align: center; color: #737373"
        >
          敬请期待
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
        实付：￥{{ orderList?.summary.totalPayPrice.toFixed(2) }}
      </div>

      <el-button
        type="danger"
        round
        style="height: 40px; width: 120px"
        @click="pushOrder"
      >
        提交订单
      </el-button>
    </div>

    <el-dialog
      v-model="dialogVisible"
      title="选择地址"
      width="500"
      style="height: 300px"
    >
      <el-scrollbar max-height="180px">
        <div
          v-for="(item, index) in addressList"
          :key="item.id"
          style="height: 30px"
        >
          <!-- {{ item.fullLocation }} {{ item.address }} -->
          <input
            type="radio"
            :id="'item_' + index"
            :value="item"
            v-model="selectedItem"
          />
          <label :for="'item_' + index">
            {{ item.fullLocation }} {{ item.address }}
          </label>
        </div>
      </el-scrollbar>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="
              () => {
                dialogVisible = false
                toAddress = selectedItem
                console.log(toAddress)
              }
            "
          >
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </el-drawer>
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
.payCard {
  width: 48.5%;
  height: 100px;
  background-color: #f2f2f2;
  border-radius: 10px;
}
.orderFooter {
  background-color: #f2f2f2;
  width: 100%;
  height: 150px;
  border-radius: 10px;

  .footerBox {
    padding: 12px 20px;
    height: 126px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .footerText {
    font-size: 13px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
