<script setup>
import { useScroll } from '@vueuse/core'

const { y } = useScroll(window)
</script>

<template>
  <LayoutHeader></LayoutHeader>
  <LayoutHeader class="headerC" :class="{ show: y > 100 }"></LayoutHeader>
  <RouterView></RouterView>
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
