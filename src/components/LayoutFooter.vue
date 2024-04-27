<template>
  <div class="footerCon">
    <div class="slogan">
      多快好省·
      <div style="color: #ff0000">京东</div>
      商城
    </div>
    <div class="copyright">
      CopyRight 京东商城 | Made by
      <el-link
        type="primary"
        :underline="false"
        href="https://m78alien.github.io/"
        target="_blank"
      >
        Alien
      </el-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.footerCon {
  background-color: rgb(70, 70, 70, 0.9);
  height: 200px;
  width: 100%;
  margin-top: 30px;
  .slogan {
    color: white;
    font-size: 30px;
    text-align: center;
    margin: 0 auto;
    height: 70%;
    width: 500px;
    line-height: 140px;
    display: flex;
    justify-content: center;
    letter-spacing: 8px;
  }
  .copyright {
    height: 30%;
    width: 100%;
    color: #cccccc;
    font-size: 12px;
    text-align: center;
  }
}
</style>
