<script setup lang="ts">
import router from '@/router'
import { usePermissionStore } from '@/stores/permission'
import { useTokenStore } from '@/stores/token'

const { set: setToken } = useTokenStore()
const { set: setPermission } = usePermissionStore()

async function login() {
  await setToken('123', '321')
  await setPermission()
  router.push('/')
}
</script>
<template>
  <button @click="login">login</button>
</template>
