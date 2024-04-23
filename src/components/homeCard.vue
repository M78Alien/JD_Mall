<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  subTitle: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div style="width: 1525px; margin: auto; padding-top: 5px">
    <div class="hot">
      <span class="titleText">{{ title }}</span>
      <span class="subText">{{ subTitle }}</span>
    </div>
    <div style="display: flex; justify-content: space-between">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hot {
  width: 1525px;
  height: 60px;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;

  .titleText {
    font-size: 29px;
    font-weight: 500;
    margin-left: 30px;
    line-height: 60px;
  }

  .subText {
    font-size: 14px;
    color: #656565;
    margin-left: 20px;
  }
}
</style>
