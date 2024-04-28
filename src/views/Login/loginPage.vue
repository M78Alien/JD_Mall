<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

const dialogVisible = ref(false)
const useStore = useUserStore()
const router = useRouter()

const formModel = ref({
  userid: '',
  password: '',
  agree: false
})

const form = ref()

const rules = {
  userid: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 14, message: '密码长度要求6-14个字符', trigger: 'blur' }
  ]
}

const onLogin = () => {
  if (!formModel.value.agree) {
    dialogVisible.value = true
  } else {
    form.value.validate(async (valid) => {
      if (valid) {
        await useStore.getUserInfo(
          formModel.value.userid,
          formModel.value.password
        )
        // eslint-disable-next-line no-undef
        ElMessage({ type: 'success', message: '登录成功' })
        router.replace({ path: '/home' })
      }
    })
  }
}

const handleEnter = () => {
  onLogin()
}

const loginTest = async () => {
  await useStore.getUserInfo(13012345680, 123456)
  // eslint-disable-next-line no-undef
  ElMessage({ type: 'success', message: '登录成功' })
  router.replace({ path: '/home' })
}
</script>

<template>
  <div class="common-layout">
    <el-container style="flex-grow: 1">
      <el-header style="height: 100px; display: flex">
        <routerLink to="/home">
          <img
            src="../../assets/images/jdLogo.png"
            alt=""
            style="height: 95px; margin-left: 50px"
        /></routerLink>
        <div
          style="
            font-size: 25px;
            color: #4d4d4d;
            margin-left: 30px;
            display: flex;
            align-items: center;
          "
        >
          <p>欢迎登录</p>
        </div>
      </el-header>
      <el-container>
        <el-main width="100%">
          <el-card
            style="
              max-width: 450px;
              margin-top: 120px;
              margin: 120px auto;
              border-radius: 10px;
              background-color: rgb(242, 242, 242, 0.9);
            "
          >
            <template #header>
              <div class="card-header">
                <span style="font-weight: bold; font-size: larger">
                  密码登录
                </span>
              </div>
            </template>
            <el-form
              :model="formModel"
              :rules="rules"
              ref="form"
              label-width="auto"
              style="max-width: 350px; margin-left: 20px"
            >
              <el-form-item prop="userid">
                <el-input
                  placeholder="用户名 / 手机号"
                  v-model="formModel.userid"
                  @keyup.enter="handleEnter"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password" style="margin-bottom: 5px">
                <el-input
                  placeholder="密码"
                  type="password"
                  v-model="formModel.password"
                  @keyup.enter="handleEnter"
                  show-password
                ></el-input>
              </el-form-item>
              <el-form-item style="margin-bottom: 5px">
                <el-checkbox
                  v-model="formModel.agree"
                  size="large"
                  style="margin-left: 15px"
                >
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
              <el-form-item style="margin-bottom: 0">
                <el-button type="danger" @click="onLogin" style="width: 100%"
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
            <template #footer>
              <el-link type="primary" :underline="false" @click="loginTest">
                使用测试账号登录
              </el-link>
            </template>
          </el-card>
        </el-main>
      </el-container>
      <LayoutFooter></LayoutFooter>
    </el-container>
  </div>

  <el-dialog
    v-model="dialogVisible"
    title="提示"
    width="500"
    style="border-radius: 10px"
  >
    <span>需要同意隐私条款和服务条款才能提供服务，您是否同意</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">不同意</el-button>
        <el-button
          type="danger"
          @click="
            () => {
              ;(dialogVisible = false), (formModel.agree = true)
            }
          "
        >
          同意
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.common-layout {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-image: url(../../assets/images/loginBackgound.jpg);
  background-size: cover;
}
.el-header {
  background-color: rgb(255, 255, 255);
}
</style>
