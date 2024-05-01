<template>
  <div class="footerCon">
    <div class="slogan">
      多快好省·
      <div style="color: #ff0000">京东</div>
      商城
    </div>
    <div class="copyright">
      CopyRight
      <a href="https://github.com/M78Alien/JD_Mall" style="color: #cc0000"
        >京东商城</a
      >
      | Made by
      <a href="https://m78alien.github.io/" style="color: #4d94ff">Alien</a>
    </div>
  </div>
</template>

<style scoped lang="scss">
a {
  text-decoration: none;
}
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
