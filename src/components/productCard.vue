<script setup>
defineProps({
  item: {},
  cardType: {
    type: String,
    default: 'proLarge'
  }
})
</script>

<template>
  <el-card
    style="width: 370px"
    shadow="hover"
    body-style="padding: 0; height: 370px"
    v-if="cardType === 'proLarge'"
  >
    <img :src="item.picture" style="width: 100%" />
    <template #footer>
      <div style="font-size: 16px; margin-bottom: 10px">
        {{ item.name }}
      </div>
      <div style="font-size: 25px; color: #cc0000; font-weight: bold">
        ￥{{ item.price }}
      </div>
    </template>
  </el-card>
  <el-card
    style="width: 370px"
    shadow="hover"
    body-style="padding: 0; height: 370px"
    v-else-if="cardType === 'hot'"
  >
    <img v-img-lazy="item.picture" :src="item.picture" style="width: 100%" />
    <template #footer>
      <div style="font-size: 19px; margin-bottom: 8px; font-weight: bold">
        {{ item.title }}
      </div>
      <div style="color: #656565; font-size: 14px">
        {{ item.alt }}
      </div>
    </template>
  </el-card>
</template>

<style scoped lang="scss"></style>
