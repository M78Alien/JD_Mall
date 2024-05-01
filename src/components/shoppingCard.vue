<script setup>
defineProps({
  cardType: {
    type: String,
    default: 'cart'
  }
})
</script>

<template>
  <div v-if="cardType === 'cart'" style="height: 100%">
    <cartCard></cartCard>
  </div>
  <div v-else-if="cardType === 'user'">
    <user-card></user-card>
  </div>
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
