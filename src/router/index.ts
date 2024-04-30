import { createRouter, createWebHistory } from "vue-router"
import config from "@/router/config"
import setGuard from "@/router/guard"

let router = createRouter({
  history: createWebHistory(),
  routes: config
})

router = setGuard(router)

export default router
