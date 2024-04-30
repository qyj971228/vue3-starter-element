<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { type FormInstance, type FormRules } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { usePermissionStore } from '@/stores/permission'
import { useTokenStore } from '@/stores/token'
import BG from '@/assets/img/login/bg.png'
import Wave from '@/assets/img/login/Vector.png'
import Login from '@/assets/img/login/login.png'

const router = useRouter()
const { set: setToken } = useTokenStore()
const { set: setPermission } = usePermissionStore()

const loginFormRef = ref<FormInstance | null>(null)

const loading = ref(false)

const loginFormData = ref({
  username: '',
  password: ''
})

const loginFormRules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
  ]
}

async function login() {
  await setToken({ username: loginFormData.value.username, password: loginFormData.value.password })
  await setPermission()
  router.push('/')
}

function onHandleLogin() {
  loginFormRef.value?.validate(async (valid: boolean) => {
    // if (valid) {
    loading.value = true
    await login()
    loading.value = false
    // }
  })
}
</script>
<template>
  <img :src="BG" class="w-100% h-100% object-contain fixed left-0 top-0 z--2" />
  <img :src="Wave" class="w-100% h-40% object-fill fixed left-0 bottom-0 z--1" />
  <div class="h-100vh w-100vw flex flex-justify-center flex-items-center hidden">
    <el-card class="w-825px" shadow="always" :body-style="{ padding: '76px 65px' }">
      <div class="flex flex-items-center gap-50px">
        <img :src="Login" class="w-332px h-332px" />
        <div class="min-w-200px w-300px flex flex-col">
          <div class="text-center text-18px font-bold mb-42px">VUE_STARTER_ELEMENT</div>
          <el-form ref="loginFormRef" :model="loginFormData" :rules="loginFormRules" @keyup.enter="onHandleLogin">
            <el-form-item prop="username">
              <el-input
                v-model.trim="loginFormData.username"
                placeholder="用户名"
                type="text"
                tabindex="1"
                :prefix-icon="User"
              />
            </el-form-item>
            <el-form-item prop="password" class="mb-30px">
              <el-input
                v-model.trim="loginFormData.password"
                placeholder="密码"
                type="password"
                tabindex="2"
                :prefix-icon="Lock"
                show-password
              />
            </el-form-item>
            <el-button class="w-100%" :loading="loading" type="primary" @click.prevent="onHandleLogin">登 录</el-button>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
</template>
