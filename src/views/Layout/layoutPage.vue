<script setup>
import { useScroll } from '@vueuse/core'
import { Pointer } from '@element-plus/icons-vue'

const { y } = useScroll(window)
</script>

<template>
  <LayoutHeader :key="$route.fullPath"></LayoutHeader>
  <LayoutHeader
    class="headerC"
    :class="{ show: y > 100 }"
    :key="$route.fullPath"
  ></LayoutHeader>
  <RouterView :key="$route.fullPath"></RouterView>
  <el-backtop :right="30" :bottom="100">
    <div style="height: auto; width: 100%; color: #c60000; text-align: center">
      <el-icon><Pointer /></el-icon>
    </div>
  </el-backtop>
  <LayoutFooter></LayoutFooter>
</template>

<style scoped lang="scss">
.headerC {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  transform: translateY(-100%);
  opacity: 0;
  &.show {
    transform: none;
    transition: all 0.3s linear;
    opacity: 1;
  }
}
</style>
