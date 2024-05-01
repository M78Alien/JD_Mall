<script setup>
import { useUserStore } from '@/stores'

const useStore = useUserStore()
console.log(useStore.userInfo)

const clearUserBtn = () => {
  useStore.clearUser()
  window.location.reload()
}
</script>

<template>
  <div class="userHeader">
    <el-avatar
      :size="80"
      :src="useStore.userInfo.avatar"
      style="margin-top: 10px; margin-left: 10px"
    />
    <div style="margin-left: 20px; margin-top: 20px">
      <div style="font-size: 20px; font-weight: bold; line-height: 175%">
        {{ useStore.userInfo.nickname }}
      </div>
      <div style="font-size: 12px">账号：{{ useStore.userInfo.account }}</div>
    </div>
  </div>

  <div class="userDetail">
    <div class="middle" style="">
      <div class="Text">
        <span>id：</span>
        <span>{{ useStore.userInfo.id }}</span>
      </div>
      <div class="Text">
        <span>手机号：</span>
        <span>{{ useStore.userInfo.mobile }}</span>
      </div>
      <div class="Text">
        <span>性别：</span>
        <span>{{ useStore.userInfo.gender }}</span>
      </div>
      <div class="Text">
        <span>出生年月：</span>
        <span>{{ useStore.userInfo.birthday }}</span>
      </div>
      <div class="Text">
        <span>职业：</span>
        <span>{{ useStore.userInfo.profession }}</span>
      </div>
    </div>
  </div>

  <el-button
    type="info"
    style="margin-top: 15px; width: 100%"
    @click="clearUserBtn"
  >
    退出登录
  </el-button>
</template>

<style scoped lang="scss">
.userHeader {
  width: 100%;
  height: 100px;
  background-color: #f2f2f2;
  border-radius: 10px;
  display: flex;
}
.userDetail {
  width: 100%;
  height: 200px;
  background-color: #f2f2f2;
  border-radius: 10px;
  margin-top: 15px;

  .middle {
    padding: 10px;
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .Text {
    margin: 8px 10px;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
