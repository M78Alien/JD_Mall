<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  subTitle: {
    type: String,
    default: ''
  },
  cardWidth: {
    default: 1525
  }
})
</script>

<template>
  <div :style="{ width: `${cardWidth}px`, margin: 'auto', paddingTop: '5px' }">
    <div class="hot" :style="{ width: `${cardWidth}px` }">
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
