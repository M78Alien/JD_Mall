<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { getGoodsService } from '@/api/goods.js'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMouseInElement } from '@vueuse/core'
import XtxSku from '@/components/XtxSku/index.vue'

const goodDetail = ref({})
const route = useRoute()
const getGoodDetail = async () => {
  const res = await getGoodsService(route.params.id)
  goodDetail.value = res.result
  console.log(goodDetail.value)
}
onMounted(() => getGoodDetail())

const imgRef = ref(0)
const imgEnter = (i) => {
  imgRef.value = i
}

const target = ref(null)
const { elementX, elementY, isOutside } = useMouseInElement(target)
const left = ref(0)
const top = ref(0)
const positionX = ref(0)
const positionY = ref(0)

watch([elementX, elementY, isOutside], () => {
  const size = 98.43
  if (elementX.value > size && elementX.value < size * 3) {
    left.value = elementX.value - size
  }
  if (elementY.value > size && elementY.value < size * 3) {
    top.value = elementY.value - size
  }
  positionX.value = -left.value * 2
  positionY.value = -top.value * 2
})

const disCountMsg = () => {
  // eslint-disable-next-line no-undef
  ElMessage({
    type: 'success',
    message: '降价通知设置成功，当商品降价会提醒你哦'
  })
}
</script>

<template>
  <el-breadcrumb
    :separator-icon="ArrowRight"
    style="width: 1250px; margin: 10px auto; padding-left: 40px"
  >
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item
      :to="{ path: `/category/${goodDetail.categories?.[1].id}` }"
    >
      {{ goodDetail.categories?.[1].name }}
    </el-breadcrumb-item>
    <el-breadcrumb-item
      :to="{ path: `/category/${goodDetail.categories?.[1].id}` }"
    >
      {{ goodDetail.categories?.[0].name }}
    </el-breadcrumb-item>
    <el-breadcrumb-item>{{ goodDetail.name }}</el-breadcrumb-item>
  </el-breadcrumb>

  <div class="productSell">
    <div class="proImg">
      <div style="width: 100%">
        <div style="width: 90%; margin: 5%; position: relative" ref="target">
          <img
            :src="goodDetail.mainPictures?.[imgRef]"
            alt=""
            style="width: 100%"
          />
          <div
            class="layer"
            v-show="!isOutside"
            :style="{ left: `${left}px`, top: `${top}px` }"
          ></div>
          <div
            class="large"
            v-show="!isOutside"
            style="left: 410.75px; top: 0px"
            :style="{
              backgroundPositionX: `${positionX}px`,
              backgroundPositionY: `${positionY}px`,
              backgroundImage: `url(${goodDetail.mainPictures?.[imgRef]})`
            }"
          ></div>
        </div>
      </div>
      <div style="width: 100%">
        <div class="picList">
          <img
            v-for="(item, i) in goodDetail.mainPictures"
            :key="i"
            :src="item"
            alt=""
            style="width: 17%"
            @mouseenter="imgEnter(i)"
            :class="{ active: i === imgRef }"
          />
        </div>
      </div>
    </div>

    <div class="proSell">
      <div style="margin-left: 30px">
        <div
          style="
            font-size: 25px;
            font-weight: bolder;
            color: #404040;
            line-height: 200%;
          "
        >
          {{ goodDetail.name }}
        </div>

        <div style="font-size: 12px; color: #737373; line-height: 250%">
          {{ goodDetail.desc }}
        </div>

        <div class="sellCard">
          <span
            style="
              color: #cc0000;
              font-size: 30px;
              height: 100%;
              font-weight: bold;
            "
            >￥{{ goodDetail.price }}
          </span>
          <span
            style="
              color: #737373;
              text-decoration: line-through;
              margin-left: 15px;
            "
            v-show="goodDetail.price !== goodDetail.oldPrice"
            >￥{{ goodDetail.oldPrice }}
          </span>
          <el-link
            type="primary"
            :underline="false"
            style="margin-left: 15px; margin-bottom: 5px"
            @click="disCountMsg"
            >降价通知
          </el-link>
        </div>

        <div class="miniCard">
          <div class="miniCardSec">
            <div>商品销量</div>
            <div>{{ goodDetail.salesCount }}</div>
          </div>
          <div class="miniCardSec">
            <div>评论总数</div>
            <div>{{ goodDetail.commentCount }}</div>
          </div>
          <div class="miniCardSec">
            <div>收藏总数</div>
            <div>{{ goodDetail.collectCount }}</div>
          </div>
          <div class="miniCardSec" style="width: 25%">
            <div>品牌名称</div>
            <div>{{ goodDetail.brand?.name }}</div>
          </div>
          <div style="width: 15%; margin: auto">
            <img
              :src="goodDetail.brand?.picture"
              alt=""
              style="
                width: 60%;
                height: 60%;
                margin-left: 10%;
                border-radius: 5px;
              "
            />
          </div>
        </div>

        <XtxSku :goods="goodDetail"></XtxSku>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.productSell {
  width: 1250px;
  margin: 0 auto;
  display: flex;
  background-color: white;
  border-radius: 10px;

  .proImg {
    width: 35%;
  }

  .layer {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
  }

  .large {
    width: 393.75px;
    height: 393.75px;
    background-color: rgb(255, 255, 255, 0.9);
    position: absolute;
    background-repeat: no-repeat;
    background-size: 200%;
    z-index: 1;
  }

  .proSell {
    width: 65%;
    margin-top: 19px;

    .sellCard {
      margin-top: 10px;
      width: 85%;
      height: 40px;
    }

    .miniCard {
      width: 70%;
      height: 90px;
      display: flex;
      background-color: rgb(242, 242, 242, 0.7);
      margin-top: 15px;
      justify-content: space-between;
      border-radius: 7px;

      .miniCardSec {
        width: 20%;
        margin: auto;
        text-align: center;

        div:first-child {
          font-weight: bold;
        }
        div:last-child {
          padding-top: 10px;
        }
      }

      .miniCardSec + .miniCardSec {
        border-left: 1px solid #ccc;
      }
    }
  }

  .picList {
    width: 90%;
    display: flex;
    margin: -3% 5% 5%;
    justify-content: space-between;

    .active {
      box-sizing: border-box;
      border: 2px solid #ff0000;
    }
  }
}
</style>
