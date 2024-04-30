import { defineStore } from 'pinia'
import { ref } from 'vue'

const DEFAULT_PERMISSION: string[] = []
export const usePermissionStore = defineStore('permission', () => {
  const permission = ref<string[]>(DEFAULT_PERMISSION)
  async function get() {
    if (JSON.stringify(permission.value) === JSON.stringify(DEFAULT_PERMISSION)) {
      await set()
    }
    return permission.value
  }
  async function set() {
    // TODO: get permission
    permission.value.push('home', 'version')
  }
  function remove() {
    permission.value = []
  }

  return { get, set, remove }
})
