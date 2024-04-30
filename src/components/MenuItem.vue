<script setup lang="ts">
import { useRouter } from 'vue-router'

export type MenuItemProp = { path: string; title: string; icon: string; children?: MenuItemProp[] }

const { data } = defineProps<{ data: MenuItemProp }>()

const router = useRouter()
function iconColor(path: string) {
  return path.split('/')[1] === router.currentRoute.value.path.split('/')[1] ? '#209F84' : '#BBBDBF'
}
</script>

<template>
  <el-menu-item v-if="!data.children || data.children.length === 0" :index="data.path">
    <svg-icon
      v-if="data.icon"
      class="ml-4px"
      :name="data.icon"
      width="16"
      height="16"
      :color="iconColor(data.path)"
    ></svg-icon>
    <span class="ml-14px">{{ data.title }}</span>
  </el-menu-item>
  <el-sub-menu v-else :index="data.title">
    <template #title>
      <svg-icon
        v-if="data.icon"
        class="ml-4px"
        :name="data.icon"
        width="16"
        height="16"
        :color="iconColor(data.path)"
      ></svg-icon>
      <span class="ml-14px">{{ data.title }}</span>
    </template>
    <menu-item v-for="child in data.children" :data="child"></menu-item>
  </el-sub-menu>
</template>
