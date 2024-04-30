<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
<template>
  <button @click="router.back()">click back</button>
  <div>this is dashboard</div>
</template>
