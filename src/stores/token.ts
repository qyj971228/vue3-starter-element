// import { reqLoginApi } from '@/api/login'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useTokenStore = defineStore('token', () => {
  const router = useRouter()
  const token = ref('')
  function get() {
    const storageToken = localStorage.getItem('token')
    if (!token.value) {
      token.value = storageToken ? storageToken : ''
    }
    return token.value
  }
  async function set({ username, password }: { username: string; password: string }) {
    // const { data } = await reqLoginApi({ username, password })
    // TODO: handle token
    token.value = '123'
    localStorage.setItem('token', '123')
  }
  function remove() {
    token.value = ''
    localStorage.removeItem('token')
    router.push('/login')
  }

  return { get, set, remove }
})
