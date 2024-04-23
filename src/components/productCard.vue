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
      <div style="font-size: 16px; margin-bottom: 10px; color: #656565">
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

  <el-card
    style="width: 290px; height: 385px"
    shadow="hover"
    body-style="padding: 0; height: 290px"
    v-else-if="cardType === 'proSmall'"
  >
    <img v-img-lazy="item.picture" :src="item.picture" style="width: 100%" />
    <template #footer>
      <div class="smallCardText">
        {{ item.name }}
      </div>
      <div style="font-size: 21px; color: #cc0000; font-weight: bold">
        ￥{{ item.price }}
      </div>
    </template>
  </el-card>

  <el-card
    class="cateCardB"
    shadow="hover"
    body-style="padding: 0; width: 100%"
    v-else-if="cardType === 'cateCard'"
  >
    <div>{{ item.name }} Mall</div>
    <div>更多商品</div>
  </el-card>
</template>

<style scoped lang="scss">
.smallCardText {
  font-size: 14px;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #656565;
}

.cateCardB {
  width: 290px;
  height: 385px;
  background-color: #e5e4e4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: transform 0.3s linear;

  :hover {
    transform: scaleZ(1);
  }

  div {
    text-align: center;
    margin: 50px;
    font-size: 30px;
    font-weight: bold;
    color: #505050;
  }
}
</style>
