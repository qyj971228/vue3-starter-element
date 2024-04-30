<script setup lang="ts">
import { useTokenStore } from '@/stores/token'
import { pages } from '@/router/config'
import { useRouter, type RouteRecordRaw } from 'vue-router'
import MenuItem, { type MenuItemProp } from '@/components/MenuItem.vue'
import { computed, ref, watch, type CSSProperties } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { useCurrentTime } from '@/hooks/useCurrentTime'
import Logo from '@/assets/img/logo.svg'

const headerHeight = 72
const navWidth = 260

const currentTime = useCurrentTime('YYYY/MM/DD HH:mm:ss')

const { remove: removeToken, get: getToken } = useTokenStore()
function logout() {
  removeToken()
}

const router = useRouter()
const mainCSS = ref<CSSProperties>({})
watch(
  () => router.currentRoute.value.path,
  (val) => {
    mainCSS.value = {
      height: val !== '/login' ? `calc(100vh - ${headerHeight}px)` : '100vh'
    }
  },
  { immediate: true }
)

const isShowNavAndHeader = computed(() => {
  return getToken() && !['/dashboard', '/login'].includes(router.currentRoute.value.path)
})

// menu-item
const menuItemData = ref<MenuItemProp[]>([])
menuItemData.value = getMenuConfig(pages)
function getMenuConfig(val: RouteRecordRaw[]): MenuItemProp[] {
  return val.map((el) => {
    return {
      path: el.path,
      title: ((el.meta?.title || el.name) as string) || '',
      icon: (el.meta?.icon as string) || '',
      children: el.children ? getMenuConfig(el.children) : []
    }
  })
}
</script>

<template>
  <!-- header -->
  <header v-if="isShowNavAndHeader" class="flex shadow bg-#209F84" :style="{ height: headerHeight + 'px' }">
    <div
      class="flex flex-items-center cursor-pointer"
      @click="router.push('/dashboard')"
      :style="{ height: headerHeight + 'px' }"
    >
      <img class="w-150px h-60px object-contain" :src="Logo" alt="icon" />
      <div class="title">VUE_STARTER_ELEMENT</div>
    </div>
    <div class="ml-a flex flex-items-center gap-20px" :style="{ height: headerHeight + 'px' }">
      <div class="time cursor-default">{{ currentTime }}</div>
      <el-dropdown>
        <div class="user flex flex-items-center mr-40px cursor-pointer">
          <img class="h-26px w-26px mr-10px rounded-10px" :src="Logo" />
          <span>ADMIN</span>
          <el-icon><arrow-down /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">LOGOUT</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
  <!-- content -->
  <div class="flex">
    <!-- nav -->
    <nav class="nav" v-if="isShowNavAndHeader" :style="{ width: navWidth + 'px' }">
      <el-menu class="overflow-auto" router default-active="/" :style="{ height: `calc(100vh - ${headerHeight}px)` }">
        <menu-item v-for="item in menuItemData" :data="item"></menu-item>
      </el-menu>
    </nav>
    <!-- main -->
    <main class="overflow-auto w-100%" :style="mainCSS">
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.title {
  font-family:
    Source Han Sans,
    Source Han Sans;
  font-weight: 700;
  font-size: 26px;
  color: #ffffff;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
.time {
  font-family:
    Source Han Sans,
    Source Han Sans;
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
.user {
  width: fit-content;
  height: v-bind(headerHeight + 'px');
  line-height: v-bind(headerHeight + 'px');
  font-family: Lato, Lato;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
</style>
