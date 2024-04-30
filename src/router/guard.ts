import { usePermissionStore } from '@/stores/permission'
import { useTokenStore } from '@/stores/token'
import type { Router } from 'vue-router'

function setGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const { get: getToken } = useTokenStore()
    const token = getToken()
    if (!token && to.path !== '/login') {
      next('/login')
      return
    }

    const { get: getPermission } = usePermissionStore()
    const permission = await getPermission()
    if (to.meta.permission && !permission.includes(to.meta.permission as string)) {
      next('/403')
      return
    }
    next()
  })

  router.afterEach((to) => {})
  return router
}

export default setGuard
